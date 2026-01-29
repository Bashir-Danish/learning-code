export const formsControlledLesson = {
  id: 'forms-controlled',
  title: 'Forms and Controlled Components',
  titleFa: 'فرم‌ها و کامپوننت‌های کنترل‌شده',
  difficulty: 'easy',
  estimatedTime: '45 min',

  content: `
# Forms in React

## Definition
Forms in React are used to capture user input. A **Controlled Component** is an input element whose value is driven by React state. This makes the state the "single source of truth" for the form data, allowing React to respond instantly to any change.

## Key Features
- **Validation**: Validate input values on every keystroke.
- **Input Formatting**: Automatically format values (e.g., credit card numbers) as the user types.
- **Form Actions (React 19)**: New powerful way to handle submissions asynchronously with built-in pending states.
- **Uncontrolled Support**: Ability to use \`refs\` for simpler, traditional form handling when needed.

---

## 1. Controlled Components
In a controlled component, the input's \`value\` is tied to a state variable.

\`\`\`jsx
function NameForm() {
  const [name, setName] = useState('');

  return (
    <form>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Current value: {name}</p>
    </form>
  );
}
\`\`\`

---

## 2. Handling Multiple Inputs
Use a single object state and the \`name\` attribute of the input to avoid creating dozens of state variables.

\`\`\`jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setState({
    ...state,
    [name]: value
  });
};
\`\`\`

---

## 3. React 19 Actions (Modern)
React 19 introduces **Actions** to simplify form handling without manual \`onSubmit\` listeners.

\`\`\`jsx
import { useActionState } from 'react';

// This function runs on submission
async function updateName(prevState, formData) {
  const name = formData.get('name');
  return { name };
}

function ProfileEditor() {
  const [state, formAction, isPending] = useActionState(updateName, { name: '' });

  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.name} />
      <button disabled={isPending}>Update</button>
    </form>
  );
}
\`\`\`

---

## Summary
- **Controlled Components**: State is the "single source of truth".
- **React 19 Actions**: High-level way to handle form logic and loading states effortlessly.
- **useFormStatus**: Access pending status in any nested button or component.
`,

  contentFa: `
# کار با فرم‌ها در ری‌اکت

## تعریف
فرم‌ها در ری‌اکت برای دریافت ورودی از کاربر استفاده می‌شوند. یک **کامپوننت کنترل‌شده (Controlled)** المانی است که مقدار آن توسط استیت ری‌اکت مدیریت می‌شود. این کار باعث می‌شود استیت به "تنها منبع حقیقت" تبدیل شود و ری‌اکت بتواند بلافاصله به هر تغییری در ورودی پاسخ دهد.

## ویژگی‌های اصلی
- **اعتبارسنجی (Validation)**: بررسی صحت اطلاعات ورودی با هر بار تایپ کردن کاربر.
- **قالب‌بندی ورودی**: تغییر خودکار فرمت متن (مثل شماره کارت) همزمان با تایپ.
- **Form Actions (ری‌اکت ۱۹)**: روشی جدید و قدرتمند برای مدیریت ارسال فرم‌ها بدون نیاز به هندلرهای دستی.
- **پشتیبانی از Uncontrolled**: امکان استفاده از \`ref\` برای مدیریت ساده‌تر فرم‌ها به سبک کلاسیک.

---

## ۱. کامپوننت‌های کنترل‌شده
در این روش، ویژگی \`value\` هر ورودی به یک متغیر استیت متصل است.

\`\`\`jsx
const [name, setName] = useState('');

// مقدار ورودی همیشه با استیت هماهنگ است
<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
\`\`\`

---

## ۲. مدیریت چند ورودی به صورت یکجا
به جای تعریف استیت‌های جداگانه، از یک شیء (Object) و ویژگی \`name\` هر ورودی استفاده کنید.

\`\`\`jsx
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setState({ ...state, [name]: value });
};
\`\`\`

---

## ۳. قابلیت Actions در ری‌اکت ۱۹
ری‌اکت ۱۹ قابلیت Actions را معرفی کرده که نیاز به نوشتن دستی \`onChange\` و مدیریت لودینگ را حذف می‌کند.

\`\`\`jsx
import { useActionState } from 'react';

function ProfileEditor() {
  // formAction به صورت خودکار لودینگ و وضعیت را مدیریت می‌کند
  const [state, formAction, isPending] = useActionState(updateFunction, initialData);

  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.name} />
      <button disabled={isPending}>بروزرسانی</button>
    </form>
  );
}
\`\`\`

---

## خلاصه
- در **Controlled Components**، استیت منبع اصلی حقیقت است.
- ری‌اکت ۱۹ با **Actions** فرآیند ارسال فرم و مدیریت لودینگ را بسیار ساده کرده است.
- از هوک **useFormStatus** برای دسترسی به وضعیت ارسال در کامپوننت‌های داخلی استفاده کنید.
`,

  visualizationId: 'form-handling',
  exerciseId: 'forms-controlled',
};

export default formsControlledLesson;
