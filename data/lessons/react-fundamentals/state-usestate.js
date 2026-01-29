export const stateUsestateLesson = {
  id: 'state-usestate',
  title: 'State and useState Hook',
  titleFa: 'استیت و هوک useState',
  difficulty: 'easy',
  estimatedTime: '45 min',

  content: `
# State & useState - Making UI Dynamic

## Definition
**State** is the memory of a component. While Props are passed from the outside, State is internal and managed by the component itself. It stores data that can change over time—like user input, a counter value, or data from an API. When state changes, React automatically updates the UI.

## Key Features
- **Reactivity**: The UI automatically updates whenever state changes.
- **Persistence**: State is preserved across re-renders of the component.
- **Encapsulation**: State is private to the component where it is defined.
- **Immutability**: React relies on states being treated as unchangeable (read-only) to detect changes efficiently.

---

## 1. The useState Hook
\`useState\` is a Hook that lets you add React state to functional components.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  // count: current value
  // setCount: function to update it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
\`\`\`

---

## 2. Destructuring useState
\`useState(initialValue)\` returns an array with exactly two items:
1. The **current state** value.
2. A **setter function** to update it.

---

## 3. Immutability (The Golden Rule)
**Never mutate state directly!** To update an object or array, you must create a **new copy**.

\`\`\`jsx
// Correct way for Objects
const [user, setUser] = useState({ name: 'John', age: 30 });
setUser({ ...user, age: 31 }); // Create a new object!

// Correct way for Arrays
const [items, setItems] = useState(['Apple', 'Banana']);
setItems([...items, 'Cherry']); // Create a new array!
\`\`\`

---

## 4. Functional Updates
If your new state depends on the old state, use a function to ensure accuracy.

\`\`\`jsx
setCount(prevCount => prevCount + 1);
\`\`\`

---

## Summary
- **State** handles internal, changing data.
- **useState** is the primary tool for managing state.
- **NEVER** change state directly; use the setter function.
`,

  contentFa: `
# استیت (State) و هوک useState

## تعریف
**استیت (State)** حافظه یک کامپوننت است. در حالی که پراپس از بیرون به کامپوننت داده می‌شوند، استیت داخلی است و توسط خود کامپوننت مدیریت می‌شود. استیت داده‌هایی را ذخیره می‌کند که می‌توانند در طول زمان تغییر کنند (مثل ورودی کاربر، مقدار یک شمارنده یا داده‌های دریافتی از سرور). هر بار که استیت تغییر کند، ری‌اکت به صورت خودکار UI را بروزرسانی می‌کند.

## ویژگی‌های اصلی
- **واکنش‌گرایی (Reactivity)**: بروزرسانی خودکار رابط کاربری بلافاصله پس از تغییر استیت.
- **ماندگاری**: مقدار استیت در طول رندرهای مکرر کامپوننت حفظ می‌شود.
- **کپسوله‌سازی**: استیت فقط برای خودِ کامپوننتی که در آن تعریف شده قابل دسترسی است.
- **تغییرناپذیری (Immutability)**: ری‌اکت برای تشخیص تغییرات نیاز دارد که با استیت به عنوان یک داده غیرقابل تغییر رفتار کنید.

---

## ۱. هوک useState چیست؟
این هوک به شما اجازه می‌دهد وضعیت را در کامپوننت‌های تابعی تعریف کنید.

\`\`\`jsx
import { useState } from 'react';

const Counter = () => {
  // count: مقدار فعلی
  // setCount: تابع برای تغییر مقدار
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      تعداد کلیک: {count}
    </button>
  );
};
\`\`\`

---

## ۲. قانون تغییرناپذیری (Immutability)
**هرگز استیت را مستقیم تغییر ندهید!** برای آپدیت کردن یک شیء یا آرایه، حتماً باید یک **نسخه جدید** از آن بسازید.

\`\`\`jsx
// روش درست برای اشیاء
const [user, setUser] = useState({ name: 'بشیر', age: 26 });
setUser({ ...user, age: 27 }); // ساخت یک شیء جدید با Spread Operator

// روش درست برای آرایه‌ها
const [items, setItems] = useState(['سیب', 'موز']);
setItems([...items, 'گیلاس']); // ساخت یک آرایه جدید
\`\`\`

---

## ۳. آپدیت تابعی (Functional Update)
اگر مقدار جدید استیت به مقدار قبلی بستگی دارد، برای دقت بیشتر از یک تابع استفاده کنید:

\`\`\`jsx
setCount(prevCount => prevCount + 1);
\`\`\`

---

## خلاصه
- استیت مسئول مدیریت داده‌های متغیر داخلی است.
- با تغییر استیت، کامپوننت دوباره رندر می‌شود.
- هرگز استیت را مستقیم دستکاری نکنید (Mutate نکنید)؛ همیشه از تابع Setter استفاده کنید.
`,

  visualizationId: 'state-updates',
  exerciseId: 'state-usestate',
};

export default stateUsestateLesson;
