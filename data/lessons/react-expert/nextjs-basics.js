export const nextjsBasicsLesson = {
  id: 'nextjs-basics',
  title: 'Next.js 15 (App Router)',
  titleFa: 'مبانی Next.js 15',
  difficulty: 'expert',
  estimatedTime: '60 min',
  content: `
# Next.js 15 - The React Framework

## Definition
Next.js is a React framework that enables server-side rendering and static site generation for React-based web applications. It provides a production-ready environment with automatic optimization of images, fonts, and scripts.

## Key Features
- **App Router**: A powerful file-system based router.
- **Server Components**: Render components on the server for better performance.
- **Server Actions**: Handle form submissions and data mutations without manual API routes.
- **Built-in Optimization**: Automatic image, font, and script optimization.

---

## 1. App Router
Next.js 15 uses the App Router, which is based on the file system.
- \`app/page.js\`: Home page.
- \`app/about/page.js\`: About page (\`/about\`).
- \`app/layout.js\`: Shared layout for the whole app.

---

## 2. Server vs Client Components
- By default, all components in the \`app\` directory are **Server Components**.
- Use \`"use client"\` only when you need interactivity (state, effects).

---

## 3. Server Actions
The biggest feature of Next.js 15. You can write functions that run on the server but are called directly from your forms.

\`\`\`jsx
async function createUser(formData) {
  "use server";
  const name = formData.get("name");
  await db.user.create({ data: { name } });
}

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">Create User</button>
    </form>
  );
}
\`\`\`
`,
  contentFa: `
# مبانی Next.js 15 (App Router)

## تعریف
Next.js یک فریمورک قدرتمند برای ری‌اکت است که قابلیت‌هایی مثل رندر سمت سرور (SSR) و تولید سایت‌های استاتیک (SSG) را به سادگی فراهم می‌کند. این فریمورک محیطی آماده برای تولید با بهینه‌سازی خودکار تصاویر، فونت‌ها و اسکریپت‌ها ارائه می‌دهد.

## ویژگی‌های اصلی
- **App Router**: مسیریابی پیشرفته بر پایه سیستم فایل.
- **Server Components**: رندر کامپوننت‌ها در سمت سرور برای سرعت بیشتر.
- **Server Actions**: مدیریت فرم‌ها و تغییرات داده بدون نیاز به نوشتن دستی API.
- **بهینه‌سازی داخلی**: بهینه‌سازی خودکار عکس، فونت و کدها.

---

## ۱. ساختار پوشه‌ها (App Router)
در نسخه جدید، هر پوشه در دایرکتوری \`app\` تبدیل به یک مسیر (Route) می‌شود.
- \`app/page.js\`: صفحه اصلی.
- \`app/about/page.js\`: صفحه درباره ما.
- \`app/layout.js\`: قالب مشترک (Layout) برای کل برنامه.

---

## ۲. کامپوننت‌های سروری و کلاینتی
- به صورت پیش‌فرض، تمام کامپوننت‌ها در پوشه \`app\` از نوع **Server Components** هستند.
- فقط در صورت نیاز به تعامل (استیت یا افکت)، از دستور \`"use client"\` استفاده کنید.

---

## ۳. قابلیت Server Actions
مهم‌ترین ویژگی Next.js 15 که به شما اجازه می‌دهد توابعی بنویسید که در سرور اجرا می‌شوند اما مستقیم از سمت فرم فراخوانی می‌شوند.

\`\`\`jsx
async function createUser(formData) {
  "use server";
  const name = formData.get("name");
  await db.user.create({ data: { name } });
}

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">ساخت کاربر</button>
    </form>
  );
}
\`\`\`
`
};

export default nextjsBasicsLesson;
