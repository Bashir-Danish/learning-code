export const nodejsConnectionExercises = {
  id: 'nodejs-connection-exercises',
  title: 'Node.js MySQL Connection Exercises',
  titleFa: 'تمرین‌های اتصال Node.js به MySQL',
  difficulty: 'easy',
  
  description: `
# Node.js MySQL Connection Exercises

Practice connecting Node.js to MySQL/MariaDB databases! These exercises will help you master database connections, connection pooling, and secure credential management.

## What You'll Practice

1. **Exercise 1**: Create a basic database connection
2. **Exercise 2**: Set up environment variables for credentials
3. **Exercise 3**: Create a connection pool
4. **Exercise 4**: Execute a simple query
5. **Exercise 5**: Handle connection errors gracefully

## Setup Instructions

Before starting, make sure you have:
- Node.js installed
- MySQL or MariaDB server running
- A test database created

\`\`\`bash
# Install required packages
npm install mysql2 dotenv

# Create a test database
mysql -u root -p
CREATE DATABASE test_db;
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100)
);
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
\`\`\`

## Exercise 1: Basic Connection

Create a function that establishes a connection to MySQL using the mysql2 package.

**Requirements:**
- Import mysql2/promise
- Create a connection with host, user, password, and database
- Return the connection object
- Use async/await

**Test:** The function should successfully connect to the database.

---

## Exercise 2: Environment Variables

Modify your connection to use environment variables instead of hardcoded credentials.

**Requirements:**
- Create a .env file with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- Use dotenv package to load environment variables
- Use process.env to access credentials
- Never hardcode sensitive information

**Test:** Connection should work using environment variables.

---

## Exercise 3: Connection Pool

Create a connection pool for better performance.

**Requirements:**
- Use mysql.createPool() instead of createConnection()
- Set connectionLimit to 10
- Set waitForConnections to true
- Export the pool for reuse

**Test:** Pool should be created successfully.

---

## Exercise 4: Execute Query

Write a function that executes a SELECT query using the connection pool.

**Requirements:**
- Use pool.execute() method
- Query the users table
- Return the results
- Handle errors with try-catch

**Test:** Should return array of users from database.

---

## Exercise 5: Error Handling

Implement proper error handling for database operations.

**Requirements:**
- Wrap database operations in try-catch
- Log meaningful error messages
- Return error information to caller
- Don't expose sensitive details

**Test:** Should handle connection failures gracefully.
`,

  descriptionFa: `
# تمرین‌های اتصال Node.js به MySQL

اتصال Node.js به پایگاه‌های داده MySQL/MariaDB را تمرین کنید! این تمرین‌ها به شما کمک می‌کنند تا اتصالات پایگاه داده، connection pooling و مدیریت امن اعتبارنامه‌ها را مسلط شوید.

## چه چیزی تمرین خواهید کرد

1. **تمرین ۱**: ایجاد یک اتصال پایه پایگاه داده
2. **تمرین ۲**: تنظیم متغیرهای محیطی برای اعتبارنامه‌ها
3. **تمرین ۳**: ایجاد connection pool
4. **تمرین ۴**: اجرای یک کوئری ساده
5. **تمرین ۵**: مدیریت نرم خطاهای اتصال

## دستورالعمل‌های راه‌اندازی

قبل از شروع، مطمئن شوید که دارید:
- Node.js نصب شده
- سرور MySQL یا MariaDB در حال اجرا
- یک پایگاه داده تست ایجاد شده

\`\`\`bash
# نصب بسته‌های مورد نیاز
npm install mysql2 dotenv

# ایجاد پایگاه داده تست
mysql -u root -p
CREATE DATABASE test_db;
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100)
);
INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com');
\`\`\`

## تمرین ۱: اتصال پایه

یک تابع ایجاد کنید که اتصال به MySQL را با استفاده از بسته mysql2 برقرار کند.

**الزامات:**
- mysql2/promise را import کنید
- یک اتصال با host، user، password و database ایجاد کنید
- شیء اتصال را برگردانید
- از async/await استفاده کنید

**تست:** تابع باید با موفقیت به پایگاه داده متصل شود.

---

## تمرین ۲: متغیرهای محیطی

اتصال خود را تغییر دهید تا به جای اعتبارنامه‌های هاردکد شده از متغیرهای محیطی استفاده کند.

**الزامات:**
- یک فایل .env با DB_HOST، DB_USER، DB_PASSWORD، DB_NAME ایجاد کنید
- از بسته dotenv برای بارگذاری متغیرهای محیطی استفاده کنید
- از process.env برای دسترسی به اعتبارنامه‌ها استفاده کنید
- هرگز اطلاعات حساس را هاردکد نکنید

**تست:** اتصال باید با استفاده از متغیرهای محیطی کار کند.

---

## تمرین ۳: Connection Pool

یک connection pool برای عملکرد بهتر ایجاد کنید.

**الزامات:**
- به جای createConnection() از mysql.createPool() استفاده کنید
- connectionLimit را روی ۱۰ تنظیم کنید
- waitForConnections را روی true تنظیم کنید
- pool را برای استفاده مجدد export کنید

**تست:** Pool باید با موفقیت ایجاد شود.

---

## تمرین ۴: اجرای کوئری

یک تابع بنویسید که یک کوئری SELECT را با استفاده از connection pool اجرا کند.

**الزامات:**
- از متد pool.execute() استفاده کنید
- جدول users را کوئری کنید
- نتایج را برگردانید
- خطاها را با try-catch مدیریت کنید

**تست:** باید آرایه‌ای از کاربران را از پایگاه داده برگرداند.

---

## تمرین ۵: مدیریت خطا

مدیریت صحیح خطا را برای عملیات پایگاه داده پیاده‌سازی کنید.

**الزامات:**
- عملیات پایگاه داده را در try-catch بپیچید
- پیام‌های خطای معنادار را ثبت کنید
- اطلاعات خطا را به فراخواننده برگردانید
- جزئیات حساس را افشا نکنید

**تست:** باید شکست‌های اتصال را به صورت نرم مدیریت کند.
`,

  starterCode: `// Exercise 1: Basic Connection
// TODO: Import mysql2/promise
// TODO: Create an async function that connects to MySQL
// TODO: Return the connection object

async function createConnection() {
  // Your code here
}


// Exercise 2: Environment Variables
// TODO: Import dotenv
// TODO: Load environment variables with dotenv.config()
// TODO: Use process.env for credentials

async function createSecureConnection() {
  // Your code here
}


// Exercise 3: Connection Pool
// TODO: Create a connection pool
// TODO: Set connectionLimit to 10
// TODO: Export the pool

function createConnectionPool() {
  // Your code here
}


// Exercise 4: Execute Query
// TODO: Use the pool to execute a SELECT query
// TODO: Return the results
// TODO: Handle errors

async function getAllUsers(pool) {
  // Your code here
}


// Exercise 5: Error Handling
// TODO: Implement try-catch error handling
// TODO: Log errors appropriately
// TODO: Return error information

async function safeQuery(pool, sql, params = []) {
  // Your code here
}


// Export your functions
export { 
  createConnection, 
  createSecureConnection, 
  createConnectionPool,
  getAllUsers,
  safeQuery
};
`,

  solution: `// Exercise 1: Basic Connection
import mysql from 'mysql2/promise';

async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'password',
      database: 'test_db'
    });
    
    console.log('✅ Connected to database');
    return connection;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    throw error;
  }
}


// Exercise 2: Environment Variables
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function createSecureConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    console.log('✅ Secure connection established');
    return connection;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    throw error;
  }
}


// Exercise 3: Connection Pool
function createConnectionPool() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  });
  
  console.log('✅ Connection pool created');
  return pool;
}


// Exercise 4: Execute Query
async function getAllUsers(pool) {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    console.log(\`✅ Retrieved \${rows.length} users\`);
    return rows;
  } catch (error) {
    console.error('❌ Query failed:', error.message);
    throw error;
  }
}


// Exercise 5: Error Handling
async function safeQuery(pool, sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return {
      success: true,
      data: rows,
      error: null
    };
  } catch (error) {
    console.error('Query error:', {
      message: error.message,
      code: error.code,
      sql: sql
    });
    
    return {
      success: false,
      data: null,
      error: {
        message: error.message,
        code: error.code
      }
    };
  }
}


// Export functions
export { 
  createConnection, 
  createSecureConnection, 
  createConnectionPool,
  getAllUsers,
  safeQuery
};


// Example usage
async function main() {
  // Exercise 1: Basic connection
  const conn = await createConnection();
  await conn.end();
  
  // Exercise 2: Secure connection
  const secureConn = await createSecureConnection();
  await secureConn.end();
  
  // Exercise 3 & 4: Pool and query
  const pool = createConnectionPool();
  const users = await getAllUsers(pool);
  console.log('Users:', users);
  
  // Exercise 5: Safe query
  const result = await safeQuery(pool, 'SELECT * FROM users WHERE id = ?', [1]);
  if (result.success) {
    console.log('User:', result.data[0]);
  } else {
    console.error('Error:', result.error);
  }
  
  await pool.end();
}

// Uncomment to run
// main().catch(console.error);
`,

  hints: [
    'For Exercise 1: Import mysql2/promise and use await mysql.createConnection(config)',
    'For Exercise 2: Create a .env file with DB_HOST=localhost, DB_USER=root, etc.',
    'For Exercise 3: Use mysql.createPool() instead of createConnection() for better performance',
    'For Exercise 4: The execute() method returns [rows, fields], use array destructuring',
    'For Exercise 5: Always wrap database operations in try-catch blocks',
    'Remember: Use process.env to access environment variables',
    'Tip: Connection pools automatically manage connections - no need to call .end() after each query',
    'Security: Never hardcode passwords or sensitive credentials in your code'
  ],

  hintsFa: [
    'برای تمرین ۱: mysql2/promise را import کنید و از await mysql.createConnection(config) استفاده کنید',
    'برای تمرین ۲: یک فایل .env با DB_HOST=localhost، DB_USER=root و غیره ایجاد کنید',
    'برای تمرین ۳: برای عملکرد بهتر از mysql.createPool() به جای createConnection() استفاده کنید',
    'برای تمرین ۴: متد execute() آرایه [rows, fields] برمی‌گرداند، از array destructuring استفاده کنید',
    'برای تمرین ۵: همیشه عملیات پایگاه داده را در بلوک‌های try-catch بپیچید',
    'به یاد داشته باشید: از process.env برای دسترسی به متغیرهای محیطی استفاده کنید',
    'نکته: Connection pool به طور خودکار اتصالات را مدیریت می‌کند - نیازی به فراخوانی .end() بعد از هر کوئری نیست',
    'امنیت: هرگز رمزهای عبور یا اعتبارنامه‌های حساس را در کد خود هاردکد نکنید'
  ],

  testCases: [
    {
      input: 'createConnection()',
      expected: 'Connection object with .execute() method',
      description: 'Should create a valid MySQL connection'
    },
    {
      input: 'createSecureConnection() with .env file',
      expected: 'Connection using environment variables',
      description: 'Should use process.env for credentials'
    },
    {
      input: 'createConnectionPool()',
      expected: 'Pool object with connectionLimit: 10',
      description: 'Should create a connection pool with correct settings'
    },
    {
      input: 'getAllUsers(pool)',
      expected: 'Array of user objects from database',
      description: 'Should execute SELECT query and return results'
    },
    {
      input: 'safeQuery(pool, "SELECT * FROM users")',
      expected: '{ success: true, data: [...], error: null }',
      description: 'Should return success object with data'
    },
    {
      input: 'safeQuery(pool, "SELECT * FROM invalid_table")',
      expected: '{ success: false, data: null, error: {...} }',
      description: 'Should handle errors and return error object'
    }
  ]
};

export default nodejsConnectionExercises;
