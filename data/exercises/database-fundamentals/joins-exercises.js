export const joinsExercises = {
  id: 'joins-exercises',
  title: 'JOIN and Aggregate Functions Exercises',
  titleFa: 'تمرین‌های JOIN و توابع تجمیعی',
  difficulty: 'medium',
  
  description: `
# JOIN and Aggregate Functions Exercises

Practice your SQL skills with these hands-on exercises covering JOINs and aggregate functions. Each exercise includes starter code, test cases, and hints to guide you.

## Database Schema

All exercises use this sample database:

**users table:**
- id (INT, PRIMARY KEY)
- username (VARCHAR)
- email (VARCHAR)
- created_at (TIMESTAMP)

**posts table:**
- id (INT, PRIMARY KEY)
- user_id (INT, FOREIGN KEY)
- title (VARCHAR)
- content (TEXT)
- created_at (TIMESTAMP)

**comments table:**
- id (INT, PRIMARY KEY)
- post_id (INT, FOREIGN KEY)
- user_id (INT, FOREIGN KEY)
- comment_text (TEXT)
- created_at (TIMESTAMP)

**products table:**
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- price (DECIMAL)
- category (VARCHAR)

**orders table:**
- id (INT, PRIMARY KEY)
- customer_id (INT, FOREIGN KEY)
- order_date (TIMESTAMP)
- total (DECIMAL)

**order_items table:**
- id (INT, PRIMARY KEY)
- order_id (INT, FOREIGN KEY)
- product_id (INT, FOREIGN KEY)
- quantity (INT)
- price (DECIMAL)
`,

  descriptionFa: `
# تمرین‌های JOIN و توابع تجمیعی

مهارت‌های SQL خود را با این تمرین‌های عملی پوشش‌دهنده JOINها و توابع تجمیعی تمرین کنید. هر تمرین شامل کد شروع، موارد آزمایش و راهنمایی‌هایی برای راهنمایی شما است.

## طرح پایگاه داده

تمام تمرین‌ها از این پایگاه داده نمونه استفاده می‌کنند:

**جدول users:**
- id (INT, PRIMARY KEY)
- username (VARCHAR)
- email (VARCHAR)
- created_at (TIMESTAMP)

**جدول posts:**
- id (INT, PRIMARY KEY)
- user_id (INT, FOREIGN KEY)
- title (VARCHAR)
- content (TEXT)
- created_at (TIMESTAMP)

**جدول comments:**
- id (INT, PRIMARY KEY)
- post_id (INT, FOREIGN KEY)
- user_id (INT, FOREIGN KEY)
- comment_text (TEXT)
- created_at (TIMESTAMP)

**جدول products:**
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- price (DECIMAL)
- category (VARCHAR)

**جدول orders:**
- id (INT, PRIMARY KEY)
- customer_id (INT, FOREIGN KEY)
- order_date (TIMESTAMP)
- total (DECIMAL)

**جدول order_items:**
- id (INT, PRIMARY KEY)
- order_id (INT, FOREIGN KEY)
- product_id (INT, FOREIGN KEY)
- quantity (INT)
- price (DECIMAL)
`,

  starterCode: `
-- Exercise 1: Basic INNER JOIN
-- Write a query to get all posts with their author usernames
-- Expected columns: post_id, title, username

SELECT 
  -- YOUR CODE HERE
FROM posts
-- YOUR CODE HERE


-- Exercise 2: LEFT JOIN with COUNT
-- Get all users and count how many posts each has written
-- Expected columns: username, post_count

SELECT 
  -- YOUR CODE HERE
FROM users
-- YOUR CODE HERE
GROUP BY -- YOUR CODE HERE


-- Exercise 3: Multiple JOINs
-- Get posts with author username and comment count
-- Expected columns: post_id, title, username, comment_count

SELECT 
  -- YOUR CODE HERE
FROM posts
-- YOUR CODE HERE
-- YOUR CODE HERE
GROUP BY -- YOUR CODE HERE


-- Exercise 4: Aggregate with HAVING
-- Find categories where average product price is greater than 100
-- Expected columns: category, avg_price, product_count

SELECT 
  -- YOUR CODE HERE
FROM products
GROUP BY -- YOUR CODE HERE
HAVING -- YOUR CODE HERE


-- Exercise 5: Complex Query with JOINs and Aggregates
-- Get top 5 products by total quantity sold
-- Expected columns: product_name, total_quantity, total_revenue

SELECT 
  -- YOUR CODE HERE
FROM products
-- YOUR CODE HERE
GROUP BY -- YOUR CODE HERE
ORDER BY -- YOUR CODE HERE
LIMIT 5
`,

  solution: `
-- Exercise 1: Basic INNER JOIN
SELECT 
  p.id AS post_id,
  p.title,
  u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id;


-- Exercise 2: LEFT JOIN with COUNT
SELECT 
  u.username,
  COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.username;


-- Exercise 3: Multiple JOINs
SELECT 
  p.id AS post_id,
  p.title,
  u.username,
  COUNT(c.id) AS comment_count
FROM posts p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON p.id = c.post_id
GROUP BY p.id, p.title, u.username;


-- Exercise 4: Aggregate with HAVING
SELECT 
  category,
  AVG(price) AS avg_price,
  COUNT(*) AS product_count
FROM products
GROUP BY category
HAVING AVG(price) > 100;


-- Exercise 5: Complex Query with JOINs and Aggregates
SELECT 
  p.name AS product_name,
  SUM(oi.quantity) AS total_quantity,
  SUM(oi.quantity * oi.price) AS total_revenue
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_quantity DESC
LIMIT 5;
`,

  hints: [
    'Exercise 1: Use INNER JOIN to connect posts and users tables on user_id',
    'Exercise 2: Use LEFT JOIN to include users without posts, then GROUP BY and COUNT',
    'Exercise 3: Join posts with users (INNER) and comments (LEFT), then COUNT comments',
    'Exercise 4: Use GROUP BY category, then HAVING to filter groups where AVG(price) > 100',
    'Exercise 5: Join products with order_items, GROUP BY product, SUM quantities and revenue, ORDER BY quantity DESC'
  ],

  hintsFa: [
    'تمرین 1: از INNER JOIN برای اتصال جداول posts و users بر اساس user_id استفاده کنید',
    'تمرین 2: از LEFT JOIN برای شامل کردن کاربران بدون پست استفاده کنید، سپس GROUP BY و COUNT کنید',
    'تمرین 3: posts را با users (INNER) و comments (LEFT) join کنید، سپس comments را COUNT کنید',
    'تمرین 4: از GROUP BY category استفاده کنید، سپس HAVING برای فیلتر کردن گروه‌هایی که AVG(price) > 100',
    'تمرین 5: products را با order_items join کنید، GROUP BY product، SUM quantities و revenue، ORDER BY quantity DESC'
  ],

  testCases: [
    {
      input: 'Exercise 1',
      expected: 'Query returns post_id, title, and username columns with INNER JOIN',
      description: 'Basic INNER JOIN should return only posts with matching users'
    },
    {
      input: 'Exercise 2',
      expected: 'Query returns username and post_count with LEFT JOIN and COUNT',
      description: 'LEFT JOIN should include users with 0 posts'
    },
    {
      input: 'Exercise 3',
      expected: 'Query returns post_id, title, username, and comment_count',
      description: 'Multiple JOINs with aggregation should count comments per post'
    },
    {
      input: 'Exercise 4',
      expected: 'Query returns category, avg_price, and product_count with HAVING',
      description: 'HAVING clause should filter groups where average price > 100'
    },
    {
      input: 'Exercise 5',
      expected: 'Query returns top 5 products by total quantity sold',
      description: 'Complex query should aggregate sales data and order by quantity'
    }
  ]
};

export default joinsExercises;
