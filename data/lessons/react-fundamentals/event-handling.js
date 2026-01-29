export const eventHandlingLesson = {
  id: 'event-handling',
  title: 'Event Handling',
  titleFa: 'مدیریت رویدادها',
  difficulty: 'easy',
  estimatedTime: '35 min',

  content: `
# Event Handling in React

## Definition
Event handling is the process of capturing user interactions—such as clicks, keyboard presses, or form submissions—and executing specific logic in response. React uses a system called **Synthetic Events** to ensure events work consistently across all web browsers.

## Key Features
- **CamelCase Naming**: Events follow JS naming conventions (e.g., \`onClick\` vs \`onclick\`).
- **Function References**: You pass a function pointer, not a string, to the event handler.
- **Cross-Browser Consistency**: Synthetic events normalize behavior across Chrome, Safari, and Firefox.
- **Automatic Event Delegation**: React manages event listeners efficiently on a root DOM node.

---

## 1. Syntax Differences
In React, you pass a function directly to the event prop.

\`\`\`jsx
// React style ✅
<button onClick={activateLasers}>Activate</button>
\`\`\`

---

## 2. Preventing Default Behavior
In React, you must call \`preventDefault\` explicitly to stop browser defaults like form refreshes.

\`\`\`jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault(); 
    console.log('Submitted!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

---

## 3. Passing Arguments
Use an **arrow function** to pass extra data to your handlers.

\`\`\`jsx
<button onClick={(e) => deleteRow(id, e)}>Delete Row</button>
\`\`\`

---

## 4. Stop Propagation
Use \`e.stopPropagation()\` to prevent an event from bubbling up to parent elements.

\`\`\`jsx
<div onClick={() => console.log('Parent')}>
  <button onClick={(e) => {
    e.stopPropagation();
    console.log('Button');
  }}>
    Stop Bubbling
  </button>
</div>
\`\`\`

---

## Summary
- Events are **camelCase**.
- Pass a **function**, not a string.
- Use **e.preventDefault()** to stop default actions.
- React uses **Synthetic Events** for cross-browser stability.
`,

  contentFa: `
# مدیریت رویدادها (Event Handling) در ری‌اکت

## تعریف
مدیریت رویدادها فرآیند دریافت تعاملات کاربر (مثل کلیک، فشردن کلید یا ارسال فرم) و اجرای یک منطق خاص در پاسخ به آن است. ری‌اکت از سیستمی به نام **Synthetic Events** استفاده می‌کند تا اطمینان حاصل کند که رویدادها در تمام مرورگرها به طور یکسان عمل می‌کنند.

## ویژگی‌های اصلی
- **نام‌گذاری CamelCase**: رویدادها از قواعد نام‌گذاری جاوااسکریپت پیروی می‌کنند (مثلاً \`onClick\` به جای \`onclick\`).
- **ارجاع به تابع (Function Reference)**: شما به جای یک رشته، خودِ تابع را به رویداد پاس می‌دهید.
- **یکپارچگی در مرورگرها**: رویدادهای مصنوعی رفتار مرورگرهای مختلف را یکسان‌سازی می‌کنند.
- **مدیریت بهینه**: ری‌اکت شنونده‌های رویداد را به صورت بهینه مدیریت می‌کند.

---

## ۱. تفاوت‌های نحوی
در ری‌اکت، شما مستقیماً ارجاع به تابع را در پراپ رویداد قرار می‌دهید.

\`\`\`jsx
// روش ری‌اکت ✅
<button onClick={handleClick}>کلیک کنید</button>
\`\`\`

---

## ۲. جلوگیری از رفتار پیش‌فرض
برای جلوگیری از رفتارهای پیش‌فرض مرورگر (مثل رفرش شدن صفحه بعد از ارسال فرم)، باید متد \`preventDefault\` را صدا بزنید.

\`\`\`jsx
function handleSubmit(e) {
  e.preventDefault();
  console.log('فرم ارسال شد');
}
\`\`\`

---

## ۳. ارسال ورودی (Arguments) به تابع
از یک تابع فلشی (Arrow Function) برای ارسال داده‌های اضافی استفاده کنید:

\`\`\`jsx
<button onClick={(e) => deleteUser(userId, e)}>حذف کاربر</button>
\`\`\`

---

## ۴. جلوگیری از حباب (Stop Propagation)
از \`e.stopPropagation()\` برای جلوگیری از نفوذ رویداد به المان‌های والد استفاده کنید.

---

## خلاصه
- نام رویدادها با حروف شتری (camelCase) نوشته می‌شود.
- باید **تابع** پاس بدهیم، نه رشته.
- از **e.preventDefault()** برای کنترل رفتار مرورگر استفاده می‌کنیم.
`,

  visualizationId: 'event-bubbling',
  exerciseId: 'event-handling',
};

export default eventHandlingLesson;
