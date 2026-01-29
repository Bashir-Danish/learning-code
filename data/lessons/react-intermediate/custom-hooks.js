export const customHooksLesson = {
  id: 'custom-hooks',
  title: 'Custom Hooks',
  titleFa: 'هوک‌های سفارشی (Custom Hooks)',
  difficulty: 'medium',
  estimatedTime: '40 min',

  content: `
# Custom Hooks - Reusing Component Logic

## Definition
A **Custom Hook** is a JavaScript function whose name starts with "use" and that can call other hooks. Custom hooks allow you to extract component logic into reusable functions, making your components cleaner and more focused on the UI, while keeping the complex logic elsewhere.

## Key Features
- **Reusability**: Write logic once (like fetching data) and use it across multiple components.
- **Clean Code (DRY)**: Prevents boilerplate code associated with complex state and effects.
- **Unit Testing**: You can test the logic of a hook independently from the UI components.
- **Composability**: Combine multiple custom hooks to build sophisticated, modular features.

---

## 1. Creating a Custom Hook
The only real rule is the name must start with **use**. This convention allows React to automatically check for violations of the Hooks rules.

\`\`\`jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
\`\`\`

---

## 2. Using Custom Hooks
When you call a custom hook, all the state and effects inside it are completely **isolated**. Components using the same hook do NOT share State.

\`\`\`jsx
function Profile() {
  const { data, loading } = useFetch('/api/user');
  if (loading) return 'Loading...';
  return <h1>{data.name}</h1>;
}
\`\`\`

---

## Summary
- Custom Hooks let you extract stateful logic into reusable functions.
- Name must start with the prefix **"use"**.
- State inside custom hooks is **isolated** (not shared).
- Perfect for input handling, data fetching, or device-status tracking.
`,

  contentFa: `
# هوک‌های سفارشی (Custom Hooks)

## تعریف
یک **هوک سفارشی (Custom Hook)** یک تابع جاوااسکریپتی است که نام آن با "use" شروع می‌شود و می‌تواند هوک‌های دیگر ری‌اکت را درون خود صدا بزند. هوک‌های سفارشی به شما اجازه می‌دهند منطق یک کامپوننت (Logic) را به توابعی قابل استفاده مجدد تبدیل کنید. این کار باعث می‌شود کامپوننت‌های شما تمیزتر شده و فقط روی ظاهر تمرکز کنند، در حالی که منطق پیچیده در جای دیگری مدیریت می‌شود.

## ویژگی‌های اصلی
- **قابلیت استفاده مجدد**: نوشتن یک منطق (مثل دریافت داده) برای استفاده در چندین کامپوننت مختلف.
- **کد تمیز (DRY)**: جلوگیری از تکرار کدهای مربوط به استیت‌ها و افکت‌های پیچیده.
- **تست‌پذیری**: می‌توانید منطق هوک را به صورت مستقل از رابط کاربری تست کنید.
- **ترکیب‌پذیری**: ترکیب چندین هوک سفارشی برای ساخت قابلیت‌های ماژولار و پیشرفته.

---

## ۱. ساخت یک هوک سفارشی
تنها قانون واقعی این است که نام تابع باید با **use** شروع شود. این قرارداد به ری‌اکت اجازه می‌دهد به طور خودکار رعایت قوانین هوک‌ها را بررسی کند.

\`\`\`jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}
\`\`\`

---

## ۲. استفاده از هوک‌های سفارشی
وقتی یک هوک سفارشی را صدا می‌زنید، تمام استیت‌ها و افکت‌های داخل آن کاملاً **مستقل** هستند. کامپوننت‌هایی که از یک هوک مشترک استفاده می‌کنند، استیت خود را با هم به اشتراک نمی‌گذارند.

\`\`\`jsx
const Profile = () => {
  const { data, loading } = useFetch('/api/user');
  if (loading) return 'در حال بارگذاری...';
  return <h1>{data.name}</h1>;
};
\`\`\`

---

## خلاصه
- هوک‌های سفارشی منطق‌های وضعیت‌مند را به توابع قابل استفاده مجدد تبدیل می‌کنند.
- نام آن‌ها باید با پیشوند **"use"** شروع شود.
- وضعیت داخل هوک‌های سفارشی **ایزوله** است (به اشتراک گذاشته نمی‌شود).
- برای مدیریت ورودی‌ها، دریافت داده‌ها یا ردیابی وضعیت دستگاه عالی هستند.
`,

  visualizationId: 'custom-hooks',
  exerciseId: 'custom-hooks',
};

export default customHooksLesson;
