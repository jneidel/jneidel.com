---
title: Syncing text notes between multiple devices
summary: "Description of the technical setup for my note-taking system."
date: 2023-11-13
---

If you're not using a note-taking app that handles synchronization for you,
you'll have to find a different solution.

This guide is going to detail how I use [Syncthing](https://syncthing.net) for
all my synchronization needs and how I use [Signal](https://signal.org) as my
notes inbox.

## Syncthing
### Why Syncthing

- it just works™
- open source
- feels-like-instant sync
- works behind CGNAT routers (no outgoing IP address)
- nice web-inteface for management
- decent memory/cpu usage
    + Has configurable run conditions on the phone to e.g. only run while being charged
- you don't have worry about storage costs with a cloud provider
    + Dropbox's free plan is a paltry 2GB
    + my notes are 30GB and I don't have to care
- ignore patterns
    + very useful for caches, node_modules, vendor, etc.
- nested folders (more on that later)
- built-in versioning
    + so you can easily revert unintentional changes/deletions

### Between computers

My most basic use case was syncing my notes between my work and personal
computer. My [setup](https://github.com/jneidel/dotfiles) is running on both
machines, with some tweaks depending specific on the device, all I need is to
plug in my notes.

You can sync directly between the machines:

{{<mermaid>}}
stateDiagram-v2
    Work --> Personal
    Personal --> Work
{{</mermaid>}}


But I would recommend you put a server in between, so you can also sync without
them both being online at the same time (e.g. you close the one machine and open the other.)


{{<mermaid>}}
stateDiagram-v2
    Server --> Personal
    Server --> Work
    Work --> Server
    Personal --> Server
{{</mermaid>}}

### Between phone and computer

I'm using [Syncthing-Fork](https://f-droid.org/en/packages/com.github.catfriend1.syncthingandroid/) on my phone.
The dynamic is much the same:

{{<mermaid>}}
stateDiagram-v2
    Server --> Phone
    Phone --> Server
    Server --> Computer
    Computer --> Server
{{</mermaid>}}

I have a media sync with my music library, podcasts, movies, etc. To only sync
parts of this I can use nested folders and only expose a subset to my phone:

```txt
.
└── media             <-- syncthing folder 1
    ├── movies
    ├── music
    │   └── symlink to ../phone/music
    └── phone         <-- syncthing folder 2
        ├── podcasts
        └── music

```

Like this I can add new music and podcasts from my computer and delete stuff I heard
podcasts from my phone.
Much easier than the manual ftp moving I did before.

With the symlink I have the phones music integrated into my mpd setup, which
will automatically have deletion from the phone of song I don't like synced.

### The server

Syncthing runs fine even on a Raspberry Pi.
I have it running on my homeserver, where the data is included in my regular
backups.

## Signal as an inbox

I only use my phone to jot down notes, not to read them.

My unoptimized workflow was me writing into a Signal chat with myself and
copying out the notes on my computer.
The obvious improvement was to automate that by having a script read out the
signal chat and create notes out of the messages.

I have done that by creating a script that parses the signal cli app.
You can find out everything about it in it's repository: [signal-cli-to-file](https://github.com/jneidel/signal-cli-to-file)

With my current workflow I can easily jot down a note in Signal and have it
delivered into my note-taking system.
I also routinely forward messages from other chats, emails, photos, PDFs and
whatever else I might run across on my phone.
