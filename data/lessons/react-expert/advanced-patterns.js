export const advancedPatternsLesson = {
  id: 'advanced-patterns',
  title: 'Advanced React Patterns',
  titleFa: 'الگوهای پیشرفته ری‌اکت',
  difficulty: 'expert',
  estimatedTime: '60 min',
  content: `
# Advanced React Patterns

## Definition
Advanced React Patterns are architectural solutions to common challenges in component design. They focus on reusability, separation of concerns, and creating flexible APIs for complex components.

## Key Features
- **Reusability**: Share logic between components without code duplication.
- **Inversion of Control**: Let the consumer control the rendering behavior.
- **Composability**: Build complex UIs by combining small, focused components.
- **Clean Architecture**: Isolate business logic from UI concerns.

---

## 1. Compound Components
Think of \`<Select>\` and \`<Option>\`. They work together and share internal state implicitly.

\`\`\`jsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger value="one">Tab 1</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">Content 1</Tabs.Content>
</Tabs>
\`\`\`

---

## 2. Render Props
A pattern where a component's prop is a function used to determine what to render.

\`\`\`jsx
<MouseTracker render={mouse => (
  <p>The mouse position is {mouse.x}, {mouse.y}</p>
)} />
\`\`\`

---

## 3. High-Order Components (HOC)
A function that takes a component and returns a new component with added functionality.

\`\`\`jsx
const withAuth = (WrappedComponent) => {
  return (props) => {
    return isAuthenticated ? <WrappedComponent {...props} /> : <Login />;
  }
}
\`\`\`
`,
  contentFa: `
# الگوهای پیشرفته ری‌اکت

## تعریف
الگوهای پیشرفته در ری‌اکت راهکارهای معماری برای چالش‌های رایج در طراحی کامپوننت‌ها هستند. این الگوها بر روی قابلیت استفاده مجدد (Reusability)، جداسازی دغدغه‌ها و ساخت APIهای منعطف برای کامپوننت‌های پیچیده تمرکز دارند.

## ویژگی‌های اصلی
- **قابلیت استفاده مجدد**: اشتراک‌گذاری منطق بین کامپوننت‌ها بدون تکرار کد.
- **وارونگی کنترل (Inversion of Control)**: اجازه به مصرف‌کننده برای کنترل نحوه رندر شدن.
- **ترکیب‌پذیری (Composability)**: ساخت رابط‌های کاربری پیچیده با ترکیب قطعات کوچک.
- **معماری تمیز**: جداسازی منطق بیزنس از ظاهر برنامه.

---

## ۱. کامپوننت‌های ترکیبی (Compound Components)
مثل \`<Select>\` و \`<Option>\`. این کامپوننت‌ها با هم کار می‌کنند و وضعیت داخلی را به صورت ضمنی به اشتراک می‌گذارند.

\`\`\`jsx
<Tabs>
  <Tabs.List>
    <Tabs.Trigger value="one">تب ۱</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">محتوای ۱</Tabs.Content>
</Tabs>
\`\`\`

---

## ۲. رندر پراپس (Render Props)
الگویی که در آن ورودی (Prop) یک کامپوننت، یک تابع است که مشخص می‌کند چه چیزی رندر شود.

\`\`\`jsx
<MouseTracker render={mouse => (
  <p>موقعیت ماوس: {mouse.x}, {mouse.y}</p>
)} />
\`\`\`

---

## ۳. کامپوننت‌های مرتبه بالاتر (HOC)
تابعی که یک کامپوننت را گرفته و یک کامپوننت جدید با قابلیت‌های اضافه شده برمی‌گرداند.

\`\`\`jsx
const withAuth = (WrappedComponent) => {
  return (props) => {
    return isAuthenticated ? <WrappedComponent {...props} /> : <Login />;
  }
}
\`\`\`
`
};

export default advancedPatternsLesson;
