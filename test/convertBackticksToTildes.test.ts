import { describe, it, expect } from 'vitest';
import { convertBackticksToTildes } from '../src/convertBackticksToTildes';

describe('convertBackticksToTildes', () => {
  it('konvertiert einfachen Code-Block mit Sprache', () => {
    const input = '```javascript\nconsole.log("hello");\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~ javascript');
    expect(output).toContain('console.log("hello");');
    expect(output).toMatch(/~{3}\n$/m);
  });

  it('konvertiert Code-Block ohne Sprache', () => {
    const input = '```\nplain code\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~');
    expect(output).toContain('plain code');
    expect(output).not.toContain('~~~ ');
  });

  it('verwendet längere Fences wenn Code Tilden enthält', () => {
    const input = '```bash\necho start\n~~~\necho end\n```';
    const output = convertBackticksToTildes(input);
    // Sollte mindestens 4 Tilden verwenden (3 + 1)
    const fenceMatch = output.match(/(~{3,}) bash/);
    expect(fenceMatch).toBeTruthy();
    const fenceLength = fenceMatch![1].length;
    expect(fenceLength).toBeGreaterThanOrEqual(4);
    
    // Schließende Fence sollte gleich lang sein
    const closingMatch = output.match(new RegExp(`\n${'~'.repeat(fenceLength)}\n?$`, 'm'));
    expect(closingMatch).toBeTruthy();
  });

  it('verwendet noch längere Fences bei mehreren Tilden im Code', () => {
    const input = '```\n~~~\n~~~~\n~~~~~\n```';
    const output = convertBackticksToTildes(input);
    // Sollte 6 Tilden verwenden (5 + 1)
    const fenceMatch = output.match(/(~{3,})\n/);
    expect(fenceMatch).toBeTruthy();
    expect(fenceMatch![1].length).toBeGreaterThanOrEqual(6);
  });

  it('behält mehrere Code-Blöcke getrennt', () => {
    const input = '```js\nconst x = 1;\n```\n\nText\n\n```python\nprint("hi")\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~ js');
    expect(output).toContain('const x = 1;');
    expect(output).toContain('~~~ python');
    expect(output).toContain('print("hi")');
    expect(output).toContain('Text');
  });

  it('behandelt Code-Blöcke mit Leerzeilen korrekt', () => {
    const input = '```javascript\n\nconst x = 1;\n\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~ javascript');
    expect(output).toContain('const x = 1;');
    // Sollte keine überflüssigen Leerzeilen am Anfang/Ende haben
    const codeMatch = output.match(/~~~ javascript\n([\s\S]*?)\n~~~/);
    expect(codeMatch).toBeTruthy();
    const codeContent = codeMatch![1];
    expect(codeContent).not.toMatch(/^\n+/);
    expect(codeContent).not.toMatch(/\n+$/);
  });

  it('ignoriert inline Code mit Backticks', () => {
    const input = 'Dies ist `inline code` und sollte nicht geändert werden.';
    const output = convertBackticksToTildes(input);
    expect(output).toBe(input); // Sollte unverändert bleiben
  });

  it('behandelt leere Code-Blöcke', () => {
    const input = '```\n\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~');
    expect(output).toMatch(/~~~\n\n~~~/);
  });

  it('behandelt Code-Blöcke mit verschiedenen Sprachen', () => {
    const input = '```typescript\ntype X = string;\n```\n\n```bash\necho test\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~ typescript');
    expect(output).toContain('~~~ bash');
  });

  it('behandelt Code mit Backticks im Inhalt korrekt', () => {
    const input = '```javascript\nconst code = `template ${string}`;\n```';
    const output = convertBackticksToTildes(input);
    expect(output).toContain('~~~ javascript');
    expect(output).toContain('const code = `template ${string}`;');
    // Sollte keine Backticks in den Fences haben
    expect(output).not.toMatch(/```/);
  });
});

