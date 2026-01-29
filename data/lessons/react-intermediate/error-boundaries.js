export const errorBoundariesLesson = {
  id: 'error-boundaries',
  title: 'Error Boundaries',
  titleFa: 'مدیریت خطا با Error Boundaries',
  difficulty: 'medium',
  estimatedTime: '30 min',

  content: `
# Error Boundaries - Catching UI Crashes

## Definition
**Error Boundaries** are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. They prevent a single error in a small part of the UI from crashing the entire application (the "White Screen of Death").

## Key Features
- **Graceful Degradation**: Show a professional "Something went wrong" message instead of a blank screen.
- **Error Logging**: Send error details to monitoring services like Sentry automatically.
- **Tree Propagation**: Catch errors that occur during rendering, in lifecycle methods, and in constructors of the whole tree below them.
- **Class-Based**: They must currently be implemented as Class Components (no Hook equivalent yet).

---

## 1. Implementation
An Error Boundary needs to implement \`static getDerivedStateFromError()\` and/or \`componentDidCatch()\`.

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI on next render
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log to external service
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh.</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

---

## 2. Strategic Placement
You can wrap your entire app, or just specific high-risk widgets.

\`\`\`jsx
<ErrorBoundary>
  <ProcessPayment />
</ErrorBoundary>
\`\`\`

---

## 3. Scope and Limitations
Error boundaries **do not** catch errors for:
- Event handlers (use try/catch there).
- Asynchronous code (e.g. \`setTimeout\`).
- Server-side rendering (SSR).

---

## Summary
- **Error Boundaries** capture rendering errors.
- They must be **Class Components**.
- They provide a **Fallback UI** to keep the app functional.
`,

  contentFa: `
# مدیریت خطا با Error Boundaries

## تعریف
**Error Boundaries** کامپوننت‌هایی در ری‌اکت هستند که خطاهای جاوااسکریپتی را در هر کجای درخت کامپوننت‌های فرزند خود جذب کرده، آن‌ها را ثبت (Log) می‌کنند و به جای نمایش صفحه سفید یا کرش کردن کل برنامه، یک رابط کاربری جایگزین (Fallback UI) نشان می‌دهند. این کار باعث می‌شود یک خطا در یک بخش کوچک، باعث از کار افتادن کل اپلیکیشن نشود.

## ویژگی‌های اصلی
- **تنزول باوقار (Graceful Degradation)**: نمایش یک پیام حرفه‌ای "مشکلی پیش آمده" به جای صفحه کاملاً سفید.
- **ثبت خطا**: ارسال خودکار جزئیات خطا به سرویس‌های مانیتورینگ (مثل Sentry).
- **انتشار در درخت**: جذب خطاهایی که در طول رندر، در متدهای چرخه حیات و در سازنده‌های کل درخت زیرین رخ می‌دهد.
- **ساختار مبتنی بر کلاس**: در حال حاضر حتماً باید به صورت Class Component پیاده‌سازی شوند (هنوز هوک معادلی ندارند).

---

## ۱. نحوه پیاده‌ سازی
یک Error Boundary باید متد \`static getDerivedStateFromError\` یا \`componentDidCatch\` را داشته باشد.

\`\`\`jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // بروزرسانی وضعیت برای نمایش UI جایگزین
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>خطایی رخ داده است. لطفاً صفحه را رفرش کنید.</h1>;
    }
    return this.props.children;
  }
}
\`\`\`

---

## ۲. قرارگیری استراتژیک
شما می‌توانید کل برنامه یا فقط ویجت‌های پرریسک را در یک Error Boundary قرار دهید.

\`\`\`jsx
<ErrorBoundary>
  <ComplexChart />
</ErrorBoundary>
\`\`\`

---

## ۳. محدودیت‌ ها
Error Boundaryها خطاهای زیر را **نمی‌گیرند**:
- خطاهای داخل توابع رویداد (مثلاً \`onClick\`).
- کدهای ناهمگام (مثل \`setTimeout\`).
- رندرینگ سمت سرور (SSR).

---

## خلاصه
- **Error Boundaries** خطاهای مرحله رندر را می‌گیرند.
- حتماً باید به صورت **Class Component** نوشته شوند.
- با ارائه **Fallback UI**، پایداری برنامه را حفظ می‌کنند.
`,

  visualizationId: 'error-boundaries',
  exerciseId: 'error-boundaries',
};

export default errorBoundariesLesson;
