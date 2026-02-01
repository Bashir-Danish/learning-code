#!/usr/bin/env node

/**
 * Standalone enhancement script for React lessons
 */

import ReactLessonsAuditSystem from './index.js';

async function runEnhancement() {
  console.log('✨ React Lessons Enhancement Tool');
  console.log('=================================\n');
  
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
    
    // Run enhancement
    const result = await system.runEnhancementOnly();
    
    // Display summary
    console.log('\n📊 Enhancement Summary:');
    console.log(`Enhanced Lessons: ${result.enhanced.length}`);
    console.log(`Skipped Lessons: ${result.skipped.length}`);
    console.log(`Failed Lessons: ${result.failed.length}`);
    console.log(`Total Changes Made: ${result.totalChanges}`);
    
    if (result.enhanced.length > 0) {
      console.log('\n✅ Enhanced Lessons:');
      result.enhanced.forEach(lesson => {
        console.log(`  - ${lesson.lessonId}: ${lesson.changes} changes (was ${lesson.originalScore}/100)`);
      });
    }
    
    if (result.failed.length > 0) {
      console.log('\n❌ Failed Enhancements:');
      result.failed.forEach(lesson => {
        console.log(`  - ${lesson.lessonId}: ${lesson.error}`);
      });
    }
    
    console.log('\n🎉 Enhancement completed!');
    
  } catch (error) {
    console.error('❌ Enhancement failed:', error.message);
    process.exit(1);
  }
}

runEnhancement();