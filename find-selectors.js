/**
 * Browser-Konsolen-Script zum Finden der richtigen CSS-Selektoren für ChatGPT-Konversationen
 * 
 * Anleitung:
 * 1. Öffne eine ChatGPT-Konversation im Browser
 * 2. Öffne die Browser-Konsole (F12)
 * 3. Kopiere dieses Script hinein und führe es aus
 * 4. Die Ergebnisse zeigen mögliche Selektoren für das Template
 */

console.log('🔍 Analysiere ChatGPT-Seite auf mögliche Selektoren...\n');

// Mögliche Selektoren testen
const selectors = [
  '[data-testid="conversation-turn"]',
  '[data-testid^="conversation-turn"]',
  'article[data-testid^="conversation-turn"]',
  '.markdown.prose',
  '#thread',
  'main',
  'div[class*="flex-col"][class*="text-sm"]',
  '[role="presentation"]',
  '.group\\/thread',
  'div[class*="conversation"]',
  '[data-message-author-role]',
  '.text-message',
  'div[class*="message"]'
];

const results = [];

selectors.forEach(selector => {
  try {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      const firstElement = elements[0];
      const textContent = firstElement.textContent?.trim().substring(0, 100) || '';
      const htmlPreview = firstElement.outerHTML.substring(0, 200);
      
      results.push({
        selector,
        count: elements.length,
        hasText: textContent.length > 0,
        textPreview: textContent,
        htmlPreview: htmlPreview,
        element: firstElement
      });
    }
  } catch (e) {
    console.error(`Fehler bei Selector "${selector}":`, e);
  }
});

// Ergebnisse ausgeben
console.log('📊 Gefundene Selektoren:\n');
results.forEach((result, index) => {
  console.log(`${index + 1}. Selector: ${result.selector}`);
  console.log(`   Elemente gefunden: ${result.count}`);
  console.log(`   Hat Text: ${result.hasText ? '✅' : '❌'}`);
  console.log(`   Text-Vorschau: "${result.textPreview}..."`);
  console.log(`   HTML-Vorschau: ${result.htmlPreview}...`);
  console.log('');
});

// Beste Kandidaten empfehlen
const bestCandidates = results
  .filter(r => r.hasText && r.count > 0)
  .sort((a, b) => {
    // Bevorzuge Selektoren mit mehreren Elementen (mehrere Nachrichten)
    if (a.count !== b.count) return b.count - a.count;
    // Bevorzuge Selektoren mit mehr Text
    return b.textPreview.length - a.textPreview.length;
  })
  .slice(0, 3);

console.log('⭐ Top 3 empfohlene Selektoren:\n');
bestCandidates.forEach((candidate, index) => {
  console.log(`${index + 1}. ${candidate.selector}`);
  console.log(`   Template-Variable: {{selectorHtml:${candidate.selector}|text}}`);
  console.log(`   Oder: {{selector:${candidate.selector}|text}}`);
  console.log('');
});

// Zusätzliche Analyse: Suche nach Code-Blöcken
console.log('💻 Code-Blöcke gefunden:\n');
const codeBlocks = document.querySelectorAll('pre code, code');
if (codeBlocks.length > 0) {
  console.log(`Anzahl Code-Blöcke: ${codeBlocks.length}`);
  codeBlocks.forEach((block, index) => {
    if (index < 3) {
      const language = block.className.match(/language-(\w+)|lang-(\w+)/)?.[1] || block.className.match(/(\w+)/)?.[1] || 'unknown';
      console.log(`  ${index + 1}. Sprache: ${language}`);
      console.log(`     Text: "${block.textContent?.trim().substring(0, 50)}..."`);
    }
  });
} else {
  console.log('Keine Code-Blöcke gefunden');
}

console.log('\n✅ Analyse abgeschlossen!');
console.log('💡 Kopiere die empfohlenen Selektoren in dein ChatGPT.clipper.json Template.');

