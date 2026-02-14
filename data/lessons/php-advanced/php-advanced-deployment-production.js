export const phpAdvancedDeploymentProductionLesson = {
  id: 'php-advanced-deployment-production',
  title: 'Advanced PHP: Deployment & Production Checklist',
  titleFa: 'PHP پیشرفته: دیپلوی و چک‌لیست Production',
  difficulty: 'hard',
  estimatedTime: '85 min',

  content: `
# Advanced PHP: Deployment & Production Checklist

This lesson is about avoiding common production failures.

---

## 1) Environment configuration

Never hardcode secrets.

Common patterns:
- environment variables
- separate configs for dev/stage/prod

---

## 2) PHP settings (high level)

Production mindset:
- \`display_errors=0\`
- \`log_errors=1\`
- OPcache enabled

---

## 3) Permissions & file paths

- use absolute paths (\`__DIR__\`)
- avoid writing into source folders
- ensure uploads/log dirs are writable

---

## 4) Dependencies

- use Composer
- lock versions
- run \`composer install --no-dev\` in production

---

## 5) Database migrations

- run migrations as a controlled step
- never auto-migrate in every request

---

## 6) Monitoring

- health endpoint
- log aggregation concept
- alerts on error rate

---

## 7) Rollback strategy

Always know how to rollback:
- previous release artifact
- DB rollback plan

---

## Checklist

- secrets outside code
- errors not displayed to users
- logs enabled
- OPcache on
- migrations controlled
- monitoring + rollback plan
` ,

  contentFa: `
# PHP پیشرفته: دیپلوی و چک‌لیست Production

هدف: جلوگیری از خطاهای رایج در محیط واقعی.

---

## ۱) تنظیمات محیط

- secret را هاردکد نکن
- env var / config جدا

---

## ۲) تنظیمات PHP در production

- نمایش خطا خاموش
- لاگ روشن
- OPcache روشن

---

## ۳) Permission و مسیرها

- \`__DIR__\`
- پوشه uploads/log قابل نوشتن

---

## ۴) وابستگی‌ها

- Composer
- lock version
- نصب بدون dev

---

## ۵) Migration

- مرحله کنترل‌شده
- نه در هر request

---

## ۶) Monitoring

- health endpoint
- alert

---

## ۷) Rollback

- نسخه قبلی
- برنامه DB

---

## چک‌لیست

- secret خارج از کد
- خطا برای کاربر نمایش داده نشود
- لاگ فعال
- OPcache
- migration کنترل‌شده
- monitoring و rollback
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedDeploymentProductionLesson;
