export const directivesBuiltinLesson = {
  id: 'directives-builtin',
  title: 'Built-in Directives (v-once, v-memo)',
  titleFa: 'دایرکتیوهای داخلی (v-once, v-memo)',
  difficulty: 'easy',
  estimatedTime: '35 min',
  content: `
# Built-in Directives (v-once, v-memo)

## Definition
Built-in directives in Vue are special tokens in the markup that tell the library to do something to a DOM element. Specialized directives like **v-once** and **v-memo** are used for performance optimization by telling Vue exactly when (or if) it should re-render a specific part of the user interface.

## Key Features
- **Stateless Rendering (v-once)**: Render once and forget. Perfect for static text or labels.
- **Dependency Tracking (v-memo)**: Only update if a specific variable changes.
- **Resource Saving**: Reduce CPU usage by skipping the virtual DOM diffing process.
- **List Optimization**: Drastically improve the performance of long, complex lists.

---

## 1. v-once
Use this for content that is loaded once and never needs to change. This tells Vue to skip this element during future re-renders.

\`\`\`html
<!--msg will be rendered once and fixed forever -->
<span v-once>Fixed message: {{ msg }}</span>
\`\`\`

---

## 2. v-memo (Vue 3.2+)
Memoizes a sub-tree of the template. Vue will only re-render the content inside this tag if one of the values in the array changes.

\`\`\`html
<div v-memo="[user.name, user.status]">
  <p>Name: {{ user.name }}</p>
  <p>Status: {{ user.status }}</p>
  <!-- Even if other user properties change, this DIV won't re-render -->
</div>
\`\`\`

---

## Summary
- Use **v-once** for static text or configuration display.
- Use **v-memo** for heavy components or long lists where most items don't change often.
`,
  contentFa: `
# دایرکتیوهای داخلی (v-once, v-memo)

## تعریف
دایرکتیوهای داخلی در Vue نشانه‌های خاصی در قالب (Markup) هستند که به کتابخانه می‌گویند چه کاری با یک المان DOM انجام دهد. دایرکتیوهای تخصصی مثل **v-once** و **v-memo** برای بهینه‌سازی عملکرد (Performance) استفاده می‌شوند. این دستورات به Vue می‌گویند دقیقاً چه زمانی (یا اصلاً چه زمانی) باید بخش خاصی از رابط کاربری را دوباره رندر کند.

## ویژگی‌های اصلی
- **رندر بدون وضعیت (v-once)**: یک بار رندر کن و تمام. عالی برای متون یا برچسب‌های ثابت.
- **ردیابی وابستگی (v-memo)**: فقط در صورتی آپدیت کن که یک متغیر خاص تغییر کرده باشد.
- **صرفه‌جویی در منابع**: کاهش مصرف CPU با نادیده گرفتن فرآیند Diffing در DOM مجازی.
- **بهینه‌سازی لیست‌ها**: بهبود چشم‌گیر سرعت در لیست‌های طولانی و پیچیده.

---

## ۱. دایرکتیو v-once
از این دستور برای محتواهایی استفاده کنید که یک بار بارگذاری می‌شوند و هرگز نیازی به تغییر ندارند. این کار باعث می‌شود Vue در رندرهای بعدی این المان را نادیده بگیرد.

\`\`\`html
<!-- مقدار msg فقط یک بار رندر شده و ثابت می‌ماند -->
<span v-once>پیام ثابت: {{ msg }}</span>
\`\`\`

---

## ۲. دایرکتیو v-memo (مخصوص Vue 3.2 به بالا)
بخشی از درخت قالب را به حافظه می‌سپارد. Vue فقط در صورتی محتوای داخل این تگ را دوباره رندر می‌کند که یکی از مقادیر داخل آرایه تغییر کرده باشد.

\`\`\`html
<div v-memo="[user.name, user.status]">
  <p>نام: {{ user.name }}</p>
  <p>وضعیت: {{ user.status }}</p>
  <!-- حتی اگر ویژگی‌های دیگر کاربر تغییر کند، این بخش دوباره رندر نمی‌شود -->
</div>
\`\`\`

---

## خلاصه
- از **v-once** برای نمایش تنظیمات یا متون ثابت استفاده کنید.
- از **v-memo** برای کامپوننت‌های سنگین یا لیست‌های طولانی که اکثر آیتم‌هایشان زیاد تغییر نمی‌کنند، استفاده کنید.
`
};
