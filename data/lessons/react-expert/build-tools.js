export const buildToolsLesson = {
    id: 'build-tools',
    title: 'Build Tools (Vite & Webpack)',
    titleFa: 'ابزارهای ساخت (Vite و Webpack)',
    difficulty: 'expert',
    estimatedTime: '45 min',
    content: `
# Build Tools in modern React

## Definition
Build tools are utility programs that automate the process of preparing your code for production. This includes compiling JSX/TypeScript, bundling files, minifying code, and optimizing assets to ensure the smallest and fastest possible application.

## Key Features
- **Bundling**: Combining hundreds of files into a few optimized scripts.
- **Transpilation**: Converting modern syntax (ES6+, JSX) to browser-compatible code.
- **Hot Module Replacement (HMR)**: Seeing code changes instantly without reloading.
- **Tree Shaking**: Removing unused code to keep the bundle small.

---

## 1. Vite (The Modern Standard)
Vite uses ES Modules and a blazingly fast development server to provide an instant development experience.

\`\`\`javascript
// vite.config.js
export default {
  plugins: [react()],
  build: {
    minify: 'terser',
  }
}
\`\`\`

---

## 2. Webpack (The Industry Giant)
While slower than Vite, Webpack offers ultimate customization for complex enterprise builds.

---

## 3. Comparison
- **Vite**: Best for most new projects. Extremely fast.
- **Webpack**: Necessary for legacy projects or complex plugin requirements.
`,
    contentFa: `
# ابزارهای ساخت در ری‌اکت مدرن

## تعریف
ابزارهای ساخت (Build Tools) برنامه‌هایی هستند که فرآیند آماده‌سازی کد شما را برای انتشار (Production) خودکار می‌کنند. این کار شامل کامپایل JSX، بسته‌بندی فایل‌ها (Bundling)، فشرده‌سازی کدها و بهینه‌سازی دارایی‌هاست تا خروجی نهایی کوچک و سریع باشد.

## ویژگی‌های اصلی
- **بسته‌بندی (Bundling)**: ترکیب صدها فایل در قالب چند اسکریپت بهینه.
- **Transpilation**: تبدیل کدهای مدرن به کدهایی که در تمام مرورگرها اجرا شوند.
- **جایگزینی لحظه‌ای (HMR)**: مشاهده تغییرات کد بدون نیاز به رفرش کردن صفحه.
- **Tree Shaking**: حذف بخش‌های استفاده نشده کد برای سبک‌تر شدن برنامه.

---

## ۱. ابزار Vite (استاندارد مدرن)
Vite از ماژول‌های جاوااسکریپت و یک سرور بسیار سریع استفاده می‌کند تا تجربه توسعه‌ای لذت‌بخش و آنی ایجاد کند.

\`\`\`javascript
// vite.config.js
export default {
  plugins: [react()],
  build: {
    minify: 'terser',
  }
}
\`\`\`

---

## ۲. ابزار Webpack (غول دنیای بیلد)
با اینکه سرعتش از Vite کمتر است، اما برای پروژه‌های سازمانی پیچیده قابلیت شخصی‌سازی بی‌نظیری دارد.

---

## ۳. مقایسه کوتاه
- **Vite**: بهترین انتخاب برای پروژه‌های جدید. سرعت خیره‌کننده.
- **Webpack**: ضروری برای پروژه‌های قدیمی یا تنظیمات بسیار خاص.
`
};

export default buildToolsLesson;
