import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

/**
 * Konvertiert Code-Blöcke von Backtick-Fences (```) zu Tilde-Fences (~~~)
 * mit adaptiver Fence-Länge, wenn der Code selbst Tilden enthält.
 * 
 * @param markdown - Der Markdown-Text mit Backtick-Fences
 * @returns Konvertierter Markdown-Text mit Tilde-Fences
 */
export function convertBackticksToTildes(markdown: string): string {
  // Regex zum Finden von Code-Blöcken mit Backticks
  // Matcht: ```[sprache]\ncode\n```
  const codeBlockRegex = /^```(\w*)\n([\s\S]*?)\n```$/gm;
  
  return markdown.replace(codeBlockRegex, (match, language, code) => {
    // Entferne führende/abschließende Leerzeilen im Code
    const trimmedCode = code.replace(/^\n+|\n+$/g, '');
    
    // Prüfe, ob der Code Tilden enthält
    const tildeMatches = trimmedCode.match(/(~{3,})/g);
    
    // Bestimme die benötigte Fence-Länge
    let fenceLength = 3; // Standard: 3 Tilden
    if (tildeMatches) {
      // Finde die längste Tilde-Sequenz im Code
      const maxTildeLength = Math.max(...tildeMatches.map(m => m.length));
      // Verwende eine längere Fence als die längste im Code
      fenceLength = maxTildeLength + 1;
    }
    
    const fence = '~'.repeat(fenceLength);
    const languageStr = language ? ` ${language}` : '';
    
    return `\n${fence}${languageStr}\n${trimmedCode}\n${fence}\n`;
  });
}

/**
 * Konvertiert eine einzelne Markdown-Datei von Backticks zu Tilden.
 * 
 * @param filePath - Pfad zur Markdown-Datei
 * @param dryRun - Wenn true, werden keine Änderungen geschrieben
 * @returns Ob die Datei geändert wurde
 */
export function convertFile(filePath: string, dryRun: boolean = false): boolean {
  if (!existsSync(filePath)) {
    throw new Error(`Datei nicht gefunden: ${filePath}`);
  }
  
  if (extname(filePath) !== '.md') {
    return false; // Nur .md Dateien verarbeiten
  }
  
  const originalContent = readFileSync(filePath, 'utf-8');
  const convertedContent = convertBackticksToTildes(originalContent);
  
  if (originalContent === convertedContent) {
    return false; // Keine Änderungen nötig
  }
  
  if (!dryRun) {
    writeFileSync(filePath, convertedContent, 'utf-8');
  }
  
  return true;
}

/**
 * Konvertiert alle Markdown-Dateien in einem Verzeichnis rekursiv.
 * 
 * @param dirPath - Pfad zum Verzeichnis
 * @param dryRun - Wenn true, werden keine Änderungen geschrieben
 * @returns Anzahl der konvertierten Dateien
 */
export function convertDirectory(dirPath: string, dryRun: boolean = false): number {
  if (!existsSync(dirPath)) {
    throw new Error(`Verzeichnis nicht gefunden: ${dirPath}`);
  }
  
  let convertedCount = 0;
  
  function processDirectory(currentPath: string): void {
    const entries = readdirSync(currentPath);
    
    for (const entry of entries) {
      const fullPath = join(currentPath, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Rekursiv durch Unterverzeichnisse gehen
        processDirectory(fullPath);
      } else if (stat.isFile() && extname(entry) === '.md') {
        try {
          const wasConverted = convertFile(fullPath, dryRun);
          if (wasConverted) {
            convertedCount++;
            if (dryRun) {
              console.log(`[DRY RUN] Würde konvertieren: ${fullPath}`);
            } else {
              console.log(`✓ Konvertiert: ${fullPath}`);
            }
          }
        } catch (error) {
          console.error(`Fehler beim Verarbeiten von ${fullPath}:`, error);
        }
      }
    }
  }
  
  processDirectory(dirPath);
  return convertedCount;
}

/**
 * CLI-Interface für das Script
 */
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('convertBackticksToTildes')) {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const pathArg = args.find(arg => !arg.startsWith('--') && !arg.startsWith('-'));
  
  if (!pathArg) {
    console.error('Verwendung: convertBackticksToTildes.ts <pfad> [--dry-run]');
    console.error('');
    console.error('Beispiele:');
    console.error('  node convertBackticksToTildes.ts Clippings/ChatGPT');
    console.error('  node convertBackticksToTildes.ts Clippings/ChatGPT --dry-run');
    process.exit(1);
  }
  
  try {
    const stat = statSync(pathArg);
    let count: number;
    
    if (stat.isDirectory()) {
      count = convertDirectory(pathArg, dryRun);
    } else if (stat.isFile()) {
      const wasConverted = convertFile(pathArg, dryRun);
      count = wasConverted ? 1 : 0;
    } else {
      throw new Error(`Pfad ist weder Datei noch Verzeichnis: ${pathArg}`);
    }
    
    if (dryRun) {
      console.log(`\n[DRY RUN] ${count} Datei(en) würden konvertiert werden.`);
    } else {
      console.log(`\n✓ ${count} Datei(en) erfolgreich konvertiert.`);
    }
  } catch (error) {
    console.error('Fehler:', error);
    process.exit(1);
  }
}

export default convertBackticksToTildes;

