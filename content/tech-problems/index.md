---
title: How to approach Technical Problems
date: 2023-11-22
tags:
    - presentation
---

{{<lead>}}
A talk I held about how to approach technical problems.
{{</lead>}}

{{<button href="tech-problems.pdf" target="_blank">}}
See the slides
{{</button>}}

All developers spend a lot of time debugging and finding solutions to technical
problems. We'll step through some problems together and hopefully have some fun :)

Audience: Developers and technically minded Testers

## Solutions

Here are my solutions to the presented problems in full.

### Simple
Just a [random issue](https://github.com/jneidel/oraclett/issues/52) I picked out for demo purposes.

### Preowned

Here's an example of looking for newly added used Polo shirts on Momox, Zalando and AboutYou:

```sh
#! /bin/sh

OLD_LINKS=~/.local/share/second-hand-polos.txt
TEMP=$(mktemp -u)
mkfifo $TEMP

fetch() {
  curl -Ss 'https://www.zalando.de/pre-owned-poloshirts-herren/ralph-lauren__groesse-M/?search_context=preowned&q=ralph+lauren+polo' | grep -Po '<script type="application/json" [^>]*>\K[^>]*(?=</script>)' | tail -n1 | jq .graphqlCache | gron | grep -F '{\"id\":\"ern:product::' | gron -u | jq '.[].data.product.uri' | cut -d\" -f2
  curl -Ss 'https://www.aboutyou.de/c/maenner/second-love/bekleidung/shirts/poloshirts-516659?brand=polo-ralph-lauren-4352&categoryShopFilterSizes=41157' | grep -aPo '\{"productTile":\{"product":\{"id":[^{]*path":"\K[^"]*(?=[^{]*{)' | awk '{ print "https://www.aboutyou.de"$1 }'
  curl -Ss 'https://www.momoxfashion.com/de/herren/bekleidung/shirts/poloshirts?groesse=INM&marke=polo-ralph-lauren&farbe=schwarz_lila_blau_gruen_rot&material=baumwolle&sortiertnach=preis-aufsteigend' | grep -Po 'href="\K/[^"]+(?=".+item-link)' | awk '{ print "https://www.momoxfashion.com/"$1 }'
}

cat $TEMP | xargs -r $B >/dev/null 2>&1 &
fetch | grep -vFf $OLD_LINKS | tee -a $OLD_LINKS | tee $TEMP
```

This will work for most sites.

### Automatic Login

The Autofill extension: [Firefox](https://addons.mozilla.org/en-US/firefox/addon/autofill-quantum/) [Chrome](https://chromewebstore.google.com/detail/autofill/nlmmgnhgdeffjkdckmikfpnddkbbfkkk)

The extension for [KeePassXC](https://keepassxc.org) (my preferred Password
manager) also does autofilling once configured, but requires your password
database to be open.

### Payments

Nothing to show :)

### Changelog

Here's the full script:

```sh
#! /bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
CHANGELOG=$DIR/../CHANGELOG.md
COOKIE=$DIR/../tmp/jira-cookie.txt

TMP_FEATURES=$DIR/../tmp/FEATURES.md
TMP_FIXES=$DIR/../tmp/FIXES.md
printf "" >$TMP_FEATURES
printf "" >$TMP_FIXES

if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "help" ]; then
  cat <<EOF
$ generate-changelog
Generate lines for the CHANGELOG.md file interactively.

The commit up-to the last release are parsed and each Jira ticket id found
is presented to the user to add some tags.

Flags:
  -c, --continue: continue the last release in the CHANGELOG,
                  only looking at newly added commits
  -I            : launch in non-interactive mode

Example:
  $ generate-changelog -c
EOF
  exit
fi

command -v awk >/dev/null || { echo "awk is not installed" 1>&2; exit 127; }
command -v jq >/dev/null || { echo "jq is not installed" 1>&2; exit 127; }
command -v curl >/dev/null || { echo "curl is not installed" 1>&2; exit 127; }

NON_INTERACTIVE=0
if [ "$1" = "-I" ] || [ "$2" = "-I" ]; then
  NON_INTERACTIVE=1
fi

CONTINUE=0
if [ "$1" = "-c" ] || [ "$2" = "-c" ] || [ "$1" = "--continue" ] || [ "$2" = "--continue" ]; then
  CONTINUE=1
fi

mkdir -p $DIR/tmp
get_jira_cookie() {
  if [ ! -e "$COOKIE" ]; then
    cat <<EOF >&2
A Jira cookie is needed to make requests for issue title and tags.

Go to your browser an make any authenticated Jira request with the network tab open.
Paste the cookie request header into tmp/jira-cookie.txt like so:

echo "Cookie: JSESSION_ID=..." >tmp/jira-cookie.txt
EOF
    kill "$$"
  fi

  cat $COOKIE
}

jira_request() {
  URL="$1"
  curl "$URL" \
    -H "$(get_jira_cookie)" \
    -Ss --compressed
}
get_title_from_jira() {
  TICKET_ID="$1"
  TMP_ERR=$(mktemp)
  jira_request "https://jira.endava.com/rest/api/2/issue/$TICKET_ID" |
    jq .fields.summary 2>$TMP_ERR | cut -d\" -f2- | rev | cut -d\" -f2- | rev | tr " " "\n" |
    grep -Five "[TVThek]" -e "[BE]" -e "[Backend]" -e "[FE]" -e "[Frontend]" |
    sed 's|\[TVThek 24/7\]|[TVthek-24/7]|; s|\[CMS \(Sonata\)\]|[Sonata]|; s|\[TVthek 24/7 - Optimizations\]|[Optimizations]|' | tr "\n" " "

  if [ -s "$TMP_ERR" ]; then
    cat <<EOF >&2
Jira cookie has run out please refresh it.

Go to your browser an make any authenticated Jira request with the network tab open.
Paste the cookie request header into tmp/jira-cookie.txt like so:

echo "Cookie: JSESSION_ID=..." >tmp/jira-cookie.txt
EOF
    kill "$$"
  fi
}
get_tags_from_jira() {
  TICKET_ID="$1"
  jira_request "https://jira.endava.com/rest/api/2/issue/$TICKET_ID" |
    jq '.fields.components | .[].name' 2>/dev/null | awk -F\" '{ print "["$2"]" }' |
    grep -ve "Backend" -e "Frontend" | tr "\n" " "
}
get_category_from_jira() {
  TICKET_ID="$1"
  case $(jira_request "https://jira.endava.com/rest/api/2/issue/$TICKET_ID" | jq .fields.issuetype.name) in
    '"Bug"') echo $TMP_FIXES;;
    *) echo $TMP_FEATURES;;
  esac
}

get_commit_hash_to_continue_from() {
  cat $CHANGELOG | tail -n+4 | grep "^## " -m1 -B9999 | grep "^### " -A2 | grep -Eo "ORFDV001-[0-9]{4}" | awk '{ print $1 }' | awk '{ print "--grep="$1 }' | xargs git log --oneline -n1 | awk '{ print $1 }'
}

CURRENT_VERSION=$(git tag -l | cut -d. -f1-2 | tail -n1)
PREVIOUS_VERSION=$(git tag -l | cut -d. -f1-2 | uniq | tail -n2 | head -n1)

get_ticket_ids_until_commit_hash() {
  COMMIT_HASH="$1"
  git log --oneline --no-decorate "$COMMIT_HASH..HEAD" | cut -d\  -f2- | grep -Eo "ORFDV001-[0-9]{4}" | perl -ne 'print unless $seen{$_}++'
}

TMP=$(mktemp)
if [ "$CONTINUE" -eq 0 ]; then
  get_ticket_ids_until_commit_hash $(git show-ref -s $(git tag -l "$PREVIOUS_VERSION.*" | tail -n1)) >$TMP
else
  CONTINUE_COMMIT_HASH=$(get_commit_hash_to_continue_from)
  printf "%s\n%s \033[1;32m%s\033[0m %s\n" "Continuing.." "Taking into account the last:" $(git log --oneline $CONTINUE_COMMIT_HASH..HEAD | wc -l) "commits"
  get_ticket_ids_until_commit_hash $CONTINUE_COMMIT_HASH >$TMP
fi

while read -u 3 ticket_id; do
  echo "-------------------------------------------------------------------------------------------"
  TICKET_ID=$(echo $ticket_id | cut -c -13)
  TITLE="$(get_title_from_jira $TICKET_ID)"
  printf "\033[1;32m%s\033[0m\n" "$TITLE"
  echo "https://jira.endava.com/browse/$TICKET_ID"

  TAGS=" $(get_tags_from_jira $TICKET_ID)"
  echo "TAGS: '$TAGS'"

  [ "$NON_INTERACTIVE" -eq 0 ] && {
    read -p "Add tags any tags?: " tags
    for word in $tags; do
      TAGS="$TAGS[$word] "
    done
  }

  printf "\033[1;33m%s\033[0m\n" "*${TAGS}${TITLE}\\#${TICKET_ID}"
  echo "*${TAGS}${TITLE}\\#${TICKET_ID}" >> $(get_category_from_jira $TICKET_ID)
done 3<$TMP

if [ "$CONTINUE" -eq 0 ]; then
  ex $CHANGELOG <<EOF
2 insert

## $CURRENT_VERSION (Deployed on DEPLOY_DATE_HERE)
### Features

$(cat $TMP_FEATURES)

### Fixes

$(cat $TMP_FIXES)
.
xit
EOF
else
  ex $CHANGELOG <<EOF
$(($(grep -n -m1 "^### Features" $CHANGELOG | cut -d: -f1)+2)) insert
$(cat $TMP_FEATURES)
.
$(($(grep -n -m1 "^### Fixes" $CHANGELOG | cut -d: -f1)+3)) insert
$(cat $TMP_FIXES)
.
xit
EOF
fi
```

Here's a project I converted to convential commits, which is a lot nicer:
[scripts](https://github.com/jneidel/dotfiles/tree/master/repo/changelog),
[release script](https://github.com/jneidel/dotfiles/blob/master/repo/release)

### Mail signups
You can find the [repo](https://github.com/jneidel/yoga-vidya-thunderbird2csv-add-on) here.

### Subtitles

Here's how you can overwrite a mimetype on `Symfony\MimeTypes`:

```yaml
# config/services.yml

services:
    mime_types:
        class: Symfony\Component\Mime\MimeTypes
        arguments:
            - 'application/ttml+xml': [ 'ttml' ]
        calls:
            - setDefault: ['@mime_types']

    sonata.media.metadata.amazon:
        class: Sonata\MediaBundle\Metadata\AmazonMetadataBuilder
        arguments:
            - []
            - '@mime_types'
```

### Slowdown

Here's an [example of asking ChatGPT](https://chat.openai.com/share/a00bb199-e75d-49b7-8e0e-577976efd5f4) to check you're not missing anything.

And here's the [Stack Overflow post](https://unix.stackexchange.com/questions/120042/linux-slows-down-after-long-uptime) that was my fix.

**Reach out**

That it!

If there are any questions/notes feel free to reach out to me:
[tech-problems@jneidel.com](mailto:tech-problems@jneidel.com)
