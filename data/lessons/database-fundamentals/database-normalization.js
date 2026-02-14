export const databaseNormalization = {
  id: 'database-normalization',
  title: 'Database Normalization',
  titleFa: 'نرمال‌سازی پایگاه داده',
  difficulty: 'medium',
  estimatedTime: '60 min',
  
  content: `
# Database Normalization

## Introduction

Database normalization is the process of organizing data to minimize redundancy and improve data integrity. It involves breaking down tables into smaller, related tables and defining relationships between them.

**What you'll learn:**
- Why normalization matters
- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)
- Denormalization trade-offs
- Practical normalization examples
- Common mistakes and best practices

---

## Why Normalization Matters

### Problems with Unnormalized Data

**Redundancy:** Data is repeated unnecessarily
**Update Anomalies:** Changing data in one place requires changes elsewhere
**Insertion Anomalies:** Can't insert data without other data
**Deletion Anomalies:** Deleting data removes unrelated information

### Example: Unnormalized Table

\`\`\`
students table (UNNORMALIZED)
+----+-------+--------+----------+----------+
| id | name  | course | grade    | instructor |
+----+-------+--------+----------+----------+
|  1 | Alice | Math   | A        | Dr. Smith |
|  1 | Alice | Physics| B        | Dr. Jones |
|  2 | Bob   | Math   | B        | Dr. Smith |
|  2 | Bob   | Chemistry| A     | Dr. Brown |
+----+-------+--------+----------+----------+

Problems:
- Student name repeated (redundancy)
- Instructor name repeated (redundancy)
- Can't add course without student
- Deleting student deletes course info
\`\`\`

---

## First Normal Form (1NF)

**Rule:** Each column must contain atomic (indivisible) values. No repeating groups.

### Unnormalized Example

\`\`\`
students table (NOT 1NF)
+----+-------+---------------------------+
| id | name  | courses                   |
+----+-------+---------------------------+
|  1 | Alice | Math, Physics, Chemistry  |
|  2 | Bob   | Math, Biology             |
+----+-------+---------------------------+

Problem: courses column contains multiple values
\`\`\`

### Normalized to 1NF

\`\`\`sql
-- Separate table for courses
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course VARCHAR(50) NOT NULL,
  grade VARCHAR(2),
  
  FOREIGN KEY (student_id) REFERENCES students(id)
);
\`\`\`

**Result:**
\`\`\`
students table (1NF)
+----+-------+
| id | name  |
+----+-------+
|  1 | Alice |
|  2 | Bob   |
+----+-------+

enrollments table (1NF)
+----+------------+--------+-------+
| id | student_id | course | grade |
+----+------------+--------+-------+
|  1 |          1 | Math   | A     |
|  2 |          1 | Physics| B     |
|  3 |          2 | Math   | B     |
+----+------------+--------+-------+
\`\`\`

---

## Second Normal Form (2NF)

**Rule:** Must be in 1NF AND all non-key columns must depend on the entire primary key (no partial dependencies).

### Unnormalized Example (Not 2NF)

\`\`\`
enrollments table (1NF but NOT 2NF)
+----+------------+--------+-------+----------+
| id | student_id | course | grade | instructor |
+----+------------+--------+-------+----------+
|  1 |          1 | Math   | A     | Dr. Smith |
|  2 |          1 | Physics| B     | Dr. Jones |
|  3 |          2 | Math   | B     | Dr. Smith |
+----+------------+--------+-------+----------+

Problem: instructor depends on course, not on (student_id, course)
\`\`\`

### Normalized to 2NF

\`\`\`sql
-- Separate courses table
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  instructor VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

**Result:**
\`\`\`
courses table (2NF)
+----+----------+----------+
| id | name     | instructor |
+----+----------+----------+
|  1 | Math     | Dr. Smith |
|  2 | Physics  | Dr. Jones |
|  3 | Chemistry| Dr. Brown |
+----+----------+----------+

enrollments table (2NF)
+----+------------+-----------+-------+
| id | student_id | course_id | grade |
+----+------------+-----------+-------+
|  1 |          1 |         1 | A     |
|  2 |          1 |         2 | B     |
|  3 |          2 |         1 | B     |
+----+------------+-----------+-------+
\`\`\`

---

## Third Normal Form (3NF)

**Rule:** Must be in 2NF AND no non-key column depends on another non-key column (no transitive dependencies).

### Unnormalized Example (Not 3NF)

\`\`\`
students table (2NF but NOT 3NF)
+----+-------+--------+----------+
| id | name  | city   | country  |
+----+-------+--------+----------+
|  1 | Alice | Boston | USA      |
|  2 | Bob   | London | UK       |
|  3 | Carol | Paris  | France   |
+----+-------+--------+----------+

Problem: country depends on city, not directly on student_id
\`\`\`

### Normalized to 3NF

\`\`\`sql
-- Separate cities table
CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL
);

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  city_id INT NOT NULL,
  
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
\`\`\`

**Result:**
\`\`\`
cities table (3NF)
+----+--------+----------+
| id | name   | country  |
+----+--------+----------+
|  1 | Boston | USA      |
|  2 | London | UK       |
|  3 | Paris  | France   |
+----+--------+----------+

students table (3NF)
+----+-------+---------+
| id | name  | city_id |
+----+-------+---------+
|  1 | Alice |       1 |
|  2 | Bob   |       2 |
|  3 | Carol |       3 |
+----+-------+---------+
\`\`\`

---

## Practical Normalization Example

### Before Normalization (Unnormalized)

\`\`\`
orders table (UNNORMALIZED)
+----+----------+----------+----------+----------+
| id | customer | email    | product  | quantity |
+----+----------+----------+----------+----------+
|  1 | Alice    | alice@.. | Laptop   |        1 |
|  1 | Alice    | alice@.. | Mouse    |        2 |
|  2 | Bob      | bob@..   | Keyboard |        1 |
+----+----------+----------+----------+----------+

Problems:
- Customer name and email repeated
- Can't add order without product
- Deleting order deletes customer info
\`\`\`

### After Normalization (3NF)

\`\`\`sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
\`\`\`

**Result:**
\`\`\`
customers table
+----+-------+----------+
| id | name  | email    |
+----+-------+----------+
|  1 | Alice | alice@.. |
|  2 | Bob   | bob@..   |
+----+-------+----------+

products table
+----+----------+-------+
| id | name     | price |
+----+----------+-------+
|  1 | Laptop   | 1200  |
|  2 | Mouse    |   25  |
|  3 | Keyboard |   75  |
+----+----------+-------+

orders table
+----+-------------+---------------------+
| id | customer_id | order_date          |
+----+-------------+---------------------+
|  1 |           1 | 2024-01-15 10:00:00 |
|  2 |           2 | 2024-01-16 11:00:00 |
+----+-------------+---------------------+

order_items table
+----+----------+------------+----------+
| id | order_id | product_id | quantity |
+----+----------+------------+----------+
|  1 |        1 |          1 |        1 |
|  2 |        1 |          2 |        2 |
|  3 |        2 |          3 |        1 |
+----+----------+------------+----------+
\`\`\`

---

## Denormalization

Sometimes we intentionally break normalization rules for performance.

### When to Denormalize

✅ **Denormalize when:**
- Query performance is critical
- Joins are too expensive
- Data is read-heavy (few writes)
- Reporting requires aggregated data

❌ **Don't denormalize when:**
- Data consistency is critical
- Frequent updates occur
- Storage is limited
- Normalization is sufficient

### Denormalization Example

\`\`\`sql
-- Normalized (requires JOIN)
SELECT o.id, c.name, SUM(oi.quantity * p.price) AS total
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY o.id;

-- Denormalized (no JOIN needed)
CREATE TABLE orders_denormalized (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  customer_name VARCHAR(100),  -- Denormalized
  order_date TIMESTAMP,
  total DECIMAL(10, 2)  -- Denormalized (cached)
);

-- Query is faster but requires maintaining denormalized data
SELECT id, customer_name, total FROM orders_denormalized;
\`\`\`

---

## Node.js Examples

### Querying Normalized Data

\`\`\`javascript
// Get order with customer and products
async function getOrderDetails(orderId) {
  const [order] = await pool.execute(
    \`SELECT 
      o.id,
      o.order_date,
      c.name AS customer_name,
      c.email
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     WHERE o.id = ?\`,
    [orderId]
  );
  
  const [items] = await pool.execute(
    \`SELECT 
      oi.quantity,
      p.name,
      p.price,
      (oi.quantity * p.price) AS line_total
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?\`,
    [orderId]
  );
  
  return { order: order[0], items };
}
\`\`\`

---

## Common Mistakes

### 1. Over-Normalization

❌ **Wrong:**
\`\`\`sql
-- Too many tables, too many JOINs
CREATE TABLE first_names (id INT, name VARCHAR(50));
CREATE TABLE last_names (id INT, name VARCHAR(50));
CREATE TABLE emails (id INT, email VARCHAR(100));
CREATE TABLE users (
  id INT,
  first_name_id INT,
  last_name_id INT,
  email_id INT
);
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Reasonable normalization
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100)
);
\`\`\`

### 2. Ignoring Normalization

❌ **Wrong:**
\`\`\`sql
-- All data in one table
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100),
  customer_email VARCHAR(100),
  product_name VARCHAR(100),
  product_price DECIMAL(10, 2),
  quantity INT
);
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Properly normalized
CREATE TABLE customers (id INT, name VARCHAR(100), email VARCHAR(100));
CREATE TABLE products (id INT, name VARCHAR(100), price DECIMAL(10, 2));
CREATE TABLE orders (id INT, customer_id INT, order_date TIMESTAMP);
CREATE TABLE order_items (id INT, order_id INT, product_id INT, quantity INT);
\`\`\`

### 3. Forgetting Foreign Keys

❌ **Wrong:**
\`\`\`sql
-- No foreign key constraints
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT  -- No constraint!
);
\`\`\`

✅ **Correct:**
\`\`\`sql
-- With foreign key constraints
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

---

## Benefits of Normalization

✅ **Reduces Redundancy:** Data stored once
✅ **Improves Consistency:** Changes in one place
✅ **Prevents Anomalies:** Insert, update, delete issues avoided
✅ **Easier Maintenance:** Clear structure
✅ **Better Performance:** Smaller tables, faster queries

---

## Quick Reference

### Normal Forms

| Form | Rule |
|------|------|
| 1NF | Atomic values, no repeating groups |
| 2NF | 1NF + no partial dependencies |
| 3NF | 2NF + no transitive dependencies |

### Normalization Process

1. **Identify entities** (customers, products, orders)
2. **Define relationships** (one-to-many, many-to-many)
3. **Create tables** for each entity
4. **Add foreign keys** for relationships
5. **Verify normal forms** (1NF, 2NF, 3NF)

---

## Next Steps

Now that you understand normalization, you're ready to:
1. Design efficient database schemas
2. Optimize queries with proper normalization
3. Balance normalization with performance
4. Implement denormalization when needed

> **Remember:** Normalize until it hurts, denormalize until it works! 🎯
`
,

  contentFa: `
# نرمال‌سازی پایگاه داده

## مقدمه

نرمال‌سازی پایگاه داده فرآیند سازماندهی داده برای کاهش تکرار و بهبود یکپارچگی داده است. این شامل تقسیم جداول به جداول کوچکتر و مرتبط و تعریف روابط بین آنها است.

**چه چیزی یاد می‌گیرید:**
- چرا نرمال‌سازی مهم است
- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)
- معامله‌های Denormalization
- مثال‌های عملی نرمال‌سازی
- اشتباهات رایج و بهترین روش‌ها

---

## چرا نرمال‌سازی مهم است

### مشکلات داده‌های غیرنرمال‌شده

**تکرار:** داده بدون ضرورت تکرار می‌شود
**Update Anomalies:** تغییر داده در یک جا نیاز به تغییرات در جاهای دیگر دارد
**Insertion Anomalies:** نمی‌توان داده را بدون داده دیگر درج کرد
**Deletion Anomalies:** حذف داده اطلاعات نامرتبط را حذف می‌کند

### مثال: جدول غیرنرمال‌شده

\`\`\`
جدول students (غیرنرمال‌شده)
+----+-------+--------+-------+----------+
| id | name  | course | grade | instructor |
+----+-------+--------+-------+----------+
|  1 | Alice | Math   | A     | Dr. Smith |
|  1 | Alice | Physics| B     | Dr. Jones |
|  2 | Bob   | Math   | B     | Dr. Smith |
+----+-------+--------+-------+----------+

مشکلات:
- نام دانشجو تکرار می‌شود (تکرار)
- نام مربی تکرار می‌شود (تکرار)
- نمی‌توان سفارش بدون دانشجو اضافه کرد
- حذف دانشجو اطلاعات دوره را حذف می‌کند
\`\`\`

---

## First Normal Form (1NF)

**قانون:** هر ستون باید شامل مقادیر atomic (غیرقابل تقسیم) باشد. بدون گروه‌های تکراری.

### مثال غیرنرمال‌شده

\`\`\`
جدول students (NOT 1NF)
+----+-------+---------------------------+
| id | name  | courses                   |
+----+-------+---------------------------+
|  1 | Alice | Math, Physics, Chemistry  |
|  2 | Bob   | Math, Biology             |
+----+-------+---------------------------+

مشکل: ستون courses شامل چند مقدار است
\`\`\`

### نرمال‌شده به 1NF

\`\`\`sql
-- جدول جداگانه برای دوره‌ها
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course VARCHAR(50) NOT NULL,
  grade VARCHAR(2),
  
  FOREIGN KEY (student_id) REFERENCES students(id)
);
\`\`\`

---

## Second Normal Form (2NF)

**قانون:** باید در 1NF باشد و تمام ستون‌های غیرکلیدی باید به کل کلید اولیه بستگی داشته باشند.

### مثال غیرنرمال‌شده (NOT 2NF)

\`\`\`
جدول enrollments (1NF اما NOT 2NF)
+----+------------+--------+-------+----------+
| id | student_id | course | grade | instructor |
+----+------------+--------+-------+----------+
|  1 |          1 | Math   | A     | Dr. Smith |
|  2 |          1 | Physics| B     | Dr. Jones |
|  3 |          2 | Math   | B     | Dr. Smith |
+----+------------+--------+-------+----------+

مشکل: مربی به دوره بستگی دارد، نه به (student_id, course)
\`\`\`

### نرمال‌شده به 2NF

\`\`\`sql
-- جدول دوره‌های جداگانه
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  instructor VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

---

## Third Normal Form (3NF)

**قانون:** باید در 2NF باشد و هیچ ستون غیرکلیدی نباید به ستون غیرکلیدی دیگری بستگی داشته باشد.

### مثال غیرنرمال‌شده (NOT 3NF)

\`\`\`
جدول students (2NF اما NOT 3NF)
+----+-------+--------+----------+
| id | name  | city   | country  |
+----+-------+--------+----------+
|  1 | Alice | Boston | USA      |
|  2 | Bob   | London | UK       |
|  3 | Carol | Paris  | France   |
+----+-------+--------+----------+

مشکل: کشور به شهر بستگی دارد، نه مستقیماً به student_id
\`\`\`

### نرمال‌شده به 3NF

\`\`\`sql
-- جدول شهرهای جداگانه
CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL
);

CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  city_id INT NOT NULL,
  
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
\`\`\`

---

## مثال عملی نرمال‌سازی

### قبل از نرمال‌سازی (غیرنرمال‌شده)

\`\`\`
جدول orders (غیرنرمال‌شده)
+----+----------+----------+----------+----------+
| id | customer | email    | product  | quantity |
+----+----------+----------+----------+----------+
|  1 | Alice    | alice@.. | Laptop   |        1 |
|  1 | Alice    | alice@.. | Mouse    |        2 |
|  2 | Bob      | bob@..   | Keyboard |        1 |
+----+----------+----------+----------+----------+

مشکلات:
- نام و ایمیل مشتری تکرار می‌شود
- نمی‌توان سفارش بدون محصول اضافه کرد
- حذف سفارش اطلاعات مشتری را حذف می‌کند
\`\`\`

### بعد از نرمال‌سازی (3NF)

\`\`\`sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
\`\`\`

---

## Denormalization

گاهی اوقات ما عمداً قوانین نرمال‌سازی را برای عملکرد نقض می‌کنیم.

### زمان Denormalize کردن

✅ **Denormalize کنید زمانی که:**
- عملکرد کوئری حیاتی است
- JOINها بسیار گران هستند
- داده بیشتر خوانده می‌شود (کم نوشته می‌شود)
- گزارش‌دهی نیاز به داده‌های تجمیع شده دارد

❌ **Denormalize نکنید زمانی که:**
- یکپارچگی داده حیاتی است
- به‌روزرسانی‌های مکرر اتفاق می‌افتند
- فضای ذخیره‌سازی محدود است
- نرمال‌سازی کافی است

---

## اشتباهات رایج

### 1. Over-Normalization

❌ **اشتباه:**
\`\`\`sql
-- بیش از حد جداول، بیش از حد JOINها
CREATE TABLE first_names (id INT, name VARCHAR(50));
CREATE TABLE last_names (id INT, name VARCHAR(50));
CREATE TABLE emails (id INT, email VARCHAR(100));
CREATE TABLE users (
  id INT,
  first_name_id INT,
  last_name_id INT,
  email_id INT
);
\`\`\`

✅ **درست:**
\`\`\`sql
-- نرمال‌سازی معقول
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100)
);
\`\`\`

### 2. نادیده گرفتن نرمال‌سازی

❌ **اشتباه:**
\`\`\`sql
-- تمام داده در یک جدول
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100),
  customer_email VARCHAR(100),
  product_name VARCHAR(100),
  product_price DECIMAL(10, 2),
  quantity INT
);
\`\`\`

✅ **درست:**
\`\`\`sql
-- به درستی نرمال‌شده
CREATE TABLE customers (id INT, name VARCHAR(100), email VARCHAR(100));
CREATE TABLE products (id INT, name VARCHAR(100), price DECIMAL(10, 2));
CREATE TABLE orders (id INT, customer_id INT, order_date TIMESTAMP);
CREATE TABLE order_items (id INT, order_id INT, product_id INT, quantity INT);
\`\`\`

### 3. فراموش کردن کلیدهای خارجی

❌ **اشتباه:**
\`\`\`sql
-- بدون محدودیت کلید خارجی
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT  -- بدون محدودیت!
);
\`\`\`

✅ **درست:**
\`\`\`sql
-- با محدودیت‌های کلید خارجی
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
\`\`\`

---

## مزایای نرمال‌سازی

✅ **کاهش تکرار:** داده یک بار ذخیره می‌شود
✅ **بهبود یکپارچگی:** تغییرات در یک جا
✅ **جلوگیری از Anomalies:** مشکلات درج، به‌روزرسانی، حذف جلوگیری می‌شود
✅ **نگهداری آسان‌تر:** ساختار واضح
✅ **عملکرد بهتر:** جداول کوچکتر، کوئری‌های سریع‌تر

---

## مرجع سریع

### فرم‌های نرمال

| فرم | قانون |
|-----|-------|
| 1NF | مقادیر atomic، بدون گروه‌های تکراری |
| 2NF | 1NF + بدون وابستگی‌های جزئی |
| 3NF | 2NF + بدون وابستگی‌های انتقالی |

### فرآیند نرمال‌سازی

1. **شناسایی موجودیت‌ها** (مشتریان، محصولات، سفارشات)
2. **تعریف روابط** (یک‌به‌بسیاری، بسیاری‌به‌بسیاری)
3. **ایجاد جداول** برای هر موجودیت
4. **اضافه کردن کلیدهای خارجی** برای روابط
5. **تأیید فرم‌های نرمال** (1NF، 2NF، 3NF)

---

## مراحل بعدی

حالا که نرمال‌سازی را فهمیدید، آماده هستید برای:
1. طراحی طرح‌های پایگاه داده کارآمد
2. بهینه‌سازی کوئری‌ها با نرمال‌سازی مناسب
3. تعادل بین نرمال‌سازی و عملکرد
4. پیاده‌سازی denormalization زمانی که لازم است

> **به یاد داشته باشید:** نرمال‌سازی کنید تا درد شود، denormalize کنید تا کار کند! 🎯
`,

  visualizationId: null,
  exerciseId: null,
};

export default databaseNormalization;
