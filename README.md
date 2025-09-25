# jneidel.com

<img width="400px" src="https://github.com/jneidel/jneidel.com/assets/25589715/353b68d4-04cf-4db6-bea6-218e7290d659"/><img width="400px" src="https://github.com/jneidel/jneidel.com/assets/25589715/5b90cb33-ce98-4c98-979e-58d42b921689"/>

This is my website built with [Hugo](https://gohugo.io) & [Congo](https://jpanther.github.io/congo) and is deployed on [Netlify](https://netlify.com).
These tools do an amazing amount of work for you and take care of all the hard
parts. You just need to configure and hack them to your liking.

## Things that hugo and congo provide for free

These are the things I'm utilizing.

- Fully responsive layout with [Tailwind CSS 3](https://tailwindcss.com) -> allows for easy customization from markdown
- Supply your own colour scheme
- Dark mode -> easy to hook into in css
- Multilingual content support -> (de/en)
- Client-side site search powered by Fuse.js -> works great
- Diagrams and visualisations using Mermaid, Charts using Chart.js
- Automatic image resizing using Hugo Pipes
- Heading anchors, Tables of Contents, Code copy, Buttons, Badges and more
- HTML and Emoji support in articles
- SEO friendly
- Analytics integration
- RSS feeds, Favicons
- Optimised for performance and accessibility with perfect Lighthouse scores

### Features and customization on top of congo

This is the stuff I added that improves functionality.

- Privacy-friendly YouTube shortcode using lite-youtube
- Validate that internal links and image links exist
- Use githubs dark and light themes for code highlighting
- Renamed RSS feeds to `rss.xml`
- Exclude articles from the rss feed with `excludeRss: true` in the front matter
- Set Lastmod value based on last commit date
- If `date = dateUpdated` and `showDate: false` and `showDateUpdated: true` -> show dateUpdated
- Hovering the logo underlines the title

Plus shortcodes and such.

## Run

```sh
# dev
make

# prod
make build
```

## Custom frontmatter

On top of what is provided by hugo and congo.

- `excludeRSS: bool` - exclude the post from all RSS feeds
- `hideNewsletterSignup: bool` - hide the newsletter signup prompt per
default included in the footer on this post
- `writingTime: int` - number of minutes spent writing this post over it's
lifespan (just analytics for me, not used anywhere)

## Copyright

The contents of this repository are **NOT** to be used under any cirumstances
without the explicit approval of the author.
All copyrights belong to Jonathan Neidel.
