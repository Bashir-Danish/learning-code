export const useAPIResourcesLesson = {
  id: 'use-api-resources',
  title: 'Resource Loading with use API',
  titleFa: 'بارگذاری منابع با use API',
  difficulty: 'medium',
  estimatedTime: '70 min',

  content: `
# Resource Loading with use API

## Definition
The **\`use\` API** is React 19's revolutionary new hook that can read resources during render. Unlike traditional hooks, \`use\` can be called conditionally and works with both Promises and Context. It integrates seamlessly with Suspense to provide a smooth loading experience and represents a major shift in how we handle asynchronous data in React.

## Key Features
- **Conditional Usage**: Can be called inside conditions and loops (unlike other hooks)
- **Promise Support**: Directly read from Promises with automatic Suspense integration
- **Context Reading**: Read Context values conditionally
- **Suspense Integration**: Automatic loading states with Suspense boundaries
- **Error Boundaries**: Automatic error handling with Error Boundaries
- **Server Components**: Perfect integration with Server Components and streaming

---

## 1. Understanding the use API

### Traditional Data Fetching Problems
Before the \`use\` API, data fetching required complex patterns:

\`\`\`jsx
// Old way - complex state management
function TraditionalDataComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;

  return <div>Hello, {user.name}!</div>;
}
\`\`\`

### The use API Simplifies Everything
\`\`\`jsx
import { use } from 'react';

// New way - much cleaner with use API
function ModernDataComponent({ userPromise }) {
  const user = use(userPromise);
  
  return <div>Hello, {user.name}!</div>;
}

// Usage with Suspense
function App() {
  const userPromise = fetchUser(123);
  
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <ModernDataComponent userPromise={userPromise} />
    </Suspense>
  );
}
\`\`\`

---

## 2. Reading Promises with use

### Basic Promise Reading
\`\`\`jsx
import { use, Suspense } from 'react';

// Create a promise outside the component
const userPromise = fetch('/api/user/1').then(res => res.json());

function UserProfile() {
  // use() will suspend until the promise resolves
  const user = use(userPromise);
  
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfile />
    </Suspense>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="user-profile skeleton">
      <div className="avatar-skeleton"></div>
      <div className="name-skeleton"></div>
      <div className="email-skeleton"></div>
    </div>
  );
}
\`\`\`

### Dynamic Promise Creation
\`\`\`jsx
import { use, Suspense, useState } from 'react';

// Promise cache to avoid recreating promises
const promiseCache = new Map();

function createUserPromise(userId) {
  if (!promiseCache.has(userId)) {
    const promise = fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      });
    promiseCache.set(userId, promise);
  }
  return promiseCache.get(userId);
}

function UserDetails({ userId }) {
  // Conditionally create and use promise
  if (!userId) {
    return <div>Please select a user</div>;
  }
  
  const userPromise = createUserPromise(userId);
  const user = use(userPromise);
  
  return (
    <div className="user-details">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

function UserSelector() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  return (
    <div className="user-selector">
      <div className="user-buttons">
        <button onClick={() => setSelectedUserId(1)}>User 1</button>
        <button onClick={() => setSelectedUserId(2)}>User 2</button>
        <button onClick={() => setSelectedUserId(3)}>User 3</button>
        <button onClick={() => setSelectedUserId(null)}>Clear</button>
      </div>
      
      <Suspense fallback={<div>Loading user details...</div>}>
        <UserDetails userId={selectedUserId} />
      </Suspense>
    </div>
  );
}
\`\`\`

### Multiple Promises and Parallel Loading
\`\`\`jsx
import { use, Suspense } from 'react';

function createPromises(userId) {
  return {
    user: fetch(\`/api/users/\${userId}\`).then(res => res.json()),
    posts: fetch(\`/api/users/\${userId}/posts\`).then(res => res.json()),
    followers: fetch(\`/api/users/\${userId}/followers\`).then(res => res.json())
  };
}

function UserDashboard({ userId }) {
  const promises = createPromises(userId);
  
  // All three promises load in parallel
  const user = use(promises.user);
  const posts = use(promises.posts);
  const followers = use(promises.followers);
  
  return (
    <div className="user-dashboard">
      <div className="user-header">
        <h2>{user.name}</h2>
        <p>{followers.length} followers</p>
      </div>
      
      <div className="user-posts">
        <h3>Recent Posts ({posts.length})</h3>
        {posts.slice(0, 5).map(post => (
          <div key={post.id} className="post-preview">
            <h4>{post.title}</h4>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <UserDashboard userId={1} />
    </Suspense>
  );
}
\`\`\`

---

## 3. Reading Context with use

### Conditional Context Reading
\`\`\`jsx
import { use, createContext, useState } from 'react';

const ThemeContext = createContext();
const UserContext = createContext();

function ThemedButton({ variant = 'primary', children }) {
  // Conditionally read context based on variant
  const theme = variant === 'themed' ? use(ThemeContext) : null;
  
  const buttonStyle = theme ? {
    backgroundColor: theme.primaryColor,
    color: theme.textColor,
    border: \`1px solid \${theme.borderColor}\`
  } : {};
  
  return (
    <button style={buttonStyle} className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}

function UserGreeting({ showPersonalized }) {
  // Conditionally read user context
  if (!showPersonalized) {
    return <h2>Welcome, Guest!</h2>;
  }
  
  const user = use(UserContext);
  return <h2>Welcome back, {user.name}!</h2>;
}

function App() {
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [theme] = useState({
    primaryColor: '#007bff',
    textColor: 'white',
    borderColor: '#0056b3'
  });
  const [user] = useState({ name: 'John Doe', id: 1 });
  
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <div className="app">
          <label>
            <input
              type="checkbox"
              checked={showPersonalized}
              onChange={(e) => setShowPersonalized(e.target.checked)}
            />
            Show personalized greeting
          </label>
          
          <UserGreeting showPersonalized={showPersonalized} />
          
          <div className="buttons">
            <ThemedButton variant="primary">Primary</ThemedButton>
            <ThemedButton variant="themed">Themed</ThemedButton>
            <ThemedButton variant="secondary">Secondary</ThemedButton>
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
\`\`\`

### Context with Early Returns
\`\`\`jsx
import { use, createContext } from 'react';

const AuthContext = createContext();

function ProtectedComponent({ requireAdmin = false }) {
  // Early return before using context
  if (!requireAdmin) {
    return <div>Public content available to all users</div>;
  }
  
  // This is fine - use can be called after early returns
  const auth = use(AuthContext);
  
  if (!auth.user) {
    return <div>Please log in to access this content</div>;
  }
  
  if (!auth.user.isAdmin) {
    return <div>Admin access required</div>;
  }
  
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <p>Welcome, {auth.user.name}</p>
      <button>Manage Users</button>
      <button>View Analytics</button>
    </div>
  );
}
\`\`\`

---

## 4. Error Handling with use

### Error Boundaries with use
\`\`\`jsx
import { use, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function createUserPromise(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(res => {
      if (!res.ok) {
        throw new Error(\`Failed to fetch user: \${res.status}\`);
      }
      return res.json();
    });
}

function UserProfile({ userId }) {
  const userPromise = createUserPromise(userId);
  const user = use(userPromise);
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container">
      <h3>Something went wrong:</h3>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const [userId, setUserId] = useState(1);
  
  return (
    <div className="app">
      <div className="controls">
        <button onClick={() => setUserId(1)}>Valid User</button>
        <button onClick={() => setUserId(999)}>Invalid User</button>
      </div>
      
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        resetKeys={[userId]}
      >
        <Suspense fallback={<div>Loading user...</div>}>
          <UserProfile userId={userId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
\`\`\`

### Graceful Error Handling
\`\`\`jsx
function createSafePromise(asyncFn, fallback) {
  return asyncFn().catch(error => {
    console.error('Promise failed:', error);
    return fallback;
  });
}

function RobustUserProfile({ userId }) {
  // Create a promise that won't throw
  const userPromise = createSafePromise(
    () => fetch(\`/api/users/\${userId}\`).then(res => {
      if (!res.ok) throw new Error('User not found');
      return res.json();
    }),
    { name: 'Unknown User', email: 'N/A', isError: true }
  );
  
  const user = use(userPromise);
  
  if (user.isError) {
    return (
      <div className="user-profile error">
        <h2>User Not Found</h2>
        <p>The requested user could not be loaded.</p>
      </div>
    );
  }
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`
---

## 5. Advanced Patterns

### Resource Preloading
\`\`\`jsx
import { use, Suspense, startTransition } from 'react';

// Resource cache for preloading
const resourceCache = new Map();

function preloadResource(key, promiseFactory) {
  if (!resourceCache.has(key)) {
    resourceCache.set(key, promiseFactory());
  }
  return resourceCache.get(key);
}

function UserList() {
  const usersPromise = preloadResource('users', () =>
    fetch('/api/users').then(res => res.json())
  );
  
  const users = use(usersPromise);
  
  const handleUserHover = (userId) => {
    // Preload user details on hover
    startTransition(() => {
      preloadResource(\`user-\${userId}\`, () =>
        fetch(\`/api/users/\${userId}\`).then(res => res.json())
      );
    });
  };
  
  return (
    <div className="user-list">
      {users.map(user => (
        <div
          key={user.id}
          className="user-item"
          onMouseEnter={() => handleUserHover(user.id)}
        >
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
}

function UserDetails({ userId }) {
  const userPromise = preloadResource(\`user-\${userId}\`, () =>
    fetch(\`/api/users/\${userId}\`).then(res => res.json())
  );
  
  const user = use(userPromise);
  
  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
      <p>Joined: {user.joinDate}</p>
    </div>
  );
}
\`\`\`

### Conditional Data Loading
\`\`\`jsx
function SmartUserProfile({ userId, includeStats = false, includePosts = false }) {
  // Always load basic user data
  const userPromise = preloadResource(\`user-\${userId}\`, () =>
    fetch(\`/api/users/\${userId}\`).then(res => res.json())
  );
  const user = use(userPromise);
  
  // Conditionally load additional data
  const stats = includeStats ? use(
    preloadResource(\`user-stats-\${userId}\`, () =>
      fetch(\`/api/users/\${userId}/stats\`).then(res => res.json())
    )
  ) : null;
  
  const posts = includePosts ? use(
    preloadResource(\`user-posts-\${userId}\`, () =>
      fetch(\`/api/users/\${userId}/posts\`).then(res => res.json())
    )
  ) : null;
  
  return (
    <div className="smart-user-profile">
      <div className="user-basic">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      
      {stats && (
        <div className="user-stats">
          <h3>Statistics</h3>
          <p>Posts: {stats.postCount}</p>
          <p>Followers: {stats.followerCount}</p>
          <p>Following: {stats.followingCount}</p>
        </div>
      )}
      
      {posts && (
        <div className="user-posts">
          <h3>Recent Posts</h3>
          {posts.slice(0, 3).map(post => (
            <div key={post.id} className="post-preview">
              <h4>{post.title}</h4>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const [showStats, setShowStats] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  
  return (
    <div className="profile-page">
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showStats}
            onChange={(e) => setShowStats(e.target.checked)}
          />
          Show Statistics
        </label>
        <label>
          <input
            type="checkbox"
            checked={showPosts}
            onChange={(e) => setShowPosts(e.target.checked)}
          />
          Show Posts
        </label>
      </div>
      
      <Suspense fallback={<ProfileSkeleton />}>
        <SmartUserProfile
          userId={1}
          includeStats={showStats}
          includePosts={showPosts}
        />
      </Suspense>
    </div>
  );
}
\`\`\`

### Streaming Data with use
\`\`\`jsx
function createStreamingPromise(url) {
  return fetch(url).then(async response => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value);
    }
    
    return JSON.parse(result);
  });
}

function StreamingDataComponent({ dataUrl }) {
  const dataPromise = createStreamingPromise(dataUrl);
  const data = use(dataPromise);
  
  return (
    <div className="streaming-data">
      <h3>Streamed Data</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
\`\`\`

---

## 6. Integration with Server Components

### Server Component with use
\`\`\`jsx
// Server Component
async function ServerUserProfile({ userId }) {
  // This runs on the server
  const userPromise = fetch(\`\${process.env.API_URL}/users/\${userId}\`)
    .then(res => res.json());
  
  return (
    <div className="server-user-profile">
      <Suspense fallback={<UserProfileSkeleton />}>
        <ClientUserProfile userPromise={userPromise} />
      </Suspense>
    </div>
  );
}

// Client Component
'use client';
function ClientUserProfile({ userPromise }) {
  const user = use(userPromise);
  
  return (
    <div className="client-user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <InteractiveUserActions userId={user.id} />
    </div>
  );
}

function InteractiveUserActions({ userId }) {
  const [following, setFollowing] = useState(false);
  
  const handleFollow = () => {
    setFollowing(!following);
    // Handle follow/unfollow logic
  };
  
  return (
    <div className="user-actions">
      <button onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
      <button>Message</button>
    </div>
  );
}
\`\`\`

---

## 7. Best Practices

### Do's ✅
- **Use with Suspense boundaries** for proper loading states
- **Implement Error Boundaries** for graceful error handling
- **Cache promises** to avoid unnecessary re-fetching
- **Preload resources** for better performance
- **Use conditionally** when it makes sense (unlike other hooks)
- **Combine with Server Components** for optimal performance
- **Handle promise rejections** appropriately

### Don'ts ❌
- **Don't create promises inside render** without caching
- **Don't ignore error handling** - always plan for failures
- **Don't use for every async operation** - consider useEffect for side effects
- **Don't forget Suspense boundaries** - use will suspend
- **Don't mix with traditional loading patterns** in the same component
- **Don't create infinite promise chains**

### Performance Tips
- **Implement proper caching** to avoid duplicate requests
- **Use startTransition** for non-urgent updates
- **Preload resources** on user interactions (hover, focus)
- **Consider request deduplication** for identical requests
- **Use proper Suspense boundaries** to avoid waterfalls

---

## Summary

The \`use\` API revolutionizes React data fetching by:

1. **Simplifying Async Code**: No more complex useEffect patterns for data fetching
2. **Enabling Conditional Usage**: Can be called inside conditions and loops
3. **Integrating with Suspense**: Automatic loading states and error boundaries
4. **Supporting Both Promises and Context**: Unified API for different resource types
5. **Improving Performance**: Better caching and preloading capabilities
6. **Enhancing Server Components**: Seamless client-server data flow

The \`use\` API represents the future of data fetching in React, making applications more performant, maintainable, and providing better user experience through improved loading states and error handling.
`,

  contentFa: `
# بارگذاری منابع با use API

## تعریف
**\`use\` API** هوک انقلابی جدید ری‌اکت ۱۹ است که می‌تواند منابع را در طول رندر بخواند. برخلاف هوک‌های سنتی، \`use\` می‌تواند به صورت شرطی فراخوانی شود و هم با Promises و هم با Context کار می‌کند. این API به طور یکپارچه با Suspense ادغام می‌شود تا تجربه لودینگ روانی ارائه دهد و تغییر بزرگی در نحوه مدیریت داده‌های ناهمزمان در ری‌اکت محسوب می‌شود.

## ویژگی‌های اصلی
- **استفاده شرطی**: می‌تواند درون شرط‌ها و حلقه‌ها فراخوانی شود (برخلاف سایر هوک‌ها)
- **پشتیبانی از Promise**: خواندن مستقیم از Promises با یکپارچگی خودکار Suspense
- **خواندن Context**: خواندن مقادیر Context به صورت شرطی
- **یکپارچگی Suspense**: وضعیت‌های لودینگ خودکار با مرزهای Suspense
- **مرزهای خطا**: مدیریت خطای خودکار با Error Boundaries
- **Server Components**: یکپارچگی کامل با Server Components و streaming

---

## ۱. درک use API

### مشکلات سنتی واکشی داده
قبل از \`use\` API، واکشی داده نیاز به الگوهای پیچیده داشت:

\`\`\`jsx
// روش قدیمی - مدیریت پیچیده استیت
function TraditionalDataComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>خطا: {error.message}</div>;
  if (!user) return <div>کاربری یافت نشد</div>;

  return <div>سلام، {user.name}!</div>;
}
\`\`\`

### use API همه چیز را ساده می‌کند
\`\`\`jsx
import { use } from 'react';

// روش جدید - بسیار تمیزتر با use API
function ModernDataComponent({ userPromise }) {
  const user = use(userPromise);
  
  return <div>سلام، {user.name}!</div>;
}

// استفاده با Suspense
function App() {
  const userPromise = fetchUser(123);
  
  return (
    <Suspense fallback={<div>در حال بارگذاری کاربر...</div>}>
      <ModernDataComponent userPromise={userPromise} />
    </Suspense>
  );
}
\`\`\`

---

## ۲. خواندن Promises با use

### خواندن پایه Promise
\`\`\`jsx
import { use, Suspense } from 'react';

// ایجاد promise خارج از کامپوننت
const userPromise = fetch('/api/user/1').then(res => res.json());

function UserProfile() {
  // use() تا زمان resolve شدن promise معلق می‌ماند
  const user = use(userPromise);
  
  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfile />
    </Suspense>
  );
}

function UserProfileSkeleton() {
  return (
    <div className="user-profile skeleton">
      <div className="avatar-skeleton"></div>
      <div className="name-skeleton"></div>
      <div className="email-skeleton"></div>
    </div>
  );
}
\`\`\`

### ایجاد Promise پویا
\`\`\`jsx
import { use, Suspense, useState } from 'react';

// کش Promise برای جلوگیری از ایجاد مجدد promises
const promiseCache = new Map();

function createUserPromise(userId) {
  if (!promiseCache.has(userId)) {
    const promise = fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('کاربر یافت نشد');
        return res.json();
      });
    promiseCache.set(userId, promise);
  }
  return promiseCache.get(userId);
}

function UserDetails({ userId }) {
  // ایجاد و استفاده شرطی از promise
  if (!userId) {
    return <div>لطفاً یک کاربر انتخاب کنید</div>;
  }
  
  const userPromise = createUserPromise(userId);
  const user = use(userPromise);
  
  return (
    <div className="user-details">
      <h3>{user.name}</h3>
      <p>ایمیل: {user.email}</p>
      <p>نقش: {user.role}</p>
      <p>عضویت: {new Date(user.createdAt).toLocaleDateString('fa-IR')}</p>
    </div>
  );
}

function UserSelector() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  
  return (
    <div className="user-selector">
      <div className="user-buttons">
        <button onClick={() => setSelectedUserId(1)}>کاربر ۱</button>
        <button onClick={() => setSelectedUserId(2)}>کاربر ۲</button>
        <button onClick={() => setSelectedUserId(3)}>کاربر ۳</button>
        <button onClick={() => setSelectedUserId(null)}>پاک کردن</button>
      </div>
      
      <Suspense fallback={<div>در حال بارگذاری جزئیات کاربر...</div>}>
        <UserDetails userId={selectedUserId} />
      </Suspense>
    </div>
  );
}
\`\`\`

### چندین Promise و بارگذاری موازی
\`\`\`jsx
import { use, Suspense } from 'react';

function createPromises(userId) {
  return {
    user: fetch(\`/api/users/\${userId}\`).then(res => res.json()),
    posts: fetch(\`/api/users/\${userId}/posts\`).then(res => res.json()),
    followers: fetch(\`/api/users/\${userId}/followers\`).then(res => res.json())
  };
}

function UserDashboard({ userId }) {
  const promises = createPromises(userId);
  
  // هر سه promise به صورت موازی بارگذاری می‌شوند
  const user = use(promises.user);
  const posts = use(promises.posts);
  const followers = use(promises.followers);
  
  return (
    <div className="user-dashboard">
      <div className="user-header">
        <h2>{user.name}</h2>
        <p>{followers.length} دنبال‌کننده</p>
      </div>
      
      <div className="user-posts">
        <h3>پست‌های اخیر ({posts.length})</h3>
        {posts.slice(0, 5).map(post => (
          <div key={post.id} className="post-preview">
            <h4>{post.title}</h4>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <UserDashboard userId={1} />
    </Suspense>
  );
}
\`\`\`

---

## ۳. خواندن Context با use

### خواندن شرطی Context
\`\`\`jsx
import { use, createContext, useState } from 'react';

const ThemeContext = createContext();
const UserContext = createContext();

function ThemedButton({ variant = 'primary', children }) {
  // خواندن شرطی context بر اساس variant
  const theme = variant === 'themed' ? use(ThemeContext) : null;
  
  const buttonStyle = theme ? {
    backgroundColor: theme.primaryColor,
    color: theme.textColor,
    border: \`1px solid \${theme.borderColor}\`
  } : {};
  
  return (
    <button style={buttonStyle} className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}

function UserGreeting({ showPersonalized }) {
  // خواندن شرطی user context
  if (!showPersonalized) {
    return <h2>خوش آمدید، مهمان!</h2>;
  }
  
  const user = use(UserContext);
  return <h2>خوش برگشتی، {user.name}!</h2>;
}

function App() {
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [theme] = useState({
    primaryColor: '#007bff',
    textColor: 'white',
    borderColor: '#0056b3'
  });
  const [user] = useState({ name: 'احمد احمدی', id: 1 });
  
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <div className="app">
          <label>
            <input
              type="checkbox"
              checked={showPersonalized}
              onChange={(e) => setShowPersonalized(e.target.checked)}
            />
            نمایش پیام شخصی‌سازی شده
          </label>
          
          <UserGreeting showPersonalized={showPersonalized} />
          
          <div className="buttons">
            <ThemedButton variant="primary">اصلی</ThemedButton>
            <ThemedButton variant="themed">تم‌دار</ThemedButton>
            <ThemedButton variant="secondary">ثانویه</ThemedButton>
          </div>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
\`\`\`

### Context با Early Returns
\`\`\`jsx
import { use, createContext } from 'react';

const AuthContext = createContext();

function ProtectedComponent({ requireAdmin = false }) {
  // بازگشت زودهنگام قبل از استفاده از context
  if (!requireAdmin) {
    return <div>محتوای عمومی در دسترس همه کاربران</div>;
  }
  
  // این مشکلی ندارد - use می‌تواند بعد از early returns فراخوانی شود
  const auth = use(AuthContext);
  
  if (!auth.user) {
    return <div>لطفاً برای دسترسی به این محتوا وارد شوید</div>;
  }
  
  if (!auth.user.isAdmin) {
    return <div>دسترسی مدیر مورد نیاز است</div>;
  }
  
  return (
    <div className="admin-panel">
      <h2>پنل مدیریت</h2>
      <p>خوش آمدید، {auth.user.name}</p>
      <button>مدیریت کاربران</button>
      <button>مشاهده آمار</button>
    </div>
  );
}
\`\`\`

---

## خلاصه

\`use\` API واکشی داده در ری‌اکت را با موارد زیر متحول می‌کند:

۱. **ساده‌سازی کد Async**: دیگر نیازی به الگوهای پیچیده useEffect برای واکشی داده نیست
۲. **امکان استفاده شرطی**: می‌تواند درون شرط‌ها و حلقه‌ها فراخوانی شود
۳. **یکپارچگی با Suspense**: وضعیت‌های لودینگ خودکار و مرزهای خطا
۴. **پشتیبانی از Promises و Context**: API یکپارچه برای انواع مختلف منابع
۵. **بهبود عملکرد**: قابلیت‌های بهتر کش و پیش‌بارگذاری
۶. **تقویت Server Components**: جریان داده یکپارچه کلاینت-سرور

\`use\` API آینده واکشی داده در ری‌اکت را نمایندگی می‌کند و اپلیکیشن‌ها را پرفورمنس‌تر، قابل نگهداری‌تر می‌کند و از طریق بهبود وضعیت‌های لودینگ و مدیریت خطا، تجربه کاربری بهتری ارائه می‌دهد.
`,

  visualizationId: 'use-api-resources',
  exerciseId: 'use-api-resources',
};

export default useAPIResourcesLesson;