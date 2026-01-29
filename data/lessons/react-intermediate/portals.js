export const portalsLesson = {
  id: 'portals',
  title: 'Portals',
  titleFa: 'پورتال‌ها (Portals)',
  difficulty: 'medium',
  estimatedTime: '25 min',

  content: `
# Portals - Rendering Outside the Parent

## Definition
**Portals** provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This allows components to "break out" of their visual container while remaining logically attached to their React parent.

## Key Features
- **Visual Independence**: Overcome CSS constraints like \`overflow: hidden\` or \`z-index\` stacking contexts.
- **Syntactic Simplicity**: Use the \`createPortal\` API from \`react-dom\`.
- **Logical Connection**: Components in a portal still behave like normal React children (state and context flow into them).
- **Event Bubbling**: Events fired inside a portal propagate to React ancestors, even if they aren't DOM ancestors.

---

## 1. Syntax
Use the \`createPortal\` function from the \`react-dom\` package.

\`\`\`jsx
import { createPortal } from 'react-dom';

function MyPortalComponent() {
  return createPortal(
    <div>I am a child!</div>,
    document.body // Or any other DOM element
  );
}
\`\`\`

---

## 2. Typical Use Case: Modals
A modal needs to be physically at the top level of the DOM (like the \`<body>\`) to ensure it covers the entire screen correctly, regardless of where the button that triggered it is located.

\`\`\`jsx
function Modal({ children }) {
  const mountNode = document.getElementById('modal-root');
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    mountNode
  );
}
\`\`\`

---

## 3. Propagation Behavior
Even though a portal is rendered elsewhere in the browser's DOM tree, it still exists within the **React Tree**. This means context, state updates, and events work as if the child was still inside its parent.

---

## Summary
- Use **createPortal** for UI that floats (Modals, Tooltips, Menus).
- It fixes **Z-Index** and **Overflow** issues.
- It maintains the **React Event System** hierarchy.
`,

  contentFa: `
# پورتال‌ها (Portals) - رندر کردن خارج از والد

## تعریف
**پورتال‌ها (Portals)** راهی برای رندر کردن فرزندان در یک نودِ DOM هستند که خارج از سلسله مراتبِ DOM والد قرار دارد. این قابلیت به کامپوننت‌ها اجازه می‌دهد از "محدودیت‌های بصری" ظرفِ خود خارج شوند، در حالی که همچنان از نظر منطقی به والدِ ری‌اکتی خود متصل باقی می‌مانند.

## ویژگی‌های اصلی
- **استقلال بصری**: غلبه بر محدودیت‌های CSS مثل \`overflow: hidden\` یا تداخل‌های \`z-index\`.
- **سادگی نحو (Syntax)**: استفاده از API ساده \`createPortal\` از پکیج \`react-dom\`.
- **اتصال منطقی**: کامپوننت‌های داخل پورتال همچنان مثل فرزندان عادی ری‌اکت عمل می‌کنند (استیت و کانتکست به آن‌ها منتقل می‌شود).
- **حباب رویداد (Event Bubbling)**: رویدادهای داخل پورتال به اجداد ری‌اکتی منتقل می‌شوند، حتی اگر در DOM اجداد هم نباشند.

---

## ۱. نحوه استفاده
از تابع \`createPortal\` برای انتقال محتوا به یک بخش دیگر از صفحه استفاده کنید.

\`\`\`jsx
import { createPortal } from 'react-dom';

function MyPortal() {
  return createPortal(
    <div>من یک فرزند دور افتاده هستم!</div>,
    document.body // رندر شدن در انتهای تگ بادی
  );
}
\`\`\`

---

## ۲. مورد استفاده رایج: مودال‌ها
یک مودال (Modal) باید به صورت فیزیکی در بالاترین سطح DOM باشد تا کل صفحه را به درستی بپوشاند، فارغ از اینکه دکمه بازکننده آن در کجای صفحه قرار دارد.

\`\`\`jsx
function Modal({ children }) {
  return createPortal(
    <div className="modal-overlay">{children}</div>,
    document.getElementById('modal-root')
  );
}
\`\`\`

---

## ۳. رفتار انتشار رویداد
با وجود اینکه پورتال در جای دیگری از درخت DOM مرورگر رندر می‌شود، اما همچنان در **درخت ری‌اکت (React Tree)** در همان جای قبلی خود حضور دارد. بنابراین تمام کانتکست‌ها و رویدادها به درستی کار می‌کنند.

---

## خلاصه
- از **createPortal** برای المان‌های شناور (مودال، تولتیپ، منو) استفاده کنید.
- این ابزار مشکلات **Z-Index** و **بریدگی لبه‌ها** را حل می‌کند.
- سلسله مراتب رویدادها در ری‌اکت را حفظ می‌کند.
`,

  visualizationId: 'portals',
  exerciseId: 'portals',
};

export default portalsLesson;
