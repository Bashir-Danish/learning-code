export const contextApiLesson = {
  id: 'context-api',
  title: 'Context API',
  titleFa: 'Context API و مدیریت وضعیت سراسری',
  difficulty: 'medium',
  estimatedTime: '45 min',

  content: `
# Context API - Global State WITHOUT Prop Drilling

## Definition
The **Context API** is a React feature that allows you to share data (state) across the entire component tree without having to pass props manually through every level. It effectively solves the "Prop Drilling" problem, where data needs to reach a deep child component but has no use in the intermediate parents.

## Key Features
- **Centralized Data**: Store global info like User profiles, Themes, or Language settings in one place.
- **Provider Pattern**: Wrap your app once and access its values anywhere.
- **Improved Maintainability**: Reduces code clutter by eliminating unnecessary intermediate props.
- **React 19 Compatibility**: Supports the new \`use()\` hook for more flexible context consumption.

---

## 1. Creating Context
First, create the "container" for your shared data.

\`\`\`jsx
import { createContext } from 'react';

export const ThemeContext = createContext('light'); // 'light' is the fallback value
\`\`\`

---

## 2. Providing Context
Use the **Provider** component to wrap the part of your app that needs the data.

\`\`\`jsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <MainLayout />
    </ThemeContext.Provider>
  );
}
\`\`\`

---

## 3. Consuming Context
The easiest way to read the context in a child component is the \`useContext\` hook.

\`\`\`jsx
import { useContext } from 'react';
import { ThemeContext } from './App';

function Header() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Header Section</div>;
}
\`\`\`

---

## Summary
- **createContext**: Defines the data store.
- **Provider**: Broadcasts the data to the tree.
- **useContext**: Receives the data in any child component.
- Best for **static** or **slow-changing** global data (Theme, Auth, Locale).
`,

  contentFa: `
# Context API - مدیریت وضعیت بدون Prop Drilling

## تعریف
**Context API** یکی از قابلیت‌های ری‌اکت است که به شما اجازه می‌دهد داده‌ها (وضعیت) را در کل درخت کامپوننت به اشتراک بگذارید، بدون اینکه مجبور باشید به صورت دستی کدمان را درگیر ارسال پراپس (Props) در تمام لایه‌ها کنید. این ابزار به طور هوشمندانه‌ای مشکل **Prop Drilling** را حل می‌کند؛ یعنی زمانی که یک داده باید به یک فرزند در عمق زیاد برسد اما والد‌های میانی نیازی به آن ندارند.

## ویژگی‌های اصلی
- **داده‌های متمرکز**: ذخیره اطلاعات سراسری مثل پروفایل کاربر، تم یا زبان برنامه در یک نقطه.
- **الگوی فراهم‌کننده (Provider)**: یک‌بار برنامه را بپوشانید و در هر جا به مقادیر آن دسترسی داشته باشید.
- **نگهداری آسان‌تر کد**: کاهش شلوغی کد با حذف پراپس‌های اضافی و میانی.
- **سازگاری با ری‌اکت ۱۹**: پشتیبانی از هوک جدید \`use()\` برای خواندن منعطف‌تر کانتکست.

---

## ۱. ساخت Context
ابتدا "کانتینر" مربوط به داده‌های مشترک خود را بسازید.

\`\`\`jsx
import { createContext } from 'react';
export const ThemeContext = createContext('light'); // مقدار پیش‌فرض 'light'
\`\`\`

---

## ۲. استفاده از Provider (فراهم‌کننده)
از کامپوننت **Provider** برای دورپیچ کردن بخشی از برنامه که به داده‌ها نیاز دارد استفاده کنید.

\`\`\`jsx
<ThemeContext.Provider value="dark">
  <MainLayout />
</ThemeContext.Provider>
\`\`\`

---

## ۳. استفاده از useContext (مصرف‌کننده)
ساده‌ترین راه برای خواندن داده در هر کامپوننت فرزند، استفاده از هوک \`useContext\` است.

\`\`\`jsx
import { useContext } from 'react';
import { ThemeContext } from './App';

const UserProfile = () => {
  const theme = useContext(ThemeContext);
  return <div className={theme}>نمایه کاربر</div>;
};
\`\`\`

---

## خلاصه
- **createContext**: کانتینر ذخیره داده را تعریف می‌کند.
- **Provider**: داده‌ها را به کل درخت ارسال می‌کند.
- **useContext**: داده‌ها را در هر فرزندی دریافت می‌کند.
- برای داده‌های سراسری که **به ندرت تغییر می‌کنند** (مثل تم یا زبان) عالی است.
`,

  visualizationId: 'context-api',
  exerciseId: 'context-api',
};

export default contextApiLesson;
