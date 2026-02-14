export const phpAdvancedAuthSessionsJwtLesson = {
  id: 'php-advanced-auth-sessions-jwt',
  title: 'Advanced PHP: Auth (Sessions vs JWT) + Secure Flows',
  titleFa: 'PHP پیشرفته: احراز هویت (Session در برابر JWT) + جریان‌های امن',
  difficulty: 'hard',
  estimatedTime: '120 min',

  content: `
# Advanced PHP: Auth (Sessions vs JWT) + Secure Flows

Auth is not just "login". It’s about secure state, revocation, and safe recovery.

---

## 1) Sessions vs JWT (decision table)

### Sessions
Good for:
- classic web apps
- server-rendered apps
- simple security

Tradeoffs:
- state stored server-side

### JWT
Good for:
- APIs used by multiple clients
- stateless scaling

Tradeoffs:
- revocation is harder
- token leakage is dangerous

---

## 2) Session hardening (must-do)

\`\`\`php
session_start();

// After successful login
session_regenerate_id(true);
$_SESSION['user_id'] = $userId;
\`\`\`

Cookie flags are set in php.ini or setcookie usage.

---

## 3) Password policy (practical)

- always store \`password_hash\`
- verify with \`password_verify\`
- add rate limiting on login

---

## 4) Password reset flow (secure)

Never email passwords.

Safe pattern:
1. User requests reset
2. Generate random token
3. Store **hashed token** + expiry in DB
4. Email link with raw token
5. On reset: compare hashes, rotate token

\`\`\`php
$token = bin2hex(random_bytes(32));
$tokenHash = hash('sha256', $token);
\`\`\`

---

## 5) JWT basics (concept)

JWT contains claims.
Rules:
- keep access token short-lived
- use refresh tokens if needed
- rotate refresh tokens

---

## 6) Authorization (capabilities)

Auth != authorization.

Check permissions at boundaries:
- "can edit this post?"
- "is admin?"

---

## Common mistakes

- storing JWT in localStorage (XSS risk)
- long-lived access tokens
- not regenerating session id
- no rate limiting
` ,

  contentFa: `
# PHP پیشرفته: احراز هویت (Session در برابر JWT) + جریان‌های امن

Auth فقط لاگین نیست؛ مدیریت state، ابطال و بازیابی امن هم هست.

---

## ۱) Session در برابر JWT

### Session
مناسب برای وب‌اپ‌های کلاسیک.

### JWT
مناسب برای APIهای چندکلاینت.

نکته: ابطال JWT سخت‌تر است.

---

## ۲) سخت‌سازی سشن

\`\`\`php
session_start();

session_regenerate_id(true);
$_SESSION['user_id'] = $userId;
\`\`\`

---

## ۳) پسورد

- \`password_hash\`
- \`password_verify\`
- rate limiting

---

## ۴) Reset password (امن)

1) درخواست
2) توکن رندوم
3) ذخیره هش توکن + انقضا
4) ایمیل لینک
5) مقایسه هش و چرخش توکن

\`\`\`php
$token = bin2hex(random_bytes(32));
$tokenHash = hash('sha256', $token);
\`\`\`

---

## ۵) JWT (مفهومی)

- access token کوتاه
- refresh token + rotation

---

## ۶) Authorization

Auth != مجوز.

---

## اشتباهات رایج

- نگهداری JWT در localStorage
- access token طولانی
- regenerate نکردن session id
- نبود rate limiting
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedAuthSessionsJwtLesson;
