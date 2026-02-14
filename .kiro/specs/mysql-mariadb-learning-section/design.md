# Design Document: MySQL/MariaDB Database Learning Section

## Overview

This design document outlines the implementation of a comprehensive database curriculum for the educational platform. The section will integrate seamlessly with the existing React-based learning platform, providing students with structured lessons on MySQL/MariaDB fundamentals, SQL commands, Node.js integration, and best practices.

The design follows the established platform patterns for lesson modules, exercises, and content organization while introducing database-specific educational content. The curriculum progresses from basic database concepts to intermediate-level topics including query optimization and security.

## Architecture

### High-Level Structure

```
Database Learning Section
├── Category Definition (categories.json)
├── Lesson Modules (data/lessons/)
│   ├── mysql-server-basics.js
│   ├── mariadb-server-basics.js
│   ├── nodejs-mysql-connection.js
│   ├── sql-select-queries.js
│   ├── sql-insert-update-delete.js
│   ├── sql-joins.js
│   ├── sql-aggregate-functions.js
│   ├── database-design-tables.js
│   ├── database-relationships.js
│   ├── database-indexes.js
│   ├── sql-security-best-practices.js
│   └── query-optimization.js
└── Exercise Modules (data/exercises/)
    ├── mysql-basics-exercises.js
    ├── nodejs-connection-exercises.js
    ├── sql-queries-exercises.js
    ├── joins-exercises.js
    ├── database-design-exercises.js
    └── security-exercises.js
```

### Integration Points

1. **Category System**: New "Database Fundamentals" category added to `data/categories.json`
2. **Lesson Registry**: All lesson modules registered in `data/lessons/index.js`
3. **Exercise Registry**: All exercise modules registered in `data/exercises/index.js`
4. **React Components**: Existing `LessonPage` and `ExercisePage` components render database content
5. **Context Integration**: Uses `ProgressContext`, `LanguageContext`, and `TechnologyContext`

## Components and Interfaces

### Lesson Module Structure

Each lesson module follows the established platform pattern:

```javascript
export const lessonName = {
  id: 'lesson-id',                    // Unique identifier (kebab-case)
  title: 'Lesson Title',              // English title
  titleFa: 'عنوان درس',               // Persian title
  difficulty: 'easy' | 'medium',      // Difficulty level
  estimatedTime: '45 min',            // Completion time estimate
  
  content: `
    # Markdown Content
    
    Lesson content with code examples, explanations, and diagrams
  `,
  
  contentFa: `
    # محتوای فارسی
    
    Persian translation of lesson content
  `,
  
  visualizationId: null,              // No visualizations for database lessons
  exerciseId: 'exercise-id'           // Reference to related exercise
};

export default lessonName;
```

### Exercise Module Structure

```javascript
export const exerciseName = {
  id: 'exercise-id',
  title: 'Exercise Title',
  titleFa: 'عنوان تمرین',
  difficulty: 'easy' | 'medium',
  
  description: `
    Exercise instructions and requirements
  `,
  
  descriptionFa: `
    Persian translation of instructions
  `,
  
  starterCode: `
    // Initial code template for students
  `,
  
  solution: `
    // Reference solution
  `,
  
  hints: [
    'Hint 1',
    'Hint 2'
  ],
  
  hintsFa: [
    'راهنمایی ۱',
    'راهنمایی ۲'
  ],
  
  testCases: [
    {
      input: 'test input',
      expected: 'expected output',
      description: 'Test case description'
    }
  ]
};

export default exerciseName;
```

### Category Definition

```javascript
{
  "id": "database-fundamentals",
  "name": "18. Database Fundamentals",
  "nameFa": "۱۸. مبانی پایگاه داده",
  "icon": "Database",
  "color": "#0EA5E9",
  "description": "MySQL, MariaDB, SQL queries, and Node.js integration",
  "descriptionFa": "MySQL، MariaDB، کوئری‌های SQL و یکپارچه‌سازی با Node.js",
  "order": 18,
  "technology": "database",
  "lessons": [
    {
      "id": "mysql-server-basics",
      "title": "MySQL Server Basics",
      "titleFa": "مبانی سرور MySQL",
      "difficulty": "easy",
      "estimatedTime": "40 min",
      "hasVisualization": false,
      "hasExercise": true,
      "order": 1
    },
    // ... additional lessons
  ]
}
```

## Data Models

### Lesson Content Model

Lesson content is structured as Markdown with the following sections:

1. **Introduction**: Overview of the topic with real-world context
2. **Core Concepts**: Main teaching content with explanations
3. **Code Examples**: Syntax demonstrations with comments
4. **Practical Examples**: Real-world use cases
5. **Common Mistakes**: Typical errors and how to avoid them
6. **Best Practices**: Recommended approaches
7. **Quick Reference**: Summary tables and cheat sheets

### SQL Query Examples Model

```javascript
{
  query: "SELECT * FROM users WHERE age > 18",
  explanation: "Retrieves all users older than 18",
  result: [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 }
  ],
  notes: "Always use WHERE clauses to filter data efficiently"
}
```

### Node.js Connection Example Model

```javascript
{
  connectionType: "pool" | "single",
  code: `
    const mysql = require('mysql2/promise');
    
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  `,
  explanation: "Creates a connection pool for efficient database access",
  securityNotes: "Always use environment variables for credentials"
}
```

### Database Schema Example Model

```javascript
{
  tableName: "users",
  schema: `
    CREATE TABLE users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_username (username),
      INDEX idx_email (email)
    );
  `,
  relationships: [
    {
      type: "one-to-many",
      targetTable: "posts",
      foreignKey: "user_id"
    }
  ]
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Secure Credential Management
*For any* code example in the Database_Section that includes database credentials (host, user, password, database name), the code should use environment variables (process.env) rather than hardcoded values.
**Validates: Requirements 3.6, 6.5**

### Property 2: Prepared Statement Usage
*For any* code example in the Database_Section that executes SQL queries with user input or variables, the code should use prepared statements with parameterized queries (? placeholders or named parameters) rather than string concatenation.
**Validates: Requirements 6.2**

### Property 3: Code Example Presence
*For any* lesson module in the Database_Section, the content field should contain at least one code block (delimited by triple backticks).
**Validates: Requirements 8.1**

### Property 4: Code Comment Documentation
*For any* code example in the Database_Section, the code should include inline comments explaining the purpose of key statements.
**Validates: Requirements 8.4**

### Property 5: Expected Output Documentation
*For any* code example in the Database_Section that produces output, the lesson content should include the expected output or results following the code block.
**Validates: Requirements 8.6**

### Property 6: Exercise Coverage
*For any* major topic in the Database_Section (connection management, SQL queries, database design, security, optimization), there should exist at least one corresponding exercise module.
**Validates: Requirements 9.1**

### Property 7: Lesson-Exercise Linking
*For any* lesson module in the Database_Section that has hasExercise set to true, the exerciseId field should reference a valid exercise module that exists in the exercises directory.
**Validates: Requirements 9.2**

### Property 8: Exercise Difficulty Distribution
*For all* exercise modules in the Database_Section, the difficulty values should include both "easy" and "medium" levels, ensuring varied challenge levels.
**Validates: Requirements 9.3**

### Property 9: Exercise Completeness
*For any* exercise module in the Database_Section, the module should have all required fields populated: description, descriptionFa, starterCode, solution, hints, hintsFa, and testCases array with at least one test case.
**Validates: Requirements 9.4**

### Property 10: Category Structure Compliance
*For the* database category in categories.json, the category object should contain all required fields: id, name, nameFa, icon, color, description, descriptionFa, order, technology, and lessons array.
**Validates: Requirements 10.2**

### Property 11: Lesson Difficulty Progression
*For all* lessons in the Database_Section category, when ordered by the order field, the difficulty values should progress logically (easy lessons before medium lessons, with no hard lessons).
**Validates: Requirements 10.3**

### Property 12: Lesson Metadata Completeness
*For any* lesson module in the Database_Section, the module should have all required metadata fields: id, title, titleFa, difficulty, estimatedTime, hasVisualization, hasExercise, and order.
**Validates: Requirements 10.4, 10.5, 10.6**

### Property 13: Markdown Formatting with Syntax Highlighting
*For any* lesson module in the Database_Section, the content and contentFa fields should be valid Markdown, and any SQL code should be in code blocks with the sql language identifier (```sql).
**Validates: Requirements 11.1, 11.2**

### Property 14: Bilingual Content Completeness
*For any* lesson module in the Database_Section, both the content (English) and contentFa (Persian) fields should be populated with non-empty strings.
**Validates: Requirements 11.4**

### Property 15: Common Mistakes Section Presence
*For any* lesson module in the Database_Section covering SQL commands or Node.js integration, the content should include a section with "Common Mistakes" or "Common Errors" in the heading.
**Validates: Requirements 11.6**

### Property 16: Quick Reference Tables
*For any* lesson module in the Database_Section covering SQL commands, the content should include at least one Markdown table providing a quick reference for syntax or commands.
**Validates: Requirements 11.7**

### Property 17: Module Export Format Compliance
*For any* lesson or exercise module in the Database_Section, the module should export a default object with the structure matching the platform's established format (lesson modules with id, title, titleFa, difficulty, estimatedTime, content, contentFa, visualizationId, exerciseId; exercise modules with id, title, titleFa, difficulty, description, descriptionFa, starterCode, solution, hints, hintsFa, testCases).
**Validates: Requirements 12.5, 12.6**

### Property 18: Module Registry Completeness
*For all* lesson modules in the Database_Section, each module should be imported and exported in data/lessons/index.js, and for all exercise modules, each should be imported and exported in data/exercises/index.js.
**Validates: Requirements 12.7, 12.8**

## Error Handling

### Connection Errors

All Node.js connection examples should demonstrate proper error handling:

```javascript
try {
  const connection = await pool.getConnection();
  // Use connection
  connection.release();
} catch (error) {
  console.error('Database connection failed:', error.message);
  // Handle error appropriately
}
```

### Query Errors

All query execution examples should include error handling:

```javascript
try {
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return rows;
} catch (error) {
  console.error('Query execution failed:', error.message);
  throw error;
}
```

### Validation Errors

Exercise validation should provide clear error messages:

```javascript
{
  testCases: [
    {
      input: 'invalid SQL',
      expected: 'error',
      description: 'Should reject invalid SQL syntax'
    }
  ]
}
```

## Testing Strategy

### Unit Testing

Unit tests will verify specific aspects of the database learning section:

1. **Content Validation Tests**
   - Verify all required lesson modules exist
   - Verify all required exercise modules exist
   - Verify category definition is properly structured
   - Verify module exports match expected format

2. **Structure Tests**
   - Verify lesson-exercise linking is correct
   - Verify all lessons are registered in index files
   - Verify lesson ordering and difficulty progression
   - Verify bilingual content exists for all lessons

3. **Code Example Tests**
   - Verify SQL examples use correct syntax
   - Verify Node.js examples use mysql2 package correctly
   - Verify prepared statements are used in query examples
   - Verify environment variables are used for credentials

4. **Integration Tests**
   - Verify lessons render correctly in React components
   - Verify exercises load and execute properly
   - Verify progress tracking works with database lessons
   - Verify language switching works for database content

### Property-Based Testing

Property-based tests will verify universal properties across all database content. Each test should run a minimum of 100 iterations.

1. **Property Test: Secure Credential Management (Property 1)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 1: For any code example with database credentials, environment variables should be used
   - Generate: Random selection of lesson modules
   - Test: Extract all code blocks, search for credential patterns (host, user, password, database), verify process.env usage
   - Assert: No hardcoded credentials found

2. **Property Test: Prepared Statement Usage (Property 2)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 2: For any query execution code, prepared statements should be used
   - Generate: Random selection of code examples with SQL queries
   - Test: Parse code for query execution patterns, verify parameterized queries
   - Assert: No string concatenation in SQL queries with variables

3. **Property Test: Code Example Presence (Property 3)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 3: For any lesson, code blocks should be present
   - Generate: All lesson modules
   - Test: Parse content field for code blocks (```...```)
   - Assert: At least one code block exists per lesson

4. **Property Test: Lesson-Exercise Linking (Property 7)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 7: For any lesson with hasExercise true, exerciseId should reference valid exercise
   - Generate: All lesson modules with hasExercise: true
   - Test: Verify exerciseId references an existing exercise module
   - Assert: All exercise references are valid

5. **Property Test: Exercise Completeness (Property 9)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 9: For any exercise, all required fields should be populated
   - Generate: All exercise modules
   - Test: Verify presence and non-empty values for required fields
   - Assert: All required fields exist and are populated

6. **Property Test: Bilingual Content (Property 14)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 14: For any lesson, both English and Persian content should exist
   - Generate: All lesson modules
   - Test: Verify content and contentFa fields are non-empty strings
   - Assert: Both language versions exist

7. **Property Test: Module Export Format (Property 17)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 17: For any module, export format should match platform conventions
   - Generate: All lesson and exercise modules
   - Test: Verify exported object has all required fields with correct types
   - Assert: Module structure matches expected format

8. **Property Test: Module Registry (Property 18)**
   - **Tag**: Feature: mysql-mariadb-learning-section, Property 18: For all modules, registry files should include imports and exports
   - Generate: All lesson and exercise module filenames
   - Test: Parse index.js files, verify each module is imported and exported
   - Assert: All modules are registered

### Test Configuration

- **Property Test Library**: fast-check (for JavaScript/Node.js)
- **Minimum Iterations**: 100 per property test
- **Test Framework**: Jest or Vitest (matching existing platform tests)
- **Coverage Target**: 100% of lesson and exercise modules

### Example Property Test Implementation

```javascript
import fc from 'fast-check';
import { allLessons } from '../data/lessons/index.js';

// Feature: mysql-mariadb-learning-section, Property 3: For any lesson, code blocks should be present
describe('Database Section - Code Example Presence', () => {
  it('should have at least one code block in every lesson', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...allLessons.filter(l => l.id.startsWith('mysql-') || l.id.startsWith('mariadb-') || l.id.includes('database'))),
        (lesson) => {
          const codeBlockPattern = /```[\s\S]*?```/g;
          const matches = lesson.content.match(codeBlockPattern);
          return matches !== null && matches.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

## Implementation Notes

### Lesson Content Guidelines

1. **Progressive Complexity**: Start with simple concepts and build to more complex topics
2. **Real-World Examples**: Use practical scenarios (user management, blog posts, e-commerce)
3. **Visual Aids**: Include ASCII diagrams for database relationships and query flow
4. **Interactive Elements**: Provide "Try it yourself" sections with starter code
5. **Common Pitfalls**: Highlight typical mistakes and how to avoid them

### Code Example Standards

1. **Consistency**: Use consistent naming conventions across all examples
2. **Comments**: Every code block should have explanatory comments
3. **Security**: Always demonstrate secure practices (prepared statements, env vars)
4. **Error Handling**: Show proper try-catch patterns
5. **Modern Syntax**: Use async/await for promises, ES6+ features

### Exercise Design Principles

1. **Scaffolding**: Provide starter code to reduce cognitive load
2. **Incremental Difficulty**: Start with simple tasks, progress to complex challenges
3. **Clear Objectives**: State exactly what the student should accomplish
4. **Helpful Hints**: Provide progressive hints without giving away the solution
5. **Comprehensive Tests**: Include edge cases and error conditions in test cases

### Bilingual Content Strategy

1. **Parallel Structure**: English and Persian content should have identical structure
2. **Cultural Adaptation**: Use culturally appropriate examples for Persian content
3. **Technical Terms**: Keep technical terms in English with Persian explanations
4. **Code Comments**: Provide comments in both languages where appropriate

## Dependencies

### External Packages

- **mysql2**: Version 3.16.1 or higher (for Node.js examples)
- **React**: Existing platform dependency (for rendering)
- **react-markdown**: Existing platform dependency (for content rendering)
- **react-syntax-highlighter**: Existing platform dependency (for code highlighting)

### Platform Components

- **LessonPage**: Renders lesson content
- **ExercisePage**: Renders exercises and handles validation
- **ProgressContext**: Tracks student progress
- **LanguageContext**: Manages language switching
- **TechnologyContext**: Manages technology selection

### Development Tools

- **fast-check**: For property-based testing
- **Jest/Vitest**: For unit and property tests
- **ESLint**: For code quality
- **Prettier**: For code formatting

## Migration and Deployment

### Phase 1: Content Creation
1. Create all lesson module files
2. Create all exercise module files
3. Write bilingual content for all modules

### Phase 2: Integration
1. Add database category to categories.json
2. Register lessons in data/lessons/index.js
3. Register exercises in data/exercises/index.js
4. Update technology selection to include "database"

### Phase 3: Testing
1. Write and run unit tests
2. Write and run property-based tests
3. Manual testing of lesson rendering
4. Manual testing of exercise execution

### Phase 4: Documentation
1. Update platform README with database section info
2. Create instructor guide for database curriculum
3. Document any platform enhancements made

### Phase 5: Deployment
1. Deploy to staging environment
2. Conduct user acceptance testing
3. Deploy to production
4. Monitor for issues and gather feedback
