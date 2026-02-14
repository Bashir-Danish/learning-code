export const laravelHttpClientIntegrationsLesson = {
  id: 'laravel-http-client-integrations',
  title: 'HTTP Client Integrations: Retries, Timeouts, Auth, Webhooks',
  titleFa: 'اتصال به سرویس‌ها با HTTP Client: timeout، retry، auth، webhook',
  difficulty: 'hard',
  estimatedTime: '260 min',

  content: `
# HTTP Client Integrations in Laravel

Laravel provides an HTTP client (based on Guzzle) that is great for:
- calling third-party APIs
- internal service-to-service calls
- webhook delivery

Integration failures are normal. Your job is to make them safe.

---

## 1) Basic GET and POST

\`\`\`php
use Illuminate\Support\Facades\Http;

$res = Http::get('https://api.example.com/v1/users');
$data = $res->json();
\`\`\`

POST:
\`\`\`php
$res = Http::post('https://api.example.com/v1/payments', [
  'amount' => 1000,
  'currency' => 'USD',
]);
\`\`\`

---

## 2) Timeouts

Always set timeouts in production to avoid hanging workers:
\`\`\`php
$res = Http::timeout(5)->get('https://api.example.com/v1/status');
\`\`\`

---

## 3) Retries and backoff

\`\`\`php
$res = Http::retry(3, 200)->timeout(5)->get('https://api.example.com/v1/status');
\`\`\`

Guidelines:
- retry only on safe failures (timeouts, 5xx)
- do not retry non-idempotent writes unless you have idempotency keys

---

## 4) Authentication headers

Bearer token:
\`\`\`php
$res = Http::withToken($token)->get('https://api.example.com/v1/me');
\`\`\`

Custom headers:
\`\`\`php
$res = Http::withHeaders([
  'X-Client-Id' => $clientId,
  'X-Signature' => $signature,
])->post($url, $payload);
\`\`\`

---

## 5) Error handling strategy

Do not assume success.

\`\`\`php
$res = Http::timeout(5)->get($url);

if ($res->failed()) {
  // log, map to domain error, maybe queue retry
}
\`\`\`

Map errors:
- 401/403: credential issue
- 429: rate limit, retry later
- 5xx: provider outage, retry

---

## 6) Webhooks (incoming)

Checklist:
- verify signature
- store raw event payload
- process asynchronously (queue)
- make handler idempotent

Common pattern:
- controller validates signature
- writes event row
- dispatches a job

---

## 7) Webhooks (outgoing)

Outgoing webhooks should be:
- queued
- signed
- retried with backoff
- idempotent

---

## Testing integrations

Use Http fake:
\`\`\`php
Http::fake([
  'api.example.com/*' => Http::response(['ok' => true], 200),
]);
\`\`\`

---

## Common mistakes

- missing timeouts
- retrying non-idempotent POST without idempotency keys
- logging sensitive data (tokens, PII)
- no signature verification for webhooks
- doing integration calls inside DB transactions
` ,

  contentFa: `
# HTTP Client در لاراول برای Integrations

HTTP Client لاراول برای:
- ارتباط با APIهای خارجی
- ارتباط سرویس به سرویس
- ارسال/دریافت webhook

خطا در integration طبیعی است. باید سیستم امن و قابل بازیابی باشد.

---

## ۱) GET و POST

\`\`\`php
use Illuminate\Support\Facades\Http;

$res = Http::get('https://api.example.com/v1/users');
$data = $res->json();
\`\`\`

---

## ۲) Timeout

در production همیشه timeout بگذار:
\`\`\`php
$res = Http::timeout(5)->get('https://api.example.com/v1/status');
\`\`\`

---

## ۳) Retry و Backoff

\`\`\`php
$res = Http::retry(3, 200)->timeout(5)->get($url);
\`\`\`

نکته:
- فقط برای خطاهای امن retry کن (timeout, 5xx)
- برای POST بدون idempotency key خطرناک است

---

## ۴) Auth header

\`\`\`php
$res = Http::withToken($token)->get('https://api.example.com/v1/me');
\`\`\`

---

## ۵) Webhook ورودی

- signature را verify کن
- payload خام را ذخیره کن
- پردازش را queue کن
- idempotency داشته باش

---

## تست

\`\`\`php
Http::fake([
  'api.example.com/*' => Http::response(['ok' => true], 200),
]);
\`\`\`

---

## اشتباهات رایج

- نبود timeout
- retry کردن POST بدون idempotency
- لاگ کردن token یا اطلاعات حساس
- verify نکردن signature webhook
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default laravelHttpClientIntegrationsLesson;
