export const vueDataFetchingLesson = {
  id: 'vue-data-fetching',
  title: 'Data Fetching & API Integration',
  titleFa: 'دریافت داده‌ها و اتصال به API',
  difficulty: 'hard',
  estimatedTime: '50 min',

  content: `
# Data Fetching in Vue

## Definition
**Data Fetching** is the process of retrieving information from an external API or server to display it within your Vue application. While you can use the browser's native \`fetch\` API inside lifecycle hooks like \`onMounted\`, modern Vue development emphasizes reusing this logic through **Composables** or using powerhouse libraries like **TanStack Query** to handle caching and synchronization.

## Key Features
- **Lifecycle Integration**: Fetch data exactly when the component is ready using \`onMounted\`.
- **Reactive State**: Bind API results directly to \`ref\` or \`reactive\` variables for instant UI updates.
- **Error & Loading States**: Easily manage user feedback during network requests using reactive flags.
- **Caching & Synchronization**: Efficiently manage "Server State" using tools that prevent redundant network calls.

---

## 1. The Standard Way (onMounted + fetch)
This is the most direct approach, suitable for simple applications or learning purposes.

\`\`\`javascript
import { ref, onMounted } from 'vue'

const items = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://api.example.com/items')
    items.value = await res.json()
  } finally {
    loading.value = false
  }
})
\`\`\`

---

## 2. Abstraction with Composables
To keep components clean, we extract fetching logic into a reusable function.

\`\`\`javascript
// useItems.js
export function useItems() {
  const data = ref(null)
  const error = ref(null)

  const fetchData = async () => {
    // Axios or Fetch logic here...
  }
  
  return { data, error, fetchData }
}
\`\`\`

---

## 3. The Professional Choice: TanStack Query (Vue Query)
For enterprise apps, TanStack Query handles the "hard parts" of data fetching like caching and background updates.

\`\`\`javascript
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json()),
})
\`\`\`

---

## Summary
- **onMounted**: Perfect for simple, one-off data requests.
- **Axios**: A robust alternative to \`fetch\` with better defaults and interceptors.
- **Vue Query**: The industry standard for complex applications that require high performance and reliability.
`,

  contentFa: `
# دریافت داده‌ها در وی‌جی‌اس

## تعریف
**دریافت داده (Data Fetching)** فرآیند بازیابی اطلاعات از یک API یا سرور خارجی برای نمایش در اپلیکیشن Vue است. در حالی که می‌توانید از تابع بومی \`fetch\` مرورگر در داخل هوک‌های چرخه حیات مثل \`onMounted\` استفاده کنید، توسعه مدرن Vue بر استفاده مجدد از این منطق از طریق **کامپوزبل‌ها (Composables)** یا استفاده از کتابخانه‌های قدرتمندی مثل **TanStack Query** برای مدیریت حافظه پنهان (Caching) و همگام‌سازی تأکید دارد.

## ویژگی‌های اصلی
- **یکپارچگی با چرخه حیات**: دریافت داده دقیقاً زمانی که کامپوننت آماده است با استفاده از \`onMounted\`.
- **وضعیت واکنش‌ گرا**: اتصال مستقیم نتایج API به متغیرهای \`ref\` یا \`reactive\` برای بروزرسانی لحظه‌ای رابط کاربری.
- **مدیریت وضعیت لودینگ و خطا**: مدیریت آسان بازخورد به کاربر در طول درخواست‌های شبکه با استفاده از پرچم‌های واکنش‌گرا.
- **حافظه پنهان و همگام‌ سازی**: مدیریت بهینه "وضعیت سرور" برای جلوگیری از درخواست‌های تکراری و بیهوده در شبکه.

---

## ۱. روش استاندارد (onMounted + fetch)
مستقیم‌ترین روش که برای برنامه‌های ساده یا اهداف آموزشی مناسب است.

\`\`\`javascript
import { ref, onMounted } from 'vue'

const users = ref([])
const isPending = ref(true)

onMounted(async () => {
  const res = await fetch('/api/users')
  users.value = await res.json()
  isPending.value = false
})
\`\`\`

---

## ۲. استفاده از کامپوزبل‌ ها (Composables)
برای تمیز نگه داشتن کامپوننت‌ها، منطق دریافت داده را به یک تابع قابل استفاده مجدد منتقل می‌کنیم.

\`\`\`javascript
// useApi.js
export function useApi(url) {
  const data = ref(null)
  const load = async () => { /* منطق دریافت داده... */ }
  return { data, load }
}
\`\`\`

---

## ۳. انتخاب حرفه‌ای: TanStack Query (Vue Query)
در اپلیکیشن‌های تجاری، این کتابخانه بخش‌های سخت کار مثل مدیریت کش و بروزرسانی‌های پس‌زمینه را بر عهده می‌گیرد.

\`\`\`javascript
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: getProductsFromApi
})
\`\`\`

---

## خلاصه
- **onMounted**: عالی برای درخواست‌های داده ساده و یک‌باره.
- **Axios**: یک جایگزین قدرتمند برای \`fetch\` با تنظیمات پیش‌فرض بهتر.
- **Vue Query**: استاندارد صنعت برای اپلیکیشن‌های پیچیده که به کارایی و پایداری بالا نیاز دارند.
`,

  visualizationId: 'vue-data-fetching',
  exerciseId: 'vue-data-fetching',
};

export default vueDataFetchingLesson;
