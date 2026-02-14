export const databaseDesignTables = {
  id: 'database-design-tables',
  title: 'Database Design - Creating Tables',
  titleFa: 'طراحی پایگاه داده - ایجاد جداول',
  difficulty: 'medium',
  estimatedTime: '60 min',
  
  content: `
# Database Design - Creating Tables

## Introduction

Creating well-designed tables is the foundation of a good database. This lesson covers table creation, data types, constraints, and schema modifications.

**What you'll learn:**
- CREATE TABLE syntax and structure
- Data types (INT, VARCHAR, DECIMAL, TIMESTAMP, etc.)
- Primary keys and auto-increment
- Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT)
- ALTER TABLE for schema modifications
- Indexes for performance
- Practical schema design examples
- Common mistakes and best practices

---

## Data Types

Choosing the right data type is crucial for performance and data integrity.

### Numeric Types

| Type | Range | Use Case |
|------|-------|----------|
| TINYINT | -128 to 127 | Boolean-like values, small counts |
| SMALLINT | -32,768 to 32,767 | Small numbers |
| INT | -2.1B to 2.1B | Most numeric data |
| BIGINT | -9.2E18 to 9.2E18 | Large numbers, timestamps |
| DECIMAL(10,2) | Exact decimal | Money, prices |
| FLOAT | Approximate | Scientific calculations |

### String Types

| Type | Max Size | Use Case |
|------|----------|----------|
| CHAR(50) | 50 bytes | Fixed-length (IDs, codes) |
| VARCHAR(255) | 255 bytes | Variable-length text |
| TEXT | 65KB | Long text content |
| LONGTEXT | 4GB | Very large text |

### Date/Time Types

| Type | Format | Use Case |
|------|--------|----------|
| DATE | YYYY-MM-DD | Dates only |
| TIME | HH:MM:SS | Times only |
| DATETIME | YYYY-MM-DD HH:MM:SS | Date and time |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | Auto-updating timestamps |

### Boolean Type

\`\`\`sql
-- MySQL uses TINYINT(1) for boolean
-- 0 = false, 1 = true
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  is_active TINYINT(1) DEFAULT 1,
  is_admin TINYINT(1) DEFAULT 0
);
\`\`\`

---

## CREATE TABLE Syntax

### Basic Table Creation

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

### Table with Constraints

\`\`\`sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  category VARCHAR(50) NOT NULL,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

---

## Constraints

Constraints enforce data integrity and business rules.

### PRIMARY KEY

\`\`\`sql
-- Single column primary key
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL
);

-- Composite primary key
CREATE TABLE order_items (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

### UNIQUE Constraint

\`\`\`sql
-- Ensure unique values
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);

-- Multiple columns unique
CREATE TABLE user_emails (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  email VARCHAR(100) NOT NULL,
  UNIQUE KEY unique_user_email (user_id, email)
);
\`\`\`

### NOT NULL Constraint

\`\`\`sql
-- Require value to be provided
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### DEFAULT Constraint

\`\`\`sql
-- Set default values
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  total DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### CHECK Constraint

\`\`\`sql
-- Validate data with conditions
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  discount DECIMAL(5, 2) CHECK (discount >= 0 AND discount <= 100),
  stock INT CHECK (stock >= 0)
);
\`\`\`

### FOREIGN KEY Constraint

\`\`\`sql
-- Reference another table
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- With cascade delete
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

---

## AUTO_INCREMENT

Automatically generate unique IDs.

### Basic AUTO_INCREMENT

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL
);

-- Insert without specifying id
INSERT INTO users (username) VALUES ('alice');
-- id is automatically set to 1

INSERT INTO users (username) VALUES ('bob');
-- id is automatically set to 2
\`\`\`

### Starting AUTO_INCREMENT Value

\`\`\`sql
-- Start from 1000
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
) AUTO_INCREMENT = 1000;

-- Or modify existing table
ALTER TABLE products AUTO_INCREMENT = 1000;
\`\`\`

---

## Indexes

Indexes improve query performance but slow down inserts/updates.

### Creating Indexes

\`\`\`sql
-- Single column index
CREATE INDEX idx_username ON users(username);

-- Composite index
CREATE INDEX idx_user_email ON users(username, email);

-- Unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Full-text index
CREATE FULLTEXT INDEX idx_content ON posts(content);
\`\`\`

### Index in CREATE TABLE

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

### When to Use Indexes

✅ **Use indexes on:**
- Columns used in WHERE clauses
- Columns used in JOIN conditions
- Columns used in ORDER BY
- Columns used in GROUP BY
- Foreign key columns

❌ **Avoid indexes on:**
- Columns with low cardinality (few unique values)
- Columns that are frequently updated
- Small tables
- Columns with many NULL values

---

## ALTER TABLE

Modify existing table structure.

### Adding Columns

\`\`\`sql
-- Add new column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Add column with constraints
ALTER TABLE users ADD COLUMN bio TEXT NOT NULL DEFAULT '';

-- Add column at specific position
ALTER TABLE users ADD COLUMN age INT AFTER email;
\`\`\`

### Modifying Columns

\`\`\`sql
-- Change column type
ALTER TABLE users MODIFY COLUMN bio TEXT;

-- Change column name and type
ALTER TABLE users CHANGE COLUMN bio biography TEXT;

-- Add NOT NULL constraint
ALTER TABLE users MODIFY COLUMN email VARCHAR(100) NOT NULL;
\`\`\`

### Dropping Columns

\`\`\`sql
-- Remove column
ALTER TABLE users DROP COLUMN phone;

-- Remove multiple columns
ALTER TABLE users DROP COLUMN phone, DROP COLUMN bio;
\`\`\`

### Renaming Table

\`\`\`sql
-- Rename table
ALTER TABLE users RENAME TO app_users;

-- Or use RENAME
RENAME TABLE users TO app_users;
\`\`\`

### Adding Constraints

\`\`\`sql
-- Add primary key
ALTER TABLE users ADD PRIMARY KEY (id);

-- Add unique constraint
ALTER TABLE users ADD UNIQUE KEY unique_email (email);

-- Add foreign key
ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users(id);

-- Add check constraint
ALTER TABLE products ADD CHECK (price > 0);
\`\`\`

### Dropping Constraints

\`\`\`sql
-- Drop primary key
ALTER TABLE users DROP PRIMARY KEY;

-- Drop unique constraint
ALTER TABLE users DROP INDEX unique_email;

-- Drop foreign key
ALTER TABLE posts DROP FOREIGN KEY posts_ibfk_1;

-- Drop check constraint
ALTER TABLE products DROP CHECK products_chk_1;
\`\`\`

---

## Practical Schema Examples

### Blog Database

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_username (username),
  INDEX idx_email (email)
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id)
);
\`\`\`

### E-Commerce Database

\`\`\`sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  category VARCHAR(50) NOT NULL,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_price (price)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_order_date (order_date)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

---

## Node.js Examples

### Creating Tables Programmatically

\`\`\`javascript
// Create users table
async function createUsersTable() {
  const sql = \`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      
      INDEX idx_username (username),
      INDEX idx_email (email)
    )
  \`;
  
  try {
    await pool.execute(sql);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating table:', error.message);
  }
}

// Create posts table with foreign key
async function createPostsTable() {
  const sql = \`
    CREATE TABLE IF NOT EXISTS posts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      title VARCHAR(200) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_id (user_id),
      INDEX idx_created_at (created_at)
    )
  \`;
  
  try {
    await pool.execute(sql);
    console.log('Posts table created successfully');
  } catch (error) {
    console.error('Error creating table:', error.message);
  }
}

// Modify table structure
async function addColumnToUsers() {
  const sql = 'ALTER TABLE users ADD COLUMN bio TEXT';
  
  try {
    await pool.execute(sql);
    console.log('Column added successfully');
  } catch (error) {
    console.error('Error adding column:', error.message);
  }
}
\`\`\`

---

## Common Mistakes

### 1. Wrong Data Type

❌ **Wrong:**
\`\`\`sql
CREATE TABLE products (
  id INT,
  price VARCHAR(10)  -- Should be DECIMAL!
);
\`\`\`

✅ **Correct:**
\`\`\`sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  price DECIMAL(10, 2)
);
\`\`\`

### 2. Missing Constraints

❌ **Wrong:**
\`\`\`sql
CREATE TABLE users (
  id INT,
  email VARCHAR(100)  -- Should be UNIQUE and NOT NULL!
);
\`\`\`

✅ **Correct:**
\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE
);
\`\`\`

### 3. Forgetting Foreign Key

❌ **Wrong:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT  -- No foreign key constraint!
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

### 4. Over-Indexing

❌ **Wrong:**
\`\`\`sql
-- Too many indexes slow down inserts
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

---

## Performance Tips

### 1. Choose Appropriate Data Types

- Use INT instead of VARCHAR for IDs
- Use DECIMAL for money, not FLOAT
- Use TIMESTAMP for automatic updates
- Use VARCHAR(255) for most text

### 2. Index Strategically

- Index columns used in WHERE clauses
- Index foreign key columns
- Avoid indexing low-cardinality columns
- Monitor index usage

### 3. Use Constraints

- Enforce data integrity at database level
- Use NOT NULL for required fields
- Use UNIQUE for unique values
- Use CHECK for business rules

---

## Quick Reference

### Data Types

\`\`\`sql
INT, BIGINT, DECIMAL(10,2), VARCHAR(255), TEXT, DATE, TIMESTAMP, TINYINT(1)
\`\`\`

### Constraints

\`\`\`sql
PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT, CHECK, FOREIGN KEY
\`\`\`

### CREATE TABLE Syntax

\`\`\`sql
CREATE TABLE table_name (
  column_name DATA_TYPE CONSTRAINTS,
  PRIMARY KEY (column_name),
  FOREIGN KEY (column_name) REFERENCES other_table(column_name),
  INDEX index_name (column_name)
);
\`\`\`

---

## Next Steps

Now that you understand table design, you're ready to:
1. Learn about database relationships and normalization
2. Master query optimization with proper indexes
3. Implement data validation and constraints
4. Design scalable database schemas

> **Remember:** Good table design is the foundation of a good database! 🏗️
`
,

  contentFa: `
# طراحی پایگاه داده - ایجاد جداول

## مقدمه

ایجاد جداول خوب‌طراحی‌شده بنیاد یک پایگاه داده خوب است. این درس شامل ایجاد جدول، انواع داده، محدودیت‌ها و تغییرات طرح است.

**چه چیزی یاد می‌گیرید:**
- نحو CREATE TABLE و ساختار
- انواع داده (INT، VARCHAR، DECIMAL، TIMESTAMP، و غیره)
- کلیدهای اولیه و auto-increment
- محدودیت‌ها (NOT NULL، UNIQUE، CHECK، DEFAULT)
- ALTER TABLE برای تغییرات طرح
- Indexes برای عملکرد
- مثال‌های طراحی طرح عملی
- اشتباهات رایج و بهترین روش‌ها

---

## انواع داده

انتخاب نوع داده صحیح برای عملکرد و یکپارچگی داده حیاتی است.

### انواع عددی

| نوع | محدوده | مورد استفاده |
|-----|--------|------------|
| TINYINT | -128 تا 127 | مقادیر شبه‌بولی، شمارش‌های کوچک |
| SMALLINT | -32,768 تا 32,767 | اعداد کوچک |
| INT | -2.1B تا 2.1B | اکثر داده‌های عددی |
| BIGINT | -9.2E18 تا 9.2E18 | اعداد بزرگ، timestamps |
| DECIMAL(10,2) | اعشار دقیق | پول، قیمت‌ها |
| FLOAT | تقریبی | محاسبات علمی |

### انواع رشته

| نوع | حداکثر اندازه | مورد استفاده |
|-----|-------------|------------|
| CHAR(50) | 50 بایت | طول ثابت (IDs، کدها) |
| VARCHAR(255) | 255 بایت | متن طول متغیر |
| TEXT | 65KB | محتوای متن طولانی |
| LONGTEXT | 4GB | متن بسیار بزرگ |

### انواع تاریخ/زمان

| نوع | فرمت | مورد استفاده |
|-----|------|------------|
| DATE | YYYY-MM-DD | فقط تاریخ‌ها |
| TIME | HH:MM:SS | فقط زمان‌ها |
| DATETIME | YYYY-MM-DD HH:MM:SS | تاریخ و زمان |
| TIMESTAMP | YYYY-MM-DD HH:MM:SS | timestamps خودکار |

---

## نحو CREATE TABLE

### ایجاد جدول پایه

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### جدول با محدودیت‌ها

\`\`\`sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  category VARCHAR(50) NOT NULL,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0)
);
\`\`\`

---

## محدودیت‌ها

محدودیت‌ها یکپارچگی داده و قوانین تجاری را اعمال می‌کنند.

### PRIMARY KEY

\`\`\`sql
-- کلید اولیه تک ستونی
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL
);

-- کلید اولیه ترکیبی
CREATE TABLE order_items (
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

### محدودیت UNIQUE

\`\`\`sql
-- اطمینان از مقادیر منحصر به فرد
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE
);
\`\`\`

### محدودیت NOT NULL

\`\`\`sql
-- نیاز به ارائه مقدار
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL
);
\`\`\`

### محدودیت DEFAULT

\`\`\`sql
-- تنظیم مقادیر پیش‌فرض
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  total DECIMAL(10, 2) DEFAULT 0
);
\`\`\`

### محدودیت CHECK

\`\`\`sql
-- اعتبارسنجی داده با شرایط
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  discount DECIMAL(5, 2) CHECK (discount >= 0 AND discount <= 100)
);
\`\`\`

### محدودیت FOREIGN KEY

\`\`\`sql
-- ارجاع به جدول دیگر
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- با حذف cascade
CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

---

## AUTO_INCREMENT

تولید خودکار IDهای منحصر به فرد.

### AUTO_INCREMENT پایه

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL
);

-- درج بدون مشخص کردن id
INSERT INTO users (username) VALUES ('alice');
-- id به طور خودکار 1 تنظیم می‌شود

INSERT INTO users (username) VALUES ('bob');
-- id به طور خودکار 2 تنظیم می‌شود
\`\`\`

---

## Indexes

Indexes عملکرد کوئری را بهبود می‌بخشند اما درج/به‌روزرسانی را کند می‌کنند.

### ایجاد Indexes

\`\`\`sql
-- index تک ستونی
CREATE INDEX idx_username ON users(username);

-- index ترکیبی
CREATE INDEX idx_user_email ON users(username, email);

-- unique index
CREATE UNIQUE INDEX idx_email ON users(email);
\`\`\`

### Index در CREATE TABLE

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  
  UNIQUE INDEX idx_username (username),
  UNIQUE INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
\`\`\`

### زمان استفاده از Indexes

✅ **استفاده از indexes برای:**
- ستون‌های استفاده شده در WHERE
- ستون‌های استفاده شده در JOIN
- ستون‌های استفاده شده در ORDER BY
- ستون‌های کلید خارجی

❌ **از indexes خودداری کنید برای:**
- ستون‌های با cardinality کم
- ستون‌های که اغلب به‌روزرسانی می‌شوند
- جداول کوچک

---

## ALTER TABLE

تغییر ساختار جدول موجود.

### افزودن ستون‌ها

\`\`\`sql
-- افزودن ستون جدید
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- افزودن ستون با محدودیت‌ها
ALTER TABLE users ADD COLUMN bio TEXT NOT NULL DEFAULT '';
\`\`\`

### تغییر ستون‌ها

\`\`\`sql
-- تغییر نوع ستون
ALTER TABLE users MODIFY COLUMN bio TEXT;

-- تغییر نام و نوع ستون
ALTER TABLE users CHANGE COLUMN bio biography TEXT;
\`\`\`

### حذف ستون‌ها

\`\`\`sql
-- حذف ستون
ALTER TABLE users DROP COLUMN phone;
\`\`\`

### تغییر نام جدول

\`\`\`sql
-- تغییر نام جدول
ALTER TABLE users RENAME TO app_users;
\`\`\`

### افزودن محدودیت‌ها

\`\`\`sql
-- افزودن کلید اولیه
ALTER TABLE users ADD PRIMARY KEY (id);

-- افزودن محدودیت unique
ALTER TABLE users ADD UNIQUE KEY unique_email (email);

-- افزودن کلید خارجی
ALTER TABLE posts ADD FOREIGN KEY (user_id) REFERENCES users(id);
\`\`\`

---

## مثال‌های طراحی طرح عملی

### پایگاه داده وبلاگ

\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_username (username),
  INDEX idx_email (email)
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

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

### پایگاه داده تجارت الکترونیکی

\`\`\`sql
CREATE TABLE customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_email (email)
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  category VARCHAR(50) NOT NULL,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_category (category),
  INDEX idx_price (price)
);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  INDEX idx_customer_id (customer_id),
  INDEX idx_order_date (order_date)
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

---

## اشتباهات رایج

### 1. نوع داده اشتباه

❌ **اشتباه:**
\`\`\`sql
CREATE TABLE products (
  id INT,
  price VARCHAR(10)  -- باید DECIMAL باشد!
);
\`\`\`

✅ **درست:**
\`\`\`sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  price DECIMAL(10, 2)
);
\`\`\`

### 2. محدودیت‌های گمشده

❌ **اشتباه:**
\`\`\`sql
CREATE TABLE users (
  id INT,
  email VARCHAR(100)  -- باید UNIQUE و NOT NULL باشد!
);
\`\`\`

✅ **درست:**
\`\`\`sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL UNIQUE
);
\`\`\`

### 3. فراموش کردن کلید خارجی

❌ **اشتباه:**
\`\`\`sql
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT  -- بدون محدودیت کلید خارجی!
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

---

## نکات عملکرد

### 1. انتخاب انواع داده مناسب

- استفاده از INT به جای VARCHAR برای IDها
- استفاده از DECIMAL برای پول، نه FLOAT
- استفاده از TIMESTAMP برای به‌روزرسانی‌های خودکار
- استفاده از VARCHAR(255) برای اکثر متن‌ها

### 2. Indexing استراتژیک

- Index ستون‌های استفاده شده در WHERE
- Index ستون‌های کلید خارجی
- از indexing ستون‌های low-cardinality خودداری کنید
- استفاده index را نظارت کنید

### 3. استفاده از محدودیت‌ها

- یکپارچگی داده را در سطح پایگاه داده اعمال کنید
- NOT NULL برای فیلدهای ضروری
- UNIQUE برای مقادیر منحصر به فرد
- CHECK برای قوانین تجاری

---

## مرجع سریع

### انواع داده

\`\`\`sql
INT, BIGINT, DECIMAL(10,2), VARCHAR(255), TEXT, DATE, TIMESTAMP, TINYINT(1)
\`\`\`

### محدودیت‌ها

\`\`\`sql
PRIMARY KEY, UNIQUE, NOT NULL, DEFAULT, CHECK, FOREIGN KEY
\`\`\`

### نحو CREATE TABLE

\`\`\`sql
CREATE TABLE table_name (
  column_name DATA_TYPE CONSTRAINTS,
  PRIMARY KEY (column_name),
  FOREIGN KEY (column_name) REFERENCES other_table(column_name),
  INDEX index_name (column_name)
);
\`\`\`

---

## مراحل بعدی

حالا که طراحی جدول را فهمیدید، آماده هستید برای:
1. یادگیری روابط پایگاه داده و نرمال‌سازی
2. تسلط بر بهینه‌سازی کوئری با indexes مناسب
3. پیاده‌سازی اعتبارسنجی و محدودیت‌های داده
4. طراحی طرح‌های پایگاه داده مقیاس‌پذیر

> **به یاد داشته باشید:** طراحی جدول خوب بنیاد یک پایگاه داده خوب است! 🏗️
`,

  visualizationId: null,
  exerciseId: null,
};

export default databaseDesignTables;
