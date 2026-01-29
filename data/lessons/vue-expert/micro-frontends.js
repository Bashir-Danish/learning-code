export const microFrontendsLesson = {
  id: 'vue-microfrontends',
  title: 'Micro-frontends & Module Federation',
  titleFa: 'میکروفرانت‌اند و فدراسیون ماژول',
  difficulty: 'expert',
  estimatedTime: '65 min',
  content: `
# Micro-frontends & Module Federation

## Definition
Micro-frontends is an architectural style where independently deliverable frontend applications are composed into a greater whole. **Module Federation** is a specific technology in build tools (like Vite or Webpack) that allows these independent apps to share components and state at runtime.

## Key Features
- **Independent Deployments**: Teams can ship features without redeploying the whole app.
- **Runtime Sharing**: Load components from another build without npm install.
- **Technology Agnostic**: Mix different frameworks if necessary.
- **Scalability**: Break a monolithic app into manageable sub-domains.

---

## 1. Module Federation Config
Expose components from an "exposed" app and consume them in a "host" app.

\`\`\`javascript
// vite.config.js
import federation from "@originjs/vite-plugin-federation";

export default {
  plugins: [
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.vue',
      },
      shared: ['vue', 'pinia']
    })
  ]
}
\`\`\`

---

## 2. Loading Remotes Dynamically
Load components dynamically to reduce initial bundle size.

\`\`\`javascript
const RemoteButton = defineAsyncComponent(() => 
  import('remote_app/Button')
);
\`\`\`

---

## 3. Shared State
Using Pinia, you can share the same state instance between different micro-apps.
`,
  contentFa: `
# میکروفرانت‌اند و فدراسیون ماژول در Vue

## تعریف
میکروفرانت‌اند (Micro-frontends) یک سبک معماری است که در آن اپلیکیشن‌های فرانت‌اِندی که به طور مستقل قابل عرضه هستند، در یک کل بزرگتر ترکیب می‌شوند. **Module Federation** تکنولوژی خاصی در ابزارهای ساخت (مثل Vite) است که اجازه می‌دهد این برنامه‌های مستقل، کامپوننت‌ها و وضعیت‌ها را در زمان اجرا به اشتراک بگذارند.

## ویژگی‌های اصلی
- **استقرار (Deployment) مستقل**: تیم‌ها می‌توانند بدون بیلدِ دوباره کل سایت، بخش خود را آپدیت کنند.
- **اشتراک‌گذاری در زمان اجرا**: بارگذاری کامپوننت از یک پروژه دیگر بدون نیاز به نصب در npm.
- **انعطاف‌پذیری تکنولوژی**: امکان استفاده از فریمورک‌های مختلف در صورت ضرورت.
- **مقیاس‌پذیری**: تقسیم یک برنامه غول‌پیکر (Monolithic) به دامنه‌های کوچک قابل مدیریت.

---

## ۱. تنظیمات Module Federation
نمایش کامپوننت‌ها از یک اپلیکیشن و استفاده از آن‌ها در اپلیکیشن دیگر.

\`\`\`javascript
// vite.config.js
import federation from "@originjs/vite-plugin-federation";

export default {
  plugins: [
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.vue',
      },
      shared: ['vue', 'pinia']
    })
  ]
}
\`\`\`

---

## ۲. بارگذاری پویای Remoteها
بارگذاری پویا برای کاهش حجم بیلد اولیه و افزایش سرعت سایت.

\`\`\`javascript
const RemoteButton = defineAsyncComponent(() => 
  import('remote_app/Button')
);
\`\`\`

---

## ۳. وضعیت مشترک (Shared State)
با استفاده از Pinia، می‌توانید یک نمونه استیت واحد را بین میکرو-اپ‌های مختلف به اشتراک بگذارید.
`
};
