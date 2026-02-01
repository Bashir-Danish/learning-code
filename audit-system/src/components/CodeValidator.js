/**
 * Code Validator - Validates code examples for syntax, best practices, and educational value
 */

import { AuditFinding } from '../models/Lesson.js';
import auditConfig from '../../config/audit-config.js';

export class CodeValidator {
  constructor() {
    this.config = auditConfig;
  }

  /**
   * Validate code examples in a lesson
   */
  validateCodeExamples(lesson, auditResult) {
    const codeExamples = lesson.extractCodeExamples();
    
    // Validate English code examples
    this.validateCodeBlocks(codeExamples.english, 'English', lesson, auditResult);
    
    // Validate Farsi code examples
    this.validateCodeBlocks(codeExamples.farsi, 'Farsi', lesson, auditResult);
    
    // Check for consistency between languages
    this.validateCodeConsistency(codeExamples, lesson, auditResult);
    
    return {
      englishCodeBlocks: codeExamples.english.length,
      farsiCodeBlocks: codeExamples.farsi.length,
      totalIssues: auditResult.findings.filter(f => f.type.includes('code')).length
    };
  }

  /**
   * Validate individual code blocks
   */
  validateCodeBlocks(codeBlocks, language, lesson, auditResult) {
    codeBlocks.forEach((block, index) => {
      const blockId = `${language} code block ${index + 1}`;
      
      // Check for empty code blocks
      if (!block.code || block.code.trim().length === 0) {
        auditResult.addFinding(new AuditFinding(
          'empty_code_block',
          'medium',
          `Empty code block found in ${language} content`,
          `${lesson.filePath}:${blockId}`,
          'Remove empty code blocks or add meaningful code examples'
        ));
        return;
      }
      
      // Validate syntax based on language
      this.validateSyntax(block, blockId, lesson, auditResult);
      
      // Check for best practices
      this.checkBestPractices(block, blockId, lesson, auditResult);
      
      // Assess educational value
      this.assessCodeEducationalValue(block, blockId, lesson, auditResult);
      
      // Check for adequate comments
      this.checkCommentAdequacy(block, blockId, lesson, auditResult);
    });
  }

  /**
   * Validate code syntax
   */
  validateSyntax(codeBlock, blockId, lesson, auditResult) {
    const { code, language } = codeBlock;
    
    if (language === 'jsx' || language === 'javascript' || language === 'js') {
      this.validateJavaScriptSyntax(code, blockId, lesson, auditResult);
    } else if (language === 'html') {
      this.validateHTMLSyntax(code, blockId, lesson, auditResult);
    } else if (language === 'css') {
      this.validateCSSSyntax(code, blockId, lesson, auditResult);
    }
  }

  /**
   * Validate JavaScript/JSX syntax
   */
  validateJavaScriptSyntax(code, blockId, lesson, auditResult) {
    // Check for common syntax errors
    const syntaxIssues = [];
    
    // Check for unmatched brackets
    const brackets = { '(': 0, '[': 0, '{': 0 };
    const closingBrackets = { ')': '(', ']': '[', '}': '{' };
    
    for (const char of code) {
      if (brackets.hasOwnProperty(char)) {
        brackets[char]++;
      } else if (closingBrackets.hasOwnProperty(char)) {
        const opening = closingBrackets[char];
        if (brackets[opening] > 0) {
          brackets[opening]--;
        } else {
          syntaxIssues.push(`Unmatched closing bracket: ${char}`);
        }
      }
    }
    
    // Check for remaining unmatched opening brackets
    Object.entries(brackets).forEach(([bracket, count]) => {
      if (count > 0) {
        syntaxIssues.push(`Unmatched opening bracket: ${bracket} (${count} times)`);
      }
    });
    
    // Check for common JSX issues
    if (code.includes('<') && code.includes('>')) {
      // Check for unclosed JSX tags
      const jsxTags = code.match(/<[^/>][^>]*>/g) || [];
      const closingTags = code.match(/<\/[^>]+>/g) || [];
      const selfClosingTags = code.match(/<[^>]*\/>/g) || [];
      
      const openTags = jsxTags.length;
      const closedTags = closingTags.length + selfClosingTags.length;
      
      if (openTags !== closedTags && Math.abs(openTags - closedTags) > 1) {
        syntaxIssues.push('Potential JSX tag mismatch');
      }
      
      // Check for class instead of className
      if (code.includes('class=') && !code.includes('className=')) {
        syntaxIssues.push('Use className instead of class in JSX');
      }
    }
    
    // Check for missing semicolons in statements
    const lines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    lines.forEach((line, index) => {
      if (line.match(/^(const|let|var|return|import|export)/) && 
          !line.endsWith(';') && 
          !line.endsWith('{') && 
          !line.endsWith('(') &&
          !line.includes('=>')) {
        syntaxIssues.push(`Line ${index + 1}: Missing semicolon`);
      }
    });
    
    // Report syntax issues
    if (syntaxIssues.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'code_syntax_error',
        'high',
        `Syntax issues in ${blockId}: ${syntaxIssues.join(', ')}`,
        `${lesson.filePath}:${blockId}`,
        'Fix syntax errors to ensure code examples are valid'
      ));
    }
  }

  /**
   * Validate HTML syntax
   */
  validateHTMLSyntax(code, blockId, lesson, auditResult) {
    const issues = [];
    
    // Check for unclosed tags
    const openTags = (code.match(/<[^/>][^>]*>/g) || []).length;
    const closeTags = (code.match(/<\/[^>]+>/g) || []).length;
    const selfClosing = (code.match(/<[^>]*\/>/g) || []).length;
    
    if (openTags !== closeTags + selfClosing) {
      issues.push('Potential unclosed HTML tags');
    }
    
    if (issues.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'code_syntax_error',
        'medium',
        `HTML syntax issues in ${blockId}: ${issues.join(', ')}`,
        `${lesson.filePath}:${blockId}`,
        'Fix HTML syntax errors'
      ));
    }
  }

  /**
   * Validate CSS syntax
   */
  validateCSSSyntax(code, blockId, lesson, auditResult) {
    const issues = [];
    
    // Check for unmatched braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      issues.push('Unmatched CSS braces');
    }
    
    if (issues.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'code_syntax_error',
        'medium',
        `CSS syntax issues in ${blockId}: ${issues.join(', ')}`,
        `${lesson.filePath}:${blockId}`,
        'Fix CSS syntax errors'
      ));
    }
  }

  /**
   * Check for best practices in code
   */
  checkBestPractices(codeBlock, blockId, lesson, auditResult) {
    const { code, language } = codeBlock;
    const issues = [];
    
    if (language === 'jsx' || language === 'javascript' || language === 'js') {
      // Check for React best practices
      if (code.includes('React')) {
        // Check for proper import
        if (!code.includes('import') && code.includes('useState')) {
          issues.push('Missing React hooks import');
        }
        
        // Check for proper component naming
        const componentMatch = code.match(/function\s+([a-z][A-Za-z]*)/);
        if (componentMatch) {
          issues.push('Component names should start with uppercase letter');
        }
        
        // Check for key prop in lists
        if (code.includes('.map(') && !code.includes('key=')) {
          issues.push('Missing key prop in list rendering');
        }
      }
      
      // Check for modern JavaScript practices
      if (code.includes('var ')) {
        issues.push('Use const/let instead of var');
      }
      
      // Check for arrow functions in appropriate contexts
      if (code.includes('function(') && code.includes('onClick')) {
        issues.push('Consider using arrow functions for event handlers');
      }
    }
    
    if (issues.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'code_best_practices',
        'low',
        `Best practice issues in ${blockId}: ${issues.join(', ')}`,
        `${lesson.filePath}:${blockId}`,
        'Follow React and JavaScript best practices'
      ));
    }
  }

  /**
   * Assess educational value of code examples
   */
  assessCodeEducationalValue(codeBlock, blockId, lesson, auditResult) {
    const { code } = codeBlock;
    const issues = [];
    
    // Check if code is too simple
    if (code.length < 20) {
      issues.push('Code example is very short and may lack educational value');
    }
    
    // Check if code is too complex for the lesson level
    if (lesson.difficulty === 'easy' && code.length > 500) {
      issues.push('Code example may be too complex for beginner level');
    }
    
    // Check for meaningful variable names
    const variables = code.match(/(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g) || [];
    const poorNames = variables.filter(v => /\b(a|b|c|x|y|z|temp|data|item)\b/.test(v));
    if (poorNames.length > 0) {
      issues.push('Use more descriptive variable names');
    }
    
    // Check for practical relevance
    const practicalKeywords = ['useState', 'useEffect', 'onClick', 'onChange', 'props', 'state'];
    const hasPracticalContent = practicalKeywords.some(keyword => code.includes(keyword));
    
    if (!hasPracticalContent && code.length > 50) {
      issues.push('Code example lacks practical React concepts');
    }
    
    if (issues.length > 0) {
      auditResult.addFinding(new AuditFinding(
        'code_educational_value',
        'low',
        `Educational value issues in ${blockId}: ${issues.join(', ')}`,
        `${lesson.filePath}:${blockId}`,
        'Improve code example to be more educational and practical'
      ));
    }
  }

  /**
   * Check for adequate comments in code
   */
  checkCommentAdequacy(codeBlock, blockId, lesson, auditResult) {
    const { code } = codeBlock;
    
    if (this.config.quality.codeQuality.requireComments) {
      const codeLines = code.split('\n').filter(line => line.trim().length > 0);
      const commentLines = codeLines.filter(line => 
        line.trim().startsWith('//') || 
        line.includes('/*') || 
        line.includes('*/')
      );
      
      // Require comments for longer code blocks
      if (codeLines.length > 5 && commentLines.length === 0) {
        auditResult.addFinding(new AuditFinding(
          'missing_code_comments',
          'low',
          `${blockId} lacks explanatory comments`,
          `${lesson.filePath}:${blockId}`,
          'Add comments to explain complex code sections'
        ));
      }
      
      // Check for meaningful comments
      const meaningfulComments = commentLines.filter(line => {
        const comment = line.replace(/\/\/|\*|\/\*/g, '').trim();
        return comment.length > 10 && !comment.match(/^(TODO|FIXME|NOTE)$/);
      });
      
      if (codeLines.length > 10 && meaningfulComments.length === 0) {
        auditResult.addFinding(new AuditFinding(
          'inadequate_code_comments',
          'low',
          `${blockId} needs more meaningful comments`,
          `${lesson.filePath}:${blockId}`,
          'Add descriptive comments explaining the code logic'
        ));
      }
    }
  }

  /**
   * Validate consistency between language versions
   */
  validateCodeConsistency(codeExamples, lesson, auditResult) {
    const { english, farsi } = codeExamples;
    
    // Check if both versions have similar number of code examples
    const countDiff = Math.abs(english.length - farsi.length);
    if (countDiff > 1) {
      auditResult.addFinding(new AuditFinding(
        'code_consistency',
        'medium',
        `Code example count mismatch (English: ${english.length}, Farsi: ${farsi.length})`,
        lesson.filePath,
        'Ensure both language versions have equivalent code examples'
      ));
    }
    
    // Check if code content is similar (allowing for comments in different languages)
    english.forEach((englishBlock, index) => {
      if (index < farsi.length) {
        const farsiBlock = farsi[index];
        const similarity = this.calculateCodeSimilarity(englishBlock.code, farsiBlock.code);
        
        if (similarity < 0.7) {
          auditResult.addFinding(new AuditFinding(
            'code_consistency',
            'low',
            `Code example ${index + 1} differs significantly between languages`,
            lesson.filePath,
            'Ensure code examples are equivalent between language versions'
          ));
        }
      }
    });
  }

  /**
   * Calculate similarity between two code blocks
   */
  calculateCodeSimilarity(code1, code2) {
    // Remove comments and whitespace for comparison
    const normalize = (code) => {
      return code
        .replace(/\/\/.*$/gm, '') // Remove single-line comments
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
    };
    
    const normalized1 = normalize(code1);
    const normalized2 = normalize(code2);
    
    if (normalized1 === normalized2) return 1.0;
    
    // Simple similarity calculation based on common characters
    const longer = normalized1.length > normalized2.length ? normalized1 : normalized2;
    const shorter = normalized1.length > normalized2.length ? normalized2 : normalized1;
    
    if (longer.length === 0) return 1.0;
    
    let matches = 0;
    for (let i = 0; i < shorter.length; i++) {
      if (longer[i] === shorter[i]) matches++;
    }
    
    return matches / longer.length;
  }

  /**
   * Generate code validation report
   */
  generateCodeValidationReport(lessons) {
    const report = {
      timestamp: new Date().toISOString(),
      totalLessons: lessons.length,
      codeMetrics: {
        totalCodeBlocks: 0,
        averageCodeBlocksPerLesson: 0,
        syntaxErrors: 0,
        bestPracticeIssues: 0,
        missingComments: 0,
        consistencyIssues: 0
      },
      lessonCodeAnalysis: []
    };
    
    lessons.forEach(lesson => {
      const codeExamples = lesson.extractCodeExamples();
      const lessonAnalysis = {
        lessonId: lesson.id,
        englishCodeBlocks: codeExamples.english.length,
        farsiCodeBlocks: codeExamples.farsi.length,
        issues: []
      };
      
      report.codeMetrics.totalCodeBlocks += codeExamples.english.length + codeExamples.farsi.length;
      
      // Analyze each code block
      [...codeExamples.english, ...codeExamples.farsi].forEach((block, index) => {
        const analysis = this.analyzeCodeBlock(block);
        lessonAnalysis.issues.push(...analysis.issues);
        
        report.codeMetrics.syntaxErrors += analysis.syntaxErrors;
        report.codeMetrics.bestPracticeIssues += analysis.bestPracticeIssues;
        report.codeMetrics.missingComments += analysis.missingComments;
      });
      
      report.lessonCodeAnalysis.push(lessonAnalysis);
    });
    
    report.codeMetrics.averageCodeBlocksPerLesson = lessons.length > 0 
      ? Math.round((report.codeMetrics.totalCodeBlocks / lessons.length) * 10) / 10 
      : 0;
    
    return report;
  }

  /**
   * Analyze a single code block
   */
  analyzeCodeBlock(codeBlock) {
    const analysis = {
      issues: [],
      syntaxErrors: 0,
      bestPracticeIssues: 0,
      missingComments: 0
    };
    
    const { code, language } = codeBlock;
    
    if (!code || code.trim().length === 0) {
      analysis.issues.push('Empty code block');
      return analysis;
    }
    
    // Basic syntax check
    if (language === 'jsx' || language === 'javascript') {
      const brackets = { '(': 0, '[': 0, '{': 0 };
      for (const char of code) {
        if (brackets.hasOwnProperty(char)) brackets[char]++;
        else if ([')', ']', '}'].includes(char)) {
          const opening = { ')': '(', ']': '[', '}': '{' }[char];
          if (brackets[opening] > 0) brackets[opening]--;
          else analysis.syntaxErrors++;
        }
      }
      
      Object.values(brackets).forEach(count => {
        analysis.syntaxErrors += count;
      });
    }
    
    // Check for comments
    const hasComments = code.includes('//') || code.includes('/*');
    if (!hasComments && code.split('\n').length > 5) {
      analysis.missingComments++;
    }
    
    // Check for best practices
    if (code.includes('var ')) analysis.bestPracticeIssues++;
    if (code.includes('class=') && !code.includes('className=')) analysis.bestPracticeIssues++;
    
    return analysis;
  }
}