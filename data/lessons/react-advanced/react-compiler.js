export const reactCompilerLesson = {
  id: 'react-compiler',
  title: 'React Compiler & Automatic Optimization',
  titleFa: 'کامپایلر ری‌اکت و بهینه‌سازی خودکار',
  difficulty: 'hard',
  estimatedTime: '65 min',

  content: `
# React Compiler & Automatic Optimization

## Definition
The **React Compiler** is a revolutionary build-time optimization tool introduced in React 19 that automatically optimizes React components by analyzing your code and applying memoization where beneficial. It eliminates the need for manual optimization with \`useMemo\`, \`useCallback\`, and \`React.memo\` in most cases, making React applications faster by default.

## Key Features
- **Automatic Memoization**: Intelligently memoizes components, values, and functions
- **Zero Configuration**: Works out of the box with minimal setup
- **Build-Time Optimization**: Optimizations happen during compilation, not runtime
- **Smart Analysis**: Only optimizes where it provides actual performance benefits
- **Backward Compatible**: Existing code continues to work without changes
- **Bundle Size Reduction**: Removes unnecessary re-renders and computations

---

## 1. Understanding the React Compiler

### The Problem with Manual Optimization
Before the React Compiler, developers had to manually optimize components:

\`\`\`jsx
// Manual optimization - lots of boilerplate
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ 
  items, 
  onItemClick, 
  filterText 
}) {
  // Manual memoization of expensive calculations
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]);

  // Manual memoization of event handlers
  const handleItemClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  // Manual memoization of derived data
  const itemCount = useMemo(() => filteredItems.length, [filteredItems]);

  return (
    <div className="expensive-component">
      <h3>Items ({itemCount})</h3>
      {filteredItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
});

const ItemCard = memo(function ItemCard({ item, onClick }) {
  const handleClick = useCallback(() => {
    onClick(item.id);
  }, [onClick, item.id]);

  return (
    <div className="item-card" onClick={handleClick}>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );
});
\`\`\`

### React Compiler Automatic Optimization
The same component with React Compiler requires no manual optimization:

\`\`\`jsx
// With React Compiler - clean and simple
function ExpensiveComponent({ items, onItemClick, filterText }) {
  // Compiler automatically memoizes this expensive calculation
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Compiler automatically memoizes this derived value
  const itemCount = filteredItems.length;

  // Compiler automatically memoizes this function
  const handleItemClick = (id) => {
    onItemClick(id);
  };

  return (
    <div className="expensive-component">
      <h3>Items ({itemCount})</h3>
      {filteredItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}

// Compiler automatically optimizes this component too
function ItemCard({ item, onClick }) {
  const handleClick = () => {
    onClick(item.id);
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );
}
\`\`\`

---

## 2. How the React Compiler Works

### Compilation Process
The React Compiler analyzes your code during build time:

1. **Static Analysis**: Examines component dependencies and data flow
2. **Optimization Detection**: Identifies opportunities for memoization
3. **Code Transformation**: Automatically inserts optimization code
4. **Validation**: Ensures optimizations don't change behavior

### Example Transformation
Here's what the compiler does behind the scenes:

\`\`\`jsx
// Your original code
function UserProfile({ user, theme }) {
  const displayName = user.firstName + ' ' + user.lastName;
  const avatarStyle = {
    backgroundColor: theme.primaryColor,
    border: \`2px solid \${theme.borderColor}\`
  };

  return (
    <div className="user-profile">
      <img src={user.avatar} style={avatarStyle} alt={displayName} />
      <h2>{displayName}</h2>
    </div>
  );
}

// What the compiler generates (conceptually)
function UserProfile({ user, theme }) {
  // Compiler automatically memoizes expensive string concatenation
  const displayName = useMemo(() => 
    user.firstName + ' ' + user.lastName, 
    [user.firstName, user.lastName]
  );
  
  // Compiler automatically memoizes object creation
  const avatarStyle = useMemo(() => ({
    backgroundColor: theme.primaryColor,
    border: \`2px solid \${theme.borderColor}\`
  }), [theme.primaryColor, theme.borderColor]);

  return (
    <div className="user-profile">
      <img src={user.avatar} style={avatarStyle} alt={displayName} />
      <h2>{displayName}</h2>
    </div>
  );
}
\`\`\`

---

## 3. Advanced Optimization Patterns

### Complex State Calculations
The compiler optimizes complex state derivations:

\`\`\`jsx
function DataDashboard({ rawData, filters, sortConfig }) {
  // Compiler automatically optimizes this complex chain
  const processedData = rawData
    .filter(item => {
      return filters.every(filter => {
        switch (filter.type) {
          case 'text':
            return item[filter.field]
              .toLowerCase()
              .includes(filter.value.toLowerCase());
          case 'range':
            return item[filter.field] >= filter.min && 
                   item[filter.field] <= filter.max;
          case 'category':
            return filter.values.includes(item[filter.field]);
          default:
            return true;
        }
      });
    })
    .sort((a, b) => {
      const aVal = a[sortConfig.field];
      const bVal = b[sortConfig.field];
      const modifier = sortConfig.direction === 'desc' ? -1 : 1;
      
      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal) * modifier;
      }
      return (aVal - bVal) * modifier;
    });

  // Compiler optimizes aggregations too
  const statistics = {
    total: processedData.length,
    average: processedData.reduce((sum, item) => sum + item.value, 0) / processedData.length,
    categories: [...new Set(processedData.map(item => item.category))].length
  };

  return (
    <div className="data-dashboard">
      <StatisticsPanel stats={statistics} />
      <DataTable data={processedData} />
    </div>
  );
}
\`\`\`

### Event Handler Optimization
The compiler intelligently optimizes event handlers:

\`\`\`jsx
function InteractiveForm({ onSubmit, onFieldChange, initialData }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  // Compiler optimizes these handlers based on their dependencies
  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
    
    onFieldChange?.(fieldName, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  };

  // Compiler optimizes validation function calls
  const isFieldValid = (fieldName) => {
    return !errors[fieldName] && formData[fieldName];
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(initialData).map(fieldName => (
        <FormField
          key={fieldName}
          name={fieldName}
          value={formData[fieldName]}
          error={errors[fieldName]}
          isValid={isFieldValid(fieldName)}
          onChange={handleFieldChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

---

## 4. Compiler Configuration and Setup

### Basic Setup
Add the React Compiler to your build process:

\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            // Compiler options
            target: '19' // Target React version
          }]
        ]
      }
    })
  ]
});

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['babel-plugin-react-compiler', {
                target: '19',
                // Additional options
                sources: (filename) => {
                  return filename.includes('src/');
                }
              }]
            ]
          }
        }
      }
    ]
  }
};
\`\`\`

### Advanced Configuration
Fine-tune compiler behavior:

\`\`\`javascript
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      target: '19',
      
      // Control which files to compile
      sources: (filename) => {
        // Only compile files in src directory
        return filename.includes('src/') && 
               !filename.includes('node_modules/');
      },
      
      // Optimization levels
      optimizationLevel: 'aggressive', // 'conservative' | 'balanced' | 'aggressive'
      
      // Skip optimization for specific patterns
      skipOptimization: {
        // Skip components with these patterns
        componentPatterns: [
          /^Legacy/, // Skip components starting with "Legacy"
          /Test$/ // Skip test components
        ],
        
        // Skip files with these patterns
        filePatterns: [
          /\\.test\\./,
          /\\.spec\\./
        ]
      },
      
      // Enable experimental features
      experimental: {
        // Enable more aggressive optimizations
        aggressiveMemoization: true,
        
        // Optimize across component boundaries
        crossComponentOptimization: true
      }
    }]
  ]
};
\`\`\`

---

## 5. Debugging and Profiling

### Compiler Output Analysis
View what the compiler is doing:

\`\`\`javascript
// Enable compiler debugging
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      target: '19',
      
      // Debug options
      debug: {
        // Log optimization decisions
        logOptimizations: true,
        
        // Generate optimization reports
        generateReports: true,
        reportPath: './compiler-reports',
        
        // Preserve original code in comments
        preserveOriginal: true
      }
    }]
  ]
};
\`\`\`

### Performance Monitoring
Monitor compiler effectiveness:

\`\`\`jsx
// Use React DevTools Profiler to measure improvements
import { Profiler } from 'react';

function App() {
  const onRenderCallback = (id, phase, actualDuration, baseDuration) => {
    console.log('Render Performance:', {
      component: id,
      phase, // 'mount' or 'update'
      actualDuration, // Time spent rendering
      baseDuration, // Estimated time without memoization
      improvement: baseDuration - actualDuration
    });
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}

// Custom hook for performance monitoring
function useRenderCount(componentName) {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(\`\${componentName} rendered \${renderCount.current} times\`);
  });
  
  return renderCount.current;
}

function OptimizedComponent({ data }) {
  const renderCount = useRenderCount('OptimizedComponent');
  
  // Component logic here
  return <div>Render count: {renderCount}</div>;
}
\`\`\`

---

## 6. Migration Strategies

### Gradual Adoption
Migrate existing codebases incrementally:

\`\`\`jsx
// Step 1: Enable compiler for new components only
// babel.config.js
module.exports = {
  plugins: [
    ['babel-plugin-react-compiler', {
      sources: (filename) => {
        // Only compile files in 'new-components' directory
        return filename.includes('src/new-components/');
      }
    }]
  ]
};

// Step 2: Remove manual optimizations gradually
// Before (manual optimization)
const LegacyComponent = memo(function LegacyComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
});

// After (compiler optimized)
function ModernComponent({ items }) {
  // Remove manual memoization - compiler handles it
  const expensiveValue = items.reduce((sum, item) => sum + item.value, 0);
  
  return <div>{expensiveValue}</div>;
}

// Step 3: Validate performance improvements
function PerformanceComparison() {
  return (
    <div>
      <Profiler id="Legacy" onRender={logPerformance}>
        <LegacyComponent items={largeDataset} />
      </Profiler>
      
      <Profiler id="Modern" onRender={logPerformance}>
        <ModernComponent items={largeDataset} />
      </Profiler>
    </div>
  );
}
\`\`\`

### Handling Edge Cases
Deal with compiler limitations:

\`\`\`jsx
// Use compiler directives for special cases
function SpecialComponent({ data }) {
  // Disable compiler for this specific calculation
  // @react-compiler-disable-next-line
  const complexCalculation = performComplexOperation(data);
  
  // Compiler optimizes the rest normally
  const simpleCalculation = data.length * 2;
  
  return (
    <div>
      <div>Complex: {complexCalculation}</div>
      <div>Simple: {simpleCalculation}</div>
    </div>
  );
}

// Opt out entire components when needed
// @react-compiler-disable
function LegacyComponent({ props }) {
  // This component won't be optimized by the compiler
  // Useful for components with complex side effects
  return <div>Legacy content</div>;
}
\`\`\`

---

## 7. Best Practices

### Do's ✅
- **Enable compiler for new projects** - Start with compiler from the beginning
- **Write clean, readable code** - Compiler works best with clear code patterns
- **Remove manual optimizations gradually** - Let compiler handle memoization
- **Monitor performance improvements** - Use profiling to validate benefits
- **Keep dependencies minimal** - Cleaner dependency arrays help compiler
- **Use TypeScript** - Better static analysis leads to better optimizations
- **Test thoroughly** - Ensure compiler optimizations don't change behavior

### Don'ts ❌
- **Don't over-optimize manually** - Let compiler do the work
- **Don't disable compiler without reason** - Only opt out when necessary
- **Don't ignore performance monitoring** - Always validate improvements
- **Don't mix optimization strategies** - Choose compiler OR manual, not both
- **Don't assume all code benefits** - Some patterns may not need optimization
- **Don't forget about bundle size** - Monitor overall application size

### Performance Guidelines
\`\`\`jsx
// Good: Clean code that compiler can optimize well
function GoodComponent({ users, searchTerm }) {
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const userCount = filteredUsers.length;
  
  return (
    <div>
      <h3>Users ({userCount})</h3>
      {filteredUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Avoid: Complex patterns that confuse the compiler
function AvoidComponent({ data }) {
  // Complex nested operations are harder to optimize
  const result = data
    .map(item => ({ ...item, processed: true }))
    .filter((item, index, array) => {
      // Complex filter logic with array reference
      return array.slice(0, index).every(prev => prev.id !== item.id);
    })
    .reduce((acc, item) => {
      // Complex accumulator logic
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
  
  return <div>{JSON.stringify(result)}</div>;
}
\`\`\`

---

## Summary

The React Compiler revolutionizes React development by:

1. **Eliminating Manual Optimization**: No more \`useMemo\`, \`useCallback\`, and \`React.memo\` boilerplate
2. **Improving Performance by Default**: Automatic optimizations make apps faster
3. **Reducing Bundle Size**: Fewer manual optimization hooks mean smaller bundles
4. **Enhancing Developer Experience**: Focus on business logic, not performance tuning
5. **Maintaining Compatibility**: Existing code continues to work unchanged
6. **Providing Intelligent Analysis**: Only optimizes where it provides real benefits

The React Compiler represents the future of React optimization, making high-performance applications accessible to all developers without requiring deep optimization expertise.
`,

  contentFa: `
# کامپایلر ری‌اکت و بهینه‌سازی خودکار

## تعریف
**کامپایلر ری‌اکت** ابزار انقلابی بهینه‌سازی زمان ساخت است که در ری‌اکت ۱۹ معرفی شده و به صورت خودکار کامپوننت‌های ری‌اکت را با تجزیه و تحلیل کد شما و اعمال memoization در جاهای مفید بهینه می‌کند. این ابزار نیاز به بهینه‌سازی دستی با \`useMemo\`، \`useCallback\` و \`React.memo\` را در اکثر موارد حذف می‌کند و اپلیکیشن‌های ری‌اکت را به صورت پیش‌فرض سریع‌تر می‌کند.

## ویژگی‌های اصلی
- **Memoization خودکار**: به صورت هوشمند کامپوننت‌ها، مقادیر و توابع را memoize می‌کند
- **بدون پیکربندی**: بدون تنظیمات پیچیده کار می‌کند
- **بهینه‌سازی زمان ساخت**: بهینه‌سازی‌ها در زمان کامپایل اتفاق می‌افتند، نه زمان اجرا
- **تجزیه و تحلیل هوشمند**: فقط جاهایی را بهینه می‌کند که واقعاً مفید است
- **سازگاری با گذشته**: کدهای موجود بدون تغییر کار می‌کنند
- **کاهش حجم بسته**: رندرهای غیرضروری و محاسبات اضافی را حذف می‌کند

---

## ۱. درک کامپایلر ری‌اکت

### مشکل بهینه‌سازی دستی
قبل از کامپایلر ری‌اکت، توسعه‌دهندگان باید به صورت دستی کامپوننت‌ها را بهینه می‌کردند:

\`\`\`jsx
// بهینه‌سازی دستی - کد اضافی زیاد
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ 
  items, 
  onItemClick, 
  filterText 
}) {
  // memoization دستی محاسبات سنگین
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [items, filterText]);

  // memoization دستی event handlerها
  const handleItemClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  // memoization دستی داده‌های مشتق شده
  const itemCount = useMemo(() => filteredItems.length, [filteredItems]);

  return (
    <div className="expensive-component">
      <h3>آیتم‌ها ({itemCount})</h3>
      {filteredItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
});

const ItemCard = memo(function ItemCard({ item, onClick }) {
  const handleClick = useCallback(() => {
    onClick(item.id);
  }, [onClick, item.id]);

  return (
    <div className="item-card" onClick={handleClick}>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );
});
\`\`\`

### بهینه‌سازی خودکار کامپایلر ری‌اکت
همان کامپوننت با کامپایلر ری‌اکت نیازی به بهینه‌سازی دستی ندارد:

\`\`\`jsx
// با کامپایلر ری‌اکت - تمیز و ساده
function ExpensiveComponent({ items, onItemClick, filterText }) {
  // کامپایلر به صورت خودکار این محاسبه سنگین را memoize می‌کند
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // کامپایلر به صورت خودکار این مقدار مشتق شده را memoize می‌کند
  const itemCount = filteredItems.length;

  // کامپایلر به صورت خودکار این تابع را memoize می‌کند
  const handleItemClick = (id) => {
    onItemClick(id);
  };

  return (
    <div className="expensive-component">
      <h3>آیتم‌ها ({itemCount})</h3>
      {filteredItems.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}

// کامپایلر این کامپوننت را هم به صورت خودکار بهینه می‌کند
function ItemCard({ item, onClick }) {
  const handleClick = () => {
    onClick(item.id);
  };

  return (
    <div className="item-card" onClick={handleClick}>
      <h4>{item.name}</h4>
      <p>{item.description}</p>
    </div>
  );
}
\`\`\`

---

## ۲. نحوه کار کامپایلر ری‌اکت

### فرآیند کامپایل
کامپایلر ری‌اکت کد شما را در زمان ساخت تجزیه و تحلیل می‌کند:

۱. **تجزیه و تحلیل استاتیک**: وابستگی‌های کامپوننت و جریان داده را بررسی می‌کند
۲. **تشخیص بهینه‌سازی**: فرصت‌های memoization را شناسایی می‌کند
۳. **تبدیل کد**: به صورت خودکار کد بهینه‌سازی را وارد می‌کند
۴. **اعتبارسنجی**: اطمینان حاصل می‌کند که بهینه‌سازی‌ها رفتار را تغییر نمی‌دهند

### مثال تبدیل
این کاری است که کامپایلر در پشت صحنه انجام می‌دهد:

\`\`\`jsx
// کد اصلی شما
function UserProfile({ user, theme }) {
  const displayName = user.firstName + ' ' + user.lastName;
  const avatarStyle = {
    backgroundColor: theme.primaryColor,
    border: \`2px solid \${theme.borderColor}\`
  };

  return (
    <div className="user-profile">
      <img src={user.avatar} style={avatarStyle} alt={displayName} />
      <h2>{displayName}</h2>
    </div>
  );
}

// آنچه کامپایلر تولید می‌کند (مفهومی)
function UserProfile({ user, theme }) {
  // کامپایلر به صورت خودکار الحاق رشته سنگین را memoize می‌کند
  const displayName = useMemo(() => 
    user.firstName + ' ' + user.lastName, 
    [user.firstName, user.lastName]
  );
  
  // کامپایلر به صورت خودکار ایجاد شیء را memoize می‌کند
  const avatarStyle = useMemo(() => ({
    backgroundColor: theme.primaryColor,
    border: \`2px solid \${theme.borderColor}\`
  }), [theme.primaryColor, theme.borderColor]);

  return (
    <div className="user-profile">
      <img src={user.avatar} style={avatarStyle} alt={displayName} />
      <h2>{displayName}</h2>
    </div>
  );
}
\`\`\`

---

## خلاصه

کامپایلر ری‌اکت توسعه ری‌اکت را با موارد زیر متحول می‌کند:

۱. **حذف بهینه‌سازی دستی**: دیگر نیازی به کدهای اضافی \`useMemo\`، \`useCallback\` و \`React.memo\` نیست
۲. **بهبود عملکرد به صورت پیش‌فرض**: بهینه‌سازی‌های خودکار اپ‌ها را سریع‌تر می‌کند
۳. **کاهش حجم بسته**: هوک‌های بهینه‌سازی دستی کمتر یعنی بسته‌های کوچک‌تر
۴. **بهبود تجربه توسعه‌دهنده**: تمرکز روی منطق کسب‌وکار، نه تنظیم عملکرد
۵. **حفظ سازگاری**: کدهای موجود بدون تغییر کار می‌کنند
۶. **ارائه تجزیه و تحلیل هوشمند**: فقط جاهایی را بهینه می‌کند که واقعاً مفید است

کامپایلر ری‌اکت آینده بهینه‌سازی ری‌اکت را نمایندگی می‌کند و اپلیکیشن‌های پرفورمنس بالا را برای همه توسعه‌دهندگان بدون نیاز به تخصص عمیق بهینه‌سازی در دسترس قرار می‌دهد.
`,

  visualizationId: 'react-compiler',
  exerciseId: 'react-compiler',
};

export default reactCompilerLesson;