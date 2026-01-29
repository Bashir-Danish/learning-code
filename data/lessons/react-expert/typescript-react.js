export const typescriptReactLesson = {
  id: 'typescript-react',
  title: 'TypeScript with React',
  titleFa: 'تایپ‌اسکریپت با ری‌اکت',
  difficulty: 'expert',
  estimatedTime: '60 min',
  content: `
# TypeScript with React

## Definition
TypeScript is a strongly typed superset of JavaScript that adds static types. In React, it ensures that props, state, and events are handled correctly, catching bugs during development before the code ever runs.

## Key Features
- **Type Safety**: Prevent "undefined is not a function" errors.
- **IntelliSense**: Better autocomplete and documentation in your IDE.
- **Refactoring**: Safely rename variables or change structures across the whole app.
- **Component Documentation**: Types act as living documentation for your components.

---

## 1. Typing Props
Define an interface or type for your component props to ensure they are used correctly.

\`\`\`tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // Optional prop
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>{label}</button>
);
\`\`\`

---

## 2. Typing Hooks
Most hooks can infer types, but sometimes you need to be explicit.

\`\`\`tsx
const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);
\`\`\`

---

## 3. Form and Event Types
Handling events safely is one of the biggest benefits of TS.

\`\`\`tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
\`\`\`
`,
  contentFa: `
# تایپ‌اسکریپت با ری‌اکت

## تعریف
تایپ‌اسکریپت (TypeScript) یک ابرمجموعه (Superset) از جاوااسکریپت است که سیستم "تایپ‌دهی استاتیک" را به آن اضافه می‌کند. در ری‌اکت، این ابزار تضمین می‌کند که ورودی‌ها (Props)، وضعیت (State) و رویدادها به درستی مدیریت شوند و خطاها قبل از اجرا کشف شوند.

## ویژگی‌های اصلی
- **امنیت تایپ (Type Safety)**: جلوگیری از خطاهای رایجی مثل "undefined is not a function".
- **IntelliSense**: تکمیل خودکار کد و مستندات قوی در ویرایشگر (VS Code).
- **بازسازی کد (Refactoring)**: تغییر نام متغیرها یا ساختارها در کل پروژه بدون ترس از خرابی.
- **مستندسازی زنده**: تایپ‌ها مثل یک راهنمای همیشگی برای کامپوننت‌های شما عمل می‌کنند.

---

## ۱. تعیین تایپ برای ورودی‌ها (Props)
تعریف یک \`interface\` برای ورودی‌های کامپوننت.

\`\`\`tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean; // ورودی اختیاری
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>{label}</button>
);
\`\`\`

---

## ۲. استفاده از تایپ در هوک‌ها
معمولاً ری‌اکت تایپ را حدس می‌زند، اما گاهی باید صریحاً آن را تعریف کنیم.

\`\`\`tsx
const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);
\`\`\`

---

## ۳. تایپینگ فرم‌ها و رویدادها
مدیریت امن رویدادها یکی از بزرگترین مزایای استفاده از TS است.

\`\`\`tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
\`\`\`
`
};

export default typescriptReactLesson;
