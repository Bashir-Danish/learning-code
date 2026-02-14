export const phpAdvancedModernLanguageLesson = {
  id: 'php-advanced-modern-language',
  title: 'Advanced PHP: Modern Language & Type-Driven Design',
  titleFa: 'PHP پیشرفته: ویژگی‌های مدرن و طراحی مبتنی بر تایپ',
  difficulty: 'hard',
  estimatedTime: '90 min',

  content: `
# Advanced PHP: Modern Language & Type-Driven Design

This lesson focuses on *writing PHP that stays safe and maintainable as the codebase grows*.

---

## 1) Strict types: what it really changes

\`declare(strict_types=1)\` affects scalar type coercion for function calls.

\`\`\`php
<?php

declare(strict_types=1);

function add(int $a, int $b): int {
  return $a + $b;
}

add('1', 2); // TypeError under strict_types
\`\`\`

**Rule:** enable strict types in new code (especially libraries/services).

---

## 2) Union & intersection types (design intent)

### Union (either/or)
\`int|float\` means: caller may pass either.

\`\`\`php
function priceToCents(int|float $price): int {
  return (int) round($price * 100);
}
\`\`\`

### Intersection (must satisfy both)
Useful when you require multiple interfaces.

\`\`\`php
interface Jsonable { public function toJson(): string; }
interface Arrayable { public function toArray(): array; }

function exportPayload(Jsonable&Arrayable $obj): string {
  // you know it supports both contracts
  return $obj->toJson();
}
\`\`\`

---

## 3) Enums: safer than strings

Avoid magic strings like \`'draft'\`, \`'published'\`.

\`\`\`php
enum Status: string {
  case Draft = 'draft';
  case Published = 'published';
}

function canPublish(Status $status): bool {
  return $status === Status::Draft;
}
\`\`\`

**Tip:** store enum values in DB as strings; convert at boundaries.

---

## 4) readonly + value objects (DTO pattern)

A DTO (data transfer object) is a small object that carries data with strong types.

\`\`\`php
readonly class Money {
  public function __construct(
    public string $currency,
    public int $amountCents,
  ) {
    if ($amountCents < 0) {
      throw new InvalidArgumentException('Money cannot be negative');
    }
  }
}
\`\`\`

### Why readonly?
- Prevent accidental mutation
- Makes code easier to reason about

---

## 5) Attributes: structured metadata

Attributes are framework-friendly and refactorable.

\`\`\`php
#[Attribute]
class Route {
  public function __construct(public string $path) {}
}

#[Route('/users')]
final class UsersController {}
\`\`\`

---

## 6) Return types: void, mixed, never

\`never\` is useful for "this function always throws".

\`\`\`php
function fail(string $msg): never {
  throw new RuntimeException($msg);
}
\`\`\`

Use \`mixed\` only when you truly cannot express a better type.

---

## 7) Typed class constants (PHP 8.3+)

Typed constants prevent accidental mistakes:

\`\`\`php
interface Api {
  const string VERSION = 'v1';
}
\`\`\`

---

## 8) Practical pattern: boundary types

A scalable approach:
- **At the boundary** (HTTP/CLI/DB): validate + convert to typed DTOs
- **Inside core**: use strict types and value objects

---

## Common mistakes

- Using arrays everywhere for structured data
- Mixing domain rules with controllers
- Using \`mixed\` too quickly
- Using enums but still accepting raw strings internally
` ,

  contentFa: `
# PHP پیشرفته: ویژگی‌های مدرن و طراحی مبتنی بر تایپ

این درس روی نوشتن PHP به شکلی تمرکز دارد که در پروژه‌های بزرگ هم **امن** و **قابل نگهداری** بماند.

---

## ۱) strict_types واقعاً چه تغییری می‌دهد؟

\`declare(strict_types=1)\` تبدیل خودکار نوع برای اسکالرها را در فراخوانی توابع محدود می‌کند.

\`\`\`php
<?php

declare(strict_types=1);

function add(int $a, int $b): int {
  return $a + $b;
}

add('1', 2); // در strict_types خطای TypeError
\`\`\`

قاعده: برای کد جدید (خصوصاً سرویس‌ها/کتابخانه‌ها) strict types را فعال کن.

---

## ۲) Union و Intersection type

### Union (یکی از چند نوع)
\`int|float\` یعنی ورودی می‌تواند یکی از این دو باشد.

\`\`\`php
function priceToCents(int|float $price): int {
  return (int) round($price * 100);
}
\`\`\`

### Intersection (باید هر دو قرارداد را داشته باشد)

\`\`\`php
interface Jsonable { public function toJson(): string; }
interface Arrayable { public function toArray(): array; }

function exportPayload(Jsonable&Arrayable $obj): string {
  return $obj->toJson();
}
\`\`\`

---

## ۳) Enum: امن‌تر از رشته

\`'draft'\` و \`'published'\` مثل «رشته جادویی» هستند. Enum بهتر است.

\`\`\`php
enum Status: string {
  case Draft = 'draft';
  case Published = 'published';
}
\`\`\`

نکته: در دیتابیس مقدار string ذخیره کن، در مرزها تبدیل کن.

---

## ۴) readonly و Value Object (الگوی DTO)

\`\`\`php
readonly class Money {
  public function __construct(
    public string $currency,
    public int $amountCents,
  ) {
    if ($amountCents < 0) {
      throw new InvalidArgumentException('Money cannot be negative');
    }
  }
}
\`\`\`

چرا readonly؟
- جلوگیری از تغییر ناخواسته
- قابل پیش‌بینی‌تر شدن کد

---

## ۵) Attribute

\`\`\`php
#[Attribute]
class Route {
  public function __construct(public string $path) {}
}

#[Route('/users')]
final class UsersController {}
\`\`\`

---

## ۶) نوع بازگشت: void / mixed / never

\`never\` یعنی این تابع هیچوقت برنمی‌گردد (مثلاً همیشه throw می‌کند).

\`\`\`php
function fail(string $msg): never {
  throw new RuntimeException($msg);
}
\`\`\`

\`mixed\` را فقط وقتی استفاده کن که واقعاً راه بهتر نداری.

---

## ۷) Typed class constants (از PHP 8.3)

\`\`\`php
interface Api {
  const string VERSION = 'v1';
}
\`\`\`

---

## ۸) الگوی عملی: Boundary types

- در مرزها (HTTP/CLI/DB): validate + تبدیل به DTO تایپ‌دار
- داخل هسته: تایپ‌ها و value objectها

---

## اشتباهات رایج

- استفاده بیش از حد از آرایه برای داده‌های ساخت‌یافته
- قاطی کردن منطق دامنه با controller
- استفاده سریع از mixed
- استفاده از enum ولی پذیرفتن رشته خام داخل هسته
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedModernLanguageLesson;
