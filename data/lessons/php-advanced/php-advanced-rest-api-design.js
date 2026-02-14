export const phpAdvancedRestApiDesignLesson = {
  id: 'php-advanced-rest-api-design',
  title: 'Advanced PHP: REST API Design (Routing, Validation, Errors)',
  titleFa: 'PHP پیشرفته: طراحی REST API (روتینگ، اعتبارسنجی، خطاها)',
  difficulty: 'hard',
  estimatedTime: '110 min',

  content: `
# Advanced PHP: REST API Design (Routing, Validation, Errors)

This lesson is framework-agnostic: it teaches patterns you can apply in Laravel/Symfony or plain PHP.

---

## 1) Design goal: stable boundaries

A clean API has:
- predictable URLs
- consistent response formats
- clear error handling
- versioning strategy

---

## 2) Resource-oriented URLs

Examples:
- \`GET /api/v1/users\`
- \`GET /api/v1/users/123\`
- \`POST /api/v1/users\`
- \`PATCH /api/v1/users/123\`
- \`DELETE /api/v1/users/123\`

---

## 3) Request parsing + content type

\`\`\`php
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
\`\`\`

If JSON:
\`\`\`php
$raw = file_get_contents('php://input');
$body = json_decode($raw, true, flags: JSON_THROW_ON_ERROR);
\`\`\`

---

## 4) Validation: fail fast

Validate at the boundary and convert to typed DTOs.

\`\`\`php
function requireString(array $data, string $key): string {
  $v = $data[$key] ?? null;
  if (!is_string($v) || trim($v) === '') {
    throw new InvalidArgumentException("$key is required");
  }
  return trim($v);
}
\`\`\`

---

## 5) Response format (consistent)

Success:
\`\`\`json
{ "ok": true, "data": { ... } }
\`\`\`

Error:
\`\`\`json
{ "ok": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
\`\`\`

In PHP:
\`\`\`php
function jsonResponse(int $status, array $payload): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($payload, JSON_THROW_ON_ERROR);
}
\`\`\`

---

## 6) HTTP status codes you should actually use

- \`200\` OK
- \`201\` Created
- \`204\` No Content
- \`400\` Bad Request (invalid input)
- \`401\` Unauthorized
- \`403\` Forbidden
- \`404\` Not Found
- \`409\` Conflict
- \`422\` Unprocessable Entity (validation)
- \`500\` Server error

---

## 7) Pagination & filtering (pattern)

\`\`\`php
$page = max(1, (int)($_GET['page'] ?? 1));
$limit = min(100, max(1, (int)($_GET['limit'] ?? 20)));
$offset = ($page - 1) * $limit;
\`\`\`

Return metadata:
\`\`\`json
{ "ok": true, "data": [...], "meta": { "page": 1, "limit": 20 } }
\`\`\`

---

## 8) Versioning strategy

Common options:
- URL versioning: \`/api/v1\`
- header versioning

URL versioning is simplest.

---

## Common mistakes

- returning inconsistent error shapes
- mixing HTML and JSON in same endpoint
- not validating input
- leaking exception messages to clients
` ,

  contentFa: `
# PHP پیشرفته: طراحی REST API (روتینگ، اعتبارسنجی، خطاها)

این درس مستقل از فریمورک است و الگوهایی را می‌گوید که در Laravel/Symfony یا PHP خام استفاده می‌کنی.

---

## ۱) هدف: مرزهای پایدار

API خوب:
- URLهای قابل پیش‌بینی
- فرمت پاسخ ثابت
- مدیریت خطای واضح
- نسخه‌بندی

---

## ۲) URLهای مبتنی بر Resource

- \`GET /api/v1/users\`
- \`GET /api/v1/users/123\`
- \`POST /api/v1/users\`

---

## ۳) خواندن درخواست و JSON

\`\`\`php
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$raw = file_get_contents('php://input');
$body = json_decode($raw, true, flags: JSON_THROW_ON_ERROR);
\`\`\`

---

## ۴) اعتبارسنجی: Fail fast

\`\`\`php
function requireString(array $data, string $key): string {
  $v = $data[$key] ?? null;
  if (!is_string($v) || trim($v) === '') {
    throw new InvalidArgumentException("$key is required");
  }
  return trim($v);
}
\`\`\`

---

## ۵) فرمت پاسخ ثابت

\`\`\`php
function jsonResponse(int $status, array $payload): void {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($payload, JSON_THROW_ON_ERROR);
}
\`\`\`

---

## ۶) Status codeهای مهم

- 200/201/204
- 400/401/403/404/409/422
- 500

---

## ۷) Pagination

\`\`\`php
$page = max(1, (int)($_GET['page'] ?? 1));
$limit = min(100, max(1, (int)($_GET['limit'] ?? 20)));
$offset = ($page - 1) * $limit;
\`\`\`

---

## ۸) نسخه‌بندی

ساده‌ترین: \`/api/v1\`

---

## اشتباهات رایج

- فرمت خطاهای متفاوت
- مخلوط کردن HTML و JSON
- نداشتن validate
- لو دادن پیام exception به کاربر
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default phpAdvancedRestApiDesignLesson;
