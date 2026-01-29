export const introSfcLesson = {
  id: 'intro-sfc',
  title: 'Introduction to SFC & Templates',
  titleFa: 'آشنایی با SFC و سینتکس قالب (Template)',
  difficulty: 'easy',
  estimatedTime: '30 min',

  content: `
# Single File Components (SFC)

## Definition
A Single File Component (SFC) is a specialized file format (\`.vue\`) that encapsulates the logic (JavaScript), template (HTML), and styles (CSS) of a Vue component in a single file. This approach provides a "clean separation of concerns" while keeping all related code for a UI element together.

## Key Features
- **Encapsulation**: Everything a component needs is in one file.
- **Scoped Styling**: CSS can be restricted to only the current component.
- **Pre-compilation**: SFCs are compiled into efficient JavaScript by the build tool (Vite).
- **Composition API Support**: Modern development using the \`<script setup>\` pattern.

---

## 1. The Structure of a SFC
A typical Vue component consists of three main blocks:

\`\`\`vue
<script setup>
// 1. Logic (Composition API)
const message = 'Hello Vue 3!'
</script>

<template>
  <!-- 2. Structure -->
  <div class="card">
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
/* 3. Styling (Scoped to this file) */
.card { border: 1px solid #42b883; padding: 20px; }
</style>
\`\`\`

---

## 2. Template Syntax
Vue uses an HTML-based syntax to bind data to the DOM.
- **Interpolation**: Use \`{{ text }}\` to show dynamic data.
- **Directives**: Special attributes starting with \`v-\` (e.g., \`v-if\`, \`v-for\`, \`v-bind\`).

---

## 3. The <script setup> Pattern
This is the modern way to write Vue 3 components. It provides a more concise syntax for using the Composition API without the need for a \`setup()\` function.

---

## Summary
- **SFC** combines HTML, CSS, and JS.
- **Scoped Style** prevents global CSS collisions.
- **Template Syntax** makes data binding easy and declarative.
`,

  contentFa: `
# کامپوننت‌های تک‌فایلی (SFC)

## تعریف
کامپوننت تک‌فایلی (SFC) یک فرمت فایل اختصاصی (\`.vue\`) است که منطق (جاوااسکریپت)، قالب (HTML) و استایل‌های (CSS) یک کامپوننت را در یک فایل واحد بسته‌بندی می‌کند. این رویکرد باعث می‌شود تمام کدهای مربوط به یک المان رابط کاربری در کنار هم باشند در حالی که وظایف هر بخش به وضوح جدا شده است.

## ویژگی‌های اصلی
- **کپسوله‌سازی**: تمامِ نیازهای یک کامپوننت در یک فایل جمع شده است.
- **استایل‌دهی محدود (Scoped)**: استایل‌های CSS را می‌توان فقط به همان کامپوننت محدود کرد.
- **پیش-کامپایل**: فایل‌های SFC توسط ابزارهای ساخت (مثل Vite) به کدهای بهینه جاوااسکریپت تبدیل می‌شوند.
- **پشتیبانی از Composition API**: استفاده از الگوی مدرن \`<script setup>\` برای توسعه سریع‌تر.

---

## ۱. ساختار یک کامپوننت تک‌فایلی
هر فایل Vue شامل سه بخش اصلی است:

\`\`\`vue
<script setup>
// ۱. بخش منطق (جاوااسکریپت)
const message = 'سلام Vue 3!'
</script>

<template>
  <!-- ۲. بخش ساختار (HTML) -->
  <div class="card">
    <h1>{{ message }}</h1>
  </div>
</template>

<style scoped>
/* ۳. بخش استایل‌ها (محدود به همین فایل) */
.card { border: 1px solid #42b883; padding: 20px; }
</style>
\`\`\`

---

## ۲. سینتکس قالب (Template Syntax)
وی از دستوراتی استفاده می‌کند که به آن‌ها **Directives** می‌گوییم و با \`v-\` شروع می‌شوند:
- **Interpolation**: نمایش داده‌های پویا با استفاده از \`{{ }}\`.
- **Directives**: دستوراتی مثل \`v-bind\` برای اتصال ویژگی‌ها و \`v-on\` برای رویدادها.

---

## ۳. الگوی <script setup>
این روش مدرن نوشتن کامپوننت در Vue 3 است که کدهای اضافی را حذف کرده و عملکرد را بهبود می‌بخشد.

---

## خلاصه
- **SFC** ترکیبی از HTML، CSS و جاوااسکریپت در یک فایل است.
- **استایل Scoped** از تداخل استایل‌ها بین کامپوننت‌های مختلف جلوگیری می‌کند.
- **Template Syntax** بایند کردن داده‌ها را ساده و توصیفی می‌کند.
`,

  visualizationId: 'vue-intro',
  exerciseId: 'intro-sfc',
};

export default introSfcLesson;
