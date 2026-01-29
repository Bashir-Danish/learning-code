export const vuePerformanceLesson = {
    id: 'vue-performance',
    title: 'Performance Optimization',
    titleFa: 'بهینه‌سازی کارایی در Vue',
    difficulty: 'expert',
    estimatedTime: '60 min',
    content: `
# Vue Performance Optimization

## Definition
Performance optimization in Vue involves techniques to reduce the amount of work the browser does. This includes minimizing Virtual DOM comparisons, reducing memory usage, and ensuring smooth transitions in high-data environments.

## Key Features
- **Stateless Components**: Using \`shallowRef\` for massive data.
- **Rendering Control**: Skipping updates with \`v-once\` and \`v-memo\`.
- **Async Loading**: Lazy-loading components to reduce initial bundle size.
- **Vapor Mode**: The future of Vue performance (Virtual-DOM free).

---

## 1. \`v-once\` and \`v-memo\`
- **v-once**: Renders the element and component only once.
- **v-memo**: Memoizes a sub-tree of the template based on dependencies.

\`\`\`vue
<div v-memo="[item.id, item.updateAt]">
  {{ item.name }}
</div>
\`\`\`

---

## 2. \`shallowRef\` and \`shallowReactive\`
Avoid the overhead of deep reactivity for large objects or arrays.

\`\`\`javascript
const state = shallowRef({ large: { nested: { data: 123 } } })
// Only state.value change triggers update!
\`\`\`

---

## 3. Vapor Mode (The Future)
Vapor Mode is a Virtual-DOM free compiler produced by the Vue team for maximum performance.

---

## Summary
Mastering these tools ensures your Vue apps remain fast even as they scale to thousands of interactive elements.
`,
    contentFa: `
# بهینه‌سازی کارایی در Vue

## تعریف
بهینه‌سازی کارایی در Vue شامل تکنیک‌هایی برای کاهش حجم کاری مرورگر است. این کار با به حداقل رساندن مقایسه‌های Virtual DOM، کاهش مصرف حافظه و تضمین حرکت روان در محیط‌های با حجم داده بالا انجام می‌شود.

## ویژگی‌های اصلی
- **کامپوننت‌های بدون وضعیت (Stateless)**: استفاده از \`shallowRef\` برای داده‌های حجیم.
- **کنترل رندرینگ**: پرش از آپدیت‌ها با \`v-once\` و \`v-memo\`.
- **بارگذاری نامتقارن**: Lazy-load کردن کامپوننت‌ها برای کاهش حجم دانلود اولیه.
- **Vapor Mode**: آینده‌ی پرفورمنس در Vue (حذف Virtual-DOM).

---

## ۱. دستورات v-once و v-memo
- **v-once**: رندر کردن یک‌باره المان برای صرفه‌جویی در پردازش.
- **v-memo**: به خاطر سپردن بخشی از قالب و رندر دوباره فقط در صورت تغییر متغیرهای خاص.

\`\`\`vue
<div v-memo="[item.id, item.updateAt]">
  {{ item.name }}
</div>
\`\`\`

---

## ۲. استفاده از shallowRef
جلوگیری از سربارِ سیستم واکنش‌گرایی عمیق برای اشیاء یا آرایه‌های بزرگ.

\`\`\`javascript
const state = shallowRef({ large: { nested: { data: 123 } } })
// فقط تغییر در state.value باعث رندر دوباره می‌شود!
\`\`\`

---

## ۳. حالت Vapor (آینده‌ی Vue)
یک کامپایلر جدید که Virtual-DOM را حذف کرده و کدهای بهینه‌تری تولید می‌کند.

---

## خلاصه
تسلط بر این ابزارها تضمین می‌کند که اپلیکیشن Vue شما حتی با هزاران المان تعاملی، همچنان سریع باقی می‌ماند.
`
};

export default vuePerformanceLesson;
