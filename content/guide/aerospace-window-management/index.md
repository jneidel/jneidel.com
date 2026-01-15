---
title: "Window management on MacOS with AeroSpace"
description: "How and why to use AeroSpace for keyboard-driven window management. Full config, demo and explanation of the reasoning."
summary: "Why you should care and how to set it up."
tags:
- macos
date: 2026-01-15
thumbnailAlt: "Virtual windows above a laptop with a rock in front of it"
---

On Linux I've had a nice way to manage my windows for a long time now.
On my work computer, a Macbook, I was using the inadequate built-in "Spaces" feature.
An unsatisfying experience for to a lack of consistency and sane keyboard controls.
This is where [AeroSpace](https://nikitabobko.github.io/AeroSpace/guide) comes in, providing a nicer window management experience than what Apple offers.

Before we setup the app, let's take a deeper look at the problem it solves first.

## What is window management?

On a computer there are multiple application windows open at the same time.
In my case, at a minimum I always have a browser, Emacs, terminal and signal messaging client open.
Window management is what you do when you select an application window, move another out of the way or arrange multiple one the screen together.
This can be done more or less effectively.

While everyone know the application window, the concept of the workspace is both unfamiliar and underutilized by most people.
Instead of cramming every open window into one workspace, layering them on top of each other or constantly minimizing them, one can split them up among many workspaces.

For example, the below shows that I have two programs open in fullscreen, at the same time, each on a separate workspaces.
{{<center>}}
    {{<figure alt="Fullscreen browser" src="demo-1.png" caption="Workspace 2: the browser">}}
    {{<figure alt="Fullscreen mail program" src="demo-4.png" caption="Workspace 5: the mail client">}}
{{</center>}}

Instead of switching between programs, I would switch between workspaces.
The advantage is that workspaces can contain arrangements of windows that can be switched between just as easily.
You can also think of workspaces in terms of function (browser) instead of program (chromium, firefox, safari, etc.)

(Workspaces do not require AeroSpace and can also be utilized with the native MacOS Spaces.)

## Why bother with this? 

Using the mouse is a user friendly and easily understandable way of selecting a
window, moving it somewhere or making it bigger.
But it is not very efficient, automatable or reproducible.

Using a keyboard driven approach has all of those advantages after you got used
to the few basic keybindings.
It's more efficient because you can perform one or many keypresses much faster, your hand does not need to leave the keyboard.
It's automatable because you don't need to think. You get to your browser on muscle-memory alone.
(AeroSpace additionally provides rules for automation.)
You get a sane reproducible window management because everything is always where you expect it.

Window management is simply a part of every computer users life.
Might as well make it as pleasant and fluid as possible, since you use
it literally all the time.

To see every app in fullscreen eliminates distractions.
There is nothing else on the screen.
The same is true for the consistency and muscle-memory.
I don't have to think about the computer interface and can fully focus on what I'm doing.

## AeroSpace

On Linux there exists the distinction between Windows and MacOS style
mouse-driven "Desktop Environments" and keyboard-driven "Window Managers".
Usage of one of the many available window managers makes for a stellar native
experience.
On MacOS using "advanced" keyboard-driven window management was not intended by Apple and
is provided by one of multiple third-party packages that hacked it in.
This carries some unfortunate and unavoidable negative performance implications.

I chose [AeroSpace](https://nikitabobko.github.io/AeroSpace/guide) as my window management solution.
It fulfills my needs and provided me with a close equivalent to what is used on my Linux machine (i3.)

<details>
<summary>Why not use MacOS Spaces?</summary>

It's what I used prior.
While the experience is more polished, there are several flaws which make their usage frustrating.
Among their several shortcomings are:
- Fixed keybindings and the defaults use the unergonomic arrow keys.
- Workspaces are inconsistent. Fullscreening an app messes up the order. Workspace two will not always contain the same thing.
- Lack of features like splits, stack, move to workspace, all readily accessible via keybinds.
- Switching comes with an unavoidable animation. I want instant switching and that is just not possible.
- Lack of automation as described above.

</details>

### Demo

Here is my 2nd workspace, which is dedicated to the browser.

{{<figure alt="Fullscreen browser" src="demo-1.png">}}

I like only having one app (and window) open per workspace.
It's the least distracting arrangement and any app I need is only a short keypress away.

For the rare case that I need it, split screen windows are of course available.
The window resizing happens automatically, as soon as I open a new browser window.
(Vertical/horizontal splits can be toggled with <kbd>option+e</kbd>.)

{{<figure alt="Split screen browser" src="demo-2.png">}}

If we still want to keep both windows in the same workspace and have them be in fullscreen, we can switch to the
stacked (<kbd>option+s</kbd>) layout.

{{<figure alt="Stacked AeroSpace layout" src="demo-3.png">}}

(Return back to the split layout anytime with <kbd>option+e</kbd>.)

In workspace 5 I have my mail.
To switch to over I simply press <kbd>option+5</kbd>.

{{<figure alt="Fullscreen mail client" src="demo-4.png">}}

Let's say I want to view my email program and browser side by side.
I can easily move the mails over to workspace 2 with <kbd>option+shift+2</kbd> and then switch
to that workspace with <kbd>option+2</kbd>.

{{<figure alt="Both mail and browser together" src="demo-5.png">}}

To switch from one window to the other I use <kbd>option+j</kbd> and I can change the order with <kbd>option+shift+j</kbd>.
(<kbd>j/k</kbd> are up down, <kbd>h/l</kbd> are left right. If unintuitive, this is easily configurable.)

To resize use <kbd>option+r</kbd>.

{{<figure alt="Resized mail and browser together" src="demo-6.png">}}

All of these keybindings are arbitrary and just what I use.
They can be changed to your liking.
You could use another prefix (instead of <kbd>option</kbd>.)
You could use mnemonic workspace keys instead of 1..10, like b=browser,
t=terminal, m=mail, e=Emacs, etc.
Choose what fits you.

### Getting started

Install the app as per [official install
instructions](https://nikitabobko.github.io/aerospace/guide#installation).
If you have brew, do:
```sh
brew install --cask nikitabobko/tap/aerospace
```

Then put the config below into `~/.aerospace.toml` or
`~/.config/AeroSpace/aerospace.toml`.

If you don't know how:
- <a href="aerospace.toml" download>Download this file</a> as `aerospace.toml`.
- Open the Finder in the Downloads directory.
- Press <kbd>command+shift+.</kbd> to show hidden files.
- Rename the file to `.aerospace.toml` (i.e. add a leading dot ".") and confirm.
- Move the file `.aerospace.toml` into your home/user directory, in my case "jneidel".

```toml
# See help and documentation at: https://nikitabobko.github.io/aerospace/guide
# Note that the modifier "alt" is invoked by the "option" key.

### Configuration
start-at-login = true

# Mouse follows focus when focused monitor changes
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']

[mode.main.binding]
# change focus: option + h/j/k/l
alt-h = 'focus --boundaries-action wrap-around-the-workspace left'
alt-j = 'focus --boundaries-action wrap-around-the-workspace down'
alt-k = 'focus --boundaries-action wrap-around-the-workspace up'
alt-l = 'focus --boundaries-action wrap-around-the-workspace right'

# move window: option + H/J/K/L
alt-shift-h = 'move left'
alt-shift-j = 'move down'
alt-shift-k = 'move up'
alt-shift-l = 'move right'

# change layout
alt-s = 'layout v_accordion' # option + s = vertical tabs
alt-w = 'layout h_accordion' # option + w = horizontal tabs
alt-e = 'layout tiles horizontal vertical' # option + e = change between vertical and horizontal splits

alt-f = 'fullscreen' # option + f to toggle fullscreen
alt-space = 'layout floating tiling' # toggle between floating and regular window

# go to workspace
alt-1 = 'workspace 1'
alt-2 = 'workspace 2'
alt-3 = 'workspace 3'
alt-4 = 'workspace 4'
alt-5 = 'workspace 5'
alt-6 = 'workspace 6'
alt-7 = 'workspace 7'
alt-8 = 'workspace 8'
alt-9 = 'workspace 9'
alt-0 = 'workspace 10'

# send active window to to workspace
alt-shift-1 = 'move-node-to-workspace 1'
alt-shift-2 = 'move-node-to-workspace 2'
alt-shift-3 = 'move-node-to-workspace 3'
alt-shift-4 = 'move-node-to-workspace 4'
alt-shift-5 = 'move-node-to-workspace 5'
alt-shift-6 = 'move-node-to-workspace 6'
alt-shift-7 = 'move-node-to-workspace 7'
alt-shift-8 = 'move-node-to-workspace 8'
alt-shift-9 = 'move-node-to-workspace 9'
alt-shift-0 = 'move-node-to-workspace 10'

# interactively resize split
alt-r = 'mode resize'
[mode.resize.binding]
h = 'resize width -50'
j = 'resize height +50'
k = 'resize height -50'
l = 'resize width +50'
enter = 'mode main'
esc = 'mode main'
q = 'mode main'


# Move app windows to specific workspaces.
# My workspace assignment is the same as on Linux:
# Workspace 1: Emacs
# Workspace 2: Browser
# Workspace 3: Terminal
# Workspace 4: Communication
# Workspace 5: Misc

# You can find out the app id in Karabiner EventViewer or if the app
# is running using: $ aerospace list-apps

# uncomment to activate
# [[on-window-detected]]
# if.app-id = 'org.gnu.Emacs'
# run = ['move-node-to-workspace 1']

# [[on-window-detected]]
# if.app-id = 'org.chromium.Chromium'
# run = ['move-node-to-workspace 2']

# [[on-window-detected]]
# if.app-id = 'net.kovidgoyal.kitty'
# run = ['move-node-to-workspace 3']

# [[on-window-detected]]
# if.app-id = 'com.microsoft.teams2'
# run = ['move-node-to-workspace 4']

# [[on-window-detected]]
# if.app-id = 'com.apple.mail'
# run = ['move-node-to-workspace 5']
```

Then start the app.
Try a keybinding like <kbd>option+2</kbd> to confirm that it works.

You can make changes to the configuration file with your editior of choice and load those changes
through the AeroSpace icon on the task bar (the icon is a number of the current workspace.)

### Caveats

I already mentioned the performance implication inherit to MacOS's closed design.
AeroSpace is way slower than it's Linux counterpart.
This is annoying, but still much better than not using AeroSpace.

Sometimes you will displace a window.
You misclicked with the move command, your automatic rules moved the new window to an unexpected workspace or you it is hidden in a stack somewhere.
You will find that with practice it is easier to locate these missing windows.
Usually what happened was quite logical.
My recommendation would be to stay calm and do not fall back on the tools MacOS provides.
Mechanisms like the window selector (four fingers pinching inward) will not work well
and are ultimately an unnecessary crutch.

It is recommended that you back up the configuration file, so you don't lose them
when you migrate systems or lose the computer.
I do that through my [dotfiles](https://github.com/jneidel/dotfiles).

The above config uses <kbd>option</kbd> as it's prefix key.
That is AeroSpaces recommendation and probably fits for most people.
Personally I use the <kbd>command</kbd> key.

<details>
<summary>Why do I use command my prefix key?</summary>

I would not recommend this to non-hackers or hackers without specific requirements.

Command on Mac is used all over the place.
Mapping AeroSpace stuff to command could compromise keyboard shortcuts across
the OS or inside applications.
Doing this will require significant tinkering.

What makes it worth the effort to me is:
1. Super is my i3 window management prefix under Linux.
   Super and command are the same key on my external split keyboard.
   By using the exact same keybindings between MacOS and Linux I reduce the
   cognitive load of switching between them.
   (I also [remap <kbd>cmd+c</kbd> to <kbd>ctrl+c</kbd>](dev/consistent-keybindings-across-os) for the same reason.)
2. I want my window management to use a single key as my prefix.
   AeroSpace has a limited amount of prefix keys available: command, option,
   control, shift.
   Command is used by MacOS and various apps.
   Option and control are filled by Emacs binding (not a problem for most people.)
   Shift can't be used by itself.
   Other keys like fn or hyper are not available as prefixes.

</details>
<br>
<details>
<summary>My setup to use <kbd>command</kbd> as my prefix key</summary>

I use [Karabiner-Elements](https://karabiner-elements.pqrs.org/) to translate
<kbd>cmd+1</kbd> into <kbd>cmd+ctrl+alt+1</kbd>.
My AeroSpace configuration then binds "switch to workspace 1" to
<kbd>cmd+ctrl+alt+1</kbd>.
In the same way I translate <kbd>alt+1</kbd> to <kbd>cmd+1</kbd> to make the ability to navigate
to the first browser tab (<kbd>cmd+1</kbd>) and others available.

Here is my Karabiner config for translating command keybindings:
```json
{
    "description": "Map aerospace bindings to cmd",
    "manipulators": [
        {
            "from": {
                "key_code": "1",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "1",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "1",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "1",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "2",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "2",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "2",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "2",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "3",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "3",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "4",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "4",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "5",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "5",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "6",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "6",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "6",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "6",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "7",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "7",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "7",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "7",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "8",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "8",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "8",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "8",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "9",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "9",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "9",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "9",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "0",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "0",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "0",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "0",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "p",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": ["left_command", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "p",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": ["left_command", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "p",
                "modifiers": { "mandatory": ["command", "control"] }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": ["left_command", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "h",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "h",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "j",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "j",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "k",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "k",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "l",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "h",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "h",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "j",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "j",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "k",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "k",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": { "mandatory": ["command", "shift"] }
            },
            "to": [
                {
                    "key_code": "l",
                    "modifiers": ["left_command", "left_option", "left_control", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "f",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "f",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "s",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "s",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "w",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "w",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "e",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "e",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "r",
                "modifiers": { "mandatory": ["command"] }
            },
            "to": [
                {
                    "key_code": "r",
                    "modifiers": ["left_command", "left_option", "left_control"]
                }
            ],
            "type": "basic"
        }
    ]
}
```

You probably also want to take a look at the Karabiner config I use for
translating copy, paste, new tab, etc. to their Linux control/alt counterpart.
See [that article](dev/consistent-keybindings-across-os).

And here is the [AeroSpace config](https://github.com/jneidel/dotfiles/tree/master/.config/AeroSpace/AeroSpace.toml) I actually use:
```toml
# i3-like window management for MacOS.
# Source: https://nikitabobko.github.io/AeroSpace/goodies#i3-like-config

### On the prefix key.

# On Linux I use the super key as a prefix.
# Unlike control and alt/option it is unused by applications.
# MacOS makes heavy use of command (super), so there is no easy empty prefix key available.
# Since I want one a single prefix key, that can add shift as a modifier, I used Karabiner Elements
# to put MacOS's cmd+... stuff on control and alt, replicating the Linux commands and freeing the cmd
# to be used as the window management prefix.
# In my setup karabiner expands a cmd keypress to "cmd-ctrl-alt", which stuff is mapped to here.
# You may forgo the Karabiner translation layer and use another key combination as you prefix.


### Configuration
start-at-login = true

# Mouse follows focus when focused monitor changes
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']

[mode.main.binding]
# change focus: cmd + h/j/k/l
cmd-ctrl-alt-h = 'focus --boundaries-action wrap-around-the-workspace left'
cmd-ctrl-alt-j = 'focus --boundaries-action wrap-around-the-workspace down'
cmd-ctrl-alt-k = 'focus --boundaries-action wrap-around-the-workspace up'
cmd-ctrl-alt-l = 'focus --boundaries-action wrap-around-the-workspace right'

# move window: cmd + H/J/K/L
cmd-ctrl-alt-shift-h = 'move left'
cmd-ctrl-alt-shift-j = 'move down'
cmd-ctrl-alt-shift-k = 'move up'
cmd-ctrl-alt-shift-l = 'move right'

# change layout
cmd-ctrl-alt-s = 'layout v_accordion' # cmd + s = vertical tabs
cmd-ctrl-alt-w = 'layout h_accordion' # cmd + w = horizontal tabs
cmd-ctrl-alt-e = 'layout tiles horizontal vertical' # cmd + e = change between vertical and horizontal splits

cmd-ctrl-alt-f = 'fullscreen' # cmd + f to toggle fullscreen
# alt-shift-space = 'layout floating tiling' # 'floating toggle' in i3

cmd-ctrl-alt-1 = 'workspace 1'
cmd-ctrl-alt-2 = 'workspace 2'
cmd-ctrl-alt-3 = 'workspace 3'
cmd-ctrl-alt-4 = 'workspace 4'
cmd-ctrl-alt-5 = 'workspace 5'
cmd-ctrl-alt-6 = 'workspace 6'
cmd-ctrl-alt-7 = 'workspace 7'
cmd-ctrl-alt-8 = 'workspace 8'
cmd-ctrl-alt-9 = 'workspace 9'
cmd-ctrl-alt-0 = 'workspace 10'

cmd-ctrl-alt-shift-1 = 'move-node-to-workspace 1'
cmd-ctrl-alt-shift-2 = 'move-node-to-workspace 2'
cmd-ctrl-alt-shift-3 = 'move-node-to-workspace 3'
cmd-ctrl-alt-shift-4 = 'move-node-to-workspace 4'
cmd-ctrl-alt-shift-5 = 'move-node-to-workspace 5'
cmd-ctrl-alt-shift-6 = 'move-node-to-workspace 6'
cmd-ctrl-alt-shift-7 = 'move-node-to-workspace 7'
cmd-ctrl-alt-shift-8 = 'move-node-to-workspace 8'
cmd-ctrl-alt-shift-9 = 'move-node-to-workspace 9'
cmd-ctrl-alt-shift-0 = 'move-node-to-workspace 10'

# interactively resize split
cmd-ctrl-alt-r = 'mode resize'
[mode.resize.binding]
h = 'resize width -50'
j = 'resize height +50'
k = 'resize height -50'
l = 'resize width +50'
enter = 'mode main'
esc = 'mode main'
q = 'mode main'

# Move app windows to specific workspaces.
# The workspace assignment is the same as on Linux:
# Workspace 1: Emacs
# Workspace 2: Browser
# Workspace 3: Terminal
# Workspace 4: Communication
# Workspace 5: Misc

# You can find out the app id in Karabiner EventViewer or if the app
# is running using: $ aerospace list-apps
[[on-window-detected]]
if.app-id = 'org.gnu.Emacs'
run = ['move-node-to-workspace 1']

[[on-window-detected]]
if.app-id = 'org.chromium.Chromium'
run = ['move-node-to-workspace 2']

[[on-window-detected]]
if.app-id = 'net.kovidgoyal.kitty'
run = ['move-node-to-workspace 3']

[[on-window-detected]]
if.app-id = 'com.microsoft.teams2'
run = ['move-node-to-workspace 4']

[[on-window-detected]]
if.app-id = 'com.apple.mail'
run = ['move-node-to-workspace 5']
```

</details>

## Conclusion

I showed that what keyboard-driven window management can do for you and why it's well worth learning and using.
Using the provided minimal config you can get started right away.
