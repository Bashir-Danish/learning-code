export const jsxBasicsLesson = {
  id: 'jsx-basics',
  title: 'JSX Basics',
  titleFa: 'مبانی JSX',
  difficulty: 'easy',
  estimatedTime: '30 min',

  content: `
# JSX - JavaScript XML

## Definition
JSX is a syntax extension for JavaScript that looks like HTML. It allows you to describe what the user interface should look like in a familiar, declarative way, while keeping the full power of JavaScript logic.

## Key Features
- **Declarative Markup**: Clearly describe your UI structure within JS.
- **Dynamic Content**: Easily embed variables and expressions using \`{}\`.
- **Security**: Automatically escapes values to prevent Cross-Site Scripting (XSS).
- **Tooling Support**: Provides excellent linting and debugging in modern IDEs.

---

## 1. The Basic Syntax
JSX looks like HTML, but it's actually JavaScript.

\`\`\`jsx
const element = <h1>Hello, World!</h1>;
\`\`\`

Behind the scenes, the React compiler transforms this into:
\`\`\`javascript
const element = React.createElement('h1', null, 'Hello, World!');
\`\`\`

---

## 2. Embedding Expressions
You can put any valid JavaScript expression inside curly braces \`{}\`.

\`\`\`jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

// You can also call functions
function formatUser(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = { firstName: 'Harper', lastName: 'Perez' };
const welcome = <h1>Hello, {formatUser(user)}!</h1>;
\`\`\`

---

## 3. JSX Rules

### Rule 1: Return a Single Root Element
A component must return a single element. Use a fragment \`<>\` or a \`<div>\`.

\`\`\`jsx
// Correct ✅
return (
  <>
    <h1>Hello</h1>
    <p>World</p>
  </>
);
\`\`\`

### Rule 2: Close All Tags
All tags must be closed, even self-closing ones like \`<img>\`.

### Rule 3: camelCase Attributes
- \`class\` → \`className\`
- \`onclick\` → \`onClick\`
- \`for\` → \`htmlFor\`

---

## 4. Conditional Rendering
In JSX, we use standard JS operators for conditions.

\`\`\`jsx
// Ternary Operator
<div>{isLoggedIn ? <LogoutButton /> : <LoginButton />}</div>

// Logical AND (&&)
<div>{unreadMessages.length > 0 && <h2>You have messages!</h2>}</div>
\`\`\`
`,

  contentFa: `
# JSX - جاوااسکریپت XML

## تعریف
JSX یک افزونه نحوی برای جاوااسکریپت است که ظاهری شبیه HTML دارد. این ابزار به شما اجازه می‌دهد رابط کاربری خود را به روشی توصیفی و آشنا طراحی کنید، در حالی که تمام قدرت منطق جاوااسکریپت را نیز در اختیار دارید.

## ویژگی‌های اصلی
- **نشانه گذاری توصیفی**: ساختار UI خود را به وضوح درون فایل JS بنویسید.
- **محتوای پویا**: به سادگی متغیرها و عبارات را با استفاده از \`{}\` تزریق کنید.
- **امنیت**: جلوگیری خودکار از حملات XSS با فراری دادن مقادیر.
- **پشتیبانی ابزاری**: تحلیل کد (Linting) و دیباگینگ عالی در ویرایشگرها.

---

## ۱. نحو پایه (Basic Syntax)
ظاهر JSX شبیه HTML است، اما در واقع جاوااسکریپت است.

\`\`\`jsx
const element = <h1>سلام دنیا!</h1>;
\`\`\`

در پشت صحنه، کامپایلر ری‌اکت این کد را تبدیل می‌کند به:
\`\`\`javascript
const element = React.createElement('h1', null, 'سلام دنیا!');
\`\`\`

---

## ۲. استفاده از عبارات جاوااسکریپت
شما می‌توانید هر عبارت معتبر جاوااسکریپت را درون آکولاد \`{}\` قرار دهید.

\`\`\`jsx
const name = 'بشیر دانش';
const element = <h1>سلام، {name}</h1>;
\`\`\`

---

## ۳. قوانین JSX

### قانون ۱: بازگرداندن یک المان ریشه واحد
هر کامپوننت ری‌اکت باید فقط یک المان ریشه برگرداند. از Fragment \`<>\` یا \`<div>\` استفاده کنید.

\`\`\`jsx
// درست ✅
return (
  <>
    <h1>سلام</h1>
    <p>خوش آمدید</p>
  </>
);
\`\`\`

### قانون ۲: بستن تمام تگ‌ها
تمام تگ‌ها باید بسته شوند، حتی تگ‌های خود-بسته مثل \`<img>\`.

### قانون ۳: استفاده از camelCase
از حروف شتری برای نام‌گذاری ویژگی‌ها استفاده کنید:
- \`class\` ➜ \`className\`
- \`onclick\` ➜ \`onClick\`
- \`for\` ➜ \`htmlFor\`

---

## ۴. رندرینگ شرطی
در JSX از عملگرهای استاندارد JS برای شرط‌ها استفاده می‌کنیم.

\`\`\`jsx
// عملگر سه تایی
<div>{isLoggedIn ? 'خوش آمدید' : 'لطفاً وارد شوید'}</div>

// عملگر منطقی &&
<div>{hasMessages && <Notifications />}</div>
\`\`\`
`,

  visualizationId: 'jsx-compiler',
  exerciseId: 'jsx-basics',
};

export default jsxBasicsLesson;
