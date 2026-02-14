export const sqlQueriesExercises = {
  id: 'sql-queries-exercises',
  title: 'SQL Queries Exercises',
  titleFa: 'تمرین‌های کوئری‌های SQL',
  difficulty: 'easy',
  
  description: `
# SQL Queries Exercises

Practice writing SQL queries for SELECT, INSERT, UPDATE, and DELETE operations! These exercises will help you master data retrieval and modification in MySQL/MariaDB databases.

## What You'll Practice

1. **Exercise 1**: SELECT queries with filtering
2. **Exercise 2**: INSERT new records
3. **Exercise 3**: UPDATE existing records
4. **Exercise 4**: DELETE records safely
5. **Exercise 5**: Complex queries with multiple conditions
6. **Exercise 6**: Using prepared statements in Node.js

## Setup Instructions

Before starting, create a test database with sample data:

\`\`\`sql
CREATE DATABASE exercise_db;
USE exercise_db;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  stock_quantity INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, category, stock_quantity) VALUES
  ('Laptop', 999.99, 'Electronics', 15),
  ('Mouse', 29.99, 'Electronics', 50),
  ('Desk Chair', 199.99, 'Furniture', 20),
  ('Notebook', 4.99, 'Stationery', 100),
  ('Pen Set', 12.99, 'Stationery', 75);

CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(100),
  total_amount DECIMAL(10, 2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Exercise 1: SELECT with Filtering

Write queries to retrieve specific data from the products table.

**Tasks:**
a) Get all products in the 'Electronics' category
b) Get products with price less than $50
c) Get products with stock quantity greater than 20
d) Get the 3 most expensive products

**Expected Output:** Filtered product lists based on criteria

---

## Exercise 2: INSERT New Records

Write queries to add new products to the database.

**Tasks:**
a) Insert a single product: 'Keyboard', $79.99, 'Electronics', 30 units
b) Insert multiple products at once (at least 3 products)
c) Insert a product and retrieve its auto-generated ID

**Expected Output:** New products added to database

---

## Exercise 3: UPDATE Existing Records

Write queries to modify product information.

**Tasks:**
a) Update the price of product with id=1 to $899.99
b) Increase stock quantity by 10 for all 'Stationery' products
c) Update multiple fields: name and price for a specific product
d) Apply a 10% discount to all products over $100

**Expected Output:** Modified product records

---

## Exercise 4: DELETE Records Safely

Write queries to remove products from the database.

**Tasks:**
a) Delete a product with a specific ID
b) Delete all products with zero stock
c) Delete products in a specific category
d) Implement a soft delete (add deleted_at column and use UPDATE instead)

**Expected Output:** Products removed or marked as deleted

---

## Exercise 5: Complex Queries

Write more advanced queries combining multiple conditions.

**Tasks:**
a) Get products in 'Electronics' OR 'Furniture' categories with price > $50
b) Get products with stock between 10 and 50 units
c) Get products ordered by price (highest first), limit to 5 results
d) Count how many products are in each category

**Expected Output:** Filtered and aggregated data

---

## Exercise 6: Node.js with Prepared Statements

Write Node.js functions that execute SQL queries safely using prepared statements.

**Tasks:**
a) Function to get products by category (using parameter)
b) Function to insert a new product (using parameters)
c) Function to update product price (using parameters)
d) Function to delete a product (using parameter)

**Expected Output:** Safe database operations from Node.js

**Security Requirement:** All queries MUST use prepared statements with ? placeholders!
`,

  descriptionFa: `
# تمرین‌های کوئری‌های SQL

نوشتن کوئری‌های SQL برای عملیات SELECT، INSERT، UPDATE و DELETE را تمرین کنید! این تمرین‌ها به شما کمک می‌کنند تا بازیابی و تغییر داده در پایگاه‌های داده MySQL/MariaDB را مسلط شوید.

## چه چیزی تمرین خواهید کرد

1. **تمرین ۱**: کوئری‌های SELECT با فیلتر
2. **تمرین ۲**: INSERT رکوردهای جدید
3. **تمرین ۳**: UPDATE رکوردهای موجود
4. **تمرین ۴**: DELETE رکوردها به صورت ایمن
5. **تمرین ۵**: کوئری‌های پیچیده با شرایط متعدد
6. **تمرین ۶**: استفاده از prepared statements در Node.js

## دستورالعمل‌های راه‌اندازی

قبل از شروع، یک پایگاه داده تست با داده‌های نمونه ایجاد کنید:

\`\`\`sql
CREATE DATABASE exercise_db;
USE exercise_db;

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50),
  stock_quantity INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, price, category, stock_quantity) VALUES
  ('Laptop', 999.99, 'Electronics', 15),
  ('Mouse', 29.99, 'Electronics', 50),
  ('Desk Chair', 199.99, 'Furniture', 20),
  ('Notebook', 4.99, 'Stationery', 100),
  ('Pen Set', 12.99, 'Stationery', 75);
\`\`\`

## تمرین ۱: SELECT با فیلتر

کوئری‌هایی بنویسید تا داده‌های خاص را از جدول products بازیابی کنید.

**وظایف:**
الف) همه محصولات در دسته 'Electronics' را دریافت کنید
ب) محصولات با قیمت کمتر از ۵۰ دلار را دریافت کنید
ج) محصولات با موجودی بیشتر از ۲۰ را دریافت کنید
د) ۳ محصول گران‌ترین را دریافت کنید

**خروجی مورد انتظار:** لیست‌های محصول فیلتر شده بر اساس معیارها

---

## تمرین ۲: INSERT رکوردهای جدید

کوئری‌هایی بنویسید تا محصولات جدید به پایگاه داده اضافه کنید.

**وظایف:**
الف) یک محصول درج کنید: 'Keyboard'، ۷۹.۹۹ دلار، 'Electronics'، ۳۰ واحد
ب) چند محصول را به یکباره درج کنید (حداقل ۳ محصول)
ج) یک محصول درج کنید و ID خودکار تولید شده آن را بازیابی کنید

**خروجی مورد انتظار:** محصولات جدید به پایگاه داده اضافه شده

---

## تمرین ۳: UPDATE رکوردهای موجود

کوئری‌هایی بنویسید تا اطلاعات محصول را تغییر دهید.

**وظایف:**
الف) قیمت محصول با id=1 را به ۸۹۹.۹۹ دلار به‌روزرسانی کنید
ب) موجودی را برای همه محصولات 'Stationery' ۱۰ واحد افزایش دهید
ج) چند فیلد را به‌روزرسانی کنید: نام و قیمت برای یک محصول خاص
د) ۱۰٪ تخفیف به همه محصولات بالای ۱۰۰ دلار اعمال کنید

**خروجی مورد انتظار:** رکوردهای محصول تغییر یافته

---

## تمرین ۴: DELETE رکوردها به صورت ایمن

کوئری‌هایی بنویسید تا محصولات را از پایگاه داده حذف کنید.

**وظایف:**
الف) یک محصول با ID خاص را حذف کنید
ب) همه محصولات با موجودی صفر را حذف کنید
ج) محصولات در یک دسته خاص را حذف کنید
د) حذف نرم را پیاده‌سازی کنید (ستون deleted_at اضافه کنید و از UPDATE استفاده کنید)

**خروجی مورد انتظار:** محصولات حذف شده یا به عنوان حذف شده علامت‌گذاری شده

---

## تمرین ۵: کوئری‌های پیچیده

کوئری‌های پیشرفته‌تری بنویسید که شرایط متعدد را ترکیب می‌کنند.

**وظایف:**
الف) محصولات در دسته‌های 'Electronics' یا 'Furniture' با قیمت > ۵۰ دلار را دریافت کنید
ب) محصولات با موجودی بین ۱۰ تا ۵۰ واحد را دریافت کنید
ج) محصولات را بر اساس قیمت (بیشترین اول) مرتب کنید، محدود به ۵ نتیجه
د) تعداد محصولات در هر دسته را بشمارید

**خروجی مورد انتظار:** داده‌های فیلتر شده و تجمیع شده

---

## تمرین ۶: Node.js با Prepared Statements

توابع Node.js بنویسید که کوئری‌های SQL را به صورت ایمن با استفاده از prepared statements اجرا کنند.

**وظایف:**
الف) تابعی برای دریافت محصولات بر اساس دسته (با استفاده از پارامتر)
ب) تابعی برای درج محصول جدید (با استفاده از پارامترها)
ج) تابعی برای به‌روزرسانی قیمت محصول (با استفاده از پارامترها)
د) تابعی برای حذف محصول (با استفاده از پارامتر)

**خروجی مورد انتظار:** عملیات ایمن پایگاه داده از Node.js

**الزام امنیتی:** همه کوئری‌ها باید از prepared statements با جایگزین‌های ? استفاده کنند!
`,

  starterCode: `// Exercise 1: SELECT with Filtering
// TODO: Write SQL queries for each task

// a) Get all products in 'Electronics' category
const query1a = \`
  -- Your SQL here
\`;

// b) Get products with price less than $50
const query1b = \`
  -- Your SQL here
\`;

// c) Get products with stock quantity greater than 20
const query1c = \`
  -- Your SQL here
\`;

// d) Get the 3 most expensive products
const query1d = \`
  -- Your SQL here
\`;


// Exercise 2: INSERT New Records
// TODO: Write INSERT queries

// a) Insert single product
const query2a = \`
  -- Your SQL here
\`;

// b) Insert multiple products
const query2b = \`
  -- Your SQL here
\`;

// c) Insert and get ID
const query2c = \`
  -- Your SQL here
  -- Then: SELECT LAST_INSERT_ID();
\`;


// Exercise 3: UPDATE Existing Records
// TODO: Write UPDATE queries

// a) Update price for product id=1
const query3a = \`
  -- Your SQL here
\`;

// b) Increase stock for Stationery products
const query3b = \`
  -- Your SQL here
\`;

// c) Update multiple fields
const query3c = \`
  -- Your SQL here
\`;

// d) Apply 10% discount to products over $100
const query3d = \`
  -- Your SQL here
\`;


// Exercise 4: DELETE Records Safely
// TODO: Write DELETE queries

// a) Delete product by ID
const query4a = \`
  -- Your SQL here
\`;

// b) Delete products with zero stock
const query4b = \`
  -- Your SQL here
\`;

// c) Delete products in specific category
const query4c = \`
  -- Your SQL here
\`;

// d) Soft delete (add column first, then UPDATE)
const query4d_alter = \`
  -- Your SQL here to add deleted_at column
\`;
const query4d_update = \`
  -- Your SQL here to mark as deleted
\`;


// Exercise 5: Complex Queries
// TODO: Write complex queries

// a) Products in Electronics OR Furniture with price > $50
const query5a = \`
  -- Your SQL here
\`;

// b) Products with stock between 10 and 50
const query5b = \`
  -- Your SQL here
\`;

// c) Top 5 products by price
const query5c = \`
  -- Your SQL here
\`;

// d) Count products per category
const query5d = \`
  -- Your SQL here
\`;


// Exercise 6: Node.js with Prepared Statements
// TODO: Implement functions using prepared statements

import mysql from 'mysql2/promise';

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'exercise_db',
  connectionLimit: 10
});

// a) Get products by category
async function getProductsByCategory(category) {
  // TODO: Use prepared statement with ? placeholder
  // Your code here
}

// b) Insert new product
async function insertProduct(name, price, category, stock) {
  // TODO: Use prepared statement
  // Your code here
}

// c) Update product price
async function updateProductPrice(productId, newPrice) {
  // TODO: Use prepared statement
  // Your code here
}

// d) Delete product
async function deleteProduct(productId) {
  // TODO: Use prepared statement
  // Your code here
}

export {
  getProductsByCategory,
  insertProduct,
  updateProductPrice,
  deleteProduct
};
`,

  solution: `// Exercise 1: SELECT with Filtering

// a) Get all products in 'Electronics' category
const query1a = \`
  SELECT * FROM products 
  WHERE category = 'Electronics';
\`;

// b) Get products with price less than $50
const query1b = \`
  SELECT * FROM products 
  WHERE price < 50;
\`;

// c) Get products with stock quantity greater than 20
const query1c = \`
  SELECT * FROM products 
  WHERE stock_quantity > 20;
\`;

// d) Get the 3 most expensive products
const query1d = \`
  SELECT * FROM products 
  ORDER BY price DESC 
  LIMIT 3;
\`;


// Exercise 2: INSERT New Records

// a) Insert single product
const query2a = \`
  INSERT INTO products (name, price, category, stock_quantity)
  VALUES ('Keyboard', 79.99, 'Electronics', 30);
\`;

// b) Insert multiple products
const query2b = \`
  INSERT INTO products (name, price, category, stock_quantity)
  VALUES 
    ('Monitor', 299.99, 'Electronics', 12),
    ('Office Desk', 349.99, 'Furniture', 8),
    ('Stapler', 9.99, 'Stationery', 60);
\`;

// c) Insert and get ID
const query2c = \`
  INSERT INTO products (name, price, category, stock_quantity)
  VALUES ('Webcam', 89.99, 'Electronics', 25);
  
  SELECT LAST_INSERT_ID() as new_id;
\`;


// Exercise 3: UPDATE Existing Records

// a) Update price for product id=1
const query3a = \`
  UPDATE products 
  SET price = 899.99 
  WHERE id = 1;
\`;

// b) Increase stock for Stationery products
const query3b = \`
  UPDATE products 
  SET stock_quantity = stock_quantity + 10 
  WHERE category = 'Stationery';
\`;

// c) Update multiple fields
const query3c = \`
  UPDATE products 
  SET name = 'Gaming Laptop', price = 1299.99 
  WHERE id = 1;
\`;

// d) Apply 10% discount to products over $100
const query3d = \`
  UPDATE products 
  SET price = price * 0.9 
  WHERE price > 100;
\`;


// Exercise 4: DELETE Records Safely

// a) Delete product by ID
const query4a = \`
  DELETE FROM products 
  WHERE id = 5;
\`;

// b) Delete products with zero stock
const query4b = \`
  DELETE FROM products 
  WHERE stock_quantity = 0;
\`;

// c) Delete products in specific category
const query4c = \`
  DELETE FROM products 
  WHERE category = 'Stationery';
\`;

// d) Soft delete
const query4d_alter = \`
  ALTER TABLE products 
  ADD COLUMN deleted_at TIMESTAMP NULL;
\`;

const query4d_update = \`
  UPDATE products 
  SET deleted_at = NOW() 
  WHERE id = 5;
\`;


// Exercise 5: Complex Queries

// a) Products in Electronics OR Furniture with price > $50
const query5a = \`
  SELECT * FROM products 
  WHERE (category = 'Electronics' OR category = 'Furniture') 
    AND price > 50;
\`;

// b) Products with stock between 10 and 50
const query5b = \`
  SELECT * FROM products 
  WHERE stock_quantity BETWEEN 10 AND 50;
\`;

// c) Top 5 products by price
const query5c = \`
  SELECT * FROM products 
  ORDER BY price DESC 
  LIMIT 5;
\`;

// d) Count products per category
const query5d = \`
  SELECT category, COUNT(*) as product_count 
  FROM products 
  GROUP BY category;
\`;


// Exercise 6: Node.js with Prepared Statements

import mysql from 'mysql2/promise';

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'exercise_db',
  connectionLimit: 10,
  waitForConnections: true
});

// a) Get products by category - SAFE with prepared statement
async function getProductsByCategory(category) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM products WHERE category = ?',
      [category]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
}

// b) Insert new product - SAFE with prepared statement
async function insertProduct(name, price, category, stock) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO products (name, price, category, stock_quantity) VALUES (?, ?, ?, ?)',
      [name, price, category, stock]
    );
    return {
      success: true,
      insertId: result.insertId,
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error('Error inserting product:', error.message);
    throw error;
  }
}

// c) Update product price - SAFE with prepared statement
async function updateProductPrice(productId, newPrice) {
  try {
    const [result] = await pool.execute(
      'UPDATE products SET price = ? WHERE id = ?',
      [newPrice, productId]
    );
    
    if (result.affectedRows === 0) {
      throw new Error('Product not found');
    }
    
    return {
      success: true,
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw error;
  }
}

// d) Delete product - SAFE with prepared statement
async function deleteProduct(productId) {
  try {
    const [result] = await pool.execute(
      'DELETE FROM products WHERE id = ?',
      [productId]
    );
    
    if (result.affectedRows === 0) {
      throw new Error('Product not found');
    }
    
    return {
      success: true,
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error('Error deleting product:', error.message);
    throw error;
  }
}

// Example usage
async function runExamples() {
  try {
    // Get Electronics products
    console.log('\\n=== Exercise 6a: Get Products by Category ===');
    const electronics = await getProductsByCategory('Electronics');
    console.log(\`Found \${electronics.length} electronics:\`, electronics);
    
    // Insert new product
    console.log('\\n=== Exercise 6b: Insert Product ===');
    const insertResult = await insertProduct('USB Cable', 14.99, 'Electronics', 100);
    console.log('Inserted product with ID:', insertResult.insertId);
    
    // Update product price
    console.log('\\n=== Exercise 6c: Update Product Price ===');
    const updateResult = await updateProductPrice(1, 949.99);
    console.log('Updated product, affected rows:', updateResult.affectedRows);
    
    // Delete product
    console.log('\\n=== Exercise 6d: Delete Product ===');
    const deleteResult = await deleteProduct(insertResult.insertId);
    console.log('Deleted product, affected rows:', deleteResult.affectedRows);
    
  } catch (error) {
    console.error('Example failed:', error.message);
  } finally {
    await pool.end();
  }
}

// Uncomment to run examples
// runExamples();

export {
  getProductsByCategory,
  insertProduct,
  updateProductPrice,
  deleteProduct,
  pool
};
`,

  hints: [
    'Exercise 1a: Use WHERE clause with category = "Electronics"',
    'Exercise 1b: Use WHERE clause with price < 50',
    'Exercise 1d: Use ORDER BY price DESC with LIMIT 3',
    'Exercise 2b: Separate multiple value sets with commas in VALUES clause',
    'Exercise 2c: Use SELECT LAST_INSERT_ID() after INSERT to get the auto-generated ID',
    'Exercise 3b: Use SET column = column + 10 to increment values',
    'Exercise 3d: Use SET price = price * 0.9 to apply 10% discount (multiply by 0.9)',
    'Exercise 4d: Soft delete is safer - use UPDATE with deleted_at = NOW() instead of DELETE',
    'Exercise 5a: Use parentheses for OR conditions: (cat1 OR cat2) AND price > 50',
    'Exercise 5b: Use BETWEEN operator: stock_quantity BETWEEN 10 AND 50',
    'Exercise 5d: Use GROUP BY category with COUNT(*) to count per category',
    'Exercise 6: ALWAYS use ? placeholders and pass values as array: execute(sql, [val1, val2])',
    'Security: Never concatenate user input into SQL strings - always use prepared statements!',
    'Remember: Check result.affectedRows to verify if UPDATE/DELETE actually modified rows',
    'Tip: Use try-catch blocks to handle database errors gracefully'
  ],

  hintsFa: [
    'تمرین ۱الف: از بند WHERE با category = "Electronics" استفاده کنید',
    'تمرین ۱ب: از بند WHERE با price < 50 استفاده کنید',
    'تمرین ۱د: از ORDER BY price DESC با LIMIT 3 استفاده کنید',
    'تمرین ۲ب: مجموعه‌های مقدار متعدد را با کاما در بند VALUES جدا کنید',
    'تمرین ۲ج: از SELECT LAST_INSERT_ID() بعد از INSERT برای دریافت ID خودکار تولید شده استفاده کنید',
    'تمرین ۳ب: از SET column = column + 10 برای افزایش مقادیر استفاده کنید',
    'تمرین ۳د: از SET price = price * 0.9 برای اعمال ۱۰٪ تخفیف استفاده کنید (ضرب در ۰.۹)',
    'تمرین ۴د: حذف نرم ایمن‌تر است - از UPDATE با deleted_at = NOW() به جای DELETE استفاده کنید',
    'تمرین ۵الف: از پرانتز برای شرایط OR استفاده کنید: (cat1 OR cat2) AND price > 50',
    'تمرین ۵ب: از عملگر BETWEEN استفاده کنید: stock_quantity BETWEEN 10 AND 50',
    'تمرین ۵د: از GROUP BY category با COUNT(*) برای شمارش در هر دسته استفاده کنید',
    'تمرین ۶: همیشه از جایگزین‌های ? استفاده کنید و مقادیر را به عنوان آرایه ارسال کنید: execute(sql, [val1, val2])',
    'امنیت: هرگز ورودی کاربر را در رشته‌های SQL concatenate نکنید - همیشه از prepared statements استفاده کنید!',
    'به یاد داشته باشید: result.affectedRows را بررسی کنید تا تأیید کنید UPDATE/DELETE واقعاً سطرها را تغییر داده',
    'نکته: از بلوک‌های try-catch برای مدیریت نرم خطاهای پایگاه داده استفاده کنید'
  ],

  testCases: [
    {
      input: 'SELECT * FROM products WHERE category = "Electronics"',
      expected: 'Array of products with category="Electronics"',
      description: 'Should filter products by category'
    },
    {
      input: 'SELECT * FROM products WHERE price < 50',
      expected: 'Array of products with price less than 50',
      description: 'Should filter products by price'
    },
    {
      input: 'INSERT INTO products (name, price, category, stock_quantity) VALUES ("Keyboard", 79.99, "Electronics", 30)',
      expected: 'New product inserted with auto-generated ID',
      description: 'Should insert single product'
    },
    {
      input: 'INSERT multiple products',
      expected: 'Multiple products inserted in one query',
      description: 'Should insert multiple products efficiently'
    },
    {
      input: 'UPDATE products SET price = 899.99 WHERE id = 1',
      expected: 'Product price updated, affectedRows = 1',
      description: 'Should update product price'
    },
    {
      input: 'UPDATE products SET stock_quantity = stock_quantity + 10 WHERE category = "Stationery"',
      expected: 'Multiple products updated',
      description: 'Should update multiple products'
    },
    {
      input: 'DELETE FROM products WHERE id = 5',
      expected: 'Product deleted, affectedRows = 1',
      description: 'Should delete specific product'
    },
    {
      input: 'UPDATE products SET deleted_at = NOW() WHERE id = 5',
      expected: 'Product soft deleted (marked as deleted)',
      description: 'Should implement soft delete'
    },
    {
      input: 'getProductsByCategory("Electronics")',
      expected: 'Array of electronics products using prepared statement',
      description: 'Should use prepared statement with parameter'
    },
    {
      input: 'insertProduct("USB Cable", 14.99, "Electronics", 100)',
      expected: '{ success: true, insertId: X, affectedRows: 1 }',
      description: 'Should insert product using prepared statement'
    },
    {
      input: 'updateProductPrice(1, 949.99)',
      expected: '{ success: true, affectedRows: 1 }',
      description: 'Should update price using prepared statement'
    },
    {
      input: 'deleteProduct(5)',
      expected: '{ success: true, affectedRows: 1 }',
      description: 'Should delete product using prepared statement'
    }
  ]
};

export default sqlQueriesExercises;
