export const phpAdvancedSolidPatternsLesson = {
  id: 'php-advanced-solid-patterns',
  title: 'Advanced PHP: Architecture, SOLID, and Dependency Injection',
  titleFa: 'PHP پیشرفته: معماری، SOLID و تزریق وابستگی',
  difficulty: 'hard',
  estimatedTime: '100 min',

  content: `
# Advanced PHP: Architecture, SOLID, and Dependency Injection

This lesson is about writing PHP that stays clean when features grow.

---

## 1) The core idea: separate responsibilities

A practical layering:
- **Controllers/handlers**: HTTP input/output only
- **Services (use-cases)**: business rules
- **Repositories**: persistence details (DB)
- **Domain/value objects**: invariants

---

## 2) SOLID in real PHP (not theory)

### S — Single Responsibility
If a class does 3 things, it becomes hard to test.

Bad smell: “UserService” that validates input, queries DB, sends email, formats HTML.

### O — Open/Closed
Extend behavior with new classes instead of editing huge if/else blocks.

### L — Liskov
Subclasses must work anywhere the base class is expected.

### I — Interface Segregation
Prefer small interfaces:

\`\`\`php
interface Logger { public function info(string $m): void; }
interface ErrorLogger { public function error(string $m): void; }
\`\`\`

### D — Dependency Inversion
Depend on abstractions, not concrete details.

---

## 3) Composition over inheritance

Inheritance is rigid. Composition is flexible.

\`\`\`php
final class Mailer {
  public function send(string $to, string $msg): void {}
}

final class UserService {
  public function __construct(private Mailer $mailer) {}
}
\`\`\`

---

## 4) Dependency Injection (manual DI)

You don’t need a container to start:

\`\`\`php
$pdo = new PDO(/*...*/);
$userRepo = new PdoUserRepository($pdo);
$mailer = new Mailer();
$svc = new UserService($userRepo, $mailer);
\`\`\`

This is already DI.

---

## 5) A tiny example: Controller -> Service -> Repository

\`\`\`php
interface UserRepository {
  public function findByEmail(string $email): ?array;
}

final class PdoUserRepository implements UserRepository {
  public function __construct(private PDO $pdo) {}

  public function findByEmail(string $email): ?array {
    $stmt = $this->pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: null;
  }
}

final class AuthService {
  public function __construct(private UserRepository $repo) {}

  public function login(string $email, string $password): bool {
    $user = $this->repo->findByEmail($email);
    if (!$user) return false;
    return password_verify($password, $user['password_hash']);
  }
}
\`\`\`

---

## 6) Common mistakes

- “God services” that do everything
- Using inheritance where composition fits
- Static singletons (hard to test)
- Returning arrays with unknown shape everywhere

---

## Checklist

- Keep boundaries thin (controllers)
- Put rules in services
- Put IO in repositories
- Use interfaces for testability
` ,

  contentFa: `
# PHP پیشرفته: معماری، SOLID و تزریق وابستگی

هدف این درس این است که کد PHP در پروژه‌های بزرگ هم تمیز بماند.

---

## ۱) ایده اصلی: جداسازی مسئولیت‌ها

لایه‌بندی عملی:
- **Controller/Handler**: فقط ورودی/خروجی HTTP
- **Service (Use-case)**: قوانین کسب‌وکار
- **Repository**: جزئیات ذخیره‌سازی (DB)
- **Domain/Value Object**: invariantها

---

## ۲) SOLID در دنیای واقعی

### S — یک مسئولیت
کلاسی که چند کار انجام دهد تست و نگهداری سخت می‌شود.

### O — قابل توسعه بدون تغییر زیاد
به جای if/elseهای بزرگ، کلاس جدید اضافه کن.

### L — لیسکوف
زیرکلاس باید در جای پایه بدون مشکل کار کند.

### I — اینترفیس کوچک

\`\`\`php
interface Logger { public function info(string $m): void; }
interface ErrorLogger { public function error(string $m): void; }
\`\`\`

### D — وابستگی به abstraction

---

## ۳) Composition بهتر از inheritance

\`\`\`php
final class Mailer {
  public function send(string $to, string $msg): void {}
}

final class UserService {
  public function __construct(private Mailer $mailer) {}
}
\`\`\`

---

## ۴) DI به صورت دستی

بدون container هم می‌شود:

\`\`\`php
$pdo = new PDO(/*...*/);
$userRepo = new PdoUserRepository($pdo);
$mailer = new Mailer();
$svc = new UserService($userRepo, $mailer);
\`\`\`

---

## ۵) مثال: Controller -> Service -> Repository

\`\`\`php
interface UserRepository {
  public function findByEmail(string $email): ?array;
}

final class PdoUserRepository implements UserRepository {
  public function __construct(private PDO $pdo) {}

  public function findByEmail(string $email): ?array {
    $stmt = $this->pdo->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: null;
  }
}

final class AuthService {
  public function __construct(private UserRepository $repo) {}

  public function login(string $email, string $password): bool {
    $user = $this->repo->findByEmail($email);
    if (!$user) return false;
    return password_verify($password, $user['password_hash']);
  }
}
\`\`\`

---

## ۶) اشتباهات رایج

- سرویس‌های خیلی بزرگ
- استفاده اشتباه از inheritance
- singleton/static زیاد
- برگشت دادن آرایه‌های بدون shape مشخص

---

## چک‌لیست

- مرزها (controller) را نازک نگه دار
- قوانین را در سرویس بگذار
- IO را در repository بگذار
- برای تست‌پذیری از interface استفاده کن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedSolidPatternsLesson;
