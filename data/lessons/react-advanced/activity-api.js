export const activityApiLesson = {
  id: 'activity-api',
  title: 'Activity API & Background Loading',
  titleFa: 'Activity API و بارگذاری پس‌زمینه',
  difficulty: 'hard',
  estimatedTime: '55 min',

  content: `
# Activity API & Background Loading

## Definition
The **Activity API** is an experimental React 19 feature that enables intelligent background loading and state preservation during navigation. It allows applications to preload content, maintain component state across route changes, and provide seamless user experiences by anticipating user actions and preparing resources in advance.

## Key Features
- **Background Preloading**: Load resources before they're needed
- **State Preservation**: Maintain component state during navigation
- **Intelligent Caching**: Smart resource management and cleanup
- **Navigation Optimization**: Faster page transitions and interactions
- **Resource Prioritization**: Load critical resources first
- **Memory Management**: Efficient cleanup of unused resources

---

## 1. Understanding Activity API Concepts

### Traditional Navigation vs Activity API
Traditional navigation destroys and recreates components:

\`\`\`jsx
// Traditional approach - component state is lost
function TraditionalApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

// Each navigation destroys the previous component
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // State is lost when navigating away
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  
  return (
    <div>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <FilterPanel filters={filters} onChange={setFilters} />
      <ProductGrid products={products} />
    </div>
  );
}
\`\`\`

### Activity API Approach
With Activity API, components can maintain state and preload resources:

\`\`\`jsx
import { useActivity, createActivity } from 'react';

// Activity-aware component that preserves state
function ActivityAwareProductsPage() {
  const activity = useActivity();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // State is preserved when activity is backgrounded
  useEffect(() => {
    if (activity.isActive) {
      fetchProducts().then(setProducts);
    }
  }, [activity.isActive]);
  
  // Preload related resources when activity becomes visible
  useEffect(() => {
    if (activity.isVisible) {
      // Preload product categories
      preloadResource('/api/categories');
      // Preload popular products
      preloadResource('/api/products/popular');
    }
  }, [activity.isVisible]);
  
  return (
    <div>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <FilterPanel filters={filters} onChange={setFilters} />
      <ProductGrid products={products} />
    </div>
  );
}
\`\`\`

---

## 2. Activity Lifecycle and States

### Activity States
Activities have several states that components can respond to:

\`\`\`jsx
function ActivityLifecycleExample() {
  const activity = useActivity();
  
  useEffect(() => {
    console.log('Activity State:', {
      isActive: activity.isActive,     // Currently focused/primary
      isVisible: activity.isVisible,   // Visible to user (may be backgrounded)
      isPreloading: activity.isPreloading, // Being preloaded
      isSuspended: activity.isSuspended,   // Suspended to save resources
    });
  }, [activity]);
  
  // Respond to different activity states
  useEffect(() => {
    if (activity.isActive) {
      // Component is active - start real-time updates
      const interval = setInterval(fetchLiveData, 1000);
      return () => clearInterval(interval);
    }
  }, [activity.isActive]);
  
  useEffect(() => {
    if (activity.isVisible && !activity.isActive) {
      // Component is visible but not active - reduce update frequency
      const interval = setInterval(fetchLiveData, 5000);
      return () => clearInterval(interval);
    }
  }, [activity.isVisible, activity.isActive]);
  
  useEffect(() => {
    if (activity.isSuspended) {
      // Component is suspended - cleanup resources
      cleanupExpensiveResources();
    }
  }, [activity.isSuspended]);
  
  return (
    <div className={\`activity-\${activity.state}\`}>
      <h2>Activity State: {activity.state}</h2>
      <LiveDataDisplay />
    </div>
  );
}
\`\`\`

### Creating Activities
Create activities for different parts of your application:

\`\`\`jsx
// Create activities for different app sections
const dashboardActivity = createActivity({
  id: 'dashboard',
  preloadStrategy: 'eager', // 'eager' | 'lazy' | 'manual'
  suspendStrategy: 'memory', // 'memory' | 'disk' | 'none'
  priority: 'high' // 'high' | 'normal' | 'low'
});

const profileActivity = createActivity({
  id: 'profile',
  preloadStrategy: 'lazy',
  suspendStrategy: 'disk',
  priority: 'normal'
});

function App() {
  return (
    <ActivityProvider>
      <Router>
        <Routes>
          <Route 
            path="/dashboard" 
            element={
              <Activity activity={dashboardActivity}>
                <DashboardPage />
              </Activity>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Activity activity={profileActivity}>
                <ProfilePage />
              </Activity>
            } 
          />
        </Routes>
      </Router>
    </ActivityProvider>
  );
}
\`\`\`

---

## 3. Background Preloading Strategies

### Intelligent Resource Preloading
Preload resources based on user behavior and navigation patterns:

\`\`\`jsx
import { usePreloader, preloadResource } from 'react';

function IntelligentPreloadingExample() {
  const preloader = usePreloader();
  const [currentPage, setCurrentPage] = useState('home');
  
  // Preload likely next pages based on current page
  useEffect(() => {
    const preloadStrategies = {
      home: () => {
        // From home, users often go to products or about
        preloader.preload('/products', { priority: 'high' });
        preloader.preload('/about', { priority: 'low' });
      },
      products: () => {
        // From products, users often view individual products
        preloader.preload('/product/popular', { priority: 'high' });
        preloader.preload('/cart', { priority: 'normal' });
      },
      product: () => {
        // From product page, users often go to cart or related products
        preloader.preload('/cart', { priority: 'high' });
        preloader.preload('/products/related', { priority: 'normal' });
      }
    };
    
    preloadStrategies[currentPage]?.();
  }, [currentPage, preloader]);
  
  // Preload on hover for immediate navigation
  const handleLinkHover = (href) => {
    preloader.preload(href, { 
      priority: 'high',
      timeout: 100 // Start preloading after 100ms hover
    });
  };
  
  return (
    <nav>
      <Link 
        to="/products" 
        onMouseEnter={() => handleLinkHover('/products')}
      >
        Products
      </Link>
      <Link 
        to="/about" 
        onMouseEnter={() => handleLinkHover('/about')}
      >
        About
      </Link>
    </nav>
  );
}
\`\`\`

### Resource Prioritization
Manage resource loading priorities based on importance:

\`\`\`jsx
function ResourcePrioritizationExample() {
  const { preloadResource, getResourceStatus } = usePreloader();
  
  useEffect(() => {
    // Critical resources - load immediately
    preloadResource('/api/user/profile', {
      priority: 'critical',
      cache: 'memory',
      timeout: 5000
    });
    
    // Important resources - load after critical
    preloadResource('/api/user/preferences', {
      priority: 'high',
      cache: 'memory',
      timeout: 10000
    });
    
    // Nice-to-have resources - load when idle
    preloadResource('/api/user/recommendations', {
      priority: 'low',
      cache: 'disk',
      timeout: 30000,
      loadWhenIdle: true
    });
    
    // Background resources - load opportunistically
    preloadResource('/api/user/analytics', {
      priority: 'background',
      cache: 'disk',
      loadInBackground: true
    });
  }, [preloadResource]);
  
  // Monitor resource loading status
  const profileStatus = getResourceStatus('/api/user/profile');
  const preferencesStatus = getResourceStatus('/api/user/preferences');
  
  return (
    <div className="resource-status">
      <div>Profile: {profileStatus.state}</div>
      <div>Preferences: {preferencesStatus.state}</div>
      
      {profileStatus.state === 'loading' && (
        <div>Loading critical resources...</div>
      )}
    </div>
  );
}
\`\`\`

---

## 4. State Preservation Patterns

### Form State Preservation
Maintain form state across navigation:

\`\`\`jsx
function PersistentFormExample() {
  const activity = useActivity();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isDraft, setIsDraft] = useState(false);
  
  // Save form state when activity becomes inactive
  useEffect(() => {
    if (!activity.isActive && formData.name) {
      // Save as draft
      activity.preserveState('formDraft', formData);
      setIsDraft(true);
    }
  }, [activity.isActive, formData]);
  
  // Restore form state when activity becomes active
  useEffect(() => {
    if (activity.isActive) {
      const savedDraft = activity.getPreservedState('formDraft');
      if (savedDraft) {
        setFormData(savedDraft);
        setIsDraft(true);
      }
    }
  }, [activity.isActive]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form
    submitForm(formData);
    // Clear preserved state
    activity.clearPreservedState('formDraft');
    setIsDraft(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {isDraft && (
        <div className="draft-notice">
          Draft restored from previous session
        </div>
      )}
      
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
      />
      
      <textarea
        value={formData.message}
        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        placeholder="Message"
      />
      
      <button type="submit">Send Message</button>
    </form>
  );
}
\`\`\`

### Scroll Position Preservation
Maintain scroll positions across navigation:

\`\`\`jsx
function ScrollPreservationExample() {
  const activity = useActivity();
  const scrollContainerRef = useRef(null);
  
  // Save scroll position when leaving
  useEffect(() => {
    if (!activity.isActive && scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      activity.preserveState('scrollPosition', scrollTop);
    }
  }, [activity.isActive]);
  
  // Restore scroll position when returning
  useEffect(() => {
    if (activity.isActive && scrollContainerRef.current) {
      const savedScrollTop = activity.getPreservedState('scrollPosition');
      if (savedScrollTop !== undefined) {
        scrollContainerRef.current.scrollTop = savedScrollTop;
      }
    }
  }, [activity.isActive]);
  
  return (
    <div 
      ref={scrollContainerRef}
      className="scroll-container"
      style={{ height: '400px', overflow: 'auto' }}
    >
      {/* Long list of content */}
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} className="list-item">
          Item {i + 1}
        </div>
      ))}
    </div>
  );
}
\`\`\`

---

## 5. Memory Management and Cleanup

### Intelligent Resource Cleanup
Manage memory usage with smart cleanup strategies:

\`\`\`jsx
function MemoryManagedComponent() {
  const activity = useActivity();
  const [heavyData, setHeavyData] = useState(null);
  const [lightData, setLightData] = useState(null);
  
  // Load data based on activity state
  useEffect(() => {
    if (activity.isActive) {
      // Load all data when active
      loadHeavyData().then(setHeavyData);
      loadLightData().then(setLightData);
    } else if (activity.isVisible) {
      // Keep light data when visible but not active
      if (!lightData) {
        loadLightData().then(setLightData);
      }
      // Cleanup heavy data to save memory
      setHeavyData(null);
    } else if (activity.isSuspended) {
      // Cleanup all data when suspended
      setHeavyData(null);
      setLightData(null);
    }
  }, [activity.state]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupResources();
    };
  }, []);
  
  return (
    <div className="memory-managed">
      {lightData && <LightDataDisplay data={lightData} />}
      {heavyData && <HeavyDataDisplay data={heavyData} />}
      
      {activity.isSuspended && (
        <div className="suspended-placeholder">
          Content suspended to save memory
        </div>
      )}
    </div>
  );
}
\`\`\`

---

## 6. Best Practices

### Do's ✅
- **Use activity states wisely** - respond appropriately to active, visible, and suspended states
- **Implement intelligent preloading** - preload based on user behavior patterns
- **Preserve important state** - save form data, scroll positions, and user preferences
- **Manage memory efficiently** - cleanup heavy resources when not needed
- **Prioritize resources** - load critical resources first
- **Monitor performance** - track preloading effectiveness and memory usage

### Don'ts ❌
- **Don't preload everything** - be selective about what to preload
- **Don't ignore memory limits** - cleanup unused resources appropriately
- **Don't preserve sensitive data** - avoid storing sensitive information in preserved state
- **Don't block the main thread** - use background loading for heavy operations
- **Don't forget error handling** - handle preloading failures gracefully

---

## Summary

The Activity API enables:

1. **Intelligent Background Loading**: Preload resources before they're needed
2. **State Preservation**: Maintain component state across navigation
3. **Memory Management**: Efficient resource cleanup and management
4. **Performance Optimization**: Faster navigation and better user experience
5. **Resource Prioritization**: Load important resources first
6. **Seamless Transitions**: Smooth navigation between different app sections

The Activity API represents the future of React navigation and resource management, enabling applications that feel instant and responsive while efficiently managing system resources.
`,

  contentFa: `
# Activity API و بارگذاری پس‌زمینه

## تعریف
**Activity API** یک ویژگی آزمایشی ری‌اکت ۱۹ است که بارگذاری هوشمند پس‌زمینه و حفظ وضعیت در طول ناوبری را امکان‌پذیر می‌کند. این API به اپلیکیشن‌ها اجازه می‌دهد محتوا را از پیش بارگذاری کنند، وضعیت کامپوننت‌ها را در طول تغییر مسیر حفظ کنند و با پیش‌بینی اقدامات کاربر و آماده‌سازی منابع از پیش، تجربه‌های کاربری یکپارچه ارائه دهند.

## ویژگی‌های اصلی
- **پیش‌بارگذاری پس‌زمینه**: بارگذاری منابع قبل از نیاز
- **حفظ وضعیت**: نگهداری وضعیت کامپوننت در طول ناوبری
- **کش هوشمند**: مدیریت هوشمند منابع و پاکسازی
- **بهینه‌سازی ناوبری**: انتقال سریع‌تر صفحات و تعاملات
- **اولویت‌بندی منابع**: بارگذاری منابع حیاتی ابتدا
- **مدیریت حافظه**: پاکسازی کارآمد منابع استفاده نشده

---

## ۱. درک مفاهیم Activity API

### ناوبری سنتی در مقابل Activity API
ناوبری سنتی کامپوننت‌ها را نابود و دوباره ایجاد می‌کند:

\`\`\`jsx
// رویکرد سنتی - وضعیت کامپوننت از دست می‌رود
function TraditionalApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}

// هر ناوبری کامپوننت قبلی را نابود می‌کند
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // وضعیت هنگام خروج از صفحه از دست می‌رود
  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);
  
  return (
    <div>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <FilterPanel filters={filters} onChange={setFilters} />
      <ProductGrid products={products} />
    </div>
  );
}
\`\`\`

### رویکرد Activity API
با Activity API، کامپوننت‌ها می‌توانند وضعیت را حفظ کنند و منابع را از پیش بارگذاری کنند:

\`\`\`jsx
import { useActivity, createActivity } from 'react';

// کامپوننت آگاه به Activity که وضعیت را حفظ می‌کند
function ActivityAwareProductsPage() {
  const activity = useActivity();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // وضعیت هنگام پس‌زمینه شدن activity حفظ می‌شود
  useEffect(() => {
    if (activity.isActive) {
      fetchProducts().then(setProducts);
    }
  }, [activity.isActive]);
  
  // پیش‌بارگذاری منابع مرتبط هنگام مرئی شدن activity
  useEffect(() => {
    if (activity.isVisible) {
      // پیش‌بارگذاری دسته‌بندی محصولات
      preloadResource('/api/categories');
      // پیش‌بارگذاری محصولات محبوب
      preloadResource('/api/products/popular');
    }
  }, [activity.isVisible]);
  
  return (
    <div>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <FilterPanel filters={filters} onChange={setFilters} />
      <ProductGrid products={products} />
    </div>
  );
}
\`\`\`

---

## ۲. چرخه حیات و وضعیت‌های Activity

### وضعیت‌های Activity
Activityها چندین وضعیت دارند که کامپوننت‌ها می‌توانند به آنها پاسخ دهند:

\`\`\`jsx
function ActivityLifecycleExample() {
  const activity = useActivity();
  
  useEffect(() => {
    console.log('وضعیت Activity:', {
      isActive: activity.isActive,     // در حال حاضر فوکوس/اصلی
      isVisible: activity.isVisible,   // برای کاربر مرئی (ممکن است پس‌زمینه باشد)
      isPreloading: activity.isPreloading, // در حال پیش‌بارگذاری
      isSuspended: activity.isSuspended,   // برای صرفه‌جویی منابع معلق شده
    });
  }, [activity]);
  
  // پاسخ به وضعیت‌های مختلف activity
  useEffect(() => {
    if (activity.isActive) {
      // کامپوننت فعال است - شروع بروزرسانی‌های زمان واقعی
      const interval = setInterval(fetchLiveData, 1000);
      return () => clearInterval(interval);
    }
  }, [activity.isActive]);
  
  useEffect(() => {
    if (activity.isVisible && !activity.isActive) {
      // کامپوننت مرئی است اما فعال نیست - کاهش فرکانس بروزرسانی
      const interval = setInterval(fetchLiveData, 5000);
      return () => clearInterval(interval);
    }
  }, [activity.isVisible, activity.isActive]);
  
  useEffect(() => {
    if (activity.isSuspended) {
      // کامپوننت معلق است - پاکسازی منابع
      cleanupExpensiveResources();
    }
  }, [activity.isSuspended]);
  
  return (
    <div className={\`activity-\${activity.state}\`}>
      <h2>وضعیت Activity: {activity.state}</h2>
      <LiveDataDisplay />
    </div>
  );
}
\`\`\`

---

## خلاصه

Activity API امکانات زیر را فراهم می‌کند:

۱. **بارگذاری هوشمند پس‌زمینه**: پیش‌بارگذاری منابع قبل از نیاز
۲. **حفظ وضعیت**: نگهداری وضعیت کامپوننت در طول ناوبری
۳. **مدیریت حافظه**: پاکسازی و مدیریت کارآمد منابع
۴. **بهینه‌سازی عملکرد**: ناوبری سریع‌تر و تجربه کاربری بهتر
۵. **اولویت‌بندی منابع**: بارگذاری منابع مهم ابتدا
۶. **انتقال یکپارچه**: ناوبری روان بین بخش‌های مختلف اپ

Activity API آینده ناوبری و مدیریت منابع ری‌اکت را نمایندگی می‌کند و اپلیکیشن‌هایی را امکان‌پذیر می‌سازد که فوری و پاسخگو احساس می‌شوند و در عین حال منابع سیستم را به طور کارآمد مدیریت می‌کنند.
`,

  visualizationId: 'activity-api',
  exerciseId: 'activity-api',
};

export default activityApiLesson;