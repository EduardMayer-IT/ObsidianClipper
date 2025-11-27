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

1. Öffne eine ChatGPT-Konversation auf `chatgpt.com` oder `chat.openai.com`
2. Klicke auf das Obsidian Web Clipper Icon in deinem Browser
3. Wähle das "ChatGPT" Template
4. Die Konversation wird automatisch in Obsidian gespeichert

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

## 🔗 Links

- [Obsidian](https://obsidian.md)
- [Obsidian Web Clipper](https://obsidian.md/clipper)
- [ChatGPT](https://chatgpt.com)
