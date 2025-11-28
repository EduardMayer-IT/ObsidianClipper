import TurndownService from 'turndown';

function extractLanguage(className: string | null): string | undefined {
  if (!className) return undefined;
  const parts = className.split(/\s+/);
  // Common patterns: language-js, lang-js, language-javascript, hljs language-python
  const langToken = parts.find(p => /^(language|lang)-/i.test(p));
  if (langToken) return langToken.split('-')[1];
  // Fallback: if a direct language name exists as a class (e.g., javascript)
  const direct = parts.find(p => /^(js|ts|javascript|typescript|json|bash|sh|shell|python|java|c|cpp|csharp|cs|go|rust|ruby|php|html|css|xml|yaml|toml|sql)$/i.test(p));
  return direct;
}

export function createTurndown(): TurndownService {
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    fence: '~~~',
  });

  // Keep the default code block rule but customize it
  service.keep(function(node) {
    return node.nodeName === 'PRE' && node.firstChild?.nodeName === 'CODE';
  });

  // Override with our custom rule for fenced code blocks
  service.addRule('fencedCodeWithLanguage', {
    filter: function(node, options) {
      return (
        options.codeBlockStyle === 'fenced' &&
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },
    replacement(content, node, options) {
      const pre = node as HTMLElement;
      const code = pre.querySelector('code') as HTMLElement | null;
      if (!code) return content;
      
      const lang = extractLanguage(code?.getAttribute('class')) || extractLanguage(pre.getAttribute('class'));
      const info = lang ? lang.toLowerCase() : '';
      // Use innerText to preserve text as-is without nested markup
      const codeText = (code?.textContent ?? '').replace(/\s+$/,'');
      // If code contains ~~~, increase fence length
      const tildesInCode = Array.from(codeText.matchAll(/(~{3,})/g)).map(m => m[0].length);
      const fenceLen = tildesInCode.length > 0 ? Math.max(3, ...tildesInCode) + 1 : 3;
      const fenceStr = '~'.repeat(fenceLen);
      const infoStr = info ? ' ' + info : '';
      return `\n${fenceStr}${infoStr}\n${codeText}\n${fenceStr}\n`;
    }
  });

  return service;
}

export function htmlToMarkdown(html: string): string {
  const turndown = createTurndown();
  return turndown.turndown(html);
}

export default htmlToMarkdown;
