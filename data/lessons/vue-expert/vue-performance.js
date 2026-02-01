export const vuePerformanceLesson = {
    id: 'vue-performance',
    title: 'Performance Optimization',
    titleFa: 'بهینه‌سازی کارایی در Vue',
    difficulty: 'expert',
    estimatedTime: '70 min',
    content: `
# Vue 3.5+ Performance Optimization

## Definition
Performance optimization in Vue 3.5+ involves techniques to reduce the amount of work the browser does. This includes minimizing Virtual DOM comparisons, reducing memory usage, and ensuring smooth transitions in high-data environments. Vue 3.5+ brings significant performance improvements with a new reactivity system.

## Key Features
- **New Reactivity System**: 56% memory improvement in Vue 3.5+.
- **Stateless Components**: Using \`shallowRef\` for massive data.
- **Rendering Control**: Skipping updates with \`v-once\` and \`v-memo\`.
- **Async Loading**: Lazy-loading components and hydration strategies.
- **Vapor Mode**: The future of Vue performance (Virtual-DOM free) - coming in Vue 3.6.

---

## 1. Vue 3.5+ Reactivity Performance Improvements
**NEW**: Vue 3.5+ includes a major reactivity system refactor with significant performance gains.

\`\`\`javascript
// Vue 3.5+ automatically benefits from:
// - 56% memory usage reduction
// - Faster array operations
// - Better computed value caching
// - More predictable reactivity system

const largeArray = ref(new Array(10000).fill(0).map((_, i) => ({ id: i })))

// ✨ Array operations are now significantly faster in Vue 3.5+
const addItem = () => {
  largeArray.value.push({ id: largeArray.value.length })
}

const removeItem = (index) => {
  largeArray.value.splice(index, 1)
}
\`\`\`

---

## 2. \`v-once\` and \`v-memo\` for Rendering Control
- **v-once**: Renders the element and component only once.
- **v-memo**: Memoizes a sub-tree of the template based on dependencies.

\`\`\`vue
<!-- Static content that never changes -->
<div v-once>
  <h1>{{ expensiveCalculation() }}</h1>
</div>

<!-- Conditional memoization -->
<div v-memo="[item.id, item.updatedAt]">
  <ExpensiveComponent :data="item" />
</div>

<!-- List optimization -->
<div 
  v-for="item in items" 
  :key="item.id"
  v-memo="[item.name, item.selected]"
>
  {{ item.name }} - {{ item.selected ? 'Selected' : 'Not Selected' }}
</div>
\`\`\`

---

## 3. \`shallowRef\` and \`shallowReactive\` for Large Data
Avoid the overhead of deep reactivity for large objects or arrays.

\`\`\`javascript
import { shallowRef, shallowReactive, triggerRef } from 'vue'

// ✨ For large datasets - only top-level changes trigger updates
const largeDataset = shallowRef({
  users: new Array(10000).fill(0).map((_, i) => ({
    id: i,
    name: \`User \${i}\`,
    profile: { /* large nested object */ }
  }))
})

// When you modify nested data, manually trigger updates
const updateUser = (userId, newData) => {
  const user = largeDataset.value.users.find(u => u.id === userId)
  Object.assign(user, newData)
  
  // ✨ Manually trigger reactivity for shallow refs
  triggerRef(largeDataset)
}

// Alternative: shallowReactive for objects
const shallowState = shallowReactive({
  count: 0,
  nested: { /* won't be reactive */ }
})
\`\`\`

---

## 4. Lazy Hydration Strategies (Vue 3.5+)
**NEW**: Control when components hydrate for better performance.

\`\`\`javascript
import { defineAsyncComponent, hydrateOnVisible, hydrateOnIdle } from 'vue'

// ✨ Hydrate when component becomes visible
const LazyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  hydrate: hydrateOnVisible('100px') // Hydrate 100px before visible
})

// ✨ Hydrate when browser is idle
const BackgroundWidget = defineAsyncComponent({
  loader: () => import('./BackgroundWidget.vue'),
  hydrate: hydrateOnIdle()
})

// ✨ Hydrate on user interaction
const InteractiveMap = defineAsyncComponent({
  loader: () => import('./InteractiveMap.vue'),
  hydrate: hydrateOnInteraction(['click', 'touchstart'])
})
\`\`\`

---

## 5. Component Splitting and Code Splitting
Optimize bundle size with strategic component splitting.

\`\`\`javascript
// Route-level code splitting
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue') // Lazy loaded
  },
  {
    path: '/analytics',
    component: () => import('./views/Analytics.vue') // Separate chunk
  }
]

// Component-level splitting
const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
\`\`\`

---

## 6. Vapor Mode Preview (Vue 3.6+)
**COMING SOON**: Vapor Mode is a Virtual-DOM free compilation mode.

\`\`\`vue
<!-- Future Vue 3.6+ Vapor Mode -->
<script setup vapor>
// ✨ This will compile to highly optimized vanilla JS
// No Virtual DOM overhead
// Direct DOM manipulation
// Smaller bundle size
const count = ref(0)
</script>

<template>
  <!-- Compiles to direct DOM updates -->
  <button @click="count++">{{ count }}</button>
</template>
\`\`\`

---

## 7. Performance Monitoring
Monitor your Vue 3.5+ app performance.

\`\`\`javascript
// Enable performance tracking
app.config.performance = true

// Custom performance tracking
import { onMounted, nextTick } from 'vue'

onMounted(async () => {
  const start = performance.now()
  
  // Heavy operation
  await heavyOperation()
  
  await nextTick() // Wait for DOM updates
  
  const end = performance.now()
  console.log(\`Operation took \${end - start} milliseconds\`)
})
\`\`\`

---

## Summary
- **Vue 3.5+ Reactivity**: Automatic 56% memory improvement and faster operations.
- **Lazy Hydration**: NEW strategies for controlling when components become interactive.
- **Rendering Control**: Use \`v-memo\` and \`v-once\` strategically for expensive renders.
- **Shallow Reactivity**: Optimize large datasets with \`shallowRef\` and \`shallowReactive\`.
- **Code Splitting**: Reduce initial bundle size with async components.
- **Vapor Mode**: The future of Vue performance (coming in Vue 3.6+).
`,
    contentFa: `
# بهینه‌سازی کارایی در Vue 3.5+

## تعریف
بهینه‌سازی کارایی در Vue 3.5+ شامل تکنیک‌هایی برای کاهش حجم کاری مرورگر است. این کار با به حداقل رساندن مقایسه‌های Virtual DOM، کاهش مصرف حافظه و تضمین حرکت روان در محیط‌های با حجم داده بالا انجام می‌شود. Vue 3.5+ با سیستم واکنش‌گرایی جدید، بهبودهای قابل توجه کارایی ارائه می‌دهد.

## ویژگی‌های اصلی
- **سیستم واکنش‌گرایی جدید**: 56% بهبود حافظه در Vue 3.5+.
- **کامپوننت‌های سطحی**: استفاده از \`shallowRef\` برای داده‌های حجیم.
- **کنترل رندرینگ**: پرش از آپدیت‌ها با \`v-once\` و \`v-memo\`.
- **بارگذاری ناهمگام**: استراتژی‌های lazy-loading و hydration.
- **Vapor Mode**: آینده‌ی پرفورمنس در Vue (بدون Virtual-DOM) - در Vue 3.6+.

---

## ۱. بهبودهای کارایی واکنش‌گرایی Vue 3.5+
**جدید**: Vue 3.5+ شامل بازسازی اساسی سیستم واکنش‌گرایی با بهبودهای قابل توجه کارایی است.

\`\`\`javascript
// Vue 3.5+ به طور خودکار از این موارد بهره می‌برد:
// - 56% کاهش مصرف حافظه
// - عملیات سریع‌تر روی آرایه‌ها
// - کش بهتر مقادیر محاسباتی
// - سیستم واکنش‌گرایی قابل پیش‌بینی‌تر

const largeArray = ref(new Array(10000).fill(0).map((_, i) => ({ id: i })))

// ✨ عملیات آرایه اکنون در Vue 3.5+ به طور قابل توجهی سریع‌تر است
const addItem = () => {
  largeArray.value.push({ id: largeArray.value.length })
}

const removeItem = (index) => {
  largeArray.value.splice(index, 1)
}
\`\`\`

---

## ۲. دستورات v-once و v-memo برای کنترل رندرینگ
- **v-once**: رندر کردن یک‌باره المان برای صرفه‌جویی در پردازش.
- **v-memo**: به خاطر سپردن بخشی از قالب بر اساس وابستگی‌ها.

\`\`\`vue
<!-- محتوای ثابت که هرگز تغییر نمی‌کند -->
<div v-once>
  <h1>{{ expensiveCalculation() }}</h1>
</div>

<!-- مموایزیشن شرطی -->
<div v-memo="[item.id, item.updatedAt]">
  <ExpensiveComponent :data="item" />
</div>

<!-- بهینه‌سازی لیست -->
<div 
  v-for="item in items" 
  :key="item.id"
  v-memo="[item.name, item.selected]"
>
  {{ item.name }} - {{ item.selected ? 'انتخاب شده' : 'انتخاب نشده' }}
</div>
\`\`\`

---

## ۳. shallowRef و shallowReactive برای داده‌های بزرگ
جلوگیری از سربار واکنش‌گرایی عمیق برای اشیاء یا آرایه‌های بزرگ.

\`\`\`javascript
import { shallowRef, shallowReactive, triggerRef } from 'vue'

// ✨ برای مجموعه داده‌های بزرگ - فقط تغییرات سطح بالا باعث آپدیت می‌شوند
const largeDataset = shallowRef({
  users: new Array(10000).fill(0).map((_, i) => ({
    id: i,
    name: \`کاربر \${i}\`,
    profile: { /* شیء تو در تو بزرگ */ }
  }))
})

// هنگام تغییر داده‌های تو در تو، به صورت دستی آپدیت را فعال کنید
const updateUser = (userId, newData) => {
  const user = largeDataset.value.users.find(u => u.id === userId)
  Object.assign(user, newData)
  
  // ✨ فعال‌سازی دستی واکنش‌گرایی برای shallow refs
  triggerRef(largeDataset)
}

// جایگزین: shallowReactive برای اشیاء
const shallowState = shallowReactive({
  count: 0,
  nested: { /* واکنش‌گرا نخواهد بود */ }
})
\`\`\`

---

## ۴. استراتژی‌های Lazy Hydration (Vue 3.5+)
**جدید**: کنترل زمان hydrate شدن کامپوننت‌ها برای کارایی بهتر.

\`\`\`javascript
import { defineAsyncComponent, hydrateOnVisible, hydrateOnIdle } from 'vue'

// ✨ Hydrate زمانی که کامپوننت قابل مشاهده می‌شود
const LazyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  hydrate: hydrateOnVisible('100px') // 100 پیکسل قبل از نمایش hydrate کن
})

// ✨ Hydrate زمانی که مرورگر بیکار است
const BackgroundWidget = defineAsyncComponent({
  loader: () => import('./BackgroundWidget.vue'),
  hydrate: hydrateOnIdle()
})

// ✨ Hydrate در تعامل کاربر
const InteractiveMap = defineAsyncComponent({
  loader: () => import('./InteractiveMap.vue'),
  hydrate: hydrateOnInteraction(['click', 'touchstart'])
})
\`\`\`

---

## ۵. تقسیم کامپوننت و تقسیم کد
بهینه‌سازی اندازه bundle با تقسیم استراتژیک کامپوننت.

\`\`\`javascript
// تقسیم کد در سطح مسیر
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue') // بارگذاری تنبل
  },
  {
    path: '/analytics',
    component: () => import('./views/Analytics.vue') // chunk جداگانه
  }
]

// تقسیم در سطح کامپوننت
const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
\`\`\`

---

## ۶. پیش‌نمایش Vapor Mode (Vue 3.6+)
**به زودی**: Vapor Mode یک حالت کامپایل بدون Virtual-DOM است.

\`\`\`vue
<!-- آینده Vue 3.6+ Vapor Mode -->
<script setup vapor>
// ✨ این به جاوااسکریپت بسیار بهینه کامپایل می‌شود
// بدون سربار Virtual DOM
// دستکاری مستقیم DOM
// اندازه bundle کوچک‌تر
const count = ref(0)
</script>

<template>
  <!-- به آپدیت‌های مستقیم DOM کامپایل می‌شود -->
  <button @click="count++">{{ count }}</button>
</template>
\`\`\`

---

## ۷. نظارت بر کارایی
نظارت بر کارایی اپلیکیشن Vue 3.5+ شما.

\`\`\`javascript
// فعال‌سازی ردیابی کارایی
app.config.performance = true

// ردیابی سفارشی کارایی
import { onMounted, nextTick } from 'vue'

onMounted(async () => {
  const start = performance.now()
  
  // عملیات سنگین
  await heavyOperation()
  
  await nextTick() // انتظار برای آپدیت‌های DOM
  
  const end = performance.now()
  console.log(\`عملیات \${end - start} میلی‌ثانیه طول کشید\`)
})
\`\`\`

---

## خلاصه
- **واکنش‌گرایی Vue 3.5+**: بهبود خودکار 56% حافظه و عملیات سریع‌تر.
- **Lazy Hydration**: استراتژی‌های جدید برای کنترل زمان تعاملی شدن کامپوننت‌ها.
- **کنترل رندرینگ**: استفاده استراتژیک از \`v-memo\` و \`v-once\` برای رندرهای گران.
- **واکنش‌گرایی سطحی**: بهینه‌سازی مجموعه داده‌های بزرگ با \`shallowRef\` و \`shallowReactive\`.
- **تقسیم کد**: کاهش اندازه bundle اولیه با کامپوننت‌های ناهمگام.
- **Vapor Mode**: آینده کارایی Vue (در Vue 3.6+).
`
};

export default vuePerformanceLesson;
