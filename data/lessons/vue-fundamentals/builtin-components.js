export const builtinComponentsLesson = {
  id: 'builtin-components',
  title: 'Built-in Components',
  titleFa: 'کامپوننت‌های داخلی',
  difficulty: 'easy',
  estimatedTime: '40 min',
  content: `
# Built-in Components in Vue 3

## Definition
Built-in components are specialized tools provided by Vue out-of-the-box to handle common UI challenges. These include managing animations (**Transition**), portal-like rendering (**Teleport**), and handling asynchronous dependencies (**Suspense**).

## Key Features
- **Transition**: Simple enter/leave animations for any element.
- **Suspense**: Orchestrate loading states for async components.
- **Teleport**: Render content anywhere in the DOM (e.g., modals at the end of body).
- **KeepAlive**: Cache component instances to preserve state when switching views.

---

## 1. Transition
Used for exit/enter animations for elements toggled via \`v-if\` or \`v-show\`.

\`\`\`html
<Transition name="fade">
  <p v-if="show">Hello Vue!</p>
</Transition>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
\`\`\`

---

## 2. Suspense (Experimental)
Handles async dependencies by showing a fallback UI while loading.

\`\`\`html
<Suspense>
  <template #default>
    <AsyncUserDetail />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
\`\`\`

---

## 3. Teleport
Allows you to "teleport" a piece of a template to a different part of the DOM tree.

\`\`\`html
<Teleport to="body">
  <div class="modal">I am now at the end of the body!</div>
</Teleport>
\`\`\`

---

## Summary
- **Transition** is for beauty and animations.
- **Suspense** is for managing network/async wait times.
- **Teleport** is for fixing Z-index and layout issues with modals/tooltips.
`,
  contentFa: `
# کامپوننت‌های داخلی در Vue 3

## تعریف
کامپوننت‌های داخلی ابزارهای تخصصی هستند که توسط Vue برای حل چالش‌های رایج رابط کاربری به صورت آماده ارائه می‌شوند. این ابزارها شامل مدیریت انیمیشن‌ها (**Transition**)، رندر کردن در نقاط دیگر DOM (**Teleport**) و مدیریت بارگذاری‌های ناهمگام (**Suspense**) هستند.

## ویژگی‌های اصلی
- **انیمیشن (Transition)**: ایجاد انیمیشن‌های ورود و خروج ساده برای هر المان.
- **انتظار (Suspense)**: مدیریت وضعیت‌های لودینگ برای کامپوننت‌های Async.
- **تله‌پورت (Teleport)**: رندر کردن محتوا در هر نقطه از DOM (مثلاً قرار دادن مودال در انتهای تگ body).
- **KeepAlive**: کش کردن کامپوننت‌ها برای حفظ وضعیت آن‌ها هنگام جابجایی بین صفحات.

---

## ۱. انیمیشن‌های جابجایی (Transition)
برای انیمیشن‌های ورود و خروج المان‌هایی که با \`v-if\` یا \`v-show\` تغییر می‌کنند استفاده می‌شود.

\`\`\`html
<Transition name="fade">
  <p v-if="show">سلام Vue!</p>
</Transition>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
\`\`\`

---

## ۲. کامپوننت Suspense
وابستگی‌های نامتقارن (async) را با نمایش یک رابط کاربری جایگزین (Fallback) در هنگام بارگذاری مدیریت می‌کند.

\`\`\`html
<Suspense>
  <template #default>
    <AsyncUserDetail />
  </template>
  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
\`\`\`

---

## ۳. تله‌پورت (Teleport)
به شما اجازه می‌دهد بخشی از قالب را به مکان دیگری در درخت DOM (مثلاً خارج از سلسله مراتب والد) منتقل کنید.

\`\`\`html
<Teleport to="body">
  <div class="modal">من الان در انتهای بادی هستم!</div>
</Teleport>
\`\`\`

---

## خلاصه
- **Transition** برای زیبایی و تجربه کاربری بهتر است.
- **Suspense** برای مدیریت زمان انتظار شبکه و لودینگ است.
- **Teleport** برای حل مشکلات Z-index و لایه‌بندی مودال‌ها و تولتیپ‌ها عالی است.
`
};
