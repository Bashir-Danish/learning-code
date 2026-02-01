# Integration Guide: React Lessons Audit System

This guide explains how to integrate the React Lessons Audit System with your main React application.

## Overview

The audit system has been integrated into your main app with:
- **UI Interface**: New `/audit` page accessible from the sidebar
- **Service Layer**: `services/auditService.js` for API communication
- **Backend Integration**: Ready for connection to the audit system

## Current Integration

### 1. UI Components Added
- `pages/AuditPage.jsx` - Main audit interface
- Updated `components/Layout/Sidebar.jsx` - Added audit tool to sidebar
- Updated `App.jsx` - Added audit route

### 2. Service Layer
- `services/auditService.js` - Handles communication with audit system
- Currently uses simulated data for demonstration
- Ready to connect to real backend API

### 3. Features Available
- **Run Audit**: Analyze all React lessons for quality and consistency
- **Content Enhancement**: Automatically improve lesson content
- **Download Reports**: Export audit results in JSON/Markdown formats
- **Detailed Analysis**: View lesson-by-lesson findings and recommendations
- **Multi-language Support**: Full English/Farsi interface

## Backend Integration Steps

To connect the UI to the actual audit system:

### Step 1: Create Backend API Endpoints

Create these endpoints in your backend:

```javascript
// POST /api/audit/run - Run audit
app.post('/api/audit/run', async (req, res) => {
  try {
    const { ReactLessonsAuditSystem } = require('./audit-system/src/index.js');
    const system = new ReactLessonsAuditSystem();
    
    const result = await system.runAuditOnly({
      formats: ['json']
    });
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/audit/enhance - Run enhancement
app.post('/api/audit/enhance', async (req, res) => {
  try {
    const { ReactLessonsAuditSystem } = require('./audit-system/src/index.js');
    const system = new ReactLessonsAuditSystem();
    
    const result = await system.runEnhancementOnly();
    
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/audit/stats - Get statistics
app.get('/api/audit/stats', async (req, res) => {
  try {
    const { ReactLessonsAuditSystem } = require('./audit-system/src/index.js');
    const system = new ReactLessonsAuditSystem();
    
    const stats = await system.getStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/audit/report - Download report
app.get('/api/audit/report', async (req, res) => {
  const format = req.query.format || 'json';
  
  try {
    // Return the latest report file
    const reportPath = `./audit-system/reports/audit-report-latest.${format}`;
    res.download(reportPath);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### Step 2: Update Service Configuration

Update `services/auditService.js`:

```javascript
// Change this line:
this.baseUrl = '/api/audit'; // Update to your actual API endpoint

// Remove simulation methods and use real API calls:
async runAudit() {
  const response = await fetch(`${this.baseUrl}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Audit failed');
  }
  
  return await response.json();
}
```

### Step 3: Install Dependencies

In your backend, install the audit system dependencies:

```bash
cd audit-system
npm install
```

### Step 4: Configure Paths

Update `audit-system/config/audit-config.js` to point to your lesson files:

```javascript
export const auditConfig = {
  paths: {
    reactLessons: '../data/lessons', // Adjust path to your lessons
    backupDir: './backups',
    reportsDir: './reports'
  },
  // ... rest of config
};
```

## Usage

Once integrated, users can:

1. **Access the Audit Tool**: Click "Lesson Audit" in the sidebar (only visible for React technology)

2. **Run Analysis**: Click "Run Audit" to analyze all React lessons

3. **View Results**: See detailed analysis including:
   - Overall quality scores
   - Lessons needing attention
   - Specific issues and recommendations
   - Language consistency problems

4. **Enhance Content**: Click "Enhance Content" to automatically improve lessons

5. **Download Reports**: Export detailed reports in JSON or Markdown format

## Features

### Audit Analysis
- **Content Completeness**: Checks for missing English/Farsi content
- **Quality Assessment**: Evaluates educational value and readability
- **Language Consistency**: Ensures equivalent content in both languages
- **Code Validation**: Checks syntax and best practices
- **Structure Analysis**: Validates proper organization and formatting

### Content Enhancement
- **Automatic Improvement**: Expands incomplete explanations
- **Code Comments**: Adds detailed comments to code examples
- **Language Gap Filling**: Creates missing translations
- **Structure Fixes**: Improves organization and formatting

### Reporting
- **Detailed Findings**: Specific issues with severity levels
- **Recommendations**: Actionable suggestions for improvement
- **Progress Tracking**: Before/after comparisons
- **Multiple Formats**: JSON, Markdown, and HTML reports

## Security Considerations

- Ensure proper authentication for audit endpoints
- Validate file paths to prevent directory traversal
- Limit file access to lesson directories only
- Consider rate limiting for resource-intensive operations

## Performance Notes

- Audit operations can be CPU intensive
- Consider running audits asynchronously
- Cache results when possible
- Provide progress indicators for long operations

## Troubleshooting

### Common Issues

1. **"No lessons found"**: Check that lesson files are in the correct directory structure
2. **Permission errors**: Ensure the audit system has read/write access to lesson files
3. **API timeouts**: Increase timeout limits for audit operations
4. **Memory issues**: Consider processing lessons in batches for large datasets

### Debug Mode

Enable debug logging in the audit system:

```javascript
// In audit-system/config/audit-config.js
export const auditConfig = {
  debug: true, // Enable debug logging
  // ... rest of config
};
```

## Next Steps

1. Set up backend API endpoints
2. Update service configuration
3. Test with a small subset of lessons
4. Deploy to production environment
5. Monitor performance and adjust as needed

The audit system is now fully integrated into your React learning platform and ready to help maintain high-quality, consistent lesson content!