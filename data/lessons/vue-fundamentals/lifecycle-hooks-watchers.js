export const lifecycleHooksWatchersLesson = {
  id: 'lifecycle-hooks',
  title: 'Lifecycle & Watchers',
  titleFa: 'چرخه حیات و واچرها (Watchers)',
  difficulty: 'easy',
  estimatedTime: '40 min',

  content: `
# Lifecycle Hooks & Watchers in Vue 3.5+

Understanding when a component is created, mounted, and destroyed is crucial for side effects (like API calls).

---

## 1. Lifecycle Hooks
Commonly used hooks in the Composition API:
- **onMounted**: Runs when the component is added to the DOM.
- **onUnmounted**: Perfect for cleanup (clearing timers, intervals).
- **onUpdated**: Runs after a reactive change and DOM update.

\`\`\`javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component is ready!')
})
\`\`\`

---

## 2. Watchers (\`watch\`)
Use \`watch\` when you need to perform side effects in response to data changes (e.g., fetching new data when an ID changes).

\`\`\`javascript
import { ref, watch } from 'vue'

const question = ref('')
watch(question, (newVal) => {
  if (newVal.includes('?')) {
    fetchAnswer()
  }
})
\`\`\`

---

## 3. \`watchEffect\`
A simpler version of watch that automatically tracks all reactive dependencies used inside it.

---

## Summary
- **onMounted**: API calls and DOM manipulation.
- **watch**: Reacting to specific data changes.
- **Cleanup**: Always use onUnmounted to prevent memory leaks.
`,

  contentFa: `
# چرخه حیات و واچرها در Vue 3.5+

اینکه بدانید یک کامپوننت چه زمانی ساخته می‌شود و چه زمانی از بین می‌رود، برای مدیریت کارهایی مثل گرفتن اطلاعات از سرور حیاتی است.

---

## ۱. هوک‌های چرخه حیات (Lifecycle)
- **onMounted**: وقتی کامپوننت روی صفحه ظاهر می‌شود.
- **onUnmounted**: برای تمیزکاری (توقف تایمرها) وقتی کامپوننت حذف می‌شود.

---

## ۲. واچرها (Watch)
زمانی استفاده می‌شود که بخواهید در پاسخ به تغییر یک متغیر، کاری انجام دهید (مثلاً با تغییر شناسه محصول، اطلاعات محصول جدید را بگیرید).

---

## ۳. watchEffect
نسخه‌ی هوشمندتر واچر که تمام متغیرهای داخلش را به صورت خودکار زیر نظر می‌گیرد.

---

## خلاصه
- **onMounted**: برای شروع کارها.
- **Cleanup**: همیشه در زمان حذف کامپوننت، منابع را آزاد کنید.
- **Watch**: نظارت دقیق روی تغییرات دیتا.
`,

  visualizationId: 'vue-lifecycle',
  exerciseId: 'lifecycle-hooks',
};

export default lifecycleHooksWatchersLesson;
