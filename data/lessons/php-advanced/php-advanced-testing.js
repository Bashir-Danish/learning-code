export const phpAdvancedTestingLesson = {
  id: 'php-advanced-testing',
  title: 'Advanced PHP: Testing Strategy (Unit, Integration, DB)',
  titleFa: 'PHP پیشرفته: استراتژی تست (یونیت، یکپارچه، دیتابیس)',
  difficulty: 'hard',
  estimatedTime: '95 min',

  content: `
# Advanced PHP: Testing Strategy (Unit, Integration, DB)

In serious PHP projects, tests are what keep refactors safe.

---

## 1) Test pyramid (practical)

- **Unit tests**: fast, isolated, many
- **Integration tests**: slower, verify boundaries (DB, filesystem)
- **E2E tests**: slowest, few

---

## 2) Make code testable (design rule)

If a service depends on global state (\`$_POST\`, \`time()\`, static singletons), testing becomes painful.

Prefer dependency injection:

\`\`\`php
final class Clock {
  public function now(): DateTimeImmutable {
    return new DateTimeImmutable('now');
  }
}
\`\`\`

---

## 3) PHPUnit essentials (data providers)

\`\`\`php
use PHPUnit\Framework\TestCase;

final class PriceTest extends TestCase {
  /**
   * @dataProvider providePrices
   */
  public function testToCents(float $price, int $expected): void {
    $this->assertSame($expected, (int) round($price * 100));
  }

  public static function providePrices(): array {
    return [
      [10.0, 1000],
      [0.99, 99],
    ];
  }
}
\`\`\`

---

## 4) Mocking (use sparingly)

Mock at boundaries:
- email sender
- HTTP client
- external APIs

Avoid mocking everything; it can test implementation instead of behavior.

---

## 5) Integration testing a DB transaction pattern

A simple pattern:
- begin transaction at test start
- rollback at end

\`\`\`php
final class DbTestCase extends TestCase {
  protected PDO $pdo;

  protected function setUp(): void {
    $this->pdo = new PDO(/*...*/);
    $this->pdo->beginTransaction();
  }

  protected function tearDown(): void {
    $this->pdo->rollBack();
  }
}
\`\`\`

---

## 6) What to test (priority)

- business rules
- edge cases
- security checks
- bug regressions (write a test when you fix a bug)

---

## Checklist

- Unit tests for services
- Integration tests for DB/repositories
- Avoid globals in core logic
- Add tests for fixed bugs
` ,

  contentFa: `
# PHP پیشرفته: استراتژی تست (یونیت، یکپارچه، دیتابیس)

در پروژه‌های جدی، تست‌ها باعث می‌شوند refactor امن باشد.

---

## ۱) هرم تست (عملی)

- **Unit**: سریع و زیاد
- **Integration**: کندتر، برای مرزها (DB، فایل)
- **E2E**: خیلی کند، کم

---

## ۲) کد را تست‌پذیر طراحی کن

وابستگی به globalها مثل \`$_POST\` یا singleton باعث سختی تست می‌شود.

DI را ترجیح بده.

---

## ۳) PHPUnit و Data Provider

\`\`\`php
use PHPUnit\Framework\TestCase;

final class PriceTest extends TestCase {
  /**
   * @dataProvider providePrices
   */
  public function testToCents(float $price, int $expected): void {
    $this->assertSame($expected, (int) round($price * 100));
  }

  public static function providePrices(): array {
    return [
      [10.0, 1000],
      [0.99, 99],
    ];
  }
}
\`\`\`

---

## ۴) Mocking (با احتیاط)

Mock را برای مرزها استفاده کن:
- ارسال ایمیل
- HTTP client
- API خارجی

---

## ۵) تست یکپارچه دیتابیس با rollback

\`\`\`php
final class DbTestCase extends TestCase {
  protected PDO $pdo;

  protected function setUp(): void {
    $this->pdo = new PDO(/*...*/);
    $this->pdo->beginTransaction();
  }

  protected function tearDown(): void {
    $this->pdo->rollBack();
  }
}
\`\`\`

---

## ۶) چی را تست کنیم؟

- قوانین کسب‌وکار
- edge caseها
- چک‌های امنیتی
- باگ‌هایی که حل می‌کنی (Regression test)

---

## چک‌لیست

- یونیت تست برای سرویس‌ها
- integration تست برای repositoryها
- دوری از globalها در منطق اصلی
- برای باگ‌ها تست اضافه کن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedTestingLesson;
