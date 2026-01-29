export const provideInjectLesson = {
    id: 'provide-inject',
    title: 'Provide / Inject (Dependency Injection)',
    titleFa: 'تزریق وابستگی با Provide و Inject',
    difficulty: 'medium',
    estimatedTime: '40 min',

    content: `
# Provide and Inject - Avoiding Prop Drilling

## Definition
**Provide** and **Inject** are a pair of functions in Vue that allow an ancestor component to serve as a dependency provider for all its descendants, regardless of how deep the component tree is. This mechanism effectively solves the "Prop Drilling" problem, where data needs to be passed through multiple intermediate components that don't actually need it.

## Key Features
- **Global-ish State**: Share data with an entire branch of your component tree without global stores like Pinia.
- **Reactivity Support**: When passing a \`ref\` or \`reactive\` object, the injected data remains reactive in child components.
- **Dependency Injection**: Decouples components by allowing them to rely on abstract data keys rather than specific parent props.
- **Default Values**: The \`inject\` function can accept a fallback value if the provider is missing.

---

## 1. Provide (The Producer)
A parent component uses the \`provide\` function to expose data.

\`\`\`javascript
import { provide, ref } from 'vue'

const theme = ref('dark')
const toggleTheme = () => theme.value = theme.value === 'dark' ? 'light' : 'dark'

// Providing both the state and the updater function
provide('theme-settings', { theme, toggleTheme })
\`\`\`

---

## 2. Inject (The Consumer)
A child component at any depth can "grab" that data using the \`inject\` function.

\`\`\`javascript
import { inject } from 'vue'

// Injecting with a default fallback
const { theme, toggleTheme } = inject('theme-settings', { 
  theme: 'light', 
  toggleTheme: () => {} 
})
\`\`\`

---

## Summary
- **Provide**: Broadcasts data to all descendants.
- **Inject**: Receives data from an ancestor.
- **Best For**: Themes, user authentication stats, or shared configurations in specific sub-trees.
- **React Parallel**: Very similar to the **Context API**.
`,

    contentFa: `
# تزریق وابستگی (Provide / Inject)

## تعریف
**Provide** و **Inject** جفتی از توابع در Vue هستند که به یک کامپوننت اجازه می‌دهند به عنوان "تأمین‌کننده" داده برای تمام فرزندان و نوادگان خود عمل کند، فارغ از اینکه عمق درخت کامپوننت چقدر باشد. این مکانیزم به طور موثری مشکل **Prop Drilling** را حل می‌کند؛ یعنی زمانی که داده باید از چندین لایه میانی که خودشان نیازی به آن داده ندارند، عبور کند.

## ویژگی‌های اصلی
- **وضعیت نیمه‌ سراسری**: به اشتراک‌گذاری داده با یک شاخه کامل از درخت کامپوننت بدون نیاز به استورهای سراسری مثل Pinia.
- **پشتیبانی از واکنش‌ گرایی**: در صورت ارسال \`ref\` یا \`reactive\`، داده‌های تزریق شده در فرزندان همچنان واکنش‌گرا باقی می‌مانند.
- **تزریق وابستگی (DI)**: جداسازی کامپوننت‌ها با اجازه دادن به آن‌ها برای تکیه بر "کلیدهای داده" به جای پراپس‌های مستقیم.
- **مقادیر پیش‌ فرض**: تابع \`inject\` می‌تواند یک مقدار جایگزین (Fallback) بپذیرد تا در صورت نبودِ تأمین‌کننده، برنامه کرش نکند.

---

## ۱. بخش Provide (دهنده)
کامپوننت والد از تابع \`provide\` برای در دسترس قرار دادن داده‌ها استفاده می‌کند.

\`\`\`javascript
import { provide, ref } from 'vue'

const language = ref('fa')
provide('app-lang', language)
\`\`\`

---

## ۲. بخش Inject (گیرنده)
هر کامپوننت فرزند در هر عمقی می‌تواند آن داده را با استفاده از \`inject\` دریافت کند.

\`\`\`javascript
import { inject } from 'vue'

const currentLang = inject('app-lang', 'en') // 'en' مقدار پیش‌فرض است
\`\`\`

---

## خلاصه
- **Provide**: داده را به تمام نوادگان ارسال می‌کند.
- **Inject**: داده را از یکی از اجداد دریافت می‌کند.
- **موارد استفاده**: برای تم‌ها، مشخصات کاربر، یا تنظیمات مشترک در بخش‌های خاصی از برنامه عالی است.
- **معادل ری‌اکت**: این قابلیت دقیقاً مشابه **Context API** در ری‌اکت عمل می‌کند.
`,

    visualizationId: 'vue-provide-inject',
    exerciseId: 'provide-inject',
};

export default provideInjectLesson;
