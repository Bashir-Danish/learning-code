export const phpErrorsExceptionsLesson = {
  id: 'php-errors-exceptions',
  title: 'Errors, Exceptions, and Debugging',
  titleFa: 'خطاها، exceptionها و دیباگ',
  difficulty: 'easy',
  estimatedTime: '50 min',

  content: `
# Errors, Exceptions, and Debugging

To build reliable PHP apps, you need to understand:
- What PHP considers an **error**
- What should be an **exception**
- How to **log** and **debug** without guessing

---

## 1) Errors vs Exceptions (simple mental model)

### Errors
Usually indicate programmer/runtime problems:
- Type errors
- Calling methods on null
- Syntax errors

### Exceptions
Controlled failures that you can catch and handle:
- Validation failures
- Not-found resources
- Business rule violations

---

## 2) Common error types you’ll see

- \`TypeError\`: wrong type passed
- \`ValueError\`: invalid value for a parameter
- \`ParseError\`: syntax error

Example:
\`\`\`php
declare(strict_types=1);

function takesInt(int $x): int { return $x; }
takesInt('1'); // TypeError
\`\`\`

---

## 3) throw / try / catch / finally

\`\`\`php
try {
  if (!$user) {
    throw new RuntimeException('User not found');
  }

  // ... do work
} catch (RuntimeException $e) {
  error_log($e->getMessage());
  // Return an error response, show a friendly message, etc.
} finally {
  // Always runs (cleanup)
}
\`\`\`

### Catch multiple types
\`\`\`php
try {
  // ...
} catch (InvalidArgumentException|RuntimeException $e) {
  // ...
}
\`\`\`

---

## 4) Custom exceptions (best practice)

Create your own exceptions to make errors clearer.

\`\`\`php
class ValidationException extends RuntimeException {}

function assertEmail(string $email): void {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    throw new ValidationException('Invalid email');
  }
}
\`\`\`

---

## 5) Error reporting (dev vs production)

In development:
- show errors (to learn fast)

In production:
- do NOT show internal errors to users
- log them instead

Common settings (conceptual):
- \`display_errors\` (dev only)
- \`log_errors\`
- \`error_log\`

---

## 6) Logging: what to log

Good logs include:
- error message
- request id/user id (if available)
- key inputs (but never passwords/tokens)

\`\`\`php
error_log('Login failed for email=' . $email);
\`\`\`

---

## 7) Debugging toolbox

- \`var_dump()\` / \`print_r()\`
- \`error_log()\`
- Use a debugger (Xdebug) in real projects

---

## 8) Practical tips (tricks)

- Prefer exceptions for business logic, not for normal flow
- Fail fast: validate inputs early
- Don’t swallow exceptions silently (at least log)
- When catching, either handle or rethrow
` ,

  contentFa: `
# خطاها، Exceptionها و دیباگ

برای ساخت برنامه‌های قابل اعتماد باید بدانی:
- Error چیست
- Exception چیست
- چطور لاگ و دیباگ کنی

---

## ۱) Error در برابر Exception

### Error
معمولاً مشکل برنامه‌نویسی/اجرا:
- type error
- صدا زدن متد روی null
- خطای سینتکس

### Exception
شکست کنترل‌شده که می‌توانی catch کنی:
- خطای اعتبارسنجی
- پیدا نشدن resource
- قوانین کسب‌وکار

---

## ۲) خطاهای رایج

- \`TypeError\`
- \`ValueError\`
- \`ParseError\`

مثال:
\`\`\`php
declare(strict_types=1);

function takesInt(int $x): int { return $x; }
takesInt('1');
\`\`\`

---

## ۳) throw / try / catch / finally

\`\`\`php
try {
  if (!$user) {
    throw new RuntimeException('User not found');
  }
} catch (RuntimeException $e) {
  error_log($e->getMessage());
} finally {
  // همیشه اجرا می‌شود (cleanup)
}
\`\`\`

catch چند نوع:
\`\`\`php
try {
  // ...
} catch (InvalidArgumentException|RuntimeException $e) {
  // ...
}
\`\`\`

---

## ۴) Exception سفارشی (بهترین روش)

\`\`\`php
class ValidationException extends RuntimeException {}

function assertEmail(string $email): void {
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    throw new ValidationException('Invalid email');
  }
}
\`\`\`

---

## ۵) Error reporting در dev و production

- در توسعه: خطاها را نمایش بده
- در production: خطاهای داخلی را نمایش نده، لاگ کن

مفاهیم مهم:
- \`display_errors\` (فقط dev)
- \`log_errors\`
- \`error_log\`

---

## ۶) لاگ خوب چیست؟

لاگ خوب شامل:
- پیام خطا
- اطلاعات زمینه (مثل user id) بدون اطلاعات حساس

\`\`\`php
error_log('Login failed for email=' . $email);
\`\`\`

---

## ۷) ابزارهای دیباگ

- \`var_dump()\` / \`print_r()\`
- \`error_log()\`
- در پروژه واقعی: Xdebug

---

## ۸) نکات کاربردی

- برای قوانین کسب‌وکار exception پرتاب کن
- ورودی‌ها را اول validate کن (fail fast)
- exception را بی‌صدا نخور؛ حداقل لاگ کن
- یا handle کن یا دوباره throw کن
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpErrorsExceptionsLesson;
