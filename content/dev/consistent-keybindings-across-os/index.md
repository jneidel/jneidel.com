---
title: "Consistent Keybindings Across Linux and macOS"
description: "MacOS and Linux have different keybindings in many places. This article provides an elegant solution to provide consistent keybindings across both operating systems."
summary: "And how to them set up"
tags:
- "macOS"
date: 2025-09-26
thumbnailAlt: "Consistent Keybindings Across Linux and macOS"
---

This article describes how I set up consistent keybindings between my Linux and macOS devices.
Basically, I adjust the macOS bindings with [Karabiner Elements](https://karabiner-elements.pqrs.org/) to mirror the Linux bindings.
I detail the approach and include my configs so you can replicate it.

{{<yt id="0jLmaq97zns">}}

## Why setup consistent keybindings?

I have two machines with different operating system.
Linux on my personal computer and MacOS on my work machine.

{{<figure src="machines.jpg" class="w-10/12" alt="My hardware">}}

For copy-paste and browser navigation there are many differences in the bindings not addressable at an OS/application level.
Even if you develop individual muscle memory for both sets of keybindings, a switch will always trip you up or slow you down.
Especially so if you connect the same external keyboard to both devices.
Ideally an external keyboard should work the same with both computers.
Copy-paste on the same key.
Open new browser tab on the same key.

## Solution concepts
A software solution is the clean way.
Options were 1) keyboard specific firmware ([QMK](https://docs.qmk.fm/)/[Vial](https://get.vial.today/manual/)) or 2) keycode translation software like [Xmodmap](https://wiki.archlinux.org/title/Xmodmap) and [Karabiner-Elements](https://karabiner-elements.pqrs.org/)) or a combination of 1) and 2).

The problem at hand is not just a "turn caps lock into control" kind of situation.
Specifically the macOS command key needs to be split up by capability.

An example: to copy you have macOSs <kbd>cmd-c</kbd> as <kbd>ctrl-c</kbd> on Linux, but to navigate to the first browser tab you use <kbd>cmd-1</kbd> and <kbd>alt-1</kbd> respectively.
On top of that I want to populate the now empty <kbd>cmd-1</kbd> to bring me to the first workspace of my [window manager](https://en.wikipedia.org/wiki/Window_manager).

### 1) Firmware: separate keyboard by OS
Reddit had some ideas about how to do this, namely building different layers for each OS into the keyboards firmware and [changing the default layer (`DF()`) depending on the environment](https://mafaried.wordpress.com/2021/12/29/qmk-support-for-mac-windows/).

It would work, but the downsides of the solution would be:
- mental overhead ("Am I in the right layer for this OS?")
- keyboard modification need to be (manually) synchronized between the layers
- does not apply to the laptop-internal keyboard
- capabilities might need their own keys, think OS-agnostic copy and paste buttons

Another thing I came up with was programming the left/right microcontroller differently and using one for Linux and the other for macOS.
This would have similar consequences as the approach above.

### 2) Translate keys on the Mac
[Karabiner Elements](https://karabiner-elements.pqrs.org/) is capable of doing the translations described above, e.g.:
- "alt-1" triggers "cmd-1"
- "cmd-1" triggers something to go to workspace 1

Karabiner Elements elegantly solves the problem at hand, without any of the downsides presented by the keyboard firmware solution.

The Linux machine stays the same and acts as the source to truth to be replicated.

## Solution implementation
With [Karabiner Elements](https://karabiner-elements.pqrs.org/) installed on the Mac, let's head to "Complex Modifications".

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
I use [aerospace for window management](guide/aerospace-window-management) on MacOS.
I wanted to mirror [my i3 config](https://github.com/jneidel/dotfiles/blob/master/.config/i3/config) as closely as possible.
The keycode sent by the macOS <kbd>command</kbd> key is the same as super on Linux.
After remapping the many of the macOS key combinations that utilize <kbd>command</kbd>, we can now add window management commands.

<kbd>command</kbd> is first converted to "meh" (<kbd>cmd-alt-ctrl</kbd>"), which I then use in my [`~/.config/aerospace/aerospace.toml`](https://github.com/jneidel/dotfiles/tree/master/.config/aerospace/aerospace.toml) to bind to actions:

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
    "description": "Map aerospace bindings to cmd (via meh)",
    "manipulators": [
        {
            "from": {
                "key_code": "1",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "1",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "1",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "1",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "2",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "2",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "2",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "2",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "3",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "3",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "4",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "4",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "5",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "5",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "6",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "6",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "6",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "6",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "7",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "7",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "7",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "7",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "8",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "8",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "8",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "8",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "9",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "9",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "9",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "9",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "0",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "0",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "0",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "0",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "p",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "3",
                    "modifiers": [
                        "left_command",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "p",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "4",
                    "modifiers": [
                        "left_command",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "p",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "control"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "5",
                    "modifiers": [
                        "left_command",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "h",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "h",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "j",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "j",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "k",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "k",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "l",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "h",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "h",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "j",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "j",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "k",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "k",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": {
                    "mandatory": [
                        "command",
                        "shift"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "l",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control",
                        "left_shift"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "f",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "f",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "s",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "s",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "w",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "w",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "e",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "e",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "r",
                "modifiers": {
                    "mandatory": [
                        "command"
                    ]
                }
            },
            "to": [
                {
                    "key_code": "r",
                    "modifiers": [
                        "left_command",
                        "left_option",
                        "left_control"
                    ]
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
]
```

## The next step
One does not have to stop there.
I use Emacs, which has keybindings like <kbd>ctrl-y</kbd> to paste that predate the convention of <kbd>ctrl-v</kbd>.
That creates another mental switch.
Emacs and other apps.
This difference can be eliminated with the same solution.
Using Emacs bindings everywhere.

This is [my karabiner config](https://github.com/jneidel/dotfiles/tree/master/.config/karabiner) for that on macOS (though it can be [much better](https://github.com/justintanner/universal-emacs-keybindings)):
<details>
<summary>Karabiner config for Emacs bindings everywhere</summary>

```json
{
    "global": { "check_for_updates_on_startup": false },
    "profiles": [
        {
            "complex_modifications": {
                "rules": [
                    {
                        "description": "Emacs bindings: Browser only",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "q",
                                    "modifiers": {
                                        "mandatory": ["control"],
                                        "optional": ["any"]
                                    }
                                },
                                "to": [
                                    {
                                        "key_code": "w",
                                        "modifiers": ["command"]
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                      "description": "Emacs bindings: common (cmd+f, c, v, x; not in Emacs/Terminal)",
                      "manipulators": [
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "b",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "left_arrow" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "f",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "right_arrow" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "p",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "up_arrow" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "n",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "down_arrow" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "e",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [
                            {
                              "key_code": "right_arrow",
                              "modifiers": ["command"]
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
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "v",
                            "modifiers": {
                              "mandatory": ["option"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "page_up" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "v",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "page_down" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "w",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [
                            {
                              "key_code": "x",
                              "modifiers": ["command"]
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
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "w",
                            "modifiers": {
                              "mandatory": ["option"],
                              "optional": ["any"]
                            }
                          },
                          "to": [
                            {
                              "key_code": "c",
                              "modifiers": ["command"]
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
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "z",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [
                            {
                              "key_code": "v",
                              "modifiers": ["command"]
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
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "d",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "delete_forward" }],
                          "type": "basic"
                        },
                        {
                          "conditions": [
                            {
                              "bundle_identifiers": [
                                "^net\\.kovidgoyal\\.kitty$",
                                "^com\\.apple\\.Terminal$",
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "k",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [
                            {
                              "key_code": "right_arrow",
                              "modifiers": ["command", "shift"]
                            },
                            {
                              "key_code": "x",
                              "modifiers": ["command"]
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
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "s",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [
                            {
                              "key_code": "f",
                              "modifiers": ["command"]
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
                                "^com\\.googlecode\\.iterm2$",
                                "^org\\.gnu\\.Emacs$"
                              ],
                              "type": "frontmost_application_unless"
                            }
                          ],
                          "from": {
                            "key_code": "g",
                            "modifiers": {
                              "mandatory": ["control"],
                              "optional": ["any"]
                            }
                          },
                          "to": [{ "key_code": "escape" }],
                          "type": "basic"
                        }
                      ]
                    },
                    {
                        "description": "Emacs Bindings: Terminal only",
                        "manipulators": [
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
                                    "modifiers": {
                                        "mandatory": ["option"],
                                        "optional": ["any"]
                                    }
                                },
                                "to": [{ "key_code": "page_up" }],
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
                                    "modifiers": {
                                        "mandatory": ["control"],
                                        "optional": ["any"]
                                    }
                                },
                                "to": [{ "key_code": "page_down" }],
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
                                    "key_code": "g",
                                    "modifiers": {
                                        "mandatory": ["control"],
                                        "optional": ["any"]
                                    }
                                },
                                "to": [{ "key_code": "escape" }],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                      "description": "Map aerospace bindings to cmd (via meh)",
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
                    },
                    {
                        "description": "Move common bindings from cmd to ctrl (r, t, z, T, l)",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^net\\.kovidgoyal\\.kitty$",
                                            "^com\\.apple\\.Terminal$",
                                            "^com\\.googlecode\\.iterm2$",
                                            "^org\\.gnu\\.Emacs$"
                                        ],
                                        "type": "frontmost_application_unless"
                                    }
                                ],
                                "from": {
                                    "key_code": "t",
                                    "modifiers": { "mandatory": ["control"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^net\\.kovidgoyal\\.kitty$",
                                            "^com\\.apple\\.Terminal$",
                                            "^com\\.googlecode\\.iterm2$",
                                            "^org\\.gnu\\.Emacs$"
                                        ],
                                        "type": "frontmost_application_unless"
                                    }
                                ],
                                "from": {
                                    "key_code": "t",
                                    "modifiers": { "mandatory": ["control", "shift"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^net\\.kovidgoyal\\.kitty$",
                                            "^com\\.apple\\.Terminal$",
                                            "^com\\.googlecode\\.iterm2$",
                                            "^org\\.gnu\\.Emacs$"
                                        ],
                                        "type": "frontmost_application_unless"
                                    }
                                ],
                                "from": {
                                    "key_code": "l",
                                    "modifiers": { "mandatory": ["control"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^net\\.kovidgoyal\\.kitty$",
                                            "^com\\.apple\\.Terminal$",
                                            "^com\\.googlecode\\.iterm2$",
                                            "^org\\.gnu\\.Emacs$"
                                        ],
                                        "type": "frontmost_application_unless"
                                    }
                                ],
                                "from": {
                                    "key_code": "r",
                                    "modifiers": { "mandatory": ["control"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^net\\.kovidgoyal\\.kitty$",
                                            "^com\\.apple\\.Terminal$",
                                            "^com\\.googlecode\\.iterm2$",
                                            "^org\\.gnu\\.Emacs$"
                                        ],
                                        "type": "frontmost_application_unless"
                                    }
                                ],
                                "from": {
                                    "key_code": "a",
                                    "modifiers": { "mandatory": ["control"] }
                                },
                                "to": [
                                    {
                                        "key_code": "a",
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
                                            "^com\\.googlecode\\.iterm2$",
                                            "^org\\.gnu\\.Emacs$"
                                        ],
                                        "type": "frontmost_application_unless"
                                    }
                                ],
                                "from": {
                                    "key_code": "z",
                                    "modifiers": { "mandatory": ["control"] }
                                },
                                "to": [
                                    {
                                        "key_code": "z",
                                        "modifiers": ["left_command"]
                                    }
                                ],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "Browser only: option+number -> cmd+number",
                        "manipulators": [
                            {
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "1",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "2",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "3",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "4",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "5",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "6",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "7",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "8",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "9",
                                    "modifiers": { "mandatory": ["option"] }
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
                                "conditions": [
                                    {
                                        "bundle_identifiers": [
                                            "^org\\.chromium\\.Chromium$"
                                        ],
                                        "type": "frontmost_application_if"
                                    }
                                ],
                                "from": {
                                    "key_code": "0",
                                    "modifiers": { "mandatory": ["option"] }
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
                    },
                    {
                        "description": "ö mod-tap hyper (via right_command)",
                        "manipulators": [
                            {
                                "from": {
                                    "key_code": "semicolon",
                                    "modifiers": { "optional": ["any"] }
                                },
                                "to": [
                                    {
                                        "key_code": "right_command",
                                        "modifiers": []
                                    }
                                ],
                                "to_if_alone": [{ "key_code": "semicolon" }],
                                "type": "basic"
                            }
                        ]
                    },
                    {
                        "description": "caps_lock -> control/return mod-tap",
                        "manipulators": [
                            {
                                "from": {
                                    "key_code": "caps_lock",
                                    "modifiers": { "optional": ["any"] }
                                },
                                "to": [{ "key_code": "left_control" }],
                                "to_if_alone": [{ "key_code": "return_or_enter" }],
                                "type": "basic"
                            }
                        ]
                    }
                ]
            },
            "name": "Default profile",
            "selected": true,
            "virtual_hid_keyboard": { "keyboard_type_v2": "iso" }
        }
    ]
}
```
</details>

On Linux I use [xremap](https://github.com/xremap/xremap) to achieve the same thing.
<details>
<summary>xremap config for Emacs bindings everywhere</summary>


[My `~/.config/xremap.yml`](https://github.com/jneidel/dotfiles/blob/master/.config/xremap.yml):
```yml
keymap:
  - name: Emacs
    application:
      not: [Emacs, Nyxt, kitty]
    remap:
      # Cursor
      C-b: { with_mark: left }
      C-f: { with_mark: right }
      C-p: { with_mark: up }
      C-n: { with_mark: down }
      # Forward/Backward word
      M-b: { with_mark: C-left }
      M-f: { with_mark: C-right }
      # Beginning/End of line or page
      # C-a: { with_mark: home }, C-x h does not work in input fields as a replacement
      C-e: { with_mark: end }
      Alt-KEY_102ND: { with_mark: home } # M-<
      Alt-Shift-KEY_102ND: { with_mark: end } # M->
      # Page up/down
      M-v: { with_mark: pageup }
      C-v: { with_mark: pagedown }
      # Copy & paste
      C-w: [C-x, { set_mark: false }]
      M-w: [C-c, { set_mark: false }]
      C-z: [C-v, { set_mark: false }]
      Super-z: [C-v, { set_mark: false }] # I use this accidentally all the time
      # Delete
      C-d: [delete, { set_mark: false }]
      M-d: [C-delete, { set_mark: false }]
      # Kill line
      C-k: [Shift-end, C-x, { set_mark: false }]
      # Kill word backward
      Alt-backspace: [C-backspace, {set_mark: false}]
      # Undo
      Alt-u: [C-y, { set_mark: false }] # not working
      # Mark
      C-space: { set_mark: true }
      C-x:
        remap:
          h: C-a # C-x h
      # Search
      C-s: C-f
      # Cancel
      C-g: [esc, { set_mark: false }]

  - name: Browser only
    application:
      only: [firefox, Brave-browser]
    remap:
      # Kill tab
      C-q: C-w
      C-x:
        remap:
          k: C-w # C-x k

  - name: Terminal
    application:
      only: [kitty]
    remap:
      # Page up/down
      M-v: { with_mark: pageup }
      C-v: { with_mark: pagedown }
      # Cancel
      C-g: [esc, { set_mark: false }]
      # Copy & paste are directly configured in kitty.conf
```
</details>


## Conclusions

I showed how I use Karabiner Elements for turning macOS keybindings into their Linux counterparts.
This is the most elegant solution for providing consistent keybinding across both platforms and can be adapted to your needs.

Enjoy :)

## References

- Karabiner Elements docs for [modifiers](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/modifiers/)
- Karabiner Elements docs for [application specific rules](https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/frontmost-application/)
- Going further and turning everything into [Emacs keybindings](https://github.com/justintanner/universal-emacs-keybindings)
