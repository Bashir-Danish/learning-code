export const phpFilesDatesJsonLesson = {
  id: 'php-files-dates-json',
  title: 'Files, Dates, JSON',
  titleFa: 'فایل‌ها، تاریخ، JSON',
  difficulty: 'easy',
  estimatedTime: '55 min',

  content: `
# Files, Dates, JSON (Everyday PHP)

This lesson covers 3 things you’ll constantly use in real apps:
- reading/writing files safely
- working with dates/timezones
- encoding/decoding JSON without silent errors

---

## 1) Files: read/write

### Read a whole file
\`\`\`php
$content = file_get_contents(__DIR__ . '/notes.txt');
\`\`\`

### Write a file
\`\`\`php
file_put_contents(__DIR__ . '/out.txt', "Hello\n");
\`\`\`

### Append
\`\`\`php
file_put_contents(__DIR__ . '/out.txt', "More\n", FILE_APPEND);
\`\`\`

### Common mistake
Always use \`__DIR__\` for paths (relative paths depend on working directory).

---

## 2) Streams (big files)

For large files, use streams instead of loading everything in memory.

\`\`\`php
$fh = fopen(__DIR__ . '/big.txt', 'r');
while (($line = fgets($fh)) !== false) {
  // process $line
}
fclose($fh);
\`\`\`

---

## 3) Dates: DateTimeImmutable

Prefer \`DateTimeImmutable\` to avoid accidental mutation.

\`\`\`php
$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
echo $now->format(DateTimeInterface::ATOM);

$tehran = $now->setTimezone(new DateTimeZone('Asia/Tehran'));
echo $tehran->format('Y-m-d H:i:s');
\`\`\`

### Timestamps
\`\`\`php
$dt = DateTimeImmutable::createFromTimestamp(1700000000);
\`\`\`

---

## 4) JSON: encode/decode safely

### Encode
\`\`\`php
$data = ['name' => 'Ali', 'age' => 30];
$json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
\`\`\`

### Decode
\`\`\`php
$decoded = json_decode($json, true, flags: JSON_THROW_ON_ERROR);
\`\`\`

---

## 5) Common JSON pitfalls

- JSON decoding returns \`null\` on failure (unless you use \`JSON_THROW_ON_ERROR\`)
- UTF-8 issues (ensure correct encoding)

---

## Quick checklist
- Use \`__DIR__\` for safe file paths
- Use streams for large files
- Use \`DateTimeImmutable\` + timezone explicitly
- Always use \`JSON_THROW_ON_ERROR\`
` ,

  contentFa: `
# فایل‌ها، تاریخ، JSON (کارهای روزمره)

این درس ۳ موضوعی را پوشش می‌دهد که دائماً در پروژه‌های واقعی استفاده می‌کنی:
- کار با فایل‌ها
- تاریخ و timezone
- JSON بدون خطای مخفی

---

## ۱) فایل‌ها: خواندن/نوشتن

خواندن کل فایل:
\`\`\`php
$content = file_get_contents(__DIR__ . '/notes.txt');
\`\`\`

نوشتن فایل:
\`\`\`php
file_put_contents(__DIR__ . '/out.txt', "Hello\n");
\`\`\`

Append:
\`\`\`php
file_put_contents(__DIR__ . '/out.txt', "More\n", FILE_APPEND);
\`\`\`

دام رایج: مسیرهای نسبی. بهتر است از \`__DIR__\` استفاده کنی.

---

## ۲) Stream برای فایل‌های بزرگ

\`\`\`php
$fh = fopen(__DIR__ . '/big.txt', 'r');
while (($line = fgets($fh)) !== false) {
  // پردازش خط
}
fclose($fh);
\`\`\`

---

## ۳) تاریخ: DateTimeImmutable

\`\`\`php
$now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
echo $now->format(DateTimeInterface::ATOM);

$tehran = $now->setTimezone(new DateTimeZone('Asia/Tehran'));
echo $tehran->format('Y-m-d H:i:s');
\`\`\`

Timestamp:
\`\`\`php
$dt = DateTimeImmutable::createFromTimestamp(1700000000);
\`\`\`

---

## ۴) JSON: encode/decode امن

Encode:
\`\`\`php
$data = ['name' => 'Ali', 'age' => 30];
$json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
\`\`\`

Decode:
\`\`\`php
$decoded = json_decode($json, true, flags: JSON_THROW_ON_ERROR);
\`\`\`

---

## ۵) دام‌های JSON

- بدون \`JSON_THROW_ON_ERROR\` ممکن است خطاها مخفی بمانند
- مشکل UTF-8 (encoding را درست نگه دار)

---

## چک‌لیست
- برای مسیر فایل از \`__DIR__\` استفاده کن
- برای فایل‌های بزرگ stream
- DateTimeImmutable + timezone مشخص
- JSON_THROW_ON_ERROR همیشه
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpFilesDatesJsonLesson;
