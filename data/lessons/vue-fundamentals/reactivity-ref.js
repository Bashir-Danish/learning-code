export const reactivityRefLesson = {
  id: 'reactivity-ref',
  title: 'Reactivity (ref, reactive, computed)',
  titleFa: 'سیستم واکنش‌گرایی (Reactive)',
  difficulty: 'easy',
  estimatedTime: '45 min',

  content: `
# Vue Reactivity System

## Definition
Reactivity is the core engine of Vue. It is a system that automatically detects changes in your application's state and updates the DOM in response. In Vue 3, this is achieved through JavaScript Proxies, allowing for fine-grained updates without manual DOM manipulation.

## Key Features
- **Auto-Tracking**: Vue knows exactly which component depends on which piece of state.
- **Deep Reactivity**: Objects and arrays are made reactive recursively.
- **Derived State (Computed)**: Efficiently calculate values that depend on other state.
- **Asynchronous Batching**: Updates are batched together to ensure maximum performance.

---

## 1. ref() for All Types
\`ref\` is the standard way to define reactive data. It wraps a value in an object, making it accessible via \`.value\`.

\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++ // Must use .value in script
}
\`\`\`

*In templates, the \`.value\` is unwrapped automatically:* \`<div>{{ count }}</div>\`

---

## 2. reactive() for Objects
\`reactive\` makes an entire object reactive. Unlike \`ref\`, it doesn't use \`.value\`, but it has limitations (it only works for objects, and you cannot replace the entire object easily).

\`\`\`javascript
import { reactive } from 'vue'

const user = reactive({ name: 'John', age: 30 })
user.age++ // No .value needed
\`\`\`

---

## 3. computed() Properties
Use \`computed\` for values that depend on other reactive state. They are **cached**, meaning they only re-run when their dependencies change.

\`\`\`javascript
const doubledCount = computed(() => count.value * 2)
\`\`\`

---

## Summary
- **ref**: Best for primitives and single variables.
- **reactive**: Best for grouping related state in an object.
- **computed**: Essential for performance when working with derived logic.
`,

  contentFa: `
# سیستم واکنش‌گرایی در Vue

## تعریف
واکنش‌گرایی (Reactivity) موتور اصلی Vue است. این سیستمی است که به طور خودکار تغییرات در وضعیت (State) برنامه را تشخیص داده و در پاسخ، بخش مربوطه در DOM را بروزرسانی می‌کند. در Vue 3، این کار از طریق Proxyهای جاوااسکریپت انجام می‌شود که امکان بروزرسانی‌های بسیار دقیق را بدون دستکاری دستی DOM فراهم می‌کند.

## ویژگی‌های اصلی
- **ردیابی خودکار**: وی دقیقاً می‌داند کدام کامپوننت به کدام بخش از داده‌ها وابسته است.
- **واکنش‌گرایی عمیق**: اشیاء و آرایه‌ها به صورت بازگشتی واکنش‌گرا می‌شوند.
- **داده‌های محاسباتی (Computed)**: محاسبه بهینه مقادیری که به داده‌های دیگر وابسته هستند.
- **دسته‌بندی ناهمگام (Batching)**: تغییرات با هم دسته‌بندی می‌شوند تا بهترین عملکرد (Performance) حاصل شود.

---

## ۱. استفاده از ref()
\`ref\` روش استاندارد برای تعریف داده‌های واکنش‌گرا است. این تابع مقدار را درون یک شیء می‌پیچد و از طریق \`.value\` قابل دسترسی است.

\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++ // در اسکریپت باید از .value استفاده کنید
}
\`\`\`

*در قالب‌ها (Template)، نیازی به نوشتن \`.value\` نیست:* \`<div>{{ count }}</div>\`

---

## ۲. استفاده از reactive()
\`reactive\` کل یک شیء را واکنش‌گرا می‌کند. بر خلاف \`ref\` نیازی به \`.value\` ندارد اما فقط برای اشیاء (Object) کار می‌کند.

\`\`\`javascript
import { reactive } from 'vue'

const user = reactive({ name: 'بشیر', age: 26 })
user.age++ // نیازی به .value نیست
\`\`\`

---

## ۳. خواص محاسباتی (Computed)
از \`computed\` برای مقادیری استفاده کنید که به داده‌های دیگر وابسته هستند. این مقادیر **کش (Cache)** می‌شوند، یعنی فقط زمانی دوباره محاسبه می‌شوند که وابستگی‌هایشان تغییر کند.

\`\`\`javascript
const doubledCount = computed(() => count.value * 2)
\`\`\`

---

## خلاصه
- **ref**: بهترین گزینه برای مقادیر ساده و متغیرهای تکی.
- **reactive**: مناسب برای گروه‌بندی داده‌های مرتبط در یک شیء.
- **computed**: حیاتی برای عملکرد برنامه در محاسبات منطقی وابسته.
`,

  visualizationId: 'vue-reactivity',
  exerciseId: 'reactivity-ref',
};

export default reactivityRefLesson;
