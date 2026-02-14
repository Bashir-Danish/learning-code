# Implementation Plan: PHP Lessons Reorganization

## Overview

This implementation reorganizes 13 PHP lesson files from a flat directory structure (`data/lessons/php/`) into two difficulty-based folders (`php-fundamentals/` and `php-intermediate/`). The approach follows a safe, incremental pattern: create new structure, move files, update imports, verify integrity, then clean up old structure.

## Tasks

- [x] 1. Create new directory structure
  - Create `data/lessons/php-fundamentals/` directory
  - Create `data/lessons/php-intermediate/` directory
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Move fundamentals lesson files
  - [x] 2.1 Move 8 fundamentals lesson files to php-fundamentals/
    - Move php-intro-setup.js
    - Move php-syntax-types.js
    - Move php-control-flow.js
    - Move php-functions.js
    - Move php-arrays-strings-deep-dive.js
    - Move php-errors-exceptions.js
    - Move php-files-dates-json.js
    - Move php-84-whats-new.js
    - _Requirements: 2.1, 7.4_
  
  - [ ]* 2.2 Write property test for file content preservation
    - **Property 1: File Content Preservation**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

- [ ] 3. Move intermediate lesson files
  - [x] 3.1 Move 5 intermediate lesson files to php-intermediate/
    - Move php-oop-basics.js
    - Move php-oop-modern.js
    - Move php-http-forms-sessions.js
    - Move php-pdo-mysql-security.js
    - Move php-composer-psr-testing.js
    - _Requirements: 2.2, 7.4_

- [ ] 4. Create index files for new folders
  - [x] 4.1 Create php-fundamentals/index.js
    - Import all 8 fundamentals lessons
    - Export using named exports pattern
    - Maintain original export names (phpIntroSetupLesson, phpSyntaxTypesLesson, etc.)
    - _Requirements: 3.1, 3.3, 3.4_
  
  - [x] 4.2 Create php-intermediate/index.js
    - Import all 5 intermediate lessons
    - Export using named exports pattern
    - Maintain original export names (phpOopBasicsLesson, phpOopModernLesson, etc.)
    - _Requirements: 3.2, 3.3, 3.4_
  
  - [ ]* 4.3 Write unit tests for index file exports
    - Test that php-fundamentals/index.js exports 8 lessons
    - Test that php-intermediate/index.js exports 5 lessons
    - Test that export names match original names
    - _Requirements: 3.1, 3.2, 3.4_

- [ ] 5. Checkpoint - Verify new structure before updating main registry
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Update main lesson registry
  - [x] 6.1 Update data/lessons/index.js imports
    - Replace single PHP import with two imports from new folders
    - Import from './php-fundamentals' for fundamentals lessons
    - Import from './php-intermediate' for intermediate lessons
    - Preserve all non-PHP imports unchanged
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  
  - [x] 6.2 Verify lesson registry object
    - Ensure all 13 PHP lessons are in the registry object
    - Verify lesson IDs match expected format
    - Verify export names are unchanged
    - _Requirements: 4.4, 6.1, 6.2, 6.3_
  
  - [ ]* 6.3 Write unit tests for main registry
    - Test that all 13 PHP lessons are accessible
    - Test that lesson IDs match expected format
    - Test that non-PHP imports are unchanged
    - _Requirements: 4.4, 4.5, 6.1, 6.3_

- [ ] 7. Verify import resolution
  - [x] 7.1 Test importing each PHP lesson from registry
    - Attempt to import all 13 PHP lessons
    - Verify no import errors occur
    - Report any broken imports with specific paths
    - _Requirements: 6.1, 6.4_
  
  - [ ]* 7.2 Write integration tests for end-to-end imports
    - Test importing main registry
    - Test accessing each PHP lesson by ID
    - Test that lesson objects have expected properties
    - _Requirements: 6.1, 6.4_

- [ ] 8. Checkpoint - Verify everything works before cleanup
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Clean up old directory structure
  - [x] 9.1 Verify old directory is empty of lesson files
    - Check that no .js files remain in data/lessons/php/
    - Report any remaining files
    - _Requirements: 2.3, 5.3_
  
  - [x] 9.2 Delete old PHP directory and index file
    - Delete data/lessons/php/index.js
    - Delete data/lessons/php/ directory
    - _Requirements: 5.1, 5.2_
  
  - [ ]* 9.3 Write unit tests for cleanup verification
    - Test that old php/ directory no longer exists
    - Test that old php/index.js no longer exists
    - Test error handling when files remain in old directory
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 10. Final verification
  - [x] 10.1 Run all tests to ensure migration is complete
    - Run unit tests
    - Run property-based tests
    - Run integration tests
    - _Requirements: All_
  
  - [x] 10.2 Verify application functionality
    - If possible, run application's existing test suite
    - Verify no import errors during application startup
    - Verify PHP lessons are accessible through application
    - _Requirements: 6.1, 6.4_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster completion
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation before proceeding
- The migration follows a safe pattern: create new → move files → update imports → verify → cleanup old
- Property test validates file content preservation across all lesson files
- Unit tests validate specific outcomes like directory structure and export names
- Integration tests validate end-to-end import resolution
