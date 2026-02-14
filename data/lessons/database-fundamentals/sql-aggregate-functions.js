export const sqlAggregateFunctions = {
  id: 'sql-aggregate-functions',
  title: 'SQL Aggregate Functions',
  titleFa: 'توابع تجمیعی در SQL',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# SQL Aggregate Functions - Summarizing Data

## Introduction

**Aggregate functions** allow you to perform calculations on sets of rows and return a single result. They're essential for generating reports, analytics, and business intelligence.

**What you'll learn:**
- COUNT function for counting rows
- SUM function for totaling values
- AVG function for calculating averages
- MIN and MAX functions for finding extremes
- GROUP BY clause for grouping data
- HAVING clause for filtering groups
- Practical real-world examples
- Common mistakes and best practices

---

## Sample Data

We'll use this sales database for examples:

**products table:**
\`\`\`
+----+----------+-------+----------+
| id | name     | price | category |
+----+----------+-------+----------+
|  1 | Laptop   | 1200  | Electronics |
|  2 | Mouse    |   25  | Electronics |
|  3 | Keyboard |   75  | Electronics |
|  4 | Desk     |  300  | Furniture |
|  5 | Chair    |  150  | Furniture |
+----+----------+-------+----------+
\`\`\`

**orders table:**
\`\`\`
+----+------------+----------+
| id | order_date | total    |
+----+------------+----------+
|  1 | 2024-01-10 |  1225.00 |
|  2 | 2024-01-15 |   100.00 |
|  3 | 2024-01-20 |  1500.00 |
|  4 | 2024-02-05 |   450.00 |
|  5 | 2024-02-10 |   200.00 |
+----+------------+----------+
\`\`\`

**order_items table:**
\`\`\`
+----+----------+------------+----------+
| id | order_id | product_id | quantity |
+----+----------+------------+----------+
|  1 |        1 |          1 |        1 |
|  2 |        1 |          2 |        1 |
|  3 |        2 |          3 |        1 |
|  4 |        3 |          1 |        1 |
|  5 |        3 |          4 |        1 |
|  6 |        4 |          5 |        3 |
|  7 |        5 |          2 |        8 |
+----+----------+------------+----------+
\`\`\`

---

## COUNT Function

**COUNT** returns the number of rows that match a condition.

### COUNT(*)

\`\`\`sql
-- Count all rows
SELECT COUNT(*) AS total_orders
FROM orders;
\`\`\`

**Output:**
\`\`\`
+---------------+
| total_orders  |
+---------------+
|             5 |
+---------------+
\`\`\`

### COUNT(column)

\`\`\`sql
-- Count non-NULL values in a column
SELECT COUNT(id) AS total_products
FROM products;
\`\`\`

### COUNT(DISTINCT column)

\`\`\`sql
-- Count unique values
SELECT COUNT(DISTINCT category) AS unique_categories
FROM products;
\`\`\`

**Output:**
\`\`\`
+---------------------+
| unique_categories   |
+---------------------+
|                   2 |  ← Electronics, Furniture
+---------------------+
\`\`\`

### Conditional COUNT

\`\`\`sql
-- Count rows matching a condition
SELECT COUNT(*) AS expensive_products
FROM products
WHERE price > 100;
\`\`\`

**Output:**
\`\`\`
+---------------------+
| expensive_products  |
+---------------------+
|                   3 |  ← Laptop, Desk, Chair
+---------------------+
\`\`\`

---

## SUM Function

**SUM** calculates the total of numeric values.

### Basic SUM

\`\`\`sql
-- Calculate total revenue
SELECT SUM(total) AS total_revenue
FROM orders;
\`\`\`

**Output:**
\`\`\`
+----------------+
| total_revenue  |
+----------------+
|      3475.00   |
+----------------+
\`\`\`

### SUM with WHERE

\`\`\`sql
-- Total revenue for January
SELECT SUM(total) AS january_revenue
FROM orders
WHERE MONTH(order_date) = 1;
\`\`\`

### SUM with JOIN

\`\`\`sql
-- Total quantity sold per product
SELECT 
  p.name,
  SUM(oi.quantity) AS total_sold
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_sold DESC;
\`\`\`

**Output:**
\`\`\`
+----------+------------+
| name     | total_sold |
+----------+------------+
| Mouse    |          9 |
| Laptop   |          2 |
| Keyboard |          1 |
| Desk     |          1 |
| Chair    |          3 |
+----------+------------+
\`\`\`

---

## AVG Function

**AVG** calculates the average of numeric values.

### Basic AVG

\`\`\`sql
-- Average product price
SELECT AVG(price) AS avg_price
FROM products;
\`\`\`

**Output:**
\`\`\`
+----------+
| avg_price|
+----------+
|   350.00 |
+----------+
\`\`\`

### AVG by Category

\`\`\`sql
-- Average price per category
SELECT 
  category,
  AVG(price) AS avg_price,
  COUNT(*) AS product_count
FROM products
GROUP BY category;
\`\`\`

**Output:**
\`\`\`
+-------------+----------+---------------+
| category    | avg_price| product_count |
+-------------+----------+---------------+
| Electronics |   100.00 |             3 |
| Furniture   |   225.00 |             2 |
+-------------+----------+---------------+
\`\`\`

### AVG Order Value

\`\`\`sql
-- Average order value
SELECT AVG(total) AS avg_order_value
FROM orders;
\`\`\`

---

## MIN and MAX Functions

**MIN** and **MAX** find the smallest and largest values.

### Finding Extremes

\`\`\`sql
-- Find price range
SELECT 
  MIN(price) AS cheapest,
  MAX(price) AS most_expensive
FROM products;
\`\`\`

**Output:**
\`\`\`
+----------+------------------+
| cheapest | most_expensive   |
+----------+------------------+
|    25.00 |         1200.00  |
+----------+------------------+
\`\`\`

### MIN/MAX with GROUP BY

\`\`\`sql
-- Price range per category
SELECT 
  category,
  MIN(price) AS min_price,
  MAX(price) AS max_price,
  MAX(price) - MIN(price) AS price_range
FROM products
GROUP BY category;
\`\`\`

**Output:**
\`\`\`
+-------------+-----------+-----------+-------------+
| category    | min_price | max_price | price_range |
+-------------+-----------+-----------+-------------+
| Electronics |     25.00 |   1200.00 |     1175.00 |
| Furniture   |    150.00 |    300.00 |      150.00 |
+-------------+-----------+-----------+-------------+
\`\`\`

### Finding Specific Records

\`\`\`sql
-- Find the cheapest product
SELECT name, price
FROM products
WHERE price = (SELECT MIN(price) FROM products);
\`\`\`

---

## GROUP BY Clause

**GROUP BY** groups rows by one or more columns.

### Basic GROUP BY

\`\`\`sql
-- Count products per category
SELECT 
  category,
  COUNT(*) AS product_count
FROM products
GROUP BY category;
\`\`\`

**Output:**
\`\`\`
+-------------+---------------+
| category    | product_count |
+-------------+---------------+
| Electronics |             3 |
| Furniture   |             2 |
+-------------+---------------+
\`\`\`

### Multiple GROUP BY Columns

\`\`\`sql
-- Sales by month and category
SELECT 
  DATE_TRUNC(order_date, MONTH) AS month,
  category,
  SUM(total) AS monthly_sales
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY DATE_TRUNC(order_date, MONTH), category;
\`\`\`

### GROUP BY with ORDER BY

\`\`\`sql
-- Top selling categories
SELECT 
  category,
  SUM(oi.quantity) AS total_quantity,
  SUM(o.total) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
GROUP BY category
ORDER BY total_revenue DESC;
\`\`\`

---

## HAVING Clause

**HAVING** filters groups (like WHERE but for aggregates).

### Basic HAVING

\`\`\`sql
-- Categories with more than 2 products
SELECT 
  category,
  COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\`

**Output:**
\`\`\`
+-------------+---------------+
| category    | product_count |
+-------------+---------------+
| Electronics |             3 |
+-------------+---------------+
\`\`\`

### HAVING with Multiple Conditions

\`\`\`sql
-- Categories with average price > 100 and at least 2 products
SELECT 
  category,
  COUNT(*) AS product_count,
  AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING COUNT(*) >= 2 AND AVG(price) > 100;
\`\`\`

### HAVING vs WHERE

\`\`\`sql
-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping

-- Find categories with expensive products (WHERE)
SELECT category, COUNT(*) AS count
FROM products
WHERE price > 100
GROUP BY category;

-- Find categories where average price is high (HAVING)
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;
\`\`\`

---

## Combining Aggregate Functions

\`\`\`sql
-- Comprehensive sales report
SELECT 
  category,
  COUNT(DISTINCT p.id) AS product_count,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.quantity) AS total_quantity,
  AVG(p.price) AS avg_product_price,
  MIN(p.price) AS cheapest,
  MAX(p.price) AS most_expensive,
  SUM(o.total) AS total_revenue,
  AVG(o.total) AS avg_order_value
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
GROUP BY category
ORDER BY total_revenue DESC;
\`\`\`

---

## Node.js Examples

### Example 1: Sales Dashboard

\`\`\`javascript
// Get sales statistics
async function getSalesStats() {
  const [stats] = await pool.execute(
    \`SELECT 
      COUNT(DISTINCT id) AS total_orders,
      SUM(total) AS total_revenue,
      AVG(total) AS avg_order_value,
      MIN(total) AS min_order,
      MAX(total) AS max_order
     FROM orders\`
  );
  return stats[0];
}

// Usage
const stats = await getSalesStats();
console.log(\`Total Orders: \${stats.total_orders}\`);
console.log(\`Total Revenue: \$\${stats.total_revenue}\`);
\`\`\`

### Example 2: Product Performance

\`\`\`javascript
// Get product sales metrics
async function getProductMetrics() {
  const [metrics] = await pool.execute(
    \`SELECT 
      p.id,
      p.name,
      p.category,
      COUNT(DISTINCT oi.order_id) AS times_ordered,
      SUM(oi.quantity) AS total_quantity,
      AVG(oi.quantity) AS avg_quantity_per_order,
      SUM(oi.quantity * p.price) AS total_revenue
     FROM products p
     LEFT JOIN order_items oi ON p.id = oi.product_id
     GROUP BY p.id, p.name, p.category
     ORDER BY total_revenue DESC\`
  );
  return metrics;
}
\`\`\`

### Example 3: Customer Analysis

\`\`\`javascript
// Get customer spending patterns
async function getCustomerAnalysis() {
  const [analysis] = await pool.execute(
    \`SELECT 
      c.id,
      c.name,
      COUNT(o.id) AS order_count,
      SUM(o.total) AS total_spent,
      AVG(o.total) AS avg_order_value,
      MAX(o.order_date) AS last_order_date
     FROM customers c
     LEFT JOIN orders o ON c.id = o.customer_id
     GROUP BY c.id, c.name
     HAVING COUNT(o.id) > 0
     ORDER BY total_spent DESC\`
  );
  return analysis;
}
\`\`\`

---

## Common Mistakes

### 1. Forgetting GROUP BY

❌ **Wrong:**
\`\`\`sql
SELECT category, COUNT(*)
FROM products;
-- Error: category must be in GROUP BY
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT category, COUNT(*)
FROM products
GROUP BY category;
\`\`\`

### 2. Using WHERE Instead of HAVING

❌ **Wrong:**
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
WHERE COUNT(*) > 2;  -- Error! Can't use aggregate in WHERE
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\`

### 3. NULL Values in Aggregates

❌ **Problem:**
\`\`\`sql
-- NULL values are ignored by aggregates
SELECT AVG(discount) FROM orders;
-- If some orders have NULL discount, they're excluded
\`\`\`

✅ **Solution:**
\`\`\`sql
-- Use COALESCE to handle NULLs
SELECT AVG(COALESCE(discount, 0)) FROM orders;
\`\`\`

### 4. Mixing Aggregates and Non-Aggregates

❌ **Wrong:**
\`\`\`sql
SELECT name, COUNT(*)
FROM products
GROUP BY category;
-- Error: name not in GROUP BY
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;
\`\`\`

---

## Performance Tips

### 1. Use Indexes on GROUP BY Columns

\`\`\`sql
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_order_date ON orders(order_date);
\`\`\`

### 2. Filter Before Grouping

\`\`\`sql
-- Good: Filter first, then aggregate
SELECT category, COUNT(*)
FROM products
WHERE price > 100
GROUP BY category;
\`\`\`

### 3. Limit Aggregates Calculated

\`\`\`sql
-- Good: Only calculate needed aggregates
SELECT category, COUNT(*), SUM(price)
FROM products
GROUP BY category;

-- Avoid: Calculating unnecessary aggregates
\`\`\`

---

## Quick Reference

### Aggregate Functions

| Function | Purpose | Example |
|----------|---------|---------|
| COUNT(*) | Count all rows | COUNT(*) |
| COUNT(col) | Count non-NULL | COUNT(id) |
| SUM(col) | Total values | SUM(price) |
| AVG(col) | Average value | AVG(price) |
| MIN(col) | Minimum value | MIN(price) |
| MAX(col) | Maximum value | MAX(price) |

### GROUP BY Syntax

\`\`\`sql
SELECT column1, aggregate_function(column2)
FROM table
WHERE condition
GROUP BY column1
HAVING aggregate_condition
ORDER BY column1;
\`\`\`

---

## Real-World Examples

### Example 1: Monthly Revenue Report

\`\`\`javascript
async function getMonthlyRevenue() {
  const [report] = await pool.execute(
    \`SELECT 
      DATE_FORMAT(order_date, '%Y-%m') AS month,
      COUNT(*) AS order_count,
      SUM(total) AS revenue,
      AVG(total) AS avg_order_value
     FROM orders
     GROUP BY DATE_FORMAT(order_date, '%Y-%m')
     ORDER BY month DESC\`
  );
  return report;
}
\`\`\`

### Example 2: Top Products

\`\`\`javascript
async function getTopProducts(limit = 10) {
  const [products] = await pool.execute(
    \`SELECT 
      p.id,
      p.name,
      COUNT(DISTINCT oi.order_id) AS times_sold,
      SUM(oi.quantity) AS total_quantity,
      SUM(oi.quantity * p.price) AS revenue
     FROM products p
     JOIN order_items oi ON p.id = oi.product_id
     GROUP BY p.id, p.name
     ORDER BY revenue DESC
     LIMIT ?\`,
    [limit]
  );
  return products;
}
\`\`\`

---

## Next Steps

Now that you understand aggregate functions, you're ready to:
1. Learn subqueries and nested queries
2. Master window functions for advanced analytics
3. Create views for reusable reports
4. Optimize complex analytical queries

> **Remember:** GROUP BY groups data, HAVING filters groups, and aggregates summarize! 📊
`
,

  contentFa: `
# توابع تجمیعی در SQL - خلاصه‌سازی داده

## مقدمه

**توابع تجمیعی** به شما امکان می‌دهند محاسبات را بر روی مجموعه‌ای از سطرها انجام دهید و یک نتیجه واحد برگردانید. آنها برای تولید گزارش‌ها، تجزیه و تحلیل و هوش تجاری ضروری هستند.

**چه چیزی یاد می‌گیرید:**
- تابع COUNT برای شمارش سطرها
- تابع SUM برای جمع‌بندی مقادیر
- تابع AVG برای محاسبه میانگین
- توابع MIN و MAX برای یافتن مقادیر حدی
- بند GROUP BY برای گروه‌بندی داده
- بند HAVING برای فیلتر کردن گروه‌ها
- مثال‌های عملی واقعی
- اشتباهات رایج و بهترین روش‌ها

---

## تابع COUNT

**COUNT** تعداد سطرهایی را برمی‌گرداند که با شرط مطابقت دارند.

### COUNT(*)

\`\`\`sql
-- شمارش تمام سطرها
SELECT COUNT(*) AS total_orders
FROM orders;
\`\`\`

**خروجی:**
\`\`\`
+---------------+
| total_orders  |
+---------------+
|             5 |
+---------------+
\`\`\`

### COUNT(column)

\`\`\`sql
-- شمارش مقادیر غیر NULL در یک ستون
SELECT COUNT(id) AS total_products
FROM products;
\`\`\`

### COUNT(DISTINCT column)

\`\`\`sql
-- شمارش مقادیر منحصر به فرد
SELECT COUNT(DISTINCT category) AS unique_categories
FROM products;
\`\`\`

---

## تابع SUM

**SUM** مجموع مقادیر عددی را محاسبه می‌کند.

### SUM پایه

\`\`\`sql
-- محاسبه کل درآمد
SELECT SUM(total) AS total_revenue
FROM orders;
\`\`\`

### SUM با WHERE

\`\`\`sql
-- کل درآمد برای ژانویه
SELECT SUM(total) AS january_revenue
FROM orders
WHERE MONTH(order_date) = 1;
\`\`\`

---

## تابع AVG

**AVG** میانگین مقادیر عددی را محاسبه می‌کند.

### AVG پایه

\`\`\`sql
-- میانگین قیمت محصول
SELECT AVG(price) AS avg_price
FROM products;
\`\`\`

### AVG بر اساس دسته

\`\`\`sql
-- میانگین قیمت برای هر دسته
SELECT 
  category,
  AVG(price) AS avg_price,
  COUNT(*) AS product_count
FROM products
GROUP BY category;
\`\`\`

---

## توابع MIN و MAX

**MIN** و **MAX** کوچکترین و بزرگترین مقادیر را پیدا می‌کنند.

### یافتن مقادیر حدی

\`\`\`sql
-- یافتن محدوده قیمت
SELECT 
  MIN(price) AS cheapest,
  MAX(price) AS most_expensive
FROM products;
\`\`\`

### MIN/MAX با GROUP BY

\`\`\`sql
-- محدوده قیمت برای هر دسته
SELECT 
  category,
  MIN(price) AS min_price,
  MAX(price) AS max_price
FROM products
GROUP BY category;
\`\`\`

---

## بند GROUP BY

**GROUP BY** سطرها را بر اساس یک یا چند ستون گروه‌بندی می‌کند.

### GROUP BY پایه

\`\`\`sql
-- شمارش محصولات برای هر دسته
SELECT 
  category,
  COUNT(*) AS product_count
FROM products
GROUP BY category;
\`\`\`

### GROUP BY با چند ستون

\`\`\`sql
-- فروش بر اساس ماه و دسته
SELECT 
  DATE_TRUNC(order_date, MONTH) AS month,
  category,
  SUM(total) AS monthly_sales
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY DATE_TRUNC(order_date, MONTH), category;
\`\`\`

---

## بند HAVING

**HAVING** گروه‌ها را فیلتر می‌کند (مثل WHERE اما برای توابع تجمیعی).

### HAVING پایه

\`\`\`sql
-- دسته‌هایی با بیش از 2 محصول
SELECT 
  category,
  COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\`

### HAVING در مقابل WHERE

\`\`\`sql
-- WHERE سطرها را قبل از گروه‌بندی فیلتر می‌کند
-- HAVING گروه‌ها را بعد از گروه‌بندی فیلتر می‌کند

-- یافتن دسته‌هایی با محصولات گران (WHERE)
SELECT category, COUNT(*) AS count
FROM products
WHERE price > 100
GROUP BY category;

-- یافتن دسته‌هایی که میانگین قیمت بالا است (HAVING)
SELECT category, AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 100;
\`\`\`

---

## ترکیب توابع تجمیعی

\`\`\`sql
-- گزارش فروش جامع
SELECT 
  category,
  COUNT(DISTINCT p.id) AS product_count,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.quantity) AS total_quantity,
  AVG(p.price) AS avg_product_price,
  MIN(p.price) AS cheapest,
  MAX(p.price) AS most_expensive,
  SUM(o.total) AS total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
GROUP BY category
ORDER BY total_revenue DESC;
\`\`\`

---

## مثال‌های Node.js

### مثال 1: داشبورد فروش

\`\`\`javascript
// دریافت آمار فروش
async function getSalesStats() {
  const [stats] = await pool.execute(
    \`SELECT 
      COUNT(DISTINCT id) AS total_orders,
      SUM(total) AS total_revenue,
      AVG(total) AS avg_order_value
     FROM orders\`
  );
  return stats[0];
}
\`\`\`

### مثال 2: عملکرد محصول

\`\`\`javascript
// دریافت معیارهای فروش محصول
async function getProductMetrics() {
  const [metrics] = await pool.execute(
    \`SELECT 
      p.id,
      p.name,
      p.category,
      COUNT(DISTINCT oi.order_id) AS times_ordered,
      SUM(oi.quantity) AS total_quantity,
      SUM(oi.quantity * p.price) AS total_revenue
     FROM products p
     LEFT JOIN order_items oi ON p.id = oi.product_id
     GROUP BY p.id, p.name, p.category
     ORDER BY total_revenue DESC\`
  );
  return metrics;
}
\`\`\`

---

## اشتباهات رایج

### 1. فراموش کردن GROUP BY

❌ **اشتباه:**
\`\`\`sql
SELECT category, COUNT(*)
FROM products;
-- خطا: category باید در GROUP BY باشد
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT category, COUNT(*)
FROM products
GROUP BY category;
\`\`\`

### 2. استفاده از WHERE به جای HAVING

❌ **اشتباه:**
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
WHERE COUNT(*) > 2;  -- خطا! نمی‌توان از تابع تجمیعی در WHERE استفاده کرد
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\`

### 3. مخلوط کردن توابع تجمیعی و غیر تجمیعی

❌ **اشتباه:**
\`\`\`sql
SELECT name, COUNT(*)
FROM products
GROUP BY category;
-- خطا: name در GROUP BY نیست
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;
\`\`\`

---

## نکات عملکرد

### 1. استفاده از Indexes برای ستون‌های GROUP BY

\`\`\`sql
CREATE INDEX idx_category ON products(category);
CREATE INDEX idx_order_date ON orders(order_date);
\`\`\`

### 2. فیلتر کردن قبل از گروه‌بندی

\`\`\`sql
-- خوب: ابتدا فیلتر کنید، سپس تجمیع کنید
SELECT category, COUNT(*)
FROM products
WHERE price > 100
GROUP BY category;
\`\`\`

---

## مرجع سریع

### توابع تجمیعی

| تابع | هدف | مثال |
|------|-----|------|
| COUNT(*) | شمارش تمام سطرها | COUNT(*) |
| COUNT(col) | شمارش غیر NULL | COUNT(id) |
| SUM(col) | مجموع مقادیر | SUM(price) |
| AVG(col) | میانگین | AVG(price) |
| MIN(col) | کمترین مقدار | MIN(price) |
| MAX(col) | بیشترین مقدار | MAX(price) |

### نحو GROUP BY

\`\`\`sql
SELECT column1, aggregate_function(column2)
FROM table
WHERE condition
GROUP BY column1
HAVING aggregate_condition
ORDER BY column1;
\`\`\`

---

## مثال‌های واقعی

### مثال 1: گزارش درآمد ماهانه

\`\`\`javascript
async function getMonthlyRevenue() {
  const [report] = await pool.execute(
    \`SELECT 
      DATE_FORMAT(order_date, '%Y-%m') AS month,
      COUNT(*) AS order_count,
      SUM(total) AS revenue,
      AVG(total) AS avg_order_value
     FROM orders
     GROUP BY DATE_FORMAT(order_date, '%Y-%m')
     ORDER BY month DESC\`
  );
  return report;
}
\`\`\`

### مثال 2: محصولات برتر

\`\`\`javascript
async function getTopProducts(limit = 10) {
  const [products] = await pool.execute(
    \`SELECT 
      p.id,
      p.name,
      COUNT(DISTINCT oi.order_id) AS times_sold,
      SUM(oi.quantity) AS total_quantity,
      SUM(oi.quantity * p.price) AS revenue
     FROM products p
     JOIN order_items oi ON p.id = oi.product_id
     GROUP BY p.id, p.name
     ORDER BY revenue DESC
     LIMIT ?\`,
    [limit]
  );
  return products;
}
\`\`\`

---

## مراحل بعدی

حالا که توابع تجمیعی را فهمیدید، آماده هستید برای:
1. یادگیری subqueryها و کوئری‌های تودرتو
2. تسلط بر توابع پنجره برای تجزیه و تحلیل پیشرفته
3. ایجاد views برای گزارش‌های قابل استفاده مجدد
4. بهینه‌سازی کوئری‌های تجزیه و تحلیلی پیچیده

> **به یاد داشته باشید:** GROUP BY داده را گروه‌بندی می‌کند، HAVING گروه‌ها را فیلتر می‌کند، و توابع تجمیعی خلاصه می‌کنند! 📊
`,

  visualizationId: null,
  exerciseId: 'joins-exercises',
};

export default sqlAggregateFunctions;
