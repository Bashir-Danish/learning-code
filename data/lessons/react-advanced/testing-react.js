export const testingReactLesson = {
    id: 'testing-react',
    title: 'Testing React Apps',
    titleFa: 'تست‌نویسی در ری‌اکت',
    difficulty: 'hard',
    estimatedTime: '55 min',

    content: `
# Testing React Applications

## Definition
**Testing** in React involves writing code to verify that your components and logic behave correctly under various conditions. It helps prevent regressions (old bugs reappearing) and ensures that new changes don't break existing features. The current industry standard is using **Vitest** as the test runner and **React Testing Library (RTL)** to interact with components.

## Key Features
- **User-Centric Testing**: React Testing Library encourages testing *behavior* (what the user sees) rather than internal implementation details.
- **Mocking**: Simulate API calls and external services to test components in isolation.
- **Snapshots**: Capture a "picture" of your component's HTML structure to detect unexpected changes.
- **Coverage Reports**: Measure exactly how much of your code is covered by tests.

---

## 1. React Testing Library (RTL)
RTL is the standard because it forces you to write tests that resemble how a real user uses your app. Instead of checking a state variable, you check if a "Success" message is visible on the screen.

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('shows error on empty login', () => {
  render(<Login />);
  
  const submitBtn = screen.getByRole('button', { name: /login/i });
  fireEvent.click(submitBtn);
  
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});
\`\`\`

---

## 2. Test Runner: Vitest
Vitest is a blazing fast test runner built on top of Vite. It is compatible with Jest syntax but much faster for modern projects.

---

## 3. The Testing Pyramid
- **Unit Tests**: Test a single function or small component (Fastest, cheapest).
- **Integration Tests**: Test multiple components working together (e.g., a form and its validation).
- **E2E Tests**: Test the entire application flow in a real browser using tools like **Playwright**.

---

## Summary
- **Test Behavior**: Check what appears on the screen, not what's in the state.
- **Vitest**: The modern choice for running tests.
- **Reliability**: Good tests make refactoring code much safer and faster.
`,

    contentFa: `
# تست‌نویسی در ری‌اکت (Testing)

## تعریف
**تست‌نویسی (Testing)** در ری‌اکت شامل نوشتن کدهایی است که درستی عملکرد کامپوننت‌ها و منطق برنامه شما را در شرایط مختلف بررسی می‌کنند. این کار به جلوگیری از بازگشت باگ‌های قدیمی (Regressions) کمک کرده و تضمین می‌کند که تغییرات جدید باعث خرابی قابلیت‌های قبلی نشوند. استاندارد فعلی صنعت استفاده از **Vitest** به عنوان اجراکننده تست و **React Testing Library (RTL)** برای تعامل با کامپوننت‌ها است.

## ویژگی‌های اصلی
- **تستِ کاربر-محور**: کتابخانه RTL شما را تشویق می‌کند که *رفتار* برنامه (آنچه کاربر می‌بیند) را تست کنید، نه جزئیات داخلی پیاده‌سازی را.
- **شبیه‌سازی (Mocking)**: شبیه‌سازی فراخوانی‌های API و سرویس‌های خارجی برای تست کامپوننت‌ها در محیط ایزوله.
- **تست‌های اسنپ‌شات (Snapshots)**: ثبت یک "تصویر" از ساختار HTML کامپوننت برای تشخیص تغییرات ناخواسته در آینده.
- **گزارش پوشش (Coverage)**: اندازه‌گیری دقیق اینکه چند درصد از کد شما توسط تست‌ها پوشش داده شده است.

---

## ۱. کتابخانه React Testing Library
این کتابخانه استاندارد است چون شما را مجبور می‌کند تست‌هایی بنویسید که شبیه به رفتار یک کاربر واقعی است. به جای چک کردن مقدار یک متغیر، چک می‌کنید که آیا پیام "خوش آمدید" روی صفحه ظاهر شده است یا خیر.

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('با کلیک بر روی دکمه، عدد زیاد شود', () => {
  render(<Counter />);
  
  const button = screen.getByText(/افزایش/i);
  fireEvent.click(button);
  
  expect(screen.getByText(/مقدار: 1/i)).toBeInTheDocument();
});
\`\`\`

---

## ۲. اجراکننده تست: Vitest
Vitest یک اجراکننده تست فوق‌سریع است که بر پایه‌ی Vite ساخته شده و با دستورات Jest سازگار است، اما سرعت بسیار بالاتری در پروژه‌های مدرن دارد.

---

## ۳. انواع تست
- **تست واحد (Unit)**: تست یک تابع یا کامپوننت کوچک به تنهایی (سریع‌ترین نوع تست).
- **تست یکپارچگی (Integration)**: تست تعامل چندین کامپوننت با هم (مثلاً یک فرم و سیستم اعتبارسنجی آن).
- **تست سرتاسری (E2E)**: تست کامل جریان برنامه در یک مرورگر واقعی با ابزارهایی مثل **Playwright**.

---

## خلاصه
- **تست رفتار**: آنچه روی صفحه ظاهر می‌شود را چک کنید، نه آنچه در استیت است.
- **Vitest**: انتخاب مدرن برای اجرای تست‌ها.
- **قابلیت اطمینان**: تست‌های خوب باعث می‌شوند بازنویسی (Refactor) کدهای قدیمی بسیار امن‌تر و سریع‌تر انجام شود.
`,

    visualizationId: 'testing',
    exerciseId: 'testing-react',
};

export default testingReactLesson;
