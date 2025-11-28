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
    codeBlockStyle: 'fenced',
    fence: '~~~',
    headingStyle: 'atx',
  });

  // Ensure pre>code blocks keep language via tilde fences
  service.addRule('fencedCodeWithLanguage', {
    filter(node) {
      if (!(node instanceof (node as any).ownerDocument!.defaultView!.HTMLElement)) return false;
      const el = node as HTMLElement;
      if (el.tagName.toLowerCase() !== 'pre') return false;
      // Only handle <pre><code>…</code></pre>
      const code = el.querySelector('code');
      return !!code;
    },
    replacement(content, node) {
      const pre = node as HTMLElement;
      const code = pre.querySelector('code') as HTMLElement | null;
      const lang = extractLanguage(code?.getAttribute('class')) || extractLanguage(pre.getAttribute('class'));
      const info = lang ? lang.toLowerCase() : '';
      // Use innerText to preserve text as-is without nested markup
      const codeText = (code?.textContent ?? '').replace(/\s+$/,'');
      const fence = '~~~';
      // If code contains ~~~, increase fence length
      const fenceLen = Math.max(3, ...Array.from(codeText.matchAll(/(~{3,})/g)).map(m => m[0].length));
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
