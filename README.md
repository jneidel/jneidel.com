# jneidel.com/blog

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
