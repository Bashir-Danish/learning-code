# React Lessons Audit Enhancement System

A comprehensive system for auditing and enhancing React lesson content across all difficulty levels to ensure complete, high-quality educational materials in both English and Farsi languages.

## Features

- **Content Audit**: Systematic analysis of lesson content for completeness and structure
- **Quality Assessment**: Educational value and content comprehensiveness evaluation
- **Language Validation**: Consistency and equivalence between English and Farsi content
- **Code Validation**: Syntax checking and best practices validation for code examples
- **Content Enhancement**: Automatic improvement of incomplete or insufficient content
- **Comprehensive Reporting**: Detailed reports in JSON, Markdown, and HTML formats

## Installation

1. Install dependencies:
```bash
npm install
```

2. Ensure your React lessons are organized in the expected directory structure:
```
data/lessons/
├── react-fundamentals/
├── react-intermediate/
├── react-advanced/
└── react-expert/
```

## Usage

### Command Line Interface

#### Run Complete Audit and Enhancement
```bash
npm start full
```

#### Run Audit Only
```bash
npm run audit
```

#### Run Enhancement Only
```bash
npm run enhance
```

#### Get System Statistics
```bash
node src/index.js stats
```

#### Validate System Configuration
```bash
node src/index.js validate
```

### Programmatic Usage

```javascript
import ReactLessonsAuditSystem from './src/index.js';

const system = new ReactLessonsAuditSystem();

// Run complete workflow
const result = await system.runCompleteWorkflow({
  enhance: true,
  formats: ['json', 'markdown', 'html']
});

console.log(`Processed ${result.lessons} lessons`);
console.log(`Average score: ${result.averageScore}/100`);
```

## Configuration

The system can be configured by modifying `src/config/audit-config.js`:

```javascript
export const auditConfig = {
  // Directory paths
  paths: {
    reactLessons: 'data/lessons',
    backupDir: 'audit-system/backups',
    reportsDir: 'audit-system/reports'
  },
  
  // Content validation thresholds
  validation: {
    minContentLength: 500,
    maxLanguageRatio: 2.0,
    minCodeExamples: 1
  },
  
  // Quality assessment criteria
  quality: {
    minReadabilityScore: 70,
    minEducationalValue: 75,
    requiredSections: ['Definition', 'Key Features', 'Summary']
  }
};
```

## System Components

### LessonRepository
- Loads and manages lesson data from the file system
- Handles backup creation and content updates
- Supports multi-language content management

### ContentAuditor
- Validates content existence and completeness
- Analyzes content length disparities between languages
- Identifies structural and organizational issues

### QualityChecker
- Assesses content quality and educational value
- Evaluates readability and explanation depth
- Validates content structure and organization

### LanguageValidator
- Ensures consistency between English and Farsi content
- Validates concept coverage equivalence
- Checks terminology consistency

### CodeValidator
- Validates code syntax and best practices
- Ensures adequate code comments
- Checks code example consistency between languages

### ContentEnhancer
- Expands incomplete explanations
- Improves code examples with detailed comments
- Fills language gaps for missing translations
- Maintains content structure and accuracy

### ReportGenerator
- Creates comprehensive audit reports
- Supports multiple output formats (JSON, Markdown, HTML)
- Generates progress tracking and improvement metrics

## Report Types

### Audit Report
- Overall quality scores and distribution
- Detailed findings categorized by severity
- Specific recommendations for improvement
- File locations and suggested fixes

### Quality Report
- Content quality metrics and analysis
- Educational value assessment
- Structure and organization evaluation

### Language Validation Report
- Cross-language consistency analysis
- Terminology validation results
- Content parity measurements

### Enhancement Report
- Summary of changes made to lessons
- Before/after quality comparisons
- Change tracking and documentation

## Output Structure

```
audit-system/
├── backups/           # Backup files before modifications
├── reports/           # Generated audit and enhancement reports
└── output/           # Additional output files
```

## Quality Standards

The system enforces the following quality standards:

- **Minimum Content Length**: 500 characters per language
- **Language Balance**: Content ratio between languages should be 0.5-2.0
- **Code Examples**: At least 1 practical code example per lesson
- **Required Sections**: Definition, Key Features, and Summary sections
- **Educational Value**: Minimum score of 75/100
- **Readability**: Minimum score of 70/100

## Error Handling

The system includes comprehensive error handling for:
- Missing or corrupted lesson files
- File system permission issues
- Invalid content structure
- Enhancement failures
- Report generation errors

## Contributing

1. Follow the existing code structure and patterns
2. Add appropriate error handling and logging
3. Update configuration as needed for new features
4. Test with sample lesson data before deployment

## License

MIT License - see LICENSE file for details.