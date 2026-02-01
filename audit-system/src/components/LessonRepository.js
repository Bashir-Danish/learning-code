/**
 * Lesson Repository - Central interface for accessing and managing lesson data
 */

import fs from 'fs-extra';
import path from 'path';
import { Lesson } from '../models/Lesson.js';
import auditConfig from '../../config/audit-config.js';

export class LessonRepository {
  constructor(basePath = '.') {
    this.basePath = basePath;
    this.lessonsPath = path.join(basePath, auditConfig.paths.reactLessons);
    this.backupPath = path.join(basePath, auditConfig.paths.backupDir);
    this.lessons = new Map();
  }

  /**
   * Load all React lessons from all difficulty directories
   */
  async loadAllLessons() {
    console.log('Loading all React lessons...');
    this.lessons.clear();

    try {
      for (const difficulty of auditConfig.difficultyLevels) {
        const difficultyPath = path.join(this.lessonsPath, difficulty);
        
        if (await fs.pathExists(difficultyPath)) {
          await this.loadLessonsFromDirectory(difficultyPath, difficulty);
        } else {
          console.warn(`Directory not found: ${difficultyPath}`);
        }
      }

      console.log(`Loaded ${this.lessons.size} lessons total`);
      return Array.from(this.lessons.values());
    } catch (error) {
      console.error('Error loading lessons:', error);
      throw new Error(`Failed to load lessons: ${error.message}`);
    }
  }

  /**
   * Load lessons from a specific directory
   */
  async loadLessonsFromDirectory(directoryPath, difficulty) {
    try {
      const files = await fs.readdir(directoryPath);
      const jsFiles = files.filter(file => file.endsWith('.js') && file !== 'index.js');

      console.log(`Loading ${jsFiles.length} lessons from ${difficulty}`);

      for (const file of jsFiles) {
        const filePath = path.join(directoryPath, file);
        try {
          const lesson = await this.loadLessonFromFile(filePath, difficulty);
          if (lesson) {
            this.lessons.set(lesson.id, lesson);
          }
        } catch (error) {
          console.error(`Error loading lesson from ${file}:`, error.message);
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${directoryPath}:`, error);
      throw error;
    }
  }

  /**
   * Load a single lesson from a file
   */
  async loadLessonFromFile(filePath, difficulty) {
    try {
      // Read the file content
      const fileContent = await fs.readFile(filePath, 'utf8');
      
      // Extract the lesson object from the ES6 module
      const lessonData = await this.parseLessonFile(fileContent, filePath);
      
      if (!lessonData) {
        throw new Error('No lesson data found in file');
      }

      // Get file stats for metadata
      const stats = await fs.stat(filePath);
      
      // Create lesson instance
      const lesson = new Lesson({
        ...lessonData,
        difficulty,
        filePath,
        lastModified: stats.mtime
      });

      return lesson;
    } catch (error) {
      console.error(`Error parsing lesson file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Parse lesson file content to extract lesson data
   */
  async parseLessonFile(fileContent, filePath) {
    try {
      // Create a temporary module to evaluate the file
      const tempFilePath = path.join(process.cwd(), 'temp_lesson.mjs');
      await fs.writeFile(tempFilePath, fileContent);
      
      try {
        const module = await import(tempFilePath);
        
        // Look for lesson export (could be default export or named export)
        let lessonData = null;
        
        if (module.default) {
          lessonData = module.default;
        } else {
          // Look for any exported lesson object
          const exports = Object.values(module);
          lessonData = exports.find(exp => exp && typeof exp === 'object' && exp.id);
        }
        
        return lessonData;
      } finally {
        // Clean up temp file
        await fs.remove(tempFilePath);
      }
    } catch (error) {
      // Fallback: try to extract lesson data using regex
      return this.extractLessonDataWithRegex(fileContent);
    }
  }

  /**
   * Fallback method to extract lesson data using regex
   */
  extractLessonDataWithRegex(fileContent) {
    try {
      // Extract the lesson object using regex
      const lessonMatch = fileContent.match(/export\s+const\s+\w+\s*=\s*({[\s\S]*?});/);
      if (!lessonMatch) {
        return null;
      }

      const lessonObjectStr = lessonMatch[1];
      
      // Extract key properties using regex
      const extractProperty = (prop) => {
        const regex = new RegExp(`${prop}:\\s*['"\`]([^'"\`]*?)['"\`]`, 's');
        const match = lessonObjectStr.match(regex);
        return match ? match[1] : '';
      };

      const extractContent = (prop) => {
        const regex = new RegExp(`${prop}:\\s*\`([\\s\\S]*?)\``, 's');
        const match = lessonObjectStr.match(regex);
        return match ? match[1] : '';
      };

      return {
        id: extractProperty('id'),
        title: extractProperty('title'),
        titleFa: extractProperty('titleFa'),
        difficulty: extractProperty('difficulty'),
        estimatedTime: extractProperty('estimatedTime'),
        content: extractContent('content'),
        contentFa: extractContent('contentFa'),
        visualizationId: extractProperty('visualizationId'),
        exerciseId: extractProperty('exerciseId')
      };
    } catch (error) {
      console.error('Error extracting lesson data with regex:', error);
      return null;
    }
  }

  /**
   * Get a specific lesson by ID
   */
  getLessonContent(lessonId) {
    return this.lessons.get(lessonId);
  }

  /**
   * Get all lessons
   */
  getAllLessons() {
    return Array.from(this.lessons.values());
  }

  /**
   * Get lessons by difficulty level
   */
  getLessonsByDifficulty(difficulty) {
    return Array.from(this.lessons.values()).filter(lesson => 
      lesson.difficulty === difficulty
    );
  }

  /**
   * Get lessons statistics
   */
  getStatistics() {
    const lessons = Array.from(this.lessons.values());
    const stats = {
      total: lessons.length,
      byDifficulty: {},
      withCompleteContent: 0,
      withIncompleteContent: 0,
      averageContentLength: 0,
      averageContentFaLength: 0
    };

    let totalContentLength = 0;
    let totalContentFaLength = 0;

    lessons.forEach(lesson => {
      // Count by difficulty
      stats.byDifficulty[lesson.difficulty] = (stats.byDifficulty[lesson.difficulty] || 0) + 1;
      
      // Count complete/incomplete content
      if (lesson.hasCompleteContent()) {
        stats.withCompleteContent++;
      } else {
        stats.withIncompleteContent++;
      }

      // Sum content lengths
      totalContentLength += lesson.content.length;
      totalContentFaLength += lesson.contentFa.length;
    });

    if (lessons.length > 0) {
      stats.averageContentLength = Math.round(totalContentLength / lessons.length);
      stats.averageContentFaLength = Math.round(totalContentFaLength / lessons.length);
    }

    return stats;
  }

  /**
   * Validate repository state
   */
  validateRepository() {
    const issues = [];
    
    if (this.lessons.size === 0) {
      issues.push('No lessons loaded');
    }

    const lessons = Array.from(this.lessons.values());
    const duplicateIds = this.findDuplicateIds(lessons);
    if (duplicateIds.length > 0) {
      issues.push(`Duplicate lesson IDs found: ${duplicateIds.join(', ')}`);
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }

  /**
   * Find duplicate lesson IDs
   */
  findDuplicateIds(lessons) {
    const ids = lessons.map(lesson => lesson.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    return [...new Set(duplicates)];
  }

  /**
   * Create backup of a lesson file before modifications
   */
  async createBackup(lessonId) {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson not found: ${lessonId}`);
    }

    try {
      // Ensure backup directory exists
      await fs.ensureDir(this.backupPath);
      
      // Create timestamped backup filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const originalFileName = path.basename(lesson.filePath);
      const backupFileName = `${timestamp}_${originalFileName}`;
      const backupFilePath = path.join(this.backupPath, backupFileName);
      
      // Copy original file to backup location
      await fs.copy(lesson.filePath, backupFilePath);
      
      console.log(`Backup created: ${backupFilePath}`);
      return backupFilePath;
    } catch (error) {
      console.error(`Error creating backup for ${lessonId}:`, error);
      throw new Error(`Failed to create backup: ${error.message}`);
    }
  }

  /**
   * Update lesson content while preserving file structure
   */
  async updateLessonContent(lessonId, updatedContent) {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson not found: ${lessonId}`);
    }

    try {
      // Create backup first if enabled
      if (auditConfig.enhancement.createBackups) {
        await this.createBackup(lessonId);
      }

      // Read original file content
      const originalContent = await fs.readFile(lesson.filePath, 'utf8');
      
      // Update the lesson object with new content
      const updatedLesson = this.updateLessonObject(originalContent, updatedContent);
      
      // Write updated content back to file
      await fs.writeFile(lesson.filePath, updatedLesson, 'utf8');
      
      // Update lesson in memory
      Object.assign(lesson, updatedContent);
      lesson.lastModified = new Date();
      
      console.log(`Updated lesson: ${lessonId}`);
      return true;
    } catch (error) {
      console.error(`Error updating lesson ${lessonId}:`, error);
      throw new Error(`Failed to update lesson: ${error.message}`);
    }
  }

  /**
   * Update lesson object string with new content while preserving structure
   */
  updateLessonObject(originalFileContent, updatedContent) {
    let updatedFileContent = originalFileContent;

    // Update each field that was provided
    Object.entries(updatedContent).forEach(([field, newValue]) => {
      if (field === 'content' || field === 'contentFa') {
        // Handle multi-line template literals
        const regex = new RegExp(`(${field}:\\s*\`)([\\s\\S]*?)(\`)`, 's');
        const escapedValue = newValue.replace(/`/g, '\\`').replace(/\$/g, '\\$');
        updatedFileContent = updatedFileContent.replace(regex, `$1${escapedValue}$3`);
      } else {
        // Handle simple string properties
        const regex = new RegExp(`(${field}:\\s*['"])([^'"]*?)(['"])`, 'g');
        updatedFileContent = updatedFileContent.replace(regex, `$1${newValue}$3`);
      }
    });

    return updatedFileContent;
  }

  /**
   * Batch update multiple lessons
   */
  async batchUpdateLessons(updates) {
    const results = [];
    
    for (const update of updates) {
      try {
        await this.updateLessonContent(update.lessonId, update.content);
        results.push({ lessonId: update.lessonId, success: true });
      } catch (error) {
        results.push({ 
          lessonId: update.lessonId, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    return results;
  }

  /**
   * Restore lesson from backup
   */
  async restoreFromBackup(lessonId, backupFilePath) {
    const lesson = this.lessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson not found: ${lessonId}`);
    }

    try {
      // Verify backup file exists
      if (!(await fs.pathExists(backupFilePath))) {
        throw new Error(`Backup file not found: ${backupFilePath}`);
      }

      // Restore from backup
      await fs.copy(backupFilePath, lesson.filePath);
      
      // Reload lesson from restored file
      const restoredLesson = await this.loadLessonFromFile(lesson.filePath, lesson.difficulty);
      if (restoredLesson) {
        this.lessons.set(lessonId, restoredLesson);
      }
      
      console.log(`Restored lesson ${lessonId} from backup`);
      return true;
    } catch (error) {
      console.error(`Error restoring lesson ${lessonId}:`, error);
      throw new Error(`Failed to restore from backup: ${error.message}`);
    }
  }

  /**
   * List available backups for a lesson
   */
  async listBackups(lessonId) {
    try {
      if (!(await fs.pathExists(this.backupPath))) {
        return [];
      }

      const lesson = this.lessons.get(lessonId);
      if (!lesson) {
        return [];
      }

      const originalFileName = path.basename(lesson.filePath);
      const backupFiles = await fs.readdir(this.backupPath);
      
      const lessonBackups = backupFiles
        .filter(file => file.endsWith(originalFileName))
        .map(file => {
          const filePath = path.join(this.backupPath, file);
          const timestamp = file.split('_')[0];
          return {
            filePath,
            timestamp: new Date(timestamp.replace(/-/g, ':')),
            fileName: file
          };
        })
        .sort((a, b) => b.timestamp - a.timestamp);

      return lessonBackups;
    } catch (error) {
      console.error(`Error listing backups for ${lessonId}:`, error);
      return [];
    }
  }

  /**
   * Clean old backups (keep only recent ones)
   */
  async cleanOldBackups(keepCount = 5) {
    try {
      if (!(await fs.pathExists(this.backupPath))) {
        return;
      }

      const lessons = Array.from(this.lessons.values());
      
      for (const lesson of lessons) {
        const backups = await this.listBackups(lesson.id);
        
        if (backups.length > keepCount) {
          const backupsToDelete = backups.slice(keepCount);
          
          for (const backup of backupsToDelete) {
            await fs.remove(backup.filePath);
            console.log(`Deleted old backup: ${backup.fileName}`);
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning old backups:', error);
    }
  }
}