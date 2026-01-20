import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
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
  Sparkles
} from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useLanguage } from '../../contexts/LanguageContext';
import categoriesData from '../../data/categories.json';

const iconMap = {
  BookOpen, LayoutList, Hash, Link, Layers, ArrowUpDown, 
  Search, Repeat, GitBranch, Triangle, Share2, Zap, Binary,
};

export default function Sidebar({ isOpen, onClose }) {
  const { isLessonComplete, getCategoryProgress } = useProgress();
  const { t, isRTL } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState(['foundations']);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-16 bottom-0 z-50 bg-gradient-to-b from-slate-50 to-gray-100 border-gray-200/80
          w-72 transition-transform duration-300 ease-in-out
          ${isRTL ? 'right-0 border-l' : 'left-0 border-r'}
          ${isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-[calc(100vh-64px)]
          overflow-hidden flex flex-col shadow-xl lg:shadow-none
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/80 bg-white/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <h2 className="font-bold text-gray-900">
              {t('Categories', 'دسته‌بندی‌ها')}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2">
          {categoriesData.categories.map((category, index) => {
            const Icon = iconMap[category.icon] || Binary;
            const progress = getCategoryProgress(category.lessons);
            const isExpanded = expandedCategories.includes(category.id);
            const completedCount = category.lessons.filter(l => isLessonComplete(l.id)).length;
            const isComplete = completedCount === category.lessons.length;

            return (
              <div 
                key={category.id} 
                className={`rounded-xl overflow-hidden border transition-all duration-200 ${
                  isExpanded 
                    ? 'border-gray-300/80 shadow-sm bg-white' 
                    : 'border-gray-200/60 bg-white/70 hover:bg-white hover:border-gray-300/60'
                }`}
              >
                {/* Category header - Accordion trigger */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 text-left transition-all
                    ${isExpanded ? 'bg-gradient-to-r from-gray-50 to-white' : 'hover:bg-gray-50/50'}
                  `}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                      border: `1px solid ${category.color}30`
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: category.color }} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-sm truncate">
                        {index + 1}. {isRTL ? category.nameFa : category.name}
                      </span>
                      {isComplete && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                        {completedCount}/{category.lessons.length}
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    isExpanded ? 'bg-gray-200' : 'bg-gray-100'
                  }`}>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* Lessons list - Accordion content */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/30">
                    <ul className="py-2 px-2 space-y-1">
                      {category.lessons.map((lesson) => {
                        const isComplete = isLessonComplete(lesson.id);
                        
                        return (
                          <li key={lesson.id}>
                            <NavLink
                              to={`/lesson/${lesson.id}`}
                              onClick={onClose}
                              className={({ isActive }) =>
                                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
                                  isActive
                                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm border border-indigo-200/60 text-indigo-700 font-semibold'
                                    : 'text-gray-600 hover:bg-white hover:shadow-sm hover:border-gray-200/60 border border-transparent'
                                }`
                              }
                            >
                              {isComplete ? (
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <CheckCircle2 className="w-3 h-3 text-white" />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 bg-white" />
                              )}
                              <span className="truncate flex-1">
                                {isRTL ? lesson.titleFa : lesson.title}
                              </span>
                              {lesson.difficulty === 'hard' && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-red-100 to-orange-100 text-red-600 rounded-md font-semibold border border-red-200/50">
                                  {t('Hard', 'سخت')}
                                </span>
                              )}
                              {lesson.difficulty === 'medium' && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-600 rounded-md font-semibold border border-amber-200/50">
                                  {t('Med', 'متوسط')}
                                </span>
                              )}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200/80 bg-white/50">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span className="font-medium">
              {t('12 Categories • 45+ Lessons', '۱۲ دسته‌بندی • ۴۵+ درس')}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
