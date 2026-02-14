export const phpPdoMysqlSecurityLesson = {
  id: 'php-pdo-mysql-security',
  title: 'PDO + MySQL + Security Basics',
  titleFa: 'PDO + MySQL + مبانی امنیت',
  difficulty: 'medium',
  estimatedTime: '80 min',

  content: `
# PDO + MySQL + Security (Practical)

This lesson shows modern database access in PHP using **PDO** and the essential security rules you should never skip.

---

## 1) Connect with PDO (recommended defaults)

\`\`\`php
<?php

declare(strict_types=1);

$pdo = new PDO(
  'mysql:host=localhost;dbname=app;charset=utf8mb4',
  'appuser',
  'secret',
  [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]
);
\`\`\`

### Why these options?
- **Exceptions** make error handling consistent
- **FETCH_ASSOC** avoids numeric indexes
- **Disable emulated prepares** when possible

---

## 2) Prepared statements (prevent SQL Injection)

Never concatenate user input into SQL.

\`\`\`php
$email = $_POST['email'] ?? '';

$stmt = $pdo->prepare('SELECT id, email, password_hash FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
\`\`\`

### Common mistake
\`\`\`php
// ❌ dangerous
$sql = "SELECT * FROM users WHERE email = '$email'";
\`\`\`

---

## 3) INSERT / UPDATE / DELETE (with rowCount)

\`\`\`php
$stmt = $pdo->prepare('INSERT INTO users(email, password_hash) VALUES(:email, :hash)');
$stmt->execute([
  'email' => $email,
  'hash' => $hash,
]);

$newId = (int) $pdo->lastInsertId();
\`\`\`

---

## 4) Transactions

Use transactions when multiple queries must succeed together.

\`\`\`php
try {
  $pdo->beginTransaction();

  $pdo->prepare('UPDATE accounts SET balance = balance - :amt WHERE id = :id')
    ->execute(['amt' => 100, 'id' => 1]);

  $pdo->prepare('UPDATE accounts SET balance = balance + :amt WHERE id = :id')
    ->execute(['amt' => 100, 'id' => 2]);

  $pdo->commit();
} catch (Throwable $e) {
  $pdo->rollBack();
  throw $e;
}
\`\`\`

---

## 5) Password hashing (never store plain passwords)

\`\`\`php
$hash = password_hash($password, PASSWORD_DEFAULT);

if (!password_verify($password, $hashFromDb)) {
  // invalid password
}
\`\`\`

### Tip: rehashing
\`\`\`php
if (password_needs_rehash($hashFromDb, PASSWORD_DEFAULT)) {
  $newHash = password_hash($password, PASSWORD_DEFAULT);
  // update in DB
}
\`\`\`

---

## 6) XSS: escape output

If you output user data into HTML:

\`\`\`php
echo htmlspecialchars($user['name'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
\`\`\`

---

## 7) CSRF: protect state-changing forms

Idea:
1. Generate token and store in session
2. Send it as hidden input
3. Verify on POST

\`\`\`php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $_SESSION['csrf'] = bin2hex(random_bytes(16));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $token = $_POST['csrf'] ?? '';
  if (!hash_equals($_SESSION['csrf'] ?? '', $token)) {
    http_response_code(403);
    exit('CSRF failed');
  }
}
\`\`\`

---

## 8) Checklist (production mindset)
- Prepared statements everywhere
- Validate input, escape output
- Hash passwords (\`password_hash\`)
- Use least-privilege DB users
- Prefer transactions for multi-step changes
` ,

  contentFa: `
# PDO + MySQL + امنیت (عملی)

این درس نحوه اتصال حرفه‌ای به دیتابیس با **PDO** و قوانین امنیتی مهم را نشان می‌دهد.

---

## ۱) اتصال با PDO (تنظیمات پیشنهادی)

\`\`\`php
<?php

declare(strict_types=1);

$pdo = new PDO(
  'mysql:host=localhost;dbname=app;charset=utf8mb4',
  'appuser',
  'secret',
  [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
  ]
);
\`\`\`

---

## ۲) Prepared statement (جلوگیری از SQL Injection)

هرگز ورودی کاربر را به SQL نچسبان.

\`\`\`php
$email = $_POST['email'] ?? '';

$stmt = $pdo->prepare('SELECT id, email, password_hash FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();
\`\`\`

اشتباه خطرناک:
\`\`\`php
// ❌ خطرناک
$sql = "SELECT * FROM users WHERE email = '$email'";
\`\`\`

---

## ۳) INSERT/UPDATE/DELETE

\`\`\`php
$stmt = $pdo->prepare('INSERT INTO users(email, password_hash) VALUES(:email, :hash)');
$stmt->execute([
  'email' => $email,
  'hash' => $hash,
]);

$newId = (int) $pdo->lastInsertId();
\`\`\`

---

## ۴) تراکنش‌ها

\`\`\`php
try {
  $pdo->beginTransaction();

  $pdo->prepare('UPDATE accounts SET balance = balance - :amt WHERE id = :id')
    ->execute(['amt' => 100, 'id' => 1]);

  $pdo->prepare('UPDATE accounts SET balance = balance + :amt WHERE id = :id')
    ->execute(['amt' => 100, 'id' => 2]);

  $pdo->commit();
} catch (Throwable $e) {
  $pdo->rollBack();
  throw $e;
}
\`\`\`

---

## ۵) هش کردن پسورد

\`\`\`php
$hash = password_hash($password, PASSWORD_DEFAULT);

if (!password_verify($password, $hashFromDb)) {
  // پسورد اشتباه
}
\`\`\`

ری‌هش:
\`\`\`php
if (password_needs_rehash($hashFromDb, PASSWORD_DEFAULT)) {
  $newHash = password_hash($password, PASSWORD_DEFAULT);
  // در DB آپدیت کن
}
\`\`\`

---

## ۶) XSS: خروجی را escape کن

\`\`\`php
echo htmlspecialchars($user['name'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
\`\`\`

---

## ۷) CSRF: فرم‌های تغییر دهنده وضعیت را محافظت کن

ایده:
1) توکن بساز و در سشن ذخیره کن
2) در فرم بفرست
3) در POST بررسی کن

\`\`\`php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $_SESSION['csrf'] = bin2hex(random_bytes(16));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $token = $_POST['csrf'] ?? '';
  if (!hash_equals($_SESSION['csrf'] ?? '', $token)) {
    http_response_code(403);
    exit('CSRF failed');
  }
}
\`\`\`

---

## ۸) چک‌لیست امنیتی
- Prepared statement همه‌جا
- ورودی را validate کن، خروجی را escape کن
- پسوردها را hash کن
- یوزر دیتابیس را با دسترسی محدود بساز
- برای تغییرات چندمرحله‌ای از transaction استفاده کن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpPdoMysqlSecurityLesson;
