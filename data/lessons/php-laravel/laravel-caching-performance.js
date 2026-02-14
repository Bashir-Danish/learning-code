export const laravelCachingPerformanceLesson = {
  id: 'laravel-caching-performance',
  title: 'Caching + Performance: Cache Drivers, Keys, Invalidation, Locks',
  titleFa: 'کش و کارایی: Driverها، کلیدها، invalidation، قفل',
  difficulty: 'hard',
  estimatedTime: '250 min',

  content: `
# Caching + Performance in Laravel

Caching is about saving work:
- reduce DB load
- reduce external API calls
- stabilize latency

But caching introduces correctness risks: stale data, invalidation bugs, stampedes.

---

## 1) Cache stores (drivers)

Configured in config/cache.php.
Common stores:
- file
- database
- redis (recommended for production)

---

## 2) Basic read-through caching

Use remember:
\`\`\`php
$profile = Cache::remember(
  'user:profile:'.$userId,
  now()->addMinutes(10),
  fn () => User::with('roles')->findOrFail($userId)
);
\`\`\`

Design notes:
- keep keys predictable
- include versioning if schema changes

---

## 3) Cache invalidation patterns

Invalidate on write:
\`\`\`php
$user->update($data);
Cache::forget('user:profile:'.$user->id);
\`\`\`

Better patterns:
- tag-based invalidation (redis only)
- write-through cache for some domains

---

## 4) Cache tags (redis)

\`\`\`php
Cache::tags(['user:'.$user->id])->put('profile', $payload, 600);
Cache::tags(['user:'.$user->id])->flush();
\`\`\`

Use cases:
- invalidate multiple related keys

---

## 5) Preventing cache stampede (thundering herd)

If many requests miss the cache at once, they can hammer DB.
Solutions:
- short TTL + jitter
- locks

---

## 6) Locks

Redis locks can guard expensive computations:
\`\`\`php
Cache::lock('locks:rebuild-stats', 10)->block(5, function () {
  // rebuild expensive stats safely
});
\`\`\`

---

## 7) Caching API responses (careful)

Only cache public, stable, and safe data.
Be careful with:
- per-user data
- auth headers
- query filters

If you cache per-user:
- include userId in key
- keep TTL short

---

## Common mistakes

- caching without invalidation plan
- using cache keys that collide across tenants/users
- caching errors or partial data forever
- forgetting that file/database caches are slower than redis
- caching sensitive data without encryption or access control
` ,

  contentFa: `
# کش و کارایی در لاراول

کش یعنی انجام ندادن دوباره کار:
- کاهش فشار روی DB
- کاهش درخواست به API خارجی
- کاهش latency

ولی کش ریسک دارد: داده قدیمی، invalidation اشتباه، stampede.

---

## ۱) Driverهای کش

در config/cache.php.

رایج:
- file
- database
- redis (برای production بهتر)

---

## ۲) Read-through caching

\`\`\`php
$profile = Cache::remember(
  'user:profile:'.$userId,
  now()->addMinutes(10),
  fn () => User::with('roles')->findOrFail($userId)
);
\`\`\`

---

## ۳) Invalidation

بعد از update پاک کن:
\`\`\`php
$user->update($data);
Cache::forget('user:profile:'.$user->id);
\`\`\`

---

## ۴) Tag (فقط redis)

\`\`\`php
Cache::tags(['user:'.$user->id])->put('profile', $payload, 600);
Cache::tags(['user:'.$user->id])->flush();
\`\`\`

---

## ۵) جلوگیری از stampede

راهکارها:
- TTL کوتاه + jitter
- lock

---

## ۶) Lock

\`\`\`php
Cache::lock('locks:rebuild-stats', 10)->block(5, function () {
  // کار سنگین
});
\`\`\`

---

## اشتباهات رایج

- کش بدون برنامه invalidation
- keyهای مشترک بین کاربرها
- کش کردن داده حساس
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default laravelCachingPerformanceLesson;
