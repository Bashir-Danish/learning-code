// Dynamic Components - Expanded Lesson (90-120 minutes)
// Comprehensive guide to dynamic components and component switching

export const dynamicComponentsLesson = {
  title: 'Dynamic Components in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Intermediate',

  introduction: `
Dynamic components allow you to switch between multiple components at the same mounting point
based on application state using the <component :is="..."> syntax.

Key concepts:
- Switch between components dynamically
- Preserve component state with KeepAlive
- Build tabbed interfaces and wizards
- Lazy load components for performance
- Combine with Teleport for advanced layouts

Vue 3.5+ improvements: Better performance, improved type inference, enhanced component handling.
  `,

  coreConceptsAndExamples: {
    basicDynamicComponent: {
      description: 'Basic dynamic component switching',
      examples: [
        {
          name: 'Simple Component Switching',
          code: `
// components/Home.vue
<template>
  <div class="home">
    <h2>Home Page</h2>
    <p>Welcome to the home page</p>
  </div>
</template>

// components/About.vue
<template>
  <div class="about">
    <h2>About Page</h2>
    <p>Learn more about us</p>
  </div>
</template>

// App.vue
<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import About from './components/About.vue'

const currentView = ref(Home)
</script>

<template>
  <div class="app">
    <nav>
      <button @click="currentView = Home">Home</button>
      <button @click="currentView = About">About</button>
    </nav>
    
    <!-- Dynamic component -->
    <component :is="currentView" />
  </div>
</template>
          `
        },
        {
          name: 'Dynamic Component with Props',
          code: `
<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = ref(ComponentA)
const componentProps = ref({
  title: 'Component A',
  message: 'Hello from A'
})

const switchComponent = (component, props) => {
  currentComponent.value = component
  componentProps.value = props
}
</script>

<template>
  <div>
    <button @click="switchComponent(ComponentA, { title: 'A', message: 'Hello A' })">
      Component A
    </button>
    <button @click="switchComponent(ComponentB, { title: 'B', message: 'Hello B' })">
      Component B
    </button>
    
    <!-- Pass props to dynamic component -->
    <component :is="currentComponent" v-bind="componentProps" />
  </div>
</template>
          `
        },
        {
          name: 'Dynamic Component with Events',
          code: `
<script setup>
import { ref } from 'vue'
import FormComponent from './FormComponent.vue'
import PreviewComponent from './PreviewComponent.vue'

const currentStep = ref(FormComponent)
const formData = ref({})

const handleFormSubmit = (data) => {
  formData.value = data
  currentStep.value = PreviewComponent
}

const handleBack = () => {
  currentStep.value = FormComponent
}
</script>

<template>
  <div class="wizard">
    <component 
      :is="currentStep"
      :data="formData"
      @submit="handleFormSubmit"
      @back="handleBack"
    />
  </div>
</template>
          `
        },
        {
          name: 'Tab Interface with Dynamic Components',
          code: `
<script setup>
import { ref } from 'vue'
import TabHome from './tabs/TabHome.vue'
import TabProfile from './tabs/TabProfile.vue'
import TabSettings from './tabs/TabSettings.vue'

const tabs = [
  { name: 'Home', component: TabHome },
  { name: 'Profile', component: TabProfile },
  { name: 'Settings', component: TabSettings }
]

const activeTabIndex = ref(0)
const activeComponent = ref(tabs[0].component)

const selectTab = (index) => {
  activeTabIndex.value = index
  activeComponent.value = tabs[index].component
}
</script>

<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button 
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTabIndex === index }"
        @click="selectTab(index)"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <div class="tab-content">
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<style scoped>
.tab-buttons { display: flex; gap: 1rem; }
.tab-buttons button.active { border-bottom: 2px solid blue; }
</style>
          `
        }
      ]
    },

    keepAliveWithDynamic: {
      description: 'Preserving component state with KeepAlive',
      examples: [
        {
          name: 'KeepAlive with Dynamic Components',
          code: `
<script setup>
import { ref } from 'vue'
import FormTab from './FormTab.vue'
import DataTab from './DataTab.vue'

const currentTab = ref(FormTab)
const tabs = [
  { name: 'Form', component: FormTab },
  { name: 'Data', component: DataTab }
]

const switchTab = (component) => {
  currentTab.value = component
}
</script>

<template>
  <div>
    <div class="tabs">
      <button 
        v-for="tab in tabs"
        :key="tab.name"
        @click="switchTab(tab.component)"
      >
        {{ tab.name }}
      </button>
    </div>
    
    <!-- KeepAlive preserves component state -->
    <KeepAlive>
      <component :is="currentTab" />
    </KeepAlive>
  </div>
</template>
          `
        },
        {
          name: 'KeepAlive with Include/Exclude',
          code: `
<script setup>
import { ref } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'
import ComponentC from './ComponentC.vue'

const currentComponent = ref(ComponentA)
</script>

<template>
  <div>
    <!-- Only cache ComponentA and ComponentB -->
    <KeepAlive include="ComponentA,ComponentB">
      <component :is="currentComponent" />
    </KeepAlive>
    
    <!-- Cache all except ComponentC -->
    <KeepAlive exclude="ComponentC">
      <component :is="currentComponent" />
    </KeepAlive>
    
    <!-- Cache maximum 2 components -->
    <KeepAlive :max="2">
      <component :is="currentComponent" />
    </KeepAlive>
  </div>
</template>
          `
        },
        {
          name: 'Lifecycle Hooks with KeepAlive',
          code: `
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('Component activated from cache')
  // Refresh data, resume timers, etc.
})

onDeactivated(() => {
  console.log('Component deactivated (cached)')
  // Pause timers, save state, etc.
})
</script>

<template>
  <div>
    <p>This component is cached when not visible</p>
  </div>
</template>
          `
        }
      ]
    },

    lazyLoadingComponents: {
      description: 'Lazy loading dynamic components for performance',
      examples: [
        {
          name: 'Lazy Load with defineAsyncComponent',
          code: `
<script setup>
import { ref, defineAsyncComponent } from 'vue'

// Lazy load components
const ComponentA = defineAsyncComponent(() =>
  import('./ComponentA.vue')
)

const ComponentB = defineAsyncComponent(() =>
  import('./ComponentB.vue')
)

const currentComponent = ref(ComponentA)
</script>

<template>
  <div>
    <button @click="currentComponent = ComponentA">Load A</button>
    <button @click="currentComponent = ComponentB">Load B</button>
    
    <Suspense>
      <template #default>
        <component :is="currentComponent" />
      </template>
      <template #fallback>
        <div>Loading component...</div>
      </template>
    </Suspense>
  </div>
</template>
          `
        },
        {
          name: 'Lazy Load with Error Handling',
          code: `
<script setup>
import { ref, defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  delay: 200,
  timeout: 10000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})

const currentComponent = ref(AsyncComponent)
</script>

<template>
  <component :is="currentComponent" />
</template>
          `
        }
      ]
    },

    advancedPatterns: {
      description: 'Advanced dynamic component patterns',
      examples: [
        {
          name: 'Component Registry Pattern',
          code: `
// componentRegistry.js
import Home from './components/Home.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

export const componentRegistry = {
  home: Home,
  about: About,
  contact: Contact
}

// App.vue
<script setup>
import { ref } from 'vue'
import { componentRegistry } from './componentRegistry'

const currentView = ref('home')

const getComponent = (name) => {
  return componentRegistry[name] || componentRegistry.home
}
</script>

<template>
  <div>
    <nav>
      <button @click="currentView = 'home'">Home</button>
      <button @click="currentView = 'about'">About</button>
      <button @click="currentView = 'contact'">Contact</button>
    </nav>
    
    <component :is="getComponent(currentView)" />
  </div>
</template>
          `
        },
        {
          name: 'Wizard/Stepper Pattern',
          code: `
<script setup>
import { ref } from 'vue'
import Step1 from './steps/Step1.vue'
import Step2 from './steps/Step2.vue'
import Step3 from './steps/Step3.vue'
import Review from './steps/Review.vue'

const steps = [Step1, Step2, Step3, Review]
const currentStep = ref(0)
const formData = ref({})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submit = () => {
  console.log('Submitting:', formData.value)
}
</script>

<template>
  <div class="wizard">
    <div class="progress">
      <div class="progress-bar" :style="{ width: ((currentStep + 1) / steps.length * 100) + '%' }"></div>
    </div>
    
    <KeepAlive>
      <component 
        :is="steps[currentStep]"
        v-model="formData"
      />
    </KeepAlive>
    
    <div class="buttons">
      <button @click="prevStep" :disabled="currentStep === 0">Previous</button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
      <button v-if="currentStep === steps.length - 1" @click="submit">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.progress { height: 4px; background: #eee; }
.progress-bar { height: 100%; background: #4CAF50; transition: width 0.3s; }
.buttons { display: flex; gap: 1rem; margin-top: 2rem; }
</style>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Admin Dashboard with Dynamic Views',
      description: 'Complete admin dashboard with multiple dynamic views',
      code: `
// views/Dashboard.vue
<script setup>
import { ref } from 'vue'
import UsersView from './views/UsersView.vue'
import ProductsView from './views/ProductsView.vue'
import AnalyticsView from './views/AnalyticsView.vue'
import SettingsView from './views/SettingsView.vue'

const views = {
  users: UsersView,
  products: ProductsView,
  analytics: AnalyticsView,
  settings: SettingsView
}

const currentView = ref('users')
const viewList = Object.keys(views)
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <nav>
        <button 
          v-for="view in viewList"
          :key="view"
          :class="{ active: currentView === view }"
          @click="currentView = view"
        >
          {{ view.charAt(0).toUpperCase() + view.slice(1) }}
        </button>
      </nav>
    </aside>
    
    <main class="content">
      <KeepAlive>
        <component :is="views[currentView]" />
      </KeepAlive>
    </main>
  </div>
</template>

<style scoped>
.dashboard { display: flex; height: 100vh; }
.sidebar { width: 200px; background: #f5f5f5; padding: 1rem; }
.content { flex: 1; padding: 2rem; overflow-y: auto; }
nav { display: flex; flex-direction: column; gap: 0.5rem; }
button.active { background: #007bff; color: white; }
</style>
      `
    },
    {
      title: 'Multi-step Form Wizard',
      description: 'Complete form wizard with validation and state preservation',
      code: `
// FormWizard.vue
<script setup>
import { ref, computed } from 'vue'
import PersonalInfo from './steps/PersonalInfo.vue'
import AddressInfo from './steps/AddressInfo.vue'
import PaymentInfo from './steps/PaymentInfo.vue'
import ReviewStep from './steps/ReviewStep.vue'

const steps = [
  { name: 'Personal', component: PersonalInfo },
  { name: 'Address', component: AddressInfo },
  { name: 'Payment', component: PaymentInfo },
  { name: 'Review', component: ReviewStep }
]

const currentStepIndex = ref(0)
const formData = ref({
  personal: {},
  address: {},
  payment: {}
})

const currentStep = computed(() => steps[currentStepIndex.value])
const isFirstStep = computed(() => currentStepIndex.value === 0)
const isLastStep = computed(() => currentStepIndex.value === steps.length - 1)
const progress = computed(() => ((currentStepIndex.value + 1) / steps.length) * 100)

const nextStep = () => {
  if (!isLastStep.value) {
    currentStepIndex.value++
  }
}

const prevStep = () => {
  if (!isFirstStep.value) {
    currentStepIndex.value--
  }
}

const submit = async () => {
  try {
    const response = await fetch('/api/submit-form', {
      method: 'POST',
      body: JSON.stringify(formData.value)
    })
    if (response.ok) {
      alert('Form submitted successfully!')
    }
  } catch (error) {
    alert('Error submitting form')
  }
}
</script>

<template>
  <div class="wizard">
    <div class="header">
      <h1>Form Wizard</h1>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="step-indicators">
        <div 
          v-for="(step, index) in steps"
          :key="index"
          :class="['indicator', { active: index === currentStepIndex, completed: index < currentStepIndex }]"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
    
    <div class="content">
      <KeepAlive>
        <component 
          :is="currentStep.component"
          v-model="formData"
        />
      </KeepAlive>
    </div>
    
    <div class="footer">
      <button @click="prevStep" :disabled="isFirstStep">Previous</button>
      <button v-if="!isLastStep" @click="nextStep">Next</button>
      <button v-else @click="submit" class="submit">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.wizard { display: flex; flex-direction: column; height: 100vh; }
.header { padding: 2rem; border-bottom: 1px solid #eee; }
.progress-bar { height: 4px; background: #eee; margin: 1rem 0; }
.progress { height: 100%; background: #4CAF50; transition: width 0.3s; }
.step-indicators { display: flex; gap: 1rem; justify-content: center; }
.indicator { width: 40px; height: 40px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center; }
.indicator.active { background: #007bff; color: white; }
.indicator.completed { background: #4CAF50; color: white; }
.content { flex: 1; padding: 2rem; overflow-y: auto; }
.footer { padding: 2rem; border-top: 1px solid #eee; display: flex; gap: 1rem; justify-content: flex-end; }
.submit { background: #4CAF50; color: white; }
</style>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use component registry for large numbers of components',
      'Combine KeepAlive with dynamic components for state preservation',
      'Use lazy loading for performance optimization',
      'Provide fallback UI with Suspense',
      'Handle component errors gracefully',
      'Use descriptive component names',
      'Test all component switching paths',
      'Document component props and events',
      'Use TypeScript for type safety',
      'Monitor performance with DevTools'
    ],
    donts: [
      'Don\'t load all components eagerly',
      'Don\'t forget to handle loading states',
      'Don\'t use string component names without validation',
      'Don\'t create circular component dependencies',
      'Don\'t forget to clean up resources',
      'Don\'t use dynamic components for simple conditionals',
      'Don\'t pass too many props to dynamic components',
      'Don\'t forget error handling',
      'Don\'t create deeply nested dynamic components',
      'Don\'t ignore performance implications'
    ]
  },

  vue35Features: `
Vue 3.5+ dynamic component enhancements:
- Better performance with optimized component switching
- Improved type inference for dynamic components
- Enhanced KeepAlive with better memory management
- Better Suspense integration
- Improved error handling
- Better DevTools support
  `,

  typescriptIntegration: `
// TypeScript examples for dynamic components

import type { Component } from 'vue'

interface TabConfig {
  name: string
  component: Component
}

const tabs: TabConfig[] = [
  { name: 'Home', component: Home },
  { name: 'About', component: About }
]

const currentComponent = ref<Component>(tabs[0].component)
  `,

  testingStrategies: `
Testing dynamic components:

1. Component Switching:
   - Test switching between components
   - Verify correct component renders
   - Test with different props

2. State Preservation:
   - Test KeepAlive preserves state
   - Test state is lost without KeepAlive
   - Test lifecycle hooks

3. Performance:
   - Test lazy loading works
   - Verify components load on demand
   - Monitor memory usage

Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('switches components', async () => {
  const wrapper = mount(App)
  expect(wrapper.findComponent(Home).exists()).toBe(true)
  
  await wrapper.vm.switchComponent(About)
  expect(wrapper.findComponent(About).exists()).toBe(true)
})
\`\`\`
  `,

  troubleshooting: `
Common dynamic component issues:

1. Component not rendering:
   - Verify component is imported
   - Check :is binding is correct
   - Ensure component is registered

2. State not preserved:
   - Add KeepAlive wrapper
   - Check component names match
   - Verify include/exclude patterns

3. Performance issues:
   - Use lazy loading
   - Implement code splitting
   - Monitor bundle size

4. Type errors:
   - Use proper TypeScript types
   - Define component interfaces
   - Use type guards
  `,

  summary: `
Dynamic components enable flexible UI switching:

- Switch between components at runtime
- Preserve state with KeepAlive
- Lazy load for performance
- Build tabs, wizards, and dashboards
- Combine with Suspense for async loading

Key takeaways:
1. Use <component :is="..."> for dynamic switching
2. Add KeepAlive to preserve state
3. Lazy load components for performance
4. Handle loading and error states
5. Use component registry for organization
6. Test all switching paths
7. Monitor performance impact
8. Document component contracts
9. Use TypeScript for type safety
10. Consider accessibility implications

Next steps: Build complex UIs with dynamic components, optimize performance, and explore advanced patterns.
  `
}

export default dynamicComponentsLesson
