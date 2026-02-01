export const dataFetchingLesson = {
  id: 'data-fetching',
  title: 'Data Fetching in Modern React',
  titleFa: 'دریافت داده‌ها در ری‌اکت مدرن',
  difficulty: 'hard',
  estimatedTime: '75 min',

  content: `
# Data Fetching in Modern React

## Definition
**Data Fetching** is the process of retrieving information from external sources (like REST APIs or GraphQL) and displaying it in the user interface. In modern React, we've moved from simple \`fetch\` calls in \`useEffect\` hooks to powerful "server state management" libraries and new native features like the **use()** hook in React 19 and **Server Components**.

## Key Features
- **Caching**: Reuse previously fetched data to speed up the application
- **Background Updates**: Automatically refresh data when it becomes stale
- **Optimistic Updates**: Update UI immediately, then sync with server
- **Error Handling**: Robust error boundaries and retry mechanisms
- **Loading States**: Elegant loading indicators and skeleton screens
- **Concurrent Features**: Non-blocking data fetching with Suspense

---

## 1. Evolution of Data Fetching in React

### Traditional Approach (React 18 and earlier)
The old way required manual state management for loading, error, and data states:

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
\`\`\`

### Modern Approach with React 19 use() Hook
The new \`use()\` hook simplifies promise handling:

\`\`\`jsx
import { use, Suspense } from 'react';

// Create a promise outside the component
function fetchUser(userId) {
  return fetch(\`/api/users/\${userId}\`).then(res => {
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  });
}

function UserProfile({ userId }) {
  // use() hook handles the promise automatically
  const user = use(fetchUser(userId));

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

// Wrap with Suspense for loading states
function App() {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfile userId="123" />
    </Suspense>
  );
}
\`\`\`

---

## 2. Advanced Data Fetching with use() Hook

### Conditional Data Fetching
The \`use()\` hook can be called conditionally, unlike other hooks:

\`\`\`jsx
import { use, useState } from 'react';

function ConditionalDataFetching() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // This is allowed with use() - conditional hook calls!
  const userDetails = showDetails && selectedUserId 
    ? use(fetchUserDetails(selectedUserId))
    : null;

  return (
    <div>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      
      {showDetails && (
        <select onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value="">Select a user</option>
          <option value="1">John Doe</option>
          <option value="2">Jane Smith</option>
        </select>
      )}
      
      {userDetails && (
        <div className="user-details">
          <h3>{userDetails.name}</h3>
          <p>Department: {userDetails.department}</p>
          <p>Role: {userDetails.role}</p>
        </div>
      )}
    </div>
  );
}
\`\`\`

### Parallel Data Fetching
Fetch multiple resources simultaneously:

\`\`\`jsx
import { use, Suspense } from 'react';

function fetchUserProfile(userId) {
  return fetch(\`/api/users/\${userId}\`).then(res => res.json());
}

function fetchUserPosts(userId) {
  return fetch(\`/api/users/\${userId}/posts\`).then(res => res.json());
}

function fetchUserFollowers(userId) {
  return fetch(\`/api/users/\${userId}/followers\`).then(res => res.json());
}

function UserDashboard({ userId }) {
  // All three requests start simultaneously
  const userPromise = fetchUserProfile(userId);
  const postsPromise = fetchUserPosts(userId);
  const followersPromise = fetchUserFollowers(userId);

  // use() waits for each promise as needed
  const user = use(userPromise);
  const posts = use(postsPromise);
  const followers = use(followersPromise);

  return (
    <div className="user-dashboard">
      <header>
        <h1>{user.name}</h1>
        <p>{followers.length} followers</p>
      </header>
      
      <section>
        <h2>Recent Posts ({posts.length})</h2>
        {posts.slice(0, 5).map(post => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <UserDashboard userId="123" />
    </Suspense>
  );
}
\`\`\`

---

## 3. Error Handling with use() Hook

### Error Boundaries for Data Fetching
Handle errors gracefully with error boundaries:

\`\`\`jsx
import { use, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function fetchUserWithError(userId) {
  return fetch(\`/api/users/\${userId}\`).then(res => {
    if (!res.ok) {
      throw new Error(\`Failed to fetch user: \${res.status}\`);
    }
    return res.json();
  });
}

function UserProfile({ userId }) {
  const user = use(fetchUserWithError(userId));
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userId="123" />
      </Suspense>
    </ErrorBoundary>
  );
}
\`\`\`

---

## 4. Caching and Performance Optimization

### Simple Promise Caching
Implement basic caching to avoid duplicate requests:

\`\`\`jsx
// Simple cache implementation
const cache = new Map();

function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const promise = fetch(url)
    .then(res => res.json())
    .catch(error => {
      // Remove failed requests from cache
      cache.delete(url);
      throw error;
    });
  
  cache.set(url, promise);
  return promise;
}

function CachedUserProfile({ userId }) {
  const user = use(fetchWithCache(\`/api/users/\${userId}\`));
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>This data is cached!</p>
    </div>
  );
}
\`\`\`

### Integration with TanStack Query
For production applications, use a robust data fetching library:

\`\`\`jsx
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { use } from 'react';

const queryClient = new QueryClient();

function fetchUser(userId) {
  return fetch(\`/api/users/\${userId}\`).then(res => res.json());
}

function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile userId="123" />
    </QueryClientProvider>
  );
}
\`\`\`

---

## 5. Server Components and Data Fetching

### Server Components with Async/Await
Server Components can fetch data directly with async/await:

\`\`\`jsx
// This runs on the server
async function UserProfile({ userId }) {
  // Direct async/await in Server Components
  const user = await fetch(\`\${process.env.API_URL}/users/\${userId}\`)
    .then(res => res.json());
  
  const posts = await fetch(\`\${process.env.API_URL}/users/\${userId}/posts\`)
    .then(res => res.json());

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      
      <section>
        <h2>Posts ({posts.length})</h2>
        {posts.map(post => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

// Client Component for interactivity
'use client';
function InteractiveUserProfile({ userId }) {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      
      {showDetails && (
        <Suspense fallback={<div>Loading details...</div>}>
          <UserProfile userId={userId} />
        </Suspense>
      )}
    </div>
  );
}
\`\`\`

---

## 6. Best Practices for Modern Data Fetching

### Do's ✅
- **Use Suspense boundaries** for loading states
- **Implement error boundaries** for graceful error handling
- **Cache frequently accessed data** to improve performance
- **Use Server Components** for initial data loading when possible
- **Implement optimistic updates** for better user experience
- **Handle loading and error states** consistently across your app

### Don'ts ❌
- **Don't fetch data in useEffect** when you can use the use() hook
- **Don't ignore error handling** - always provide fallbacks
- **Don't over-fetch data** - only request what you need
- **Don't forget about caching** - avoid duplicate requests
- **Don't block the UI** - use concurrent features appropriately

---

## Summary

Modern React data fetching has evolved significantly:

1. **use() Hook**: Simplifies promise handling with built-in Suspense integration
2. **Server Components**: Enable server-side data fetching with async/await
3. **Error Boundaries**: Provide robust error handling for data fetching failures
4. **Caching Strategies**: Improve performance with intelligent data caching
5. **Concurrent Features**: Non-blocking UI updates with Suspense and transitions
6. **Library Integration**: Seamless integration with libraries like TanStack Query

The combination of React 19's use() hook, Server Components, and modern data fetching libraries provides a powerful, flexible, and performant approach to handling data in React applications.
`,

  contentFa: `
# دریافت داده‌ها در ری‌اکت مدرن

## تعریف
**دریافت داده (Data Fetching)** فرآیند بازیابی اطلاعات از منابع خارجی (مثل APIهای REST یا GraphQL) و نمایش آن‌ها در رابط کاربری است. در ری‌اکت مدرن، از فراخوانی‌های ساده \`fetch\` در هوک \`useEffect\` به سمت کتابخانه‌های قدرتمند "مدیریت وضعیت سرور" و ویژگی‌های بومی جدید مثل هوک **use()** در ری‌اکت ۱۹ و **Server Components** حرکت کرده‌ایم.

## ویژگی‌های اصلی
- **ذخیره‌سازی (Caching)**: استفاده مجدد از داده‌های قبلاً دریافت شده برای سرعت بخشیدن به برنامه
- **بروزرسانی پس‌زمینه**: به‌روزرسانی خودکار داده‌ها هنگام قدیمی شدن
- **بروزرسانی خوش‌بینانه**: بروزرسانی فوری رابط کاربری، سپس همگام‌سازی با سرور
- **مدیریت خطا**: مرزهای خطای قوی و مکانیزم‌های تلاش مجدد
- **وضعیت‌های بارگذاری**: نشانگرهای بارگذاری زیبا و صفحات اسکلتی
- **ویژگی‌های همزمان**: دریافت داده غیرمسدودکننده با Suspense

---

## ۱. تکامل دریافت داده‌ها در ری‌اکت

### رویکرد سنتی (ری‌اکت ۱۸ و قبل‌تر)
روش قدیمی نیاز به مدیریت دستی state برای loading، error و data داشت:

\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error}</div>;
  if (!user) return <div>کاربری یافت نشد</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>تاریخ عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}</p>
    </div>
  );
}
\`\`\`

### رویکرد مدرن با هوک use() ری‌اکت ۱۹
هوک جدید \`use()\` مدیریت promise را ساده می‌کند:

\`\`\`jsx
import { use, Suspense } from 'react';

// ایجاد promise خارج از کامپوننت
function fetchUser(userId) {
  return fetch(\`/api/users/\${userId}\`).then(res => {
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  });
}

function UserProfile({ userId }) {
  // هوک use() به صورت خودکار promise را مدیریت می‌کند
  const user = use(fetchUser(userId));

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>تاریخ عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}</p>
    </div>
  );
}

// پوشش با Suspense برای وضعیت‌های بارگذاری
function App() {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfile userId="123" />
    </Suspense>
  );
}
\`\`\`

---

## ۲. دریافت داده‌های پیشرفته با هوک use()

### دریافت داده شرطی
هوک \`use()\` می‌تواند به صورت شرطی فراخوانی شود، برخلاف سایر هوک‌ها:

\`\`\`jsx
import { use, useState } from 'react';

function ConditionalDataFetching() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // این با use() مجاز است - فراخوانی شرطی هوک!
  const userDetails = showDetails && selectedUserId 
    ? use(fetchUserDetails(selectedUserId))
    : null;

  return (
    <div>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'مخفی کردن' : 'نمایش'} جزئیات
      </button>
      
      {showDetails && (
        <select onChange={(e) => setSelectedUserId(e.target.value)}>
          <option value="">انتخاب کاربر</option>
          <option value="1">احمد احمدی</option>
          <option value="2">فاطمه فاطمی</option>
        </select>
      )}
      
      {userDetails && (
        <div className="user-details">
          <h3>{userDetails.name}</h3>
          <p>بخش: {userDetails.department}</p>
          <p>نقش: {userDetails.role}</p>
        </div>
      )}
    </div>
  );
}
\`\`\`

---

## خلاصه

دریافت داده‌ها در ری‌اکت مدرن به طور قابل توجهی تکامل یافته است:

۱. **هوک use()**: مدیریت promise را با یکپارچگی Suspense ساده می‌کند
۲. **Server Components**: دریافت داده سمت سرور با async/await را امکان‌پذیر می‌کند
۳. **Error Boundaries**: مدیریت خطای قوی برای شکست‌های دریافت داده فراهم می‌کند
۴. **استراتژی‌های Caching**: عملکرد را با ذخیره‌سازی هوشمند داده بهبود می‌بخشد
۵. **ویژگی‌های همزمان**: بروزرسانی‌های غیرمسدودکننده UI با Suspense و transitions
۶. **یکپارچگی کتابخانه**: یکپارچگی یکپارچه با کتابخانه‌هایی مثل TanStack Query

ترکیب هوک use() ری‌اکت ۱۹، Server Components و کتابخانه‌های مدرن دریافت داده، رویکردی قدرتمند، انعطاف‌پذیر و کارآمد برای مدیریت داده‌ها در اپلیکیشن‌های ری‌اکت فراهم می‌کند.
`,

  visualizationId: 'data-fetching',
  exerciseId: 'data-fetching',
};

export default dataFetchingLesson;