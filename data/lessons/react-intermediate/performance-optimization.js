export const performanceOptimizationLesson = {
  id: 'performance-optimization',
  title: 'Performance Optimization (React 19 & Compiler)',
  titleFa: 'بهینه‌سازی عملکرد (ری‌اکت ۱۹ و کامپایلر)',
  difficulty: 'medium',
  estimatedTime: '70 min',

  content: `
# Performance Optimization in React 19 & Compiler

## Definition
Performance optimization in React 19 has been revolutionized with the introduction of the **React Compiler** and enhanced built-in optimizations. While traditional manual optimization techniques like **memo**, **useMemo**, and **useCallback** are still available, the React Compiler now handles most optimization automatically, making React applications faster by default.

## Key Features
- **React Compiler**: Automatic memoization and optimization at build time
- **Enhanced Concurrent Features**: Better scheduling and prioritization
- **Improved Suspense**: More efficient loading states and data fetching
- **Smart Batching**: Automatic batching of state updates
- **Reduced Bundle Size**: Compiler optimizations reduce JavaScript payload
- **Zero-Config Optimization**: Performance improvements without manual tuning

---

## 1. React Compiler vs Manual Optimization

### The Old Way (Manual Optimization)
Before React 19, developers had to manually optimize components:

\`\`\`jsx
import { memo, useMemo, useCallback } from 'react';

// Manual optimization - lots of boilerplate
const ProductList = memo(function ProductList({ 
  products, 
  onProductClick, 
  searchTerm,
  sortBy,
  filters 
}) {
  // Manual memoization of expensive filtering
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        
        const matchesFilters = filters.every(filter => {
          switch (filter.type) {
            case 'category':
              return filter.values.includes(product.category);
            case 'price':
              return product.price >= filter.min && product.price <= filter.max;
            case 'rating':
              return product.rating >= filter.minRating;
            default:
              return true;
          }
        });
        
        return matchesSearch && matchesFilters;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price - b.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, searchTerm, sortBy, filters]);

  // Manual memoization of event handlers
  const handleProductClick = useCallback((productId) => {
    onProductClick(productId);
  }, [onProductClick]);

  // Manual memoization of derived data
  const productStats = useMemo(() => ({
    total: filteredProducts.length,
    averagePrice: filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length,
    categories: [...new Set(filteredProducts.map(p => p.category))].length
  }), [filteredProducts]);

  return (
    <div className="product-list">
      <ProductStats stats={productStats} />
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
});
\`\`\`

### The New Way (React Compiler)
With React 19 Compiler, the same functionality requires no manual optimization:

\`\`\`jsx
// React Compiler handles all optimization automatically
function ProductList({ 
  products, 
  onProductClick, 
  searchTerm,
  sortBy,
  filters 
}) {
  // Compiler automatically memoizes this expensive operation
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      
      const matchesFilters = filters.every(filter => {
        switch (filter.type) {
          case 'category':
            return filter.values.includes(product.category);
          case 'price':
            return product.price >= filter.min && product.price <= filter.max;
          case 'rating':
            return product.rating >= filter.minRating;
          default:
            return true;
        }
      });
      
      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  // Compiler automatically optimizes this function
  const handleProductClick = (productId) => {
    onProductClick(productId);
  };

  // Compiler automatically memoizes this calculation
  const productStats = {
    total: filteredProducts.length,
    averagePrice: filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length,
    categories: [...new Set(filteredProducts.map(p => p.category))].length
  };

  return (
    <div className="product-list">
      <ProductStats stats={productStats} />
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
}
\`\`\`

---

## 2. When to Still Use Manual Optimization

### Legacy Code and Gradual Migration
During migration to React 19, you might need both approaches:

\`\`\`jsx
// Hybrid approach during migration
function HybridComponent({ data, onAction }) {
  // Keep existing manual optimizations during migration
  const expensiveCalculation = useMemo(() => {
    return data.reduce((acc, item) => {
      // Complex legacy calculation that compiler might not optimize well
      return acc + performLegacyCalculation(item);
    }, 0);
  }, [data]);

  // New code can rely on compiler optimization
  const simpleCalculation = data.length * 2;
  const filteredData = data.filter(item => item.active);

  return (
    <div>
      <div>Expensive: {expensiveCalculation}</div>
      <div>Simple: {simpleCalculation}</div>
      <div>Filtered: {filteredData.length}</div>
    </div>
  );
}
\`\`\`

---

## 3. React 19 Performance Features

### Enhanced Concurrent Features
React 19 improves concurrent rendering and scheduling:

\`\`\`jsx
import { useTransition, useDeferredValue, Suspense } from 'react';

function SearchInterface() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  
  // Defer expensive search results
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Mark expensive operations as non-urgent
    startTransition(() => {
      // This will be scheduled with lower priority
      updateSearchResults(value);
    });
  };

  return (
    <div className="search-interface">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
      />
      
      {isPending && <div className="search-loading">Searching...</div>}
      
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchTerm={deferredSearchTerm} />
      </Suspense>
    </div>
  );
}
\`\`\`

---

## 4. Performance Monitoring and Debugging

### React DevTools Profiler
Monitor performance improvements with React 19:

\`\`\`jsx
import { Profiler } from 'react';

function App() {
  const onRenderCallback = (id, phase, actualDuration, baseDuration) => {
    console.log('Performance Metrics:', {
      component: id,
      phase, // 'mount' or 'update'
      actualDuration, // Time spent rendering this update
      baseDuration, // Estimated time to render without memoization
      improvement: baseDuration - actualDuration
    });
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}
\`\`\`

---

## 5. Best Practices for React 19 Performance

### Do's ✅
- **Enable React Compiler** for new projects and gradually migrate existing ones
- **Write clean, readable code** - compiler optimizes clear patterns better
- **Use Suspense and concurrent features** for better user experience
- **Monitor performance** with React DevTools Profiler
- **Remove manual optimizations gradually** as you adopt the compiler

### Don'ts ❌
- **Don't over-optimize manually** when using the compiler
- **Don't ignore performance monitoring** - always validate improvements
- **Don't mix optimization strategies** inconsistently
- **Don't assume all code needs optimization** - measure first

---

## Summary

React 19 performance optimization represents a paradigm shift:

1. **Compiler-First Approach**: Automatic optimization reduces manual work
2. **Enhanced Concurrent Features**: Better scheduling and user experience
3. **Improved Developer Experience**: Focus on business logic, not performance tuning
4. **Backward Compatibility**: Existing optimizations continue to work
5. **Better Defaults**: Applications are faster out of the box

The combination of React Compiler and enhanced concurrent features makes React 19 applications significantly faster while reducing the complexity of performance optimization for developers.
`,

  contentFa: `
# بهینه‌سازی عملکرد در ری‌اکت ۱۹ و کامپایلر

## تعریف
بهینه‌سازی عملکرد در ری‌اکت ۱۹ با معرفی **کامپایلر ری‌اکت** و بهینه‌سازی‌های داخلی بهبود یافته متحول شده است. در حالی که تکنیک‌های بهینه‌سازی دستی سنتی مثل **memo**، **useMemo** و **useCallback** هنوز در دسترس هستند، کامپایلر ری‌اکت اکنون اکثر بهینه‌سازی‌ها را به صورت خودکار انجام می‌دهد و اپلیکیشن‌های ری‌اکت را به صورت پیش‌فرض سریع‌تر می‌کند.

## ویژگی‌های اصلی
- **کامپایلر ری‌اکت**: memoization و بهینه‌سازی خودکار در زمان ساخت
- **ویژگی‌های همزمان بهبود یافته**: زمان‌بندی و اولویت‌بندی بهتر
- **Suspense بهبود یافته**: وضعیت‌های لودینگ و واکشی داده کارآمدتر
- **Batching هوشمند**: batching خودکار بروزرسانی‌های state
- **کاهش حجم بسته**: بهینه‌سازی‌های کامپایلر payload جاوااسکریپت را کاهش می‌دهند
- **بهینه‌سازی بدون پیکربندی**: بهبود عملکرد بدون تنظیم دستی

---

## ۱. کامپایلر ری‌اکت در مقابل بهینه‌سازی دستی

### روش قدیمی (بهینه‌سازی دستی)
قبل از ری‌اکت ۱۹، توسعه‌دهندگان باید به صورت دستی کامپوننت‌ها را بهینه می‌کردند:

\`\`\`jsx
import { memo, useMemo, useCallback } from 'react';

// بهینه‌سازی دستی - کد اضافی زیاد
const ProductList = memo(function ProductList({ 
  products, 
  onProductClick, 
  searchTerm,
  sortBy,
  filters 
}) {
  // memoization دستی فیلترینگ سنگین
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        
        return matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, searchTerm, sortBy, filters]);

  return (
    <div className="product-list">
      {filteredProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
});
\`\`\`

### روش جدید (کامپایلر ری‌اکت)
با کامپایلر ری‌اکت ۱۹، همان عملکرد نیازی به بهینه‌سازی دستی ندارد:

\`\`\`jsx
// کامپایلر ری‌اکت همه بهینه‌سازی‌ها را به صورت خودکار انجام می‌دهد
function ProductList({ products, searchTerm }) {
  // کامپایلر به صورت خودکار این عملیات سنگین را memoize می‌کند
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="product-list">
      {filteredProducts.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
\`\`\`

---

## ۲. چه زمانی هنوز از بهینه‌سازی دستی استفاده کنیم

### کد قدیمی و مهاجرت تدریجی
در طول مهاجرت به ری‌اکت ۱۹، ممکن است به هر دو رویکرد نیاز داشته باشید:

\`\`\`jsx
// رویکرد ترکیبی در طول مهاجرت
function HybridComponent({ data, onAction }) {
  // حفظ بهینه‌سازی‌های دستی موجود در طول مهاجرت
  const expensiveCalculation = useMemo(() => {
    return data.reduce((acc, item) => {
      // محاسبه پیچیده قدیمی که کامپایلر ممکن است خوب بهینه نکند
      return acc + performLegacyCalculation(item);
    }, 0);
  }, [data]);

  // کد جدید می‌تواند روی بهینه‌سازی کامپایلر تکیه کند
  const simpleCalculation = data.length * 2;
  const filteredData = data.filter(item => item.active);

  return (
    <div>
      <div>سنگین: {expensiveCalculation}</div>
      <div>ساده: {simpleCalculation}</div>
      <div>فیلتر شده: {filteredData.length}</div>
    </div>
  );
}
\`\`\`

---

## خلاصه

بهینه‌سازی عملکرد ری‌اکت ۱۹ تغییر پارادایمی را نمایندگی می‌کند:

۱. **رویکرد کامپایلر-محور**: بهینه‌سازی خودکار کار دستی را کاهش می‌دهد
۲. **ویژگی‌های همزمان بهبود یافته**: زمان‌بندی بهتر و تجربه کاربری
۳. **تجربه توسعه‌دهنده بهبود یافته**: تمرکز روی منطق کسب‌وکار، نه تنظیم عملکرد
۴. **سازگاری با گذشته**: بهینه‌سازی‌های موجود همچنان کار می‌کنند
۵. **پیش‌فرض‌های بهتر**: اپلیکیشن‌ها از جعبه سریع‌تر هستند

ترکیب کامپایلر ری‌اکت و ویژگی‌های همزمان بهبود یافته، اپلیکیشن‌های ری‌اکت ۱۹ را به طور قابل توجهی سریع‌تر می‌کند و در عین حال پیچیدگی بهینه‌سازی عملکرد را برای توسعه‌دهندگان کاهش می‌دهد.
`,

  visualizationId: 'performance',
  exerciseId: 'performance-optimization',
};

export default performanceOptimizationLesson;