export const mysqlServerBasics = {
  id: 'mysql-server-basics',
  title: 'MySQL Server Basics',
  titleFa: 'مبانی سرور MySQL',
  difficulty: 'easy',
  estimatedTime: '40 min',
  
  content: `
# MySQL Server Basics - Getting Started with MySQL

## What is MySQL?

MySQL is one of the world's most popular **open-source relational database management systems** (RDBMS). Think of it as a powerful filing cabinet that stores and organizes your data in tables, making it easy to find, update, and manage information.

**Real-world analogy:** Imagine a library where books (data) are organized in shelves (tables) with a catalog system (database) that helps you find exactly what you need instantly!

**Why MySQL?**
- ✅ Free and open-source
- ✅ Fast and reliable
- ✅ Used by giants like Facebook, Twitter, YouTube
- ✅ Works great with Node.js, PHP, Python, Java
- ✅ Huge community support

---

## MySQL Version Releases: LTS vs Innovation

MySQL now follows a dual-release model to serve different needs:

### MySQL 8.4.8 LTS (Long Term Support) ⭐ Recommended for Production

**What is LTS?**
LTS stands for "Long Term Support" - these versions are stable, thoroughly tested, and supported for years.

**Key Features:**
- 🛡️ **Stability First**: Fewer changes, more testing
- 📅 **Long Support**: Security updates and bug fixes for 5+ years
- 🏢 **Production Ready**: Perfect for business applications
- 🔒 **Predictable**: No surprise breaking changes

**When to use MySQL 8.4.8 LTS:**
- Building production applications
- Enterprise/business projects
- When stability matters more than new features
- Long-term projects


### MySQL 9.2.0 Innovation 🚀 Latest Features

**What is Innovation Release?**
Innovation releases bring the newest features and improvements quickly, but with shorter support periods.

**Key Features:**
- ⚡ **Cutting Edge**: Latest features and performance improvements
- 🔬 **Experimental**: New capabilities to try out
- 📦 **Frequent Updates**: New versions every few months
- 🎯 **Short Support**: Supported until next innovation release

**When to use MySQL 9.2.0 Innovation:**
- Learning and experimentation
- Testing new features
- Development environments
- Projects that need latest capabilities

**Quick Comparison:**

| Feature | MySQL 8.4.8 LTS | MySQL 9.2.0 Innovation |
|---------|-----------------|------------------------|
| Stability | ⭐⭐⭐⭐⭐ Very Stable | ⭐⭐⭐ Stable |
| Support Duration | 5+ years | ~6 months |
| New Features | Fewer, tested | Latest, experimental |
| Best For | Production | Development/Testing |
| Updates | Security/Bug fixes | New features + fixes |

> **Recommendation:** Start learning with either version, but use **MySQL 8.4.8 LTS** for real projects!

---

## Installing MySQL Server

### Windows Installation

\`\`\`bash
# Download MySQL Installer from mysql.com
# Choose "MySQL Installer for Windows"
# Select "Developer Default" or "Server only"
# Follow the installation wizard
\`\`\`

**Installation Steps:**
1. Download MySQL Installer from [mysql.com/downloads](https://dev.mysql.com/downloads/installer/)
2. Run the installer
3. Choose "Developer Default" (includes server + tools)
4. Set root password (remember this!)
5. Configure MySQL as Windows Service (auto-start)
6. Complete installation


### macOS Installation

\`\`\`bash
# Using Homebrew (recommended)
brew install mysql

# Start MySQL server
brew services start mysql

# Secure installation
mysql_secure_installation
\`\`\`

### Linux (Ubuntu/Debian) Installation

\`\`\`bash
# Update package index
sudo apt update

# Install MySQL Server
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Enable auto-start on boot
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation
\`\`\`

---

## Verifying Your Installation

After installation, verify MySQL is running:

\`\`\`bash
# Check MySQL version
mysql --version
# Output: mysql  Ver 8.4.8 for Linux on x86_64 (MySQL Community Server - GPL)

# Connect to MySQL server
mysql -u root -p
# Enter your root password when prompted
\`\`\`

**Expected output:**
\`\`\`
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 8
Server version: 8.4.8 MySQL Community Server - GPL

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

mysql>
\`\`\`

---

## MySQL Server Architecture (Simple Overview)


\`\`\`
┌─────────────────────────────────────┐
│     Your Application (Node.js)      │
│                                     │
└──────────────┬──────────────────────┘
               │ SQL Queries
               ▼
┌─────────────────────────────────────┐
│         MySQL Server                │
│  ┌─────────────────────────────┐   │
│  │   Query Processor           │   │  ← Understands SQL
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Storage Engine (InnoDB)   │   │  ← Stores data
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   Data Files on Disk        │   │  ← Actual data
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
\`\`\`

**How it works:**
1. Your app sends SQL query to MySQL server
2. MySQL processes the query
3. Storage engine retrieves/stores data
4. Results sent back to your app

---

## Key MySQL Concepts

### 1. Database
A container that holds related tables. Like a folder for your data.

\`\`\`sql
-- Create a database
CREATE DATABASE my_app;

-- Use the database
USE my_app;

-- Show all databases
SHOW DATABASES;
\`\`\`

### 2. Table
Organized data in rows and columns. Like a spreadsheet.

\`\`\`sql
-- Create a table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 3. Row (Record)
A single entry in a table. Like one line in a spreadsheet.

### 4. Column (Field)
A category of data. Like a column header in a spreadsheet.


---

## MySQL vs Other Databases

| Feature | MySQL | PostgreSQL | MongoDB |
|---------|-------|------------|---------|
| Type | Relational (SQL) | Relational (SQL) | NoSQL (Document) |
| Best For | Web apps, read-heavy | Complex queries, data integrity | Flexible schemas, JSON |
| Speed | Very Fast reads | Fast, complex queries | Fast writes |
| Learning Curve | Easy | Medium | Easy |
| Use Cases | WordPress, E-commerce | Analytics, Financial | Real-time apps, IoT |

---

## MySQL Storage Engines

MySQL supports different storage engines. The default and most popular is **InnoDB**.

### InnoDB (Default) ⭐ Recommended

\`\`\`sql
-- InnoDB is default, but you can specify explicitly
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100)
) ENGINE=InnoDB;
\`\`\`

**Features:**
- ✅ ACID compliant (reliable transactions)
- ✅ Foreign key support
- ✅ Crash recovery
- ✅ Row-level locking (better concurrency)

**When to use:** Almost always! It's the best choice for most applications.

### MyISAM (Legacy)

**Features:**
- ❌ No foreign keys
- ❌ No transactions
- ✅ Fast for read-only data
- ✅ Full-text search

**When to use:** Rarely. Only for specific read-heavy scenarios.

---

## Common MySQL Tools

### 1. MySQL Command Line Client
Built-in terminal interface for MySQL.

\`\`\`bash
mysql -u root -p
\`\`\`

### 2. MySQL Workbench
Official GUI tool for MySQL (free).
- Visual database design
- Query editor with syntax highlighting
- Server administration


### 3. phpMyAdmin
Web-based MySQL administration tool.

### 4. DBeaver
Universal database tool (supports MySQL and many others).

---

## Basic MySQL Commands

### Server Management

\`\`\`bash
# Start MySQL server (Linux)
sudo systemctl start mysql

# Stop MySQL server
sudo systemctl stop mysql

# Restart MySQL server
sudo systemctl restart mysql

# Check MySQL status
sudo systemctl status mysql
\`\`\`

### Database Operations

\`\`\`sql
-- Show all databases
SHOW DATABASES;

-- Create database
CREATE DATABASE shop;

-- Delete database (careful!)
DROP DATABASE shop;

-- Select database to use
USE shop;

-- Show current database
SELECT DATABASE();
\`\`\`

### User Management

\`\`\`sql
-- Create new user
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON shop.* TO 'appuser'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Show current user
SELECT USER();
\`\`\`

---

## Common Mistakes

### 1. Forgetting to Select Database
❌ **Wrong:**
\`\`\`sql
CREATE TABLE users (...);  -- Error: No database selected
\`\`\`

✅ **Correct:**
\`\`\`sql
USE my_app;
CREATE TABLE users (...);
\`\`\`


### 2. Using Root User in Applications
❌ **Wrong:** Connecting your app with root user
✅ **Correct:** Create a dedicated user with limited privileges

### 3. Not Setting a Strong Root Password
❌ **Wrong:** Using "password" or "123456"
✅ **Correct:** Use strong, unique passwords

### 4. Forgetting Semicolon in SQL
❌ **Wrong:**
\`\`\`sql
SHOW DATABASES
-- MySQL waits for more input...
\`\`\`

✅ **Correct:**
\`\`\`sql
SHOW DATABASES;
\`\`\`

---

## MySQL Configuration File

MySQL settings are stored in configuration files:

**Linux:** \`/etc/mysql/my.cnf\`
**Windows:** \`C:\\ProgramData\\MySQL\\MySQL Server 8.4\\my.ini\`
**macOS:** \`/usr/local/etc/my.cnf\`

**Common settings:**
\`\`\`ini
[mysqld]
port = 3306                    # Default MySQL port
max_connections = 151          # Maximum simultaneous connections
character-set-server = utf8mb4 # Character encoding
default-storage-engine = InnoDB # Default storage engine
\`\`\`

---

## MySQL Default Port

MySQL runs on **port 3306** by default.

\`\`\`javascript
// When connecting from Node.js
const connection = {
  host: 'localhost',
  port: 3306,        // Default port
  user: 'appuser',
  password: 'password',
  database: 'my_app'
};
\`\`\`

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| \`mysql -u root -p\` | Connect to MySQL |
| \`SHOW DATABASES;\` | List all databases |
| \`CREATE DATABASE name;\` | Create database |
| \`USE database;\` | Select database |
| \`SHOW TABLES;\` | List tables in current database |
| \`EXIT;\` or \`QUIT;\` | Disconnect from MySQL |


---

## Next Steps

Now that you understand MySQL basics, you're ready to:
1. Learn about MariaDB (MySQL's cousin)
2. Connect to MySQL from Node.js
3. Write SQL queries to manage data
4. Build database-driven applications

> **Remember:** MySQL 8.4.8 LTS is your friend for production apps, while 9.2.0 Innovation is great for exploring new features! 🚀
`,

  contentFa: `
# مبانی سرور MySQL - شروع کار با MySQL

## MySQL چیست؟

MySQL یکی از محبوب‌ترین **سیستم‌های مدیریت پایگاه داده رابطه‌ای متن‌باز** (RDBMS) در جهان است. آن را مانند یک کابینت بایگانی قدرتمند در نظر بگیرید که داده‌های شما را در جداول ذخیره و سازماندهی می‌کند و پیدا کردن، به‌روزرسانی و مدیریت اطلاعات را آسان می‌کند.

**تشبیه واقعی:** یک کتابخانه را تصور کنید که کتاب‌ها (داده‌ها) در قفسه‌ها (جداول) با یک سیستم کاتالوگ (پایگاه داده) سازماندهی شده‌اند که به شما کمک می‌کند دقیقاً آنچه را که نیاز دارید فوراً پیدا کنید!

**چرا MySQL؟**
- ✅ رایگان و متن‌باز
- ✅ سریع و قابل اعتماد
- ✅ توسط غول‌هایی مثل فیسبوک، توییتر، یوتیوب استفاده می‌شود
- ✅ با Node.js، PHP، Python، Java عالی کار می‌کند
- ✅ پشتیبانی جامعه بزرگ

---

## نسخه‌های MySQL: LTS در مقابل Innovation

MySQL اکنون از یک مدل انتشار دوگانه برای پاسخگویی به نیازهای مختلف پیروی می‌کند:

### MySQL 8.4.8 LTS (پشتیبانی بلندمدت) ⭐ توصیه شده برای تولید

**LTS چیست؟**
LTS مخفف "Long Term Support" است - این نسخه‌ها پایدار، کاملاً تست شده و برای سال‌ها پشتیبانی می‌شوند.

**ویژگی‌های کلیدی:**
- 🛡️ **اولویت با ثبات**: تغییرات کمتر، تست بیشتر
- 📅 **پشتیبانی طولانی**: به‌روزرسانی‌های امنیتی و رفع باگ برای ۵+ سال
- 🏢 **آماده تولید**: عالی برای برنامه‌های تجاری
- 🔒 **قابل پیش‌بینی**: بدون تغییرات غافلگیرکننده

**چه زمانی از MySQL 8.4.8 LTS استفاده کنیم:**
- ساخت برنامه‌های تولیدی
- پروژه‌های سازمانی/تجاری
- زمانی که ثبات مهم‌تر از ویژگی‌های جدید است
- پروژه‌های بلندمدت


### MySQL 9.2.0 Innovation 🚀 آخرین ویژگی‌ها

**نسخه Innovation چیست؟**
نسخه‌های Innovation ویژگی‌ها و بهبودهای جدید را سریع ارائه می‌دهند، اما با دوره‌های پشتیبانی کوتاه‌تر.

**ویژگی‌های کلیدی:**
- ⚡ **پیشرفته**: آخرین ویژگی‌ها و بهبودهای عملکرد
- 🔬 **آزمایشی**: قابلیت‌های جدید برای امتحان
- 📦 **به‌روزرسانی‌های مکرر**: نسخه‌های جدید هر چند ماه
- 🎯 **پشتیبانی کوتاه**: تا نسخه innovation بعدی پشتیبانی می‌شود

**چه زمانی از MySQL 9.2.0 Innovation استفاده کنیم:**
- یادگیری و آزمایش
- تست ویژگی‌های جدید
- محیط‌های توسعه
- پروژه‌هایی که به آخرین قابلیت‌ها نیاز دارند

**مقایسه سریع:**

| ویژگی | MySQL 8.4.8 LTS | MySQL 9.2.0 Innovation |
|-------|-----------------|------------------------|
| ثبات | ⭐⭐⭐⭐⭐ بسیار پایدار | ⭐⭐⭐ پایدار |
| مدت پشتیبانی | ۵+ سال | ~۶ ماه |
| ویژگی‌های جدید | کمتر، تست شده | آخرین، آزمایشی |
| بهترین برای | تولید | توسعه/تست |
| به‌روزرسانی‌ها | امنیتی/رفع باگ | ویژگی جدید + رفع باگ |

> **توصیه:** یادگیری را با هر نسخه شروع کنید، اما برای پروژه‌های واقعی از **MySQL 8.4.8 LTS** استفاده کنید!

---

## نصب سرور MySQL

### نصب در Windows

\`\`\`bash
# MySQL Installer را از mysql.com دانلود کنید
# "MySQL Installer for Windows" را انتخاب کنید
# "Developer Default" یا "Server only" را انتخاب کنید
# مراحل نصب را دنبال کنید
\`\`\`

**مراحل نصب:**
1. MySQL Installer را از [mysql.com/downloads](https://dev.mysql.com/downloads/installer/) دانلود کنید
2. نصب‌کننده را اجرا کنید
3. "Developer Default" را انتخاب کنید (شامل سرور + ابزارها)
4. رمز عبور root را تنظیم کنید (این را به خاطر بسپارید!)
5. MySQL را به عنوان سرویس Windows پیکربندی کنید (شروع خودکار)
6. نصب را کامل کنید


### نصب در macOS

\`\`\`bash
# استفاده از Homebrew (توصیه می‌شود)
brew install mysql

# شروع سرور MySQL
brew services start mysql

# نصب امن
mysql_secure_installation
\`\`\`

### نصب در Linux (Ubuntu/Debian)

\`\`\`bash
# به‌روزرسانی فهرست بسته‌ها
sudo apt update

# نصب سرور MySQL
sudo apt install mysql-server

# شروع سرویس MySQL
sudo systemctl start mysql

# فعال‌سازی شروع خودکار در بوت
sudo systemctl enable mysql

# نصب امن
sudo mysql_secure_installation
\`\`\`

---

## تأیید نصب

بعد از نصب، تأیید کنید که MySQL در حال اجرا است:

\`\`\`bash
# بررسی نسخه MySQL
mysql --version
# خروجی: mysql  Ver 8.4.8 for Linux on x86_64 (MySQL Community Server - GPL)

# اتصال به سرور MySQL
mysql -u root -p
# رمز عبور root را وارد کنید
\`\`\`

**خروجی مورد انتظار:**
\`\`\`
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 8
Server version: 8.4.8 MySQL Community Server - GPL

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

mysql>
\`\`\`

---

## معماری سرور MySQL (نمای کلی ساده)

\`\`\`
┌─────────────────────────────────────┐
│     برنامه شما (Node.js)            │
│                                     │
└──────────────┬──────────────────────┘
               │ کوئری‌های SQL
               ▼
┌─────────────────────────────────────┐
│         سرور MySQL                  │
│  ┌─────────────────────────────┐   │
│  │   پردازشگر کوئری            │   │  ← SQL را می‌فهمد
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   موتور ذخیره‌سازی (InnoDB) │   │  ← داده را ذخیره می‌کند
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │   فایل‌های داده روی دیسک    │   │  ← داده واقعی
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
\`\`\`

**چگونه کار می‌کند:**
1. برنامه شما کوئری SQL را به سرور MySQL می‌فرستد
2. MySQL کوئری را پردازش می‌کند
3. موتور ذخیره‌سازی داده را بازیابی/ذخیره می‌کند
4. نتایج به برنامه شما برگردانده می‌شود

---

## مفاهیم کلیدی MySQL

### 1. پایگاه داده (Database)
یک ظرف که جداول مرتبط را نگه می‌دارد. مثل یک پوشه برای داده‌های شما.

\`\`\`sql
-- ایجاد پایگاه داده
CREATE DATABASE my_app;

-- استفاده از پایگاه داده
USE my_app;

-- نمایش همه پایگاه‌های داده
SHOW DATABASES;
\`\`\`

### 2. جدول (Table)
داده سازماندهی شده در سطرها و ستون‌ها. مثل یک صفحه گسترده.

\`\`\`sql
-- ایجاد جدول
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 3. سطر (Row/Record)
یک ورودی منفرد در جدول. مثل یک خط در صفحه گسترده.

### 4. ستون (Column/Field)
یک دسته از داده. مثل عنوان ستون در صفحه گسترده.


---

## MySQL در مقابل پایگاه‌های داده دیگر

| ویژگی | MySQL | PostgreSQL | MongoDB |
|-------|-------|------------|---------|
| نوع | رابطه‌ای (SQL) | رابطه‌ای (SQL) | NoSQL (سندی) |
| بهترین برای | برنامه‌های وب، خواندن زیاد | کوئری‌های پیچیده، یکپارچگی داده | اسکیماهای انعطاف‌پذیر، JSON |
| سرعت | خواندن بسیار سریع | سریع، کوئری‌های پیچیده | نوشتن سریع |
| منحنی یادگیری | آسان | متوسط | آسان |
| موارد استفاده | وردپرس، تجارت الکترونیک | تحلیل، مالی | برنامه‌های بلادرنگ، IoT |

---

## موتورهای ذخیره‌سازی MySQL

MySQL از موتورهای ذخیره‌سازی مختلف پشتیبانی می‌کند. پیش‌فرض و محبوب‌ترین **InnoDB** است.

### InnoDB (پیش‌فرض) ⭐ توصیه می‌شود

\`\`\`sql
-- InnoDB پیش‌فرض است، اما می‌توانید صریحاً مشخص کنید
CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100)
) ENGINE=InnoDB;
\`\`\`

**ویژگی‌ها:**
- ✅ سازگار با ACID (تراکنش‌های قابل اعتماد)
- ✅ پشتیبانی از کلید خارجی
- ✅ بازیابی از کرش
- ✅ قفل سطح سطر (همزمانی بهتر)

**چه زمانی استفاده کنیم:** تقریباً همیشه! بهترین انتخاب برای اکثر برنامه‌ها است.

### MyISAM (قدیمی)

**ویژگی‌ها:**
- ❌ بدون کلید خارجی
- ❌ بدون تراکنش
- ✅ سریع برای داده فقط خواندنی
- ✅ جستجوی متن کامل

**چه زمانی استفاده کنیم:** به ندرت. فقط برای سناریوهای خاص خواندن زیاد.

---

## ابزارهای رایج MySQL

### 1. کلاینت خط فرمان MySQL
رابط ترمینال داخلی برای MySQL.

\`\`\`bash
mysql -u root -p
\`\`\`

### 2. MySQL Workbench
ابزار رسمی GUI برای MySQL (رایگان).
- طراحی بصری پایگاه داده
- ویرایشگر کوئری با برجسته‌سازی نحو
- مدیریت سرور

### 3. phpMyAdmin
ابزار مدیریت MySQL مبتنی بر وب.

### 4. DBeaver
ابزار جهانی پایگاه داده (از MySQL و بسیاری دیگر پشتیبانی می‌کند).

---

## دستورات پایه MySQL

### مدیریت سرور

\`\`\`bash
# شروع سرور MySQL (Linux)
sudo systemctl start mysql

# توقف سرور MySQL
sudo systemctl stop mysql

# راه‌اندازی مجدد سرور MySQL
sudo systemctl restart mysql

# بررسی وضعیت MySQL
sudo systemctl status mysql
\`\`\`

### عملیات پایگاه داده

\`\`\`sql
-- نمایش همه پایگاه‌های داده
SHOW DATABASES;

-- ایجاد پایگاه داده
CREATE DATABASE shop;

-- حذف پایگاه داده (مراقب باشید!)
DROP DATABASE shop;

-- انتخاب پایگاه داده برای استفاده
USE shop;

-- نمایش پایگاه داده فعلی
SELECT DATABASE();
\`\`\`

### مدیریت کاربر

\`\`\`sql
-- ایجاد کاربر جدید
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'secure_password';

-- اعطای مجوزها
GRANT ALL PRIVILEGES ON shop.* TO 'appuser'@'localhost';

-- اعمال تغییرات
FLUSH PRIVILEGES;

-- نمایش کاربر فعلی
SELECT USER();
\`\`\`

---

## اشتباهات رایج

### 1. فراموش کردن انتخاب پایگاه داده
❌ **اشتباه:**
\`\`\`sql
CREATE TABLE users (...);  -- خطا: پایگاه داده‌ای انتخاب نشده
\`\`\`

✅ **درست:**
\`\`\`sql
USE my_app;
CREATE TABLE users (...);
\`\`\`

### 2. استفاده از کاربر Root در برنامه‌ها
❌ **اشتباه:** اتصال برنامه با کاربر root
✅ **درست:** ایجاد کاربر اختصاصی با مجوزهای محدود

### 3. تنظیم نکردن رمز عبور قوی Root
❌ **اشتباه:** استفاده از "password" یا "123456"
✅ **درست:** استفاده از رمزهای عبور قوی و منحصر به فرد

### 4. فراموش کردن نقطه ویرگول در SQL
❌ **اشتباه:**
\`\`\`sql
SHOW DATABASES
-- MySQL منتظر ورودی بیشتر است...
\`\`\`

✅ **درست:**
\`\`\`sql
SHOW DATABASES;
\`\`\`

---

## فایل پیکربندی MySQL

تنظیمات MySQL در فایل‌های پیکربندی ذخیره می‌شود:

**Linux:** \`/etc/mysql/my.cnf\`
**Windows:** \`C:\\ProgramData\\MySQL\\MySQL Server 8.4\\my.ini\`
**macOS:** \`/usr/local/etc/my.cnf\`

**تنظیمات رایج:**
\`\`\`ini
[mysqld]
port = 3306                    # پورت پیش‌فرض MySQL
max_connections = 151          # حداکثر اتصالات همزمان
character-set-server = utf8mb4 # کدگذاری کاراکتر
default-storage-engine = InnoDB # موتور ذخیره‌سازی پیش‌فرض
\`\`\`

---

## پورت پیش‌فرض MySQL

MySQL به طور پیش‌فرض روی **پورت 3306** اجرا می‌شود.

\`\`\`javascript
// هنگام اتصال از Node.js
const connection = {
  host: 'localhost',
  port: 3306,        // پورت پیش‌فرض
  user: 'appuser',
  password: 'password',
  database: 'my_app'
};
\`\`\`

---

## مرجع سریع

| دستور | هدف |
|-------|------|
| \`mysql -u root -p\` | اتصال به MySQL |
| \`SHOW DATABASES;\` | لیست همه پایگاه‌های داده |
| \`CREATE DATABASE name;\` | ایجاد پایگاه داده |
| \`USE database;\` | انتخاب پایگاه داده |
| \`SHOW TABLES;\` | لیست جداول در پایگاه داده فعلی |
| \`EXIT;\` یا \`QUIT;\` | قطع اتصال از MySQL |

---

## مراحل بعدی

حالا که مبانی MySQL را فهمیدید، آماده هستید برای:
1. یادگیری درباره MariaDB (پسرعموی MySQL)
2. اتصال به MySQL از Node.js
3. نوشتن کوئری‌های SQL برای مدیریت داده
4. ساخت برنامه‌های مبتنی بر پایگاه داده

> **به یاد داشته باشید:** MySQL 8.4.8 LTS دوست شما برای برنامه‌های تولیدی است، در حالی که 9.2.0 Innovation برای کاوش ویژگی‌های جدید عالی است! 🚀
`,

  visualizationId: null,
  exerciseId: 'mysql-basics-exercises',
};

export default mysqlServerBasics;
