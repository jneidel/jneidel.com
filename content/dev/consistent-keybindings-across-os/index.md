---
title: "Consistent Keybindings Across Linux and MacOS"
description: "MacOS and Linux have different keybindings in many places. This article provides an elegant solution to provide consistent keybindings across both operating systems."
summary: "And how to them set up"
tags:
- "MacOS"
date: 2025-09-26
thumbnailAlt: "Consistent Keybindings Across Linux and MacOS"
---

This article describes how I set up consistent keybindings between my Linux and MacOS devices using [Karabiner Elements](https://karabiner-elements.pqrs.org/).
I detail the approach and include my configs so you can replicate it.
(While I have don't use Windows, the same solution approach applies.)

{{<yt id="0jLmaq97zns">}}

## Why setup consistent keybindings?

I have two machines with different operating system.
Linux on my personal computer and MacOS on my work machine.

{{<figure src="machines.jpg" class="w-10/12" alt="My hardware">}}

For copy-paste and browser navigation there are many differences in the bindings not addressible at an OS/application level.
Getting used to the different keybindings on MacOS was a huge pain, which could have been avoided had I set this up earlier.
But I didn't and now I already got the muscle memory for both sets of bindings using the laptop keyboards.
What prompted me to look into this was the new keyboard I built (seen in pic above.)

This external keyboard should work the same with both computers.
I should be able use the same keybindings to do the same things (copy-paste, window management, browser navigation).
Otherwise I would have another painful transition period in front of me.

## Solution concepts
I knew it would be a software solution.
Utilizing either the keyboards firmware ([QMK](https://docs.qmk.fm/)/[Vial](https://get.vial.today/manual/)), keycode translation software on the host ([Xmodmap](https://wiki.archlinux.org/title/Xmodmap), [Karabiner-Elements](https://karabiner-elements.pqrs.org/)) or a combination of the two.

The problem at hand is not just a "turn caps lock into control" kind of situation.
Specifically the MacOS command key needs to be split up by capability.
To demontrate: to copy you have MacOSs "cmd-c" as "ctrl-c" on Linux, but to navigate to the first browser tab you use "cmd-1" and "alt-1" respectively.
On top of that I want to populate the now empty "cmd-1" to act like "super-1" on Linux and bring me to the first window management workspace.

### Separate keyboard by OS
Reddit had some ideas about how to do this, namely building different layers for each OS into the keyboards firmware and [changing the default layer (`DF()`) depending on the environment](https://mafaried.wordpress.com/2021/12/29/qmk-support-for-mac-windows/).

It would work, but the downsides of the solution would be:
- mental overhead ("Am I in the right layer for this OS?")
- keyboard modification need to be (manually) synchronized between the layers
- can't apply it to the laptop-internal keyboard
- capabilities might need their own keys, think OS-agnostic copy and paste buttons

Another thing I came up with was programming the left/right microcontroller differently and using one for Linux and the other for MacOS.
This would have similar consequences as the approach above.

### Translate on the Mac
[Karabiner Elements](https://karabiner-elements.pqrs.org/) is capable of doing the translations described above, e.g.:
- "alt-1" triggers "cmd-1"
- "cmd-1" triggers something to go to workspace 1

Doing it with Karabiner Elements elegantly solves the problem at hand, without any of the downsides presented by the keyboard firmware solution.

The Linux machine stays the same and acts as the source to truth to be replicated.

## Solution implementation
I don't have to change anything about my keyboard layout.
The MacOS command key will be invoked by the GUI keycode that registers as super on linux.

With [Karabiner Elements](https://karabiner-elements.pqrs.org/) installed on the Mac, head to "Complex Modifications".

### Copy-paste
Most obviously I want copy, paste and cut to work (ctrl-c, ctrl-v, ctrl-x.)

Bascially that would look like the below.
Translate the keypress "ctrl-c" to "cmd-c".

```json
      {
           "from": {
                "key_code": "c",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "c",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
      }
```

If you look at my whole config below, you will see that I do more than that.
"ctrl-c" is used to interrupt the current process in the terminal.
To preserve it in the terminal I add an exception and an additional rule that adds: "ctrl-shift-c" to "cmd-c" for inside a terminal
([relevant docs](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/frontmost-application/).)

Also the modifiers include a left/right prefix, so I add a copy that triggers for all the modifiers combinations I use.

<details>
<summary>Full config for copy-paste functionality</summary>

```json
{
    "description": "Enable copy-paste on ctrl (shift-ctrl in the terminal)",
    "manipulators": [
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_unless"
                }
            ],
            "from": {
                "key_code": "c",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "c",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_unless"
                }
            ],
            "from": {
                "key_code": "c",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "c",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "c",
                "modifiers": { "mandatory": ["right_control", "left_shift"] }
            },
            "to": [
                {
                    "key_code": "c",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "c",
                "modifiers": { "mandatory": ["left_control", "left_shift"] }
            },
            "to": [
                {
                    "key_code": "c",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_unless"
                }
            ],
            "from": {
                "key_code": "v",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "v",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_unless"
                }
            ],
            "from": {
                "key_code": "v",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "v",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "v",
                "modifiers": { "mandatory": ["right_control", "left_shift"] }
            },
            "to": [
                {
                    "key_code": "v",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "bundle_identifiers": [
                        "^net\\.kovidgoyal\\.kitty$",
                        "^com\\.apple\\.Terminal$",
                        "^com\\.googlecode\\.iterm2$"
                    ],
                    "type": "frontmost_application_if"
                }
            ],
            "from": {
                "key_code": "v",
                "modifiers": { "mandatory": ["left_control", "left_shift"] }
            },
            "to": [
                {
                    "key_code": "v",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "x",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "x",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "x",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "x",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        }
    ]
}
```
</details>

### Browser navigation
One of my most widely used applications, the browser, has terrible keybinding customization.
Both chromium and firefox have their built-in keybindings (which differ between OSs) that are pratically unchangable.
At least they are consistent between the two browser families :slightly_smiling_face:

I translate:
- Reload ("ctrl-r")
- New tab ("ctrl-t")
- Close tab ("ctrl-w")
- Focus address bar ("ctrl-l")
- Focus n-th tab ("alt-1,2,3,…")

<details>
<summary>Full config for browser navigation</summary>

```json
{
    "description": "Match Linux browser navigation",
    "manipulators": [
        {
            "from": {
                "key_code": "t",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "t",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "t",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "t",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "t",
                "modifiers": { "mandatory": ["right_control", "left_shift"] }
            },
            "to": [
                {
                    "key_code": "t",
                    "modifiers": ["left_command", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "t",
                "modifiers": { "mandatory": ["left_control", "left_shift"] }
            },
            "to": [
                {
                    "key_code": "t",
                    "modifiers": ["left_command", "left_shift"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "w",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "w",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "w",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "w",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "l",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "l",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "r",
                "modifiers": { "mandatory": ["left_control"] }
            },
            "to": [
                {
                    "key_code": "r",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "r",
                "modifiers": { "mandatory": ["right_control"] }
            },
            "to": [
                {
                    "key_code": "r",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "1",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "1",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "2",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "2",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "3",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "4",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "5",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "6",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "6",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "7",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "7",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "8",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "8",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "9",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "9",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "0",
                "modifiers": { "mandatory": ["left_option"] }
            },
            "to": [
                {
                    "key_code": "0",
                    "modifiers": ["left_command"]
                }
            ],
            "type": "basic"
        }
    ]
}
```
</details>

### Window management
I recently discovered [Aerospace](https://nikitabobko.github.io/AeroSpace/guide) for window management on MacOS.
It's much worse than [i3](https://i3wm.org/) on Linux, but better than MacOS spaces, so I use it :shrug:.
I have it mirror [my i3 config](https://github.com/jneidel/dotfiles/blob/master/.config/i3/config) as closely as possible (command = super):
- Switch to n-th workspace ("cmd-1,2,3,…")
- Move window to n-th workspace ("cmd-shift-1,2,3,…")
- more to come


I'm translating these to "cmd-alt-ctrl", which I then use in my [`~/.config/aerospace/aerospace.toml`](https://github.com/jneidel/dotfiles/tree/master/.config/aerospace/aerospace.toml) to define the actions:

```toml
cmd-ctrl-alt-1 = 'workspace 1'
cmd-ctrl-alt-2 = 'workspace 2'
# …

cmd-ctrl-alt-shift-1 = 'move-node-to-workspace 1'
cmd-ctrl-alt-shift-2 = 'move-node-to-workspace 2'
# …
```

<details>
<summary>Full config for window management</summary>

```json
{
    "description": "Map aerospace bindings to cmd",
    "manipulators": [
        {
            "from": {
                "key_code": "1",
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "1",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "2",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "3",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "4",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "5",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "6",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "7",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "8",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "9",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "key_code": "0",
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command"] }
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
                "modifiers": { "mandatory": ["left_command", "left_shift"] }
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
                "modifiers": { "mandatory": ["left_command", "right_shift"] }
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
                "modifiers": { "mandatory": ["left_command", "right_control"] }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": ["left_command", "left_shift"]
                }
            ],
            "type": "basic"
        }
    ]
}
```
</details>


### Restrict translations to external keyboards
The configurations I supplied above apply the translation not only to any externally plugged-in keyboards, but also to the internal laptop keyboard.

If you only want it to affect external ones, you can add this restrictive condition to every rule:

```json
            "conditions": [
                {
                    "identifiers": [
                        { "is_built_in_keyboard": true },
                        { "vendor_id": 76 }
                    ],
                    "type": "device_unless"
                }
            ],
```

## Conclusions

I feel that using Karabiner Elements for turning MacOS keybindings into their Linux counterparts represents the most elegant solution for providing consistent keybinding accross both platforms.

Above I described my use-cases, but the technique can be applied to any other keybinding you might run into.

Enjoy :)

## References

- Karabiner Elements docs for [modifiers](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/modifiers/)
- Karabiner Elements docs for [application specific rules](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/frontmost-application/)
- Going further and turning everything into [Emacs keybindings](https://github.com/justintanner/universal-emacs-keybindings)
