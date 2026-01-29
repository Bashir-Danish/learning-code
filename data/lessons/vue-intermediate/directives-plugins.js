export const directivesPluginsLesson = {
  id: 'directives-plugins',
  title: 'Directives & Plugins',
  titleFa: 'دایرکتیوها و پلاگین‌ها',
  difficulty: 'medium',
  estimatedTime: '50 min',
  content: `
# Directives & Plugins in Vue 3

## Definition
**Custom Directives** are a way to reuse low-level DOM access logic across your application. While components are the main building blocks, directives are ideal for direct DOM manipulations (like auto-focusing or input masking). **Plugins** are a mechanism to add global-level functionality to Vue, such as installing global components, directives, or state management.

## Key Features
- **Low-Level Access**: Direct control over DOM elements through hooks like \`mounted\` or \`updated\`.
- **Global Injection**: Use plugins to inject features across the entire app via \`app.use()\`.
- **Logic Reuse**: Shared logic for UI interactions (e.g., clicking outside a modal) is best implemented as a directive.
- **Library Integration**: Most external libraries (like Vue Router or Pinia) are implemented as Vue plugins.

---

## 1. Custom Directives
You can define a directive that performs a specific action when an element is mounted.

\`\`\`javascript
const vFocus = {
  mounted: (el) => {
    el.focus();
    el.style.borderColor = '#42b883';
  }
};

// Usage in Template
// <input v-focus />
\`\`\`

---

## 2. Writing Plugins
A plugin is an object with an \`install()\` method. It can add global components or helper functions.

\`\`\`javascript
export default {
  install: (app, options) => {
    // Add a global helper
    app.config.globalProperties.$appName = 'Vue Mastery';
    
    // Globally register a component
    app.component('BaseIcon', MyIconComponent);
  }
};
\`\`\`

---

## Summary
- **Directives** are for direct element manipulation in the DOM.
- **Plugins** are for adding global tools and libraries.
- Use **app.use()** in your main file to activate plugins.
`,
  contentFa: `
# دایرکتیوها و پلاگین‌ها در Vue 3

## تعریف
**دایرکتیوهای سفارشی (Custom Directives)** راهی برای استفاده مجدد از منطق دسترسی سطح پایین به DOM در کل اپلیکیشن هستند. در حالی که کامپوننت‌ها بلوک‌های اصلی سازنده هستند، دایرکتیوها برای دستکاری‌های مستقیم DOM (مثل فوکوس خودکار یا ماسک کردن ورودی‌ها) ایده‌آل می‌باشند. **پلاگین‌ها (Plugins)** مکانیزمی برای افزودن قابلیت‌های سطح بالا و سراسری به Vue هستند، مانند نصب کامپوننت‌های سراسری، دایرکتیوها یا مدیریت وضعیت.

## ویژگی‌های اصلی
- **دسترسی سطح پایین**: کنترل مستقیم بر روی المان‌های DOM از طریق هوک‌هایی مثل \`mounted\` یا \`updated\`.
- **تزریق سراسری**: استفاده از پلاگین‌ها برای تزریق قابلیت‌ها در کل برنامه با استفاده از \`app.use()\`.
- **استفاده مجدد از منطق**: منطق‌های مشترک برای تعاملات UI (مثل کلیک کردن خارج از یک مودال) بهتر است به عنوان دایرکتیو پیاده‌سازی شوند.
- **یکپارچه‌سازی کتابخانه‌ها**: اکثر کتابخانه‌های خارجی (مثل Vue Router یا Pinia) به عنوان پلاگین پیاده‌سازی می‌شوند.

---

## ۱. دایرکتیوهای سفارشی
می‌توانید دایرکتیوی تعریف کنید که هنگام متصل شدن یک المان به DOM، کار خاصی را انجام دهد.

\`\`\`javascript
const vFocus = {
  mounted: (el) => {
    el.focus(); // فوکوس خودکار روی ورودی
  }
};

// استفاده در قالب:
// <input v-focus />
\`\`\`

---

## ۲. نوشتن پلاگین‌ها
یک پلاگین شیئی است که متد \`install()\` دارد و می‌تواند ابزارهای سراسری به برنامه اضافه کند.

\`\`\`javascript
export default {
  install: (app, options) => {
    // اضافه کردن یک ویژگی سراسری
    app.config.globalProperties.$translate = (key) => {
      return options[key] || key;
    };
  }
};
\`\`\`

---

## خلاصه
- **دایرکتیوها** برای دستکاری مستقیم المان‌ها در DOM هستند.
- **پلاگین‌ها** برای افزودن ابزارها و کتابخانه‌های سراسری استفاده می‌شوند.
- از **app.use()** در فایل اصلی برنامه (main.js) برای فعال‌سازی پلاگین‌ها استفاده کنید.
`
};
