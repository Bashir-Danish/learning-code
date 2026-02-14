export const sqlSelectQueries = {
  id: 'sql-select-queries',
  title: 'SQL SELECT Queries',
  titleFa: 'کوئری‌های SELECT در SQL',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# SQL SELECT Queries - Retrieving Data from Databases

## Introduction

The **SELECT** statement is the most fundamental and frequently used SQL command. It allows you to retrieve data from database tables, filter results, sort them, and limit the output. Mastering SELECT queries is essential for working with databases!

**What you'll learn:**
- Basic SELECT syntax
- Filtering data with WHERE
- Sorting results with ORDER BY
- Limiting results with LIMIT
- Using prepared statements for security
- Practical real-world examples

---

## Basic SELECT Syntax

### Select All Columns

\`\`\`sql
-- Get all columns from users table
SELECT * FROM users;
\`\`\`

**Output:**
\`\`\`
+----+----------+----------------------+---------------------+
| id | username | email                | created_at          |
+----+----------+----------------------+---------------------+
|  1 | alice    | alice@example.com    | 2024-01-15 10:30:00 |
|  2 | bob      | bob@example.com      | 2024-01-16 14:20:00 |
|  3 | charlie  | charlie@example.com  | 2024-01-17 09:15:00 |
+----+----------+----------------------+---------------------+
\`\`\`

> **Note:** Using \`SELECT *\` retrieves all columns. While convenient, it's better to specify columns in production for performance.

### Select Specific Columns

\`\`\`sql
-- Get only username and email
SELECT username, email FROM users;
\`\`\`

**Output:**
\`\`\`
+----------+----------------------+
| username | email                |
+----------+----------------------+
| alice    | alice@example.com    |
| bob      | bob@example.com      |
| charlie  | charlie@example.com  |
+----------+----------------------+
\`\`\`


**Why specify columns?**
- ✅ Better performance (less data transferred)
- ✅ Clearer code (explicit about what you need)
- ✅ Prevents issues if table structure changes

---

## Filtering Data with WHERE

The **WHERE** clause filters rows based on conditions.

### Basic WHERE Conditions

\`\`\`sql
-- Get user with specific ID
SELECT * FROM users WHERE id = 1;

-- Get user by username
SELECT * FROM users WHERE username = 'alice';

-- Get users with specific email domain
SELECT * FROM users WHERE email LIKE '%@example.com';
\`\`\`

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| \`=\` | Equal to | \`WHERE age = 25\` |
| \`!=\` or \`<>\` | Not equal | \`WHERE status != 'inactive'\` |
| \`>\` | Greater than | \`WHERE price > 100\` |
| \`<\` | Less than | \`WHERE age < 18\` |
| \`>=\` | Greater or equal | \`WHERE score >= 90\` |
| \`<=\` | Less or equal | \`WHERE quantity <= 10\` |

**Examples:**

\`\`\`sql
-- Users older than 18
SELECT * FROM users WHERE age > 18;

-- Products under $50
SELECT * FROM products WHERE price < 50;

-- Orders from 2024
SELECT * FROM orders WHERE YEAR(created_at) = 2024;
\`\`\`

### Logical Operators (AND, OR, NOT)

\`\`\`sql
-- Users between 18 and 65
SELECT * FROM users 
WHERE age >= 18 AND age <= 65;

-- Users from USA or Canada
SELECT * FROM users 
WHERE country = 'USA' OR country = 'Canada';

-- Active users who are not admins
SELECT * FROM users 
WHERE status = 'active' AND role != 'admin';

-- Users NOT from Europe
SELECT * FROM users 
WHERE NOT country IN ('UK', 'France', 'Germany');
\`\`\`

### Pattern Matching with LIKE

\`\`\`sql
-- Names starting with 'A'
SELECT * FROM users WHERE username LIKE 'A%';

-- Names ending with 'son'
SELECT * FROM users WHERE username LIKE '%son';

-- Names containing 'john'
SELECT * FROM users WHERE username LIKE '%john%';

-- Email addresses from Gmail
SELECT * FROM users WHERE email LIKE '%@gmail.com';
\`\`\`

**LIKE Wildcards:**
- \`%\` - Matches any sequence of characters
- \`_\` - Matches exactly one character

\`\`\`sql
-- Names with exactly 5 characters
SELECT * FROM users WHERE username LIKE '_____';

-- Phone numbers starting with 555
SELECT * FROM contacts WHERE phone LIKE '555%';
\`\`\`

### IN Operator

\`\`\`sql
-- Users with specific IDs
SELECT * FROM users WHERE id IN (1, 3, 5, 7);

-- Products in specific categories
SELECT * FROM products 
WHERE category IN ('Electronics', 'Books', 'Toys');

-- Orders with specific statuses
SELECT * FROM orders 
WHERE status IN ('pending', 'processing', 'shipped');
\`\`\`

### BETWEEN Operator

\`\`\`sql
-- Users aged 18 to 30
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- Products priced $10 to $100
SELECT * FROM products WHERE price BETWEEN 10 AND 100;

-- Orders from January 2024
SELECT * FROM orders 
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31';
\`\`\`

### NULL Values

\`\`\`sql
-- Users without email
SELECT * FROM users WHERE email IS NULL;

-- Users with email
SELECT * FROM users WHERE email IS NOT NULL;

-- Products without description
SELECT * FROM products WHERE description IS NULL;
\`\`\`

> **Important:** Use \`IS NULL\` and \`IS NOT NULL\`, not \`= NULL\` or \`!= NULL\`!

---

## Sorting Results with ORDER BY

The **ORDER BY** clause sorts query results.

### Basic Sorting

\`\`\`sql
-- Sort users by username (ascending)
SELECT * FROM users ORDER BY username;

-- Sort users by username (descending)
SELECT * FROM users ORDER BY username DESC;

-- Sort products by price (lowest first)
SELECT * FROM products ORDER BY price ASC;

-- Sort products by price (highest first)
SELECT * FROM products ORDER BY price DESC;
\`\`\`

**ASC vs DESC:**
- \`ASC\` - Ascending order (A-Z, 0-9, oldest-newest) - **default**
- \`DESC\` - Descending order (Z-A, 9-0, newest-oldest)

### Multi-Column Sorting

\`\`\`sql
-- Sort by country, then by city
SELECT * FROM users 
ORDER BY country ASC, city ASC;

-- Sort by status (ascending), then by created_at (newest first)
SELECT * FROM orders 
ORDER BY status ASC, created_at DESC;

-- Sort products by category, then by price (highest first)
SELECT * FROM products 
ORDER BY category ASC, price DESC;
\`\`\`

**How it works:**
1. First sorts by the first column
2. Within each group, sorts by the second column
3. And so on...

### Sorting with NULL Values

\`\`\`sql
-- NULL values appear first by default
SELECT * FROM users ORDER BY phone;

-- NULL values appear last
SELECT * FROM users ORDER BY phone DESC;
\`\`\`

---

## Limiting Results with LIMIT

The **LIMIT** clause restricts the number of rows returned.

### Basic LIMIT

\`\`\`sql
-- Get first 10 users
SELECT * FROM users LIMIT 10;

-- Get top 5 most expensive products
SELECT * FROM products 
ORDER BY price DESC 
LIMIT 5;

-- Get 3 newest orders
SELECT * FROM orders 
ORDER BY created_at DESC 
LIMIT 3;
\`\`\`

### LIMIT with OFFSET (Pagination)

\`\`\`sql
-- Get rows 1-10 (page 1)
SELECT * FROM users LIMIT 10 OFFSET 0;

-- Get rows 11-20 (page 2)
SELECT * FROM users LIMIT 10 OFFSET 10;

-- Get rows 21-30 (page 3)
SELECT * FROM users LIMIT 10 OFFSET 20;
\`\`\`

**Pagination Formula:**
\`\`\`
OFFSET = (page_number - 1) * items_per_page
\`\`\`

**Example: Page 5 with 20 items per page**
\`\`\`sql
SELECT * FROM products 
ORDER BY created_at DESC
LIMIT 20 OFFSET 80;  -- (5-1) * 20 = 80
\`\`\`

### Alternative Syntax (MySQL/MariaDB)

\`\`\`sql
-- LIMIT offset, count
SELECT * FROM users LIMIT 10, 10;  -- Skip 10, get 10 (rows 11-20)
SELECT * FROM users LIMIT 20, 10;  -- Skip 20, get 10 (rows 21-30)
\`\`\`

---

## Using Prepared Statements (Security) 🔒

**Never concatenate user input into SQL queries!** Always use prepared statements to prevent SQL injection.

### SQL Injection Vulnerability ❌

\`\`\`javascript
// DANGEROUS - DO NOT DO THIS!
const userId = req.params.id;
const sql = \`SELECT * FROM users WHERE id = \${userId}\`;
const [rows] = await pool.execute(sql);

// If userId = "1 OR 1=1", this returns ALL users!
// If userId = "1; DROP TABLE users;", this could delete your table!
\`\`\`

### Prepared Statements ✅

\`\`\`javascript
// SAFE - Always do this!
const userId = req.params.id;
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]  // Parameters are safely escaped
);
\`\`\`

**How it works:**
1. SQL query is sent to database with \`?\` placeholders
2. Parameters are sent separately
3. Database safely escapes and inserts parameters
4. SQL injection is impossible!

### Multiple Parameters

\`\`\`javascript
// Search users by name and email
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username = ? AND email = ?',
  [username, email]
);

// Get products in price range
const [rows] = await pool.execute(
  'SELECT * FROM products WHERE price BETWEEN ? AND ?',
  [minPrice, maxPrice]
);

// Search with LIKE
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username LIKE ?',
  [\`%\${searchTerm}%\`]  // Wildcards in parameter, not query
);
\`\`\`


---

## Practical Examples

### Example 1: User Search

\`\`\`javascript
// Search users by username or email
async function searchUsers(searchTerm) {
  const [rows] = await pool.execute(
    \`SELECT id, username, email, created_at 
     FROM users 
     WHERE username LIKE ? OR email LIKE ?
     ORDER BY username ASC
     LIMIT 20\`,
    [\`%\${searchTerm}%\`, \`%\${searchTerm}%\`]
  );
  return rows;
}

// Usage
const results = await searchUsers('john');
console.log(results);
\`\`\`

### Example 2: Product Catalog with Filters

\`\`\`javascript
// Get products with filters
async function getProducts(filters) {
  const { category, minPrice, maxPrice, page = 1, perPage = 20 } = filters;
  
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  
  if (minPrice !== undefined) {
    sql += ' AND price >= ?';
    params.push(minPrice);
  }
  
  if (maxPrice !== undefined) {
    sql += ' AND price <= ?';
    params.push(maxPrice);
  }
  
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(perPage, (page - 1) * perPage);
  
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Usage
const products = await getProducts({
  category: 'Electronics',
  minPrice: 100,
  maxPrice: 500,
  page: 2,
  perPage: 20
});
\`\`\`

### Example 3: Recent Activity Feed

\`\`\`javascript
// Get recent user activity
async function getRecentActivity(userId, limit = 10) {
  const [rows] = await pool.execute(
    \`SELECT 
      activity_type,
      description,
      created_at
     FROM user_activities
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT ?\`,
    [userId, limit]
  );
  return rows;
}

// Usage
const activities = await getRecentActivity(123, 5);
\`\`\`

### Example 4: Top Sellers

\`\`\`javascript
// Get top selling products
async function getTopSellers(limit = 10) {
  const [rows] = await pool.execute(
    \`SELECT 
      id,
      name,
      price,
      sales_count
     FROM products
     WHERE status = 'active'
     ORDER BY sales_count DESC
     LIMIT ?\`,
    [limit]
  );
  return rows;
}

// Usage
const topProducts = await getTopSellers(5);
\`\`\`

### Example 5: Date Range Queries

\`\`\`javascript
// Get orders within date range
async function getOrdersByDateRange(startDate, endDate) {
  const [rows] = await pool.execute(
    \`SELECT 
      id,
      customer_name,
      total_amount,
      status,
      created_at
     FROM orders
     WHERE created_at BETWEEN ? AND ?
     ORDER BY created_at DESC\`,
    [startDate, endDate]
  );
  return rows;
}

// Usage
const orders = await getOrdersByDateRange('2024-01-01', '2024-01-31');
\`\`\`

---

## Column Aliases with AS

Make column names more readable in results:

\`\`\`sql
-- Rename columns in output
SELECT 
  id AS user_id,
  username AS name,
  email AS email_address,
  created_at AS registration_date
FROM users;
\`\`\`

**Output:**
\`\`\`
+---------+-------+-------------------+---------------------+
| user_id | name  | email_address     | registration_date   |
+---------+-------+-------------------+---------------------+
|       1 | alice | alice@example.com | 2024-01-15 10:30:00 |
+---------+-------+-------------------+---------------------+
\`\`\`

### Calculated Columns

\`\`\`sql
-- Calculate values in SELECT
SELECT 
  product_name,
  price,
  price * 0.9 AS discounted_price,
  price * 0.1 AS savings
FROM products;

-- Concatenate strings
SELECT 
  CONCAT(first_name, ' ', last_name) AS full_name,
  email
FROM users;
\`\`\`

---

## DISTINCT - Remove Duplicates

\`\`\`sql
-- Get unique countries
SELECT DISTINCT country FROM users;

-- Get unique categories
SELECT DISTINCT category FROM products;

-- Get unique combinations
SELECT DISTINCT country, city FROM users;
\`\`\`

**Example Output:**
\`\`\`sql
SELECT DISTINCT country FROM users;

+---------+
| country |
+---------+
| USA     |
| Canada  |
| UK      |
+---------+
\`\`\`

---

## Common Mistakes

### 1. Using SELECT * in Production
❌ **Wrong:**
\`\`\`sql
SELECT * FROM users;  -- Gets all columns, even if you don't need them
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT id, username, email FROM users;  -- Only get what you need
\`\`\`

### 2. Forgetting WHERE with UPDATE/DELETE
❌ **Wrong:**
\`\`\`sql
DELETE FROM users;  -- Deletes ALL users!
\`\`\`

✅ **Correct:**
\`\`\`sql
DELETE FROM users WHERE id = 5;  -- Deletes specific user
\`\`\`

### 3. SQL Injection Vulnerability
❌ **Wrong:**
\`\`\`javascript
const sql = \`SELECT * FROM users WHERE id = \${userId}\`;  // Dangerous!
\`\`\`

✅ **Correct:**
\`\`\`javascript
const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
\`\`\`

### 4. Using = NULL Instead of IS NULL
❌ **Wrong:**
\`\`\`sql
SELECT * FROM users WHERE email = NULL;  -- Returns nothing!
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT * FROM users WHERE email IS NULL;  -- Works correctly
\`\`\`

### 5. Forgetting ORDER BY with LIMIT
❌ **Wrong:**
\`\`\`sql
SELECT * FROM products LIMIT 10;  -- Random 10 products
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT * FROM products ORDER BY created_at DESC LIMIT 10;  -- 10 newest
\`\`\`

### 6. Case Sensitivity in LIKE
❌ **Problem:**
\`\`\`sql
-- Won't match 'ALICE' or 'Alice'
SELECT * FROM users WHERE username LIKE 'alice';
\`\`\`

✅ **Solution:**
\`\`\`sql
-- Case-insensitive search
SELECT * FROM users WHERE LOWER(username) LIKE LOWER('alice');
-- Or use COLLATE
SELECT * FROM users WHERE username LIKE 'alice' COLLATE utf8mb4_general_ci;
\`\`\`

---

## Performance Tips

### 1. Use Indexes for WHERE Columns
\`\`\`sql
-- Create index on frequently queried columns
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_created_at ON orders(created_at);
\`\`\`

### 2. Avoid SELECT *
- Only select columns you need
- Reduces data transfer
- Improves query performance

### 3. Use LIMIT for Large Tables
\`\`\`sql
-- Always limit results when testing
SELECT * FROM large_table LIMIT 100;
\`\`\`

### 4. Filter Before Sorting
\`\`\`sql
-- Good: Filter first, then sort
SELECT * FROM users 
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;
\`\`\`

---

## Quick Reference

### SELECT Syntax
\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column ASC|DESC
LIMIT count OFFSET skip;
\`\`\`

### WHERE Operators
| Operator | Example |
|----------|---------|
| \`=\` | \`WHERE age = 25\` |
| \`!=\` or \`<>\` | \`WHERE status != 'inactive'\` |
| \`>\`, \`<\`, \`>=\`, \`<=\` | \`WHERE price > 100\` |
| \`BETWEEN\` | \`WHERE age BETWEEN 18 AND 65\` |
| \`IN\` | \`WHERE id IN (1,2,3)\` |
| \`LIKE\` | \`WHERE name LIKE 'A%'\` |
| \`IS NULL\` | \`WHERE email IS NULL\` |
| \`AND\`, \`OR\`, \`NOT\` | \`WHERE age > 18 AND country = 'USA'\` |

### ORDER BY
\`\`\`sql
ORDER BY column ASC   -- Ascending (default)
ORDER BY column DESC  -- Descending
ORDER BY col1, col2   -- Multiple columns
\`\`\`

### LIMIT
\`\`\`sql
LIMIT 10              -- First 10 rows
LIMIT 10 OFFSET 20    -- Skip 20, get 10
LIMIT 20, 10          -- Alternative syntax (MySQL)
\`\`\`

---

## Next Steps

Now that you understand SELECT queries, you're ready to:
1. Learn INSERT, UPDATE, and DELETE statements
2. Work with JOINs to combine data from multiple tables
3. Use aggregate functions (COUNT, SUM, AVG)
4. Master subqueries and complex queries

> **Remember:** Always use prepared statements with parameters to prevent SQL injection! 🔒
`,

  contentFa: `
# کوئری‌های SELECT در SQL - بازیابی داده از پایگاه‌های داده

## مقدمه

دستور **SELECT** اساسی‌ترین و پرکاربردترین دستور SQL است. این دستور به شما امکان می‌دهد داده را از جداول پایگاه داده بازیابی کنید، نتایج را فیلتر کنید، مرتب کنید و خروجی را محدود کنید. تسلط بر کوئری‌های SELECT برای کار با پایگاه‌های داده ضروری است!

**چه چیزی یاد می‌گیرید:**
- نحو پایه SELECT
- فیلتر کردن داده با WHERE
- مرتب‌سازی نتایج با ORDER BY
- محدود کردن نتایج با LIMIT
- استفاده از prepared statements برای امنیت
- مثال‌های عملی واقعی

---

## نحو پایه SELECT

### انتخاب همه ستون‌ها

\`\`\`sql
-- دریافت همه ستون‌ها از جدول users
SELECT * FROM users;
\`\`\`

**خروجی:**
\`\`\`
+----+----------+----------------------+---------------------+
| id | username | email                | created_at          |
+----+----------+----------------------+---------------------+
|  1 | alice    | alice@example.com    | 2024-01-15 10:30:00 |
|  2 | bob      | bob@example.com      | 2024-01-16 14:20:00 |
|  3 | charlie  | charlie@example.com  | 2024-01-17 09:15:00 |
+----+----------+----------------------+---------------------+
\`\`\`

> **نکته:** استفاده از \`SELECT *\` همه ستون‌ها را بازیابی می‌کند. در حالی که راحت است، بهتر است در تولید ستون‌ها را برای عملکرد مشخص کنید.

### انتخاب ستون‌های خاص

\`\`\`sql
-- فقط username و email را دریافت کن
SELECT username, email FROM users;
\`\`\`

**خروجی:**
\`\`\`
+----------+----------------------+
| username | email                |
+----------+----------------------+
| alice    | alice@example.com    |
| bob      | bob@example.com      |
| charlie  | charlie@example.com  |
+----------+----------------------+
\`\`\`

**چرا ستون‌ها را مشخص کنیم؟**
- ✅ عملکرد بهتر (داده کمتری منتقل می‌شود)
- ✅ کد واضح‌تر (صریح درباره آنچه نیاز دارید)
- ✅ از مشکلات جلوگیری می‌کند اگر ساختار جدول تغییر کند

---

## فیلتر کردن داده با WHERE

بند **WHERE** سطرها را بر اساس شرایط فیلتر می‌کند.

### شرایط پایه WHERE

\`\`\`sql
-- دریافت کاربر با ID خاص
SELECT * FROM users WHERE id = 1;

-- دریافت کاربر با username
SELECT * FROM users WHERE username = 'alice';

-- دریافت کاربران با دامنه ایمیل خاص
SELECT * FROM users WHERE email LIKE '%@example.com';
\`\`\`

### عملگرهای مقایسه

| عملگر | توضیح | مثال |
|-------|-------|------|
| \`=\` | مساوی با | \`WHERE age = 25\` |
| \`!=\` یا \`<>\` | نامساوی | \`WHERE status != 'inactive'\` |
| \`>\` | بزرگتر از | \`WHERE price > 100\` |
| \`<\` | کوچکتر از | \`WHERE age < 18\` |
| \`>=\` | بزرگتر یا مساوی | \`WHERE score >= 90\` |
| \`<=\` | کوچکتر یا مساوی | \`WHERE quantity <= 10\` |

**مثال‌ها:**

\`\`\`sql
-- کاربران بالای ۱۸ سال
SELECT * FROM users WHERE age > 18;

-- محصولات زیر ۵۰ دلار
SELECT * FROM products WHERE price < 50;

-- سفارشات از سال ۲۰۲۴
SELECT * FROM orders WHERE YEAR(created_at) = 2024;
\`\`\`

### عملگرهای منطقی (AND، OR، NOT)

\`\`\`sql
-- کاربران بین ۱۸ تا ۶۵ سال
SELECT * FROM users 
WHERE age >= 18 AND age <= 65;

-- کاربران از آمریکا یا کانادا
SELECT * FROM users 
WHERE country = 'USA' OR country = 'Canada';

-- کاربران فعال که ادمین نیستند
SELECT * FROM users 
WHERE status = 'active' AND role != 'admin';

-- کاربران که از اروپا نیستند
SELECT * FROM users 
WHERE NOT country IN ('UK', 'France', 'Germany');
\`\`\`

### تطبیق الگو با LIKE

\`\`\`sql
-- نام‌هایی که با 'A' شروع می‌شوند
SELECT * FROM users WHERE username LIKE 'A%';

-- نام‌هایی که با 'son' تمام می‌شوند
SELECT * FROM users WHERE username LIKE '%son';

-- نام‌هایی که شامل 'john' هستند
SELECT * FROM users WHERE username LIKE '%john%';

-- آدرس‌های ایمیل از Gmail
SELECT * FROM users WHERE email LIKE '%@gmail.com';
\`\`\`

**کاراکترهای جایگزین LIKE:**
- \`%\` - با هر دنباله‌ای از کاراکترها تطبیق می‌یابد
- \`_\` - دقیقاً با یک کاراکتر تطبیق می‌یابد

\`\`\`sql
-- نام‌ها با دقیقاً ۵ کاراکتر
SELECT * FROM users WHERE username LIKE '_____';

-- شماره تلفن‌هایی که با ۵۵۵ شروع می‌شوند
SELECT * FROM contacts WHERE phone LIKE '555%';
\`\`\`

### عملگر IN

\`\`\`sql
-- کاربران با IDهای خاص
SELECT * FROM users WHERE id IN (1, 3, 5, 7);

-- محصولات در دسته‌های خاص
SELECT * FROM products 
WHERE category IN ('Electronics', 'Books', 'Toys');

-- سفارشات با وضعیت‌های خاص
SELECT * FROM orders 
WHERE status IN ('pending', 'processing', 'shipped');
\`\`\`

### عملگر BETWEEN

\`\`\`sql
-- کاربران ۱۸ تا ۳۰ ساله
SELECT * FROM users WHERE age BETWEEN 18 AND 30;

-- محصولات با قیمت ۱۰ تا ۱۰۰ دلار
SELECT * FROM products WHERE price BETWEEN 10 AND 100;

-- سفارشات از ژانویه ۲۰۲۴
SELECT * FROM orders 
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31';
\`\`\`

### مقادیر NULL

\`\`\`sql
-- کاربران بدون ایمیل
SELECT * FROM users WHERE email IS NULL;

-- کاربران با ایمیل
SELECT * FROM users WHERE email IS NOT NULL;

-- محصولات بدون توضیحات
SELECT * FROM products WHERE description IS NULL;
\`\`\`

> **مهم:** از \`IS NULL\` و \`IS NOT NULL\` استفاده کنید، نه \`= NULL\` یا \`!= NULL\`!

---

## مرتب‌سازی نتایج با ORDER BY

بند **ORDER BY** نتایج کوئری را مرتب می‌کند.

### مرتب‌سازی پایه

\`\`\`sql
-- مرتب‌سازی کاربران بر اساس username (صعودی)
SELECT * FROM users ORDER BY username;

-- مرتب‌سازی کاربران بر اساس username (نزولی)
SELECT * FROM users ORDER BY username DESC;

-- مرتب‌سازی محصولات بر اساس قیمت (کمترین اول)
SELECT * FROM products ORDER BY price ASC;

-- مرتب‌سازی محصولات بر اساس قیمت (بیشترین اول)
SELECT * FROM products ORDER BY price DESC;
\`\`\`

**ASC در مقابل DESC:**
- \`ASC\` - ترتیب صعودی (A-Z، 0-9، قدیمی‌ترین-جدیدترین) - **پیش‌فرض**
- \`DESC\` - ترتیب نزولی (Z-A، 9-0، جدیدترین-قدیمی‌ترین)

### مرتب‌سازی چند ستونی

\`\`\`sql
-- مرتب‌سازی بر اساس کشور، سپس شهر
SELECT * FROM users 
ORDER BY country ASC, city ASC;

-- مرتب‌سازی بر اساس وضعیت (صعودی)، سپس created_at (جدیدترین اول)
SELECT * FROM orders 
ORDER BY status ASC, created_at DESC;

-- مرتب‌سازی محصولات بر اساس دسته، سپس قیمت (بیشترین اول)
SELECT * FROM products 
ORDER BY category ASC, price DESC;
\`\`\`

**چگونه کار می‌کند:**
1. ابتدا بر اساس ستون اول مرتب می‌کند
2. در هر گروه، بر اساس ستون دوم مرتب می‌کند
3. و همینطور ادامه...

### مرتب‌سازی با مقادیر NULL

\`\`\`sql
-- مقادیر NULL به طور پیش‌فرض اول ظاهر می‌شوند
SELECT * FROM users ORDER BY phone;

-- مقادیر NULL آخر ظاهر می‌شوند
SELECT * FROM users ORDER BY phone DESC;
\`\`\`

---

## محدود کردن نتایج با LIMIT

بند **LIMIT** تعداد سطرهای برگشتی را محدود می‌کند.

### LIMIT پایه

\`\`\`sql
-- دریافت ۱۰ کاربر اول
SELECT * FROM users LIMIT 10;

-- دریافت ۵ محصول گران‌ترین
SELECT * FROM products 
ORDER BY price DESC 
LIMIT 5;

-- دریافت ۳ سفارش جدیدترین
SELECT * FROM orders 
ORDER BY created_at DESC 
LIMIT 3;
\`\`\`

### LIMIT با OFFSET (صفحه‌بندی)

\`\`\`sql
-- دریافت سطرهای ۱-۱۰ (صفحه ۱)
SELECT * FROM users LIMIT 10 OFFSET 0;

-- دریافت سطرهای ۱۱-۲۰ (صفحه ۲)
SELECT * FROM users LIMIT 10 OFFSET 10;

-- دریافت سطرهای ۲۱-۳۰ (صفحه ۳)
SELECT * FROM users LIMIT 10 OFFSET 20;
\`\`\`

**فرمول صفحه‌بندی:**
\`\`\`
OFFSET = (شماره_صفحه - 1) * آیتم_در_هر_صفحه
\`\`\`

**مثال: صفحه ۵ با ۲۰ آیتم در هر صفحه**
\`\`\`sql
SELECT * FROM products 
ORDER BY created_at DESC
LIMIT 20 OFFSET 80;  -- (5-1) * 20 = 80
\`\`\`

### نحو جایگزین (MySQL/MariaDB)

\`\`\`sql
-- LIMIT offset, count
SELECT * FROM users LIMIT 10, 10;  -- رد کن ۱۰، بگیر ۱۰ (سطرهای ۱۱-۲۰)
SELECT * FROM users LIMIT 20, 10;  -- رد کن ۲۰، بگیر ۱۰ (سطرهای ۲۱-۳۰)
\`\`\`

---

## استفاده از Prepared Statements (امنیت) 🔒

**هرگز ورودی کاربر را در کوئری‌های SQL concatenate نکنید!** همیشه از prepared statements برای جلوگیری از SQL injection استفاده کنید.

### آسیب‌پذیری SQL Injection ❌

\`\`\`javascript
// خطرناک - این کار را نکنید!
const userId = req.params.id;
const sql = \`SELECT * FROM users WHERE id = \${userId}\`;
const [rows] = await pool.execute(sql);

// اگر userId = "1 OR 1=1"، این همه کاربران را برمی‌گرداند!
// اگر userId = "1; DROP TABLE users;"، این می‌تواند جدول شما را حذف کند!
\`\`\`

### Prepared Statements ✅

\`\`\`javascript
// ایمن - همیشه این کار را انجام دهید!
const userId = req.params.id;
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]  // پارامترها به صورت ایمن escape می‌شوند
);
\`\`\`

**چگونه کار می‌کند:**
1. کوئری SQL با جایگزین‌های \`?\` به پایگاه داده ارسال می‌شود
2. پارامترها جداگانه ارسال می‌شوند
3. پایگاه داده به صورت ایمن پارامترها را escape و درج می‌کند
4. SQL injection غیرممکن است!

### پارامترهای متعدد

\`\`\`javascript
// جستجوی کاربران بر اساس نام و ایمیل
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username = ? AND email = ?',
  [username, email]
);

// دریافت محصولات در محدوده قیمت
const [rows] = await pool.execute(
  'SELECT * FROM products WHERE price BETWEEN ? AND ?',
  [minPrice, maxPrice]
);

// جستجو با LIKE
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username LIKE ?',
  [\`%\${searchTerm}%\`]  // کاراکترهای جایگزین در پارامتر، نه کوئری
);
\`\`\`

---

## مثال‌های عملی

### مثال ۱: جستجوی کاربر

\`\`\`javascript
// جستجوی کاربران بر اساس username یا email
async function searchUsers(searchTerm) {
  const [rows] = await pool.execute(
    \`SELECT id, username, email, created_at 
     FROM users 
     WHERE username LIKE ? OR email LIKE ?
     ORDER BY username ASC
     LIMIT 20\`,
    [\`%\${searchTerm}%\`, \`%\${searchTerm}%\`]
  );
  return rows;
}

// استفاده
const results = await searchUsers('john');
console.log(results);
\`\`\`

### مثال ۲: کاتالوگ محصول با فیلترها

\`\`\`javascript
// دریافت محصولات با فیلترها
async function getProducts(filters) {
  const { category, minPrice, maxPrice, page = 1, perPage = 20 } = filters;
  
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];
  
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }
  
  if (minPrice !== undefined) {
    sql += ' AND price >= ?';
    params.push(minPrice);
  }
  
  if (maxPrice !== undefined) {
    sql += ' AND price <= ?';
    params.push(maxPrice);
  }
  
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(perPage, (page - 1) * perPage);
  
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// استفاده
const products = await getProducts({
  category: 'Electronics',
  minPrice: 100,
  maxPrice: 500,
  page: 2,
  perPage: 20
});
\`\`\`

---

## اشتباهات رایج

### 1. استفاده از SELECT * در تولید
❌ **اشتباه:**
\`\`\`sql
SELECT * FROM users;  -- همه ستون‌ها را می‌گیرد، حتی اگر نیاز ندارید
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT id, username, email FROM users;  -- فقط آنچه نیاز دارید بگیرید
\`\`\`

### 2. فراموش کردن WHERE با UPDATE/DELETE
❌ **اشتباه:**
\`\`\`sql
DELETE FROM users;  -- همه کاربران را حذف می‌کند!
\`\`\`

✅ **درست:**
\`\`\`sql
DELETE FROM users WHERE id = 5;  -- کاربر خاص را حذف می‌کند
\`\`\`

### 3. آسیب‌پذیری SQL Injection
❌ **اشتباه:**
\`\`\`javascript
const sql = \`SELECT * FROM users WHERE id = \${userId}\`;  // خطرناک!
\`\`\`

✅ **درست:**
\`\`\`javascript
const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
\`\`\`

### 4. استفاده از = NULL به جای IS NULL
❌ **اشتباه:**
\`\`\`sql
SELECT * FROM users WHERE email = NULL;  -- هیچ چیز برنمی‌گرداند!
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT * FROM users WHERE email IS NULL;  -- به درستی کار می‌کند
\`\`\`

---

## مرجع سریع

### نحو SELECT
\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column ASC|DESC
LIMIT count OFFSET skip;
\`\`\`

### عملگرهای WHERE
| عملگر | مثال |
|-------|------|
| \`=\` | \`WHERE age = 25\` |
| \`!=\` یا \`<>\` | \`WHERE status != 'inactive'\` |
| \`>\`, \`<\`, \`>=\`, \`<=\` | \`WHERE price > 100\` |
| \`BETWEEN\` | \`WHERE age BETWEEN 18 AND 65\` |
| \`IN\` | \`WHERE id IN (1,2,3)\` |
| \`LIKE\` | \`WHERE name LIKE 'A%'\` |
| \`IS NULL\` | \`WHERE email IS NULL\` |
| \`AND\`, \`OR\`, \`NOT\` | \`WHERE age > 18 AND country = 'USA'\` |

---

## مراحل بعدی

حالا که کوئری‌های SELECT را فهمیدید، آماده هستید برای:
1. یادگیری دستورات INSERT، UPDATE و DELETE
2. کار با JOINها برای ترکیب داده از چند جدول
3. استفاده از توابع تجمیعی (COUNT، SUM، AVG)
4. تسلط بر subqueryها و کوئری‌های پیچیده

> **به یاد داشته باشید:** همیشه از prepared statements با پارامترها برای جلوگیری از SQL injection استفاده کنید! 🔒
`,

  visualizationId: null,
  exerciseId: 'sql-queries-exercises',
};

export default sqlSelectQueries;
