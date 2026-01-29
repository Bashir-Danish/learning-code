export const componentCompositionLesson = {
  id: 'component-composition',
  title: 'Component Composition (Props & Emits)',
  titleFa: 'ترکیب کامپوننت‌ها (Props و Emits)',
  difficulty: 'easy',
  estimatedTime: '45 min',

  content: `
# Component Composition

## Definition
Component Composition is the process of building complex user interfaces by combining smaller, independent components. In Vue, this communication is handled via a "Props Down, Events Up" pattern: **Props** pass data from Parent to Child, and **Emits** send events from Child back to Parent.

## Key Features
- **Unidirectional Data Flow**: Data moves in one direction, making the app easier to debug.
- **Strict Typing**: Use TypeScript or Vue's prop validation to ensure correct data usage.
- **Two-Way Binding (v-model)**: Easily sync state between parent and child components.
- **Event-Driven Architecture**: Components stay decoupled by communicating through events.

---

## 1. Props (Parent to Child)
Props are custom attributes used to pass data down. They are read-only for the child.

\`\`\`javascript
// Child.vue
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  likes: Number
})
\`\`\`

---

## 2. Emits (Child to Parent)
Emits allow a child component to notify the parent about interactions.

\`\`\`javascript
// Child.vue
const emit = defineEmits(['update', 'delete'])

const onDelete = () => {
  emit('delete', id) // Sending message to parent
}
\`\`\`

---

## 3. Component v-model
Vue 3 simplifies two-way data binding. You can bind a value to a child component and have it update the parent's state automatically.

\`\`\`vue
<!-- Parent.vue -->
<CustomInput v-model="searchText" />

<!-- Child.vue -->
<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
\`\`\`

---

## Summary
- **Props**: Pass configuration and data downwards.
- **Emits**: Signal user actions and state changes upwards.
- **v-model**: The perfect bridge for forms and custom inputs.
`,

  contentFa: `
# ترکیب و ارتباط کامپوننت‌ها

## تعریف
ترکیب کامپوننت‌ها (Component Composition) فرآیند ساخت رابط‌های کاربری پیچیده با استفاده از ترکیب قطعات کوچک و مستقل است. در Vue، این ارتباط از طریق الگوی "پراپس به پایین، رویدادها به بالا" مدیریت می‌شود: **Props** داده‌ها را از والد به فرزند منتقل می‌کنند و **Emits** رویدادها را از فرزند به والد برمی‌گردانند.

## ویژگی‌های اصلی
- **جریان داده یک‌طرفه**: داده‌ها فقط در یک جهت حرکت می‌کنند که خطایابی برنامه را ساده‌تر می‌کند.
- **اعتبارسنجی دقیق**: امکان تعیین نوع داده (Type) برای پراپس جهت جلوگیری از خطاهای احتمالی.
- **اتصال دوطرفه (v-model)**: همگام‌سازی آسان وضعیت بین کامپوننت والد و فرزند.
- **معماری رویداد-محور**: کامپوننت‌ها با استفاده از رویدادها با هم صحبت می‌کنند و از هم مستقل می‌مانند.

---

## ۱. پراپس (Props)
پراپس ویژگی‌های سفارشی هستند که برای ارسال داده به پایین استفاده می‌شوند. این داده‌ها برای فرزند "فقط-خواندنی" هستند.

\`\`\`javascript
// Child.vue
const props = defineProps({
  title: String,
  likes: Number
})
\`\`\`

---

## ۲. امیت (Emits)
امیت‌ها به فرزند اجازه می‌دهند والد را از تعاملات کاربر باخبر کنند.

\`\`\`javascript
// Child.vue
const emit = defineEmits(['close', 'submit'])

const sendData = () => {
  emit('submit', { id: 1 }) // ارسال پیام به والد
}
\`\`\`

---

## ۳. قابلیت v-model در کامپوننت
در Vue 3، ایجاد ارتباط دوطرفه بین والد و فرزند بسیار ساده شده است. این قابلیت به خصوص برای ساخت فرم‌های سفارشی بسیار کاربردی است.

\`\`\`vue
<!-- در والد -->
<MyInput v-model="name" />
\`\`\`

---

## خلاصه
- **Props**: انتقال تنظیمات و داده‌ها به سمت پایین (والد به فرزند).
- **Emits**: ارسال سیگنال و تغییرات به سمت بالا (فرزند به والد).
- **v-model**: بهترین روش برای همگام‌سازی داده‌ها در فیلدها و ورودی‌های سفارشی.
`,

  visualizationId: 'vue-composition',
  exerciseId: 'component-composition',
};

export default componentCompositionLesson;
