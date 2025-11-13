---
title: "What I'm doing now"
summary: "What project I'm working on right now."
showDateUpdated: true
thumbnailAlt: "A big clock."
showReadingTime: true
---

_<sub>
This is a [now][now-page] page.
<span class="px-3">·</span>
See also: [about me](about)_
</sub>

I'm still happily living in rural [south Brandenburg][ee] with my wife.
Three days a week I work as a backend developer at a [software agency](https://www.endava.com).
I'm open to new employment or freelancing options.

## Active Projects

These are the project I'm currently working on. (List is updated daily.)

<noscript>With JavaScript enabled you would see a dynamically included list of my projects here :)</noscript>

<script>
(async () => {
const json = await fetch("now.json").then(res => res.json());
document.querySelector("time").innerText = "Updated: " + json.date_updated;

let html = "";
for (const { title, status, description } of json.projects) {
  html += `
    <p>
      <strong>${title}</strong>
      ${description && "<br>" + decodeURIComponent(description)}
      ${status && "<br><strong>Status</strong>: " + status}
    </p>
  `;
}

document.getElementById("active-projects").nextSibling.insertAdjacentHTML("afterend", html);
})()
</script>

<details>
<summary>FAQ</summary>
<br>
<details>
<summary>How do you define a project?</summary>

My note-taking system is based on [Tiago Fortes](https://fortelabs.com/) PARA method, which defines a projects as short-term efforts that you're working on now.
Which have:
1. A begining and an end.
2. A specific outcome to achieve.

I use the above a guideline, rather than a strict rule.
To me, every ongoing personal workstream should be represted by a project.
If some work includes multiple todos over a certain time period it is a project.

</details>
<br>
<details>
<summary>What do the emoji mean (🟢🟨🪀)?</summary>

The emoji represent the state of a project:
- 🟢 had some work put into it in the last few days
- 🟨 has not been touched in a few days, but will resume shortly
- 🪀 is blocked by something external (person or time)

The particular emoji were chosen based on their unicode symbols so they would sort in the above order using natural sorting.
For the colors I wanted was inspired by the traffic light.
</details>
<br>
<details>
<summary>How does the automatic updating work?</summary>

Here is the [article](dev/automatic-now-updates) I wrote about my setup.
</details>
<br>
<details>
<summary>What's with the titles?</summary>

Some of them might be in German.
That is in the nature of [how I set this up](dev/automatic-now-updates).
Essentially, what you see here is directly pulled from my note-taking system and the titles first and foremost need to serve my organizational needs.

As the structure of the title, I have two kinds:
1. Reflective of the action performed by the project.
Tiago recommends verbs that imply completion like "finalize", "green-light", "launch", or "publish".
2. Statement of what it is.
"book: NAME" is a book I'm reading. I find this format easier to parse than "read NAME".
"taxes YEAR" is another example, where I prefer the simple statement over a "do taxes YEAR".
</details>


Ich hatte eine etwas andere [Variante](https://github.com/jneidel/jneidel.com/blob/5db16d4161e32176181e30ec111c6407c5374a14/content/now/index.md) ausprobiert.
Letztendlich bin
<br>
<details>
<summary>Why did you choose this way of doing your now page?</summary>

I like the idea of the [now page][now-page], but I don't like maintaining one.
Having a reminder in my calendar works, but was just annoying to do and I did not do it.
With the current approach I simply give the reader the option to look into what I already do anyway: my project management.
For me it only requires a tiny amount of extra work, which is even well integrated into my system.
The simplicity means I will actually do it.
</details>
</details>

## Daily Habits

These activites are part of my every day routine.
- Walk in nature (60+ mins)
- Wim Hof breathing
- Eat a 95% [raw](https://jneidel.de/project/rohkost/){{<de>}}, [vegan](project/going-vegan) diet with [IF](review/intermittent-fasting)
- Exercise

{{<figure src="./forest-walk.jpg" class="w-12/12" caption="I practically have the local forest to myself :slightly_smiling_face:" alt="Path in a forest">}}

[now-page]: https://nownownow.com/about
[ee]: https://www.openstreetmap.org/way/981943938
