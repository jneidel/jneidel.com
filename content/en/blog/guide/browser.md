---
title: Browser configuration
date: 2023-11-29T16:51:58+01:00
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

Relevant for web developers to know is that Chromium-based browsers have [>60%
market share](https://gs.statcounter.com/browser-market-share) vs Firefox's 3%.

I am also looking for vendor that cares about privacy[^mv3].

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

In Chromium I have [TradingView](https://www.tradingview.com/) open automatically.
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

### Surfing Keys

[firefox](https://addons.mozilla.org/en-US/firefox/addon/surfingkeys_ff/) |
[chrome](https://chrome.google.com/webstore/detail/surfingkeys/gfbliohnnapiefjpjlpjnehglfpaknnc) |
[git](https://github.com/brookhong/Surfingkeys) |
[alternative](https://github.com/philc/vimium)

Navigate your browser through keybindings.

Powerful and configurable.
I'm only using a small set of keys that fulfills all my needs:

- Movements: `j`, `k`, `gg`, `G`, `d`, `u`, `<SPC>`
- Open links: `f`, `af`, `gf`, `cf`
- Copy link: `yf` (very useful for grabbing magnet links)
- Show all bindings: `?`

### Dark Reader

[firefox](https://addons.mozilla.org/en-US/firefox/addon/darkreader) |
[chrome](https://chrome.google.com/webstore/detail/dark-reader/eimadpbcbfnmbkopoojfekhnkhdbieeh) |
[git](https://github.com/darkreader/darkreader)

Dark mode for every website.

Quality of the results vary, but I love having the option.
Definitely map the website toggling so you can quickly turn it off (I'm using `Alt-Shift-a`):

{{<img-height height="250px" url="/img/2023/browser/darkreader-toggle.png">}}

### KeepassXC

[firefox](https://addons.mozilla.org/en-US/firefox/addon/keepassxc-browser/) |
[chrome](https://chrome.google.com/webstore/detail/keepassxc-browser/oboonakemofpalcgghocfoadofidjkkk) |
[git](https://github.com/keepassxreboot/keepassxc-browser)

Insert passwords from [KeepassXC](https://keepassxc.org), my preferred password
manager[^xc].

Works nicely.

Some quirks I've found: sometimes stuff will be inserted into random fields,
OTP insert doesn't working consistently and HTTP Basic Auth has problems filling
if there are multiple passwords available.

[^xc]: Passwords are stored locally, nothing is connected to the internet.
You must not rely on a company to manage this most sensitive of data.
They will mess it up by themselves and/or get hacked (they are one of the most
attractive targets after all.)

### LeechBlock

[firefox](https://addons.mozilla.org/en-US/firefox/addon/leechblock-ng/) |
[chrome](https://chrome.google.com/webstore/detail/leechblock-ng/blaaajhemilngeeffpbfkdjjoefldkok) |
[website](https://www.proginosko.com/leechblock/)

Block or delay access to certain websites. Based on day of the week, hour or how
much time you've already spent on the site.

It's quite configurable and should fullfil all your blocking needs.
I now use it to deny myself access to YouTube, manga sites and such on all days
of the week but one. That can be achieved like so:

{{<img-height height="300px" url="/img/2023/browser/leechblock-when.png">}}

To always block the sites just select all days of the week.

Set a password in `General > Access Control` to make it a little harder for
yourself to mess with the settings in a moment of weakness.

### SponsorBlock

[firefox](https://addons.mozilla.org/en-US/firefox/addon/sponsorblock/) |
[chrome](https://chrome.google.com/webstore/detail/sponsorblock-for-youtube/mnjggcdmjocbbbhaepdhchncahnbgone) |
[website](https://sponsor.ajay.app)

Automatically skip sponsored sections in YouTube videos.

Multiple kinds of sections are blockable, here are the sections and my settings:

{{<img-height height="700px" url="/img/2023/browser/sponsor-block-options.png">}}

It also works on alternative YouTube clients like [Invidious](https://github.com/iv-org/invidious).

### FastForward

[firefox](https://github.com/FastForwardTeam/FastForward/blob/main/docs/INSTALLING.md) |
[chrome](https://chromewebstore.google.com/detail/fastforward/icallnadddjmdinamnolclfjanhfoafe) |
[git](https://github.com/FastForwardTeam/FastForward)

Skip link shorteners that make you wait ("You will be forwarded in 10 seconds",
etc.)

### I still don't care about cookies

[firefox](https://addons.mozilla.org/en-US/firefox/addon/istilldontcareaboutcookies/) |
[chrome](https://chrome.google.com/webstore/detail/i-still-dont-care-about-c/edibdbjcniadpccecjdfdjjppcpchdlm) |
[git](https://github.com/OhMyGuus/I-Still-Dont-Care-About-Cookies)

Hide cookie banners automatically.

### Bypass Paywalls

[firefox](https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean) |
[chrome](https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean) |
[git](https://gitlab.com/magnolia1234/bypass-paywalls-chrome-clean)

Ignore website paywalls (e.g. NYT free articles limit.)

I have this enabled for all supported sites.

### Libredirect

[firefox](https://addons.mozilla.org/firefox/addon/libredirect/) |
[chrome](https://libredirect.github.io/download_chromium.html) |
[git](https://github.com/libredirect/libredirect)

Redirect to alternative frontends for some popular websites.
These alternative frontends are usually charactarized by a simpler – read easier
to use – interface, better performance and more privacy.

I have this enabled for almost all of the supported websites that I use.

Some of these sites lack some features, for example:
Libremdb (IMDB) doesn't have user reviews,
Dumb (Genius) doesn't have user-contributed lyrics
annotations,
Teddit (Reddit) throws to a "Too many requests" error from time to time.

### Autofill

[firefox](https://addons.mozilla.org/en-US/firefox/addon/autofill-quantum/) |
[chrome](https://chromewebstore.google.com/detail/autofill/nlmmgnhgdeffjkdckmikfpnddkbbfkkk)

Automatically fill forms and execute arbitrary code.

I use this to automatically log me into websites that have a particularly short
cookie durations:

{{<img-width width="700px" url="/img/2023/browser/autofill-demo.png">}}

I also have it check some boxes for me on a form that I have to submit weekly:

```js
Array.from(document.querySelectorAll(".surveyradiobutton")).filter(x => x.value === "-9").forEach(x => x.checked = true)
```

### <++>

[firefox](<++>) |
[chrome](<++>) |
[git](<++>)


### <++>

[firefox](<++>) |
[chrome](<++>) |
[git](<++>)


### <++>

[firefox](<++>) |
[chrome](<++>) |
[git](<++>)


[^uc]: Maintaining it was a hassle, even with a binary release. Not to speak of
    recompiling the damned thing every update.
[^mv3]: A vendor that will circumvent privacy threatening features like [Manifest V3](https://www.eff.org/deeplinks/2021/12/chrome-users-beware-manifest-v3-deceitful-and-threatening) or Googles mechanisms for phoning home.
