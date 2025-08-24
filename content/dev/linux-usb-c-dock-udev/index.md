---
title: "Run script on USB-C Dock connect/disconnect under Linux"
description: "How to setup udev rules under Linux to run a script on plugging in/unplugging a USB-C Dock."
summary: "How to setup the udev rules."
tags:
- linux
date: 2025-08-24
thumbnailAlt:
writingTime:
---

I have a USB-C dock with my monitor, speakers, ethernet, etc.
I'm running GNU/Linux and I want to run some scripts when the dock is
plugged in or unplugged.
Here is how to write the udev rules and script to make that happen.

TL;DR: short [demo](#demo), my [udev rules](#my-rules), my [script](#the-script-to-run)

## Udev rule to match device

To detect when devices are added (plugged-in) or removed (unplugged) we use
udev.

Like this you can see what kind of devices are being added and removed when
you do a certain action, like unplugging the dock:

```sh
# to monitor device changes
udevadm monitor --environment --udev >udev-unplug
# now unplug your device
# ^C to stop monitor
less udev-unplug
# explore logs
```

The first entry is already what I want:

```
UDEV  [12639.852887] remove   /devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2.2/1-2.2:1.0 (usb)
ACTION=remove
DEVPATH=/devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2.2/1-2.2:1.0
SUBSYSTEM=usb
DEVTYPE=usb_interface
PRODUCT=17ef/3060/0
TYPE=0/0/0
INTERFACE=17/0/0
MODALIAS=usb:v17EFp3060d0000dc00dsc00dp00ic11isc00ip00in00
SEQNUM=7716
USEC_INITIALIZED=12618475392
ID_VENDOR_FROM_DATABASE=Lenovo
ID_MODEL_FROM_DATABASE=ThinkPad Dock
ID_PATH_WITH_USB_REVISION=pci-0000:00:14.0-usbv2-0:2.2:1.0
ID_PATH=pci-0000:00:14.0-usb-0:2.2:1.0
ID_PATH_TAG=pci-0000_00_14_0-usb-0_2_2_1_0
```

`ID_MODEL_FROM_DATABASE=ThinkPad Dock` identifies it as my dock.

The udev rule that matches this criteria would be:

```
ACTION=="remove", ENV{ID_MODEL_FROM_DATABASE}=="ThinkPad Dock", RUN+="/home/jneidel/scripts/dock disconnect"
```

Add this rule and reload udev:
```sh
sudo vim /etc/udev/rules.d/thinkpad-dock.rules
# add rule and exit
sudo udevadm control --reload-rules
```

To check that the rules matches, you take the `DEVPATH` from the above
monitor log entry and run:

```sh
udevadm test --action=remove <DEVPATH>
# the DEVPATH looks like this: /devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2.2/1-2.2:1.0
```

This shows me that my rule was matched, because the line at the end about
"Queued commands" includes the script that I added as using `RUN+=` as part
of the rule:

```txt
Queued commands:
  RUN{program} : /home/jneidel/scripts/dock disconnect
```

A rule for adding can be created from this by copying the rule and changing
`ACTION==` to `"add"`.

### More specific rule criteria

Maybe you don't have the `ID_MODEL_FROM_DATABASE` or something similar.
Or maybe you need to have a more specific rule, that unsures that it is only run once.

Specifying a `SUBSYSTEM=="usb"` can narrow what is matched.
Also you can use the line `PRODUCT=17ef/3060/0` and match those ids
like this `ENV{ID_VENDOR_ID}=="17ef", ENV{ID_MODEL_ID}=="3060"`.
By selecting a component like the ethernet driver you can ensure this only
matches one entry (so the command is only run once.)

### RUN vs starting a systemd service

With `ENV{SYSTEMD_USER_WANTS}="dock-plugged.service"` a rule can trigger
service, which sets up the environment and runs the script.
This works well for `ACTION=="add"`, but not at all for `ACTION=="remove"`.

`RUN+="<command>"` works consistently for "add" and "remove" actions, so I
went with that.

### My rules

These are the udev rules I am using:

```conf
ACTION=="add", SUBSYSTEM=="hidraw", ENV{ID_MODEL_FROM_DATABASE}=="ThinkPad Dock", RUN+="/home/jneidel/scripts/dock connect"
ACTION=="remove", ENV{ID_MODEL_FROM_DATABASE}=="ThinkPad Dock", RUN+="/home/jneidel/scripts/dock disconnect"
```

## The script to run

With `RUN+="/home/jneidel/scripts/dock disconnect"` I can run a script of mine.

The script I use is this:
```sh
#! /bin/sh

if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "help" ] || [ -z "$1" ]; then
  cat <<EOF
$ dock [connect|disconnect]
Trigger some actions upon connect/disconnect of the dock.
EOF
  exit
fi

# setup env for udev to interact with Xorg (xrandr) for monitor script
export DISPLAY=:0
export XAUTHORITY=/run/user/1000/Xauthority

case "$1" in
  connect)
    /home/jneidel/scripts/monitor -m on
    sleep 4s; /home/jneidel/scripts/sxhkd/backlight set 100
    ;;
  disconnect)
    /home/jneidel/scripts/monitor off
    /home/jneidel/scripts/sxhkd/backlight max
    ;;
esac
```

Here are the [monitor](https://github.com/jneidel/dotfiles/blob/master/scripts/monitor) and [backlight](https://github.com/jneidel/dotfiles/blob/master/scripts/sxhkd/backlight) scripts.

I use `sleep 4s`, to delay turing off the laptop backlight until the monitor
is activated.

## Demo

Here is a short demo to see my setup in action:

{{<youtube "uTHTzEbnLPs">}}

## References

- [Arch Wiki: Udev](https://wiki.archlinux.org/title/Udev)
- [Gentoo Wiki: Udev](https://wiki.gentoo.org/wiki/Udev)
- [Linux Questions: Why is my udev remove not working](https://www.linuxquestions.org/questions/linux-desktop-74/udev-not-doing-remove-rules-841733/)
- [Linux Config: How to write udev rules](https://linuxconfig.org/tutorial-on-how-to-write-basic-udev-rules-in-linux)
