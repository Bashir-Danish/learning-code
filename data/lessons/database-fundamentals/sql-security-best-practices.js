export const sqlSecurityBestPractices = {
  id: 'sql-security-best-practices',
  title: 'SQL Security Best Practices',
  titleFa: 'بهترین روش‌های امنیتی SQL',
  difficulty: 'medium',
  estimatedTime: '60 min',
  
  content: `
# SQL Security Best Practices

## Introduction

Database security is critical for protecting sensitive data. This lesson covers SQL injection attacks, secure credential management, user privileges, and best practices for writing secure database code.

**What you'll learn:**
- SQL injection vulnerabilities and attacks
- Prepared statements for query safety
- Secure credential management
- User authentication and authorization
- Database user privileges (GRANT, REVOKE)
- Common security vulnerabilities
- Security best practices
- Real-world security scenarios

---

## SQL Injection Attacks

### What is SQL Injection?

SQL injection is a code injection technique where an attacker inserts malicious SQL code into input fields to manipulate database queries.

### Vulnerable Code Example

❌ **DANGEROUS - Never do this:**

\`\`\`javascript
// VULNERABLE: String concatenation with user input
async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  const [rows] = await pool.execute(query);
  return rows;
}

// Attack example:
// Input: admin' OR '1'='1
// Query becomes: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
// Result: Returns ALL users instead of just admin!
\`\`\`

### Attack Scenarios

**Scenario 1: Authentication Bypass**

\`\`\`
Normal login:
- Username: admin
- Password: password123

Malicious input:
- Username: admin' --
- Password: anything

Query becomes:
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'

The -- comments out the password check, allowing login without correct password!
\`\`\`

**Scenario 2: Data Extraction**

\`\`\`
Input: ' UNION SELECT username, password FROM users --

Query becomes:
SELECT * FROM users WHERE username = '' UNION SELECT username, password FROM users --'

Result: Attacker gets all usernames and passwords!
\`\`\`

**Scenario 3: Data Destruction**

\`\`\`
Input: '; DROP TABLE users; --

Query becomes:
SELECT * FROM users WHERE username = ''; DROP TABLE users; --'

Result: Entire users table is deleted!
\`\`\`

---

## Prepared Statements (Parameterized Queries)

### What are Prepared Statements?

Prepared statements separate SQL code from data, preventing injection attacks. The SQL structure is defined first, then data is passed separately.

### Secure Code with Prepared Statements

✅ **SAFE - Always use this approach:**

\`\`\`javascript
// SECURE: Using prepared statements with placeholders
async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.execute(query, [username]);
  return rows;
}

// Attack attempt with prepared statement:
// Input: admin' OR '1'='1
// The input is treated as a literal string value, not SQL code
// Query safely searches for username literally: "admin' OR '1'='1"
// Result: No users found (safe!)
\`\`\`

### How Prepared Statements Work

\`\`\`
Step 1: Define SQL structure with placeholders
  Query: SELECT * FROM users WHERE username = ?

Step 2: Send structure to database
  Database compiles and caches the query

Step 3: Send data separately
  Data: ['admin']

Step 4: Database substitutes data into compiled query
  The data is treated as a value, never as code
  Result: Safe execution
\`\`\`

### Prepared Statement Examples

\`\`\`javascript
// Single parameter
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// Multiple parameters
const [result] = await pool.execute(
  'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  [username, email, hashedPassword]
);

// Multiple parameters in WHERE clause
const [rows] = await pool.execute(
  'SELECT * FROM posts WHERE user_id = ? AND status = ?',
  [userId, 'published']
);

// LIKE queries with prepared statements
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username LIKE ?',
  ['%' + searchTerm + '%']
);
\`\`\`

---

## Secure Credential Management

### Environment Variables

Always store database credentials in environment variables, never hardcode them.

✅ **CORRECT: Using environment variables**

\`\`\`javascript
// .env file (NEVER commit this to version control!)
DB_HOST=localhost
DB_USER=app_user
DB_PASSWORD=secure_password_123
DB_NAME=myapp_db

// Node.js code
require('dotenv').config();

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

❌ **WRONG: Hardcoded credentials**

\`\`\`javascript
// NEVER do this!
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password123',  // Exposed in code!
  database: 'myapp_db'
});
\`\`\`

### .gitignore Configuration

\`\`\`
# .gitignore file
.env
.env.local
.env.*.local
node_modules/
\`\`\`

### Environment Variable Best Practices

✅ **DO:**
- Use strong, random passwords
- Rotate credentials regularly
- Use different credentials for different environments (dev, staging, prod)
- Store .env files securely
- Use secrets management tools in production

❌ **DON'T:**
- Commit .env files to version control
- Share credentials via email or chat
- Use default passwords
- Hardcode credentials in code
- Use same credentials across environments

---

## User Authentication and Authorization

### Database User Privileges

Create database users with minimal required privileges.

\`\`\`sql
-- Create a read-only user
CREATE USER 'read_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT ON myapp_db.* TO 'read_user'@'localhost';

-- Create an application user with limited privileges
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON myapp_db.* TO 'app_user'@'localhost';

-- Create an admin user (use sparingly)
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'admin_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
\`\`\`

### Principle of Least Privilege

Always grant users only the permissions they need.

\`\`\`sql
-- WRONG: Giving too many permissions
GRANT ALL PRIVILEGES ON *.* TO 'app_user'@'localhost';

-- CORRECT: Granting only needed permissions
GRANT SELECT, INSERT, UPDATE ON myapp_db.users TO 'app_user'@'localhost';
GRANT SELECT ON myapp_db.products TO 'app_user'@'localhost';
\`\`\`

### Revoking Privileges

\`\`\`sql
-- Remove specific privilege
REVOKE INSERT ON myapp_db.users FROM 'app_user'@'localhost';

-- Remove all privileges
REVOKE ALL PRIVILEGES ON myapp_db.* FROM 'app_user'@'localhost';

-- Delete user
DROP USER 'app_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
\`\`\`

---

## Password Hashing

### Never Store Plain Text Passwords

Always hash passwords before storing them in the database.

✅ **CORRECT: Hashing passwords**

\`\`\`javascript
const bcrypt = require('bcrypt');

async function registerUser(username, email, password) {
  // Hash password with salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store hashed password in database
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  
  return result;
}

async function loginUser(username, password) {
  // Get user from database
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  
  if (rows.length === 0) {
    throw new Error('User not found');
  }
  
  const user = rows[0];
  
  // Compare provided password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  
  return user;
}
\`\`\`

❌ **WRONG: Storing plain text passwords**

\`\`\`javascript
// NEVER do this!
async function registerUser(username, email, password) {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]  // Plain text password!
  );
  return result;
}
\`\`\`

---

## Input Validation

### Validate All User Input

\`\`\`javascript
// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// Validate username format
function isValidUsername(username) {
  // Only alphanumeric and underscore, 3-20 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

// Validate age is a number
function isValidAge(age) {
  const ageNum = parseInt(age, 10);
  return !isNaN(ageNum) && ageNum >= 0 && ageNum <= 150;
}

// Use validation before database operations
async function registerUser(username, email, password) {
  if (!isValidUsername(username)) {
    throw new Error('Invalid username format');
  }
  
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  
  // Proceed with registration
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  
  return result;
}
\`\`\`

---

## Error Handling

### Don't Expose Database Details

❌ **WRONG: Exposing database errors**

\`\`\`javascript
async function getUser(userId) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    // DANGEROUS: Sending full error to client
    res.status(500).json({ error: error.message });
  }
}
\`\`\`

✅ **CORRECT: Generic error messages**

\`\`\`javascript
async function getUser(userId) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    // Log detailed error for debugging
    console.error('Database error:', error);
    
    // Send generic message to client
    res.status(500).json({ error: 'An error occurred' });
  }
}
\`\`\`

---

## Common Security Mistakes

### 1. String Concatenation in Queries

❌ **WRONG:**
\`\`\`javascript
const query = "SELECT * FROM users WHERE id = " + userId;
const [rows] = await pool.execute(query);
\`\`\`

✅ **CORRECT:**
\`\`\`javascript
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);
\`\`\`

### 2. Hardcoded Credentials

❌ **WRONG:**
\`\`\`javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password123'
});
\`\`\`

✅ **CORRECT:**
\`\`\`javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
\`\`\`

### 3. Storing Plain Text Passwords

❌ **WRONG:**
\`\`\`javascript
const [result] = await pool.execute(
  'INSERT INTO users (username, password) VALUES (?, ?)',
  [username, plainTextPassword]
);
\`\`\`

✅ **CORRECT:**
\`\`\`javascript
const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
const [result] = await pool.execute(
  'INSERT INTO users (username, password) VALUES (?, ?)',
  [username, hashedPassword]
);
\`\`\`

### 4. Excessive User Privileges

❌ **WRONG:**
\`\`\`sql
GRANT ALL PRIVILEGES ON *.* TO 'app_user'@'localhost';
\`\`\`

✅ **CORRECT:**
\`\`\`sql
GRANT SELECT, INSERT, UPDATE ON myapp_db.* TO 'app_user'@'localhost';
\`\`\`

### 5. No Input Validation

❌ **WRONG:**
\`\`\`javascript
async function updateUser(userId, email) {
  const [result] = await pool.execute(
    'UPDATE users SET email = ? WHERE id = ?',
    [email, userId]
  );
  return result;
}
\`\`\`

✅ **CORRECT:**
\`\`\`javascript
async function updateUser(userId, email) {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email format');
  }
  
  const [result] = await pool.execute(
    'UPDATE users SET email = ? WHERE id = ?',
    [email, userId]
  );
  return result;
}
\`\`\`

---

## Security Checklist

✅ **Before deploying to production:**

- [ ] All queries use prepared statements
- [ ] Database credentials in environment variables
- [ ] .env file in .gitignore
- [ ] Passwords are hashed (bcrypt, argon2, etc.)
- [ ] Database users have minimal privileges
- [ ] Input validation on all user data
- [ ] Error messages don't expose database details
- [ ] Connection pooling configured
- [ ] SSL/TLS enabled for database connections
- [ ] Regular security audits performed
- [ ] Backup and recovery procedures in place
- [ ] Monitoring and logging enabled

---

## Quick Reference

### Prepared Statement Syntax

| Operation | Syntax |
|-----------|--------|
| SELECT | \`SELECT * FROM table WHERE id = ?\` |
| INSERT | \`INSERT INTO table (col1, col2) VALUES (?, ?)\` |
| UPDATE | \`UPDATE table SET col1 = ? WHERE id = ?\` |
| DELETE | \`DELETE FROM table WHERE id = ?\` |

### User Privilege Levels

| Privilege | Use Case |
|-----------|----------|
| SELECT | Read-only access |
| INSERT | Add new records |
| UPDATE | Modify existing records |
| DELETE | Remove records |
| CREATE | Create tables |
| DROP | Delete tables |
| ALL | Full access (use sparingly) |

### Security Best Practices Summary

| Practice | Benefit |
|----------|---------|
| Prepared Statements | Prevents SQL injection |
| Environment Variables | Protects credentials |
| Password Hashing | Protects user passwords |
| Input Validation | Prevents invalid data |
| Least Privilege | Limits damage from breaches |
| Error Handling | Prevents information leakage |

---

## Next Steps

Now that you understand SQL security:
1. Review your existing code for vulnerabilities
2. Implement prepared statements everywhere
3. Set up proper user privileges
4. Add input validation to all forms
5. Implement password hashing
6. Set up monitoring and logging

> **Remember:** Security is not optional—it's essential! 🔒
`,

  contentFa: `
# بهترین روش‌های امنیتی SQL

## مقدمه

امنیت پایگاه داده برای محافظت از داده‌های حساس بسیار مهم است. این درس حملات SQL injection، مدیریت امن اعتبارات، امتیازات کاربر و بهترین روش‌های نوشتن کد پایگاه داده امن را پوشش می‌دهد.

**چه چیزی یاد می‌گیرید:**
- آسیب‌پذیری‌های SQL injection و حملات
- Prepared statements برای ایمنی کوئری
- مدیریت امن اعتبارات
- احراز هویت و مجوز کاربر
- امتیازات کاربر پایگاه داده (GRANT، REVOKE)
- آسیب‌پذیری‌های امنیتی رایج
- بهترین روش‌های امنیتی
- سناریوهای امنیتی واقعی

---

## حملات SQL Injection

### SQL Injection چیست؟

SQL injection تکنیکی است که در آن مهاجم کد SQL مخرب را در فیلدهای ورودی درج می‌کند تا کوئری‌های پایگاه داده را دستکاری کند.

### مثال کد آسیب‌پذیر

❌ **خطرناک - هرگز این کار را نکنید:**

\`\`\`javascript
// آسیب‌پذیر: الحاق رشته با ورودی کاربر
async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  const [rows] = await pool.execute(query);
  return rows;
}

// مثال حمله:
// ورودی: admin' OR '1'='1
// کوئری می‌شود: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
// نتیجه: تمام کاربران برگردانده می‌شوند!
\`\`\`

### سناریوهای حمله

**سناریو 1: دور زدن احراز هویت**

\`\`\`
ورود عادی:
- نام کاربری: admin
- رمز عبور: password123

ورودی مخرب:
- نام کاربری: admin' --
- رمز عبور: هر چیزی

کوئری می‌شود:
SELECT * FROM users WHERE username = 'admin' --' AND password = 'anything'

-- کوئری رمز عبور را کامنت می‌کند، اجازه ورود بدون رمز صحیح!
\`\`\`

**سناریو 2: استخراج داده**

\`\`\`
ورودی: ' UNION SELECT username, password FROM users --

کوئری می‌شود:
SELECT * FROM users WHERE username = '' UNION SELECT username, password FROM users --'

نتیجه: مهاجم تمام نام‌های کاربری و رمزهای عبور را می‌گیرد!
\`\`\`

**سناریو 3: حذف داده**

\`\`\`
ورودی: '; DROP TABLE users; --

کوئری می‌شود:
SELECT * FROM users WHERE username = ''; DROP TABLE users; --'

نتیجه: کل جدول users حذف می‌شود!
\`\`\`

---

## Prepared Statements (Parameterized Queries)

### Prepared Statements چیست؟

Prepared statements کد SQL را از داده جدا می‌کنند، حملات injection را جلوگیری می‌کنند. ساختار SQL ابتدا تعریف می‌شود، سپس داده به طور جداگانه ارسال می‌شود.

### کد امن با Prepared Statements

✅ **امن - همیشه این روش را استفاده کنید:**

\`\`\`javascript
// امن: استفاده از prepared statements با placeholders
async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [rows] = await pool.execute(query, [username]);
  return rows;
}

// تلاش حمله با prepared statement:
// ورودی: admin' OR '1'='1
// ورودی به عنوان مقدار رشته‌ای درمان می‌شود، نه کد SQL
// کوئری به طور امن برای نام کاربری جستجو می‌کند: "admin' OR '1'='1"
// نتیجه: هیچ کاربری پیدا نشد (امن!)
\`\`\`

### نحوه کار Prepared Statements

\`\`\`
مرحله 1: ساختار SQL را با placeholders تعریف کنید
  کوئری: SELECT * FROM users WHERE username = ?

مرحله 2: ساختار را به پایگاه داده ارسال کنید
  پایگاه داده کوئری را کامپایل و کش می‌کند

مرحله 3: داده را به طور جداگانه ارسال کنید
  داده: ['admin']

مرحله 4: پایگاه داده داده را در کوئری کامپایل‌شده جایگزین می‌کند
  داده به عنوان مقدار درمان می‌شود، هرگز به عنوان کد نه
  نتیجه: اجرای امن
\`\`\`

### مثال‌های Prepared Statement

\`\`\`javascript
// یک پارامتر
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);

// چند پارامتر
const [result] = await pool.execute(
  'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
  [username, email, hashedPassword]
);

// چند پارامتر در WHERE clause
const [rows] = await pool.execute(
  'SELECT * FROM posts WHERE user_id = ? AND status = ?',
  [userId, 'published']
);

// کوئری‌های LIKE با prepared statements
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE username LIKE ?',
  ['%' + searchTerm + '%']
);
\`\`\`

---

## مدیریت امن اعتبارات

### متغیرهای محیطی

همیشه اعتبارات پایگاه داده را در متغیرهای محیطی ذخیره کنید، هرگز آنها را hardcode نکنید.

✅ **درست: استفاده از متغیرهای محیطی**

\`\`\`javascript
// فایل .env (هرگز این را در version control commit نکنید!)
DB_HOST=localhost
DB_USER=app_user
DB_PASSWORD=secure_password_123
DB_NAME=myapp_db

// کد Node.js
require('dotenv').config();

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

❌ **اشتباه: اعتبارات hardcoded**

\`\`\`javascript
// هرگز این کار را نکنید!
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password123',  // در کد نمایش داده می‌شود!
  database: 'myapp_db'
});
\`\`\`

### پیکربندی .gitignore

\`\`\`
# فایل .gitignore
.env
.env.local
.env.*.local
node_modules/
\`\`\`

### بهترین روش‌های متغیرهای محیطی

✅ **انجام دهید:**
- از رمزهای قوی و تصادفی استفاده کنید
- اعتبارات را به طور منظم تغییر دهید
- از اعتبارات مختلف برای محیط‌های مختلف استفاده کنید (dev، staging، prod)
- فایل‌های .env را به طور امن ذخیره کنید
- از ابزارهای مدیریت اسرار در production استفاده کنید

❌ **انجام ندهید:**
- فایل‌های .env را در version control commit نکنید
- اعتبارات را از طریق ایمیل یا چت به اشتراک نگذارید
- از رمزهای پیش‌فرض استفاده نکنید
- اعتبارات را در کد hardcode نکنید
- از اعتبارات یکسان در محیط‌های مختلف استفاده نکنید

---

## احراز هویت و مجوز کاربر

### امتیازات کاربر پایگاه داده

کاربران پایگاه داده را با حداقل امتیازات مورد نیاز ایجاد کنید.

\`\`\`sql
-- ایجاد کاربر فقط‌خواندنی
CREATE USER 'read_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT ON myapp_db.* TO 'read_user'@'localhost';

-- ایجاد کاربر برنامه با امتیازات محدود
CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT SELECT, INSERT, UPDATE ON myapp_db.* TO 'app_user'@'localhost';

-- ایجاد کاربر admin (به ندرت استفاده کنید)
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'admin_user'@'localhost';

-- تغییرات را اعمال کنید
FLUSH PRIVILEGES;
\`\`\`

### اصل کمترین امتیاز

همیشه فقط امتیازاتی را که کاربر نیاز دارد به او بدهید.

\`\`\`sql
-- اشتباه: دادن بیش از حد امتیازات
GRANT ALL PRIVILEGES ON *.* TO 'app_user'@'localhost';

-- درست: دادن فقط امتیازات مورد نیاز
GRANT SELECT, INSERT, UPDATE ON myapp_db.users TO 'app_user'@'localhost';
GRANT SELECT ON myapp_db.products TO 'app_user'@'localhost';
\`\`\`

### لغو امتیازات

\`\`\`sql
-- حذف امتیاز خاص
REVOKE INSERT ON myapp_db.users FROM 'app_user'@'localhost';

-- حذف تمام امتیازات
REVOKE ALL PRIVILEGES ON myapp_db.* FROM 'app_user'@'localhost';

-- حذف کاربر
DROP USER 'app_user'@'localhost';

-- تغییرات را اعمال کنید
FLUSH PRIVILEGES;
\`\`\`

---

## هش کردن رمز عبور

### هرگز رمزهای عبور را به صورت متن ساده ذخیره نکنید

همیشه رمزهای عبور را قبل از ذخیره در پایگاه داده هش کنید.

✅ **درست: هش کردن رمزهای عبور**

\`\`\`javascript
const bcrypt = require('bcrypt');

async function registerUser(username, email, password) {
  // هش کردن رمز عبور با salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // ذخیره رمز عبور هش‌شده در پایگاه داده
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  
  return result;
}

async function loginUser(username, password) {
  // دریافت کاربر از پایگاه داده
  const [rows] = await pool.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  
  if (rows.length === 0) {
    throw new Error('کاربر پیدا نشد');
  }
  
  const user = rows[0];
  
  // مقایسه رمز عبور ارائه‌شده با هش ذخیره‌شده
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('رمز عبور نامعتبر');
  }
  
  return user;
}
\`\`\`

❌ **اشتباه: ذخیره رمزهای عبور به صورت متن ساده**

\`\`\`javascript
// هرگز این کار را نکنید!
async function registerUser(username, email, password) {
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]  // رمز عبور متن ساده!
  );
  return result;
}
\`\`\`

---

## اعتبارسنجی ورودی

### تمام ورودی کاربر را اعتبارسنجی کنید

\`\`\`javascript
// اعتبارسنجی فرمت ایمیل
function isValidEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// اعتبارسنجی فرمت نام کاربری
function isValidUsername(username) {
  // فقط حروف و اعداد و underscore، 3-20 کاراکتر
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

// اعتبارسنجی سن یک عدد است
function isValidAge(age) {
  const ageNum = parseInt(age, 10);
  return !isNaN(ageNum) && ageNum >= 0 && ageNum <= 150;
}

// استفاده از اعتبارسنجی قبل از عملیات پایگاه داده
async function registerUser(username, email, password) {
  if (!isValidUsername(username)) {
    throw new Error('فرمت نام کاربری نامعتبر');
  }
  
  if (!isValidEmail(email)) {
    throw new Error('فرمت ایمیل نامعتبر');
  }
  
  if (password.length < 8) {
    throw new Error('رمز عبور باید حداقل 8 کاراکتر باشد');
  }
  
  // ادامه ثبت‌نام
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );
  
  return result;
}
\`\`\`

---

## مدیریت خطا

### جزئیات پایگاه داده را نمایش ندهید

❌ **اشتباه: نمایش خطاهای پایگاه داده**

\`\`\`javascript
async function getUser(userId) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    // خطرناک: ارسال خطای کامل به کلاینت
    res.status(500).json({ error: error.message });
  }
}
\`\`\`

✅ **درست: پیام‌های خطای عمومی**

\`\`\`javascript
async function getUser(userId) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    // ثبت خطای تفصیلی برای اشکال‌زدایی
    console.error('خطای پایگاه داده:', error);
    
    // ارسال پیام عمومی به کلاینت
    res.status(500).json({ error: 'خطایی رخ داد' });
  }
}
\`\`\`

---

## اشتباهات امنیتی رایج

### 1. الحاق رشته در کوئری‌ها

❌ **اشتباه:**
\`\`\`javascript
const query = "SELECT * FROM users WHERE id = " + userId;
const [rows] = await pool.execute(query);
\`\`\`

✅ **درست:**
\`\`\`javascript
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE id = ?',
  [userId]
);
\`\`\`

### 2. اعتبارات Hardcoded

❌ **اشتباه:**
\`\`\`javascript
const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: 'password123'
});
\`\`\`

✅ **درست:**
\`\`\`javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
\`\`\`

### 3. ذخیره رمزهای عبور به صورت متن ساده

❌ **اشتباه:**
\`\`\`javascript
const [result] = await pool.execute(
  'INSERT INTO users (username, password) VALUES (?, ?)',
  [username, plainTextPassword]
);
\`\`\`

✅ **درست:**
\`\`\`javascript
const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
const [result] = await pool.execute(
  'INSERT INTO users (username, password) VALUES (?, ?)',
  [username, hashedPassword]
);
\`\`\`

### 4. امتیازات بیش از حد کاربر

❌ **اشتباه:**
\`\`\`sql
GRANT ALL PRIVILEGES ON *.* TO 'app_user'@'localhost';
\`\`\`

✅ **درست:**
\`\`\`sql
GRANT SELECT, INSERT, UPDATE ON myapp_db.* TO 'app_user'@'localhost';
\`\`\`

### 5. بدون اعتبارسنجی ورودی

❌ **اشتباه:**
\`\`\`javascript
async function updateUser(userId, email) {
  const [result] = await pool.execute(
    'UPDATE users SET email = ? WHERE id = ?',
    [email, userId]
  );
  return result;
}
\`\`\`

✅ **درست:**
\`\`\`javascript
async function updateUser(userId, email) {
  if (!isValidEmail(email)) {
    throw new Error('فرمت ایمیل نامعتبر');
  }
  
  const [result] = await pool.execute(
    'UPDATE users SET email = ? WHERE id = ?',
    [email, userId]
  );
  return result;
}
\`\`\`

---

## فهرست بررسی امنیتی

✅ **قبل از استقرار در production:**

- [ ] تمام کوئری‌ها از prepared statements استفاده می‌کنند
- [ ] اعتبارات پایگاه داده در متغیرهای محیطی هستند
- [ ] فایل .env در .gitignore است
- [ ] رمزهای عبور هش‌شده‌اند (bcrypt، argon2، و غیره)
- [ ] کاربران پایگاه داده امتیازات حداقلی دارند
- [ ] اعتبارسنجی ورودی برای تمام داده‌های کاربر
- [ ] پیام‌های خطا جزئیات پایگاه داده را نمایش نمی‌دهند
- [ ] connection pooling پیکربندی‌شده است
- [ ] SSL/TLS برای اتصالات پایگاه داده فعال است
- [ ] بررسی‌های امنیتی منظم انجام می‌شوند
- [ ] روش‌های پشتیبان‌گیری و بازیابی در جا هستند
- [ ] نظارت و ثبت‌کردن فعال است

---

## مرجع سریع

### نحو Prepared Statement

| عملیات | نحو |
|--------|-----|
| SELECT | \`SELECT * FROM table WHERE id = ?\` |
| INSERT | \`INSERT INTO table (col1, col2) VALUES (?, ?)\` |
| UPDATE | \`UPDATE table SET col1 = ? WHERE id = ?\` |
| DELETE | \`DELETE FROM table WHERE id = ?\` |

### سطوح امتیاز کاربر

| امتیاز | مورد استفاده |
|--------|-------------|
| SELECT | دسترسی فقط‌خواندنی |
| INSERT | اضافه کردن رکورد جدید |
| UPDATE | تغییر رکورد موجود |
| DELETE | حذف رکورد |
| CREATE | ایجاد جداول |
| DROP | حذف جداول |
| ALL | دسترسی کامل (به ندرت استفاده کنید) |

### خلاصه بهترین روش‌های امنیتی

| روش | فایده |
|-----|-------|
| Prepared Statements | جلوگیری از SQL injection |
| متغیرهای محیطی | محافظت از اعتبارات |
| هش کردن رمز عبور | محافظت از رمزهای عبور کاربر |
| اعتبارسنجی ورودی | جلوگیری از داده‌های نامعتبر |
| کمترین امتیاز | محدود کردن آسیب از نقض امنیتی |
| مدیریت خطا | جلوگیری از نشت اطلاعات |

---

## مراحل بعدی

حالا که امنیت SQL را فهمیدید:
1. کد موجود خود را برای آسیب‌پذیری‌ها بررسی کنید
2. Prepared statements را در همه جا پیاده‌سازی کنید
3. امتیازات کاربر مناسب را تنظیم کنید
4. اعتبارسنجی ورودی را به تمام فرم‌ها اضافه کنید
5. هش کردن رمز عبور را پیاده‌سازی کنید
6. نظارت و ثبت‌کردن را تنظیم کنید

> **به یاد داشته باشید:** امنیت اختیاری نیست—ضروری است! 🔒
`,

  visualizationId: null,
  exerciseId: 'security-exercises',
};

export default sqlSecurityBestPractices;
