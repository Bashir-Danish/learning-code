export const phpSyntaxTypesLesson = {
  id: 'php-syntax-types',
  title: 'Syntax, Types, Operators',
  titleFa: 'سینتکس، انواع، عملگرها',
  difficulty: 'easy',
  estimatedTime: '55 min',

  content: `
# Syntax, Types, Operators (PHP 8.3/8.4)

This lesson builds a strong foundation: **how PHP code is written**, how types work, and which operators/features you’ll use every day.

---

## 1) PHP tags + strict types

Most PHP files start with:

\`\`\`php
<?php

declare(strict_types=1);
\`\`\`

### Why \`strict_types\` matters
PHP can do *type juggling* (e.g. turning strings into numbers). Strict types makes function calls stricter, which prevents many bugs.

\`\`\`php
<?php

declare(strict_types=1);

function add(int $a, int $b): int {
  return $a + $b;
}

add('1', 2); // TypeError with strict_types=1
\`\`\`

---

## 2) Variables (and common rules)

\`\`\`php
$name = 'Danish';
$age = 22;
$isAdmin = false;
\`\`\`

Rules:
- Variables always start with \`$\`
- PHP is case-sensitive for variables: \`$name\` != \`$Name\`

---

## 3) Types overview

### Scalar types
- \`int\`, \`float\`, \`string\`, \`bool\`

### Special types
- \`null\`

### Compound types
- \`array\`
- \`object\`

### Useful declarations
\`\`\`php
function greet(string $name): string {
  return "Hello $name";
}
\`\`\`

---

## 4) Arrays (list vs map)

PHP arrays can act like:
- **Lists** (indexed)
- **Maps** (associative)

\`\`\`php
$nums = [1, 2, 3];
$user = ['name' => 'Ali', 'age' => 30];
\`\`\`

### Access
\`\`\`php
echo $nums[0];
echo $user['name'];
\`\`\`

### Destructuring
\`\`\`php
[$a, $b] = [10, 20];
['name' => $n] = $user;
\`\`\`

### Spread
\`\`\`php
$all = [...[1, 2], 3, 4];
\`\`\`

---

## 5) Strings (single vs double quotes)

\`\`\`php
$name = 'Sara';

echo 'Hello $name';   // prints: Hello $name
echo "Hello $name";  // prints: Hello Sara
\`\`\`

### Heredoc / Nowdoc
\`\`\`php
$html = <<<HTML
<h1>Hello</h1>
HTML;

$raw = <<<'TXT'
This is not interpolated: $name
TXT;
\`\`\`

---

## 6) Operators you must know

### Strict comparison: \`===\` / \`!==\`
Always prefer strict comparisons.

\`\`\`php
var_dump(0 == '0');   // true
var_dump(0 === '0');  // false
\`\`\`

### Null coalescing: \`??\`
Use when a value might be missing.

\`\`\`php
$displayName = $user['nickname'] ?? $user['name'];
\`\`\`

### Nullsafe operator: \`?->\`
Avoid \"trying to access property on null\".

\`\`\`php
$city = $customer?->address?->city;
\`\`\`

### Spaceship: \`<=>\`
Useful for sorting callbacks.

\`\`\`php
$cmp = 10 <=> 20; // -1

$items = [3, 1, 2];
usort($items, fn ($a, $b) => $a <=> $b);
\`\`\`

---

## 7) Common mistakes (and tricks)

### 1) Truthy/falsey surprises
\`\`\`php
var_dump((bool) '0'); // false
var_dump((bool) '');  // false
var_dump((bool) ' '); // true
\`\`\`

### 2) Comparing numbers and strings
Prefer strict comparison and explicit casts.

### 3) Using \`isset\` vs \`array_key_exists\`
- \`isset($arr['x'])\` is false if key is missing **or value is null**
- \`array_key_exists('x', $arr)\` checks key existence even if value is null

---

## Quick best practices
- Use \`declare(strict_types=1)\` in new code
- Prefer \`===\` and \`!==\`
- Keep array shapes consistent
- Type your function parameters and return values
` ,

  contentFa: `
# سینتکس، انواع، عملگرها (PHP 8.3/8.4)

هدف این درس این است که پایه را محکم بسازی: نوشتن کد در PHP، رفتار تایپ‌ها، و عملگرهایی که هر روز استفاده می‌کنی.

---

## ۱) تگ PHP + strict types

اکثر فایل‌ها با این ساختار شروع می‌شوند:

\`\`\`php
<?php

declare(strict_types=1);
\`\`\`

### چرا \`strict_types\` مهم است؟
PHP ممکن است به صورت خودکار تایپ‌ها را تبدیل کند (type juggling). Strict types خیلی از باگ‌ها را زودتر نشان می‌دهد.

\`\`\`php
<?php

declare(strict_types=1);

function add(int $a, int $b): int {
  return $a + $b;
}

add('1', 2); // با strict_types=1 خطای TypeError
\`\`\`

---

## ۲) متغیرها

\`\`\`php
$name = 'Danish';
$age = 22;
$isAdmin = false;
\`\`\`

قوانین:
- متغیرها با \`$\` شروع می‌شوند
- حساس به حروف بزرگ/کوچک است: \`$name\` با \`$Name\` فرق دارد

---

## ۳) انواع داده

### اسکالر
- \`int\`، \`float\`، \`string\`، \`bool\`

### نوع‌های خاص
- \`null\`

### نوع‌های ترکیبی
- \`array\`
- \`object\`

مثال تایپ‌دهی:
\`\`\`php
function greet(string $name): string {
  return "Hello $name";
}
\`\`\`

---

## ۴) آرایه‌ها (لیست و map)

آرایه در PHP هم لیست است هم map:

\`\`\`php
$nums = [1, 2, 3];
$user = ['name' => 'Ali', 'age' => 30];
\`\`\`

دسترسی:
\`\`\`php
echo $nums[0];
echo $user['name'];
\`\`\`

Destructuring:
\`\`\`php
[$a, $b] = [10, 20];
['name' => $n] = $user;
\`\`\`

Spread:
\`\`\`php
$all = [...[1, 2], 3, 4];
\`\`\`

---

## ۵) رشته‌ها (تک کوتیشن و دابل کوتیشن)

\`\`\`php
$name = 'Sara';

echo 'Hello $name';   // خودِ $name چاپ می‌شود
echo "Hello $name";  // مقدار متغیر چاپ می‌شود
\`\`\`

Heredoc / Nowdoc:
\`\`\`php
$html = <<<HTML
<h1>Hello</h1>
HTML;

$raw = <<<'TXT'
این متن interpolate نمی‌شود: $name
TXT;
\`\`\`

---

## ۶) عملگرهای مهم

### مقایسه سخت‌گیرانه: \`===\` / \`!==\`
\`\`\`php
var_dump(0 == '0');   // true
var_dump(0 === '0');  // false
\`\`\`

### Null coalescing: \`??\`
\`\`\`php
$displayName = $user['nickname'] ?? $user['name'];
\`\`\`

### Nullsafe: \`?->\`
\`\`\`php
$city = $customer?->address?->city;
\`\`\`

### Spaceship: \`<=>\`
برای sort خیلی کاربردی است.
\`\`\`php
$items = [3, 1, 2];
usort($items, fn ($a, $b) => $a <=> $b);
\`\`\`

---

## ۷) اشتباهات رایج و ترفندها

### ۱) truthy/falsey عجیب
\`\`\`php
var_dump((bool) '0'); // false
var_dump((bool) '');  // false
var_dump((bool) ' '); // true
\`\`\`

### ۲) \`isset\` در برابر \`array_key_exists\`
- \`isset\` اگر مقدار null باشد هم false می‌دهد
- \`array_key_exists\` فقط وجود کلید را چک می‌کند

---

## نکات پایانی
- در کدهای جدید \`declare(strict_types=1)\` را فعال کن
- \`===\` را ترجیح بده
- تایپ پارامترها و return را بنویس
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpSyntaxTypesLesson;
