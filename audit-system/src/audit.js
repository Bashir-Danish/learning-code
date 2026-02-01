#!/usr/bin/env node

/**
 * Standalone audit script for React lessons
 */

import ReactLessonsAuditSystem from './index.js';

async function runAudit() {
  console.log('🔍 React Lessons Audit Tool');
  console.log('============================\n');
  
  const system = new ReactLessonsAuditSystem();
  
  try {
    // Validate system first
    console.log('Validating system...');
    const validation = await system.validateSystem();
    
    if (!validation.isValid) {
      console.error('❌ System validation failed:');
      validation.issues.forEach(issue => console.error(`  - ${issue}`));
      process.exit(1);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('⚠️  Warnings:');
      validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
    }
    
    // Run audit
    const result = await system.runAuditOnly({
      formats: ['json', 'markdown']
    });
    
    // Display summary
    console.log('\n📊 Audit Summary:');
    console.log(`Total Lessons: ${result.lessons}`);
    console.log(`Average Score: ${result.auditSummary.averageScore}/100`);
    console.log(`Lessons Needing Attention: ${result.auditSummary.lessonsNeedingAttention.length}`);
    
    console.log('\n📈 Score Distribution:');
    console.log(`  Excellent (90-100): ${result.auditSummary.scoreDistribution.excellent}`);
    console.log(`  Good (75-89): ${result.auditSummary.scoreDistribution.good}`);
    console.log(`  Fair (60-74): ${result.auditSummary.scoreDistribution.fair}`);
    console.log(`  Poor (<60): ${result.auditSummary.scoreDistribution.poor}`);
    
    if (result.auditSummary.lessonsNeedingAttention.length > 0) {
      console.log('\n⚠️  Lessons Requiring Attention:');
      result.auditSummary.lessonsNeedingAttention.forEach(lesson => {
        console.log(`  - ${lesson.lessonId}: ${lesson.score}/100 (${lesson.criticalIssues} critical issues)`);
      });
    }
    
    console.log(`\n📋 Reports generated: ${result.reportPaths.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    process.exit(1);
  }
}

runAudit();