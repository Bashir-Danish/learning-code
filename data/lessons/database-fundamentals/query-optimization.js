export const queryOptimization = {
  id: 'query-optimization',
  title: 'Query Optimization and Performance',
  titleFa: 'بهینه‌سازی کوئری و عملکرد',
  difficulty: 'medium',
  estimatedTime: '75 min',
  
  content: `
# Query Optimization and Performance

## Introduction

Query optimization is the process of improving database query performance. Slow queries can significantly impact application performance and user experience. This lesson covers techniques to identify and fix performance bottlenecks.

**What you'll learn:**
- Query optimization techniques
- Using EXPLAIN to analyze execution plans
- Index strategy and selection
- Connection pooling benefits
- Performance monitoring
- Caching strategies
- Real-world optimization examples

---

## Understanding Query Performance

### Why Query Optimization Matters

- **User Experience**: Faster queries = faster responses
- **Scalability**: Optimized queries handle more users
- **Cost**: Efficient queries use fewer resources
- **Reliability**: Better performance = fewer timeouts

### Performance Metrics

\`\`\`javascript
// Measure query execution time
const startTime = Date.now();

const [rows] = await pool.execute(
  'SELECT * FROM users WHERE status = ?',
  ['active']
);

const endTime = Date.now();
const executionTime = endTime - startTime;

console.log(\`Query took \${executionTime}ms\`);
\`\`\`

---

## EXPLAIN: Analyzing Query Execution Plans

### What is EXPLAIN?

EXPLAIN shows how MySQL/MariaDB executes a query. It reveals which indexes are used, how many rows are examined, and potential bottlenecks.

### Basic EXPLAIN Syntax

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE id = 1;
\`\`\`

### EXPLAIN Output Columns

| Column | Meaning |
|--------|---------|
| id | Query identifier |
| select_type | Type of SELECT (SIMPLE, PRIMARY, UNION, etc.) |
| table | Table being accessed |
| type | Join type (ALL, index, range, ref, eq_ref, const) |
| possible_keys | Indexes that could be used |
| key | Index actually used |
| key_len | Length of index used |
| rows | Estimated rows examined |
| Extra | Additional information |

### EXPLAIN Examples

**Example 1: Full Table Scan (Bad)**

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE status = 'active';
\`\`\`

Output:
\`\`\`
type: ALL
rows: 1000000
Extra: Using where
\`\`\`

Problem: Scanning all 1 million rows!

**Example 2: Using Index (Good)**

\`\`\`sql
-- First create an index
CREATE INDEX idx_status ON users(status);

-- Now run EXPLAIN
EXPLAIN SELECT * FROM users WHERE status = 'active';
\`\`\`

Output:
\`\`\`
type: ref
key: idx_status
rows: 5000
\`\`\`

Improvement: Only scanning 5,000 rows instead of 1 million!

### EXPLAIN JSON Format

\`\`\`sql
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE id = 1;
\`\`\`

Returns detailed JSON with execution cost estimates.

---

## Index Strategy

### What are Indexes?

Indexes are data structures that speed up data retrieval. They work like a book's index—instead of reading every page, you look up the topic and jump to relevant pages.

### Types of Indexes

**Single Column Index**

\`\`\`sql
CREATE INDEX idx_email ON users(email);

-- Good for queries like:
SELECT * FROM users WHERE email = 'user@example.com';
\`\`\`

**Composite Index (Multiple Columns)**

\`\`\`sql
CREATE INDEX idx_user_status ON users(user_id, status);

-- Good for queries like:
SELECT * FROM posts WHERE user_id = 1 AND status = 'published';
\`\`\`

**Unique Index**

\`\`\`sql
CREATE UNIQUE INDEX idx_username ON users(username);

-- Ensures no duplicate usernames
\`\`\`

**Full-Text Index**

\`\`\`sql
CREATE FULLTEXT INDEX idx_content ON articles(content);

-- Good for text search:
SELECT * FROM articles WHERE MATCH(content) AGAINST('database');
\`\`\`

### When to Use Indexes

✅ **Use indexes for:**
- Columns frequently used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
- Columns used in GROUP BY
- Large tables with many rows

❌ **Avoid indexes for:**
- Small tables (< 1000 rows)
- Columns with low cardinality (few unique values)
- Columns that are frequently updated
- Columns with many NULL values

### Index Performance Trade-offs

**Advantages:**
- Faster SELECT queries
- Faster WHERE filtering
- Faster JOIN operations

**Disadvantages:**
- Slower INSERT operations (index must be updated)
- Slower UPDATE operations (index must be updated)
- Slower DELETE operations (index must be updated)
- Extra disk space required

### Index Best Practices

\`\`\`sql
-- Good: Index on frequently searched column
CREATE INDEX idx_user_email ON users(email);

-- Better: Composite index for common query pattern
CREATE INDEX idx_user_email_status ON users(email, status);

-- Avoid: Index on low-cardinality column
-- Don't do this: CREATE INDEX idx_gender ON users(gender);

-- Avoid: Too many indexes (slows down writes)
-- Don't create more than 5-6 indexes per table

-- Monitor: Check which indexes are actually used
SELECT * FROM performance_schema.table_io_waits_summary_by_index_usage;
\`\`\`

---

## Query Optimization Techniques

### 1. Use Specific Columns

❌ **Bad: SELECT ***

\`\`\`sql
SELECT * FROM users WHERE id = 1;
\`\`\`

✅ **Good: Select only needed columns**

\`\`\`sql
SELECT id, username, email FROM users WHERE id = 1;
\`\`\`

Benefit: Less data transferred, faster queries

### 2. Use WHERE Clauses

❌ **Bad: No filtering**

\`\`\`sql
SELECT * FROM orders;
\`\`\`

✅ **Good: Filter with WHERE**

\`\`\`sql
SELECT * FROM orders WHERE status = 'completed' AND created_at > DATE_SUB(NOW(), INTERVAL 30 DAY);
\`\`\`

Benefit: Fewer rows processed

### 3. Use LIMIT

❌ **Bad: Retrieve all rows**

\`\`\`sql
SELECT * FROM products;
\`\`\`

✅ **Good: Limit results**

\`\`\`sql
SELECT * FROM products LIMIT 10;
\`\`\`

Benefit: Faster response, less memory

### 4. Avoid Functions in WHERE

❌ **Bad: Function prevents index use**

\`\`\`sql
SELECT * FROM users WHERE YEAR(created_at) = 2024;
\`\`\`

✅ **Good: Use range comparison**

\`\`\`sql
SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
\`\`\`

Benefit: Index can be used

### 5. Use JOIN Instead of Subqueries

❌ **Bad: Subquery**

\`\`\`sql
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts WHERE status = 'published');
\`\`\`

✅ **Good: JOIN**

\`\`\`sql
SELECT DISTINCT u.* FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.status = 'published';
\`\`\`

Benefit: More efficient execution

### 6. Use Aggregate Functions Wisely

❌ **Bad: Multiple queries**

\`\`\`javascript
const [users] = await pool.execute('SELECT * FROM users');
const count = users.length;
\`\`\`

✅ **Good: Single aggregate query**

\`\`\`javascript
const [[{ count }]] = await pool.execute('SELECT COUNT(*) as count FROM users');
\`\`\`

Benefit: Single query, less data transfer

---

## Connection Pooling

### What is Connection Pooling?

Connection pooling reuses database connections instead of creating new ones for each query. This significantly improves performance.

### Without Connection Pooling

\`\`\`javascript
// SLOW: Creating new connection for each query
async function getUser(userId) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'app_user',
    password: 'password',
    database: 'myapp_db'
  });
  
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  await connection.end();
  return rows[0];
}

// Each call creates and destroys a connection (slow!)
\`\`\`

### With Connection Pooling

\`\`\`javascript
// FAST: Reusing connections from pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'app_user',
  password: 'password',
  database: 'myapp_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getUser(userId) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  return rows[0];
}

// Connections are reused (fast!)
\`\`\`

### Connection Pool Configuration

\`\`\`javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Pool settings
  waitForConnections: true,      // Wait if no connections available
  connectionLimit: 10,            // Max connections in pool
  queueLimit: 0,                  // Unlimited queue (0 = unlimited)
  enableKeepAlive: true,          // Keep connections alive
  keepAliveInitialDelayMs: 0      // Delay before first keep-alive
});
\`\`\`

### Performance Impact

**Without pooling:**
- Connection creation: ~100ms per query
- 100 queries = 10 seconds overhead

**With pooling:**
- Connection reuse: ~1ms per query
- 100 queries = 0.1 seconds overhead

**Result: 100x faster!**

---

## Caching Strategies

### Query Result Caching

\`\`\`javascript
const cache = new Map();

async function getUserWithCache(userId) {
  // Check cache first
  if (cache.has(userId)) {
    console.log('Cache hit!');
    return cache.get(userId);
  }
  
  // Query database if not cached
  console.log('Cache miss, querying database...');
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  const user = rows[0];
  
  // Store in cache
  cache.set(userId, user);
  
  return user;
}
\`\`\`

### Cache Invalidation

\`\`\`javascript
async function updateUser(userId, data) {
  // Update database
  await pool.execute(
    'UPDATE users SET ? WHERE id = ?',
    [data, userId]
  );
  
  // Invalidate cache
  cache.delete(userId);
}

async function deleteUser(userId) {
  // Delete from database
  await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
  );
  
  // Invalidate cache
  cache.delete(userId);
}
\`\`\`

### Redis Caching (Production)

\`\`\`javascript
const redis = require('redis');
const client = redis.createClient();

async function getUserWithRedis(userId) {
  // Check Redis cache
  const cached = await client.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Query database
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  const user = rows[0];
  
  // Cache for 1 hour
  await client.setEx(\`user:\${userId}\`, 3600, JSON.stringify(user));
  
  return user;
}
\`\`\`

---

## Performance Monitoring

### Query Logging

\`\`\`javascript
// Log slow queries
const slowQueryThreshold = 1000; // 1 second

async function executeWithLogging(query, params) {
  const startTime = Date.now();
  
  const [rows] = await pool.execute(query, params);
  
  const duration = Date.now() - startTime;
  
  if (duration > slowQueryThreshold) {
    console.warn(\`Slow query (\${duration}ms): \${query}\`);
  }
  
  return rows;
}
\`\`\`

### Performance Schema

\`\`\`sql
-- Enable performance schema
SET GLOBAL performance_schema = ON;

-- View slowest queries
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;

-- View table I/O statistics
SELECT * FROM performance_schema.table_io_waits_summary_by_table
ORDER BY SUM_TIMER_WAIT DESC;
\`\`\`

---

## Real-World Optimization Example

### Before Optimization

\`\`\`javascript
// SLOW: Multiple queries, no indexes, no caching
async function getUserPosts(userId) {
  // Query 1: Get user
  const [users] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  // Query 2: Get all posts (no filtering!)
  const [posts] = await pool.execute(
    'SELECT * FROM posts'
  );
  
  // Filter in application (inefficient!)
  const userPosts = posts.filter(p => p.user_id === userId);
  
  return {
    user: users[0],
    posts: userPosts
  };
}

// Performance: ~500ms (2 queries, full table scan)
\`\`\`

### After Optimization

\`\`\`javascript
// FAST: Single query, indexes, caching
async function getUserPostsOptimized(userId) {
  // Check cache
  const cacheKey = \`user_posts:\${userId}\`;
  const cached = await cache.get(cacheKey);
  if (cached) return cached;
  
  // Single optimized query with JOIN
  const [rows] = await pool.execute(\`
    SELECT 
      u.id, u.username, u.email,
      p.id as post_id, p.title, p.content, p.created_at
    FROM users u
    LEFT JOIN posts p ON u.id = p.user_id
    WHERE u.id = ?
    ORDER BY p.created_at DESC
  \`, [userId]);
  
  // Format results
  const user = {
    id: rows[0].id,
    username: rows[0].username,
    email: rows[0].email
  };
  
  const posts = rows
    .filter(r => r.post_id)
    .map(r => ({
      id: r.post_id,
      title: r.title,
      content: r.content,
      created_at: r.created_at
    }));
  
  const result = { user, posts };
  
  // Cache for 5 minutes
  await cache.setEx(cacheKey, 300, JSON.stringify(result));
  
  return result;
}

// Performance: ~50ms (1 query, indexed, cached)
// 10x faster!
\`\`\`

### Optimization Checklist

✅ **Applied:**
- Single query instead of multiple
- JOIN instead of filtering in application
- Indexes on user_id and created_at
- Query result caching
- Specific columns selected
- LIMIT applied where appropriate

---

## Common Mistakes

### 1. No Indexes

❌ **WRONG:**
\`\`\`sql
SELECT * FROM users WHERE email = 'user@example.com';
-- Full table scan every time!
\`\`\`

✅ **CORRECT:**
\`\`\`sql
CREATE INDEX idx_email ON users(email);
SELECT * FROM users WHERE email = 'user@example.com';
-- Uses index, much faster
\`\`\`

### 2. Too Many Indexes

❌ **WRONG:**
\`\`\`sql
CREATE INDEX idx_col1 ON table(col1);
CREATE INDEX idx_col2 ON table(col2);
CREATE INDEX idx_col3 ON table(col3);
CREATE INDEX idx_col4 ON table(col4);
CREATE INDEX idx_col5 ON table(col5);
-- Slows down writes!
\`\`\`

✅ **CORRECT:**
\`\`\`sql
-- Create composite index for common queries
CREATE INDEX idx_col1_col2 ON table(col1, col2);
-- Fewer indexes, better balance
\`\`\`

### 3. SELECT * Without LIMIT

❌ **WRONG:**
\`\`\`sql
SELECT * FROM large_table;
-- Retrieves millions of rows!
\`\`\`

✅ **CORRECT:**
\`\`\`sql
SELECT id, name FROM large_table LIMIT 100;
-- Specific columns, limited results
\`\`\`

### 4. Functions in WHERE Clause

❌ **WRONG:**
\`\`\`sql
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';
-- Index can't be used!
\`\`\`

✅ **CORRECT:**
\`\`\`sql
SELECT * FROM users WHERE email = 'user@example.com';
-- Index can be used
\`\`\`

### 5. No Connection Pooling

❌ **WRONG:**
\`\`\`javascript
// Creating new connection for each query
const connection = await mysql.createConnection({...});
\`\`\`

✅ **CORRECT:**
\`\`\`javascript
// Reusing connections from pool
const pool = mysql.createPool({...});
\`\`\`

---

## Quick Reference

### Optimization Techniques

| Technique | Benefit | Effort |
|-----------|---------|--------|
| Add indexes | 10-100x faster | Low |
| Use WHERE clauses | 5-50x faster | Low |
| Connection pooling | 10-100x faster | Low |
| Query caching | 100-1000x faster | Medium |
| Denormalization | 2-10x faster | High |

### EXPLAIN Key Indicators

| Indicator | Meaning | Action |
|-----------|---------|--------|
| type: ALL | Full table scan | Add index |
| rows: high | Many rows examined | Add WHERE clause |
| key: NULL | No index used | Create index |
| Extra: Using filesort | Sorting without index | Add index on ORDER BY column |

### Performance Goals

- Simple queries: < 10ms
- Complex queries: < 100ms
- Aggregations: < 500ms
- Full table scans: < 5 seconds

---

## Next Steps

1. Profile your queries with EXPLAIN
2. Identify slow queries in your application
3. Create indexes on frequently searched columns
4. Implement connection pooling
5. Add caching for frequently accessed data
6. Monitor performance regularly

> **Remember:** Premature optimization is the root of all evil, but ignoring performance is worse! ⚡
`,

  contentFa: `
# بهینه‌سازی کوئری و عملکرد

## مقدمه

بهینه‌سازی کوئری فرآیند بهبود عملکرد کوئری پایگاه داده است. کوئری‌های کند می‌توانند عملکرد برنامه و تجربه کاربر را به طور قابل‌توجهی تحت تأثیر قرار دهند. این درس تکنیک‌های شناسایی و رفع گلوگاه‌های عملکرد را پوشش می‌دهد.

**چه چیزی یاد می‌گیرید:**
- تکنیک‌های بهینه‌سازی کوئری
- استفاده از EXPLAIN برای تجزیه طرح‌های اجرا
- استراتژی و انتخاب شاخص
- مزایای connection pooling
- نظارت بر عملکرد
- استراتژی‌های caching
- مثال‌های بهینه‌سازی واقعی

---

## درک عملکرد کوئری

### چرا بهینه‌سازی کوئری مهم است

- **تجربه کاربر**: کوئری‌های سریع‌تر = پاسخ‌های سریع‌تر
- **مقیاس‌پذیری**: کوئری‌های بهینه‌شده بیشتر کاربران را مدیریت می‌کنند
- **هزینه**: کوئری‌های کارآمد منابع کمتری استفاده می‌کنند
- **قابلیت اعتماد**: عملکرد بهتر = timeout کمتر

### معیارهای عملکرد

\`\`\`javascript
// اندازه‌گیری زمان اجرای کوئری
const startTime = Date.now();

const [rows] = await pool.execute(
  'SELECT * FROM users WHERE status = ?',
  ['active']
);

const endTime = Date.now();
const executionTime = endTime - startTime;

console.log(\`کوئری \${executionTime}ms طول کشید\`);
\`\`\`

---

## EXPLAIN: تجزیه طرح‌های اجرا

### EXPLAIN چیست؟

EXPLAIN نشان می‌دهد که MySQL/MariaDB یک کوئری را چگونه اجرا می‌کند. شاخص‌های استفاده‌شده، تعداد ردیف‌های بررسی‌شده و گلوگاه‌های احتمالی را نشان می‌دهد.

### نحو EXPLAIN پایه

\`\`\`sql
EXPLAIN SELECT * FROM users WHERE id = 1;
\`\`\`

### ستون‌های خروجی EXPLAIN

| ستون | معنی |
|------|------|
| id | شناسه کوئری |
| select_type | نوع SELECT |
| table | جدول در حال دسترسی |
| type | نوع JOIN |
| possible_keys | شاخص‌های ممکن |
| key | شاخص استفاده‌شده |
| key_len | طول شاخص |
| rows | ردیف‌های بررسی‌شده |
| Extra | اطلاعات اضافی |

---

## استراتژی شاخص

### شاخص‌ها چیست؟

شاخص‌ها ساختارهای داده‌ای هستند که بازیابی داده را سریع می‌کنند. مانند فهرست کتاب کار می‌کنند.

### انواع شاخص‌ها

**شاخص تک ستون**

\`\`\`sql
CREATE INDEX idx_email ON users(email);
\`\`\`

**شاخص ترکیبی**

\`\`\`sql
CREATE INDEX idx_user_status ON users(user_id, status);
\`\`\`

**شاخص منحصر به فرد**

\`\`\`sql
CREATE UNIQUE INDEX idx_username ON users(username);
\`\`\`

---

## تکنیک‌های بهینه‌سازی کوئری

### 1. استفاده از ستون‌های خاص

❌ **بد: SELECT ***

\`\`\`sql
SELECT * FROM users WHERE id = 1;
\`\`\`

✅ **خوب: انتخاب فقط ستون‌های مورد نیاز**

\`\`\`sql
SELECT id, username, email FROM users WHERE id = 1;
\`\`\`

### 2. استفاده از WHERE

❌ **بد: بدون فیلتر**

\`\`\`sql
SELECT * FROM orders;
\`\`\`

✅ **خوب: فیلتر با WHERE**

\`\`\`sql
SELECT * FROM orders WHERE status = 'completed';
\`\`\`

### 3. استفاده از LIMIT

❌ **بد: بازیابی تمام ردیف‌ها**

\`\`\`sql
SELECT * FROM products;
\`\`\`

✅ **خوب: محدود کردن نتایج**

\`\`\`sql
SELECT * FROM products LIMIT 10;
\`\`\`

### 4. از توابع در WHERE اجتناب کنید

❌ **بد: تابع شاخص را غیرفعال می‌کند**

\`\`\`sql
SELECT * FROM users WHERE YEAR(created_at) = 2024;
\`\`\`

✅ **خوب: استفاده از مقایسه محدوده**

\`\`\`sql
SELECT * FROM users WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01';
\`\`\`

### 5. استفاده از JOIN به جای Subqueries

❌ **بد: Subquery**

\`\`\`sql
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts WHERE status = 'published');
\`\`\`

✅ **خوب: JOIN**

\`\`\`sql
SELECT DISTINCT u.* FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE p.status = 'published';
\`\`\`

---

## Connection Pooling

### Connection Pooling چیست؟

Connection pooling اتصالات پایگاه داده را دوباره استفاده می‌کند به جای ایجاد اتصالات جدید برای هر کوئری.

### بدون Connection Pooling

\`\`\`javascript
// کند: ایجاد اتصال جدید برای هر کوئری
async function getUser(userId) {
  const connection = await mysql.createConnection({...});
  const [rows] = await connection.execute(...);
  await connection.end();
  return rows[0];
}
\`\`\`

### با Connection Pooling

\`\`\`javascript
// سریع: استفاده مجدد از اتصالات
const pool = mysql.createPool({
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
});

async function getUser(userId) {
  const [rows] = await pool.execute(...);
  return rows[0];
}
\`\`\`

---

## Caching

### Query Result Caching

\`\`\`javascript
const cache = new Map();

async function getUserWithCache(userId) {
  if (cache.has(userId)) {
    return cache.get(userId);
  }
  
  const [rows] = await pool.execute(...);
  cache.set(userId, rows[0]);
  return rows[0];
}
\`\`\`

---

## مرجع سریع

### تکنیک‌های بهینه‌سازی

| تکنیک | فایده | تلاش |
|-------|-------|------|
| اضافه کردن شاخص | 10-100x سریع‌تر | کم |
| استفاده از WHERE | 5-50x سریع‌تر | کم |
| Connection pooling | 10-100x سریع‌تر | کم |
| Query caching | 100-1000x سریع‌تر | متوسط |

---

## مراحل بعدی

1. کوئری‌های خود را با EXPLAIN پروفایل کنید
2. کوئری‌های کند را شناسایی کنید
3. شاخص‌ها را ایجاد کنید
4. Connection pooling را پیاده‌سازی کنید
5. Caching را اضافه کنید
6. عملکرد را نظارت کنید

> **به یاد داشته باشید:** بهینه‌سازی زودرس ریشه تمام شرور است، اما نادیده گرفتن عملکرد بدتر است! ⚡
`,

  visualizationId: null,
  exerciseId: null,
};

export default queryOptimization;
