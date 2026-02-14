export const phpControlFlowLesson = {
  id: 'php-control-flow',
  title: 'Control Flow: if/switch/match + loops',
  titleFa: 'کنترل جریان: if/switch/match + حلقه‌ها',
  difficulty: 'easy',
  estimatedTime: '50 min',

  content: `
# Control Flow (if/switch/match + loops)

Control flow is how you make decisions and repeat work.

---

## 1) if / elseif / else

\`\`\`php
$age = 17;

if ($age >= 18) {
  echo "Adult";
} elseif ($age >= 13) {
  echo "Teen";
} else {
  echo "Child";
}
\`\`\`

### Common mistake: assignment instead of comparison
\`\`\`php
if ($isAdmin = true) { /* always true */ }
\`\`\`

Use strict comparison:
\`\`\`php
if ($role === 'admin') { /* ... */ }
\`\`\`

---

## 2) switch

\`\`\`php
switch ($role) {
  case 'admin':
    $canDelete = true;
    break;
  case 'editor':
    $canDelete = false;
    break;
  default:
    $canDelete = false;
}
\`\`\`

### Pitfall: missing \`break\`
If you forget \`break\`, execution can "fall through" to the next case.

---

## 3) match (modern)

\`match\` is an expression (it returns a value) and comparisons are strict.

\`\`\`php
$status = 404;

$label = match ($status) {
  200 => 'OK',
  404 => 'Not Found',
  default => 'Unknown',
};
\`\`\`

### When to prefer match
- You want a returned value
- You want strict comparisons
- You want to avoid fallthrough bugs

---

## 4) Loops

### for
\`\`\`php
for ($i = 0; $i < 3; $i++) {
  echo $i;
}
\`\`\`

### while
\`\`\`php
$i = 0;
while ($i < 3) {
  echo $i;
  $i++;
}
\`\`\`

### do...while
Runs at least once.

---

## 5) foreach (arrays)

\`\`\`php
$items = ['a', 'b'];
foreach ($items as $item) {
  echo $item;
}

$user = ['name' => 'Sara', 'age' => 20];
foreach ($user as $key => $value) {
  echo "$key=$value\n";
}
\`\`\`

### Big pitfall: foreach by reference
\`\`\`php
$nums = [1, 2, 3];
foreach ($nums as &$n) {
  $n *= 2;
}
unset($n); // IMPORTANT: break the reference
\`\`\`

---

## 6) break / continue (with levels)

\`break\` exits the loop, \`continue\` skips to the next iteration.

Nested loops can take a level:
\`\`\`php
for ($i = 0; $i < 3; $i++) {
  for ($j = 0; $j < 3; $j++) {
    if ($j === 1) {
      continue; // skips only inner loop iteration
    }
    if ($i === 2) {
      break 2; // exits BOTH loops
    }
  }
}
\`\`\`

---

## 7) Practical tips
- Prefer \`match\` when mapping values
- Keep conditions readable (extract into functions)
- Avoid complex nested loops; refactor into smaller steps
` ,

  contentFa: `
# کنترل جریان (if/switch/match + حلقه‌ها)

کنترل جریان یعنی تصمیم‌گیری و تکرار کار.

---

## ۱) if / elseif / else

\`\`\`php
$age = 17;

if ($age >= 18) {
  echo "Adult";
} elseif ($age >= 13) {
  echo "Teen";
} else {
  echo "Child";
}
\`\`\`

### اشتباه رایج: استفاده از = به جای ==
\`\`\`php
if ($isAdmin = true) { /* همیشه true */ }
\`\`\`

مقایسه سخت‌گیرانه:
\`\`\`php
if ($role === 'admin') { /* ... */ }
\`\`\`

---

## ۲) switch

\`\`\`php
switch ($role) {
  case 'admin':
    $canDelete = true;
    break;
  case 'editor':
    $canDelete = false;
    break;
  default:
    $canDelete = false;
}
\`\`\`

### نکته: فراموش کردن break
اگر \`break\` نگذاری ممکن است fallthrough رخ دهد.

---

## ۳) match (مدرن)

\`match\` یک expression است (مقدار برمی‌گرداند) و مقایسه‌ها strict هستند.

\`\`\`php
$status = 404;

$label = match ($status) {
  200 => 'OK',
  404 => 'Not Found',
  default => 'Unknown',
};
\`\`\`

### کی match بهتر است؟
- وقتی می‌خواهی خروجی مستقیم داشته باشی
- وقتی strict comparison می‌خواهی
- وقتی می‌خواهی از fallthrough جلوگیری کنی

---

## ۴) حلقه‌ها

### for
\`\`\`php
for ($i = 0; $i < 3; $i++) {
  echo $i;
}
\`\`\`

### while
\`\`\`php
$i = 0;
while ($i < 3) {
  echo $i;
  $i++;
}
\`\`\`

### do...while
حداقل یک بار اجرا می‌شود.

---

## ۵) foreach (آرایه‌ها)

\`\`\`php
$items = ['a', 'b'];
foreach ($items as $item) {
  echo $item;
}

$user = ['name' => 'Sara', 'age' => 20];
foreach ($user as $key => $value) {
  echo "$key=$value\n";
}
\`\`\`

### دام مهم: foreach با reference
\`\`\`php
$nums = [1, 2, 3];
foreach ($nums as &$n) {
  $n *= 2;
}
unset($n); // مهم: reference را قطع کن
\`\`\`

---

## ۶) break / continue (با level)

در حلقه تو در تو می‌توانی سطح بدهی:
\`\`\`php
for ($i = 0; $i < 3; $i++) {
  for ($j = 0; $j < 3; $j++) {
    if ($j === 1) {
      continue;
    }
    if ($i === 2) {
      break 2; // خروج از هر دو حلقه
    }
  }
}
\`\`\`

---

## ۷) نکات کاربردی
- وقتی mapping انجام می‌دهی \`match\` عالی است
- شرط‌ها را readable نگه دار (تابع جدا بساز)
- حلقه‌های تو در تو را تا حد ممکن ساده کن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpControlFlowLesson;
