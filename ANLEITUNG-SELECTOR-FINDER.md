# Anleitung: Selector-Finder verwenden

## Schritt-für-Schritt Anleitung

### Schritt 1: ChatGPT-Konversation öffnen
1. Öffne eine ChatGPT-Konversation im Browser:
   - Gehe zu `https://chatgpt.com/c/...` oder `https://chat.openai.com/c/...`
   - Stelle sicher, dass die Konversation sichtbar ist (mit Code-Blöcken, falls vorhanden)

### Schritt 2: Browser-Konsole öffnen
1. Drücke **F12** (oder Rechtsklick → "Untersuchen" / "Inspect")
2. Klicke auf den Tab **"Console"** (Konsole)

### Schritt 3: Script einfügen und ausführen

**Option A: Script-Datei öffnen und kopieren**
1. Öffne die Datei `find-selectors.js` in einem Texteditor
2. Kopiere den gesamten Inhalt (Strg+A, Strg+C)
3. Gehe zurück zur Browser-Konsole
4. Füge den Code ein (Strg+V)
5. Drücke **Enter** zum Ausführen

**Option B: Direkt aus der Datei laden**
1. In der Browser-Konsole, tippe:
   ```javascript
   fetch('file:///home/octomxl/Dokumente/VisualStudioCode/ObsidianClipper/find-selectors.js')
     .then(r => r.text())
     .then(eval);
   ```
   (Funktioniert nur, wenn die Datei lokal verfügbar ist)

### Schritt 4: Ergebnisse interpretieren

Das Script zeigt dir:
- ✅ **Gefundene Selektoren** mit Anzahl der Elemente
- ⭐ **Top 3 empfohlene Selektoren** für dein Template
- 💻 **Code-Blöcke** die gefunden wurden

### Schritt 5: Template aktualisieren

1. Öffne `ChatGPT.clipper.json`
2. Finde die Zeile mit `noteContentFormat`
3. Ersetze den aktuellen Selektor mit einem der empfohlenen:
   ```json
   "noteContentFormat": "...\n\n{{selectorHtml:HIER_DEN_SELEKTOR_EINFÜGEN|text}}"
   ```
4. Speichere die Datei
5. Importiere das Template neu in Obsidian Web Clipper

## Beispiel-Output

Das Script gibt etwa folgendes aus:

```
🔍 Analysiere ChatGPT-Seite auf mögliche Selektoren...

📊 Gefundene Selektoren:

1. Selector: [data-testid="conversation-turn"]
   Elemente gefunden: 5
   Hat Text: ✅
   Text-Vorschau: "Du: Hallo..."
   ...

⭐ Top 3 empfohlene Selektoren:

1. [data-testid="conversation-turn"]
   Template-Variable: {{selectorHtml:[data-testid="conversation-turn"]|text}}
```

## Troubleshooting

**Problem: Script zeigt keine Ergebnisse**
- Stelle sicher, dass die ChatGPT-Konversation vollständig geladen ist
- Warte ein paar Sekunden und führe das Script erneut aus
- Prüfe, ob JavaScript in der Konsole aktiviert ist

**Problem: Selektoren funktionieren nicht im Template**
- Versuche `{{selector:...|text}}` statt `{{selectorHtml:...|text}}`
- Prüfe, ob der Selektor-Syntax korrekt ist (Anführungszeichen beachten)
- Teste verschiedene Varianten aus `ChatGPT-auto-variants.md`

## Alternative: Manuell Selektoren finden

Falls das Script nicht funktioniert, kannst du auch manuell Selektoren finden:

1. Öffne die Browser-Konsole (F12)
2. Klicke auf das **Element-Symbol** (oben links in den DevTools)
3. Klicke auf eine Nachricht in der ChatGPT-Konversation
4. Im Elements-Tab siehst du die HTML-Struktur
5. Suche nach `data-testid`, `class` oder `id` Attributen
6. Rechtsklick auf ein Element → "Copy" → "Copy selector"

