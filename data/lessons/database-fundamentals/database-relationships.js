export const databaseRelationships = {
  id: 'database-relationships',
  title: 'Database Relationships',
  titleFa: 'روابط پایگاه داده',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Database Relationships

## Introduction

Database relationships define how tables connect to each other. Understanding relationships is crucial for designing normalized databases and writing efficient queries.

**What you'll learn:**
- One-to-One relationships
- One-to-Many relationships
- Many-to-Many relationships
- Foreign keys and referential integrity
- Cascade delete and update
- Practical relationship examples
- Common mistakes and best practices

---

## One-to-One Relationships

A one-to-one relationship means each record in table A is related to exactly one record in table B, and vice versa.

### Visual Representation

\`\`\`
users table          user_profiles table
┌─────────┐          ┌──────────────┐
│ id (PK) │ ────────→ │ id (PK)      │
│ name    │ 1:1      │ user_id (FK) │
│ email   │          │ bio          │
└─────────┘          │ avatar_url   │
                     └──────────────┘
\`\`\`

### Implementation

\`\`\`sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- User profiles table (one-to-one)
CREATE TABLE user_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,  -- UNIQUE makes it one-to-one
  bio TEXT,
  avatar_url VARCHAR(255),
  phone VARCHAR(20),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

### Querying One-to-One

\`\`\`sql
-- Get user with profile
SELECT 
  u.username,
  u.email,
  p.bio,
  p.avatar_url,
  p.phone
FROM users u
LEFT JOIN user_profiles p ON u.id = p.user_id;
\`\`\`

### When to Use One-to-One

✅ **Use when:**
- Separating optional data (profiles, settings)
- Splitting large tables for performance
- Storing sensitive data separately
- Different access patterns

❌ **Avoid when:**
- Data is always accessed together
- Creates unnecessary complexity

---

## One-to-Many Relationships

A one-to-many relationship means each record in table A can be related to multiple records in table B, but each record in table B is related to only one record in table A.

### Visual Representation

\`\`\`
users table          posts table
┌─────────┐          ┌──────────┐
│ id (PK) │ ────────→ │ id (PK)  │
│ name    │ 1:N      │ user_id  │
│ email   │          │ title    │
└─────────┘          │ content  │
                     └──────────┘
                     
One user can have many posts
\`\`\`

### Implementation

\`\`\`sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- Posts table (many posts per user)
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Comments table (many comments per post)
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id)
);
\`\`\`

### Querying One-to-Many

\`\`\`sql
-- Get user with all posts
SELECT 
  u.username,
  p.id AS post_id,
  p.title,
  p.created_at
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
ORDER BY u.username, p.created_at DESC;

-- Count posts per user
SELECT 
  u.username,
  COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.username;
\`\`\`

### Most Common Relationship

One-to-Many is the most common relationship type in databases!

---

## Many-to-Many Relationships

A many-to-many relationship means records in table A can be related to multiple records in table B, and vice versa. This requires a junction table.

### Visual Representation

\`\`\`
students table       enrollments table      courses table
┌──────────┐         ┌──────────────┐       ┌──────────┐
│ id (PK)  │ ────────│ student_id   │       │ id (PK)  │
│ name     │ N:M    │ course_id    │ ─────→ │ name     │
│ email    │         │ grade        │       │ code     │
└──────────┘         └──────────────┘       └──────────┘
                     
One student can take many courses
One course can have many students
\`\`\`

### Implementation

\`\`\`sql
-- Students table
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  enrollment_date DATE NOT NULL
);

-- Courses table
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  credits INT NOT NULL,
  instructor VARCHAR(100) NOT NULL
);

-- Junction table (many-to-many)
CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id),
  INDEX idx_student_id (student_id),
  INDEX idx_course_id (course_id)
);
\`\`\`

### Querying Many-to-Many

\`\`\`sql
-- Get all courses for a student
SELECT 
  c.code,
  c.name,
  c.credits,
  e.grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.id = 1;

-- Get all students in a course
SELECT 
  s.name,
  s.email,
  e.grade
FROM courses c
JOIN enrollments e ON c.id = e.course_id
JOIN students s ON e.student_id = s.id
WHERE c.id = 5;

-- Count students per course
SELECT 
  c.code,
  c.name,
  COUNT(e.id) AS student_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.code, c.name;
\`\`\`

### Junction Table Best Practices

✅ **Do:**
- Add a primary key (auto-increment id)
- Add timestamps (created_at, updated_at)
- Add indexes on foreign keys
- Add UNIQUE constraint on foreign key pairs
- Add additional data (grade, status, etc.)

❌ **Don't:**
- Use only composite primary key (add id column)
- Forget indexes on foreign keys
- Forget UNIQUE constraint to prevent duplicates

---

## Foreign Keys and Referential Integrity

Foreign keys ensure data consistency by enforcing relationships.

### Creating Foreign Keys

\`\`\`sql
-- Basic foreign key
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Foreign key with cascade delete
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Foreign key with cascade update
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  
  FOREIGN KEY (customer_id) REFERENCES customers(id) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);
\`\`\`

### Cascade Options

| Option | Behavior |
|--------|----------|
| RESTRICT | Prevent deletion if referenced |
| CASCADE | Delete related records |
| SET NULL | Set foreign key to NULL |
| NO ACTION | Same as RESTRICT |

### Example: Cascade Delete

\`\`\`sql
-- When user is deleted, all posts are deleted
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Delete user (posts are automatically deleted)
DELETE FROM users WHERE id = 1;
\`\`\`

---

## Practical Relationship Examples

### E-Commerce Database

\`\`\`sql
-- One-to-Many: Customer → Orders
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX idx_customer_id (customer_id)
);

-- Many-to-Many: Orders ↔ Products (via order_items)
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE KEY unique_order_product (order_id, product_id)
);
\`\`\`

### Social Network Database

\`\`\`sql
-- One-to-Many: User → Posts
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Many-to-Many: Users ↔ Users (followers)
CREATE TABLE follows (
  id INT PRIMARY KEY AUTO_INCREMENT,
  follower_id INT NOT NULL,
  following_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_follow (follower_id, following_id),
  INDEX idx_follower_id (follower_id),
  INDEX idx_following_id (following_id)
);

-- One-to-Many: Post → Comments
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

---

## Node.js Examples

### Querying Relationships

\`\`\`javascript
// Get user with all posts and comments
async function getUserWithContent(userId) {
  const [user] = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
  
  const [posts] = await pool.execute(
    \`SELECT p.*, COUNT(c.id) AS comment_count
     FROM posts p
     LEFT JOIN comments c ON p.id = c.post_id
     WHERE p.user_id = ?
     GROUP BY p.id\`,
    [userId]
  );
  
  return { user: user[0], posts };
}

// Get course with all enrolled students
async function getCourseWithStudents(courseId) {
  const [course] = await pool.execute(
    'SELECT * FROM courses WHERE id = ?',
    [courseId]
  );
  
  const [students] = await pool.execute(
    \`SELECT s.*, e.grade
     FROM students s
     JOIN enrollments e ON s.id = e.student_id
     WHERE e.course_id = ?\`,
    [courseId]
  );
  
  return { course: course[0], students };
}

// Get student's courses
async function getStudentCourses(studentId) {
  const [courses] = await pool.execute(
    \`SELECT c.*, e.grade
     FROM courses c
     JOIN enrollments e ON c.id = e.course_id
     WHERE e.student_id = ?\`,
    [studentId]
  );
  
  return courses;
}
\`\`\`

---

## Common Mistakes

### 1. Missing Foreign Key

❌ **Wrong:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT  -- No foreign key!
);
\`\`\`

✅ **Correct:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

### 2. Wrong Relationship Type

❌ **Wrong (using one-to-many for many-to-many):**
\`\`\`sql
-- Can't store multiple courses per student
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  course_id INT  -- Only one course!
);
\`\`\`

✅ **Correct (using junction table):**
\`\`\`sql
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

### 3. Forgetting Cascade Delete

❌ **Problem:**
\`\`\`sql
-- Deleting user fails if posts exist
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

DELETE FROM users WHERE id = 1;  -- Error: foreign key constraint
\`\`\`

✅ **Solution:**
\`\`\`sql
-- Deleting user automatically deletes posts
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

DELETE FROM users WHERE id = 1;  -- Works!
\`\`\`

### 4. Missing Unique Constraint on Junction Table

❌ **Wrong:**
\`\`\`sql
-- Can enroll same student in same course multiple times
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

✅ **Correct:**
\`\`\`sql
-- Prevents duplicate enrollments
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

---

## Performance Tips

### 1. Index Foreign Keys

\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)  -- Always index foreign keys!
);
\`\`\`

### 2. Use Appropriate Cascade Options

\`\`\`sql
-- CASCADE for dependent data
CREATE TABLE posts (
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- RESTRICT for independent data
CREATE TABLE orders (
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);
\`\`\`

### 3. Denormalize When Necessary

\`\`\`sql
-- Store frequently accessed data to avoid joins
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  username VARCHAR(50),  -- Denormalized for performance
  title VARCHAR(200) NOT NULL
);
\`\`\`

---

## Quick Reference

### Relationship Types

| Type | Example | Junction Table |
|------|---------|-----------------|
| 1:1 | User ↔ Profile | No |
| 1:N | User → Posts | No |
| N:M | Students ↔ Courses | Yes |

### Foreign Key Syntax

\`\`\`sql
FOREIGN KEY (column) REFERENCES table(column)
  [ON DELETE {RESTRICT|CASCADE|SET NULL}]
  [ON UPDATE {RESTRICT|CASCADE|SET NULL}]
\`\`\`

---

## Next Steps

Now that you understand relationships, you're ready to:
1. Learn database normalization
2. Master complex queries with multiple relationships
3. Optimize queries with proper indexing
4. Design scalable database schemas

> **Remember:** Good relationships are the foundation of a well-designed database! 🔗
`
,

  contentFa: `
# روابط پایگاه داده

## مقدمه

روابط پایگاه داده تعریف می‌کنند که جداول چگونه به یکدیگر متصل می‌شوند. درک روابط برای طراحی پایگاه‌های داده نرمال‌شده و نوشتن کوئری‌های کارآمد حیاتی است.

**چه چیزی یاد می‌گیرید:**
- روابط یک‌به‌یک
- روابط یک‌به‌بسیاری
- روابط بسیاری‌به‌بسیاری
- کلیدهای خارجی و یکپارچگی ارجاعی
- حذف و به‌روزرسانی cascade
- مثال‌های عملی رابطه
- اشتباهات رایج و بهترین روش‌ها

---

## روابط یک‌به‌یک

رابطه یک‌به‌یک به این معنی است که هر رکورد در جدول A دقیقاً با یک رکورد در جدول B مرتبط است، و برعکس.

### پیاده‌سازی

\`\`\`sql
-- جدول users
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- جدول user_profiles (یک‌به‌یک)
CREATE TABLE user_profiles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,  -- UNIQUE آن را یک‌به‌یک می‌کند
  bio TEXT,
  avatar_url VARCHAR(255),
  phone VARCHAR(20),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

---

## روابط یک‌به‌بسیاری

رابطه یک‌به‌بسیاری به این معنی است که هر رکورد در جدول A می‌تواند با چند رکورد در جدول B مرتبط باشد، اما هر رکورد در جدول B فقط با یک رکورد در جدول A مرتبط است.

### پیاده‌سازی

\`\`\`sql
-- جدول users
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- جدول posts (بسیاری پست برای هر کاربر)
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- جدول comments (بسیاری نظر برای هر پست)
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id)
);
\`\`\`

### رایج‌ترین نوع رابطه

یک‌به‌بسیاری رایج‌ترین نوع رابطه در پایگاه‌های داده است!

---

## روابط بسیاری‌به‌بسیاری

رابطه بسیاری‌به‌بسیاری به این معنی است که رکوردهای جدول A می‌توانند با چند رکورد در جدول B مرتبط باشند، و برعکس. این نیاز به جدول junction دارد.

### پیاده‌سازی

\`\`\`sql
-- جدول students
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- جدول courses
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  credits INT NOT NULL
);

-- جدول junction (بسیاری‌به‌بسیاری)
CREATE TABLE enrollments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  grade VARCHAR(2),
  enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id)
);
\`\`\`

### کوئری کردن بسیاری‌به‌بسیاری

\`\`\`sql
-- دریافت تمام دوره‌های یک دانشجو
SELECT 
  c.code,
  c.name,
  c.credits,
  e.grade
FROM students s
JOIN enrollments e ON s.id = e.student_id
JOIN courses c ON e.course_id = c.id
WHERE s.id = 1;

-- دریافت تمام دانشجویان در یک دوره
SELECT 
  s.name,
  s.email,
  e.grade
FROM courses c
JOIN enrollments e ON c.id = e.course_id
JOIN students s ON e.student_id = s.id
WHERE c.id = 5;
\`\`\`

---

## کلیدهای خارجی و یکپارچگی ارجاعی

کلیدهای خارجی یکپارچگی داده را با اعمال روابط تضمین می‌کنند.

### ایجاد کلیدهای خارجی

\`\`\`sql
-- کلید خارجی پایه
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- کلید خارجی با حذف cascade
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
\`\`\`

### گزینه‌های Cascade

| گزینه | رفتار |
|-------|-------|
| RESTRICT | حذف را جلوگیری کنید اگر ارجاع شده باشد |
| CASCADE | حذف رکوردهای مرتبط |
| SET NULL | کلید خارجی را NULL تنظیم کنید |

---

## مثال‌های عملی رابطه

### پایگاه داده تجارت الکترونیکی

\`\`\`sql
-- یک‌به‌بسیاری: Customer → Orders
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  INDEX idx_customer_id (customer_id)
);

-- بسیاری‌به‌بسیاری: Orders ↔ Products (از طریق order_items)
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE KEY unique_order_product (order_id, product_id)
);
\`\`\`

---

## اشتباهات رایج

### 1. کلید خارجی گمشده

❌ **اشتباه:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT  -- بدون کلید خارجی!
);
\`\`\`

✅ **درست:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

### 2. نوع رابطه اشتباه

❌ **اشتباه (استفاده از یک‌به‌بسیاری برای بسیاری‌به‌بسیاری):**
\`\`\`sql
-- نمی‌تواند چند دوره برای دانشجو ذخیره کند
CREATE TABLE students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  course_id INT  -- فقط یک دوره!
);
\`\`\`

✅ **درست (استفاده از جدول junction):**
\`\`\`sql
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

### 3. فراموش کردن محدودیت Unique در جدول Junction

❌ **اشتباه:**
\`\`\`sql
-- می‌تواند دانشجو را چند بار در یک دوره ثبت کند
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

✅ **درست:**
\`\`\`sql
-- از ثبت‌نام‌های تکراری جلوگیری می‌کند
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
\`\`\`

---

## نکات عملکرد

### 1. Index کلیدهای خارجی

\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id)  -- همیشه کلیدهای خارجی را index کنید!
);
\`\`\`

### 2. استفاده از گزینه‌های Cascade مناسب

\`\`\`sql
-- CASCADE برای داده‌های وابسته
CREATE TABLE posts (
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- RESTRICT برای داده‌های مستقل
CREATE TABLE orders (
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE RESTRICT
);
\`\`\`

---

## مرجع سریع

### انواع رابطه

| نوع | مثال | جدول Junction |
|-----|------|-----------------|
| 1:1 | User ↔ Profile | خیر |
| 1:N | User → Posts | خیر |
| N:M | Students ↔ Courses | بله |

### نحو کلید خارجی

\`\`\`sql
FOREIGN KEY (column) REFERENCES table(column)
  [ON DELETE {RESTRICT|CASCADE|SET NULL}]
  [ON UPDATE {RESTRICT|CASCADE|SET NULL}]
\`\`\`

---

## مراحل بعدی

حالا که روابط را فهمیدید، آماده هستید برای:
1. یادگیری نرمال‌سازی پایگاه داده
2. تسلط بر کوئری‌های پیچیده با روابط متعدد
3. بهینه‌سازی کوئری‌ها با indexing مناسب
4. طراحی طرح‌های پایگاه داده مقیاس‌پذیر

> **به یاد داشته باشید:** روابط خوب بنیاد یک پایگاه داده خوب‌طراحی‌شده است! 🔗
`,

  visualizationId: null,
  exerciseId: null,
};

export default databaseRelationships;
