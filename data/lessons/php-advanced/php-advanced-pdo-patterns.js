export const phpAdvancedPdoPatternsLesson = {
  id: 'php-advanced-pdo-patterns',
  title: 'Advanced PHP: PDO Patterns (Transactions, Concurrency, N+1)',
  titleFa: 'PHP پیشرفته: الگوهای PDO (تراکنش، همزمانی، N+1)',
  difficulty: 'hard',
  estimatedTime: '110 min',

  content: `
# Advanced PHP: PDO Patterns (Transactions, Concurrency, N+1)

This lesson builds on basic PDO usage and focuses on correctness and performance.

---

## 1) Always configure PDO correctly

\`\`\`php
$pdo = new PDO($dsn, $user, $pass, [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
]);
\`\`\`

---

## 2) Transaction patterns

Use transactions when multiple writes must succeed together.

\`\`\`php
try {
  $pdo->beginTransaction();

  // multiple queries...

  $pdo->commit();
} catch (Throwable $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  throw $e;
}
\`\`\`

---

## 3) Concurrency: avoid lost updates

If two requests update the same row, you can lose data.

Common strategies:
- optimistic locking (version column)
- SELECT ... FOR UPDATE (pessimistic)

---

## 4) N+1 query problem

Bad pattern:
- fetch users
- for each user fetch posts

Better:
- join
- or fetch posts with WHERE user_id IN (...)

---

## 5) Pagination patterns

Offset pagination is easy but can be slow at high offsets.

Keyset pagination idea:
- use \`WHERE id > :lastId\` with LIMIT

---

## 6) Returning shapes: map DB rows to DTOs

Instead of returning raw arrays everywhere, map to objects at boundaries.

---

## Checklist

- transactions for multi-step writes
- handle concurrency
- avoid N+1
- use correct pagination
` ,

  contentFa: `
# PHP پیشرفته: الگوهای PDO (تراکنش، همزمانی، N+1)

این درس روی درست‌کاری و عملکرد تمرکز دارد.

---

## ۱) تنظیمات درست PDO

\`\`\`php
$pdo = new PDO($dsn, $user, $pass, [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false,
]);
\`\`\`

---

## ۲) الگوی تراکنش

\`\`\`php
try {
  $pdo->beginTransaction();
  $pdo->commit();
} catch (Throwable $e) {
  if ($pdo->inTransaction()) {
    $pdo->rollBack();
  }
  throw $e;
}
\`\`\`

---

## ۳) همزمانی و Lost update

راه‌ها:
- optimistic locking
- SELECT ... FOR UPDATE

---

## ۴) مشکل N+1

به جای query داخل loop، join یا IN استفاده کن.

---

## ۵) Pagination

- offset ساده ولی کند
- keyset با \`id > lastId\`

---

## چک‌لیست

- تراکنش برای چند write
- مدیریت همزمانی
- جلوگیری از N+1
- pagination درست
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedPdoPatternsLesson;
