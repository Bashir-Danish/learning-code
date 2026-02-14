export const nodejsMysqlConnection = {
  id: 'nodejs-mysql-connection',
  title: 'Node.js MySQL Connection',
  titleFa: 'اتصال Node.js به MySQL',
  difficulty: 'easy',
  estimatedTime: '50 min',
  
  content: `
# Node.js MySQL Connection - Building Database-Driven Apps

## Introduction

Connecting Node.js to MySQL/MariaDB allows you to build powerful database-driven applications. In this lesson, you'll learn how to establish connections, execute queries, and handle data securely using the **mysql2** package.

**What you'll learn:**
- Installing and configuring mysql2
- Creating database connections
- Using connection pools for production
- Handling errors properly
- Securing credentials with environment variables
- Both callback and promise-based patterns

---

## Why mysql2?

The **mysql2** package is the modern, recommended way to connect Node.js to MySQL/MariaDB.

**Advantages over the old \`mysql\` package:**
- ✅ **Faster**: Better performance
- ✅ **Promises**: Native async/await support
- ✅ **Prepared Statements**: Built-in SQL injection protection
- ✅ **Active Development**: Regular updates
- ✅ **MySQL 8+ Support**: Latest features
- ✅ **MariaDB Compatible**: Works with both!

**Current Version:** 3.16.1+ (as of 2026)

---

## Installation

### Step 1: Initialize Your Project

\`\`\`bash
# Create project directory
mkdir my-database-app
cd my-database-app

# Initialize npm project
npm init -y
\`\`\`

### Step 2: Install mysql2

\`\`\`bash
# Install mysql2 package
npm install mysql2

# Install dotenv for environment variables (recommended)
npm install dotenv
\`\`\`


**Your package.json should look like:**
\`\`\`json
{
  "name": "my-database-app",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "mysql2": "^3.16.1",
    "dotenv": "^16.0.0"
  }
}
\`\`\`

> **Note:** Adding \`"type": "module"\` enables ES6 import syntax. You can also use CommonJS (\`require\`).

---

## Setting Up Environment Variables

**Never hardcode database credentials!** Use environment variables for security.

### Create .env File

\`\`\`bash
# .env file (in project root)
DB_HOST=localhost
DB_PORT=3306
DB_USER=appuser
DB_PASSWORD=your_secure_password
DB_NAME=my_database
\`\`\`

### Add .env to .gitignore

\`\`\`bash
# .gitignore
node_modules/
.env
\`\`\`

> **Security Rule:** Never commit .env files to version control!

---

## Basic Connection (Single Connection)

### Using Promises (Recommended)

\`\`\`javascript
// db.js - Database connection module
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create connection
async function connectDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,      // Database host
      port: process.env.DB_PORT,      // Database port (3306)
      user: process.env.DB_USER,      // Database user
      password: process.env.DB_PASSWORD, // User password
      database: process.env.DB_NAME   // Database name
    });
    
    console.log('✅ Connected to MySQL database!');
    return connection;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

export default connectDatabase;
\`\`\`


### Using the Connection

\`\`\`javascript
// app.js - Using the connection
import connectDatabase from './db.js';

async function main() {
  // Connect to database
  const connection = await connectDatabase();
  
  try {
    // Execute a simple query
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('Query result:', rows[0].result); // Output: 2
    
    // Get all users
    const [users] = await connection.execute('SELECT * FROM users');
    console.log('Users:', users);
    
  } catch (error) {
    console.error('Query error:', error.message);
  } finally {
    // Always close the connection when done
    await connection.end();
    console.log('Connection closed');
  }
}

main();
\`\`\`

**Output:**
\`\`\`
✅ Connected to MySQL database!
Query result: 2
Users: [ { id: 1, name: 'Alice', email: 'alice@example.com' }, ... ]
Connection closed
\`\`\`

---

## Connection Pooling (Production Recommended) ⭐

**Why use connection pools?**
- ✅ Reuses connections (faster)
- ✅ Handles multiple requests efficiently
- ✅ Automatic connection management
- ✅ Better performance under load

### Creating a Connection Pool

\`\`\`javascript
// db.js - Connection pool (recommended for production)
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Pool configuration
  waitForConnections: true,    // Wait if no connections available
  connectionLimit: 10,         // Maximum 10 connections
  queueLimit: 0,              // Unlimited queue (0 = no limit)
  enableKeepAlive: true,      // Keep connections alive
  keepAliveInitialDelay: 0    // Start keep-alive immediately
});

console.log('✅ Database pool created');

export default pool;
\`\`\`


### Using the Connection Pool

\`\`\`javascript
// app.js - Using connection pool
import pool from './db.js';

async function getUsers() {
  try {
    // Pool automatically gets a connection
    const [rows] = await pool.execute('SELECT * FROM users');
    console.log('Users:', rows);
    return rows;
    
    // Connection automatically returned to pool!
  } catch (error) {
    console.error('Query error:', error.message);
    throw error;
  }
}

async function createUser(name, email) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]  // Parameters prevent SQL injection
    );
    
    console.log('User created with ID:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('Insert error:', error.message);
    throw error;
  }
}

// Multiple operations can run concurrently
async function main() {
  await getUsers();
  await createUser('Bob', 'bob@example.com');
  await getUsers();
  
  // Close pool when application shuts down
  await pool.end();
}

main();
\`\`\`

---

## Error Handling Best Practices

### Handling Connection Errors

\`\`\`javascript
import mysql from 'mysql2/promise';

async function connectWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      
      console.log('✅ Connected successfully');
      return connection;
      
    } catch (error) {
      console.error(\`❌ Connection attempt \${i + 1} failed:\`, error.message);
      
      if (i === maxRetries - 1) {
        throw new Error('Failed to connect after multiple attempts');
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
\`\`\`


### Handling Query Errors

\`\`\`javascript
async function safeQuery(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return { success: true, data: rows };
    
  } catch (error) {
    // Log error details
    console.error('Query failed:', {
      sql,
      params,
      error: error.message,
      code: error.code
    });
    
    // Return error info
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
}

// Usage
const result = await safeQuery('SELECT * FROM users WHERE id = ?', [1]);
if (result.success) {
  console.log('User:', result.data[0]);
} else {
  console.error('Query failed:', result.error);
}
\`\`\`

---

## Callback vs Promise Patterns

### Callback Pattern (Old Style)

\`\`\`javascript
// Using callbacks (not recommended)
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return;
    }
    console.log('Users:', results);
    connection.end();
  });
});
\`\`\`

### Promise Pattern (Modern, Recommended) ⭐

\`\`\`javascript
// Using promises with async/await (recommended)
import mysql from 'mysql2/promise';

async function getUsers() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_db'
  });
  
  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('Users:', rows);
    return rows;
  } finally {
    await connection.end();
  }
}
\`\`\`

> **Recommendation:** Always use promises with async/await for cleaner, more maintainable code!


---

## Connection Configuration Options

### Complete Configuration Example

\`\`\`javascript
const pool = mysql.createPool({
  // Connection settings
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // Pool settings
  connectionLimit: 10,           // Max connections in pool
  queueLimit: 0,                // Max queued requests (0 = unlimited)
  waitForConnections: true,     // Wait if pool is full
  
  // Connection behavior
  connectTimeout: 10000,        // Connection timeout (10 seconds)
  enableKeepAlive: true,        // Keep connections alive
  keepAliveInitialDelay: 0,     // Start keep-alive immediately
  
  // Character encoding
  charset: 'utf8mb4',           // Support emojis and special chars
  
  // Timezone
  timezone: '+00:00',           // UTC timezone
  
  // SSL (for secure connections)
  // ssl: {
  //   ca: fs.readFileSync('ca-cert.pem'),
  //   key: fs.readFileSync('client-key.pem'),
  //   cert: fs.readFileSync('client-cert.pem')
  // }
});
\`\`\`

---

## Testing Your Connection

### Simple Connection Test

\`\`\`javascript
// test-connection.js
import pool from './db.js';

async function testConnection() {
  try {
    // Test query
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    console.log('✅ Database connection successful!');
    console.log('Test query result:', rows[0].result);
    
    // Get database version
    const [version] = await pool.execute('SELECT VERSION() as version');
    console.log('Database version:', version[0].version);
    
    // Get current database
    const [db] = await pool.execute('SELECT DATABASE() as db');
    console.log('Current database:', db[0].db);
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
\`\`\`

**Expected Output:**
\`\`\`
✅ Database connection successful!
Test query result: 2
Database version: 8.4.8-MySQL
Current database: my_database
\`\`\`


---

## Connection Cleanup and Graceful Shutdown

### Proper Application Shutdown

\`\`\`javascript
// app.js - Graceful shutdown
import pool from './db.js';

// Handle shutdown signals
process.on('SIGINT', async () => {
  console.log('\\n🛑 Shutting down gracefully...');
  
  try {
    // Close database pool
    await pool.end();
    console.log('✅ Database connections closed');
    
    // Exit process
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error.message);
    process.exit(1);
  }
});

// Your application code
async function main() {
  // Your database operations
  const [users] = await pool.execute('SELECT * FROM users');
  console.log('Users:', users);
}

main().catch(error => {
  console.error('Application error:', error);
  process.exit(1);
});
\`\`\`

---

## Common Mistakes

### 1. Hardcoding Credentials
❌ **Wrong:**
\`\`\`javascript
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword123',  // Never do this!
  database: 'my_db'
});
\`\`\`

✅ **Correct:**
\`\`\`javascript
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // From .env file
  database: process.env.DB_NAME
});
\`\`\`

### 2. Not Closing Connections
❌ **Wrong:**
\`\`\`javascript
async function getUsers() {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute('SELECT * FROM users');
  return rows;  // Connection never closed!
}
\`\`\`

✅ **Correct:**
\`\`\`javascript
async function getUsers() {
  const connection = await mysql.createConnection(config);
  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    return rows;
  } finally {
    await connection.end();  // Always close!
  }
}
\`\`\`


### 3. Using Single Connection in Production
❌ **Wrong:**
\`\`\`javascript
// Single connection for all requests (slow!)
const connection = await mysql.createConnection(config);
\`\`\`

✅ **Correct:**
\`\`\`javascript
// Connection pool for production (fast!)
const pool = mysql.createPool(config);
\`\`\`

### 4. Not Handling Errors
❌ **Wrong:**
\`\`\`javascript
const [rows] = await pool.execute('SELECT * FROM users');
// What if query fails?
\`\`\`

✅ **Correct:**
\`\`\`javascript
try {
  const [rows] = await pool.execute('SELECT * FROM users');
  console.log(rows);
} catch (error) {
  console.error('Query failed:', error.message);
  // Handle error appropriately
}
\`\`\`

### 5. SQL Injection Vulnerability
❌ **Wrong:**
\`\`\`javascript
const userId = req.params.id;
const sql = \`SELECT * FROM users WHERE id = \${userId}\`;  // Dangerous!
const [rows] = await pool.execute(sql);
\`\`\`

✅ **Correct:**
\`\`\`javascript
const userId = req.params.id;
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',  // Prepared statement
  [userId]  // Parameters safely escaped
);
\`\`\`

---

## Complete Example: User Management Module

\`\`\`javascript
// userService.js - Complete example
import pool from './db.js';

class UserService {
  // Get all users
  async getAllUsers() {
    try {
      const [rows] = await pool.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }
  
  // Get user by ID
  async getUserById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  }
  
  // Create new user
  async createUser(name, email) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }
  
  // Update user
  async updateUser(id, name, email) {
    try {
      const [result] = await pool.execute(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }
  
  // Delete user
  async deleteUser(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  }
}

export default new UserService();
\`\`\`


**Using the service:**
\`\`\`javascript
// app.js
import userService from './userService.js';

async function main() {
  try {
    // Get all users
    const users = await userService.getAllUsers();
    console.log('All users:', users);
    
    // Create new user
    const newUserId = await userService.createUser('Alice', 'alice@example.com');
    console.log('Created user with ID:', newUserId);
    
    // Get specific user
    const user = await userService.getUserById(newUserId);
    console.log('User details:', user);
    
    // Update user
    await userService.updateUser(newUserId, 'Alice Smith', 'alice.smith@example.com');
    console.log('User updated');
    
    // Delete user
    await userService.deleteUser(newUserId);
    console.log('User deleted');
    
  } catch (error) {
    console.error('Application error:', error);
  }
}

main();
\`\`\`

---

## Quick Reference

| Task | Code |
|------|------|
| Install mysql2 | \`npm install mysql2\` |
| Import (Promise) | \`import mysql from 'mysql2/promise'\` |
| Create Connection | \`await mysql.createConnection(config)\` |
| Create Pool | \`mysql.createPool(config)\` |
| Execute Query | \`await pool.execute(sql, params)\` |
| Close Connection | \`await connection.end()\` |
| Close Pool | \`await pool.end()\` |

---

## Best Practices Summary

✅ **DO:**
- Use connection pools in production
- Store credentials in environment variables
- Use prepared statements (parameterized queries)
- Handle errors with try-catch
- Close connections when done
- Use async/await for cleaner code

❌ **DON'T:**
- Hardcode database credentials
- Use single connections for multiple requests
- Concatenate user input into SQL queries
- Ignore error handling
- Leave connections open
- Use callbacks (use promises instead)

---

## Next Steps

Now that you can connect Node.js to MySQL, you're ready to:
1. Learn SQL SELECT queries to retrieve data
2. Insert, update, and delete data
3. Work with JOINs and complex queries
4. Build complete database-driven applications

> **Remember:** Always use environment variables for credentials and connection pools for production! 🔒🚀
`,

  contentFa: `
# اتصال Node.js به MySQL - ساخت برنامه‌های مبتنی بر پایگاه داده

## مقدمه

اتصال Node.js به MySQL/MariaDB به شما امکان می‌دهد برنامه‌های قدرتمند مبتنی بر پایگاه داده بسازید. در این درس، یاد می‌گیرید چگونه اتصالات را برقرار کنید، کوئری‌ها را اجرا کنید و داده‌ها را به صورت ایمن با استفاده از بسته **mysql2** مدیریت کنید.

**چه چیزی یاد می‌گیرید:**
- نصب و پیکربندی mysql2
- ایجاد اتصالات پایگاه داده
- استفاده از connection pool برای تولید
- مدیریت صحیح خطاها
- ایمن‌سازی اعتبارنامه‌ها با متغیرهای محیطی
- الگوهای callback و promise

---

## چرا mysql2؟

بسته **mysql2** روش مدرن و توصیه شده برای اتصال Node.js به MySQL/MariaDB است.

**مزایا نسبت به بسته قدیمی \`mysql\`:**
- ✅ **سریع‌تر**: عملکرد بهتر
- ✅ **Promises**: پشتیبانی بومی از async/await
- ✅ **Prepared Statements**: محافظت داخلی از SQL injection
- ✅ **توسعه فعال**: به‌روزرسانی‌های منظم
- ✅ **پشتیبانی MySQL 8+**: آخرین ویژگی‌ها
- ✅ **سازگار با MariaDB**: با هر دو کار می‌کند!

**نسخه فعلی:** 3.16.1+ (تا سال ۲۰۲۶)

---

## نصب

### مرحله ۱: راه‌اندازی پروژه

\`\`\`bash
# ایجاد دایرکتوری پروژه
mkdir my-database-app
cd my-database-app

# راه‌اندازی پروژه npm
npm init -y
\`\`\`

### مرحله ۲: نصب mysql2

\`\`\`bash
# نصب بسته mysql2
npm install mysql2

# نصب dotenv برای متغیرهای محیطی (توصیه می‌شود)
npm install dotenv
\`\`\`

**package.json شما باید شبیه این باشد:**
\`\`\`json
{
  "name": "my-database-app",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "mysql2": "^3.16.1",
    "dotenv": "^16.0.0"
  }
}
\`\`\`

> **نکته:** اضافه کردن \`"type": "module"\` نحو import ES6 را فعال می‌کند. می‌توانید از CommonJS (\`require\`) هم استفاده کنید.

---

## تنظیم متغیرهای محیطی

**هرگز اعتبارنامه‌های پایگاه داده را هاردکد نکنید!** از متغیرهای محیطی برای امنیت استفاده کنید.

### ایجاد فایل .env

\`\`\`bash
# فایل .env (در ریشه پروژه)
DB_HOST=localhost
DB_PORT=3306
DB_USER=appuser
DB_PASSWORD=your_secure_password
DB_NAME=my_database
\`\`\`

### اضافه کردن .env به .gitignore

\`\`\`bash
# .gitignore
node_modules/
.env
\`\`\`

> **قانون امنیتی:** هرگز فایل‌های .env را به کنترل نسخه commit نکنید!

---

## اتصال پایه (اتصال تکی)

### استفاده از Promises (توصیه می‌شود)

\`\`\`javascript
// db.js - ماژول اتصال پایگاه داده
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// بارگذاری متغیرهای محیطی
dotenv.config();

// ایجاد اتصال
async function connectDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,      // هاست پایگاه داده
      port: process.env.DB_PORT,      // پورت پایگاه داده (3306)
      user: process.env.DB_USER,      // کاربر پایگاه داده
      password: process.env.DB_PASSWORD, // رمز عبور کاربر
      database: process.env.DB_NAME   // نام پایگاه داده
    });
    
    console.log('✅ به پایگاه داده MySQL متصل شد!');
    return connection;
  } catch (error) {
    console.error('❌ اتصال پایگاه داده ناموفق بود:', error.message);
    throw error;
  }
}

export default connectDatabase;
\`\`\`


### استفاده از اتصال

\`\`\`javascript
// app.js - استفاده از اتصال
import connectDatabase from './db.js';

async function main() {
  // اتصال به پایگاه داده
  const connection = await connectDatabase();
  
  try {
    // اجرای یک کوئری ساده
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('نتیجه کوئری:', rows[0].result); // خروجی: 2
    
    // دریافت همه کاربران
    const [users] = await connection.execute('SELECT * FROM users');
    console.log('کاربران:', users);
    
  } catch (error) {
    console.error('خطای کوئری:', error.message);
  } finally {
    // همیشه اتصال را بعد از اتمام کار ببندید
    await connection.end();
    console.log('اتصال بسته شد');
  }
}

main();
\`\`\`

**خروجی:**
\`\`\`
✅ به پایگاه داده MySQL متصل شد!
نتیجه کوئری: 2
کاربران: [ { id: 1, name: 'Alice', email: 'alice@example.com' }, ... ]
اتصال بسته شد
\`\`\`

---

## Connection Pooling (توصیه شده برای تولید) ⭐

**چرا از connection pool استفاده کنیم؟**
- ✅ اتصالات را دوباره استفاده می‌کند (سریع‌تر)
- ✅ درخواست‌های متعدد را به طور کارآمد مدیریت می‌کند
- ✅ مدیریت خودکار اتصال
- ✅ عملکرد بهتر تحت بار

### ایجاد Connection Pool

\`\`\`javascript
// db.js - Connection pool (توصیه شده برای تولید)
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// ایجاد connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // پیکربندی pool
  waitForConnections: true,    // منتظر بمان اگر اتصالی در دسترس نیست
  connectionLimit: 10,         // حداکثر ۱۰ اتصال
  queueLimit: 0,              // صف نامحدود (0 = بدون محدودیت)
  enableKeepAlive: true,      // اتصالات را زنده نگه دار
  keepAliveInitialDelay: 0    // keep-alive را فوراً شروع کن
});

console.log('✅ Database pool ایجاد شد');

export default pool;
\`\`\`

### استفاده از Connection Pool

\`\`\`javascript
// app.js - استفاده از connection pool
import pool from './db.js';

async function getUsers() {
  try {
    // Pool به طور خودکار یک اتصال می‌گیرد
    const [rows] = await pool.execute('SELECT * FROM users');
    console.log('کاربران:', rows);
    return rows;
    
    // اتصال به طور خودکار به pool برگردانده می‌شود!
  } catch (error) {
    console.error('خطای کوئری:', error.message);
    throw error;
  }
}

async function createUser(name, email) {
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]  // پارامترها از SQL injection جلوگیری می‌کنند
    );
    
    console.log('کاربر با ID ایجاد شد:', result.insertId);
    return result.insertId;
  } catch (error) {
    console.error('خطای درج:', error.message);
    throw error;
  }
}

// عملیات‌های متعدد می‌توانند به صورت همزمان اجرا شوند
async function main() {
  await getUsers();
  await createUser('Bob', 'bob@example.com');
  await getUsers();
  
  // pool را هنگام خاموش شدن برنامه ببندید
  await pool.end();
}

main();
\`\`\`

---

## بهترین شیوه‌های مدیریت خطا

### مدیریت خطاهای اتصال

\`\`\`javascript
import mysql from 'mysql2/promise';

async function connectWithRetry(maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      });
      
      console.log('✅ اتصال موفقیت‌آمیز بود');
      return connection;
      
    } catch (error) {
      console.error(\`❌ تلاش اتصال \${i + 1} ناموفق بود:\`, error.message);
      
      if (i === maxRetries - 1) {
        throw new Error('اتصال بعد از چندین تلاش ناموفق بود');
      }
      
      // قبل از تلاش مجدد صبر کن (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
\`\`\`

### مدیریت خطاهای کوئری

\`\`\`javascript
async function safeQuery(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return { success: true, data: rows };
    
  } catch (error) {
    // ثبت جزئیات خطا
    console.error('کوئری ناموفق بود:', {
      sql,
      params,
      error: error.message,
      code: error.code
    });
    
    // برگرداندن اطلاعات خطا
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
}

// استفاده
const result = await safeQuery('SELECT * FROM users WHERE id = ?', [1]);
if (result.success) {
  console.log('کاربر:', result.data[0]);
} else {
  console.error('کوئری ناموفق بود:', result.error);
}
\`\`\`

---

## الگوهای Callback در مقابل Promise

### الگوی Callback (سبک قدیمی)

\`\`\`javascript
// استفاده از callbacks (توصیه نمی‌شود)
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_db'
});

connection.connect((err) => {
  if (err) {
    console.error('خطای اتصال:', err);
    return;
  }
  
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('خطای کوئری:', err);
      return;
    }
    console.log('کاربران:', results);
    connection.end();
  });
});
\`\`\`

### الگوی Promise (مدرن، توصیه می‌شود) ⭐

\`\`\`javascript
// استفاده از promises با async/await (توصیه می‌شود)
import mysql from 'mysql2/promise';

async function getUsers() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_db'
  });
  
  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    console.log('کاربران:', rows);
    return rows;
  } finally {
    await connection.end();
  }
}
\`\`\`

> **توصیه:** همیشه از promises با async/await برای کد تمیزتر و قابل نگهداری‌تر استفاده کنید!

---

## گزینه‌های پیکربندی اتصال

### مثال پیکربندی کامل

\`\`\`javascript
const pool = mysql.createPool({
  // تنظیمات اتصال
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  
  // تنظیمات pool
  connectionLimit: 10,           // حداکثر اتصالات در pool
  queueLimit: 0,                // حداکثر درخواست‌های صف (0 = نامحدود)
  waitForConnections: true,     // منتظر بمان اگر pool پر است
  
  // رفتار اتصال
  connectTimeout: 10000,        // timeout اتصال (۱۰ ثانیه)
  enableKeepAlive: true,        // اتصالات را زنده نگه دار
  keepAliveInitialDelay: 0,     // keep-alive را فوراً شروع کن
  
  // کدگذاری کاراکتر
  charset: 'utf8mb4',           // پشتیبانی از ایموجی و کاراکترهای خاص
  
  // منطقه زمانی
  timezone: '+00:00',           // منطقه زمانی UTC
  
  // SSL (برای اتصالات امن)
  // ssl: {
  //   ca: fs.readFileSync('ca-cert.pem'),
  //   key: fs.readFileSync('client-key.pem'),
  //   cert: fs.readFileSync('client-cert.pem')
  // }
});
\`\`\`

---

## تست اتصال

### تست اتصال ساده

\`\`\`javascript
// test-connection.js
import pool from './db.js';

async function testConnection() {
  try {
    // کوئری تست
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    console.log('✅ اتصال پایگاه داده موفقیت‌آمیز بود!');
    console.log('نتیجه کوئری تست:', rows[0].result);
    
    // دریافت نسخه پایگاه داده
    const [version] = await pool.execute('SELECT VERSION() as version');
    console.log('نسخه پایگاه داده:', version[0].version);
    
    // دریافت پایگاه داده فعلی
    const [db] = await pool.execute('SELECT DATABASE() as db');
    console.log('پایگاه داده فعلی:', db[0].db);
    
  } catch (error) {
    console.error('❌ تست اتصال ناموفق بود:', error.message);
  } finally {
    await pool.end();
  }
}

testConnection();
\`\`\`

**خروجی مورد انتظار:**
\`\`\`
✅ اتصال پایگاه داده موفقیت‌آمیز بود!
نتیجه کوئری تست: 2
نسخه پایگاه داده: 8.4.8-MySQL
پایگاه داده فعلی: my_database
\`\`\`

---

## پاکسازی اتصال و خاموش شدن نرم

### خاموش شدن صحیح برنامه

\`\`\`javascript
// app.js - خاموش شدن نرم
import pool from './db.js';

// مدیریت سیگنال‌های خاموش شدن
process.on('SIGINT', async () => {
  console.log('\\n🛑 در حال خاموش شدن نرم...');
  
  try {
    // بستن database pool
    await pool.end();
    console.log('✅ اتصالات پایگاه داده بسته شد');
    
    // خروج از فرآیند
    process.exit(0);
  } catch (error) {
    console.error('❌ خطا در هنگام خاموش شدن:', error.message);
    process.exit(1);
  }
});

// کد برنامه شما
async function main() {
  // عملیات پایگاه داده شما
  const [users] = await pool.execute('SELECT * FROM users');
  console.log('کاربران:', users);
}

main().catch(error => {
  console.error('خطای برنامه:', error);
  process.exit(1);
});
\`\`\`

---

## اشتباهات رایج

### 1. هاردکد کردن اعتبارنامه‌ها
❌ **اشتباه:**
\`\`\`javascript
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mypassword123',  // هرگز این کار را نکنید!
  database: 'my_db'
});
\`\`\`

✅ **درست:**
\`\`\`javascript
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // از فایل .env
  database: process.env.DB_NAME
});
\`\`\`

### 2. بستن نکردن اتصالات
❌ **اشتباه:**
\`\`\`javascript
async function getUsers() {
  const connection = await mysql.createConnection(config);
  const [rows] = await connection.execute('SELECT * FROM users');
  return rows;  // اتصال هرگز بسته نمی‌شود!
}
\`\`\`

✅ **درست:**
\`\`\`javascript
async function getUsers() {
  const connection = await mysql.createConnection(config);
  try {
    const [rows] = await connection.execute('SELECT * FROM users');
    return rows;
  } finally {
    await connection.end();  // همیشه ببندید!
  }
}
\`\`\`

### 3. استفاده از اتصال تکی در تولید
❌ **اشتباه:**
\`\`\`javascript
// اتصال تکی برای همه درخواست‌ها (کند!)
const connection = await mysql.createConnection(config);
\`\`\`

✅ **درست:**
\`\`\`javascript
// Connection pool برای تولید (سریع!)
const pool = mysql.createPool(config);
\`\`\`

### 4. مدیریت نکردن خطاها
❌ **اشتباه:**
\`\`\`javascript
const [rows] = await pool.execute('SELECT * FROM users');
// اگر کوئری ناموفق باشد چه؟
\`\`\`

✅ **درست:**
\`\`\`javascript
try {
  const [rows] = await pool.execute('SELECT * FROM users');
  console.log(rows);
} catch (error) {
  console.error('کوئری ناموفق بود:', error.message);
  // خطا را به درستی مدیریت کنید
}
\`\`\`

### 5. آسیب‌پذیری SQL Injection
❌ **اشتباه:**
\`\`\`javascript
const userId = req.params.id;
const sql = \`SELECT * FROM users WHERE id = \${userId}\`;  // خطرناک!
const [rows] = await pool.execute(sql);
\`\`\`

✅ **درست:**
\`\`\`javascript
const userId = req.params.id;
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',  // Prepared statement
  [userId]  // پارامترها به صورت ایمن escape می‌شوند
);
\`\`\`

---

## مثال کامل: ماژول مدیریت کاربر

\`\`\`javascript
// userService.js - مثال کامل
import pool from './db.js';

class UserService {
  // دریافت همه کاربران
  async getAllUsers() {
    try {
      const [rows] = await pool.execute('SELECT * FROM users');
      return rows;
    } catch (error) {
      console.error('خطا در دریافت کاربران:', error.message);
      throw error;
    }
  }
  
  // دریافت کاربر با ID
  async getUserById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error('خطا در دریافت کاربر:', error.message);
      throw error;
    }
  }
  
  // ایجاد کاربر جدید
  async createUser(name, email) {
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return result.insertId;
    } catch (error) {
      console.error('خطا در ایجاد کاربر:', error.message);
      throw error;
    }
  }
  
  // به‌روزرسانی کاربر
  async updateUser(id, name, email) {
    try {
      const [result] = await pool.execute(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('خطا در به‌روزرسانی کاربر:', error.message);
      throw error;
    }
  }
  
  // حذف کاربر
  async deleteUser(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM users WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('خطا در حذف کاربر:', error.message);
      throw error;
    }
  }
}

export default new UserService();
\`\`\`

**استفاده از سرویس:**
\`\`\`javascript
// app.js
import userService from './userService.js';

async function main() {
  try {
    // دریافت همه کاربران
    const users = await userService.getAllUsers();
    console.log('همه کاربران:', users);
    
    // ایجاد کاربر جدید
    const newUserId = await userService.createUser('Alice', 'alice@example.com');
    console.log('کاربر با ID ایجاد شد:', newUserId);
    
    // دریافت کاربر خاص
    const user = await userService.getUserById(newUserId);
    console.log('جزئیات کاربر:', user);
    
    // به‌روزرسانی کاربر
    await userService.updateUser(newUserId, 'Alice Smith', 'alice.smith@example.com');
    console.log('کاربر به‌روزرسانی شد');
    
    // حذف کاربر
    await userService.deleteUser(newUserId);
    console.log('کاربر حذف شد');
    
  } catch (error) {
    console.error('خطای برنامه:', error);
  }
}

main();
\`\`\`

---

## مرجع سریع

| کار | کد |
|-----|-----|
| نصب mysql2 | \`npm install mysql2\` |
| Import (Promise) | \`import mysql from 'mysql2/promise'\` |
| ایجاد اتصال | \`await mysql.createConnection(config)\` |
| ایجاد Pool | \`mysql.createPool(config)\` |
| اجرای کوئری | \`await pool.execute(sql, params)\` |
| بستن اتصال | \`await connection.end()\` |
| بستن Pool | \`await pool.end()\` |

---

## خلاصه بهترین شیوه‌ها

✅ **انجام دهید:**
- از connection pool در تولید استفاده کنید
- اعتبارنامه‌ها را در متغیرهای محیطی ذخیره کنید
- از prepared statements استفاده کنید (کوئری‌های پارامتری)
- خطاها را با try-catch مدیریت کنید
- اتصالات را بعد از اتمام کار ببندید
- از async/await برای کد تمیزتر استفاده کنید

❌ **انجام ندهید:**
- اعتبارنامه‌های پایگاه داده را هاردکد نکنید
- از اتصالات تکی برای درخواست‌های متعدد استفاده نکنید
- ورودی کاربر را در کوئری‌های SQL concatenate نکنید
- مدیریت خطا را نادیده نگیرید
- اتصالات را باز نگذارید
- از callbacks استفاده نکنید (به جای آن از promises استفاده کنید)

---

## مراحل بعدی

حالا که می‌توانید Node.js را به MySQL متصل کنید، آماده هستید برای:
1. یادگیری کوئری‌های SELECT برای بازیابی داده
2. درج، به‌روزرسانی و حذف داده
3. کار با JOINها و کوئری‌های پیچیده
4. ساخت برنامه‌های کامل مبتنی بر پایگاه داده

> **به یاد داشته باشید:** همیشه از متغیرهای محیطی برای اعتبارنامه‌ها و connection pool برای تولید استفاده کنید! 🔒🚀
`,

  visualizationId: null,
  exerciseId: 'nodejs-connection-exercises',
};

export default nodejsMysqlConnection;
