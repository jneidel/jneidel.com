---
title: "Utilizing git rebase for a clean commit history"
description: "Understanding how rebasing works, what the actually useful commands are and what configuration is necessary to make git rebase easier to use."
summary: "Everything I know about git rebase."
tags:
    - git
date: 2025-04-18
thumbnailAlt: "Figure named git standing on a messy desk in front of a monitor"
writingTime: 205
---

This article describes how I do use git rebase to maintain a clean commit
history in my projects.
With this manipulating your git history will become second nature.

A working knowledge of git in the terminal is assumed.

## Definitions

When I say "a clean commit history", what do I mean?
To me, a clean history contains:
- [well described](https://chris.beams.io/posts/git-commit) commit messages
- no superfluous commits (a là "fix conflicts", "fix linting")
- no merge commits

Rebasing by itself does not achieve these goals, but without the tool it
will be hard to address them.

An example of a clean history:

{{<figure src="./clean.png" class="w-11/12" alt="<++>">}}

An example of a messy history:

{{<figure src="./messy.png" class="w-11/12" alt="<++>">}}


_Both screenshots were taken of `git log --oneline --graph --decorate` (my
prefered log style.)_

## Avoid merge commits

To not clutter up the history with useless merge commits:
1. We don't create merge commits when merging a pull request.
2. We don't create merge commits locally.

The first is configure where ever your repo is hosted or by selecting the
correct option on the "merge" button:

{{<figure src="./github-merge-options.png" class="w-12/12" alt="Merge options on Github" caption="The merge options on Github.">}}

I use the rebase pull strategy, to not create merge commits while pulling in
changes from a remote or when fixing conflicts.
It is set up like this:

```sh
git config --global pull.rebase true
```

## Implications of rebasing

A commit history contains a sequence of commits.
Each commit is identified by a hash over it's contents.

When we use `git rebase`, we rewrite that history.
The order of commits might be changed.
The contents or description of a commit might be altered.
Thus their identifiers (hashes) change.

The result is a history incompatible with the remote server you might have
pulled from.
To use our version of the history, we have to overwrite what is on the
server.
We `git push --force`.
Better yet, we use `git push --force-with-lease` to make sure we are not
overwriting the work of someone else, who has pushed in the meantime.

## Interactive rebase

You have probably seen this long list of available commands in an
interactive rebase session:

{{<figure src="./rebase-menu.png" class="w-11/12" alt="Rebase menu with all commands listed">}}

Half of those I have _never_ used.
What I do is:
- [Remove a commit](#remove-commits) with "drop"
- [Change a commit](#change-commits); to "reword" the commit message or "edit" the contents
- [Combine commits](#combine-commits) together with "squash"
- [Reorder commits](#reorder-commits) by moving a line up or down

<details>
<summary>A word on aliases</summary>

I strongly recommend that you set up your own (shell[^git-aliases]) aliases for these
commands, if you haven't.
[Here are mine.](https://github.com/jneidel/dotfiles/blob/master/.zsh/git.zsh)

They create a great user experience.
Type `gri` instead `git rebase -i`.
In this article I use the full forms of commands for you to copy, but in
real use I have aliases for _all_ of them.

Aliases allow you to configure your preferences.
I like my `git status` with `-sb`, but I don't have to remeber those flags,
because my alias contains them.

[^git-aliases]: You can use shell aliases, but you can also use aliases
defined in git.
A shell alias for `git log` could be `gl` and a git alias `git l`.
<br>
A git alias can be defined like this: `git config --global alias.l 'log --oneline'`.
[Here is my config file.](https://github.com/jneidel/dotfiles/blob/master/.config/git/config)
</details>

### Get into a rebase

The common method to start an interactive rebase is: `git rebase -i COMMIT_HASH`.
This includes all commits up-to, but not including the referenced commit.
To have the rebase include a specific commit, we need to use the hash of the
previous commit (N+1).

{{<figure src="./get-into-rebase.png" class="w-10/12" alt="Picking the correct commit hash to get into a rebase" caption="<span style='color: red'>In red:</span> the commit we want to rebase.<br><span style='color: lime'>In green:</span> the commit hash we need to use.">}}

Most of the time, it's good enough for me to just get a rebase with the last
N commits.
Then I don't need to check the `git log`.
Should the commit I'm looking for not be included, I can quickly exit and
increase the N.

With my aliases I do this to rebase the 5 most recent commits: `gri H5`.

```zsh
# in zsh config
alias gri="git rebase -i"
for i in $(seq 0 10); do
  alias -g H$i="HEAD~$i"
done
# global aliases (-g), might be unavailable in other shells
```

### Remove commits

Change "pick" (aka keep this commit) to a "drop" to remove it from the
history.

{{<figure src="./drop.png" class="w-7/12" alt="Example for drop command">}}

### Change commits

You can either "edit" the contents of a commit (including the commit message) or just the commit message with "reword".

Here is what happens on "edit":

{{<figure src="./edit.png" class="w-10/12" alt="Edit a commit">}}

To make amending easier I have aliases for amending with or without
modifying the commit message ("no-edit"):

```sh
alias amend="git commit --amend"
alias amendd="git commit --amend --no-edit"
alias addam="git add -A; git commit --amend --no-edit"
```

I also recommended to also have aliases for `git rebase --continue` and
`--abort` to be able to easily weave through these rebase steps.

### Combine commits

Use "squash" to combine multiple commits into one.

{{<figure src="./squash.png" class="w-7/12" alt="Squash command in action">}}

The commit marked with "squash" will be merge into the commit visibly above
it.
Commits are listed in chronological order (oldest at the top.)
That is why the squash command descriptions says "meld into previous commit"
("previous commit" being the one above.)

{{<figure src="./squash-error.png" class="w-7/12" alt="" caption="Vim highlights that the commit at the top can't be squashed (because no previous commits are available above.)">}}

After a squash you will get a prompt to rewrite the commit message for the
new combined commit.

### Reorder commits

To change the order of commits, simply move the line up or down:

{{<center>}}
    {{<figure src="./reorder-before.png" class="w-12/12" alt="Before reordering">}}
    {{<figure src="./reorder-after.png" class="w-12/12" alt="After reordering">}}
{{</center>}}

### Automatic stashing

If you have uncommitted local changes, git will usually not allow you to start a rebase.
It asks you to commit or stash your changes.
I found myself constantly stashing and unstashing my changes before and
after a rebase.

Git can do this automatically for you:

```sh
git config --global rebase.autostash true
```

See `man git-config` under `autostash` for more information.

### Oh No, something went wrong

In case anything goes wrong with your rebase, `git reflog` is your friend.
You can revert your actions (e.g. go back to before the rebase) with `git
reset --hard`, just like you are used to with commits.

## Fixup

Fixup it is like amend for a commit that is further down in the history
(amend works on the most recent commit.)

I don't use the "fixup" command provided in a interactive rebase session.
Instead I wrote a script for myself, that works similar to my `amend` alias.
I say which commit I want to "fixup" and the script does the rest.

{{<figure src="./fixup-demo.png" class="w-12/12" alt="Fixup demo" caption="Simple usage of the fixup script.">}}

<br>
{{<details summary="Code for the script">}}

In your zsh config:

```zsh
gri() {
  hash=$1
  if [[ "$hash" =~ "\+$" ]]; then # matches "HASH+"
    echo "Using the commit hash prior to the one given: $prevHash"
    git rebase -i $prevHash
  else
    git rebase -i "$@"
  fi
}

gcff() { # fast fixup
  hash=$1
  git commit --fixup $hash
  GIT_SEQUENCE_EDITOR=: gri $hash+
}
```

To have the fixup automatically be applied when running `git rebase -i`,
this setting is needed:

```sh
git config --global rebase.autosquash true
```

See `man git-rebase` under `autosquash` for more information.

{{</details>}}

[This is a good article](https://mikulskibartosz.name/git-fixup-explained) to understand how fixup works.
(Not needed if you just want to use the
above script.)

## Conclusions

With this, you should have all the tools available to you to manipulating
your git history at will.
