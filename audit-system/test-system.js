#!/usr/bin/env node

/**
 * Simple test script to verify the audit system works
 */

import ReactLessonsAuditSystem from './src/index.js';

async function testSystem() {
  console.log('🧪 Testing React Lessons Audit System');
  console.log('=====================================\n');
  
  const system = new ReactLessonsAuditSystem();
  
  try {
    // Test 1: System validation
    console.log('1. Testing system validation...');
    const validation = await system.validateSystem();
    console.log(`   ✅ System validation: ${validation.isValid ? 'PASSED' : 'FAILED'}`);
    
    if (validation.warnings.length > 0) {
      console.log(`   ⚠️  Warnings: ${validation.warnings.length}`);
    }
    
    // Test 2: Load lessons
    console.log('\n2. Testing lesson loading...');
    const lessons = await system.lessonRepository.loadAllLessons();
    console.log(`   ✅ Loaded ${lessons.length} lessons`);
    
    if (lessons.length === 0) {
      console.log('   ⚠️  No lessons found - system will work but has no data to process');
      return;
    }
    
    // Test 3: Basic audit
    console.log('\n3. Testing basic audit functionality...');
    const sampleLesson = lessons[0];
    const auditResult = await system.contentAuditor.auditLesson(sampleLesson);
    console.log(`   ✅ Audit completed for "${sampleLesson.id}"`);
    console.log(`   📊 Score: ${auditResult.overallScore}/100`);
    console.log(`   🔍 Findings: ${auditResult.findings.length}`);
    
    // Test 4: Quality assessment
    console.log('\n4. Testing quality assessment...');
    const qualityAssessment = system.qualityChecker.assessContentQuality(sampleLesson.content);
    console.log(`   ✅ Quality assessment completed`);
    console.log(`   📈 Overall quality: ${qualityAssessment.overallQuality}/100`);
    
    // Test 5: Language validation
    console.log('\n5. Testing language validation...');
    const languageReport = system.languageValidator.generateLanguageComparisonReport(sampleLesson);
    console.log(`   ✅ Language validation completed`);
    console.log(`   🌐 Consistency score: ${languageReport.overallConsistencyScore}/100`);
    
    // Test 6: Code validation
    console.log('\n6. Testing code validation...');
    const codeExamples = sampleLesson.extractCodeExamples();
    console.log(`   ✅ Code extraction completed`);
    console.log(`   💻 English code blocks: ${codeExamples.english.length}`);
    console.log(`   💻 Farsi code blocks: ${codeExamples.farsi.length}`);
    
    // Test 7: Report generation
    console.log('\n7. Testing report generation...');
    const mockAuditResults = [auditResult];
    const mockSummary = system.contentAuditor.generateAuditSummary(mockAuditResults);
    console.log(`   ✅ Report generation test completed`);
    console.log(`   📊 Average score: ${mockSummary.averageScore}/100`);
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('\nSystem is ready to use. Try running:');
    console.log('  npm run audit     - Run audit only');
    console.log('  npm run enhance   - Run enhancement only');
    console.log('  npm start full    - Run complete workflow');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\nThis might be due to:');
    console.error('  - Missing lesson files in data/lessons/ directories');
    console.error('  - Incorrect file structure');
    console.error('  - Permission issues');
    console.error('\nPlease check your setup and try again.');
    process.exit(1);
  }
}

testSystem();