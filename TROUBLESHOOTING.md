# Troubleshooting: Code-Blöcke werden nicht angezeigt

## Problem: Code-Blöcke fehlen nach dem Clippen

### Mögliche Ursachen und Lösungen

#### 1. ❌ Code-Blöcke wurden nicht markiert

**Problem:** Wenn du den Text markierst, aber die Code-Blöcke nicht mit auswählst, werden sie nicht erfasst.

**Lösung:**
1. Öffne die ChatGPT-Konversation
2. **Wichtig:** Markiere den gesamten Bereich, **inklusive aller Code-Blöcke**
3. Stelle sicher, dass beim Markieren auch die Code-Blöcke sichtbar markiert sind
4. Dann erst den Clipper verwenden

**Tipp:** Markiere am besten von oben nach unten den gesamten Konversationsbereich.

#### 2. ❌ Code-Blöcke wurden mit Backticks erfasst

**Problem:** Der Clipper erfasst Code-Blöcke manchmal mit Backticks (` ``` `) statt Tilde-Fences (`~~~`). Obsidian zeigt diese möglicherweise nicht korrekt an.

**Lösung - Post-Processing verwenden:**

```bash
# 1. Finde die erstellte Datei in Obsidian
#    (normalerweise in: Clippings/ChatGPT/[Jahr]/[Titel].md)

# 2. Konvertiere die Datei:
npm run convert "Pfad/zur/Datei.md"

# Beispiel:
npm run convert "Clippings/ChatGPT/2024/Meine-Konversation.md"

# 3. Oder konvertiere alle Dateien im Verzeichnis:
npm run convert Clippings/ChatGPT
```

#### 3. ❌ Code-Blöcke sind als Plain-Text erfasst

**Problem:** Code-Blöcke wurden als normaler Text erfasst, ohne Code-Block-Formatierung.

**Lösung:**
- Stelle sicher, dass du beim Markieren den gesamten Code-Block-Bereich erfasst hast
- ChatGPT zeigt Code-Blöcke in `<pre><code>` Elementen an - diese müssen mit markiert werden

#### 4. ✅ Schritt-für-Schritt Anleitung zum richtigen Clippen

1. **Öffne ChatGPT-Konversation**
   - Gehe zu `https://chatgpt.com/c/...` oder `https://chat.openai.com/c/...`

2. **Markiere den gesamten Inhalt**
   - Klicke am Anfang der Konversation
   - Halte die Maustaste gedrückt
   - Ziehe bis zum Ende der Konversation
   - **Wichtig:** Stelle sicher, dass alle Code-Blöcke sichtbar markiert sind (grauer Hintergrund)

3. **Aktiviere den Clipper**
   - Klicke auf das Obsidian Web Clipper Icon in der Browser-Leiste
   - Wähle das "ChatGPT" Template aus
   - Klicke auf "Clip"

4. **Prüfe das Ergebnis**
   - Öffne die erstellte Datei in Obsidian
   - Falls Code-Blöcke mit Backticks (` ``` `) erfasst wurden, verwende das Post-Processing-Script

## Schnelltest: Code-Block-Format prüfen

Öffne die erstellte Markdown-Datei und suche nach Code-Blöcken:

**Richtig (Tilde-Fences):**
```markdown
~~~ javascript
console.log("Hello");
~~~
```

**Falsch (Backticks - muss konvertiert werden):**
```markdown
```javascript
console.log("Hello");
```
```

**Falls Backticks vorhanden sind:**
```bash
npm run convert "Pfad/zur/Datei.md"
```

## Häufige Fehler vermeiden

1. ❌ **Nur Text markieren, Code-Blöcke auslassen**
   - ✅ **Lösung:** Markiere immer den gesamten Bereich inklusive Code

2. ❌ **Zu früh aufhören zu markieren**
   - ✅ **Lösung:** Markiere bis ganz zum Ende der Konversation

3. ❌ **Vergessen, dass Code-Blöcke konvertiert werden müssen**
   - ✅ **Lösung:** Verwende `npm run convert` nach dem Clippen

## Weitere Hilfe

Falls das Problem weiterhin besteht:

1. Prüfe, ob die Datei überhaupt Code-Blöcke enthält (öffne als Text)
2. Prüfe, ob Code-Blöcke mit Backticks erfasst wurden
3. Verwende das Post-Processing-Script
4. Stelle sicher, dass Obsidian die Markdown-Datei korrekt rendert (Vorschau-Modus)

