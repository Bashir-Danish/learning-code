/**
 * Configuration file for React lessons audit and enhancement system
 */

export const auditConfig = {
  // Directory paths
  paths: {
    reactLessons: 'data/lessons',
    backupDir: 'audit-system/backups',
    reportsDir: 'audit-system/reports',
    outputDir: 'audit-system/output'
  },

  // React lesson difficulty levels
  difficultyLevels: [
    'react-fundamentals',
    'react-intermediate', 
    'react-advanced',
    'react-expert'
  ],

  // Content validation thresholds
  validation: {
    // Minimum content length (characters)
    minContentLength: 500,
    
    // Maximum acceptable length ratio between languages (English/Farsi)
    maxLanguageRatio: 2.0,
    
    // Minimum acceptable length ratio between languages
    minLanguageRatio: 0.5,
    
    // Minimum number of code examples per lesson
    minCodeExamples: 1,
    
    // Minimum explanation depth score (0-100)
    minExplanationDepth: 60
  },

  // Quality assessment criteria
  quality: {
    // Minimum readability score (0-100)
    minReadabilityScore: 70,
    
    // Minimum educational value score (0-100)
    minEducationalValue: 75,
    
    // Required structural elements
    requiredSections: [
      'Definition',
      'Key Features',
      'Summary'
    ],
    
    // Code quality criteria
    codeQuality: {
      requireComments: true,
      requirePracticalExamples: true,
      checkSyntax: true
    }
  },

  // Language consistency settings
  language: {
    // Technical terms that should be consistent across languages
    technicalTerms: [
      'React',
      'JSX',
      'useState',
      'useEffect',
      'Props',
      'State',
      'Component',
      'Hook',
      'API',
      'DOM'
    ],
    
    // Content sections that must exist in both languages
    requiredSections: [
      'content',
      'contentFa'
    ]
  },

  // Reporting settings
  reporting: {
    // Severity levels for findings
    severityLevels: {
      CRITICAL: 'critical',
      HIGH: 'high', 
      MEDIUM: 'medium',
      LOW: 'low'
    },
    
    // Report formats
    formats: ['json', 'markdown', 'html'],
    
    // Include detailed recommendations
    includeRecommendations: true
  },

  // Enhancement settings
  enhancement: {
    // Create backups before modifications
    createBackups: true,
    
    // Preserve original structure
    preserveStructure: true,
    
    // Log all changes
    logChanges: true,
    
    // Maximum content expansion ratio
    maxExpansionRatio: 1.5
  }
};

export default auditConfig;