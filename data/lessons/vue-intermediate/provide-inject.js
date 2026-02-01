// Provide/Inject Pattern - Expanded Lesson (90-120 minutes)
// Comprehensive guide to dependency injection in Vue

export const provideInjectLesson = {
  title: 'Provide/Inject Pattern in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Intermediate',

  introduction: `
Provide and Inject are a pair of functions that allow an ancestor component to serve as a dependency provider
for all its descendants, regardless of how deep the component tree is.

Key concepts:
- Solve "prop drilling" problem
- Share data across component tree without global state
- Maintain reactivity with ref and reactive
- Dependency injection pattern
- Alternative to passing props through multiple levels

Vue 3.5+ improvements: Better TypeScript support, improved type inference, enhanced reactivity.
  `,

  coreConceptsAndExamples: {
    basicProvideInject: {
      description: 'Basic provide and inject usage',
      examples: [
        {
          name: 'Basic Theme Provider',
          code: `
// Parent component - Provider
<script setup>
import { ref, provide } from 'vue'
import ChildComponent from './ChildComponent.vue'

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// Provide data to all descendants
provide('theme', theme)
provide('toggleTheme', toggleTheme)
</script>

<template>
  <div :class="['app', theme]">
    <button @click="toggleTheme">Toggle Theme</button>
    <ChildComponent />
  </div>
</template>

<style scoped>
.app.light { background: white; color: black; }
.app.dark { background: black; color: white; }
</style>

// Child component - Consumer
<script setup>
import { inject } from 'vue'

// Inject data from ancestor
const theme = inject('theme', 'light')
const toggleTheme = inject('toggleTheme', () => {})
</script>

<template>
  <div class="child">
    <p>Current theme: {{ theme }}</p>
    <button @click="toggleTheme">Toggle</button>
  </div>
</template>
          `
        },
        {
          name: 'Provide with Default Values',
          code: `
// Parent component
<script setup>
import { ref, provide } from 'vue'

const user = ref({
  name: 'John',
  email: 'john@example.com',
  role: 'admin'
})

provide('user', user)
</script>

<template>
  <div>
    <h1>{{ user.name }}</h1>
    <slot />
  </div>
</template>

// Child component with fallback
<script setup>
import { inject } from 'vue'

// If 'user' is not provided, use default
const user = inject('user', {
  name: 'Guest',
  email: 'guest@example.com',
  role: 'user'
})
</script>

<template>
  <div>
    <p>User: {{ user.name }}</p>
    <p>Role: {{ user.role }}</p>
  </div>
</template>
          `
        },
        {
          name: 'Provide Multiple Values',
          code: `
// Parent component
<script setup>
import { ref, provide } from 'vue'

const appConfig = ref({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
})

const userPreferences = ref({
  language: 'en',
  notifications: true,
  darkMode: false
})

// Provide multiple values
provide('appConfig', appConfig)
provide('userPreferences', userPreferences)
</script>

<template>
  <div>
    <slot />
  </div>
</template>

// Child component
<script setup>
import { inject } from 'vue'

const appConfig = inject('appConfig')
const userPreferences = inject('userPreferences')
</script>

<template>
  <div>
    <p>API: {{ appConfig.apiUrl }}</p>
    <p>Language: {{ userPreferences.language }}</p>
  </div>
</template>
          `
        },
        {
          name: 'Provide with Methods',
          code: `
// Parent component
<script setup>
import { ref, provide } from 'vue'

const notifications = ref([])

const addNotification = (message, type = 'info') => {
  notifications.value.push({
    id: Date.now(),
    message,
    type
  })
  
  setTimeout(() => {
    notifications.value = notifications.value.filter(
      n => n.id !== Date.now()
    )
  }, 3000)
}

const removeNotification = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

provide('notifications', {
  list: notifications,
  add: addNotification,
  remove: removeNotification
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

// Child component
<script setup>
import { inject } from 'vue'

const { list, add, remove } = inject('notifications')

const showSuccess = () => {
  add('Operation successful!', 'success')
}

const showError = () => {
  add('Something went wrong', 'error')
}
</script>

<template>
  <div>
    <button @click="showSuccess">Show Success</button>
    <button @click="showError">Show Error</button>
    <ul>
      <li v-for="notif in list" :key="notif.id">
        {{ notif.message }}
        <button @click="remove(notif.id)">×</button>
      </li>
    </ul>
  </div>
</template>
          `
        }
      ]
    },

    reactiveProvideInject: {
      description: 'Maintaining reactivity with provide/inject',
      examples: [
        {
          name: 'Reactive State Sharing',
          code: `
// Parent component
<script setup>
import { ref, reactive, provide } from 'vue'

// Using ref
const count = ref(0)

// Using reactive for objects
const formData = reactive({
  name: '',
  email: '',
  message: ''
})

const incrementCount = () => count.value++

provide('count', count)
provide('formData', formData)
provide('incrementCount', incrementCount)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <slot />
  </div>
</template>

// Child component - changes are reactive
<script setup>
import { inject } from 'vue'

const count = inject('count')
const formData = inject('formData')
const incrementCount = inject('incrementCount')
</script>

<template>
  <div>
    <p>Count from parent: {{ count }}</p>
    <button @click="incrementCount">Increment</button>
    
    <input v-model="formData.name" placeholder="Name" />
    <input v-model="formData.email" placeholder="Email" />
    <p>Form data: {{ formData }}</p>
  </div>
</template>
          `
        },
        {
          name: 'Computed Properties with Provide',
          code: `
// Parent component
<script setup>
import { ref, computed, provide } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1', completed: false },
  { id: 2, name: 'Item 2', completed: true },
  { id: 3, name: 'Item 3', completed: false }
])

const completedCount = computed(() => {
  return items.value.filter(item => item.completed).length
})

const totalCount = computed(() => items.value.length)

const completionPercentage = computed(() => {
  return Math.round((completedCount.value / totalCount.value) * 100)
})

provide('items', items)
provide('completedCount', completedCount)
provide('totalCount', totalCount)
provide('completionPercentage', completionPercentage)
</script>

<template>
  <div>
    <p>Progress: {{ completionPercentage }}%</p>
    <slot />
  </div>
</template>

// Child component
<script setup>
import { inject } from 'vue'

const items = inject('items')
const completedCount = inject('completedCount')
const totalCount = inject('totalCount')
const completionPercentage = inject('completionPercentage')
</script>

<template>
  <div>
    <p>{{ completedCount }} of {{ totalCount }} completed</p>
    <div class="progress-bar">
      <div class="progress" :style="{ width: completionPercentage + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar { width: 100%; height: 20px; background: #eee; border-radius: 10px; }
.progress { height: 100%; background: #4CAF50; border-radius: 10px; }
</style>
          `
        }
      ]
    },

    provideInjectPatterns: {
      description: 'Common provide/inject patterns',
      examples: [
        {
          name: 'Theme Provider Pattern',
          code: `
// composables/useTheme.js
import { ref, provide, inject } from 'vue'

export function useThemeProvider() {
  const theme = ref('light')
  const themes = ['light', 'dark', 'auto']
  
  const setTheme = (newTheme) => {
    if (themes.includes(newTheme)) {
      theme.value = newTheme
      localStorage.setItem('theme', newTheme)
    }
  }
  
  const toggleTheme = () => {
    const index = themes.indexOf(theme.value)
    const nextIndex = (index + 1) % themes.length
    setTheme(themes[nextIndex])
  }
  
  provide('theme', {
    current: theme,
    setTheme,
    toggleTheme,
    available: themes
  })
  
  return { theme, setTheme, toggleTheme }
}

export function useTheme() {
  return inject('theme', {
    current: 'light',
    setTheme: () => {},
    toggleTheme: () => {},
    available: ['light', 'dark']
  })
}

// Usage in parent
<script setup>
import { useThemeProvider } from '@/composables/useTheme'

useThemeProvider()
</script>

<template>
  <div>
    <slot />
  </div>
</template>

// Usage in child
<script setup>
import { useTheme } from '@/composables/useTheme'

const { current, toggleTheme } = useTheme()
</script>

<template>
  <div :class="['container', current]">
    <button @click="toggleTheme">Toggle Theme</button>
  </div>
</template>
          `
        },
        {
          name: 'Authentication Provider Pattern',
          code: `
// composables/useAuth.js
import { ref, provide, inject, computed } from 'vue'

export function useAuthProvider() {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const loading = ref(false)
  
  const login = async (email, password) => {
    loading.value = true
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      user.value = await response.json()
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    user.value = null
  }
  
  provide('auth', {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  })
}

export function useAuth() {
  return inject('auth', {
    user: null,
    isAuthenticated: false,
    loading: false,
    login: async () => {},
    logout: () => {}
  })
}

// Usage
<script setup>
import { useAuthProvider } from '@/composables/useAuth'

useAuthProvider()
</script>

<template>
  <div>
    <slot />
  </div>
</template>
          `
        },
        {
          name: 'Modal Provider Pattern',
          code: `
// composables/useModal.js
import { ref, provide, inject } from 'vue'

export function useModalProvider() {
  const modals = ref({})
  
  const openModal = (name, data = {}) => {
    modals.value[name] = {
      isOpen: true,
      data
    }
  }
  
  const closeModal = (name) => {
    if (modals.value[name]) {
      modals.value[name].isOpen = false
    }
  }
  
  const isModalOpen = (name) => {
    return modals.value[name]?.isOpen || false
  }
  
  const getModalData = (name) => {
    return modals.value[name]?.data || {}
  }
  
  provide('modal', {
    modals,
    openModal,
    closeModal,
    isModalOpen,
    getModalData
  })
}

export function useModal() {
  return inject('modal', {
    modals: {},
    openModal: () => {},
    closeModal: () => {},
    isModalOpen: () => false,
    getModalData: () => ({})
  })
}

// Usage
<script setup>
import { useModal } from '@/composables/useModal'

const { openModal, closeModal, isModalOpen } = useModal()

const openDeleteModal = (itemId) => {
  openModal('delete', { itemId })
}
</script>

<template>
  <div>
    <button @click="openDeleteModal(123)">Delete Item</button>
  </div>
</template>
          `
        }
      ]
    },

    typedProvideInject: {
      description: 'Type-safe provide/inject with TypeScript',
      examples: [
        {
          name: 'Typed Provide/Inject',
          code: `
// types/theme.ts
export interface ThemeConfig {
  current: string
  setTheme: (theme: string) => void
  toggleTheme: () => void
}

// composables/useTheme.ts
import { ref, provide, inject, InjectionKey } from 'vue'
import type { ThemeConfig } from '@/types/theme'

// Create a typed injection key
const themeKey: InjectionKey<ThemeConfig> = Symbol('theme')

export function useThemeProvider() {
  const current = ref<string>('light')
  
  const setTheme = (theme: string): void => {
    current.value = theme
  }
  
  const toggleTheme = (): void => {
    current.value = current.value === 'light' ? 'dark' : 'light'
  }
  
  provide<ThemeConfig>(themeKey, {
    current: current.value,
    setTheme,
    toggleTheme
  })
}

export function useTheme(): ThemeConfig {
  return inject<ThemeConfig>(themeKey, {
    current: 'light',
    setTheme: () => {},
    toggleTheme: () => {}
  })
}

// Usage - fully typed
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { current, setTheme, toggleTheme } = useTheme()
// TypeScript knows the types of all properties
</script>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Complete Theme System',
      description: 'Full theme provider with persistence and multiple themes',
      code: `
// composables/useThemeSystem.js
import { ref, computed, provide, inject, watch } from 'vue'

export function useThemeSystemProvider() {
  const themes = {
    light: {
      primary: '#007bff',
      background: '#ffffff',
      text: '#000000'
    },
    dark: {
      primary: '#0d6efd',
      background: '#1a1a1a',
      text: '#ffffff'
    },
    auto: null
  }
  
  const currentTheme = ref(localStorage.getItem('theme') || 'light')
  
  const themeColors = computed(() => {
    if (currentTheme.value === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return themes[isDark ? 'dark' : 'light']
    }
    return themes[currentTheme.value]
  })
  
  const setTheme = (theme) => {
    if (Object.keys(themes).includes(theme)) {
      currentTheme.value = theme
      localStorage.setItem('theme', theme)
    }
  }
  
  const toggleTheme = () => {
    const themeList = Object.keys(themes)
    const index = themeList.indexOf(currentTheme.value)
    const nextIndex = (index + 1) % themeList.length
    setTheme(themeList[nextIndex])
  }
  
  // Apply theme to document
  watch(themeColors, (colors) => {
    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(\`--color-\${key}\`, value)
      })
    }
  }, { immediate: true })
  
  provide('themeSystem', {
    currentTheme,
    themeColors,
    setTheme,
    toggleTheme,
    availableThemes: Object.keys(themes)
  })
}

export function useThemeSystem() {
  return inject('themeSystem', {
    currentTheme: 'light',
    themeColors: {},
    setTheme: () => {},
    toggleTheme: () => {},
    availableThemes: ['light', 'dark', 'auto']
  })
}

// App.vue
<script setup>
import { useThemeSystemProvider } from '@/composables/useThemeSystem'

useThemeSystemProvider()
</script>

<template>
  <div class="app">
    <slot />
  </div>
</template>

<style>
:root {
  --color-primary: #007bff;
  --color-background: #ffffff;
  --color-text: #000000;
}

.app {
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>

// ThemeToggle.vue
<script setup>
import { useThemeSystem } from '@/composables/useThemeSystem'

const { currentTheme, toggleTheme, availableThemes } = useThemeSystem()
</script>

<template>
  <div class="theme-toggle">
    <button @click="toggleTheme">
      Current: {{ currentTheme }}
    </button>
    <select v-model="currentTheme">
      <option v-for="theme in availableThemes" :key="theme" :value="theme">
        {{ theme }}
      </option>
    </select>
  </div>
</template>
      `
    },
    {
      title: 'Multi-level Component Tree with Provide/Inject',
      description: 'Deeply nested components sharing state without prop drilling',
      code: `
// App.vue - Root provider
<script setup>
import { ref, provide } from 'vue'
import Level1 from './Level1.vue'

const appState = ref({
  user: { name: 'John', role: 'admin' },
  settings: { language: 'en', notifications: true }
})

const updateUser = (newUser) => {
  appState.value.user = newUser
}

provide('appState', appState)
provide('updateUser', updateUser)
</script>

<template>
  <div class="app">
    <h1>App Root</h1>
    <Level1 />
  </div>
</template>

// Level1.vue
<script setup>
import Level2 from './Level2.vue'
</script>

<template>
  <div class="level-1">
    <h2>Level 1</h2>
    <Level2 />
  </div>
</template>

// Level2.vue
<script setup>
import Level3 from './Level3.vue'
</script>

<template>
  <div class="level-2">
    <h2>Level 2</h2>
    <Level3 />
  </div>
</template>

// Level3.vue - Deep consumer
<script setup>
import { inject } from 'vue'

const appState = inject('appState')
const updateUser = inject('updateUser')

const changeUserRole = () => {
  updateUser({
    ...appState.value.user,
    role: appState.value.user.role === 'admin' ? 'user' : 'admin'
  })
}
</script>

<template>
  <div class="level-3">
    <h2>Level 3 (Deep Component)</h2>
    <p>User: {{ appState.user.name }}</p>
    <p>Role: {{ appState.user.role }}</p>
    <button @click="changeUserRole">Change Role</button>
  </div>
</template>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use provide/inject to avoid prop drilling',
      'Provide both state and methods together',
      'Use TypeScript for type-safe provide/inject',
      'Create composables for provide/inject logic',
      'Provide default values in inject',
      'Use Symbol keys for type safety',
      'Document what you provide',
      'Keep provided data focused and related',
      'Use readonly for immutable data',
      'Clean up provided data on unmount'
    ],
    donts: [
      'Don\'t provide too much data at once',
      'Don\'t use provide/inject for global state (use Pinia instead)',
      'Don\'t forget to provide default values',
      'Don\'t mutate provided data directly',
      'Don\'t create circular dependencies',
      'Don\'t provide functions that cause side effects',
      'Don\'t use provide/inject for frequently changing data',
      'Don\'t forget to document injection keys',
      'Don\'t provide data that should be props',
      'Don\'t use string keys without TypeScript'
    ]
  },

  vue35Features: `
Vue 3.5+ provide/inject enhancements:
- Better TypeScript support with improved type inference
- Enhanced Symbol key handling
- Improved performance with optimized injection
- Better error messages for missing providers
- Enhanced reactivity with provide/inject
- Better integration with composables
- Improved debugging in DevTools
  `,

  typescriptIntegration: `
// TypeScript examples for provide/inject

// Define types
interface User {
  id: number
  name: string
  email: string
}

interface AppContext {
  user: Ref<User | null>
  setUser: (user: User) => void
}

// Create typed injection key
import { InjectionKey } from 'vue'

export const appContextKey: InjectionKey<AppContext> = Symbol('appContext')

// Provide with type
provide<AppContext>(appContextKey, {
  user: ref(null),
  setUser: (user) => { /* ... */ }
})

// Inject with type
const context = inject<AppContext>(appContextKey)
  `,

  testingStrategies: `
Testing provide/inject:

1. Unit Testing:
   - Test provider logic independently
   - Test consumer logic with mocked provider
   - Test default values

2. Integration Testing:
   - Test provider and consumer together
   - Test reactivity of provided data
   - Test multiple levels of nesting

3. Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'
import { provide, inject } from 'vue'

test('provide/inject works', () => {
  const Provider = {
    setup() {
      provide('message', 'Hello')
    },
    template: '<slot />'
  }
  
  const Consumer = {
    setup() {
      const message = inject('message')
      return { message }
    },
    template: '<div>{{ message }}</div>'
  }
  
  const wrapper = mount(Provider, {
    slots: { default: Consumer }
  })
  
  expect(wrapper.text()).toBe('Hello')
})
\`\`\`
  `,

  troubleshooting: `
Common provide/inject issues:

1. Injection not working:
   - Verify provider is in component tree
   - Check injection key matches
   - Ensure provider is set up before inject

2. Data not reactive:
   - Use ref() or reactive() for state
   - Avoid providing plain objects
   - Check watchers are set up

3. Type errors with TypeScript:
   - Use InjectionKey for type safety
   - Define proper interfaces
   - Use Symbol keys instead of strings

4. Performance issues:
   - Don't provide too much data
   - Use computed for derived state
   - Consider using Pinia for complex state

5. Debugging issues:
   - Use Vue DevTools to inspect provided data
   - Check component tree in DevTools
   - Log provide/inject calls
  `,

  summary: `
Provide/Inject is a powerful pattern for dependency injection:

- Solve prop drilling problem
- Share data across component tree
- Maintain reactivity with ref/reactive
- Type-safe with TypeScript
- Alternative to global state for specific subtrees

Key takeaways:
1. Use provide/inject to avoid prop drilling
2. Provide both state and methods
3. Use TypeScript for type safety
4. Create composables for reusable logic
5. Always provide default values
6. Keep provided data focused
7. Use Symbol keys for type safety
8. Document what you provide
9. Test provide/inject patterns
10. Consider Pinia for complex global state

Next steps: Build reusable provider composables, explore advanced patterns, and optimize performance.
  `
}

export default provideInjectLesson
