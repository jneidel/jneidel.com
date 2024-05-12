---
title: More easily collect feedback on your blog
description: How I collect typos and corrections using Netlify Drawer and Github.
summary: Overview of the ways I optimized feedback collection for blog.
tags:
    - blog
date: 2024-05-11
thumbnailAlt: Cute mailbox for collecting feedback
writingTime: 120
---

So I have this website.
I will necessarily include errors.
If somebody spots an error I would like to make it easy for them to help me
fixing it.

I would categorize people that want to help into the categories of:
1. **Known vs unknown**: if the person knows the author directly
2. **Technical vs non-technical**: if the person is capable of editing the source and submitting a patch

If you don't provide people who are willing to help with another option they will communicate
change requests through these communication channels:

| | Unknown | Known |
|-|:-:|:-:|
| **Non-technical** | Email | Email or private messenge |
| **Technical** | Email | Email or private messenge |

## The issue with email

It's better than nothing, but a few problems will crop up:

1. People have to leave the website to write and email or take notes.
2. Corrections will be inconsistent or have information (where) missing.
3. Visual defects hard to describe through just text.
4. Missed opportunity for technical people to make the correction for you.

We can do better than that.

## Overview of solutions

Lets go through what we can do for each type of person:

1. **Unknown, non-technical** person: They are the class least likely to be
   interested in helping and it's hardest to set something up for them.
2. **Known, non-technical** person: Much more willing to help and we can
   provide them with a tool that doesn't need anonymous access.
3. **Technical** person: The most likely to want to help out.
   Give them an easy way to submit a patch.

This gets me this generic version of the table:

| | Unknown | Known |
|-|:-:|:-:|
| **Non-technical** | Email | Tool |
| **Technical** | Submit a patch | Submit a patch |

The concrete solutions I have implemented are detailed below.
How hard or easy they are for you to adopt depends entirely on your setup.
But there might be comparable variants in whatever you are using.
Even if you can not make use of them directly the principles will be the same.

These are the solutions that I am using and will detail below:

| | Unknown | Known |
|-|:-:|:-:|
| **Non-technical** | Email | [Netlify Drawer](#netlify-drawer) |
| **Technical** | [Edit on Github button](#edit-on-github) | [Edit on Github button](#edit-on-github) or [Netlify Drawer](#netlify-drawer) |

## Netlify Drawer

This solution depends on your site being hosted on [Netlify](https://netlify.com).

### How does it work?

You have a UI element at the bottom of the page that you can expand to reveal a
form through which to send in corrections via text, point out visual mistakes
via screenshots or record video for interactions[^readmore]. Here are some screenshots:

{{<figure alt="Netlify drawer at the bottom of the page" src="netlify-drawer-bottom.png" caption="The drawer on the bottom of a page.">}}

{{<figure alt="Example of the expanded Netlify drawer" src="netlify-drawer-example.png" caption="Submit a correction through the expanded drawer.">}}

Make sure to assign an epic, so the owner will be notified:

{{<figure src="netlify-drawer-assign-epic.png" class="w-8/12" alt="Netlify Drawer epic dropdown">}}

And that's it from the user perspective. They just send of their report and
close the drawer.
As the operator I get this email with all the info I need to fix the reported
issue:

{{<figure src="./email-notification-shortcut.jpg" class="w-8/12" alt="Email from Shortcut notifying me of an issue">}}

[^readmore]: You can read more about it in [Netlify's docs](https://docs.netlify.com/site-deploys/collaborate-on-deploys/).

### Setup

These are the steps:
1. [Setup a parallel site with the Netlify Drawer activated](#1-setup-a-parallel-site-with-the-netlify-drawer-activated)
1. [Create a reviewer Netlify account](#2-create-a-reviewer-netlify-account)
1. [Create two Shortcut accounts](#3-create-two-shortcut-accounts)
1. [Configure Shortcut accounts](#4-configure-shortcut-accounts)
1. [Configure Netlify reviewer account](#5-configure-netlify-reviewer-account)

#### 1. Setup a parallel site with the Netlify Drawer activated

We don't want to active the Netlify Drawer on production.
So we need a parallel site that updates whenever production does, but has the
Netlify Drawer enabled.
So go to Netlify and:
- Create a new site
- Supply the same repo as build source
- (Optional: Change the build command -> I also made drafts visible.)
- Under "Branches and deploy contexts" set the production branch to "none" or
something invalid and add your main branch under "Branch deploys" (Netlify
Drawer only works on Branches, not prod)
- Scroll down to "Collaboration tools" and make sure it is enable on branch
deploys

Now whenever you deploy your project you will get a secondary deployment with
Netlify Drawer enabled. The working link will be branch + site name like this:

```txt
https://master--jneidel-stage.netlify.app
```

#### 2. Create a reviewer Netlify account

We want to have a reviewer account whose credentials we can just pass along to
all our reviewers.
So let's create a new account for that.
It's easiest if you start by inviting them as a reviewer to your team under "Team
\> Members \> Reviewers \> Add Reviewer."
Then just sign-up.

#### 3. Create two Shortcut accounts

Head over to [Shortcut](https://www.shortcut.com) to first create an account for
yourself.
If you sign-up with an email from [Kill the Newsletter](https://kill-the-newsletter.com)
you can get all communication (i.e. future notifications of changes) in an RSS
feed.
After sign-up, invite the reviewer account to your shortcut team.
Go through their sign-up flow as well.

#### 4. Configure Shortcut accounts

While on your main account, go into "Settings \> Notifications" and enable "Most
Events."
Then select the "Epics" section in the sidebar under "Teams \> All Work" and
create a new epic for your reviewers to create issues in. Assign yourself as
owner so you will be notified of new issues being created.

While on the secondary reviewer account, go into "Settings \> API Tokens" create
a new one and save it for the next step.

#### 5. Configure Netlify reviewer account

Open your secondary Netlify deployment, open the drawer and log in with the
Netlify reviewer account.
Go into integrations and connect to Shortcut by pasting in the API Token for the
Shortcut reviewer account created in the last step.

#### 6. Profit

Now everything is setup and you can pass the Netlify reviewer credentials and
the secondary deployment link along to your reviewers.
You will be notified of their reports via email.

## Edit on Github

This requires your blog sources to be hosted publicly.
In my case that is on [Github](https://github.com/jneidel/blog).

### How does it work?

I have a button at the top of the page that leads to the markdown source file of
that page.

{{<figure src="./edit-on-github-button.png" class="w-9/12" alt="A title on my website with the edit on github button highlighted">}}

That buttons leads to:

```txt
https://github.com/jneidel/blog/blob/master/content/guide/collect-blog-feedback/index.md
```

Where the user can now edit the page and submit a pull request.

### Setup

You need to find a ways to generate and embed the link the source file into the
page.
That is something my [hugo](https://gohugo.io) theme ([congo](https://jpanther.github.io/congo)) does for me.
I just supply this config:

```toml
[params.article]
    showEdit = true
    editURL = "https://github.com/jneidel/blog/tree/master/content/"
    editAppendPath = true
```

## Conclusions

If come across problems on this website feel to use the edit button below the
title or let me know via [email](mailto:corrections@jneidel.com) :slightly_smiling_face:
