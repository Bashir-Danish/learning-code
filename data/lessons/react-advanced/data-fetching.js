export const dataFetchingLesson = {
  id: 'data-fetching',
  title: 'Data Fetching (Modern & React 19)',
  titleFa: 'دریافت داده‌ها (مدرن و ری‌اکت ۱۹)',
  difficulty: 'hard',
  estimatedTime: '60 min',

  content: `
# Data Fetching in Modern React

## Definition
**Data Fetching** is the process of retrieving data from an external source (like a REST or GraphQL API) and displaying it in your UI. Modern React development has shifted from basic \`fetch\` calls inside \`useEffect\` to robust "Server State" management libraries and native language features like React 19's **use()** hook and **Server Components**.

## Key Features
- **Caching**: Re-use previously fetched data to make the app feel instant.
- **Stale-While-Revalidate**: Show old data while fetching the new one in the background.
- **Automatic Retries**: Smoothly handle transient network errors.
- **Loading & Error UI**: Decoupled management of wait times and failure states through Suspense and Error Boundaries.

---

## 1. The Industry Standard (TanStack Query)
TanStack Query (formerly React Query) is the go-to tool for managing complex server state on the client.

\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (isLoading) return <LoadingSpinner />;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
\`\`\`

---

## 2. React 19: The use() Hook
React 19 allows you to unwrap a promise directly in the render with the \`use()\` hook. This requires wrapping the component in a **Suspense** boundary.

\`\`\`jsx
import { use, Suspense } from 'react';

function UserProfile({ promise }) {
  const user = use(promise);
  return <div>{user.name}</div>;
}
\`\`\`

---

## 3. React Server Components (RSC)
RSCs allow you to fetch data with \`async/await\` directly in the component, which runs on the server. This results in zero JavaScript sent to the client for the fetching logic.

\`\`\`jsx
// This component only runs on the server
async function UserPage() {
  const user = await db.user.findFirst();
  return <Profile user={user} />;
}
\`\`\`

---

## Summary
- **TanStack Query**: Best for interactive, client-heavy applications.
- **React 19 use()**: Great for simpler Promise handling with Suspense.
- **Server Components**: The gold standard for initial load performance and SEO.
`,

  contentFa: `
# دریافت داده‌ها در ری‌اکت مدرن

## تعریف
**دریافت داده (Data Fetching)** فرآیند بازیابی اطلاعات از یک منبع خارجی (مثل APIهای REST یا GraphQL) و نمایش آن‌ها در رابط کاربری است. در ری‌اکت مدرن، از فراخوانی‌های ساده \`fetch\` در هوک \`useEffect\` به سمت کتابخانه‌های قدرتمند "مدیریت وضعیت سرور" و ویژگی‌های بومی جدید مثل هوک **use()** در ری‌اکت ۱۹ و **Server Components** حرکت کرده‌ایم.

## ویژگی‌های اصلی
- **ذخیره‌ سازی (Caching)**: استفاده مجدد از داده‌های قبلاً دریافت شده برای سرعت بخشیدن به برنامه.
- **Stale-While-Revalidate**: نمایش داده‌های قدیمی همزمان با دریافت داده‌های جدید در پس‌زمینه.
- **تلاش مجدد خودکار (Auto Retries)**: مدیریت هوشمندانه خطاهای شبکه گذرا.
- **مدیریت وضعیت لودینگ و خطا**: جداسازی منطق زمان انتظار و شکست با استفاده از Suspense و Error Boundaries.

---

## ۱. استاندارد صنعت (TanStack Query)
این کتابخانه که قبلاً با نام React Query شناخته می‌شد، بهترین ابزار برای مدیریت داده‌های سرور در سمت کلاینت است.

\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (isLoading) return <div>در حال بارگذاری...</div>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
\`\`\`

---

## ۲. ویژگی ری‌اکت ۱۹: هوک use()
در ری‌اکت ۱۹ می‌توانید با هوک \`use()\` مستقیماً یک Promise را در زمان رندر باز کنید. این کار نیاز به استفاده از کامپوننت **Suspense** در والد دارد.

\`\`\`jsx
import { use, Suspense } from 'react';

function Profile({ userPromise }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}
\`\`\`

---

## ۳. کامپوننت‌های سمت سرور (RSC)
این کامپوننت‌ها به شما اجازه می‌دهند مستقیماً با \`async/await\` داده بگیرید. این کدها در سرور اجرا شده و نتیجه نهایی (بدون کد جاوااسکریپت اضافی) به مرورگر فرستاده می‌شود.

---

## خلاصه
- **TanStack Query**: بهترین گزینه برای برنامه‌های تعاملی و پیچیده سمت کلاینت.
- **هوک use()**: راهکاری عالی برای مدیریت ساده پرومیس‌ها در ری‌اکت ۱۹.
- **Server Components**: استاندارد طلایی برای سرعت بارگذاری اولیه و سئو.
`,

  visualizationId: 'data-fetching',
  exerciseId: 'data-fetching',
};

export default dataFetchingLesson;
