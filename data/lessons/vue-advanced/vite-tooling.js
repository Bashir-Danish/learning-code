export const viteToolingLesson = {
  id: 'vite-tooling',
  title: 'Vite & Tooling Deep Dive',
  titleFa: 'عمیق شدن در Vite و ابزارها',
  difficulty: 'hard',
  estimatedTime: '60 min',
  content: `
# Vite & Tooling Deep Dive

## Definition
**Vite** is a next-generation frontend build tool that significantly improves the developer experience. It uses native ES modules to provide lightning-fast Hot Module Replacement (HMR) and uses Rollup for highly optimized production builds. Understanding Vite's advanced configuration is essential for professional Vue developers.

## Key Features
- **Instant Server Start**: No more waiting for large bundles to compile during development.
- **Rich Plugin API**: Extend Vite's behavior with Rollup-compatible plugins.
- **Auto-Importing**: Automatically import Vue APIs and components using the "unplugin" ecosystem.
- **Environment Management**: Securely manage keys and endpoints across Dev, Staging, and Production.

---

## 1. Advanced Configuration
The \`vite.config.js\` file is the brain of your project. You can setup aliases, proxies, and powerful plugins.

\`\`\`javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts' // Generate TS types automatically
    })
  ],
  resolve: {
    alias: { '@': '/src' }
  }
})
\`\`\`

---

## 2. Environment Variables & Modes
Vite exposes environment variables on \`import.meta.env\`. Variables must be prefixed with \`VITE_\` to be exposed to your client-side code.

\`\`\`bash
# .env.production
VITE_API_BASE_URL=https://api.production.com
VITE_DEBUG_MODE=false
\`\`\`

---

## 3. Optimizing Production
Vite uses Rollup under the hood. You can configure manual "chunking" to split your code into smaller files, improving load times.

---

## Summary
- **Vite** is the modern standard for Vue 3 development.
- Use **Plugins** to automate repetitive tasks like imports.
- Use **Modes** to keep your production secrets safe and your APIs dynamic.
`,
  contentFa: `
# عمیق شدن در Vite و ابزارها

## تعریف
**Vite** ابزار ساخت نسل جدید برای فرانت‌اند است که تجربه توسعه را به طرز چشم‌گیری بهبود می‌بخشد. Vite از ES Moduleهای محلی مرورگر برای ارائه قابلیت Hot Module Replacement (HMR) فوق‌سریع استفاده می‌کند و از Rollup برای بیلد‌های نهایی بسیار بهینه بهره می‌برد. درک تنظیمات پیشرفته Vite برای برنامه‌نویسان حرفه‌ای Vue ضروری است.

## ویژگی‌های اصلی
- **اجرای فوری سرور**: دیگر نیازی به صبر کردن برای کامپایل شدن بسته‌های بزرگ در زمان توسعه نیست.
- **سیستم پلاگین غنی**: امکان گسترش قابلیت‌های Vite با پلاگین‌های سازگار با Rollup.
- **وارد کردن خودکار (Auto-import)**: وارد کردن خودکار توابع Vue و کامپوننت‌ها با استفاده از اکوسیستم "unplugin".
- **مدیریت محیط‌ ها (Environment)**: مدیریت امن کلیدها و آدرس‌های API در محیط‌های توسعه، تست و تولید.

---

## ۱. پیکربندی پیشرفته
فایل \`vite.config.js\` مغز متفکر پروژه شماست. در اینجا می‌توانید نام‌های مستعار (Alias)، پروکسی‌ها و پلاگین‌ها را تنظیم کنید.

\`\`\`javascript
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    // پلاگینی که نیاز به import دستی ref و reactive را حذف می‌کند
    AutoImport({
      imports: ['vue', 'pinia'],
      dts: true
    })
  ],
  resolve: {
    alias: { '@': '/src' } // میانبر برای دسترسی راحت به پوشه src
  }
})
\`\`\`

---

## ۲. متغیرهای محیطی و مودها
Vite متغیرها را از طریق \`import.meta.env\` در دسترس قرار می‌دهد. برای امنیت، فقط متغیرهایی که با پیشوند \`VITE_\` شروع شوند در کد فرانت‌اند قابل مشاهده هستند.

\`\`\`javascript
// استفاده در کد:
const API_URL = import.meta.env.VITE_API_URL;
\`\`\`

---

## ۳. بهینه‌ سازی تولید (Production)
Vite از Rollup در پشت صحنه استفاده می‌کند. شما می‌توانید تنظیم کنید که کدهایتان به بخش‌های کوچک‌تر (Chunks) تقسیم شوند تا سرعت لود صفحات افزایش یابد.

---

## خلاصه
- **Vite** استاندارد مدرن برای توسعه در Vue 3 است.
- از **پلاگین‌ها** برای خودکارسازی کارهای تکراری استفاده کنید.
- از **مودها (Modes)** برای مدیریت پویای APIها در نسخه‌های مختلف برنامه استفاده کنید.
`
};
