export const vuePwaLesson = {
  id: 'vue-pwa',
  title: 'PWA & Browser Install',
  titleFa: 'PWA و نصب در مرورگر',
  difficulty: 'expert',
  estimatedTime: '55 min',
  content: `
# PWA & Browser Install in Vue

## Definition
PWAs in Vue represent the final step in web-to-mobile conversion. By implementing a manifest and service worker, you can make your Vue app behave as a first-class citizen on mobile devices, complete with custom install prompts.

## Key Features
- **Auto Service Worker Generation**: Handled by Vite PWA plugin.
- **Reactive UI Prompts**: Easy integration with Vue's reactivity for install buttons.
- **Background Sync**: Keep data in sync even when the app is closed.
- **Home Screen Presence**: Custom icons and splash screens.

---

## 1. Vite PWA Plugin for Vue
The standard way to add PWA support in Vue 3 using Vite. It generates everything automatically.

\`\`\`javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      workbox: { globPatterns: ['**/*.{js,css,html,png}'] }
    })
  ]
}
\`\`\`

## 2. Reactive Install Prompt
Use a reactive ref to store the installation event and show an "Install" button.

\`\`\`html
<script setup>
import { ref, onMounted } from 'vue'
const installPrompt = ref(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installPrompt.value = e
  })
})

const installApp = async () => {
  if (installPrompt.value) {
    installPrompt.value.prompt()
    installPrompt.value = null
  }
}
</script>

<template>
  <button v-if="installPrompt" @click="installApp">
    Install App
  </button>
</template>
\`\`\`

## 3. Web Capabilities on iOS
Configuring your PWA to behave like a native iOS app with full-screen mode.

\`\`\`html
<!-- index.html -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MyVueApp">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
\`\`\`
`,
  contentFa: `
# PWA و نصب در مرورگر در Vue

## تعریف
PWAها در Vue مرحله نهایی تبدیل وب به موبایل هستند. با پیاده‌سازی مانیفست و سرویس ورکر، می‌توانید اپلیکیشن Vue خود را به یک شهروند درجه یک در دستگاه‌های موبایل تبدیل کنید که دارای پیام‌های نصب سفارشی است.

## ویژگی‌های اصلی
- **تولید خودکار Service Worker**: توسط پلاگین Vite PWA انجام می‌شود.
- **پیام‌های رابط کاربری واکنش‌گرا**: یکپارچگی آسان با سیستم واکنش‌گرایی Vue برای دکمه‌های نصب.
- **همگام‌سازی پس‌زمینه (Background Sync)**: همگام نگه داشتن داده‌ها حتی زمانی که برنامه بسته است.
- **حضور در صفحه اصلی**: آیکون‌های سفارشی و صفحات اسپلش (Splash Screens).

---

## ۱. پلاگین Vite PWA برای Vue
روش استاندارد برای افزودن پشتیبانی PWA در Vue 3 با استفاده از Vite. این پلاگین همه چیز را خودکار تولید می‌کند.

\`\`\`javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      workbox: { globPatterns: ['**/*.{js,css,html,png}'] }
    })
  ]
}
\`\`\`

## ۲. پیام نصب واکنش‌گرا
از یک ref واکنش‌گرا برای ذخیره رویداد نصب و نمایش دکمه "نصب" استفاده کنید.

\`\`\`html
<script setup>
import { ref, onMounted } from 'vue'
const installPrompt = ref(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    installPrompt.value = e
  })
})

const installApp = async () => {
  if (installPrompt.value) {
    installPrompt.value.prompt()
    installPrompt.value = null
  }
}
</script>

<template>
  <button v-if="installPrompt" @click="installApp">
    نصب اپلیکیشن
  </button>
</template>
\`\`\`

## ۳. قابلیت‌های وب در iOS
تنظیم PWA برای رفتار شبیه به یک اپلیکیشن بومی iOS با حالت تمام‌صفحه.

\`\`\`html
<!-- index.html -->
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MyVueApp">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
\`\`\`
`
};
