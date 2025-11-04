---
title: "Complete Email Setup with isync, notmuch and friends"
description: "A guide to every part of my email system. Hosting, synchronization, indexing, Emacs user interface and more."
summary: "A guide to every part of my email system."
tags:
- Emacs
date: 2025-11-03
thumbnail: notmuch-hello.png
thumbnailAlt: Notmuch hello screen in Emacs after configuration
---

This is a complete guide to my email setup.
I wanted to provide and end-to-end experience showing everything and every step involved.
That means the configuration at my hosting and DNS providers, mail sending, syncing and indexing tools and the user interface.
This is not for a single mailbox, but sending and receiving from any address on multiple domains.

All of my tool/provider choices in this guide can be replaced once you understand the role that particular part fulfills.

## Hosting providers
These providers make sure mail is collectable from a mailbox and that it can be sent.

### Domains

I use [namecheap](https://www.namecheap.com/).
Good prices and easy enough user interface.

I have the following domains with them:
- jneidel.com
- jneidel.de
- neidel.xyz

### Mailserver

I use [uberspace](https://uberspace.de/).
They got great docs and a flexible pricing model that, though a model of solidary, provides hosting even to
those who would be otherwise unable to afford it.
I have been with them for many years.

{{<figure src="/img/uberspace-logo.svg" class="w-6/12" alt="Uberspace logo">}}

With the command `uberspace mail domain add neidel.xyz` I can add a mail domain:

    The mailservers configuration has been adapted.
    Now you can use the following records for your DNS:

    neidel.xyz.                      IN   MX 0 pizarro.uberspace.de.
    neidel.xyz.                      IN  TXT "v=spf1 include:spf.uberspace.de ~all"
    uberspace._domainkey.neidel.xyz. IN  TXT "v=DKIM1;t=s;n=core;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAonmVoIli72aSHhW9LyMrnrkcYfCddeqHyQkK8aIkpBDhJObkbX+9b+p+V/+dJz86IUd3zi1Flj41Wt3TqS8/WQg2NVUKsAJMUSrO00gz+3Gqw0e0cT0BJ4YXSFr8kzwro79A9rh6ZJta6/E4xg+7DgQcIFh8Qy1XcLV2wPimQDQRWAAFMO5nXqQea9Vuvid2n2SoCTE9BXhNg4TwDRiZZTxSzTigU7iDSTBuS75wH0XtOBIMpc0OeK+2Jz3E/33/0V28rCGcPLX2FPSXvfDPY/9VmQzc0jDW8mz4SJ4/bS6Gj8qWtVlVXEEVZ3Fa2aWQ1W8vJrAelo/31dq9kcd+aQIDAQAB"

The output tell me what to add in namecheap in the domain under "Advanced DNS":
{{<figure src="./namecheap-dns-setup.png" class="w-12/12" alt="DNS setup of MX, SPF and DKIM records.">}}

This configuration includes DKIM signatures and SPF headers.
Without a valid DKIM signature emails sent to e.g. Gmail addresses will be blocked.
The validity of these records are [tested](#testing) later.

#### Mailboxes

To gain access to mail delivered to a configured domain we need to create a
mailbox:
```sh
uberspace mail user add jneidel
```

I want mail sent to any address of my domains to go into the same mailbox/maildir, so
I set it up as a catch-all:
```sh
uberspace mail catchall set jneidel
```

(See the [uberspace docs](https://manual.uberspace.de/mail-mailboxes).)

## Mail utilities
These tools are necessary to secure, retrieve, send and index mail.

### GPG

To securely store my mail password I use [`pass`](https://www.passwordstore.org/), which encrypts the passwords with my
GPG key.

You can create your own key, ideally with a secure password generated with the [dice](https://www.eff.org/dice) method:
```sh
gpg --full-generate-key
```

Install the relevant programs for the usage:
```sh
yay -S pass pinentry
```

Add the mail server password to pass:
```sh
pass add jneidel@jneidel.de
```

Configure your favorite pin entry program in `~/.config/gnupg/gpg-agent.conf`:
```yaml
pinentry-program /bin/pinentry-gtk
default-cache-ttl 43200 # 12h, refreshes with each use of the key
max-cache-ttl 259200    # 3d
```

Do restart the gpg-agent after changes (find the command in `htop`, kill the process and execute the command again.)

(Here is some more information about [pin](https://vadosware.io/post/fixing-pinentry-with-emacs/#why-was-my-emacs--pinentry-setup-broken) [entry](http://yitang.uk/2023/12/28/gpg-in-emacs-first-step-towards-data-security/).)

### Retrival and sync

We need to configure a program to download email from the IMAP server for
offline use.
This program will also sync any changes we do back to the server.

I use `mbsync`, which is part of [isync](https://isync.sourceforge.io/).
```sh
yay -S isync
```

In `~/.config/isyncrc` I have:
```yaml
IMAPStore jneidel@jneidel.de-remote
Host pizarro.uberspace.de
Port 993
User jneidel@jneidel.de
PassCmd "pass jneidel@jneidel.de"
AuthMechs LOGIN
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

MaildirStore jneidel@jneidel.de-local
Subfolders Verbatim
Path /home/jneidel/.local/share/mail/jneidel@jneidel.de/
Inbox /home/jneidel/.local/share/mail/jneidel@jneidel.de/INBOX

Channel jneidel@jneidel.de
Expunge Both
Far :jneidel@jneidel.de-remote:
Near :jneidel@jneidel.de-local:
Patterns * !"*virtual*"
Create Both
SyncState *
MaxMessages 0
ExpireUnread no
```

- The host is the one from the domain setup.
- The port value can be found in [the uberspace docs](https://manual.uberspace.de/mail-access/).
- The password was stored in `pass` in the previous step.
- I designated `~/.local/share/mail` as my local maildir.

I use [`~/scripts/mail/mailsync`](https://github.com/jneidel/dotfiles/blob/master/scripts/mail/mailsync) invoking `mbsync` to synchronize my mail:

```sh
#!/bin/sh

MAILSYNC_MUTE=true

if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "help" ]; then
  cat <<EOF
$ mailsync [ACCOUNT]
Sync mail and index it.

Run it:
- via goimapnotify (server has received new mail hook)
- via cron (timer)

Source: https://github.com/LukeSmithxyz/mutt-wizard
Changes: pop removed, notifications disabled, .config/neomvim and .config/isync as config dirs.

Parameters:
  [\$1]: account to sync, by default syncs all

Example:
  $ mailsync
  $ mailsync jneidel@jneidel.com
EOF
  exit
fi

hash mbsync notmuch || exit 127

# There are many arbitrary and ugly features in this script because it is
# inherently difficult to pass environmental variables to cronjobs and other
# issues. It also should at least be compatible with Linux (and maybe BSD) with
# Xorg and MacOS as well.

# Run only if user logged in (prevent cron errors)
pgrep -u "${USER:=$LOGNAME}" >/dev/null || { echo "$USER not logged in; sync will not run."; exit ;}
# Run only if not already running in other instance
pgrep mbsync >/dev/null && { echo "mbsync is already running."; exit ;}

# First, we have to get the right variables for the mbsync file, the pass
# archive, notmuch and the GPG home.  This is done by searching common profile
# files for variable assignments. This is ugly, but there are few options that
# will work on the maximum number of machines.
eval "$(grep -h -- \
    "^\s*\(export \)\?\(MBSYNCRC\|PASSWORD_STORE_DIR\|NOTMUCH_CONFIG\|GNUPGHOME\)=" \
    "$HOME/.profile" "$HOME/.bash_profile" "$HOME/.zprofile"  "$HOME/.config/zsh/.zprofile" "$HOME/.zshenv" \
    "$HOME/.config/zsh/.zshenv" "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.config/zsh/.zshrc" \
    "$HOME/.pam_environment" 2>/dev/null)"

# export GPG_TTY="$(tty)"

[ -n "$MBSYNCRC" ] && alias mbsync="mbsync -c $MBSYNCRC" || MBSYNCRC=$HOME/.config/isyncrc

lastrun="${XDG_CONFIG_HOME:-$HOME/.config}/neomutt/.mailsynclastrun"

# Settings are different for MacOS (Darwin) systems.
case "$(uname)" in
    Darwin)
        notify() { osascript -e "display notification \"$2 in $1\" with title \"You've got Mail\" subtitle \"Account: $account\"" && sleep 2 ;}
        ;;
    *)
        case "$(readlink -f /sbin/init)" in
            *systemd*|*openrc*) export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/$(id -u)/bus ;;
        esac
        # remember if a display server is running since `ps` doesn't always contain a display
        pgrepoutput="$(pgrep -a X\(org\|wayland\))"
        displays="$(echo "$pgrepoutput" | grep -wo "[0-9]*:[0-9]\+" | sort -u)"
        notify() { [ -n "$pgrepoutput" ] && for x in ${displays:-0:}; do
                export DISPLAY=$x
                notify-send --app-name="mutt-wizard" "New mail!" "📬 $2 new mail(s) in \`$1\` account."
            done ;}
        ;;
esac

# Check account for new mail. Notify if there is new content.
syncandnotify() {
    acc="$(echo "$account" | sed "s/.*\///")"
    if [ -z "$opts" ]; then mbsync "$acc"; else mbsync "$opts" "$acc"; fi
    new=$(find\
    "$HOME/.local/share/mail/$acc/INBOX/new/"\
    "$HOME/.local/share/mail/$acc/Inbox/new/"\
    "$HOME/.local/share/mail/$acc/inbox/new/"\
    "$HOME/.local/share/mail/$acc/INBOX/cur/"\
    "$HOME/.local/share/mail/$acc/Inbox/cur/"\
    "$HOME/.local/share/mail/$acc/inbox/cur/"\
    -type f -newer "$lastrun" 2> /dev/null)
    newcount=$(echo "$new" | sed '/^\s*$/d' | wc -l)
    case 1 in
    $((newcount > 0)) ) [ -z "$MAILSYNC_MUTE" ] && notify "$acc" "$newcount" ;;
    esac
}

# Sync accounts passed as argument or all.
if [ "$#" -eq "0" ]; then
    accounts="$(awk '/^Channel/ {print $2}' "$MBSYNCRC")"
else
    for arg in "$@"; do
        [ "${arg%${arg#?}}" = '-' ] && opts="${opts:+${opts} }${arg}" && shift 1
    done
    accounts=$*
fi

# Parallelize multiple accounts
for account in $accounts; do
    syncandnotify &
done

wait

notmuch new
afew --tag --new
afew --move-mails --all

# Create a touch file that indicates the time of the last run of mailsync
touch "$lastrun"
```

This script could be simpler, but for now it just works.
It was adapted from[ mutt-wizard](https://github.com/lukesmithxyz/mutt-wizard).

The script could be invoke at a regular interval through cron, but we can do it even better than that.

### Sync on IMAP change

Why not let the IMAP server inform us of new mail and only sync then?
[goimapnotify](https://gitlab.com/shackra/goimapnotify) does exactly that.
```sh
yay -S goimapnotify
```

In `~/.config/imapnotify/jneidel@jneidel.de` we tell it what to do:

```json
{
"host": "pizarro.uberspace.de",
"port": 993,
"tls": true,
"tlsOptions": {
"rejectUnauthorized": false
},
"username": "jneidel@jneidel.de",
"password": "",
"passwordCmd": "pass jneidel@jneidel.de",
"onNewMail": "/home/jneidel/scripts/mail/mailsync",
"onNewMailPost": "",
"boxes": [ "INBOX" ]
}
```

To activate run this on startup (I have it in my `~/.xinitrc`):
```sh
goimapnotify -conf ~/.config/imapnotify/jneidel.de.yaml >/dev/null 2>&1 &
```

### Sending mail

For sending mail (SMTP) I use `msmtp`:
```sh
yay -S msmtp
```

It is configured in `~/.config/msmtp/config`:
```yaml
account jneidel@jneidel.de
host pizarro.uberspace.de
port 465
from jneidel@jneidel.de
user jneidel@jneidel.de
passwordeval "pass jneidel@jneidel.de"
auth on
tls on
tls_trust_file	/etc/ssl/certs/ca-certificates.crt
logfile /home/jneidel/.local/share/msmtp/jneidel.de.log
tls_starttls off

account default : jneidel@jneidel.de
```

The `account default` acts like a catch-all for sending, so I don't have to
configure each sender address individually.
This way I can respond to a mail I received on "abc@jneidel.com" from
"abc@jneidel.com", not just from "jneidel@jneidel.de".

The SMTP port was also found in the [docs](https://manual.uberspace.de/mail-access/).

### Mail indexing

I use [notmuch](https://notmuchmail.org/) to index my email.
It makes it very quick to search.
Since I use notmuch as my [mail client](#mail-client) this is required for me, but optional otherwise.

```sh
yay -S notmuch
```

Configuration is handled in this redefined config location:
`export NOTMUCH_CONFIG=~/.config/notmuch-config`:
```toml
[database]
path=/home/jneidel/.local/share/mail
[user]
name=Jonathan Neidel
primary_email=jneidel@jneidel.de
other_email=jneidel@jneidel.com;j@neidel.xyz
[new]
tags=unread;inbox;
ignore=.mbsyncstate;.uidvalidity
[search]
exclude_tags=deleted;spam;
[maildir]
synchronize_flags=true
[crypto]
gpg_path=gpg
```

Notmuch does not provide tagging automation or mail moving.
For that I use [afew](https://github.com/afewmail/afew).
```sh
yay -S afew
```

Configured in `~/.config/afew/config`:
```toml
[Filter.1]
message = Remove new tag everywhere but INBOX folder
query   = NOT folder:jneidel@jneidel.de/INBOX
tags    = -unread;-inbox

[Filter.2]
message = Hide jobdirecto mails
query   = folder:jneidel@jneidel.de/INBOX AND to:wilfredocasas100@gmail.com
tags    = -unread;+spam;-inbox

[Filter.3]
message = Remove Lidl Pay confirmations
query   = subject:Abbuchungsankündigung AND from:lidlpay@lidl.de
tags    = +trash;-unread;-inbox

[Filter.4]
message = Hide bellicon
query   = from:affiliate@bellicon.com
tags    = +spam;-unread;-inbox

[Filter.5]
message = Remove IB trade confirmations
query   = subject:Trade Confirmation Flex AND from:donotreply@interactivebrokers.com
tags    = +trash;-unread;-inbox

[Filter.6]
message = Move Telekom invoices
query   = subject:'Telekom Festnetz-Rechnung' AND from:rechnungonline@telekom.de
tags    = +invoice;-unread;-inbox

[Filter.7]
message = Blutspende
query   = to:spenderservice@jneidel.com
tags    = +trash;-unread;-inbox

[Filter.8]
message = Tag mail in sent dir as sent
query   = folder:jneidel@jneidel.com/Sent OR folder:jneidel@jneidel.de/Sent
tags    = +sent;-unread;-inbox

[Filter.9]
message = Tag mail in archive dir as archieved
query   = folder:jneidel@jneidel.com/archive OR folder:jneidel@jneidel.de/archive
tags    = +archived;-unread;-inbox

[Filter.10]
message = Tag mail in invoices dir as invoice
query   = folder:jneidel@jneidel.com/invoices OR folder:jneidel@jneidel.de/invoices
tags    = +invoice;-unread;-inbox

[ArchiveSentMailsFilter]
sent_tag = sent

[MailMover]
folders = jneidel@jneidel.de/INBOX jneidel@jneidel.de/archive jneidel@jneidel.de/spam jneidel@jneidel.de/invoices
rename = True

jneidel@jneidel.de/INBOX = 'tag:spam':jneidel@jneidel.de/spam 'tag:trash':jneidel@jneidel.de/Trash 'tag:invoice':jneidel@jneidel.de/invoices 'tag:archived':jneidel@jneidel.de/archive
jneidel@jneidel.de/spam = 'tag:trash':jneidel@jneidel.de/Trash
jneidel@jneidel.de/archive = 'tag:trash':jneidel@jneidel.de/Trash
jneidel@jneidel.de/invoices = 'tag:trash':jneidel@jneidel.de/Trash

# Test queries with notmuch search
```

The `Filter`s at the top are used to get mail that I don't want to see out of my
inbox.
Recurring invoices (Telekom) and unsubscribable spam (jobdirecto, bellicon) also get tagged respectively.

I use the tags "spam, trash, archived, invoice" and these correspond to
directories in my maildir: "spam, Trash, archive, invoices".
The `MailMover` at the bottom is responsible for moving mail according to the tags.

## Mail client

I use the notmuch Emacs client.
The Emacs package was already installed alongside the system package:
```elisp
(use-package notmuch
  :ensure nil
  :defer t
  :commands (notmuch notmuch-mua-new-mail))
```

In the [previous section](#mail-indexing) I already configured notmuch and autotagging with afew.
That means all that is left to configure is the Emacs interface and a little
wiring for persona and [msmtp](#sending-mail):
```elisp
(setq user-mail-address "jneidel@jneidel.com"
      user-full-name "Jonathan Neidel"
      notmuch-identities '("Jonathan Neidel <jneidel@jneidel.com>"))

(setq send-mail-function 'sendmail-send-it
      message-send-mail-function 'sendmail-send-it
      sendmail-program "/bin/msmtp"

      mail-specify-envelope-from t
      message-sendmail-envelope-from 'header
      mail-envelope-from 'header)

(setq notmuch-fcc-dirs "jneidel@jneidel.de/Sent"
      notmuch-draft-folder "jneidel@jneidel.de/Drafts")
;; paths are relative to notmuch index base root aka the maildir at ~/.local/share/mail
```

I have replaced the default notmuch hello screen with a collection of queries easily accessible through keybindings.
A lot of my this notmuch config this was inspired by [Prots Emacs configuration](https://protesilaos.com/emacs/dotemacs#h:755e195b-9471-48c7-963b-33055969b4e2).

{{<figure src="./notmuch-hello.png" class="w-9/12" alt="Notmuch hello screen in Emacs" caption="The notmuch-hello screen after the below configuration">}}

```elisp
(use-package notmuch
  :defer t
  :config
  (setq notmuch-show-logo nil
        notmuch-column-control 1.0
        notmuch-hello-auto-refresh t
        notmuch-hello-thousands-separator ""
        notmuch-hello-sections '(notmuch-hello-insert-saved-searches)
        notmuch-search-oldest-first nil)

  (setq notmuch-show-empty-saved-searches t)
  (setq notmuch-saved-searches
        `(( :name "📥 inbox"
            :query "tag:inbox"
            :sort-order newest-first
            :key ,(kbd "i"))
          ( :name "👀 all unread (inbox)"
            :query "tag:unread and tag:inbox"
            :sort-order newest-first
            :key ,(kbd "u"))
          ( :name "✏️ drafts"
            :query "tag:draft and not:tag:trash"
            :sort-order newest-first
            :key ,(kbd "d"))
          ( :name "🗃️ archive"
            :query "tag:archived"
            :sort-order newest-first
            :key ,(kbd "a"))
          ( :name "🛒 invoices"
            :query "tag:invoice"
            :sort-order newest-first
            :key ,(kbd "n"))
          ( :name "📨 sent"
            :query "tag:sent"
            :sort-order newest-first
            :key ,(kbd "s"))
          ( :name "🪓 spam"
            :query "tag:spam and not:tag:trash"
            :sort-order newest-first
            :key ,(kbd "m"))
          ( :name "🗑️ trash"
            :query "tag:trash"
            :sort-order newest-first
            :key ,(kbd "t"))
          ( :name "🌍 all"
            :query "not:tag:trash and not:tag:spam"
            :sort-order newest-first
            :key ,(kbd "A"))
          ))

  (keymap-set notmuch-common-keymap (kbd "g") #'notmuch-jump-search)
  )
```

The interface shows each emails tags.
To make these less verbose and easy to parse I turn them into emoji.
This snippet configures everthing around tags.
```elisp
(use-package notmuch
  :defer t
  :config
  (setq notmuch-archive-tags '("+archived")
        notmuch-message-replied-tags '("+replied")
        notmuch-message-forwarded-tags '("+forwarded")
        notmuch-show-mark-read-tags '("-unread")
        notmuch-draft-tags '("+draft")
        notmuch-draft-save-plaintext 'ask)

  (setq notmuch-tag-formats
        '(("unread" "👀")
          ("attachment" "📎")
          ("signed" "🔑")
          ("encrypted" "🔒")
          ("replied" "💬")
          ("forwarded" "⏩")
          ("sent" "📨")
          ("inbox" "📥")
          ("spam" "🪓")
          ("invoice" "🛒")
          ("archived" "🗃️")
          ("draft" "✏️")
          ("trash" "🗑️")
          ("lists" "📜lists")
          ("flag" (propertize tag 'face 'notmuch-tag-flagged)
           (concat tag "🚩")))
        notmuch-tag-deleted-formats
        '(("unread" (notmuch-apply-face bare-tag 'notmuch-tag-deleted)
           (concat "👀" tag))
          (".*" (notmuch-apply-face tag 'notmuch-tag-deleted)
           (concat "🚫" tag)))
        notmuch-tag-added-formats
        '(("del" (notmuch-apply-face tag 'notmuch-tag-added)
           (concat "💥" tag))
          (".*" (notmuch-apply-face tag 'notmuch-tag-added)
           (concat "🏷️" tag))))

  (setq notmuch-tagging-keys
        `((,(kbd "d") ("+trash" "-inbox" "-unread") "🗑️ Mark for deletion")
          (,(kbd "s") ("+spam" "-inbox" "-unread") "🪓 Mark as spam")
          (,(kbd "f") ("+flag") "🚩 Flag as important")
          (,(kbd "i") ("+invoice" "-inbox" "-unread") "🛒 Mark as invoice")
          (,(kbd "a") ("+archived" "-inbox" "-unread") "🗃️ Mark as archived")
          (,(kbd "r") ("-unread") "👀 Mark as read")
          (,(kbd "u") ("+unread") "👀 Mark as unread")))

  (keymap-set notmuch-common-keymap (kbd "u") #'notmuch-tag-undo)

  (defun notmuch-search-mode-delete-goto-next ()
    "Tag current mail as trash and move to the next."
    (interactive)
    (notmuch-search-tag '("+trash" "-unread" "-inbox"))
    (forward-line)
    )
  (defun notmuch-show-mode-delete-goto-next ()
    "Tag current mail as trash and move to the next."
    (interactive)
    (notmuch-show-tag '("+trash" "-unread" "-inbox"))
    (notmuch-show-next-message t)
    (notmuch-search-show-thread)
    )

  (keymap-set notmuch-search-mode-map (kbd "d") #'notmuch-search-mode-delete-goto-next)
  (keymap-set notmuch-show-mode-map (kbd "d") #'notmuch-show-mode-delete-goto-next)
  )
```

Often times I want to open a HTML email in the browser.
That needs an entry in `~/.mailcap`:
```txt
text/html; brave %s; nametemplate=%s.html
```

I added a wrapper around the native `notmuch-show-view-part` so it does what I
want from opening email in the browser:
```elisp
(defun notmuch-show-mode-open-html ()
  "Open HTML part of message in browser (via ~/.mailcap)."
  (interactive)
  (save-excursion
    (notmuch-show-previous-message)
    (condition-case nil
        (search-forward "text/html")
      (error (message "No HTML part."))
      (:success (notmuch-show-view-part)
                (shell-command "open-i3-workspace 2")
                (message "Opened HTML in browser")
                ))))
(defun notmuch-search-mode-open-html ()
  "Open HTML part of message in browser (via ~/.mailcap)."
  (interactive)
  (save-excursion
    (notmuch-search-show-thread)
    (notmuch-show-previous-message)
    (condition-case nil
        (search-forward "text/html")
      (error (message "No HTML part."))
      (:success (notmuch-show-view-part)
                (shell-command "open-i3-workspace 2")
                (message "Opened HTML in browser")
                ))))

(keymap-set notmuch-search-mode-map (kbd "o") #'notmuch-search-mode-open-html)
(keymap-set notmuch-show-mode-map (kbd "o") #'notmuch-show-mode-open-html)
```

Mutt has an option called `reverse_name`.
If activated the *From:* line in a reply will be built using the address the
message was originally sent *To:*.
If somebody writes me an email to "hi@jneidel.com", I want to answer from
"hi@jneidel.com", even though "jneidel@jneidel.de" is my configured as my default sender.
The code below does exactly that.
```elisp
(use-package notmuch
  :defer t
  :config
  (defun notmuch--get-message-to ()
    "Return the raw To: header of the message or nil."
    (let ((message-properties (cond
                               ((derived-mode-p 'notmuch-show-mode)
                                (notmuch-show-get-message-properties))
                               ((derived-mode-p 'notmuch-search-mode)
                                (notmuch-search-show-thread)
                                (notmuch-show-get-message-properties))
                               ((derived-mode-p 'notmuch-tree-mode)
                                (notmuch-tree-get-message-properties))
                               (t nil))))
      (if (eq message-properties nil)
          nil
        (plist-get (plist-get message-properties :headers) :To))))

  (defun notmuch-reply-reverse-name-advice (orig-fn &rest args)
    "Advice 'notmuch-mua-reply' to use the original To: addresses as the From:."
    (let ((to-address (notmuch--get-message-to)))
      (apply orig-fn args)
      (when to-address
        (message-replace-header "From" to-address))))

  (advice-add 'notmuch-mua-reply :around #'notmuch-reply-reverse-name-advice))
```

One of the killer feature of having email in Emacs is being able to reference an email
with a clickable link from org-mode files.
This is achieved using [ol-notmuch](https://github.com/tarsius/ol-notmuch).
```elisp
(use-package ol-notmuch
  :bind
  ("C-c l" . org-store-link))
```

Oftentimes PDFs are attached to incoming mail.
By default these would need to be manually saved and then opened.
This script extracts the text data from the PDF attachment and pops it into a new buffer ([source](https://notmuchmail.org/emacstips/#index1h2)).
```elisp
(defun user/mm-pipe-- (handle cmd)
  ;; conveniently, '-' '-' a args to pdftotext and docx2txt.pl work fine
  ;; fixme: naming inconsistency (fn name and buffer name)
  (let ((buffer (get-buffer-create "*attachment-to-text*")))
    (with-current-buffer buffer
      (setq buffer-read-only nil)
      (erase-buffer))
    (with-temp-buffer
      ;; "based on mm-pipe-part in mm-decode.el"
      (mm-with-unibyte-buffer
        (mm-insert-part handle)
        (mm-add-meta-html-tag handle)
        (let ((coding-system-for-write 'binary))
          (call-process-region (point-min) (point-max)
                               cmd nil buffer nil "-" "-"))))
    (pop-to-buffer buffer)
    (goto-char (point-min))
    (text-mode)
    (visual-line-mode)
    (view-mode)))

(defun user/notmuch-show-pop-attachment-to-buffer ()
  ;; "based on notmuch-show-apply-to-current-part-handle"
  (interactive)
  (let ((handle (notmuch-show-current-part-handle)))
    ;;(message "%s" handle)
    (unwind-protect
        (pcase (car (nth 1 handle))
          ("application/pdf"
           (user/mm-pipe-- handle "pdftotext"))
          ("application/vnd.openxmlformats-officedocument.wordprocessingml.document"
           (user/mm-pipe-- handle "docx2txt.pl"))
          (_ (notmuch-show-save-part)))
      (kill-buffer (mm-handle-buffer handle)))))

(setq notmuch-show-part-button-default-action
      #'user/notmuch-show-pop-attachment-to-buffer)
```

The latest version of my Emacs config (and thus all of the above snippets) can always be found in my [dotfiles](https://github.com/jneidel/dotfiles/blob/master/.emacs.d/dotemacs.org).

### Android client
For the occasional access on my phone I use [K-9 Mail](https://f-droid.org/en/packages/com.fsck.k9/).
The same values as in the above [IMAP](#retrival-and-sync) and [SMTP](#sending-mail) sections are used.

## Testing

Obviously we need to test that outgoing mail from the different domains are
delivered and that incoming mail arrives, is properly tagged and displayed.

Uberspaces [webmail](https://webmail.uberspace.de/) can be used for testing if needed.

**DKIM**

To make sure DKIM and SPF are working correctly used [this website](https://dkimvalidator.com/) for testing.

## Conclusions

Email was at first a daunting task because of the many moving parts and the
endless testing on every change.
Once I understood what components I needed and what they were responsible for they were not hard to configure.
I hope you were able to take that understanding away from this.

Being able to have email in Emacs was definitely worth it to me.
It is now easier than ever to reach inbox zero.
