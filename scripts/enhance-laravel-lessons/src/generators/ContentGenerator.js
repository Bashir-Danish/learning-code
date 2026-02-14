import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generates comprehensive enhanced content for Laravel lessons
 */
export class ContentGenerator {
  constructor() {
    this.fileStructures = null;
    this.laravelReference = null;
  }

  /**
   * Load reference data
   */
  async loadReferenceData() {
    const dataDir = path.join(__dirname, '../../data');
    this.fileStructures = await fs.readJson(path.join(dataDir, 'file-structures.json'));
    this.laravelReference = await fs.readJson(path.join(dataDir, 'laravel-reference.json'));
  }

  /**
   * Generate complete enhanced content
   * @param {string} currentContent - Current lesson content
   * @param {string} lessonTopic - Lesson topic/ID
   * @param {object} metadata - Lesson metadata
   * @returns {EnhancedContent} Enhanced content
   */
  async generateEnhancedContent(currentContent, lessonTopic, metadata) {
    if (!this.fileStructures) {
      await this.loadReferenceData();
    }

    const sections = [];

    // Introduction (keep existing or enhance)
    sections.push(this.generateIntroSection(currentContent, lessonTopic));

    // File Structure
    sections.push(this.generateFileStructureSection(lessonTopic));

    // Core Concepts (enhance existing)
    sections.push(this.generateCoreConcepts(currentContent, lessonTopic));

    // Tricks & Tips
    sections.push(this.generateTricksSection(lessonTopic));

    // Best Practices
    sections.push(this.generateBestPracticesSection(lessonTopic));

    // Common Mistakes
    sections.push(this.generateCommonMistakesSection(lessonTopic));

    // Advanced Topics
    sections.push(this.generateAdvancedTopicsSection(lessonTopic));

    // Testing Strategies
    sections.push(this.generateTestingSection(lessonTopic));

    // Performance Considerations
    sections.push(this.generatePerformanceSection(lessonTopic));

    // Security Considerations
    sections.push(this.generateSecuritySection(lessonTopic));

    // Related Topics
    sections.push(this.generateRelatedTopicsSection(lessonTopic));

    const fullMarkdown = sections.map((s) => s.content).join('\n\n---\n\n');
    const codeExampleCount = this.countCodeBlocks(fullMarkdown);
    const estimatedTime = this.calculateEstimatedTime(metadata.estimatedTime, fullMarkdown);

    return {
      sections,
      fullMarkdown,
      estimatedTime,
      codeExampleCount,
    };
  }

  /**
   * Generate introduction section
   */
  generateIntroSection(currentContent, lessonTopic) {
    // Extract existing intro or create new one
    const lines = currentContent.split('\n');
    const firstHeading = lines.findIndex((l) => l.startsWith('##'));
    const intro = firstHeading > 0 ? lines.slice(0, firstHeading).join('\n') : currentContent;

    return {
      heading: '',
      level: 0,
      content: intro.trim(),
      codeBlocks: [],
    };
  }

  /**
   * Generate file structure section
   */
  generateFileStructureSection(lessonTopic) {
    let structureKey = 'freshLaravel11';
    let content = `## File Structure\n\n`;

    // Determine which structure to show based on lesson topic
    if (lessonTopic.includes('routing')) {
      structureKey = 'apiRoutes';
      content += `### Routing Files\n\n`;
    } else if (lessonTopic.includes('controller')) {
      structureKey = 'controllers';
      content += `### Controller Organization\n\n`;
    } else if (lessonTopic.includes('intro') || lessonTopic.includes('structure')) {
      content += `### Fresh Laravel 11/12 Installation\n\n`;
    }

    const structure = this.fileStructures[structureKey];
    if (structure) {
      content += '```\n' + structure.tree + '\n```\n\n';
      content += `### Directory Explanations\n\n`;

      for (const [dir, explanation] of Object.entries(structure.explanations)) {
        content += `- \`${dir}\`: ${explanation}\n`;
      }
    }

    // Add Laravel 11 changes if relevant
    if (lessonTopic.includes('intro') || lessonTopic.includes('structure')) {
      content += `\n### Laravel 11 Structural Changes\n\n`;
      for (const change of this.laravelReference.laravel11Changes) {
        content += `**${change.feature}**: ${change.description}\n\n`;
        content += `${change.details}\n\n`;
      }
    }

    return {
      heading: 'File Structure',
      level: 2,
      content,
      codeBlocks: [{ language: 'text', code: structure?.tree || '', explanation: 'Directory structure' }],
    };
  }

  /**
   * Generate core concepts section
   */
  generateCoreConcepts(currentContent, lessonTopic) {
    // Extract existing core concepts or create placeholder
    let content = `## Core Concepts\n\n`;
    content += `[This section will be enhanced with detailed explanations and multiple code examples]\n\n`;
    content += `### Basic Example\n\n`;
    content += '```php\n<?php\n// Basic example code\n```\n\n';
    content += `### Advanced Example\n\n`;
    content += '```php\n<?php\n// Advanced example code\n```\n\n';

    return {
      heading: 'Core Concepts',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate tricks & tips section
   */
  generateTricksSection(lessonTopic) {
    let content = `## Tricks & Tips\n\n`;
    content += `### Tip 1: Use Laravel Helpers\n\n`;
    content += `Laravel provides many helper functions that simplify common tasks.\n\n`;
    content += '```php\n// Example helper usage\n```\n\n';
    content += `**Why this works:** Helpers are optimized and tested.\n\n`;
    content += `**When to use:** For common operations like array manipulation, string formatting.\n\n`;

    return {
      heading: 'Tricks & Tips',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate best practices section
   */
  generateBestPracticesSection(lessonTopic) {
    let content = `## Best Practices\n\n`;

    // Add general best practices
    for (const practice of this.laravelReference.bestPractices.general.slice(0, 3)) {
      content += `### ${practice.title}\n\n`;
      content += `${practice.description}\n\n`;
      content += `**Reasoning:** ${practice.reasoning}\n\n`;
      content += '```php\n// Good example\n```\n\n';
      content += `❌ **Avoid:**\n`;
      content += '```php\n// Bad example\n```\n\n';
    }

    return {
      heading: 'Best Practices',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate common mistakes section
   */
  generateCommonMistakesSection(lessonTopic) {
    let content = `## Common Mistakes\n\n`;

    // Add general common mistakes
    for (const mistake of this.laravelReference.commonMistakes.general.slice(0, 5)) {
      content += `### Mistake: ${mistake.mistake}\n\n`;
      content += `**Problem:** ${mistake.why}\n\n`;
      content += `❌ **Incorrect:**\n`;
      content += '```php\n// Wrong approach\n```\n\n';
      content += `✅ **Correct:**\n`;
      content += '```php\n// Right approach\n```\n\n';
      content += `**Solution:** ${mistake.correctApproach}\n\n`;
    }

    return {
      heading: 'Common Mistakes',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate advanced topics section
   */
  generateAdvancedTopicsSection(lessonTopic) {
    let content = `## Advanced Topics\n\n`;
    content += `### Advanced Pattern 1\n\n`;
    content += `[Detailed explanation for advanced users]\n\n`;
    content += '```php\n// Advanced code example\n```\n\n';

    return {
      heading: 'Advanced Topics',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate testing strategies section
   */
  generateTestingSection(lessonTopic) {
    let content = `## Testing Strategies\n\n`;
    content += `### Feature Tests\n\n`;
    content += '```php\n// Feature test example\n```\n\n';
    content += `### Unit Tests\n\n`;
    content += '```php\n// Unit test example\n```\n\n';

    return {
      heading: 'Testing Strategies',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate performance considerations section
   */
  generatePerformanceSection(lessonTopic) {
    let content = `## Performance Considerations\n\n`;
    content += `- Use eager loading to avoid N+1 queries\n`;
    content += `- Cache frequently accessed data\n`;
    content += `- Use database indexes appropriately\n`;
    content += `- Optimize query complexity\n\n`;

    return {
      heading: 'Performance Considerations',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate security considerations section
   */
  generateSecuritySection(lessonTopic) {
    let content = `## Security Considerations\n\n`;
    content += `- Always use environment variables for sensitive data\n`;
    content += `- Validate and sanitize user input\n`;
    content += `- Use Laravel's built-in security features (CSRF, XSS protection)\n`;
    content += `- Implement proper authentication and authorization\n\n`;

    return {
      heading: 'Security Considerations',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Generate related topics section
   */
  generateRelatedTopicsSection(lessonTopic) {
    let content = `## Related Topics\n\n`;
    content += `- [Laravel Official Documentation](https://laravel.com/docs)\n`;
    content += `- [Laravel News](https://laravel-news.com)\n`;
    content += `- [Laracasts](https://laracasts.com)\n\n`;

    return {
      heading: 'Related Topics',
      level: 2,
      content,
      codeBlocks: [],
    };
  }

  /**
   * Count code blocks in markdown
   */
  countCodeBlocks(markdown) {
    const matches = markdown.match(/```[\w]*\n/g);
    return matches ? matches.length : 0;
  }

  /**
   * Calculate new estimated time
   */
  calculateEstimatedTime(currentTime, enhancedContent) {
    // Parse current time (e.g., "75 min")
    const match = currentTime.match(/(\d+)/);
    const currentMinutes = match ? parseInt(match[1]) : 60;

    // Calculate based on content length and complexity
    const wordCount = enhancedContent.split(/\s+/).length;
    const codeBlockCount = this.countCodeBlocks(enhancedContent);

    // Estimate: 200 words per minute reading + 2 minutes per code example
    const estimatedMinutes = Math.ceil(wordCount / 200 + codeBlockCount * 2);

    // Ensure at least 150% of original time
    const minimumTime = Math.ceil(currentMinutes * 1.5);
    const finalTime = Math.max(estimatedMinutes, minimumTime);

    return `${finalTime} min`;
  }
}

/**
 * @typedef {Object} EnhancedContent
 * @property {ContentSection[]} sections - Content sections
 * @property {string} fullMarkdown - Complete markdown content
 * @property {string} estimatedTime - Updated estimated time
 * @property {number} codeExampleCount - Number of code examples
 */

/**
 * @typedef {Object} ContentSection
 * @property {string} heading - Section heading
 * @property {number} level - Heading level (2 for ##, 3 for ###)
 * @property {string} content - Section content
 * @property {CodeBlock[]} codeBlocks - Code blocks in section
 */

/**
 * @typedef {Object} CodeBlock
 * @property {string} language - Programming language
 * @property {string} code - Code content
 * @property {string} explanation - Code explanation
 */
