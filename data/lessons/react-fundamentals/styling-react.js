export const stylingReactLesson = {
  id: 'styling-react',
  title: 'Styling in React',
  titleFa: 'استایل‌دهی در ری‌اکت',
  difficulty: 'easy',
  estimatedTime: '30 min',

  content: `
# Styling Components in React

## Definition
Styling in React is the process of applying visual designs to components. React doesn't prescribe a single method; instead, it supports multiple patterns ranging from standard CSS and **CSS Modules** to utility-first frameworks like **Tailwind CSS** and CSS-in-JS libraries.

## Key Features
- **Scoped Styling**: Prevent global style leaks using CSS Modules.
- **Dynamic Classes**: Toggle styles based on component state or props.
- **Utility-First (Tailwind)**: Build complex designs rapidly with pre-defined classes.
- **Inline Safety**: JavaScript objects for styles prevent syntax errors found in strings.

---

## 1. Inline Styles
Inline styles are written as JavaScript objects. Properties are \`camelCased\`.

\`\`\`jsx
const divStyle = {
  color: 'blue',
  backgroundColor: 'lightgray',
  padding: '10px'
};

function StyledComponent() {
  return <div style={divStyle}>I am styled inline!</div>;
}
\`\`\`

---

## 2. CSS Modules (Standard)
CSS Modules generate unique class names automatically to avoid global CSS collisions.

\`\`\`jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.error}>Delete</button>;
}
\`\`\`

---

## 3. Tailwind CSS (Recommended)
Tailwind uses utility classes directly in your JSX, making development extremely fast.

\`\`\`jsx
<section className="bg-blue-500 p-8 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-white">Hello Tailwind!</h1>
</section>
\`\`\`

---

## 4. Dynamic Classes
Use libraries like \`clsx\` or \`tailwind-merge\` to handle conditional styles cleanly.

\`\`\`jsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function Button({ variant, className }) {
  const classes = twMerge(
    clsx(
      'px-4 py-2 rounded',
      variant === 'primary' && 'bg-blue-600 text-white',
      className
    )
  );
  return <button className={classes}>Click Me</button>;
}
\`\`\`

---

## Summary
- **Inline Styles**: JS Objects, use \`camelCase\`.
- **Tailwind CSS**: Currently the most popular choice for rapid UI build.
- **Dynamic Classes**: Crucial for state-driven UIs.
`,

  contentFa: `
# استایل‌دهی به کامپوننت‌ها در ری‌اکت

## تعریف
استایل‌دهی در ری‌اکت فرآیند اعمال طرح‌های بصری به کامپوننت‌ها است. ری‌اکت شما را به یک روش خاص محدود نمی‌کند؛ بلکه از چندین الگو پشتیبانی می‌کند، از CSS معمولی و **CSS Modules** گرفته تا فریمورک‌های مدرن مثل **Tailwind CSS** و کتابخانه‌های CSS-in-JS.

## ویژگی‌های اصلی
- **استایل‌های محدود (Scoped)**: جلوگیری از نشت استایل به کل پروژه با استفاده از CSS Modules.
- **کلاس‌های پویا**: فعال/غیرفعال کردن استایل‌ها بر اساس وضعیت (State) یا ورودی‌ها.
- **Utility-First (مثل Tailwind)**: ساخت سریع طرح‌های پیچیده با کلاس‌های از پیش تعریف شده.
- **امنیت در خط (Inline)**: استفاده از اشیاء جاوااسکریپت برای استایل‌ها که از خطاهای نگارشی جلوگیری می‌کند.

---

## ۱. استایل‌های خطی (Inline Styles)
استایل‌های خطی به صورت اشیاء جاوااسکریپت نوشته می‌شوند و ویژگی‌ها به صورت حروف شتری (camelCase) هستند.

\`\`\`jsx
const divStyle = {
  color: 'blue',
  backgroundColor: 'lightgray',
  padding: '10px'
};

function StyledComponent() {
  return <div style={divStyle}>من استایل خطی دارم!</div>;
}
\`\`\`

---

## ۲. استفاده از CSS Modules
این روش نام‌های منحصر به فردی برای کلاس‌ها تولید می‌کند تا از تداخل استایل‌ها در کل پروژه جلوگیری شود.

\`\`\`jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.error}>حذف</button>;
}
\`\`\`

---

## ۳. استفاده از Tailwind CSS
در حال حاضر محبوب‌ترین روش برای توسعه سریع رابط کاربری در ری‌اکت است.

\`\`\`jsx
<section className="bg-blue-600 p-8 rounded-xl shadow-lg">
  <h1 className="text-3xl font-bold text-white">سلام Tailwind!</h1>
</section>
\`\`\`

---

## ۴. کلاس‌های پویا
برای مدیریت تمیز استایل‌های شرطی از کتابخانه \`clsx\` یا \`tailwind-merge\` استفاده کنید.

\`\`\`jsx
<button className={clsx(
  'px-4 py-2 rounded',
  isActive ? 'bg-green-500' : 'bg-gray-500'
)}>
  تأیید
</button>
\`\`\`

---

## خلاصه
- **استایل خطی**: به صورت شیء (Object) نوشته می‌شود.
- **Tailwind CSS**: بهترین انتخاب برای سرعت بالای توسعه و سئوی مناسب.
- **کلاس پویا**: برای رابط‌های کاربری که با تغییر وضعیت تغییر می‌کنند، ضروری است.
`,

  visualizationId: 'styling-patterns',
  exerciseId: 'styling-react',
};

export default stylingReactLesson;
