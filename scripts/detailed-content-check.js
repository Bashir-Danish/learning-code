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

console.log('Detailed content check for English/Persian sync...\n');

const issues = [];

for (const file of lessonFiles) {
  const filePath = path.join(lessonsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract content and contentFa using better regex
  const contentMatch = content.match(/content:\s*`([\s\S]*?)`\s*,\s*\n\s*contentFa/);
  const contentFaMatch = content.match(/contentFa:\s*`([\s\S]*?)`\s*,\s*\n/);
  
  if (!contentMatch || !contentFaMatch) {
    issues.push({ file, issue: 'Could not parse content' });
    continue;
  }
  
  const en = contentMatch[1];
  const fa = contentFaMatch[1];
  
  // Get all ## sections
  const enSections = en.match(/^## .+$/gm) || [];
  const faSections = fa.match(/^## .+$/gm) || [];
  
  // Count code blocks
  const enCodeBlocks = (en.match(/```javascript/g) || []).length;
  const faCodeBlocks = (fa.match(/```javascript/g) || []).length;
  
  // Check for major differences
  const fileIssues = [];
  
  if (Math.abs(enSections.length - faSections.length) > 2) {
    fileIssues.push(`Section count: EN=${enSections.length}, FA=${faSections.length}`);
  }
  
  if (Math.abs(enCodeBlocks - faCodeBlocks) > 2) {
    fileIssues.push(`Code blocks: EN=${enCodeBlocks}, FA=${faCodeBlocks}`);
  }
  
  // Check content length ratio
  const ratio = en.length / fa.length;
  if (ratio < 0.4 || ratio > 2.5) {
    fileIssues.push(`Length ratio: ${ratio.toFixed(2)} (EN=${en.length}, FA=${fa.length})`);
  }
  
  // Check if one is very short
  if (en.length < 1000) {
    fileIssues.push(`English too short: ${en.length} chars`);
  }
  if (fa.length < 1000) {
    fileIssues.push(`Persian too short: ${fa.length} chars`);
  }
  
  if (fileIssues.length > 0) {
    issues.push({
      file,
      enSections: enSections.length,
      faSections: faSections.length,
      enLength: en.length,
      faLength: fa.length,
      issues: fileIssues
    });
  }
}

if (issues.length === 0) {
  console.log('✅ All lessons appear to have synced content!\n');
} else {
  console.log(`Found ${issues.length} files with potential issues:\n`);
  
  for (const item of issues) {
    console.log(`📄 ${item.file}`);
    item.issues.forEach(i => console.log(`   ❌ ${i}`));
    console.log('');
  }
}

// Summary
console.log('\n--- Summary ---');
console.log(`Total lessons: ${lessonFiles.length}`);
console.log(`Issues found: ${issues.length}`);
console.log(`OK: ${lessonFiles.length - issues.length}`);
