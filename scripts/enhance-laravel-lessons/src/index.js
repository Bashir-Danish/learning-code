#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import { LessonFileParser } from './parsers/LessonFileParser.js';
import { ContentAnalyzer } from './analyzers/ContentAnalyzer.js';
import { ContentGenerator } from './generators/ContentGenerator.js';
import { BilingualContentManager } from './generators/BilingualContentManager.js';
import { LessonFileWriter } from './writers/LessonFileWriter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main enhancement orchestrator
 */
class LessonEnhancer {
  constructor() {
    this.parser = new LessonFileParser();
    this.analyzer = new ContentAnalyzer();
    this.generator = new ContentGenerator();
    this.bilingualManager = new BilingualContentManager();
    this.writer = new LessonFileWriter();
    this.lessonsDir = path.join(__dirname, '../../../data/lessons/php-laravel');
  }

  /**
   * Enhance all Laravel lessons
   * @param {object} options - Enhancement options
   */
  async enhanceAllLessons(options = {}) {
    const { dryRun = false } = options;

    console.log('🚀 Starting Laravel Lessons Enhancement\n');

    try {
      // Get all lesson files
      const lessonFiles = await this.parser.getAllLessonFiles(this.lessonsDir);
      console.log(`📚 Found ${lessonFiles.length} lesson files\n`);

      const results = [];

      // Process each lesson
      for (const filePath of lessonFiles) {
        try {
          const result = await this.enhanceSingleLesson(filePath, { dryRun });
          results.push(result);
        } catch (error) {
          console.error(`❌ Error enhancing ${path.basename(filePath)}:`, error.message);
          results.push({
            filePath,
            success: false,
            error: error.message,
          });
        }
      }

      // Generate report
      this.generateReport(results);

      console.log('\n✨ Enhancement complete!\n');
    } catch (error) {
      console.error('❌ Fatal error:', error.message);
      process.exit(1);
    }
  }

  /**
   * Enhance a single lesson
   * @param {string} filePath - Path to lesson file
   * @param {object} options - Enhancement options
   * @returns {object} Enhancement result
   */
  async enhanceSingleLesson(filePath, options = {}) {
    const { dryRun = false } = options;
    const fileName = path.basename(filePath);

    console.log(`\n📝 Processing: ${fileName}`);

    // 1. Parse lesson file
    console.log('  ├─ Parsing...');
    const parsed = await this.parser.parseLessonFile(filePath);

    // 2. Analyze content
    console.log('  ├─ Analyzing...');
    const analysis = this.analyzer.analyzeContent(parsed.content.english);
    const depth = this.analyzer.assessDepth(parsed.content.english);

    console.log(`  │  ├─ Current completeness: ${analysis.estimatedCompleteness}%`);
    console.log(`  │  ├─ Current depth: ${depth.overallDepth}`);
    console.log(`  │  ├─ Code examples: ${analysis.codeExampleCount}`);
    console.log(`  │  └─ Missing sections: ${analysis.missingSections.length}`);

    // 3. Generate enhanced content
    console.log('  ├─ Generating enhanced content...');
    const enhanced = await this.generator.generateEnhancedContent(
      parsed.content.english,
      parsed.metadata.id,
      parsed.metadata
    );

    // 4. Generate Persian content
    console.log('  ├─ Generating Persian content...');
    const persianContent = this.bilingualManager.generatePersianContent(
      enhanced.fullMarkdown,
      parsed.metadata.id
    );

    // 5. Validate bilingual parity
    const englishSections = this.bilingualManager.extractSections(enhanced.fullMarkdown);
    const persianSections = this.bilingualManager.extractSections(persianContent);
    const parityCheck = this.bilingualManager.ensureSectionParity(
      englishSections,
      persianSections
    );

    if (!parityCheck.isValid) {
      console.log('  │  ⚠️  Bilingual parity issues detected');
    }

    // 6. Write enhanced lesson
    if (!dryRun) {
      console.log('  ├─ Writing enhanced lesson...');
      await this.writer.writeEnhancedLesson(
        filePath,
        { ...parsed.metadata, estimatedTime: enhanced.estimatedTime },
        enhanced.fullMarkdown,
        persianContent,
        true // create backup
      );

      // 7. Validate output
      console.log('  └─ Validating output...');
      const validation = await this.writer.validateOutputFile(filePath);

      if (!validation.isValid) {
        console.log('  ⚠️  Validation warnings:', validation.errors);
      }
    } else {
      console.log('  └─ Dry run - skipping write');
    }

    return {
      filePath,
      fileName,
      success: true,
      originalTime: parsed.metadata.estimatedTime,
      enhancedTime: enhanced.estimatedTime,
      originalCodeExamples: analysis.codeExampleCount,
      enhancedCodeExamples: enhanced.codeExampleCount,
      originalCompleteness: analysis.estimatedCompleteness,
      missingSections: analysis.missingSections,
      bilingualParity: parityCheck.isValid,
    };
  }

  /**
   * Generate enhancement report
   * @param {Array} results - Enhancement results
   */
  generateReport(results) {
    console.log('\n' + '='.repeat(60));
    console.log('📊 ENHANCEMENT REPORT');
    console.log('='.repeat(60) + '\n');

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    console.log(`Total lessons: ${results.length}`);
    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}\n`);

    if (successful.length > 0) {
      console.log('Successful enhancements:');
      for (const result of successful) {
        console.log(`\n  ${result.fileName}`);
        console.log(`    Time: ${result.originalTime} → ${result.enhancedTime}`);
        console.log(
          `    Code examples: ${result.originalCodeExamples} → ${result.enhancedCodeExamples}`
        );
        console.log(`    Original completeness: ${result.originalCompleteness}%`);
        console.log(`    Bilingual parity: ${result.bilingualParity ? '✅' : '⚠️'}`);
        if (result.missingSections.length > 0) {
          console.log(`    Added sections: ${result.missingSections.join(', ')}`);
        }
      }
    }

    if (failed.length > 0) {
      console.log('\n\nFailed enhancements:');
      for (const result of failed) {
        console.log(`\n  ${path.basename(result.filePath)}`);
        console.log(`    Error: ${result.error}`);
      }
    }
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const enhancer = new LessonEnhancer();

  const options = {
    dryRun: args.includes('--dry-run'),
    lesson: args.find((arg) => arg.startsWith('--lesson='))?.split('=')[1],
  };

  if (options.lesson) {
    // Enhance single lesson
    const filePath = path.join(enhancer.lessonsDir, `${options.lesson}.js`);
    await enhancer.enhanceSingleLesson(filePath, options);
  } else {
    // Enhance all lessons
    await enhancer.enhanceAllLessons(options);
  }
}

// Run if called directly
const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { LessonEnhancer };
