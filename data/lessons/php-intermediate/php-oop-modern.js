export const phpOopModernLesson = {
  id: 'php-oop-modern',
  title: 'Modern PHP 8.x OOP Features',
  titleFa: 'ویژگی‌های مدرن OOP در PHP 8.x',
  difficulty: 'medium',
  estimatedTime: '75 min',

  content: `
# Modern PHP 8.x OOP Features

Modern PHP (8.x) gives you the tools to write code that is:
- safer (types)
- easier to refactor (attributes/enums)
- more predictable (readonly)

---

## 1) Typed properties + constructor property promotion

\`\`\`php
<?php

declare(strict_types=1);

class Product {
  public function __construct(
    public int $id,
    public string $name,
    public int|float $price,
  ) {}
}
\`\`\`

---

## 2) Union types + intersection types

### Union
\`int|float\` means “either int or float”.

### Intersection
\`A&B\` means “must satisfy both interfaces”.

---

## 3) Useful return types: \`void\`, \`mixed\`, \`never\`

- \`void\`: returns nothing
- \`mixed\`: any type (use carefully)
- \`never\`: function never returns (throws/exit)

\`\`\`php
function fail(string $msg): never {
  throw new RuntimeException($msg);
}
\`\`\`

---

## 4) Enums (PHP 8.1+)

Enums replace “string constants” with a safer type.

\`\`\`php
enum Status: string {
  case Draft = 'draft';
  case Published = 'published';
}

function canPublish(Status $s): bool {
  return $s === Status::Draft;
}
\`\`\`

---

## 5) Attributes (metadata)

Attributes are structured annotations for reflection/frameworks.

\`\`\`php
#[Attribute]
class Route {
  public function __construct(public string $path) {}
}

#[Route('/users')]
class UsersController {}
\`\`\`

---

## 6) readonly (PHP 8.2+)

Readonly objects are great for DTOs.

\`\`\`php
readonly class Money {
  public function __construct(
    public string $currency,
    public int $amount,
  ) {}
}
\`\`\`

---

## 7) PHP 8.3 feature: typed class constants

Typed constants prevent accidental wrong types.

\`\`\`php
interface I {
  const string PHP = '8.3';
}

class Foo implements I {
  const string PHP = '8.3';
}
\`\`\`

---

## 8) PHP 8.3 feature: \`#[\\Override]\`

It protects you from typos when overriding methods.

\`\`\`php
class Base {
  public function run(): void {}
}

class Child extends Base {
  #[\Override]
  public function run(): void {}
}
\`\`\`

If you mistype the method name, PHP will error.

---

## 9) Practical patterns

- Use DTOs (readonly) for stable data shapes
- Use enums for statuses/roles
- Type everything (params + returns)
- Keep business logic inside methods/services, not controllers

---

## Rule of thumb
Types turn runtime bugs into early feedback.
` ,

  contentFa: `
# ویژگی‌های مدرن OOP در PHP 8.x

PHP مدرن (۸.x) ابزارهایی دارد که کد را:
- امن‌تر (types)
- قابل refactor تر (attributes/enums)
- قابل پیش‌بینی‌تر (readonly)
می‌کند.

---

## ۱) پراپرتی تایپ‌دار + constructor property promotion

\`\`\`php
<?php

declare(strict_types=1);

class Product {
  public function __construct(
    public int $id,
    public string $name,
    public int|float $price,
  ) {}
}
\`\`\`

---

## ۲) Union type و Intersection type

### Union
\`int|float\` یعنی یکی از این دو.

### Intersection
\`A&B\` یعنی باید هر دو interface را داشته باشد.

---

## ۳) نوع‌های بازگشتی مهم: \`void\`، \`mixed\`، \`never\`

- \`void\`: چیزی برنمی‌گرداند
- \`mixed\`: هر نوعی (با احتیاط)
- \`never\`: هیچوقت برنمی‌گردد (throw/exit)

\`\`\`php
function fail(string $msg): never {
  throw new RuntimeException($msg);
}
\`\`\`

---

## ۴) Enum (از PHP 8.1)

Enum جایگزین امن برای string constantها است.

\`\`\`php
enum Status: string {
  case Draft = 'draft';
  case Published = 'published';
}

function canPublish(Status $s): bool {
  return $s === Status::Draft;
}
\`\`\`

---

## ۵) Attribute

\`\`\`php
#[Attribute]
class Route {
  public function __construct(public string $path) {}
}

#[Route('/users')]
class UsersController {}
\`\`\`

---

## ۶) readonly (از PHP 8.2)

برای DTOها عالی است.

\`\`\`php
readonly class Money {
  public function __construct(
    public string $currency,
    public int $amount,
  ) {}
}
\`\`\`

---

## ۷) ویژگی PHP 8.3: typed class constants

\`\`\`php
interface I {
  const string PHP = '8.3';
}

class Foo implements I {
  const string PHP = '8.3';
}
\`\`\`

---

## ۸) ویژگی PHP 8.3: \`#[\\Override]\`

برای جلوگیری از اشتباه تایپی هنگام override.

\`\`\`php
class Base {
  public function run(): void {}
}

class Child extends Base {
  #[\Override]
  public function run(): void {}
}
\`\`\`

---

## ۹) الگوهای عملی

- برای داده‌های پایدار: DTO readonly
- برای status/role: enum
- تایپ‌ها را همه‌جا بنویس

---

## نکته کلیدی
تایپ‌ها باگ‌های runtime را زودتر نشان می‌دهند.
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpOopModernLesson;
