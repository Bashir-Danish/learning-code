export const lifecycleWatchersLesson = {
    id: 'lifecycle-watchers',
    title: 'Lifecycle Hooks & Watchers',
    titleFa: 'هوک‌های چرخه حیات و واچرها',
    difficulty: 'easy',
    estimatedTime: '40 min',

    content: `
# Lifecycle Hooks & Watchers

## Definition
**Lifecycle Hooks** are special functions that allow you to run code at specific stages of a component's existence (like creation, mounting, or destruction). **Watchers** are reactive side-effects that execute logic whenever a specific piece of state changes, making them ideal for tasks like data fetching or local storage syncing.

## Key Features
- **Deterministic Execution**: Hooks always run in a predictable order.
- **Side Effect Management**: Professional way to handle API calls and timers.
- **Resource Cleanup**: Prevent memory leaks by cleaning up in \`onUnmounted\`.
- **Flexible Observation**: Watchers can track multiple values or perform deep tracking of objects.

---

## 1. Important Lifecycle Hooks
Vue provides several hooks but these are the most commonly used:

\`\`\`javascript
import { onMounted, onUnmounted, onUpdated } from 'vue'

onMounted(() => {
  // Best place for API calls or DOM manipulation
  console.log('Component is ready!')
})

onUnmounted(() => {
  // Clear timers or event listeners here
  console.log('Component is being destroyed!')
})
\`\`\`

---

## 2. Watchers (Side Effects)
Use \`watch\` when you need to perform an operation (like an API call) in response to state changes.

\`\`\`javascript
import { ref, watch } from 'vue'

const searchQuery = ref('')

watch(searchQuery, (newVal) => {
  console.log(\`Searching for: \${newVal}\`)
  // Call API here...
})
\`\`\`

---

## 3. watchEffect
A more automated version of \`watch\` that automatically tracks every reactive dependency used inside it.

---

## Summary
- **onMounted**: Initialize data and events.
- **onUnmounted**: Clean up and save memory.
- **watch**: Respond to specific data changes.
`,

    contentFa: `
# هوک‌های چرخه حیات و واچرها

## تعریف
**هوک‌های چرخه حیات (Lifecycle Hooks)** توابع خاصی هستند که به شما اجازه می‌دهند در مراحل مختلف زندگی یک کامپوننت (مثل ایجاد، نمایش یا حذف) کدی را اجرا کنید. **واچرها (Watchers)** عملیات جانبی واکنش‌گرایی هستند که هر زمان یک داده خاص تغییر کند، منطق مورد نظر شما را اجرا می‌کنند. این ابزارها برای کارهایی مثل دریافت داده از سرور یا همگام‌سازی با LocalStorage ایده‌آل هستند.

## ویژگی‌های اصلی
- **اجرای تعیین شده (Deterministic)**: هوک‌ها همیشه با یک ترتیب قابل پیش‌بینی اجرا می‌شوند.
- **مدیریت عملیات جانبی**: روش حرفه‌ای برای مدیریت فراخوانی‌های API و تایمرها.
- **پاک‌سازی منابع**: جلوگیری از نشت حافظه (Memory Leak) با تمیزکاری در هوک \`onUnmounted\`.
- **نظارت انعطاف‌پذیر**: واچرها می‌توانند چندین مقدار را همزمان زیر نظر بگیرند.

---

## ۱. هوک‌های مهم چرخه حیات
وی هوک‌های زیادی دارد اما این موارد پراستفاده‌ترین هستند:

\`\`\`javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  // بهترین مکان برای فراخوانی API یا دسترسی به DOM
  console.log('کامپوننت متصل شد!')
})

onUnmounted(() => {
  // متوقف کردن تایمرها یا شنونده‌های رویداد (Event Listeners)
  console.log('کامپوننت در حال حذف شدن است!')
})
\`\`\`

---

## ۲. واچرها (Watchers)
زمانی از \`watch\` استفاده کنید که می‌خواهید در پاسخ به تغییر یک وضعیت، عملیاتی را انجام دهید.

\`\`\`javascript
import { ref, watch } from 'vue'

const search = ref('')

watch(search, (newVal) => {
  console.log(\`جستجو برای: \${newVal}\`)
  // مثلاً در اینجا دوباره دیتای فیلتر شده را از سرور می‌گیریم
})
\`\`\`

---

## ۳. هوک watchEffect
نسخه هوشمندتر \`watch\` که هر متغیر واکنش‌گرایی که درونش استفاده شود را به صورت خودکار ردیابی می‌کند.

---

## خلاصه
- **onMounted**: مقداردهی اولیه داده‌ها و رویدادها.
- **onUnmounted**: پاک‌سازی کدهای اضافه برای حفظ سرعت مرورگر.
- **watch**: واکنش نشان دادن صریح به تغییر متغیرهای خاص.
`,

    visualizationId: 'vue-lifecycle',
    exerciseId: 'lifecycle-watchers',
};

export default lifecycleWatchersLesson;
