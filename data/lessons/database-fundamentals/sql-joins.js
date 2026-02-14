export const sqlJoins = {
  id: 'sql-joins',
  title: 'SQL JOIN Operations',
  titleFa: 'عملیات JOIN در SQL',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# SQL JOIN Operations - Combining Data from Multiple Tables

## Introduction

**JOIN** operations are one of the most powerful features of SQL. They allow you to combine data from multiple tables based on related columns, enabling you to work with normalized databases efficiently.

**What you'll learn:**
- Understanding table relationships
- INNER JOIN for matching records
- LEFT JOIN for all records from left table
- RIGHT JOIN for all records from right table
- FULL OUTER JOIN alternatives in MySQL/MariaDB
- Visual diagrams for each JOIN type
- Practical real-world examples
- Common mistakes and best practices

---

## Understanding Table Relationships

Before diving into JOINs, let's understand how tables relate to each other.

### Sample Database Schema

We'll use a simple blog database with three tables:

**users table:**
\`\`\`
+----+----------+----------------------+
| id | username | email                |
+----+----------+----------------------+
|  1 | alice    | alice@example.com    |
|  2 | bob      | bob@example.com      |
|  3 | charlie  | charlie@example.com  |
|  4 | diana    | diana@example.com    |
+----+----------+----------------------+
\`\`\`

**posts table:**
\`\`\`
+----+---------+------------------+---------------------+
| id | user_id | title            | created_at          |
+----+---------+------------------+---------------------+
|  1 |       1 | Alice First Post | 2024-01-15 10:00:00 |
|  2 |       1 | Alice Second     | 2024-01-16 11:00:00 |
|  3 |       2 | Bob Article      | 2024-01-17 12:00:00 |
|  4 |       5 | Orphan Post      | 2024-01-18 13:00:00 |
+----+---------+------------------+---------------------+
\`\`\`

**comments table:**
\`\`\`
+----+---------+---------+------------------+
| id | post_id | user_id | comment_text     |
+----+---------+---------+------------------+
|  1 |       1 |       2 | Nice post!       |
|  2 |       1 |       3 | Great article    |
|  3 |       2 |       2 | Thanks for this  |
+----+---------+---------+------------------+
\`\`\`

**Relationships:**
- \`posts.user_id\` → \`users.id\` (each post belongs to a user)
- \`comments.post_id\` → \`posts.id\` (each comment belongs to a post)
- \`comments.user_id\` → \`users.id\` (each comment belongs to a user)

---

## INNER JOIN

**INNER JOIN** returns only the rows where there is a match in both tables.


### Visual Representation

\`\`\`
Table A          Table B          Result (INNER JOIN)
┌─────┐          ┌─────┐          ┌─────┐
│  A  │          │  B  │          │ A∩B │  ← Only matching records
│ ┌───┴───┐      │     │          └─────┘
│ │ A ∩ B │      │     │
│ └───┬───┘      │     │
│     │          │     │
└─────┘          └─────┘
\`\`\`

### Basic INNER JOIN Syntax

\`\`\`sql
-- Get posts with their author information
SELECT 
  posts.id,
  posts.title,
  users.username,
  users.email
FROM posts
INNER JOIN users ON posts.user_id = users.id;
\`\`\`

**Output:**
\`\`\`
+----+------------------+----------+-------------------+
| id | title            | username | email             |
+----+------------------+----------+-------------------+
|  1 | Alice First Post | alice    | alice@example.com |
|  2 | Alice Second     | alice    | alice@example.com |
|  3 | Bob Article      | bob      | bob@example.com   |
+----+------------------+----------+-------------------+
\`\`\`

> **Note:** Post with id=4 (user_id=5) is excluded because user_id=5 doesn't exist in users table.

### Alternative Syntax (Implicit JOIN)

\`\`\`sql
-- Same result using WHERE clause (older style)
SELECT 
  posts.id,
  posts.title,
  users.username
FROM posts, users
WHERE posts.user_id = users.id;
\`\`\`

> **Best Practice:** Use explicit INNER JOIN syntax for better readability!

### Using Table Aliases

\`\`\`sql
-- Shorter and more readable with aliases
SELECT 
  p.id,
  p.title,
  p.created_at,
  u.username,
  u.email
FROM posts p
INNER JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;
\`\`\`

### Multiple Conditions in JOIN

\`\`\`sql
-- Join with multiple conditions
SELECT 
  p.title,
  u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id 
  AND u.status = 'active'
  AND p.published = 1;
\`\`\`

### Node.js Example with INNER JOIN

\`\`\`javascript
// Get posts with author information
async function getPostsWithAuthors() {
  const [rows] = await pool.execute(
    \`SELECT 
      p.id,
      p.title,
      p.created_at,
      u.username,
      u.email
     FROM posts p
     INNER JOIN users u ON p.user_id = u.id
     ORDER BY p.created_at DESC
     LIMIT ?\`,
    [20]  // Get 20 most recent posts
  );
  return rows;
}

// Usage
const posts = await getPostsWithAuthors();
console.log(posts);
\`\`\`

---

## LEFT JOIN (LEFT OUTER JOIN)

**LEFT JOIN** returns all rows from the left table, and matching rows from the right table. If no match, NULL values are returned for right table columns.

### Visual Representation

\`\`\`
Table A          Table B          Result (LEFT JOIN)
┌─────┐          ┌─────┐          ┌─────────┐
│  A  │          │  B  │          │ A + A∩B │  ← All from A + matches
│ ┌───┴───┐      │     │          └─────────┘
│ │ A ∩ B │      │     │
│ └───┬───┘      │     │
│     │          │     │
└─────┘          └─────┘
\`\`\`

### Basic LEFT JOIN Syntax

\`\`\`sql
-- Get all users and their posts (including users without posts)
SELECT 
  u.id,
  u.username,
  p.id AS post_id,
  p.title
FROM users u
LEFT JOIN posts p ON u.user_id = p.user_id
ORDER BY u.username;
\`\`\`

**Output:**
\`\`\`
+----+----------+---------+------------------+
| id | username | post_id | title            |
+----+----------+---------+------------------+
|  1 | alice    |       1 | Alice First Post |
|  1 | alice    |       2 | Alice Second     |
|  2 | bob      |       3 | Bob Article      |
|  3 | charlie  |    NULL | NULL             |  ← No posts
|  4 | diana    |    NULL | NULL             |  ← No posts
+----+----------+---------+------------------+
\`\`\`

> **Key Point:** Charlie and Diana appear in results even though they have no posts!


### Finding Records Without Matches

\`\`\`sql
-- Find users who haven't written any posts
SELECT 
  u.id,
  u.username,
  u.email
FROM users u
LEFT JOIN posts p ON u.user_id = p.user_id
WHERE p.id IS NULL;
\`\`\`

**Output:**
\`\`\`
+----+----------+---------------------+
| id | username | email               |
+----+----------+---------------------+
|  3 | charlie  | charlie@example.com |
|  4 | diana    | diana@example.com   |
+----+----------+---------------------+
\`\`\`

> **Technique:** Use \`WHERE right_table.id IS NULL\` to find unmatched records!

### Counting Related Records

\`\`\`sql
-- Count posts per user (including users with 0 posts)
SELECT 
  u.username,
  COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.user_id = p.user_id
GROUP BY u.id, u.username
ORDER BY post_count DESC;
\`\`\`

**Output:**
\`\`\`
+----------+------------+
| username | post_count |
+----------+------------+
| alice    |          2 |
| bob      |          1 |
| charlie  |          0 |  ← LEFT JOIN ensures 0, not excluded
| diana    |          0 |
+----------+------------+
\`\`\`

### Node.js Example with LEFT JOIN

\`\`\`javascript
// Get all users with their post counts
async function getUsersWithPostCounts() {
  const [rows] = await pool.execute(
    \`SELECT 
      u.id,
      u.username,
      u.email,
      COUNT(p.id) AS post_count,
      MAX(p.created_at) AS last_post_date
     FROM users u
     LEFT JOIN posts p ON u.user_id = p.user_id
     GROUP BY u.id, u.username, u.email
     ORDER BY post_count DESC\`
  );
  return rows;
}

// Find inactive users (no posts in last 30 days)
async function getInactiveUsers() {
  const [rows] = await pool.execute(
    \`SELECT 
      u.id,
      u.username,
      u.email
     FROM users u
     LEFT JOIN posts p ON u.user_id = p.user_id 
       AND p.created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
     WHERE p.id IS NULL\`
  );
  return rows;
}
\`\`\`

---

## RIGHT JOIN (RIGHT OUTER JOIN)

**RIGHT JOIN** returns all rows from the right table, and matching rows from the left table. If no match, NULL values are returned for left table columns.

### Visual Representation

\`\`\`
Table A          Table B          Result (RIGHT JOIN)
┌─────┐          ┌─────┐          ┌─────────┐
│  A  │          │  B  │          │ A∩B + B │  ← All from B + matches
│ ┌───┴───┐      │     │          └─────────┘
│ │ A ∩ B │      │     │
│ └───┬───┘      │     │
│     │          │     │
└─────┘          └─────┘
\`\`\`

### Basic RIGHT JOIN Syntax

\`\`\`sql
-- Get all posts and their authors (including orphan posts)
SELECT 
  p.id,
  p.title,
  u.username,
  u.email
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id
ORDER BY p.id;
\`\`\`

**Output:**
\`\`\`
+----+------------------+----------+-------------------+
| id | title            | username | email             |
+----+------------------+----------+-------------------+
|  1 | Alice First Post | alice    | alice@example.com |
|  2 | Alice Second     | alice    | alice@example.com |
|  3 | Bob Article      | bob      | bob@example.com   |
|  4 | Orphan Post      | NULL     | NULL              |  ← No author
+----+------------------+----------+-------------------+
\`\`\`

> **Note:** Post with id=4 appears even though user_id=5 doesn't exist!

### Finding Orphan Records

\`\`\`sql
-- Find posts without valid authors (data integrity issue)
SELECT 
  p.id,
  p.title,
  p.user_id AS invalid_user_id
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id
WHERE u.id IS NULL;
\`\`\`

**Output:**
\`\`\`
+----+-------------+-----------------+
| id | title       | invalid_user_id |
+----+-------------+-----------------+
|  4 | Orphan Post |               5 |
+----+-------------+-----------------+
\`\`\`

> **Use Case:** RIGHT JOIN is useful for finding data integrity issues!

### RIGHT JOIN vs LEFT JOIN

\`\`\`sql
-- These two queries are equivalent:

-- Using RIGHT JOIN
SELECT p.title, u.username
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id;

-- Using LEFT JOIN (more common)
SELECT p.title, u.username
FROM posts p
LEFT JOIN users u ON p.user_id = u.id;
\`\`\`

> **Best Practice:** Most developers prefer LEFT JOIN because it's more intuitive to read from left to right!


---

## FULL OUTER JOIN (MySQL/MariaDB Alternative)

**FULL OUTER JOIN** returns all rows from both tables, with NULL values where there's no match. MySQL and MariaDB don't support FULL OUTER JOIN directly, but we can simulate it!

### Visual Representation

\`\`\`
Table A          Table B          Result (FULL OUTER JOIN)
┌─────┐          ┌─────┐          ┌─────────────┐
│  A  │          │  B  │          │ A + A∩B + B │  ← Everything!
│ ┌───┴───┐      │     │          └─────────────┘
│ │ A ∩ B │      │     │
│ └───┬───┘      │     │
│     │          │     │
└─────┘          └─────┘
\`\`\`

### Simulating FULL OUTER JOIN with UNION

\`\`\`sql
-- Get all users and all posts (matched and unmatched)
SELECT 
  u.id AS user_id,
  u.username,
  p.id AS post_id,
  p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id

UNION

SELECT 
  u.id AS user_id,
  u.username,
  p.id AS post_id,
  p.title
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id;
\`\`\`

**Output:**
\`\`\`
+---------+----------+---------+------------------+
| user_id | username | post_id | title            |
+---------+----------+---------+------------------+
|       1 | alice    |       1 | Alice First Post |
|       1 | alice    |       2 | Alice Second     |
|       2 | bob      |       3 | Bob Article      |
|       3 | charlie  |    NULL | NULL             |  ← User without posts
|       4 | diana    |    NULL | NULL             |  ← User without posts
|    NULL | NULL     |       4 | Orphan Post      |  ← Post without user
+---------+----------+---------+------------------+
\`\`\`

> **How it works:** LEFT JOIN gets all users + matches, RIGHT JOIN gets all posts + matches, UNION combines them!

### Alternative: Using UNION ALL with Exclusion

\`\`\`sql
-- More efficient version
SELECT u.id, u.username, p.id AS post_id, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id

UNION ALL

SELECT u.id, u.username, p.id AS post_id, p.title
FROM posts p
LEFT JOIN users u ON p.user_id = u.id
WHERE u.id IS NULL;
\`\`\`

> **Performance Tip:** This version is faster because it avoids duplicate checking!

---

## Multiple JOINs

You can join more than two tables in a single query!

### Three-Table JOIN

\`\`\`sql
-- Get posts with author and comment information
SELECT 
  p.id AS post_id,
  p.title,
  u.username AS author,
  c.comment_text,
  cu.username AS commenter
FROM posts p
INNER JOIN users u ON p.user_id = u.id
LEFT JOIN comments c ON p.id = c.post_id
LEFT JOIN users cu ON c.user_id = cu.id
ORDER BY p.id, c.id;
\`\`\`

**Output:**
\`\`\`
+---------+------------------+-------+------------------+-----------+
| post_id | title            | author| comment_text     | commenter |
+---------+------------------+-------+------------------+-----------+
|       1 | Alice First Post | alice | Nice post!       | bob       |
|       1 | Alice First Post | alice | Great article    | charlie   |
|       2 | Alice Second     | alice | Thanks for this  | bob       |
|       3 | Bob Article      | bob   | NULL             | NULL      |
+---------+------------------+-------+------------------+-----------+
\`\`\`

### Complex JOIN Example

\`\`\`sql
-- Get user statistics: posts, comments made, comments received
SELECT 
  u.id,
  u.username,
  COUNT(DISTINCT p.id) AS posts_written,
  COUNT(DISTINCT c1.id) AS comments_made,
  COUNT(DISTINCT c2.id) AS comments_received
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
LEFT JOIN comments c1 ON u.id = c1.user_id
LEFT JOIN comments c2 ON p.id = c2.post_id
GROUP BY u.id, u.username
ORDER BY posts_written DESC;
\`\`\`

### Node.js Example with Multiple JOINs

\`\`\`javascript
// Get post details with author and comments
async function getPostDetails(postId) {
  const [rows] = await pool.execute(
    \`SELECT 
      p.id,
      p.title,
      p.content,
      p.created_at,
      u.username AS author,
      u.email AS author_email,
      c.id AS comment_id,
      c.comment_text,
      c.created_at AS comment_date,
      cu.username AS commenter
     FROM posts p
     INNER JOIN users u ON p.user_id = u.id
     LEFT JOIN comments c ON p.id = c.post_id
     LEFT JOIN users cu ON c.user_id = cu.id
     WHERE p.id = ?
     ORDER BY c.created_at ASC\`,
    [postId]
  );
  
  // Transform flat results into nested structure
  if (rows.length === 0) return null;
  
  const post = {
    id: rows[0].id,
    title: rows[0].title,
    content: rows[0].content,
    created_at: rows[0].created_at,
    author: {
      username: rows[0].author,
      email: rows[0].author_email
    },
    comments: rows
      .filter(row => row.comment_id !== null)
      .map(row => ({
        id: row.comment_id,
        text: row.comment_text,
        created_at: row.comment_date,
        commenter: row.commenter
      }))
  };
  
  return post;
}

// Usage
const post = await getPostDetails(1);
console.log(post);
\`\`\`


---

## SELF JOIN

A **SELF JOIN** is when a table is joined with itself. Useful for hierarchical data!

### Example: Employee-Manager Relationship

\`\`\`sql
-- employees table
+----+----------+------------+
| id | name     | manager_id |
+----+----------+------------+
|  1 | Alice    |       NULL |  ← CEO (no manager)
|  2 | Bob      |          1 |  ← Reports to Alice
|  3 | Charlie  |          1 |  ← Reports to Alice
|  4 | Diana    |          2 |  ← Reports to Bob
+----+----------+------------+

-- Get employees with their manager names
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Output:**
\`\`\`
+----------+---------+
| employee | manager |
+----------+---------+
| Alice    | NULL    |  ← CEO has no manager
| Bob      | Alice   |
| Charlie  | Alice   |
| Diana    | Bob     |
+----------+---------+
\`\`\`

### Finding Hierarchies

\`\`\`sql
-- Get all employees under a specific manager
SELECT 
  e.id,
  e.name AS employee,
  m.name AS direct_manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
WHERE m.id = ?;  -- Manager ID parameter
\`\`\`

### Node.js Example with SELF JOIN

\`\`\`javascript
// Get organizational hierarchy
async function getTeamHierarchy(managerId) {
  const [rows] = await pool.execute(
    \`SELECT 
      e.id,
      e.name,
      e.email,
      e.position,
      m.name AS manager_name
     FROM employees e
     LEFT JOIN employees m ON e.manager_id = m.id
     WHERE e.manager_id = ? OR e.id = ?
     ORDER BY e.name\`,
    [managerId, managerId]
  );
  return rows;
}
\`\`\`

---

## CROSS JOIN (Cartesian Product)

**CROSS JOIN** returns the Cartesian product of two tables (every row from table A combined with every row from table B).

### Basic CROSS JOIN

---

## SELF JOIN

A **SELF JOIN** is when a table is joined with itself. Useful for hierarchical data!

### Example: Employee-Manager Relationship

\`\`\`sql
-- employees table
+----+----------+------------+
| id | name     | manager_id |
+----+----------+------------+
|  1 | Alice    |       NULL |  ← CEO (no manager)
|  2 | Bob      |          1 |  ← Reports to Alice
|  3 | Charlie  |          1 |  ← Reports to Alice
|  4 | Diana    |          2 |  ← Reports to Bob
+----+----------+------------+

-- Get employees with their manager names
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Output:**
\`\`\`
+----------+---------+
| employee | manager |
+----------+---------+
| Alice    | NULL    |  ← CEO has no manager
| Bob      | Alice   |
| Charlie  | Alice   |
| Diana    | Bob     |
+----------+---------+
\`\`\`

### Finding Hierarchies

\`\`\`sql
-- Get all employees under a specific manager
SELECT 
  e.id,
  e.name AS employee,
  m.name AS direct_manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
WHERE m.id = ?;  -- Manager ID parameter
\`\`\`

### Node.js Example with SELF JOIN

\`\`\`javascript
// Get organizational hierarchy
async function getTeamHierarchy(managerId) {
  const [rows] = await pool.execute(
    \`SELECT 
      e.id,
      e.name,
      e.email,
      e.position,
      m.name AS manager_name
     FROM employees e
     LEFT JOIN employees m ON e.manager_id = m.id
     WHERE e.manager_id = ? OR e.id = ?
     ORDER BY e.name\`,
    [managerId, managerId]
  );
  return rows;
}
\`\`\`

---

## CROSS JOIN (Cartesian Product)

**CROSS JOIN** returns the Cartesian product of two tables (every row from table A combined with every row from table B).

### Basic CROSS JOIN

\`\`\`sql
-- Generate all possible combinations
SELECT 
  colors.name,
  sizes.name
FROM colors
CROSS JOIN sizes;
\`\`\`

**Example:**
\`\`\`
colors: red, blue, green
sizes: S, M, L

Result:
red-S, red-M, red-L,
blue-S, blue-M, blue-L,
green-S, green-M, green-L
\`\`\`

> **Use Case:** Generating combinations, creating date ranges, or building lookup tables!

---

## Common Mistakes

### 1. Forgetting the JOIN Condition

❌ **Wrong:**
\`\`\`sql
SELECT p.title, u.username
FROM posts p
INNER JOIN users u;  -- Missing ON clause!
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id;
\`\`\`

### 2. Using Wrong JOIN Type

❌ **Wrong:**
\`\`\`sql
-- This excludes users without posts
SELECT u.username, COUNT(p.id)
FROM users u
INNER JOIN posts p ON u.id = p.user_id
GROUP BY u.id;
\`\`\`

✅ **Correct:**
\`\`\`sql
-- This includes users without posts
SELECT u.username, COUNT(p.id)
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id;
\`\`\`

### 3. Ambiguous Column Names

❌ **Wrong:**
\`\`\`sql
SELECT id, username, title
FROM posts p
INNER JOIN users u ON p.user_id = u.id;
-- Error: which 'id'? posts.id or users.id?
\`\`\`

✅ **Correct:**
\`\`\`sql
SELECT p.id, u.username, p.title
FROM posts p
INNER JOIN users u ON p.user_id = u.id;
\`\`\`

### 4. Incorrect NULL Handling in WHERE

❌ **Wrong:**
\`\`\`sql
-- This removes rows with NULL values!
SELECT u.username, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.id = NULL;  -- Wrong!
\`\`\`

✅ **Correct:**
\`\`\`sql
-- This correctly finds users without posts
SELECT u.username, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.id IS NULL;
\`\`\`

### 5. Performance: Joining on Calculated Columns

❌ **Wrong:**
\`\`\`sql
-- Slow! Calculation happens for every row
SELECT *
FROM orders o
INNER JOIN customers c ON YEAR(o.created_at) = YEAR(c.created_at);
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Fast! Use indexed columns
SELECT *
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

---

## Performance Tips

### 1. Use Indexes on JOIN Columns

\`\`\`sql
-- Create indexes on foreign keys
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
\`\`\`

### 2. Filter Before Joining

\`\`\`sql
-- Good: Filter first, then join
SELECT p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.status = 'published'
  AND u.status = 'active';
\`\`\`

### 3. Limit Columns Selected

\`\`\`sql
-- Good: Select only needed columns
SELECT p.id, p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id;

-- Avoid: SELECT * (gets all columns from both tables)
\`\`\`

### 4. Use EXPLAIN to Analyze Queries

\`\`\`sql
-- Check query execution plan
EXPLAIN SELECT p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.status = 'published';
\`\`\`

---

## Quick Reference

### JOIN Types Comparison

| JOIN Type | Left Table | Right Table | Result |
|-----------|-----------|------------|--------|
| INNER JOIN | Matched | Matched | Only matches |
| LEFT JOIN | All | Matched | All left + matches |
| RIGHT JOIN | Matched | All | Matches + all right |
| FULL OUTER | All | All | Everything |
| CROSS JOIN | All | All | Cartesian product |

### JOIN Syntax

\`\`\`sql
SELECT columns
FROM table1
[INNER | LEFT | RIGHT] JOIN table2 ON condition
[WHERE additional_conditions]
[ORDER BY columns];
\`\`\`

### Multiple JOINs

\`\`\`sql
SELECT columns
FROM table1
JOIN table2 ON condition1
JOIN table3 ON condition2
JOIN table4 ON condition3;
\`\`\`

---

## Real-World Examples

### Example 1: Blog Analytics

\`\`\`javascript
// Get blog statistics
async function getBlogStats() {
  const [stats] = await pool.execute(
    \`SELECT 
      u.username,
      COUNT(DISTINCT p.id) AS total_posts,
      COUNT(DISTINCT c.id) AS total_comments,
      MAX(p.created_at) AS last_post_date
     FROM users u
     LEFT JOIN posts p ON u.id = p.user_id
     LEFT JOIN comments c ON p.id = c.post_id
     GROUP BY u.id, u.username
     ORDER BY total_posts DESC\`
  );
  return stats;
}
\`\`\`

### Example 2: E-Commerce Orders

\`\`\`javascript
// Get order details with customer and product info
async function getOrderDetails(orderId) {
  const [order] = await pool.execute(
    \`SELECT 
      o.id,
      o.order_date,
      o.total_amount,
      c.name AS customer_name,
      c.email,
      oi.product_id,
      p.name AS product_name,
      p.price,
      oi.quantity,
      (p.price * oi.quantity) AS line_total
     FROM orders o
     INNER JOIN customers c ON o.customer_id = c.id
     INNER JOIN order_items oi ON o.id = oi.order_id
     INNER JOIN products p ON oi.product_id = p.id
     WHERE o.id = ?\`,
    [orderId]
  );
  return order;
}
\`\`\`

### Example 3: Finding Data Issues

\`\`\`javascript
// Find orphaned records (data integrity check)
async function findOrphanedPosts() {
  const [orphans] = await pool.execute(
    \`SELECT 
      p.id,
      p.title,
      p.user_id
     FROM posts p
     LEFT JOIN users u ON p.user_id = u.id
     WHERE u.id IS NULL\`
  );
  return orphans;
}
\`\`\`

---

## Next Steps

Now that you understand JOINs, you're ready to:
1. Learn aggregate functions (COUNT, SUM, AVG) with GROUP BY
2. Master subqueries and nested queries
3. Optimize complex queries with indexes
4. Work with views for reusable queries

> **Remember:** Choose the right JOIN type for your use case! INNER JOIN for required matches, LEFT JOIN for optional data! 🎯
`
,

  contentFa: `
# عملیات JOIN در SQL - ترکیب داده از چند جدول

## مقدمه

عملیات **JOIN** یکی از قدرتمندترین ویژگی‌های SQL است. آنها به شما امکان می‌دهند داده را از چند جدول بر اساس ستون‌های مرتبط ترکیب کنید، که امکان کار کارآمد با پایگاه‌های داده نرمال‌شده را فراهم می‌کند.

**چه چیزی یاد می‌گیرید:**
- درک روابط بین جداول
- INNER JOIN برای رکوردهای منطبق
- LEFT JOIN برای همه رکوردهای جدول چپ
- RIGHT JOIN برای همه رکوردهای جدول راست
- جایگزین‌های FULL OUTER JOIN در MySQL/MariaDB
- نمودارهای بصری برای هر نوع JOIN
- مثال‌های عملی واقعی
- اشتباهات رایج و بهترین روش‌ها

---

## درک روابط بین جداول

قبل از شروع JOINها، بیایید روابط بین جداول را درک کنیم.

### طرح پایگاه داده نمونه

ما از یک پایگاه داده وبلاگ ساده با سه جدول استفاده می‌کنیم:

**جدول users:**
\`\`\`
+----+----------+----------------------+
| id | username | email                |
+----+----------+----------------------+
|  1 | alice    | alice@example.com    |
|  2 | bob      | bob@example.com      |
|  3 | charlie  | charlie@example.com  |
|  4 | diana    | diana@example.com    |
+----+----------+----------------------+
\`\`\`

**جدول posts:**
\`\`\`
+----+---------+------------------+---------------------+
| id | user_id | title            | created_at          |
+----+---------+------------------+---------------------+
|  1 |       1 | Alice First Post | 2024-01-15 10:00:00 |
|  2 |       1 | Alice Second     | 2024-01-16 11:00:00 |
|  3 |       2 | Bob Article      | 2024-01-17 12:00:00 |
|  4 |       5 | Orphan Post      | 2024-01-18 13:00:00 |
+----+---------+------------------+---------------------+
\`\`\`

**روابط:**
- \`posts.user_id\` → \`users.id\` (هر پست متعلق به یک کاربر است)
- \`comments.post_id\` → \`posts.id\` (هر نظر متعلق به یک پست است)

---

## INNER JOIN

**INNER JOIN** فقط سطرهایی را برمی‌گرداند که در هر دو جدول تطابق دارند.

### نحو پایه INNER JOIN

\`\`\`sql
-- دریافت پست‌ها با اطلاعات نویسنده
SELECT 
  posts.id,
  posts.title,
  users.username,
  users.email
FROM posts
INNER JOIN users ON posts.user_id = users.id;
\`\`\`

**خروجی:**
\`\`\`
+----+------------------+----------+-------------------+
| id | title            | username | email             |
+----+------------------+----------+-------------------+
|  1 | Alice First Post | alice    | alice@example.com |
|  2 | Alice Second     | alice    | alice@example.com |
|  3 | Bob Article      | bob      | bob@example.com   |
+----+------------------+----------+-------------------+
\`\`\`

> **نکته:** پست با id=4 (user_id=5) حذف می‌شود زیرا user_id=5 در جدول users وجود ندارد.

### استفاده از نام‌های مختصر (Aliases)

\`\`\`sql
-- کوتاه‌تر و خوانایی بهتر با aliases
SELECT 
  p.id,
  p.title,
  p.created_at,
  u.username,
  u.email
FROM posts p
INNER JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC;
\`\`\`

### مثال Node.js با INNER JOIN

\`\`\`javascript
// دریافت پست‌ها با اطلاعات نویسنده
async function getPostsWithAuthors() {
  const [rows] = await pool.execute(
    \`SELECT 
      p.id,
      p.title,
      p.created_at,
      u.username,
      u.email
     FROM posts p
     INNER JOIN users u ON p.user_id = u.id
     ORDER BY p.created_at DESC
     LIMIT ?\`,
    [20]
  );
  return rows;
}
\`\`\`

---

## LEFT JOIN

**LEFT JOIN** همه سطرهای جدول چپ را برمی‌گرداند، و سطرهای منطبق از جدول راست. اگر تطابق نباشد، مقادیر NULL برگردانده می‌شوند.

### نحو پایه LEFT JOIN

\`\`\`sql
-- دریافت تمام کاربران و پست‌های آنها (شامل کاربران بدون پست)
SELECT 
  u.id,
  u.username,
  p.id AS post_id,
  p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
ORDER BY u.username;
\`\`\`

**خروجی:**
\`\`\`
+----+----------+---------+------------------+
| id | username | post_id | title            |
+----+----------+---------+------------------+
|  1 | alice    |       1 | Alice First Post |
|  1 | alice    |       2 | Alice Second     |
|  2 | bob      |       3 | Bob Article      |
|  3 | charlie  |    NULL | NULL             |  ← بدون پست
|  4 | diana    |    NULL | NULL             |  ← بدون پست
+----+----------+---------+------------------+
\`\`\`

> **نکته کلیدی:** چارلی و دیانا در نتایج ظاهر می‌شوند حتی اگر پستی نداشته باشند!

### یافتن رکوردهای بدون تطابق

\`\`\`sql
-- یافتن کاربرانی که هیچ پستی ننوشته‌اند
SELECT 
  u.id,
  u.username,
  u.email
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.id IS NULL;
\`\`\`

### مثال Node.js با LEFT JOIN

\`\`\`javascript
// دریافت تمام کاربران با تعداد پست‌های آنها
async function getUsersWithPostCounts() {
  const [rows] = await pool.execute(
    \`SELECT 
      u.id,
      u.username,
      u.email,
      COUNT(p.id) AS post_count,
      MAX(p.created_at) AS last_post_date
     FROM users u
     LEFT JOIN posts p ON u.id = p.user_id
     GROUP BY u.id, u.username, u.email
     ORDER BY post_count DESC\`
  );
  return rows;
}
\`\`\`

---

## RIGHT JOIN

**RIGHT JOIN** همه سطرهای جدول راست را برمی‌گرداند، و سطرهای منطبق از جدول چپ.

### نحو پایه RIGHT JOIN

\`\`\`sql
-- دریافت تمام پست‌ها و نویسندگان آنها (شامل پست‌های یتیم)
SELECT 
  p.id,
  p.title,
  u.username,
  u.email
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id
ORDER BY p.id;
\`\`\`

**خروجی:**
\`\`\`
+----+------------------+----------+-------------------+
| id | title            | username | email             |
+----+------------------+----------+-------------------+
|  1 | Alice First Post | alice    | alice@example.com |
|  2 | Alice Second     | alice    | alice@example.com |
|  3 | Bob Article      | bob      | bob@example.com   |
|  4 | Orphan Post      | NULL     | NULL              |  ← بدون نویسنده
+----+------------------+----------+-------------------+
\`\`\`

---

## SELF JOIN

**SELF JOIN** زمانی است که یک جدول با خودش join می‌شود. برای داده‌های سلسله‌مراتبی مفید است!

### مثال: رابطه کارمند-مدیر

\`\`\`sql
-- جدول employees
+----+----------+------------+
| id | name     | manager_id |
+----+----------+------------+
|  1 | Alice    |       NULL |  ← مدیر عامل
|  2 | Bob      |          1 |  ← تحت نظارت Alice
|  3 | Charlie  |          1 |  ← تحت نظارت Alice
|  4 | Diana    |          2 |  ← تحت نظارت Bob
+----+----------+------------+

-- دریافت کارمندان با نام مدیر آنها
SELECT 
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**خروجی:**
\`\`\`
+----------+---------+
| employee | manager |
+----------+---------+
| Alice    | NULL    |  ← مدیر عامل مدیری ندارد
| Bob      | Alice   |
| Charlie  | Alice   |
| Diana    | Bob     |
+----------+---------+
\`\`\`

---

## اشتباهات رایج

### 1. فراموش کردن شرط JOIN

❌ **اشتباه:**
\`\`\`sql
SELECT p.title, u.username
FROM posts p
INNER JOIN users u;  -- بدون بند ON!
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id;
\`\`\`

### 2. استفاده از نوع JOIN اشتباه

❌ **اشتباه:**
\`\`\`sql
-- این کاربران بدون پست را حذف می‌کند
SELECT u.username, COUNT(p.id)
FROM users u
INNER JOIN posts p ON u.id = p.user_id
GROUP BY u.id;
\`\`\`

✅ **درست:**
\`\`\`sql
-- این کاربران بدون پست را شامل می‌کند
SELECT u.username, COUNT(p.id)
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id;
\`\`\`

### 3. مقادیر NULL در WHERE

❌ **اشتباه:**
\`\`\`sql
SELECT u.username, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.id = NULL;  -- اشتباه!
\`\`\`

✅ **درست:**
\`\`\`sql
SELECT u.username, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
WHERE p.id IS NULL;
\`\`\`

---

## نکات عملکرد

### 1. استفاده از Indexes برای ستون‌های JOIN

\`\`\`sql
-- ایجاد indexes برای foreign keys
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
\`\`\`

### 2. فیلتر کردن قبل از JOIN

\`\`\`sql
-- خوب: ابتدا فیلتر کنید، سپس join کنید
SELECT p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.status = 'published'
  AND u.status = 'active';
\`\`\`

### 3. انتخاب فقط ستون‌های مورد نیاز

\`\`\`sql
-- خوب: فقط ستون‌های لازم را انتخاب کنید
SELECT p.id, p.title, u.username
FROM posts p
INNER JOIN users u ON p.user_id = u.id;
\`\`\`

---

## مرجع سریع

### مقایسه انواع JOIN

| نوع JOIN | جدول چپ | جدول راست | نتیجه |
|----------|---------|-----------|-------|
| INNER JOIN | منطبق | منطبق | فقط منطبق‌ها |
| LEFT JOIN | همه | منطبق | همه چپ + منطبق‌ها |
| RIGHT JOIN | منطبق | همه | منطبق‌ها + همه راست |
| CROSS JOIN | همه | همه | حاصل‌ضرب دکارتی |

### نحو JOIN

\`\`\`sql
SELECT columns
FROM table1
[INNER | LEFT | RIGHT] JOIN table2 ON condition
[WHERE additional_conditions]
[ORDER BY columns];
\`\`\`

---

## مثال‌های واقعی

### مثال 1: آمار وبلاگ

\`\`\`javascript
// دریافت آمار وبلاگ
async function getBlogStats() {
  const [stats] = await pool.execute(
    \`SELECT 
      u.username,
      COUNT(DISTINCT p.id) AS total_posts,
      COUNT(DISTINCT c.id) AS total_comments
     FROM users u
     LEFT JOIN posts p ON u.id = p.user_id
     LEFT JOIN comments c ON p.id = c.post_id
     GROUP BY u.id, u.username
     ORDER BY total_posts DESC\`
  );
  return stats;
}
\`\`\`

### مثال 2: جزئیات سفارش

\`\`\`javascript
// دریافت جزئیات سفارش با اطلاعات مشتری و محصول
async function getOrderDetails(orderId) {
  const [order] = await pool.execute(
    \`SELECT 
      o.id,
      o.order_date,
      c.name AS customer_name,
      p.name AS product_name,
      oi.quantity
     FROM orders o
     INNER JOIN customers c ON o.customer_id = c.id
     INNER JOIN order_items oi ON o.id = oi.order_id
     INNER JOIN products p ON oi.product_id = p.id
     WHERE o.id = ?\`,
    [orderId]
  );
  return order;
}
\`\`\`

---

## مراحل بعدی

حالا که JOINها را فهمیدید، آماده هستید برای:
1. یادگیری توابع تجمیعی (COUNT، SUM، AVG) با GROUP BY
2. تسلط بر subqueryها و کوئری‌های تودرتو
3. بهینه‌سازی کوئری‌های پیچیده با indexes
4. کار با views برای کوئری‌های قابل استفاده مجدد

> **به یاد داشته باشید:** نوع JOIN مناسب را برای مورد استفاده خود انتخاب کنید! INNER JOIN برای تطابق‌های ضروری، LEFT JOIN برای داده‌های اختیاری! 🎯
`,

  visualizationId: null,
  exerciseId: 'joins-exercises',
};

export default sqlJoins;
