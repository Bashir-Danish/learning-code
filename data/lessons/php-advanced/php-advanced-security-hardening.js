export const phpAdvancedSecurityHardeningLesson = {
  id: 'php-advanced-security-hardening',
  title: 'Advanced PHP: Security Hardening (Beyond Basics)',
  titleFa: 'PHP پیشرفته: سخت‌سازی امنیت (فراتر از مبانی)',
  difficulty: 'hard',
  estimatedTime: '110 min',

  content: `
# Advanced PHP: Security Hardening (Beyond Basics)

You already know SQLi/XSS/CSRF basics. Here we focus on the *production mindset*.

---

## 1) Input validation vs output escaping

- **Validate input** at boundaries (HTTP)
- **Escape output** at the last moment (HTML)

\`\`\`php
echo htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
\`\`\`

---

## 2) Authentication hardening

### Password storage
- use \`password_hash\`
- verify with \`password_verify\`
- use rehashing when algorithms change

### Session safety
- regenerate id on login
- use secure cookie flags
- short session lifetime for sensitive apps

---

## 3) File uploads (the dangerous area)

Rules:
- never trust filename
- validate MIME by content if possible
- store outside public web root
- generate random filenames

\`\`\`php
$ext = pathinfo($_FILES['f']['name'], PATHINFO_EXTENSION);
$safeName = bin2hex(random_bytes(16)) . '.' . $ext;
\`\`\`

---

## 4) HTTP security headers (concept)

Typical headers:
- \`Content-Security-Policy\`
- \`X-Content-Type-Options: nosniff\`
- \`X-Frame-Options\`
- \`Referrer-Policy\`

(Exact policy depends on your app.)

---

## 5) Rate limiting (app-level)

Even simple rules help:
- limit login attempts per IP/email
- introduce delays
- lock account temporarily

---

## 6) Secrets management

- never commit secrets
- use environment variables
- separate dev/staging/prod configs

---

## 7) Logging sensitive data

Never log:
- passwords
- tokens
- full credit cards

Log:
- request id
- user id
- action + result

---

## Checklist

- Prepared statements everywhere
- Escape HTML output
- Use CSRF tokens
- Harden sessions
- Secure file uploads
- Use security headers
- Don’t log secrets
` ,

  contentFa: `
# PHP پیشرفته: سخت‌سازی امنیت (فراتر از مبانی)

اینجا تمرکز روی ذهنیت production است.

---

## ۱) Validation ورودی و Escaping خروجی

- ورودی را در مرزها validate کن
- خروجی را در آخرین لحظه escape کن

\`\`\`php
echo htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
\`\`\`

---

## ۲) سخت‌سازی احراز هویت

- ذخیره پسورد با \`password_hash\`
- بررسی با \`password_verify\`
- rehash هنگام تغییر الگوریتم

امنیت سشن:
- بعد از login: \`session_regenerate_id(true)\`
- cookie flagهای امن

---

## ۳) آپلود فایل (خطرناک)

قواعد:
- به filename اعتماد نکن
- نوع فایل را بررسی کن
- خارج از public ذخیره کن
- اسم فایل رندوم بساز

\`\`\`php
$ext = pathinfo($_FILES['f']['name'], PATHINFO_EXTENSION);
$safeName = bin2hex(random_bytes(16)) . '.' . $ext;
\`\`\`

---

## ۴) Security Headerها (مفهومی)

- CSP
- nosniff
- X-Frame-Options
- Referrer-Policy

---

## ۵) Rate limiting

- محدودیت تلاش لاگین
- تاخیر
- قفل موقت

---

## ۶) مدیریت Secret

- secret را کامیت نکن
- env var استفاده کن
- تنظیمات dev/stage/prod جدا

---

## ۷) لاگ کردن اطلاعات حساس

هرگز لاگ نکن:
- پسورد
- توکن

لاگ کن:
- request id
- user id
- نتیجه عملیات

---

## چک‌لیست

- Prepared statement همه‌جا
- escape خروجی HTML
- توکن CSRF
- سشن امن
- آپلود امن
- headerهای امنیتی
- عدم لاگ secrets
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedSecurityHardeningLesson;
