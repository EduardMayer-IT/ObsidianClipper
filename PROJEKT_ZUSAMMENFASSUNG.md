# Projekt-Zusammenfassung: ObsidianClipper

## 🎯 Projektziel

Ein Template für den Obsidian Web Clipper zum automatisierten Speichern von ChatGPT-Konversationen als strukturierte Markdown-Notizen in Obsidian.

## 📊 Aktueller Status

**Entwicklungsstand:** Funktionsfähig mit Einschränkungen  
**Letzte funktionierende Version:** Commit `a578131 - Markieren und Clippen funktioniert`  
**Repository:** https://github.com/EduardMayer-IT/ObsidianClipper

### ✅ Was funktioniert

- **Manuelles Clippen mit Markierung:** Benutzer markiert Konversation → Clipper speichert als Markdown
- **Metadaten-Extraktion:** Titel, URL, Chat-ID werden korrekt erfasst
- **Ordnerstruktur:** Automatische Ablage in `Clippings/ChatGPT/[Jahr]`
- **Frontmatter:** YAML-Metadaten werden generiert
- **Markdown-Konvertierung:** Text und Code-Blöcke werden sauber konvertiert
- **TDD-Implementation:** TypeScript-Modul mit 13 Tests, 100% Line/Function Coverage

### ❌ Was nicht funktioniert

- **Automatisches Clippen ohne Markierung:** Code-Blöcke werden nicht erfasst
- **Selector-basierte Extraktion:** Verschiedene CSS-Selektoren (`#thread`, `.markdown.prose`, `article[data-testid^="conversation-turn"]`) scheitern
- **Turndown-Integration im Browser:** `{{selectorHtml:...|turndown:fence=~~~}}` funktioniert nicht wie erwartet
- **Bedingte Logik:** Handlebars `{{#if content}}...{{else}}...{{/if}}` wird nicht unterstützt

## 🏗️ Projektstruktur

```
ObsidianClipper/
├── ChatGPT.clipper.json          # Obsidian Web Clipper Template
├── README.md                      # Dokumentation
├── package.json                   # npm-Konfiguration
├── vitest.config.ts              # Test-Konfiguration
├── src/
│   └── htmlToMd.ts               # Turndown-Service mit Tilde-Fences
└── test/
    └── htmlToMd.test.ts          # Unit-Tests (13 Tests)
```

## 🔧 Technologie-Stack

- **Node.js/npm** - Paketmanagement
- **TypeScript** - Implementierung
- **Vitest** - Testing-Framework mit jsdom
- **Turndown** - HTML-zu-Markdown-Konverter
- **Obsidian Web Clipper** - Browser-Extension (Chrome/Firefox)

## 📝 ChatGPT.clipper.json - Analyse

### Aktuelle Konfiguration

```json
{
  "schemaVersion": "0.1.0",
  "name": "ChatGPT",
  "behavior": "create",
  "noteNameFormat": "{{title}}",
  "path": "Clippings/ChatGPT/{{selector:time|attr:datetime|date:\"YYYY\"}}",
  "noteContentFormat": "---\ntitle: {{title}}\nurl: {{url}}\nchat_id: {{url|split:\"/\"|slice:-1}}\nmodel: ChatGPT\ntags:\n  - chatgpt\n  - clipping\n---\n\n## 💬 Konversation\n\n{{content}}",
  "properties": [...],
  "triggers": [
    "https://chatgpt.com/c/",
    "https://chat.openai.com/c/"
  ]
}
```

### Wichtige Template-Variablen

- `{{title}}` - Seitentitel
- `{{url}}` - Aktuelle URL
- `{{content}}` - Markierter Inhalt (nur wenn Benutzer manuell markiert)
- `{{selector:CSS_SELECTOR|FILTER}}` - CSS-basierte Inhaltsextraktion
- `{{selectorHtml:CSS_SELECTOR|turndown:OPTIONS}}` - HTML-Extraktion mit Turndown-Konvertierung

### Problembereich: Content-Extraktion

**Versuchte Ansätze:**

1. **`{{content}}`** → ✅ Funktioniert, aber nur mit manueller Markierung
2. **`{{selectorHtml:#thread|turndown:fence=~~~}}`** → ❌ Zu viel HTML-Struktur (Buttons, Navigation)
3. **`{{selectorHtml:.markdown.prose|turndown:...}}`** → ❌ Nur Assistenten-Antworten, keine User-Nachrichten
4. **`{{selectorHtml:article[data-testid^='conversation-turn'] .text-message|...}}`** → ❌ Gibt JSON-Array statt Markdown zurück
5. **`{{selectorHtml:div[class*='flex-col'][class*='text-sm']|...}}`** → ❌ Gibt rohen HTML-String aus

### Kernerkenntnis

**Der Obsidian Web Clipper konvertiert automatisch `{{content}}` nach Markdown**, wenn der Benutzer den Inhalt markiert. Selector-basierte HTML-Extraktion mit Turndown-Optionen funktioniert in der Browser-Extension nicht wie in der lokalen TypeScript-Implementierung.

## 🧪 TDD-Implementierung

### src/htmlToMd.ts - Highlights

```typescript
// Adaptive Fence-Länge: Erkennt ~~~ im Code und verwendet ~~~~
function createTurndown(): TurndownService {
  const turndownService = new TurndownService({
    codeBlockStyle: 'fenced',
    fence: '~~~'
  });

  turndownService.addRule('customPreCode', {
    filter: function (node, options) {
      return node.nodeName === 'PRE' && 
             node.firstChild?.nodeName === 'CODE';
    },
    replacement: function (content, node, options) {
      const codeElement = node.firstChild;
      const language = extractLanguage(codeElement);
      const tildeMatch = content.match(/^~+/m);
      const fence = tildeMatch ? '~'.repeat(tildeMatch[0].length + 1) : '~~~';
      
      return `\n${fence} ${language}\n${content}\n${fence}\n`;
    }
  });

  return turndownService;
}
```

### Test-Coverage

- **13 Unit-Tests**
- **100% Line Coverage**
- **100% Function Coverage**  
- **88% Branch Coverage**

**Test-Szenarien:**
- Sprach-Erkennung (`language-javascript`, `lang-python`, direkte Klassennamen)
- Adaptive Fence-Länge bei verschachtelten Tilden
- Mehrere Code-Blöcke
- Leere Blöcke
- Sonderzeichen-Escaping

## ⚠️ Hauptproblem

**Diskrepanz zwischen lokaler Implementierung und Browser-Extension:**

- **Lokal (TypeScript + Vitest):** Turndown-Service funktioniert perfekt mit Tilde-Fences
- **Browser (Obsidian Web Clipper):** Turndown-Optionen in Template-Selektoren werden nicht wie erwartet angewendet

Die Browser-Extension scheint eine andere oder eingeschränkte Turndown-Konfiguration zu verwenden, die nicht dieselben Custom Rules unterstützt.

## 🎯 Nächste Schritte

### Option 1: Akzeptiere manuelle Markierung
- Dokumentiere klar, dass Benutzer manuell markieren müssen
- Fokus auf stabile Frontmatter-Metadaten

### Option 2: Post-Processing ✅ IMPLEMENTIERT
- ✅ Post-Processing-Script erstellt: `src/convertBackticksToTildes.ts`
- ✅ Konvertiert Code-Blöcke von Backticks (` ``` `) zu Tilde-Fences (`~~~`)
- ✅ Adaptive Fence-Länge bei verschachtelten Tilden
- ✅ Rekursive Verzeichnis-Verarbeitung
- ✅ Dry-Run Modus zum Testen
- ✅ 10 Unit-Tests mit vollständiger Coverage
- ✅ npm-Scripts: `npm run convert` und `npm run convert:dry-run`

### Option 3: Alternative Clipper
- Prüfe, ob andere Browser-Extensions (MarkDownload, SingleFile) bessere Kontrolle bieten
- Erstelle eigene Browser-Extension mit direkter Turndown-Integration

### Option 4: Hybrid-Ansatz
- Manuelle Markierung für komplexe Konversationen mit Code
- Automatische Extraktion für reine Text-Chats

---

## 📋 Prompt für andere KI

**Verwende diesen Prompt, um einer anderen KI den Projekt-Kontext zu übergeben:**

```
Ich arbeite am Projekt "ObsidianClipper" - einem Template für den Obsidian Web Clipper zum Speichern von ChatGPT-Konversationen.

AKTUELLER STATUS:
- Das manuelle Clippen mit Markierung funktioniert ({{content}} im Template)
- Automatisches Clippen ohne Markierung schlägt fehl - Code-Blöcke werden nicht erfasst
- Verschiedene CSS-Selektoren (#thread, .markdown.prose, article[data-testid^="conversation-turn"]) funktionieren nicht wie erwartet
- Turndown-Optionen in {{selectorHtml:...|turndown:fence=~~~}} werden vom Browser-Clipper nicht korrekt verarbeitet

TECHNISCHER KONTEXT:
- Die lokale TypeScript-Implementierung (src/htmlToMd.ts) funktioniert perfekt mit Tilde-Fences (~~~)
- 13 Unit-Tests mit 100% Line/Function Coverage bestätigen die Funktionalität
- Das Problem liegt in der Browser-Extension "Obsidian Web Clipper", die eine andere Turndown-Konfiguration verwendet

DATEI-ANALYSE:
Die ChatGPT.clipper.json enthält:
- schemaVersion: "0.1.0" (veraltetes Schema?)
- noteContentFormat mit {{content}} (erfordert manuelle Markierung)
- properties-Array mit Metadaten-Selektoren
- triggers für chatgpt.com und chat.openai.com URLs

ZIEL:
Ich möchte ChatGPT-Konversationen AUTOMATISCH (ohne manuelle Markierung) clippen können, wobei:
1. Benutzer- UND Assistenten-Nachrichten erfasst werden
2. Code-Blöcke mit Tilde-Fences (~~~) formatiert werden
3. Die Frontmatter-Metadaten (title, url, chat_id) funktionieren
4. Die Markdown-Ausgabe sauber und lesbar ist

FRAGEN AN DICH:
1. Gibt es eine Möglichkeit, die Turndown-Konfiguration im Obsidian Web Clipper zu steuern?
2. Welche CSS-Selektoren funktionieren für ChatGPT's neue UI-Struktur?
3. Soll ich zu schemaVersion "1.0.0" upgraden? Was sind die Unterschiede?
4. Gibt es alternative Browser-Extensions mit besserer Turndown-Kontrolle?
5. Ist ein Post-Processing-Script (Backticks → Tilden) die pragmatischste Lösung?

REPOSITORY: https://github.com/EduardMayer-IT/ObsidianClipper
LETZTER COMMIT: a578131 - "Markieren und Clippen funktioniert"

Bitte analysiere die Situation und schlage konkrete Lösungsansätze vor.
```

---

**Erstellt:** 28. November 2025  
**Status:** In Entwicklung  
**Maintainer:** EduardMayer-IT
