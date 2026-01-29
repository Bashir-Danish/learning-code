import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  Clock, Play, Code, CheckCircle2, ArrowLeft, ArrowRight,
  BookOpen, Lightbulb, Target, Zap, Bug, Trophy, ChevronRight,
  Sparkles, Brain, Rocket, Eye, EyeOff, RotateCcw, Copy, Check,
  ChevronDown, AlertTriangle, Globe, Languages
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useIsMobile } from '../hooks/useIsMobile';
import MarkdownRenderer from '../components/Lesson/MarkdownRenderer';
import MobileCodeEditor from '../components/Lesson/MobileCodeEditor';
import AlgorithmDebugger, { lessonsWithDebugger } from '../components/Debugger/AlgorithmDebugger';
import { getLesson } from '../data/lessons';
import { getExercise } from '../data/exercises';
import categoriesData from '../data/categories.json';
import { runTestCases } from '../utils/codeExecutor';

const difficultyConfig = {
  easy: { color: 'green', emoji: '🟢', label: { en: 'Easy', fa: 'آسان' } },
  medium: { color: 'yellow', emoji: '🟡', label: { en: 'Medium', fa: 'متوسط' } },
  hard: { color: 'red', emoji: '🔴', label: { en: 'Hard', fa: 'سخت' } },
  expert: { color: 'purple', emoji: '🟣', label: { en: 'Expert', fa: 'تخصصی' } },
};

const tabs = [
  { id: 'learn', icon: BookOpen, label: { en: 'Learn', fa: 'یادگیری' } },
  { id: 'examples', icon: Lightbulb, label: { en: 'Examples', fa: 'مثال‌ها' } },
  { id: 'tips', icon: Zap, label: { en: 'Tips', fa: 'نکات' } },
  { id: 'practice', icon: Code, label: { en: 'Practice', fa: 'تمرین' } },
  { id: 'debug', icon: Bug, label: { en: 'Debug', fa: 'دیباگ' } },
];

// Context Menu Component for Language Switch
function ContextMenu({ x, y, onClose, onSelectLanguage, currentLang }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px]"
      style={{ left: x, top: y }}
    >
      <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-1">
        <Languages className="w-3 h-3 inline mr-1.5" />
        Content Language
      </div>
      <button
        onClick={() => { onSelectLanguage('en'); onClose(); }}
        className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors ${currentLang === 'en' ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
      >
        <Globe className="w-4 h-4" />
        English
        {currentLang === 'en' && <Check className="w-4 h-4 ml-auto text-primary-600" />}
      </button>
      <button
        onClick={() => { onSelectLanguage('fa'); onClose(); }}
        className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors ${currentLang === 'fa' ? 'bg-primary-50 text-primary-700' : 'text-gray-700'}`}
      >
        <Globe className="w-4 h-4" />
        فارسی
        {currentLang === 'fa' && <Check className="w-4 h-4 ml-auto text-primary-600" />}
      </button>
    </div>
  );
}

// Accordion Component
function Accordion({ title, titleFa, icon: Icon, children, defaultOpen = false, color = 'primary' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { t, isRTL } = useLanguage();

  const colors = {
    primary: 'from-primary-50 to-indigo-50 border-primary-100',
    green: 'from-green-50 to-emerald-50 border-green-100',
    yellow: 'from-yellow-50 to-amber-50 border-yellow-100',
    red: 'from-red-50 to-rose-50 border-red-100',
    purple: 'from-purple-50 to-violet-50 border-purple-100',
    blue: 'from-blue-50 to-cyan-50 border-blue-100',
  };

  return (
    <div className={`rounded-xl border overflow-hidden bg-gradient-to-r ${colors[color]}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/50 transition-colors"
      >
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
        )}
        <span className="flex-1 font-semibold text-gray-900">
          {isRTL ? titleFa : title}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 pt-0 bg-white/30">
          {children}
        </div>
      )}
    </div>
  );
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const { isLessonComplete, markLessonComplete, isExerciseComplete, markExerciseComplete } = useProgress();
  const { t, isRTL, language } = useLanguage();
  const isMobile = useIsMobile();

  const lesson = getLesson(lessonId);
  const exercise = getExercise(lessonId);
  const isComplete = isLessonComplete(lessonId);

  const [activeTab, setActiveTab] = useState('learn');
  const [code, setCode] = useState(exercise?.starterCode || '');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [contentLang, setContentLang] = useState('en'); // Local language for lesson content
  const [contextMenu, setContextMenu] = useState(null); // { x, y } or null
  const [editorLoaded, setEditorLoaded] = useState(false);

  // Handle right-click context menu
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Find navigation
  let currentCategory = null;
  let lessonIndex = -1;
  for (const cat of categoriesData.categories) {
    const idx = cat.lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) { currentCategory = cat; lessonIndex = idx; break; }
  }
  const prevLesson = currentCategory?.lessons[lessonIndex - 1];
  const nextLesson = currentCategory?.lessons[lessonIndex + 1];

  useEffect(() => {
    if (exercise?.starterCode) setCode(exercise.starterCode);
    setTestResults(null);
    setShowSolution(false);
    setActiveTab('learn');
  }, [lessonId, exercise?.starterCode]);

  const handleRunTests = useCallback(() => {
    if (!exercise) return;
    setIsRunning(true);
    setTimeout(() => {
      const functionName = code.match(/function\s+(\w+)/)?.[1] || 'solution';
      const results = runTestCases(code, functionName, exercise.testCases);
      setTestResults(results);
      setIsRunning(false);
      if (results.allPassed) markExerciseComplete(lessonId);
    }, 100);
  }, [code, exercise, lessonId, markExerciseComplete]);

  const handleCopyCode = useCallback((codeToCopy) => {
    navigator.clipboard.writeText(codeToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }, []);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('Lesson Not Found', 'درس پیدا نشد')}</h1>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 mt-4">
            <ArrowLeft className="w-4 h-4" />
            {t('Back to Dashboard', 'بازگشت به داشبورد')}
          </Link>
        </div>
      </div>
    );
  }

  const difficulty = difficultyConfig[lesson.difficulty];

  return (
    <div className="max-w-6xl mx-auto" onContextMenu={handleContextMenu}>
      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          onSelectLanguage={setContentLang}
          currentLang={contentLang}
        />
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-purple-700 rounded-2xl p-6 lg:p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        <div className="relative">
          <Link
            to="/"
            className={`inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4`}
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {isRTL ? currentCategory?.nameFa : currentCategory?.name || t('Dashboard', 'داشبورد')}
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {isRTL ? lesson.titleFa : lesson.title}
                </h1>
                {isComplete && (
                  <span className="flex items-center gap-1 bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    {t('Done', 'تکمیل')}
                  </span>
                )}
              </div>
              <p className="text-lg text-white/70">
                {isRTL ? lesson.title : lesson.titleFa}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 border border-white/20`}>
                {difficulty?.emoji || '🟢'} {isRTL ? (difficulty?.label.fa || t('Easy', 'آسان')) : (difficulty?.label.en || t('Easy', 'Easy'))}
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg text-sm border border-white/20">
                <Clock className="w-4 h-4" />
                {lesson.estimatedTime}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
              <Brain className="w-4 h-4" />
              {t('Deep Learning', 'یادگیری عمیق')}
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
              <Rocket className="w-4 h-4" />
              {t('Practical', 'کاربردی')}
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
              <Target className="w-4 h-4" />
              {t('Interview Ready', 'آماده مصاحبه')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const hasDebugger = lessonsWithDebugger.includes(lessonId);
              const isDisabled = (tab.id === 'practice' && !exercise) || (tab.id === 'debug' && (!exercise || !hasDebugger));

              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id)}
                  disabled={isDisabled}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${isActive
                    ? 'border-primary-600 text-primary-600 bg-primary-50/50'
                    : isDisabled
                      ? 'border-transparent text-gray-300 cursor-not-allowed'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {isRTL ? tab.label.fa : tab.label.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Learn Tab */}
          {activeTab === 'learn' && (
            <div className="space-y-6">
              {/* Language Toggle for Content */}
              <div className="flex justify-end">
                <div className="inline-flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setContentLang('en')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${contentLang === 'en'
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Globe className="w-4 h-4" />
                    English
                  </button>
                  <button
                    onClick={() => setContentLang('fa')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${contentLang === 'fa'
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Globe className="w-4 h-4" />
                    فارسی
                  </button>
                </div>
              </div>

              <Accordion
                title="Why Learn This?"
                titleFa="چرا این را یاد بگیریم؟"
                icon={Target}
                defaultOpen={true}
                color="blue"
              >
                <p className="text-gray-600">
                  {contentLang === 'fa'
                    ? 'این مفهوم یکی از پایه‌های اصلی برنامه‌نویسی است و در مصاحبه‌های فنی بسیار پرسیده می‌شود. درک آن به شما کمک می‌کند مسائل پیچیده را به طور کارآمد حل کنید.'
                    : 'This concept is fundamental to programming and frequently asked in technical interviews. Understanding it will help you solve complex problems efficiently.'
                  }
                </p>
              </Accordion>

              <Accordion
                title="Full Explanation"
                titleFa="توضیحات کامل"
                icon={BookOpen}
                defaultOpen={true}
                color="blue"
              >
                <div className="prose prose-sm max-w-none">
                  <MarkdownRenderer
                    content={contentLang === 'fa' ? lesson.contentFa : lesson.content}
                    isRTL={contentLang === 'fa'}
                  />
                </div>
              </Accordion>

              <Accordion
                title="Key Takeaways"
                titleFa="نکات کلیدی"
                icon={Sparkles}
                color="green"
              >
                <ul className="space-y-2">
                  {[
                    { en: 'Understand the core concept thoroughly', fa: 'مفهوم اصلی را به طور کامل درک کنید' },
                    { en: 'Know the time and space complexity', fa: 'پیچیدگی زمانی و فضایی را بدانید' },
                    { en: 'Practice with different examples', fa: 'با مثال‌های مختلف تمرین کنید' },
                    { en: 'Be ready to explain in interviews', fa: 'آماده توضیح در مصاحبه باشید' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {contentLang === 'fa' ? item.fa : item.en}
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === 'examples' && (
            <div className="space-y-6">
              <Accordion
                title="Basic Example"
                titleFa="مثال پایه"
                icon={Code}
                defaultOpen={true}
                color="blue"
              >
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100">
                    <code>{`
// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const result = solution(arr);
console.log(result); // Expected output based on algorithm`}</code>
                  </pre>
                </div>
                <p className="mt-3 text-gray-600 text-sm">
                  {t(
                    'This example demonstrates the basic usage of the algorithm with a simple input.',
                    'این مثال استفاده پایه از الگوریتم را با یک ورودی ساده نشان می‌دهد.'
                  )}
                </p>
              </Accordion>

              <Accordion
                title="Step-by-Step Walkthrough"
                titleFa="توضیح گام به گام"
                icon={ChevronRight}
                color="purple"
              >
                <div className="space-y-3">
                  {[
                    { step: 1, en: 'Initialize variables and prepare input', fa: 'متغیرها را مقداردهی و ورودی را آماده کنید' },
                    { step: 2, en: 'Process the data using the algorithm logic', fa: 'داده‌ها را با منطق الگوریتم پردازش کنید' },
                    { step: 3, en: 'Handle edge cases appropriately', fa: 'موارد خاص را به درستی مدیریت کنید' },
                    { step: 4, en: 'Return the final result', fa: 'نتیجه نهایی را برگردانید' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <p className="text-gray-700 pt-1">{isRTL ? item.fa : item.en}</p>
                    </div>
                  ))}
                </div>
              </Accordion>

              <Accordion
                title="Edge Cases"
                titleFa="موارد خاص"
                icon={AlertTriangle}
                color="yellow"
              >
                <ul className="space-y-2">
                  {[
                    { en: 'Empty input - handle gracefully', fa: 'ورودی خالی - با ظرافت مدیریت کنید' },
                    { en: 'Single element - return as is', fa: 'یک عنصر - همان را برگردانید' },
                    { en: 'Already sorted - optimize if possible', fa: 'از قبل مرتب - در صورت امکان بهینه کنید' },
                    { en: 'Duplicate values - handle correctly', fa: 'مقادیر تکراری - به درستی مدیریت کنید' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" />
                      {isRTL ? item.fa : item.en}
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          )}

          {/* Tips Tab */}
          {activeTab === 'tips' && (
            <div className="space-y-6">
              {/* Language Toggle for Content */}
              <div className="flex justify-end">
                <div className="inline-flex items-center bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setContentLang('en')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${contentLang === 'en'
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Globe className="w-4 h-4" />
                    English
                  </button>
                  <button
                    onClick={() => setContentLang('fa')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${contentLang === 'fa'
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Globe className="w-4 h-4" />
                    فارسی
                  </button>
                </div>
              </div>

              <Accordion
                title="Pro Tips"
                titleFa="نکات حرفه‌ای"
                icon={Zap}
                defaultOpen={true}
                color="yellow"
              >
                <ul className="space-y-3">
                  {[
                    { en: 'Always consider time and space complexity before implementation', fa: 'همیشه قبل از پیاده‌سازی پیچیدگی زمانی و فضایی را در نظر بگیرید' },
                    { en: 'Start with a brute force solution, then optimize', fa: 'با راه‌حل ساده شروع کنید، سپس بهینه کنید' },
                    { en: 'Test with edge cases before submitting', fa: 'قبل از ارسال با موارد خاص تست کنید' },
                    { en: 'Draw diagrams to visualize the problem', fa: 'برای تجسم مسئله نمودار بکشید' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-100">
                      <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700">{contentLang === 'fa' ? item.fa : item.en}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion
                title="Common Mistakes"
                titleFa="اشتباهات رایج"
                icon={AlertTriangle}
                color="red"
              >
                <ul className="space-y-3">
                  {[
                    { en: 'Off-by-one errors in loop boundaries', fa: 'خطای یک واحدی در مرزهای حلقه' },
                    { en: 'Not handling null or undefined inputs', fa: 'عدم مدیریت ورودی‌های null یا undefined' },
                    { en: 'Modifying input array when not expected', fa: 'تغییر آرایه ورودی در زمانی که انتظار نمی‌رود' },
                    { en: 'Forgetting to return the result', fa: 'فراموش کردن برگرداندن نتیجه' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-100">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-700">{contentLang === 'fa' ? item.fa : item.en}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && exercise && (
            <div className="space-y-6">
              {/* Exercise Description */}
              <Accordion
                title="Exercise Description"
                titleFa="توضیحات تمرین"
                icon={Target}
                defaultOpen={true}
                color="blue"
              >
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700">{isRTL ? exercise.descriptionFa : exercise.description}</p>
                </div>
                {exercise.hints && exercise.hints.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-2 text-yellow-700 font-medium mb-2">
                      <Lightbulb className="w-4 h-4" />
                      {t('Hints', 'راهنمایی')}
                    </div>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {exercise.hints.map((hint, idx) => (
                        <li key={idx}>• {hint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Accordion>

              {/* Code Editor */}
              <div className="rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <span className="text-sm font-medium text-gray-200">
                    {t('Code Editor', 'ویرایشگر کد')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCode(exercise.starterCode)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      {t('Reset', 'بازنشانی')}
                    </button>
                    <button
                      onClick={() => handleCopyCode(code)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    >
                      {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedCode ? t('Copied!', 'کپی شد!') : t('Copy', 'کپی')}
                    </button>
                  </div>
                </div>
                <Editor
                  height="300px"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  theme="vs-dark"
                  onMount={(editor, monaco) => {
                    // Register JavaScript snippets
                    monaco.languages.registerCompletionItemProvider('javascript', {
                      provideCompletionItems: (model, position) => {
                        const word = model.getWordUntilPosition(position);
                        const range = {
                          startLineNumber: position.lineNumber,
                          endLineNumber: position.lineNumber,
                          startColumn: word.startColumn,
                          endColumn: word.endColumn
                        };

                        const suggestions = [
                          {
                            label: 'for',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'For loop',
                            range
                          },
                          {
                            label: 'forof',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'for (const ${1:item} of ${2:array}) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'For...of loop',
                            range
                          },
                          {
                            label: 'forin',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'for (const ${1:key} in ${2:object}) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'For...in loop',
                            range
                          },
                          {
                            label: 'while',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'while (${1:condition}) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'While loop',
                            range
                          },
                          {
                            label: 'if',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'if (${1:condition}) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'If statement',
                            range
                          },
                          {
                            label: 'ifelse',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'if (${1:condition}) {\n\t$2\n} else {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'If-else statement',
                            range
                          },
                          {
                            label: 'func',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'function ${1:name}(${2:params}) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Function declaration',
                            range
                          },
                          {
                            label: 'arrow',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'const ${1:name} = (${2:params}) => {\n\t$0\n};',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Arrow function',
                            range
                          },
                          {
                            label: 'map',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.map((${2:item}) => {\n\t$0\n})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Array map',
                            range
                          },
                          {
                            label: 'filter',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.filter((${2:item}) => ${0})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Array filter',
                            range
                          },
                          {
                            label: 'reduce',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: '${1:array}.reduce((${2:acc}, ${3:item}) => {\n\t$0\n\treturn ${2:acc};\n}, ${4:initialValue})',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Array reduce',
                            range
                          },
                          {
                            label: 'try',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'try {\n\t$1\n} catch (${2:error}) {\n\t$0\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Try-catch block',
                            range
                          },
                          {
                            label: 'class',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'class ${1:Name} {\n\tconstructor(${2:params}) {\n\t\t$0\n\t}\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Class declaration',
                            range
                          },
                          {
                            label: 'log',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'console.log($0);',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Console log',
                            range
                          },
                          {
                            label: 'switch',
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: 'switch (${1:key}) {\n\tcase ${2:value}:\n\t\t$0\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}',
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: 'Switch statement',
                            range
                          },
                        ];
                        return { suggestions };
                      }
                    });
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                    wordBasedSuggestions: 'currentDocument',
                    snippetSuggestions: 'top',
                    formatOnPaste: true,
                    formatOnType: true,
                    autoClosingBrackets: 'always',
                    autoClosingQuotes: 'always',
                    autoIndent: 'full',
                    bracketPairColorization: { enabled: true },
                  }}
                />
              </div>

              {/* Run Tests Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleRunTests}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-green-500/25"
                >
                  {isRunning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('Running...', 'در حال اجرا...')}
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      {t('Run Tests', 'اجرای تست‌ها')}
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showSolution ? t('Hide Solution', 'مخفی کردن پاسخ') : t('Show Solution', 'نمایش پاسخ')}
                </button>
              </div>

              {/* Test Results */}
              {testResults && (
                <div className={`rounded-xl border p-4 ${testResults.allPassed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {testResults.allPassed ? (
                      <>
                        <Trophy className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-700">{t('All Tests Passed!', 'همه تست‌ها پاس شدند!')}</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-700">{t('Some Tests Failed', 'برخی تست‌ها رد شدند')}</span>
                      </>
                    )}
                  </div>
                  <div className="space-y-2">
                    {testResults.results.map((result, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-sm p-2 rounded ${result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {result.passed ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                        <span>{t('Test', 'تست')} {idx + 1}: {result.passed ? t('Passed', 'پاس') : t('Failed', 'رد')}</span>
                        {!result.passed && result.error && (
                          <span className="text-xs opacity-75">- {typeof result.error === 'object' ? result.error.message || JSON.stringify(result.error) : result.error}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Solution */}
              {showSolution && exercise.solution && (
                <Accordion
                  title="Solution"
                  titleFa="پاسخ"
                  icon={Eye}
                  defaultOpen={true}
                  color="green"
                >
                  <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                      <span className="text-sm font-medium text-gray-200">
                        {t('Solution Code', 'کد پاسخ')}
                      </span>
                      <button
                        onClick={() => handleCopyCode(exercise.solution)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                      >
                        {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedCode ? t('Copied!', 'کپی شد!') : t('Copy', 'کپی')}
                      </button>
                    </div>
                    <div className="bg-gray-900 p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-100">
                        <code>{exercise.solution}</code>
                      </pre>
                    </div>
                  </div>
                </Accordion>
              )}
            </div>
          )}

          {/* Debug Tab */}
          {activeTab === 'debug' && exercise && (
            <div className="space-y-6">
              {/* Visual Debugger */}
              <AlgorithmDebugger lessonId={lessonId} exercise={exercise} />

              <Accordion
                title="Debugging Tips"
                titleFa="نکات دیباگ"
                icon={Lightbulb}
                color="yellow"
              >
                <ul className="space-y-3">
                  {[
                    { en: 'Use console.log to track variable values', fa: 'از console.log برای ردیابی مقادیر متغیرها استفاده کنید' },
                    { en: 'Check loop boundaries carefully', fa: 'مرزهای حلقه را با دقت بررسی کنید' },
                    { en: 'Verify input/output types match expectations', fa: 'تطابق نوع ورودی/خروجی با انتظارات را تأیید کنید' },
                    { en: 'Test with small inputs first', fa: 'ابتدا با ورودی‌های کوچک تست کنید' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-yellow-100">
                      <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700">{isRTL ? item.fa : item.en}</span>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          {prevLesson ? (
            <Link
              to={`/lesson/${prevLesson.id}`}
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span className="hidden sm:inline">{isRTL ? prevLesson.titleFa : prevLesson.title}</span>
              <span className="sm:hidden">{t('Previous', 'قبلی')}</span>
            </Link>
          ) : (
            <div className="w-24" />
          )}
        </div>

        <button
          onClick={() => markLessonComplete(lessonId)}
          disabled={isComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${isComplete
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-gradient-to-r from-primary-500 to-purple-600 text-white hover:from-primary-600 hover:to-purple-700 shadow-lg shadow-primary-500/25'
            }`}
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              {t('Completed', 'تکمیل شده')}
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              {t('Mark as Complete', 'علامت‌گذاری به عنوان تکمیل')}
            </>
          )}
        </button>

        <div className="flex items-center gap-3">
          {nextLesson ? (
            <Link
              to={`/lesson/${nextLesson.id}`}
              className={`flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 rounded-xl transition-colors font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="hidden sm:inline">{isRTL ? nextLesson.titleFa : nextLesson.title}</span>
              <span className="sm:hidden">{t('Next', 'بعدی')}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl transition-colors font-medium"
            >
              <Trophy className="w-4 h-4" />
              {t('Back to Dashboard', 'بازگشت به داشبورد')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
