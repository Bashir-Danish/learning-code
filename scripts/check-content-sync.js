import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lessonsDir = path.join(__dirname, '../src/data/lessons');

// Get all lesson files
const lessonFiles = fs.readdirSync(lessonsDir)
  .filter(f => f.endsWith('.js') && f !== 'index.js')
  .sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

console.log('Checking content sync between English and Persian...\n');

const issues = [];

for (const file of lessonFiles) {
  const filePath = path.join(lessonsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract content and contentFa
  const contentMatch = content.match(/content:\s*`([\s\S]*?)`\s*,\s*contentFa/);
  const contentFaMatch = content.match(/contentFa:\s*`([\s\S]*?)`\s*,?\s*(?:}|difficulty)/);
  
  if (!contentMatch || !contentFaMatch) {
    issues.push({
      file,
      issue: 'Could not parse content or contentFa'
    });
    continue;
  }
  
  const englishContent = contentMatch[1];
  const persianContent = contentFaMatch[1];
  
  // Count sections (## headers)
  const englishSections = (englishContent.match(/^## /gm) || []).length;
  const persianSections = (persianContent.match(/^## /gm) || []).length;
  
  // Count code blocks
  const englishCodeBlocks = (englishContent.match(/```/g) || []).length / 2;
  const persianCodeBlocks = (persianContent.match(/```/g) || []).length / 2;
  
  // Get section titles
  const englishTitles = englishContent.match(/^## .+$/gm) || [];
  const persianTitles = persianContent.match(/^## .+$/gm) || [];
  
  // Check content length ratio (should be somewhat similar)
  const lengthRatio = englishContent.length / persianContent.length;
  
  const fileIssues = [];
  
  if (englishSections !== persianSections) {
    fileIssues.push(`Section count mismatch: EN=${englishSections}, FA=${persianSections}`);
  }
  
  if (Math.abs(englishCodeBlocks - persianCodeBlocks) > 1) {
    fileIssues.push(`Code block count mismatch: EN=${englishCodeBlocks}, FA=${persianCodeBlocks}`);
  }
  
  if (lengthRatio < 0.3 || lengthRatio > 3) {
    fileIssues.push(`Content length very different: EN=${englishContent.length}, FA=${persianContent.length} (ratio: ${lengthRatio.toFixed(2)})`);
  }
  
  // Check if English content is too short (might be incomplete)
  if (englishContent.length < 500) {
    fileIssues.push(`English content seems too short: ${englishContent.length} chars`);
  }
  
  // Check if Persian content is too short
  if (persianContent.length < 500) {
    fileIssues.push(`Persian content seems too short: ${persianContent.length} chars`);
  }
  
  if (fileIssues.length > 0) {
    issues.push({
      file,
      englishSections,
      persianSections,
      englishTitles: englishTitles.slice(0, 5),
      persianTitles: persianTitles.slice(0, 5),
      issues: fileIssues
    });
  }
}

console.log(`Found ${issues.length} files with potential issues:\n`);

for (const item of issues) {
  console.log(`📄 ${item.file}`);
  if (item.issues) {
    item.issues.forEach(i => console.log(`   ❌ ${i}`));
  }
  if (item.englishTitles) {
    console.log(`   EN sections: ${item.englishTitles.join(', ')}`);
  }
  if (item.persianTitles) {
    console.log(`   FA sections: ${item.persianTitles.join(', ')}`);
  }
  console.log('');
}

if (issues.length === 0) {
  console.log('✅ All lessons have synced content!');
}
