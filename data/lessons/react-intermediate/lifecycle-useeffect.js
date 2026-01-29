export const lifecycleUseeffectLesson = {
  id: 'lifecycle-useeffect',
  title: 'Lifecycle & useEffect',
  titleFa: 'چرخه حیات و هوک useEffect',
  difficulty: 'medium',
  estimatedTime: '50 min',

  content: `
# Component Lifecycle & useEffect

## Definition
The \`useEffect\` Hook is the primary way to perform **side effects** in React functional components. A side effect is any code that affects something outside of the component itself, such as fetching data, starting timers, or manually modifying the DOM. It combines the functionality of class-based lifecycle methods like \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`.

## Key Features
- **Deterministic Timing**: Runs after the component renders, ensuring the UI is already in place.
- **Dependency Tracking**: Use the dependency array to control exactly when the effect re-runs.
- **Automatic Cleanup**: Return a function to clean up resources (like sockets or timers) before the component unmounts.
- **Encapsulation**: Keep logic related to a single side effect in one place instead of splitting it across scattered lifecycle methods.

---

## 1. Basic Syntax
\`useEffect\` takes a **function** and an optional **dependency array**.

\`\`\`jsx
import { useEffect } from 'react';

useEffect(() => {
  // Your code here (The "Effect")
  return () => { /* Cleanup logic */ };
}, [dependencies]);
\`\`\`

---

## 2. The Dependency Array Scenarios

### A. Run ONLY on Mount (First Render)
Pass an empty array \`[]\`. Ideal for initial API calls.
\`\`\`jsx
useEffect(() => {
  console.log('Component Discovery!');
}, []);
\`\`\`

### B. Run when Specific Values Change
React will re-run the effect only if variables in the array change.
\`\`\`jsx
useEffect(() => {
  console.log('UserId changed to:', userId);
}, [userId]);
\`\`\`

---

## 3. Cleanup Functions
Critical for preventing memory leaks. React runs the cleanup function when the component unmounts and before every re-run of the effect.

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log('Tick'), 1000);
  return () => clearInterval(timer); // Safety first!
}, []);
\`\`\`

---

## Summary
- **useEffect** manages everything outside the "render" loop.
- Use **[]** for one-time setup.
- Always include **Cleanup** for subscriptions or timers.
`,

  contentFa: `
# چرخه حیات و هوک useEffect

## تعریف
هوک \`useEffect\` روش اصلی برای مدیریت **اثرات جانبی (Side Effects)** در کامپوننت‌های تابعی ری‌اکت است. اثر جانبی به هر کدی گفته می‌شود که روی چیزی خارج از محدوده خودِ کامپوننت تأثیر می‌گذارد؛ مواردی مثل دریافت داده از API، راه‌اندازی تایمرها یا تغییر دستی DOM. این هوک جایگزین متدهای چرخه حیات در کلاس‌ها (\`componentDidMount\` و غیره) شده است.

## ویژگی‌های اصلی
- **زمان‌بندی دقیق**: همیشه بعد از رندر شدن کامپوننت اجرا می‌شود تا مطمئن شود UI آماده است.
- **ردیابی وابستگی‌ها**: با استفاده از آرایه وابستگی، کنترل می‌کنید که کد دقیقاً چه زمانی دوباره اجرا شود.
- **پاکسازی خودکار**: امکان بازگرداندن یک تابع برای بستن منابع (مثل سوکت‌ها یا تایمرها) قبل از حذف کامپوننت.
- **کپسوله‌سازی**: تمام منطق مربوط به یک کار خاص را در یک جا نگه می‌دارد.

---

## ۱. نحو پایه (Syntax)
هوک \`useEffect\` یک **تابع** و یک **آرایه اختیاری** می‌گیرد.

\`\`\`jsx
import { useEffect } from 'react';

useEffect(() => {
  // کدهای شما در اینجا اجرا می‌شود
  return () => { /* منطق پاکسازی */ };
}, [وابستگی‌ها]);
\`\`\`

---

## ۲. سناریوهای آرایه وابستگی

### الف) اجرای فقط یکبار (Mount)
با دادن آرایه خالی \`[]\`، کد فقط بعد از اولین نمایش کامپوننت اجرا می‌شود. مناسب برای فراخوانی API.

### ب) اجرا هنگام تغییر مقدار خاص
ری‌اکت فقط زمانی کد را دوباره اجرا می‌کند که مقادیر داخل آرایه تغییر کرده باشند.

---

## ۳. تابع پاکسازی (Cleanup)
برای جلوگیری از نشت حافظه (Memory Leak) در مرورگر، بازگرداندن تابع پاکسازی حیاتی است. این تابع هنگام خروج از صفحه یا قبل از اجرای بعدیِ هوک اجرا می‌شود.

\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log('تیک'), 1000);
  return () => clearInterval(timer); // ایمنی سیستم!
}, []);
\`\`\`

---

## خلاصه
- هوک **useEffect** مسئول مدیریت تمام کارهای خارج از پروسه رندر است.
- از **[]** برای تنظیمات اولیه (مثل گرفتن دیتا) استفاده کنید.
- همیشه برای اشتراک‌ها (Subscriptions) یا تایمرها، **پاکسازی** را مد نظر داشته باشید.
`,

  visualizationId: 'useeffect-lifecycle',
  exerciseId: 'lifecycle-useeffect',
};

export default lifecycleUseeffectLesson;
