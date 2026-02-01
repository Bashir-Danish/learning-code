// Composables & Reusability - Expanded Lesson (90-120 minutes)
// Comprehensive guide to composables and logic reusability patterns

export const composablesLesson = {
  title: 'Composables & Reusability in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Intermediate',

  introduction: `
Composables are functions that leverage the Composition API to encapsulate and reuse stateful logic.
They are the primary way to share code between components in Vue 3.5+.

Key concepts:
- Extract complex logic into standalone functions
- Reuse logic across multiple components
- Combine multiple composables for sophisticated features
- Full TypeScript support with proper type inference
- Better than mixins: clear data flow, no naming collisions

Vue 3.5+ improvements: useTemplateRef(), enhanced watchers, onWatcherCleanup(), better performance.
  `,

  coreConceptsAndExamples: {
    basicComposable: {
      description: 'Creating and using basic composables',
      examples: [
        {
          name: 'Basic Counter Composable',
          code: `
// composables/useCounter.js
import { ref, computed, readonly } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  const doubled = computed(() => count.value * 2)
  const isEven = computed(() => count.value % 2 === 0)
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset,
    doubled,
    isEven
  }
}

// Usage in component
<script setup>
import { useCounter } from '@/composables/useCounter'

const { count, increment, decrement, doubled } = useCounter(10)
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
          `
        },
        {
          name: 'Composable with Lifecycle Hooks',
          code: `
// composables/useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  
  const updateMousePosition = (event) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
  })
  
  return { x, y }
}

// Usage
<script setup>
import { useMousePosition } from '@/composables/useMousePosition'

const { x, y } = useMousePosition()
</script>

<template>
  <div>
    <p>Mouse X: {{ x }}, Y: {{ y }}</p>
  </div>
</template>
          `
        },
        {
          name: 'Composable with Parameters',
          code: `
// composables/useDebounce.js
import { ref, watch } from 'vue'

export function useDebounce(value, delay = 500) {
  const debouncedValue = ref(value)
  let timeoutId
  
  watch(value, (newValue) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })
  
  return debouncedValue
}

// Usage
<script setup>
import { ref } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 300)
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <p>Searching for: {{ debouncedQuery }}</p>
  </div>
</template>
          `
        },
        {
          name: 'Composable with Error Handling',
          code: `
// composables/useAsync.js
import { ref } from 'vue'

export function useAsync(asyncFunction, immediate = true) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await asyncFunction()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  if (immediate) {
    execute()
  }
  
  return { data, loading, error, execute }
}

// Usage
<script setup>
import { useAsync } from '@/composables/useAsync'

const fetchUserData = async () => {
  const response = await fetch('/api/user')
  return response.json()
}

const { data: user, loading, error, execute } = useAsync(fetchUserData)
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
    <button @click="execute">Refresh</button>
  </div>
</template>
          `
        }
      ]
    },

    useTemplateRef: {
      description: 'Vue 3.5+ useTemplateRef for template reference management',
      examples: [
        {
          name: 'useTemplateRef Basic Usage',
          code: `
// composables/useChart.js
import { useTemplateRef, onMounted, onUnmounted, ref, readonly } from 'vue'

export function useChart(chartKey, options = {}) {
  const chartRef = useTemplateRef(chartKey)
  const chartInstance = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  
  onMounted(() => {
    if (chartRef.value) {
      try {
        isLoading.value = true
        chartInstance.value = new Chart(chartRef.value, {
          type: 'bar',
          ...options
        })
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    }
  })
  
  onUnmounted(() => {
    if (chartInstance.value) {
      chartInstance.value.destroy()
      chartInstance.value = null
    }
  })
  
  const updateData = (newData) => {
    if (chartInstance.value) {
      chartInstance.value.data = newData
      chartInstance.value.update()
    }
  }
  
  return {
    chartRef,
    updateData,
    isLoading: readonly(isLoading),
    error: readonly(error)
  }
}

// Usage
<script setup>
import { useChart } from '@/composables/useChart'

const { updateData, isLoading } = useChart('myChart', {
  responsive: true,
  maintainAspectRatio: false
})

const updateChartData = () => {
  updateData({
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 3]
    }]
  })
}
</script>

<template>
  <div>
    <div v-if="isLoading">Loading chart...</div>
    <canvas ref="myChart"></canvas>
    <button @click="updateChartData">Update</button>
  </div>
</template>
          `
        },
        {
          name: 'useTemplateRef with Multiple Refs',
          code: `
// composables/useFormRefs.js
import { useTemplateRef, ref } from 'vue'

export function useFormRefs() {
  const nameInput = useTemplateRef('nameInput')
  const emailInput = useTemplateRef('emailInput')
  const submitButton = useTemplateRef('submitButton')
  
  const focusName = () => {
    nameInput.value?.focus()
  }
  
  const focusEmail = () => {
    emailInput.value?.focus()
  }
  
  const disableSubmit = () => {
    if (submitButton.value) {
      submitButton.value.disabled = true
    }
  }
  
  const enableSubmit = () => {
    if (submitButton.value) {
      submitButton.value.disabled = false
    }
  }
  
  return {
    nameInput,
    emailInput,
    submitButton,
    focusName,
    focusEmail,
    disableSubmit,
    enableSubmit
  }
}

// Usage
<script setup>
import { useFormRefs } from '@/composables/useFormRefs'

const { focusName, focusEmail, disableSubmit } = useFormRefs()

const handleSubmit = async () => {
  disableSubmit()
  // Submit logic
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input ref="nameInput" type="text" placeholder="Name" />
    <input ref="emailInput" type="email" placeholder="Email" />
    <button ref="submitButton" type="submit">Submit</button>
  </form>
</template>
          `
        }
      ]
    },

    enhancedWatchers: {
      description: 'Vue 3.5+ enhanced watchers with pause/resume and cleanup',
      examples: [
        {
          name: 'Watcher with Pause/Resume',
          code: `
// composables/useApi.js
import { ref, watch, readonly } from 'vue'

export function useApi(url, options = {}) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  const { pause, resume, stop } = watch(
    url,
    async (newUrl) => {
      if (!newUrl) return
      
      loading.value = true
      error.value = null
      
      try {
        const response = await fetch(newUrl)
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`)
        }
        data.value = await response.json()
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    },
    { immediate: true }
  )
  
  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    pauseFetching: pause,
    resumeFetching: resume,
    stopFetching: stop
  }
}

// Usage
<script setup>
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

const userId = ref(1)
const { data: user, pauseFetching, resumeFetching } = useApi(
  () => \`/api/users/\${userId.value}\`
)

const toggleAutoFetch = () => {
  if (user.value) {
    pauseFetching()
  } else {
    resumeFetching()
  }
}
</script>

<template>
  <div>
    <div v-if="user">{{ user.name }}</div>
    <button @click="toggleAutoFetch">Toggle Auto-fetch</button>
  </div>
</template>
          `
        },
        {
          name: 'Watcher with onWatcherCleanup',
          code: `
// composables/useSearch.js
import { ref, watch } from 'vue'
import { onWatcherCleanup } from 'vue'

export function useSearch(query) {
  const results = ref([])
  const loading = ref(false)
  
  watch(query, async (newQuery) => {
    if (!newQuery) {
      results.value = []
      return
    }
    
    loading.value = true
    const controller = new AbortController()
    
    // Cleanup when watcher is stopped or query changes
    onWatcherCleanup(() => {
      controller.abort()
    })
    
    try {
      const response = await fetch(\`/api/search?q=\${newQuery}\`, {
        signal: controller.signal
      })
      results.value = await response.json()
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Search error:', err)
      }
    } finally {
      loading.value = false
    }
  })
  
  return { results, loading }
}

// Usage
<script setup>
import { ref } from 'vue'
import { useSearch } from '@/composables/useSearch'

const searchQuery = ref('')
const { results, loading } = useSearch(searchQuery)
</script>

<template>
  <div>
    <input v-model="searchQuery" placeholder="Search..." />
    <div v-if="loading">Searching...</div>
    <ul>
      <li v-for="result in results" :key="result.id">
        {{ result.title }}
      </li>
    </ul>
  </div>
</template>
          `
        }
      ]
    },

    composableComposition: {
      description: 'Combining multiple composables for complex features',
      examples: [
        {
          name: 'Composable Composition Pattern',
          code: `
// composables/useUserProfile.js
import { computed, readonly } from 'vue'
import { useApi } from './useApi'
import { useLocalStorage } from './useLocalStorage'

export function useUserProfile(userId) {
  const { data: user, loading, error } = useApi(
    () => \`/api/users/\${userId.value}\`
  )
  
  const [preferences, setPreferences] = useLocalStorage('user-prefs', {})
  
  const displayName = computed(() => {
    if (!user.value) return 'Loading...'
    return user.value.displayName || user.value.username
  })
  
  const userInitials = computed(() => {
    if (!user.value) return '?'
    const names = user.value.name.split(' ')
    return names.map(n => n[0]).join('').toUpperCase()
  })
  
  const updatePreference = (key, value) => {
    setPreferences({
      ...preferences.value,
      [key]: value
    })
  }
  
  const toggleTheme = () => {
    const current = preferences.value.theme || 'light'
    updatePreference('theme', current === 'light' ? 'dark' : 'light')
  }
  
  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    displayName,
    userInitials,
    preferences: readonly(preferences),
    updatePreference,
    toggleTheme
  }
}

// Usage
<script setup>
import { ref } from 'vue'
import { useUserProfile } from '@/composables/useUserProfile'

const userId = ref(1)
const { user, displayName, userInitials, toggleTheme } = useUserProfile(userId)
</script>

<template>
  <div class="profile">
    <div class="avatar">{{ userInitials }}</div>
    <h2>{{ displayName }}</h2>
    <p v-if="user">{{ user.email }}</p>
    <button @click="toggleTheme">Toggle Theme</button>
  </div>
</template>
          `
        },
        {
          name: 'Complex Feature Composition',
          code: `
// composables/usePaginatedList.js
import { ref, computed, readonly } from 'vue'
import { useApi } from './useApi'

export function usePaginatedList(baseUrl, pageSize = 10) {
  const currentPage = ref(1)
  const { data: allItems, loading, error } = useApi(baseUrl)
  
  const totalPages = computed(() => {
    if (!allItems.value) return 0
    return Math.ceil(allItems.value.length / pageSize)
  })
  
  const paginatedItems = computed(() => {
    if (!allItems.value) return []
    const start = (currentPage.value - 1) * pageSize
    const end = start + pageSize
    return allItems.value.slice(start, end)
  })
  
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)
  
  const nextPage = () => {
    if (hasNextPage.value) currentPage.value++
  }
  
  const prevPage = () => {
    if (hasPrevPage.value) currentPage.value--
  }
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }
  
  return {
    items: readonly(paginatedItems),
    currentPage: readonly(currentPage),
    totalPages,
    loading: readonly(loading),
    error: readonly(error),
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    goToPage
  }
}

// Usage
<script setup>
import { usePaginatedList } from '@/composables/usePaginatedList'

const { items, currentPage, totalPages, nextPage, prevPage } = 
  usePaginatedList('/api/products', 5)
</script>

<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
    <div class="pagination">
      <button @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Complete User Authentication Composable',
      description: 'Full authentication system with login, logout, and token management',
      code: `
// composables/useAuth.js
import { ref, computed, readonly } from 'vue'
import { useLocalStorage } from './useLocalStorage'

export function useAuth() {
  const [token, setToken] = useLocalStorage('auth-token', null)
  const [user, setUser] = useLocalStorage('auth-user', null)
  const loading = ref(false)
  const error = ref(null)
  
  const isAuthenticated = computed(() => !!token.value)
  
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  const logout = () => {
    setToken(null)
    setUser(null)
  }
  
  const register = async (email, password, name) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const data = await response.json()
      setToken(data.token)
      setUser(data.user)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  return {
    user: readonly(user),
    token: readonly(token),
    isAuthenticated,
    loading: readonly(loading),
    error: readonly(error),
    login,
    logout,
    register
  }
}

// Usage in component
<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const email = ref('')
const password = ref('')
const { login, loading, error, isAuthenticated } = useAuth()

const handleLogin = async () => {
  await login(email.value, password.value)
}
</script>

<template>
  <div v-if="!isAuthenticated" class="login-form">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
  <div v-else>
    <p>Logged in successfully!</p>
  </div>
</template>
      `
    },
    {
      title: 'Form Validation Composable',
      description: 'Reusable form validation with error tracking',
      code: `
// composables/useForm.js
import { ref, computed, readonly } from 'vue'

export function useForm(initialValues, onSubmit) {
  const values = ref(initialValues)
  const errors = ref({})
  const touched = ref({})
  const isSubmitting = ref(false)
  
  const isDirty = computed(() => {
    return Object.keys(values.value).some(
      key => values.value[key] !== initialValues[key]
    )
  })
  
  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0
  })
  
  const setFieldValue = (field, value) => {
    values.value[field] = value
  }
  
  const setFieldError = (field, error) => {
    errors.value[field] = error
  }
  
  const setFieldTouched = (field) => {
    touched.value[field] = true
  }
  
  const resetForm = () => {
    values.value = { ...initialValues }
    errors.value = {}
    touched.value = {}
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    isSubmitting.value = true
    
    try {
      await onSubmit(values.value)
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      isSubmitting.value = false
    }
  }
  
  return {
    values: readonly(values),
    errors: readonly(errors),
    touched: readonly(touched),
    isDirty,
    isValid,
    isSubmitting: readonly(isSubmitting),
    setFieldValue,
    setFieldError,
    setFieldTouched,
    resetForm,
    handleSubmit
  }
}

// Usage
<script setup>
import { useForm } from '@/composables/useForm'

const { values, errors, setFieldValue, handleSubmit } = useForm(
  { name: '', email: '' },
  async (formData) => {
    await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
  }
)
</script>

<template>
  <form @submit="handleSubmit">
    <div>
      <input 
        :value="values.name" 
        @input="e => setFieldValue('name', e.target.value)"
        placeholder="Name"
      />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Always start composable names with "use"',
      'Return readonly refs to prevent external mutations',
      'Clean up resources in onUnmounted hooks',
      'Use descriptive names for composables',
      'Handle errors gracefully',
      'Document composable parameters and return values',
      'Compose multiple composables for complex features',
      'Use TypeScript for better type safety',
      'Test composables independently',
      'Keep composables focused and single-purpose'
    ],
    donts: [
      'Don\'t expose mutable state directly',
      'Don\'t forget to clean up event listeners',
      'Don\'t create composables with side effects',
      'Don\'t use generic names like useData or useLogic',
      'Don\'t ignore error handling',
      'Don\'t create deeply nested composable compositions',
      'Don\'t use composables outside of components',
      'Don\'t forget to handle loading and error states',
      'Don\'t create composables that do too much',
      'Don\'t forget to document your composables'
    ]
  },

  vue35Features: `
Vue 3.5+ composable enhancements:
- useTemplateRef(): Explicit template reference management
- Enhanced watchers with pause/resume control
- onWatcherCleanup(): Better cleanup handling
- Improved type inference for composables
- Better performance with optimized reactivity
- Enhanced error handling capabilities
- Better integration with async operations
- Improved memory management
  `,

  typescriptIntegration: `
// TypeScript examples for composables

// Typed composable
interface UseCounterReturn {
  count: Readonly<Ref<number>>
  increment: () => void
  decrement: () => void
  doubled: ComputedRef<number>
}

export function useCounter(initialValue: number = 0): UseCounterReturn {
  const count = ref<number>(initialValue)
  
  const increment = (): void => {
    count.value++
  }
  
  const doubled = computed<number>(() => count.value * 2)
  
  return {
    count: readonly(count),
    increment,
    doubled
  }
}

// Typed API composable
interface UseApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
}

export function useApi<T>(
  url: string | Ref<string>,
  options?: UseApiOptions
) {
  const data = ref<T | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  
  return { data, loading, error }
}
  `,

  testingStrategies: `
Testing composables:

1. Unit Testing:
   - Test composable logic independently
   - Mock external dependencies
   - Test all return values
   - Test error scenarios

2. Integration Testing:
   - Test composable in component context
   - Test lifecycle hooks
   - Test watchers and computed properties
   - Test cleanup on unmount

3. Example test:
\`\`\`javascript
import { useCounter } from '@/composables/useCounter'

describe('useCounter', () => {
  it('increments count', () => {
    const { count, increment } = useCounter(0)
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })
  
  it('computes doubled value', () => {
    const { count, doubled, increment } = useCounter(5)
    expect(doubled.value).toBe(10)
    increment()
    expect(doubled.value).toBe(12)
  })
})
\`\`\`
  `,

  troubleshooting: `
Common composable issues:

1. State not updating:
   - Ensure using ref() for reactive state
   - Check watchers are set up correctly
   - Verify computed properties have dependencies

2. Memory leaks:
   - Always clean up event listeners in onUnmounted
   - Cancel pending requests on cleanup
   - Clear timers and intervals

3. Composable not working in component:
   - Verify composable is imported correctly
   - Check composable is called in setup
   - Ensure component is mounted before using

4. Type errors with TypeScript:
   - Add proper type annotations
   - Use generics for flexible composables
   - Export types for composable returns

5. Performance issues:
   - Avoid unnecessary watchers
   - Use computed for derived state
   - Memoize expensive calculations
   - Consider lazy loading composables
  `,

  summary: `
Composables are the foundation of Vue 3.5+ code reusability:

- Functions that encapsulate stateful logic
- Start with "use" prefix by convention
- Return readonly refs to prevent mutations
- Compose multiple composables for complex features
- Full TypeScript support
- Better than mixins: clear data flow, no naming collisions

Key takeaways:
1. Extract logic into composables for reusability
2. Always clean up resources in onUnmounted
3. Use useTemplateRef() for template references (Vue 3.5+)
4. Leverage enhanced watchers with pause/resume
5. Compose multiple composables for sophisticated features
6. Return readonly refs for encapsulation
7. Handle errors gracefully
8. Test composables independently
9. Document parameters and return values
10. Keep composables focused and single-purpose

Next steps: Build a library of reusable composables, explore advanced patterns, and optimize performance.
  `
}

export default composablesLesson
