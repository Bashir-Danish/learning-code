export const piniaLesson = {
  id: 'pinia',
  title: 'Pinia State Management',
  titleFa: 'مدیریت استیت با Pinia',
  difficulty: 'hard',
  estimatedTime: '60 min',

  content: `
# Pinia - Modern State Management

## Definition
**Pinia** is the successor to Vuex and is now the official state management library for Vue.js. It acts as a "Single Source of Truth" for your application, allowing many components to share the same reactive state. Pinia is designed to be lightweight, modular, and highly compatible with both the Composition API and TypeScript.

## Key Features
- **Unpacked Logic**: No more complex "mutations." You change state directly within actions, making the code much easier to read.
- **TypeScript Support**: Best-in-class autocompletion and type safety out of the box.
- **Modularity**: Create separate, focused stores (e.g., \`userStore\`, \`cartStore\`) instead of one giant central tree.
- **DevTools Integration**: Visualize state changes and travel back through time using the official browser extension.

---

## 1. Defining a Store
Stores in Pinia are defined using \`defineStore\`. The "Setup Store" syntax is recommended for Composition API users.

\`\`\`javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0) // State
  const doubleCount = computed(() => count.value * 2) // Getter
  
  function increment() { // Action
    count.value++
  }

  return { count, doubleCount, increment }
})
\`\`\`

---

## 2. Component Usage
In your components, you simply call the store function and access its properties.

\`\`\`vue
<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>

<template>
  <h1>Count: {{ counter.count }}</h1>
  <button @click="counter.increment()">Add +1</button>
</template>
\`\`\`

---

## Summary
- **State**: Persistent data shared across parts of the app.
- **Actions**: Methods used to update the state or handle API calls.
- **Modular Design**: Keep related logic together in their own store files.
`,

  contentFa: `
# پینیا (Pinia) - مدیریت استیت مدرن

## تعریف
**پینیا (Pinia)** جانشین Vuex شده و اکنون کتابخانه رسمی مدیریت استیت برای Vue.js است. این کتابخانه به عنوان یک "منبع واحد حقیقت" برای برنامه شما عمل می‌کند و به بسیاری از کامپوننت‌ها اجازه می‌دهد تا از یک وضعیت واکنش‌گرای مشترک استفاده کنند. پینیا بسیار سبک، ماژولار و سازگار با Composition API و تایپ‌اسکریپت طراحی شده است.

## ویژگی‌های اصلی
- **حذف پیچیدگی**: دیگر خبری از Mutationهای پیچیده نیست. شما استیت را مستقیماً داخل اکشن‌ها تغییر می‌دهید که خوانایی کد را بسیار بالاتر می‌برد.
- **پشتیبانی از TypeScript**: بهترین تجربه پیشنهادات کد (Autocompletion) و امنیت تایپی را به صورت پیش‌فرض فراهم می‌کند.
- **ساختار ماژولار**: به جای یک درخت مرکزی عظیم، استورهای مجزا و متمرکز (مثل \`userStore\` یا \`cartStore\`) ایجاد می‌کنید.
- **ابزارهای توسعه (DevTools)**: امکان مشاهده تغییرات استیت و بازگشت به لحظات عقب‌تر با استفاده از اکستنشن مرورگر.

---

## ۱. تعریف یک Store (انبار داده)
استورها در پینیا با استفاده از \`defineStore\` تعریف می‌شوند. سینتکس "Setup Store" برای کاربران Composition API پیشنهاد می‌شود.

\`\`\`javascript
// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const login = (userData) => user.value = userData
  
  return { user, login }
})
\`\`\`

---

## ۲. استفاده در کامپوننت‌ ها
در کامپوننت‌های خود، به سادگی تابع استور را فراخوانی کرده و به ویژگی‌های آن دسترسی پیدا می‌کنید.

\`\`\`vue
<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div v-if="auth.user">خوش آمدید {{ auth.user.name }}</div>
</template>
\`\`\`

---

## خلاصه
- **State**: داده‌های پایداری که بین بخش‌های مختلف برنامه به اشتراک گذاشته می‌شوند.
- **Actions**: متدهایی که برای بروزرسانی وضعیت یا مدیریت فراخوانی‌های API استفاده می‌شوند.
- **طراحی ماژولار**: کدهای مرتبط را در فایل‌های استور مجزا نگهداری کنید.
`,

  visualizationId: 'vue-pinia',
  exerciseId: 'pinia',
};

export default piniaLesson;
