# Requirements Document

## Introduction

This feature reorganizes the existing 13 PHP lessons from a flat directory structure (`data/lessons/php/`) into a difficulty-based folder structure with two categories: Fundamentals (Easy) and Intermediate (Medium). This aligns the PHP curriculum with the existing organizational pattern used by React and Vue lessons, improving discoverability and learning progression.

## Glossary

- **Lesson_File**: A JavaScript file containing bilingual (English and Persian) lesson content, exercises, and metadata
- **Lesson_Registry**: The main `data/lessons/index.js` file that imports and exports all lessons for the application
- **Category_Config**: The `data/categories.json` file that defines lesson categories and their metadata
- **Fundamentals_Folder**: The `data/lessons/php-fundamentals/` directory containing easy-level PHP lessons
- **Intermediate_Folder**: The `data/lessons/php-intermediate/` directory containing medium-level PHP lessons
- **Index_File**: A JavaScript file that exports all lessons from a specific folder

## Requirements

### Requirement 1: Create Difficulty-Based Folder Structure

**User Story:** As a developer, I want PHP lessons organized into difficulty-based folders, so that the structure matches React and Vue patterns and improves maintainability.

#### Acceptance Criteria

1. THE System SHALL create a `data/lessons/php-fundamentals/` directory for easy-level lessons
2. THE System SHALL create a `data/lessons/php-intermediate/` directory for medium-level lessons
3. WHEN the folders are created, THE System SHALL ensure they follow the same naming convention as React and Vue folders (technology-difficulty format)

### Requirement 2: Move Lesson Files to Appropriate Folders

**User Story:** As a developer, I want lesson files moved to their appropriate difficulty folders, so that lessons are organized by learning progression.

#### Acceptance Criteria

1. WHEN moving fundamentals lessons, THE System SHALL move these 8 files to `php-fundamentals/`:
   - php-intro-setup.js
   - php-syntax-types.js
   - php-control-flow.js
   - php-functions.js
   - php-arrays-strings-deep-dive.js
   - php-errors-exceptions.js
   - php-files-dates-json.js
   - php-84-whats-new.js

2. WHEN moving intermediate lessons, THE System SHALL move these 5 files to `php-intermediate/`:
   - php-oop-basics.js
   - php-oop-modern.js
   - php-http-forms-sessions.js
   - php-pdo-mysql-security.js
   - php-composer-psr-testing.js

3. WHEN all files are moved, THE System SHALL verify that no lesson files remain in the original `data/lessons/php/` directory

### Requirement 3: Create Index Files for Each Folder

**User Story:** As a developer, I want index files in each difficulty folder, so that lessons can be imported cleanly from their new locations.

#### Acceptance Criteria

1. THE System SHALL create `data/lessons/php-fundamentals/index.js` that exports all 8 fundamentals lessons
2. THE System SHALL create `data/lessons/php-intermediate/index.js` that exports all 5 intermediate lessons
3. WHEN creating index files, THE System SHALL use the same export pattern as React and Vue folders (named exports)
4. WHEN creating index files, THE System SHALL maintain the original export names for backward compatibility

### Requirement 4: Update Main Lesson Registry

**User Story:** As a developer, I want the main lesson registry updated to import from new folders, so that the application continues to function correctly.

#### Acceptance Criteria

1. WHEN updating `data/lessons/index.js`, THE System SHALL replace the single PHP import with two imports from the new folders
2. THE System SHALL import from `./php-fundamentals` for fundamentals lessons
3. THE System SHALL import from `./php-intermediate` for intermediate lessons
4. WHEN updating imports, THE System SHALL maintain all existing export names in the lessons registry object
5. THE System SHALL preserve the order and structure of all non-PHP lesson imports

### Requirement 5: Remove Old PHP Directory

**User Story:** As a developer, I want the old PHP directory removed after migration, so that there are no duplicate or orphaned files.

#### Acceptance Criteria

1. WHEN all files are successfully moved and verified, THE System SHALL delete the `data/lessons/php/` directory
2. THE System SHALL delete the old `data/lessons/php/index.js` file
3. IF any files remain in the old directory, THE System SHALL report an error and not delete the directory

### Requirement 6: Verify Import and Export Integrity

**User Story:** As a developer, I want all imports and exports verified after reorganization, so that no broken references exist in the codebase.

#### Acceptance Criteria

1. THE System SHALL verify that all 13 PHP lessons are accessible through the main lesson registry
2. WHEN verifying exports, THE System SHALL confirm each lesson maintains its original export name
3. THE System SHALL verify that lesson IDs in the registry match the expected format (e.g., 'php-intro-setup')
4. IF any import or export is broken, THE System SHALL report the specific broken reference

### Requirement 7: Preserve Lesson Content and Metadata

**User Story:** As a developer, I want lesson file contents unchanged during reorganization, so that no lesson data or functionality is lost.

#### Acceptance Criteria

1. WHEN moving lesson files, THE System SHALL preserve all bilingual content (English and Persian)
2. THE System SHALL preserve all lesson metadata (difficulty, estimated time, etc.)
3. THE System SHALL preserve all exercise content and code examples
4. THE System SHALL not modify any lesson file contents during the move operation
