export const wpIntroSetupLocalLesson = {
  id: 'wp-intro-setup-local',
  title: 'WordPress Setup: Local Dev + wp-config Basics',
  titleFa: 'راه‌اندازی وردپرس: محیط لوکال + مبانی wp-config',
  difficulty: 'medium',
  estimatedTime: '90 min',

  content: `
# WordPress Setup: Local Dev + wp-config Basics

This lesson shows how to set up WordPress locally, understand the file structure, and configure the database safely.

---

## 1) What WordPress actually is

WordPress is:
- a PHP application
- with a MySQL/MariaDB database
- extensible through **themes** and **plugins**

---

## 2) Local setup options

Pick one:

### Option A) XAMPP / WAMP / MAMP
- Good for beginners
- Quick to start

### Option B) Laragon (Windows)
- Very popular on Windows
- Easy hosts + multiple PHP versions

### Option C) Docker (advanced)
- Closest to production
- More setup, but repeatable

---

## 3) Minimal install steps (conceptual)

1. Create database (e.g. \`wordpress\`)
2. Download WordPress
3. Put it in your web root
4. Visit \`http://localhost/...\` and run installer

---

## 4) WordPress folders you must know

- \`wp-admin/\`: dashboard code
- \`wp-includes/\`: core libraries
- \`wp-content/\`: **your work**
  - \`themes/\`
  - \`plugins/\`
  - \`uploads/\`

**Rule:** never edit core files.

---

## 5) wp-config.php (important)

This file contains:
- DB credentials
- salts/keys
- debug flags

Example keys:
\`\`\`php
define('DB_NAME', 'wordpress');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
\`\`\`

### Security best practices
- Use a limited DB user (not root) in real hosting
- Keep \`wp-config.php\` out of git

---

## 6) Debugging settings

\`\`\`php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
\`\`\`

Logs usually go to:\
\`wp-content/debug.log\`

---

## 7) Permalinks & .htaccess (Apache)

If routes look broken, visit:
- Settings -> Permalinks -> Save

---

## Checklist

- WordPress runs locally
- You understand \`wp-content\`
- Debug logging enabled
- No core file edits
` ,

  contentFa: `
# راه‌اندازی وردپرس: محیط لوکال + مبانی wp-config

در این درس یاد می‌گیری وردپرس را در لوکال نصب کنی، ساختار فایل‌ها را بفهمی و تنظیمات دیتابیس را درست انجام دهی.

---

## ۱) وردپرس چیست؟

وردپرس:
- یک برنامه PHP است
- با دیتابیس MySQL/MariaDB
- قابل توسعه با **قالب** و **افزونه**

---

## ۲) گزینه‌های نصب لوکال

### گزینه A) XAMPP/WAMP/MAMP
ساده و سریع

### گزینه B) Laragon (ویندوز)
خیلی محبوب و راحت

### گزینه C) Docker (پیشرفته)
نزدیک‌تر به production

---

## ۳) مراحل نصب (مفهومی)

1) ساخت دیتابیس
2) دانلود وردپرس
3) قرار دادن در web root
4) اجرای installer

---

## ۴) پوشه‌های مهم وردپرس

- \`wp-admin/\`
- \`wp-includes/\`
- \`wp-content/\` (کار اصلی شما)
  - \`themes/\`
  - \`plugins/\`
  - \`uploads/\`

قاعده: فایل‌های core را ادیت نکن.

---

## ۵) wp-config.php (خیلی مهم)

\`\`\`php
define('DB_NAME', 'wordpress');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
\`\`\`

نکات امنیتی:
- در هاست واقعی یوزر محدود بساز (نه root)
- \`wp-config.php\` را داخل git نگذار

---

## ۶) تنظیمات دیباگ

\`\`\`php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
\`\`\`

---

## ۷) Permalinks

اگر مسیرها مشکل داشتند:
Settings -> Permalinks -> Save

---

## چک‌لیست

- وردپرس در لوکال اجرا می‌شود
- \`wp-content\` را می‌شناسی
- لاگ دیباگ فعال است
- core را تغییر نمی‌دهی
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default wpIntroSetupLocalLesson;
