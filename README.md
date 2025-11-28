# ObsidianClipper - ChatGPT Template

Ein [Obsidian Web Clipper](https://obsidian.md/clipper) Template zum Speichern von ChatGPT-Konversationen direkt in Obsidian.

## 📋 Übersicht

Dieses Template ermöglicht es, ChatGPT-Unterhaltungen mit einem Klick als strukturierte Markdown-Notizen in Obsidian zu speichern. Alle wichtigen Metadaten werden automatisch extrahiert und formatiert.

## ✨ Features

- **Automatische Metadaten-Extraktion:**
  - Titel der Konversation
  - URL und Chat-ID
  - Verwendetes KI-Modell
  - Erstellungsdatum und Zeitstempel
  
- **Intelligente Organisation:**
  - Automatische Ablage in `Clippings/ChatGPT/[Jahr]`
  - Strukturierte Frontmatter-Metadaten
  - Automatisches Tagging (chatgpt, ai, clipping)

- **Formatierung:**
  - Vollständige Konversation mit Markdown-Formatierung
  - Code-Blöcke mit Syntax-Highlighting
  - Übersichtliche Darstellung mit Emojis
  - Direkter Link zur Original-Konversation

## 🚀 Installation

1. Installiere die [Obsidian Web Clipper Extension](https://obsidian.md/clipper) für deinen Browser
2. Lade die Datei `ChatGPT.clipper.json` herunter
3. Importiere das Template in Obsidian Web Clipper:
   - Öffne die Extension-Einstellungen
   - Gehe zu "Templates"
   - Klicke auf "Import Template"
   - Wähle die `ChatGPT.clipper.json` Datei

## 📝 Verwendung

### Basis-Verwendung (Automatisch ohne Markierung)

1. Öffne eine ChatGPT-Konversation auf `chatgpt.com` oder `chat.openai.com`
2. **Keine Markierung nötig!** 🎉
3. Klicke auf das Obsidian Web Clipper Icon in deinem Browser
4. Wähle das "ChatGPT" Template
5. Die Konversation wird automatisch in Obsidian gespeichert

**Hinweis:** Das Template verwendet automatische Extraktion mit dem Selektor `.markdown.prose`. Falls du manuell markieren möchtest, funktioniert das auch weiterhin.

### ⚠️ Code-Blöcke werden nicht angezeigt?

Siehe **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** für detaillierte Hilfe!

**Schnelllösung:** Falls Code-Blöcke mit Backticks erfasst wurden:
```bash
npm run convert "Pfad/zur/Datei.md"
```

### Post-Processing: Code-Blöcke prüfen und konvertieren

**1. Prüfe, ob Code-Blöcke vorhanden sind und welches Format sie verwenden:**

```bash
# Einzelne Datei prüfen
npm run check "Clippings/ChatGPT/2024/Meine-Konversation.md"

# Gesamtes Verzeichnis prüfen
npm run check Clippings/ChatGPT
```

**2. Falls Code-Blöcke mit Backticks erfasst wurden, konvertiere sie:**

```bash
# Einzelne Datei konvertieren
npm run convert "Clippings/ChatGPT/2024/Meine-Konversation.md"

# Gesamtes Verzeichnis rekursiv konvertieren
npm run convert Clippings/ChatGPT

# Prüfen UND automatisch konvertieren
npm run check:convert "Clippings/ChatGPT/2024/Meine-Konversation.md"

# Dry-Run (zeigt was konvertiert würde, ohne Änderungen zu schreiben)
npm run convert:dry-run Clippings/ChatGPT
```

**Features des Post-Processing-Scripts:**
- ✅ Konvertiert Code-Blöcke von Backticks (` ``` `) zu Tilde-Fences (`~~~`)
- ✅ Behält Sprach-Informationen bei (` ```javascript` → `~~~ javascript`)
- ✅ Adaptive Fence-Länge: Wenn Code Tilden enthält, werden längere Fences verwendet
- ✅ Rekursive Verarbeitung von Verzeichnissen
- ✅ Dry-Run Modus zum Testen ohne Änderungen

## 📂 Dateistruktur

Die erstellten Notizen haben folgende Struktur:

```markdown
---
title: [Titel der Konversation]
url: [ChatGPT URL]
created: [YYYY-MM-DD]
chat_id: [Eindeutige Chat-ID]
model: [Verwendetes Modell, z.B. GPT-4]
timestamp: [ISO 8601 Zeitstempel]
tags:
  - chatgpt
  - ai
  - clipping
---

## 💬 Konversation

[Vollständiger Gesprächsverlauf in Markdown]

---

**🤖 Modell:** [Modellname] • **📅 Erstellt:** [DD.MM.YYYY] • **🔗 Quelle:** [Link zur Original-Konversation]
```

## 🎯 Unterstützte URLs

Das Template wird automatisch aktiviert auf:
- `https://chatgpt.com/c/...`
- `https://chat.openai.com/c/...`

## ⚙️ Konfiguration

### Pfad anpassen

Im Template kannst du den Speicherort ändern:
```json
"path": "Clippings/ChatGPT/{{selector:time|attr:datetime|date:\"YYYY\"}}"
```

### Dateinamen-Format

Standardmäßig wird der Konversationstitel als Dateiname verwendet:
```json
"noteNameFormat": "{{title}}"
```

### Frontmatter anpassen

Die Properties können in der `properties` Sektion individuell angepasst werden.

## 🤝 Beitragen

Verbesserungsvorschläge und Pull Requests sind willkommen!

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.

## 🧪 Entwicklung & Tests

### Voraussetzungen

- Node.js (v16 oder höher)
- npm

### Setup

```bash
# Repository klonen
git clone https://github.com/EduardMayer-IT/ObsidianClipper.git
cd ObsidianClipper

# Dependencies installieren
npm install
```

### Tests ausführen

```bash
# Tests ausführen
npm test

# Tests mit Coverage
npm run coverage

# Tests im Watch-Modus
npm run test:watch
```

### Code-Struktur

- `src/htmlToMd.ts` - Turndown-Service mit angepassten Regeln für Tilde-Fences
- `src/convertBackticksToTildes.ts` - Post-Processing-Script zur Konvertierung von Backticks zu Tilden
- `test/htmlToMd.test.ts` - Unit-Tests für HTML-zu-Markdown-Konvertierung
- `test/convertBackticksToTildes.test.ts` - Unit-Tests für Post-Processing-Script
- `ChatGPT.clipper.json` - Obsidian Web Clipper Template-Konfiguration

### Technische Details

Das Template verwendet Tilde-Fences (`~~~`) statt Backtick-Fences für Codeblöcke, um Kompatibilitätsprobleme mit verschachtelten Codeblöcken zu vermeiden:

- **Sprach-Erkennung**: Automatische Extraktion der Programmiersprache aus `class="language-*"` oder direkten Klassennamen
- **Adaptive Fence-Länge**: Wenn der Code selbst `~~~` enthält, werden längere Fences verwendet (z.B. `~~~~`)
- **Fallback-Strategien**: Unterstützt verschiedene Klassennamen-Muster (`language-js`, `lang-js`, `javascript`, etc.)

#### Warum Tilde-Fences?

**Problem mit Backticks:**
```markdown
```javascript
const code = `template ${string}`;
``` ← Bricht hier ab wegen der Backticks im Code!
```

**Lösung mit Tilden:**
```markdown
~~~ javascript
const code = `template ${string}`;
~~~ ← Funktioniert einwandfrei!
```

Bei verschachtelten `~~~` im Code werden automatisch längere Fences (`~~~~`) verwendet.

### Coverage-Anforderungen

Das Projekt erfordert eine Mindest-Coverage von 80% für:
- Lines (Zeilen)
- Functions (Funktionen)
- Branches (Verzweigungen)
- Statements (Anweisungen)

Aktuelle Coverage liegt bei **100% Lines/Functions, 88% Branches**.

## 🔗 Links

- [Obsidian](https://obsidian.md)
- [Obsidian Web Clipper](https://obsidian.md/clipper)
- [ChatGPT](https://chatgpt.com)
- [Turndown](https://github.com/mixmark-io/turndown) - HTML-zu-Markdown-Konverter
