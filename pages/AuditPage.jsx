import { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Download,
  Play,
  RefreshCw,
  BarChart3,
  Languages,
  Code,
  Sparkles,
  Settings,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function AuditPage() {
  const { t, isRTL } = useLanguage();
  const [auditResults, setAuditResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  const runAudit = async () => {
    setIsRunning(true);
    setError(null);
    
    try {
      const results = await auditService.runAudit();
      setAuditResults(results);
    } catch (err) {
      setError(err.message);
      console.error('Audit failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const runEnhancement = async () => {
    setIsRunning(true);
    setError(null);
    
    try {
      const results = await auditService.runEnhancement();
      // Update audit results with enhanced data, preserving existing structure
      setAuditResults(prev => ({
        ...prev,
        summary: {
          ...prev.summary,
          ...results.summary
        },
        enhancementResults: results
      }));
    } catch (err) {
      setError(err.message);
      console.error('Enhancement failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  const downloadReport = async (format) => {
    try {
      await auditService.downloadReport(format);
    } catch (err) {
      setError(`Failed to download ${format.toUpperCase()} report: ${err.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredLessons = auditResults?.lessons?.filter(lesson => {
    if (filter === 'all') return true;
    return lesson.status === filter;
  }) || [];

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {t('React Lessons Audit', 'بررسی درس‌های ری‌اکت')}
                  </h1>
                  <p className="text-gray-600">
                    {t('Analyze and enhance lesson content quality', 'تحلیل و بهبود کیفیت محتوای درس‌ها')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={runAudit}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isRunning ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {t('Run Audit', 'اجرای بررسی')}
                </button>
                
                {auditResults && (
                  <>
                    <button
                      onClick={runEnhancement}
                      disabled={isRunning}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isRunning ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      {t('Enhance Content', 'بهبود محتوا')}
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadReport('json')}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm"
                      >
                        <Download className="w-4 h-4" />
                        JSON
                      </button>
                      <button
                        onClick={() => downloadReport('markdown')}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm"
                      >
                        <Download className="w-4 h-4" />
                        MD
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">Error:</span>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {!auditResults && !isRunning && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('Ready to Audit', 'آماده برای بررسی')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('Click "Run Audit" to analyze your React lessons for quality and consistency', 'روی "اجرای بررسی" کلیک کنید تا درس‌های ری‌اکت خود را از نظر کیفیت و سازگاری تحلیل کنید')}
            </p>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('Processing...', 'در حال پردازش...')}
            </h3>
            <p className="text-gray-600">
              {t('Analyzing lesson content, please wait...', 'در حال تحلیل محتوای درس‌ها، لطفاً صبر کنید...')}
            </p>
          </div>
        )}

        {auditResults && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {t('Total Lessons', 'کل درس‌ها')}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {auditResults.summary.totalLessons || 0}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {t('Average Score', 'میانگین امتیاز')}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {auditResults.summary.averageScore || 0}/100
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {t('Need Attention', 'نیاز به توجه')}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {auditResults.summary.lessonsNeedingAttention || 0}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {t('Critical Issues', 'مسائل حیاتی')}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {auditResults.summary.findingsBySeverity?.critical || 0}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: t('Overview', 'نمای کلی'), icon: BarChart3 },
                    { id: 'lessons', label: t('Lessons', 'درس‌ها'), icon: FileText },
                    { id: 'issues', label: t('Issues', 'مسائل'), icon: AlertTriangle }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          selectedTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {selectedTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Score Distribution */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {t('Score Distribution', 'توزیع امتیازات')}
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(auditResults.summary.scoreDistribution || {}).map(([level, count]) => (
                          <div key={level} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                level === 'excellent' ? 'bg-green-500' :
                                level === 'good' ? 'bg-blue-500' :
                                level === 'fair' ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                              <span className="text-sm font-medium text-gray-700 capitalize">
                                {t(level, level === 'excellent' ? 'عالی' : level === 'good' ? 'خوب' : level === 'fair' ? 'متوسط' : 'ضعیف')}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Issues by Type */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {t('Issues by Type', 'مسائل بر اساس نوع')}
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(auditResults.summary.findingsByType || {}).map(([type, count]) => (
                          <div key={type} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {type === 'missing_content' && <FileText className="w-4 h-4 text-red-500" />}
                              {type === 'language_inconsistency' && <Languages className="w-4 h-4 text-yellow-500" />}
                              {type === 'structural_problem' && <Settings className="w-4 h-4 text-blue-500" />}
                              {type === 'insufficient_examples' && <Code className="w-4 h-4 text-purple-500" />}
                              {type === 'quality_issue' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                              <span className="text-sm font-medium text-gray-700">
                                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'lessons' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {t('Lesson Analysis', 'تحلیل درس‌ها')}
                      </h3>
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="all">{t('All Lessons', 'همه درس‌ها')}</option>
                        <option value="excellent">{t('Excellent', 'عالی')}</option>
                        <option value="good">{t('Good', 'خوب')}</option>
                        <option value="fair">{t('Fair', 'متوسط')}</option>
                        <option value="poor">{t('Poor', 'ضعیف')}</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {filteredLessons.map((lesson) => (
                        <div key={lesson.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {isRTL ? lesson.titleFa : lesson.title}
                              </h4>
                              <p className="text-sm text-gray-600">{lesson.id}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(lesson.status)}`}>
                                {lesson.score}/100
                              </span>
                            </div>
                          </div>
                          
                          {lesson.findings.length > 0 && (
                            <div className="space-y-2">
                              {lesson.findings.map((finding, index) => (
                                <div key={index} className={`px-3 py-2 rounded-lg text-sm ${getSeverityColor(finding.severity)}`}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium capitalize">{finding.severity}:</span>
                                        <span>{finding.description}</span>
                                      </div>
                                      {finding.location && (
                                        <div className="text-xs opacity-75 mb-1">
                                          <span className="font-medium">Location:</span> {finding.location}
                                        </div>
                                      )}
                                      {finding.suggestedFix && (
                                        <div className="text-xs opacity-90">
                                          <span className="font-medium">Fix:</span> {finding.suggestedFix}
                                        </div>
                                      )}
                                    </div>
                                    <ExternalLink className="w-4 h-4 opacity-50 flex-shrink-0 ml-2" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'issues' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                      {t('All Issues', 'همه مسائل')}
                    </h3>
                    <div className="space-y-4">
                      {(auditResults.lessons || []).flatMap(lesson => 
                        lesson.findings.map((finding, index) => (
                          <div key={`${lesson.id}-${index}`} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                                    {finding.severity.toUpperCase()}
                                  </span>
                                  <span className="text-sm font-medium text-gray-900">
                                    {isRTL ? lesson.titleFa : lesson.title}
                                  </span>
                                </div>
                                <p className="text-gray-700">{finding.description}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuditPage;