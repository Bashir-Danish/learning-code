/**
 * Analyzes lesson content to identify gaps and enhancement opportunities
 */
export class ContentAnalyzer {
  /**
   * Required sections for comprehensive lessons
   */
  static REQUIRED_SECTIONS = [
    'File Structure',
    'Core Concepts',
    'Tricks & Tips',
    'Best Practices',
    'Common Mistakes',
    'Advanced Topics',
    'Testing Strategies',
    'Performance Considerations',
    'Security Considerations',
    'Related Topics',
  ];

  /**
   * Analyze content completeness
   * @param {string} content - Lesson content
   * @returns {ContentAnalysis} Analysis results
   */
  analyzeContent(content) {
    const currentSections = this.identifyCurrentSections(content);
    const missingSections = this.identifyMissingSections(currentSections);
    const codeExampleCount = this.countCodeExamples(content);
    const gaps = this.identifyGaps(content);
    
    const estimatedCompleteness = this.calculateCompleteness(
      currentSections.length,
      codeExampleCount,
      gaps.length
    );

    return {
      currentSections,
      missingSections,
      codeExampleCount,
      estimatedCompleteness,
      gaps,
    };
  }

  /**
   * Identify existing sections in content
   * @param {string} content - Lesson content
   * @returns {string[]} Array of section names
   */
  identifyCurrentSections(content) {
    const sections = [];
    const lines = content.split('\n');

    for (const line of lines) {
      // Match ## headings (main sections)
      const match = line.match(/^##\s+(.+)/);
      if (match) {
        const sectionName = match[1].trim();
        // Remove numbering like "1)" or "1."
        const cleanName = sectionName.replace(/^\d+[\)\.]\s*/, '');
        sections.push(cleanName);
      }
    }

    return sections;
  }

  /**
   * Identify missing required sections
   * @param {string[]} currentSections - Current sections in content
   * @returns {string[]} Array of missing section names
   */
  identifyMissingSections(currentSections) {
    const currentLower = currentSections.map((s) => s.toLowerCase());
    
    return ContentAnalyzer.REQUIRED_SECTIONS.filter((required) => {
      const requiredLower = required.toLowerCase();
      return !currentLower.some((current) => current.includes(requiredLower));
    });
  }

  /**
   * Count code examples in content
   * @param {string} content - Lesson content
   * @returns {number} Number of code blocks
   */
  countCodeExamples(content) {
    const codeBlockPattern = /```[\w]*\n/g;
    const matches = content.match(codeBlockPattern);
    return matches ? matches.length : 0;
  }

  /**
   * Identify gaps in content
   * @param {string} content - Lesson content
   * @returns {Gap[]} Array of identified gaps
   */
  identifyGaps(content) {
    const gaps = [];
    const currentSections = this.identifyCurrentSections(content);
    const codeExampleCount = this.countCodeExamples(content);

    // Check for file structure
    if (!this.hasFileStructure(content)) {
      gaps.push({
        category: 'file_structure',
        description: 'Missing file structure section with directory explanations',
        priority: 'high',
      });
    }

    // Check for code examples
    if (codeExampleCount < 5) {
      gaps.push({
        category: 'code_examples',
        description: `Only ${codeExampleCount} code examples found, need more comprehensive examples`,
        priority: 'high',
      });
    }

    // Check for best practices
    if (!this.hasBestPractices(content)) {
      gaps.push({
        category: 'best_practices',
        description: 'Missing best practices section',
        priority: 'high',
      });
    }

    // Check for common mistakes
    if (!this.hasCommonMistakes(content)) {
      gaps.push({
        category: 'common_mistakes',
        description: 'Missing common mistakes section',
        priority: 'high',
      });
    }

    // Check for advanced topics
    if (!this.hasAdvancedTopics(content)) {
      gaps.push({
        category: 'advanced_topics',
        description: 'Missing advanced topics section',
        priority: 'medium',
      });
    }

    return gaps;
  }

  /**
   * Check if content has file structure section
   * @param {string} content - Lesson content
   * @returns {boolean} True if file structure exists
   */
  hasFileStructure(content) {
    return /##\s+.*file\s+structure/i.test(content) || /```\n[\w\/]+\/\n/i.test(content);
  }

  /**
   * Check if content has best practices section
   * @param {string} content - Lesson content
   * @returns {boolean} True if best practices exists
   */
  hasBestPractices(content) {
    return /##\s+.*best\s+practice/i.test(content);
  }

  /**
   * Check if content has common mistakes section
   * @param {string} content - Lesson content
   * @returns {boolean} True if common mistakes exists
   */
  hasCommonMistakes(content) {
    return /##\s+.*common\s+mistake/i.test(content);
  }

  /**
   * Check if content has advanced topics section
   * @param {string} content - Lesson content
   * @returns {boolean} True if advanced topics exists
   */
  hasAdvancedTopics(content) {
    return /##\s+.*advanced/i.test(content);
  }

  /**
   * Calculate content completeness percentage
   * @param {number} sectionCount - Number of sections
   * @param {number} codeExampleCount - Number of code examples
   * @param {number} gapCount - Number of gaps
   * @returns {number} Completeness percentage (0-100)
   */
  calculateCompleteness(sectionCount, codeExampleCount, gapCount) {
    const requiredSectionCount = ContentAnalyzer.REQUIRED_SECTIONS.length;
    const sectionScore = (sectionCount / requiredSectionCount) * 50;
    const codeScore = Math.min((codeExampleCount / 10) * 30, 30);
    const gapPenalty = gapCount * 5;

    const completeness = Math.max(0, Math.min(100, sectionScore + codeScore - gapPenalty));
    return Math.round(completeness);
  }

  /**
   * Assess content depth
   * @param {string} content - Lesson content
   * @returns {DepthAssessment} Depth assessment
   */
  assessDepth(content) {
    const hasFileStructure = this.hasFileStructure(content);
    const hasMultipleExamples = this.countCodeExamples(content) >= 3;
    const hasBestPractices = this.hasBestPractices(content);
    const hasCommonMistakes = this.hasCommonMistakes(content);
    const hasAdvancedTopics = this.hasAdvancedTopics(content);

    let overallDepth = 'shallow';
    const depthScore = [
      hasFileStructure,
      hasMultipleExamples,
      hasBestPractices,
      hasCommonMistakes,
      hasAdvancedTopics,
    ].filter(Boolean).length;

    if (depthScore >= 4) {
      overallDepth = 'comprehensive';
    } else if (depthScore >= 2) {
      overallDepth = 'moderate';
    }

    return {
      hasFileStructure,
      hasMultipleExamples,
      hasBestPractices,
      hasCommonMistakes,
      hasAdvancedTopics,
      overallDepth,
    };
  }
}

/**
 * @typedef {Object} ContentAnalysis
 * @property {string[]} currentSections - Existing sections
 * @property {string[]} missingSections - Missing required sections
 * @property {number} codeExampleCount - Number of code examples
 * @property {number} estimatedCompleteness - Completeness percentage (0-100)
 * @property {Gap[]} gaps - Identified gaps
 */

/**
 * @typedef {Object} Gap
 * @property {string} category - Gap category
 * @property {string} description - Gap description
 * @property {string} priority - Priority level (high, medium, low)
 */

/**
 * @typedef {Object} DepthAssessment
 * @property {boolean} hasFileStructure - Has file structure
 * @property {boolean} hasMultipleExamples - Has multiple examples
 * @property {boolean} hasBestPractices - Has best practices
 * @property {boolean} hasCommonMistakes - Has common mistakes
 * @property {boolean} hasAdvancedTopics - Has advanced topics
 * @property {string} overallDepth - Overall depth (shallow, moderate, comprehensive)
 */
