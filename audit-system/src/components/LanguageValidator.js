/**
 * Language Validator - Ensures consistency and equivalence between English and Farsi content
 */

import { AuditFinding } from '../models/Lesson.js';
import auditConfig from '../../config/audit-config.js';

export class LanguageValidator {
  constructor() {
    this.config = auditConfig;
    this.technicalTerms = this.config.language.technicalTerms;
  }

  /**
   * Compare language versions for equivalence
   */
  compareLanguageVersions(lesson, auditResult) {
    // Check concept coverage
    this.validateConceptCoverage(lesson, auditResult);
    
    // Check content depth equivalence
    this.validateContentDepthEquivalence(lesson, auditResult);
    
    // Check code example parity
    this.validateCodeExampleParity(lesson, auditResult);
    
    // Check terminology consistency
    this.validateTerminologyConsistency(lesson, auditResult);
    
    return this.generateLanguageComparisonReport(lesson);
  }

  /**
   * Validate that both versions cover the same React concepts
   */
  validateConceptCoverage(lesson, auditResult) {
    const englishConcepts = this.extractReactConcepts(lesson.content);
    const farsiConcepts = this.extractReactConcepts(lesson.contentFa);
    
    // Find concepts missing in Farsi
    const missingInFarsi = englishConcepts.filter(concept => 
      !farsiConcepts.includes(concept)
    );
    
    // Find concepts missing in English
    const missingInEnglish = farsiConcepts.filter(concept => 
      !englishConcepts.includes(concept)
    );
    
    if (missingInFarsi.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'language_inconsistency',
        'medium',
        `React concepts missing in Farsi content: ${missingInFarsi.join(', ')}`,
        `${lesson.filePath}:contentFa`,
        `Add missing React concepts to Farsi content: ${missingInFarsi.join(', ')}`
      ));
    }
    
    if (missingInEnglish.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'language_inconsistency',
        'medium',
        `React concepts missing in English content: ${missingInEnglish.join(', ')}`,
        `${lesson.filePath}:content`,
        `Add missing React concepts to English content: ${missingInEnglish.join(', ')}`
      ));
    }
    
    return {
      englishConcepts,
      farsiConcepts,
      missingInFarsi,
      missingInEnglish,
      conceptCoverage: this.calculateConceptCoverage(englishConcepts, farsiConcepts)
    };
  }

  /**
   * Extract React concepts from content
   */
  extractReactConcepts(content) {
    if (!content) return [];
    
    const concepts = [];
    const contentLower = content.toLowerCase();
    
    // React-specific terms
    const reactTerms = [
      'component', 'jsx', 'props', 'state', 'usestate', 'useeffect',
      'hook', 'render', 'virtual dom', 'lifecycle', 'event handling',
      'conditional rendering', 'list rendering', 'form', 'controlled component',
      'uncontrolled component', 'context', 'reducer', 'ref', 'fragment',
      'suspense', 'error boundary', 'memo', 'callback', 'usememo',
      'usecallback', 'custom hook', 'portal', 'server component'
    ];
    
    reactTerms.forEach(term => {
      if (contentLower.includes(term.toLowerCase())) {
        concepts.push(term);
      }
    });
    
    // Extract concepts from headings
    const headings = content.match(/^#+\s+(.+)$/gm) || [];
    headings.forEach(heading => {
      const headingText = heading.replace(/^#+\s+/, '').toLowerCase();
      reactTerms.forEach(term => {
        if (headingText.includes(term.toLowerCase())) {
          if (!concepts.includes(term)) {
            concepts.push(term);
          }
        }
      });
    });
    
    return concepts;
  }

  /**
   * Calculate concept coverage percentage
   */
  calculateConceptCoverage(englishConcepts, farsiConcepts) {
    const allConcepts = [...new Set([...englishConcepts, ...farsiConcepts])];
    const commonConcepts = englishConcepts.filter(concept => 
      farsiConcepts.includes(concept)
    );
    
    return allConcepts.length > 0 ? (commonConcepts.length / allConcepts.length) * 100 : 100;
  }

  /**
   * Validate content depth equivalence between languages
   */
  validateContentDepthEquivalence(lesson, auditResult) {
    const englishDepth = this.analyzeContentDepth(lesson.content);
    const farsiDepth = this.analyzeContentDepth(lesson.contentFa);
    
    const depthComparison = this.compareContentDepth(englishDepth, farsiDepth);
    
    if (depthComparison.significantDifference) {
      const shorterLanguage = depthComparison.englishDeeper ? 'Farsi' : 'English';
      const deeperLanguage = depthComparison.englishDeeper ? 'English' : 'Farsi';
      
      auditResult.addFinding(new AuditFinding(
        'language_inconsistency',
        'medium',
        `${shorterLanguage} content lacks depth compared to ${deeperLanguage} (depth score difference: ${depthComparison.depthDifference})`,
        lesson.filePath,
        `Expand ${shorterLanguage} content to match ${deeperLanguage} comprehensiveness`
      ));
    }
    
    return depthComparison;
  }

  /**
   * Analyze content depth
   */
  analyzeContentDepth(content) {
    if (!content) return { score: 0, factors: {} };
    
    const factors = {
      explanationCount: (content.match(/because|since|therefore|thus|hence/gi) || []).length,
      exampleCount: (content.match(/example|for instance|such as/gi) || []).length,
      definitionCount: (content.match(/definition|means|refers to|is a/gi) || []).length,
      detailCount: (content.match(/specifically|in detail|furthermore|moreover/gi) || []).length,
      sectionCount: (content.match(/^##\s+/gm) || []).length,
      codeBlockCount: (content.match(/```[\s\S]*?```/g) || []).length,
      listCount: (content.match(/^[\s]*[-*+]\s+/gm) || []).length
    };
    
    // Calculate depth score
    const score = (
      factors.explanationCount * 10 +
      factors.exampleCount * 15 +
      factors.definitionCount * 12 +
      factors.detailCount * 8 +
      factors.sectionCount * 20 +
      factors.codeBlockCount * 25 +
      factors.listCount * 5
    );
    
    return { score, factors };
  }

  /**
   * Compare content depth between languages
   */
  compareContentDepth(englishDepth, farsiDepth) {
    const depthDifference = Math.abs(englishDepth.score - farsiDepth.score);
    const averageDepth = (englishDepth.score + farsiDepth.score) / 2;
    const significantDifference = averageDepth > 0 && (depthDifference / averageDepth) > 0.3;
    
    return {
      englishDepth: englishDepth.score,
      farsiDepth: farsiDepth.score,
      depthDifference,
      significantDifference,
      englishDeeper: englishDepth.score > farsiDepth.score,
      relativeDifference: averageDepth > 0 ? (depthDifference / averageDepth) * 100 : 0
    };
  }

  /**
   * Validate code example parity between language versions
   */
  validateCodeExampleParity(lesson, auditResult) {
    const codeExamples = lesson.extractCodeExamples();
    const { english, farsi } = codeExamples;
    
    // Check count parity
    if (english.length !== farsi.length) {
      auditResult.addFinding(new AuditFinding(
        'language_inconsistency',
        'medium',
        `Code example count mismatch (English: ${english.length}, Farsi: ${farsi.length})`,
        lesson.filePath,
        'Ensure both language versions have the same number of code examples'
      ));
    }
    
    // Check content similarity for matching examples
    const minLength = Math.min(english.length, farsi.length);
    for (let i = 0; i < minLength; i++) {
      const similarity = this.calculateCodeSimilarity(english[i].code, farsi[i].code);
      
      if (similarity < 0.8) {
        auditResult.addFinding(new AuditFinding(
          'language_inconsistency',
          'low',
          `Code example ${i + 1} differs between languages (similarity: ${Math.round(similarity * 100)}%)`,
          lesson.filePath,
          `Ensure code example ${i + 1} is equivalent in both languages`
        ));
      }
    }
    
    return {
      englishCount: english.length,
      farsiCount: farsi.length,
      parityScore: this.calculateCodeParity(english, farsi)
    };
  }

  /**
   * Calculate code similarity between two code blocks
   */
  calculateCodeSimilarity(code1, code2) {
    if (!code1 || !code2) return 0;
    
    // Normalize code by removing comments and extra whitespace
    const normalize = (code) => {
      return code
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
        .toLowerCase();
    };
    
    const normalized1 = normalize(code1);
    const normalized2 = normalize(code2);
    
    if (normalized1 === normalized2) return 1.0;
    
    // Calculate similarity using longest common subsequence
    return this.calculateLCS(normalized1, normalized2) / Math.max(normalized1.length, normalized2.length);
  }

  /**
   * Calculate longest common subsequence
   */
  calculateLCS(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    
    return dp[m][n];
  }

  /**
   * Calculate code parity score
   */
  calculateCodeParity(englishBlocks, farsiBlocks) {
    if (englishBlocks.length === 0 && farsiBlocks.length === 0) return 100;
    
    const countParity = Math.min(englishBlocks.length, farsiBlocks.length) / 
                       Math.max(englishBlocks.length, farsiBlocks.length);
    
    let totalSimilarity = 0;
    const minLength = Math.min(englishBlocks.length, farsiBlocks.length);
    
    for (let i = 0; i < minLength; i++) {
      totalSimilarity += this.calculateCodeSimilarity(englishBlocks[i].code, farsiBlocks[i].code);
    }
    
    const averageSimilarity = minLength > 0 ? totalSimilarity / minLength : 0;
    
    return Math.round((countParity * 0.4 + averageSimilarity * 0.6) * 100);
  }

  /**
   * Validate terminology consistency across languages
   */
  validateTerminologyConsistency(lesson, auditResult) {
    const inconsistencies = [];
    
    this.technicalTerms.forEach(term => {
      const englishHasTerm = lesson.content.toLowerCase().includes(term.toLowerCase());
      const farsiHasTerm = lesson.contentFa.toLowerCase().includes(term.toLowerCase());
      
      if (englishHasTerm && !farsiHasTerm) {
        inconsistencies.push({
          term,
          issue: 'missing_in_farsi',
          description: `Technical term "${term}" found in English but not in Farsi`
        });
      } else if (!englishHasTerm && farsiHasTerm) {
        inconsistencies.push({
          term,
          issue: 'missing_in_english',
          description: `Technical term "${term}" found in Farsi but not in English`
        });
      }
    });
    
    // Check for consistent translation of React-specific terms
    const reactTranslations = this.checkReactTermTranslations(lesson);
    inconsistencies.push(...reactTranslations);
    
    // Report inconsistencies
    if (inconsistencies.length > 0) {
      const majorInconsistencies = inconsistencies.filter(inc => 
        ['useState', 'useEffect', 'Component', 'Props', 'State'].includes(inc.term)
      );
      
      const severity = majorInconsistencies.length > 0 ? 'medium' : 'low';
      
      auditResult.addFinding(new AuditFinding(
        'terminology_inconsistency',
        severity,
        `Technical terminology inconsistencies found: ${inconsistencies.map(inc => inc.term).join(', ')}`,
        lesson.filePath,
        'Ensure consistent use of technical terms across both language versions'
      ));
    }
    
    return {
      inconsistencies,
      consistencyScore: this.calculateTerminologyConsistency(lesson)
    };
  }

  /**
   * Check React-specific term translations
   */
  checkReactTermTranslations(lesson) {
    const inconsistencies = [];
    
    // Define expected translations (this could be expanded)
    const translations = {
      'component': ['کامپوننت', 'جزء'],
      'props': ['پراپس', 'ویژگی'],
      'state': ['استیت', 'وضعیت'],
      'hook': ['هوک', 'قلاب'],
      'render': ['رندر', 'نمایش']
    };
    
    Object.entries(translations).forEach(([englishTerm, farsiTerms]) => {
      const hasEnglish = lesson.content.toLowerCase().includes(englishTerm);
      const hasFarsiTranslation = farsiTerms.some(farsiTerm => 
        lesson.contentFa.includes(farsiTerm)
      );
      
      if (hasEnglish && !hasFarsiTranslation) {
        inconsistencies.push({
          term: englishTerm,
          issue: 'missing_translation',
          description: `English term "${englishTerm}" needs proper Farsi translation`,
          suggestedTranslations: farsiTerms
        });
      }
    });
    
    return inconsistencies;
  }

  /**
   * Calculate terminology consistency score
   */
  calculateTerminologyConsistency(lesson) {
    let consistentTerms = 0;
    let totalTerms = 0;
    
    this.technicalTerms.forEach(term => {
      const englishHasTerm = lesson.content.toLowerCase().includes(term.toLowerCase());
      const farsiHasTerm = lesson.contentFa.toLowerCase().includes(term.toLowerCase());
      
      if (englishHasTerm || farsiHasTerm) {
        totalTerms++;
        if (englishHasTerm && farsiHasTerm) {
          consistentTerms++;
        }
      }
    });
    
    return totalTerms > 0 ? Math.round((consistentTerms / totalTerms) * 100) : 100;
  }

  /**
   * Generate comprehensive language comparison report
   */
  generateLanguageComparisonReport(lesson) {
    const report = {
      lessonId: lesson.id,
      timestamp: new Date().toISOString(),
      contentLengthRatio: lesson.getContentLengthRatio(),
      conceptCoverage: this.validateConceptCoverage(lesson, { findings: [], addFinding: () => {} }),
      depthComparison: this.validateContentDepthEquivalence(lesson, { findings: [], addFinding: () => {} }),
      codeParity: this.validateCodeExampleParity(lesson, { findings: [], addFinding: () => {} }),
      terminologyConsistency: this.validateTerminologyConsistency(lesson, { findings: [], addFinding: () => {} }),
      overallConsistencyScore: 0
    };
    
    // Calculate overall consistency score
    const scores = [
      report.conceptCoverage.conceptCoverage,
      100 - Math.min(50, report.depthComparison.relativeDifference),
      report.codeParity.parityScore,
      report.terminologyConsistency.consistencyScore
    ];
    
    report.overallConsistencyScore = Math.round(
      scores.reduce((sum, score) => sum + score, 0) / scores.length
    );
    
    return report;
  }

  /**
   * Generate language validation summary for multiple lessons
   */
  generateLanguageValidationSummary(lessons) {
    const summary = {
      timestamp: new Date().toISOString(),
      totalLessons: lessons.length,
      averageConsistencyScore: 0,
      consistencyDistribution: {
        excellent: 0, // 90-100
        good: 0,      // 75-89
        fair: 0,      // 60-74
        poor: 0       // <60
      },
      commonIssues: {
        conceptGaps: 0,
        depthImbalance: 0,
        codeInconsistency: 0,
        terminologyIssues: 0
      },
      lessonReports: []
    };
    
    let totalConsistencyScore = 0;
    
    lessons.forEach(lesson => {
      const report = this.generateLanguageComparisonReport(lesson);
      summary.lessonReports.push(report);
      
      totalConsistencyScore += report.overallConsistencyScore;
      
      // Categorize consistency
      if (report.overallConsistencyScore >= 90) summary.consistencyDistribution.excellent++;
      else if (report.overallConsistencyScore >= 75) summary.consistencyDistribution.good++;
      else if (report.overallConsistencyScore >= 60) summary.consistencyDistribution.fair++;
      else summary.consistencyDistribution.poor++;
      
      // Count common issues
      if (report.conceptCoverage.conceptCoverage < 90) summary.commonIssues.conceptGaps++;
      if (report.depthComparison.significantDifference) summary.commonIssues.depthImbalance++;
      if (report.codeParity.parityScore < 80) summary.commonIssues.codeInconsistency++;
      if (report.terminologyConsistency.consistencyScore < 80) summary.commonIssues.terminologyIssues++;
    });
    
    summary.averageConsistencyScore = lessons.length > 0 
      ? Math.round(totalConsistencyScore / lessons.length) 
      : 0;
    
    return summary;
  }
}