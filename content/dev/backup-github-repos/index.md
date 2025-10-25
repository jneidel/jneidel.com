---
title: "Automatic Backups of my GitHub Repositories"
description: "How I setup automated backups for my GitHub repositories using gickup."
tags:
- backups
date: 2025-10-25
thumbnailAlt:
excludeRss: false
writingTime:
---

I have all of my code on GitHub.
Microsoft could at any time decide to [just ban me](https://www.youtube.com/watch?v=7gCCXCSs734) and I would loose access to it all.
It unlikely, but it could happen.

There are many obvious solutions to this:
1. take my code to a more trustworthy vendor
2. self-host my git
3. backup/mirror github repositories


For the moment I went with the backup option.

## Requirements

Backups should happen automatically, for every repo in my account.
I don't want to think about it.

## Setup

I picked the tool [gickup](https://github.com/cooperspencer/gickup) for the job.
I have it running on my homeserver, so the repos are part of it's [backup scheme](guide/backups).

I installed the [latest release](https://github.com/cooperspencer/gickup/releases):
```sh
wget https://github.com/cooperspencer/gickup/releases/download/v0.10.39/gickup_0.10.39_linux_386.tar.gz
tar -xzf gickup_0.10.39_linux_386.tar.gz
```

Created and tested the config ([docs](https://cooperspencer.github.io/gickup-documentation/)):
```yaml
# gickup.yml
source:
  github:
    - user: jneidel
      token: github_pat_...
      issues: true
      filter:
        excludeforks: true
destination:
  local:
    - path: /root/backup/github-repos
      bare: true
```

Invoke with `gickup gickup.yml`.

For authentication I created a [personal access token](https://github.com/settings/personal-access-tokens) with the permissions shown below.
I tried using my git ssh key, which worked for cloning, but ran into API rate limits.
The token is more secure also, since it's read-only.

{{<figure src="github-pat.png" class="w-12/12" alt="Permissions for the github personal access token">}}

I want this to run once a week, so I setup execution with cron: [`0 16 * * 0`](https://crontab.guru/#0_16_*_*_0).

## Conclusions

The one-time setup was easier than expected.
It does not require maintenance so I don't have to think about this again.
