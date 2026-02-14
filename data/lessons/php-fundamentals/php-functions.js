export const phpFunctionsLesson = {
  id: 'php-functions',
  title: 'Functions, Closures, and Modules',
  titleFa: 'توابع، کلوزرها و ماژول‌ها',
  difficulty: 'easy',
  estimatedTime: '60 min',

  content: `
# Functions, Closures, and Modules

Functions are the building blocks of procedural PHP and also the core of clean OOP code (methods are functions inside classes).

---

## 1) Function declaration + return types

\`\`\`php
<?php

declare(strict_types=1);

function add(int $a, int $b): int {
  return $a + $b;
}

echo add(2, 3);
\`\`\`

### Why type your functions?
- Less guessing while reading code
- Bugs become errors earlier (especially with strict types)

---

## 2) Parameters: defaults, named arguments

\`\`\`php
function greet(string $name, string $prefix = 'Hello'): string {
  return "$prefix $name";
}

echo greet('Sara');
echo greet(name: 'Sara', prefix: 'Hi');
\`\`\`

### Tip: named args are great for optional flags
They make call sites readable.

---

## 3) Variadics + unpacking

\`\`\`php
function sum(int ...$nums): int {
  return array_sum($nums);
}

echo sum(1, 2, 3);

$values = [10, 20, 30];
echo sum(...$values); // unpack array into args
\`\`\`

---

## 4) Pass-by-value vs pass-by-reference (the & operator)

In PHP, most values are passed by value (copy-on-write). You *can* pass by reference, but use it carefully.

\`\`\`php
function normalizeName(string &$name): void {
  $name = trim($name);
}

$n = '  Sara  ';
normalizeName($n);
// $n is now 'Sara'
\`\`\`

### When NOT to use references
- Hidden side effects (harder debugging)
- Prefer returning a new value unless you have a strong reason

---

## 5) Anonymous functions (closures)

\`\`\`php
$factor = 2;

$mul = function (int $x) use ($factor): int {
  return $x * $factor;
};

echo $mul(10);
\`\`\`

### Closure capture rules
- \`use ($factor)\` captures by value
- \`use (&$factor)\` captures by reference (changes affect outside)

---

## 6) Arrow functions

Arrow functions automatically capture from outer scope.

\`\`\`php
$factor = 2;
$mul = fn (int $x): int => $x * $factor;
\`\`\`

Use arrow functions for short callbacks.

---

## 7) Common functional helpers

\`\`\`php
$nums = [1, 2, 3, 4];

$evens = array_filter($nums, fn ($n) => $n % 2 === 0);
$squares = array_map(fn ($n) => $n * $n, $nums);
$sum = array_reduce($nums, fn ($acc, $n) => $acc + $n, 0);
\`\`\`

---

## 8) Code organization: include/require

\`include\` and \`require\` load other files.
- \`require\` = fatal error if file not found (safer for core dependencies)
- \`include\` = warning if not found

\`\`\`php
require __DIR__ . '/helpers.php';
\`\`\`

### Best practice
In real apps, avoid manual includes and use **Composer autoloading**.

---

## 9) Namespaces (basics)

Namespaces prevent class/function name collisions.

\`\`\`php
namespace App\\Utils;

function slugify(string $s): string {
  return strtolower(trim($s));
}
\`\`\`

---

## Quick checklist
- Type your parameters and returns
- Use named args for readability
- Prefer pure functions (return values) over references
- Use closures/arrow functions for clean callbacks
` ,

  contentFa: `
# توابع، کلوزرها و ماژول‌ها

توابع پایه‌ی برنامه‌نویسی procedural در PHP هستند و حتی در OOP هم (به شکل متد) نقش اصلی دارند.

---

## ۱) تعریف تابع + تایپ خروجی

\`\`\`php
<?php

declare(strict_types=1);

function add(int $a, int $b): int {
  return $a + $b;
}

echo add(2, 3);
\`\`\`

### چرا تایپ بدهیم؟
- خوانایی بهتر
- کشف سریع‌تر باگ‌ها (خصوصاً با strict types)

---

## ۲) پارامترها: مقدار پیش‌فرض و named arguments

\`\`\`php
function greet(string $name, string $prefix = 'Hello'): string {
  return "$prefix $name";
}

echo greet('Sara');
echo greet(name: 'Sara', prefix: 'Hi');
\`\`\`

### نکته
named argumentها برای گزینه‌های اختیاری خیلی خوانا هستند.

---

## ۳) Variadic و unpacking

\`\`\`php
function sum(int ...$nums): int {
  return array_sum($nums);
}

echo sum(1, 2, 3);

$values = [10, 20, 30];
echo sum(...$values);
\`\`\`

---

## ۴) pass-by-reference با &

به طور پیش‌فرض مقدارها by value منتقل می‌شوند (copy-on-write). اما می‌توانی با & reference بدهی.

\`\`\`php
function normalizeName(string &$name): void {
  $name = trim($name);
}

$n = '  Sara  ';
normalizeName($n);
\`\`\`

### کی بهتر است reference استفاده نکنیم؟
- ایجاد side effect و سخت‌تر شدن دیباگ
- اغلب بهتر است مقدار جدید برگردانی

---

## ۵) کلوزر (anonymous function)

\`\`\`php
$factor = 2;

$mul = function (int $x) use ($factor): int {
  return $x * $factor;
};

echo $mul(10);
\`\`\`

قانون capture:
- \`use ($factor)\` by value
- \`use (&$factor)\` by reference

---

## ۶) Arrow function

به صورت خودکار از scope بیرونی capture می‌کند.

\`\`\`php
$factor = 2;
$mul = fn (int $x): int => $x * $factor;
\`\`\`

---

## ۷) توابع کاربردی: map/filter/reduce

\`\`\`php
$nums = [1, 2, 3, 4];

$evens = array_filter($nums, fn ($n) => $n % 2 === 0);
$squares = array_map(fn ($n) => $n * $n, $nums);
$sum = array_reduce($nums, fn ($acc, $n) => $acc + $n, 0);
\`\`\`

---

## ۸) سازمان‌دهی کد: include/require

- \`require\` اگر فایل نبود fatal error می‌دهد (برای وابستگی‌های مهم بهتر است)
- \`include\` فقط warning می‌دهد

\`\`\`php
require __DIR__ . '/helpers.php';
\`\`\`

در پروژه واقعی بهتر است از Composer autoloading استفاده کنی.

---

## ۹) Namespace (مقدماتی)

\`\`\`php
namespace App\\Utils;

function slugify(string $s): string {
  return strtolower(trim($s));
}
\`\`\`

---

## چک‌لیست
- تایپ پارامتر و return را بنویس
- برای خوانایی از named args استفاده کن
- توابع pure را ترجیح بده
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpFunctionsLesson;
