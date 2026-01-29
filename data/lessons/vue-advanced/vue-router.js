export const vueRouterLesson = {
  id: 'vue-router',
  title: 'Vue Router 4',
  titleFa: 'مسیریابی با Vue Router 4',
  difficulty: 'hard',
  estimatedTime: '50 min',

  content: `
# Vue Router 4 - Single Page Applications

## Definition
**Vue Router** is the official router for Vue.js. It integrates deeply with Vue's core to make building Single Page Applications (SPAs) efficient and intuitive. It allows you to map browser URLs to specific components, enabling navigation without full page reloads.

## Key Features
- **Declarative Navigation**: Use the \`<router-link>\` component to create accessible links that handle history state automatically.
- **Dynamic Route Matching**: Capture parts of the URL (like IDs) as reactive parameters using the \`useRoute\` hook.
- **Nested Routes**: Build complex layouts with multiple levels of nested \`<router-view>\` outlets.
- **Navigation Guards**: Intercept routing decisions to handle authentication, data pre-fetching, or unsaved changes.

---

## 1. Defining Routes
Routes are defined as an array of objects mapping paths to components.

\`\`\`javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/user/:id', component: UserProfile, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
\`\`\`

---

## 2. Navigation
- **In Templates**: Replace standard \`<a>\` tags with \`<router-link>\`.
- **In Script**: Use the \`useRouter\` hook for programmatic control.

\`\`\`javascript
import { useRouter } from 'vue-router'
const router = useRouter()

const goToProfile = (userId) => {
  router.push({ path: \`/user/\${userId}\` })
}
\`\`\`

---

## 3. Persistent Layouts (Nested Routes)
You can define parent routes that have their own \`<router-view>\`, allowing for persistent headers or sidebars while child content changes.

---

## Summary
- **router-link**: Creates clickable links without page refreshes.
- **router-view**: The placeholder where the current page component is rendered.
- **useRouter / useRoute**: Essential hooks for controlling and reading the router state in the Composition API.
`,

  contentFa: `
# مسیریابی در Vue Router 4

## تعریف
**Vue Router** کتابخانه رسمی مسیریابی برای Vue.js است. این ابزار به طور عمیق با هسته Vue هماهنگ شده تا ساخت اپلیکیشن‌های تک‌صفحه‌ای (SPA) را بهینه و ساده کند. Vue Router به شما اجازه می‌دهد آدرس‌های مرورگر را به کامپوننت‌های خاص متصل کنید و مسیریابی را بدون بارگذاری مجدد کل صفحه (Refresh) انجام دهید.

## ویژگی‌های اصلی
- **مسیریابی توصیفی**: استفاده از کامپوننت \`<router-link>\` برای ساخت لینک‌هایی که تاریخچه مرورگر را به درستی مدیریت می‌کنند.
- **تطبیق مسیر پویا**: استخراج بخش‌هایی از آدرس (مثل آی‌دی کاربر) به عنوان پارامترهای واکنش‌گرا با استفاده از هوک \`useRoute\`.
- **مسیرهای تو-در-تو (Nested)**: ساخت لایوت‌های پیچیده با استفاده از چندین لایه خروجی \`<router-view>\`.
- **محافظ‌های ناوبری (Guards)**: مدیریت جابجایی بین صفحات برای مواردی مثل احراز هویت (Auth) یا بارگذاری داده‌ها قبل از ورود به صفحه.

---

## ۱. تعریف مسیرها (Routes)
مسیرها به صورت آرایه‌ای از اشیاء تعریف می‌شوند که هر آدرس را به یک کامپوننت متصل می‌کنند.

\`\`\`javascript
const routes = [
  { path: '/', component: HomePage },
  { path: '/profile/:id', component: UserProfile }
];
\`\`\`

---

## ۲. جابجایی بین صفحات
- **در قالب (Template)**: جایگزین کردن تگ‌های \`<a>\` با \`<router-link>\`.
- **در کد (Script)**: استفاده از هوک \`useRouter\` برای مدیریت جابجایی‌ها.

\`\`\`javascript
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  // کارهای خروج کاربر
  router.push('/login') // هدایت به صفحه ورود
}
\`\`\`

---

## ۳. پارامترهای مسیر (Params)
برای دسترسی به آی‌دی‌ها یا اسلاگ‌های موجود در آدرس، از هوک \`useRoute\` استفاده می‌کنیم.

\`\`\`javascript
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params.id) // چارت آی‌دی کاربر را نمایش می‌دهد
\`\`\`

---

## خلاصه
- **router-link**: ساخت لینک‌های سریع و بدون رفرش.
- **router-view**: محل قرارگیری و نمایش کامپوننت مربوط به آدرس فعلی.
- **useRouter**: دسترسی به دستورات مسیریابی (مثل push یا back).
- **useRoute**: دسترسی به اطلاعات آدرس فعلی (مثل params یا query).
`,

  visualizationId: 'vue-router',
  exerciseId: 'vue-router',
};

export default vueRouterLesson;
