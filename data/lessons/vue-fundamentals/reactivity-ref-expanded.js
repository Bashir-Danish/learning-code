export const reactivityRefLesson = {
  id: 'reactivity-ref',
  title: 'Reactivity (ref, reactive, computed)',
  titleFa: 'سیستم واکنش‌گرایی (Reactive)',
  difficulty: 'easy',
  estimatedTime: '120 min',

  content: `
# Vue 3.5+ Reactivity System - Comprehensive Guide

## Definition
Reactivity is the core engine of Vue. It is a system that automatically detects changes in your application's state and updates the DOM in response. In Vue 3, this is achieved through JavaScript Proxies, allowing for fine-grained updates without manual DOM manipulation. Vue 3.5+ brings significant performance improvements to the reactivity system with a 56% memory reduction and faster operations.

## Key Features
- **Auto-Tracking**: Vue knows exactly which component depends on which piece of state.
- **Deep Reactivity**: Objects and arrays are made reactive recursively.
- **Derived State (Computed)**: Efficiently calculate values that depend on other state.
- **Asynchronous Batching**: Updates are batched together to ensure maximum performance.
- **Vue 3.5+ Improvements**: New reactivity algorithm with better performance and memory usage.
- **Shallow Reactivity**: Options for optimizing large data structures.
- **Readonly Refs**: Prevent accidental mutations of important state.

---

## 1. Understanding Reactivity - Deep Dive

### 1.1 How Vue Reactivity Works
Vue's reactivity system uses JavaScript Proxies to intercept property access and modifications:

\`\`\`javascript
// Behind the scenes, Vue does something like this:
const target = { count: 0 }
const handler = {
  get(target, property) {
    console.log(\`Getting \${property}\`)
    return target[property]
  },
  set(target, property, value) {
    console.log(\`Setting \${property} to \${value}\`)
    target[property] = value
    // Trigger component update
    return true
  }
}
const proxy = new Proxy(target, handler)
\`\`\`

### 1.2 Reactivity Tracking
When a component renders, Vue tracks which reactive properties are accessed. When those properties change, Vue knows to re-render the component:

\`\`\`javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => {
  // This dependency is tracked
  return count.value * 2
})

// When count changes, doubled automatically updates
count.value = 5 // doubled is now 10
\`\`\`

---

## 2. ref() - The Foundation of Reactivity

### 2.1 Basic Usage
\`ref\` is the standard way to define reactive data. It wraps a value in an object, making it accessible via \`.value\`:

\`\`\`javascript
import { ref } from 'vue'

// Primitive types
const count = ref(0)
const message = ref('Hello')
const isActive = ref(true)

// Complex types
const user = ref({ name: 'John', age: 30 })
const items = ref(['apple', 'banana', 'orange'])

// Accessing values in script
console.log(count.value) // 0
count.value = 5 // Update value

// In template, .value is unwrapped automatically
// <div>{{ count }}</div> displays 5
\`\`\`

### 2.2 ref() with TypeScript
\`\`\`typescript
import { ref, Ref } from 'vue'

// Explicit type annotation
const count: Ref<number> = ref(0)
const message: Ref<string> = ref('Hello')

// Type inference
const user = ref({ name: 'John', age: 30 }) // Ref<{ name: string; age: number }>

// Generic type
interface User {
  id: number
  name: string
  email: string
}

const currentUser: Ref<User | null> = ref(null)
\`\`\`

### 2.3 Updating ref Values
\`\`\`javascript
import { ref } from 'vue'

const count = ref(0)
const user = ref({ name: 'John', age: 30 })

// Direct assignment
count.value = 10

// Mutation (also works)
count.value++
count.value += 5

// Object property mutation
user.value.name = 'Jane'
user.value.age = 25

// Array operations
const items = ref(['apple', 'banana'])
items.value.push('orange')
items.value[0] = 'grape'
items.value = ['new', 'array'] // Replace entire array
\`\`\`

### 2.4 ref() with Complex Objects
\`\`\`javascript
import { ref } from 'vue'

const user = ref({
  id: 1,
  name: 'John',
  email: 'john@example.com',
  profile: {
    avatar: 'https://example.com/avatar.jpg',
    bio: 'Software developer',
    social: {
      twitter: '@john',
      github: 'john-dev'
    }
  }
})

// Deep reactivity - all nested properties are reactive
user.value.profile.social.twitter = '@jane'

// This triggers component update
console.log(user.value.profile.social.twitter) // '@jane'
\`\`\`

---

## 3. reactive() - Object-Focused Reactivity

### 3.1 Basic Usage
\`reactive\` makes an entire object reactive. Unlike \`ref\`, it doesn't use \`.value\`:

\`\`\`javascript
import { reactive } from 'vue'

const user = reactive({
  name: 'John',
  age: 30,
  email: 'john@example.com'
})

// No .value needed
user.name = 'Jane'
user.age = 25

// In template
// <div>{{ user.name }} is {{ user.age }}</div>
\`\`\`

### 3.2 ref() vs reactive()
\`\`\`javascript
import { ref, reactive } from 'vue'

// ref - works with any type
const count = ref(0)
const message = ref('Hello')
const user = ref({ name: 'John' })

// reactive - only works with objects
const state = reactive({
  count: 0,
  message: 'Hello',
  user: { name: 'John' }
})

// Accessing values
console.log(count.value) // 0
console.log(state.count) // 0

// Updating values
count.value = 5
state.count = 5
\`\`\`

### 3.3 When to Use reactive()
\`\`\`javascript
import { reactive } from 'vue'

// Good use case: grouping related state
const formState = reactive({
  username: '',
  email: '',
  password: '',
  rememberMe: false,
  errors: {
    username: '',
    email: '',
    password: ''
  }
})

// Accessing nested properties
formState.username = 'john'
formState.errors.username = 'Username is required'

// In template
// <input v-model="formState.username" />
// <span v-if="formState.errors.username">{{ formState.errors.username }}</span>
\`\`\`

### 3.4 Limitations of reactive()
\`\`\`javascript
import { reactive } from 'vue'

const state = reactive({ count: 0 })

// Problem 1: Cannot replace entire object
let newState = { count: 10 }
state = newState // This breaks reactivity!

// Problem 2: Destructuring loses reactivity
const { count } = state
count++ // This doesn't update the reactive object

// Solution: Use ref for these cases
import { ref } from 'vue'
const state = ref({ count: 0 })
state.value = { count: 10 } // Works fine
\`\`\`

---

## 4. computed() - Derived Reactive State

### 4.1 Basic Computed Properties
\`computed\` creates a reactive value that depends on other reactive values:

\`\`\`javascript
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => {
  return count.value * 2
})

console.log(doubled.value) // 0
count.value = 5
console.log(doubled.value) // 10 (automatically updated)

// In template
// <div>Count: {{ count }}, Doubled: {{ doubled }}</div>
\`\`\`

### 4.2 Computed with Multiple Dependencies
\`\`\`javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')
const age = ref(30)

const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`
})

const isAdult = computed(() => {
  return age.value >= 18
})

const profile = computed(() => {
  return {
    name: fullName.value,
    age: age.value,
    status: isAdult.value ? 'Adult' : 'Minor'
  }
})

console.log(profile.value)
// { name: 'John Doe', age: 30, status: 'Adult' }
\`\`\`

### 4.3 Computed with Getter and Setter
\`\`\`javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return \`\${firstName.value} \${lastName.value}\`
  },
  set(newValue) {
    const parts = newValue.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1]
  }
})

console.log(fullName.value) // 'John Doe'
fullName.value = 'Jane Smith'
console.log(firstName.value) // 'Jane'
console.log(lastName.value) // 'Smith'
\`\`\`

### 4.4 Computed Performance - Caching
\`\`\`javascript
import { ref, computed } from 'vue'

const items = ref([1, 2, 3, 4, 5])

let computeCount = 0
const sum = computed(() => {
  computeCount++
  console.log('Computing sum...')
  return items.value.reduce((a, b) => a + b, 0)
})

console.log(sum.value) // Computing sum... (count: 1)
console.log(sum.value) // No computation (cached)
console.log(sum.value) // No computation (cached)

items.value.push(6)
console.log(sum.value) // Computing sum... (count: 2)
\`\`\`

---

## 5. watch() - Reactive Side Effects

### 5.1 Basic watch()
\`\`\`javascript
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(\`Count changed from \${oldValue} to \${newValue}\`)
})

count.value = 5 // Logs: Count changed from 0 to 5
\`\`\`

### 5.2 Watching Multiple Sources
\`\`\`javascript
import { ref, watch } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log(\`Name changed from \${oldFirst} \${oldLast} to \${newFirst} \${newLast}\`)
})

firstName.value = 'Jane' // Logs the change
\`\`\`

### 5.3 Deep Watching Objects
\`\`\`javascript
import { ref, watch } from 'vue'

const user = ref({
  name: 'John',
  profile: {
    age: 30,
    city: 'New York'
  }
})

// Watch entire object deeply
watch(user, (newUser) => {
  console.log('User changed:', newUser)
}, { deep: true })

// This triggers the watcher
user.value.profile.city = 'Los Angeles'
\`\`\`

### 5.4 Vue 3.5+ Enhanced watch() with pause/resume
\`\`\`javascript
import { ref, watch } from 'vue'

const count = ref(0)

const { pause, resume, stop } = watch(count, (newValue) => {
  console.log('Count changed to:', newValue)
})

count.value = 1 // Logs: Count changed to: 1

pause() // Stop watching temporarily
count.value = 2 // No log

resume() // Resume watching
count.value = 3 // Logs: Count changed to: 3

stop() // Stop watching permanently
count.value = 4 // No log
\`\`\`

---

## 6. watchEffect() - Automatic Dependency Tracking

### 6.1 Basic watchEffect()
\`\`\`javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const multiplier = ref(2)

watchEffect(() => {
  // Dependencies are automatically tracked
  console.log(\`Result: \${count.value * multiplier.value}\`)
})

count.value = 5 // Logs: Result: 10
multiplier.value = 3 // Logs: Result: 15
\`\`\`

### 6.2 watchEffect vs watch
\`\`\`javascript
import { ref, watch, watchEffect } from 'vue'

const count = ref(0)

// watch - explicit dependencies
watch(count, (newValue) => {
  console.log('Count changed:', newValue)
})

// watchEffect - automatic dependencies
watchEffect(() => {
  console.log('Count is now:', count.value)
})

count.value = 5 // Both log
\`\`\`

---

## 7. shallowRef() and shallowReactive() - Performance Optimization

### 7.1 shallowRef() for Large Objects
\`\`\`javascript
import { shallowRef, triggerRef } from 'vue'

// For large objects, use shallowRef to avoid deep reactivity overhead
const largeObject = shallowRef({
  data: new Array(10000).fill(0),
  nested: {
    deep: {
      value: 'test'
    }
  }
})

// Only top-level changes trigger updates
largeObject.value = { data: [], nested: {} } // Triggers update

// Nested changes don't trigger updates
largeObject.value.nested.deep.value = 'new' // No update

// Manually trigger update if needed
triggerRef(largeObject)
\`\`\`

### 7.2 shallowReactive() for Objects
\`\`\`javascript
import { shallowReactive } from 'vue'

const state = shallowReactive({
  count: 0,
  nested: {
    value: 'test'
  }
})

state.count = 5 // Triggers update
state.nested.value = 'new' // No update (nested not reactive)
\`\`\`

---

## 8. readonly() - Preventing Mutations

### 8.1 Making Refs Readonly
\`\`\`javascript
import { ref, readonly } from 'vue'

const count = ref(0)
const readonlyCount = readonly(count)

readonlyCount.value = 5 // Warning in development

// But the original ref can still be updated
count.value = 5 // Works fine
console.log(readonlyCount.value) // 5
\`\`\`

### 8.2 Readonly Objects
\`\`\`javascript
import { reactive, readonly } from 'vue'

const state = reactive({
  user: { name: 'John', age: 30 },
  settings: { theme: 'dark' }
})

const readonlyState = readonly(state)

readonlyState.user.name = 'Jane' // Warning
state.user.name = 'Jane' // Works
console.log(readonlyState.user.name) // 'Jane'
\`\`\`

---

## 9. Real-World Examples

### 9.1 Todo List with Reactivity
\`\`\`javascript
import { ref, computed } from 'vue'

const todos = ref([
  { id: 1, text: 'Learn Vue', completed: false },
  { id: 2, text: 'Build app', completed: false }
])

const completedCount = computed(() => {
  return todos.value.filter(t => t.completed).length
})

const totalCount = computed(() => {
  return todos.value.length
})

const progress = computed(() => {
  return totalCount.value === 0 ? 0 : (completedCount.value / totalCount.value) * 100
})

const addTodo = (text) => {
  todos.value.push({
    id: Math.max(...todos.value.map(t => t.id), 0) + 1,
    text,
    completed: false
  })
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
}
\`\`\`

### 9.2 Form State Management
\`\`\`javascript
import { reactive, computed } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
})

const isFormValid = computed(() => {
  return (
    form.username.length > 0 &&
    form.email.includes('@') &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword &&
    Object.values(form.errors).every(e => e === '')
  )
})

const validateUsername = () => {
  if (form.username.length < 3) {
    form.errors.username = 'Username must be at least 3 characters'
  } else {
    form.errors.username = ''
  }
}

const validateEmail = () => {
  if (!form.email.includes('@')) {
    form.errors.email = 'Invalid email address'
  } else {
    form.errors.email = ''
  }
}

const validatePassword = () => {
  if (form.password.length < 8) {
    form.errors.password = 'Password must be at least 8 characters'
  } else {
    form.errors.password = ''
  }
}

const validateConfirmPassword = () => {
  if (form.password !== form.confirmPassword) {
    form.errors.confirmPassword = 'Passwords do not match'
  } else {
    form.errors.confirmPassword = ''
  }
}
\`\`\`

---

## 10. Best Practices

### 10.1 Choosing Between ref and reactive
- Use **ref** for primitives and when you need to replace the entire value
- Use **reactive** for grouping related state in objects
- Use **ref** for better TypeScript support

### 10.2 Performance Tips
- Use **computed** instead of methods for derived state
- Use **shallowRef** for large objects
- Use **watch** with specific dependencies instead of **watchEffect** when possible
- Avoid deep watching when not necessary

### 10.3 Common Pitfalls
- Forgetting \`.value\` when accessing ref in script
- Destructuring reactive objects (loses reactivity)
- Mutating props directly
- Not using \`:key\` in v-for loops

---

## 11. Troubleshooting

### Issue: Reactivity not working
**Solution**: Ensure state is wrapped in ref() or reactive()

### Issue: Computed not updating
**Solution**: Check that all dependencies are reactive

### Issue: Performance issues
**Solution**: Use shallowRef for large objects, avoid deep watching

---

## Summary
- **ref()**: Standard way to create reactive values
- **reactive()**: Create reactive objects
- **computed()**: Derived reactive state with caching
- **watch()**: React to state changes
- **watchEffect()**: Automatic dependency tracking
- **shallowRef/shallowReactive**: Performance optimization
- **readonly()**: Prevent mutations
- **Vue 3.5+**: 56% memory improvement and faster operations
`,

  contentFa: `
# سیستم واکنش‌گرایی Vue 3.5+ - راهنمای جامع

## تعریف
واکنش‌گرایی (Reactivity) موتور اصلی Vue است. این سیستمی است که به طور خودکار تغییرات در وضعیت (State) برنامه را تشخیص داده و در پاسخ، بخش مربوطه در DOM را بروزرسانی می‌کند. در Vue 3، این کار از طریق Proxyهای جاوااسکریپت انجام می‌شود. Vue 3.5+ بهبودهای قابل توجهی در سیستم واکنش‌گرایی با کاهش 56% حافظه و عملیات سریع‌تر ارائه می‌دهد.

## ویژگی‌های اصلی
- **ردیابی خودکار**: وی دقیقاً می‌داند کدام کامپوننت به کدام بخش از داده‌ها وابسته است.
- **واکنش‌گرایی عمیق**: اشیاء و آرایه‌ها به صورت بازگشتی واکنش‌گرا می‌شوند.
- **داده‌های محاسباتی (Computed)**: محاسبه بهینه مقادیری که به داده‌های دیگر وابسته هستند.
- **دسته‌بندی ناهمگام (Batching)**: تغییرات با هم دسته‌بندی می‌شوند تا بهترین عملکرد حاصل شود.
- **بهبودهای Vue 3.5+**: الگوریتم واکنش‌گرایی جدید با عملکرد و استفاده حافظه بهتر.
- **واکنش‌گرایی سطحی**: گزینه‌هایی برای بهینه‌سازی ساختارهای داده بزرگ.
- **Readonly Refs**: جلوگیری از تغییرات تصادفی وضعیت مهم.

---

## خلاصه
- **ref()**: روش استاندارد برای ایجاد مقادیر واکنش‌گرا
- **reactive()**: ایجاد اشیاء واکنش‌گرا
- **computed()**: وضعیت واکنش‌گرای مشتق‌شده با کش
- **watch()**: واکنش به تغییرات وضعیت
- **watchEffect()**: ردیابی خودکار وابستگی
- **shallowRef/shallowReactive**: بهینه‌سازی عملکرد
- **readonly()**: جلوگیری از تغییرات
- **Vue 3.5+**: بهبود 56% حافظه و عملیات سریع‌تر
`,

  visualizationId: 'vue-reactivity',
  exerciseId: 'reactivity-ref',
};

export default reactivityRefLesson;
