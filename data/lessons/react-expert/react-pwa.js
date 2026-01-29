export const reactPwaLesson = {
    id: 'react-pwa',
    title: 'Progressive Web Apps (PWA)',
    titleFa: 'اپلیکیشن‌های وب پیش‌رونده (PWA)',
    difficulty: 'expert',
    estimatedTime: '55 min',
    content: `
# Progressive Web Apps (PWA) in React

## Definition
Progressive Web Apps (PWAs) are web applications that use modern web capabilities to deliver an app-like experience to users. They are built with web technologies (HTML, CSS, JS) but can be installed on home screens and work offline.

## Key Features
- **Offline Support**: Works without a network connection using Service Workers.
- **Installable**: Users can add the app to their home screen without an app store.
- **Native APIs**: Access to hardware features like Push Notifications and Geolocation.
- **Fast & Reliable**: Instant loading and smooth performance.

---

## 1. Manifest & Service Workers
A web app manifest is a JSON file that tells the browser about your PWA. Service Workers handle network requests and caching.

\`\`\`javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My React PWA',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' }
        ]
      }
    })
  ]
})
\`\`\`

## 2. Custom Install Button
Browsers provide the \`beforeinstallprompt\` event. You can catch this to show your own "Install App" UI.

\`\`\`javascript
const [deferredPrompt, setDeferredPrompt] = useState(null);

useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  });
}, []);

const handleInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  }
};
\`\`\`

## 3. iOS Support
iOS requires specific meta tags as it handles PWA installation differently.

\`\`\`html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
\`\`\`
`,
    contentFa: `
# اپلیکیشن‌های وب پیش‌رونده (PWA) در React

## تعریف
اپلیکیشن‌های وب پیش‌رونده (PWA) برنامه‌های وبی هستند که از قابلیت‌های مدرن مرورگرها استفاده می‌کنند تا تجربه‌ای شبیه به اپلیکیشن‌های بومی (Native) به کاربران ارائه دهند. این برنامه‌ها با تکنولوژی‌های وب ساخته می‌شوند اما قابل نصب هستند و به صورت آفلاین کار می‌کنند.

## ویژگی‌های اصلی
- **پشتیبانی آفلاین**: کارکرد بدون اینترنت با استفاده از Service Workerها.
- **قابل نصب**: امکان افزودن به صفحه اصلی گوشی یا دسکتاپ بدون نیاز به اپ‌استور.
- **دسترسی به سخت‌افزار**: استفاده از قابلیت‌هایی مثل Push Notifications و مکان‌یابی.
- **سرعت و پایداری**: بارگذاری سریع و عملکرد روان مشابه برنامه‌های نصب شده.

---

## ۱. مانیفست و سرویس ورکرها
مانیفست وب یک فایل JSON است که مشخصات برنامه را به مرورگر می‌گوید. سرویس ورکرها درخواست‌های شبکه و کش کردن را مدیریت می‌کنند.

\`\`\`javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My React PWA',
        theme_color: '#ffffff',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' }
        ]
      }
    })
  ]
})
\`\`\`

## ۲. دکمه نصب سفارشی
مرورگرها رویداد \`beforeinstallprompt\` را ارائه می‌دهند. شما می‌توانید این رویداد را بگیرید تا دکمه نصب خودتان را نمایش دهید.

\`\`\`javascript
const [deferredPrompt, setDeferredPrompt] = useState(null);

useEffect(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  });
}, []);

const handleInstall = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  }
};
\`\`\`

## ۳. پشتیبانی در iOS
سیستم‌عامل iOS به متا تگ‌های خاصی نیاز دارد زیرا نصب PWA را متفاوت مدیریت می‌کند.

\`\`\`html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
\`\`\`
`
};
