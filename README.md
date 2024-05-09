# jneidel.com

A website built with [Hugo](https://gohugo.io) and [Congo](https://jpanther.github.io/congo)

## Development

```sh
make
```

## Production

```sh
make build
```

## Features and customization on top of congo

- pass a `width` property to the `{{<figure>}}` shortcode
- validate internal links and image links
- use githubs dark and light themes for code highlighting
- renamed RSS feeds to `rss.xml`
- hide articles with `excludeRss: true` in the front matter from rss feed
- set Lastmod value based on last commit date
- if date is not to be shown, but dateUpdated is show dateUpdated despite `date = dateUpdated`

## Copyright

The contents of this repository are **NOT** to be used under any cirumstances
without the explicit approval of the author.
All copyrights belong to Jonathan Neidel.
