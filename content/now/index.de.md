---
title: "Was ich aktuell mache"
summary: "Die Projekte an denen ich aktuell arbeite."
showDateUpdated: true
thumbnailAlt: "Eine große Uhr."
---

_<sub>
Dies ist eine [now page][now-page].
<span class="px-3">·</span>
Siehe auch: [Über mich](about)_
</sub>

Ich lebe immer noch glücklich mit meiner Frau im [südlichen Brandenburger][ee] Hinterland.
Drei Tage die Woche arbeite ich als Backend Entwickler bei einer [Software Agency](https://www.endava.com).
Ich bin offen für ein neues Angestellten- oder Freelancingverhältniss.

## Aktive Projekte

Hieran arbeite ich aktuell. (Liste wird täglich aktualisiert.)

<noscript>Mit aktiviertem JavaScript würdest du hier eine dynamisch integrierte Liste meiner Projekte sehen :)</noscript>

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

document.getElementById("aktive-projekte").nextSibling.insertAdjacentHTML("afterend", html);
})()
</script>

<details>
<summary>FAQ</summary>
<br>
<details>
<summary>Warum ist fast alles auf Englisch?</summary>

Das hat damit zu tun wie ich es [technisch aufgesetzt habe](https://jneidel.com/dev/automatic-now-updates){{<en>}}.
Die Textschnippsel kommen direkt aus meinen Note-taking System, welches ich primär in Englisch führe.
Der Einfachkeit und Authentizität halber habe ich mich gegen eine automatische Übersetzung entschieden.
</details>
<br>
<details>
<summary>Wie definierst du "Projekt"?</summary>

Mein Note-taking System basiert auf [Tiago Fortes](https://fortelabs.com/) PARA Methode.
Diese definiert Projekte als kurzfristige Anstrengungen an denen du gerade dran bist. Sie haben:
1. Ein Anfang und ein Ende.
2. Eine spezifisches Endresultat was erziehlt werden soll.

Ich benutzt das eher als Richtline, nicht als klare Regel.
In meinem System wird jeder laufende Workstream als Projekt aufgesetzt.
Wenn es mehrere Aufgaben über einen gewissen Zeitraum enthält ist es ein Projekt.

</details>
<br>
<details>
<summary>Was hat es mit den Emoji auf sich (🟢🟨🪀)?</summary>

Die Emoji repräsentieren grob den Status des Projektes:
- 🟢 habe ich in den letzten paar Tagen angefasst
- 🟨 wurde in den letzten Tagen nicht angefasst, werde ich aber zeitnah fortführen
- 🪀 wird durch etwas Externes blockiert (personell oder zeitlich)


Die spezifischen Emoji wurden nach ihren Unicode Symbolen gewählt, sodass sie mit natürlicher Sortierung in obiger Reihenfolge aufgelistet werden.
Farblich wurde ich durch die Ampel inspiriert.
</details>
<br>
<details>
<summary>Wie funktioniert das automatische Aktualisieren?</summary>

Ich habe einen [Artikel](https://jneidel.com/dev/automatic-now-updates){{<en>}} darüber geschrieben wie ich es aufgesetzt habe.
</details>
<br>
<details>
<summary>Wie kommen die Titel zustande?</summary>

Ich habe zwei Muster die ich verwende:
1. Der Titel gibt wieder was durch das Projekt ausgeführt wird.
Tiago empfiehlt in denen das Abschließen des Projektes drin steckt wie "finalize", "green-light", "launch", or "publish".
Ich bevorzuge Englische Titel weil die aufgrund der Englischen Grammatik mit dem Verb beginnen.
2. Ein Titel der benennent um was es geht.
"book: NAME" ist ein Buch was ich lese. Das finde ich einfacher zu lesen als "read NAME".
"taxes YEAR" ist ein anderes Beispiel wo ich die simple Benennung der Verbform bevorzuge ("do taxes YEAR".)
</details>
<br>
<details>
<summary>Warum hast du diese Form für die now page gewählt?</summary>

Ich mag die Idee einer [now page][now-page], war aber keine Fan davon meine eigene regelmäßig zu pflegen.
Termin im Kalendar funktioniert, aber es war nervig und ich habe es nicht gemacht.
Die jetztige Variante ist einfach ein Einblick in das was ich sowieso schon tun: meine Projekte verwalten.
Damit bedeutet es für mich nur minimalen Mehraufwand, welcher auch direkt in mein System mit integriert ist.
Die Einfachheit stellt sicher das ich es auch mache.
</details>
</details>

## Tägliche Routinen

Diese Aktivitäten mache ich jeden Tag:
- Ein Spaziergang in der Natur (60+ min)
- Wim Hof breathing
- Ernährung mit 95% [Rohkost](project/rohkost)anteil, [Vegan](https://jneidel.com/project/going-vegan){{<en>}} und [IF](https://jneidel.com/review/intermittent-fasting){{<en>}}
- Sport

{{<figure src="./forest-walk.jpg" class="w-12/12" caption="Den örtlichen Wald habe ich praktisch für mich allein :slightly_smiling_face:" alt="Path in a forest">}}

[ee]: https://www.openstreetmap.org/relation/62505
[now-page]: https://nownownow.com/about
