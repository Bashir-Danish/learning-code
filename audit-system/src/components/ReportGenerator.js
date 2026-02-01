/**
 * Report Generator - Creates comprehensive audit reports with findings categorized by severity
 */

import fs from 'fs-extra';
import path from 'path';
import auditConfig from '../../config/audit-config.js';

export class ReportGenerator {
  constructor(outputPath = null) {
    this.outputPath = outputPath || auditConfig.paths.reportsDir;
  }

  /**
   * Generate comprehensive audit report
   */
  async generateAuditReport(auditResults, summary, options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportData = {
      metadata: {
        generatedAt: new Date().toISOString(),
        totalLessons: auditResults.length,
        reportVersion: '1.0.0',
        configUsed: auditConfig
      },
      summary,
      results: auditResults,
      recommendations: this.generateGlobalRecommendations(summary)
    };

    // Ensure output directory exists
    await fs.ensureDir(this.outputPath);

    const reports = [];

    // Generate JSON report
    if (!options.formats || options.formats.includes('json')) {
      const jsonPath = await this.generateJSONReport(reportData, timestamp);
      reports.push(jsonPath);
    }

    // Generate Markdown report
    if (!options.formats || options.formats.includes('markdown')) {
      const markdownPath = await this.generateMarkdownReport(reportData, timestamp);
      reports.push(markdownPath);
    }

    // Generate HTML report
    if (options.formats && options.formats.includes('html')) {
      const htmlPath = await this.generateHTMLReport(reportData, timestamp);
      reports.push(htmlPath);
    }

    console.log(`Generated ${reports.length} audit reports in: ${this.outputPath}`);
    return reports;
  }

  /**
   * Generate JSON format report
   */
  async generateJSONReport(reportData, timestamp) {
    const fileName = `audit-report-${timestamp}.json`;
    const filePath = path.join(this.outputPath, fileName);
    
    await fs.writeFile(filePath, JSON.stringify(reportData, null, 2), 'utf8');
    console.log(`JSON report generated: ${fileName}`);
    
    return filePath;
  }

  /**
   * Generate Markdown format report
   */
  async generateMarkdownReport(reportData, timestamp) {
    const fileName = `audit-report-${timestamp}.md`;
    const filePath = path.join(this.outputPath, fileName);
    
    const markdown = this.buildMarkdownReport(reportData);
    await fs.writeFile(filePath, markdown, 'utf8');
    console.log(`Markdown report generated: ${fileName}`);
    
    return filePath;
  }

  /**
   * Build markdown report content
   */
  buildMarkdownReport(reportData) {
    const { metadata, summary, results, recommendations } = reportData;
    
    let markdown = `# React Lessons Audit Report

Generated: ${new Date(metadata.generatedAt).toLocaleString()}
Total Lessons Audited: ${metadata.totalLessons}

## Executive Summary

- **Average Score**: ${summary.averageScore}/100
- **Lessons Needing Attention**: ${summary.lessonsNeedingAttention.length}
- **Total Findings**: ${Object.values(summary.findingsByType).reduce((a, b) => a + b, 0)}

### Score Distribution
- **Excellent (90-100)**: ${summary.scoreDistribution.excellent} lessons
- **Good (75-89)**: ${summary.scoreDistribution.good} lessons  
- **Fair (60-74)**: ${summary.scoreDistribution.fair} lessons
- **Poor (<60)**: ${summary.scoreDistribution.poor} lessons

### Findings by Severity
`;

    // Add findings by severity
    Object.entries(summary.findingsBySeverity).forEach(([severity, count]) => {
      markdown += `- **${severity.toUpperCase()}**: ${count} findings\n`;
    });

    markdown += `\n### Findings by Type\n`;
    
    // Add findings by type
    Object.entries(summary.findingsByType).forEach(([type, count]) => {
      markdown += `- **${type.replace(/_/g, ' ').toUpperCase()}**: ${count} findings\n`;
    });

    // Add global recommendations
    markdown += `\n## Global Recommendations\n\n`;
    recommendations.forEach(rec => {
      markdown += `- ${rec}\n`;
    });

    // Add lessons needing attention
    if (summary.lessonsNeedingAttention.length > 0) {
      markdown += `\n## Lessons Requiring Immediate Attention\n\n`;
      summary.lessonsNeedingAttention.forEach(lesson => {
        markdown += `### ${lesson.lessonId}\n`;
        markdown += `- **Score**: ${lesson.score}/100\n`;
        markdown += `- **Critical Issues**: ${lesson.criticalIssues}\n\n`;
      });
    }

    // Add detailed findings for each lesson
    markdown += `\n## Detailed Lesson Analysis\n\n`;
    
    results.forEach(result => {
      markdown += `### ${result.lessonId}\n`;
      markdown += `**Score**: ${result.overallScore}/100\n\n`;
      
      if (result.findings.length > 0) {
        markdown += `**Findings**:\n`;
        result.findings.forEach(finding => {
          markdown += `- **${finding.severity.toUpperCase()}**: ${finding.description}\n`;
          markdown += `  - *Location*: ${finding.location}\n`;
          markdown += `  - *Suggested Fix*: ${finding.suggestedFix}\n\n`;
        });
      }
      
      if (result.recommendations.length > 0) {
        markdown += `**Recommendations**:\n`;
        result.recommendations.forEach(rec => {
          markdown += `- ${rec}\n`;
        });
      }
      
      markdown += `\n---\n\n`;
    });

    return markdown;
  }

  /**
   * Generate HTML format report
   */
  async generateHTMLReport(reportData, timestamp) {
    const fileName = `audit-report-${timestamp}.html`;
    const filePath = path.join(this.outputPath, fileName);
    
    const html = this.buildHTMLReport(reportData);
    await fs.writeFile(filePath, html, 'utf8');
    console.log(`HTML report generated: ${fileName}`);
    
    return filePath;
  }

  /**
   * Build HTML report content
   */
  buildHTMLReport(reportData) {
    const { metadata, summary, results, recommendations } = reportData;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Lessons Audit Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { background: #f4f4f4; padding: 20px; border-radius: 5px; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .card { background: white; border: 1px solid #ddd; border-radius: 5px; padding: 20px; }
        .score-excellent { color: #28a745; }
        .score-good { color: #17a2b8; }
        .score-fair { color: #ffc107; }
        .score-poor { color: #dc3545; }
        .severity-critical { color: #dc3545; font-weight: bold; }
        .severity-high { color: #fd7e14; font-weight: bold; }
        .severity-medium { color: #ffc107; }
        .severity-low { color: #6c757d; }
        .lesson-details { margin-bottom: 30px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
        .findings { margin-left: 20px; }
        .finding { margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 3px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>React Lessons Audit Report</h1>
        <p><strong>Generated:</strong> ${new Date(metadata.generatedAt).toLocaleString()}</p>
        <p><strong>Total Lessons:</strong> ${metadata.totalLessons}</p>
    </div>

    <div class="summary">
        <div class="card">
            <h3>Overall Score</h3>
            <h2 class="score-${this.getScoreClass(summary.averageScore)}">${summary.averageScore}/100</h2>
        </div>
        <div class="card">
            <h3>Lessons Needing Attention</h3>
            <h2 class="score-poor">${summary.lessonsNeedingAttention.length}</h2>
        </div>
        <div class="card">
            <h3>Total Findings</h3>
            <h2>${Object.values(summary.findingsByType).reduce((a, b) => a + b, 0)}</h2>
        </div>
    </div>

    <h2>Score Distribution</h2>
    <table>
        <tr><th>Category</th><th>Count</th><th>Percentage</th></tr>
        <tr><td>Excellent (90-100)</td><td>${summary.scoreDistribution.excellent}</td><td>${((summary.scoreDistribution.excellent / metadata.totalLessons) * 100).toFixed(1)}%</td></tr>
        <tr><td>Good (75-89)</td><td>${summary.scoreDistribution.good}</td><td>${((summary.scoreDistribution.good / metadata.totalLessons) * 100).toFixed(1)}%</td></tr>
        <tr><td>Fair (60-74)</td><td>${summary.scoreDistribution.fair}</td><td>${((summary.scoreDistribution.fair / metadata.totalLessons) * 100).toFixed(1)}%</td></tr>
        <tr><td>Poor (<60)</td><td>${summary.scoreDistribution.poor}</td><td>${((summary.scoreDistribution.poor / metadata.totalLessons) * 100).toFixed(1)}%</td></tr>
    </table>

    <h2>Global Recommendations</h2>
    <ul>
        ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
    </ul>

    <h2>Detailed Lesson Analysis</h2>
    ${results.map(result => `
        <div class="lesson-details">
            <h3>${result.lessonId}</h3>
            <p><strong>Score:</strong> <span class="score-${this.getScoreClass(result.overallScore)}">${result.overallScore}/100</span></p>
            
            ${result.findings.length > 0 ? `
                <h4>Findings (${result.findings.length})</h4>
                <div class="findings">
                    ${result.findings.map(finding => `
                        <div class="finding">
                            <span class="severity-${finding.severity}">[${finding.severity.toUpperCase()}]</span>
                            <strong>${finding.description}</strong><br>
                            <small><strong>Location:</strong> ${finding.location}</small><br>
                            <small><strong>Fix:</strong> ${finding.suggestedFix}</small>
                        </div>
                    `).join('')}
                </div>
            ` : '<p>No issues found.</p>'}
            
            ${result.recommendations.length > 0 ? `
                <h4>Recommendations</h4>
                <ul>
                    ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('')}

</body>
</html>`;
  }

  /**
   * Get CSS class for score styling
   */
  getScoreClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
  }

  /**
   * Generate global recommendations based on summary
   */
  generateGlobalRecommendations(summary) {
    const recommendations = [];

    if (summary.averageScore < 70) {
      recommendations.push('Overall content quality needs significant improvement across all lessons');
    }

    if (summary.lessonsNeedingAttention.length > summary.totalLessons * 0.3) {
      recommendations.push('More than 30% of lessons require attention - consider systematic content review');
    }

    if (summary.findingsByType.missing_content > 0) {
      recommendations.push('Priority: Address missing content issues to ensure comprehensive coverage');
    }

    if (summary.findingsByType.language_inconsistency > summary.totalLessons * 0.5) {
      recommendations.push('Significant language consistency issues detected - review translation quality');
    }

    if (summary.findingsBySeverity.critical > 0) {
      recommendations.push(`${summary.findingsBySeverity.critical} critical issues require immediate attention`);
    }

    if (summary.scoreDistribution.excellent < summary.totalLessons * 0.2) {
      recommendations.push('Less than 20% of lessons achieve excellent scores - raise quality standards');
    }

    return recommendations;
  }

  /**
   * Generate progress tracking report
   */
  async generateProgressReport(beforeResults, afterResults, timestamp) {
    const progressData = this.calculateProgress(beforeResults, afterResults);
    
    const fileName = `progress-report-${timestamp}.json`;
    const filePath = path.join(this.outputPath, fileName);
    
    await fs.writeFile(filePath, JSON.stringify(progressData, null, 2), 'utf8');
    console.log(`Progress report generated: ${fileName}`);
    
    return filePath;
  }

  /**
   * Calculate progress between two audit runs
   */
  calculateProgress(beforeResults, afterResults) {
    const beforeMap = new Map(beforeResults.map(r => [r.lessonId, r]));
    const afterMap = new Map(afterResults.map(r => [r.lessonId, r]));
    
    const progress = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLessons: afterResults.length,
        improved: 0,
        degraded: 0,
        unchanged: 0,
        averageScoreChange: 0
      },
      lessonChanges: []
    };

    let totalScoreChange = 0;

    afterResults.forEach(afterResult => {
      const beforeResult = beforeMap.get(afterResult.lessonId);
      
      if (beforeResult) {
        const scoreChange = afterResult.overallScore - beforeResult.overallScore;
        totalScoreChange += scoreChange;
        
        let status = 'unchanged';
        if (scoreChange > 2) status = 'improved';
        else if (scoreChange < -2) status = 'degraded';
        
        progress.summary[status]++;
        
        progress.lessonChanges.push({
          lessonId: afterResult.lessonId,
          beforeScore: beforeResult.overallScore,
          afterScore: afterResult.overallScore,
          scoreChange,
          status,
          findingsChange: afterResult.findings.length - beforeResult.findings.length
        });
      }
    });

    progress.summary.averageScoreChange = afterResults.length > 0 
      ? Math.round((totalScoreChange / afterResults.length) * 100) / 100 
      : 0;

    return progress;
  }
}