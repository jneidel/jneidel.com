---
title: "SUN Minimeal Coin verkaufen: $UN in Euro umwandeln"
date: 2024-04-27
description: "Anleitung Sun Minimeal Coin zu Euro umwandeln"
summary: "Eine Erklärung der Schritte die nötig sind um den SUN Minimeal Coin ($UN) zu verkaufen"
tags: ["crypto"]
---

Du hast [SUN Minimeals](https://www.minimeal.com) gekauft und dabei $PO bzw. $UN
Minimeal Coins als Teil des Sun Rewards Programmes bekommen und möchtest diese
nun gerne in Euro auszahlen. Oder überhaupt verstehen wie das geht.

Dazu soll dieser Artikel dienen.
Ich zeige dir den gesamten Prozess Schritt für Schritt ohne dabei zu technisch
zu werden.

Und dann kannst du dich immer noch entscheiden ob du deine $UN Coins halten
willst, in dem Wissen das du auch jederzeit verkaufen kannst.

## Vorraussetzungen

{{<figure class="float-right my-0 rounded" alt="Es werden 975 $PO benötigt um die Bridge zu aktivieren" src="spo-benötigt-um-bridge-zu-aktivieren.png" width="170x">}}

- \>975 $PO oder eine beliebige Anzahl an schon umgewandelten $UN Coins
- Einen Account bei einem Crypto Exchange bei dem Cryptocurrencies gegen Echtgeld
getauscht werden können (z.B. [Kraken](https://www.kraken.com), [Coinbase](https://www.coinbase.com), [Binance](https://www.binance.com))
- Eine Crypto Wallet

### Crypto Wallet einrichten

Du benötigst ein Crypto Wallet zum Aufbewahren deiner Coins.
Ich verwende hier [MetaMask](https://metamask.io/download).
Folge den Anweisungen zum Installieren und speicher die Recovery Phrase in
deinem Password Manager.

Eurer neues Wallet kennt bis jetzt nur das Ethereum Netwerk. Wir werden aber mit
der PulseChain und Polygon interagieren. Mehr zu diesen beiden später.

Zum hinzufügen geht auf [chainlist.wtf](https://chainlist.wtf) und verbindet
eure Wallet. Sucht nach "Pulse" und "Polygon" und fügt diese hinzu.

{{<center>}}
    {{<figure alt="PulseChain Netzwerk der MetaMask Wallet hinzufügen" src="add-pulse.png" width="200px" multi="1">}}
    {{<figure alt="Polgon Netzwerk der MetaMask Wallet hinzufügen" src="add-polygon.png" width="200px" multi="1">}}
{{</center>}}

Jetzt müssen noch die nötigen Tokens importiert werden.

Wechsele dazu oben links in das PulseChain Netzwerk und klickte auf "Import
Token" und füge die Addresse von $UN ein: `0x2460328E89260dDFBa4A942a0cfa417F202C04C2`

{{<figure alt="$UN Token importieren" src="import-sun-token.png" width="210px">}}

Die richtige Token Adresse ist wichtig und kann auch [hier](https://www.minimeal.com/dashboard/sun) gegengeprüft werden.

Um jetzt noch USDT zu importieren wechsle auf das Polygon Netzwerk.
Beim Klick auf "Import Token" muss jetzt einmal das automatische Erkennen von
Tokens aktiviert werden:

{{< figure alt="MetaMask Token Detection Warnung" src="metamask-enable-token-detection.png" width="200px" multi="1" >}}
{{< figure alt="Enable autodetect tokens" src="enable-autodetect-tokens.png" width="400px" multi="1" caption="Die Option 'Autodetect tokens' aktivieren" >}}

Dannach einfach via "Import Token" nach USDT suchen und den ersten Eintrag
auswählen:

{{< figure alt="Import USDT" src="import-USDT-polygon.png" width="200px" >}}

## Umwandlung von $PO -> $UN Minimeal Coin

Falls ihr eure $PO noch nicht in den $UN Minimeal Coin umgewandelt habt könnt
ihr das nun auf der [sunrewards.io](https://sunrewards.io/dashboard) Webseite
tun.
Verbindet euere Wallet mit Sunrewards verbinden, setzt eine Anzahl fest und
klickt auf "Claim". Damit werden die $UN Coin in euere Wallet verschoben.

Jetzt könnt ihr eure $UN Minimeal Coins entweder in euer Wallet halten
([siehe aktueller Kurs](https://www.dexview.com/pulse/0x2460328E89260dDFBa4A942a0cfa417F202C04C2))
oder euch diese in Euro auszahlen.

## Überblick Umwandlungspfad

Der $UN Coin liegt auf der PulseChain.

Einzahlungen von der PulseChain sind bei meinen Crypto Exchange (Kraken) nicht
möglich, deswegen muss ich den Weg über ein anderen Netzwerk gehen.

Prüft gern bei ob euer Exchange Pulse anbietet, das sind bei Kraken die
Optionen:

{{< figure alt="Kraken USDT depot options" src="kraken-deposit-options.png" width="400px" caption="Die verschiedenen Netzwerke zum Einzahlen von USDT" >}}

Aus den Optionen habe ich mich für Polygon entschieden (geringste Gebühren.)

Der Pfad der sich daraus ergibt:

1. $UN gegen PLS innerhalb der PulseChain tauschen (via Exchange)
2. PLS auf der PulseChain gegen USDT auf dem Polygon Netzwerk tauschen (via Bridge)
3. USDT auf dem Polygon Netzwerk bei Kraken einzahlen
4. USDT auf dem Exchange für Euro verkaufen

Wenn euer Exchange PulseChain Einzahlungen unterstützt könnt Schritt 2. überspringen.

Ich würde empfehlen die Schritte erst durchzulesen und zu verstehen bevor es an
die Umsetzung geht.

## $UN gegen PLS auf der PulseChain tauschen

Mit [PulseX](https://pulsex.pulsechainapp.com) können wir Coins auf der
PulseChain tauschen.

1. Verbinde dazu deine Wallet
2. Gib beim Eingangstoken die id des $UN Coin ein: `0x2460328E89260dDFBa4A942a0cfa417F202C04C2`
3. Gib als Ausgangstoken `PLS` ein
4. Swap

{{< figure alt="Swap $UN for PLS" src="sun-to-pls-swap.png" width="400px" >}}

Es fällt ein geringer Beitrag (Gas fees bzw. Transfergebühren) in PLS an (SUN
hat euch bereits ein paar PLS für gas fees in eurem Wallet gutgeschrieben.)

## PLS gegen USDT auf der Polygon Netzwerk tauschen

Um zwischen verschiedenen Netzwerk hin-und-her zu tauschen nutzen wir nun [PortalX](https://portalxswap.io).

Das bedeutet aber auch das wir Transfergebühren (gas fees) in beiden Netzwerken
entrichten müssen (zum senden und im Empfang nehmen.)
Gas fees werden immer in der Hauptwährung des Netzwerkes fällig.
In der PulseChain sind das PLS. Im Polygon Netzwerk MANTIC.

PLS habe wir ja bereits im Wallet, MANTIC aber nicht.
Um also unsere USDT im Polygon Netzwerk entgegen zu nehmen müssen wir erst ein
paar MANTIC an unsere Wallet schicken.

Also:
1. MANTIC beim Exchange für Euro kaufen (ein paar Euro reichen)
{{<figure class="float-right my-0" alt="Mantic auf Kraken kaufen" src="mantic-eur-trade.png" width="100px">}}
2. Polygon Addresse des Wallets kopieren:
{{<figure class="my-0" alt="Polygon Adresse in MetaMask raus kopieren" src="polygon-addresse-im-wallet-kopieren.png" width="400px">}}
3. Beim Exchange an eure Wallet Addrese auszahlen lassen
{{<figure alt="Bei Kraken an Polygon Adresse auszahlen" src="polygon-kraken-withdraw.png" width="500px">}}

Sobald wir unsere MANTIC und PLS haben um gas fees bezahlen zu können kann es
auf [PortalX](https://portalxswap.io) losgehen:
1. Wallet verbinden
2. Von auswählen: PulseChain und dann PLS
3. Nach auswählen: Polygon Netzwerk und dann USDT
4. Swap

{{< figure alt="Swap PLS auf PulseChain for USDT auf Polygon" src="pls-to-polygon-usdt.png" width="700px" >}}

Bei diesem Tausch fallen etwas höhere Gebühren an.
Aber auch nicht mehr als wenige Dollar.

## USDT auf dem Polygon Netzwerk bei Kraken einzahlen

Jetzt sucht ihr euch auf eurem Exchange die Addresse zum Einzahlen von USDT auf
Polygon raus:

{{<figure alt="USDT auf Kraken über Polygon einzahlen" src="deposit-USDT-on-polygon.png" width="470px" caption="Kraken Einzahlfester für USDT im Polygon Netzwerk">}}

Wählt in MetaMask das Polygon Netzwerk aus und versendet von dort die USDT an
die Einzahladdresse eures Exchanges.

Beachte das es hier Mindestgrenzen geben kann (Kraken: 2 USDT.)

## USDT auf dem Exchange für Euro verkaufen

{{<figure class="float-right my-0 rounded" alt="USDT auf Kraken verkaufen: 10 USDT Minimum" src="USDT-minimum-amount.png" width="400px" caption="Mindesteinzahlgrenze bei Kraken">}}
Jetzt kann über das Interface des Exchanges USDT auf Polygon für Euro verkauft
werden. Beachte das es auch hier Mindestgrenzen geben kann.

Den Euro Betrag könnt ihr euch dann wie gewohnt auf euer Bankkonto auszahlen.

## Abschließend

Wenn du mir ein Trinkgeld da lassen willst kannst du mir gern ein paar $UN Coins oder PLS
zukommen lassen. Meine PulseChain Addresse ist: `0x4612Bd3FDc0471fF81D94595246777436c22DAF1`

Anmerkungen gerne an: [sun@jneidel.com](mailto:sun@jneidel.com)
