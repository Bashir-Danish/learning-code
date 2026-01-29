export const stateManagementLesson = {
  id: 'state-management',
  title: 'State Management (Zustand & RTK)',
  titleFa: 'مدیریت وضعیت (Zustand و Redux)',
  difficulty: 'hard',
  estimatedTime: '60 min',

  content: `
# State Management - Beyond Context

## Definition
**State Management** is the architecture used to handle data flow and synchronization across a complex application. While React provides \`useState\` and Context API, large-scale apps often require dedicated libraries like **Zustand** or **Redux Toolkit (RTK)** to manage state more efficiently, avoid performance bottlenecks, and provide better debugging tools.

## Key Features
- **Centralized Store**: A "single source of truth" that any component can access.
- **Performance Optimization**: Libraries like Zustand allow components to subscribe to specific parts of state, preventing unnecessary re-renders.
- **Asynchronous Actions**: Built-in support for handling API calls and side effects within the store.
- **DevTools Integration**: Powerful browser extensions to travel back in time through state changes (Redux).

---

## 1. Zustand (The Modern Choice 🐻)
Zustand is currently the most loved state management library because it is extremely lightweight, requires no boilerplate, and doesn't need a "Provider" wrapping your app.

\`\`\`jsx
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

// Usage in any component:
const user = useAuthStore((state) => state.user);
\`\`\`

---

## 2. Redux Toolkit (The Enterprise Standard ⚙️)
Redux is the most stable and mature library. Redux Toolkit (RTK) is the official, modernized way to write Redux logic, removing the complexity of "old Redux."

\`\`\`jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 }
  }
});
\`\`\`

---

## 3. Comparison Table
| Feature | Context API | Zustand | Redux Toolkit |
| :--- | :--- | :--- | :--- |
| **Setup** | Easy | Easy | Moderate |
| **Performance** | Low (Re-renders tree) | High (Selective) | High (Selective) |
| **Boilerplate** | Low | Low | High |
| **Best For** | Small apps/Themes | Most projects | Huge Enterprises |

---

## Summary
- **useContext**: Use for static, global data (Theme, Language).
- **Zustand**: Best for performance and simplicity in modern apps.
- **Redux Toolkit**: Best for massive apps with complex data flows.
`,

  contentFa: `
# مدیریت وضعیت (State Management) حرفه‌ای

## تعریف
**مدیریت وضعیت (State Management)** معماری مورد استفاده برای مدیریت جریان داده و همگام‌سازی اطلاعات در یک اپلیکیشن پیچیده است. در حالی که ری‌اکت ابزارهایی مثل \`useState\` و Context API را ارائه می‌دهد، اپلیکیشن‌های مقیاس بزرگ اغلب به کتابخانه‌های اختصاصی مثل **Zustand** یا **Redux Toolkit (RTK)** نیاز دارند تا وضعیت را بهینه‌تر مدیریت کرده، از افت عملکرد جلوگیری کنند و ابزارهای دیباگینگ بهتری ارائه دهند.

## ویژگی‌های اصلی
- **ذخیره‌سازی متمرکز**: یک "منبع واحد حقیقت" که هر کامپوننتی می‌تواند به آن دسترسی داشته باشد.
- **بهینه‌سازی عملکرد**: کتابخانه‌هایی مثل زاستند به کامپوننت‌ها اجازه می‌دهند فقط به بخش‌های خاصی از وضعیت متصل شوند تا از رندرهای بیهوده جلوگیری شود.
- **عملیات ناهمگام (Async)**: پشتیبانی داخلی برای مدیریت فراخوانی‌های API در داخل استور.
- **یکپارچگی با DevTools**: افزونه‌های قدرتمند مرورگر برای مشاهده و بازگشت به لحظات مختلف تغییر وضعیت برنامه (تایم تراول).

---

## ۱. زاستند (Zustand) - انتخاب مدرن 🐻
زاستند در حال حاضر محبوب‌ترین کتابخانه مدیریت وضعیت است چون بسیار سبک است، نیاز به کدهای تکراری ندارد و برخلاف Context نیازی به "Provider" برای دورپیچ کردن برنامه ندارد.

\`\`\`jsx
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

// استفاده در هر کجای برنامه:
const count = useStore((state) => state.count);
\`\`\`

---

## ۲. رداکس تولکیت (Redux Toolkit) - استاندارد بازار کار ⚙️
رداکس پایدارترین و قدیمی‌ترین کتابخانه است. Redux Toolkit روش رسمی و مدرن نوشتن منطق رداکس است که پیچیدگی‌های "رداکس قدیمی" را حذف کرده است.

---

## ۳. جدول مقایسه
| ویژگی | Context API | Zustand | Redux Toolkit |
| :--- | :--- | :--- | :--- |
| **راه‌اندازی** | ساده | ساده | متوسط |
| **عملکرد** | معمولی | بسیار بالا | بسیار بالا |
| **بهترین کاربرد** | تم و زبان برنامه | اکثر پروژه‌ها | پروژه‌های سازمانی بزرگ |

---

## خلاصه
- **Context API**: فقط برای داده‌های ثابت و سراسری (تم، زبان).
- **Zustand**: بهترین انتخاب برای سرعت بالا و سادگی در اکثر پروژه‌های مدرن.
- **Redux Toolkit**: بهترین انتخاب برای اپلیکیشن‌های عظیم با جریان‌های داده پیچیده.
`,

  visualizationId: 'state-management',
  exerciseId: 'state-management',
};

export default stateManagementLesson;
