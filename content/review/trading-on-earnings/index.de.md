---
title: "Review: Trading on Corporate Earnings News"
description: "Review des Buches Newstrading mit Optionen Trading on Corporate Earnings News, sowie Erklärung der Strategie."
summary: "Bündige Erklärung der Börsenstrategie zum Handel über die Earnings."
tags:
date: 2024-06-30
thumbnailAlt: "Freiheitsstatue umgeben von Geld und Flaggen"
writingTime: 261
---

<a href="https://www.amazon.de/Trading-Corporate-Earnings-News-Short-Term-ebook/dp/B004GXB3DA?&linkCode=ll1&tag=jneidel06-21&linkId=7edd9d758dfa2f1228f0e55fc6eb78dc" target=_blank>
{{<figure src="https://m.media-amazon.com/images/I/51IGqh4YniL._SY445_SX342_.jpg" class="sm:float-right h-48 w-auto" alt="Trading on Corporate Earnings News - John Shon und Ping Zhou">}}
</a>

## Worum geht es?

Das Buch stellt eine einfache Börsenstrategie vor, um über Earnings
(Veröffentlichung der Quartalsergebnisse) Geld zu verdienen.
Zuvor wird verständlich erklärt wie Earnings ticken und was sie ausmacht.

<a href="https://www.amazon.de/Newstrading-mit-Optionen-Quartalszahlen-gewinnbringend/dp/3864700477?&linkCode=ll1&tag=jneidel06-21&linkId=210ba02b2f6a9b74fb7dcb24a0d79c0e" target=_blank>
{{<figure src="https://m.media-amazon.com/images/I/51QRv4Noe7L._SY425_.jpg" class="sm:float-right sm:h-44 w-auto sm:pl-2" alt="Cover der deutschen Edition Newstrading mit Optionen - John Shon und Ping Zhou">}}
</a>

<span class="text-sm">
Es gibt auch eine deutsche Variante mit dem Namen: "Newstrading mit
Optionen: Wie Sie Quartalszahlen mit der richtigen Strategie gewinnbringend
handeln" von John Shon und Ping Zhou.
</span>

## Stil

Die Autoren haben sich bemüht das Buch verständlich zu halten.
Klar, eine gewisses Verständnis der Börse und Optionen wird vorausgesetzt,
aber alles in allem ist einsteigerfreundlich.
Alles rund um die Earnings und die Strategie wird verständlich aufgerollt.

Das Buch liest sich einfach, ist sehr klar strukturiert und Begriffe,
Entscheidungen und Charts werden sehr gut erklärt.

Man merkt den Autoren ihre wissenschaftlichen Hintergründe an.
Studien und offizielle Ressourcen werden zitiert, sie kritisieren die eigene
Position, weisen auf Schwächen und alternative Möglichkeiten hin, gehen
gleichermaßen auf Winning und Losing Trades ein, erklären die Methodik ihrer
Untersuchungen und verwenden Industry Best Practices (bewährte Verfahren der
Branche.)

## Die Theorie

Ich werde nicht versuchen die Theorie hinter der Strategie zu erklären.
Das Buch ist wirklich sehr gut darin.
Wenn die Strategie für dich ansprechend klingt solltest du das Buch, zum
besseren Verständnis, sowieso lesen.

Es sei nur so viel gesagt:
- Earnings sind ein idealer Tradinganlass: regelmäßig, verlässlich, große
Marktbewegungen
- Earnings Überraschungen passieren oft: 84% der Zeit
- Earnings Überraschungen haben signifikante Reaktionen: 50% der Kurse
bewegten sich um mehr als 2.34%
- Die Reaktion des Marktes auf Earnings Überraschungen sind überraschend:
auf 40% aller positiven Überraschungen folgt eine negative Reaktion

## Strategie Überblick

Kurz vor Verkündung der Earning wird eine Straddle (ein Call und ein Put mit
dem gleichen Strike Preis) am Geld in der nächsten Monatsoption gekauft.
Nach Verkündung der Earnings (am selben Handelstag) wird der Straddle wieder
verkauft.

Diese Strategie zielt darauf ab von einer großen Reaktion auf die Earnings
zu profitieren.
Wenn der Kurs stark ausschlägt verliert die eine Option stark an Wert, was
aber von stärkeren Gewinnen in der anderen Option ausgeglichen wird.
Die Richtung des Ausschlags ist dabei egal.

Bei einer flauen Earningsreaktion und wenig Dynamik in der Aktie verlieren
beide Optionen an Wert weil die Implied Volatility sich abflacht.
Die Optionen werden nicht wertlos, aber mit Einbußen ist zu rechnen.

Das Risiko bei dieser Strategie beschränkt sich auf die gezahlten
Optionsprämien.

Wenn dir diese Kurzversion reicht kannst du die Details überspringen.

## Strategie Details

Jetzt möchte ich noch mal umfassend auf alles eingehen was ich zu dieser
Strategie weiß.

### Laufzeit

Es soll die nächste auslaufende Monatsoptions als Laufzeit gewählt werden.

Warum?
> option price movements are most sensitive to the near-month
contracts[^opricemove]
[^opricemove]: Siehe Kapitel 8.

Außer die Option hat nur noch wenige Tag übrig (Faustregel weniger als 7
Tage.)
Denn dann ist das Schmelzen des Eiswürfels (der Zeitverfall, "time decay")
besonders stark (und der läuft gegen uns.)

Stattdessen nimmt man die nachfolgende Monatsoption.
Es können auch andere Laufzeiten gewählt werden, wobei nur der Spread
(Spanne zwischen Geld- und Briefkurs) beachtet werden muss.

### Spread

> Beware the bid-ask spread.

Der Spread muss so klein wie möglich gehalten werden. Mit dem
Straddle kaufen wir 2x den schlechteren Preis ein und verkaufen auch 2x zum
schlechteren Preis.

Der Spread variiert mit der Laufzeit.
Vor allem die Wochenoptionen haben i.d.R. schlechtere Spreads.

{{<center>}}
    {{<figure src="volume-spread-5d.de.png" class="w-10/12" alt="<++>" caption="0.23/3.2 = 7.18% Spread">}}
    {{<figure src="volume-spread-12d.de.png" class="w-9/12" alt="<++>" caption="0.75/5.45 = 13.76% Spread">}}
{{</center>}}
<div class="my-4"></div>
{{<center>}}
    {{<figure src="volume-spread-19d.de.png" class="w-10/12" alt="<++>" caption="0.35/6.15 = 5.69% Spread">}}
    {{<figure src="volume-spread-47d.de.png" class="w-10/12" alt="<++>" caption="0.35/9.9 = 3.53% Spread">}}
{{</center>}}

Als Proxy (Stellvertreter) für den Spread kann man sich auch das Volumen
anschauen (siehe auch oben):

> bid-ask spread and trading volume are highly (inversely) correlated:
Bid-ask spreads tend to be low when trading volume is high, and vice versa.

Außerdem gilt die Faustregel:

> you should be particularly cautious when entering orders in contracts that
have fewer than 50 contracts traded on an average day.

### Strike Preis

Der Strike Preis soll am Geld sein.

Warum?
> We want a very high level of response in the option price compared to the
movements in the underlying equity.

Und die stärkste Reaktion bekommen wir am Geld.

Wenn unklar ist welcher Strike Preis am besten gewählt werden soll kann der
Gamma konsultiert werden.
In diesem Beispiel ist es 19 (Aktie steht bei 19.32, ergibt also Sinn):

{{<figure src="gamma-strike.de.png" class="w-8/12" alt="Gamma und Strike Preise">}}

### Timing

> we again suggest limiting the carry time on your trades to a 24-hour
period.

Die empfohlenen 24h beginnen mit dem Kauf des Straddle am Ende des
Handelstages vor Verkündung der Earnings.
Geschlossen wird also 24h später, am Ende des Handelstages an dem die
Earnings verkündet wurden.

So der Standardablauf.

#### Timing: Kauf

#### An welchem Tag?

Das Buch diskutiert ausführlich die Frage ob ein früher Einstieg (1-2 Wochen
vor den Earnings) profitabler ist.
Dafür spricht, dass die implizite Volatilität in den Tagen vor den Earnings
ansteigt.

> We believe the detrimental effect of time decay is often underestimated
and that the increase in implied volatility is often overestimated,
suggesting that a later entry point is, on average, the most profitable
decision.

#### Um welche Uhrzeit?

Außerdem kaufen wir zum Ende des Handelstages, weil:

> implied volatilities tend to diminish in the last hour of trading and tend
to be higher in the opening hours of trading. This occurs because the market
is digesting any developments that occurred during the 17.5 hours that it
was closed.

#### Die Bekanntgabe ist morgens/abends

Der Tradingkalender oder auch TradingView verraten dir den Zeitpunkt der
Bekanntgabe.
Entweder morgens vor Börseneröffnung oder abends nach Börsenschluss.

Der Kauf erfolgt immer am Ende des Handelstages unmittelbar vor der
Bekanntgabe.
- Wenn die Bekanntgabe morgens vor Börseneröffnung erfolgt, kaufen wir am
Vorabend.
- Wenn die Bekanntgabe am Abend nach Börsenschluss erfolgt, kaufen wir
direkt davor (also am selben Tag).

#### Timing: Verkauf

Aus obigen Zitat zur abflachenden Implied Volatility zum Ende des
Handelstages schließen die Autoren im Bezug auf den Verkaufszeitpunkt noch
folgendes:

> To the extent that this is true, it would be more profitable for an
options buyer to close his position during the day rather than at the end of
the day.

Weil ja beim Verkauf Implied Volatility auf deiner Seite ist (höher
Verkaufspreis.)

Manchmal kann es lohnend sein die Option nicht direkt nach 24h zu verkaufen.
Wenn die unterliegende Aktie sich noch explosiv bewegt (und dementsprechend
das Niveau der Implied Volatility gehalten oder erhöht wird) kann es trotz
Zeitverfall profitabel sein in der Position zu bleiben.

> Although it is possible that the implied volatility embedded in each leg
of the straddle will decrease in the period after the earnings announcement,
it’s also very possible that the implied volatility will significantly
increase. It all depends on the type of news that is released and how the
market interprets it.[^ivcrush]
[^ivcrush]: Siehe Kapitel 11.


Generell wollen wir aber den Trade beenden bevor die Implied Volatility zu
weit absinkt.

### Aktienwahl

#### Welche Aktien verkünden Earnings?

Es gibt verschiedene Kalender, welche Werte auflisten die ihre Ergebnisse
bekannt geben.

Die beste Übersicht gibt es bei [Investing.com](https://www.investing.com/earnings-calendar).

{{<figure src="./investing.com-calendar.de.png" class="w-11/12" alt="Earnings Kalender auf Investing.com" caption="Der Earnings Kalender auf Investing.com">}}

Über den Filter können Nebenwerte die ggf. eh nicht in Frage kommen (keine
Optionen, schlechter Spread), ausgeblendet werden.

{{<figure src="./investing.com-calendar-filter.de.png" class="w-10/12" alt="Wichtigkeitsfilter auf Investing.com" caption="Wichtigkeitsfilter zum Ausblenden von Nebenwerten.">}}

TradingView selbst hat auch einen Kalender.
Dies hat den Vorteil, dass wir uns gleich einen Überblick über die Aktie
verschaffen können.

{{<figure src="./tradingview-arrow.de.png" class="w-9/12" alt="Location des Kalenders in TradingView" caption="Kalender befindet sich hier.">}}
<div class="my-4"></div>
{{<figure src="./tradingview-calendar.de.png" class="w-10/12" alt="Kalenderansicht in TradingView" caption="Kalenderansicht in TradingView">}}

#### Wachstumswerte auswählen

> given the same magnitude of earnings surprise, the market tended to **react
more strongly** to the earnings surprises of **growth companies** and relatively
less strongly to those of value companies.[^growthcom]
[^growthcom]: Siehe Kapitel 12.

Mit Wachstumswerten sind vergleichsweise stärkere Reaktionen erwartbar.
Was profitabler für die Strategie ist.

Die Kriterien zur Kategorisierung von Wachstumswerten sind nicht universell
definiert.
Das Buch nennt `P/E` Ratio >40 als Kriterium.
Ein hoher `P/B` Wert (>3) ist auch ein allgemein anerkanntes Kriterium.

## Hinweis für Privatpersonen

Stand Juni 2024 müssen Privatpersonen die spezielle Regelung zur
Verlustverrechnung in Termingeschäften (Optionen) beachten.
Diese bedeutet das nur 20.000€ in Optionsverlusten steuerlich
anrechenbar sind.

Mit dieser Strategie entstehen immer Optionsverluste, weil eine Seite des
Straddles wertlos wird.
Sobald diese Verluste 20k überschreiten können sie nicht mehr auf die
Gewinne der anderen Seite (welche die Verluste ausgleicht) angerechnet
werden.

Beispielsweise: Ein Trade in dem der Put -500€ und der Call
+1500€ gemacht haben, insgesamt ein Gewinn von 1000€.
Die 500€ Verlust können nicht gewinnmindernd auf die 1500€ angerechnet
werden.
Es fällt Einkommenssteuer auf die kompletten 1500€ "Gewinn" an.

[Siehe die vollständige Erklärung.](https://wissen.consorsbank.de/t5/Blog/Neues-zu-den-ge%C3%A4nderten-Regeln-f%C3%BCr-die-Verlustverrechnung/ba-p/113867)

Das lässt sich umgehen indem man in einer Kapitalgesellschaft handelt, z.B.
einer Trading GmbH.

## Kritik

**Delta Gerede:**

> Choose option contracts in the closest expiration month, because they have
the highest delta.

Im Bezug auf einen Straddle ergibt das keinen Sinn.
Wir kaufen immer Call und Put zum gleichen Strike und dabei ist der Delta
zusammengerechnet immer 1.
Bei jedem Paar.

Wo es aber einen Unterschied macht ist im Gamma.
Der ist höher, je näher das Verfallsdatum rückt.

Beispiele für Delta und Gamma Werte bei verschiedenen Verfallsdaten in einer
Option am Geld. Näheres Datum = höher Gamma.
{{<center>}}
    {{<figure src="gamma-5d.de.png" alt="Delta und Gamma einer ATM Option mit 5 Tagen Laufzeit">}}
    {{<figure src="gamma-12d.de.png" alt="Delta und Gamma einer ATM Option mit 12 Tagen Laufzeit">}}
    {{<figure src="gamma-19d.de.png" alt="Delta und Gamma einer ATM Option mit 19 Tagen Laufzeit">}}
    {{<figure src="gamma-47d.de.png" alt="Delta und Gamma einer ATM Option mit 47 Tagen Laufzeit">}}
{{</center>}}

**Keine aktuellen Daten:**

Die analysierten Daten, welche das Fundament der Strategieempfehlung bilden,
enden zum Ende des Jahres 2009.

Daran stört mich:
- das in 14 Jahren viel passieren kann
- die neusten Daten sind möglicherweise noch von den Auswirkungen der 2008er
Finanzkrise beeinflusst

Das entkräftet natürlich weder die Analyse noch die Strategie, sondern
stellt eher offene Fragen in den Raum.

## Bewertung

Das Buch argumentiert gut wie und warum ein Straddle über Earnings Sinn
ergibt und profitabel sein kann.
Die markttheoretischen Hintergründe rund um die Earnings werden verständlich
erklärt.
