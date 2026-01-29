export const advancedNuxtLesson = {
  id: 'advanced-nuxt',
  title: 'Advanced Nuxt (Nitro & Middleware)',
  titleFa: 'نوکست پیشرفته (نیترو و میان‌افزار)',
  difficulty: 'expert',
  estimatedTime: '70 min',
  content: `
# Advanced Nuxt (Nitro & Middleware)

## Definition
Advanced Nuxt refers to the server-side capabilities of the framework. Using the Nitro engine, developers can build full-stack applications with high-performance API routes, server-side middleware, and edge-side rendering.

## Key Features
- **Nitro Engine**: A massive performance leap for server-side logic.
- **Server Middleware**: Global request handling before it reaches the UI.
- **API Routes**: Write back-end logic in the same project as the frontend.
- **Edge Deployment**: Zero-config deployment to Vercel, Netlify, or Cloudflare Workers.

---

## 1. Nitro API Routes
Server routes in Nuxt are created in the \`/server/api\` directory.

\`\`\`typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: 'Hello from Nitro!'
  }
})
\`\`\`

---

## 2. Server Middleware
Handle authentication, logging, or caching globally on the server.

\`\`\`typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
\`\`\`

---

## 3. Deployment Targets
Nuxt Nitro allows for zero-config deployment to Edge workers and serverless environments.
`,
  contentFa: `
# نوکست پیشرفته (نیترو و میان‌افزار)

## تعریف
نوکست پیشرفته (Advanced Nuxt) به قابلیت‌های سمتِ سرور این فریمورک اشاره دارد. با استفاده از موتور Nitro، برنامه‌نویسان می‌توانند اپلیکیشن‌های Full-stack با مسیرهای API پرسرعت، میان‌افزارهای سمت سرور و رندرینگ در لبه (Edge) بسازند.

## ویژگی‌های اصلی
- **موتور Nitro**: جهشی بزرگ در عملکرد منطق‌های سمت سرور.
- **میان‌افزار سرور**: مدیریت سراسری درخواست‌ها قبل از رسیدن به رابط کاربری.
- **مسیرهای API**: نوشتن کدهای بک‌اِند در همان پروژه فرانت‌اِند.
- **استقرار در لبه (Edge)**: انتشار بدون تنظیمات روی Vercel یا Cloudflare.

---

## ۱. مسیرهای API در نیترو
مسیرهای سرور در Nuxt در دایرکتوری \`/server/api\` ساخته می‌شوند.

\`\`\`typescript
// server/api/hello.ts
export default defineEventHandler((event) => {
  return {
    message: 'سلام از طرف نیترو!'
  }
})
\`\`\`

---

## ۲. میان‌افزار سمت سرور
مدیریت احراز هویت، لاگ کردن یا کش کردن به صورت سراسری روی سرور.

\`\`\`typescript
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, message: 'دسترسی غیرمجاز' })
  }
})
\`\`\`

---

## ۳. اهداف استقرار (Deployment)
نیترو در Nuxt امکان استقرار سریع روی محیط‌های Serverless و Edge را فراهم می‌کند که آن را برای معماری‌های مدرن ایده‌آل می‌سازد.
`
};
