export const laravel12IntroSetupLesson = {
  id: 'laravel-12-intro-setup',
  title: 'Laravel 12: Intro + Installation + First Run',
  titleFa: 'لاراول ۱۲: معرفی + نصب + اجرای اولین پروژه',
  difficulty: 'medium',
  estimatedTime: '170 min',

  content: `
# Laravel 12: Intro + Installation + First Run

Laravel is a full ecosystem for building web apps and APIs.

Laravel 12 is a **minimal-breaking / maintenance-style** major release (officially described in the release notes), focused on dependency updates and new starter kits.

---

---

---

## File Structure

### Fresh Laravel 11/12 Installation

\`\`\`
app/
├── Http/
│   ├── Controllers/
│   │   └── Controller.php
│   └── Middleware/
├── Models/
│   └── User.php
├── Providers/
│   └── AppServiceProvider.php
bootstrap/
├── app.php
└── providers.php
config/
├── app.php
├── auth.php
├── cache.php
├── database.php
├── filesystems.php
├── logging.php
├── mail.php
├── queue.php
├── services.php
└── session.php
database/
├── factories/
│   └── UserFactory.php
├── migrations/
│   ├── 0001_01_01_000000_create_users_table.php
│   ├── 0001_01_01_000001_create_cache_table.php
│   └── 0001_01_01_000002_create_jobs_table.php
└── seeders/
    └── DatabaseSeeder.php
public/
├── index.php
└── .htaccess
resources/
├── css/
├── js/
└── views/
    └── welcome.blade.php
routes/
├── console.php
└── web.php
storage/
├── app/
├── framework/
└── logs/
tests/
├── Feature/
│   └── ExampleTest.php
└── Unit/
    └── ExampleTest.php
.env
.env.example
.gitignore
artisan
composer.json
package.json
phpunit.xml
vite.config.js
\`\`\`

### Directory Explanations

- \`app/\`: Core application code (models, controllers, middleware, providers)
- \`app/Http/\`: HTTP layer (controllers, middleware, requests, resources)
- \`app/Http/Controllers/\`: Controller classes for handling requests
- \`app/Http/Middleware/\`: Custom middleware for request filtering
- \`app/Models/\`: Eloquent model classes representing database tables
- \`app/Providers/\`: Service providers for bootstrapping application services
- \`bootstrap/\`: Application bootstrapping files
- \`bootstrap/app.php\`: Application builder configuration (Laravel 11 new pattern)
- \`config/\`: Configuration files for various services
- \`database/\`: Database-related files (migrations, seeders, factories)
- \`database/factories/\`: Model factories for generating test data
- \`database/migrations/\`: Database schema migrations
- \`database/seeders/\`: Database seeders for populating data
- \`public/\`: Publicly accessible files (entry point, assets)
- \`public/index.php\`: Application entry point
- \`resources/\`: Views, raw assets (CSS, JS)
- \`routes/\`: Route definitions
- \`routes/web.php\`: Web routes (session, CSRF protection)
- \`routes/console.php\`: Artisan console commands
- \`storage/\`: Application storage (logs, cache, uploads)
- \`tests/\`: Automated tests
- \`.env\`: Environment configuration (not in version control)
- \`artisan\`: Command-line interface
- \`composer.json\`: PHP dependencies

### Laravel 11 Structural Changes

**Application Structure**: Streamlined application structure with fewer default files

Laravel 11 removes several default files and middleware, making the initial structure cleaner

**API Routes**: API routes are now optional and not included by default

You need to explicitly install API routes using php artisan install:api

**Service Providers**: Simplified service provider registration

AppServiceProvider is now the primary service provider, others are optional

**Middleware**: Reduced default middleware

Many middleware are now optional and can be added as needed

**Application Builder**: New application builder pattern

bootstrap/app.php now uses a fluent builder pattern for configuration



---

## Core Concepts

[This section will be enhanced with detailed explanations and multiple code examples]

### Basic Example

\`\`\`php
<?php
// Basic example code
\`\`\`

### Advanced Example

\`\`\`php
<?php
// Advanced example code
\`\`\`



---

## Tricks & Tips

### Tip 1: Use Laravel Helpers

Laravel provides many helper functions that simplify common tasks.

\`\`\`php
// Example helper usage
\`\`\`

**Why this works:** Helpers are optimized and tested.

**When to use:** For common operations like array manipulation, string formatting.



---

## Best Practices

### Use Environment Variables

Store all environment-specific and sensitive configuration in .env

**Reasoning:** Keeps configuration separate from code, improves security

\`\`\`php
// Good example
\`\`\`

❌ **Avoid:**
\`\`\`php
// Bad example
\`\`\`

### Follow PSR-12 Coding Standards

Use consistent code formatting and naming conventions

**Reasoning:** Improves code readability and maintainability

\`\`\`php
// Good example
\`\`\`

❌ **Avoid:**
\`\`\`php
// Bad example
\`\`\`

### Use Eloquent ORM

Prefer Eloquent over raw SQL queries

**Reasoning:** Provides security (SQL injection protection), readability, and maintainability

\`\`\`php
// Good example
\`\`\`

❌ **Avoid:**
\`\`\`php
// Bad example
\`\`\`



---

## Common Mistakes

### Mistake: Not configuring database in .env

**Problem:** Application cannot connect to database without proper credentials

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Always configure DB_CONNECTION, DB_DATABASE, DB_USERNAME, and DB_PASSWORD in .env file

### Mistake: Not generating application key

**Problem:** Laravel uses APP_KEY for encryption and sessions

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Run php artisan key:generate after installation

### Mistake: Mixing dev dependencies into production

**Problem:** Increases deployment size and potential security risks

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Use composer install --no-dev in production

### Mistake: Committing .env file to version control

**Problem:** Exposes sensitive credentials and environment-specific configuration

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Keep .env in .gitignore, use .env.example as template

### Mistake: Not using environment variables for sensitive data

**Problem:** Hardcoded credentials are security risks

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Always use env() helper for sensitive configuration



---

## Advanced Topics

### Advanced Pattern 1

[Detailed explanation for advanced users]

\`\`\`php
// Advanced code example
\`\`\`



---

## Testing Strategies

### Feature Tests

\`\`\`php
// Feature test example
\`\`\`

### Unit Tests

\`\`\`php
// Unit test example
\`\`\`



---

## Performance Considerations

- Use eager loading to avoid N+1 queries
- Cache frequently accessed data
- Use database indexes appropriately
- Optimize query complexity



---

## Security Considerations

- Always use environment variables for sensitive data
- Validate and sanitize user input
- Use Laravel's built-in security features (CSRF, XSS protection)
- Implement proper authentication and authorization



---

## Related Topics

- [Laravel Official Documentation](https://laravel.com/docs)
- [Laravel News](https://laravel-news.com)
- [Laracasts](https://laracasts.com)


`,

  contentFa: `


# Laravel 12: Intro + Installation + First Run

Laravel is a full ecosystem for building web apps and APIs.

Laravel 12 is a **minimal-breaking / maintenance-style** major release (officially described in the release notes), focused on dependency updates and new starter kits.

---

---

---


---

## ساختار فایل



---

### Fresh Laravel 11/12 Installation


\`\`\`
app/
├── Http/
│   ├── Controllers/
│   │   └── Controller.php
│   └── Middleware/
├── Models/
│   └── User.php
├── Providers/
│   └── AppServiceProvider.php
bootstrap/
├── app.php
└── providers.php
config/
├── app.php
├── auth.php
├── cache.php
├── database.php
├── filesystems.php
├── logging.php
├── mail.php
├── queue.php
├── services.php
└── session.php
database/
├── factories/
│   └── UserFactory.php
├── migrations/
│   ├── 0001_01_01_000000_create_users_table.php
│   ├── 0001_01_01_000001_create_cache_table.php
│   └── 0001_01_01_000002_create_jobs_table.php
└── seeders/
    └── DatabaseSeeder.php
public/
├── index.php
└── .htaccess
resources/
├── css/
├── js/
└── views/
    └── welcome.blade.php
routes/
├── console.php
└── web.php
storage/
├── app/
├── framework/
└── logs/
tests/
├── Feature/
│   └── ExampleTest.php
└── Unit/
    └── ExampleTest.php
.env
.env.example
.gitignore
artisan
composer.json
package.json
phpunit.xml
vite.config.js
\`\`\`


---

### Directory Explanations


- \`app/\`: Core application code (models, controllers, middleware, providers)
- \`app/Http/\`: HTTP layer (controllers, middleware, requests, resources)
- \`app/Http/Controllers/\`: Controller classes for handling requests
- \`app/Http/Middleware/\`: Custom middleware for request filtering
- \`app/Models/\`: Eloquent model classes representing database tables
- \`app/Providers/\`: Service providers for bootstrapping application services
- \`bootstrap/\`: Application bootstrapping files
- \`bootstrap/app.php\`: Application builder configuration (Laravel 11 new pattern)
- \`config/\`: Configuration files for various services
- \`database/\`: Database-related files (migrations, seeders, factories)
- \`database/factories/\`: Model factories for generating test data
- \`database/migrations/\`: Database schema migrations
- \`database/seeders/\`: Database seeders for populating data
- \`public/\`: Publicly accessible files (entry point, assets)
- \`public/index.php\`: Application entry point
- \`resources/\`: Views, raw assets (CSS, JS)
- \`routes/\`: Route definitions
- \`routes/web.php\`: Web routes (session, CSRF protection)
- \`routes/console.php\`: Artisan console commands
- \`storage/\`: Application storage (logs, cache, uploads)
- \`tests/\`: Automated tests
- \`.env\`: Environment configuration (not in version control)
- \`artisan\`: Command-line interface
- \`composer.json\`: PHP dependencies


---

### Laravel 11 Structural Changes


**Application Structure**: Streamlined application structure with fewer default files

Laravel 11 removes several default files and middleware, making the initial structure cleaner

**API Routes**: API routes are now optional and not included by default

You need to explicitly install API routes using php artisan install:api

**Service Providers**: Simplified service provider registration

AppServiceProvider is now the primary service provider, others are optional

**Middleware**: Reduced default middleware

Many middleware are now optional and can be added as needed

**Application Builder**: New application builder pattern

bootstrap/app.php now uses a fluent builder pattern for configuration



---


---

## مفاهیم اصلی


[This section will be enhanced with detailed explanations and multiple code examples]


---

### Basic Example


\`\`\`php
<?php
// Basic example code
\`\`\`


---

### Advanced Example


\`\`\`php
<?php
// Advanced example code
\`\`\`



---


---

## ترفندها و نکات



---

### Tip 1: Use Laravel Helpers


Laravel provides many helper functions that simplify common tasks.

\`\`\`php
// Example helper usage
\`\`\`

**Why this works:** Helpers are optimized and tested.

**When to use:** For common operations like array manipulation, string formatting.



---


---

## بهترین روش‌ها



---

### Use Environment Variables


Store all environment-specific and sensitive configuration in .env

**Reasoning:** Keeps configuration separate from code, improves security

\`\`\`php
// Good example
\`\`\`

❌ **Avoid:**
\`\`\`php
// Bad example
\`\`\`


---

### Follow PSR-12 Coding Standards


Use consistent code formatting and naming conventions

**Reasoning:** Improves code readability and maintainability

\`\`\`php
// Good example
\`\`\`

❌ **Avoid:**
\`\`\`php
// Bad example
\`\`\`


---

### Use Eloquent ORM


Prefer Eloquent over raw SQL queries

**Reasoning:** Provides security (SQL injection protection), readability, and maintainability

\`\`\`php
// Good example
\`\`\`

❌ **Avoid:**
\`\`\`php
// Bad example
\`\`\`



---


---

## اشتباهات رایج



---

### Mistake: Not configuring database in .env


**Problem:** Application cannot connect to database without proper credentials

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Always configure DB_CONNECTION, DB_DATABASE, DB_USERNAME, and DB_PASSWORD in .env file


---

### Mistake: Not generating application key


**Problem:** Laravel uses APP_KEY for encryption and sessions

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Run php artisan key:generate after installation


---

### Mistake: Mixing dev dependencies into production


**Problem:** Increases deployment size and potential security risks

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Use composer install --no-dev in production


---

### Mistake: Committing .env file to version control


**Problem:** Exposes sensitive credentials and environment-specific configuration

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Keep .env in .gitignore, use .env.example as template


---

### Mistake: Not using environment variables for sensitive data


**Problem:** Hardcoded credentials are security risks

❌ **Incorrect:**
\`\`\`php
// Wrong approach
\`\`\`

✅ **Correct:**
\`\`\`php
// Right approach
\`\`\`

**Solution:** Always use env() helper for sensitive configuration



---


---

## موضوعات پیشرفته



---

### Advanced Pattern 1


[Detailed explanation for advanced users]

\`\`\`php
// Advanced code example
\`\`\`



---


---

## استراتژی‌های تست



---

### Feature Tests


\`\`\`php
// Feature test example
\`\`\`


---

### Unit Tests


\`\`\`php
// Unit test example
\`\`\`



---


---

## ملاحظات عملکرد


- Use eager loading to avoid N+1 queries
- Cache frequently accessed data
- Use database indexes appropriately
- Optimize query complexity



---


---

## ملاحظات امنیتی


- Always use environment variables for sensitive data
- Validate and sanitize user input
- Use Laravel's built-in security features (CSRF, XSS protection)
- Implement proper authentication and authorization



---


---

## موضوعات مرتبط


- [Laravel Official Documentation](https://laravel.com/docs)
- [Laravel News](https://laravel-news.com)
- [Laracasts](https://laracasts.com)


`,

  hasVisualization: false,
  hasExercise: false,
};

export default laravel12IntroSetupLesson;
