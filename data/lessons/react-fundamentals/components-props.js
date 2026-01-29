export const componentsPropsLesson = {
  id: 'components-props',
  title: 'Components and Props',
  titleFa: 'کامپوننت‌ها و پراپس',
  difficulty: 'easy',
  estimatedTime: '40 min',

  content: `
# Components & Props - The Building Blocks

## Definition
Components are the independent, reusable building blocks of a React application. They act like functions that accept inputs (called **Props**) and return UI elements (JSX). This architecture allows you to build complex interfaces from small, manageable pieces.

## Key Features
- **Reusability**: Use the same UI logic multiple times with different data.
- **Independence**: Each component manages its own logic and style.
- **Composition**: Build giant UIs by nesting smaller components within each other.
- **Predictability**: Props flow in one direction (Top-to-Bottom), making apps easier to debug.

---

## 1. Defining Components
Modern React uses **Functional Components**. They are simply JavaScript functions that return JSX.

\`\`\`jsx
// Arrow Function (Very Common)
const UserProfile = () => {
  return <div>User Profile Content</div>;
};
\`\`\`

---

## 2. Using Components
You can use components just like HTML tags. Remember: **React components must start with a Capital Letter**.

\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}
\`\`\`

---

## 3. Props (Properties)
Props are the way you pass data from a parent to a child. IMPORTANT: Props are **read-only** (immutable).

\`\`\`jsx
// Passing props
const element = <Welcome name="Sara" age={25} />;

// Receiving props via Destructuring
const Welcome = ({ name, age }) => {
  return <h1>Hello, {name} (Age: {age})</h1>;
};
\`\`\`

---

## 4. The "children" Prop
A special prop that allows you to pass content between the opening and closing tags of a component.

\`\`\`jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
<Card title="My Card">
  <p>This content goes into the children slot!</p>
</Card>
\`\`\`

---

## Summary
- **Components** are UI pieces. **Props** are the data in those pieces.
- Props flow **downwards** only.
- Components must be **Capitalized**.
`,

  contentFa: `
# کامپوننت‌ها و پراپس - سنگ بنای ری‌اکت

## تعریف
کامپوننت‌ها بلوک‌های سازنده مستقل و قابل استفاده مجدد در یک اپلیکیشن ری‌اکت هستند. آن‌ها مثل توابعی عمل می‌کنند که ورودی‌هایی (به نام **Props**) را می‌گیرند و عناصر رابط کاربری (JSX) را برمی‌گردانند. این معماری به شما اجازه می‌دهد رابط‌های کاربری پیچیده را از قطعات کوچک و قابل مدیریت بسازید.

## ویژگی‌های اصلی
- **قابلیت استفاده مجدد**: استفاده از یک منطق UI چندین بار با داده‌های متفاوت.
- **استقلال**: هر کامپوننت منطق و ظاهر خاص خود را مدیریت می‌کند.
- **ترکیب‌پذیری (Composition)**: ساخت UIهای بزرگ با قرار دادن کامپوننت‌های کوچک درون هم.
- **قابل پیش‌بینی بودن**: داده‌ها فقط از بالا به پایین جریان می‌یابند که دیباگ کردن را ساده می‌کند.

---

## ۱. تعریف کامپوننت‌ها
در ری‌اکت مدرن از **کامپوننت‌های تابعی** استفاده می‌شود. آن‌ها صرفاً توابع جاوااسکریپتی هستند که JSX برمی‌گردانند.

\`\`\`jsx
// استفاده از Arrow Function (بسیار رایج)
const UserProfile = () => {
  return <div>محتوای پروفایل کاربر</div>;
};
\`\`\`

---

## ۲. استفاده از کامپوننت‌ها
شما می‌توانید از کامپوننت‌ها مثل تگ‌های HTML استفاده کنید. به یاد داشته باشید: **نام کامپوننت‌ها حتماً باید با حرف بزرگ شروع شود.**

\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <MainContent />
    </div>
  );
}
\`\`\`

---

## ۳. پراپس (Props) چیست؟
پراپس راه انتقال داده از والد به فرزند است. نکته مهم: پراپس **فقط-خواندنی** هستند و فرزند نباید آن‌ها را تغییر دهد.

\`\`\`jsx
// ارسال پراپس
const element = <Welcome name="سارا" age={25} />;

// دریافت پراپس با استفاده از Destructuring
const Welcome = ({ name, age }) => {
  return <h1>سلام {name} (سن: {age})</h1>;
};
\`\`\`

---

## ۴. ویژگی children
یک پراپ خاص که اجازه می‌دهد محتوای بین تگ‌های باز و بسته یک کامپوننت را مدیریت کنید.

\`\`\`jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// نحوه استفاده
<Card title="کارت من">
  <p>این متن درون پراپ children قرار می‌گیرد!</p>
</Card>
\`\`\`

---

## خلاصه
- **کامپوننت‌ها** قطعات UI هستند و **پراپس** داده‌های آن قطعات.
- جریان داده همیشه از **والد به فرزند** است.
- نام کامپوننت‌ها باید با **حرف بزرگ** شروع شود.
`,

  visualizationId: 'component-tree',
  exerciseId: 'components-props',
};

export default componentsPropsLesson;
