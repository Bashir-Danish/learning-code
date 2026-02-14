export const phpIntroSetupLesson = {
  id: 'php-intro-setup',
  title: 'PHP Today + Setup (8.3/8.4)',
  titleFa: 'PHP امروز + نصب و راه‌اندازی (۸.۳/۸.۴)',
  difficulty: 'easy',
  estimatedTime: '45 min',

  content: `
# PHP Today + Setup (8.3/8.4)

## What is PHP (in 2026)
PHP is a **server-side** language mostly used for:
- Building web applications (traditional server-rendered pages)
- Building APIs (REST, JSON)
- Building CLI scripts (automation, cron jobs)

Modern PHP (8.x) is **fast**, has a much better **type system**, and supports clean **OOP**.

---

## Where PHP runs

### 1) CLI (Command Line)
Great for learning and scripts.

### 2) Web server
Common production setup:
- Nginx/Apache
- PHP-FPM (process manager)

### 3) Built-in dev server
Perfect for local testing (not for production).

---

## Install on Windows (recommended options)

### Option A: Laragon (beginner friendly)
- Comes with PHP + Apache/Nginx + MySQL tools
- Easy version switching

### Option B: XAMPP
- Simple bundle (Apache + PHP + MySQL)

### Option C: Official PHP zip (most “pure”)
1. Download PHP (zip) for Windows
2. Extract to something like: \`C:\\php\\\`
3. Add \`C:\\php\\\` to **PATH**
4. Restart terminal

Verify:
\`\`\`bash
php -v
php -m
php --ini
\`\`\`

---

## Your first script
Create \`hello.php\`:

\`\`\`php
<?php

declare(strict_types=1);

echo "Hello from PHP!\n";
\`\`\`

Run:
\`\`\`bash
php hello.php
\`\`\`

---

## Built-in web server (local)
Make a folder (example: \`php-playground\`) and add an \`index.php\`:

\`\`\`php
<?php

declare(strict_types=1);

echo "<h1>Hello Web</h1>";
\`\`\`

Start server:
\`\`\`bash
php -S localhost:8000
\`\`\`

Open:
- http://localhost:8000

---

## Understanding the request lifecycle (simple)
When a request hits your PHP app:
1. Web server receives request
2. PHP executes your script
3. Script prints output (HTML/JSON)
4. Response is sent back

---

## PHP configuration: \`php.ini\`
Find it with:
\`\`\`bash
php --ini
\`\`\`

Useful settings (names you should recognize):
- \`display_errors\` (dev only)
- \`error_reporting\`
- \`memory_limit\`
- \`upload_max_filesize\` and \`post_max_size\`
- \`date.timezone\`

---

## PHP 8.3 vs PHP 8.4 (how we’ll learn)
- Use **PHP 8.3** as your stable baseline.
- Learn **PHP 8.4** as incremental upgrades (we have a dedicated “What’s new in 8.4” lesson).

---

## Common setup problems (and fixes)

### 1) “php is not recognized…”
- PATH is not set (or terminal not restarted)

### 2) Wrong PHP version
- You have multiple PHP installs in PATH
- Run \`where php\` (Windows) to see which one is used

### 3) Extensions missing (PDO, mbstring)
- Check \`php -m\`
- Enable extension in \`php.ini\`

---

## Mini checklist
- \`php -v\` works
- You can run \`php hello.php\`
- You can start \`php -S localhost:8000\` and open browser
` ,

  contentFa: `
# PHP امروز + نصب و راه‌اندازی (۸.۳/۸.۴)

## PHP چیست؟ (در سال‌های جدید)
PHP یک زبان **سمت سرور** است که بیشتر برای این کارها استفاده می‌شود:
- ساخت وب‌اپلیکیشن (صفحات server-rendered)
- ساخت API (JSON/REST)
- ساخت اسکریپت‌های CLI (اتوماسیون و کارهای زمان‌بندی‌شده)

PHP مدرن (۸.x) **سریع‌تر** شده، تایپ سیستم بهتر دارد و OOP تمیزتری را ممکن می‌کند.

---

## PHP کجا اجرا می‌شود؟
### ۱) CLI
برای یادگیری و اسکریپت‌ها عالی است.

### ۲) وب‌سرور
در تولید معمولاً:
- Nginx/Apache
- PHP-FPM

### ۳) سرور داخلی PHP
برای توسعه محلی مناسب است (برای production نیست).

---

## نصب در Windows (گزینه‌های پیشنهادی)

### گزینه A: Laragon (مناسب مبتدی)
- همراه PHP + وب‌سرور + ابزارهای دیتابیس
- مدیریت نسخه‌ها راحت‌تر

### گزینه B: XAMPP
- یک بسته ساده (Apache + PHP + MySQL)

### گزینه C: نصب zip رسمی PHP
1. دانلود PHP برای Windows
2. استخراج در مسیر مثل: \`C:\\php\\\`
3. اضافه کردن \`C:\\php\\\` به PATH
4. ریستارت ترمینال

بررسی:
\`\`\`bash
php -v
php -m
php --ini
\`\`\`

---

## اولین اسکریپت
فایل \`hello.php\` را بساز:

\`\`\`php
<?php

declare(strict_types=1);

echo "سلام از PHP!\n";
\`\`\`

اجرا:
\`\`\`bash
php hello.php
\`\`\`

---

## سرور داخلی (محلی)
یک پوشه بساز (مثلاً \`php-playground\`) و \`index.php\` را اضافه کن:

\`\`\`php
<?php

declare(strict_types=1);

echo "<h1>Hello Web</h1>";
\`\`\`

بالا آوردن سرور:
\`\`\`bash
php -S localhost:8000
\`\`\`

باز کردن در مرورگر:
- http://localhost:8000

---

## چرخه درخواست (ساده)
1. وب‌سرور درخواست را می‌گیرد
2. PHP فایل را اجرا می‌کند
3. خروجی (HTML/JSON) چاپ می‌شود
4. پاسخ به مرورگر برمی‌گردد

---

## تنظیمات PHP: فایل \`php.ini\`
پیدا کردن مسیر:
\`\`\`bash
php --ini
\`\`\`

تنظیمات مهم:
- \`display_errors\` (فقط توسعه)
- \`error_reporting\`
- \`memory_limit\`
- \`upload_max_filesize\` و \`post_max_size\`
- \`date.timezone\`

---

## PHP 8.3 در برابر PHP 8.4 (روش یادگیری)
- پایه را با **PHP 8.3** یاد می‌گیریم.
- تغییرات **PHP 8.4** را جداگانه (به عنوان آپگرید) داریم.

---

## مشکلات رایج نصب (و راه‌حل)

### ۱) "php شناخته نمی‌شود"
- PATH درست نیست یا ترمینال ریستارت نشده

### ۲) نسخه اشتباه
- چند PHP نصب داری
- \`where php\` (در Windows) را بزن تا مسیرها را ببینی

### ۳) اکستنشن‌ها فعال نیستند (PDO, mbstring)
- \`php -m\` را چک کن
- در \`php.ini\` اکستنشن را فعال کن

---

## چک‌لیست
- \`php -v\` کار می‌کند
- \`php hello.php\` اجرا می‌شود
- \`php -S localhost:8000\` را بالا می‌آوری
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpIntroSetupLesson;
