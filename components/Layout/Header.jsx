import { Link } from 'react-router-dom';
import { BookOpen, BarChart3, Bug, Menu, Globe, Sparkles } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTechnology } from '../../contexts/TechnologyContext';
import categoriesData from '../../data/categories.json';

export default function Header({ onMenuClick }) {
  const { progress } = useProgress();
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  const { activeTechnology } = useTechnology();

  const techCategories = categoriesData.categories.filter(
    (cat) => (cat.technology || 'algorithms') === activeTechnology
  );

  const totalLessons = techCategories.reduce(
    (sum, cat) => sum + cat.lessons.length, 0
  );

  // Filter completed lessons to only include those in the current technology
  const completedCount = progress.completedLessons.filter(lessonId => {
    return techCategories.some(cat => cat.lessons.some(l => l.id === lessonId));
  }).length;

  const overallProgress = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0;

  return (
    <header className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200/80 sticky top-0 z-50 backdrop-blur-sm w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {/* Menu button */}
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-white/80 rounded-xl lg:hidden transition-all shadow-sm border border-gray-200/50"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all group-hover:scale-105">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {t('AlgoMaster', 'الگومستر')}
                  </h1>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {t('Learn Algorithms Visually', 'یادگیری بصری الگوریتم')}
                </p>
              </div>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-sm border border-gray-200/80 hover:border-gray-300"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-gray-700">
                {language === 'en' ? 'فا' : 'EN'}
              </span>
            </button>

            {/* Debugger Link */}
            <Link
              to="/debugger"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 rounded-xl transition-all shadow-sm border border-gray-200/80 hover:border-indigo-200"
            >
              <Bug className="w-4 h-4" />
              <span className="hidden md:inline">{t('Debugger', 'دیباگر')}</span>
            </Link>

            {/* Progress */}
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">{t('Progress', 'پیشرفت')}</div>
                  <div className="text-sm font-bold text-gray-900">{overallProgress}%</div>
                </div>
              </div>
              <div className="w-20 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
