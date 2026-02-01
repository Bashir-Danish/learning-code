/**
 * Quality Checker - Assessment of educational value and content comprehensiveness
 */

import { AuditFinding } from '../models/Lesson.js';
import auditConfig from '../../config/audit-config.js';

export class QualityChecker {
  constructor() {
    this.config = auditConfig;
  }

  /**
   * Assess content quality for explanation depth and clarity
   */
  assessContentQuality(content) {
    const assessment = {
      readabilityScore: 0,
      explanationDepth: 0,
      educationalValue: 0,
      structureScore: 0,
      overallQuality: 0
    };

    if (!content || content.trim().length === 0) {
      return assessment;
    }

    // Calculate readability score
    assessment.readabilityScore = this.calculateReadabilityScore(content);
    
    // Calculate explanation depth
    assessment.explanationDepth = this.calculateExplanationDepth(content);
    
    // Calculate educational value
    assessment.educationalValue = this.calculateEducationalValue(content);
    
    // Calculate structure score
    assessment.structureScore = this.calculateStructureScore(content);
    
    // Calculate overall quality (weighted average)
    assessment.overallQuality = Math.round(
      (assessment.readabilityScore * 0.25) +
      (assessment.explanationDepth * 0.35) +
      (assessment.educationalValue * 0.25) +
      (assessment.structureScore * 0.15)
    );

    return assessment;
  }

  /**
   * Calculate readability score based on sentence structure and complexity
   */
  calculateReadabilityScore(content) {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    
    if (sentences.length === 0 || words.length === 0) return 0;

    const avgWordsPerSentence = words.length / sentences.length;
    const avgCharsPerWord = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    
    // Simple readability formula (higher is better, max 100)
    let score = 100 - (avgWordsPerSentence * 1.5) - (avgCharsPerWord * 2);
    
    // Adjust for technical content (React lessons should be moderately complex)
    if (avgWordsPerSentence > 15 && avgWordsPerSentence < 25) score += 10;
    if (avgCharsPerWord > 4 && avgCharsPerWord < 7) score += 10;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Calculate explanation depth based on content comprehensiveness
   */
  calculateExplanationDepth(content) {
    let score = 0;
    
    // Check for key explanation elements
    const explanationIndicators = [
      /definition|what is|means|refers to/i,
      /why|because|reason|purpose/i,
      /how|steps|process|method/i,
      /example|for instance|such as/i,
      /benefits|advantages|features/i,
      /important|note|remember|key/i
    ];
    
    explanationIndicators.forEach(indicator => {
      if (indicator.test(content)) score += 15;
    });
    
    // Check for code explanations
    const codeBlocks = (content.match(/```[\s\S]*?```/g) || []);
    codeBlocks.forEach(block => {
      // Check if code block has explanation before or after
      const blockIndex = content.indexOf(block);
      const beforeText = content.substring(Math.max(0, blockIndex - 200), blockIndex);
      const afterText = content.substring(blockIndex + block.length, blockIndex + block.length + 200);
      
      if (beforeText.length > 50 || afterText.length > 50) {
        score += 5;
      }
    });
    
    // Check for comprehensive coverage
    const contentLength = content.length;
    if (contentLength > 1000) score += 10;
    if (contentLength > 2000) score += 5;
    
    return Math.min(100, score);
  }

  /**
   * Calculate educational value based on learning objectives coverage
   */
  calculateEducationalValue(content) {
    let score = 0;
    
    // Check for learning structure
    const learningElements = [
      /^#\s+/m, // Main heading
      /^##\s+/m, // Section headings
      /summary|conclusion|recap/i,
      /key\s+(points|features|concepts)/i,
      /remember|important|note/i
    ];
    
    learningElements.forEach(element => {
      if (element.test(content)) score += 12;
    });
    
    // Check for practical examples
    const practicalIndicators = [
      /```[\s\S]*?```/g, // Code blocks
      /example|demo|practice/i,
      /try|test|experiment/i,
      /real.world|practical|use.case/i
    ];
    
    practicalIndicators.forEach(indicator => {
      const matches = content.match(indicator);
      if (matches) {
        score += Math.min(15, matches.length * 5);
      }
    });
    
    // Check for progressive difficulty
    const progressiveIndicators = [
      /basic|simple|introduction/i,
      /advanced|complex|detailed/i,
      /step.by.step|gradually|build/i
    ];
    
    let progressiveCount = 0;
    progressiveIndicators.forEach(indicator => {
      if (indicator.test(content)) progressiveCount++;
    });
    
    if (progressiveCount >= 2) score += 10;
    
    return Math.min(100, score);
  }

  /**
   * Calculate structure score based on organization and formatting
   */
  calculateStructureScore(content) {
    let score = 0;
    
    // Check for proper heading hierarchy
    const headings = content.match(/^#+\s+.+$/gm) || [];
    if (headings.length >= 3) score += 20;
    else if (headings.length >= 1) score += 10;
    
    // Check for lists and organization
    const lists = content.match(/^[\s]*[-*+]\s+/gm) || [];
    if (lists.length >= 3) score += 15;
    
    // Check for code formatting
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    const inlineCode = content.match(/`[^`]+`/g) || [];
    if (codeBlocks.length > 0) score += 20;
    if (inlineCode.length > 0) score += 10;
    
    // Check for emphasis and formatting
    const bold = content.match(/\*\*[^*]+\*\*/g) || [];
    const italic = content.match(/\*[^*]+\*/g) || [];
    if (bold.length > 0) score += 10;
    if (italic.length > 0) score += 5;
    
    // Check for horizontal rules (section separators)
    const separators = content.match(/^---+$/gm) || [];
    if (separators.length > 0) score += 10;
    
    // Penalty for very long paragraphs
    const paragraphs = content.split(/\n\s*\n/);
    const longParagraphs = paragraphs.filter(p => p.length > 500);
    if (longParagraphs.length > 0) score -= longParagraphs.length * 5;
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Check educational value against learning objectives
   */
  checkEducationalValue(lesson, auditResult) {
    const englishQuality = this.assessContentQuality(lesson.content);
    const farsiQuality = this.assessContentQuality(lesson.contentFa);
    
    // Check English content quality
    if (englishQuality.overallQuality < this.config.quality.minEducationalValue) {
      auditResult.addFinding(new AuditFinding(
        'quality_issue',
        'medium',
        `English content educational value is below standard (${englishQuality.overallQuality}/${this.config.quality.minEducationalValue})`,
        `${lesson.filePath}:content`,
        'Improve content structure, add more examples, and enhance explanations'
      ));
    }
    
    // Check Farsi content quality
    if (farsiQuality.overallQuality < this.config.quality.minEducationalValue) {
      auditResult.addFinding(new AuditFinding(
        'quality_issue',
        'medium',
        `Farsi content educational value is below standard (${farsiQuality.overallQuality}/${this.config.quality.minEducationalValue})`,
        `${lesson.filePath}:contentFa`,
        'Improve content structure, add more examples, and enhance explanations'
      ));
    }
    
    // Check for significant quality disparity between languages
    const qualityDiff = Math.abs(englishQuality.overallQuality - farsiQuality.overallQuality);
    if (qualityDiff > 20) {
      auditResult.addFinding(new AuditFinding(
        'language_inconsistency',
        'medium',
        `Significant quality difference between languages (English: ${englishQuality.overallQuality}, Farsi: ${farsiQuality.overallQuality})`,
        lesson.filePath,
        'Balance content quality between both language versions'
      ));
    }
    
    return { englishQuality, farsiQuality };
  }

  /**
   * Analyze content structure for proper formatting and organization
   */
  analyzeContentStructure(content) {
    const analysis = {
      hasMainHeading: false,
      sectionCount: 0,
      codeBlockCount: 0,
      listCount: 0,
      linkCount: 0,
      imageCount: 0,
      structureIssues: []
    };
    
    if (!content || content.trim().length === 0) {
      analysis.structureIssues.push('Content is empty');
      return analysis;
    }
    
    // Check for main heading
    analysis.hasMainHeading = /^#\s+/.test(content);
    if (!analysis.hasMainHeading) {
      analysis.structureIssues.push('Missing main heading (# )');
    }
    
    // Count sections
    const sections = content.match(/^##\s+/gm);
    analysis.sectionCount = sections ? sections.length : 0;
    if (analysis.sectionCount < 2) {
      analysis.structureIssues.push('Insufficient section organization');
    }
    
    // Count code blocks
    const codeBlocks = content.match(/```[\s\S]*?```/g);
    analysis.codeBlockCount = codeBlocks ? codeBlocks.length : 0;
    
    // Count lists
    const lists = content.match(/^[\s]*[-*+]\s+/gm);
    analysis.listCount = lists ? lists.length : 0;
    
    // Count links
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);
    analysis.linkCount = links ? links.length : 0;
    
    // Count images
    const images = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);
    analysis.imageCount = images ? images.length : 0;
    
    // Check for very long lines (readability issue)
    const lines = content.split('\n');
    const longLines = lines.filter(line => line.length > 120);
    if (longLines.length > 0) {
      analysis.structureIssues.push(`${longLines.length} lines exceed recommended length`);
    }
    
    // Check for proper code block language specification
    if (codeBlocks) {
      const unspecifiedBlocks = codeBlocks.filter(block => /^```\s*\n/.test(block));
      if (unspecifiedBlocks.length > 0) {
        analysis.structureIssues.push(`${unspecifiedBlocks.length} code blocks missing language specification`);
      }
    }
    
    return analysis;
  }

  /**
   * Generate quality validation report
   */
  generateQualityReport(lessons) {
    const report = {
      timestamp: new Date().toISOString(),
      totalLessons: lessons.length,
      qualityMetrics: {
        averageReadability: 0,
        averageExplanationDepth: 0,
        averageEducationalValue: 0,
        averageStructureScore: 0,
        averageOverallQuality: 0
      },
      qualityDistribution: {
        excellent: 0, // 90-100
        good: 0,      // 75-89
        fair: 0,      // 60-74
        poor: 0       // <60
      },
      lessonQuality: []
    };
    
    let totalReadability = 0;
    let totalExplanationDepth = 0;
    let totalEducationalValue = 0;
    let totalStructureScore = 0;
    let totalOverallQuality = 0;
    
    lessons.forEach(lesson => {
      const englishQuality = this.assessContentQuality(lesson.content);
      const farsiQuality = this.assessContentQuality(lesson.contentFa);
      
      // Use average of both languages for overall metrics
      const avgQuality = {
        readabilityScore: Math.round((englishQuality.readabilityScore + farsiQuality.readabilityScore) / 2),
        explanationDepth: Math.round((englishQuality.explanationDepth + farsiQuality.explanationDepth) / 2),
        educationalValue: Math.round((englishQuality.educationalValue + farsiQuality.educationalValue) / 2),
        structureScore: Math.round((englishQuality.structureScore + farsiQuality.structureScore) / 2),
        overallQuality: Math.round((englishQuality.overallQuality + farsiQuality.overallQuality) / 2)
      };
      
      totalReadability += avgQuality.readabilityScore;
      totalExplanationDepth += avgQuality.explanationDepth;
      totalEducationalValue += avgQuality.educationalValue;
      totalStructureScore += avgQuality.structureScore;
      totalOverallQuality += avgQuality.overallQuality;
      
      // Categorize quality
      if (avgQuality.overallQuality >= 90) report.qualityDistribution.excellent++;
      else if (avgQuality.overallQuality >= 75) report.qualityDistribution.good++;
      else if (avgQuality.overallQuality >= 60) report.qualityDistribution.fair++;
      else report.qualityDistribution.poor++;
      
      report.lessonQuality.push({
        lessonId: lesson.id,
        englishQuality,
        farsiQuality,
        averageQuality: avgQuality
      });
    });
    
    // Calculate averages
    if (lessons.length > 0) {
      report.qualityMetrics.averageReadability = Math.round(totalReadability / lessons.length);
      report.qualityMetrics.averageExplanationDepth = Math.round(totalExplanationDepth / lessons.length);
      report.qualityMetrics.averageEducationalValue = Math.round(totalEducationalValue / lessons.length);
      report.qualityMetrics.averageStructureScore = Math.round(totalStructureScore / lessons.length);
      report.qualityMetrics.averageOverallQuality = Math.round(totalOverallQuality / lessons.length);
    }
    
    return report;
  }

  /**
   * Generate comprehensive quality validation report
   */
  async generateValidationReport(lessons, outputPath) {
    const report = this.generateQualityReport(lessons);
    
    // Add detailed validation results
    report.validationResults = {
      passedLessons: [],
      failedLessons: [],
      warningLessons: []
    };
    
    report.lessonQuality.forEach(lessonQuality => {
      const { lessonId, averageQuality } = lessonQuality;
      
      if (averageQuality.overallQuality >= this.config.quality.minEducationalValue) {
        report.validationResults.passedLessons.push({
          lessonId,
          score: averageQuality.overallQuality,
          status: 'passed'
        });
      } else if (averageQuality.overallQuality >= 50) {
        report.validationResults.warningLessons.push({
          lessonId,
          score: averageQuality.overallQuality,
          status: 'warning',
          issues: this.identifyQualityIssues(lessonQuality)
        });
      } else {
        report.validationResults.failedLessons.push({
          lessonId,
          score: averageQuality.overallQuality,
          status: 'failed',
          issues: this.identifyQualityIssues(lessonQuality)
        });
      }
    });
    
    // Generate improvement metrics
    report.improvementMetrics = this.generateImprovementMetrics(report);
    
    // Save report if output path provided
    if (outputPath) {
      const fs = await import('fs-extra');
      const path = await import('path');
      
      await fs.ensureDir(outputPath);
      const reportPath = path.join(outputPath, `quality-validation-${Date.now()}.json`);
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`Quality validation report saved: ${reportPath}`);
    }
    
    return report;
  }

  /**
   * Identify specific quality issues for a lesson
   */
  identifyQualityIssues(lessonQuality) {
    const issues = [];
    const { englishQuality, farsiQuality, averageQuality } = lessonQuality;
    
    if (averageQuality.readabilityScore < 60) {
      issues.push('Poor readability - simplify sentence structure');
    }
    
    if (averageQuality.explanationDepth < 50) {
      issues.push('Insufficient explanation depth - add more detailed explanations');
    }
    
    if (averageQuality.educationalValue < 60) {
      issues.push('Low educational value - add more practical examples and learning elements');
    }
    
    if (averageQuality.structureScore < 50) {
      issues.push('Poor content structure - improve organization and formatting');
    }
    
    // Check for language-specific issues
    const qualityDiff = Math.abs(englishQuality.overallQuality - farsiQuality.overallQuality);
    if (qualityDiff > 20) {
      issues.push('Significant quality difference between languages');
    }
    
    return issues;
  }

  /**
   * Generate improvement metrics and recommendations
   */
  generateImprovementMetrics(report) {
    const metrics = {
      overallHealthScore: 0,
      priorityAreas: [],
      estimatedEffort: {
        low: 0,
        medium: 0,
        high: 0
      },
      recommendations: []
    };
    
    // Calculate overall health score
    const totalLessons = report.totalLessons;
    const passedCount = report.validationResults.passedLessons.length;
    const warningCount = report.validationResults.warningLessons.length;
    const failedCount = report.validationResults.failedLessons.length;
    
    metrics.overallHealthScore = Math.round(
      ((passedCount * 100) + (warningCount * 60) + (failedCount * 20)) / totalLessons
    );
    
    // Identify priority areas
    if (report.qualityMetrics.averageReadability < 60) {
      metrics.priorityAreas.push('Readability improvement');
    }
    if (report.qualityMetrics.averageExplanationDepth < 60) {
      metrics.priorityAreas.push('Content depth enhancement');
    }
    if (report.qualityMetrics.averageEducationalValue < 70) {
      metrics.priorityAreas.push('Educational value improvement');
    }
    if (report.qualityMetrics.averageStructureScore < 60) {
      metrics.priorityAreas.push('Content structure organization');
    }
    
    // Estimate effort required
    metrics.estimatedEffort.high = failedCount;
    metrics.estimatedEffort.medium = warningCount;
    metrics.estimatedEffort.low = Math.max(0, totalLessons - failedCount - warningCount - passedCount);
    
    // Generate recommendations
    if (failedCount > 0) {
      metrics.recommendations.push(`${failedCount} lessons require major quality improvements`);
    }
    if (warningCount > 0) {
      metrics.recommendations.push(`${warningCount} lessons need minor quality enhancements`);
    }
    if (metrics.overallHealthScore < 70) {
      metrics.recommendations.push('Overall content quality is below acceptable standards');
    }
    if (report.qualityDistribution.poor > totalLessons * 0.2) {
      metrics.recommendations.push('More than 20% of lessons have poor quality - systematic review needed');
    }
    
    return metrics;
  }

  /**
   * Generate quality improvement plan
   */
  generateImprovementPlan(validationReport) {
    const plan = {
      timestamp: new Date().toISOString(),
      phases: [],
      totalEstimatedHours: 0,
      priorityOrder: []
    };
    
    // Phase 1: Critical fixes
    if (validationReport.validationResults.failedLessons.length > 0) {
      plan.phases.push({
        phase: 1,
        name: 'Critical Quality Fixes',
        description: 'Address lessons with failing quality scores',
        lessons: validationReport.validationResults.failedLessons.map(l => l.lessonId),
        estimatedHours: validationReport.validationResults.failedLessons.length * 3,
        priority: 'high'
      });
    }
    
    // Phase 2: Warning fixes
    if (validationReport.validationResults.warningLessons.length > 0) {
      plan.phases.push({
        phase: 2,
        name: 'Quality Improvements',
        description: 'Enhance lessons with warning-level quality issues',
        lessons: validationReport.validationResults.warningLessons.map(l => l.lessonId),
        estimatedHours: validationReport.validationResults.warningLessons.length * 1.5,
        priority: 'medium'
      });
    }
    
    // Phase 3: Optimization
    plan.phases.push({
      phase: 3,
      name: 'Quality Optimization',
      description: 'Optimize all lessons to achieve excellent quality scores',
      lessons: validationReport.validationResults.passedLessons.map(l => l.lessonId),
      estimatedHours: validationReport.validationResults.passedLessons.length * 0.5,
      priority: 'low'
    });
    
    plan.totalEstimatedHours = plan.phases.reduce((total, phase) => total + phase.estimatedHours, 0);
    plan.priorityOrder = plan.phases.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    return plan;
  }
}