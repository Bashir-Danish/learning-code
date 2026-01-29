export const debuggingLesson = {
  id: 'vue-debugging',
  title: 'Debugging & Error Handling',
  titleFa: 'دیباگینگ و مدیریت خطا',
  difficulty: 'easy',
  estimatedTime: '40 min',
  content: `
# Debugging & Error Handling in Vue 3

## Definition
Debugging in Vue involves using specialized tools and techniques to identify, track, and fix bugs in your code. Error handling refers to the proactive management of runtime exceptions to prevent application crashes and provide meaningful feedback to users.

## Key Features
- **Vue Devtools**: Inspect component trees, state, and events in real-time.
- **Global Error Handler**: Centralized place to catch and log all application errors.
- **Timeline Inspection**: Track performance bottlenecks and re-render triggers.
- **Component Error Hooks**: Use \`onErrorCaptured\` to handle errors from child components.

---

## 1. Vue Devtools
The essential browser extension for Vue developers. It allows you to:
- See the exact state of every component.
- Record and replay events.
- Inspect Pinia/Vuex stores.

---

## 2. Global Error Handling
You can setup a global handler to catch all unhandled errors in your app. This is crucial for production monitoring.

\`\`\`javascript
const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  // Handle the error, e.g. report to an external service
  console.error('Captured Global Error:', err)
}
\`\`\`

---

## 3. onErrorCaptured Hook
Listen for errors propagating from descendant components.

\`\`\`javascript
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
  console.log('Error caught in parent:', err)
  return false // Stop error from propagating further
})
\`\`\`

---

## Summary
- Use **Vue Devtools** for daily development.
- Implement **global error handlers** for production reliability.
- Use **error hooks** to build "Error Boundary" components.
`,
  contentFa: `
# دیباگینگ و مدیریت خطا در Vue 3

## تعریف
دیباگینگ (Debugging) در Vue شامل استفاده از ابزارها و تکنیک‌های تخصصی برای شناسایی، ردیابی و رفع باگ‌ها در کد است. مدیریت خطا (Error Handling) به مدیریت پیشگیرانه خطاهای زمان اجرا اشاره دارد تا از کرش کردن برنامه جلوگیری شده و بازخورد مناسبی به کاربران ارائه شود.

## ویژگی‌های اصلی
- **Vue Devtools**: بررسی درخت کامپوننت‌ها، وضعیت (State) و رویدادها به صورت لحظه‌ای.
- **مدیریت خطای سراسری**: مکانی متمرکز برای دریافت و ثبت تمامی خطاهای اپلیکیشن.
- **بررسی Timeline**: ردیابی گلوگاه‌های عملکردی و محرک‌های رندر مجدد.
- **هوک‌های خطای کامپوننت**: استفاده از \`onErrorCaptured\` برای مدیریت خطاهای کامپوننت‌های فرزند.

---

## ۱. ابزار Vue Devtools
افزونه ضروری مرورگر برای توسعه‌دهندگان Vue. این ابزار به شما اجازه می‌دهد:
- وضعیت دقیق هر کامپوننت را مشاهده کنید.
- رویدادها را ضبط و بازبینی کنید.
- استورهای Pinia را مدیریت کنید.

---

## ۲. مدیریت خطای سراسری
می‌توانید یک هندلر سراسری برای دریافت تمام خطاهای مدیریت نشده تنظیم کنید. این کار برای مانیتورینگ نسخه نهایی برنامه (Production) حیاتی است.

\`\`\`javascript
app.config.errorHandler = (err, instance, info) => {
  // مدیریت خطا و مثلاً ارسال به سرویس Sentry
  console.error('خطای سراسری دریافت شد:', err)
}
\`\`\`

---

## ۳. هوک onErrorCaptured
گوش دادن به خطاهایی که از کامپوننت‌های فرزند به سمت بالا منتشر می‌شوند.

\`\`\`javascript
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
  console.log('خطا در والد دریافت شد:', err)
  return false // جلوگیری از انتشار بیشتر خطا
})
\`\`\`

---

## خلاصه
- از **Vue Devtools** برای کارهای روزمره توسعه استفاده کنید.
- **هندلرهای سراسری** را برای پایداری نسخه نهایی پیاده‌سازی کنید.
- از **هوک‌های خطا** برای ساخت کامپوننت‌های "محدوده خطا" استفاده کنید.
`
};
