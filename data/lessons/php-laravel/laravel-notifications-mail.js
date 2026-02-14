export const laravelNotificationsMailLesson = {
  id: 'laravel-notifications-mail',
  title: 'Notifications + Mail: Email, SMS, Database, Queued Delivery',
  titleFa: 'Notification و Mail: ایمیل، SMS، دیتابیس، ارسال با صف',
  difficulty: 'hard',
  estimatedTime: '240 min',

  content: `
# Notifications + Mail in Laravel

Notifications are for user-facing messages across channels (mail, database, SMS, Slack). Mailables are for designing and sending emails.

Use this mental model:
- Mailables: email composition and templates
- Notifications: channel routing + user delivery preferences
- Queues: reliability and performance for sending

---

## 1) Mailables: compose an email

Create a mailable:
\`\`\`bash
php artisan make:mail WelcomeMail
\`\`\`

Typical usage:
\`\`\`php
use Illuminate\Support\Facades\Mail;

Mail::to($user->email)->send(new WelcomeMail($user));
\`\`\`

When to use mailables:
- transactional email with rich template
- attachments
- localization per email

---

## 2) Notifications: one message, many channels

Create a notification:
\`\`\`bash
php artisan make:notification InvoicePaid
\`\`\`

Example shape:
\`\`\`php
class InvoicePaid extends Notification
{
  public function __construct(public Invoice $invoice) {}

  public function via(object $notifiable): array
  {
    return ['mail', 'database'];
  }

  public function toMail(object $notifiable): MailMessage
  {
    return (new MailMessage)
      ->subject('Invoice paid')
      ->line('Your invoice has been paid.')
      ->action('View invoice', url('/invoices/'.$this->invoice->id));
  }

  public function toArray(object $notifiable): array
  {
    return [
      'invoiceId' => $this->invoice->id,
      'amount' => $this->invoice->amount,
    ];
  }
}
\`\`\`

Send it:
\`\`\`php
$user->notify(new InvoicePaid($invoice));
\`\`\`

---

## 3) Database notifications (in-app inbox)

Laravel stores notifications in a database table.

Create table:
\`\`\`bash
php artisan notifications:table
php artisan migrate
\`\`\`

Reading notifications:
\`\`\`php
$unread = $request->user()->unreadNotifications;
$request->user()->unreadNotifications()->update(['read_at' => now()]);
\`\`\`

Design tips:
- keep payload small and versioned
- store IDs, not huge snapshots

---

## 4) Queued delivery (recommended)

Sending mail inside a request slows the user down.

Queue a notification by implementing ShouldQueue:
\`\`\`php
use Illuminate\Contracts\Queue\ShouldQueue;

class InvoicePaid extends Notification implements ShouldQueue
{
  // ...
}
\`\`\`

Also queue mailables:
\`\`\`php
Mail::to($user)->queue(new WelcomeMail($user));
\`\`\`

Reliability tips:
- configure retry and backoff
- watch failed jobs
- make sending idempotent if you can

---

## 5) User preferences and channel routing

Common pattern:
- user enables channels (email, sms, in-app)
- notification decides channels based on user settings

Example idea:
\`\`\`php
public function via(object $notifiable): array
{
  $channels = ['database'];
  if ($notifiable->wants_email) $channels[] = 'mail';
  if ($notifiable->wants_sms) $channels[] = 'nexmo';
  return $channels;
}
\`\`\`

---

## 6) Avoiding spam and deliverability issues

Operational best practices:
- verify domain and set SPF/DKIM/DMARC
- use dedicated provider (SES, Mailgun, Postmark)
- do not send too many emails from the same request path
- add rate limiting for endpoints that can trigger mail

---

## Common mistakes

- sending mail synchronously inside controllers
- not queueing notifications
- putting huge payloads into database notifications
- leaking secrets in notification payloads
- building notification content from untrusted input without sanitizing
` ,

  contentFa: `
# Notification و Mail در لاراول

Notification برای پیام‌های کاربرمحور روی چند کانال است (ایمیل، دیتابیس، SMS و ...). Mailable برای طراحی و ارسال ایمیل است.

مدل ذهنی:
- Mailable: ساخت ایمیل و قالب
- Notification: انتخاب کانال‌ها و ارسال به کاربر
- Queue: ارسال مطمئن و سریع (بدون کند کردن request)

---

## ۱) Mailable: ساخت ایمیل

ساخت mailable:
\`\`\`bash
php artisan make:mail WelcomeMail
\`\`\`

ارسال:
\`\`\`php
use Illuminate\Support\Facades\Mail;

Mail::to($user->email)->send(new WelcomeMail($user));
\`\`\`

چه زمانی mailable بهتر است:
- ایمیل‌های transactional با قالب کامل
- attachment
- چندزبانه کردن ایمیل

---

## ۲) Notification: یک پیام، چند کانال

ساخت notification:
\`\`\`bash
php artisan make:notification InvoicePaid
\`\`\`

شکل کلی:
\`\`\`php
class InvoicePaid extends Notification
{
  public function __construct(public Invoice $invoice) {}

  public function via(object $notifiable): array
  {
    return ['mail', 'database'];
  }

  public function toArray(object $notifiable): array
  {
    return [
      'invoiceId' => $this->invoice->id,
      'amount' => $this->invoice->amount,
    ];
  }
}
\`\`\`

ارسال:
\`\`\`php
$user->notify(new InvoicePaid($invoice));
\`\`\`

---

## ۳) Database notifications (in-app)

برای inbox داخل اپ.

ساخت جدول:
\`\`\`bash
php artisan notifications:table
php artisan migrate
\`\`\`

خواندن و mark as read:
\`\`\`php
$unread = $request->user()->unreadNotifications;
$request->user()->unreadNotifications()->update(['read_at' => now()]);
\`\`\`

نکته:
- payload را کوچک نگه دار
- بهتر است فقط ID ذخیره کنی نه snapshot بزرگ

---

## ۴) ارسال با صف (پیشنهادی)

ارسال ایمیل در request باعث کندی می‌شود.

Queue کردن notification:
\`\`\`php
use Illuminate\Contracts\Queue\ShouldQueue;

class InvoicePaid extends Notification implements ShouldQueue
{
  // ...
}
\`\`\`

Queue کردن mailable:
\`\`\`php
Mail::to($user)->queue(new WelcomeMail($user));
\`\`\`

---

## ۵) ترجیحات کاربر برای کانال‌ها

الگوی رایج:
- کاربر انتخاب می‌کند ایمیل/اس‌ام‌اس/داخل اپ
- notification کانال‌ها را بر اساس تنظیمات کاربر برمی‌گرداند

---

## اشتباهات رایج

- ارسال sync داخل controller
- queue نکردن notification/mail
- payload بزرگ در دیتابیس
- لو دادن اطلاعات حساس داخل payload
` ,

  hasVisualization: false,
  hasExercise: false,
};

export default laravelNotificationsMailLesson;
