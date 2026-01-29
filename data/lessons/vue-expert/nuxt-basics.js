export const nuxtBasicsLesson = {
    id: 'nuxt-basics',
    title: 'Introduction to Nuxt 3 (SSR)',
    titleFa: 'آشنایی با Nuxt 3 و رندر سمت سرور',
    difficulty: 'expert',
    estimatedTime: '70 min',
    content: `
# Nuxt 3 - The Intuitive Vue Framework

## Definition
Nuxt is an open-source framework under MIT license that makes web development intuitive and powerful. It provides a structured way to build Vue applications with Server-Side Rendering (SSR), Static Site Generation (SSG), and a high-performance engine called Nitro.

## Key Features
- **File-based Routing**: Automatically generate routes from the \`pages/\` directory.
- **Auto-imports**: No need to manually import Vue composables or components.
- **Nitro Engine**: Ultra-fast server engine for production environments.
- **Universal Rendering**: SEO-friendly HTML generated on the server.

---

## 1. Directory Structure
- \`pages/\`: Automates routing.
- \`components/\`: Auto-imported components.
- \`server/\`: API routes and server middleware.
- \`composables/\`: Auto-imported business logic.

---

## 2. Data Fetching
Nuxt provides special composables like \`useFetch\` and \`useAsyncData\` that handle data fetching during both server-side and client-side rendering.

\`\`\`javascript
const { data } = await useFetch('/api/hello')
\`\`\`

---

## 3. SEO and Meta Tags
Nuxt makes it easy to manage meta tags and SEO using the \`useHead\` composable or \`SetMeta\` components.

\`\`\`javascript
useHead({
  title: 'My Awesome Page',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ]
})
\`\`\`
`,
    contentFa: `
# فریمورک Nuxt 3 - قدرت واقعی Vue

## تعریف
ناکست (Nuxt) یک فریمورک اپن‌سورس تحت لایسنس MIT است که توسعه وب را بصری و قدرتمند می‌کند. این فریمورک ساختاری منظم برای برنامه‌های Vue با قابلیت رندر سمت سرور (SSR) و تولید سایت استاتیک (SSG) فراهم می‌کند و از موتور بسیار سریع Nitro قدرت می‌گیرد.

## ویژگی‌های اصلی
- **مسیریابی خودکار**: ساخت خودکار مسیرها از روی فایل‌های داخل پوشه \`pages\`.
- **ایمپورت خودکار**: عدم نیاز به ایمپورت دستی هوک‌ها یا کامپوننت‌های Vue.
- **موتور Nitro**: موتور سرور فوق‌سریع برای محیط‌های عملیاتی.
- **رندر یکپارچه (Universal Rendering)**: تولید HTML بهینه برای سئو در سمت سرور.

---

## ۱. ساختار پوشه‌ها
- **pages**: مدیریت صفحات و آدرس‌های سایت.
- **components**: کامپوننت‌هایی که به صورت خودکار ایمپورت می‌شوند.
- **server**: مسیرهای API و میان‌افزارهای سمت سرور.
- **composables**: منطق‌های تکرارپذیر که همه جا در دسترس هستند.

---

## ۲. دریافت داده (useFetch)
در ناکست ما از توابع مخصوصی مثل \`useFetch\` استفاده می‌کنیم که هم در سرور و هم در مرورگر به خوبی کار می‌کنند.

\`\`\`javascript
const { data } = await useFetch('/api/hello')
\`\`\`

---

## ۳. مدیریت سئو (SEO)
ناکست مدیریت متا تگ‌ها و سئو را با استفاده از هوک \`useHead\` بسیار ساده کرده است.

\`\`\`javascript
useHead({
  title: 'صفحه فوق‌العاده من',
  meta: [
    { name: 'description', content: 'توضیحات سایت من' }
  ]
})
\`\`\`
`
};

export default nuxtBasicsLesson;
