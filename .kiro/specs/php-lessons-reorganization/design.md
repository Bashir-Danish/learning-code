# Design Document: PHP Lessons Reorganization

## Overview

This design describes the reorganization of 13 PHP lesson files from a flat directory structure into a difficulty-based folder hierarchy. The reorganization follows the established pattern used by React and Vue lessons, creating two folders: `php-fundamentals` (8 easy lessons) and `php-intermediate` (5 medium lessons).

The implementation is a straightforward file system reorganization with corresponding updates to import/export statements. No lesson content will be modified—only file locations and import paths change.

## Architecture

### Current Structure
```
data/lessons/
├── php/
│   ├── index.js (exports all 13 lessons)
│   ├── php-intro-setup.js
│   ├── php-syntax-types.js
│   ├── ... (11 more lesson files)
└── index.js (main registry, imports from ./php)
```

### Target Structure
```
data/lessons/
├── php-fundamentals/
│   ├── index.js (exports 8 fundamentals lessons)
│   ├── php-intro-setup.js
│   ├── php-syntax-types.js
│   ├── ... (6 more fundamentals lessons)
├── php-intermediate/
│   ├── index.js (exports 5 intermediate lessons)
│   ├── php-oop-basics.js
│   ├── php-oop-modern.js
│   ├── ... (3 more intermediate lessons)
└── index.js (main registry, imports from ./php-fundamentals and ./php-intermediate)
```

### Design Principles

1. **Pattern Consistency**: Follow the exact organizational pattern used by React and Vue lessons
2. **Zero Content Modification**: Move files without altering their contents
3. **Backward Compatibility**: Maintain all existing export names and lesson IDs
4. **Atomic Operations**: Perform operations in a sequence that allows rollback if errors occur

## Components and Interfaces

### File System Operations

**Directory Creation**
- Create `data/lessons/php-fundamentals/`
- Create `data/lessons/php-intermediate/`

**File Movement**
- Move 8 fundamentals lesson files from `php/` to `php-fundamentals/`
- Move 5 intermediate lesson files from `php/` to `php-intermediate/`

**File Creation**
- Create `php-fundamentals/index.js` with 8 exports
- Create `php-intermediate/index.js` with 5 exports

**File Updates**
- Update `data/lessons/index.js` to import from new folders

**File Deletion**
- Delete `data/lessons/php/index.js`
- Delete `data/lessons/php/` directory (after verification)

### Index File Structure

Each folder's `index.js` follows this pattern:

```javascript
// Import lessons
import lessonName1 from './lesson-file-1';
import lessonName2 from './lesson-file-2';
// ... more imports

// Export lessons
export {
    lessonName1,
    lessonName2,
    // ... more exports
};
```

### Main Registry Update

The `data/lessons/index.js` file will change from:

```javascript
// Old: Single import from php folder
import {
  phpIntroSetupLesson,
  phpSyntaxTypesLesson,
  // ... all 13 lessons
} from './php';
```

To:

```javascript
// New: Separate imports from difficulty folders
import {
  phpIntroSetupLesson,
  phpSyntaxTypesLesson,
  // ... 8 fundamentals lessons
} from './php-fundamentals';

import {
  phpOopBasicsLesson,
  phpOopModernLesson,
  // ... 5 intermediate lessons
} from './php-intermediate';
```

## Data Models

### Lesson File Classification

**Fundamentals Lessons (Easy - 8 files)**
1. `php-intro-setup.js` → `phpIntroSetupLesson`
2. `php-syntax-types.js` → `phpSyntaxTypesLesson`
3. `php-control-flow.js` → `phpControlFlowLesson`
4. `php-functions.js` → `phpFunctionsLesson`
5. `php-arrays-strings-deep-dive.js` → `phpArraysStringsDeepDiveLesson`
6. `php-errors-exceptions.js` → `phpErrorsExceptionsLesson`
7. `php-files-dates-json.js` → `phpFilesDatesJsonLesson`
8. `php-84-whats-new.js` → `php84WhatsNewLesson`

**Intermediate Lessons (Medium - 5 files)**
1. `php-oop-basics.js` → `phpOopBasicsLesson`
2. `php-oop-modern.js` → `phpOopModernLesson`
3. `php-http-forms-sessions.js` → `phpHttpFormsSessionsLesson`
4. `php-pdo-mysql-security.js` → `phpPdoMysqlSecurityLesson`
5. `php-composer-psr-testing.js` → `phpComposerPsrTestingLesson`

### File Path Mappings

Each lesson file has three path states during migration:

1. **Source Path**: `data/lessons/php/{filename}.js`
2. **Destination Path**: `data/lessons/php-{difficulty}/{filename}.js`
3. **Import Path**: `./{filename}` (relative to folder index.js)


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: File Content Preservation

*For any* lesson file being moved during reorganization, the file content after the move operation should be byte-for-byte identical to the content before the move operation.

**Validates: Requirements 7.1, 7.2, 7.3, 7.4**

This property ensures that moving files between directories does not corrupt, modify, or lose any data. It covers all aspects of lesson content including bilingual text, metadata, exercises, and code examples.

## Error Handling

### File System Errors

**Directory Creation Failures**
- If `php-fundamentals/` or `php-intermediate/` cannot be created, abort the operation and report the error
- Check for permission issues, disk space, and path conflicts before proceeding

**File Move Failures**
- If any lesson file cannot be moved, abort the operation and report which file failed
- Do not proceed with partial migrations—either all files move successfully or none do
- Preserve the original `php/` directory until all moves are verified

**File Already Exists**
- If target directories already exist with lesson files, report a conflict error
- Do not overwrite existing files without explicit confirmation
- Provide clear error messages indicating which files conflict

### Import/Export Validation Errors

**Missing Exports**
- After creating index files, verify all expected exports are present
- If any export is missing, report the specific lesson name and file
- Do not delete the old `php/` directory until exports are verified

**Broken Imports**
- After updating the main registry, attempt to resolve all imports
- If any import fails, report the specific import path and error
- Provide rollback instructions if imports are broken

**Export Name Mismatches**
- Verify that export names in new index files match the original names
- If any name mismatch is detected, report the expected vs actual names
- Ensure backward compatibility is maintained

### Cleanup Errors

**Old Directory Not Empty**
- Before deleting `php/` directory, verify it contains no lesson files
- If lesson files remain, report which files were not moved
- Do not delete the directory if any lesson files remain

**Orphaned Files**
- Check for any files in the old directory that weren't part of the migration
- Report any unexpected files and ask for confirmation before deletion
- Preserve any non-lesson files (e.g., README, configuration files)

## Testing Strategy

This reorganization is primarily a file system operation with verification steps. Testing will use a combination of unit tests for specific validations and a single property-based test for file content preservation.

### Unit Testing Approach

Unit tests will verify specific outcomes of the migration:

1. **Directory Structure Tests**
   - Verify `php-fundamentals/` directory exists
   - Verify `php-intermediate/` directory exists
   - Verify directory names follow the `{technology}-{difficulty}` pattern

2. **File Location Tests**
   - Verify all 8 fundamentals files exist in `php-fundamentals/`
   - Verify all 5 intermediate files exist in `php-intermediate/`
   - Verify no lesson files remain in old `php/` directory

3. **Index File Tests**
   - Verify `php-fundamentals/index.js` exists and exports 8 lessons
   - Verify `php-intermediate/index.js` exists and exports 5 lessons
   - Verify export syntax matches React/Vue pattern (named exports)
   - Verify export names match original names

4. **Main Registry Tests**
   - Verify main registry imports from `./php-fundamentals`
   - Verify main registry imports from `./php-intermediate`
   - Verify all 13 PHP lessons are accessible in the registry object
   - Verify lesson IDs match expected format (e.g., 'php-intro-setup')
   - Verify non-PHP imports are unchanged

5. **Cleanup Tests**
   - Verify old `php/` directory is deleted
   - Verify old `php/index.js` is deleted
   - Verify error is reported if files remain in old directory

6. **Import Resolution Tests**
   - Verify all imports can be resolved without errors
   - Verify each lesson can be imported from the registry
   - Verify broken imports are reported with specific paths

### Property-Based Testing Approach

Property-based testing will be used to verify file content preservation across all lesson files:

**Property Test Configuration**
- Library: fast-check (for JavaScript/Node.js)
- Minimum iterations: 100 (though with only 13 files, we'll test all files multiple times)
- Test tag: **Feature: php-lessons-reorganization, Property 1: File content preservation**

**Property Test: File Content Preservation**
- Generate: Random selection of lesson files from the set of 13 PHP lessons
- Operation: Simulate moving the file to its target directory
- Verification: Compare file content before and after move (byte-for-byte comparison)
- This test validates that the move operation never corrupts or modifies file contents

### Integration Testing

After all unit and property tests pass:

1. **End-to-End Import Test**
   - Import the main lesson registry
   - Access each of the 13 PHP lessons by their ID
   - Verify each lesson object has expected properties (title, content, exercises)

2. **Application Smoke Test**
   - If possible, run the application's existing test suite
   - Verify no import errors occur during application startup
   - Verify PHP lessons are accessible through the application's lesson loading mechanism

### Test Execution Order

1. Run unit tests for directory creation and file movement
2. Run property-based test for file content preservation
3. Run unit tests for index file creation and exports
4. Run unit tests for main registry updates
5. Run integration tests for end-to-end import verification
6. Run cleanup tests to verify old directory removal

This order ensures that each step is validated before proceeding to the next, allowing for early detection of issues.
