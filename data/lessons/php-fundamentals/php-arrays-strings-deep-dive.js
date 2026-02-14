export const phpArraysStringsDeepDiveLesson = {
  id: 'php-arrays-strings-deep-dive',
  title: 'Arrays & Strings in Real Code',
  titleFa: 'آرایه‌ها و رشته‌ها در کد واقعی',
  difficulty: 'easy',
  estimatedTime: '60 min',

  content: `
# Arrays & Strings in Real Code

PHP arrays and strings are your daily tools. This lesson focuses on patterns you actually use in web apps and APIs.

---

## 1) PHP arrays: list + map

PHP arrays are very flexible, but that flexibility can also cause bugs if you mix shapes.

\`\`\`php
$list = [10, 20, 30];
$map = ['name' => 'Ali', 'age' => 30];
\`\`\`

Access:
\`\`\`php
echo $list[0];
echo $map['name'];
\`\`\`

---

## 2) Common array functions (with examples)

### array_map
\`\`\`php
$nums = [1, 2, 3, 4];
$squares = array_map(fn ($n) => $n * $n, $nums);
\`\`\`

### array_filter
\`\`\`php
$evens = array_filter($nums, fn ($n) => $n % 2 === 0);
\`\`\`

### array_reduce
\`\`\`php
$sum = array_reduce($nums, fn ($acc, $n) => $acc + $n, 0);
\`\`\`

### array_values / array_keys
Useful when you want a clean list of values.

---

## 3) Sorting

### Sort values
\`\`\`php
$items = [3, 1, 2];
sort($items); // reindexes keys
\`\`\`

### Sort associative arrays
\`\`\`php
$scores = ['sara' => 10, 'ali' => 7];
arsort($scores); // keeps keys
\`\`\`

### Custom sort
\`\`\`php
$users = [
  ['name' => 'Sara', 'age' => 20],
  ['name' => 'Ali', 'age' => 30],
];

usort($users, fn ($a, $b) => $a['age'] <=> $b['age']);
\`\`\`

---

## 4) Destructuring (array unpacking)

\`\`\`php
[$a, $b] = [1, 2];
['name' => $name] = ['name' => 'Sara', 'age' => 20];
\`\`\`

---

## 5) Spread operator (...)

\`\`\`php
$all = [...[1, 2], 3, 4];
\`\`\`

---

## 6) Strings: practical rules

### Single vs double quotes
\`\`\`php
$name = 'Sara';
echo 'Hello $name';  // no interpolation
echo "Hello $name"; // interpolation
\`\`\`

### Common string helpers
\`\`\`php
$s = '  Hello  ';
echo trim($s);
echo strtolower($s);
echo str_replace('He', 'Ye', $s);
\`\`\`

---

## 7) Unicode and mbstring

If you work with Persian/Arabic or emojis:
- \`strlen\` counts bytes, not characters
- Use \`mb_strlen\`, \`mb_strtolower\`, etc.

---

## 8) Common pitfalls (important tricks)

### 1) array_filter preserves keys
\`\`\`php
$a = [10, 11, 12];
$b = array_filter($a, fn ($n) => $n > 10);
// keys might be [1 => 11, 2 => 12]
$b = array_values($b); // reindex
\`\`\`

### 2) Mixing list + map shapes
Avoid arrays like:\
\`['name' => 'Sara', 0 => 'x']\` unless you truly need it.

### 3) Use DTO classes when data has a stable shape
Arrays are fine for quick scripts, but DTO objects scale better.

---

## Summary
- Know your array shape (list vs map)
- Learn map/filter/reduce patterns
- Use \`mb_*\` when dealing with Unicode
- Watch out for key preservation in filters/sorts
` ,

  contentFa: `
# آرایه‌ها و رشته‌ها در کد واقعی

آرایه و رشته در PHP ابزارهای روزمره هستند. این درس روی الگوهای واقعی در وب‌اپ‌ها و API تمرکز دارد.

---

## ۱) آرایه در PHP: لیست و map

آرایه در PHP انعطاف‌پذیر است، اما اگر شکل داده‌ها قاطی شود باگ زیاد می‌شود.

\`\`\`php
$list = [10, 20, 30];
$map = ['name' => 'Ali', 'age' => 30];
\`\`\`

دسترسی:
\`\`\`php
echo $list[0];
echo $map['name'];
\`\`\`

---

## ۲) توابع مهم آرایه (با مثال)

### array_map
\`\`\`php
$nums = [1, 2, 3, 4];
$squares = array_map(fn ($n) => $n * $n, $nums);
\`\`\`

### array_filter
\`\`\`php
$evens = array_filter($nums, fn ($n) => $n % 2 === 0);
\`\`\`

### array_reduce
\`\`\`php
$sum = array_reduce($nums, fn ($acc, $n) => $acc + $n, 0);
\`\`\`

---

## ۳) مرتب‌سازی

\`\`\`php
$items = [3, 1, 2];
sort($items); // کلیدها را دوباره اندیس‌گذاری می‌کند
\`\`\`

آرایه associative:
\`\`\`php
$scores = ['sara' => 10, 'ali' => 7];
arsort($scores);
\`\`\`

مرتب‌سازی سفارشی:
\`\`\`php
$users = [
  ['name' => 'Sara', 'age' => 20],
  ['name' => 'Ali', 'age' => 30],
];

usort($users, fn ($a, $b) => $a['age'] <=> $b['age']);
\`\`\`

---

## ۴) Destructuring
\`\`\`php
[$a, $b] = [1, 2];
['name' => $name] = ['name' => 'Sara', 'age' => 20];
\`\`\`

---

## ۵) Spread (...)
\`\`\`php
$all = [...[1, 2], 3, 4];
\`\`\`

---

## ۶) رشته‌ها (قواعد کاربردی)

\`\`\`php
$name = 'Sara';
echo 'Hello $name';
echo "Hello $name";
\`\`\`

توابع رایج:
\`\`\`php
$s = '  Hello  ';
echo trim($s);
echo strtolower($s);
echo str_replace('He', 'Ye', $s);
\`\`\`

---

## ۷) یونیکد و mbstring

اگر با فارسی/عربی/ایموجی کار می‌کنی:
- \`strlen\` طول بایت را می‌دهد
- از \`mb_strlen\` و سایر \`mb_*\` استفاده کن

---

## ۸) دام‌ها و ترفندهای مهم

### ۱) array_filter کلیدها را حفظ می‌کند
\`\`\`php
$a = [10, 11, 12];
$b = array_filter($a, fn ($n) => $n > 10);
$b = array_values($b);
\`\`\`

### ۲) قاطی کردن شکل لیست و map
تا جای ممکن از آرایه‌هایی مثل \`['name' => 'Sara', 0 => 'x']\` دوری کن.

### ۳) وقتی داده شکل ثابت دارد، DTO (کلاس) بهتر است

---

## خلاصه
- شکل آرایه (لیست/map) را مشخص نگه دار
- الگوهای map/filter/reduce را یاد بگیر
- برای یونیکد از \`mb_*\` استفاده کن
- مراقب حفظ شدن کلیدها در filter/sort باش
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpArraysStringsDeepDiveLesson;
