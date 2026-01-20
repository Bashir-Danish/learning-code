import CategoryCard from '../components/Dashboard/CategoryCard';
import ProgressOverview from '../components/Dashboard/ProgressOverview';
import categoriesData from '../data/categories.json';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <ProgressOverview />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Learning Paths
        </h2>
        <p className="text-gray-500 fa">مسیرهای یادگیری</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
