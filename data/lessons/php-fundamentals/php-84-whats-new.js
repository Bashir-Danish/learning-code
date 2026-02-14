export const php84WhatsNewLesson = {
  id: 'php-84-whats-new',
  title: 'What’s New in PHP 8.4',
  titleFa: 'چه چیزهایی در PHP 8.4 جدید است؟',
  difficulty: 'easy',
  estimatedTime: '35 min',

  content: `
# What’s New in PHP 8.4

This lesson is a **practical upgrade guide**. You’ll learn what changed in PHP 8.4, how to use the new features, and what to watch for when upgrading from PHP 8.3.

> Tip: Learn the main course in PHP 8.3 first, then use this as a “delta” lesson.

---

## 1) New attribute: \`#[Deprecated]\`

PHP already had an internal deprecation mechanism, but in 8.4 you can mark your own APIs as deprecated.

\`\`\`php
<?php

#[Deprecated("Use newApi() instead")]
function oldApi(): void {
  // ...
}
\`\`\`

**Why it matters:**
- Helps you migrate a codebase safely
- IDEs and tooling can surface warnings earlier

---

## 2) New array helper functions

PHP 8.4 introduces a set of helper functions (e.g. finding items, checking predicates).

Examples:
\`\`\`php
<?php

$users = [
  ['id' => 1, 'name' => 'Sara', 'active' => true],
  ['id' => 2, 'name' => 'Ali',  'active' => false],
];

// Find first matching element
$activeUser = array_find($users, fn ($u) => $u['active'] === true);

// Check if any/all elements match
$anyActive = array_any($users, fn ($u) => $u['active'] === true);
$allActive = array_all($users, fn ($u) => $u['active'] === true);
\`\`\`

**Common mistake:** still validate assumptions about return values (\`null\` when not found).

---

## 3) Web/HTTP helper: \`request_parse_body()\`

PHP 8.4 adds \`request_parse_body()\` to parse HTTP request bodies in a structured way.

**Why it matters:**
- Reduces boilerplate in request parsing
- Encourages a single approach for different content types

---

## 4) Date/Time improvements

PHP 8.4 introduces new DateTime helpers such as creating from timestamps and microsecond helpers.

\`\`\`php
<?php

$dt = DateTimeImmutable::createFromTimestamp(1700000000);
\`\`\`

---

## 5) String/Unicode improvements

Some mbstring additions like trim helpers.

---

## 6) Regex engine updates (PCRE2)

PCRE2 upgrades can change behavior for some patterns.

**Upgrade tip:**
- Run your test suite
- Smoke-test your most complex regex patterns

---

## 7) A safe upgrade workflow (8.3 -> 8.4)

1. Upgrade in a branch
2. Run unit/integration tests
3. Search for new deprecations/warnings
4. Deploy to staging
5. Roll out gradually

---

## Quick summary

- \`#[Deprecated]\` for userland deprecations
- New array helper functions (find/any/all)
- New request body parsing helper
- Date/time + mbstring improvements
- PCRE2 regex behavior changes to test
`,

  contentFa: `
# چه چیزهایی در PHP 8.4 جدید است؟

این درس یک **راهنمای ارتقا** است: تغییرات مهم PHP 8.4، مثال‌های کاربردی، و نکات مهاجرت از 8.3 به 8.4.

> نکته: اول دوره اصلی را با PHP 8.3 یاد بگیر، بعد این درس را به عنوان تفاوت‌ها بخوان.

---

## ۱) Attribute جدید: \`#[Deprecated]\`

در PHP 8.4 می‌توانی APIهای خودت را هم deprecated کنی.

\`\`\`php
<?php

#[Deprecated("به جای آن از newApi() استفاده کن")]
function oldApi(): void {
  // ...
}
\`\`\`

**چرا مهم است؟**
- مهاجرت تدریجی در پروژه‌های بزرگ
- هشدارهای بهتر در ابزارها و IDE

---

## ۲) توابع جدید برای آرایه‌ها

در PHP 8.4 چند تابع کمکی برای پیدا کردن آیتم‌ها و بررسی شرط‌ها اضافه شده است.

\`\`\`php
<?php

$users = [
  ['id' => 1, 'name' => 'Sara', 'active' => true],
  ['id' => 2, 'name' => 'Ali',  'active' => false],
];

$activeUser = array_find($users, fn ($u) => $u['active'] === true);

$anyActive = array_any($users, fn ($u) => $u['active'] === true);
$allActive = array_all($users, fn ($u) => $u['active'] === true);
\`\`\`

**اشتباه رایج:** اگر چیزی پیدا نشود ممکن است \`null\` برگردد؛ حتماً چک کن.

---

## ۳) کمک‌کننده وب/HTTP: \`request_parse_body()\`

PHP 8.4 تابع \`request_parse_body()\` را اضافه کرده تا بدنه درخواست را ساختاریافته‌تر پارس کند.

---

## ۴) بهبودهای Date/Time

توابع کمکی جدید برای زمان/تاریخ (مثل ساختن از timestamp و میکروثانیه).

\`\`\`php
<?php

$dt = DateTimeImmutable::createFromTimestamp(1700000000);
\`\`\`

---

## ۵) بهبودهای رشته/یونیکد

برخی توابع جدید در mbstring مثل trimها.

---

## ۶) آپگرید PCRE2 و تغییرات Regex

ممکن است برخی regexها رفتار متفاوتی داشته باشند.

**نکته مهاجرت:**
- تست‌ها را اجرا کن
- regexهای پیچیده را جداگانه بررسی کن

---

## ۷) روش امن ارتقا از 8.3 به 8.4

1. ارتقا در یک branch
2. اجرای تست‌ها
3. بررسی warning/deprecationها
4. deploy روی staging
5. rollout تدریجی

---

## خلاصه سریع

- \`#[Deprecated]\` برای deprecated کردن APIهای پروژه
- توابع کمکی جدید آرایه (find/any/all)
- پارس بدنه درخواست با \`request_parse_body()\`
- بهبودهای Date/Time و mbstring
- تغییرات regex به خاطر PCRE2 (نیاز به تست)
`,

  hasVisualization: false,
  hasExercise: false,
};

export default php84WhatsNewLesson;
