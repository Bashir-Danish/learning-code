export const uiLibrariesLesson = {
  id: 'ui-libraries',
  title: 'UI Libraries & Headless UI',
  titleFa: 'کتابخانه‌های UI و Headless UI',
  difficulty: 'hard',
  estimatedTime: '55 min',
  content: `
# UI Libraries & Headless UI

## Definition
**UI Libraries** are collections of pre-built, ready-to-use components (like buttons, modals, and date-pickers) that significantly speed up development. **Headless UI** libraries provide the complex logic and accessibility (ARIA) requirements of components without any CSS, allowing developers to apply their own custom styles using tools like Tailwind CSS.

## Key Features
- **Efficiency**: Rapidly build enterprise interfaces using pre-tested components.
- **Accessibility**: Libraries like **Reka UI** ensure full keyboard navigation and screen reader support.
- **Customization (Unstyled)**: Use "Pass Through" (PT) properties in libraries like PrimeVue to override styles.
- **Mobile Optimized**: Most modern libraries are responsive and touch-aware out-of-the-box.

---

## 1. PrimeVue (Rich UI Library)
PrimeVue is one of the most comprehensive libraries for Vue 3. It offers an "Unstyled" mode that works perfectly with Tailwind CSS.

\`\`\`javascript
import PrimeVue from 'primevue/config';

app.use(PrimeVue, {
  unstyled: true,
  pt: {
    button: {
      root: 'bg-blue-600 px-4 py-2 text-white rounded-lg' // Style via Tailwind
    }
  }
});
\`\`\`

---

## 2. Reka UI (Headless Solution)
Formerly known as Radix Vue, this library provides unstyled, accessible primitives. You provide the markup and styles, it provides the behavior.

\`\`\`html
<script setup>
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from 'reka-ui'
</script>

<template>
  <AccordionRoot class="w-full">
    <!-- Reka handles the ARIA-expanded and keyboard arrow-key navigation -->
    <AccordionItem value="item-1">
       ...
    </AccordionItem>
  </AccordionRoot>
</template>
\`\`\`

---

## Summary
- Use **PrimeVue** if you want a complete, ready-made design system.
- Use **Reka UI** or **Headless UI** if you have a custom design and want total CSS control.
- Accessibility (A11y) is the most difficult part of UI components—let these libraries handle it!
`,
  contentFa: `
# کتابخانه‌های UI و Headless UI

## تعریف
**کتابخانه‌های UI** مجموعه‌ای از کامپوننت‌های از پیش ساخته شده و آماده (مثل دکمه‌ها، مودال‌ها و انتخاب‌گرهای تاریخ) هستند که سرعت توسعه را به شدت افزایش می‌دهند. کتابخانه‌های **Headless UI** منطق پیچیده و نیازهای دسترسی‌پذیری (ARIA) کامپوننت‌ها را فراهم می‌کنند اما هیچ استایلی (CSS) ندارند؛ این به برنامه‌نویس اجازه می‌دهد استایل‌های سفارشی خود را با ابزارهایی مثل Tailwind CSS اعمال کند.

## ویژگی‌های اصلی
- **کارایی**: ساخت سریع رابط‌های کاربری تجاری با استفاده از کامپوننت‌های تست شده.
- **دسترسی‌ پذیری (Accessibility)**: کتابخانه‌هایی مثل **Reka UI** ناوبری کامل با کیبورد و پشتیبانی از صفحه‌خوان‌ها را تضمین می‌کنند.
- **سفارشی‌ سازی**: استفاده از ویژگی‌های "بدون استایل" در کتابخانه‌هایی مثل PrimeVue برای جایگزینی استایل‌ها.
- **بهینه‌ سازی برای موبایل**: اکثر کتابخانه‌های مدرن به صورت پیش‌فرض واکنش‌گرا و برای لمس بهینه شده‌اند.

---

## ۱. کتابخانه PrimeVue
یکی از کامل‌ترین کتابخانه‌ها برای Vue 3 است که حالت Unstyled آن به خوبی با Tailwind CSS سازگار است.

\`\`\`javascript
import PrimeVue from 'primevue/config';

app.use(PrimeVue, {
  unstyled: true,
  pt: {
    button: {
      root: 'bg-blue-600 px-4 py-2 text-white rounded-xl' // استایل‌دهی با تایل‌ویند
    }
  }
});
\`\`\`

---

## ۲. کتابخانه Reka UI (راهکار Headless)
این کتابخانه که قبلاً با نام Radix Vue شناخته می‌شد، کامپوننت‌های خام و دسترسی‌پذیر را ارائه می‌دهد. شما استایل را می‌دهید و این کتابخانه رفتار (Behavior) را مدیریت می‌کند.

\`\`\`html
<!-- Reka UI مدیریت ناوبری با دکمه‌های فلش کیبورد و دسترسی‌پذیری را بر عهده می‌گیرد -->
<AccordionRoot type="single">
  <AccordionItem value="item-1">
    <AccordionTrigger>سوال اول؟</AccordionTrigger>
    <AccordionContent>پاسخ در اینجا...</AccordionContent>
  </AccordionItem>
</AccordionRoot>
\`\`\`

---

## خلاصه
- اگر به دنبال یک سیستم طراحی کامل و آماده هستید، از **PrimeVue** استفاده کنید.
- اگر طراحی اختصاصی دارید و می‌خواهید کنترل کامل روی CSS داشته باشید، از **Reka UI** استفاده کنید.
- دسترسی‌پذیری (A11y) سخت‌ترین بخش کامپوننت‌هاست؛ اجازه دهید این کتابخانه‌ها آن را برای شما مدیریت کنند!
`
};
