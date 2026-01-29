export const formsValidationLesson = {
  id: 'forms-validation',
  title: 'Forms & Validation',
  titleFa: 'فرم‌ها و اعتبارسنجی',
  difficulty: 'easy',
  estimatedTime: '45 min',
  content: `
# Forms & Validation in Vue 3

## Definition
Forms in Vue 3 are handled primarily through the \`v-model\` directive, which provides two-way data binding. For complex scenarios, validation libraries like **VeeValidate** or **Vuelidate** are used to ensure data integrity and provide a better user experience by handling error messages and input states.

## Key Features
- **Two-Way Binding**: Synchronize input values with component state instantly.
- **Lazy/Trim Modifiers**: Optimize how and when data is updated (e.g., \`v-model.lazy\`).
- **Schema Validation**: Define complex rules using Zod or Yup integration.
- **Error Handling**: Declarative ways to display field errors in the UI.

---

## 1. Two-Way Binding (v-model)
\`v-model\` is syntactic sugar for binding values and listening to input events simultaneously.

\`\`\`html
<input v-model="username" type="text" placeholder="Enter name">
\`\`\`

---

## 2. Advanced Validation
The industry standard for Vue validation is **VeeValidate**, which allows schema-based rules using Zod.

\`\`\`javascript
import { useForm } from 'vee-validate';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const schema = toTypedSchema(
  zod.object({
    email: zod.string().email('Invalid email'),
    password: zod.string().min(8, 'Too short'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});
\`\`\`

---

## 3. Form Submission
Handle form submissions cleanly by preventing default behavior and using async functions.

---

## Summary
- **v-model** is for basic binding.
- **VeeValidate** is for robust validation.
- Always use **modifiers** like \`.trim\` or \`.number\` where appropriate.
`,
  contentFa: `
# فرم‌ها و اعتبارسنجی در Vue 3

## تعریف
مدیریت فرم‌ها در Vue 3 عمدتاً از طریق دایرکتیو \`v-model\` انجام می‌شود که اتصال دوطرفه داده‌ها را فراهم می‌کند. برای سناریوهای پیچیده، از کتابخانه‌های اعتبارسنجی مثل **VeeValidate** یا **Vuelidate** استفاده می‌شود تا از صحت داده‌ها اطمینان حاصل شده و با مدیریت پیام‌های خطا، تجربه کاربری بهتری ارائه شود.

## ویژگی‌های اصلی
- **اتصال دوطرفه**: همگام‌سازی آنی مقادیر ورودی با وضعیت کامپوننت.
- **اصلاح‌کننده‌های Lazy/Trim**: بهینه‌سازی نحوه و زمان بروزرسانی داده‌ها.
- **اعتبارسنجی مبتنی بر طرح (Schema)**: تعریف قوانین پیچیده با استفاده از Zod یا Yup.
- **مدیریت خطا**: روش‌های توصیفی برای نمایش خطاهای هر فیلد در رابط کاربری.

---

## ۱. اتصال دوطرفه (v-model)
دایرکتیو \`v-model\` برای متصل کردن مقادیر و شنیدن رویدادهای ورودی به صورت همزمان استفاده می‌شود.

\`\`\`html
<input v-model="username" type="text" placeholder="نام کاربری">
\`\`\`

---

## ۲. اعتبارسنجی پیشرفته
استاندارد صنعت برای اعتبارسنجی در Vue استفاده از **VeeValidate** است که اجازه می‌دهد قوانین را با Zod تعریف کنید.

\`\`\`javascript
import { useForm } from 'vee-validate';
import * as zod from 'zod';

const schema = toTypedSchema(
  zod.object({
    email: zod.string().email('ایمیل نامعتبر'),
    password: zod.string().min(8, 'رمز عبور کوتاه است'),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});
\`\`\`

---

## ۳. ارسال فرم (Submission)
مدیریت ارسال فرم‌ها با جلوگیری از رفتار پیش‌فرض مرورگر و استفاده از توابع ناهمگام.

---

## خلاصه
- **v-model** برای اتصال‌های ساده و پایه استفاده می‌شود.
- **VeeValidate** برای اعتبارسنجی‌های پیچیده و حرفه‌ای است.
- همیشه از **اصلاح‌کننده‌ها** مثل \`.trim\` در جای مناسب استفاده کنید.
`
};
