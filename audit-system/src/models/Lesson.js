/**
 * Core data models for React lessons audit system
 */

/**
 * Represents a React lesson with content in multiple languages
 */
export class Lesson {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.titleFa = data.titleFa;
    this.difficulty = data.difficulty;
    this.estimatedTime = data.estimatedTime;
    this.content = data.content || '';
    this.contentFa = data.contentFa || '';
    this.visualizationId = data.visualizationId;
    this.exerciseId = data.exerciseId;
    this.filePath = data.filePath;
    this.lastModified = data.lastModified || new Date();
  }

  /**
   * Check if lesson has both English and Farsi content
   */
  hasCompleteContent() {
    return this.content.trim().length > 0 && this.contentFa.trim().length > 0;
  }

  /**
   * Get content length ratio (English/Farsi)
   */
  getContentLengthRatio() {
    if (!this.contentFa || this.contentFa.trim().length === 0) return Infinity;
    return this.content.length / this.contentFa.length;
  }

  /**
   * Extract code examples from content
   */
  extractCodeExamples() {
    const codeBlocks = [];
    const englishBlocks = this.extractCodeBlocksFromText(this.content);
    const farsiBlocks = this.extractCodeBlocksFromText(this.contentFa);
    
    return {
      english: englishBlocks,
      farsi: farsiBlocks,
      count: Math.max(englishBlocks.length, farsiBlocks.length)
    };
  }

  extractCodeBlocksFromText(text) {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const blocks = [];
    let match;
    
    while ((match = codeBlockRegex.exec(text)) !== null) {
      blocks.push({
        language: match[1] || 'javascript',
        code: match[2].trim()
      });
    }
    
    return blocks;
  }

  /**
   * Get lesson metadata
   */
  getMetadata() {
    return {
      id: this.id,
      title: this.title,
      difficulty: this.difficulty,
      estimatedTime: this.estimatedTime,
      filePath: this.filePath,
      lastModified: this.lastModified,
      contentLength: this.content.length,
      contentFaLength: this.contentFa.length,
      hasCompleteContent: this.hasCompleteContent(),
      contentRatio: this.getContentLengthRatio()
    };
  }
}

/**
 * Represents an audit finding for a lesson
 */
export class AuditFinding {
  constructor(type, severity, description, location, suggestedFix) {
    this.type = type;
    this.severity = severity;
    this.description = description;
    this.location = location;
    this.suggestedFix = suggestedFix;
    this.timestamp = new Date();
  }
}

/**
 * Represents audit results for a lesson
 */
export class AuditResult {
  constructor(lessonId) {
    this.lessonId = lessonId;
    this.findings = [];
    this.overallScore = 0;
    this.recommendations = [];
    this.timestamp = new Date();
  }

  addFinding(finding) {
    this.findings.push(finding);
  }

  addRecommendation(recommendation) {
    this.recommendations.push(recommendation);
  }

  calculateOverallScore() {
    if (this.findings.length === 0) {
      this.overallScore = 100;
      return this.overallScore;
    }

    const severityWeights = {
      critical: 25,
      high: 15,
      medium: 10,
      low: 5
    };

    let totalDeduction = 0;
    this.findings.forEach(finding => {
      totalDeduction += severityWeights[finding.severity] || 5;
    });

    this.overallScore = Math.max(0, 100 - totalDeduction);
    return this.overallScore;
  }
}

/**
 * Represents a content change during enhancement
 */
export class ContentChange {
  constructor(field, originalValue, enhancedValue, changeReason) {
    this.field = field;
    this.originalValue = originalValue;
    this.enhancedValue = enhancedValue;
    this.changeReason = changeReason;
    this.timestamp = new Date();
  }
}

/**
 * Represents an enhancement record for a lesson
 */
export class EnhancementRecord {
  constructor(lessonId, enhancementType) {
    this.lessonId = lessonId;
    this.changes = [];
    this.enhancementType = enhancementType;
    this.timestamp = new Date();
    this.validator = 'system';
  }

  addChange(change) {
    this.changes.push(change);
  }

  getChangesSummary() {
    return {
      totalChanges: this.changes.length,
      changeTypes: this.changes.reduce((acc, change) => {
        acc[change.field] = (acc[change.field] || 0) + 1;
        return acc;
      }, {}),
      enhancementType: this.enhancementType,
      timestamp: this.timestamp
    };
  }
}