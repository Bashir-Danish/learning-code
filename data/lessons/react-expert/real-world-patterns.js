export const realWorldPatternsLesson = {
  id: 'real-world-patterns',
  title: 'Real-World Architecture',
  titleFa: 'معماری پروژه‌های واقعی',
  difficulty: 'expert',
  estimatedTime: '60 min',
  content: `
# Real-World React Architecture

## Definition
Real-world architecture refers to the organizational patterns used in enterprise-grade React applications. It goes beyond simple component files to include scalable directory structures, state management layers, and clean data-fetching abstractions.

## Key Features
- **Feature-Based Folders**: Organizing code by domain (e.g., /features/auth) rather than type.
- **Atomic Design**: Breaking UI into Atoms, Molecules, and Organisms.
- **Layered Logic**: Separating UI, hooks (logic), and services (API).
- **Scalability**: Ensuring the codebase remains manageable with 100+ routes.

---

## 1. Feature-Based Organization
Avoid "giant folders". Group everything related to a feature together.

\`\`\`text
src/
  features/
    auth/
      components/
      hooks/
      api/
      index.js (Public API)
\`\`\`

---

## 2. The Singleton API Pattern
Abstract your data fetching into a central service or singleton to keep components clean.

\`\`\`javascript
class ApiService {
  static async getUser(id) {
    return fetch(\`/api/users/\${id}\`).then(res => res.json());
  }
}
\`\`\`

---

## 3. Atomic Design Principles
- **Atoms**: Buttons, Inputs (Basic building blocks).
- **Molecules**: SearchBar (Combination of atoms).
- **Organisms**: Header, ProductList (Complex organisms).
`,
  contentFa: `
# معماری پروژه‌های واقعی در ری‌اکت

## تعریف
معماری واقعی (Real-World Architecture) به الگوهای سازمانی گفته می‌شود که در پروژه‌های بزرگ صنعتی استفاده می‌شوند. این موضوع فراتر از نوشتن چند فایل ساده است و شامل ساختار پوشه‌بندی مقیاس‌پذیر، مدیریت وضعیت چندلایه و انتزاعِ (Abstraction) صحیح در دریافت داده‌هاست.

## ویژگی‌های اصلی
- **پوشه‌بندی ویژگی‌محور**: سازماندهی کد بر اساس قابلیت (مثل /auth) به جای نوع فایل.
- **طراحی اتمی (Atomic Design)**: شکستن رابط کاربری به اتم‌ها، مولکول‌ها و ارگانیسم‌ها.
- **منطق چندلایه**: جداسازی ظاهر، هوک‌ها (منطق) و سرویس‌ها (API).
- **مقیاس‌پذیری**: تضمین اینکه پروژه حتی با صدها مسیر، همچنان قابل مدیریت باقی می‌ماند.

---

## ۱. سازماندهی ویژگی‌محور (Feature-based)
از ساخت پوشه‌های غول‌پیکر پرهیز کنید. همه چیز مربوط به یک ویژگی را در یک پوشه جمع کنید.

\`\`\`text
src/
  features/
    auth/
      components/
      hooks/
      api/
      index.js (ورودی رسمی ویژگی)
\`\`\`

---

## ۲. الگوی Singleton در API
مدیریت درخواست‌های شبکه را در یک کلاس یا سرویس مرکزی انجام دهید تا کدهای کامپوننت تمیز بماند.

\`\`\`javascript
class ApiService {
  static async getUser(id) {
    return fetch(\`/api/users/\${id}\`).then(res => res.json());
  }
}
\`\`\`

---

## ۳. اصول طراحی اتمی
- **اتم‌ها**: دکمه‌ها، ورودی‌ها (سنگ بنای اول).
- **مولکول‌ها**: نوار جستجو (ترکیبی از اتم‌ها).
- **ارگانیسم‌ها**: هدر، لیست محصولات (ترکیب‌های پیچیده).
`
};

export default realWorldPatternsLesson;
