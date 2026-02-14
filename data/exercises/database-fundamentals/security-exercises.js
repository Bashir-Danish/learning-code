export const securityExercises = {
  id: 'security-exercises',
  title: 'SQL Security Exercises',
  titleFa: 'تمرین‌های امنیتی SQL',
  difficulty: 'medium',
  
  description: `
# SQL Security Exercises

Complete these exercises to practice secure database coding techniques.

## Exercise 1: Fix SQL Injection Vulnerability

**Objective:** Convert vulnerable code to use prepared statements.

**Starter Code:**

\`\`\`javascript
// VULNERABLE CODE - Fix this!
async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  const [rows] = await pool.execute(query);
  return rows;
}

// Test with malicious input:
// Input: admin' OR '1'='1
// Expected: Should only find user with exact username
\`\`\`

**Your Task:**
1. Rewrite the function to use prepared statements
2. Ensure the function safely handles the malicious input
3. Test that it returns only exact username matches

**Hints:**
- Use ? placeholders in the query
- Pass the username as a parameter in an array
- The prepared statement will treat the input as a literal value

**Solution:**

\`\`\`javascript
async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.execute(query, [username]);
  return rows;
}
\`\`\`

**Test Cases:**
- Input: "admin" → Should return user with username "admin"
- Input: "admin' OR '1'='1" → Should return no users (safe!)
- Input: "nonexistent" → Should return empty array

---

## Exercise 2: Secure Credential Management

**Objective:** Move hardcoded credentials to environment variables.

**Starter Code:**

\`\`\`javascript
// INSECURE - Credentials hardcoded!
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password123',
  database: 'myapp_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
\`\`\`

**Your Task:**
1. Create a .env file with database credentials
2. Update the code to use process.env
3. Add .env to .gitignore

**Hints:**
- Use require('dotenv').config() to load .env file
- Access variables with process.env.VARIABLE_NAME
- Never commit .env to version control

**Solution:**

\`\`\`javascript
// .env file
DB_HOST=localhost
DB_USER=app_user
DB_PASSWORD=secure_password_123
DB_NAME=myapp_db

// Node.js code
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
\`\`\`

**Test Cases:**
- Verify .env file exists with correct variables
- Verify .env is in .gitignore
- Verify pool connects successfully with env variables

---

## Exercise 3: Password Hashing

**Objective:** Implement secure password hashing with bcrypt.

**Starter Code:**

\`\`\`javascript
// INSECURE - Storing plain text passwords!
async function registerUser(username, email, password) {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]  // Plain text!
  );
  return result;
}
\`\`\`

**Your Task:**
1. Install bcrypt package
2. Hash the password before storing
3. Implement login function that compares hashed passwords

**Hints:**
- Use bcrypt.hash(password, 10) to hash
- Use bcrypt.compare(password, hash) to verify
- Always use await with bcrypt functions

**Solution:**

\`\`\`javascript
const bcrypt = require('bcrypt');

async function registerUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result;
}

async function loginUser(username, password) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  
  if (rows.length === 0) {
    throw new Error('User not found');
  }
  
  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Invalid password');
  }
  
  return user;
}
\`\`\`

**Test Cases:**
- Register user with password "myPassword123" → Hash should be stored
- Login with correct password → Should return user object
- Login with wrong password → Should throw error
- Login with non-existent user → Should throw error

---

## Exercise 4: Input Validation

**Objective:** Validate and sanitize user input before database operations.

**Starter Code:**

\`\`\`javascript
// UNSAFE - No validation!
async function createPost(userId, title, content) {
  const [result] = await pool.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result;
}
\`\`\`

**Your Task:**
1. Add validation for userId (must be positive integer)
2. Add validation for title (must be non-empty string, max 255 chars)
3. Add validation for content (must be non-empty string)
4. Throw descriptive errors for invalid input

**Hints:**
- Check if values are the correct type
- Check string lengths
- Check numeric ranges
- Throw errors with clear messages

**Solution:**

\`\`\`javascript
async function createPost(userId, title, content) {
  // Validate userId
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error('Invalid userId: must be a positive integer');
  }
  
  // Validate title
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('Invalid title: must be a non-empty string');
  }
  if (title.length > 255) {
    throw new Error('Invalid title: must be 255 characters or less');
  }
  
  // Validate content
  if (typeof content !== 'string' || content.trim().length === 0) {
    throw new Error('Invalid content: must be a non-empty string');
  }
  
  const [result] = await pool.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result;
}
\`\`\`

**Test Cases:**
- Valid input (1, "My Post", "Content here") → Should insert successfully
- Invalid userId (-1) → Should throw error
- Empty title → Should throw error
- Title over 255 chars → Should throw error
- Empty content → Should throw error
  `,
  
  descriptionFa: `
# تمرین‌های امنیتی SQL

این تمرین‌ها را برای تمرین تکنیک‌های کدنویسی ایمن پایگاه داده انجام دهید.

## تمرین 1: رفع آسیب‌پذیری SQL Injection

**هدف:** تبدیل کد آسیب‌پذیر به استفاده از دستورات آماده‌شده.

**کد شروع:**

\`\`\`javascript
// کد آسیب‌پذیر - این را تصحیح کنید!
async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  const [rows] = await pool.execute(query);
  return rows;
}
\`\`\`

**تمرین شما:**
1. تابع را برای استفاده از دستورات آماده‌شده بازنویسی کنید
2. اطمینان حاصل کنید که تابع ورودی مخرب را به‌طور ایمن مدیریت می‌کند
3. تست کنید که فقط نام‌های کاربری دقیق را برمی‌گرداند

**راهنمایی‌ها:**
- از ? برای جایگزین‌کردن استفاده کنید
- نام‌کاربری را به‌عنوان پارامتر در آرایه ارسال کنید
- دستور آماده‌شده ورودی را به‌عنوان مقدار تحت‌اللفظی در نظر می‌گیرد

---

## تمرین 2: مدیریت ایمن اعتبارات

**هدف:** انتقال اعتبارات سخت‌کد‌شده به متغیرهای محیطی.

**کد شروع:**

\`\`\`javascript
// ناامن - اعتبارات سخت‌کد‌شده!
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password123',
  database: 'myapp_db'
});
\`\`\`

**تمرین شما:**
1. فایل .env را با اعتبارات پایگاه داده ایجاد کنید
2. کد را برای استفاده از process.env به‌روزرسانی کنید
3. .env را به .gitignore اضافه کنید

---

## تمرین 3: هش‌کردن رمز عبور

**هدف:** پیاده‌سازی هش‌کردن ایمن رمز عبور با bcrypt.

**کد شروع:**

\`\`\`javascript
// ناامن - ذخیره رمز عبور به‌صورت متن ساده!
async function registerUser(username, email, password) {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result;
}
\`\`\`

**تمرین شما:**
1. بسته bcrypt را نصب کنید
2. رمز عبور را قبل از ذخیره‌سازی هش کنید
3. تابع ورود را پیاده‌سازی کنید که رمزهای هش‌شده را مقایسه کند

---

## تمرین 4: اعتبارسنجی ورودی

**هدف:** اعتبارسنجی و پاکسازی ورودی کاربر قبل از عملیات پایگاه داده.

**کد شروع:**

\`\`\`javascript
// ناامن - بدون اعتبارسنجی!
async function createPost(userId, title, content) {
  const [result] = await pool.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result;
}
\`\`\`

**تمرین شما:**
1. اعتبارسنجی userId (باید عدد صحیح مثبت باشد)
2. اعتبارسنجی title (باید رشته غیر خالی، حداکثر 255 کاراکتر)
3. اعتبارسنجی content (باید رشته غیر خالی)
4. خطاهای توصیفی برای ورودی نامعتبر پرتاب کنید
  `,
  
  starterCode: `
// Security Exercise Starter Code
// Complete the exercises below

// Exercise 1: Fix SQL Injection
async function getUserByUsername(username) {
  // TODO: Use prepared statements with ? placeholder
  // const query = 'SELECT * FROM users WHERE username = ?';
  // const [rows] = await pool.execute(query, [username]);
  // return rows;
}

// Exercise 2: Secure Credentials
// TODO: Create .env file with:
// DB_HOST=localhost
// DB_USER=app_user
// DB_PASSWORD=secure_password
// DB_NAME=myapp_db

// TODO: Update pool configuration to use process.env

// Exercise 3: Password Hashing
// TODO: Install bcrypt: npm install bcrypt
// TODO: Implement registerUser with bcrypt.hash()
// TODO: Implement loginUser with bcrypt.compare()

// Exercise 4: Input Validation
async function createPost(userId, title, content) {
  // TODO: Validate userId is positive integer
  // TODO: Validate title is non-empty string, max 255 chars
  // TODO: Validate content is non-empty string
  // TODO: Throw descriptive errors for invalid input
}
  `,
  
  solution: `
// Security Exercise Solutions

const bcrypt = require('bcrypt');
require('dotenv').config();
const mysql = require('mysql2/promise');

// Exercise 1: Fix SQL Injection
async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.execute(query, [username]);
  return rows;
}

// Exercise 2: Secure Credentials
// .env file:
// DB_HOST=localhost
// DB_USER=app_user
// DB_PASSWORD=secure_password_123
// DB_NAME=myapp_db

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exercise 3: Password Hashing
async function registerUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  return result;
}

async function loginUser(username, password) {
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  
  if (rows.length === 0) {
    throw new Error('User not found');
  }
  
  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    throw new Error('Invalid password');
  }
  
  return user;
}

// Exercise 4: Input Validation
async function createPost(userId, title, content) {
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error('Invalid userId: must be a positive integer');
  }
  
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('Invalid title: must be a non-empty string');
  }
  if (title.length > 255) {
    throw new Error('Invalid title: must be 255 characters or less');
  }
  
  if (typeof content !== 'string' || content.trim().length === 0) {
    throw new Error('Invalid content: must be a non-empty string');
  }
  
  const [result] = await pool.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  );
  return result;
}
  `,
  
  hints: [
    'Exercise 1: Use ? placeholders for parameterized queries',
    'Exercise 2: Never commit .env to version control',
    'Exercise 3: Always hash passwords with bcrypt before storing',
    'Exercise 4: Validate all user input before database operations'
  ],
  
  hintsFa: [
    'تمرین 1: از ? برای کوئری‌های پارامتری استفاده کنید',
    'تمرین 2: هرگز .env را در کنترل نسخه commit نکنید',
    'تمرین 3: همیشه رمزهای عبور را قبل از ذخیره‌سازی هش کنید',
    'تمرین 4: تمام ورودی کاربر را قبل از عملیات پایگاه داده اعتبارسنجی کنید'
  ],
  
  testCases: [
    {
      input: 'Exercise 1: getUserByUsername("admin")',
      expected: 'Returns user with username "admin"',
      description: 'Should find exact username match'
    },
    {
      input: 'Exercise 1: getUserByUsername("admin\' OR \'1\'=\'1")',
      expected: 'Returns empty array',
      description: 'Should safely handle SQL injection attempt'
    },
    {
      input: 'Exercise 2: pool.getConnection()',
      expected: 'Connection successful',
      description: 'Should connect using environment variables'
    },
    {
      input: 'Exercise 3: registerUser("john", "john@example.com", "pass123")',
      expected: 'User inserted with hashed password',
      description: 'Should hash password before storing'
    },
    {
      input: 'Exercise 3: loginUser("john", "pass123")',
      expected: 'Returns user object',
      description: 'Should verify correct password'
    },
    {
      input: 'Exercise 3: loginUser("john", "wrongpass")',
      expected: 'Throws "Invalid password" error',
      description: 'Should reject incorrect password'
    },
    {
      input: 'Exercise 4: createPost(1, "My Post", "Content")',
      expected: 'Post inserted successfully',
      description: 'Should accept valid input'
    },
    {
      input: 'Exercise 4: createPost(-1, "My Post", "Content")',
      expected: 'Throws "Invalid userId" error',
      description: 'Should reject negative userId'
    },
    {
      input: 'Exercise 4: createPost(1, "", "Content")',
      expected: 'Throws "Invalid title" error',
      description: 'Should reject empty title'
    },
    {
      input: 'Exercise 4: createPost(1, "x".repeat(256), "Content")',
      expected: 'Throws "Invalid title" error',
      description: 'Should reject title over 255 characters'
    }
  ]
};

export default securityExercises;