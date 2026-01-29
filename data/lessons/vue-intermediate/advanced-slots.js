export const advancedSlotsLesson = {
  id: 'advanced-slots',
  title: 'Advanced Slots & Render Functions',
  titleFa: 'اسلات‌های پیشرفته و توابع رندر',
  difficulty: 'medium',
  estimatedTime: '55 min',
  content: `
# Advanced Slots & Render Functions

## Definition
**Advanced Slots** (Scoped Slots) allow a child component to pass data back to the parent's slot content, enabling highly flexible and reusable UI patterns. **Render Functions** (\`h()\`) provide a way to build templates programmatically using JavaScript instead of HTML, giving you ultimate control over the component's output.

## Key Features
- **Inverted Control**: Parents decide how child data is displayed using Scoped Slots.
- **Dynamic Markup**: Generate HTML tags dynamically based on props using Render Functions.
- **Performance**: Render functions can be slightly faster for extremely complex dynamic templates.
- **Library Development**: Essential for building complex UI libraries like Headless UI or Vuetify.

---

## 1. Scoped Slots
A child component can "send" data to the slot placeholder, which the parent then consumes.

\`\`\`html
<!-- Child.vue -->
<template>
  <ul>
    <li v-for="item in items">
      <slot :item="item">{{ item.defaultName }}</slot>
    </li>
  </ul>
</template>

<!-- Parent.vue -->
<Child :items="products">
  <template #default="{ item }">
    <span class="price">{{ item.price }}$</span>
  </template>
</Child>
\`\`\`

---

## 2. Render Functions (h)
When you need the full power of JavaScript to render a component.

\`\`\`javascript
import { h } from 'vue';

export default {
  props: ['level'],
  render() {
    return h('h' + this.level, { class: 'dynamic-title' }, this.$slots.default());
  },
};
\`\`\`

---

## Summary
- **Scoped Slots**: Perfect for data-heavy components like Lists and Tables.
- **Render Functions**: Best for highly dynamic components where HTML templates are too limiting.
`,
  contentFa: `
# اسلات‌های پیشرفته و توابع رندر

## تعریف
**اسلات‌های پیشرفته (Scoped Slots)** به کامپوننت فرزند اجازه می‌دهند داده‌ها را به محتوای اسلات در والد بازگردانند، که این کار الگوهای رابط کاربری بسیار منعطف و قابل استفاده مجددی را ممکن می‌سازد. **توابع رندر (\`h()\`)** روشی برای ساخت قالب‌ها به صورت برنامه‌نویسی با استفاده از جاوااسکریپت به جای HTML ارائه می‌دهند که کنترل کامل بر خروجی کامپوننت را به شما می‌دهد.

## ویژگی‌های اصلی
- **کنترل معکوس (Inverted Control)**: والدین تصمیم می‌گیرند داده‌های فرزند با استفاده از Scoped Slots چگونه نمایش داده شوند.
- **نشانه گذاری پویا**: تولید تگ‌های HTML به صورت پویا بر اساس پراپس‌ها با استفاده از توابع رندر.
- **عملکرد (Performance)**: توابع رندر می‌توانند برای قالب‌های داینامیک بسیار پیچیده کمی سریع‌تر باشند.
- **توسعه کتابخانه**: برای ساخت کتابخانه‌های پیچیده UI مثل Headless UI یا Vuetify ضروری هستند.

---

## ۱. اسلات‌های اسکوپ‌شده (Scoped Slots)
کامپوننت فرزند می‌تواند داده‌هایی را به مکان‌نمای اسلات "ارسال" کند که والد سپس آن‌ها را مصرف می‌کند.

\`\`\`html
<!-- فرزند (Child.vue) -->
<template>
  <slot :user="userState"></slot>
</template>

<!-- والد (Parent.vue) -->
<Child v-slot="{ user }">
  <p>نام کاربر: {{ user.name }}</p>
</Child>
\`\`\`

---

## ۲. توابع رندر (h)
زمانی که برای رندر کردن یک کامپوننت به قدرت کامل جاوااسکریپت نیاز دارید.

\`\`\`javascript
import { h } from 'vue';

export default {
  props: ['level'],
  render() {
    return h('h' + this.level, {}, this.$slots.default());
  },
};
\`\`\`

---

## خلاصه
- **اسلات‌های اسکوپ‌شده**: برای کامپوننت‌های داده‌محور مثل لیست‌ها و جداول عالی هستند.
- **توابع رندر**: بهترین گزینه برای کامپوننت‌های بسیار پویا که قالب‌های HTML در آن‌ها محدودکننده هستند.
`
};
