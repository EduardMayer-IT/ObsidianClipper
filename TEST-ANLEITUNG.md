# Test-Anleitung: Automatisches Clippen ohne Markierung

## 🎯 Ziel
Finde die beste Template-Variante, die automatisch ChatGPT-Konversationen clippt **ohne manuelle Markierung**.

## 📋 Schritt-für-Schritt

### Schritt 1: Varianten vorbereiten
Du hast jetzt 4 verschiedene Template-Varianten:
- `ChatGPT-variante-1.json` - conversation-turn Selektor
- `ChatGPT-variante-2.json` - main Selektor  
- `ChatGPT-variante-3.json` - markdown prose Selektor
- `ChatGPT-variante-4.json` - selector text (ohne Html)

### Schritt 2: Variante 1 testen

1. **Template importieren:**
   - Öffne Obsidian Web Clipper Extension
   - Gehe zu "Templates" → "Import Template"
   - Wähle `ChatGPT-variante-1.json`
   - Benenne es um zu "ChatGPT Test 1"

2. **Testen:**
   - Öffne eine ChatGPT-Konversation
   - **WICHTIG:** Markiere NICHTS!
   - Klicke auf Clipper-Icon
   - Wähle "ChatGPT Test 1"
   - Klicke "Clip"

3. **Ergebnis prüfen:**
   - Öffne die erstellte Datei in Obsidian
   - Prüfe: Wurde der Konversationsinhalt erfasst?
   - Prüfe: Sind Code-Blöcke vorhanden?
   - Prüfe: Sind User- UND Assistenten-Nachrichten da?

4. **Ergebnis dokumentieren:**
   ```
   Variante 1: ✅ Funktioniert / ❌ Funktioniert nicht
   - Konversation: ✅/❌
   - Code-Blöcke: ✅/❌
   - User-Nachrichten: ✅/❌
   ```

### Schritt 3: Weitere Varianten testen

Wiederhole Schritt 2 für:
- Variante 2
- Variante 3
- Variante 4

### Schritt 4: Beste Variante verwenden

Sobald du eine funktionierende Variante gefunden hast:
1. Kopiere den Inhalt der funktionierenden Variante
2. Ersetze den Inhalt von `ChatGPT.clipper.json`
3. Importiere das Template als "ChatGPT" (Haupt-Template)

## 🔍 Selector-Finder verwenden (Optional)

Falls keine Variante funktioniert, finde die richtigen Selektoren:

### Option A: Bookmarklet (Einfachste Methode)

1. **Bookmarklet erstellen:**
   - Öffne `find-selectors-bookmarklet.js`
   - Kopiere den gesamten Inhalt
   - Erstelle ein neues Lesezeichen im Browser
   - Name: "ChatGPT Selector Finder"
   - URL: Füge den kopierten Code ein

2. **Verwenden:**
   - Öffne eine ChatGPT-Konversation
   - Klicke auf das Bookmarklet
   - Öffne die Konsole (F12) für Details
   - Kopiere den besten Selektor

### Option B: Browser-Konsole

1. Öffne ChatGPT-Konversation
2. Drücke F12 → Console Tab
3. Kopiere den Inhalt von `find-selectors.js`
4. Füge ein und drücke Enter
5. Siehe Ergebnisse in der Konsole

## 📝 Template-Variante erstellen

Wenn du einen neuen Selektor gefunden hast:

1. Kopiere eine bestehende Variante
2. Ersetze den Selektor in `noteContentFormat`:
   ```json
   "noteContentFormat": "...\n\n{{selectorHtml:DEIN_SELEKTOR|text}}"
   ```
3. Speichere als neue Variante
4. Teste wie oben beschrieben

## ✅ Erfolgskriterien

Eine funktionierende Variante sollte:
- ✅ Konversationsinhalt automatisch erfassen (ohne Markierung)
- ✅ User-Nachrichten enthalten
- ✅ Assistenten-Antworten enthalten
- ✅ Code-Blöcke erfassen (wenn vorhanden)
- ✅ Keine unnötigen UI-Elemente (Buttons, Navigation) enthalten

## 🐛 Troubleshooting

**Problem: Leere Datei erstellt**
- Der Selektor findet keine Elemente
- Versuche einen anderen Selektor
- Prüfe mit Selector-Finder, welche Selektoren verfügbar sind

**Problem: Nur Assistenten-Antworten**
- Der Selektor erfasst nur `.markdown.prose`
- Versuche einen Selektor, der beide Nachrichtentypen erfasst

**Problem: Zu viel HTML/UI-Elemente**
- Der Selektor ist zu breit gefasst
- Versuche einen spezifischeren Selektor

**Problem: Code-Blöcke fehlen**
- Nach dem Clippen: `npm run check "Datei.md"`
- Falls Backticks: `npm run convert "Datei.md"`

## 📊 Test-Protokoll

Führe für jede Variante ein Protokoll:

| Variante | Konversation | Code-Blöcke | User-MSG | Assistent-MSG | Status |
|----------|--------------|-------------|----------|---------------|--------|
| 1        | ✅/❌        | ✅/❌       | ✅/❌    | ✅/❌         |        |
| 2        | ✅/❌        | ✅/❌       | ✅/❌    | ✅/❌         |        |
| 3        | ✅/❌        | ✅/❌       | ✅/❌    | ✅/❌         |        |
| 4        | ✅/❌        | ✅/❌       | ✅/❌    | ✅/❌         |        |

