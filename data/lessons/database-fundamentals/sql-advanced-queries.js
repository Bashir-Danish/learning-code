export const sqlAdvancedQueries = {
  id: 'sql-advanced-queries',
  title: 'Advanced SQL Queries',
  titleFa: 'کوئری‌های پیشرفته SQL',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Advanced SQL Queries - Subqueries and UNION

## Introduction

Advanced SQL techniques allow you to write more powerful and flexible queries. **Subqueries** and **UNION** operations enable you to solve complex problems that would be difficult with basic queries alone.

**What you'll learn:**
- Subqueries in SELECT, FROM, and WHERE clauses
- Correlated subqueries
- Subqueries vs JOINs
- UNION and UNION ALL operations
- Set operations (INTERSECT, EXCEPT)
- Common Table Expressions (CTEs)
- Practical real-world examples
- Performance considerations

---

## Subqueries (Nested Queries)

A **subquery** is a query within another query. It's also called an inner query or nested query.

### Subqueries in WHERE Clause

\`\`\`sql
-- Find products more expensive than average
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

**Output:**
\`\`\`
+----------+-------+
| name     | price |
+----------+-------+
| Laptop   | 1200  |
| Desk     |  300  |
+----------+-------+
\`\`\`

### Subqueries with IN Operator

\`\`\`sql
-- Find users who have written posts
SELECT id, username, email
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM posts);
\`\`\`

### Subqueries with NOT IN

\`\`\`sql
-- Find users who haven't written any posts
SELECT id, username, email
FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM posts);
\`\`\`

### Subqueries with EXISTS

\`\`\`sql
-- Find users who have at least one post
SELECT id, username
FROM users u
WHERE EXISTS (SELECT 1 FROM posts p WHERE p.user_id = u.id);
\`\`\`

> **Performance Tip:** EXISTS is often faster than IN for large datasets!

### Subqueries in SELECT Clause

\`\`\`sql
-- Get each user with their post count
SELECT 
  id,
  username,
  (SELECT COUNT(*) FROM posts WHERE user_id = users.id) AS post_count
FROM users;
\`\`\`

**Output:**
\`\`\`
+----+----------+------------+
| id | username | post_count |
+----+----------+------------+
|  1 | alice    |          2 |
|  2 | bob      |          1 |
|  3 | charlie  |          0 |
+----+----------+------------+
\`\`\`

### Subqueries in FROM Clause

\`\`\`sql
-- Create a derived table
SELECT 
  category,
  avg_price,
  product_count
FROM (
  SELECT 
    category,
    AVG(price) AS avg_price,
    COUNT(*) AS product_count
  FROM products
  GROUP BY category
) AS category_stats
WHERE avg_price > 100;
\`\`\`

---

## Correlated Subqueries

A **correlated subquery** references columns from the outer query.

### Basic Correlated Subquery

\`\`\`sql
-- Find products that are more expensive than average in their category
SELECT 
  name,
  category,
  price
FROM products p1
WHERE price > (
  SELECT AVG(price)
  FROM products p2
  WHERE p2.category = p1.category
);
\`\`\`

### Correlated Subquery with EXISTS

\`\`\`sql
-- Find categories that have products
SELECT DISTINCT category
FROM products p1
WHERE EXISTS (
  SELECT 1
  FROM products p2
  WHERE p2.category = p1.category
);
\`\`\`

### Performance Consideration

\`\`\`sql
-- Correlated subqueries can be slow (runs for each row)
-- Better to use JOIN when possible:

-- Slow (correlated subquery)
SELECT name, price
FROM products p1
WHERE price > (
  SELECT AVG(price)
  FROM products p2
  WHERE p2.category = p1.category
);

-- Fast (using JOIN)
SELECT p1.name, p1.price
FROM products p1
JOIN (
  SELECT category, AVG(price) AS avg_price
  FROM products
  GROUP BY category
) avg_by_cat ON p1.category = avg_by_cat.category
WHERE p1.price > avg_by_cat.avg_price;
\`\`\`

---

## Subqueries vs JOINs

Both can solve similar problems, but with different performance characteristics.

### Using Subquery

\`\`\`sql
-- Get posts with author information using subquery
SELECT 
  id,
  title,
  (SELECT username FROM users WHERE id = posts.user_id) AS author
FROM posts;
\`\`\`

### Using JOIN

\`\`\`sql
-- Get posts with author information using JOIN
SELECT 
  p.id,
  p.title,
  u.username AS author
FROM posts p
LEFT JOIN users u ON p.user_id = u.id;
\`\`\`

> **Best Practice:** Use JOINs for better performance in most cases!

---

## UNION Operations

**UNION** combines results from multiple queries into a single result set.

### UNION (Remove Duplicates)

\`\`\`sql
-- Combine two lists and remove duplicates
SELECT username FROM users WHERE status = 'active'
UNION
SELECT username FROM users WHERE role = 'admin';
\`\`\`

> **Note:** UNION removes duplicate rows automatically!

### UNION ALL (Keep Duplicates)

\`\`\`sql
-- Combine two lists and keep duplicates
SELECT username FROM users WHERE status = 'active'
UNION ALL
SELECT username FROM users WHERE role = 'admin';
\`\`\`

> **Performance Tip:** UNION ALL is faster because it doesn't check for duplicates!

### UNION with Multiple Columns

\`\`\`sql
-- Combine different data sources
SELECT 
  id,
  name,
  'product' AS type
FROM products

UNION

SELECT 
  id,
  name,
  'category' AS type
FROM categories;
\`\`\`

### UNION with ORDER BY

\`\`\`sql
-- Sort combined results
SELECT username, email FROM users WHERE status = 'active'
UNION
SELECT username, email FROM users WHERE role = 'admin'
ORDER BY username;
\`\`\`

---

## Set Operations

### INTERSECT (Common Records)

\`\`\`sql
-- Find users who are both active AND admins
SELECT username FROM users WHERE status = 'active'
INTERSECT
SELECT username FROM users WHERE role = 'admin';
\`\`\`

> **Note:** Not all databases support INTERSECT. Use JOIN instead!

### EXCEPT (Difference)

\`\`\`sql
-- Find active users who are NOT admins
SELECT username FROM users WHERE status = 'active'
EXCEPT
SELECT username FROM users WHERE role = 'admin';
\`\`\`

### Alternative Using JOIN

\`\`\`sql
-- EXCEPT alternative using LEFT JOIN
SELECT DISTINCT u1.username
FROM users u1
WHERE u1.status = 'active'
  AND u1.username NOT IN (
    SELECT username FROM users WHERE role = 'admin'
  );
\`\`\`

---

## Common Table Expressions (CTEs)

**CTEs** (WITH clause) make complex queries more readable.

### Basic CTE

\`\`\`sql
-- Define a CTE and use it
WITH active_users AS (
  SELECT id, username, email
  FROM users
  WHERE status = 'active'
)
SELECT * FROM active_users;
\`\`\`

### Multiple CTEs

\`\`\`sql
-- Multiple CTEs in one query
WITH active_users AS (
  SELECT id, username
  FROM users
  WHERE status = 'active'
),
user_posts AS (
  SELECT user_id, COUNT(*) AS post_count
  FROM posts
  GROUP BY user_id
)
SELECT 
  au.username,
  COALESCE(up.post_count, 0) AS posts
FROM active_users au
LEFT JOIN user_posts up ON au.id = up.user_id;
\`\`\`

### Recursive CTE

\`\`\`sql
-- Generate numbers 1 to 10
WITH RECURSIVE numbers AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 10
)
SELECT * FROM numbers;
\`\`\`

---

## Node.js Examples

### Example 1: Complex Subquery

\`\`\`javascript
// Find top products in each category
async function getTopProductsPerCategory() {
  const [products] = await pool.execute(
    \`SELECT 
      category,
      name,
      price
     FROM products p1
     WHERE price = (
       SELECT MAX(price)
       FROM products p2
       WHERE p2.category = p1.category
     )
     ORDER BY category\`
  );
  return products;
}
\`\`\`

### Example 2: UNION for Reporting

\`\`\`javascript
// Get all activity (posts and comments)
async function getAllActivity() {
  const [activity] = await pool.execute(
    \`SELECT 
      'post' AS type,
      id,
      user_id,
      title AS content,
      created_at
     FROM posts
     
     UNION ALL
     
     SELECT 
      'comment' AS type,
      id,
      user_id,
      comment_text AS content,
      created_at
     FROM comments
     
     ORDER BY created_at DESC
     LIMIT 50\`
  );
  return activity;
}
\`\`\`

### Example 3: CTE for Analytics

\`\`\`javascript
// Get user engagement metrics
async function getUserEngagement() {
  const [metrics] = await pool.execute(
    \`WITH user_activity AS (
      SELECT 
        user_id,
        COUNT(DISTINCT CASE WHEN type = 'post' THEN id END) AS posts,
        COUNT(DISTINCT CASE WHEN type = 'comment' THEN id END) AS comments
      FROM (
        SELECT user_id, 'post' AS type, id FROM posts
        UNION ALL
        SELECT user_id, 'comment' AS type, id FROM comments
      ) activity
      GROUP BY user_id
    )
    SELECT 
      u.username,
      COALESCE(ua.posts, 0) AS posts,
      COALESCE(ua.comments, 0) AS comments,
      COALESCE(ua.posts, 0) + COALESCE(ua.comments, 0) AS total_activity
    FROM users u
    LEFT JOIN user_activity ua ON u.id = ua.user_id
    ORDER BY total_activity DESC\`
  );
  return metrics;
}
\`\`\`

---

## Common Mistakes

### 1. Subquery Returns Multiple Rows

❌ **Wrong:**
\`\`\`sql
SELECT * FROM products
WHERE price = (SELECT price FROM products WHERE category = 'Electronics');
-- Error: subquery returns multiple rows
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT * FROM products
WHERE price IN (SELECT price FROM products WHERE category = 'Electronics');
\`\`\`

### 2. UNION Column Mismatch

❌ **Wrong:**
\`\`\`sql
SELECT id, name FROM products
UNION
SELECT id, name, price FROM categories;
-- Error: different number of columns
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT id, name FROM products
UNION
SELECT id, name FROM categories;
\`\`\`

### 3. Forgetting UNION ALL Duplicates

❌ **Problem:**
\`\`\`sql
-- UNION removes duplicates (slower)
SELECT username FROM users WHERE status = 'active'
UNION
SELECT username FROM users WHERE role = 'admin';
\`\`\`

✅ **Solution:**
\`\`\`sql
-- UNION ALL keeps duplicates (faster)
SELECT username FROM users WHERE status = 'active'
UNION ALL
SELECT username FROM users WHERE role = 'admin';
\`\`\`

### 4. Correlated Subquery Performance

❌ **Slow:**
\`\`\`sql
-- Runs subquery for each row
SELECT name, (SELECT COUNT(*) FROM orders WHERE product_id = products.id) AS order_count
FROM products;
\`\`\`

✅ **Fast:**
\`\`\`sql
-- Use JOIN instead
SELECT p.name, COUNT(o.id) AS order_count
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.id, p.name;
\`\`\`

---

## Performance Tips

### 1. Use JOINs Instead of Subqueries When Possible

\`\`\`sql
-- Subquery (slower)
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts);

-- JOIN (faster)
SELECT DISTINCT u.* FROM users u
INNER JOIN posts p ON u.id = p.user_id;
\`\`\`

### 2. Use EXISTS Instead of IN for Large Datasets

\`\`\`sql
-- IN (slower for large datasets)
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts);

-- EXISTS (faster)
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM posts p WHERE p.user_id = u.id);
\`\`\`

### 3. Materialize Subqueries

\`\`\`sql
-- Create temporary table for reuse
CREATE TEMPORARY TABLE category_stats AS
SELECT category, AVG(price) AS avg_price, COUNT(*) AS count
FROM products
GROUP BY category;

-- Now use it multiple times
SELECT * FROM category_stats WHERE avg_price > 100;
SELECT * FROM category_stats WHERE count > 5;
\`\`\`

---

## Quick Reference

### Subquery Types

| Type | Location | Purpose |
|------|----------|---------|
| Scalar | SELECT | Return single value |
| Row | WHERE | Compare with row |
| Table | FROM | Derived table |
| Correlated | WHERE | Reference outer query |

### UNION Syntax

\`\`\`sql
SELECT columns FROM table1
UNION [ALL]
SELECT columns FROM table2
[ORDER BY columns];
\`\`\`

### CTE Syntax

\`\`\`sql
WITH cte_name AS (
  SELECT columns FROM table
)
SELECT * FROM cte_name;
\`\`\`

---

## Real-World Examples

### Example 1: Sales Analysis

\`\`\`javascript
// Find products that underperform in their category
async function getUnderperformingProducts() {
  const [products] = await pool.execute(
    \`WITH category_avg AS (
      SELECT 
        category,
        AVG(sales) AS avg_sales
      FROM products
      GROUP BY category
    )
    SELECT 
      p.name,
      p.category,
      p.sales,
      ca.avg_sales,
      (ca.avg_sales - p.sales) AS difference
    FROM products p
    JOIN category_avg ca ON p.category = ca.category
    WHERE p.sales < ca.avg_sales
    ORDER BY difference DESC\`
  );
  return products;
}
\`\`\`

### Example 2: User Comparison

\`\`\`javascript
// Find users with similar activity levels
async function findSimilarUsers(userId) {
  const [users] = await pool.execute(
    \`WITH user_stats AS (
      SELECT 
        user_id,
        COUNT(DISTINCT post_id) AS posts,
        COUNT(DISTINCT comment_id) AS comments
      FROM (
        SELECT user_id, id AS post_id, NULL AS comment_id FROM posts
        UNION ALL
        SELECT user_id, NULL AS post_id, id AS comment_id FROM comments
      ) activity
      GROUP BY user_id
    )
    SELECT 
      u.username,
      us.posts,
      us.comments
    FROM user_stats us
    JOIN users u ON us.user_id = u.id
    WHERE us.posts = (SELECT posts FROM user_stats WHERE user_id = ?)
      AND us.comments = (SELECT comments FROM user_stats WHERE user_id = ?)\`,
    [userId, userId]
  );
  return users;
}
\`\`\`

---

## Next Steps

Now that you understand advanced queries, you're ready to:
1. Learn database design and normalization
2. Master query optimization and EXPLAIN
3. Work with stored procedures and functions
4. Implement caching strategies

> **Remember:** Choose the right tool for the job - subqueries for clarity, JOINs for performance, CTEs for readability! 🎯
`
,

  contentFa: `
# کوئری‌های پیشرفته SQL - Subqueryها و UNION

## مقدمه

تکنیک‌های پیشرفته SQL به شما امکان می‌دهند کوئری‌های قدرتمندتر و انعطاف‌پذیرتری بنویسید. **Subqueryها** و عملیات **UNION** امکان حل مسائل پیچیده‌ای را فراهم می‌کنند که با کوئری‌های پایه دشوار خواهند بود.

**چه چیزی یاد می‌گیرید:**
- Subqueryها در بند‌های SELECT، FROM و WHERE
- Correlated subqueryها
- Subqueryها در مقابل JOINها
- عملیات UNION و UNION ALL
- عملیات مجموعه‌ای (INTERSECT، EXCEPT)
- Common Table Expressions (CTEs)
- مثال‌های عملی واقعی
- ملاحظات عملکرد

---

## Subqueryها (کوئری‌های تودرتو)

**Subquery** کوئری‌ای است در داخل کوئری دیگر. به آن inner query یا nested query نیز می‌گویند.

### Subqueryها در بند WHERE

\`\`\`sql
-- یافتن محصولات گران‌تر از میانگین
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

### Subqueryها با عملگر IN

\`\`\`sql
-- یافتن کاربرانی که پست نوشته‌اند
SELECT id, username, email
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM posts);
\`\`\`

### Subqueryها با NOT IN

\`\`\`sql
-- یافتن کاربرانی که هیچ پستی ننوشته‌اند
SELECT id, username, email
FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM posts);
\`\`\`

### Subqueryها با EXISTS

\`\`\`sql
-- یافتن کاربرانی که حداقل یک پست دارند
SELECT id, username
FROM users u
WHERE EXISTS (SELECT 1 FROM posts p WHERE p.user_id = u.id);
\`\`\`

> **نکته عملکرد:** EXISTS اغلب برای مجموعه‌های بزرگ سریع‌تر از IN است!

### Subqueryها در بند SELECT

\`\`\`sql
-- دریافت هر کاربر با تعداد پست‌های آنها
SELECT 
  id,
  username,
  (SELECT COUNT(*) FROM posts WHERE user_id = users.id) AS post_count
FROM users;
\`\`\`

### Subqueryها در بند FROM

\`\`\`sql
-- ایجاد جدول مشتق شده
SELECT 
  category,
  avg_price,
  product_count
FROM (
  SELECT 
    category,
    AVG(price) AS avg_price,
    COUNT(*) AS product_count
  FROM products
  GROUP BY category
) AS category_stats
WHERE avg_price > 100;
\`\`\`

---

## Correlated Subqueryها

**Correlated subquery** به ستون‌های کوئری بیرونی اشاره می‌کند.

### Correlated Subquery پایه

\`\`\`sql
-- یافتن محصولات گران‌تر از میانگین در دسته خود
SELECT 
  name,
  category,
  price
FROM products p1
WHERE price > (
  SELECT AVG(price)
  FROM products p2
  WHERE p2.category = p1.category
);
\`\`\`

### ملاحظات عملکرد

\`\`\`sql
-- Correlated subqueryها می‌توانند کند باشند (برای هر سطر اجرا می‌شود)
-- بهتر است از JOIN استفاده کنید:

-- کند (correlated subquery)
SELECT name, price
FROM products p1
WHERE price > (
  SELECT AVG(price)
  FROM products p2
  WHERE p2.category = p1.category
);

-- سریع (استفاده از JOIN)
SELECT p1.name, p1.price
FROM products p1
JOIN (
  SELECT category, AVG(price) AS avg_price
  FROM products
  GROUP BY category
) avg_by_cat ON p1.category = avg_by_cat.category
WHERE p1.price > avg_by_cat.avg_price;
\`\`\`

---

## Subqueryها در مقابل JOINها

هر دو می‌توانند مسائل مشابهی را حل کنند، اما با ویژگی‌های عملکرد متفاوت.

### استفاده از Subquery

\`\`\`sql
-- دریافت پست‌ها با اطلاعات نویسنده با استفاده از subquery
SELECT 
  id,
  title,
  (SELECT username FROM users WHERE id = posts.user_id) AS author
FROM posts;
\`\`\`

### استفاده از JOIN

\`\`\`sql
-- دریافت پست‌ها با اطلاعات نویسنده با استفاده از JOIN
SELECT 
  p.id,
  p.title,
  u.username AS author
FROM posts p
LEFT JOIN users u ON p.user_id = u.id;
\`\`\`

> **بهترین روش:** برای عملکرد بهتر در اکثر موارد از JOINها استفاده کنید!

---

## عملیات UNION

**UNION** نتایج چند کوئری را در یک مجموعه نتایج ترکیب می‌کند.

### UNION (حذف تکراری‌ها)

\`\`\`sql
-- ترکیب دو لیست و حذف تکراری‌ها
SELECT username FROM users WHERE status = 'active'
UNION
SELECT username FROM users WHERE role = 'admin';
\`\`\`

> **نکته:** UNION به طور خودکار سطرهای تکراری را حذف می‌کند!

### UNION ALL (نگه‌داشتن تکراری‌ها)

\`\`\`sql
-- ترکیب دو لیست و نگه‌داشتن تکراری‌ها
SELECT username FROM users WHERE status = 'active'
UNION ALL
SELECT username FROM users WHERE role = 'admin';
\`\`\`

> **نکته عملکرد:** UNION ALL سریع‌تر است زیرا تکراری‌ها را بررسی نمی‌کند!

### UNION با چند ستون

\`\`\`sql
-- ترکیب منابع داده مختلف
SELECT 
  id,
  name,
  'product' AS type
FROM products

UNION

SELECT 
  id,
  name,
  'category' AS type
FROM categories;
\`\`\`

### UNION با ORDER BY

\`\`\`sql
-- مرتب‌سازی نتایج ترکیب شده
SELECT username, email FROM users WHERE status = 'active'
UNION
SELECT username, email FROM users WHERE role = 'admin'
ORDER BY username;
\`\`\`

---

## عملیات مجموعه‌ای

### INTERSECT (رکوردهای مشترک)

\`\`\`sql
-- یافتن کاربرانی که هم فعال هستند و هم ادمین
SELECT username FROM users WHERE status = 'active'
INTERSECT
SELECT username FROM users WHERE role = 'admin';
\`\`\`

### EXCEPT (تفاوت)

\`\`\`sql
-- یافتن کاربران فعالی که ادمین نیستند
SELECT username FROM users WHERE status = 'active'
EXCEPT
SELECT username FROM users WHERE role = 'admin';
\`\`\`

### جایگزین با استفاده از JOIN

\`\`\`sql
-- جایگزین EXCEPT با استفاده از LEFT JOIN
SELECT DISTINCT u1.username
FROM users u1
WHERE u1.status = 'active'
  AND u1.username NOT IN (
    SELECT username FROM users WHERE role = 'admin'
  );
\`\`\`

---

## Common Table Expressions (CTEs)

**CTEs** (بند WITH) کوئری‌های پیچیده را خوانایی‌تر می‌کند.

### CTE پایه

\`\`\`sql
-- تعریف CTE و استفاده از آن
WITH active_users AS (
  SELECT id, username, email
  FROM users
  WHERE status = 'active'
)
SELECT * FROM active_users;
\`\`\`

### چند CTE

\`\`\`sql
-- چند CTE در یک کوئری
WITH active_users AS (
  SELECT id, username
  FROM users
  WHERE status = 'active'
),
user_posts AS (
  SELECT user_id, COUNT(*) AS post_count
  FROM posts
  GROUP BY user_id
)
SELECT 
  au.username,
  COALESCE(up.post_count, 0) AS posts
FROM active_users au
LEFT JOIN user_posts up ON au.id = up.user_id;
\`\`\`

---

## مثال‌های Node.js

### مثال 1: Subquery پیچیده

\`\`\`javascript
// یافتن محصولات برتر در هر دسته
async function getTopProductsPerCategory() {
  const [products] = await pool.execute(
    \`SELECT 
      category,
      name,
      price
     FROM products p1
     WHERE price = (
       SELECT MAX(price)
       FROM products p2
       WHERE p2.category = p1.category
     )
     ORDER BY category\`
  );
  return products;
}
\`\`\`

### مثال 2: UNION برای گزارش‌دهی

\`\`\`javascript
// دریافت تمام فعالیت (پست‌ها و نظرات)
async function getAllActivity() {
  const [activity] = await pool.execute(
    \`SELECT 
      'post' AS type,
      id,
      user_id,
      title AS content,
      created_at
     FROM posts
     
     UNION ALL
     
     SELECT 
      'comment' AS type,
      id,
      user_id,
      comment_text AS content,
      created_at
     FROM comments
     
     ORDER BY created_at DESC
     LIMIT 50\`
  );
  return activity;
}
\`\`\`

### مثال 3: CTE برای تجزیه و تحلیل

\`\`\`javascript
// دریافت معیارهای تعامل کاربر
async function getUserEngagement() {
  const [metrics] = await pool.execute(
    \`WITH user_activity AS (
      SELECT 
        user_id,
        COUNT(DISTINCT CASE WHEN type = 'post' THEN id END) AS posts,
        COUNT(DISTINCT CASE WHEN type = 'comment' THEN id END) AS comments
      FROM (
        SELECT user_id, 'post' AS type, id FROM posts
        UNION ALL
        SELECT user_id, 'comment' AS type, id FROM comments
      ) activity
      GROUP BY user_id
    )
    SELECT 
      u.username,
      COALESCE(ua.posts, 0) AS posts,
      COALESCE(ua.comments, 0) AS comments
    FROM users u
    LEFT JOIN user_activity ua ON u.id = ua.user_id
    ORDER BY (COALESCE(ua.posts, 0) + COALESCE(ua.comments, 0)) DESC\`
  );
  return metrics;
}
\`\`\`

---

## اشتباهات رایج

### 1. Subquery چند سطر برمی‌گرداند

❌ **اشتباه:**
\`\`\`sql
SELECT * FROM products
WHERE price = (SELECT price FROM products WHERE category = 'Electronics');
-- خطا: subquery چند سطر برمی‌گرداند
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT * FROM products
WHERE price IN (SELECT price FROM products WHERE category = 'Electronics');
\`\`\`

### 2. عدم تطابق ستون‌های UNION

❌ **اشتباه:**
\`\`\`sql
SELECT id, name FROM products
UNION
SELECT id, name, price FROM categories;
-- خطا: تعداد ستون‌ها متفاوت است
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT id, name FROM products
UNION
SELECT id, name FROM categories;
\`\`\`

### 3. عملکرد Correlated Subquery

❌ **کند:**
\`\`\`sql
-- Subquery برای هر سطر اجرا می‌شود
SELECT name, (SELECT COUNT(*) FROM orders WHERE product_id = products.id) AS order_count
FROM products;
\`\`\`

✅ **سریع:**
\`\`\`sql
-- استفاده از JOIN
SELECT p.name, COUNT(o.id) AS order_count
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
GROUP BY p.id, p.name;
\`\`\`

---

## نکات عملکرد

### 1. استفاده از JOINها به جای Subqueryها

\`\`\`sql
-- Subquery (کند‌تر)
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts);

-- JOIN (سریع‌تر)
SELECT DISTINCT u.* FROM users u
INNER JOIN posts p ON u.id = p.user_id;
\`\`\`

### 2. استفاده از EXISTS برای مجموعه‌های بزرگ

\`\`\`sql
-- IN (برای مجموعه‌های بزرگ کند‌تر)
SELECT * FROM users WHERE id IN (SELECT user_id FROM posts);

-- EXISTS (سریع‌تر)
SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM posts p WHERE p.user_id = u.id);
\`\`\`

---

## مرجع سریع

### انواع Subquery

| نوع | مکان | هدف |
|-----|------|-----|
| Scalar | SELECT | برگرداندن مقدار واحد |
| Row | WHERE | مقایسه با سطر |
| Table | FROM | جدول مشتق شده |
| Correlated | WHERE | اشاره به کوئری بیرونی |

### نحو UNION

\`\`\`sql
SELECT columns FROM table1
UNION [ALL]
SELECT columns FROM table2
[ORDER BY columns];
\`\`\`

### نحو CTE

\`\`\`sql
WITH cte_name AS (
  SELECT columns FROM table
)
SELECT * FROM cte_name;
\`\`\`

---

## مثال‌های واقعی

### مثال 1: تجزیه و تحلیل فروش

\`\`\`javascript
// یافتن محصولاتی که در دسته خود عملکرد ضعیفی دارند
async function getUnderperformingProducts() {
  const [products] = await pool.execute(
    \`WITH category_avg AS (
      SELECT 
        category,
        AVG(sales) AS avg_sales
      FROM products
      GROUP BY category
    )
    SELECT 
      p.name,
      p.category,
      p.sales,
      ca.avg_sales
    FROM products p
    JOIN category_avg ca ON p.category = ca.category
    WHERE p.sales < ca.avg_sales
    ORDER BY (ca.avg_sales - p.sales) DESC\`
  );
  return products;
}
\`\`\`

---

## مراحل بعدی

حالا که کوئری‌های پیشرفته را فهمیدید، آماده هستید برای:
1. یادگیری طراحی پایگاه داده و نرمال‌سازی
2. تسلط بر بهینه‌سازی کوئری و EXPLAIN
3. کار با stored procedures و توابع
4. پیاده‌سازی استراتژی‌های caching

> **به یاد داشته باشید:** ابزار مناسب را برای کار انتخاب کنید - subqueryها برای وضوح، JOINها برای عملکرد، CTEها برای خوانایی! 🎯
`,

  visualizationId: null,
  exerciseId: 'joins-exercises',
};

export default sqlAdvancedQueries;
