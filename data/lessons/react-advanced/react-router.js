export const reactRouterLesson = {
  id: 'react-router',
  title: 'React Router v7',
  titleFa: 'مسیربابی با React Router v7',
  difficulty: 'hard',
  estimatedTime: '60 min',

  content: `
# React Router v7 - Modern Routing

## Definition
**React Router v7** is the industry-standard routing library for React applications. It enables "Client-Side Routing," allowing your app to update the URL and change views without a full page reload. Version 7 integrates the powerful data-loading features of Remix, making it a high-performance framework for building complex web apps.

## Key Features
- **Declarative Routing**: Map URLs to components using a simple, object-based configuration.
- **Nested Routes**: Build complex layouts (like sidebars with changing content) using \`<Outlet />\`.
- **Data Loaders**: Fetch data *before* a component renders to eliminate loading spinners and waterfalls.
- **Dynamic Routing**: Capture values from the URL (e.g., \`/user/123\`) using the \`useParams\` hook.

---

## 1. Setup and Basic Routing
In modern React Router, we define routes using an array of objects and provide them to the \`RouterProvider\`.

\`\`\`jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/user/:id",
    element: <Profile />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}
\`\`\`

---

## 2. Navigation
Use the **Link** component for SEO-friendly navigation and the **useNavigate** hook for programmatic jumps (e.g., after clicking a "Submit" button).

\`\`\`jsx
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/about">About</Link>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </nav>
  );
}
\`\`\`

---

## 3. Data Loaders (React Router v7)
Instead of fetching data inside \`useEffect\`, you can load it before the page even mounts.

\`\`\`jsx
export async function loader({ params }) {
  const response = await fetch(\`/api/users/\${params.id}\`);
  return response.json();
}

function Profile() {
  const user = useLoaderData(); // Data is ready immediately!
  return <h1>{user.name}</h1>;
}
\`\`\`

---

## Summary
- **Client-Side Routing**: Updates the UI without refreshing the browser.
- **useParams**: Access dynamic URL segments.
- **Outlet**: Renders child routes inside a parent layout.
- **Loaders**: Optimize performance by fetching data early.
`,

  contentFa: `
# مسیربابی با React Router v7

## تعریف
**React Router v7** کتابخانه استاندارد برای مدیریت مسیرها (Routing) در اپلیکیشن‌های ری‌اکت است. این ابزار قابلیت "مسیریابی سمت کلاینت" را فراهم می‌کند، به این معنی که می‌توانید بدون بارگذاری مجدد کل صفحه (Refresh)، URL را تغییر داده و محتوای صفحه را عوض کنید. نسخه ۷ با ترکیب ویژگی‌های پیشرفته لود کردن داده، عملکردی فوق‌العاده برای برنامه‌های پیچیده ارائه می‌دهد.

## ویژگی‌های اصلی
- **مسیریابی توصیفی**: نقشه‌برداری ساده URLها به کامپوننت‌ها با استفاده از پیکربندی شیء-محور.
- **مسیرهای تو-در-تو (Nested)**: ساخت لایوت‌های پیچیده (مثل پنل مدیریت با منوی کناری ثابت) با استفاده از \`<Outlet />\`.
- **لودرهای داده (Loaders)**: دریافت داده‌ها *قبل* از رندر شدن کامپوننت برای حذف لودینگ‌های خسته‌کننده.
- **مسیریابی پویا**: استخراج مقادیر از URL (مثل \`/user/123\`) با استفاده از هوک \`useParams\`.

---

## ۱. راه‌ اندازی اولیه
در نسخه‌های مدرن، مسیرها را به صورت یک آرایه تعریف کرده و به \`RouterProvider\` می‌دهیم.

\`\`\`jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/profile/:username", element: <UserDetail /> }
]);

const App = () => <RouterProvider router={router} />;
\`\`\`

---

## ۲. جابجایی بین صفحات
از کامپوننت **Link** برای جابجایی سئو-محور و از هوک **useNavigate** برای جابجایی‌های برنامه‌نویسی شده (مثلاً بعد از ثبت موفقیت‌آمیز یک فرم) استفاده کنید.

\`\`\`jsx
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <nav>
      <Link to="/about">درباره ما</Link>
      <button onClick={() => navigate('/login')}>ورود</button>
    </nav>
  );
}
\`\`\`

---

## ۳. استفاده از لودرها (Loaders)
به جای استفاده از \`useEffect\` برای گرفتن داده، در نسخه ۷ می‌توانید داده را قبل از باز شدن صفحه آماده کنید.

\`\`\`jsx
export async function loader({ params }) {
  return fetch(\`/api/user/\${params.username}\`);
}

function UserDetail() {
  const data = useLoaderData(); // داده‌ها همین الان آماده هستند!
  return <h1>{data.fullName}</h1>;
}
\`\`\`

---

## خلاصه
- **Client-Side Routing**: بروزرسانی ظاهر برنامه بدون رفرش شدن مرورگر.
- **useParams**: دسترسی به بخش‌های متغیر URL.
- **Outlet**: رندر کردن مسیرهای فرزند درون یک لایوت والد.
- **Loaders**: بهینه‌سازی سرعت با دریافت پیش‌دستانه داده‌ها.
`,

  visualizationId: 'routing',
  exerciseId: 'react-router',
};

export default reactRouterLesson;
