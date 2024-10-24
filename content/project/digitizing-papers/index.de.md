---
title: "Papierkram digitalisieren"
description: "Wie ich meinen die Digitalisierung meiner papierhaften Dokumente umgesetzt habe. Werkzeuge, Motivation und Vorgehen sind erklärt."
summary: "Wie ich meine papierhaften Dokumente digital verfügbar gemacht habe."
tags:
    - Digitalisierung
slug: papierkram-digitalisieren
project-status: completed
date: 2024-10-24
thumbnailAlt: "Stapel voller zu digitalisierender Dokumente"
writingTime: 125
---

## Was?

Ich habe zuhause einen wachsenden Berg an Papierkram rumliegen.
Behördenschreiben, Verträge, vereinzelte Rechnungen, dies und das.
Die sind schon semi-ordentlich abgeheftet, aber weil da ständig was
dazukommt ist jede Ordnung nur temporär.

Viel beziehe ich schon digital.
Aber digital allein heißt nicht das alles automatisch besser ist.
Unsortierte Ordner, Rechnungen die an Emails hängen oder auf zig Plattformen
abholbar sind machen mir dort auch teils das Leben schwer.

Es geht also nicht "nur" um das Digitalisieren von Papierkram, sondern auch
darum ein System und eine einheitliche Ordnung in der digitalen Welt zu
kreieren.

## Warum?

Ab und zu muss ich auf meine Papierdokumente zurückgreifen.
Das digital tun zu können, mit Volltextsuche und Filtern, stellt den
primären Mehrwert dar.

Außerdem wird mein zukünftiger Workflow für papierhafte Dokumente
vereinfacht.
Scannen, Import, Vernichten.

## Wie?

Ich habe schon ein ausgefeiltes [_Note-taking System_](https://www.buildingasecondbrain.com/), in das man diese
(Papier-)Unterlagen einbetten könnte.
Ich habe mich aber dagegen entschieden diese einfach dort abzulegen.

Praktisch alles was bei mir digital geordnet werden soll fällt in
"Referenzen."
Es soll nur abgelegt werden.
(Also _read-only_, kein rum bewegen.)
Außerdem wären ein paar Metadaten wie Datum, Korrespondent und steuerliche
Einheit sehr nützlich.
Das kann alles abgebildet werden, ist aber viel manuelle Arbeit in einer
Umgebung die nicht dafür ausgelegt ist.

### Software für die Ordnung

Anforderungen sind also: Volltextsuche, Filter, Metadaten und
Automatisierung.
[Paperless](https://docs.paperless-ngx.com/) kann das und noch viel mehr.
Das System lernt mit der Zeit die Metadaten besser zu befüllen.
Hat eine gute UX.
Und ich kann das bei mir zuhause auf dem Server laufen lassen (bedeutet:
keine Storagelimitationen oder extra Kosten.)

Es ist nicht Teil dieses Guides Paperless aufzusetzen.
Das bekommst du alleine hin.
Wenn du mich persönlich kennst, kannst du mich fragen, ob ich dir eine
Instanz beim mir auf dem Server einrichte.

### Software zum Scannen

Seit vielen Jahren schon benutze ich [CamScanner](https://www.camscanner.com/)
um sehr gut lesbare Scans mit meinem Handy zu erstellen.
Es ist eine der Apps, die ich für absolut essentiell halte.
Auto-crop, extrem starke Aufhellung und Verbesserung des Bildes, Finger
entfernen, mehrere Seiten als PDF zusammenfassen, OCR, schnelle Workflows,
Weboberfläche und noch vieles mehr macht diese App zu einem unverzichtbarem
Werkzeug.

## Umsetzung

Im ersten Schritt habe ich mir die Struktur der Metadaten überlegt (mit
Paperless selbst war ich schon vertraut.)

### Metadaten-Struktur

Für die Arten Dokumenten der Dokumente bin ich zu dieser Auflistung
gekommen:

- **Beleg**: Etwas das ich bezahlt habe, etwa Rechnung vom ISP oder
Laptop-Einkauf
- **Abrechnung**: Die Endabrechnung eines gewissen Zeitraumes, etwa
Steuerbescheid, Strom- und Nebenkostenabrechnung
- **Vertrag**: Vollständige Konditionen zum Vertragsbeginn, etwa
Arbeitsvertrag oder Haftpflichtversicherung
- **Anpassung**: Veränderung der Konditionen eines Vertrages, etwa
Versicherungsanpassung, Miets- oder Gehaltserhöhung
- **Mitteilung**: Allgemeine Infos, etwa Steuernummerzuweisung oder Schufa
- **Urkunde**: Bescheinigungen jeder Art, etwa Studium, Heirat, <abbr title="Nachweis zur Hauptuntersuchung des Autos">HU</abbr>
- **Versandt**: Durch mich abgeschickte Dokumente/Briefe, etwa SEPA-Lastschriftmandat
fürs Finanzamt

Der Nutzen ergibt sich daraus nach Bedarf Arten via Filter ein- oder
auszuschließen zu können.

Um meine Steuererklärung zu erleichtern, habe ich auch noch Tags, welches
die Zugehörigkeit zur einer steuerlichen Identität repräsentieren:

- Angestelltenverhältnis
- Selbständigkeit
- GbR mit meiner Frau

### Richtlinien

Wie soll das Scannen von statten gehen?
Auf welche grundlegenden Spielregeln und wichtige Pfeiler will ich
während der Durchführung achten?

_Was nicht benötigt wird, kommt weg._
<br>Erst überlegen, ob ich dieses Dokument wirklich digitalisieren sollte.
Alles was nicht zwingend in Papierform zu behalten ist, wandert nach dem
Scannen ins Recycling.

_Nicht alles auf einmal._
<br>Wenn ich alles zusammen in Paperless hochlade wird das Machine Learning
System die gleichen Fehler wiederholen.
Erst wenn ich die Vorschläge verbessere lernt das System wo es lang geht.

### Prozess

{{<figure src="./cover.de.jpg" class="w-10/12" alt="Stapel davor aus der Seitenansicht">}}

Der gesamte Durchlauf des Scannen und Verarbeitens hat 4:30h gedauert.

{{<center>}}
    {{<figure src="./before.de.jpg" class="w-12/12" alt="Stapel Davor" caption="Ordner davor">}}
    {{<figure src="./after.de.jpg" class="w-12/12" alt="Stapel Danach" caption="Ordner danach">}}
{{</center>}}

Der davor Stapel hatte sich schon in Grenzen gehalten, weil ich vor zwei
Jahren schon radikal ausgemistet hatte.

{{<center>}}
    {{<figure src="./paperless-before.de.png" class="w-12/12" alt="Paperless stats before" caption="Paperless Statistik davor">}}
    {{<figure src="./paperless-after.de.png" class="w-12/12" alt="Paperless stats after" caption="Paperless Statistik danach">}}
{{</center>}}

<br>
{{<figure src="./schmierpapier.de.jpg" class="w-12/12" alt="Aussortiertes dient als Schmierpapier" caption="Überreste finden Verwendung als Schmierpapier">}}

## Fazit

Der Prozess war nicht so mühsam wie ich es mir vorgestellt hatte.
Und jetzt einfach alle meine Dokumente durchsuchbar zur Verfügung zu haben,
ist es auf jeden Fall wert.
Paperless und CamScanner haben wie erwartet super funktioniert.
