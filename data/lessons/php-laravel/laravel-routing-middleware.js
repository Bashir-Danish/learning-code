export const laravelRoutingMiddlewareLesson = {
  id: 'laravel-routing-middleware',
  title: 'Laravel Routing: api.php, Route Model Binding, Middleware',
  titleFa: 'مسیربندی در لاراول: api.php، Route Model Binding، Middleware',
  difficulty: 'hard',
  estimatedTime: '248 min',

  content: `
# Laravel Routing: api.php, Route Model Binding, Middleware

Routing is the entry point for every request.

---

---

---

## File Structure

### Routing Files

\`\`\`
routes/
├── api.php
├── console.php
└── web.php
\`\`\`

### Directory Explanations

- \`routes/api.php\`: API routes (stateless, token-based auth, no CSRF). Install with: php artisan install:api


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


# Laravel Routing: api.php, Route Model Binding, Middleware

Routing is the entry point for every request.

---

---

---


---

## ساختار فایل



---

### Routing Files


\`\`\`
routes/
├── api.php
├── console.php
└── web.php
\`\`\`


---

### Directory Explanations


- \`routes/api.php\`: API routes (stateless, token-based auth, no CSRF). Install with: php artisan install:api


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

export default laravelRoutingMiddlewareLesson;
