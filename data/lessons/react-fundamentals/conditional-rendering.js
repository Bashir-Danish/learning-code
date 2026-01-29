export const conditionalRenderingLesson = {
  id: 'conditional-rendering',
  title: 'Conditional Rendering',
  titleFa: 'رندرینگ شرطی',
  difficulty: 'easy',
  estimatedTime: '30 min',

  content: `
# Conditional Rendering

## Definition
Conditional rendering in React is the ability to display different UI elements or components based on certain conditions. It works just like standard JavaScript control flow (if/else, ternary, etc.), allowing the interface to adapt dynamically to state changes.

## Key Features
- **Adaptive UI**: Show different screens for guests vs. logged-in users.
- **Dynamic Content**: Toggle visibility of menus, modals, and loaders.
- **Short-circuit Logic**: Use (\`&&\`) to show elements ONLY if a condition is true.
- **Null Rendering**: Return \`null\` to completely hide a component from the DOM.

---

## 1. if Statement
Use a standard \`if\` statement inside your component function before the \`return\`.

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}
\`\`\`

---

## 2. Ternary Operator (\`condition ? true : false\`)
The most common way to render elements conditionally **inline** inside the JSX.

\`\`\`jsx
<div>
  The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
</div>
\`\`\`

---

## 3. Logical AND Operator (\`&&\`)
Used when you want to show something if true, and nothing if false.

\`\`\`jsx
<div>
  {unreadMessages.length > 0 && (
    <h2>You have {unreadMessages.length} unread messages!</h2>
  )}
</div>
\`\`\`

---

## 4. Preventing Rendering (null)
To hide a component completely, make it return \`null\`.

\`\`\`jsx
function WarningBanner({ warn }) {
  if (!warn) return null;
  return <div className="warning">Warning!</div>;
}
\`\`\`

---

## 5. Important Pitfall: The Number 0
React will render the number \`0\` if the condition on the left side of \`&&\` results in exactly \`0\`. Always use a boolean comparison.

\`\`\`jsx
// Don't do this ❌
{count && <Component />} // Renders '0' if count is 0

// Do this ✅
{count > 0 && <Component />}
\`\`\`

---

## Summary
- Use **Ternary (\`?:\`)** for simple either/or logic inside JSX.
- Use **Logical AND (\`&&\`)** for simple show/hide logic.
- Return **null** to prevent any rendering.
`,

  contentFa: `
# رندرینگ شرطی (Conditional Rendering)

## تعریف
رندرینگ شرطی در ری‌اکت به معنای توانایی نمایش عناصر یا کامپوننت‌های مختلف بر اساس شرایط خاص است. این قابلیت دقیقاً مثل دستورات کنترلی استاندارد جاوااسکریپت (if/else، عملگر سه تایی و غیره) عمل می‌کند و اجازه می‌دهد رابط کاربری به صورت پویا با تغییرات وضعیت هماهنگ شود.

## ویژگی‌های اصلی
- **رابط کاربری تطبیقی**: نمایش صفحات متفاوت برای مهمانان در مقابل کاربران وارد شده.
- **محتوای پویا**: مدیریت نمایش منوها، مودال‌ها و لودرها.
- **منطق اتصال کوتاه (Short-circuit)**: استفاده از (\`&&\`) برای نمایش المان‌ها فقط در صورت درست بودن شرط.
- **رندرینگ پوچ (Null)**: بازگرداندن \`null\` برای مخفی کردن کامل یک کامپوننت از صفحه.

---

## ۱. استفاده از دستور if
استفاده از \`if\` معمولی قبل از دستور \`return\` برای منطق‌های پیچیده‌تر.

\`\`\`jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>خوش آمدید!</h1>;
  }
  return <h1>لطفاً ثبت‌نام کنید.</h1>;
}
\`\`\`

---

## ۲. عملگر شرطی سه مرحله‌ای (Ternary Operator)
رایج‌ترین روش برای شرط‌های "اگر-آنگاه-وگرنه" درون کدهای JSX.

\`\`\`jsx
<div>
  وضعیت کاربر: <b>{isLoggedIn ? 'آنلاین' : 'آفلاین'}</b>
</div>
\`\`\`

---

## ۳. عملگر منطقی &&
وقتی می‌خواهید چیزی را فقط در صورت درست بودن شرط نشان دهید.

\`\`\`jsx
<div>
  {messages.length > 0 && (
    <h2>شما {messages.length} پیام جدید دارید!</h2>
  )}
</div>
\`\`\`

---

## ۴. جلوگیری از رندر (بازگرداندن null)
اگر می‌خواهید یک کامپوننت اصلاً نمایش داده نشود، کافیست مقدار \`null\` را برگردانید.

\`\`\`jsx
function Warning({ warn }) {
  if (!warn) return null;
  return <div>هشدار!</div>;
}
\`\`\`

---

## ۵. نکته مهم: عدد صفر
در ری‌اکت اگر در سمت چپ \`&&\` عدد صفر قرار بگیرد، خود عدد رندر می‌شود. همیشه از مقایسه صریح استفاده کنید.

\`\`\`jsx
// اشتباه ❌
{count && <Component />} // اگر صفر باشد، عدد 0 نمایش داده می‌شود

// درست ✅
{count > 0 && <Component />}
\`\`\`

---

## خلاصه
- برای شرط‌های دوتایی ساده درون JSX از **عملگر سه تایی (\`? :\`)** استفاده کنید.
- برای نمایش/عدم نمایش از **عملگر (\`&&\`)** استفاده کنید.
- با بازگرداندن **null** کامپوننت را کاملاً مخفی کنید.
`,

  visualizationId: 'conditional-rendering',
  exerciseId: 'conditional-rendering',
};

export default conditionalRenderingLesson;
