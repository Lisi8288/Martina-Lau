# Klick-für-Klick-Anleitung — GTM-Tracking für den Energie-Test

Container: **GTM-PBWMW7QB** (läuft schon auf allen Seiten, inkl. `energie-test.html`).

Vier Events werden im Code schon automatisch in den dataLayer gepusht, sobald jemand den Test macht — die stehen also bereit, GTM muss sie nur noch "abholen":

| Event | Wann | Zusatzdaten | Zweck |
|---|---|---|---|
| `quiz_start` | Klick auf "Test starten" | `funnel: 'energie-test'` | GA4: Funnel-Einstieg messen |
| `quiz_question_answered` | nach jeder beantworteten Frage | `question_index`, `question_total`, `question_dim` | GA4: Abbruchquote pro Frage sehen |
| `quiz_complete` | nach der letzten Frage | `quiz_typ`, `funnel` | GA4: Test wirklich zu Ende gemacht |
| `lead_quiz_complete` | E-Mail-Formular abgeschickt | `quiz_typ`, `quiz_phase`, `funnel` | **Conversion** — GA4 + Google Ads |

Nur `lead_quiz_complete` ist der eigentliche Lead/Conversion-Punkt (E-Mail-Adresse eingesammelt). Die anderen drei sind reine GA4-Analyse-Events, keine Conversions.

---

## Schritt 0 — Prüfen, ob schon eine GA4-Konfiguration im Container liegt

1. [tagmanager.google.com](https://tagmanager.google.com) öffnen, Container **GTM-PBWMW7QB** auswählen
2. Links auf **Tags** klicken
3. Schau, ob dort schon ein Tag vom Typ **"Google Analytics: GA4-Konfiguration"** existiert (oft heißt er "GA4 - Config" o.ä.)
   - **Ja, existiert schon:** Schritt 1 überspringen, weiter mit Schritt 2
   - **Nein, gibt's noch nicht:** Schritt 1 machen

---

## Schritt 1 — GA4-Konfigurationstag anlegen (nur falls noch nicht vorhanden)

1. **Tags → Neu**
2. Tag-Konfiguration anklicken → **Google Analytics: GA4-Konfiguration**
3. **Messungs-ID** eintragen: `G-XXXXXXXXXX` (eure GA4-Property — findet ihr in GA4 unter Verwaltung → Datenstreams → euer Web-Stream)
4. Auslösung: **All Pages** (Standard-Trigger, ist meist schon da)
5. Tag benennen: z. B. `GA4 - Config`
6. **Speichern**

Dieser Tag muss auf jeder Seite feuern, bevor Events gesendet werden können — deshalb "All Pages".

---

## Schritt 2 — Vier Trigger anlegen (Custom Event)

Für jedes der vier Events einen eigenen Trigger:

1. **Trigger → Neu**
2. Trigger-Konfiguration → **Benutzerdefiniertes Ereignis**
3. Ereignisname: **exakt** einer von:
   - `quiz_start`
   - `quiz_question_answered`
   - `quiz_complete`
   - `lead_quiz_complete`
4. "Dieser Trigger sollte ausgelöst werden bei" → **Alle benutzerdefinierten Ereignisse**
5. Trigger benennen wie das Event selbst, z. B. `CE - quiz_start`
6. **Speichern**

→ Wiederholen für alle vier Events, macht **4 Trigger** insgesamt.

---

## Schritt 3 — Drei GA4-Event-Tags (quiz_start, quiz_question_answered, quiz_complete)

Für jedes dieser drei Events:

1. **Tags → Neu**
2. Tag-Konfiguration → **Google Analytics: GA4-Ereignis**
3. Konfigurationstag: den Tag aus Schritt 1 auswählen (z. B. `GA4 - Config`)
4. Ereignisname: **denselben Namen wie das dataLayer-Event eintragen**, z. B. `quiz_start`
5. Bei `quiz_question_answered` zusätzlich unter **Ereignisparameter** die drei Zusatzwerte mitschicken (optional, aber empfohlen für die Abbruch-Analyse):
   - Parametername `question_index` → Wert `{{DLV - question_index}}`
   - Parametername `question_total` → Wert `{{DLV - question_total}}`
   - Parametername `question_dim` → Wert `{{DLV - question_dim}}`
   - *(Falls die Variablen `{{DLV - question_index}}` etc. noch nicht existieren: Variablen → Neu → Datenebenenvariable → Name des Datenebenenvariable exakt `question_index` / `question_total` / `question_dim` eintragen)*
6. Auslösung: den passenden Trigger aus Schritt 2 auswählen (z. B. `CE - quiz_start`)
7. Tag benennen, z. B. `GA4 Event - quiz_start`
8. **Speichern**

→ Wiederholen für `quiz_question_answered` und `quiz_complete` (bei `quiz_complete` optional den Parameter `quiz_typ` mitschicken, gleiches Prinzip wie oben).

---

## Schritt 4 — GA4-Event-Tag für lead_quiz_complete

Gleiches Vorgehen wie in Schritt 3, aber für `lead_quiz_complete`:

1. **Tags → Neu** → **Google Analytics: GA4-Ereignis**
2. Konfigurationstag: `GA4 - Config`
3. Ereignisname: `lead_quiz_complete`
4. Ereignisparameter (optional): `quiz_typ` → `{{DLV - quiz_typ}}`, `quiz_phase` → `{{DLV - quiz_phase}}`
5. Auslösung: `CE - lead_quiz_complete`
6. Tag benennen: `GA4 Event - lead_quiz_complete`
7. **Speichern**

---

## Schritt 5 — Google-Ads-Conversion-Tag für lead_quiz_complete

Das ist der wichtigste Tag — das ist eure neue Conversion-Messung für den Quiz-Funnel (ersetzt die alte Dankeseiten-Messung, die hier nicht mehr feuert).

1. Vorher in **Google Ads** unter **Tools → Conversions** eine neue Conversion-Aktion anlegen (falls noch nicht geschehen): Typ "Website", Kategorie "Lead", Wert/Zählung nach eurem Ermessen. Google Ads zeigt euch danach eine **Conversion-ID** (`AW-XXXXXXXXX`) und ein **Conversion-Label**.
2. Zurück in GTM: **Tags → Neu** → **Google Ads: Conversion-Tracking**
3. **Conversions-ID**: `AW-XXXXXXXXX` eintragen
4. **Conversion-Label**: das Label aus Google Ads eintragen
5. Auslösung: `CE - lead_quiz_complete`
6. Tag benennen: `Ads Conversion - lead_quiz_complete`
7. **Speichern**

---

## Schritt 6 — Testen (Vorschau-Modus)

1. Oben rechts in GTM auf **Vorschau** klicken
2. URL eingeben: `https://www.martinalau.org/energie-test.html` (oder lokal, falls der Testserver läuft)
3. Den Test einmal komplett durchklicken (alle 20 Fragen + E-Mail-Formular)
4. Im GTM-Debug-Fenster prüfen, ob bei jedem Schritt die passenden Tags als **Fired** auftauchen — besonders wichtig: `GA4 Event - lead_quiz_complete` und `Ads Conversion - lead_quiz_complete` beim Formular-Absenden
5. Falls ein Tag nicht feuert: meist liegt's am Ereignisnamen im Trigger (Tippfehler) oder am fehlenden Konfigurationstag

---

## Schritt 7 — Veröffentlichen

1. Vorschau-Modus verlassen
2. Oben rechts auf **Senden** (Submit)
3. Versionsname z. B. `Energie-Test Tracking` eintragen
4. **Veröffentlichen**

Erst danach ist alles auch für echte Besucher aktiv, nicht nur im Vorschau-Modus.

---

## Was hier bewusst NICHT drin ist

- **Enhanced Conversions / Conversion-Wert dynamisch nach Typ** — falls später gewünscht, eigener Ausbauschritt
- **Consent-Mode-Feinschliff** — die Seite hat schon Consent Mode v2 mit Cookie-Banner eingebaut (Marketing/GTM standardmäßig deaktiviert bis Einwilligung); die Tags oben feuern erst, wenn die Einwilligung entsprechend erteilt wurde — das ist bereits im Code so vorgesehen, hier nicht nochmal extra zu konfigurieren
