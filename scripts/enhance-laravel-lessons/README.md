# Laravel Lessons Enhancement System

This system enhances all 17 Laravel lessons with comprehensive content, file structures, code examples, tricks, best practices, and bilingual support.

## Installation

```bash
cd scripts/enhance-laravel-lessons
npm install
```

## Usage

Enhance all lessons:
```bash
npm run enhance
```

Enhance a single lesson:
```bash
npm run enhance:single -- laravel-12-intro-setup
```

Dry run (validate without writing):
```bash
npm run enhance:dry-run
```

## Testing

Run all tests:
```bash
npm test
```

## Structure

- `src/` - Source code
  - `parsers/` - Lesson file parsing
  - `analyzers/` - Content analysis
  - `generators/` - Content generation
  - `writers/` - File writing
  - `utils/` - Utility functions
- `data/` - Reference data (Laravel structures, best practices)
- `tests/` - Test files
