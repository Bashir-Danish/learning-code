export const performanceOptimizationLesson = {
  id: 'performance-optimization',
  title: 'Performance Optimization',
  titleFa: 'بهینه‌سازی عملکرد (useMemo, useCallback)',
  difficulty: 'medium',
  estimatedTime: '55 min',

  content: `
# Performance Optimization in React

## Definition
Performance optimization in React involves minimizing unnecessary re-renders and reducing the computational cost of complex operations. React provides specialized tools like **memo**, **useMemo**, and **useCallback** to "memoize" (cache) components, values, and functions, ensuring they are only updated when strictly necessary.

## Key Features
- **Memoization**: Cache the results of expensive calculations to avoid repeating them.
- **Reference Stability**: Ensure functions and objects maintain the same identity between renders.
- **Selective Rendering**: Skip re-rendering entire component trees if their props haven't changed.
- **Profiling**: Use the React DevTools Profiler to identify exactly which components are slow.

---

## 1. React.memo
\`memo\` is a higher-order component that skips re-rendering a component if its props are the same as the previous render.

\`\`\`jsx
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  return <div>{data.label}</div>;
});
\`\`\`

---

## 2. useMemo
Use \`useMemo\` to cache the **result** of a calculation.

\`\`\`jsx
const cachedValue = useMemo(() => {
  return performExpensiveCalculation(rawData);
}, [rawData]); // Only re-calculates if rawData changes
\`\`\`

---

## 3. useCallback
Use \`useCallback\` to cache a **function definition** itself. This is crucial when passing functions to memoized child components.

\`\`\`jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
\`\`\`

---

## Summary
- **React.memo**: Memoizes a **component**.
- **useMemo**: Memoizes a **calculated value**.
- **useCallback**: Memoizes a **function reference**.
- **Rule of Thumb**: Don't over-optimize. Use these tools only when you measure a real performance bottleneck.
`,

  contentFa: `
# بهینه‌سازی عملکرد در ری‌اکت

## تعریف
بهینه‌سازی عملکرد در ری‌اکت به معنای به حداقل رساندن رندرهای مجدد غیرضروری و کاهش بار محاسباتی عملیات‌های پیچیده است. ری‌اکت ابزارهای تخصصی مثل **memo**، **useMemo** و **useCallback** را برای "Memoize" (ذخیره‌سازی در حافظه موقت یا کش) کامپوننت‌ها، مقادیر و توابع فراهم کرده است تا اطمینان حاصل شود که آن‌ها فقط در صورت لزوم بروزرسانی می‌شوند.

## ویژگی‌های اصلی
- **Memoization**: ذخیره نتیجه محاسبات سنگین برای جلوگیری از تکرار آن‌ها.
- **پایداری مرجع (Reference Stability)**: اطمینان از اینکه توابع و اشیاء در طول رندرها هویت یکسانی حفظ می‌کنند.
- **رندرینگ انتخابی**: نادیده گرفتن رندر کل درخت کامپوننت اگر ورودی‌های آن تغییر نکرده باشد.
- **پروفایلینگ (Profiling)**: استفاده از ابزار Profiler برای شناسایی دقیق کامپوننت‌های کند.

---

## ۱. ویژگی React.memo
یک تابع سطح بالا که اگر ورودی‌های (Props) یک کامپوننت تغییر نکرده باشد، از رندر مجدد آن جلوگیری می‌کند.

\`\`\`jsx
import { memo } from 'react';

const MyComponent = memo(({ title }) => {
  return <h1>{title}</h1>;
});
\`\`\`

---

## ۲. هوک useMemo
برای ذخیره کردن (Cache) **نتیجه** یک محاسبه سنگین استفاده می‌شود.

\`\`\`jsx
const result = useMemo(() => {
  return someHeavyFilter(data);
}, [data]); // فقط با تغییر data دوباره محاسبه می‌شود
\`\`\`

---

## ۳. هوک useCallback
برای ذخیره کردن **خودِ تابع** استفاده می‌شود. در جاوااسکریپت، توابع در هر رندر از نو ساخته می‌شوند؛ این هوک تضمین می‌کند که آدرس تابع در حافظه ثابت بماند.

\`\`\`jsx
const handleClick = useCallback(() => {
  console.log('کلیک شد');
}, []);
\`\`\`

---

## خلاصه
- **React.memo**: کل **کامپوننت** را کش می‌کند.
- **useMemo**: یک **مقدار محاسبه شده** را کش می‌کند.
- **useCallback**: ارجاع به یک **تابع** را ثابت نگه می‌دارد.
- **نکته طلایی**: از این ابزارها فقط زمانی استفاده کنید که واقعاً با مشکل سرعت روبرو هستید، نه برای تمام کامپوننت‌ها.
`,

  visualizationId: 'performance',
  exerciseId: 'performance-optimization',
};

export default performanceOptimizationLesson;
