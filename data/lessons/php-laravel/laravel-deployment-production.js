export const laravelDeploymentProductionLesson = {
  id: 'laravel-deployment-production',
  title: 'Deployment + Production: Config Cache, Queues, Supervisor, Zero Downtime',
  titleFa: 'دیپلوی و Production: کش کانفیگ، صف‌ها، supervisor، بدون downtime',
  difficulty: 'hard',
  estimatedTime: '280 min',

  content: `
# Deployment + Production in Laravel

Laravel apps are easy to run locally and easy to break in production if you skip operational basics.

This lesson is a practical checklist.

---

## 1) Environment safety

Minimum production settings:
- APP_ENV=production
- APP_DEBUG=false
- correct APP_URL
- strong APP_KEY

Never commit secrets.

---

## 2) Build pipeline overview

Typical steps:
- install PHP dependencies (composer install)
- install JS dependencies (npm ci)
- build assets (npm run build)
- run migrations
- restart workers

---

## 3) Artisan commands commonly used

\`\`\`bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
\`\`\`

Notes:
- only cache config/routes if your app supports it (dynamic routes may not)

---

## 4) Queue workers in production

Queues must be supervised. Do not run queue:work in a terminal and hope it stays alive.

Common approaches:
- Supervisor
- systemd
- Laravel Horizon (redis)

---

## 5) Zero-downtime deployments (concept)

Goals:
- no broken state during deploy
- safe migrations
- no lost jobs

Practical techniques:
- deploy to a new release directory, then switch symlink
- run migrations that are backward compatible
- restart queue workers after new code is live

---

## 6) Storage and symlinks

If you use the public disk:
\`\`\`bash
php artisan storage:link
\`\`\`

Make sure shared storage persists across releases.

---

## 7) Observability

Production needs:
- logs and log shipping
- error tracking (Sentry etc)
- uptime checks
- queue monitoring

---

## 8) Security checklist

- HTTPS
- secure cookies
- proper CORS for APIs
- rate limiting on public endpoints
- rotate secrets if leaked

---

## Common mistakes

- APP_DEBUG left true
- running queue workers without a supervisor
- running migrations without --force and without planning
- non-backward-compatible migrations in zero-downtime deploy
- forgetting to restart workers (old code keeps running)
` ,

  contentFa: `
# دیپلوی و Production در لاراول

لاراول در لوکال ساده است، ولی production اگر اصول عملیاتی را رعایت نکنی به مشکل می‌خورد.

---

## ۱) تنظیمات محیط

حداقل‌ها:
- APP_ENV=production
- APP_DEBUG=false
- APP_URL درست
- APP_KEY قوی

secret را commit نکن.

---

## ۲) Pipeline دیپلوی

مراحل رایج:
- composer install
- npm ci
- npm run build
- migrate
- restart worker

---

## ۳) دستورات Artisan

\`\`\`bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
\`\`\`

---

## ۴) Queue worker در production

worker باید تحت supervisor/systemd باشد. اجرای دستی پایدار نیست.

---

## ۵) دیپلوی بدون downtime

- release جدید و سپس سوییچ symlink
- migration سازگار با نسخه قبلی
- بعد از دیپلوی workerها را restart کن

---

## ۶) storage:link

\`\`\`bash
php artisan storage:link
\`\`\`

---

## اشتباهات رایج

- APP_DEBUG روشن
- نبود supervisor برای queue
- migration بدون برنامه
- restart نکردن workerها
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default laravelDeploymentProductionLesson;
