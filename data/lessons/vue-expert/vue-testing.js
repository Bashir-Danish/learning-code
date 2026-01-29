export const vueTestingLesson = {
  id: 'vue-testing',
  title: 'Testing Vue Apps (Vitest)',
  titleFa: 'تست‌نویسی برای اپلیکیشن‌های Vue',
  difficulty: 'expert',
  estimatedTime: '55 min',
  content: `
# Testing in Vue with Vitest

## Definition
Testing ensures your application works as expected and prevents regressions when adding new features. In modern Vue 3 development, **Vitest** is the standard, high-performance testing framework powered by Vite, replacing older tools like Jest.

## Key Features
- **Shared Config**: Uses your existing \`vite.config.js\`.
- **Fast Execution**: Extremely fast HMR (Hot Module Replacement) for tests.
- **Vue Test Utils**: Official integration for mounting components.
- **Mocking**: Powerful built-in mocking capabilities with \`vi.mock\`.

---

## 1. Unit Testing with Vitest
Unit tests focus on individual functions or units of logic.

\`\`\`javascript
import { expect, test } from 'vitest'
import { useCounter } from './useCounter'

test('increments the count', () => {
  const { count, increment } = useCounter()
  increment()
  expect(count.value).toBe(1)
})
\`\`\`

---

## 2. Component Testing (Vue Test Utils)
Component tests verify that your UI components render and behave correctly.

\`\`\`javascript
import { mount } from '@vue/test-utils'
import MyButton from './MyButton.vue'

test('renders message', () => {
  const wrapper = mount(MyButton, {
    props: { msg: 'Hello Vue' }
  })
  expect(wrapper.text()).toContain('Hello Vue')
})
\`\`\`

---

## 3. Best Practices
- **Test User Behavior**: Instead of testing internal state, test what the user sees and does.
- **Isolate Components**: Use mocks to isolate the component from external APIs or stores.
`,
  contentFa: `
# تست‌نویسی با Vitest در Vue

## تعریف
تست‌نویسی تضمین می‌کند که اپلیکیشن شما طبق انتظار کار می‌کند و از بروز خطاهای قبلی در زمان افزودن ویژگی‌های جدید جلوگیری می‌کند. در توسعه مدرن Vue 3، فریمورک **Vitest** به عنوان استاندارد جدید و فوق‌سریع شناخته می‌شود که جایگزین ابزارهای قدیمی مثل Jest شده است.

## ویژگی‌های اصلی
- **تنظیمات مشترک**: استفاده از همان فایل \`vite.config.js\` پروژه.
- **اجرای فوق‌سریع**: استفاده از سیستم HMR برای اجرای لحظه‌ای تست‌ها.
- **Vue Test Utils**: یکپارچگی رسمی برای سوار کردن کامپوننت‌ها.
- **ماک کردن (Mocking)**: قابلیت‌های قدرتمند برای شبیه‌سازی APIها و استورها.

---

## ۱. تست‌های واحد (Unit Testing)
این تست‌ها روی بخش‌های کوچک برنامه (مثل یک تابع منطقی) تمرکز دارند.

\`\`\`javascript
import { expect, test } from 'vitest'
import { useCounter } from './useCounter'

test('باید مقدار را افزایش دهد', () => {
  const { count, increment } = useCounter()
  increment()
  expect(count.value).toBe(1)
})
\`\`\`

---

## ۲. تست کامپوننت (Vue Test Utils)
تست کامپوننت بررسی می‌کند که رابط کاربری شما به درستی رندر شده و رفتار می‌کند.

\`\`\`javascript
import { mount } from '@vue/test-utils'
import MyButton from './MyButton.vue'

test('باید متن پیام را نشان دهد', () => {
  const wrapper = mount(MyButton, {
    props: { msg: 'سلام Vue' }
  })
  expect(wrapper.text()).toContain('سلام Vue')
})
\`\`\`

---

## ۳. بهترین تمرین‌ها
- **تست رفتار کاربر**: به جای تست کدهای داخلی، چیزی را تست کنید که کاربر می‌بیند و انجام می‌دهد.
- **جداسازی کامپوننت**: از Mockها برای جدا کردن کامپوننت از APIها یا استورهای واقعی استفاده کنید.
`
};

export default vueTestingLesson;
