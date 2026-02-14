export const phpAdvancedCachingOpcacheLesson = {
  id: 'php-advanced-caching-opcache',
  title: 'Advanced PHP: Caching + OPcache + HTTP Cache',
  titleFa: 'PHP پیشرفته: کش + OPcache + کش HTTP',
  difficulty: 'hard',
  estimatedTime: '90 min',

  content: `
# Advanced PHP: Caching + OPcache + HTTP Cache

Caching is one of the biggest performance levers in PHP apps.

---

## 1) Types of caching

- **Opcode cache (OPcache)**: caches compiled PHP bytecode
- **Application cache**: caches computed results
- **HTTP cache**: browser/CDN caching

---

## 2) OPcache (what it does)

Without OPcache:
- PHP parses and compiles on every request

With OPcache:
- compiled bytecode is reused

In production, OPcache should usually be enabled.

---

## 3) Application caching (concept)

Cache expensive operations:
- complex DB queries
- API calls

Key design:
- define cache keys
- define TTL
- define invalidation strategy

---

## 4) HTTP caching (simple rules)

Use headers:
- \`Cache-Control\`
- \`ETag\`

Example:
\`\`\`php
header('Cache-Control: public, max-age=60');
\`\`\`

---

## 5) Common mistakes

- caching without invalidation
- caching user-private data publicly
- giant cache keys and unbounded growth

---

## Checklist

- OPcache enabled in production
- cache expensive work
- don’t cache secrets
- plan invalidation
` ,

  contentFa: `
# PHP پیشرفته: کش + OPcache + کش HTTP

کش یکی از بزرگ‌ترین اهرم‌های عملکرد در PHP است.

---

## ۱) انواع کش

- **OPcache**: کش بایت‌کد کامپایل شده
- **کش اپلیکیشن**
- **کش HTTP**

---

## ۲) OPcache چیست؟

با OPcache، PHP لازم نیست هر بار دوباره compile کند.

---

## ۳) کش اپلیکیشن

- key مشخص
- TTL مشخص
- strategy برای invalidation

---

## ۴) کش HTTP

\`\`\`php
header('Cache-Control: public, max-age=60');
\`\`\`

---

## ۵) اشتباهات رایج

- کش بدون invalidation
- کش داده خصوصی به شکل عمومی
- رشد بی‌نهایت کش

---

## چک‌لیست

- OPcache در production
- کش کارهای سنگین
- عدم کش secrets
- invalidation مشخص
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedCachingOpcacheLesson;
