# Repository Guidelines

## Project Structure & Module Organization
- `content/` holds site pages and posts in Markdown, organized by section (e.g., `guide/`, `essay/`, `newsletter/`).
- `layouts/` contains Hugo templates and shortcodes
- `themes/congo/` is the theme submodule, `themes/congo/layouts/` provides fallbacks for everything not in `layouts/`
- `assets/` is for source assets (Tailwind input, images); compiled CSS lives in `assets/css/compiled/`.
- `static/` holds files copied verbatim to the site root.
- `config.toml`, `config/`, and `i18n/` define site settings and translations.
- `public/` is the build output; treat it as generated.

## Build Commands
- `make` runs Tailwind in watch mode and starts the Hugo dev server on `http://localhost:1313`.
- `make build` builds a production site with minification (writes to `public/`).
- `make tw` runs a one-off Tailwind build

## Coding Style & Naming Conventions
- Content is Markdown with Hugo front matter; follow existing section patterns and front matter keys in nearby files.
- Use short, descriptive filenames and section slugs (e.g., `content/guide/emacs-completion.md`).
- Do not hand-edit generated assets: `assets/css/compiled/main.css` and `public/` are build outputs.
- Styling: TailwindCSS; prefer utility classes over ad‑hoc CSS.
- Prefer double quotes over single quotes.
- Don't add any comments, use descriptive variable names instead
- In variable names don't shorten term length name (e.g. "description" instead of "desc", "index instead of "idx"). In arrow functions shorthands may be used.

## Validations
- `make test` runs a production Hugo build and reports path warnings and template metrics.
- For content updates, verify internal links and images render correctly.

## Security & Configuration Tips
- Keep secrets and deploy credentials out of the repo; prefer environment variables for local overrides.
