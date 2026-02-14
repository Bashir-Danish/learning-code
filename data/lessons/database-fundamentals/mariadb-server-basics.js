export const mariadbServerBasics = {
  id: 'mariadb-server-basics',
  title: 'MariaDB Server Basics',
  titleFa: 'مبانی سرور MariaDB',
  difficulty: 'easy',
  estimatedTime: '35 min',
  
  content: `
# MariaDB Server Basics - MySQL's Powerful Fork

## What is MariaDB?

MariaDB is a **community-developed fork of MySQL** that's fully compatible with MySQL but offers additional features and improvements. Think of it as MySQL's enhanced cousin - same family, but with extra capabilities!

**The Story:** In 2009, when Oracle acquired MySQL, the original MySQL creator (Michael "Monty" Widenius) created MariaDB to ensure a truly open-source database would always exist. He named it after his younger daughter, Maria (MySQL was named after his other daughter, My!).

**Why MariaDB?**
- ✅ 100% open-source (GPL license)
- ✅ Drop-in replacement for MySQL
- ✅ More storage engines and features
- ✅ Better performance in many cases
- ✅ Active community development
- ✅ Used by Wikipedia, Google, RedHat

---

## MariaDB Version Releases

### MariaDB 11.8.2 Stable ⭐ Recommended for Production

**What is Stable Release?**
Stable releases are thoroughly tested, production-ready versions with long-term support.

**Key Features:**
- 🛡️ **Production Ready**: Battle-tested and reliable
- 📅 **Long Support**: Maintained for years
- 🔒 **Stable**: Minimal breaking changes
- 🏢 **Enterprise Use**: Perfect for business applications

**When to use MariaDB 11.8.2:**
- Production applications
- Business-critical systems
- Long-term projects
- When stability is priority


### MariaDB 12.0.1 RC (Release Candidate) 🚀 Preview of Future

**What is Release Candidate?**
RC versions are feature-complete previews of upcoming stable releases, ready for testing but not yet recommended for production.

**Key Features:**
- ⚡ **New Features**: Latest capabilities and improvements
- 🔬 **Testing Phase**: Help shape the final release
- 📦 **Near Stable**: Most bugs fixed, final testing
- 🎯 **Preview**: See what's coming next

**When to use MariaDB 12.0.1 RC:**
- Testing and development
- Evaluating new features
- Non-critical projects
- Preparing for future upgrades

**Quick Comparison:**

| Feature | MariaDB 11.8.2 Stable | MariaDB 12.0.1 RC |
|---------|----------------------|-------------------|
| Stability | ⭐⭐⭐⭐⭐ Very Stable | ⭐⭐⭐⭐ Nearly Stable |
| Production Ready | Yes | Not Yet |
| New Features | Proven features | Latest features |
| Best For | Production | Testing/Preview |
| Support | Long-term | Until stable release |

> **Recommendation:** Use **MariaDB 11.8.2 Stable** for production, try 12.0.1 RC for testing new features!

---

## MariaDB vs MySQL: What's the Difference?

### Compatibility
**Good News:** MariaDB is a **drop-in replacement** for MySQL!

\`\`\`bash
# Your MySQL code works in MariaDB without changes!
# Same SQL syntax, same client libraries, same tools
\`\`\`

### Key Differences

| Feature | MySQL | MariaDB |
|---------|-------|---------|
| License | GPL (Oracle owned) | GPL (Community owned) |
| Development | Oracle-led | Community-led |
| Storage Engines | InnoDB, MyISAM | InnoDB, MyISAM, Aria, ColumnStore, more |
| JSON Support | Native JSON type | JSON as LONGTEXT (compatible) |
| Thread Pool | Enterprise only | Free in all versions |
| Performance | Excellent | Often faster |
| New Features | Slower release | Faster innovation |


### MariaDB Exclusive Features

**1. More Storage Engines**
\`\`\`sql
-- Aria: Crash-safe MyISAM replacement
CREATE TABLE logs (
  id INT PRIMARY KEY,
  message TEXT
) ENGINE=Aria;

-- ColumnStore: For analytics and big data
CREATE TABLE analytics (
  date DATE,
  revenue DECIMAL(10,2)
) ENGINE=ColumnStore;
\`\`\`

**2. Thread Pool (Free)**
Better connection handling for high-traffic applications - free in MariaDB, paid in MySQL Enterprise.

**3. Virtual Columns**
\`\`\`sql
-- Computed columns stored automatically
CREATE TABLE products (
  price DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2) AS (price + tax) PERSISTENT
);
\`\`\`

**4. Better Replication**
More flexible and faster replication options.

---

## Installing MariaDB Server

### Windows Installation

\`\`\`bash
# Download MariaDB installer from mariadb.org
# Choose MSI installer for Windows
# Follow installation wizard
\`\`\`

**Installation Steps:**
1. Download from [mariadb.org/download](https://mariadb.org/download/)
2. Run the MSI installer
3. Choose "Server" or "Full" installation
4. Set root password (remember this!)
5. Configure as Windows Service
6. Complete installation

### macOS Installation

\`\`\`bash
# Using Homebrew (recommended)
brew install mariadb

# Start MariaDB server
brew services start mariadb

# Secure installation
mariadb-secure-installation
\`\`\`

### Linux (Ubuntu/Debian) Installation

\`\`\`bash
# Update package index
sudo apt update

# Install MariaDB Server
sudo apt install mariadb-server

# Start MariaDB service
sudo systemctl start mariadb

# Enable auto-start on boot
sudo systemctl enable mariadb

# Secure installation
sudo mariadb-secure-installation
\`\`\`


---

## Verifying Your Installation

After installation, verify MariaDB is running:

\`\`\`bash
# Check MariaDB version
mariadb --version
# Output: mariadb  Ver 11.8.2-MariaDB for Linux on x86_64

# Or using mysql command (compatible)
mysql --version

# Connect to MariaDB server
mariadb -u root -p
# Or: mysql -u root -p (both work!)
\`\`\`

**Expected output:**
\`\`\`
Welcome to the MariaDB monitor.  Commands end with ; or \\g.
Your MariaDB connection id is 3
Server version: 11.8.2-MariaDB MariaDB Server

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

MariaDB [(none)]>
\`\`\`

---

## MySQL to MariaDB Migration

**Great News:** Migrating from MySQL to MariaDB is usually seamless!

### Migration Steps

\`\`\`bash
# 1. Backup your MySQL database
mysqldump -u root -p --all-databases > mysql_backup.sql

# 2. Install MariaDB (it can coexist with MySQL on different ports)

# 3. Import your data into MariaDB
mariadb -u root -p < mysql_backup.sql

# 4. Test your application
# Your code should work without changes!
\`\`\`

### Compatibility Notes

✅ **Works out of the box:**
- All standard SQL queries
- MySQL client libraries (mysql2 in Node.js works with MariaDB!)
- Most MySQL tools (phpMyAdmin, MySQL Workbench)

⚠️ **Minor differences:**
- Some MySQL 8.0+ features not in MariaDB yet
- JSON handling slightly different (but compatible)
- Some system variables have different names

---

## MariaDB Command Line

MariaDB provides both \`mariadb\` and \`mysql\` commands:

\`\`\`bash
# Both commands work identically
mariadb -u root -p
mysql -u root -p

# Connect to specific database
mariadb -u root -p my_database

# Execute SQL from command line
mariadb -u root -p -e "SHOW DATABASES;"
\`\`\`


---

## Basic MariaDB Commands

### Server Management

\`\`\`bash
# Start MariaDB server (Linux)
sudo systemctl start mariadb

# Stop MariaDB server
sudo systemctl stop mariadb

# Restart MariaDB server
sudo systemctl restart mariadb

# Check MariaDB status
sudo systemctl status mariadb
\`\`\`

### Database Operations

\`\`\`sql
-- Show all databases
SHOW DATABASES;

-- Create database
CREATE DATABASE my_shop;

-- Delete database (careful!)
DROP DATABASE my_shop;

-- Select database to use
USE my_shop;

-- Show current database
SELECT DATABASE();

-- Show MariaDB version
SELECT VERSION();
\`\`\`

### User Management

\`\`\`sql
-- Create new user
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON my_shop.* TO 'appuser'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Show current user
SELECT USER();

-- Show all users
SELECT User, Host FROM mysql.user;
\`\`\`

---

## MariaDB Storage Engines

MariaDB offers more storage engines than MySQL:

### InnoDB (Default) ⭐

\`\`\`sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  total DECIMAL(10,2)
) ENGINE=InnoDB;
\`\`\`

**Best for:** General purpose, transactions, foreign keys

### Aria (MariaDB Exclusive)

\`\`\`sql
CREATE TABLE logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message TEXT
) ENGINE=Aria;
\`\`\`

**Best for:** Crash-safe alternative to MyISAM, system tables


### ColumnStore (MariaDB Exclusive)

\`\`\`sql
CREATE TABLE analytics (
  date DATE,
  user_id INT,
  revenue DECIMAL(10,2)
) ENGINE=ColumnStore;
\`\`\`

**Best for:** Analytics, data warehousing, big data

### MyRocks (MariaDB Exclusive)

\`\`\`sql
CREATE TABLE large_dataset (
  id BIGINT PRIMARY KEY,
  data TEXT
) ENGINE=MyRocks;
\`\`\`

**Best for:** Write-heavy workloads, space efficiency

---

## MariaDB Tools

### 1. MariaDB Command Line Client
Built-in terminal interface.

\`\`\`bash
mariadb -u root -p
\`\`\`

### 2. MySQL Workbench
Works with MariaDB! (despite the name)

### 3. phpMyAdmin
Fully compatible with MariaDB.

### 4. DBeaver
Universal database tool with excellent MariaDB support.

### 5. HeidiSQL
Popular Windows GUI for MariaDB.

---

## Using MariaDB with Node.js

**Great News:** The same \`mysql2\` package works with MariaDB!

\`\`\`javascript
// No changes needed! mysql2 works with MariaDB
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,           // Default MariaDB port (same as MySQL)
  user: 'appuser',
  password: 'password',
  database: 'my_shop'
});

// All your MySQL code works with MariaDB!
const [rows] = await connection.execute('SELECT * FROM products');
console.log(rows);
\`\`\`

---

## Common Mistakes

### 1. Confusing MariaDB with MySQL
❌ **Wrong:** Thinking they're completely different
✅ **Correct:** They're compatible! Code works in both

### 2. Using Wrong Command Name
❌ **Wrong:** Only using \`mysql\` command
✅ **Correct:** Both \`mariadb\` and \`mysql\` commands work


### 3. Not Leveraging MariaDB-Specific Features
❌ **Wrong:** Using it exactly like MySQL
✅ **Correct:** Explore Aria, ColumnStore, virtual columns, etc.

### 4. Forgetting Compatibility Limits
❌ **Wrong:** Assuming 100% MySQL 8.0+ feature parity
✅ **Correct:** Check MariaDB docs for specific MySQL 8.0+ features

---

## MariaDB Configuration File

MariaDB settings are stored in configuration files:

**Linux:** \`/etc/mysql/mariadb.conf.d/50-server.cnf\`
**Windows:** \`C:\\Program Files\\MariaDB\\data\\my.ini\`
**macOS:** \`/usr/local/etc/my.cnf\`

**Common settings:**
\`\`\`ini
[mariadb]
port = 3306
max_connections = 151
character-set-server = utf8mb4
default-storage-engine = InnoDB

# MariaDB-specific optimizations
thread_pool_size = 4
\`\`\`

---

## MariaDB Default Port

MariaDB uses **port 3306** by default (same as MySQL).

\`\`\`javascript
// Connection config (same as MySQL)
const config = {
  host: 'localhost',
  port: 3306,        // Default port
  user: 'appuser',
  password: 'password',
  database: 'my_shop'
};
\`\`\`

---

## Should You Choose MariaDB or MySQL?

### Choose MariaDB if:
- ✅ You want truly open-source software
- ✅ You need advanced storage engines (Aria, ColumnStore)
- ✅ You want better performance out of the box
- ✅ You prefer community-driven development
- ✅ You need thread pool without paying

### Choose MySQL if:
- ✅ You need specific MySQL 8.0+ features
- ✅ Your hosting only supports MySQL
- ✅ You're already using MySQL and it works fine
- ✅ You prefer Oracle's enterprise support

### The Truth?
**Both are excellent!** For most applications, either works great. MariaDB offers more features and is more open, while MySQL has Oracle backing.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| \`mariadb -u root -p\` | Connect to MariaDB |
| \`SHOW DATABASES;\` | List all databases |
| \`CREATE DATABASE name;\` | Create database |
| \`USE database;\` | Select database |
| \`SHOW TABLES;\` | List tables |
| \`SELECT VERSION();\` | Show MariaDB version |
| \`EXIT;\` or \`QUIT;\` | Disconnect |


---

## MariaDB vs MySQL: Version Numbering

**Important Note:** MariaDB and MySQL version numbers diverged after 5.5.

| MySQL Version | Equivalent MariaDB |
|---------------|-------------------|
| MySQL 5.5 | MariaDB 5.5 |
| MySQL 5.6 | MariaDB 10.0 |
| MySQL 5.7 | MariaDB 10.2 |
| MySQL 8.0 | MariaDB 10.5+ |
| MySQL 8.4 | MariaDB 11.x |
| MySQL 9.x | MariaDB 11.x - 12.x |

> **Note:** Higher version number doesn't mean better! MariaDB 11.8 is comparable to MySQL 8.4 in features.

---

## Next Steps

Now that you understand MariaDB basics, you're ready to:
1. Connect to MariaDB from Node.js (same as MySQL!)
2. Write SQL queries (works identically)
3. Explore MariaDB-specific features (Aria, ColumnStore)
4. Build database-driven applications

> **Remember:** MariaDB is MySQL-compatible, so everything you learn about MySQL works in MariaDB too! 🚀
`,

  contentFa: `
# مبانی سرور MariaDB - فورک قدرتمند MySQL

## MariaDB چیست؟

MariaDB یک **فورک توسعه‌یافته توسط جامعه از MySQL** است که کاملاً با MySQL سازگار است اما ویژگی‌ها و بهبودهای اضافی ارائه می‌دهد. آن را مانند پسرعموی پیشرفته MySQL در نظر بگیرید - همان خانواده، اما با قابلیت‌های اضافی!

**داستان:** در سال ۲۰۰۹، زمانی که اوراکل MySQL را خریداری کرد، سازنده اصلی MySQL (مایکل "مونتی" ویدنیوس) MariaDB را ایجاد کرد تا اطمینان حاصل کند که یک پایگاه داده واقعاً متن‌باز همیشه وجود خواهد داشت. او آن را به نام دختر کوچکترش، ماریا نامگذاری کرد (MySQL به نام دختر دیگرش، My نامگذاری شده بود!).

**چرا MariaDB؟**
- ✅ ۱۰۰٪ متن‌باز (مجوز GPL)
- ✅ جایگزین مستقیم برای MySQL
- ✅ موتورهای ذخیره‌سازی و ویژگی‌های بیشتر
- ✅ عملکرد بهتر در بسیاری موارد
- ✅ توسعه فعال جامعه
- ✅ استفاده توسط ویکی‌پدیا، گوگل، RedHat

---

## نسخه‌های MariaDB

### MariaDB 11.8.2 پایدار ⭐ توصیه شده برای تولید

**نسخه پایدار چیست؟**
نسخه‌های پایدار به طور کامل تست شده، آماده تولید و با پشتیبانی بلندمدت هستند.

**ویژگی‌های کلیدی:**
- 🛡️ **آماده تولید**: آزمایش شده و قابل اعتماد
- 📅 **پشتیبانی طولانی**: نگهداری برای سال‌ها
- 🔒 **پایدار**: تغییرات شکننده حداقلی
- 🏢 **استفاده سازمانی**: عالی برای برنامه‌های تجاری

**چه زمانی از MariaDB 11.8.2 استفاده کنیم:**
- برنامه‌های تولیدی
- سیستم‌های حیاتی کسب‌وکار
- پروژه‌های بلندمدت
- زمانی که ثبات اولویت است


### MariaDB 12.0.1 RC (نامزد انتشار) 🚀 پیش‌نمایش آینده

**نامزد انتشار چیست؟**
نسخه‌های RC پیش‌نمایش‌های کامل از نسخه‌های پایدار آینده هستند، آماده برای تست اما هنوز برای تولید توصیه نمی‌شوند.

**ویژگی‌های کلیدی:**
- ⚡ **ویژگی‌های جدید**: آخرین قابلیت‌ها و بهبودها
- 🔬 **فاز تست**: کمک به شکل‌دهی نسخه نهایی
- 📦 **نزدیک به پایدار**: اکثر باگ‌ها رفع شده، تست نهایی
- 🎯 **پیش‌نمایش**: ببینید چه چیزی در راه است

**چه زمانی از MariaDB 12.0.1 RC استفاده کنیم:**
- تست و توسعه
- ارزیابی ویژگی‌های جدید
- پروژه‌های غیرحیاتی
- آماده‌سازی برای ارتقاهای آینده

**مقایسه سریع:**

| ویژگی | MariaDB 11.8.2 پایدار | MariaDB 12.0.1 RC |
|-------|----------------------|-------------------|
| ثبات | ⭐⭐⭐⭐⭐ بسیار پایدار | ⭐⭐⭐⭐ تقریباً پایدار |
| آماده تولید | بله | هنوز نه |
| ویژگی‌های جدید | ویژگی‌های اثبات شده | آخرین ویژگی‌ها |
| بهترین برای | تولید | تست/پیش‌نمایش |
| پشتیبانی | بلندمدت | تا انتشار پایدار |

> **توصیه:** از **MariaDB 11.8.2 پایدار** برای تولید استفاده کنید، 12.0.1 RC را برای تست ویژگی‌های جدید امتحان کنید!

---

## MariaDB در مقابل MySQL: تفاوت چیست؟

### سازگاری
**خبر خوب:** MariaDB یک **جایگزین مستقیم** برای MySQL است!

\`\`\`bash
# کد MySQL شما در MariaDB بدون تغییر کار می‌کند!
# همان نحو SQL، همان کتابخانه‌های کلاینت، همان ابزارها
\`\`\`

### تفاوت‌های کلیدی

| ویژگی | MySQL | MariaDB |
|-------|-------|---------|
| مجوز | GPL (متعلق به اوراکل) | GPL (متعلق به جامعه) |
| توسعه | رهبری اوراکل | رهبری جامعه |
| موتورهای ذخیره‌سازی | InnoDB، MyISAM | InnoDB، MyISAM، Aria، ColumnStore، بیشتر |
| پشتیبانی JSON | نوع JSON بومی | JSON به عنوان LONGTEXT (سازگار) |
| Thread Pool | فقط Enterprise | رایگان در همه نسخه‌ها |
| عملکرد | عالی | اغلب سریع‌تر |
| ویژگی‌های جدید | انتشار کندتر | نوآوری سریع‌تر |

### ویژگی‌های انحصاری MariaDB

**1. موتورهای ذخیره‌سازی بیشتر**
\`\`\`sql
-- Aria: جایگزین ایمن در برابر کرش برای MyISAM
CREATE TABLE logs (
  id INT PRIMARY KEY,
  message TEXT
) ENGINE=Aria;

-- ColumnStore: برای تحلیل و داده بزرگ
CREATE TABLE analytics (
  date DATE,
  revenue DECIMAL(10,2)
) ENGINE=ColumnStore;
\`\`\`

**2. Thread Pool (رایگان)**
مدیریت بهتر اتصال برای برنامه‌های با ترافیک بالا - رایگان در MariaDB، پولی در MySQL Enterprise.

**3. ستون‌های مجازی**
\`\`\`sql
-- ستون‌های محاسبه شده به طور خودکار ذخیره می‌شوند
CREATE TABLE products (
  price DECIMAL(10,2),
  tax DECIMAL(10,2),
  total DECIMAL(10,2) AS (price + tax) PERSISTENT
);
\`\`\`

**4. تکرار بهتر**
گزینه‌های تکرار انعطاف‌پذیرتر و سریع‌تر.

---

## نصب سرور MariaDB

### نصب در Windows

\`\`\`bash
# نصب‌کننده MariaDB را از mariadb.org دانلود کنید
# نصب‌کننده MSI برای Windows را انتخاب کنید
# مراحل نصب را دنبال کنید
\`\`\`

**مراحل نصب:**
1. از [mariadb.org/download](https://mariadb.org/download/) دانلود کنید
2. نصب‌کننده MSI را اجرا کنید
3. نصب "Server" یا "Full" را انتخاب کنید
4. رمز عبور root را تنظیم کنید (این را به خاطر بسپارید!)
5. به عنوان سرویس Windows پیکربندی کنید
6. نصب را کامل کنید

### نصب در macOS

\`\`\`bash
# استفاده از Homebrew (توصیه می‌شود)
brew install mariadb

# شروع سرور MariaDB
brew services start mariadb

# نصب امن
mariadb-secure-installation
\`\`\`

### نصب در Linux (Ubuntu/Debian)

\`\`\`bash
# به‌روزرسانی فهرست بسته‌ها
sudo apt update

# نصب سرور MariaDB
sudo apt install mariadb-server

# شروع سرویس MariaDB
sudo systemctl start mariadb

# فعال‌سازی شروع خودکار در بوت
sudo systemctl enable mariadb

# نصب امن
sudo mariadb-secure-installation
\`\`\`

---

## تأیید نصب

بعد از نصب، تأیید کنید که MariaDB در حال اجرا است:

\`\`\`bash
# بررسی نسخه MariaDB
mariadb --version
# خروجی: mariadb  Ver 11.8.2-MariaDB for Linux on x86_64

# یا استفاده از دستور mysql (سازگار)
mysql --version

# اتصال به سرور MariaDB
mariadb -u root -p
# یا: mysql -u root -p (هر دو کار می‌کنند!)
\`\`\`

**خروجی مورد انتظار:**
\`\`\`
Welcome to the MariaDB monitor.  Commands end with ; or \\g.
Your MariaDB connection id is 3
Server version: 11.8.2-MariaDB MariaDB Server

Type 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.

MariaDB [(none)]>
\`\`\`

---

## مهاجرت از MySQL به MariaDB

**خبر عالی:** مهاجرت از MySQL به MariaDB معمولاً یکپارچه است!

### مراحل مهاجرت

\`\`\`bash
# 1. پشتیبان‌گیری از پایگاه داده MySQL
mysqldump -u root -p --all-databases > mysql_backup.sql

# 2. نصب MariaDB (می‌تواند با MySQL روی پورت‌های مختلف همزیستی کند)

# 3. وارد کردن داده‌ها به MariaDB
mariadb -u root -p < mysql_backup.sql

# 4. تست برنامه
# کد شما باید بدون تغییر کار کند!
\`\`\`

### نکات سازگاری

✅ **بدون مشکل کار می‌کند:**
- همه کوئری‌های SQL استاندارد
- کتابخانه‌های کلاینت MySQL (mysql2 در Node.js با MariaDB کار می‌کند!)
- اکثر ابزارهای MySQL (phpMyAdmin، MySQL Workbench)

⚠️ **تفاوت‌های جزئی:**
- برخی ویژگی‌های MySQL 8.0+ هنوز در MariaDB نیستند
- مدیریت JSON کمی متفاوت (اما سازگار)
- برخی متغیرهای سیستم نام‌های متفاوتی دارند

---

## خط فرمان MariaDB

MariaDB هر دو دستور \`mariadb\` و \`mysql\` را ارائه می‌دهد:

\`\`\`bash
# هر دو دستور یکسان کار می‌کنند
mariadb -u root -p
mysql -u root -p

# اتصال به پایگاه داده خاص
mariadb -u root -p my_database

# اجرای SQL از خط فرمان
mariadb -u root -p -e "SHOW DATABASES;"
\`\`\`

---

## دستورات پایه MariaDB

### مدیریت سرور

\`\`\`bash
# شروع سرور MariaDB (Linux)
sudo systemctl start mariadb

# توقف سرور MariaDB
sudo systemctl stop mariadb

# راه‌اندازی مجدد سرور MariaDB
sudo systemctl restart mariadb

# بررسی وضعیت MariaDB
sudo systemctl status mariadb
\`\`\`

### عملیات پایگاه داده

\`\`\`sql
-- نمایش همه پایگاه‌های داده
SHOW DATABASES;

-- ایجاد پایگاه داده
CREATE DATABASE my_shop;

-- حذف پایگاه داده (مراقب باشید!)
DROP DATABASE my_shop;

-- انتخاب پایگاه داده برای استفاده
USE my_shop;

-- نمایش پایگاه داده فعلی
SELECT DATABASE();

-- نمایش نسخه MariaDB
SELECT VERSION();
\`\`\`

### مدیریت کاربر

\`\`\`sql
-- ایجاد کاربر جدید
CREATE USER 'appuser'@'localhost' IDENTIFIED BY 'secure_password';

-- اعطای مجوزها
GRANT ALL PRIVILEGES ON my_shop.* TO 'appuser'@'localhost';

-- اعمال تغییرات
FLUSH PRIVILEGES;

-- نمایش کاربر فعلی
SELECT USER();

-- نمایش همه کاربران
SELECT User, Host FROM mysql.user;
\`\`\`

---

## موتورهای ذخیره‌سازی MariaDB

MariaDB موتورهای ذخیره‌سازی بیشتری نسبت به MySQL ارائه می‌دهد:

### InnoDB (پیش‌فرض) ⭐

\`\`\`sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  total DECIMAL(10,2)
) ENGINE=InnoDB;
\`\`\`

**بهترین برای:** همه منظوره، تراکنش‌ها، کلیدهای خارجی

### Aria (انحصاری MariaDB)

\`\`\`sql
CREATE TABLE logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  message TEXT
) ENGINE=Aria;
\`\`\`

**بهترین برای:** جایگزین ایمن در برابر کرش برای MyISAM، جداول سیستم

### ColumnStore (انحصاری MariaDB)

\`\`\`sql
CREATE TABLE analytics (
  date DATE,
  user_id INT,
  revenue DECIMAL(10,2)
) ENGINE=ColumnStore;
\`\`\`

**بهترین برای:** تحلیل، انبار داده، داده بزرگ

### MyRocks (انحصاری MariaDB)

\`\`\`sql
CREATE TABLE large_dataset (
  id BIGINT PRIMARY KEY,
  data TEXT
) ENGINE=MyRocks;
\`\`\`

**بهترین برای:** بارهای کاری نوشتن زیاد، کارایی فضا

---

## ابزارهای MariaDB

### 1. کلاینت خط فرمان MariaDB
رابط ترمینال داخلی.

\`\`\`bash
mariadb -u root -p
\`\`\`

### 2. MySQL Workbench
با MariaDB کار می‌کند! (علی‌رغم نام)

### 3. phpMyAdmin
کاملاً با MariaDB سازگار.

### 4. DBeaver
ابزار جهانی پایگاه داده با پشتیبانی عالی از MariaDB.

### 5. HeidiSQL
GUI محبوب ویندوز برای MariaDB.

---

## استفاده از MariaDB با Node.js

**خبر عالی:** همان بسته \`mysql2\` با MariaDB کار می‌کند!

\`\`\`javascript
// نیازی به تغییر نیست! mysql2 با MariaDB کار می‌کند
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  port: 3306,           // پورت پیش‌فرض MariaDB (همان MySQL)
  user: 'appuser',
  password: 'password',
  database: 'my_shop'
});

// همه کد MySQL شما با MariaDB کار می‌کند!
const [rows] = await connection.execute('SELECT * FROM products');
console.log(rows);
\`\`\`

---

## اشتباهات رایج

### 1. اشتباه گرفتن MariaDB با MySQL
❌ **اشتباه:** فکر کنید کاملاً متفاوت هستند
✅ **درست:** آن‌ها سازگار هستند! کد در هر دو کار می‌کند

### 2. استفاده از نام دستور اشتباه
❌ **اشتباه:** فقط از دستور \`mysql\` استفاده کنید
✅ **درست:** هر دو دستور \`mariadb\` و \`mysql\` کار می‌کنند

### 3. استفاده نکردن از ویژگی‌های خاص MariaDB
❌ **اشتباه:** استفاده دقیقاً مثل MySQL
✅ **درست:** Aria، ColumnStore، ستون‌های مجازی و غیره را کاوش کنید

### 4. فراموش کردن محدودیت‌های سازگاری
❌ **اشتباه:** فرض کنید ۱۰۰٪ برابری ویژگی MySQL 8.0+
✅ **درست:** اسناد MariaDB را برای ویژگی‌های خاص MySQL 8.0+ بررسی کنید

---

## فایل پیکربندی MariaDB

تنظیمات MariaDB در فایل‌های پیکربندی ذخیره می‌شود:

**Linux:** \`/etc/mysql/mariadb.conf.d/50-server.cnf\`
**Windows:** \`C:\\Program Files\\MariaDB\\data\\my.ini\`
**macOS:** \`/usr/local/etc/my.cnf\`

**تنظیمات رایج:**
\`\`\`ini
[mariadb]
port = 3306
max_connections = 151
character-set-server = utf8mb4
default-storage-engine = InnoDB

# بهینه‌سازی‌های خاص MariaDB
thread_pool_size = 4
\`\`\`

---

## پورت پیش‌فرض MariaDB

MariaDB به طور پیش‌فرض از **پورت 3306** استفاده می‌کند (همان MySQL).

\`\`\`javascript
// پیکربندی اتصال (همان MySQL)
const config = {
  host: 'localhost',
  port: 3306,        // پورت پیش‌فرض
  user: 'appuser',
  password: 'password',
  database: 'my_shop'
};
\`\`\`

---

## باید MariaDB یا MySQL را انتخاب کنید؟

### MariaDB را انتخاب کنید اگر:
- ✅ نرم‌افزار واقعاً متن‌باز می‌خواهید
- ✅ به موتورهای ذخیره‌سازی پیشرفته نیاز دارید (Aria، ColumnStore)
- ✅ عملکرد بهتر از جعبه می‌خواهید
- ✅ توسعه مبتنی بر جامعه را ترجیح می‌دهید
- ✅ به thread pool بدون پرداخت نیاز دارید

### MySQL را انتخاب کنید اگر:
- ✅ به ویژگی‌های خاص MySQL 8.0+ نیاز دارید
- ✅ هاستینگ شما فقط از MySQL پشتیبانی می‌کند
- ✅ از قبل از MySQL استفاده می‌کنید و خوب کار می‌کند
- ✅ پشتیبانی سازمانی اوراکل را ترجیح می‌دهید

### حقیقت؟
**هر دو عالی هستند!** برای اکثر برنامه‌ها، هر کدام عالی کار می‌کند. MariaDB ویژگی‌های بیشتر و بازتر ارائه می‌دهد، در حالی که MySQL پشتیبانی اوراکل را دارد.

---

## مرجع سریع

| دستور | هدف |
|-------|------|
| \`mariadb -u root -p\` | اتصال به MariaDB |
| \`SHOW DATABASES;\` | لیست همه پایگاه‌های داده |
| \`CREATE DATABASE name;\` | ایجاد پایگاه داده |
| \`USE database;\` | انتخاب پایگاه داده |
| \`SHOW TABLES;\` | لیست جداول |
| \`SELECT VERSION();\` | نمایش نسخه MariaDB |
| \`EXIT;\` یا \`QUIT;\` | قطع اتصال |

---

## MariaDB در مقابل MySQL: شماره‌گذاری نسخه

**نکته مهم:** شماره نسخه‌های MariaDB و MySQL بعد از 5.5 از هم جدا شدند.

| نسخه MySQL | معادل MariaDB |
|-----------|---------------|
| MySQL 5.5 | MariaDB 5.5 |
| MySQL 5.6 | MariaDB 10.0 |
| MySQL 5.7 | MariaDB 10.2 |
| MySQL 8.0 | MariaDB 10.5+ |
| MySQL 8.4 | MariaDB 11.x |
| MySQL 9.x | MariaDB 11.x - 12.x |

> **نکته:** شماره نسخه بالاتر به معنای بهتر نیست! MariaDB 11.8 از نظر ویژگی‌ها با MySQL 8.4 قابل مقایسه است.

---

## مراحل بعدی

حالا که مبانی MariaDB را فهمیدید، آماده هستید برای:
1. اتصال به MariaDB از Node.js (همان MySQL!)
2. نوشتن کوئری‌های SQL (یکسان کار می‌کند)
3. کاوش ویژگی‌های خاص MariaDB (Aria، ColumnStore)
4. ساخت برنامه‌های مبتنی بر پایگاه داده

> **به یاد داشته باشید:** MariaDB با MySQL سازگار است، بنابراین هر چیزی که درباره MySQL یاد می‌گیرید در MariaDB هم کار می‌کند! 🚀
`,

  visualizationId: null,
  exerciseId: 'mysql-basics-exercises',
};

export default mariadbServerBasics;
