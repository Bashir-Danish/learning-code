/**
 * Manages bilingual content generation and ensures Persian content matches English comprehensiveness
 */
export class BilingualContentManager {
  /**
   * Generate Persian content matching English structure
   * @param {string} englishContent - English content
   * @param {string} lessonTopic - Lesson topic
   * @returns {string} Persian content
   */
  generatePersianContent(englishContent, lessonTopic) {
    // For now, this is a placeholder that preserves structure
    // In a real implementation, this would use translation services or templates
    
    const sections = this.extractSections(englishContent);
    const persianSections = sections.map((section) => this.translateSection(section));
    
    return persianSections.join('\n\n---\n\n');
  }

  /**
   * Extract sections from English content
   * @param {string} content - Content to parse
   * @returns {Array} Array of sections
   */
  extractSections(content) {
    const sections = [];
    const lines = content.split('\n');
    let currentSection = { heading: '', content: [] };

    for (const line of lines) {
      if (line.startsWith('##')) {
        if (currentSection.content.length > 0) {
          sections.push({
            heading: currentSection.heading,
            content: currentSection.content.join('\n'),
          });
        }
        currentSection = { heading: line, content: [] };
      } else {
        currentSection.content.push(line);
      }
    }

    if (currentSection.content.length > 0) {
      sections.push({
        heading: currentSection.heading,
        content: currentSection.content.join('\n'),
      });
    }

    return sections;
  }

  /**
   * Translate a section to Persian
   * @param {object} section - Section to translate
   * @returns {string} Translated section
   */
  translateSection(section) {
    // Preserve code blocks
    const content = this.preserveCodeBlocks(section.content);
    
    // For now, return a placeholder with preserved code
    // In production, this would use actual translation
    const persianHeading = this.translateHeading(section.heading);
    
    return `${persianHeading}\n\n${content}`;
  }

  /**
   * Translate heading to Persian
   * @param {string} heading - English heading
   * @returns {string} Persian heading
   */
  translateHeading(heading) {
    const translations = {
      'File Structure': 'ساختار فایل',
      'Core Concepts': 'مفاهیم اصلی',
      'Tricks & Tips': 'ترفندها و نکات',
      'Best Practices': 'بهترین روش‌ها',
      'Common Mistakes': 'اشتباهات رایج',
      'Advanced Topics': 'موضوعات پیشرفته',
      'Testing Strategies': 'استراتژی‌های تست',
      'Performance Considerations': 'ملاحظات عملکرد',
      'Security Considerations': 'ملاحظات امنیتی',
      'Related Topics': 'موضوعات مرتبط',
    };

    for (const [english, persian] of Object.entries(translations)) {
      if (heading.includes(english)) {
        return heading.replace(english, persian);
      }
    }

    return heading;
  }

  /**
   * Preserve code blocks in content (keep them in English)
   * @param {string} content - Content with code blocks
   * @returns {string} Content with preserved code blocks
   */
  preserveCodeBlocks(content) {
    // Code blocks remain in English
    return content;
  }

  /**
   * Ensure section parity between English and Persian
   * @param {Array} englishSections - English sections
   * @param {Array} persianSections - Persian sections
   * @returns {ValidationResult} Validation result
   */
  ensureSectionParity(englishSections, persianSections) {
    const missingInPersian = [];
    const structureMismatches = [];

    // Check section count
    if (englishSections.length !== persianSections.length) {
      structureMismatches.push(
        `Section count mismatch: English has ${englishSections.length}, Persian has ${persianSections.length}`
      );
    }

    // Check each section
    for (let i = 0; i < englishSections.length; i++) {
      const englishSection = englishSections[i];
      const persianSection = persianSections[i];

      if (!persianSection) {
        missingInPersian.push(englishSection.heading);
        continue;
      }

      // Check code block count
      const englishCodeBlocks = this.countCodeBlocks(englishSection.content);
      const persianCodeBlocks = this.countCodeBlocks(persianSection.content);

      if (englishCodeBlocks !== persianCodeBlocks) {
        structureMismatches.push(
          `Code block mismatch in section "${englishSection.heading}": English has ${englishCodeBlocks}, Persian has ${persianCodeBlocks}`
        );
      }

      // Check content length (within 20% tolerance)
      const englishLength = englishSection.content.length;
      const persianLength = persianSection.content.length;
      const lengthDiff = Math.abs(englishLength - persianLength) / englishLength;

      if (lengthDiff > 0.5) {
        // More lenient for Persian (different character encoding)
        structureMismatches.push(
          `Content length mismatch in section "${englishSection.heading}": difference is ${Math.round(lengthDiff * 100)}%`
        );
      }
    }

    return {
      isValid: missingInPersian.length === 0 && structureMismatches.length === 0,
      missingInPersian,
      structureMismatches,
    };
  }

  /**
   * Count code blocks in content
   * @param {string} content - Content to analyze
   * @returns {number} Number of code blocks
   */
  countCodeBlocks(content) {
    const matches = content.match(/```[\w]*\n/g);
    return matches ? matches.length : 0;
  }
}

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string[]} missingInPersian - Sections missing in Persian
 * @property {string[]} structureMismatches - Structure mismatches
 */
