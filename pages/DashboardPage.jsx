import CategoryCard from '../components/Dashboard/CategoryCard';
import { ProgressOverview } from '../components/Dashboard/ProgressOverview';
import TechnologySelector from '../components/Dashboard/TechnologySelector';
import { useTechnology } from '../contexts/TechnologyContext';
import { Code } from 'lucide-react';
import categoriesData from '../data/categories.json';

export default function DashboardPage() {
  const { activeTechnology } = useTechnology();

  const filteredCategories = categoriesData.categories.filter(
    (category) => (category.technology || 'algorithms') === activeTechnology
  );

  return (
    <div className="max-w-6xl mx-auto">
      <ProgressOverview />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Learning Paths
          </h2>
          <p className="text-gray-500 fa">مسیرهای یادگیری</p>
        </div>
        <TechnologySelector />
      </div>

      {filteredCategories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Coming Soon!</h3>
          <p className="text-gray-500">We are currently building this curriculum. Check back later!</p>
        </div>
      )}
    </div>
  );
}
