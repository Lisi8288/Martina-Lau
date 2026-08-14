# Anleitung für Tina — Ergebnis-Mail nach dem Energie-Test

Ziel: Nach dem Energie-Test bekommt jede Person automatisch die Mail mit *ihrem* Ergebnis — nicht eine generische Mail für alle. Diese Version deckt alle **8 Typen** ab (5 Solo, 2 Kombi, 1 Fast-am-Ziel).

---

## Vorbereitung — E-Mail-Verteiler in MailerLite anlegen

Bevor überhaupt eine Automation gebaut wird, braucht es eine **eigene Gruppe** für die Energie-Test-Leads — nicht dieselbe Gruppe wie die Webinar-Anmeldung, sonst lassen sich die beiden Traffic-Quellen später nicht mehr sauber auseinanderhalten und auswerten.

1. In MailerLite: **Subscribers → Groups → Create group**, z.B. "Energie-Test Leads".
2. **Settings → Fields → New field** anlegen, jeweils als Typ "Text": `typ`, `phase`, `ziel`. Ohne diese Felder speichert MailerLite die entsprechenden Werte aus dem Formular nicht — sie werden kommentarlos ignoriert.
3. Unter **Forms** ein neues Formular (Embedded oder Pop-up) erstellen, das Vorname + E-Mail abfragt und dieser neuen Gruppe "Energie-Test Leads" zugeordnet ist.
4. Die `action`-URL dieses neuen Formulars aus dem Embed-Code kopieren und im Quiz-Code (`energie-test.html`, Element `#quiz-lead-form`) die bestehende `action`-URL damit ersetzen — die zeigt aktuell noch auf das alte Webinar-Formular (Kommentar direkt über dem `<form>`-Tag im Code weist darauf hin).
5. Alle Automationen unten auf **diese neue Gruppe** triggern, nicht auf die alte Webinar-Gruppe.

---

## Schritt 0 — Kurzer Check, bevor du zu bauen anfängst (2 Minuten)

Schau in MailerLite nach, ob **"Dynamic Content" (bedingte Inhaltsblöcke)** bei uns auch die **Betreffzeile** bedingt ändern kann — nicht nur den Text im Mail-Body.

- **Kann es das:** Dann reicht eine einzige Mail mit 8 Inhaltsblöcken (einer pro Typ), fertig. Sag Bescheid, dann kommt die Anleitung dafür stattdessen.
- **Kann es das nicht** (wahrscheinlicher Fall): Dann macht ihr die Automation mit **Verzweigung (Condition-Split)** — Anleitung unten.

Der Grund, warum das wichtig ist: Der Betreff entscheidet, ob die Mail überhaupt geöffnet wird. Ein bedingter Fließtext allein bringt nichts, wenn alle denselben generischen Betreff sehen.

---

## Schritt 1 — Automation anlegen

1. Neue Automation erstellen.
2. **Trigger:** "Formular abgeschickt" → das Energie-Test-Formular auswählen (bzw. die Gruppe, in die die Quiz-Leads reinlaufen).

---

## Schritt 2 — Verzweigung nach Typ

Direkt nach dem Trigger einen **Condition-Split**-Schritt einfügen. Das Feld heißt `typ`, mögliche Werte sind genau diese 7 (der 8. Fall, `none`, kommt nicht als eigener Wert vor — der läuft in den letzten "sonst"-Zweig):

```
Ist "typ" gleich "schlaf"?             → Ja: Mail 1 – Erholungs-Defizit
                                        → Nein: nächste Bedingung
Ist "typ" gleich "zucker"?             → Ja: Mail 1 – Blutzucker-Achterbahn
                                        → Nein: nächste Bedingung
Ist "typ" gleich "fette"?              → Ja: Mail 1 – Falsche Zell-Bausteine
                                        → Nein: nächste Bedingung
Ist "typ" gleich "stress"?             → Ja: Mail 1 – Dauerstrom ohne Pause
                                        → Nein: nächste Bedingung
Ist "typ" gleich "verdauung"?          → Ja: Mail 1 – Bauch-Bremse
                                        → Nein: nächste Bedingung
Ist "typ" gleich "zucker_verdauung"?   → Ja: Mail 1 – Zucker-Bauch (Kombi)
                                        → Nein: nächste Bedingung
Ist "typ" gleich "stress_zucker"?      → Ja: Mail 1 – Cortisol-Crash (Kombi)
                                        → Nein (= alle übrigen, das ist "none"): Mail 1 – Fast am Ziel
```

Jeder Zweig bekommt sein eigenes Mail-1, siehe unten. **Wichtig:** Alle acht Zweige laufen danach wieder in denselben Pfad zusammen — warten, dann Mail 2 (Martinas Story), warten, dann Mail 3 (Webinar-Einladung). Diese zwei Mails sind für alle Typen gleich, die brauchst du nur einmal zu bauen. **Damit ist die Automation fertig** — nach Mail 3 endet sie, es kommt nichts mehr hinterher.

---

## Schritt 3 — Die acht Mail-1-Versionen (fertig zum Einfügen)

Vorname-Merge-Tag je nach Feldname bei dir anpassen (z.B. `{$name}` oder `{$Vorname}` — schau, wie es bei den anderen Mails schon heißt).

### 1) Typ: Erholungs-Defizit (`typ = schlaf`)

**Betreff:** {$name}, dein Energie-Typ: Erholungs-Defizit

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Erholungs-Defizit**
>
> Dein Schlaf ist zwar da, aber nicht wirklich optimal — und genau deshalb kann bei dir eine Energielosigkeit auftreten, die sich auch mit noch mehr Schlaf nicht auf einmal auflöst. In der Tiefschlafphase repariert sich dein Körper eigentlich und füllt seine Energiespeicher wieder auf. Läuft diese Phase gestört ab — durch Bildschirmlicht, ein Nervensystem, das nachts nicht runterfährt — fehlt dir genau diese Energie logischerweise am nächsten Tag. Kein Wunder also, dass du dich trotz „genug" Schlaf oft wie gerädert fühlst.
>
> **Dein erster Schritt:** 60 Minuten vor dem Schlafengehen Bildschirme konsequent weglegen, das Schlafzimmer wirklich dunkel machen (auch kleine Lichtquellen wie Ladekabel-LEDs stören mehr, als man denkt), und die letzte große Mahlzeit möglichst vor 18 Uhr essen — dein Verdauungssystem sollte in der Nacht Pause haben, nicht Schwerstarbeit leisten. Das ist ein Anfang. Wie tief dein Schlafdefizit wirklich sitzt und ob z.B. auch dein Nervensystem abends nicht richtig runterfährt, lässt sich damit allein noch nicht beantworten.
>
> Ich weiß, wie zermürbend es ist, wenn du morgens aufwachst und dich trotzdem fühlst, als hättest du gar nicht geschlafen — das raubt dir jede Kraft für den Tag, bevor er überhaupt begonnen hat. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 2) Typ: Blutzucker-Achterbahn (`typ = zucker`)

**Betreff:** {$name}, dein Energie-Typ: Blutzucker-Achterbahn

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Blutzucker-Achterbahn**
>
> Wenn dein Blutzucker Achterbahn fährt, muss dein Körper ständig gegensteuern — jede Spitze nach oben kostet ihn danach Kraft, um wieder ins Gleichgewicht zu kommen. Genau diese Energie fehlt dir logischerweise woanders: beim Nachmittagstief, beim Konzentrieren, beim Durchhalten bis zum Abend. Deine Ermüdung ist in diesem Fall keine Charakterschwäche, sondern schlicht die Rechnung für die Achterbahn, die dein Stoffwechsel gerade fährt.
>
> **Dein erster Schritt:** Bei jeder Mahlzeit zuerst Eiweiß essen, nie auf leeren Magen zu Süßem greifen, und bei akutem Heißhunger lieber zu einer Energie-Bowl aus Datteln und Nüssen greifen als zu Schokolade — das sättigt wirklich, statt den nächsten Einbruch schon vorzuprogrammieren. Das glättet die gröbsten Ausschläge. Wie stark deine Achterbahn tatsächlich ist und wo genau sie ansetzt, zeigt sich aber erst, wenn man wirklich hinschaut.
>
> Ich weiß, wie frustrierend dieses ständige Auf und Ab ist — der Heißhunger, das Tief, das Gefühl, dem eigenen Körper ausgeliefert zu sein, egal wie sehr du dich bemühst. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 3) Typ: Falsche Zell-Bausteine (`typ = fette`)

**Betreff:** {$name}, dein Energie-Typ: Falsche Zell-Bausteine

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Falsche Zell-Bausteine**
>
> Deine Zellen produzieren Energie — aber nur, wenn sie aus den richtigen Bausteinen gebaut sind. Bekommen sie stattdessen die falschen Fette, brennen sie schlechter, und genau das erklärt einen Teil deiner Energielosigkeit, ohne dass du dafür eine offensichtliche Ursache findest. Das Tückische: Du fühlst nicht, welche Fette gerade in deinen Zellen verbaut werden — nur, dass dir irgendwo Energie fehlt.
>
> **Dein erster Schritt:** Sonnenblumenöl ist eine der größten Omega-6-Quellen in einer durchschnittlichen Küche — schrittweise gegen Olivenöl oder Leinöl tauschen und öfter zu fettem Fisch greifen, bringt schon etwas Balance. Das ist ein guter Anfang. Aber ob dein persönliches Verhältnis von Omega-6 zu Omega-3 wirklich passt, lässt sich mit bloßem Auge nicht beurteilen — das ist tatsächlich Messsache.
>
> Ich weiß, wie zermürbend es ist, sich erschöpft zu fühlen, ohne überhaupt zu wissen, woran es liegt — vor allem, wenn du dir schon so viel Mühe gibst und trotzdem keine Erklärung findest. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 4) Typ: Dauerstrom ohne Pause (`typ = stress`)

**Betreff:** {$name}, dein Energie-Typ: Dauerstrom ohne Pause

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Dauerstrom ohne Pause**
>
> Dauerstrom ohne echte Pausen verbrennt Energie schneller, als du sie nachladen kannst — und genau das ist bei dir vermutlich ein Hauptgrund für deine Erschöpfung. Dein Nervensystem läuft im Hintergrund ständig auf Anspannung, selbst wenn du gerade nichts tust, und das kostet Kraft, die dir dann für den eigentlichen Tag fehlt. So wird aus vollem Terminkalender ganz automatisch Dauermüdigkeit.
>
> **Dein erster Schritt:** Bewusst 2–3 kurze Pausen am Tag ohne Bildschirm einbauen — schon eine Minute 4-7-8-Atmung (4 Sekunden einatmen, 7 halten, 8 ausatmen) wirkt auf dein Nervensystem oft stärker als der nächste Kaffee. Das lindert die Symptome spürbar. Was deinen Dauerstrom bei dir konkret befeuert und wie du wirklich aus dem Modus rauskommst, ist aber eine andere Frage.
>
> Ich weiß, wie erschöpfend es ist, ständig zu funktionieren, ohne wirklich abschalten zu können — und wie einsam sich diese Art von Müdigkeit anfühlt, weil sie von außen keiner sieht. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 5) Typ: Bauch-Bremse (`typ = verdauung`)

**Betreff:** {$name}, dein Energie-Typ: Bauch-Bremse

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Bauch-Bremse**
>
> Wenn dein Bauch bremst — Blähungen, eine unruhige Verdauung — kostet das mehr Energie, als man denkt: Ein großer Teil deiner Kraft entsteht im Darm, und wenn es dort hakt, fehlt dir genau diese Energie später am Tag als Müdigkeit. Das ist kein Zufall, sondern eine ziemlich direkte Folge — dein Bauch und dein Energielevel hängen enger zusammen, als es sich anfühlt.
>
> **Dein erster Schritt:** Langsamer essen, große und späte Mahlzeiten möglichst meiden, und nach dem Essen lieber ein paar Minuten laufen als sich direkt hinzusetzen — das bringt die Verdauung sanft in Schwung. Das nimmt etwas Druck raus. Woran es bei dir konkret hakt und was dein Darm wirklich braucht, um wieder rund zu laufen, lässt sich damit allein aber noch nicht beantworten.
>
> Ich weiß, wie belastend es ist, wenn dich dein eigener Bauch ständig ausbremst — das kostet nicht nur Energie, sondern auch Lebensqualität, Tag für Tag. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 6) Typ: Zucker-Bauch — Kombi (`typ = zucker_verdauung`)

**Betreff:** {$name}, dein Energie-Typ: Zucker-Bauch

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Zucker-Bauch**
>
> Bei dir verstärken sich zwei Dinge gegenseitig: Dein Blutzucker fordert ständig Energie zum Ausgleichen — und dein Bauch verbraucht zusätzlich Kraft beim Verdauen von genau dem, was diese Achterbahn überhaupt erst auslöst. Das Ergebnis ist eine Erschöpfung, die sich doppelt anfühlt, weil eben zwei Energiefresser gleichzeitig aktiv sind, nicht nur einer.
>
> **Dein erster Schritt:** Einen bewussten Tag lang ganz auf Zuckerbomben und Fertiggerichte verzichten — das ist der gemeinsame Nenner hinter beiden Symptomen, und schon dieser eine Tag zeigt oft überraschend deutlich, wie viel Bauch und Energie tatsächlich zusammenhängen. Das ist ein Anfang, kein vollständiges Bild.
>
> Ich weiß, wie zermürbend es ist, wenn sich gleich zwei Baustellen gegenseitig verstärken und du gar nicht mehr weißt, wo du zuerst ansetzen sollst. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 7) Typ: Cortisol-Crash — Kombi (`typ = stress_zucker`)

**Betreff:** {$name}, dein Energie-Typ: Cortisol-Crash

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Cortisol-Crash**
>
> Ständiger Stress treibt dich unbemerkt zu genau den Gewohnheiten, die deinen Blutzucker zusätzlich durcheinanderbringen — Kaffee statt Pause, Süßes statt Schlaf, ein Glas Wein zum Runterkommen. Das kostet dich doppelt Energie: einmal, um das Stresshormon auszugleichen, einmal, um den Blutzucker wieder einzufangen. Deine Erschöpfung ist in diesem Fall die Summe aus beidem, nicht nur eine Frage von „zu wenig Schlaf".
>
> **Dein erster Schritt:** Bevor der nächste Kaffee oder Snack kommt, eine Minute 4-7-8-Atmung ausprobieren — das beruhigt dein Nervensystem, ohne deinen Blutzucker zusätzlich zu belasten, wie es Kaffee oder Zucker tun würden. Das unterbricht die Spirale kurz. Wie tief sie bei dir wirklich sitzt, ist damit aber noch nicht beantwortet.
>
> Ich weiß, wie erschöpfend sich diese Spirale aus Stress und Blutzucker anfühlt — ständig unter Strom und trotzdem nie wirklich wach. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

### 8) Typ: Fast am Ziel — Sonst-Zweig (`none`)

**Betreff:** {$name}, dein Energie-Typ: Fast am Ziel

**Text:**
> Hallo {$name},
>
> dein Ergebnis ist da: **Fast am Ziel**
>
> Du machst vieles richtig — und bist trotzdem müde. Genau das ist das Verwirrende an deinem Ergebnis. Wenn die offensichtlichen Stellschrauben (Schlaf, Blutzucker, Fette, Stress, Verdauung) schon einigermaßen sitzen, steckt die Ursache für deine Energielosigkeit meistens in Werten, die man nicht spüren kann — nur messen.
>
> **Dein erster Schritt:** Nicht noch mehr optimieren auf Verdacht, keine weiteren Nahrungsergänzungsmittel raten. Dein Zell-Code verrät dir erst dann etwas, wenn du wirklich hinschaust — nicht durchs Fühlen, sondern durchs Messen. Alles andere ist an dieser Stelle vermutlich Zeitverschwendung.
>
> Ich weiß, wie frustrierend es ist, sich wirklich Mühe zu geben und trotzdem müde zu bleiben — das fühlt sich oft ungerechter an als offensichtliche Fehler. Lass uns gemeinsam herausfinden, wie du wieder zu mehr Energie im Alltag kommst. Deshalb bekommst du von mir keine pauschale Supplement-Liste: Das Gießkannenprinzip funktioniert nicht, und viel hilft nicht immer viel. Was bei der einen Person wirkt, wirkt bei der nächsten noch lange nicht — jeder Mensch ist individuell zu betrachten. Mir ist dabei wichtig zu sagen: Es geht gar nicht nur um Supplemente, sondern darum, dich als Ganzes anzuschauen — was dein Körper wirklich braucht, was bei dir gerade dran ist und in welcher Reihenfolge. Das heißt: messen statt raten. Im Webinar gehen wir noch viel tiefer rein — welche Ursachen bei dir infrage kommen und wie du wirklich ins Tun kommst, um etwas zu verändern. Du hast hier schon ein paar Tipps bekommen, die dir helfen können, etwas zu bewegen, oder die einfach ein erster Schritt in die richtige Richtung sind — geh jetzt für dich los und schenk dir selbst die 30 Minuten, die wirklich etwas verändern können.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

---

## Mail 2 — Martinas Story (für alle Typen gleich, einmal bauen)

**Betreff:** {$name}, warum ich lieber messe als rate

**Text:**
> Hallo {$name},
>
> dein Ergebnis war der erste Schritt. Bevor du weiterliest, will ich dir kurz erzählen, warum ich überhaupt so arbeite, wie ich arbeite.
>
> Acht Jahre habe ich im Hormonzentrum gearbeitet, bevor ich selbst Mutter wurde. In dieser Zeit habe ich gesehen, wie wenig die meisten Frauen wirklich über ihren eigenen Körper wissen — und wie viele Beschwerden einfach mit noch mehr Disziplin, noch mehr Verzicht „wegoptimiert" werden sollen, obwohl die eigentliche Ursache ganz woanders liegt. Hätte ich mein heutiges Wissen damals schon gehabt, wäre mir selbst einiges erspart geblieben.
>
> Genau deshalb arbeite ich heute nicht mit pauschalen Ernährungsplänen oder Supplement-Listen von der Stange. Ich arbeite mit echten Werten — deinen. Über 200 Frauen habe ich seither begleitet, jede mit einem anderen Ausgangspunkt, jede mit einem anderen Plan. Kein Gießkannenprinzip, sondern: erst messen, dann verstehen, dann handeln.
>
> Im Webinar zeige ich dir genau, wie dieser Weg vom Messen zum Verstehen für dich aussehen kann — unabhängig davon, was dein Energie-Typ dir schon verraten hat.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina

---

## Mail 3 — Webinar-Einladung (für alle Typen gleich, einmal bauen)

**Betreff:** {$name}, dein Platz ist reserviert — bist du dabei?

**Text:**
> Hallo {$name},
>
> dein Ergebnis kennst du jetzt schon. Der nächste Schritt ist das kostenlose Webinar — dort zeige ich dir, warum „vieles richtig machen" bei Energielosigkeit oft trotzdem nicht reicht, und welches Puzzlestück meistens fehlt, um deinen Stoffwechsel und deine Verdauung endlich richtig zu verstehen.
>
> Was dich erwartet:
> - Warum Erschöpfung selten an nur einer Sache liegt — und wie die Bereiche aus deinem Test zusammenhängen
> - Der Unterschied zwischen schätzen und wirklich messen
> - Wie ein individueller Plan aussieht, der zu deinem Körper passt statt zu einem Durchschnittswert
>
> Ca. 30–40 Minuten, kostenlos, von zu Hause aus.
>
> [Button: Jetzt Platz sichern →]
>
> Bis gleich,
> Martina

---

## Mail 4 — Bewegungs-Impuls für alle, die noch nicht gebucht haben

**Wann:** einige Tage nach Mail 3 (Webinar-Einladung), z.B. 4–5 Tage Wartezeit. Geht an **alle**, die bis hierhin in der Automation gelandet sind — unabhängig davon, ob sie das Webinar tatsächlich angeschaut haben oder nicht. Ziel ist ein neuer Blickwinkel (Bewegung als Energiefresser), der in den ersten Mails noch nicht vorkam, um Leute zu reaktivieren, die die Performanceanalyse noch nicht gebucht haben.

**Wichtige Einschränkung:** MailerLite weiß an dieser Stelle nicht, wer die Performanceanalyse bereits gebucht hat — dafür bräuchte es eine Rückmeldung vom Buchungstool (z.B. Ablefy) an MailerLite, die aktuell nicht eingerichtet ist. Diese Mail geht also an alle, auch an die, die zwischenzeitlich schon gebucht haben. Das ist ein bekannter Kompromiss, keine Ideallösung — falls das stört, müsste erst eine Buchungs-Rückmeldung (Custom Field oder Tag bei Kauf) eingerichtet werden, bevor man hier sauber ausschließen kann.

**Betreff:** {$name}, der Bereich, der bei Müdigkeit am meisten unterschätzt wird

**Text:**
> Hallo {$name},
>
> du hast deinen Energie-Test gemacht, vielleicht auch schon einen Blick ins Webinar geworfen — und trotzdem stehst du gerade noch nicht bei deiner Performanceanalyse. Das ist völlig ok. Ich will dir heute trotzdem noch einen Gedanken mitgeben, den viele Frauen in meinen Gesprächen übersehen: Bewegung.
>
> Nicht Sport im klassischen Sinn — sondern die Frage, wie viel dein Körper sich im Alltag überhaupt noch bewegt. Bewegung ist der Motor, der deine Zellen erst mit Energie versorgt: Jede Bewegung kurbelt deinen Stoffwechsel an und sorgt dafür, dass Nährstoffe dort ankommen, wo sie gebraucht werden. Fehlt dieser Reiz über weite Strecken des Tages, wird dein Körper nicht ruhiger, sondern träger — und genau das kann ein Grund sein, warum du dich müde fühlst, obwohl du „eigentlich nichts getan hast".
>
> **Ein erster Schritt:** Nicht gleich ins Fitnessstudio — reicht erstmal, jede Stunde kurz aufzustehen, Treppen statt Aufzug zu nehmen und einen täglichen 15-Minuten-Spaziergang fest einzuplanen. Das bringt deinen Kreislauf spürbar in Schwung.
>
> Ob und wie stark Bewegung bei dir persönlich der fehlende Hebel ist, lässt sich aber nicht schätzen — nur messen. Genau das ist einer der Werte, die wir uns in deiner Performanceanalyse gemeinsam ansehen: schwarz auf weiß, nicht nach Gefühl.
>
> [Button: Jetzt meine Performanceanalyse ansehen →]
>
> Herzlich, Martina
>
> *Hinweis: Anhaltende Erschöpfung kann auch an Eisen, Schilddrüse oder Schlaf liegen — lass das ärztlich abklären. Diese Auswertung ist keine Diagnose.*

---

## Was hier bewusst NICHT drin ist

- **Der 5-Ampel-Bereich-Check** (Schlaf/Blutzucker/Zell-Bausteine/Stress/Verdauung einzeln grün-gelb-rot) steht nur auf der Website direkt nach dem Quiz, nicht in der Mail.
- **Rabatt (50€) + Kochbuch** kommen hier nicht vor. Was nach der Webinar-Einladung (Mail 3) passiert — außer dem neuen Bewegungs-Impuls (Mail 4) — also Reminder, Dankeschön, Gutschein, Kochbuch-Bonus, ist ein eigener, späterer Schritt und aktuell nicht Teil dieser Liste.
