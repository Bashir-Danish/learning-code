export const listsKeysLesson = {
  id: 'lists-keys',
  title: 'Lists and Keys',
  titleFa: 'لیست‌ها و کلیدها',
  difficulty: 'easy',
  estimatedTime: '35 min',

  content: `
# Lists & Keys

## Definition
Lists and keys refer to the pattern of rendering multiple similar components from an array of data. In React, we use the JavaScript \`map()\` function to transform data into JSX, and we provide a **Key** prop to give each element a stable identity.

## Key Features
- **Dynamic Iteration**: Render hundreds of items using a single logic block.
- **Efficient Updates**: Keys allow React to update only changed items instead of the whole list.
- **Stable Identity**: Maintains component state (like input focus) even when the list order changes.
- **Developer Warnings**: React warns you in the console if you forget to provide keys.

---

## 1. Rendering Multiple Components
Use \`map()\` to produce an array of elements directly inside your JSX.

\`\`\`jsx
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number.toString()}>
          {number}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

---

## 2. Choosing a Key
- **Unique IDs**: The best key is a unique ID from your data (e.g., \`user.id\`).
- **Stable**: Don't use \`Math.random()\` as it changes every render.
- **Sibling Privacy**: Keys only need to be unique among their siblings, not globally.

---

## 3. The Index Pitfall (⚠️)
Using the array index (\`index\`) as a key is discouraged if the list can be reordered, filtered, or items can be removed. This can cause UI bugs and poor performance.

\`\`\`jsx
// Avoid if list is dynamic ❌
{items.map((item, index) => <li key={index}>{item.text}</li>)}

// Preferred ✅
{items.map((item) => <li key={item.id}>{item.text}</li>)}
\`\`\`

---

## Summary
- Use **map()** to render lists.
- Every item in a list **must have a unique key**.
- Keys help React's performance during reconciliation.
`,

  contentFa: `
# لیست‌ها و کلیدها (Lists & Keys)

## تعریف
لیست‌ها و کلیدها به الگوی رندر کردن چندین کامپوننت مشابه از یک آرایه داده اشاره دارند. در ری‌اکت، ما از تابع \`map()\` جاوااسکریپت برای تبدیل داده‌ها به JSX استفاده می‌کنیم و یک ویژگی به نام **Key** به هر المان می‌دهیم تا هویت پایداری داشته باشد.

## ویژگی‌های اصلی
- **تکرار پویا**: رندر کردن صدها آیتم با استفاده از یک قطعه کد واحد.
- **بروزرسانی بهینه**: کلیدها به ری‌اکت اجازه می‌دهند فقط آیتم‌های تغییر یافته را آپدیت کند.
- **هویت پایدار**: حفظ وضعیت کامپوننت (مثل فوکوسِ ورودی) حتی زمانی که ترتیب لیست تغییر می‌کند.
- **هشدارهای توسعه**: ری‌اکت در صورت فراموش کردن کلید، در کنسول به شما هشدار می‌دهد.

---

## ۱. رندر کردن لیست‌ها
استفاده از \`map()\` برای تولید مستقیم آرایه‌ای از المنت‌ها درون JSX.

\`\`\`jsx
function NumberList() {
  const numbers = [1, 2, 3, 4, 5];
  
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number.toString()}>
          {number}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

---

## ۲. انتخاب یک کلید صحیح
- **IDهای منحصر به فرد**: بهترین کلید، ID دریافتی از دیتابیس است (مثل \`user.id\`).
- **پایداری**: از \`Math.random()\` استفاده نکنید چون در هر رندر تغییر می‌کند.
- **حیطه محلی**: کلیدها فقط باید در بین همسایه‌های خود منحصر به فرد باشند.

---

## ۳. خطر استفاده از Index (⚠️)
استفاده از اندیس آرایه به عنوان کلید در صورتی که لیست قابل مرتب‌سازی یا حذف باشد، توصیه نمی‌شود. این کار می‌تواند باعث بروز باگ‌های عجیب در رابط کاربری شود.

\`\`\`jsx
// اگر لیست تغییر می‌کند، استفاده نکنید ❌
{items.map((item, index) => <li key={index}>{item.text}</li>)}

// روش پیشنهادی ✅
{items.map((item) => <li key={item.id}>{item.text}</li>)}
\`\`\`

---

## خلاصه
- از **map()** برای نمایش لیست‌ها استفاده کنید.
- هر آیتم در لیست **حتماً باید** یک کلید (Key) منحصر به فرد داشته باشد.
- کلیدها به عملکرد ری‌اکت در زمان تغییرات کمک می‌کنند.
`,

  visualizationId: 'list-keys',
  exerciseId: 'lists-keys',
};

export default listsKeysLesson;
