import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BookOpen,
  Database,
  LayoutList,
  Hash,
  Link,
  Layers,
  ArrowUpDown,
  Search,
  Repeat,
  GitBranch,
  Triangle,
  Share2,
  Zap,
  CheckCircle2,
  Binary,
  ChevronDown,
  ChevronRight,
  X,
  Sparkles,
  Settings,
  BarChart3
} from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTechnology } from '../../contexts/TechnologyContext';
import categoriesData from '../../data/categories.json';

const iconMap = {
  BookOpen, LayoutList, Hash, Link, Layers, ArrowUpDown,
  Search, Repeat, GitBranch, Triangle, Share2, Zap, Binary, Database,
};

export default function Sidebar({ isOpen, onClose }) {
  const { isLessonComplete, getCategoryProgress } = useProgress();
  const { t, isRTL } = useLanguage();
  const { activeTechnology } = useTechnology();
  const [expandedCategories, setExpandedCategories] = useState(['foundations', 'react-fundamentals', 'vue-fundamentals']);

  // Filter categories by selected technology
  const filteredCategories = useMemo(() => {
    return categoriesData.categories.filter(
      (cat) => (cat.technology || 'algorithms') === activeTechnology
    );
  }, [activeTechnology]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const totalLessons = filteredCategories.reduce((acc, cat) => acc + cat.lessons.length, 0);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 bottom-0 z-50 bg-white/80 backdrop-blur-xl border-gray-200/50
          w-72 transition-all duration-300 ease-in-out
          ${isRTL ? 'right-0 border-l' : 'left-0 border-r'}
          ${isOpen ? 'translate-x-0 opacity-100' : isRTL ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'}
          lg:translate-x-0 lg:opacity-100 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]
          overflow-hidden flex flex-col shadow-2xl lg:shadow-none
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">
                {t('Curriculum', 'سرفصل‌ها')}
              </h2>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                {activeTechnology} path
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {/* Admin Tools Section - Only show for React */}
          {activeTechnology === 'react' && (
            <div className="mb-6">
              <div className="flex items-center gap-2 px-3 py-2 mb-3">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {t('Admin Tools', 'ابزارهای مدیریت')}
                </span>
              </div>
              
              <NavLink
                to="/audit"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all border ${
                    isActive
                      ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200 font-semibold'
                      : 'text-gray-600 hover:bg-white/60 border-transparent hover:border-gray-100 bg-white/30'
                  }`
                }
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">
                    {t('Lesson Audit', 'بررسی درس‌ها')}
                  </div>
                  <div className="text-xs opacity-75">
                    {t('Quality & Consistency', 'کیفیت و سازگاری')}
                  </div>
                </div>
              </NavLink>
            </div>
          )}

          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400 italic">
                {t('No categories found for this path yet.', 'هنوز محتوایی برای این مسیر اضافه نشده است.')}
              </p>
            </div>
          ) : (
            filteredCategories.map((category, index) => {
              const Icon = iconMap[category.icon] || Binary;
              const progress = getCategoryProgress(category.lessons);
              const isExpanded = expandedCategories.includes(category.id);
              const completedCount = category.lessons.filter(l => isLessonComplete(l.id)).length;
              const isComplete = completedCount === category.lessons.length;

              return (
                <div
                  key={category.id}
                  className={`group rounded-2xl transition-all duration-300 ${isExpanded
                    ? 'bg-white shadow-md border border-gray-100'
                    : 'hover:bg-white/60 border border-transparent hover:border-gray-100'
                    }`}
                >
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center gap-3 p-3 text-left transition-all"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${category.color}15, ${category.color}05)`,
                        border: `1.5px solid ${category.color}25`
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm truncate transition-colors ${isExpanded ? 'text-gray-900' : 'text-gray-700'}`}>
                          {isRTL ? category.nameFa : category.name}
                        </span>
                        {isComplete && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${progress}%`,
                              background: category.color
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 tabular-nums">
                          {completedCount}/{category.lessons.length}
                        </span>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-gray-100 rotate-180' : 'text-gray-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Lessons list */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-3 pb-3 pt-1 space-y-1">
                      {category.lessons.map((lesson) => {
                        const isComplete = isLessonComplete(lesson.id);

                        return (
                          <NavLink
                            key={lesson.id}
                            to={`/lesson/${lesson.id}`}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all border ${isActive
                                ? 'bg-gray-900 border-gray-900 text-white shadow-lg shadow-gray-200 font-semibold translate-x-1'
                                : 'text-gray-600 hover:bg-gray-50 border-transparent hover:border-gray-100'
                              }`
                            }
                          >
                            {isComplete ? (
                              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex-shrink-0 group-hover:border-gray-300" />
                            )}
                            <span className="truncate flex-1">
                              {isRTL ? lesson.titleFa : lesson.title}
                            </span>

                            {lesson.difficulty === 'hard' && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded-md font-bold uppercase tracking-tighter">
                                {t('Hard', 'سخت')}
                              </span>
                            )}
                            {lesson.difficulty === 'medium' && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-amber-100 text-amber-600 rounded-md font-bold uppercase tracking-tighter">
                                {t('Med', 'متوسط')}
                              </span>
                            )}
                            {lesson.difficulty === 'expert' && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-purple-100 text-purple-600 rounded-md font-bold uppercase tracking-tighter">
                                {t('Exp', 'تخصصی')}
                              </span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-gray-100/80 bg-gray-50/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                {filteredCategories.length} {t('Topics', 'مبحث')}
              </span>
            </div>
            <span className="text-[11px] font-black text-gray-400">
              {totalLessons} {t('Lessons', 'درس')}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
