/**
 * Lesson Quality Validation Script
 * Checks all lesson files against the big-o.js quality standard
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '../src/data/lessons');

// Quality criteria patterns
const QUALITY_CHECKS = {
  // Analogy and conversational tone
  analogyPatterns: ['تصور کن', 'مثل', 'فکر کن', 'اینطوری'],
  
  // Required sections
  requiredSections: ['چرا باید', 'اشتباه', 'خلاصه', 'یک خطی'],
  
  // Visual formatting
  hasTable: /\|.*\|.*\|/,
  hasSeparator: /^---$/m,
  hasEmoji: /[✅❌⚡🔥💡⚠️]/,
  
  // Usage guidance
  usagePatterns: ['استفاده کن', 'کی استفاده'],
  
  // Persian code comments (Persian text after //)
  persianCommentPattern: /\/\/.*[\u0600-\u06FF]/,
};

function analyzeLesson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  // Extract content and contentFa
  const contentMatch = content.match(/content:\s*`([\s\S]*?)`,\s*\n\s*contentFa/);
  const contentFaMatch = content.match(/contentFa:\s*`([\s\S]*?)`,\s*\n/);
  
  const enContent = contentMatch ? contentMatch[1] : '';
  const faContent = contentFaMatch ? contentFaMatch[1] : '';
  
  const results = {
    file: fileName,
    enLength: enContent.length,
    faLength: faContent.length,
    ratio: enContent.length > 0 ? (faContent.length / enContent.length).toFixed(2) : 0,
    checks: {},
    score: 0,
    maxScore: 0,
  };
  
  // Check 1: Content parity (70% minimum)
  results.checks.contentParity = parseFloat(results.ratio) >= 0.7;
  results.maxScore += 2;
  if (results.checks.contentParity) results.score += 2;
  
  // Check 2: Has analogies/conversational tone
  results.checks.hasAnalogy = QUALITY_CHECKS.analogyPatterns.some(p => faContent.includes(p));
  results.maxScore += 1;
  if (results.checks.hasAnalogy) results.score += 1;
  
  // Check 3: Has required sections
  const sectionsFound = QUALITY_CHECKS.requiredSections.filter(s => faContent.includes(s));
  results.checks.sectionsCount = sectionsFound.length;
  results.checks.hasSections = sectionsFound.length >= 3;
  results.maxScore += 2;
  if (results.checks.hasSections) results.score += 2;
  
  // Check 4: Has markdown table
  results.checks.hasTable = QUALITY_CHECKS.hasTable.test(faContent);
  results.maxScore += 1;
  if (results.checks.hasTable) results.score += 1;
  
  // Check 5: Has section separators
  results.checks.hasSeparator = QUALITY_CHECKS.hasSeparator.test(faContent);
  results.maxScore += 1;
  if (results.checks.hasSeparator) results.score += 1;
  
  // Check 6: Has emoji
  results.checks.hasEmoji = QUALITY_CHECKS.hasEmoji.test(faContent);
  results.maxScore += 1;
  if (results.checks.hasEmoji) results.score += 1;
  
  // Check 7: Has usage guidance
  results.checks.hasUsageGuidance = QUALITY_CHECKS.usagePatterns.some(p => faContent.includes(p));
  results.maxScore += 1;
  if (results.checks.hasUsageGuidance) results.score += 1;
  
  // Check 8: Has Persian code comments
  results.checks.hasPersianComments = QUALITY_CHECKS.persianCommentPattern.test(faContent);
  results.maxScore += 1;
  if (results.checks.hasPersianComments) results.score += 1;
  
  results.percentage = Math.round((results.score / results.maxScore) * 100);
  results.status = results.percentage >= 80 ? '✅ PASS' : results.percentage >= 60 ? '⚠️ NEEDS WORK' : '❌ FAIL';
  
  return results;
}

function validateAllLessons() {
  const files = fs.readdirSync(LESSONS_DIR)
    .filter(f => f.endsWith('.js') && f !== 'index.js');
  
  console.log('📚 Lesson Quality Validation Report\n');
  console.log('='.repeat(80));
  
  const results = [];
  let passCount = 0;
  let needsWorkCount = 0;
  let failCount = 0;
  
  for (const file of files) {
    const filePath = path.join(LESSONS_DIR, file);
    const result = analyzeLesson(filePath);
    results.push(result);
    
    if (result.percentage >= 80) passCount++;
    else if (result.percentage >= 60) needsWorkCount++;
    else failCount++;
  }
  
  // Sort by percentage (lowest first to show what needs work)
  results.sort((a, b) => a.percentage - b.percentage);
  
  // Print results
  console.log('\nFile'.padEnd(35), 'Score'.padStart(8), 'Ratio'.padStart(8), 'Status');
  console.log('-'.repeat(80));
  
  for (const r of results) {
    console.log(
      r.file.padEnd(35),
      `${r.score}/${r.maxScore}`.padStart(8),
      r.ratio.padStart(8),
      r.status
    );
  }
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Pass (80%+): ${passCount}`);
  console.log(`   ⚠️  Needs Work (60-79%): ${needsWorkCount}`);
  console.log(`   ❌ Fail (<60%): ${failCount}`);
  console.log(`   📁 Total: ${files.length} lessons\n`);
  
  // Show detailed issues for failing lessons
  const failing = results.filter(r => r.percentage < 80);
  if (failing.length > 0) {
    console.log('📋 Lessons needing improvement:\n');
    for (const r of failing.slice(0, 10)) {
      console.log(`   ${r.file}:`);
      if (!r.checks.contentParity) console.log(`      - Content too short (${r.ratio} ratio, need 0.70+)`);
      if (!r.checks.hasAnalogy) console.log(`      - Missing analogies (تصور کن, مثل, فکر کن)`);
      if (!r.checks.hasSections) console.log(`      - Missing sections (${r.checks.sectionsCount}/4 found)`);
      if (!r.checks.hasTable) console.log(`      - Missing markdown tables`);
      if (!r.checks.hasSeparator) console.log(`      - Missing section separators (---)`);
      if (!r.checks.hasEmoji) console.log(`      - Missing emoji (✅❌⚡)`);
      if (!r.checks.hasUsageGuidance) console.log(`      - Missing usage guidance section`);
      if (!r.checks.hasPersianComments) console.log(`      - Missing Persian code comments`);
      console.log('');
    }
  }
  
  return { results, passCount, needsWorkCount, failCount };
}

// Run validation
validateAllLessons();
