#! /bin/sh
## not to be run as a script, but as a follow along install guide for myself
## from my last full install on 03.03.2020

# keyboard
loadkeys de-latin1

# get device
lsblk

# wipe device
## new pc, so not needed

# partitioning
## DOS disklabel
## 2 partitions:
##   boot +200M
##   luks rest
fdisk /dev/x

# create luks container on partition
cryptsetup luksFormat -s 512 /dev/x2

# open luks
cryptsetup luksOpen /dev/x2 cryptroot

# create fs
mkfs.btrfs /dev/mapper/cryptroot

# mount fs
mount /dev/mapper/cryptroot /mnt

# create subvolumes
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home

# remount fs with subvolumes
umount /mnt
mount -o subvol=@ /dev/mapper/cryptroot /mnt
mkdir /mnt/home
mount -o subvol=@home /dev/mapper/cryptroot /mnt/home
mount /dev/x1 /mnt/boot

# install system
## requires internet, use ethernet cable
pacstrap /mnt base linux linux-firmware mkinitcpio grub btrfs-progs vim networkmanager base-devel

# mount boot partition
mkfs.ext4 /dev/x1
mount /dev/x1 /mnt/boot

# create mount scheme
genfstab -U /mnt >> /mnt/etc/fstab

# set /mnt as root directory
arch-chroot /mnt

# tweak mkinitcpio
vim /etc/mkinitcpio.conf
## add 'btrfs' to MODULES
## add '/usr/bin/btrfs' to BINARIES
## replace 'udev' with 'systemd' in HOOKS
## add 'sd-vconsole sd-encrypt' to HOOKS behind 'keyboard'

# set keymap
printf "KEYMAP=de-latin1" > /etc/vconsole.conf

# build linux boot image
mkinitcpio -p linux
chmod 600 /boot/initramfs-linux*

# setup grub
lsblk -dno UUID /dev/sda2 >> /etc/default/grub
vim /etc/default/grub
## add to 'GRUB_CMDLINE_LINUX' 'rd.luks.name=<device-UUID>=cryptroot root=/dev/mapper/cryptroot'
grub-install --target=i386-pc /dev/x # the device, no partition
grub-mkconfig -o /boot/grub/grub.cfg

# tweak fstab
vim /etc/fstab
## Add: /dev/mapper/cryptroot / btrfs defaults,discard,compress=lzo,subvol=@ 0 0
## Add: /dev/mapper/cryptroot /home btrfs defaults,discard,compress=lzo,subvol=@home 0 0

# enable networkmanager
systemctl enable NetworkManager

reboot

# login as root

# set language
vim /etc/locale.gen
## uncomment 'en_US.UTF-8' and 'de_DE.UTF-8'
locale-gen
printf "LANG=en_US.UTF-8" > /etc/locale.conf

# set pc name
printf "<name>" > /etc/hostname

# install important pkgs
pacman -S git openssh man zsh vi

# create user
useradd -m -s /bin/zsh jneidel
passwd jneidel
usermod -G wheel jneidel

# tweak sudoers
visudo
## uncomment    '%wheel ALL=(ALL) ALL'
## optional add 'jneidel ALL=(ALL) NOPASSWD: ALL'

# change root password
passwd root

# set keymap in X terminals
printf 'Section "InputClass"
  Identifier "system-keyboard"
  MatchIsKeyboard "on"
  Option "XkbLayout" "de"
EndSection' > /etc/X11/xorg.conf.d/00-keyboard.conf

# bluetooth
systemctl enable bluetooth

## logged in as user
# gen ssh keypair
ssh-keygen

### personal stuff
# get sensitive
git clone jneidel@kudu.in-berlin.de:~/git/s ~/.sensitive
cd ~/.sensitive
./install-sensitive

# setup servers
ssh-keygen # private
ssh-copy-id -i ~/.ssh/private.pub k
ssh-copy-id -i ~/.ssh/private.pub u
vim ~/.sensitive/.git/config
## replace 'jneidel@kudu.in-berlin.de' with 'k'
cd ~/.ssh
chmod 600 git aur

# setup dotfiles
git clone k:~/git/ss ~/code/system-setup
cd ~/code/system-setup
./install-dotfiles.sh
cd ~/code/dotfiles
./compile-scripts/yay
yay -Syu
./apps-install
./install-configs
./install-scripts/vim-plugins.sh
cd ~/code/system-setup
./key-import.sh
./root-zshrc.sh
./mullvad.sh
./time.sh

vim ~/scripts/lemonbar/config # add new pcs width
