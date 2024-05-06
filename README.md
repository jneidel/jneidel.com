# jneidel.com

A website built with [Hugo](https://gohugo.io) and [Congo](https://jpanther.github.io/congo)

## Development

Build in development:

```sh
brave http://localhost:1313 & hugo server -D -p 1313 --navigateToChanged
```

### Git hooks

**pre-push**:

```sh
#!/bin/sh

./deploy
true
```

## Features added on top of congo

- pass a `width` property to the `{{<figure>}}` shortcode
- validate internal links and image links
