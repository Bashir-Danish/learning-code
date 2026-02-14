export const phpComposerPsrTestingLesson = {
  id: 'php-composer-psr-testing',
  title: 'Composer, PSR, Autoloading, Testing',
  titleFa: 'Composer، PSR، Autoloading، تست',
  difficulty: 'medium',
  estimatedTime: '75 min',

  content: `
# Composer, PSR, Autoloading, Testing

This lesson is about writing PHP like a professional project:
- manage dependencies with Composer
- standardize code with PSR
- autoload classes with PSR-4
- write tests (intro)

---

## 1) Composer basics

Composer is PHP’s dependency manager.

Common commands:
\`\`\`bash
composer init
composer require monolog/monolog
composer install
composer update
\`\`\`

---

## 2) composer.json (minimal example)

\`\`\`json
{
  "require": {
    "monolog/monolog": "^3.0"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  },
  "require-dev": {
    "phpunit/phpunit": "^10.0"
  }
}
\`\`\`

After changing autoload, run:
\`\`\`bash
composer dump-autoload
\`\`\`

---

## 3) PSR-4 autoloading (how it maps)

If you have:
- Namespace: \`App\\Services\`
- Folder: \`src/Services\`

Then Composer can autoload:\
\`src/Services/UserService.php\` -> \`App\\Services\\UserService\`

Example file \`src/Services/UserService.php\`:
\`\`\`php
<?php

namespace App\Services;

final class UserService {
  public function hello(): string {
    return 'hi';
  }
}
\`\`\`

Bootstrap:\
\`\`\`php
<?php

require __DIR__ . '/vendor/autoload.php';

$svc = new \App\Services\UserService();
echo $svc->hello();
\`\`\`

---

## 4) PSR standards (what matters most)

- **PSR-12**: formatting style (indentation, braces, spacing)
- **PSR-4**: autoloading standard

Don’t try to memorize everything. Just use a formatter/linter.

---

## 5) Testing intro (PHPUnit)

Minimal test example:

\`\`\`php
<?php

use PHPUnit\Framework\TestCase;

final class MathTest extends TestCase {
  public function testAdd(): void {
    $this->assertSame(5, 2 + 3);
  }
}
\`\`\`

Run tests:
\`\`\`bash
vendor/bin/phpunit
\`\`\`

---

## Practical tips
- Keep dependencies minimal
- Autoload everything, avoid manual require chains
- Write tests for business logic (not just controllers)
` ,

  contentFa: `
# Composer، PSR، Autoloading، تست

این درس برای پروژه‌نویسی حرفه‌ای است:
- مدیریت وابستگی با Composer
- استانداردسازی با PSR
- autoload کردن کلاس‌ها با PSR-4
- مقدمه تست

---

## ۱) Composer (مقدماتی)

کامندهای رایج:
\`\`\`bash
composer init
composer require monolog/monolog
composer install
composer update
\`\`\`

---

## ۲) composer.json (نمونه)

\`\`\`json
{
  "require": {
    "monolog/monolog": "^3.0"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  },
  "require-dev": {
    "phpunit/phpunit": "^10.0"
  }
}
\`\`\`

بعد از تغییر autoload:
\`\`\`bash
composer dump-autoload
\`\`\`

---

## ۳) PSR-4 autoloading (نقشه namespace به پوشه)

مثلاً:
- Namespace: \`App\\Services\`
- Folder: \`src/Services\`

پس فایل:\
\`src/Services/UserService.php\` -> \`App\\Services\\UserService\`

\`src/Services/UserService.php\`:
\`\`\`php
<?php

namespace App\Services;

final class UserService {
  public function hello(): string {
    return 'hi';
  }
}
\`\`\`

Bootstrap:
\`\`\`php
<?php

require __DIR__ . '/vendor/autoload.php';

$svc = new \App\Services\UserService();
echo $svc->hello();
\`\`\`

---

## ۴) استانداردهای PSR

- **PSR-12**: استایل کدنویسی
- **PSR-4**: autoloading

حفظ کردن همه جزئیات لازم نیست؛ formatter/linter استفاده کن.

---

## ۵) مقدمه تست (PHPUnit)

\`\`\`php
<?php

use PHPUnit\Framework\TestCase;

final class MathTest extends TestCase {
  public function testAdd(): void {
    $this->assertSame(5, 2 + 3);
  }
}
\`\`\`

اجرا:
\`\`\`bash
vendor/bin/phpunit
\`\`\`

---

## نکات عملی
- وابستگی‌ها را کم نگه دار
- require دستی زیاد نکن؛ autoload را استفاده کن
- تست را برای منطق اصلی بنویس
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpComposerPsrTestingLesson;
