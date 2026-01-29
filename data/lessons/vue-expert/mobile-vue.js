export const mobileVueLesson = {
  id: 'vue-mobile',
  title: 'Vue for Mobile (Ionic & Capacitor)',
  titleFa: 'موبایل با Vue (Ionic و Capacitor)',
  difficulty: 'expert',
  estimatedTime: '60 min',
  content: `
# Vue for Mobile (Ionic & Capacitor)

## Definition
Vue for Mobile involves using hybrid app technologies to build native-like experiences for iOS and Android using the Vue framework. **Ionic** provides pre-styled UI components, while **Capacitor** acts as the bridge to access native device APIs like Camera and GPS.

## Key Features
- **Cross-Platform**: One codebase for Web, iOS, and Android.
- **Native Components**: UI that automatically adapts to the platform (iOS/Android look).
- **Native API Access**: Simple JS interface for Camera, Filesystem, and Geolocation.
- **Web Standards**: Fast development using standard CSS/HTML/JS.

---

## 1. Ionic Vue Components
Adapt to iOS and Android design systems automatically.

\`\`\`html
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mobile App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="takePhoto">Take Photo</ion-button>
    </ion-content>
  </ion-page>
</template>
\`\`\`

---

## 2. Capacitor Native Plugins
Access device hardware using a unified JavaScript API.

\`\`\`javascript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri
  });
};
\`\`\`

---

## 3. Best Practices
- **Performance**: Use virtual scrolling for long lists.
- **UX**: Always provide tactile feedback (vibration) for key operations.
`,
  contentFa: `
# موبایل با Vue (Ionic و Capacitor)

## تعریف
توسعه موبایل با Vue شامل استفاده از تکنولوژی‌های اپلیکیشن ترکیبی (Hybrid) برای ساخت تجربه‌های بومی در iOS و اندروید است. **Ionic** کامپوننت‌های آماده رابط کاربری را فراهم می‌کند و **Capacitor** به عنوان پلی برای دسترسی به APIهای بومی گوشی مثل دوربین و GPS عمل می‌کند.

## ویژگی‌های اصلی
- **چندسکویی (Cross-Platform)**: یک کد واحد برای وب، iOS و اندروید.
- **کامپوننت‌های بومی**: رابط کاربری که خودکار با ظاهر سیستم‌عامل هماهنگ می‌شود.
- **دسترسی به سخت‌افزار**: رابط جاوااسکریپتی ساده برای دوربین، سیستم فایل و لوکیشن.
- **استانداردهای وب**: توسعه سریع با استفاده از همان دانش CSS و HTML و JS.

---

## ۱. کامپوننت‌های Ionic Vue
هماهنگی خودکار با سیستم‌های طراحی iOS و اندروید.

\`\`\`html
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>اپلیکیشن موبایل</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="takePhoto">گرفتن عکس</ion-button>
    </ion-content>
  </ion-page>
</template>
\`\`\`

---

## ۲. پلاگین‌های بومی Capacitor
دسترسی به سخت‌افزار دستگاه با استفاده از APIهای یکپارچه.

\`\`\`javascript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.Uri
  });
};
\`\`\`

---

## ۳. بهترین تمرین‌ها
- **کارایی (Performance)**: استفاده از اسکرول مجازی برای لیست‌های طولانی.
- **تجربه کاربری (UX)**: استفاده از لرزش (Haptic Feedback) برای عملیات‌های مهم.
`
};
