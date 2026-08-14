# Klick-für-Klick-Anleitung — MailerLite Automation

Zwei getrennte Automationen bauen, die parallel laufen. So muss nichts mehrfach kopiert werden.

- **Automation A** — schickt das passende Ergebnis (8 Varianten)
- **Automation B** — schickt danach Martinas Story + die Webinar-Einladung (für alle gleich)

---

## Automation A — Ergebnis-Mail

### Trigger (schon erledigt)
"Completes a form" → Formular "Energie-Test Leads" / Gruppe "Test Leads". ✓

Alle 8 Mail-Texte zum Kopieren stehen in `Anleitung-MailerLite-Ergebnis-Mail.md`, Abschnitt "Schritt 3". Am besten diese Datei in einem zweiten Fenster nebenbei offen haben, dann muss man nur noch kopieren und einfügen.

### Condition 1 — Typ "schlaf"
1. Auf den Kasten **"Condition 1"** klicken
2. Rechtes Panel: **"Custom fields"** ✓ (schon ausgewählt)
3. Feld-Dropdown: **typ** ✓ (schon ausgewählt)
4. Vergleich-Dropdown: **is equal** ✓ (schon ausgewählt)
5. In **"Please enter a value"** eintragen: `schlaf`
6. Falls unten ein zweiter **"AND"**-Block erscheint: dort auf **Delete** klicken, damit nur die eine Bedingung übrig bleibt
7. Unten rechts auf **Save**
8. Unter **"Yes"** auf den Pfeil neben **"Exit flow"** klicken → **"Email"** auswählen
9. Betreff-Feld: `{$name}, dein Energie-Typ: Erholungs-Defizit`
10. Text-Feld: kompletten Mail-1-Text **"1) Typ: Erholungs-Defizit"** aus `Anleitung-MailerLite-Ergebnis-Mail.md` reinkopieren (inkl. Webinar-Button am Ende)
11. **Save**
12. Unter **"No"** auf den Pfeil neben **"Exit flow"** klicken → **"Condition"** auswählen (nicht Email!)

### Condition 2 — Typ "zucker"
13. Rechtes Panel öffnet sich automatisch. Feld-Dropdown: **Custom fields** → **typ**
14. Vergleich-Dropdown: **is equal**
15. In **"Please enter a value"** eintragen: `zucker`
16. Falls ein zweiter "AND"-Block erscheint: **Delete**
17. **Save**
18. Unter **"Yes"** → Pfeil neben "Exit flow" → **"Email"**
19. Betreff-Feld: `{$name}, dein Energie-Typ: Blutzucker-Achterbahn`
20. Text-Feld: Mail-1-Text **"2) Typ: Blutzucker-Achterbahn"** einfügen
21. **Save**
22. Unter **"No"** → Pfeil neben "Exit flow" → **"Condition"**

### Condition 3 — Typ "fette"
23. Feld: **typ**, Vergleich: **is equal**, Wert: `fette`
24. AND-Block löschen falls vorhanden, **Save**
25. Unter **"Yes"** → "Email"
26. Betreff: `{$name}, dein Energie-Typ: Falsche Zell-Bausteine`
27. Text: Mail-1-Text **"3) Typ: Falsche Zell-Bausteine"** einfügen
28. **Save**
29. Unter **"No"** → **"Condition"**

### Condition 4 — Typ "stress"
30. Feld: **typ**, Vergleich: **is equal**, Wert: `stress`
31. AND-Block löschen falls vorhanden, **Save**
32. Unter **"Yes"** → "Email"
33. Betreff: `{$name}, dein Energie-Typ: Dauerstrom ohne Pause`
34. Text: Mail-1-Text **"4) Typ: Dauerstrom ohne Pause"** einfügen
35. **Save**
36. Unter **"No"** → **"Condition"**

### Condition 5 — Typ "verdauung"
37. Feld: **typ**, Vergleich: **is equal**, Wert: `verdauung`
38. AND-Block löschen falls vorhanden, **Save**
39. Unter **"Yes"** → "Email"
40. Betreff: `{$name}, dein Energie-Typ: Bauch-Bremse`
41. Text: Mail-1-Text **"5) Typ: Bauch-Bremse"** einfügen
42. **Save**
43. Unter **"No"** → **"Condition"**

### Condition 6 — Typ "zucker_verdauung"
44. Feld: **typ**, Vergleich: **is equal**, Wert: `zucker_verdauung`
45. AND-Block löschen falls vorhanden, **Save**
46. Unter **"Yes"** → "Email"
47. Betreff: `{$name}, dein Energie-Typ: Zucker-Bauch`
48. Text: Mail-1-Text **"6) Typ: Zucker-Bauch"** einfügen
49. **Save**
50. Unter **"No"** → **"Condition"**

### Condition 7 — Typ "stress_zucker"
51. Feld: **typ**, Vergleich: **is equal**, Wert: `stress_zucker`
52. AND-Block löschen falls vorhanden, **Save**
53. Unter **"Yes"** → "Email"
54. Betreff: `{$name}, dein Energie-Typ: Cortisol-Crash`
55. Text: Mail-1-Text **"7) Typ: Cortisol-Crash"** einfügen
56. **Save**
57. Unter **"No"** → **diesmal keine weitere Condition** — direkt auf **"Email"** klicken

### Letzter Zweig — "Fast am Ziel" (deckt alle übrigen Fälle ab)
58. Betreff: `{$name}, dein Energie-Typ: Fast am Ziel`
59. Text: Mail-1-Text **"8) Typ: Fast am Ziel"** einfügen
60. **Save**

Fertig — der Baum hat jetzt 7 Bedingungen und 8 Mail-Enden. Jede Person bekommt automatisch genau eine der 8 Mails.

### Aktivieren
61. Oben rechts auf **Activate** klicken

---

## Automation B — Story + Webinar-Einladung (neu, separat)

### Neue Automation anlegen
1. Im Menü links auf **Automations** klicken
2. Oben rechts **"Create automation"** (bzw. **+**)
3. Name eingeben, z.B. `Energie-Test Follow-up`

### Trigger einstellen
4. **"Completes a form"** wählen
5. Formular **"Energie-Test Leads"** auswählen (dasselbe wie bei Automation A)

### Wartezeit + Mail 2
6. Auf das **+** unter dem Trigger klicken
7. **"Wait"** auswählen
8. Wartezeit eintragen, z.B. **1 Tag** (kann später angepasst werden)
9. Auf das **+** darunter klicken → **"Email"** auswählen
10. Betreff: `{$name}, warum ich das hier mache`
11. Text: siehe unten ("Mail 2 — Martinas Story")
12. **Save**

### Wartezeit + Mail 3
13. Auf das **+** darunter klicken → **"Wait"** → z.B. **1 Tag**
14. Auf das **+** darunter klicken → **"Email"**
15. Betreff: `{$name}, dein Platz im kostenlosen Webinar wartet`
16. Text: siehe unten ("Mail 3 — Webinar-Einladung")
17. **Save**

### Wartezeit + Mail 4 (neu — Bewegungs-Impuls)
18. Auf das **+** darunter klicken → **"Wait"** → z.B. **4–5 Tage**
19. Auf das **+** darunter klicken → **"Email"**
20. Betreff: `{$name}, der Bereich, der bei Müdigkeit am meisten unterschätzt wird`
21. Text: siehe unten ("Mail 4 — Bewegungs-Impuls") bzw. Abschnitt "Mail 4" in `Anleitung-MailerLite-Ergebnis-Mail.md`
22. **Save**

Hinweis: Diese Mail geht an **alle**, die bis hierhin in der Automation sind — MailerLite kann aktuell nicht erkennen, wer die Performanceanalyse schon gebucht hat (dafür fehlt eine Rückmeldung vom Buchungstool). Details dazu stehen im Anleitung-Dokument.

### Aktivieren
23. Oben rechts auf **Activate** klicken

---

## Mail 2 — Martinas Story (für alle Typen gleich)

**Betreff:** {$name}, warum ich das hier mache

**Text:**
> Hallo {$name},
>
> bevor es im nächsten Schritt um dein Webinar geht, will ich dir kurz erzählen, warum mir dieses Thema so wichtig ist.
>
> Ich habe 8 Jahre im Hormonzentrum gearbeitet, bevor ich selbst Mutter wurde. In dieser Zeit habe ich gesehen, wie wenig wir Frauen oft wirklich über unseren eigenen Körper wissen — und wie viel möglich wird, wenn man anfängt zu verstehen statt nur zu glauben. Genau das hat mich dazu gebracht, Frauen nicht mehr mit pauschalen Tipps abzuspeisen, sondern wirklich hinzuschauen: Was steckt bei dir persönlich dahinter?
>
> Über 200 Frauen habe ich seitdem begleitet — jede mit einem eigenen Bild, keine wie die andere. Genau das ist der Grund, warum ich dir in meiner letzten Mail keine pauschale Liste gegeben habe, sondern einen ersten, für dich passenden Schritt.
>
> Im Webinar zeige ich dir, wie dieser Weg vom Raten zum Wissen für dich konkret aussehen kann.
>
> [Button: Jetzt kostenlos ins Webinar →]
>
> Herzlich, Martina

---

## Mail 3 — Webinar-Einladung (für alle Typen gleich)

**Betreff:** {$name}, dein Platz im kostenlosen Webinar wartet

**Text:**
> Hallo {$name},
>
> du hast jetzt deinen Energie-Typ und weißt, wo bei dir wahrscheinlich der Hebel liegt. Der nächste Schritt: im kostenlosen Webinar zeige ich dir, wie du von "ich vermute" zu "ich weiß" kommst.
>
> Was dich erwartet:
> - Die 5 häufigsten Energiefresser im Überblick — du erkennst deinen eigenen Typ wieder
> - Warum Pauschalempfehlungen bei den meisten Frauen nicht wirken
> - Der Unterschied zwischen raten und wirklich messen
> - Ein konkreter erster Schritt für dich zum Mitnehmen
>
> Ca. 30–40 Minuten, kostenlos, von zu Hause aus.
>
> [Button: Jetzt kostenlos anmelden →]
>
> Herzlich, Martina

---

## Mail 4 — Bewegungs-Impuls (neu, geht an alle, unabhängig vom Webinar-Status)

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
