---
title: "How I add automatic updates to my now page"
description: "Walking you through the design and implementation of automatic updates of my active projects for my now page."
summary: "Automating the list of active projects."
tags:
- website
date: 2025-08-30
thumbnailAlt:
writingTime: 45
---

I have a [now](now) page.
I like the idea of having one, but I don't like the idea of regularly updating it:laughing:

So, here is my approach to automating those regular updates.

## Why not update it by hand?

I [tried](https://github.com/jneidel/jneidel.com/blob/affe8872d522a9ec1bbed9e6b6a33a6fd877bf18/content/now/index.md) [this](https://github.com/jneidel/jneidel.com/blob/397bf6bc9add2831d865fa8bbb88bee64a665d33/content/now/index.md) and it reads nicely.
But this is worth little if I don't update it regularly.
I don't want to establish a routine for this or put it into my calendar.
I want to minimize those kinds of infrequent tasks, as they tend to pile up and take me out of what would otherwise do.

## Contents of my now page

On my now page I want to show what I'm currently working on.
This information is (mostly) present in my note-taking system.

{{<figure src="fs-to-web.png" class="w-12/12" alt="Filesystem to website">}}

## Design

1. Extract active project information from note-taking system
2. Provide it to the website in json format
3. Include it in /now page

For 3. I had two ideas:
1. Commit changes to the repo and rebuild static source
2. Use Javascript to fetch and include the data dynamically

I went with the Javascript option for the simplicity.
My commit history stays clean, the now source empty and I'm doing less rebuilds of my site.

## Implementation
### Extract and provide data

Extraction from the note-taking system and providing the data as json happens in one script, which is called daily via cron.

The script below:
- gets project names by listing subdirectories of my projects dir
- excludes projects with the file `.now-ignore`
- uses a projects `#+status:` keyword, if the `index.org` file contains it
- a paragraph between the keywords and the first outline (`*`) is urlencoded
as the project description
- uploads the json as a publicly accessible static file to some server

```sh
#! /bin/sh

. $HOME/.zsh/org.env

if [ "$1" = "--help" ] || [ "$1" = "-h" ] || [ "$1" = "help" ] || [ -z "$ORG_PROJECTS" ]; then
  cat <<EOF
$ org-projects-to-now-json
Transform org project directories into a json for jneidel.com/now
EOF
  exit
fi

hash jq urlencode || exit 127

get_project_list() {
  potential_projects=$(mktemp)
  find "$ORG_PROJECTS" -maxdepth 1 -mindepth 1 -type d -not -path '*/.*' | sort -V >$potential_projects

  ignored_projects=$(mktemp)
  find "$ORG_PROJECTS" -mindepth 2 -type f -name ".now-ignore" | rev | cut -d/ -f2- | rev | sort -V >$ignored_projects

  diff $potential_projects $ignored_projects --old-line-format='%L'
}

get_description() {
  index_file="$1"

  description_without_headers="$(head -n30 "$index_file" 2>/dev/null | grep -ve '^#+')"
  description_without_sections="$description_without_headers"
  if grep '^\*' -m1 "$index_file" >/dev/null 2>&1; then
    description_without_sections="$(echo "$description_without_headers" | grep -m1 '^\*' -B30 | head -n-1)"
  fi
  trimmed_oneline_description="$(echo "$description_without_sections" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')"
  echo $description_without_sections | urlencode | sed 's/^%0A$//'
}

assemble_json() {
  json=$(mktemp)
  cat <<EOF >$json
{
"date_updated": "$(date '+%b%d at %H:%M')",
"projects": [
EOF

  get_project_list | while read -r project; do
    index_file="${project}/$ORG_INDEX_FILE_NAME"
    title="$(basename "$project")"
    status=""
    if echo $project | grep -ve "🟨" >/dev/null; then
      status="$(grep -Po '#\+(status|STATUS): \K.*' "$index_file" 2>/dev/null)"
    fi
    description="$(get_description "$index_file")"

    printf '  { "title": "%s", "status": "%s", "description": "%s" },\n' "$title" "$status" "$description" >>$json
  done

  sed '$s/},/}/' -i $json # valid json: last line in array has no trailing ,
  echo "]}" >>$json

  if ! cat $json | jq >/dev/null; then # validate json
    echo "org-projects-to-now-json json validation failed at $(date) in $json" >>"$ORG_INBOX/org-projects-to-now-json errors"
    exit 1
  fi

  cat $json
}

upload_json() {
  json=$(mktemp)
  assemble_json >$json

  echo "Uploading to neidel.xyz/now.json" >&2
  ~/scripts/cron/waitforinternet && scp -q $json k:~/websites/neidel.xyz/now.json
}
upload_json
```

After running the script my json is available at [`neidel.xyz/now.json`](https://neidel.xyz/now.json).

### Include data in /now

The inclusion is straight-forward.
I'm using hugo, where I can just add html to my markdown files.
This is the relevant section ([full source](https://github.com/jneidel/jneidel.com/blob/master/content/now/index.md)) which:

- overwrite the "Updated" date from the json
- turns json array into html
- inserts html after the h2

```html
## Active projects

<script>
(async () => {
const json = await fetch("https://neidel.xyz/now.json").then(res => res.json());
document.querySelector("time").innerText = "Updated: " + json.date_updated;

let html = "";
for (const { title, status } of json.projects) {
  html += `
    <p>
      <strong>${title}</strong>
      ${description && "<br>" + decodeURIComponent(description)}
      ${status && "<br><strong>Status</strong>: " + status}
    </p>
  `;
}

document.getElementById("active-projects").insertAdjacentHTML("afterend", html);
})()
</script>
```

That's it.
You can see the live results [here](now#active-projects).
