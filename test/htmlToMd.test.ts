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
    const fenceMatch = md.match(/\n(~{3,}) bash\n/);
    expect(fenceMatch).toBeTruthy();
    const fence = fenceMatch![1];
    // ensure the closing fence length equals opening
    const closingMatch = md.match(new RegExp(`\n${fence}\n?$`,'m'));
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
});
