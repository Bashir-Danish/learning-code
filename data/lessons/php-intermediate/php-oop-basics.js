export const phpOopBasicsLesson = {
  id: 'php-oop-basics',
  title: 'OOP Basics: Classes, Objects, Interfaces',
  titleFa: 'مبانی OOP: کلاس، شی، اینترفیس',
  difficulty: 'medium',
  estimatedTime: '70 min',

  content: `
# OOP Basics (Modern PHP)

OOP helps you model your program as objects with clear responsibilities. In PHP it’s used everywhere: frameworks, APIs, domain models, and libraries.

---

## 1) Class + object

\`\`\`php
<?php

declare(strict_types=1);

class User {
  public function __construct(
    public string $name,
    private string $passwordHash,
  ) {}

  public function verifyPassword(string $password): bool {
    return password_verify($password, $this->passwordHash);
  }
}

$user = new User('Sara', password_hash('secret', PASSWORD_DEFAULT));
var_dump($user->verifyPassword('secret'));
\`\`\`

### Constructor property promotion
The properties are declared directly in the constructor signature (modern PHP).

---

## 2) Visibility: public / protected / private

- \`public\`: accessible everywhere
- \`protected\`: accessible in the class + subclasses
- \`private\`: only inside the class

**Rule:** keep properties private/protected when you need invariants; expose behavior via methods.

---

## 3) Methods and \`$this\`

\`\`\`php
class Counter {
  private int $value = 0;

  public function inc(): void {
    $this->value++;
  }

  public function get(): int {
    return $this->value;
  }
}
\`\`\`

---

## 4) Static: when to use (and when not)

\`\`\`php
class Math {
  public static function clamp(int $n, int $min, int $max): int {
    return max($min, min($max, $n));
  }
}

echo Math::clamp(15, 0, 10);
\`\`\`

Use \`static\` for pure helpers. Avoid static state in apps (hard to test).

---

## 5) Inheritance (extends)

\`\`\`php
class Animal {
  public function speak(): string {
    return '...';
  }
}

class Dog extends Animal {
  public function speak(): string {
    return 'woof';
  }
}
\`\`\`

### Tip
Prefer inheritance for true “is-a” relationships. Otherwise use composition.

---

## 6) Interfaces

Interfaces define a contract.

\`\`\`php
interface Logger {
  public function info(string $message): void;
}

class FileLogger implements Logger {
  public function __construct(private string $file) {}

  public function info(string $message): void {
    file_put_contents($this->file, $message . "\n", FILE_APPEND);
  }
}
\`\`\`

---

## 7) Abstract classes

Use when you want shared logic + forced implementation.

\`\`\`php
abstract class BaseController {
  protected function json(array $data): string {
    return json_encode($data);
  }

  abstract public function handle(): string;
}
\`\`\`

---

## 8) Traits

Traits let you reuse method implementations.

\`\`\`php
trait Timestamps {
  public function now(): int {
    return time();
  }
}

class Post {
  use Timestamps;
}
\`\`\`

### Warning
Overusing traits can make code harder to reason about. Prefer composition when possible.

---

## 9) Composition vs inheritance (most important OOP trick)

Instead of extending classes, inject dependencies:

\`\`\`php
class Mailer {
  public function send(string $to, string $msg): void {}
}

class UserService {
  public function __construct(private Mailer $mailer) {}
}
\`\`\`

Benefits:
- Easier testing
- Less coupling

---

## 10) Common mistakes

- Putting lots of logic in constructors
- Making everything public
- Huge classes ("God objects")
- Inheritance where composition fits better
` ,

  contentFa: `
# مبانی شی‌گرایی (PHP مدرن)

OOP کمک می‌کند برنامه را با «شی‌ها» و مسئولیت‌های مشخص مدل کنی. در PHP تقریباً همه فریمورک‌ها و پروژه‌های جدی OOP هستند.

---

## ۱) کلاس و شی

\`\`\`php
<?php

declare(strict_types=1);

class User {
  public function __construct(
    public string $name,
    private string $passwordHash,
  ) {}

  public function verifyPassword(string $password): bool {
    return password_verify($password, $this->passwordHash);
  }
}

$user = new User('Sara', password_hash('secret', PASSWORD_DEFAULT));
var_dump($user->verifyPassword('secret'));
\`\`\`

---

## ۲) سطح دسترسی

- \`public\`: همه‌جا قابل دسترسی
- \`protected\`: داخل کلاس و زیرکلاس‌ها
- \`private\`: فقط داخل همان کلاس

قاعده: وقتی invariant داری، پراپرتی‌ها را private نگه دار و رفتار را با متد ارائه کن.

---

## ۳) متدها و \`$this\`

\`\`\`php
class Counter {
  private int $value = 0;

  public function inc(): void {
    $this->value++;
  }

  public function get(): int {
    return $this->value;
  }
}
\`\`\`

---

## ۴) static (کی استفاده کنیم؟)

\`\`\`php
class Math {
  public static function clamp(int $n, int $min, int $max): int {
    return max($min, min($max, $n));
  }
}
\`\`\`

برای helperهای pure خوب است، اما state استاتیک در اپ‌ها تست را سخت می‌کند.

---

## ۵) ارث‌بری

\`\`\`php
class Animal {
  public function speak(): string {
    return '...';
  }
}

class Dog extends Animal {
  public function speak(): string {
    return 'woof';
  }
}
\`\`\`

اگر واقعاً رابطه «is-a» است استفاده کن؛ در غیر این صورت composition بهتر است.

---

## ۶) اینترفیس

\`\`\`php
interface Logger {
  public function info(string $message): void;
}

class FileLogger implements Logger {
  public function __construct(private string $file) {}

  public function info(string $message): void {
    file_put_contents($this->file, $message . "\n", FILE_APPEND);
  }
}
\`\`\`

---

## ۷) کلاس abstract

\`\`\`php
abstract class BaseController {
  protected function json(array $data): string {
    return json_encode($data);
  }

  abstract public function handle(): string;
}
\`\`\`

---

## ۸) Trait

\`\`\`php
trait Timestamps {
  public function now(): int {
    return time();
  }
}

class Post {
  use Timestamps;
}
\`\`\`

هشدار: اگر بیش از حد trait استفاده کنی کد پیچیده می‌شود.

---

## ۹) Composition در برابر inheritance (ترفند مهم)

به جای extends کردن، dependency را inject کن:

\`\`\`php
class Mailer {
  public function send(string $to, string $msg): void {}
}

class UserService {
  public function __construct(private Mailer $mailer) {}
}
\`\`\`

مزیت‌ها:
- تست ساده‌تر
- coupling کمتر

---

## ۱۰) اشتباهات رایج

- منطق زیاد داخل constructor
- public کردن همه چیز
- کلاس‌های خیلی بزرگ
- استفاده اشتباه از ارث‌بری
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpOopBasicsLesson;
