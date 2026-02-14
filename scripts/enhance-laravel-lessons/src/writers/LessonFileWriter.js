import fs from 'fs-extra';
import prettier from 'prettier';

/**
 * Writes enhanced content back to lesson files while preserving structure
 */
export class LessonFileWriter {
  /**
   * Write enhanced lesson to file
   * @param {string} filePath - Path to lesson file
   * @param {object} metadata - Lesson metadata
   * @param {string} enhancedEnglishContent - Enhanced English content
   * @param {string} enhancedPersianContent - Enhanced Persian content
   * @param {boolean} createBackup - Whether to create backup
   */
  async writeEnhancedLesson(
    filePath,
    metadata,
    enhancedEnglishContent,
    enhancedPersianContent,
    createBackup = true
  ) {
    try {
      // Create backup if requested
      if (createBackup) {
        await this.createBackup(filePath);
      }

      // Generate lesson object
      const lessonObject = this.generateLessonObject(
        metadata,
        enhancedEnglishContent,
        enhancedPersianContent
      );

      // Generate export statement
      const exportStatement = this.generateExportStatement(metadata.id, lessonObject);

      // Format with Prettier
      const formatted = await this.formatCode(exportStatement);

      // Write to file
      await fs.writeFile(filePath, formatted, 'utf-8');

      console.log(`✅ Successfully wrote enhanced lesson to ${filePath}`);
    } catch (error) {
      console.error(`Error writing lesson file ${filePath}:`, error.message);
      throw error;
    }
  }

  /**
   * Create backup of original file
   * @param {string} filePath - Path to file
   */
  async createBackup(filePath) {
    const backupPath = `${filePath}.backup`;
    try {
      await fs.copy(filePath, backupPath);
      console.log(`📦 Created backup: ${backupPath}`);
    } catch (error) {
      console.warn(`Warning: Could not create backup for ${filePath}`);
    }
  }

  /**
   * Generate lesson object
   * @param {object} metadata - Lesson metadata
   * @param {string} englishContent - English content
   * @param {string} persianContent - Persian content
   * @returns {object} Lesson object
   */
  generateLessonObject(metadata, englishContent, persianContent) {
    return {
      id: metadata.id,
      title: metadata.title,
      titleFa: metadata.titleFa,
      difficulty: metadata.difficulty,
      estimatedTime: metadata.estimatedTime,
      content: englishContent,
      contentFa: persianContent,
      hasVisualization: metadata.hasVisualization,
      hasExercise: metadata.hasExercise,
    };
  }

  /**
   * Generate export statement
   * @param {string} lessonId - Lesson ID
   * @param {object} lessonObject - Lesson object
   * @returns {string} Export statement
   */
  generateExportStatement(lessonId, lessonObject) {
    // Convert kebab-case to camelCase for variable name
    const variableName = this.toCamelCase(lessonId) + 'Lesson';

    // Escape backticks in content
    const escapedContent = lessonObject.content.replace(/`/g, '\\`');
    const escapedContentFa = lessonObject.contentFa.replace(/`/g, '\\`');

    const code = `export const ${variableName} = {
  id: '${lessonObject.id}',
  title: '${this.escapeString(lessonObject.title)}',
  titleFa: '${this.escapeString(lessonObject.titleFa)}',
  difficulty: '${lessonObject.difficulty}',
  estimatedTime: '${lessonObject.estimatedTime}',

  content: \`
${escapedContent}
\`,

  contentFa: \`
${escapedContentFa}
\`,

  hasVisualization: ${lessonObject.hasVisualization},
  hasExercise: ${lessonObject.hasExercise},
};

export default ${variableName};
`;

    return code;
  }

  /**
   * Convert kebab-case to camelCase
   * @param {string} str - Kebab-case string
   * @returns {string} camelCase string
   */
  toCamelCase(str) {
    return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
  }

  /**
   * Escape string for JavaScript
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeString(str) {
    return str.replace(/'/g, "\\'").replace(/\n/g, '\\n');
  }

  /**
   * Format code with Prettier
   * @param {string} code - Code to format
   * @returns {Promise<string>} Formatted code
   */
  async formatCode(code) {
    try {
      const formatted = await prettier.format(code, {
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
      });
      return formatted;
    } catch (error) {
      console.warn('Warning: Prettier formatting failed, using unformatted code');
      return code;
    }
  }

  /**
   * Validate output file
   * @param {string} filePath - Path to file
   * @returns {Promise<ValidationResult>} Validation result
   */
  async validateOutputFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');

      // Check if file has valid export
      const hasExport = /export const \w+Lesson = {/.test(content);
      const hasDefaultExport = /export default \w+Lesson;/.test(content);

      // Check if file has required fields
      const hasId = /id: '[\w-]+'/.test(content);
      const hasTitle = /title: '.+'/.test(content);
      const hasContent = /content: `/.test(content);

      const isValid = hasExport && hasDefaultExport && hasId && hasTitle && hasContent;

      return {
        isValid,
        errors: isValid
          ? []
          : [
              !hasExport && 'Missing export statement',
              !hasDefaultExport && 'Missing default export',
              !hasId && 'Missing id field',
              !hasTitle && 'Missing title field',
              !hasContent && 'Missing content field',
            ].filter(Boolean),
      };
    } catch (error) {
      return {
        isValid: false,
        errors: [`File validation error: ${error.message}`],
      };
    }
  }
}

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether file is valid
 * @property {string[]} errors - Validation errors
 */
