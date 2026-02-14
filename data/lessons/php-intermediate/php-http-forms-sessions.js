export const phpHttpFormsSessionsLesson = {
  id: 'php-http-forms-sessions',
  title: 'Web Basics: Requests, Forms, Sessions',
  titleFa: 'مبانی وب: درخواست‌ها، فرم‌ها، سشن',
  difficulty: 'medium',
  estimatedTime: '70 min',

  content: `
# Web Basics (HTTP, Forms, Sessions)

This is the core of classic PHP: handling requests, reading input, validating data, using sessions/cookies, and returning responses.

---

## 1) Superglobals you must know

- \`$_GET\`: query string params
- \`$_POST\`: form body
- \`$_SERVER\`: request metadata
- \`$_COOKIE\`: cookies
- \`$_SESSION\`: session storage (after \`session_start()\`)
- \`$_FILES\`: file uploads

---

## 2) Read request data safely

\`\`\`php
$name = trim($_POST['name'] ?? '');
$age = $_POST['age'] ?? null;
\`\`\`

### Validate (not just sanitize)
\`\`\`php
if ($name === '') {
  throw new InvalidArgumentException('Name is required');
}

$ageInt = filter_var($age, FILTER_VALIDATE_INT);
if ($ageInt === false) {
  throw new InvalidArgumentException('Age must be an integer');
}
\`\`\`

---

## 3) Basic response

### HTML
\`\`\`php
echo "<h1>Hello</h1>";
\`\`\`

### JSON
\`\`\`php
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => true], JSON_THROW_ON_ERROR);
\`\`\`

### Status codes
\`\`\`php
http_response_code(404);
\`\`\`

---

## 4) Sessions (login state)

\`\`\`php
session_start();

$_SESSION['user_id'] = 123;
\`\`\`

### Session security tips
- Regenerate session id after login: \`session_regenerate_id(true)\`
- Use HTTPS in production

---

## 5) Cookies (preferences)

\`\`\`php
setcookie('theme', 'dark', [
  'expires' => time() + 60 * 60 * 24 * 30,
  'httponly' => true,
  'secure' => true,
  'samesite' => 'Lax',
]);
\`\`\`

**Rule:** never store secrets in cookies.

---

## 6) File uploads (basics)

\`\`\`php
if (!isset($_FILES['avatar'])) {
  throw new RuntimeException('No file uploaded');
}

$tmp = $_FILES['avatar']['tmp_name'];
$name = basename($_FILES['avatar']['name']);
move_uploaded_file($tmp, __DIR__ . '/uploads/' . $name);
\`\`\`

### Security warning
Validate file type and store outside public directory when possible.

---

## 7) Simple routing idea

One entry file (\`index.php\`) can route based on path:

\`\`\`php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/health') {
  echo 'ok';
  exit;
}

http_response_code(404);
echo 'Not Found';
\`\`\`

---

## 8) Security basics checklist

- Validate inputs
- Escape outputs (XSS)
- CSRF tokens for state changes
- Prepared statements for DB
- Secure cookies/session settings
` ,

  contentFa: `
# مبانی وب (HTTP، فرم‌ها، سشن)

این بخش هسته‌ی PHP کلاسیک است: مدیریت request، دریافت ورودی، اعتبارسنجی، استفاده از سشن/کوکی و ساخت response.

---

## ۱) Superglobalهای مهم

- \`$_GET\`: پارامترهای query
- \`$_POST\`: بدنه فرم
- \`$_SERVER\`: اطلاعات درخواست
- \`$_COOKIE\`: کوکی‌ها
- \`$_SESSION\`: داده سشن (بعد از \`session_start()\`)
- \`$_FILES\`: آپلود فایل

---

## ۲) دریافت ورودی به شکل امن

\`\`\`php
$name = trim($_POST['name'] ?? '');
$age = $_POST['age'] ?? null;
\`\`\`

اعتبارسنجی:
\`\`\`php
if ($name === '') {
  throw new InvalidArgumentException('Name is required');
}

$ageInt = filter_var($age, FILTER_VALIDATE_INT);
if ($ageInt === false) {
  throw new InvalidArgumentException('Age must be an integer');
}
\`\`\`

---

## ۳) response پایه

HTML:
\`\`\`php
echo "<h1>Hello</h1>";
\`\`\`

JSON:
\`\`\`php
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['ok' => true], JSON_THROW_ON_ERROR);
\`\`\`

Status code:
\`\`\`php
http_response_code(404);
\`\`\`

---

## ۴) سشن (حالت لاگین)

\`\`\`php
session_start();
$_SESSION['user_id'] = 123;
\`\`\`

نکات امنیتی:
- بعد از login: \`session_regenerate_id(true)\`
- در production: فقط HTTPS

---

## ۵) کوکی (تنظیمات کاربر)

\`\`\`php
setcookie('theme', 'dark', [
  'expires' => time() + 60 * 60 * 24 * 30,
  'httponly' => true,
  'secure' => true,
  'samesite' => 'Lax',
]);
\`\`\`

قاعده: اطلاعات حساس را داخل کوکی نگذار.

---

## ۶) آپلود فایل (مقدماتی)

\`\`\`php
if (!isset($_FILES['avatar'])) {
  throw new RuntimeException('No file uploaded');
}

$tmp = $_FILES['avatar']['tmp_name'];
$name = basename($_FILES['avatar']['name']);
move_uploaded_file($tmp, __DIR__ . '/uploads/' . $name);
\`\`\`

هشدار امنیتی: نوع فایل را validate کن و اگر می‌شود خارج از public ذخیره کن.

---

## ۷) ایده ساده routing

\`\`\`php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($path === '/health') {
  echo 'ok';
  exit;
}

http_response_code(404);
echo 'Not Found';
\`\`\`

---

## ۸) چک‌لیست امنیتی

- ورودی را validate کن
- خروجی را escape کن (XSS)
- برای تغییرات توکن CSRF
- برای دیتابیس prepared statement
- تنظیمات امن کوکی/سشن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpHttpFormsSessionsLesson;
