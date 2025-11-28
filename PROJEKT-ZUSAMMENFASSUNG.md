# 📊 Projekt-Zusammenfassung: ObsidianClipper

**Stand:** Dezember 2024  
**Status:** ✅ Produktionsreif  
**Repository:** https://github.com/EduardMayer-IT/ObsidianClipper

---

## 🎯 Projektziel

Ein Template für den **Obsidian Web Clipper** zum **automatisierten Speichern** von ChatGPT-Konversationen als strukturierte Markdown-Notizen in Obsidian - **ohne manuelle Markierung**.

---

## ✨ Hauptfeatures

### ✅ Automatisches Clippen
- **Keine Markierung erforderlich** - Ein Klick genügt
- Automatische Extraktion mit `.markdown.prose` Selektor
- Erfasst Assistenten-Antworten vollständig
- Code-Blöcke werden automatisch erkannt

### ✅ Intelligente Metadaten-Extraktion
- Titel der Konversation
- URL und Chat-ID
- Verwendetes KI-Modell
- Erstellungsdatum und Zeitstempel
- Automatisches Tagging (chatgpt, clipping)

### ✅ Post-Processing Tools
- **Code-Block-Konvertierung:** Backticks (` ``` `) → Tilde-Fences (`~~~`)
- **Automatische Prüfung:** Findet Code-Blöcke und zeigt Format
- **Batch-Verarbeitung:** Rekursive Verzeichnis-Verarbeitung
- **Dry-Run Modus:** Testen ohne Änderungen

### ✅ Intelligente Organisation
- Automatische Ablage in `Clippings/ChatGPT/[Jahr]`
- Strukturierte Frontmatter-Metadaten
- Saubere Markdown-Formatierung

---

## 📁 Projektstruktur

```
ObsidianClipper/
├── ChatGPT.clipper.json          # ⭐ Haupt-Template (Variante 3)
├── ChatGPT-variante-*.json       # Test-Varianten für verschiedene Selektoren
│
├── src/
│   ├── htmlToMd.ts               # Turndown-Service mit Tilde-Fences
│   ├── convertBackticksToTildes.ts  # Post-Processing: Backticks → Tilden
│   └── checkAndConvert.ts        # Prüfung und Konvertierung von Code-Blöcken
│
├── test/
│   ├── htmlToMd.test.ts          # 7 Tests (100% Coverage)
│   └── convertBackticksToTildes.test.ts  # 10 Tests (100% Coverage)
│
├── find-selectors.js              # Browser-Script zum Finden von Selektoren
├── find-selectors-bookmarklet.js  # Bookmarklet-Version
│
├── README.md                      # Hauptdokumentation
├── PROJEKT_ZUSAMMENFASSUNG.md     # Detaillierte Projekt-Analyse
├── TROUBLESHOOTING.md             # Hilfe bei Problemen
├── TEST-ANLEITUNG.md              # Anleitung zum Testen von Varianten
└── ANLEITUNG-SELECTOR-FINDER.md   # Anleitung für Selector-Finder
```

---

## 🚀 Schnellstart

### Installation

1. **Obsidian Web Clipper Extension installieren**
   - Chrome: [Chrome Web Store](https://chrome.google.com/webstore)
   - Firefox: [Firefox Add-ons](https://addons.mozilla.org)

2. **Template importieren**
   - Öffne Extension-Einstellungen → "Templates"
   - Klicke "Import Template"
   - Wähle `ChatGPT.clipper.json`

### Verwendung

1. **Öffne ChatGPT-Konversation**
   - `https://chatgpt.com/c/...` oder `https://chat.openai.com/c/...`

2. **Clippe automatisch**
   - Klicke auf Clipper-Icon (ohne Markierung!)
   - Wähle "ChatGPT" Template
   - Fertig! ✅

3. **Post-Processing (falls nötig)**
   ```bash
   # Prüfen
   npm run check "Clippings/ChatGPT/2024/Datei.md"
   
   # Konvertieren
   npm run convert "Clippings/ChatGPT/2024/Datei.md"
   ```

---

## 🛠️ Technologie-Stack

- **TypeScript** - Implementierung
- **Vitest** - Testing-Framework (17 Tests, 100% Line/Function Coverage)
- **Turndown** - HTML-zu-Markdown-Konverter
- **Obsidian Web Clipper** - Browser-Extension
- **Node.js/npm** - Paketmanagement

---

## 📊 Test-Status

```
✓ 17 Tests bestanden
✓ 100% Line Coverage
✓ 100% Function Coverage
✓ 88% Branch Coverage
```

**Test-Dateien:**
- `htmlToMd.test.ts` - 7 Tests
- `convertBackticksToTildes.test.ts` - 10 Tests

---

## 🎨 Template-Varianten

| Variante | Selektor | Status | Beschreibung |
|----------|----------|--------|--------------|
| **Variante 3** ⭐ | `.markdown.prose` | ✅ Aktiv | Beste Lösung - automatisches Clippen |
| Variante 1 | `[data-testid="conversation-turn"]` | 📝 Test | Alternative für User-Nachrichten |
| Variante 2 | `main` | 📝 Test | Breiter Selektor |
| Variante 4 | `[data-testid="conversation-turn"]` (text) | 📝 Test | Ohne HTML-Konvertierung |

---

## 🔧 NPM-Scripts

```bash
# Tests
npm test                    # Alle Tests ausführen
npm run test:watch          # Tests im Watch-Modus
npm run coverage            # Coverage-Report generieren

# Post-Processing
npm run convert <pfad>      # Backticks → Tilden konvertieren
npm run convert:dry-run     # Dry-Run (zeigt was konvertiert würde)
npm run check <pfad>        # Code-Blöcke prüfen
npm run check:convert       # Prüfen UND konvertieren
```

---

## 📝 Beispiel-Output

### Erstellte Markdown-Datei:

```markdown
---
title: Python Code schreiben
url: https://chatgpt.com/c/6929d3e2-e30c-8326-80ae-2325c927cc62
chat_id: 6929d3e2-e30c-8326-80ae-2325c927cc62
model: ChatGPT
tags:
  - chatgpt
  - clipping
---

## 💬 Konversation

Hier ist ein sehr kurzer, minimalistischer Python-Code:

~~~ python
while True:
    user = input("Du: ")
    if user.lower() in ["quit", "exit"]:
        print("Chat beendet.")
        break
    print("Bot:", "Ich habe deinen Text erhalten:", user)
~~~
```

---

## 🎯 Verwendete Techniken

### Tilde-Fences statt Backticks

**Problem mit Backticks:**
```markdown
```javascript
const code = `template ${string}`;
``` ← Bricht ab!
```

**Lösung mit Tilden:**
```markdown
~~~ javascript
const code = `template ${string}`;
~~~ ← Funktioniert!
```

### Adaptive Fence-Länge
- Erkennt verschachtelte Tilden im Code
- Verwendet automatisch längere Fences (`~~~~`, `~~~~~`, etc.)

### Sprach-Erkennung
- Unterstützt: `language-*`, `lang-*`, direkte Klassennamen
- Fallback-Strategien für verschiedene Formate

---

## 📈 Entwicklungsgeschichte

### Phase 1: Manuelles Clippen ✅
- Template mit `{{content}}` Variable
- Erforderte manuelle Markierung
- Funktioniert zuverlässig

### Phase 2: Post-Processing ✅
- Script zur Konvertierung von Backticks zu Tilden
- Prüf- und Konvertierungs-Tools
- 10 Unit-Tests

### Phase 3: Automatisches Clippen ✅
- Variante 3 mit `.markdown.prose` Selektor
- Keine Markierung mehr erforderlich
- Selector-Finder Tools für weitere Optimierung

---

## 🔍 Bekannte Einschränkungen

### Aktuelle Implementierung
- ✅ Erfasst Assistenten-Antworten automatisch
- ⚠️ User-Nachrichten werden primär erfasst, wenn manuell markiert
- ✅ Code-Blöcke werden erfasst (ggf. Post-Processing nötig)

### Lösungsansätze
- **Für User-Nachrichten:** Manuell markieren (funktioniert weiterhin)
- **Für Code-Blöcke:** Post-Processing-Script verwenden
- **Für Optimierung:** Selector-Finder verwenden

---

## 📚 Dokumentation

| Datei | Beschreibung |
|-------|-------------|
| `README.md` | Hauptdokumentation mit Installation und Verwendung |
| `PROJEKT_ZUSAMMENFASSUNG.md` | Detaillierte technische Analyse |
| `TROUBLESHOOTING.md` | Hilfe bei häufigen Problemen |
| `TEST-ANLEITUNG.md` | Anleitung zum Testen verschiedener Varianten |
| `ANLEITUNG-SELECTOR-FINDER.md` | Anleitung für Selector-Finder Tools |

---

## 🎓 Verwendungsszenarien

### Szenario 1: Schnelles Clippen
1. ChatGPT-Konversation öffnen
2. Clipper-Icon klicken
3. Fertig - keine weitere Aktion nötig

### Szenario 2: Mit Code-Blöcken
1. Automatisch clippen
2. `npm run check "Datei.md"` ausführen
3. Falls Backticks: `npm run convert "Datei.md"`

### Szenario 3: Batch-Verarbeitung
```bash
# Alle Dateien in einem Verzeichnis prüfen
npm run check Clippings/ChatGPT

# Alle konvertieren
npm run convert Clippings/ChatGPT
```

---

## 🚀 Nächste Schritte / Verbesserungen

### Mögliche Erweiterungen
- [ ] Obsidian-Plugin für automatische Konvertierung
- [ ] Bessere User-Nachrichten-Erfassung
- [ ] Schema-Version 1.0.0 Upgrade
- [ ] Alternative Clipper-Integration

### Offene Fragen
- Gibt es bessere Selektoren für User-Nachrichten?
- Kann Turndown-Konfiguration im Browser gesteuert werden?
- Sollte Schema-Version aktualisiert werden?

---

## 📞 Support & Beitragen

- **Repository:** https://github.com/EduardMayer-IT/ObsidianClipper
- **Issues:** Für Bug-Reports und Feature-Requests
- **Pull Requests:** Willkommen!

---

## 📄 Lizenz

MIT-Lizenz - Siehe Repository für Details.

---

**Letzte Aktualisierung:** Dezember 2024  
**Version:** 0.1.0  
**Maintainer:** EduardMayer-IT

