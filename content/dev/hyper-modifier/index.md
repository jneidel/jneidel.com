---
title: "Add Hyper Modifier Key for Emacs on Linux"
description: "How and why to set up the hyper modifier key for usage in Emacs on Linux under Xorg using kmonad and Xmodmap."
summary: "How and why to set it up for yourself."
tags:
- emacs
- linux
- xorg
date: 2025-08-16
thumbnailAlt:
writingTime:
---

Modern keyboards don't include a [hyper key](https://en.wikipedia.org/w/index.php?title=Hyper_key) anymore.
Emacs still supports it and here is how and why to add it.

## What make adding a hyper key useful?

Emacs only has so many [modifier keys](https://www.gnu.org/software/emacs/manual/html_node/emacs/Modifier-Keys.html).
Control and meta are heavily used by the default Emacs keybindings.
Super is already filled with my window managers bindings.
Leaves only the alt and hyper modifiers, for which I don't have keys on my
laptop.

Using one of these two empty modifier keys allows me to add a lot of
directly accessible keybindings in an unobstrusive way.
`C-x …` is fine for most commands, but what I use all the time I want more
directly accessible, like `H-b` for buffer selection.
And especially commands that repeat, like `undo` don't work well with
non-modifier prefixes like `C-x`, because you can't keep holding it
throughout.

## Add your own hyper key

What you are going to need is: 

**A key you don't care about.**
I picked "End".
It can even be a key that does not exist on your keyboard, like "F13".

**An easy to reach key you want to turn into "Hyper".**
I picked "ö".
On my german keyboard this is on the home row under my right pinkie.
You will not loose this key.
On tap it will work as normal, only on hold will it turn into "Hyper".

In the configuration below I will reference the keys that I chose.
Just replace them with the keys of your choosing when you set this up.

### The tools and the logic

I use [kmonad](https://github.com/kmonad/kmonad) for outputing different
keys when I (1.) press a key or (2.) hold it for 200ms.
This is technique is called "mod tap".

The only problem with kmonad is, that it [doesn't know the hyper key](https://github.com/kmonad/kmonad/issues/22).
The way we get around this is by having kmonad output a key that we don't
care about ("End" in my case) and turning that into "Hyper" with [Xmodmap](https://wiki.archlinux.org/title/Xmodmap).

### Implementation

`~/.config/kmonad/mod-tap-mappings.kbd`
```config
(defcfg
  input  (device-file "/dev/input/by-path/platform-i8042-serio-0-event-kbd")
  output (uinput-sink "kmonad-output")

  ;; tell KMonad to let unconfigured keys act normal
  fallthrough true
)

(defsrc
  semicolon ;; this is the evdev version of ö
)

(defalias
  ;; ö mod-tap: tap = ö (semicolon), hold = hyper (end)
  ö_hyper (tap-hold-next 200 semicolon end)
  ;; end will be transformed into hyper by xmodmap
)

(deflayer base
  @ö_hyper
)
```

Now run `sudo kmonad ~/.config/kmonad/mod-tap-mappings.kbd &`

`~/.config/Xmodmap`
```xmodmap
! unmap Num_Lock as a modifier
! see modifier mappings: $ xmodmap -pm
remove mod2 = Num_Lock

! have End key output Hyper instead
! see keycodes: $ xmodmap -pke
! mapping both for good measure 🙂
keycode 115 = Hyper_R
keycode 87  = Hyper_R

! activate Hyper as a modifer key
add    mod2 = Hyper_R
```

Now run `xmodmap ~/.Xmodmap`

You can now test that your newly-added hyper key works in Emacs:
```elisp
(use-package consult
  :ensure t
  :bind ("H-b" . consult-buffer))
```

The last thing is to configure this to run at startup.
Observe the order of execution, as it is matters.
Add this to your autostart script, in my case `~/.xinit`
```sh
# ö mod-tap: tap = ö, hold = hyper
sudo kmonad ~/.config/kmonad/mod-tap-mappings.kbd &
sleep 3s && xmodmap ~/.Xmodmap &
```

Enjoy :slightly_smiling_face:

## References

The [issue on the kmonad Github](https://github.com/kmonad/kmonad/issues/22)
contains more details if you want to dive deeper.
