export const dynamicComponentsLesson = {
  id: 'dynamic-components',
  title: 'Dynamic Components & Teleport',
  titleFa: 'کامپوننت‌های پویا و تله‌پورت (Teleport)',
  difficulty: 'medium',
  estimatedTime: '45 min',

  content: `
# Dynamic Components & Teleport

## Definition
**Dynamic Components** are a way to switch between multiple components at the same mounting point based on application state using the \`<component :is="...">\` syntax. **Teleport** is a built-in component that allows you to "transport" a piece of your template to a different part of the DOM tree (e.g., to the end of the \`<body>\`), effectively breaking out of the parent's layout constraints.

## Key Features
- **Seamless Switching**: Easily build tabbed interfaces or multi-step wizards using \`component :is\`.
- **KeepAlive Integration**: Cache dynamic component instances to preserve their state and avoid re-rendering.
- **Layout Freedom**: Use Teleport to render global UI elements (modals, toasts) anywhere in the DOM while keeping their logic within the component.
- **CSS Solution**: Teleport solves common issues with \`z-index\` and \`overflow: hidden\` in parent containers.

---

## 1. Dynamic Components
Use the reserved \`<component>\` element with the \`:is\` attribute to swap components dynamically.

\`\`\`vue
<script setup>
import Home from './Home.vue'
import Profile from './Profile.vue'
import { shallowRef } from 'vue'

const currentView = shallowRef(Home)
</script>

<template>
  <button @click="currentView = Home">Home</button>
  <button @click="currentView = Profile">Profile</button>

  <!-- This will render either Home or Profile -->
  <component :is="currentView" />
</template>
\`\`\`

---

## 2. Teleporting Content
Teleport is ideal for components like Modals that should be visually "on top" of everything else.

\`\`\`vue
<template>
  <button @click="showModal = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay">
       <p>I am now a direct child of the <body> tag!</p>
    </div>
  </Teleport>
</template>
\`\`\`

---

## Summary
- **Dynamic Component**: Excellent for Tabs and dynamic layouts.
- **KeepAlive**: Use it to prevent losing data when switching tabs.
- **Teleport**: The standard way to handle full-screen overlays and popups.
`,

  contentFa: `
# کامپوننت‌های پویا و تله‌پورت

## تعریف
**کامپوننت‌های پویا (Dynamic Components)** روشی برای جابجایی بین چندین کامپوننت در یک نقطه اتصال واحد، بر اساس وضعیت برنامه و با استفاده از نحو \`<component :is="...">\` هستند. **تله‌پورت (Teleport)** یک کامپوننت داخلی است که به شما اجازه می‌دهد بخشی از قالب خود را به قسمت دیگری از درخت DOM (مثلاً انتهای تگ \`<body>\`) "منتقل" کنید، تا از محدودیت‌های چیدمان والد خارج شوید.

## ویژگی‌های اصلی
- **جابجایی روان**: ساخت آسان رابط‌های کاربری تب‌بندی شده یا فرم‌های چند مرحله‌ای.
- **یکپارچگی با KeepAlive**: کش کردن نمونه‌های کامپوننت پویا برای حفظ وضعیت (مثل مقادیر ورودی) و جلوگیری از رندر مجدد.
- **آزادی در چیدمان**: استفاده از تله‌پورت برای رندر کردن عناصر سراسری (مثل مودال‌ها و پیام‌های Toast) در هر کجای DOM، در حالی که منطق آن‌ها داخل خود کامپوننت باقی می‌ماند.
- **راهکار CSS**: تله‌پورت مشکلات رایج مربوط به \`z-index\` و \`overflow: hidden\` را در ظرف‌های والد حل می‌کند.

---

## ۱. کامپوننت‌های پویا
از المان رزرو شده‌ی \`<component>\` همراه با اتریبیوت \`:is\` برای تعویض پویا استفاده می‌شود.

\`\`\`vue
<script setup>
import TabA from './TabA.vue'
import TabB from './TabB.vue'
import { ref } from 'vue'

const currentTab = ref(TabA)
</script>

<template>
  <component :is="currentTab" />
</template>
\`\`\`

---

## ۲. انتقال محتوا با Teleport
تله‌پورت برای کامپوننت‌هایی مثل مودال‌ها که باید بصری "روی" همه چیز باشند، ایده‌آل است.

\`\`\`vue
<template>
  <Teleport to="#modal-container">
    <div v-if="isOpen" class="modal">
       <p>من مستقیماً در ظرف مودال رندر شده‌ام!</p>
    </div>
  </Teleport>
</template>
\`\`\`

---

## خلاصه
- **Dynamic Component**: عالی برای ساخت تب‌ها و لایوت‌های پویا.
- **KeepAlive**: استفاده برای جلوگیری از حذف داده‌ها هنگام جابجایی بین تب‌ها.
- **Teleport**: راهکار استاندارد برای مدیریت پنجره‌های شناور و تمام‌صفحه.
`,

  visualizationId: 'vue-teleport',
  exerciseId: 'dynamic-components',
};

export default dynamicComponentsLesson;
