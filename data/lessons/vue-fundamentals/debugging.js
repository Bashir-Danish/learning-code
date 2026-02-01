// Debugging & DevTools - Expanded Lesson (90-120 minutes)
// Comprehensive guide to debugging Vue applications

export const debuggingLesson = {
  title: 'Debugging & DevTools in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Fundamentals',

  introduction: `
Debugging is essential for building reliable Vue applications. Vue provides powerful tools and techniques:
- Vue DevTools: Browser extension for inspecting components and state
- Global error handlers: Centralized error management
- Error boundaries: Catch errors from child components
- Console logging: Strategic debugging output
- Performance profiling: Identify bottlenecks
- Network inspection: Monitor API calls

Vue 3.5+ improvements: Better error messages, improved DevTools integration, enhanced performance profiling.
  `,

  coreConceptsAndExamples: {
    vueDevtools: {
      description: 'Browser extension for inspecting Vue applications',
      examples: [
        {
          name: 'Installing Vue DevTools',
          code: `
// Vue DevTools is available as a browser extension:
// Chrome: https://chrome.google.com/webstore/detail/vue-devtools
// Firefox: https://addons.mozilla.org/firefox/addon/vue-devtools/
// Edge: https://microsoftedge.microsoft.com/addons/detail/vue-devtools

// After installation, open DevTools (F12) and look for Vue tab
// Features:
// - Component tree inspection
// - State/props inspection
// - Event tracking
// - Performance profiling
// - Pinia store inspection
          `
        },
        {
          name: 'Inspecting Components',
          code: `
// In Vue DevTools:
// 1. Click on component in tree
// 2. View props, data, computed, methods
// 3. Edit data in real-time
// 4. Trigger methods from DevTools
// 5. See component hierarchy

// Example component inspection:
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

// In DevTools, you can:
// - See count = 0
// - See doubled = 0
// - Edit count directly
// - Call increment() method
// - Watch changes in real-time
          `
        },
        {
          name: 'Event Tracking',
          code: `
// Vue DevTools tracks all events:
// 1. Click Events tab
// 2. Perform actions in app
// 3. See all emitted events
// 4. View event payload
// 5. Replay events

<script setup>
import { ref } from 'vue'

const items = ref([])

const addItem = (name) => {
  items.value.push({ id: Date.now(), name })
}

const removeItem = (id) => {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <div>
    <button @click="addItem('New Item')">Add</button>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
        <button @click="removeItem(item.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

// In DevTools Events tab, you'll see:
// - addItem events with payload
// - removeItem events with payload
// - Event timeline
          `
        }
      ]
    },

    globalErrorHandler: {
      description: 'Centralized error handling for entire application',
      examples: [
        {
          name: 'Basic Global Error Handler',
          code: `
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.errorHandler = (err, instance, info) => {
  console.error('Global Error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
  
  // Log to external service
  // logErrorToService(err, instance, info)
}

app.mount('#app')
          `
        },
        {
          name: 'Error Handler with Logging Service',
          code: `
app.config.errorHandler = (err, instance, info) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err)
    console.error('Component:', instance?.$options.name)
    console.error('Info:', info)
  }
  
  // Log to external service in production
  if (process.env.NODE_ENV === 'production') {
    logToSentry({
      error: err,
      component: instance?.$options.name,
      info: info,
      timestamp: new Date().toISOString()
    })
  }
}

const logToSentry = (errorData) => {
  // Send to Sentry or similar service
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorData)
  })
}
          `
        },
        {
          name: 'Warning Handler',
          code: `
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue Warning:', msg)
  console.warn('Trace:', trace)
  
  // Log warnings in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('Full trace:', trace)
  }
}
          `
        }
      ]
    },

    errorBoundary: {
      description: 'Catch errors from child components',
      examples: [
        {
          name: 'Basic Error Boundary',
          code: `
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err, instance, info) => {
  error.value = {
    message: err.message,
    component: instance?.$options.name,
    info: info
  }
  
  // Return false to prevent error from propagating
  return false
})
</script>

<template>
  <div class="error-boundary">
    <div v-if="error" class="error-display">
      <h2>Something went wrong</h2>
      <p>{{ error.message }}</p>
      <p class="component">Component: {{ error.component }}</p>
      <p class="info">{{ error.info }}</p>
      <button @click="error = null">Dismiss</button>
    </div>
    
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.error-display {
  background-color: #fee;
  border: 1px solid #f00;
  padding: 1rem;
  border-radius: 4px;
}
.component, .info {
  font-size: 0.9em;
  color: #666;
}
</style>
          `
        },
        {
          name: 'Error Boundary with Recovery',
          code: `
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)
const retryCount = ref(0)
const maxRetries = ref(3)

onErrorCaptured((err, instance, info) => {
  error.value = err
  
  // Auto-retry for certain errors
  if (retryCount.value < maxRetries.value) {
    retryCount.value++
    setTimeout(() => {
      error.value = null
    }, 1000)
  }
  
  return false
})

const reset = () => {
  error.value = null
  retryCount.value = 0
}
</script>

<template>
  <div class="error-boundary">
    <div v-if="error" class="error-display">
      <h2>Error occurred</h2>
      <p>{{ error.message }}</p>
      <p v-if="retryCount < maxRetries">
        Retrying... ({{ retryCount }}/{{ maxRetries }})
      </p>
      <button v-else @click="reset">Reset</button>
    </div>
    
    <div v-else>
      <slot />
    </div>
  </div>
</template>
          `
        }
      ]
    },

    consoleLogging: {
      description: 'Strategic console logging for debugging',
      examples: [
        {
          name: 'Structured Logging',
          code: `
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)
const message = ref('')

// Log with context
const log = (label, data) => {
  console.log(\`[\${new Date().toISOString()}] \${label}:\`, data)
}

// Watch for changes
watch(count, (newVal, oldVal) => {
  log('count changed', { from: oldVal, to: newVal })
})

watch(message, (newVal) => {
  log('message updated', newVal)
})

const handleClick = () => {
  log('button clicked', { count: count.value })
  count.value++
}
</script>

<template>
  <div>
    <input v-model="message" placeholder="Type something" />
    <button @click="handleClick">Click ({{ count }})</button>
  </div>
</template>
          `
        },
        {
          name: 'Debug Utility',
          code: `
// utils/debug.js
export const createDebugger = (namespace) => {
  const isDev = process.env.NODE_ENV === 'development'
  
  return {
    log: (...args) => {
      if (isDev) console.log(\`[\${namespace}]\`, ...args)
    },
    warn: (...args) => {
      if (isDev) console.warn(\`[\${namespace}]\`, ...args)
    },
    error: (...args) => {
      console.error(\`[\${namespace}]\`, ...args)
    },
    table: (data) => {
      if (isDev) console.table(data)
    }
  }
}

// Usage in component:
<script setup>
import { createDebugger } from '@/utils/debug'

const debug = createDebugger('MyComponent')

debug.log('Component mounted')
debug.table(items.value)
</script>
          `
        }
      ]
    },

    performanceProfiling: {
      description: 'Identify performance bottlenecks',
      examples: [
        {
          name: 'Performance Measurement',
          code: `
<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])

const measurePerformance = async () => {
  const startTime = performance.now()
  
  // Simulate heavy operation
  const data = await fetchData()
  items.value = data
  
  const endTime = performance.now()
  const duration = endTime - startTime
  
  console.log(\`Operation took \${duration.toFixed(2)}ms\`)
}

const fetchData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: \`Item \${i}\`
      })))
    }, 100)
  })
}

onMounted(() => {
  measurePerformance()
})
</script>
          `
        },
        {
          name: 'Vue DevTools Performance Tab',
          code: `
// In Vue DevTools:
// 1. Click Performance tab
// 2. Click record button
// 3. Perform actions in app
// 4. Click stop
// 5. Analyze timeline:
//    - Component render times
//    - Lifecycle hook durations
//    - Event handler performance
//    - Watcher execution time

// Look for:
// - Long render times (> 16ms for 60fps)
// - Unnecessary re-renders
// - Expensive watchers
// - Slow lifecycle hooks

// Optimize by:
// - Using computed properties
// - Memoizing expensive calculations
// - Lazy loading components
// - Using v-show instead of v-if
// - Implementing virtual scrolling
          `
        }
      ]
    },

    networkInspection: {
      description: 'Monitor API calls and network requests',
      examples: [
        {
          name: 'Network Request Logging',
          code: `
<script setup>
import { ref } from 'vue'

const data = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchData = async (url) => {
  loading.value = true
  error.value = null
  
  const startTime = performance.now()
  
  try {
    console.log('Fetching:', url)
    const response = await fetch(url)
    const endTime = performance.now()
    
    console.log(\`Request completed in \${(endTime - startTime).toFixed(2)}ms\`)
    console.log('Status:', response.status)
    console.log('Headers:', response.headers)
    
    data.value = await response.json()
    console.log('Response:', data.value)
  } catch (err) {
    error.value = err.message
    console.error('Request failed:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <button @click="fetchData('/api/data')">Fetch Data</button>
    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <pre v-if="data">{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Complete Error Handling System',
      description: 'Global error handler with error boundary and logging',
      code: `
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { setupErrorHandling } from './utils/errorHandling'

const app = createApp(App)

setupErrorHandling(app)

app.mount('#app')

// utils/errorHandling.js
export const setupErrorHandling = (app) => {
  app.config.errorHandler = (err, instance, info) => {
    const errorData = {
      message: err.message,
      stack: err.stack,
      component: instance?.$options.name,
      info: info,
      timestamp: new Date().toISOString(),
      url: window.location.href
    }
    
    console.error('Global Error:', errorData)
    
    // Send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      sendErrorToService(errorData)
    }
  }
  
  app.config.warnHandler = (msg, instance, trace) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Vue Warning:', msg)
    }
  }
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason)
    sendErrorToService({
      type: 'unhandledRejection',
      reason: event.reason,
      timestamp: new Date().toISOString()
    })
  })
}

const sendErrorToService = async (errorData) => {
  try {
    await fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    })
  } catch (err) {
    console.error('Failed to send error:', err)
  }
}

// ErrorBoundary.vue
<script setup>
import { ref, onErrorCaptured } from 'vue'

const error = ref(null)

onErrorCaptured((err, instance, info) => {
  error.value = {
    message: err.message,
    component: instance?.$options.name,
    info: info
  }
  return false
})

const reset = () => {
  error.value = null
}
</script>

<template>
  <div class="error-boundary">
    <div v-if="error" class="error-display">
      <h2>Something went wrong</h2>
      <p>{{ error.message }}</p>
      <details>
        <summary>Details</summary>
        <p>Component: {{ error.component }}</p>
        <p>Info: {{ error.info }}</p>
      </details>
      <button @click="reset">Try Again</button>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.error-display {
  background-color: #fee;
  border: 1px solid #f00;
  padding: 1rem;
  border-radius: 4px;
}
</style>
      `
    },
    {
      title: 'Performance Monitoring Dashboard',
      description: 'Monitor component performance metrics',
      code: `
<script setup>
import { ref, onMounted, onUpdated } from 'vue'

const metrics = ref({
  renderTime: 0,
  updateTime: 0,
  renderCount: 0
})

let renderStart = 0

onMounted(() => {
  renderStart = performance.now()
})

onUpdated(() => {
  const updateEnd = performance.now()
  metrics.value.updateTime = updateEnd - renderStart
  metrics.value.renderCount++
  renderStart = performance.now()
})

const logMetrics = () => {
  console.table(metrics.value)
}
</script>

<template>
  <div class="metrics">
    <h3>Performance Metrics</h3>
    <p>Render Time: {{ metrics.renderTime.toFixed(2) }}ms</p>
    <p>Update Time: {{ metrics.updateTime.toFixed(2) }}ms</p>
    <p>Render Count: {{ metrics.renderCount }}</p>
    <button @click="logMetrics">Log Metrics</button>
  </div>
</template>

<style scoped>
.metrics {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  font-family: monospace;
}
</style>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use Vue DevTools for daily development',
      'Implement global error handlers',
      'Use error boundaries for component error handling',
      'Log errors to external service in production',
      'Use structured logging with context',
      'Monitor performance metrics',
      'Test error scenarios',
      'Provide user-friendly error messages',
      'Clean up resources in error handlers',
      'Document error handling strategy'
    ],
    donts: [
      'Don\'t ignore errors in console',
      'Don\'t use console.log for production logging',
      'Don\'t expose sensitive data in error messages',
      'Don\'t let errors crash the entire app',
      'Don\'t forget to handle async errors',
      'Don\'t use generic error messages',
      'Don\'t log too much data (performance impact)',
      'Don\'t ignore performance warnings',
      'Don\'t forget to test error scenarios',
      'Don\'t use try-catch for control flow'
    ]
  },

  vue35Features: `
Vue 3.5+ debugging improvements:
- Better error messages with source maps
- Improved DevTools integration
- Enhanced performance profiling
- Better stack traces
- Improved component naming in errors
- Better async error handling
- Enhanced warning messages
- Improved error boundary support
  `,

  typescriptIntegration: `
// TypeScript examples for debugging

// Typed error handler
const errorHandler = (err: Error, instance: any, info: string): void => {
  console.error(err)
}

// Typed error boundary
interface ErrorInfo {
  message: string
  component: string
  info: string
}

const error = ref<ErrorInfo | null>(null)

// Typed debug utility
interface Debugger {
  log: (...args: any[]) => void
  warn: (...args: any[]) => void
  error: (...args: any[]) => void
}
  `,

  testingStrategies: `
Testing error handling:

1. Error Handler Testing:
   - Test global error handler is called
   - Verify error data is logged
   - Test with different error types

2. Error Boundary Testing:
   - Test error is caught
   - Verify error display
   - Test recovery mechanism

3. Performance Testing:
   - Measure render times
   - Track re-render frequency
   - Monitor memory usage

4. Network Error Testing:
   - Test failed requests
   - Verify error messages
   - Test retry logic

Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('error boundary catches errors', async () => {
  const wrapper = mount(ErrorBoundary, {
    slots: {
      default: () => {
        throw new Error('Test error')
      }
    }
  })
  
  expect(wrapper.find('.error-display').exists()).toBe(true)
})
\`\`\`
  `,

  troubleshooting: `
Common debugging issues:

1. DevTools not showing:
   - Ensure Vue DevTools is installed
   - Check Vue is in development mode
   - Refresh page after installation

2. Errors not caught:
   - Verify error handler is registered
   - Check error is thrown in Vue context
   - Test with simple error first

3. Performance issues:
   - Use DevTools Performance tab
   - Check for unnecessary re-renders
   - Profile with Chrome DevTools

4. Memory leaks:
   - Check for circular references
   - Verify cleanup in unmount
   - Monitor with DevTools

5. Async errors not caught:
   - Use try-catch in async functions
   - Handle promise rejections
   - Test with failing promises

6. Source maps not working:
   - Verify source maps are generated
   - Check DevTools settings
   - Rebuild project
  `,

  summary: `
Debugging is critical for Vue development:

- Vue DevTools: Inspect components, state, events
- Global error handlers: Centralized error management
- Error boundaries: Catch child component errors
- Console logging: Strategic debugging output
- Performance profiling: Identify bottlenecks
- Network inspection: Monitor API calls

Key takeaways:
1. Master Vue DevTools first
2. Implement global error handling
3. Use error boundaries for resilience
4. Log strategically with context
5. Monitor performance metrics
6. Test error scenarios
7. Provide user-friendly messages
8. Handle async errors properly
9. Use source maps for debugging
10. Document error handling strategy

Next steps: Set up error tracking service, implement comprehensive error handling, and optimize performance based on profiling data.
  `
}

export default debuggingLesson
