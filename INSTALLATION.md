# 📥 Installation: ChatGPT Template in Obsidian einrichten

## 🎯 Übersicht

Diese Anleitung zeigt dir, wie du das ChatGPT-Template für den **Obsidian Web Clipper** einrichtest.

---

## 📋 Voraussetzungen

1. **Obsidian** muss installiert sein
2. **Obsidian Web Clipper** Browser-Extension muss installiert sein:
   - [Chrome/Edge](https://chrome.google.com/webstore/detail/obsidian-web-clipper/mfhbebkmkecabigjgekfagjdncnjijai)
   - [Firefox](https://addons.mozilla.org/de/firefox/addon/obsidian-web-clipper/)

---

## 🚀 Schritt-für-Schritt Installation

### Schritt 1: Template-Datei herunterladen

1. Öffne das Repository: https://github.com/EduardMayer-IT/ObsidianClipper
2. Klicke auf die Datei `ChatGPT.clipper.json`
3. Klicke auf den Button **"Raw"** (rechts oben)
4. Speichere die Datei:
   - **Chrome/Edge:** Rechtsklick → "Speichern unter..." → Wähle einen Ordner
   - **Firefox:** Rechtsklick → "Speichern unter..." → Wähle einen Ordner
   - Oder: Strg+S (Windows) / Cmd+S (Mac)

**Alternative:** Direkter Download-Link:
```
https://raw.githubusercontent.com/EduardMayer-IT/ObsidianClipper/main/ChatGPT.clipper.json
```

### Schritt 2: Obsidian Web Clipper Extension öffnen

1. Öffne deinen Browser (Chrome, Firefox, Edge)
2. Klicke auf das **Obsidian Web Clipper Icon** in der Browser-Leiste
3. Falls das Icon nicht sichtbar ist:
   - **Chrome/Edge:** Klicke auf das Puzzle-Icon → Suche "Obsidian Web Clipper"
   - **Firefox:** Klicke auf das Menü (☰) → Add-ons → Obsidian Web Clipper

### Schritt 3: Template importieren

1. In der Obsidian Web Clipper Extension:
   - Klicke auf das **⚙️ Zahnrad-Icon** (Einstellungen)
   - Oder: Rechtsklick auf das Clipper-Icon → "Options" / "Einstellungen"

2. Gehe zum Tab **"Templates"** (oder "Vorlagen")

3. Klicke auf **"Import Template"** (oder "Vorlage importieren")

4. Wähle die heruntergeladene `ChatGPT.clipper.json` Datei

5. Das Template sollte jetzt als **"ChatGPT"** erscheinen

### Schritt 4: Obsidian-Vault verbinden (falls noch nicht geschehen)

1. In den Clipper-Einstellungen:
   - Gehe zum Tab **"Vault"** (oder "Tresor")
   - Klicke auf **"Connect"** (oder "Verbinden")
   - Wähle deinen Obsidian-Vault aus
   - Bestätige die Verbindung

2. **Wichtig:** Stelle sicher, dass Obsidian läuft und der Vault geöffnet ist

---

## ✅ Testen

### Schnelltest:

1. Öffne eine ChatGPT-Konversation:
   - `https://chatgpt.com/c/...` oder
   - `https://chat.openai.com/c/...`

2. **Ohne etwas zu markieren:**
   - Klicke auf das Obsidian Web Clipper Icon
   - Wähle das **"ChatGPT"** Template
   - Klicke auf **"Clip"** (oder "Speichern")

3. Prüfe in Obsidian:
   - Die Datei sollte in `Clippings/ChatGPT/[Jahr]/` gespeichert sein
   - Der Konversationsinhalt sollte automatisch erfasst sein

---

## 🔧 Troubleshooting

### Problem: Template wird nicht importiert

**Lösung:**
- Prüfe, ob die Datei wirklich `.json` Endung hat
- Öffne die Datei in einem Texteditor und prüfe, ob sie gültiges JSON ist
- Stelle sicher, dass du die richtige Datei (`ChatGPT.clipper.json`) importierst

### Problem: "Vault not connected"

**Lösung:**
1. Öffne Obsidian
2. Öffne deinen Vault
3. Gehe zurück zu Clipper-Einstellungen
4. Klicke auf "Connect" und wähle den Vault erneut

### Problem: Datei wird nicht gespeichert

**Lösung:**
- Prüfe, ob Obsidian läuft
- Prüfe, ob der Vault geöffnet ist
- Prüfe die Clipper-Einstellungen → Vault-Verbindung
- Prüfe die Browser-Konsole (F12) auf Fehlermeldungen

### Problem: Code-Blöcke werden nicht angezeigt

**Lösung:**
- Siehe `TROUBLESHOOTING.md` für detaillierte Hilfe
- Verwende das Post-Processing-Script:
  ```bash
  npm run convert "Pfad/zur/Datei.md"
  ```

---

## 📝 Template anpassen

Falls du das Template anpassen möchtest:

1. Öffne `ChatGPT.clipper.json` in einem Texteditor
2. Ändere die gewünschten Werte:
   - `path` - Speicherort anpassen
   - `noteNameFormat` - Dateinamen-Format ändern
   - `noteContentFormat` - Inhalt-Format anpassen
   - `properties` - Metadaten hinzufügen/ändern
3. Speichere die Datei
4. Importiere das angepasste Template erneut (Schritt 3)

---

## 🎯 Alternative: Template direkt im Browser erstellen

Falls du das Template direkt in der Extension erstellen möchtest:

1. Öffne Clipper-Einstellungen → Templates
2. Klicke auf **"New Template"** (oder "Neue Vorlage")
3. Kopiere den Inhalt von `ChatGPT.clipper.json` hinein
4. Speichere als "ChatGPT"

---

## 📚 Weitere Informationen

- **Hauptdokumentation:** Siehe `README.md`
- **Probleme:** Siehe `TROUBLESHOOTING.md`
- **Test-Varianten:** Siehe `TEST-ANLEITUNG.md`

---

## ✅ Checkliste

- [ ] Obsidian installiert
- [ ] Obsidian Web Clipper Extension installiert
- [ ] `ChatGPT.clipper.json` heruntergeladen
- [ ] Template in Extension importiert
- [ ] Vault verbunden
- [ ] Test erfolgreich durchgeführt

---

**Fertig!** 🎉 Du kannst jetzt ChatGPT-Konversationen automatisch in Obsidian speichern!

