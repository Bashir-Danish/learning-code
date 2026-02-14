export const sqlInsertUpdateDelete = {
  id: 'sql-insert-update-delete',
  title: 'SQL INSERT, UPDATE, DELETE',
  titleFa: 'دستورات INSERT، UPDATE، DELETE در SQL',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# SQL INSERT, UPDATE, DELETE - Modifying Database Data

## Introduction

While SELECT retrieves data, **INSERT**, **UPDATE**, and **DELETE** statements modify data in your database. These are the fundamental operations for creating, changing, and removing records.

**What you'll learn:**
- INSERT: Adding new records
- UPDATE: Modifying existing records
- DELETE: Removing records
- Using prepared statements for security
- Safety best practices
- Transaction basics

**⚠️ Warning:** These operations permanently change your data. Always be careful, especially with UPDATE and DELETE!

---

## INSERT Statement - Adding New Records

### Basic INSERT Syntax

\`\`\`sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
\`\`\`

### Insert Single Row

\`\`\`sql
-- Add a new user
INSERT INTO users (username, email, age)
VALUES ('alice', 'alice@example.com', 25);

-- Add a product
INSERT INTO products (name, price, category)
VALUES ('Laptop', 999.99, 'Electronics');

-- Add an order
INSERT INTO orders (customer_id, total_amount, status)
VALUES (1, 150.00, 'pending');
\`\`\`

**Result:**
\`\`\`
Query OK, 1 row affected
\`\`\`

### Insert with AUTO_INCREMENT

\`\`\`sql
-- ID is auto-generated
INSERT INTO users (username, email)
VALUES ('bob', 'bob@example.com');

-- Get the generated ID
SELECT LAST_INSERT_ID();
\`\`\`

**Result:**
\`\`\`
+------------------+
| LAST_INSERT_ID() |
+------------------+
|               42 |
+------------------+
\`\`\`

### Insert Multiple Rows

\`\`\`sql
-- Add multiple users at once
INSERT INTO users (username, email, age)
VALUES 
  ('charlie', 'charlie@example.com', 30),
  ('diana', 'diana@example.com', 28),
  ('eve', 'eve@example.com', 35);

-- Add multiple products
INSERT INTO products (name, price, category)
VALUES 
  ('Mouse', 29.99, 'Electronics'),
  ('Keyboard', 79.99, 'Electronics'),
  ('Monitor', 299.99, 'Electronics');
\`\`\`

**Result:**
\`\`\`
Query OK, 3 rows affected
\`\`\`

> **Performance Tip:** Inserting multiple rows in one statement is much faster than multiple single-row inserts!

### Insert with Default Values

\`\`\`sql
-- Use DEFAULT keyword for columns with default values
INSERT INTO posts (user_id, title, content, status)
VALUES (1, 'My First Post', 'Hello World!', DEFAULT);

-- Or omit columns with defaults
INSERT INTO posts (user_id, title, content)
VALUES (1, 'My Second Post', 'Another post');
\`\`\`

### INSERT with Node.js (Prepared Statements) 🔒

\`\`\`javascript
// Insert single user - SAFE
async function createUser(username, email, age) {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, age) VALUES (?, ?, ?)',
    [username, email, age]
  );
  
  console.log('Inserted ID:', result.insertId);
  console.log('Rows affected:', result.affectedRows);
  return result.insertId;
}

// Usage
const newUserId = await createUser('frank', 'frank@example.com', 27);
\`\`\`

**Result Object:**
\`\`\`javascript
{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 42,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}
\`\`\`

### Insert Multiple Rows with Node.js

\`\`\`javascript
// Insert multiple users efficiently
async function createMultipleUsers(users) {
  // users = [['alice', 'alice@example.com', 25], ['bob', 'bob@example.com', 30]]
  
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, age) VALUES ?',
    [users]
  );
  
  return result.affectedRows;
}

// Usage
const usersToAdd = [
  ['grace', 'grace@example.com', 29],
  ['henry', 'henry@example.com', 31],
  ['iris', 'iris@example.com', 26]
];
await createMultipleUsers(usersToAdd);
\`\`\`

---

## UPDATE Statement - Modifying Existing Records

### Basic UPDATE Syntax

\`\`\`sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
\`\`\`

> **⚠️ CRITICAL:** Always include a WHERE clause! Without it, ALL rows will be updated!

### Update Single Row

\`\`\`sql
-- Update user's email
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 5;

-- Update product price
UPDATE products
SET price = 899.99
WHERE id = 10;

-- Update order status
UPDATE orders
SET status = 'shipped'
WHERE id = 123;
\`\`\`

**Result:**
\`\`\`
Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
\`\`\`

### Update Multiple Columns

\`\`\`sql
-- Update user profile
UPDATE users
SET 
  email = 'updated@example.com',
  age = 26,
  updated_at = NOW()
WHERE id = 5;

-- Update product details
UPDATE products
SET 
  price = 799.99,
  stock_quantity = 50,
  last_updated = CURRENT_TIMESTAMP
WHERE id = 10;
\`\`\`

### Update Multiple Rows

\`\`\`sql
-- Mark all pending orders as processing
UPDATE orders
SET status = 'processing'
WHERE status = 'pending';

-- Increase prices for all electronics by 10%
UPDATE products
SET price = price * 1.10
WHERE category = 'Electronics';

-- Deactivate inactive users
UPDATE users
SET status = 'inactive'
WHERE last_login < DATE_SUB(NOW(), INTERVAL 1 YEAR);
\`\`\`

**Result:**
\`\`\`
Query OK, 15 rows affected
Rows matched: 15  Changed: 15  Warnings: 0
\`\`\`

### UPDATE with Calculations

\`\`\`sql
-- Increment view count
UPDATE posts
SET view_count = view_count + 1
WHERE id = 42;

-- Apply discount
UPDATE products
SET price = price * 0.9  -- 10% off
WHERE category = 'Clearance';

-- Update stock after sale
UPDATE products
SET stock_quantity = stock_quantity - 5
WHERE id = 10;
\`\`\`

### UPDATE with Node.js (Prepared Statements) 🔒

\`\`\`javascript
// Update user email - SAFE
async function updateUserEmail(userId, newEmail) {
  const [result] = await pool.execute(
    'UPDATE users SET email = ?, updated_at = NOW() WHERE id = ?',
    [newEmail, userId]
  );
  
  console.log('Rows affected:', result.affectedRows);
  return result.affectedRows > 0;
}

// Usage
const success = await updateUserEmail(5, 'newemail@example.com');
\`\`\`

### Update Multiple Fields

\`\`\`javascript
// Update user profile
async function updateUserProfile(userId, updates) {
  const { username, email, age } = updates;
  
  const [result] = await pool.execute(
    \`UPDATE users 
     SET username = ?, email = ?, age = ?, updated_at = NOW()
     WHERE id = ?\`,
    [username, email, age, userId]
  );
  
  return result.affectedRows > 0;
}

// Usage
await updateUserProfile(5, {
  username: 'alice_updated',
  email: 'alice_new@example.com',
  age: 26
});
\`\`\`

---

## DELETE Statement - Removing Records

### Basic DELETE Syntax

\`\`\`sql
DELETE FROM table_name
WHERE condition;
\`\`\`

> **⚠️ DANGER:** Always include a WHERE clause! Without it, ALL rows will be deleted!

### Delete Single Row

\`\`\`sql
-- Delete specific user
DELETE FROM users WHERE id = 5;

-- Delete specific product
DELETE FROM products WHERE id = 10;

-- Delete specific order
DELETE FROM orders WHERE id = 123;
\`\`\`

**Result:**
\`\`\`
Query OK, 1 row affected
\`\`\`

### Delete Multiple Rows

\`\`\`sql
-- Delete all cancelled orders
DELETE FROM orders WHERE status = 'cancelled';

-- Delete old logs
DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Delete inactive users
DELETE FROM users 
WHERE status = 'inactive' 
  AND last_login < DATE_SUB(NOW(), INTERVAL 2 YEAR);
\`\`\`

**Result:**
\`\`\`
Query OK, 25 rows affected
\`\`\`

### Delete with Conditions

\`\`\`sql
-- Delete products with zero stock
DELETE FROM products WHERE stock_quantity = 0;

-- Delete expired sessions
DELETE FROM sessions WHERE expires_at < NOW();

-- Delete spam comments
DELETE FROM comments 
WHERE is_spam = 1 
  AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY);
\`\`\`

### DELETE with Node.js (Prepared Statements) 🔒

\`\`\`javascript
// Delete user - SAFE
async function deleteUser(userId) {
  const [result] = await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
  );
  
  console.log('Rows deleted:', result.affectedRows);
  return result.affectedRows > 0;
}

// Usage
const deleted = await deleteUser(5);
if (deleted) {
  console.log('User deleted successfully');
} else {
  console.log('User not found');
}
\`\`\`

### Delete with Confirmation

\`\`\`javascript
// Delete with safety check
async function deleteUserSafely(userId) {
  // First, check if user exists
  const [users] = await pool.execute(
    'SELECT id, username FROM users WHERE id = ?',
    [userId]
  );
  
  if (users.length === 0) {
    throw new Error('User not found');
  }
  
  // Then delete
  const [result] = await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
  );
  
  return {
    deleted: true,
    username: users[0].username
  };
}
\`\`\`

### Soft Delete (Recommended for Important Data)

Instead of permanently deleting, mark records as deleted:

\`\`\`sql
-- Add deleted_at column to table
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;

-- "Delete" by setting timestamp
UPDATE users 
SET deleted_at = NOW()
WHERE id = 5;

-- Query only non-deleted records
SELECT * FROM users WHERE deleted_at IS NULL;
\`\`\`

\`\`\`javascript
// Soft delete function
async function softDeleteUser(userId) {
  const [result] = await pool.execute(
    'UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [userId]
  );
  
  return result.affectedRows > 0;
}

// Get active users only
async function getActiveUsers() {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC'
  );
  return rows;
}
\`\`\`

**Benefits of Soft Delete:**
- ✅ Can restore deleted data
- ✅ Maintains referential integrity
- ✅ Keeps audit trail
- ✅ Safer for production systems

---

## Practical Examples

### Example 1: User Registration

\`\`\`javascript
// Complete user registration flow
async function registerUser(userData) {
  const { username, email, password, age } = userData;
  
  try {
    // Check if username exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      throw new Error('Username or email already exists');
    }
    
    // Insert new user
    const [result] = await pool.execute(
      \`INSERT INTO users (username, email, password_hash, age, created_at)
       VALUES (?, ?, ?, ?, NOW())\`,
      [username, email, password, age]
    );
    
    return {
      success: true,
      userId: result.insertId
    };
  } catch (error) {
    console.error('Registration failed:', error.message);
    throw error;
  }
}

// Usage
const newUser = await registerUser({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'hashed_password_here',
  age: 28
});
\`\`\`

### Example 2: Update User Profile

\`\`\`javascript
// Update user profile with validation
async function updateProfile(userId, updates) {
  const allowedFields = ['username', 'email', 'age', 'bio'];
  const fields = [];
  const values = [];
  
  // Build dynamic UPDATE query
  for (const [key, value] of Object.entries(updates)) {
    if (allowedFields.includes(key)) {
      fields.push(\`\${key} = ?\`);
      values.push(value);
    }
  }
  
  if (fields.length === 0) {
    throw new Error('No valid fields to update');
  }
  
  // Add updated_at
  fields.push('updated_at = NOW()');
  values.push(userId);
  
  const sql = \`UPDATE users SET \${fields.join(', ')} WHERE id = ?\`;
  const [result] = await pool.execute(sql, values);
  
  return result.affectedRows > 0;
}

// Usage
await updateProfile(5, {
  username: 'john_updated',
  bio: 'Software developer'
});
\`\`\`

### Example 3: Product Inventory Management

\`\`\`javascript
// Add product to inventory
async function addProduct(product) {
  const { name, description, price, category, stock } = product;
  
  const [result] = await pool.execute(
    \`INSERT INTO products (name, description, price, category, stock_quantity, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())\`,
    [name, description, price, category, stock]
  );
  
  return result.insertId;
}

// Update product stock after sale
async function updateStock(productId, quantitySold) {
  const [result] = await pool.execute(
    \`UPDATE products 
     SET stock_quantity = stock_quantity - ?,
         last_updated = NOW()
     WHERE id = ? AND stock_quantity >= ?\`,
    [quantitySold, productId, quantitySold]
  );
  
  if (result.affectedRows === 0) {
    throw new Error('Insufficient stock or product not found');
  }
  
  return true;
}

// Remove discontinued products
async function removeDiscontinuedProducts() {
  const [result] = await pool.execute(
    \`DELETE FROM products 
     WHERE status = 'discontinued' 
       AND stock_quantity = 0
       AND last_updated < DATE_SUB(NOW(), INTERVAL 6 MONTH)\`
  );
  
  return result.affectedRows;
}
\`\`\`

### Example 4: Order Processing

\`\`\`javascript
// Create new order
async function createOrder(customerId, items) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Insert order
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (customer_id, status, created_at) VALUES (?, ?, NOW())',
      [customerId, 'pending']
    );
    
    const orderId = orderResult.insertId;
    
    // Insert order items
    for (const item of items) {
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, item.price]
      );
      
      // Update product stock
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.productId]
      );
    }
    
    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
\`\`\`

### Example 5: Bulk Operations

\`\`\`javascript
// Bulk insert with error handling
async function bulkInsertUsers(users) {
  const values = users.map(u => [u.username, u.email, u.age]);
  
  try {
    const placeholders = users.map(() => '(?, ?, ?)').join(', ');
    const flatValues = values.flat();
    
    const [result] = await pool.execute(
      \`INSERT INTO users (username, email, age) VALUES \${placeholders}\`,
      flatValues
    );
    
    return {
      success: true,
      inserted: result.affectedRows
    };
  } catch (error) {
    console.error('Bulk insert failed:', error.message);
    throw error;
  }
}

// Bulk update
async function bulkUpdatePrices(categoryId, percentageIncrease) {
  const [result] = await pool.execute(
    'UPDATE products SET price = price * ? WHERE category_id = ?',
    [1 + (percentageIncrease / 100), categoryId]
  );
  
  return result.affectedRows;
}

// Bulk delete
async function cleanupOldRecords(tableName, daysOld) {
  const [result] = await pool.execute(
    \`DELETE FROM ?? WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)\`,
    [tableName, daysOld]
  );
  
  return result.affectedRows;
}
\`\`\`

---

## Transactions - Ensuring Data Consistency

Transactions ensure that multiple operations either all succeed or all fail together.

### Basic Transaction

\`\`\`javascript
async function transferMoney(fromUserId, toUserId, amount) {
  const connection = await pool.getConnection();
  
  try {
    // Start transaction
    await connection.beginTransaction();
    
    // Deduct from sender
    await connection.execute(
      'UPDATE accounts SET balance = balance - ? WHERE user_id = ?',
      [amount, fromUserId]
    );
    
    // Add to receiver
    await connection.execute(
      'UPDATE accounts SET balance = balance + ? WHERE user_id = ?',
      [amount, toUserId]
    );
    
    // Commit if both succeed
    await connection.commit();
    return { success: true };
  } catch (error) {
    // Rollback if any operation fails
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
\`\`\`

**Transaction Properties (ACID):**
- **Atomicity**: All operations succeed or all fail
- **Consistency**: Database remains in valid state
- **Isolation**: Transactions don't interfere with each other
- **Durability**: Committed changes are permanent

---

## Common Mistakes

### 1. Forgetting WHERE Clause ⚠️

❌ **DANGEROUS:**
\`\`\`sql
UPDATE users SET status = 'inactive';  -- Updates ALL users!
DELETE FROM orders;  -- Deletes ALL orders!
\`\`\`

✅ **Correct:**
\`\`\`sql
UPDATE users SET status = 'inactive' WHERE id = 5;
DELETE FROM orders WHERE id = 123;
\`\`\`

### 2. SQL Injection Vulnerability

❌ **DANGEROUS:**
\`\`\`javascript
// Never concatenate user input!
const sql = \`INSERT INTO users (username, email) VALUES ('\${username}', '\${email}')\`;
await pool.execute(sql);
\`\`\`

✅ **Correct:**
\`\`\`javascript
// Always use prepared statements
await pool.execute(
  'INSERT INTO users (username, email) VALUES (?, ?)',
  [username, email]
);
\`\`\`

### 3. Not Checking Affected Rows

❌ **Wrong:**
\`\`\`javascript
await pool.execute('UPDATE users SET email = ? WHERE id = ?', [email, userId]);
// Assumes update succeeded
\`\`\`

✅ **Correct:**
\`\`\`javascript
const [result] = await pool.execute(
  'UPDATE users SET email = ? WHERE id = ?',
  [email, userId]
);

if (result.affectedRows === 0) {
  throw new Error('User not found or no changes made');
}
\`\`\`

### 4. Not Using Transactions for Related Operations

❌ **Wrong:**
\`\`\`javascript
// If second operation fails, first is already committed
await pool.execute('INSERT INTO orders (user_id) VALUES (?)', [userId]);
await pool.execute('UPDATE users SET order_count = order_count + 1 WHERE id = ?', [userId]);
\`\`\`

✅ **Correct:**
\`\`\`javascript
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  await connection.execute('INSERT INTO orders (user_id) VALUES (?)', [userId]);
  await connection.execute('UPDATE users SET order_count = order_count + 1 WHERE id = ?', [userId]);
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
\`\`\`

### 5. Ignoring Foreign Key Constraints

❌ **Wrong:**
\`\`\`javascript
// Trying to insert with non-existent foreign key
await pool.execute(
  'INSERT INTO orders (user_id, total) VALUES (?, ?)',
  [999999, 100.00]  // user_id 999999 doesn't exist
);
// Error: Cannot add or update a child row: a foreign key constraint fails
\`\`\`

✅ **Correct:**
\`\`\`javascript
// Check if foreign key exists first
const [users] = await pool.execute('SELECT id FROM users WHERE id = ?', [userId]);
if (users.length === 0) {
  throw new Error('User not found');
}

await pool.execute(
  'INSERT INTO orders (user_id, total) VALUES (?, ?)',
  [userId, 100.00]
);
\`\`\`

### 6. Not Handling Duplicate Key Errors

❌ **Wrong:**
\`\`\`javascript
// Crashes if username already exists
await pool.execute(
  'INSERT INTO users (username, email) VALUES (?, ?)',
  [username, email]
);
\`\`\`

✅ **Correct:**
\`\`\`javascript
try {
  await pool.execute(
    'INSERT INTO users (username, email) VALUES (?, ?)',
    [username, email]
  );
} catch (error) {
  if (error.code === 'ER_DUP_ENTRY') {
    throw new Error('Username or email already exists');
  }
  throw error;
}

// Or use INSERT IGNORE / ON DUPLICATE KEY UPDATE
await pool.execute(
  'INSERT INTO users (username, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE email = ?',
  [username, email, email]
);
\`\`\`

---

## Best Practices

### 1. Always Use Prepared Statements
\`\`\`javascript
// ✅ SAFE - Parameters are escaped
await pool.execute('INSERT INTO users (name) VALUES (?)', [userInput]);

// ❌ DANGEROUS - SQL injection risk
await pool.execute(\`INSERT INTO users (name) VALUES ('\${userInput}')\`);
\`\`\`

### 2. Use Transactions for Related Operations
\`\`\`javascript
// Group related operations in a transaction
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  // Multiple operations...
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
\`\`\`

### 3. Validate Data Before Database Operations
\`\`\`javascript
function validateUser(userData) {
  if (!userData.username || userData.username.length < 3) {
    throw new Error('Username must be at least 3 characters');
  }
  if (!userData.email || !userData.email.includes('@')) {
    throw new Error('Invalid email address');
  }
  // More validation...
}

// Use before insert/update
validateUser(userData);
await pool.execute('INSERT INTO users ...', [userData.username, userData.email]);
\`\`\`

### 4. Check Affected Rows
\`\`\`javascript
const [result] = await pool.execute('UPDATE users SET ... WHERE id = ?', [userId]);

if (result.affectedRows === 0) {
  // No rows were updated - handle appropriately
  throw new Error('User not found or no changes made');
}
\`\`\`

### 5. Use Soft Deletes for Important Data
\`\`\`javascript
// Instead of DELETE, use UPDATE with deleted_at timestamp
await pool.execute(
  'UPDATE users SET deleted_at = NOW() WHERE id = ?',
  [userId]
);

// Filter out deleted records in queries
await pool.execute(
  'SELECT * FROM users WHERE deleted_at IS NULL'
);
\`\`\`

### 6. Log Important Operations
\`\`\`javascript
async function deleteUser(userId) {
  // Log before deletion
  console.log(\`Deleting user \${userId} at \${new Date().toISOString()}\`);
  
  const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
  
  // Log result
  console.log(\`Deleted \${result.affectedRows} user(s)\`);
  
  return result.affectedRows > 0;
}
\`\`\`

---

## Quick Reference

### INSERT Syntax
\`\`\`sql
-- Single row
INSERT INTO table (col1, col2) VALUES (val1, val2);

-- Multiple rows
INSERT INTO table (col1, col2) VALUES 
  (val1, val2),
  (val3, val4);

-- With Node.js
await pool.execute('INSERT INTO table (col1, col2) VALUES (?, ?)', [val1, val2]);
\`\`\`

### UPDATE Syntax
\`\`\`sql
-- Basic update
UPDATE table SET col1 = val1, col2 = val2 WHERE condition;

-- With calculations
UPDATE table SET price = price * 1.1 WHERE category = 'Electronics';

-- With Node.js
await pool.execute('UPDATE table SET col1 = ? WHERE id = ?', [val1, id]);
\`\`\`

### DELETE Syntax
\`\`\`sql
-- Delete specific rows
DELETE FROM table WHERE condition;

-- Soft delete (recommended)
UPDATE table SET deleted_at = NOW() WHERE id = ?;

-- With Node.js
await pool.execute('DELETE FROM table WHERE id = ?', [id]);
\`\`\`

### Transaction Syntax
\`\`\`javascript
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  // Operations...
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
\`\`\`

### Common Error Codes
| Code | Description | Solution |
|------|-------------|----------|
| \`ER_DUP_ENTRY\` | Duplicate key error | Check for existing records first |
| \`ER_NO_REFERENCED_ROW\` | Foreign key constraint fails | Ensure referenced record exists |
| \`ER_ROW_IS_REFERENCED\` | Cannot delete (referenced by other table) | Delete child records first or use CASCADE |
| \`ER_BAD_NULL_ERROR\` | NULL value in NOT NULL column | Provide value for required columns |

---

## Performance Tips

### 1. Batch Inserts
\`\`\`javascript
// ❌ Slow - Multiple queries
for (const user of users) {
  await pool.execute('INSERT INTO users (name) VALUES (?)', [user.name]);
}

// ✅ Fast - Single query
const values = users.map(u => [u.name, u.email]);
const placeholders = users.map(() => '(?, ?)').join(', ');
await pool.execute(
  \`INSERT INTO users (name, email) VALUES \${placeholders}\`,
  values.flat()
);
\`\`\`

### 2. Use Indexes on WHERE Columns
\`\`\`sql
-- Create index for frequently updated/deleted columns
CREATE INDEX idx_status ON orders(status);
CREATE INDEX idx_user_id ON orders(user_id);
\`\`\`

### 3. Limit UPDATE/DELETE Scope
\`\`\`sql
-- Add LIMIT to prevent accidental mass updates
UPDATE users SET status = 'active' WHERE last_login > NOW() LIMIT 1000;
\`\`\`

---

## Next Steps

Now that you understand data modification, you're ready to:
1. Learn JOIN operations to combine data from multiple tables
2. Use aggregate functions (COUNT, SUM, AVG) for data analysis
3. Master subqueries and complex queries
4. Explore database design and normalization

> **Remember:** 
> - Always use prepared statements! 🔒
> - Always include WHERE clause in UPDATE/DELETE! ⚠️
> - Use transactions for related operations! 🔄
> - Consider soft deletes for important data! 💾
`,

  contentFa: `
# دستورات INSERT، UPDATE، DELETE در SQL - تغییر داده‌های پایگاه داده

## مقدمه

در حالی که SELECT داده را بازیابی می‌کند، دستورات **INSERT**، **UPDATE** و **DELETE** داده را در پایگاه داده شما تغییر می‌دهند. این‌ها عملیات اساسی برای ایجاد، تغییر و حذف رکوردها هستند.

**چه چیزی یاد می‌گیرید:**
- INSERT: افزودن رکوردهای جدید
- UPDATE: تغییر رکوردهای موجود
- DELETE: حذف رکوردها
- استفاده از prepared statements برای امنیت
- بهترین شیوه‌های ایمنی
- مبانی تراکنش‌ها

**⚠️ هشدار:** این عملیات به طور دائمی داده‌های شما را تغییر می‌دهند. همیشه مراقب باشید، به خصوص با UPDATE و DELETE!

---

## دستور INSERT - افزودن رکوردهای جدید

### نحو پایه INSERT

\`\`\`sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
\`\`\`

### درج یک سطر

\`\`\`sql
-- افزودن کاربر جدید
INSERT INTO users (username, email, age)
VALUES ('alice', 'alice@example.com', 25);

-- افزودن محصول
INSERT INTO products (name, price, category)
VALUES ('Laptop', 999.99, 'Electronics');

-- افزودن سفارش
INSERT INTO orders (customer_id, total_amount, status)
VALUES (1, 150.00, 'pending');
\`\`\`

**نتیجه:**
\`\`\`
Query OK, 1 row affected
\`\`\`

### درج با AUTO_INCREMENT

\`\`\`sql
-- ID به صورت خودکار تولید می‌شود
INSERT INTO users (username, email)
VALUES ('bob', 'bob@example.com');

-- دریافت ID تولید شده
SELECT LAST_INSERT_ID();
\`\`\`

**نتیجه:**
\`\`\`
+------------------+
| LAST_INSERT_ID() |
+------------------+
|               42 |
+------------------+
\`\`\`

### درج چند سطر

\`\`\`sql
-- افزودن چند کاربر به یکباره
INSERT INTO users (username, email, age)
VALUES 
  ('charlie', 'charlie@example.com', 30),
  ('diana', 'diana@example.com', 28),
  ('eve', 'eve@example.com', 35);
\`\`\`

**نتیجه:**
\`\`\`
Query OK, 3 rows affected
\`\`\`

> **نکته عملکرد:** درج چند سطر در یک دستور بسیار سریع‌تر از چند درج تک‌سطری است!

### INSERT با Node.js (Prepared Statements) 🔒

\`\`\`javascript
// درج کاربر - ایمن
async function createUser(username, email, age) {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, age) VALUES (?, ?, ?)',
    [username, email, age]
  );
  
  console.log('ID درج شده:', result.insertId);
  console.log('سطرهای تاثیر یافته:', result.affectedRows);
  return result.insertId;
}

// استفاده
const newUserId = await createUser('frank', 'frank@example.com', 27);
\`\`\`

---

## دستور UPDATE - تغییر رکوردهای موجود

### نحو پایه UPDATE

\`\`\`sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
\`\`\`

> **⚠️ بسیار مهم:** همیشه بند WHERE را اضافه کنید! بدون آن، همه سطرها به‌روزرسانی می‌شوند!

### به‌روزرسانی یک سطر

\`\`\`sql
-- به‌روزرسانی ایمیل کاربر
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 5;

-- به‌روزرسانی قیمت محصول
UPDATE products
SET price = 899.99
WHERE id = 10;
\`\`\`

**نتیجه:**
\`\`\`
Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
\`\`\`

### به‌روزرسانی چند ستون

\`\`\`sql
-- به‌روزرسانی پروفایل کاربر
UPDATE users
SET 
  email = 'updated@example.com',
  age = 26,
  updated_at = NOW()
WHERE id = 5;
\`\`\`

### UPDATE با Node.js (Prepared Statements) 🔒

\`\`\`javascript
// به‌روزرسانی ایمیل کاربر - ایمن
async function updateUserEmail(userId, newEmail) {
  const [result] = await pool.execute(
    'UPDATE users SET email = ?, updated_at = NOW() WHERE id = ?',
    [newEmail, userId]
  );
  
  console.log('سطرهای تاثیر یافته:', result.affectedRows);
  return result.affectedRows > 0;
}

// استفاده
const success = await updateUserEmail(5, 'newemail@example.com');
\`\`\`

---

## دستور DELETE - حذف رکوردها

### نحو پایه DELETE

\`\`\`sql
DELETE FROM table_name
WHERE condition;
\`\`\`

> **⚠️ خطر:** همیشه بند WHERE را اضافه کنید! بدون آن، همه سطرها حذف می‌شوند!

### حذف یک سطر

\`\`\`sql
-- حذف کاربر خاص
DELETE FROM users WHERE id = 5;

-- حذف محصول خاص
DELETE FROM products WHERE id = 10;
\`\`\`

**نتیجه:**
\`\`\`
Query OK, 1 row affected
\`\`\`

### حذف چند سطر

\`\`\`sql
-- حذف همه سفارشات لغو شده
DELETE FROM orders WHERE status = 'cancelled';

-- حذف لاگ‌های قدیمی
DELETE FROM logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
\`\`\`

### DELETE با Node.js (Prepared Statements) 🔒

\`\`\`javascript
// حذف کاربر - ایمن
async function deleteUser(userId) {
  const [result] = await pool.execute(
    'DELETE FROM users WHERE id = ?',
    [userId]
  );
  
  console.log('سطرهای حذف شده:', result.affectedRows);
  return result.affectedRows > 0;
}

// استفاده
const deleted = await deleteUser(5);
if (deleted) {
  console.log('کاربر با موفقیت حذف شد');
} else {
  console.log('کاربر یافت نشد');
}
\`\`\`

### حذف نرم (Soft Delete) - توصیه شده برای داده‌های مهم

به جای حذف دائمی، رکوردها را به عنوان حذف شده علامت‌گذاری کنید:

\`\`\`sql
-- افزودن ستون deleted_at به جدول
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP NULL;

-- "حذف" با تنظیم timestamp
UPDATE users 
SET deleted_at = NOW()
WHERE id = 5;

-- کوئری فقط رکوردهای حذف نشده
SELECT * FROM users WHERE deleted_at IS NULL;
\`\`\`

\`\`\`javascript
// تابع حذف نرم
async function softDeleteUser(userId) {
  const [result] = await pool.execute(
    'UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
    [userId]
  );
  
  return result.affectedRows > 0;
}

// دریافت فقط کاربران فعال
async function getActiveUsers() {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC'
  );
  return rows;
}
\`\`\`

**مزایای حذف نرم:**
- ✅ می‌توان داده‌های حذف شده را بازیابی کرد
- ✅ یکپارچگی ارجاعی را حفظ می‌کند
- ✅ سابقه ممیزی را نگه می‌دارد
- ✅ برای سیستم‌های تولید ایمن‌تر است

---

## تراکنش‌ها (Transactions) - اطمینان از سازگاری داده

تراکنش‌ها اطمینان می‌دهند که چند عملیات یا همه موفق می‌شوند یا همه شکست می‌خورند.

### تراکنش پایه

\`\`\`javascript
async function transferMoney(fromUserId, toUserId, amount) {
  const connection = await pool.getConnection();
  
  try {
    // شروع تراکنش
    await connection.beginTransaction();
    
    // کسر از فرستنده
    await connection.execute(
      'UPDATE accounts SET balance = balance - ? WHERE user_id = ?',
      [amount, fromUserId]
    );
    
    // افزودن به گیرنده
    await connection.execute(
      'UPDATE accounts SET balance = balance + ? WHERE user_id = ?',
      [amount, toUserId]
    );
    
    // commit اگر هر دو موفق شوند
    await connection.commit();
    return { success: true };
  } catch (error) {
    // rollback اگر هر عملیاتی شکست بخورد
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
\`\`\`

**ویژگی‌های تراکنش (ACID):**
- **Atomicity (اتمی بودن)**: همه عملیات موفق یا همه شکست می‌خورند
- **Consistency (سازگاری)**: پایگاه داده در حالت معتبر باقی می‌ماند
- **Isolation (جداسازی)**: تراکنش‌ها با یکدیگر تداخل ندارند
- **Durability (ماندگاری)**: تغییرات commit شده دائمی هستند

---

## اشتباهات رایج

### 1. فراموش کردن بند WHERE ⚠️

❌ **خطرناک:**
\`\`\`sql
UPDATE users SET status = 'inactive';  -- همه کاربران را به‌روزرسانی می‌کند!
DELETE FROM orders;  -- همه سفارشات را حذف می‌کند!
\`\`\`

✅ **درست:**
\`\`\`sql
UPDATE users SET status = 'inactive' WHERE id = 5;
DELETE FROM orders WHERE id = 123;
\`\`\`

### 2. آسیب‌پذیری SQL Injection

❌ **خطرناک:**
\`\`\`javascript
// هرگز ورودی کاربر را concatenate نکنید!
const sql = \`INSERT INTO users (username, email) VALUES ('\${username}', '\${email}')\`;
await pool.execute(sql);
\`\`\`

✅ **درست:**
\`\`\`javascript
// همیشه از prepared statements استفاده کنید
await pool.execute(
  'INSERT INTO users (username, email) VALUES (?, ?)',
  [username, email]
);
\`\`\`

### 3. بررسی نکردن سطرهای تاثیر یافته

❌ **اشتباه:**
\`\`\`javascript
await pool.execute('UPDATE users SET email = ? WHERE id = ?', [email, userId]);
// فرض می‌کند به‌روزرسانی موفق بوده
\`\`\`

✅ **درست:**
\`\`\`javascript
const [result] = await pool.execute(
  'UPDATE users SET email = ? WHERE id = ?',
  [email, userId]
);

if (result.affectedRows === 0) {
  throw new Error('کاربر یافت نشد یا تغییری ایجاد نشد');
}
\`\`\`

### 4. استفاده نکردن از تراکنش برای عملیات مرتبط

❌ **اشتباه:**
\`\`\`javascript
// اگر عملیات دوم شکست بخورد، اولی قبلاً commit شده
await pool.execute('INSERT INTO orders (user_id) VALUES (?)', [userId]);
await pool.execute('UPDATE users SET order_count = order_count + 1 WHERE id = ?', [userId]);
\`\`\`

✅ **درست:**
\`\`\`javascript
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  await connection.execute('INSERT INTO orders (user_id) VALUES (?)', [userId]);
  await connection.execute('UPDATE users SET order_count = order_count + 1 WHERE id = ?', [userId]);
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
\`\`\`

---

## بهترین شیوه‌ها

### 1. همیشه از Prepared Statements استفاده کنید
\`\`\`javascript
// ✅ ایمن - پارامترها escape می‌شوند
await pool.execute('INSERT INTO users (name) VALUES (?)', [userInput]);

// ❌ خطرناک - خطر SQL injection
await pool.execute(\`INSERT INTO users (name) VALUES ('\${userInput}')\`);
\`\`\`

### 2. از تراکنش برای عملیات مرتبط استفاده کنید
\`\`\`javascript
// گروه‌بندی عملیات مرتبط در یک تراکنش
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  // چند عملیات...
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
\`\`\`

### 3. اعتبارسنجی داده قبل از عملیات پایگاه داده
\`\`\`javascript
function validateUser(userData) {
  if (!userData.username || userData.username.length < 3) {
    throw new Error('نام کاربری باید حداقل ۳ کاراکتر باشد');
  }
  if (!userData.email || !userData.email.includes('@')) {
    throw new Error('آدرس ایمیل نامعتبر است');
  }
}

// استفاده قبل از insert/update
validateUser(userData);
await pool.execute('INSERT INTO users ...', [userData.username, userData.email]);
\`\`\`

### 4. بررسی سطرهای تاثیر یافته
\`\`\`javascript
const [result] = await pool.execute('UPDATE users SET ... WHERE id = ?', [userId]);

if (result.affectedRows === 0) {
  // هیچ سطری به‌روزرسانی نشد - به درستی مدیریت کنید
  throw new Error('کاربر یافت نشد یا تغییری ایجاد نشد');
}
\`\`\`

### 5. از حذف نرم برای داده‌های مهم استفاده کنید
\`\`\`javascript
// به جای DELETE، از UPDATE با timestamp deleted_at استفاده کنید
await pool.execute(
  'UPDATE users SET deleted_at = NOW() WHERE id = ?',
  [userId]
);

// فیلتر کردن رکوردهای حذف شده در کوئری‌ها
await pool.execute(
  'SELECT * FROM users WHERE deleted_at IS NULL'
);
\`\`\`

---

## مرجع سریع

### نحو INSERT
\`\`\`sql
-- یک سطر
INSERT INTO table (col1, col2) VALUES (val1, val2);

-- چند سطر
INSERT INTO table (col1, col2) VALUES 
  (val1, val2),
  (val3, val4);

-- با Node.js
await pool.execute('INSERT INTO table (col1, col2) VALUES (?, ?)', [val1, val2]);
\`\`\`

### نحو UPDATE
\`\`\`sql
-- به‌روزرسانی پایه
UPDATE table SET col1 = val1, col2 = val2 WHERE condition;

-- با محاسبات
UPDATE table SET price = price * 1.1 WHERE category = 'Electronics';

-- با Node.js
await pool.execute('UPDATE table SET col1 = ? WHERE id = ?', [val1, id]);
\`\`\`

### نحو DELETE
\`\`\`sql
-- حذف سطرهای خاص
DELETE FROM table WHERE condition;

-- حذف نرم (توصیه شده)
UPDATE table SET deleted_at = NOW() WHERE id = ?;

-- با Node.js
await pool.execute('DELETE FROM table WHERE id = ?', [id]);
\`\`\`

### نحو تراکنش
\`\`\`javascript
const connection = await pool.getConnection();
try {
  await connection.beginTransaction();
  // عملیات...
  await connection.commit();
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  connection.release();
}
\`\`\`

---

## مراحل بعدی

حالا که تغییر داده را فهمیدید، آماده هستید برای:
1. یادگیری عملیات JOIN برای ترکیب داده از چند جدول
2. استفاده از توابع تجمیعی (COUNT، SUM، AVG) برای تحلیل داده
3. تسلط بر subqueryها و کوئری‌های پیچیده
4. کاوش در طراحی پایگاه داده و نرمال‌سازی

> **به یاد داشته باشید:** 
> - همیشه از prepared statements استفاده کنید! 🔒
> - همیشه بند WHERE را در UPDATE/DELETE اضافه کنید! ⚠️
> - از تراکنش برای عملیات مرتبط استفاده کنید! 🔄
> - حذف نرم را برای داده‌های مهم در نظر بگیرید! 💾
`,

  visualizationId: null,
  exerciseId: 'sql-queries-exercises',
};

export default sqlInsertUpdateDelete;
