---
title: My Backup strategy
date: 2024-01-05
thumbnailAlt: Open hard drive in front of rack
tags:
    - homeserver
---

Everyone is responsible for backing up their own data.
In this guide I'll walk you through how I do it.

## Code and configurations

My software projects and [linux configurations](https://github.com/jneidel/dotfiles) are versioned via git and use
[GitHub](https://github.com/jneidel) as a remote backup.
This relies on me committing and pushing changes regularly.

My [dotfiles](https://github.com/jneidel/dotfiles) allow me to completely recreate my linux
setup in a few hours on a new device.

Threat vectors covered: Main machine drive failure

## Secrets

I also version my secrets (password database, api keys, private configurations)
in git. Once a day a cronjob runs a copy of my [dotfiles repo management scripts](https://github.com/jneidel/dotfiles/tree/master/repo) that collect the relevant files, commits any changes and pushes to a private server.
You could also use private GitHub repos, but I rather keep my unencrypted
secrets on my own server.
Alternatively you could encrypt the files then you can store it where ever.
But this wouldn't play well with git, since all files will be different every
time.

Threat vectors covered: Main machine drive failure, revert undesired changes

## Notes and laptop/phone media

As detailed in my post about my [Note synchronization setup](sync-notes)
I use [Syncthing](https://syncthing.net) to sync
them to my homeserver (and from there to other devices.)
The same applies to music and any other media on my phone or computer.

Syncthing offers [multiple ways to version your files](https://docs.syncthing.net/users/versioning.html) as to allow for retrival of
changed or deleted files. I only use this versioning on the homesever and vary
it based on the type of files being synced. For my notes I use "Simple" 45 day
versioning and for my media 20 day "Trash Can" versioning.

Synchronization is not a backup though.
By being synced through my homeserver everything is also covered by it's backup
strategy.

Threat vectors covered: Main machine drive failure, revert undesired changes

## Homeserver

To project against disk failure I'm running [UNRAID](https://unraid.net).
I opted for UNRAID over [RAID](https://en.wikipedia.org/wiki/RAID) for the ease of upgrading.
RAID would have required me to buy all of my hard-drives together.
I wasn't sure how much storage I needed and wanted to reserve the option to
upgrade slowly instead of having a big upfront investment.

RAID, or UNRAID in my case [is not a backup](https://www.raidisnotabackup.com/) though.
So besides my single parity disk I also have two external WD Elements drives for
on-site and off-site backups.
On-site is backed-up weekly and swapped with the off-site one at a relatives
place whenever I visit.
Any safe place outside of your house that you regularly visit will do.

Threat vectors covered: Single drive failure[^single], multiple drive
failures[^multi], [Randsomware](https://en.wikipedia.org/wiki/Ransomware), environmental hazards at server location (fire, water, burglary)

[^single]: Covered by UNRAID's parity. Plug in a new drive and the failed one will be recreated.
[^multi]: With a single parity drive this mean UNRAID is failing. Data on the
    lost drives is not recoverable and will have to be recreated from the
    backup.

Reference:
- [3-2-1 Strategy](https://www.seagate.com/blog/what-is-a-3-2-1-backup-strategy)
- [Ben Vallack's backup strategy](https://yewtu.be/watch?v=9seIRMZLpnc)

### Technical details

By encrypting our external backup drives we can secure our data against abuse.

Threat vectors covered: External backup in the wrong hands

#### Initial setup

Whenever I get a new drive that is to serve as a backup I have to test the drive
and put an encrypted filesystem on it.

##### Testing the drive

To verify that the disk is fine run an extended SMART test on it.
I do this through the UNRAID UI, but I'm sure there is a way to do it on the
command-line. If there are any errors the drive gets returned to the seller.

![SMART test results in the UNRAID UI without errors](SMART-test-no-errors.png)

Next I'll preclear the drive. This will:
- read out every byte
- write a zero to every byte
- read out every byte again

This is technically unnecessary[^preclear] but will serve as a stresstest for
the drive.
If it will fail early I want to know as soon as possible so I can return it.

![Preclearing the drive](preclearing-drive.png)

[^preclear]: If you want to add a new drive to an UNRAID array it is required to
be zeroed so it matches the parity. There is no such need in external drives.

On UNRAID this can be done through the 'Unassigned Devices Preclear'
plugin[^more].

[^more]: Install the plugins 'Unassigned Devices' and 'Unassigned Devices
Preclear'. Then in 'Tools > Disk Utilities' you will have the option to preclear
a disk.

##### Format the drive

To access the drive without having to enter our passphrase every time[^opt] we
will generate a `keyfile` that will be placed on the server.

```sh
dd bs=512 count=16 if=/dev/random of=keyfile iflag=fullblock
```

With this we can now put an encrypted ext4 filesystem on our drive:

```sh
# optional: switch to admin
sudo su

# get the device id for the drive you want to format
# -> replace sdX below
lsblk

# format drive, generate and enter a passphrase
cryptsetup -s 512 luksFormat /dev/sdX

# for keyfile unlock
cryptsetup luksAddKey /dev/sdX keyfile

# create filesystem
cryptsetup luksOpen /dev/sdX cryptext --key-file keyfile
mkfs.ext4 /dev/mapper/cryptext
cryptsetup luksClose cryptext
```

Now you're ready to backup your server to this drive.

- Reference: [Arch wiki section on disk encryption](https://wiki.archlinux.org/title/Dm-crypt/Device_encryption#Using_LUKS_to_format_partitions_with_a_keyfile)

[^opt]: This is optional. You can also skip this and enter a passphrase every time you mount the drive.

#### Update external backup

To only transfer the changes between to the backup I use [rsync](https://rsync.samba.org/) – the
standard utility for this kind of job.

On my server I run: `$ ./sync-backup sdd` where `sdd` specifies the device id of
my backup drive.
Here are the scripts contents:

```sh
#! /bin/sh

keyfile=/mnt/user/system/user/keyfile
cryptmapper=cryptbackup
mapper=/dev/mapper/$cryptmapper
mount_location=/ext/backup

mkdir -p $mount_location /ext/hd

if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "help" ] || [ -z "$1" ]; then
  cat <<EOF
$ sync-backup device_id
Backup data onto exsting backup drive

Parameters:
  \$1: like sdd, obtained from lsblk

Example:
  $ sync-backup sdd
EOF
  exit
fi

command -v rsync >/dev/null || { echo "rsync is not installed" 1>&2; exit 127; }

device_id=$1
device=/dev/$device_id

cryptsetup luksOpen $device $cryptmapper --key-file $keyfile && echo Opened luks && sleep 4s &&
  mount $mapper $mount_location && echo Mounted backup drive &&
  rsync -avr --delete /mnt/user /boot $mount_location &&
  sync &&
  umount $mount_location && echo Unmounted backup drive &&
  cryptsetup luksClose $cryptmapper && echo Closed luks
```

## Open threat vectors

These I am aware off, but haven't addressed yet, or we're not worth addressing.

- **Data corruption due to electricity blackout:**

  Could be addressed by having the main power supply run through a battery. So
  that if the power suddenly stops the battery keeps the server running so it
  can gently shut-down. I don't know how the intermediate battery would
  communicate this shutdown to the server though and relying on me to manually
  initiate shut-down would be error prone.

- **Software project environment files:**

  While the project is backed up these env files are not necessarily.
  I have not yet build a consistent way to best back these up.
  Critical ones would be included in the secrets programme though.

If you think I'm missing something here, please let me know at: [backups@jneidel.com](mailto:backups@jneidel.com)
