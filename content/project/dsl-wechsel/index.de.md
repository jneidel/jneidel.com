---
title: "Lohnt es sich den DSL-Anbieter zu wechseln?"
description: "Erfahrungsbericht und Kosten/Nutzenanalyse zum Wechsel des Internetanbieters."
summary: "Kosten/Nutzenanalyse und meine Erfahrungen"
tags:
    - "Service Review"
project-status: completed
date: 2024-07-16
thumbnailAlt: "Internet Router mit vielen bunten Kabeln"
writingTime: 210
---

Der Wechsel des DSL-Anbieters kann sich lohnen.
Die Kosten und Risiken wollen aber bedacht werden und waren für mich weit
höher als erwartet.
Die Angebote waren am Ende nicht so unwiderstehlich, wie sie erst erschienen.

<span class="text-xs">DSL ist der Festnetz- und Internetanschluss.</span>

## Ausgangssituation

Mein zweijähriger DSL-Vertrag bei der Telekom läuft aus bzw. geht für
55€/Monat weiter.

Meine Idee: den Vertrag kündigen und durch Neukundenprämien Geld sparen.

## Potentialanalyse

Die Preise variieren je nach Situation und Jahreszeit.
Meine Suchkriterien: Young Tarife, 250 MBit/s.

Preise sind gerundet und beziehen sich immer auf eine Vertragsdauer von zwei
Jahren.

| Anbieter | Gesamtpreis | Underschied zu aktuell | Unterschied in Prozent |
|-|:-:|:-:|:-:|
| Telekom: aktueller Vertrag | 1320€[^t1] | - | - |
| Telekom: Kündigen + Angebot der Bestandsabteilung | 1110€[^t2] | -210€ | -16% |
| 1&1: Neuabschluss | 840€[^1] | -480€ | -36% |
| MaXXim: Neuabschluss | 720€[^t4] | -600€ | -45% |
| ~Telekom: Neuabschluss~[^tneu] | 672€[^t3] | -648€ | -49% |
| Vodafone: Neuabschluss | 600€[^v] | -720€ | -54% |

{{<katex>}}
[^tneu]: Aufgelistet aus Vergleichszwecken. Für mich keine Option weil ich
nach meiner Kündigung drei Monate Neukundensperre habe.
[^t1]: \\(55€*24\\)
[^t2]: \\(20€*6 + 55€ *18\\),
Kündigung einreichen und von der Bestandsabteilung ein Angebot unterbreiten
lassen.
[^t3]: \\(28€*24\\), Laut Check24, Stand Juni 2024
[^t4]: \\(30€*24\\), Laut Check24, Stand Juni 2024
[^v]: \\(25€*24\\), Laut Check24, Stand Juni 2024
[^1]: \\(35€*24\\), Laut Check24, Stand Juni 2024

### Anbieter

Der DSL-Markt ist ein Oligopol (ein Markt mit wenigen Anbietern.)
Nur Vodafone, die Telekom und einige regionale Anbieter haben eigene
Leitungen im Boden.
Alle anderen Anbieter nutzen zur Bereitstellung diese Netze mit.
Neuabschlusspreis und Konditionen sind dabei im Vergleich zum Netzbesitzer
<abbr title="in der Regel">i.d.R.</abbr> schlechter.

#### Vodafone

Die günstige Option.

Bei dem was ich zu Vodafone gelesen habe kam raus:
In guten Zeiten alles gut.
In schlechten Zeiten bist du komplett auf dich allein gestellt und hast
potentiell für Wochen kein Internet.

#### Telekom

Preislich nah an Vodafone dran.

Support soll meinen Recherchen nach gut sein.
In meinen zwei Jahren hatte ich keine Probleme.

#### 1&1

Vergleichsweise teuer.

Nutzt das Netz der Telekom[^1und1netz].
Telekom als Netzbesitzer garantiert einen vergleichsweise höheren minimalen
Durchsatz (175 MBit/s vs 105 MBit/s.
Die normalerweise zur Verfügung stehende Bandbreite ist aber dieselbe.
Auch bei 1&1 soll der Support meinen Recherchen nach gut sein.

[^1und1netz]: Netzpartner ist die Telekom oder ein regionaler Anbieter ([siehe](https://www.dslweb.de/1und1-dsl-verfuegbarkeit.php#netzpartner))

#### MaXXim

Bereitstellung durch 1&1.
Nach zwei Jahren erhöht sich der monatliche Preis nur auf 35€.
Bei allen anderen Anbietern geht der Preis hoch auf 50-55€.

Unterstützt nur IPv6[^ipv6] (nur für IT-affine Nutzer relevant.)

[^ipv6]: Quelle: Check24 Review und Hinweis in den [technischen Details des FAQ](https://www.maxxim.de/faq/search?search=ipv6#4757)

### Kostenanalyse

Theoretisch ist sollte der Vertragswechsel ganz einfach sein.
Das war aber nicht meine Erfahrung.
Neben den Ersparnissen in der [Potentialanalyse](#potentialanalyse) muss man fairerweise auch die
Kosten und Risiken berücksichtigen (alle aus meiner Perspektive.)

| Anbieter | Ersparnis | Kosten |
|-|:-:|-|
| Telekom: aktueller Vertrag | - | - |
| Telekom: Kündigen + Angebot der Bestandsabteilung | -210€ | 30 min für Kündigung und Anruf |
| 1&1: Neuabschluss | -480€ | Verstückelte 1h+ an ständigen Unterbrechnungen durch Anrufe, Emails und eingeforderter Aktionen[^1unddrama]. |
| MaXXim: Neuabschluss | -600€ | 1-6h IPv6 debugging |
| Vodafone: Neuabschluss | -720€ | Risiko über Wochen kein Internet zu haben und mich mit schlechtem Support herumschlagen zu müssen. |

[^1unddrama]: Die

Alles in der Kostenspalte nimmt nicht nur Zeit in Anspruch.
Die Tätigkeiten reichen auch von nervig bis unausstehlich.
Das muss berücksichtigt werden.

Zudem gelten für alle Anbieterwechel möglicherweise folgende Risiken:
Komplikationen/Internetausfälle beim Wechsel[^schaltung], dauerhaft
schlechtere/instabilere Verbindung, Ungewissheit über das Ausmaß und die
Wahrscheinlichkeit des Wechselprozesses oder der resultierenden Probleme.

[^schaltung]: Das Risiko des Ausfalles ist gering wenn das Internet schon
über die Leitung lief. Die Anbieter koordinieren sich untereinander und
testen auch vor dem Schaltungstermin ob alles passt.
Zum Schaltungstermin wird dann einfach fließend vom einem zum anderen
Anbieter gewechselt.
Ggf. auch ohne Techniker.

#### Mein Schlüsse

Wenn man die Kosten miteinbezieht sehen die ROIs der verschiedenen Optionen
auf einmal nicht mehr so saftig aus.

- Vodafone ist für mich keine Option.
  Das Risiko mich mit dem Support auseinandersetzen zu müssen und im
  Homeoffice kein Internet zu haben ist mir kein Geld der Welt wert.
- MaXXim wäre attraktiv nicht nur wegen der Ersparnis, sondern auch weil sich
  der Preis nach den zwei Jahren nicht signifikant erhöht.
  Und man nicht wieder wechseln müsste.
  Ich wurschtel aber bei mir im Heimnetzwerk rum und habe wirklich keine
  Lust IPv6 zu debuggen.
- 1&1 hat mich schon sehr genervt.
  Sie haben mir gezeigt, dass sie meine Zeit für nicht wichtig erachten.
  Ich muss davon ausgehen das sich dieses Verhalten in Zukunft fortsetzen
  wird. Nein Danke.
- Das Angebot der Telekombestandsabteilung dagegen ist sehr attraktiv.
  Einfach, zeitlich begrenzt, geringes Risiko. Tätigkeit ist am wenigsten
  nervig.
- Nichts tun ist eine bessere Option als ich erst gedacht habe.
  Man muss sich keine Gedanken machen und spart sich diese Analyse.
  Wenn einem seine Zeit/Nerven viel wert sind dann ist dies keine schlechte
  Option.

## Umsetzung

Bei Vertragsabschluss über [Check24](https://www.check24.de/internet) kann
der neue Anbieter direkt den auslaufenden Vertrag für einen kündigen.
Alternativ gibt es ein [Formular](https://www.telekom.de/kontakt/e-mail-kontakt/festnetz/kuendigung) zur Kündigung bei der Telekom.

Ich bin große Umwege gegangen weil ich vieles von dem hier beschriebenen
nicht wusste.
Nachfolgend nur die Kurzversion.

Ich habe manuell gekündigt und von der Bestandsabteilung das beschriebene
Angebot bekommen.

Nach Aufstellung der Preistabelle und unter Berücksichtung persönlicher
Präferenzen habe ich mich für 1&1 entschieden.
Viele nervige Anrufe später soll ich postalisch ein Formular einschicken um
einen Fehler ihrerseits auszugleichen. Ganz sicher nicht.

Ich bleibe jetzt bei der Telekom und hole mir das Angebot der
Bestandsabteilung.

## Fazit

Dieses Projekt habe ich einfach so gestartet, ohne mir groß Gedanken zu
machen.
Ich hatte nur im Hinterkopf, dass der Vertrag ausläuft und dramatisch teurer
wird.

Die Optionen, die ich hier präsentiert habe, waren mir zu dem Zeitpunkt noch
nicht bewusst.
Auch die Risiken und Kosten konnte ich nicht absehen (auch weil ich mich
nicht damit beschäftigt hatte).

In Zukunft werde ich ein ähnliches Projekt vorsichtiger angehen.
Ich werde mir einem klaren Plan machen und vorweg nicht so viel zu
investieren.
