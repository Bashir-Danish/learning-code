export const introSfcLesson = {
  id: 'intro-sfc',
  title: 'Introduction to SFC & Templates',
  titleFa: 'آشنایی با SFC و سینتکس قالب (Template)',
  difficulty: 'easy',
  estimatedTime: '120 min',

  content: `
# Single File Components (SFC) - Comprehensive Guide

## Definition
A Single File Component (SFC) is a specialized file format (\`.vue\`) that encapsulates the logic (JavaScript), template (HTML), and styles (CSS) of a Vue component in a single file. This approach provides a "clean separation of concerns" while keeping all related code for a UI element together. SFCs are the foundation of modern Vue development and are compiled by build tools like Vite into efficient JavaScript.

## Key Features
- **Encapsulation**: Everything a component needs is in one file - logic, template, and styles.
- **Scoped Styling**: CSS can be restricted to only the current component, preventing global namespace pollution.
- **Pre-compilation**: SFCs are compiled into efficient JavaScript by the build tool (Vite).
- **Composition API Support**: Modern development using the \`<script setup>\` pattern (Vue 3+).
- **TypeScript Support**: Full TypeScript support with proper type inference.
- **CSS Modules**: Support for CSS Modules for advanced styling patterns.
- **Hot Module Replacement (HMR)**: Instant updates during development without full page reload.

---

## 1. The Structure of a SFC - Deep Dive

### 1.1 Basic Structure
A typical Vue component consists of three main blocks:

\`\`\`vue
<script setup lang="ts">
// 1. Logic (Composition API with TypeScript)
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <!-- 2. Structure (HTML with Vue directives) -->
  <div class="card">
    <h1>{{ message }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
/* 3. Styling (Scoped to this component only) */
.card {
  border: 1px solid #42b883;
  padding: 20px;
  border-radius: 8px;
  background: #f5f5f5;
}

h1 {
  color: #42b883;
  margin: 0 0 10px 0;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369970;
}
</style>
\`\`\`

### 1.2 Understanding Each Block

#### Script Block
- Contains component logic using Composition API
- Can use TypeScript with \`lang="ts"\`
- Imports are automatically available in template
- Reactive state, computed properties, methods, lifecycle hooks

#### Template Block
- HTML structure with Vue directives
- Automatic access to script setup variables
- Supports all Vue directives (v-if, v-for, v-bind, v-on, etc.)
- Can use components imported in script

#### Style Block
- CSS scoped to component by default
- Can use preprocessors (SCSS, Less, PostCSS)
- Supports CSS Modules with \`module\` attribute
- Can have multiple style blocks

---

## 2. Script Setup Pattern - Modern Vue 3 Development

### 2.1 Why <script setup>?
The \`<script setup>\` pattern is the recommended way to write Vue 3 components. It provides:
- **Less boilerplate**: No need for explicit \`setup()\` function
- **Better performance**: Smaller compiled code size
- **Better IDE support**: Full type inference and autocomplete
- **Cleaner syntax**: Variables are automatically exposed to template

### 2.2 Basic Example
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const firstName = ref('John')
const lastName = ref('Doe')

// Computed property
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

// Method
const updateName = (first: string, last: string) => {
  firstName.value = first
  lastName.value = last
}
</script>

<template>
  <div>
    <p>Full Name: {{ fullName }}</p>
    <button @click="updateName('Jane', 'Smith')">Update Name</button>
  </div>
</template>
\`\`\`

### 2.3 Importing Components
\`\`\`vue
<script setup lang="ts">
// Components are automatically registered
import UserCard from './UserCard.vue'
import { defineProps } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

defineProps<{
  users: User[]
}>()
</script>

<template>
  <div class="user-list">
    <UserCard 
      v-for="user in users" 
      :key="user.id"
      :user="user"
    />
  </div>
</template>
\`\`\`

### 2.4 Comparison: <script setup> vs Options API
\`\`\`vue
<!-- Modern: <script setup> -->
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

const increment = () => count.value++
</script>

<!-- Legacy: Options API -->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
</script>
\`\`\`

---

## 3. Template Syntax - Comprehensive Guide

### 3.1 Interpolation
\`\`\`vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue')
const count = ref(42)
const user = ref({ name: 'John', age: 30 })
</script>

<template>
  <!-- Text interpolation -->
  <p>{{ message }}</p>

  <!-- Expression evaluation -->
  <p>{{ count + 1 }}</p>
  <p>{{ count > 20 ? 'High' : 'Low' }}</p>

  <!-- Object property access -->
  <p>{{ user.name }} is {{ user.age }} years old</p>

  <!-- Method calls -->
  <p>{{ message.toUpperCase() }}</p>

  <!-- Array operations -->
  <p>{{ [1, 2, 3].join('-') }}</p>
</template>
\`\`\`

### 3.2 Directives - v-bind
\`\`\`vue
<script setup>
import { ref } from 'vue'

const title = ref('Hover over me')
const isActive = ref(true)
const classes = ref(['active', 'highlight'])
const styles = ref({ color: 'red', fontSize: '20px' })
</script>

<template>
  <!-- Binding attributes -->
  <div :title="title">Hover me</div>

  <!-- Binding class -->
  <div :class="{ active: isActive }">Dynamic class</div>
  <div :class="classes">Multiple classes</div>

  <!-- Binding style -->
  <div :style="styles">Styled div</div>
  <div :style="{ color: isActive ? 'green' : 'red' }">Conditional style</div>

  <!-- Shorthand -->
  <div :id="\`item-\${count}\`">Dynamic ID</div>
</template>
\`\`\`

### 3.3 Directives - v-on (Event Handling)
\`\`\`vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const message = ref('')

const handleClick = () => {
  count.value++
}

const handleInput = (event: Event) => {
  message.value = (event.target as HTMLInputElement).value
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    console.log('Enter pressed')
  }
}
</script>

<template>
  <!-- Basic event -->
  <button @click="handleClick">Click me</button>

  <!-- Inline handler -->
  <button @click="count++">Increment</button>

  <!-- Method with argument -->
  <button @click="handleClick">Count: {{ count }}</button>

  <!-- Event modifiers -->
  <button @click.stop="handleClick">Stop propagation</button>
  <button @click.prevent="handleClick">Prevent default</button>
  <button @click.once="handleClick">Only once</button>

  <!-- Key modifiers -->
  <input @keydown.enter="handleKeydown" placeholder="Press Enter">
  <input @keydown.escape="message = ''" placeholder="Press Escape">

  <!-- Input event -->
  <input @input="handleInput" :value="message" placeholder="Type something">
</template>
\`\`\`

### 3.4 Directives - v-if, v-else, v-show
\`\`\`vue
<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const userRole = ref('admin') // 'admin', 'user', 'guest'
const showDetails = ref(false)
</script>

<template>
  <!-- v-if: Removes element from DOM -->
  <div v-if="isVisible">This is visible</div>
  <div v-else>This is hidden</div>

  <!-- v-else-if: Multiple conditions -->
  <div v-if="userRole === 'admin'">Admin panel</div>
  <div v-else-if="userRole === 'user'">User dashboard</div>
  <div v-else>Guest view</div>

  <!-- v-show: Uses CSS display property (better for frequent toggling) -->
  <div v-show="showDetails">Details are shown</div>

  <!-- Combining with events -->
  <button @click="isVisible = !isVisible">Toggle visibility</button>
  <button @click="showDetails = !showDetails">Toggle details</button>
</template>
\`\`\`

### 3.5 Directives - v-for
\`\`\`vue
<script setup>
import { ref } from 'vue'

const items = ref(['Apple', 'Banana', 'Orange'])
const users = ref([
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 }
])
const matrix = ref([[1, 2], [3, 4], [5, 6]])
</script>

<template>
  <!-- Simple list -->
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>

  <!-- With index -->
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ index }}: {{ item }}
    </li>
  </ul>

  <!-- Object iteration -->
  <ul>
    <li v-for="(value, key) in users[0]" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>

  <!-- Nested loops -->
  <div v-for="row in matrix" :key="row">
    <span v-for="cell in row" :key="cell">{{ cell }}</span>
  </div>

  <!-- With component -->
  <UserCard 
    v-for="user in users" 
    :key="user.id"
    :user="user"
  />
</template>
\`\`\`

---

## 4. Scoped Styling - Advanced Patterns

### 4.1 Basic Scoped Styles
\`\`\`vue
<template>
  <div class="container">
    <h1>Title</h1>
    <p>Content</p>
  </div>
</template>

<style scoped>
/* These styles only apply to this component */
.container {
  padding: 20px;
  background: #f5f5f5;
}

h1 {
  color: #42b883;
}

p {
  color: #666;
}
</style>
\`\`\`

### 4.2 CSS Modules
\`\`\`vue
<script setup>
import styles from './Button.module.css'
</script>

<template>
  <button :class="styles.primary">Click me</button>
</template>

<style module>
.primary {
  background: #42b883;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary:hover {
  background: #369970;
}
</style>
\`\`\`

### 4.3 Multiple Style Blocks
\`\`\`vue
<template>
  <div class="container">
    <h1>Title</h1>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}
</style>

<style scoped lang="scss">
$primary-color: #42b883;

.container {
  h1 {
    color: $primary-color;
    font-size: 2rem;
  }
}
</style>
\`\`\`

### 4.4 Deep Selectors
\`\`\`vue
<template>
  <div class="wrapper">
    <ChildComponent />
  </div>
</template>

<style scoped>
/* Target child component styles */
:deep(.child-class) {
  color: red;
}

/* Alternative syntax -->
::v-deep(.child-class) {
  color: red;
}
</style>
\`\`\`

---

## 5. Props and Emits - Component Communication

### 5.1 Defining Props
\`\`\`vue
<script setup lang="ts">
import { defineProps } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

// Type-safe props
defineProps<{
  user: User
  isActive?: boolean
  count?: number
}>()

// Alternative: with defaults
withDefaults(defineProps<{
  user: User
  isActive?: boolean
  count?: number
}>(), {
  isActive: false,
  count: 0
})
</script>

<template>
  <div>
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <p v-if="isActive">Active user</p>
    <p>Count: {{ count }}</p>
  </div>
</template>
\`\`\`

### 5.2 Emitting Events
\`\`\`vue
<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
  submit: [data: { name: string; email: string }]
}>()

const handleUpdate = (value: string) => {
  emit('update', value)
}

const handleDelete = (id: number) => {
  emit('delete', id)
}
</script>

<template>
  <div>
    <button @click="handleUpdate('new value')">Update</button>
    <button @click="handleDelete(1)">Delete</button>
  </div>
</template>
\`\`\`

---

## 6. Best Practices

### 6.1 Component Organization
- Keep components focused and single-responsibility
- Use meaningful component names
- Organize related components in folders
- Use TypeScript for better type safety

### 6.2 Performance Tips
- Use \`v-show\` for frequently toggled elements
- Use \`v-if\` for rarely shown elements
- Always use \`:key\` in \`v-for\` loops
- Lazy load large components with \`defineAsyncComponent\`

### 6.3 Accessibility
- Use semantic HTML elements
- Add proper labels to form inputs
- Use ARIA attributes when needed
- Ensure keyboard navigation works

### 6.4 Common Pitfalls
- Forgetting \`:key\` in \`v-for\` loops
- Mutating props directly
- Not using \`ref\` for reactive state
- Forgetting to import components

---

## 7. Real-World Examples

### 7.1 User Profile Card
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'guest'
}

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()

const isHovered = ref(false)

const roleColor = computed(() => {
  const colors = {
    admin: '#f44336',
    user: '#2196F3',
    guest: '#9E9E9E'
  }
  return colors[props.user.role]
})
</script>

<template>
  <div 
    class="card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <img :src="props.user.avatar" :alt="props.user.name" class="avatar">
    <h3>{{ props.user.name }}</h3>
    <p class="email">{{ props.user.email }}</p>
    <span class="role" :style="{ backgroundColor: roleColor }">
      {{ props.user.role }}
    </span>
    
    <div v-if="isHovered" class="actions">
      <button @click="emit('edit', props.user.id)">Edit</button>
      <button @click="emit('delete', props.user.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

h3 {
  margin: 10px 0;
  color: #333;
}

.email {
  color: #666;
  font-size: 0.9rem;
}

.role {
  display: inline-block;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-top: 10px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #42b883;
  color: white;
}

button:hover {
  background: #369970;
}
</style>
\`\`\`

---

## 8. Troubleshooting

### Issue: Styles not scoped properly
**Solution**: Ensure \`scoped\` attribute is present in \`<style scoped>\`

### Issue: Props not updating
**Solution**: Props are read-only. Use emits to notify parent of changes.

### Issue: Template not updating
**Solution**: Ensure state is wrapped in \`ref()\` or \`reactive()\`

---

## Summary
- **SFC** combines HTML, CSS, and JS in a single file
- **<script setup>** is the modern, recommended pattern
- **Scoped styles** prevent CSS collisions
- **Template syntax** makes data binding declarative
- **Props and emits** enable component communication
- **TypeScript** provides type safety and better IDE support
`,

  contentFa: `
# کامپوننت‌های تک‌فایلی (SFC) - راهنمای جامع

## تعریف
کامپوننت تک‌فایلی (SFC) یک فرمت فایل اختصاصی (\`.vue\`) است که منطق (جاوااسکریپت)، قالب (HTML) و استایل‌های (CSS) یک کامپوننت را در یک فایل واحد بسته‌بندی می‌کند. این رویکرد باعث می‌شود تمام کدهای مربوط به یک المان رابط کاربری در کنار هم باشند در حالی که وظایف هر بخش به وضوح جدا شده است. فایل‌های SFC توسط ابزارهای ساخت مثل Vite به کدهای بهینه جاوااسکریپت تبدیل می‌شوند.

## ویژگی‌های اصلی
- **کپسوله‌سازی**: تمامِ نیازهای یک کامپوننت در یک فایل جمع شده است.
- **استایل‌دهی محدود (Scoped)**: استایل‌های CSS را می‌توان فقط به همان کامپوننت محدود کرد.
- **پیش-کامپایل**: فایل‌های SFC توسط ابزارهای ساخت (مثل Vite) به کدهای بهینه جاوااسکریپت تبدیل می‌شوند.
- **پشتیبانی از Composition API**: استفاده از الگوی مدرن \`<script setup>\` برای توسعه سریع‌تر.
- **پشتیبانی TypeScript**: پشتیبانی کامل TypeScript با استنتاج نوع مناسب.
- **CSS Modules**: پشتیبانی CSS Modules برای الگوهای استایل‌دهی پیشرفته.
- **جایگزینی ماژول داغ (HMR)**: بروزرسانی فوری در حین توسعه بدون بارگذاری مجدد صفحه.

---

## ۱. ساختار کامپوننت تک‌فایلی - بررسی عمیق

### ۱.۱ ساختار پایه
هر فایل Vue شامل سه بخش اصلی است:

\`\`\`vue
<script setup lang="ts">
// ۱. بخش منطق (Composition API با TypeScript)
import { ref } from 'vue'

const message = ref('سلام Vue 3!')
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <!-- ۲. بخش ساختار (HTML با دایرکتیوهای Vue) -->
  <div class="card">
    <h1>{{ message }}</h1>
    <p>تعداد: {{ count }}</p>
    <button @click="increment">افزایش</button>
  </div>
</template>

<style scoped>
/* ۳. بخش استایل‌ها (محدود به این کامپوننت) */
.card {
  border: 1px solid #42b883;
  padding: 20px;
  border-radius: 8px;
  background: #f5f5f5;
}

h1 {
  color: #42b883;
  margin: 0 0 10px 0;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #369970;
}
</style>
\`\`\`

### ۱.۲ درک هر بخش

#### بخش Script
- شامل منطق کامپوننت با استفاده از Composition API
- می‌تواند از TypeScript با \`lang="ts"\` استفاده کند
- import ها به طور خودکار در قالب در دسترس هستند
- شامل reactive state، computed properties، methods، lifecycle hooks

#### بخش Template
- ساختار HTML با دایرکتیوهای Vue
- دسترسی خودکار به متغیرهای script setup
- پشتیبانی تمام دایرکتیوهای Vue (v-if, v-for, v-bind, v-on، و غیره)
- می‌تواند از کامپوننت‌های import شده استفاده کند

#### بخش Style
- CSS محدود به کامپوننت به طور پیش‌فرض
- پشتیبانی پیش‌پردازنده‌ها (SCSS, Less, PostCSS)
- پشتیبانی CSS Modules با ویژگی \`module\`
- می‌تواند چندین بخش style داشته باشد

---

## ۲. الگوی Script Setup - توسعه مدرن Vue 3

### ۲.۱ چرا <script setup>؟
الگوی \`<script setup>\` روش توصیه‌شده برای نوشتن کامپوننت‌های Vue 3 است. مزایای آن:
- **کمتر boilerplate**: نیازی به تابع \`setup()\` صریح نیست
- **عملکرد بهتر**: اندازه کد کامپایل شده کوچک‌تر است
- **پشتیبانی بهتر IDE**: استنتاج نوع کامل و خودکمپلیت
- **سینتکس تمیزتر**: متغیرها به طور خودکار در قالب در دسترس هستند

### ۲.۲ مثال پایه
\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const firstName = ref('علی')
const lastName = ref('محمدی')

// Computed property
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)

// Method
const updateName = (first: string, last: string) => {
  firstName.value = first
  lastName.value = last
}
</script>

<template>
  <div>
    <p>نام کامل: {{ fullName }}</p>
    <button @click="updateName('فاطمه', 'احمدی')">بروزرسانی نام</button>
  </div>
</template>
\`\`\`

---

## ۳. سینتکس قالب - راهنمای جامع

### ۳.۱ Interpolation
\`\`\`vue
<script setup>
import { ref } from 'vue'

const message = ref('سلام Vue')
const count = ref(42)
const user = ref({ name: 'علی', age: 30 })
</script>

<template>
  <!-- Interpolation متن -->
  <p>{{ message }}</p>

  <!-- ارزیابی عبارت -->
  <p>{{ count + 1 }}</p>
  <p>{{ count > 20 ? 'بالا' : 'پایین' }}</p>

  <!-- دسترسی به ویژگی شیء -->
  <p>{{ user.name }} {{ user.age }} سال دارد</p>

  <!-- فراخوانی متد -->
  <p>{{ message.toUpperCase() }}</p>
</template>
\`\`\`

### ۳.۲ دایرکتیوها - v-bind
\`\`\`vue
<script setup>
import { ref } from 'vue'

const title = ref('بر روی من بگذارید')
const isActive = ref(true)
const classes = ref(['active', 'highlight'])
</script>

<template>
  <!-- اتصال ویژگی‌ها -->
  <div :title="title">بر روی من بگذارید</div>

  <!-- اتصال کلاس -->
  <div :class="{ active: isActive }">کلاس پویا</div>
  <div :class="classes">چندین کلاس</div>

  <!-- اتصال استایل -->
  <div :style="{ color: isActive ? 'green' : 'red' }">استایل شرطی</div>
</template>
\`\`\`

---

## ۴. بهترین روش‌ها

### ۴.۱ سازماندهی کامپوننت
- کامپوننت‌ها را متمرکز و تک‌وظیفه نگه دارید
- از نام‌های معنی‌دار برای کامپوننت‌ها استفاده کنید
- کامپوننت‌های مرتبط را در پوشه‌ها سازماندهی کنید
- از TypeScript برای ایمنی نوع بهتر استفاده کنید

### ۴.۲ نکات عملکرد
- از \`v-show\` برای عناصری که اغلب تغییر می‌کنند استفاده کنید
- از \`v-if\` برای عناصری که به ندرت نمایش داده می‌شوند استفاده کنید
- همیشه از \`:key\` در حلقه‌های \`v-for\` استفاده کنید
- کامپوننت‌های بزرگ را با \`defineAsyncComponent\` به صورت تنبل بارگذاری کنید

### ۴.۳ دسترسی‌پذیری
- از عناصر HTML معنی‌دار استفاده کنید
- برچسب‌های مناسب را به ورودی‌های فرم اضافه کنید
- هنگام نیاز از ویژگی‌های ARIA استفاده کنید
- اطمینان حاصل کنید که ناوبری با صفحه‌کلید کار می‌کند

### ۴.۴ خطاهای رایج
- فراموش کردن \`:key\` در حلقه‌های \`v-for\`
- تغییر مستقیم props
- عدم استفاده از \`ref\` برای reactive state
- فراموش کردن import کردن کامپوننت‌ها

---

## خلاصه
- **SFC** ترکیبی از HTML، CSS و جاوااسکریپت در یک فایل است
- **<script setup>** الگوی مدرن و توصیه‌شده است
- **استایل Scoped** از تداخل CSS جلوگیری می‌کند
- **سینتکس قالب** بایند کردن داده‌ها را توصیفی می‌کند
- **Props و emits** ارتباط کامپوننت را فراهم می‌کنند
- **TypeScript** ایمنی نوع و پشتیبانی IDE بهتر را فراهم می‌کند
`,

  visualizationId: 'vue-intro',
  exerciseId: 'intro-sfc',
};

export default introSfcLesson;
