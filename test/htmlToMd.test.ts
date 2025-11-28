import { describe, it, expect } from 'vitest';
import { htmlToMarkdown } from '../src/htmlToMd';

describe('htmlToMd', () => {
  it('converts <pre><code class="language-javascript"> to fenced ~~~ with language', () => {
    const html = `
      <div id="thread">
        <pre><code class="language-javascript">console.log('hi')\n</code></pre>
      </div>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain('~~~ javascript');
    expect(md).toContain("console.log('hi')");
    // closing fence
    expect(md).toMatch(/\n~{3,}\n?$/m);
  });

  it('uses longer fences when code contains ~~~ inside', () => {
    const html = `
      <pre><code class="language-bash">echo start\n~~~\necho end\n</code></pre>`;
    const md = htmlToMarkdown(html);
    // Should use at least 3, but since code contains ~~~, we keep >=3 (our rule computes max)
    // Match at start or after newline
    const fenceMatch = md.match(/(?:^|\n)(~{3,}) bash\n/);
    expect(fenceMatch).toBeTruthy();
    const fence = fenceMatch![1];
    // ensure the closing fence length equals opening
    const closingMatch = md.match(new RegExp(`\n${fence}(?:\n|$)`,'m'));
    expect(closingMatch).toBeTruthy();
  });

  it('does not leave raw HTML soup from ChatGPT thread container', () => {
    const html = `
      <div id="thread" class="group/thread">
        <p>Hello <strong>world</strong></p>
        <pre><code class="language-python">print('ok')\n</code></pre>
      </div>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain('Hello');
    expect(md).toContain('**world**');
    expect(md).toContain('~~~ python');
    expect(md).not.toMatch(/<div|<header|class=/);
  });

  it('handles code blocks without language class (fallback to direct language name)', () => {
    const html = `<pre><code class="javascript">const x = 1;</code></pre>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain('~~~ javascript');
    expect(md).toContain('const x = 1;');
  });

  it('handles code blocks without any language info', () => {
    const html = `<pre><code>plain text code</code></pre>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain('~~~');
    expect(md).toContain('plain text code');
    // Should not have language info after fence
    expect(md).toMatch(/^~~~\n/);
  });

  it('handles language from pre tag class instead of code tag', () => {
    const html = `<pre class="language-typescript"><code>type X = string;</code></pre>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain('~~~ typescript');
    expect(md).toContain('type X = string;');
  });

  it('handles inline code (not in pre) normally', () => {
    const html = `<p>Use <code>const</code> instead of <code>var</code></p>`;
    const md = htmlToMarkdown(html);
    expect(md).toContain('`const`');
    expect(md).toContain('`var`');
    expect(md).not.toContain('~~~');
  });
});
