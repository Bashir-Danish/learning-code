export const composablesLesson = {
  id: 'composables',
  title: 'Composables (Logic Reusability)',
  titleFa: 'استفاده از Composableها (قابلیت استفاده مجدد)',
  difficulty: 'medium',
  estimatedTime: '55 min',

  content: `
# Composables - Vue's Version of Hooks

## Definition
**Composables** are functions that leverage the Composition API to encapsulate and reuse stateful logic. In Vue 3, they are the primary way to share code between components, allowing you to extract complex logic (like state, computed properties, and lifecycle hooks) into standalone functions. If you are coming from React, these are the direct equivalent of **Custom Hooks**.

## Key Features
- **Logic Organization**: Group related code (e.g., fetching, validation) together instead of scattering it across lifecycle hooks.
- **Reusability**: Write a feature once (like a countdown timer) and use it in any component.
- **Composition**: Easily combine multiple composables to build sophisticated features with minimal boilerplate.
- **SSR Friendly**: Unlike traditional mixins, composables are easier to trace and work perfectly with Server-Side Rendering.

---

## 1. Creating a Composable
By convention, composable names always start with **use**. This makes it clear that the function is a stateful piece of logic.

\`\`\`javascript
// useMouse.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
\`\`\`

---

## 2. Usage in Components
Import your composable and destructure the reactive variables you need inside \`script setup\`.

\`\`\`vue
<script setup>
import { useMouse } from './useMouse'
const { x, y } = useMouse()
</script>

<template>
  <p>Mouse position: {{ x }}, {{ y }}</p>
</template>
\`\`\`

---

## Summary
- **Composables**: Functions that manage stateful logic.
- **usePrefix**: Always start names with "use".
- **Better than Mixins**: They provide clear data flow and prevent naming collisions.
`,

  contentFa: `
# ویژگی Composable - هوک‌های دنیای Vue

## تعریف
**کامپوزبل‌ها (Composables)** توابعی هستند که از Composition API برای بسته‌بندی و استفاده مجدد از منطق وضعیت‌مند (Stateful Logic) استفاده می‌کنند. در Vue 3، این‌ها روش اصلی برای به اشتراک‌گذاری کد بین کامپوننت‌ها هستند و به شما اجازه می‌دهند منطق پیچیده (مثل استیت‌ها، پراپرتی‌های محاسباتی و هوک‌های چرخه حیات) را در توابع مستقل استخراج کنید. اگر از دنیای ری‌اکت می‌آیید، این‌ها معادل مستقیم **Custom Hooks** هستند.

## ویژگی‌های اصلی
- **نظم‌ دهی به منطق**: گروه‌بندی کدهای مرتبط (مثلاً دریافت داده یا اعتبارسنجی) در کنار هم به جای پخش کردن آن‌ها در هوک‌های مختلف.
- **قابلیت استفاده مجدد**: یک ویژگی را یک‌بار بنویسید (مثل تایمر معکوس) و در هر کامپوننتی استفاده کنید.
- **ترکیب‌ پذیری**: ترکیب آسان چندین کامپوزبل برای ساخت قابلیت‌های پیشرفته با کمترین کد تکراری.
- **شفافیت**: برخلاف Mixins قدیمی، در کامپوزبل‌ها کاملاً مشخص است که هر متغیر از کجا می‌آید.

---

## ۱. ساخت یک Composable
طبق قرارداد، نام کامپوزبل‌ها همیشه با **use** شروع می‌شود. این کار باعث می‌شود مشخص شود که این تابع بخشی از منطق وضعیت‌مند برنامه است.

\`\`\`javascript
// useCounter.js
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { count, increment }
}
\`\`\`

---

## ۲. استفاده در کامپوننت‌ ها
کامپوزبل خود را وارد کرده و متغیرهای مورد نیاز را در بخش \`script setup\` استخراج کنید.

\`\`\`vue
<script setup>
import { useCounter } from './useCounter'
const { count, increment } = useCounter()
</script>

<template>
  <button @click="increment">عدد: {{ count }}</button>
</template>
\`\`\`

---

## خلاصه
- **Composables**: توابعی که منطق‌های وضعیت‌مند را مدیریت می‌کنند.
- **پیشوند use**: نام‌ها را همیشه با use شروع کنید.
- **جایگزین Mixins**: جریان داده در کامپوزبل‌ها شفاف است و تداخل نام ایجاد نمی‌شود.
`,

  visualizationId: 'vue-composables',
  exerciseId: 'composables',
};

export default composablesLesson;
