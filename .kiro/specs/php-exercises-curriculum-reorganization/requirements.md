# Requirements Document

## Introduction

This document specifies the requirements for adding comprehensive PHP exercises for all 13 existing lessons and reorganizing the PHP curriculum into difficulty-based folders to match the structure used by React and Vue lessons. The goal is to improve learning progression and provide hands-on practice for PHP developers.

## Glossary

- **Lesson**: An educational module containing theory, examples, and explanations about a specific PHP topic
- **Exercise**: A practical coding challenge with starter code, solution, hints, and test cases
- **Curriculum**: The organized collection of lessons grouped by difficulty level
- **Difficulty_Folder**: A directory organizing lessons by skill level (fundamentals/intermediate/advanced)
- **Bilingual_Content**: Content provided in both English and Persian (Farsi) languages
- **Starter_Code**: Initial code template provided to learners for completing exercises
- **Test_Case**: A specific input-output pair used to verify exercise solutions
- **Import_Path**: The file system path used in JavaScript import statements
- **Category_Config**: The categories.json file that defines lesson organization and metadata
- **Index_File**: A JavaScript file that exports all lessons or exercises from a directory

## Requirements

### Requirement 1: Create PHP Exercise Files

**User Story:** As a PHP learner, I want practical coding exercises for each lesson, so that I can apply what I've learned through hands-on practice.

#### Acceptance Criteria

1. THE System SHALL create 13 exercise files in `data/exercises/php/` directory
2. WHEN an exercise file is created, THE System SHALL include 3-5 practical coding challenges per lesson
3. THE System SHALL provide bilingual content (English and Persian) for all exercises
4. WHEN creating exercises, THE System SHALL include starter code, solution code, hints, and test cases
5. THE System SHALL follow the naming convention `{topic}-exercises.js` for exercise files
6. THE System SHALL structure exercises to match the format used in database-fundamentals exercises
7. WHEN defining exercises, THE System SHALL focus on real-world scenarios rather than syntax-only challenges
8. THE System SHALL ensure each exercise has a unique ID matching the pattern `{lesson-id}-exercises`

### Requirement 2: Reorganize PHP Lessons into Difficulty Folders

**User Story:** As a curriculum designer, I want PHP lessons organized by difficulty level, so that learners can follow a clear progression path similar to React and Vue.

#### Acceptance Criteria

1. THE System SHALL create three new directories: `data/lessons/php-fundamentals/`, `data/lessons/php-intermediate/`, and `data/lessons/php-advanced/`
2. WHEN reorganizing lessons, THE System SHALL move lessons 1-4 to php-fundamentals folder
3. WHEN reorganizing lessons, THE System SHALL move lessons 5-9 to php-intermediate folder
4. WHEN reorganizing lessons, THE System SHALL move lessons 10-13 to php-advanced folder
5. THE System SHALL create an index.js file in each difficulty folder that exports all lessons from that folder
6. THE System SHALL remove the old `data/lessons/php/` directory after successful migration
7. WHEN moving files, THE System SHALL preserve all lesson content and metadata
8. THE System SHALL maintain backward compatibility with existing lesson IDs in categories.json

### Requirement 3: Update Import Paths and Index Files

**User Story:** As a developer, I want all import paths automatically updated, so that the application continues to work after the reorganization.

#### Acceptance Criteria

1. WHEN lessons are moved, THE System SHALL update import statements in `data/lessons/index.js`
2. THE System SHALL update the main lessons index.js to import from the three new difficulty folders
3. THE System SHALL create `data/exercises/php/index.js` that exports all PHP exercises
4. WHEN updating imports, THE System SHALL update the main exercises index.js to include PHP exercises
5. THE System SHALL ensure all lesson exports use named exports matching the lesson ID pattern
6. THE System SHALL verify that no broken import paths remain after reorganization

### Requirement 4: Update Category Configuration

**User Story:** As a system administrator, I want the categories.json file updated to reflect the new structure, so that the UI displays the reorganized curriculum correctly.

#### Acceptance Criteria

1. THE System SHALL update categories.json to replace the single PHP category with three difficulty-based categories
2. WHEN updating categories, THE System SHALL create "PHP Fundamentals" category with lessons 1-4
3. WHEN updating categories, THE System SHALL create "PHP Intermediate" category with lessons 5-9
4. WHEN updating categories, THE System SHALL create "PHP Advanced" category with lessons 10-13
5. THE System SHALL set appropriate category metadata (icon, color, description, order)
6. THE System SHALL mark all exercises as available by setting `hasExercise: true` for all PHP lessons
7. THE System SHALL maintain the existing lesson IDs to preserve backward compatibility
8. THE System SHALL ensure category order numbers follow the existing sequence (after Vue Expert)

### Requirement 5: Exercise Content Quality Standards

**User Story:** As a PHP learner, I want high-quality exercises that teach practical skills, so that I can build real-world applications.

#### Acceptance Criteria

1. WHEN creating exercises for fundamentals lessons, THE System SHALL focus on basic syntax, control flow, and functions
2. WHEN creating exercises for intermediate lessons, THE System SHALL focus on OOP, arrays, strings, and error handling
3. WHEN creating exercises for advanced lessons, THE System SHALL focus on databases, security, testing, and modern PHP features
4. THE System SHALL include exercises that build on previous lessons
5. WHEN providing starter code, THE System SHALL include clear TODO comments indicating what learners should implement
6. THE System SHALL provide at least 3 hints per exercise in both languages
7. THE System SHALL include test cases that verify both correct behavior and edge cases
8. WHEN creating solutions, THE System SHALL include comments explaining key concepts

### Requirement 6: Maintain Bilingual Support

**User Story:** As a Persian-speaking learner, I want all new content in both English and Persian, so that I can learn in my preferred language.

#### Acceptance Criteria

1. THE System SHALL provide `description` and `descriptionFa` fields for all exercises
2. THE System SHALL provide `hints` and `hintsFa` arrays for all exercises
3. WHEN creating test cases, THE System SHALL provide descriptions in both languages
4. THE System SHALL ensure Persian translations are accurate and use appropriate technical terminology
5. THE System SHALL maintain consistency in terminology across all bilingual content

### Requirement 7: File System Operations Safety

**User Story:** As a developer, I want file operations to be safe and reversible, so that no data is lost during reorganization.

#### Acceptance Criteria

1. WHEN moving lesson files, THE System SHALL use file system operations that preserve file content
2. THE System SHALL verify that all files are successfully moved before deleting the old directory
3. IF any file operation fails, THEN THE System SHALL report the error and halt the reorganization
4. THE System SHALL create backup references to original file locations before moving files
5. THE System SHALL validate that all moved files are accessible at their new locations

### Requirement 8: Exercise File Structure Consistency

**User Story:** As a developer, I want exercise files to follow a consistent structure, so that they integrate seamlessly with the existing system.

#### Acceptance Criteria

1. THE System SHALL export each exercise as a default export with the pattern `{lessonId}Exercises`
2. WHEN creating exercise objects, THE System SHALL include fields: id, title, titleFa, difficulty, description, descriptionFa, starterCode, solution, hints, hintsFa, testCases
3. THE System SHALL set difficulty levels matching the parent lesson difficulty
4. THE System SHALL ensure starterCode and solution are complete, runnable PHP code
5. THE System SHALL format test cases as objects with input, expected, and description fields
6. THE System SHALL include at least 5 test cases per exercise covering normal and edge cases
