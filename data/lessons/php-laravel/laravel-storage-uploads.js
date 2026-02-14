export const laravelStorageUploadsLesson = {
  id: 'laravel-storage-uploads',
  title: 'Storage + Uploads: Filesystem Disks, Signed URLs, Secure Uploads',
  titleFa: 'Storage و Upload: diskها، لینک امضاشده، آپلود امن',
  difficulty: 'hard',
  estimatedTime: '240 min',

  content: `
# Storage + Uploads in Laravel

File handling is a common security and reliability risk area.
Laravel Storage gives you a unified API for local disk, S3, and other drivers.

---

## 1) Disks and configuration

Disks are configured in config/filesystems.php and .env.

Common disks:
- local: stored in storage/app
- public: stored in storage/app/public and exposed via public/storage (symlink)
- s3: cloud storage

---

## 2) Basic store flow

Validate then store:
\`\`\`php
$data = $request->validate([
  'file' => ['required', 'file', 'max:5120'],
]);

$path = $request->file('file')->store('uploads', 'public');
\`\`\`

Return a stable response:
\`\`\`php
return response()->json([
  'ok' => true,
  'path' => $path,
  'url' => Storage::disk('public')->url($path),
]);
\`\`\`

---

## 3) Secure uploads checklist

Validation rules:
- limit size
- restrict MIME and extensions
- for images, use the image rule and mimes

Example:
\`\`\`php
$request->validate([
  'avatar' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
]);
\`\`\`

Security rules:
- never trust original filename
- do not store executable files in publicly served paths
- consider antivirus scanning for documents

---

## 4) Public vs private files

Public files:
- avatars
- public assets

Private files:
- invoices
- sensitive documents

For private files, store on a private disk and serve via a controller with authorization.

---

## 5) Downloading private files (authorize first)

\`\`\`php
public function download(Request $request, Document $document)
{
  $this->authorize('view', $document);

  return Storage::disk('private')->download($document->path);
}
\`\`\`

---

## 6) Signed temporary URLs (S3)

For S3, generate a temporary signed URL:
\`\`\`php
$url = Storage::disk('s3')->temporaryUrl(
  $path,
  now()->addMinutes(10)
);
\`\`\`

This is great for:
- private downloads
- short-lived access links

---

## 7) Image processing and variants

Common pattern:
- store original
- generate variants (thumbnail, medium)
- store paths in DB

If you do image processing:
- do it in a queued job
- keep the request fast

---

## Common mistakes

- storing uploads in public without validation
- serving private files directly
- no authorization on download endpoints
- generating permanent public URLs for private content
- processing large files synchronously
` ,

  contentFa: `
# Storage و Upload در لاراول

مدیریت فایل یکی از نقاط پرریسک امنیتی و پرفورمنس است.
Storage در لاراول یک API یکسان برای local و S3 و ... می‌دهد.

---

## ۱) Diskها و تنظیمات

Diskها در config/filesystems.php و .env تنظیم می‌شوند.

Diskهای رایج:
- local: داخل storage/app
- public: داخل storage/app/public و نمایش از public/storage
- s3: فضای ابری

---

## ۲) جریان آپلود استاندارد

اول validate سپس ذخیره:
\`\`\`php
$data = $request->validate([
  'file' => ['required', 'file', 'max:5120'],
]);

$path = $request->file('file')->store('uploads', 'public');
\`\`\`

---

## ۳) چک لیست آپلود امن

- محدودیت سایز
- محدود کردن MIME و extension
- برای تصویر از image و mimes استفاده کن

مثال:
\`\`\`php
$request->validate([
  'avatar' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
]);
\`\`\`

قانون‌ها:
- به نام فایل کاربر اعتماد نکن
- فایل اجرایی را در مسیر public ذخیره نکن
- برای فایل‌های حساس اسکن را در نظر بگیر

---

## ۴) فایل عمومی vs خصوصی

فایل عمومی:
- avatar

فایل خصوصی:
- فاکتور
- سند حساس

فایل خصوصی را در disk خصوصی ذخیره کن و فقط با کنترلر + authorization ارائه بده.

---

## ۵) دانلود فایل خصوصی (اول authorize)

\`\`\`php
public function download(Request $request, Document $document)
{
  $this->authorize('view', $document);
  return Storage::disk('private')->download($document->path);
}
\`\`\`

---

## ۶) لینک امضاشده موقت (S3)

\`\`\`php
$url = Storage::disk('s3')->temporaryUrl(
  $path,
  now()->addMinutes(10)
);
\`\`\`

---

## اشتباهات رایج

- ذخیره public بدون validation
- ارائه مستقیم فایل خصوصی
- نبود authorization برای دانلود
- پردازش سنگین داخل request
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default laravelStorageUploadsLesson;
