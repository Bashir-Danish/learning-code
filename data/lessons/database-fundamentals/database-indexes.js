export const databaseIndexes = {
  id: 'database-indexes',
  title: 'Database Indexes',
  titleFa: 'Indexهای پایگاه داده',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Database Indexes - Optimizing Query Performance

## Introduction

Indexes are database structures that improve query performance by allowing the database to find data without scanning every row. Understanding when and how to use indexes is crucial for database optimization.

**What you'll learn:**
- How indexes work
- Types of indexes (single, composite, unique, full-text)
- Creating and dropping indexes
- EXPLAIN for analyzing query performance
- When to use indexes
- When NOT to use indexes
- Index maintenance and monitoring
- Common mistakes and best practices

---

## How Indexes Work

An index is like a book's table of contents - it helps you find information quickly without reading every page.

### Without Index

\`\`\`
Query: SELECT * FROM users WHERE email = 'alice@example.com'

Database scans every row:
Row 1: bob@example.com ✗
Row 2: charlie@example.com ✗
Row 3: diana@example.com ✗
Row 4: alice@example.com ✓ Found!
Row 5: eve@example.com ✗
...
(Scans all 1,000,000 rows!)
\`\`\`

### With Index

\`\`\`
Query: SELECT * FROM users WHERE email = 'alice@example.com'

Database uses index (like binary search):
Index lookup: alice@example.com → Row 4
Found immediately!
(Scans only a few rows!)
\`\`\`

---

## Types of Indexes

### Single Column Index

\`\`\`sql
-- Create index on username
CREATE INDEX idx_username ON users(username);

-- Query uses index
SELECT * FROM users WHERE username = 'alice';
\`\`\`

### Composite Index (Multi-Column)

\`\`\`sql
-- Create index on multiple columns
CREATE INDEX idx_user_email ON users(username, email);

-- Query uses index (both columns)
SELECT * FROM users WHERE username = 'alice' AND email = 'alice@example.com';

-- Query uses index (first column)
SELECT * FROM users WHERE username = 'alice';

-- Query does NOT use index (missing first column)
SELECT * FROM users WHERE email = 'alice@example.com';
\`\`\`

> **Important:** Composite indexes work left-to-right. Include the first column in WHERE clause!

### Unique Index

\`\`\`sql
-- Ensure uniqueness and improve performance
CREATE UNIQUE INDEX idx_email ON users(email);

-- Prevents duplicate emails
INSERT INTO users (email) VALUES ('alice@example.com');
INSERT INTO users (email) VALUES ('alice@example.com');  -- Error!
\`\`\`

### Full-Text Index

\`\`\`sql
-- Search text content efficiently
CREATE FULLTEXT INDEX idx_content ON posts(content);

-- Full-text search
SELECT * FROM posts WHERE MATCH(content) AGAINST('database' IN BOOLEAN MODE);
\`\`\`

### Primary Key Index

\`\`\`sql
-- Automatically created, always indexed
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,  -- Automatically indexed
  username VARCHAR(50) NOT NULL
);
\`\`\`

---

## Creating Indexes

### CREATE INDEX Syntax

\`\`\`sql
-- Basic index
CREATE INDEX index_name ON table_name(column_name);

-- Composite index
CREATE INDEX index_name ON table_name(column1, column2, column3);

-- Unique index
CREATE UNIQUE INDEX index_name ON table_name(column_name);

-- Full-text index
CREATE FULLTEXT INDEX index_name ON table_name(column_name);
\`\`\`

### Indexes in CREATE TABLE

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE INDEX idx_username (username),
  UNIQUE INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
\`\`\`

### Dropping Indexes

\`\`\`sql
-- Drop index
DROP INDEX idx_username ON users;

-- Drop multiple indexes
DROP INDEX idx_email ON users;
DROP INDEX idx_created_at ON users;
\`\`\`

---

## EXPLAIN - Analyzing Query Performance

EXPLAIN shows how the database executes a query.

### Basic EXPLAIN

\`\`\`sql
-- Analyze query execution
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
\`\`\`

**Output:**
\`\`\`
+----+-------------+-------+------+---------------+------+---------+-------+------+-------+
| id | select_type | table | type | possible_keys | key  | key_len | ref   | rows | Extra |
+----+-------------+-------+------+---------------+------+---------+-------+------+-------+
|  1 | SIMPLE      | users | ref  | idx_email     | idx_ | 302     | const |    1 |       |
+----+-------------+-------+------+---------------+------+---------+-------+------+-------+
\`\`\`

### Key EXPLAIN Columns

| Column | Meaning |
|--------|---------|
| type | How table is accessed (const, ref, range, index, ALL) |
| possible_keys | Indexes that could be used |
| key | Index actually used |
| rows | Estimated rows examined |
| Extra | Additional information |

### Type Values (Best to Worst)

| Type | Performance | Description |
|------|-------------|-------------|
| const | ⚡⚡⚡ | Single row lookup |
| ref | ⚡⚡ | Index lookup |
| range | ⚡ | Range scan |
| index | 🐢 | Full index scan |
| ALL | 🐢🐢 | Full table scan |

### EXPLAIN Examples

\`\`\`sql
-- Good: Uses index (type: ref)
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';

-- Bad: Full table scan (type: ALL)
EXPLAIN SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';

-- Good: Uses index (type: range)
EXPLAIN SELECT * FROM products WHERE price > 100;

-- Bad: Full table scan (type: ALL)
EXPLAIN SELECT * FROM products WHERE price * 2 > 100;
\`\`\`

---

## When to Use Indexes

### ✅ Create Indexes On:

1. **WHERE Clause Columns**
\`\`\`sql
-- Frequently searched columns
CREATE INDEX idx_status ON orders(status);
SELECT * FROM orders WHERE status = 'pending';
\`\`\`

2. **JOIN Columns (Foreign Keys)**
\`\`\`sql
-- Foreign key columns
CREATE INDEX idx_user_id ON posts(user_id);
SELECT * FROM posts WHERE user_id = 1;
\`\`\`

3. **ORDER BY Columns**
\`\`\`sql
-- Sorting columns
CREATE INDEX idx_created_at ON posts(created_at);
SELECT * FROM posts ORDER BY created_at DESC;
\`\`\`

4. **GROUP BY Columns**
\`\`\`sql
-- Grouping columns
CREATE INDEX idx_category ON products(category);
SELECT category, COUNT(*) FROM products GROUP BY category;
\`\`\`

5. **High Cardinality Columns**
\`\`\`sql
-- Many unique values
CREATE INDEX idx_email ON users(email);  -- Good (many unique values)
CREATE INDEX idx_gender ON users(gender);  -- Bad (few unique values)
\`\`\`

### ❌ Avoid Indexes On:

1. **Low Cardinality Columns**
\`\`\`sql
-- Few unique values (gender, status, etc.)
-- Index overhead > benefit
\`\`\`

2. **Frequently Updated Columns**
\`\`\`sql
-- Indexes slow down updates
CREATE INDEX idx_last_login ON users(last_login);  -- Bad if updated often
\`\`\`

3. **Small Tables**
\`\`\`sql
-- Full table scan is faster than index lookup
-- Only index if table has 1000+ rows
\`\`\`

4. **Columns with Many NULL Values**
\`\`\`sql
-- Indexes don't help with NULL searches
SELECT * FROM users WHERE phone IS NULL;  -- Index not used
\`\`\`

5. **Columns Used in Calculations**
\`\`\`sql
-- Index not used if column is calculated
SELECT * FROM products WHERE price * 2 > 100;  -- Index not used
SELECT * FROM users WHERE YEAR(created_at) = 2024;  -- Index not used
\`\`\`

---

## Index Strategies

### Strategy 1: Index for WHERE Clauses

\`\`\`sql
-- Identify frequently used WHERE conditions
SELECT * FROM orders WHERE customer_id = 5 AND status = 'pending';

-- Create composite index
CREATE INDEX idx_customer_status ON orders(customer_id, status);
\`\`\`

### Strategy 2: Covering Indexes

\`\`\`sql
-- Include all columns needed in query
CREATE INDEX idx_user_email_name ON users(email, username, created_at);

-- Query uses index only (no table lookup needed)
SELECT username, created_at FROM users WHERE email = 'alice@example.com';
\`\`\`

### Strategy 3: Selective Indexes

\`\`\`sql
-- Index only relevant rows
CREATE INDEX idx_active_users ON users(username) WHERE status = 'active';

-- Smaller index, faster updates
\`\`\`

---

## Index Maintenance

### Monitoring Index Usage

\`\`\`sql
-- Check if index is being used (MySQL 5.6+)
SELECT * FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE OBJECT_SCHEMA = 'your_database'
ORDER BY COUNT_READ DESC;
\`\`\`

### Rebuilding Indexes

\`\`\`sql
-- Rebuild index to optimize
OPTIMIZE TABLE users;

-- Or rebuild specific index
ALTER TABLE users ENGINE=InnoDB;
\`\`\`

### Removing Unused Indexes

\`\`\`sql
-- Drop indexes that aren't used
DROP INDEX idx_unused ON users;
\`\`\`

---

## Practical Examples

### E-Commerce Database Indexing

\`\`\`sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_status (status),
  INDEX idx_order_date (order_date),
  INDEX idx_customer_status (customer_id, status)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  
  INDEX idx_category (category),
  INDEX idx_price (price),
  FULLTEXT INDEX idx_name (name)
);
\`\`\`

### Blog Database Indexing

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  
  UNIQUE INDEX idx_username (username),
  UNIQUE INDEX idx_email (email)
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'draft',
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_status (status),
  INDEX idx_user_status (user_id, status),
  FULLTEXT INDEX idx_title_content (title)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
\`\`\`

---

## Node.js Examples

### Analyzing Query Performance

\`\`\`javascript
// Analyze query with EXPLAIN
async function analyzeQuery(sql) {
  const [result] = await pool.execute('EXPLAIN ' + sql);
  
  console.log('Query Analysis:');
  result.forEach(row => {
    console.log(\`Type: \${row.type}\`);
    console.log(\`Key: \${row.key}\`);
    console.log(\`Rows: \${row.rows}\`);
    console.log(\`Extra: \${row.Extra}\`);
  });
  
  return result;
}

// Usage
await analyzeQuery('SELECT * FROM users WHERE email = ?');
\`\`\`

### Creating Indexes Programmatically

\`\`\`javascript
// Create indexes for a table
async function createIndexes() {
  const indexes = [
    'CREATE INDEX idx_email ON users(email)',
    'CREATE INDEX idx_created_at ON users(created_at)',
    'CREATE INDEX idx_user_id ON posts(user_id)',
    'CREATE INDEX idx_status ON orders(status)'
  ];
  
  for (const sql of indexes) {
    try {
      await pool.execute(sql);
      console.log(\`Created: \${sql}\`);
    } catch (error) {
      if (error.code !== 'ER_DUP_KEYNAME') {
        console.error(error);
      }
    }
  }
}
\`\`\`

---

## Common Mistakes

### 1. Over-Indexing

❌ **Wrong:**
\`\`\`sql
-- Too many indexes slow down inserts/updates
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_address (address)
);
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Index only frequently queried columns
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  
  INDEX idx_username (username),
  INDEX idx_email (email)
);
\`\`\`

### 2. Wrong Composite Index Order

❌ **Wrong:**
\`\`\`sql
-- Index won't be used for email-only queries
CREATE INDEX idx_status_email ON users(status, email);

SELECT * FROM users WHERE email = 'alice@example.com';  -- Index not used!
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Most selective column first
CREATE INDEX idx_email_status ON users(email, status);

SELECT * FROM users WHERE email = 'alice@example.com';  -- Index used!
\`\`\`

### 3. Indexing Calculated Columns

❌ **Wrong:**
\`\`\`sql
-- Index won't help with calculations
CREATE INDEX idx_price ON products(price);

SELECT * FROM products WHERE price * 2 > 100;  -- Index not used!
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Store calculated value or use different approach
SELECT * FROM products WHERE price > 50;  -- Index used!
\`\`\`

### 4. Forgetting Indexes on Foreign Keys

❌ **Wrong:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
  -- No index on user_id!
);
\`\`\`

✅ **Correct:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)  -- Always index foreign keys!
);
\`\`\`

---

## Performance Tips

### 1. Use EXPLAIN Before Optimizing

\`\`\`sql
-- Always check execution plan first
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';

-- Then create index if needed
CREATE INDEX idx_email ON users(email);

-- Verify improvement
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
\`\`\`

### 2. Monitor Index Usage

\`\`\`sql
-- Remove unused indexes
-- They slow down inserts/updates without helping queries
\`\`\`

### 3. Balance Read vs Write Performance

\`\`\`sql
-- More indexes = faster reads, slower writes
-- Find the right balance for your use case
\`\`\`

### 4. Consider Table Size

\`\`\`sql
-- Small tables: indexes may not help
-- Large tables: indexes are essential
-- Rule of thumb: index if table > 1000 rows
\`\`\`

---

## Quick Reference

### Index Types

| Type | Use Case |
|------|----------|
| Single | WHERE, JOIN, ORDER BY |
| Composite | Multiple WHERE conditions |
| Unique | Enforce uniqueness |
| Full-text | Text search |
| Primary | Automatic, always indexed |

### EXPLAIN Type Values

| Type | Speed | Use |
|------|-------|-----|
| const | ⚡⚡⚡ | Single row |
| ref | ⚡⚡ | Index lookup |
| range | ⚡ | Range scan |
| index | 🐢 | Full index |
| ALL | 🐢🐢 | Full table |

### Index Syntax

\`\`\`sql
CREATE [UNIQUE|FULLTEXT] INDEX index_name ON table_name(column1, column2);
DROP INDEX index_name ON table_name;
EXPLAIN SELECT ...;
\`\`\`

---

## Next Steps

Now that you understand indexes, you're ready to:
1. Learn database normalization
2. Master query optimization techniques
3. Monitor and tune database performance
4. Design efficient database schemas

> **Remember:** Indexes are powerful but use them wisely! 🚀
`
,

  contentFa: `
# Indexهای پایگاه داده - بهینه‌سازی عملکرد کوئری

## مقدمه

Indexها ساختارهای پایگاه داده‌ای هستند که عملکرد کوئری را با اجازه دادن به پایگاه داده برای یافتن داده بدون اسکن هر سطر بهبود می‌بخشند. درک زمان و نحوه استفاده از indexها برای بهینه‌سازی پایگاه داده حیاتی است.

**چه چیزی یاد می‌گیرید:**
- نحوه کار indexها
- انواع indexها (تک، ترکیبی، منحصر به فرد، full-text)
- ایجاد و حذف indexها
- EXPLAIN برای تجزیه و تحلیل عملکرد کوئری
- زمان استفاده از indexها
- زمان عدم استفاده از indexها
- نگهداری و نظارت بر indexها
- اشتباهات رایج و بهترین روش‌ها

---

## نحوه کار Indexها

Index مثل فهرست کتاب است - به شما کمک می‌کند اطلاعات را بدون خواندن هر صفحه پیدا کنید.

### بدون Index

\`\`\`
کوئری: SELECT * FROM users WHERE email = 'alice@example.com'

پایگاه داده هر سطر را اسکن می‌کند:
Row 1: bob@example.com ✗
Row 2: charlie@example.com ✗
Row 3: diana@example.com ✗
Row 4: alice@example.com ✓ پیدا شد!
Row 5: eve@example.com ✗
...
(تمام 1,000,000 سطر را اسکن می‌کند!)
\`\`\`

### با Index

\`\`\`
کوئری: SELECT * FROM users WHERE email = 'alice@example.com'

پایگاه داده از index استفاده می‌کند (مثل جستجوی دودویی):
جستجوی Index: alice@example.com → Row 4
فوری پیدا شد!
(فقط چند سطر را اسکن می‌کند!)
\`\`\`

---

## انواع Indexها

### Index تک ستونی

\`\`\`sql
-- ایجاد index برای username
CREATE INDEX idx_username ON users(username);

-- کوئری از index استفاده می‌کند
SELECT * FROM users WHERE username = 'alice';
\`\`\`

### Index ترکیبی (چند ستونی)

\`\`\`sql
-- ایجاد index برای چند ستون
CREATE INDEX idx_user_email ON users(username, email);

-- کوئری از index استفاده می‌کند (هر دو ستون)
SELECT * FROM users WHERE username = 'alice' AND email = 'alice@example.com';

-- کوئری از index استفاده می‌کند (ستون اول)
SELECT * FROM users WHERE username = 'alice';

-- کوئری از index استفاده نمی‌کند (ستون اول گمشده)
SELECT * FROM users WHERE email = 'alice@example.com';
\`\`\`

> **مهم:** Indexهای ترکیبی از چپ به راست کار می‌کنند. ستون اول را در WHERE شامل کنید!

### Unique Index

\`\`\`sql
-- اطمینان از منحصر به فرد بودن و بهبود عملکرد
CREATE UNIQUE INDEX idx_email ON users(email);

-- از ایمیل‌های تکراری جلوگیری می‌کند
INSERT INTO users (email) VALUES ('alice@example.com');
INSERT INTO users (email) VALUES ('alice@example.com');  -- خطا!
\`\`\`

### Full-Text Index

\`\`\`sql
-- جستجوی محتوای متن به طور کارآمد
CREATE FULLTEXT INDEX idx_content ON posts(content);

-- جستجوی full-text
SELECT * FROM posts WHERE MATCH(content) AGAINST('database' IN BOOLEAN MODE);
\`\`\`

---

## ایجاد Indexها

### نحو CREATE INDEX

\`\`\`sql
-- index پایه
CREATE INDEX index_name ON table_name(column_name);

-- index ترکیبی
CREATE INDEX index_name ON table_name(column1, column2, column3);

-- unique index
CREATE UNIQUE INDEX index_name ON table_name(column_name);

-- full-text index
CREATE FULLTEXT INDEX index_name ON table_name(column_name);
\`\`\`

### Indexها در CREATE TABLE

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE INDEX idx_username (username),
  UNIQUE INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
\`\`\`

### حذف Indexها

\`\`\`sql
-- حذف index
DROP INDEX idx_username ON users;

-- حذف چند index
DROP INDEX idx_email ON users;
DROP INDEX idx_created_at ON users;
\`\`\`

---

## EXPLAIN - تجزیه و تحلیل عملکرد کوئری

EXPLAIN نشان می‌دهد که پایگاه داده چگونه کوئری را اجرا می‌کند.

### EXPLAIN پایه

\`\`\`sql
-- تجزیه و تحلیل اجرای کوئری
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
\`\`\`

### ستون‌های کلیدی EXPLAIN

| ستون | معنی |
|------|------|
| type | نحوه دسترسی به جدول (const، ref، range، index، ALL) |
| possible_keys | Indexهایی که می‌توانند استفاده شوند |
| key | Index واقعاً استفاده شده |
| rows | تعداد سطرهای تخمینی بررسی شده |
| Extra | اطلاعات اضافی |

### مقادیر Type (بهترین تا بدترین)

| Type | عملکرد | توضیح |
|------|--------|-------|
| const | ⚡⚡⚡ | جستجوی تک سطر |
| ref | ⚡⚡ | جستجوی index |
| range | ⚡ | اسکن محدوده |
| index | 🐢 | اسکن کامل index |
| ALL | 🐢🐢 | اسکن کامل جدول |

---

## زمان استفاده از Indexها

### ✅ Indexها را برای این موارد ایجاد کنید:

1. **ستون‌های WHERE**
\`\`\`sql
-- ستون‌های جستجو شده اغلب
CREATE INDEX idx_status ON orders(status);
SELECT * FROM orders WHERE status = 'pending';
\`\`\`

2. **ستون‌های JOIN (کلیدهای خارجی)**
\`\`\`sql
-- ستون‌های کلید خارجی
CREATE INDEX idx_user_id ON posts(user_id);
SELECT * FROM posts WHERE user_id = 1;
\`\`\`

3. **ستون‌های ORDER BY**
\`\`\`sql
-- ستون‌های مرتب‌سازی
CREATE INDEX idx_created_at ON posts(created_at);
SELECT * FROM posts ORDER BY created_at DESC;
\`\`\`

4. **ستون‌های GROUP BY**
\`\`\`sql
-- ستون‌های گروه‌بندی
CREATE INDEX idx_category ON products(category);
SELECT category, COUNT(*) FROM products GROUP BY category;
\`\`\`

5. **ستون‌های High Cardinality**
\`\`\`sql
-- بسیاری مقادیر منحصر به فرد
CREATE INDEX idx_email ON users(email);  -- خوب (بسیاری مقادیر منحصر)
CREATE INDEX idx_gender ON users(gender);  -- بد (چند مقدار منحصر)
\`\`\`

### ❌ از Indexها برای این موارد خودداری کنید:

1. **ستون‌های Low Cardinality**
\`\`\`sql
-- چند مقدار منحصر (جنسیت، وضعیت، و غیره)
-- سربار index > منفعت
\`\`\`

2. **ستون‌های اغلب به‌روزرسانی شده**
\`\`\`sql
-- Indexها به‌روزرسانی‌ها را کند می‌کنند
CREATE INDEX idx_last_login ON users(last_login);  -- بد اگر اغلب به‌روزرسانی شود
\`\`\`

3. **جداول کوچک**
\`\`\`sql
-- اسکن کامل جدول سریع‌تر از جستجوی index است
-- فقط اگر جدول 1000+ سطر داشته باشد index کنید
\`\`\`

4. **ستون‌های با بسیاری مقادیر NULL**
\`\`\`sql
-- Indexها برای جستجوی NULL کمک نمی‌کنند
SELECT * FROM users WHERE phone IS NULL;  -- Index استفاده نمی‌شود
\`\`\`

5. **ستون‌های استفاده شده در محاسبات**
\`\`\`sql
-- Index استفاده نمی‌شود اگر ستون محاسبه شود
SELECT * FROM products WHERE price * 2 > 100;  -- Index استفاده نمی‌شود
SELECT * FROM users WHERE YEAR(created_at) = 2024;  -- Index استفاده نمی‌شود
\`\`\`

---

## استراتژی‌های Index

### استراتژی 1: Index برای WHERE

\`\`\`sql
-- شناسایی شرایط WHERE اغلب استفاده شده
SELECT * FROM orders WHERE customer_id = 5 AND status = 'pending';

-- ایجاد index ترکیبی
CREATE INDEX idx_customer_status ON orders(customer_id, status);
\`\`\`

### استراتژی 2: Covering Indexes

\`\`\`sql
-- شامل تمام ستون‌های مورد نیاز در کوئری
CREATE INDEX idx_user_email_name ON users(email, username, created_at);

-- کوئری فقط از index استفاده می‌کند (بدون جستجوی جدول)
SELECT username, created_at FROM users WHERE email = 'alice@example.com';
\`\`\`

---

## اشتباهات رایج

### 1. Over-Indexing

❌ **اشتباه:**
\`\`\`sql
-- بیش از حد indexها درج/به‌روزرسانی‌ها را کند می‌کنند
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_address (address)
);
\`\`\`

✅ **درست:**
\`\`\`sql
-- فقط ستون‌های جستجو شده اغلب را index کنید
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  
  INDEX idx_username (username),
  INDEX idx_email (email)
);
\`\`\`

### 2. ترتیب Index ترکیبی اشتباه

❌ **اشتباه:**
\`\`\`sql
-- Index برای کوئری‌های فقط email استفاده نمی‌شود
CREATE INDEX idx_status_email ON users(status, email);

SELECT * FROM users WHERE email = 'alice@example.com';  -- Index استفاده نمی‌شود!
\`\`\`

✅ **درست:**
\`\`\`sql
-- ستون انتخابی‌تر اول
CREATE INDEX idx_email_status ON users(email, status);

SELECT * FROM users WHERE email = 'alice@example.com';  -- Index استفاده می‌شود!
\`\`\`

### 3. فراموش کردن Indexها برای کلیدهای خارجی

❌ **اشتباه:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
  -- بدون index برای user_id!
);
\`\`\`

✅ **درست:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)  -- همیشه کلیدهای خارجی را index کنید!
);
\`\`\`

---

## نکات عملکرد

### 1. قبل از بهینه‌سازی از EXPLAIN استفاده کنید

\`\`\`sql
-- همیشه ابتدا طرح اجرا را بررسی کنید
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';

-- سپس اگر لازم باشد index ایجاد کنید
CREATE INDEX idx_email ON users(email);

-- بهبود را تأیید کنید
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
\`\`\`

### 2. استفاده از Index را نظارت کنید

\`\`\`sql
-- Indexهای استفاده نشده را حذف کنید
-- آنها درج/به‌روزرسانی‌ها را کند می‌کنند بدون کمک به کوئری‌ها
\`\`\`

### 3. تعادل بین خواندن و نوشتن

\`\`\`sql
-- بیشتر indexها = خواندن سریع‌تر، نوشتن کند‌تر
-- تعادل مناسب را برای مورد استفاده خود پیدا کنید
\`\`\`

---

## مرجع سریع

### انواع Index

| نوع | مورد استفاده |
|-----|------------|
| تک | WHERE، JOIN، ORDER BY |
| ترکیبی | شرایط WHERE متعدد |
| Unique | اعمال منحصر به فرد بودن |
| Full-text | جستجوی متن |
| Primary | خودکار، همیشه indexed |

### نحو Index

\`\`\`sql
CREATE [UNIQUE|FULLTEXT] INDEX index_name ON table_name(column1, column2);
DROP INDEX index_name ON table_name;
EXPLAIN SELECT ...;
\`\`\`

---

## مراحل بعدی

حالا که indexها را فهمیدید، آماده هستید برای:
1. یادگیری نرمال‌سازی پایگاه داده
2. تسلط بر تکنیک‌های بهینه‌سازی کوئری
3. نظارت و تنظیم عملکرد پایگاه داده
4. طراحی طرح‌های پایگاه داده کارآمد

> **به یاد داشته باشید:** Indexها قدرتمند هستند اما با حکمت از آنها استفاده کنید! 🚀
`,

  visualizationId: null,
  exerciseId: null,
};

export default databaseIndexes;
