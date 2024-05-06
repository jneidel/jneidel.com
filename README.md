# jneidel.com

A website built with [Hugo](https://gohugo.io) and [Congo](https://jpanther.github.io/congo)

## Development

Build in development:

```sh
brave http://localhost:1313 & hugo server -D -p 1313 --navigateToChanged
```

### Install

```sh
git submodule init
git submodule update
cd themes/congo
npm i
```

### Git hooks

**pre-push**:

```sh
#!/bin/sh

./deploy
true
```

## Features and customization on top of congo

- pass a `width` property to the `{{<figure>}}` shortcode
- validate internal links and image links
- use githubs dark and light themes for code highlighting
- renamed RSS feeds to `rss.xml`
- hide articles with `excludeRss: true` in the front matter from rss feed
