export const serverComponentsLesson = {
  id: 'server-components',
  title: 'React Server Components',
  titleFa: 'کامپوننت‌های سمت سرور (RSC)',
  difficulty: 'hard',
  estimatedTime: '45 min',

  content: `
# React Server Components (RSC)

## Definition
**React Server Components (RSC)** are a new type of React component that renders exclusively on the server. By rendering on the server, RSCs can access data sources (like databases or file systems) directly and send zero JavaScript to the client for that specific component. This is the foundation of modern React frameworks like Next.js 13+ and React 19.

## Key Features
- **Zero Bundle Size**: The logic and dependencies of the component stay on the server, reducing the amount of JS the user has to download.
- **Direct Backend Access**: Fetch data directly from your database using \`async/await\` inside the component.
- **Improved Initial Load**: The server sends pre-rendered HTML, making the page visible almost instantly.
- **Automatic Code Splitting**: Client components imported by server components are automatically code-split.

---

## 1. Server vs Client Components
By default in modern React frameworks, every component is a **Server Component**. If you need interactivity, you must explicitly mark it as a **Client Component**.

| Feature | Server Components | Client Components |
| :--- | :--- | :--- |
| **Direct DB Access** | Yes | No |
| **State (useState)** | No | Yes |
| **Effects (useEffect)**| No | Yes |
| **Browser APIs** | No | Yes |

---

## 2. Basic Example
Server components are \`async\` by nature, allowing for seamless data fetching.

\`\`\`jsx
// This is a Server Component (Default)
async function UserProfile({ id }) {
  const user = await db.user.findUnique({ where: { id } });

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
\`\`\`

---

## 3. The "use client" Directive
To use state, effects, or click handlers, add this directive to the very top of your file.

\`\`\`jsx
"use client";

import { useState } from 'react';

export function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(l => l + 1)}>Likes: {likes}</button>;
}
\`\`\`

---

## Summary
- **Server Components** are for performance, data fetching, and security.
- **Client Components** are for interactivity and visual feedback.
- Use **"use client"** only when you need browser-specific features.
`,

  contentFa: `
# کامپوننت‌های سمت سرور (RSC)

## تعریف
**کامپوننت‌های سمت سرور (React Server Components یا RSC)** نوع جدیدی از کامپوننت‌های ری‌اکت هستند که منحصراً در سرور رندر می‌شوند. با رندر شدن در سرور، این کامپوننت‌ها می‌توانند مستقیماً به منابع داده (مثل دیتابیس یا سیستم فایل) دسترسی داشته باشند و هیچ کد جاوااسکریپتی برای آن کامپوننت خاص به کلاینت (مرورگر) ارسال نکنند. این تکنولوژی زیربنای فریمورک‌های مدرن مثل Next.js و ری‌اکت ۱۹ است.

## ویژگی‌های اصلی
- **حجم بسته صفر (Zero Bundle Size)**: منطق و وابستگی‌های کامپوننت در سرور می‌مانند و حجم فایل‌های دریافتی توسط کاربر را به شدت کاهش می‌دهند.
- **دسترسی مستقیم به بک‌ اند**: دریافت داده‌ها مستقیماً از دیتابیس با استفاده از \`async/await\` در داخل خود کامپوننت.
- **بهبود سرعت لود اولیه**: سرور HTML رندر شده را می‌فرستد، بنابراین کاربر محتوا را تقریباً بلافاصله می‌بیند.
- **امنیت بیشتر**: کدهای حساس (مثل کلیدهای API یا کوئری‌های دیتابیس) هرگز به مرورگر فرستاده نمی‌شوند.

---

## ۱. مقایسه سرور و کلاینت
در فریمورک‌های مدرن ری‌اکت، به صورت پیش‌فرض تمام کامپوننت‌ها **Server Component** هستند. اگر به تعامل (Interactivity) نیاز دارید، باید آن را به **Client Component** تبدیل کنید.

| ویژگی | Server Component | Client Component |
| :--- | :--- | :--- |
| **دسترسی به دیتابیس** | بله | خیر |
| **استفاده از استیت** | خیر | بله |
| **استفاده از useEffect** | خیر | بله |
| **دسترسی به Window/DOM** | خیر | بله |

---

## ۲. یک مثال ساده
کامپوننت‌های سروری ذاتا \`async\` هستند، که اجازه می‌دهد داده‌ها را به راحتی واکشی کنید.

\`\`\`jsx
// این یک Server Component است (پیش‌فرض)
async function ProductPage({ id }) {
  const product = await db.products.getById(id);

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.price} تومان</p>
    </div>
  );
}
\`\`\`

---

## ۳. دستور "use client"
برای استفاده از استیت‌ها، افکت‌ها یا رویدادهایی مثل کلیک، این دستور را در خط اول فایل قرار دهید.

\`\`\`jsx
"use client";

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>عدد: {count}</button>;
}
\`\`\`

---

## خلاصه
- **Server Components** برای پرفورمنس، دریافت داده و امنیت عالی هستند.
- **Client Components** برای تعاملات کاربر و فیدبک‌های بصری استفاده می‌شوند.
- فقط در لایه‌هایی که نیاز به واکنش‌گرایی دارید از **"use client"** استفاده کنید.
`,

  visualizationId: 'server-components',
  exerciseId: 'server-components',
};

export default serverComponentsLesson;
