export const codeSplittingLesson = {
  id: 'code-splitting',
  title: 'Code Splitting & Suspense',
  titleFa: 'جداسازی کد (Code Splitting) و Suspense',
  difficulty: 'hard',
  estimatedTime: '35 min',

  content: `
# Code Splitting - Loading Only What You Need

## Definition
**Code Splitting** is an optimization technique that breaks down your application's large JavaScript bundle into smaller, more manageable chunks. Instead of loading the entire app at once, React only downloads the code necessary for the current page or feature. **Suspense** is a built-in React component that handles the "waiting" period while these chunks are being fetched.

## Key Features
- **Faster Initial Load**: Send less JavaScript to the browser on the first visit.
- **On-Demand Loading**: Fetch heavy components (like maps or editors) only when the user interacts with them.
- **Fallback UI**: Easily show loading spinners or skeletons while a module is being downloaded.
- **Route-Based Splitting**: Automatically separate code based on page routes.

---

## 1. Dynamic Imports
At its core, code splitting used the JavaScript \`import()\` function, which returns a Promise.

\`\`\`javascript
const handleClick = async () => {
  const { calculateValue } = await import('./math-lib'); // Loaded only on click
  console.log(calculateValue(10, 20));
};
\`\`\`

---

## 2. React.lazy & Suspense
This is the standard way to split components. \`React.lazy\` handles the dynamic import, and \`Suspense\` handles the loading state.

\`\`\`jsx
import { lazy, Suspense } from 'react';

// Component code is separated into its own small file
const AnalyticsChart = lazy(() => import('./AnalyticsChart'));

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading Chart...</div>}>
      <AnalyticsChart />
    </Suspense>
  );
}
\`\`\`

---

## 3. Best Practice: Route Splitting
Breaking the app down by pages is the most effective optimization.

\`\`\`jsx
const SettingsPage = lazy(() => import('./pages/Settings'));

// In router configuration
{
  path: "/settings",
  element: (
    <Suspense fallback={<GlobalLoader />}>
      <SettingsPage />
    </Suspense>
  )
}
\`\`\`

---

## Summary
- **React.lazy**: Converts an async import into a standard component.
- **Suspense**: Wraps lazy components to provide a loading placeholder.
- **Optimization**: Crucial for large apps to maintain high performance and low bundle sizes.
`,

  contentFa: `
# جداسازی کد (Code Splitting) در ری‌اکت

## تعریف
**جداسازی کد (Code Splitting)** یک تکنیک بهینه‌سازی است که بسته (Bundle) بزرگ جاوااسکریپتِ اپلیکیشن شما را به بخش‌های کوچک‌تر و قابل مدیریت تقسیم می‌کند. به جای بارگذاری کل برنامه به صورت یکجا، ری‌اکت فقط کدهای مورد نیاز برای صفحه یا قابلیت فعلی را دانلود می‌کند. **Suspense** یک کامپوننت داخلی ری‌اکت است که زمان "انتظار" برای دریافت این بخش‌های کد را مدیریت می‌کند.

## ویژگی‌های اصلی
- **بارگذاری سریع اولیه**: ارسال کدهای کمتر به مرورگر در اولین بازدید کاربر.
- **بارگذاری در صورت نیاز (On-Demand)**: دریافت کامپوننت‌های سنگین (مثل نقشه‌ها یا ویرایشگرهای متن) فقط زمانی که کاربر با آن‌ها تعامل برقرار می‌کند.
- **رابط کاربری جایگزین (Fallback UI)**: نمایش آسان لودینگ‌ها یا اسکلتون‌ها (Skeletons) در حین دانلود ماژول‌ها.
- **جداسازی بر اساس مسیر (Route-Based)**: تفکیک خودکار کدها بر اساس صفحات مختلف برنامه.

---

## ۱. ایمپورت‌های پویا (Dynamic Imports)
در هسته‌ی خود، جداسازی کد از تابع \`import()\` جاوااسکریپت استفاده می‌کند که یک Promise برمی‌گرداند.

\`\`\`javascript
const handleOpenEditor = async () => {
  const { Editor } = await import('./ComplexEditor'); // فقط در زمان کلیک لود می‌شود
};
\`\`\`

---

## ۲. ترکیب React.lazy و Suspense
این روش استاندارد برای جداسازی کامپوننت‌هاست. \`React.lazy\` ایمپورت پویا را مدیریت می‌کند و \`Suspense\` وضعیت لودینگ را.

\`\`\`jsx
import { lazy, Suspense } from 'react';

// کدهای این کامپوننت در یک فایل کوچک مجزا قرار می‌گیرند
const HeavyTable = lazy(() => import('./HeavyTable'));

function App() {
  return (
    <Suspense fallback={<div>در حال بارگذاری جدول...</div>}>
      <HeavyTable />
    </Suspense>
  );
}
\`\`\`

---

## ۳. بهترین روش: جداسازی در سطح مسیرها
تقسیم‌بندی برنامه بر اساس صفحات، موثرترین راه برای بهینه‌سازی سرعت است.

\`\`\`jsx
const Profile = lazy(() => import('./pages/Profile'));

// در تنظیمات روتر
<Route path="/profile" element={
  <Suspense fallback={<PageLoader />}>
    <Profile />
  </Suspense>
} />
\`\`\`

---

## خلاصه
- **React.lazy**: یک ایمپورت غیرهمزمان را به یک کامپوننت استاندارد تبدیل می‌کند.
- **Suspense**: کامپوننت‌های lazy را پوشش داده و یک مکان‌نما برای لودینگ ارائه می‌دهد.
- **بهینه‌ سازی**: برای برنامه‌های بزرگ حیاتی است تا سرعت بالا و حجم بسته پایین حفظ شود.
`,

  visualizationId: 'code-splitting',
  exerciseId: 'code-splitting',
};

export default codeSplittingLesson;
