import fs from 'fs-extra';
import path from 'path';

/**
 * Parses Laravel lesson files and extracts metadata and content
 */
export class LessonFileParser {
  /**
   * Parse a lesson file and extract all components
   * @param {string} filePath - Path to the lesson file
   * @returns {ParsedLesson} Parsed lesson data
   */
  async parseLessonFile(filePath) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      // Extract the lesson object from the export statement
      const lessonObject = this.extractLessonObject(fileContent);
      
      if (!lessonObject) {
        throw new Error(`Could not extract lesson object from ${filePath}`);
      }
      
      const metadata = this.extractMetadata(lessonObject);
      const content = this.extractContent(lessonObject);
      
      return {
        metadata,
        content,
        filePath,
        originalExport: fileContent,
      };
    } catch (error) {
      console.error(`Error parsing lesson file ${filePath}:`, error.message);
      throw error;
    }
  }

  /**
   * Extract lesson object from file content
   * @param {string} fileContent - Raw file content
   * @returns {object|null} Lesson object or null if extraction fails
   */
  extractLessonObject(fileContent) {
    try {
      // Match the export const pattern and extract the object
      const exportMatch = fileContent.match(/export const \w+ = ({[\s\S]*?});/);
      
      if (!exportMatch) {
        return null;
      }
      
      // Extract the object string
      const objectString = exportMatch[1];
      
      // Parse the object (simplified approach - assumes valid JS object literal)
      // In production, you might want to use a proper JS parser like @babel/parser
      const lesson = this.parseObjectLiteral(objectString);
      
      return lesson;
    } catch (error) {
      console.error('Error extracting lesson object:', error.message);
      return null;
    }
  }

  /**
   * Parse JavaScript object literal string
   * @param {string} objectString - Object literal as string
   * @returns {object} Parsed object
   */
  parseObjectLiteral(objectString) {
    // Extract id
    const idMatch = objectString.match(/id:\s*['"]([^'"]+)['"]/);
    const id = idMatch ? idMatch[1] : '';

    // Extract title
    const titleMatch = objectString.match(/title:\s*['"]([^'"]+)['"]/);
    const title = titleMatch ? titleMatch[1] : '';

    // Extract titleFa
    const titleFaMatch = objectString.match(/titleFa:\s*['"]([^'"]+)['"]/);
    const titleFa = titleFaMatch ? titleFaMatch[1] : '';

    // Extract difficulty
    const difficultyMatch = objectString.match(/difficulty:\s*['"]([^'"]+)['"]/);
    const difficulty = difficultyMatch ? difficultyMatch[1] : 'medium';

    // Extract estimatedTime
    const timeMatch = objectString.match(/estimatedTime:\s*['"]([^'"]+)['"]/);
    const estimatedTime = timeMatch ? timeMatch[1] : '60 min';

    // Extract content (template literal)
    const contentMatch = objectString.match(/content:\s*`([\s\S]*?)`\s*,/);
    const content = contentMatch ? contentMatch[1] : '';

    // Extract contentFa (template literal)
    const contentFaMatch = objectString.match(/contentFa:\s*`([\s\S]*?)`\s*,/);
    const contentFa = contentFaMatch ? contentFaMatch[1] : '';

    // Extract hasVisualization
    const hasVisMatch = objectString.match(/hasVisualization:\s*(true|false)/);
    const hasVisualization = hasVisMatch ? hasVisMatch[1] === 'true' : false;

    // Extract hasExercise
    const hasExMatch = objectString.match(/hasExercise:\s*(true|false)/);
    const hasExercise = hasExMatch ? hasExMatch[1] === 'true' : false;

    return {
      id,
      title,
      titleFa,
      difficulty,
      estimatedTime,
      content,
      contentFa,
      hasVisualization,
      hasExercise,
    };
  }

  /**
   * Extract metadata from lesson object
   * @param {object} lessonObject - Parsed lesson object
   * @returns {LessonMetadata} Lesson metadata
   */
  extractMetadata(lessonObject) {
    return {
      id: lessonObject.id || '',
      title: lessonObject.title || '',
      titleFa: lessonObject.titleFa || '',
      difficulty: lessonObject.difficulty || 'medium',
      estimatedTime: lessonObject.estimatedTime || '60 min',
      hasVisualization: lessonObject.hasVisualization || false,
      hasExercise: lessonObject.hasExercise || false,
    };
  }

  /**
   * Extract content sections (English and Persian)
   * @param {object} lessonObject - Parsed lesson object
   * @returns {ContentSections} Content sections
   */
  extractContent(lessonObject) {
    return {
      english: lessonObject.content || '',
      persian: lessonObject.contentFa || '',
    };
  }

  /**
   * Get all Laravel lesson files
   * @param {string} lessonsDir - Directory containing lesson files
   * @returns {Promise<string[]>} Array of lesson file paths
   */
  async getAllLessonFiles(lessonsDir) {
    try {
      const files = await fs.readdir(lessonsDir);
      return files
        .filter((file) => file.endsWith('.js') && file !== 'index.js')
        .map((file) => path.join(lessonsDir, file));
    } catch (error) {
      console.error(`Error reading lessons directory ${lessonsDir}:`, error.message);
      return [];
    }
  }
}

/**
 * @typedef {Object} ParsedLesson
 * @property {LessonMetadata} metadata - Lesson metadata
 * @property {ContentSections} content - Content sections
 * @property {string} filePath - Original file path
 * @property {string} originalExport - Original file content
 */

/**
 * @typedef {Object} LessonMetadata
 * @property {string} id - Lesson ID
 * @property {string} title - English title
 * @property {string} titleFa - Persian title
 * @property {string} difficulty - Difficulty level
 * @property {string} estimatedTime - Estimated time
 * @property {boolean} hasVisualization - Has visualization
 * @property {boolean} hasExercise - Has exercise
 */

/**
 * @typedef {Object} ContentSections
 * @property {string} english - English content
 * @property {string} persian - Persian content
 */
