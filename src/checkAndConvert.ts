import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { convertBackticksToTildes } from './convertBackticksToTildes';

/**
 * Prüft eine Markdown-Datei auf Code-Blöcke und zeigt deren Format
 */
function checkCodeBlocks(filePath: string): {
  hasBackticks: boolean;
  hasTildes: boolean;
  codeBlockCount: number;
  needsConversion: boolean;
} {
  if (!existsSync(filePath)) {
    throw new Error(`Datei nicht gefunden: ${filePath}`);
  }

  const content = readFileSync(filePath, 'utf-8');
  
  // Zähle Code-Blöcke mit Backticks
  const backtickMatches = content.match(/^```[\w]*\n[\s\S]*?\n```$/gm);
  const backtickCount = backtickMatches ? backtickMatches.length : 0;
  
  // Zähle Code-Blöcke mit Tilden
  const tildeMatches = content.match(/^~{3,}[\w\s]*\n[\s\S]*?\n~{3,}$/gm);
  const tildeCount = tildeMatches ? tildeMatches.length : 0;
  
  return {
    hasBackticks: backtickCount > 0,
    hasTildes: tildeCount > 0,
    codeBlockCount: backtickCount + tildeCount,
    needsConversion: backtickCount > 0
  };
}

/**
 * Prüft und konvertiert eine Datei, falls nötig
 */
export function checkAndConvertFile(filePath: string, autoConvert: boolean = false): void {
  try {
    const check = checkCodeBlocks(filePath);
    
    console.log(`\n📄 Datei: ${filePath}`);
    console.log(`   Code-Blöcke gefunden: ${check.codeBlockCount}`);
    
    if (check.codeBlockCount === 0) {
      console.log(`   ⚠️  Keine Code-Blöcke gefunden!`);
      console.log(`   💡 Tipp: Stelle sicher, dass du beim Clippen alle Code-Blöcke mit markiert hast.`);
      return;
    }
    
    if (check.hasBackticks && check.hasTildes) {
      console.log(`   ⚠️  Gemischte Formate: ${check.hasBackticks ? 'Backticks' : ''} und ${check.hasTildes ? 'Tilden' : ''}`);
      console.log(`   💡 Empfehlung: Konvertiere alle zu Tilde-Fences für Konsistenz.`);
    } else if (check.hasBackticks) {
      console.log(`   ❌ Code-Blöcke verwenden Backticks (\`\`\`)`);
      console.log(`   ✅ Konvertierung zu Tilde-Fences (\`~~~\`) empfohlen`);
      
      if (autoConvert) {
        const { convertFile } = require('./convertBackticksToTildes');
        const converted = convertFile(filePath);
        if (converted) {
          console.log(`   ✓ Datei wurde konvertiert!`);
        }
      } else {
        console.log(`   💡 Führe aus: npm run convert "${filePath}"`);
      }
    } else if (check.hasTildes) {
      console.log(`   ✅ Code-Blöcke verwenden bereits Tilde-Fences (\`~~~\`)`);
      console.log(`   ✓ Alles in Ordnung!`);
    }
  } catch (error) {
    console.error(`   ❌ Fehler: ${error}`);
  }
}

/**
 * CLI-Interface
 */
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('checkAndConvert')) {
  const args = process.argv.slice(2);
  const autoConvert = args.includes('--convert') || args.includes('-c');
  const pathArg = args.find(arg => !arg.startsWith('--') && !arg.startsWith('-'));
  
  if (!pathArg) {
    console.log('Verwendung: checkAndConvert.ts <pfad> [--convert]');
    console.log('');
    console.log('Beispiele:');
    console.log('  npm run check "Clippings/ChatGPT/2024/Meine-Konversation.md"');
    console.log('  npm run check "Clippings/ChatGPT/2024/Meine-Konversation.md" --convert');
    process.exit(1);
  }
  
  try {
    const stat = statSync(pathArg);
    
    if (stat.isDirectory()) {
      console.log(`📁 Verzeichnis: ${pathArg}`);
      console.log(`   Durchsuche nach Markdown-Dateien...\n`);
      
      function processDirectory(currentPath: string): void {
        const entries = readdirSync(currentPath);
        
        for (const entry of entries) {
          const fullPath = join(currentPath, entry);
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            processDirectory(fullPath);
          } else if (stat.isFile() && extname(entry) === '.md') {
            checkAndConvertFile(fullPath, autoConvert);
          }
        }
      }
      
      processDirectory(pathArg);
    } else if (stat.isFile()) {
      checkAndConvertFile(pathArg, autoConvert);
    } else {
      throw new Error(`Pfad ist weder Datei noch Verzeichnis: ${pathArg}`);
    }
    
    console.log('\n✅ Prüfung abgeschlossen!');
  } catch (error) {
    console.error('Fehler:', error);
    process.exit(1);
  }
}

export default checkAndConvertFile;

