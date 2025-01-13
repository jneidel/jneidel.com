---
title: "Die SMA Ampel für den S&P 500"
description: "Mit einfachem Ampelsystem den Trend des Gesamtmarktes bestimmen. Installation in TradingView und Beschreibung der Anwendungsweise."
summary: "Ein einfaches System zur Bestimmung der Marktphase."
tags:
date: 2025-01-13
thumbnail: "end-result*"
thumbnailAlt: "SPX Ampel"
writingTime: 40
---

Ein einfaches Ampelsystem zur Bestimmung der Marktphase.

{{<figure src="./end-result.de.png" class="w-12/12" alt="Endergebnis" caption="So sieht die SPX Ampel im Chart aus">}}

Der S&P 500 (SPX) dient als Repräsentation des Marktes.

## Nutzung

Der Moving Average zeigt an in welcher Phase sich der Markt befindet.

- grün = Bullenmarkt
- gelb = Übergangsphase
- rot = Bärenmarkt

Die Ampelfarben können an Regeln in Verbindung mit der eigenen Strategie
geknüpft werden.
Etwa:
- Nur bei grüner Ampel dürfen Puts verkauft werden
- Nur bei roter Ampel dürfen Calls verkauft werden
- Bei gelber Ampel nicht tun!

## Installation

Um die Ampel zu installieren öffne einfach den Chart zu dem du diesen
Indikator hinzufügen möchtest.
Dann gehe unten im Chart auf "Pine Editor".

{{<figure src="./step1.de.jpg" class="w-12/12" alt="Pine Editor öffnen" caption="Pine Editor öffnen">}}

Im Pine Editor klicken wir uns durch zum Erstellen eines neuen Indikators:
1. Auf den Pfeil am Skriptnamen klicken
2. "Neu erstellen"
3. "Indikator"

{{<figure src="./step2.de.jpg" class="w-12/12" alt="Neuen Indikator erstellen" caption="Durchklicken um neuen Indikator zu erstellen">}}

Als nächstes gilt es dieses Skript einzufügen (Copy-Paste):

```pinescript
//@version=6
indicator(title = 'SMA Ampel', shorttitle = 'Ampel', overlay = true)

len = input.int(21, minval = 1, title = 'SMA length')
out = ta.sma(close, len)

ampelRed = out > close and out > open and out[1] > close[1] and out[1] > close[1] and out[2] > close[2] and out[2] > close[2]
ampelGreen = out < close and out < open and out[1] < close[1] and out[1] < close[1] and out[2] < close[2] and out[2] < close[2]
ampel = ampelGreen ? color.green : ampelRed ? color.red : color.rgb(251, 192, 45)

plot(bool(out) ? out : na, title = 'SMA', color = ampel, linewidth = 3, display = display.pane)
```

Und dann zu Speichern (Strg + S oder per Klick auf den Skriptnamen.)

{{<figure src="./step3.de.jpg" class="w-12/12" alt="Skript einfügen und Speichern" caption="Obenstehendes Skript einfügen und auf Speichern klicken">}}

Jetzt kann der fertige Indikator dem Chart hinzugefügt werden.

{{<figure src="./step4.de.jpg" class="w-12/12" alt="Skript dem Chart hinzufügen" caption="Indikator dem Chart hinzufügen">}}

Wenn du den den Indikator später einem beliebigem anderem Chart hinzufügen
möchten, kannst du diesen ganz regulär über die Indikatorensuche hinzufügen.
Einfach nach dem gegebenem Namen ("SMA Ampel") suchen.
Dieser findet sich in der Kategorie "Persönliches".

## Warum nicht in TradingView verfügbar?

Das Skript wurde gesperrt, weil es TradingView nicht originell und nützlich
genug war.
Es ist halt "nur" ein einfacher SMA und auch wenn es den nicht eingefärbt
gibt, wollen die den nicht.

<details>
<summary>Komplette Austausch</summary>

> Hi, This is a warning concerning your violation(s) of our House Rules on Script Publishing:<br><br>
> ► Originality and usefulness
Ensure your script is original and will add value to the Community Scripts. Avoid rehashing open-source built-ins, auto-generated code, code from our or third-party learning materials, or other public domain code. While such exercises might help you learn Pine, they do not add to the body of knowledge on TradingView.
>
> ► Description
Write a detailed and meaningful description that allows users to understand how your script is original, what it does, how it does it and how to use it. Give traders an idea of the concepts underlying your calculations. Mentioning only that your script follows trends or is intended for scalping does not help traders much; it will be more useful to traders if you also give them an idea of which of the hundreds of trend-detection or scalping methods you use.
>
> ► Description
Publishers of open-source scripts should keep in mind that few TradingView users can read Pine. They rely on your description to understand how to use your script.

Meine Antwort darauf, welche ignoriert wurde:

> Originality and usefulness<br>
It is useful for me and the people I shared it with.
>
> Description<br>
It's a simple indicator that does one thing and does it well (cf. unix philosphy).
The description clearly outlines that.
</details>

## Funktionsweise

Der Simple Moving Average wird basierend auf der Kerze (Open- und
Closingprice) eingefärbt:
- grün: Kerze ist über dem SMA
- gelb: Kerze schneidet den SMA
- rot: Kerze ist unter dem SMA

Um ein gleichmäßiges Ergebnis zu erziehlen und die Übergangsphase zu
verdeutlichen schließt dies auch angrenzende Kerzen mit ein.
Eine schnelle Bewegung kann also gelb aussehen, obwohl die Kerze sich schon
komplett über/unter dem SMA befindet.
