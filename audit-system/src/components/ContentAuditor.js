/**
 * Content Auditor - Systematic analysis of lesson content for completeness and structure
 */

import { AuditResult, AuditFinding } from '../models/Lesson.js';
import auditConfig from '../../config/audit-config.js';

export class ContentAuditor {
  constructor() {
    this.config = auditConfig;
  }

  /**
   * Perform comprehensive audit across all lessons
   */
  async auditAllLessons(lessons) {
    console.log(`Starting audit of ${lessons.length} lessons...`);
    const auditResults = [];

    for (const lesson of lessons) {
      try {
        const result = await this.auditLesson(lesson);
        auditResults.push(result);
      } catch (error) {
        console.error(`Error auditing lesson ${lesson.id}:`, error);
        const errorResult = new AuditResult(lesson.id);
        errorResult.addFinding(new AuditFinding(
          'audit_error',
          'critical',
          `Failed to audit lesson: ${error.message}`,
          lesson.filePath,
          'Review lesson file structure and content'
        ));
        auditResults.push(errorResult);
      }
    }

    console.log(`Audit completed. ${auditResults.length} lessons audited.`);
    return auditResults;
  }

  /**
   * Audit a single lesson
   */
  async auditLesson(lesson) {
    const auditResult = new AuditResult(lesson.id);

    // Validate content exists
    this.validateContentExists(lesson, auditResult);

    // Analyze content length disparities
    this.analyzeContentLength(lesson, auditResult);

    // Identify structural issues
    this.identifyStructuralIssues(lesson, auditResult);

    // Validate required sections
    this.validateRequiredSections(lesson, auditResult);

    // Check code examples
    this.validateCodeExamples(lesson, auditResult);

    // Calculate overall score
    auditResult.calculateOverallScore();

    // Generate recommendations
    this.generateRecommendations(lesson, auditResult);

    return auditResult;
  }

  /**
   * Check for presence of required content fields
   */
  validateContentExists(lesson, auditResult) {
    // Check English content
    if (!lesson.content || lesson.content.trim().length === 0) {
      auditResult.addFinding(new AuditFinding(
        'missing_content',
        'critical',
        'English content is missing or empty',
        `${lesson.filePath}:content`,
        'Add comprehensive English content explaining the React concept'
      ));
    } else if (lesson.content.length < this.config.validation.minContentLength) {
      auditResult.addFinding(new AuditFinding(
        'insufficient_content',
        'high',
        `English content is too short (${lesson.content.length} chars, minimum ${this.config.validation.minContentLength})`,
        `${lesson.filePath}:content`,
        'Expand English content with more detailed explanations and examples'
      ));
    }

    // Check Farsi content
    if (!lesson.contentFa || lesson.contentFa.trim().length === 0) {
      auditResult.addFinding(new AuditFinding(
        'missing_content',
        'critical',
        'Farsi content is missing or empty',
        `${lesson.filePath}:contentFa`,
        'Add comprehensive Farsi content translating and explaining the React concept'
      ));
    } else if (lesson.contentFa.length < this.config.validation.minContentLength) {
      auditResult.addFinding(new AuditFinding(
        'insufficient_content',
        'high',
        `Farsi content is too short (${lesson.contentFa.length} chars, minimum ${this.config.validation.minContentLength})`,
        `${lesson.filePath}:contentFa`,
        'Expand Farsi content with more detailed explanations and examples'
      ));
    }

    // Check essential metadata
    if (!lesson.title || lesson.title.trim().length === 0) {
      auditResult.addFinding(new AuditFinding(
        'missing_metadata',
        'medium',
        'English title is missing',
        `${lesson.filePath}:title`,
        'Add descriptive English title'
      ));
    }

    if (!lesson.titleFa || lesson.titleFa.trim().length === 0) {
      auditResult.addFinding(new AuditFinding(
        'missing_metadata',
        'medium',
        'Farsi title is missing',
        `${lesson.filePath}:titleFa`,
        'Add descriptive Farsi title'
      ));
    }
  }

  /**
   * Compare content length between languages
   */
  analyzeContentLength(lesson, auditResult) {
    if (lesson.content && lesson.contentFa) {
      const ratio = lesson.getContentLengthRatio();
      
      if (ratio > this.config.validation.maxLanguageRatio) {
        auditResult.addFinding(new AuditFinding(
          'language_inconsistency',
          'medium',
          `English content is significantly longer than Farsi (ratio: ${ratio.toFixed(2)})`,
          `${lesson.filePath}:contentFa`,
          'Expand Farsi content to match English comprehensiveness'
        ));
      } else if (ratio < this.config.validation.minLanguageRatio) {
        auditResult.addFinding(new AuditFinding(
          'language_inconsistency',
          'medium',
          `Farsi content is significantly longer than English (ratio: ${ratio.toFixed(2)})`,
          `${lesson.filePath}:content`,
          'Expand English content to match Farsi comprehensiveness'
        ));
      }
    }
  }

  /**
   * Detect formatting and organization problems
   */
  identifyStructuralIssues(lesson, auditResult) {
    // Check for proper markdown structure in English content
    if (lesson.content) {
      this.checkMarkdownStructure(lesson.content, 'content', lesson, auditResult);
    }

    // Check for proper markdown structure in Farsi content
    if (lesson.contentFa) {
      this.checkMarkdownStructure(lesson.contentFa, 'contentFa', lesson, auditResult);
    }
  }

  /**
   * Check markdown structure and formatting
   */
  checkMarkdownStructure(content, field, lesson, auditResult) {
    // Check for main heading
    if (!content.includes('# ')) {
      auditResult.addFinding(new AuditFinding(
        'structural_problem',
        'medium',
        `${field} lacks main heading (# )`,
        `${lesson.filePath}:${field}`,
        'Add a main heading using # syntax'
      ));
    }

    // Check for section headings
    const sectionCount = (content.match(/## /g) || []).length;
    if (sectionCount < 2) {
      auditResult.addFinding(new AuditFinding(
        'structural_problem',
        'low',
        `${field} has insufficient section organization (${sectionCount} sections)`,
        `${lesson.filePath}:${field}`,
        'Add more section headings (##) to organize content better'
      ));
    }

    // Check for code blocks
    const codeBlockCount = (content.match(/```/g) || []).length / 2;
    if (codeBlockCount < this.config.validation.minCodeExamples) {
      auditResult.addFinding(new AuditFinding(
        'insufficient_examples',
        'medium',
        `${field} has insufficient code examples (${codeBlockCount}, minimum ${this.config.validation.minCodeExamples})`,
        `${lesson.filePath}:${field}`,
        'Add more practical code examples with proper syntax highlighting'
      ));
    }
  }

  /**
   * Validate required sections exist
   */
  validateRequiredSections(lesson, auditResult) {
    const requiredSections = this.config.quality.requiredSections;

    // Check English content
    if (lesson.content) {
      this.checkRequiredSections(lesson.content, 'content', requiredSections, lesson, auditResult);
    }

    // Check Farsi content
    if (lesson.contentFa) {
      this.checkRequiredSections(lesson.contentFa, 'contentFa', requiredSections, lesson, auditResult);
    }
  }

  /**
   * Check if required sections exist in content
   */
  checkRequiredSections(content, field, requiredSections, lesson, auditResult) {
    const missingSections = [];

    for (const section of requiredSections) {
      // Check for section as heading or bold text
      const sectionRegex = new RegExp(`(##\\s*${section}|\\*\\*${section}\\*\\*)`, 'i');
      if (!sectionRegex.test(content)) {
        missingSections.push(section);
      }
    }

    if (missingSections.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'missing_sections',
        'medium',
        `${field} missing required sections: ${missingSections.join(', ')}`,
        `${lesson.filePath}:${field}`,
        `Add missing sections: ${missingSections.join(', ')}`
      ));
    }
  }

  /**
   * Validate code examples in the lesson
   */
  validateCodeExamples(lesson, auditResult) {
    const codeExamples = lesson.extractCodeExamples();

    // Check if both languages have similar number of code examples
    if (codeExamples.english.length !== codeExamples.farsi.length) {
      const diff = Math.abs(codeExamples.english.length - codeExamples.farsi.length);
      auditResult.addFinding(new AuditFinding(
        'language_inconsistency',
        'medium',
        `Code example count mismatch between languages (English: ${codeExamples.english.length}, Farsi: ${codeExamples.farsi.length})`,
        lesson.filePath,
        'Ensure both language versions have equivalent code examples'
      ));
    }

    // Validate individual code examples
    this.validateCodeBlocks(codeExamples.english, 'English', lesson, auditResult);
    this.validateCodeBlocks(codeExamples.farsi, 'Farsi', lesson, auditResult);
  }

  /**
   * Validate individual code blocks
   */
  validateCodeBlocks(codeBlocks, language, lesson, auditResult) {
    codeBlocks.forEach((block, index) => {
      // Check for empty code blocks
      if (!block.code || block.code.trim().length === 0) {
        auditResult.addFinding(new AuditFinding(
          'empty_code_block',
          'medium',
          `Empty code block found in ${language} content (block ${index + 1})`,
          lesson.filePath,
          'Remove empty code blocks or add meaningful code examples'
        ));
      }

      // Check for very short code examples
      if (block.code && block.code.trim().length < 20) {
        auditResult.addFinding(new AuditFinding(
          'insufficient_code',
          'low',
          `Very short code example in ${language} content (block ${index + 1})`,
          lesson.filePath,
          'Expand code examples to be more comprehensive and educational'
        ));
      }

      // Check for proper language specification
      if (!block.language || block.language === '') {
        auditResult.addFinding(new AuditFinding(
          'missing_syntax_highlighting',
          'low',
          `Code block missing language specification in ${language} content (block ${index + 1})`,
          lesson.filePath,
          'Add language specification to code blocks (e.g., ```jsx)'
        ));
      }
    });
  }

  /**
   * Generate actionable recommendations based on findings
   */
  generateRecommendations(lesson, auditResult) {
    const findings = auditResult.findings;
    const recommendations = [];

    // Group findings by type
    const findingsByType = findings.reduce((acc, finding) => {
      acc[finding.type] = (acc[finding.type] || 0) + 1;
      return acc;
    }, {});

    // Generate specific recommendations
    if (findingsByType.missing_content) {
      recommendations.push('Priority: Add missing content sections to ensure comprehensive coverage');
    }

    if (findingsByType.language_inconsistency) {
      recommendations.push('Balance content between English and Farsi versions for equivalent learning experience');
    }

    if (findingsByType.structural_problem) {
      recommendations.push('Improve content organization with proper headings and sections');
    }

    if (findingsByType.insufficient_examples) {
      recommendations.push('Add more practical code examples to enhance learning');
    }

    if (auditResult.overallScore < 70) {
      recommendations.push('This lesson requires significant improvement before publication');
    } else if (auditResult.overallScore < 85) {
      recommendations.push('This lesson needs minor improvements to meet quality standards');
    }

    auditResult.recommendations = recommendations;
  }

  /**
   * Generate summary statistics for all audit results
   */
  generateAuditSummary(auditResults) {
    const summary = {
      totalLessons: auditResults.length,
      averageScore: 0,
      scoreDistribution: { excellent: 0, good: 0, fair: 0, poor: 0 },
      findingsByType: {},
      findingsBySeverity: {},
      lessonsNeedingAttention: []
    };

    let totalScore = 0;

    auditResults.forEach(result => {
      totalScore += result.overallScore;

      // Categorize by score
      if (result.overallScore >= 90) summary.scoreDistribution.excellent++;
      else if (result.overallScore >= 75) summary.scoreDistribution.good++;
      else if (result.overallScore >= 60) summary.scoreDistribution.fair++;
      else summary.scoreDistribution.poor++;

      // Count findings by type and severity
      result.findings.forEach(finding => {
        summary.findingsByType[finding.type] = (summary.findingsByType[finding.type] || 0) + 1;
        summary.findingsBySeverity[finding.severity] = (summary.findingsBySeverity[finding.severity] || 0) + 1;
      });

      // Track lessons needing attention
      if (result.overallScore < 75 || result.findings.some(f => f.severity === 'critical')) {
        summary.lessonsNeedingAttention.push({
          lessonId: result.lessonId,
          score: result.overallScore,
          criticalIssues: result.findings.filter(f => f.severity === 'critical').length
        });
      }
    });

    summary.averageScore = auditResults.length > 0 ? Math.round(totalScore / auditResults.length) : 0;

    return summary;
  }
}