/**
 * Main orchestration system for React lessons audit and enhancement
 */

import { LessonRepository } from './components/LessonRepository.js';
import { ContentAuditor } from './components/ContentAuditor.js';
import { QualityChecker } from './components/QualityChecker.js';
import { LanguageValidator } from './components/LanguageValidator.js';
import { ContentEnhancer } from './components/ContentEnhancer.js';
import { CodeValidator } from './components/CodeValidator.js';
import { ReportGenerator } from './components/ReportGenerator.js';
import auditConfig from '../config/audit-config.js';

export class ReactLessonsAuditSystem {
  constructor(basePath = '.') {
    this.basePath = basePath;
    this.lessonRepository = new LessonRepository(basePath);
    this.contentAuditor = new ContentAuditor();
    this.qualityChecker = new QualityChecker();
    this.languageValidator = new LanguageValidator();
    this.contentEnhancer = new ContentEnhancer();
    this.codeValidator = new CodeValidator();
    this.reportGenerator = new ReportGenerator();
  }

  /**
   * Run complete audit and enhancement workflow
   */
  async runCompleteWorkflow(options = {}) {
    console.log('🚀 Starting React Lessons Audit and Enhancement System...');
    
    try {
      // Step 1: Load all lessons
      console.log('\n📚 Loading lessons...');
      const lessons = await this.lessonRepository.loadAllLessons();
      
      if (lessons.length === 0) {
        throw new Error('No lessons found to process');
      }
      
      console.log(`✅ Loaded ${lessons.length} lessons`);
      
      // Step 2: Run comprehensive audit
      console.log('\n🔍 Running comprehensive audit...');
      const auditResults = await this.runAudit(lessons);
      
      // Step 3: Generate audit reports
      console.log('\n📊 Generating audit reports...');
      const auditSummary = this.contentAuditor.generateAuditSummary(auditResults);
      await this.reportGenerator.generateAuditReport(auditResults, auditSummary, options);
      
      // Step 4: Run enhancement if requested
      if (options.enhance) {
        console.log('\n✨ Running content enhancement...');
        const enhancementResults = await this.runEnhancement(lessons, auditResults);
        
        // Step 5: Generate final reports
        console.log('\n📋 Generating final reports...');
        await this.generateFinalReports(enhancementResults, options);
      }
      
      console.log('\n🎉 Workflow completed successfully!');
      
      return {
        lessons: lessons.length,
        auditResults,
        auditSummary,
        averageScore: auditSummary.averageScore,
        lessonsNeedingAttention: auditSummary.lessonsNeedingAttention.length
      };
      
    } catch (error) {
      console.error('❌ Workflow failed:', error.message);
      throw error;
    }
  }

  /**
   * Run audit only (without enhancement)
   */
  async runAuditOnly(options = {}) {
    console.log('🔍 Running audit-only workflow...');
    
    try {
      // Load lessons
      const lessons = await this.lessonRepository.loadAllLessons();
      console.log(`📚 Loaded ${lessons.length} lessons`);
      
      // Run audit
      const auditResults = await this.runAudit(lessons);
      
      // Generate reports
      const auditSummary = this.contentAuditor.generateAuditSummary(auditResults);
      const reportPaths = await this.reportGenerator.generateAuditReport(auditResults, auditSummary, options);
      
      console.log('✅ Audit completed successfully!');
      console.log(`📊 Reports generated: ${reportPaths.join(', ')}`);
      
      return {
        lessons: lessons.length,
        auditResults,
        auditSummary,
        reportPaths
      };
      
    } catch (error) {
      console.error('❌ Audit failed:', error.message);
      throw error;
    }
  }

  /**
   * Run enhancement only (assumes audit has been done)
   */
  async runEnhancementOnly(options = {}) {
    console.log('✨ Running enhancement-only workflow...');
    
    try {
      // Load lessons
      const lessons = await this.lessonRepository.loadAllLessons();
      console.log(`📚 Loaded ${lessons.length} lessons`);
      
      // Run quick audit to get findings
      const auditResults = await this.runAudit(lessons);
      
      // Run enhancement
      const enhancementResults = await this.runEnhancement(lessons, auditResults);
      
      // Generate reports
      await this.generateFinalReports(enhancementResults, options);
      
      console.log('✅ Enhancement completed successfully!');
      
      return enhancementResults;
      
    } catch (error) {
      console.error('❌ Enhancement failed:', error.message);
      throw error;
    }
  }

  /**
   * Run comprehensive audit on all lessons
   */
  async runAudit(lessons) {
    const auditResults = [];
    
    console.log('Running content audit...');
    const contentAuditResults = await this.contentAuditor.auditAllLessons(lessons);
    
    console.log('Running quality assessment...');
    const qualityReport = this.qualityChecker.generateQualityReport(lessons);
    
    console.log('Running language validation...');
    const languageValidationSummary = this.languageValidator.generateLanguageValidationSummary(lessons);
    
    console.log('Running code validation...');
    const codeValidationReport = this.codeValidator.generateCodeValidationReport(lessons);
    
    // Combine all audit results
    contentAuditResults.forEach((contentResult, index) => {
      const lesson = lessons[index];
      
      // Add quality findings
      const qualityAssessment = this.qualityChecker.checkEducationalValue(lesson, contentResult);
      
      // Add language validation findings
      this.languageValidator.compareLanguageVersions(lesson, contentResult);
      
      // Add code validation findings
      this.codeValidator.validateCodeExamples(lesson, contentResult);
      
      // Recalculate overall score after adding all findings
      contentResult.calculateOverallScore();
      
      auditResults.push(contentResult);
    });
    
    return auditResults;
  }

  /**
   * Run content enhancement on lessons that need it
   */
  async runEnhancement(lessons, auditResults) {
    const enhancementResults = {
      enhanced: [],
      skipped: [],
      failed: [],
      totalChanges: 0
    };
    
    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      const auditResult = auditResults[i];
      
      try {
        // Only enhance lessons that need it (score < 85 or have critical issues)
        const needsEnhancement = auditResult.overallScore < 85 || 
                                auditResult.findings.some(f => f.severity === 'critical');
        
        if (needsEnhancement) {
          console.log(`Enhancing lesson: ${lesson.id}`);
          
          const enhancement = await this.contentEnhancer.enhanceContent(lesson, auditResult.findings);
          
          // Update lesson content if changes were made
          if (enhancement.enhancementRecord.changes.length > 0) {
            await this.lessonRepository.updateLessonContent(
              lesson.id, 
              {
                content: enhancement.enhancedLesson.content,
                contentFa: enhancement.enhancedLesson.contentFa
              }
            );
            
            enhancementResults.enhanced.push({
              lessonId: lesson.id,
              originalScore: auditResult.overallScore,
              changes: enhancement.enhancementRecord.changes.length,
              enhancementRecord: enhancement.enhancementRecord
            });
            
            enhancementResults.totalChanges += enhancement.enhancementRecord.changes.length;
          } else {
            enhancementResults.skipped.push({
              lessonId: lesson.id,
              reason: 'No changes needed'
            });
          }
        } else {
          enhancementResults.skipped.push({
            lessonId: lesson.id,
            reason: 'Quality already acceptable'
          });
        }
        
      } catch (error) {
        console.error(`Failed to enhance lesson ${lesson.id}:`, error.message);
        enhancementResults.failed.push({
          lessonId: lesson.id,
          error: error.message
        });
      }
    }
    
    console.log(`✅ Enhancement completed:`);
    console.log(`   Enhanced: ${enhancementResults.enhanced.length} lessons`);
    console.log(`   Skipped: ${enhancementResults.skipped.length} lessons`);
    console.log(`   Failed: ${enhancementResults.failed.length} lessons`);
    console.log(`   Total changes: ${enhancementResults.totalChanges}`);
    
    return enhancementResults;
  }

  /**
   * Generate final comprehensive reports
   */
  async generateFinalReports(enhancementResults, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Generate enhancement summary report
    const enhancementReport = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLessons: enhancementResults.enhanced.length + enhancementResults.skipped.length + enhancementResults.failed.length,
        enhanced: enhancementResults.enhanced.length,
        skipped: enhancementResults.skipped.length,
        failed: enhancementResults.failed.length,
        totalChanges: enhancementResults.totalChanges
      },
      details: enhancementResults
    };
    
    // Save enhancement report
    const fs = await import('fs-extra');
    const path = await import('path');
    
    const reportsDir = path.join(this.basePath, auditConfig.paths.reportsDir);
    await fs.ensureDir(reportsDir);
    
    const enhancementReportPath = path.join(reportsDir, `enhancement-report-${timestamp}.json`);
    await fs.writeFile(enhancementReportPath, JSON.stringify(enhancementReport, null, 2));
    
    console.log(`📊 Enhancement report saved: ${enhancementReportPath}`);
    
    return [enhancementReportPath];
  }

  /**
   * Get system statistics
   */
  async getStatistics() {
    try {
      const lessons = await this.lessonRepository.loadAllLessons();
      const repoStats = this.lessonRepository.getStatistics();
      
      return {
        repository: repoStats,
        system: {
          configuredDifficultyLevels: auditConfig.difficultyLevels.length,
          qualityThresholds: auditConfig.quality,
          validationThresholds: auditConfig.validation
        }
      };
    } catch (error) {
      console.error('Failed to get statistics:', error.message);
      return null;
    }
  }

  /**
   * Validate system configuration and setup
   */
  async validateSystem() {
    const validation = {
      isValid: true,
      issues: [],
      warnings: []
    };
    
    try {
      // Check if lesson directories exist
      const fs = await import('fs-extra');
      const path = await import('path');
      
      for (const difficulty of auditConfig.difficultyLevels) {
        const difficultyPath = path.join(this.basePath, auditConfig.paths.reactLessons, difficulty);
        if (!(await fs.pathExists(difficultyPath))) {
          validation.warnings.push(`Lesson directory not found: ${difficultyPath}`);
        }
      }
      
      // Validate repository
      await this.lessonRepository.loadAllLessons();
      const repoValidation = this.lessonRepository.validateRepository();
      
      if (!repoValidation.isValid) {
        validation.isValid = false;
        validation.issues.push(...repoValidation.issues);
      }
      
      // Check output directories
      const outputDirs = [
        auditConfig.paths.backupDir,
        auditConfig.paths.reportsDir,
        auditConfig.paths.outputDir
      ];
      
      for (const dir of outputDirs) {
        const fullPath = path.join(this.basePath, dir);
        try {
          await fs.ensureDir(fullPath);
        } catch (error) {
          validation.issues.push(`Cannot create output directory: ${fullPath}`);
          validation.isValid = false;
        }
      }
      
    } catch (error) {
      validation.isValid = false;
      validation.issues.push(`System validation failed: ${error.message}`);
    }
    
    return validation;
  }
}

/**
 * Command-line interface
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  const system = new ReactLessonsAuditSystem();
  
  try {
    switch (command) {
      case 'audit':
        await system.runAuditOnly({
          formats: args.includes('--html') ? ['json', 'markdown', 'html'] : ['json', 'markdown']
        });
        break;
        
      case 'enhance':
        await system.runEnhancementOnly();
        break;
        
      case 'full':
        await system.runCompleteWorkflow({
          enhance: true,
          formats: args.includes('--html') ? ['json', 'markdown', 'html'] : ['json', 'markdown']
        });
        break;
        
      case 'stats':
        const stats = await system.getStatistics();
        console.log('📊 System Statistics:');
        console.log(JSON.stringify(stats, null, 2));
        break;
        
      case 'validate':
        const validation = await system.validateSystem();
        console.log('🔧 System Validation:');
        console.log(`Status: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
        if (validation.issues.length > 0) {
          console.log('Issues:', validation.issues);
        }
        if (validation.warnings.length > 0) {
          console.log('Warnings:', validation.warnings);
        }
        break;
        
      case 'help':
      default:
        console.log(`
🎓 React Lessons Audit Enhancement System

Usage: node src/index.js <command> [options]

Commands:
  audit     Run audit only (no enhancement)
  enhance   Run enhancement only
  full      Run complete workflow (audit + enhancement)
  stats     Show system statistics
  validate  Validate system configuration
  help      Show this help message

Options:
  --html    Include HTML reports (for audit and full commands)

Examples:
  node src/index.js audit
  node src/index.js full --html
  node src/index.js enhance
  node src/index.js stats
        `);
        break;
    }
  } catch (error) {
    console.error('❌ Command failed:', error.message);
    process.exit(1);
  }
}

// Run CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default ReactLessonsAuditSystem;