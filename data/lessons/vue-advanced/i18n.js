export const i18nLesson = {
  id: 'vue-i18n',
  title: 'Internationalization (vue-i18n)',
  titleFa: 'بومی‌سازی (vue-i18n)',
  difficulty: 'hard',
  estimatedTime: '50 min',
  content: `
# Internationalization (vue-i18n)

## Definition
**Internationalization (i18n)** is the process of designing an application so that it can be adapted to various languages and regions without engineering changes. **vue-i18n** is the official plugin for Vue.js that provides tools for managing translations, pluralization, and localization of numbers, dates, and currencies.

## Key Features
- **Dynamic Translation**: Switch languages instantly without refreshing the page.
- **Pluralization Handling**: Easily handle complex grammar rules for counts (e.g., 1 car vs 5 cars).
- **Number & Date Formatting**: Automatically format currencies and dates based on the user's region.
- **Component-Based Translation**: Manage translations specifically for a single component or globally.

---

## 1. Setup & Configuration
First, initialize the i18n instance with your supported languages and default locale.

\`\`\`javascript
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en',
  messages: {
    en: { welcome: 'Welcome!' },
    fa: { welcome: 'خوش آمدید!' }
  }
})
\`\`\`

---

## 2. Using Translations in Templates
The \`$t\` (translate) function is used to fetch the correct string based on the active locale.

\`\`\`html
<template>
  <nav>
    <h1>{{ $t('welcome') }}</h1>
  </nav>
</template>
\`\`\`

---

## 3. Reactive Locale Switching
You can use the \`useI18n\` hook to change the language programmatically.

\`\`\`javascript
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLanguage = (newLang) => {
  locale.value = newLang
}
\`\`\`

---

## Summary
- **vue-i18n** is essential for global-ready applications.
- Use **pluralization** for dynamic counts.
- Always implement **RTL (Right-to-Left)** support when adding Persian or Arabic languages.
`,
  contentFa: `
# بومی‌سازی (vue-i18n)

## تعریف
**بومی‌سازی یا بین‌المللی‌سازی (i18n)** فرآیند طراحی یک اپلیکیشن است به گونه ای که بتوان آن را بدون تغییر در کدهای اصلی، با زبان‌ها و مناطق مختلف سازگار کرد. **vue-i18n** افزونه رسمی Vue.js است که ابزارهایی برای مدیریت ترجمه‌ها، جمع‌بندی (Pluralization) و محلی‌سازی اعداد، تاریخ‌ها و واحد‌های پولی فراهم می‌کند.

## ویژگی‌های اصلی
- **ترجمه پویا**: تغییر زبان برنامه به صورت لحظه‌ای و بدون نیاز به رفرش کردن صفحه.
- **مدیریت جمع‌بندی**: مدیریت آسان قوانین گرامری برای شمارش (مثلاً ۱ ماشین در مقابل ۵ ماشین).
- **فرمت‌ دهی اعداد و تاریخ**: نمایش خودکار قیمت‌ها و تاریخ‌ها بر اساس منطقه زمانی کاربر.
- **ترجمه مبتنی بر کامپوننت**: مدیریت ترجمه‌ها به صورت اختصاصی برای هر کامپوننت یا به صورت سراسری.

---

## ۱. راه‌اندازی و تنظیمات
ابتدا نمونه i18n را با زبان‌های پشتیبانی شده و زبان پیش‌فرض برنامه ایجاد کنید.

\`\`\`javascript
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // استفاده از Composition API
  locale: 'fa',
  messages: {
    en: { home: 'Home' },
    fa: { home: 'خانه' }
  }
})
\`\`\`

---

## ۲. استفاده از ترجمه‌ها در قالب (Template)
از تابع \`$t\` برای واکشی رشته متنی صحیح بر اساس زبانِ فعال برنامه استفاده می‌شود.

\`\`\`html
<template>
  <button>{{ $t('home') }}</button>
</template>
\`\`\`

---

## ۳. تغییر زبان به صورت واکنش‌گرا
با استفاده از هوک \`useI18n\` می‌توانید زبان برنامه را در پاسخ به کلیک کاربر تغییر دهید.

\`\`\`javascript
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const setEnglish = () => {
  locale.value = 'en' // زبان برنامه بلافاصله تغییر می‌کند
}
\`\`\`

---

## خلاصه
- **vue-i18n** برای ساخت اپلیکیشن‌هایی که بازار جهانی را هدف قرار می‌دهند ضروری است.
- برای تعداد و شمارش حتماً از قابلیت **Pluralization** استفاده کنید.
- هنگام اضافه کردن زبان فارسی یا عربی، حتماً پشتیبانی از حالت **RTL** (راست‌به‌چپ) را در استایل‌های خود لحاظ کنید.
`
};
