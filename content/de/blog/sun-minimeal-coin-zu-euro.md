---
title: SUN Minimeal Coin ($UN) in Euro umwandeln
date: 2024-04-27T10:48:54+02:00
tags:
    - crypto
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

- \>975 $PO oder eine beliebige Anzahl an schon umgewandelten $UN Coins
- {{<img-width width="200px" url="/img/2024/spo-benötigt-um-bridge-zu-aktivieren.png" alt="Es werden 975 $PO benötigt um die Bridge zu aktivieren">}}
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

{{<img-height height="400px" url="/img/2024/add-pulse.png" alt="PulseChain Netzwerk der MetaMask Wallet hinzufügen">}}
{{<img-height height="400px" url="/img/2024/add-polygon.png" alt="Polgon Netzwerk der MetaMask Wallet hinzufügen">}}

Jetzt müssen noch die nötigen Tokens importiert werden.

Wechsele dazu oben links in das PulseChain Netzwerk und klickte auf "Import
Token" und füge die Addresse von $UN ein: `0x2460328E89260dDFBa4A942a0cfa417F202C04C2`

{{<img-height height="400px" url="/img/2024/import-sun-token.png" alt="$UN Token importieren">}}

Die richtige Token Adresse ist wichtig und kann auch [hier](https://www.minimeal.com/dashboard/sun) gegengeprüft werden.

Um jetzt noch USDT zu importieren wechsle auf das Polygon Netzwerk.
Beim Klick auf "Import Token" muss jetzt einmal das automatische Erkennen von
Tokens aktiviert werden:

{{<img-width width="200px" url="/img/2024/metamask-enable-token-detection.png" alt="MetaMask Token Detection Warnung">}}
{{<img-width width="400px" url="/img/2024/enable-autodetect-tokens.png" alt="Enable autodetect tokens">}}

Dannach einfach via "Import Token" nach USDT suchen und den ersten Eintrag
auswählen:

{{<img-height height="300px" url="/img/2024/import-USDT-polygon.png" alt="Import USDT">}}

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

{{<img-height height="400px" url="/img/2024/kraken-deposit-options.png" alt="Kraken USDT depot options">}}

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

{{<img-width width="400px" url="/img/2024/sun-to-pls-swap.png" alt="Swap $UN for PLS">}}

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
{{<img-width width="100px" url="/img/2024/mantic-eur-trade.png" alt="Mantic auf Kraken kaufen">}}
2. Polygon Addresse des Wallets kopieren
{{<img-width width="400px" url="/img/2024/polygon-addresse-im-wallet-kopieren.png" alt="Polygon Adresse in MetaMask raus kopieren">}}
3. Beim Exchange an eure Wallet Addrese auszahlen lassen
{{<img-width width="500px" url="/img/2024/polygon-kraken-withdraw.png" alt="Bei Kraken an Polygon Adresse auszahlen">}}

Sobald wir unsere MANTIC und PLS haben um gas fees bezahlen zu können kann es
auf [PortalX](https://portalxswap.io) losgehen:
1. Wallet verbinden
2. Von auswählen: PulseChain und dann PLS
3. Nach auswählen: Polygon Netzwerk und dann USDT
4. Swap

{{<img-width width="700px" url="/img/2024/pls-to-polygon-usdt.png" alt="Swap PLS auf PulseChain for USDT auf Polygon">}}

Bei diesem Tausch fallen etwas höhere Gebühren an.
Aber auch nicht mehr als wenige Dollar.

## USDT auf dem Polygon Netzwerk bei Kraken einzahlen

Jetzt sucht ihr euch auf eurem Exchange die Addresse zum Einzahlen von USDT auf
Polygon raus:

{{<img-height height="600px" url="/img/2024/deposit-USDT-on-polygon.png" alt="USDT auf Kraken über Polygon einzahlen">}}

Wählt in MetaMask das Polygon Netzwerk aus und versendet von dort die USDT.

Beachte das es hier Mindestgrenzen geben kann (Kraken: 2 USDT.)

## USDT auf dem Exchange für Euro verkaufen

Jetzt kann über das Interface des Exchanges USDT auf Polygon für Euro verkauft
werden. Beachte das es auch hier Mindestgrenzen geben kann:

{{<img-width width="400px" url="/img/2024/USDT-minimum-amount.png" alt="USDT auf Kraken verkaufen: 10 USDT Minimum">}}

Den Euro Betrag könnt ihr euch dann wie gewohnt auf euer Bankkonto auszahlen.

## Abschließend

Wenn du mir ein Trinkgeld da lassen willst kannst du mir gern ein paar $UN Coins oder PLS
zukommen lassen. Meine PulseChain Addresse ist: `0x4612Bd3FDc0471fF81D94595246777436c22DAF1`

Anmerkungen gerne an: [sun@jneidel.com](mailto:sun@jneidel.com)
