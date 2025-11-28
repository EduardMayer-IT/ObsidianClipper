# ChatGPT Clipper Template Varianten für automatisches Clippen

Diese Datei enthält verschiedene Template-Varianten zum Testen der automatischen Extraktion ohne Markierung.

## Variante 1: Conversation-Turn Selektoren

```json
"noteContentFormat": "---\ntitle: {{title}}\nurl: {{url}}\nchat_id: {{url|split:\"/\"|slice:-1}}\nmodel: ChatGPT\ntags:\n  - chatgpt\n  - clipping\n---\n\n## 💬 Konversation\n\n{{selectorHtml:[data-testid=\"conversation-turn\"]|text}}"
```

## Variante 2: Main Content Area

```json
"noteContentFormat": "---\ntitle: {{title}}\nurl: {{url}}\nchat_id: {{url|split:\"/\"|slice:-1}}\nmodel: ChatGPT\ntags:\n  - chatgpt\n  - clipping\n---\n\n## 💬 Konversation\n\n{{selectorHtml:main|text}}"
```

## Variante 3: Thread Container

```json
"noteContentFormat": "---\ntitle: {{title}}\nurl: {{url}}\nchat_id: {{url|split:\"/\"|slice:-1}}\nmodel: ChatGPT\ntags:\n  - chatgpt\n  - clipping\n---\n\n## 💬 Konversation\n\n{{selectorHtml:#__next > div > div > div > div > div|text}}"
```

## Variante 4: Markdown Prose (nur Assistenten-Antworten)

```json
"noteContentFormat": "---\ntitle: {{title}}\nurl: {{url}}\nchat_id: {{url|split:\"/\"|slice:-1}}\nmodel: ChatGPT\ntags:\n  - chatgpt\n  - clipping\n---\n\n## 💬 Konversation\n\n{{selectorHtml:.markdown.prose|text}}"
```

## Variante 5: Flex Container

```json
"noteContentFormat": "---\ntitle: {{title}}\nurl: {{url}}\nchat_id: {{url|split:\"/\"|slice:-1}}\nmodel: ChatGPT\ntags:\n  - chatgpt\n  - clipping\n---\n\n## 💬 Konversation\n\n{{selectorHtml:div[class*=\"flex-col\"][class*=\"text-sm\"]|text}}"
```

## Variante 6: Kombination mit Fallback

**Hinweis:** Handlebars `{{#if}}` wird nicht unterstützt, daher müssen wir einen anderen Ansatz wählen.

## Test-Anleitung

1. Importiere eine Variante in das Template
2. Öffne eine ChatGPT-Konversation
3. Klicke auf Clipper **OHNE** etwas zu markieren
4. Prüfe das Ergebnis
5. Teste die nächste Variante

## Aktuelle verwendete Variante

Siehe `ChatGPT.clipper.json` für die aktuell aktive Variante.

