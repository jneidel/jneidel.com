---
title: Browser configuration
date: 2023-11-09T16:51:58+01:00
draft: true
tags:
    - tools
---

The browser is such an essential tool today that you should really take the time
to create a setup that works for you and is integrated with your other
workflows.

In this guide I'll dive into everything I do with my browser.

## What browser to use?

**My requirements:**

Browsers without support for extensions are handicapped and as such not serious contenders.
That leaves only Firefox and the Chromium family.

One should be aware that Chromium-based browsers have [>60% market
share](https://gs.statcounter.com/browser-market-share) vs Firefox's 3%.
If you're developing websites, this might be relevant because pages render
differently in different browsers and it might be wise to use the browser that
most clients are likely to use.

I'm also looking for vendor that cares about privacy[^mv3].

**Main browser:**

My main browser is [Brave](https://brave.com).
I have disabled all their gimmicks like ads, crypto currency and AI integration.

Previously I used [Ungoogled Chromium](https://github.com/ungoogled-software/ungoogled-chromium)[^uc].
Firefox is also a fine option, it lacks nothing and is more
customizable when it comes to privacy.

Please don't use Google Chrome. It's spyware.
[Chromium](https://www.chromium.org/Home/) or [Brave](https://brave.com) are
drop-in replacements.

**Secondary browsers:**

As secondary browsers I'm using [Firefox Developer
Edition](https://www.mozilla.org/en-US/firefox/developer/) and
[Chromium](https://www.chromium.org/Home/).

In Firefox I'm staying into a Facebook account (for development purposes)
without them tracking me across all my browsing.
I use it for testing and some development.

In Chromium I have [Trading View](https://www.tradingview.com/) open automatically.
It don't have my suite of extensions installed because they mess with the charts.

## Browser extensions

Extensions are of supreme importance to me, as they allow me to shape the
browsing experience to my liking.

Ordered by importance.

### uBlock Origin

[firefox](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/) |
[chrome](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) |
[git](https://github.com/gorhill/uBlock)

I can't stand ads and uBlock Origin is the best ad blocker out there.
A must have.

On top of the ad-blocking you can also use it to remove visual clutter from
webpages using the picker:

{{<img-height height="300px" url="/img/2023/browser/ublock-picker.png">}}

**Some before and after demonstrations of what you can do with it:**

- Hiding ads on the Amazon homepage:

{{<img-width width="325px" url="/img/2023/browser/ama-before.png">}}
{{<img-width width="295px" url="/img/2023/browser/ama-after.png">}}

- Hiding side bars on Stack Overflow:

{{<img-width url="/img/2023/browser/so-before.png">}}
{{<img-width url="/img/2023/browser/so-after.png">}}

- Hiding banners on Goodreads:

{{<img-width url="/img/2023/browser/gr-before.png">}}
{{<img-width url="/img/2023/browser/gr-after.png">}}

- Hiding the product update notification bubble on Trading View:

{{<img-width width="250px" url="/img/2023/browser/tv-before.png">}}
{{<img-width width="240px" url="/img/2023/browser/tv-after.png">}}

- Hiding thumbnails on Youtube/Invidious:

{{<img-width url="/img/2023/browser/yt-before.png">}}
{{<img-width url="/img/2023/browser/yt-after.png">}}

### <++>

[firefox](<++>) |
[chrome](<++>) |
[git](<++>)

[^uc]: Maintaining it was a hassle, even with a binary release. Not to speak of
    recompiling the damned thing every update.
[^mv3]: A vendor that will circumvent privacy threatening features like [Manifest V3](https://www.eff.org/deeplinks/2021/12/chrome-users-beware-manifest-v3-deceitful-and-threatening) or Googles mechanisms for phoning home.
