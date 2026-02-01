// Custom Directives & Plugins - Expanded Lesson (90-120 minutes)
// Comprehensive guide to creating and using custom directives and plugins

export const directivesPluginsLesson = {
  title: 'Custom Directives & Plugins in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Intermediate',

  introduction: `
Custom directives provide low-level DOM access for reusable logic.
Plugins add global-level functionality to Vue applications.

Key concepts:
- Custom directives for DOM manipulation
- Directive lifecycle hooks
- Plugin architecture
- Global component registration
- Global state management
- Library integration

Vue 3.5+ improvements: Better TypeScript support, improved directive handling, enhanced plugin system.
  `,

  coreConceptsAndExamples: {
    customDirectives: {
      description: 'Creating and using custom directives',
      examples: [
        {
          name: 'Basic Custom Directive',
          code: `
// directives/vFocus.js
export const vFocus = {
  mounted: (el) => {
    el.focus()
    el.style.borderColor = '#42b883'
  }
}

// Usage in component
<script setup>
import { vFocus } from '@/directives/vFocus'
</script>

<template>
  <input v-focus type="text" placeholder="I will be focused" />
</template>
          `
        },
        {
          name: 'Directive with Arguments',
          code: `
// directives/vColor.js
export const vColor = {
  mounted: (el, binding) => {
    el.style.color = binding.value
  },
  updated: (el, binding) => {
    el.style.color = binding.value
  }
}

// Usage
<script setup>
import { ref } from 'vue'
import { vColor } from '@/directives/vColor'

const textColor = ref('red')
</script>

<template>
  <p v-color="textColor">This text color changes</p>
  <button @click="textColor = 'blue'">Change to Blue</button>
</template>
          `
        },
        {
          name: 'Directive with Modifiers',
          code: `
// directives/vClickOutside.js
export const vClickOutside = {
  mounted: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}

// Usage
<script setup>
import { ref } from 'vue'
import { vClickOutside } from '@/directives/vClickOutside'

const isOpen = ref(true)

const handleClickOutside = () => {
  isOpen.value = false
}
</script>

<template>
  <div v-if="isOpen" v-click-outside="handleClickOutside" class="dropdown">
    <p>Click outside to close</p>
  </div>
</template>
          `
        },
        {
          name: 'Directive with Lifecycle Hooks',
          code: `
// directives/vIntersect.js
export const vIntersect = {
  mounted: (el, binding) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          binding.value(entry)
        }
      })
    })
    observer.observe(el)
    el._observer = observer
  },
  unmounted: (el) => {
    if (el._observer) {
      el._observer.disconnect()
    }
  }
}

// Usage - Lazy load images
<script setup>
import { vIntersect } from '@/directives/vIntersect'

const handleIntersect = (entry) => {
  const img = entry.target
  img.src = img.dataset.src
  img.classList.add('loaded')
}
</script>

<template>
  <img 
    v-intersect="handleIntersect"
    data-src="image.jpg"
    alt="Lazy loaded image"
  />
</template>
          `
        }
      ]
    },

    directiveRegistration: {
      description: 'Registering directives globally and locally',
      examples: [
        {
          name: 'Global Directive Registration',
          code: `
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { vFocus } from '@/directives/vFocus'
import { vColor } from '@/directives/vColor'

const app = createApp(App)

// Register directives globally
app.directive('focus', vFocus)
app.directive('color', vColor)

app.mount('#app')

// Usage in any component
<template>
  <input v-focus />
  <p v-color="'red'">Red text</p>
</template>
          `
        },
        {
          name: 'Local Directive Registration',
          code: `
// Component.vue
<script setup>
import { vFocus } from '@/directives/vFocus'
import { vColor } from '@/directives/vColor'

// Directives are available only in this component
</script>

<template>
  <input v-focus />
  <p v-color="'blue'">Blue text</p>
</template>
          `
        }
      ]
    },

    plugins: {
      description: 'Creating and using Vue plugins',
      examples: [
        {
          name: 'Basic Plugin',
          code: `
// plugins/myPlugin.js
export default {
  install: (app, options) => {
    // Add global property
    app.config.globalProperties.$myProperty = 'Hello from plugin'
    
    // Add global method
    app.config.globalProperties.$myMethod = () => {
      console.log('Plugin method called')
    }
    
    // Add global component
    app.component('MyComponent', {
      template: '<div>My Component</div>'
    })
  }
}

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import myPlugin from '@/plugins/myPlugin'

const app = createApp(App)
app.use(myPlugin)
app.mount('#app')

// Usage in component
<script setup>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
console.log(instance.appContext.config.globalProperties.$myProperty)
</script>
          `
        },
        {
          name: 'Plugin with Options',
          code: `
// plugins/notificationPlugin.js
export default {
  install: (app, options = {}) => {
    const defaultOptions = {
      position: 'top-right',
      duration: 3000,
      ...options
    }
    
    app.config.globalProperties.$notify = (message, type = 'info') => {
      console.log(\`[\${type}] \${message}\`)
      // Implementation for showing notification
    }
  }
}

// main.js
app.use(notificationPlugin, {
  position: 'bottom-left',
  duration: 5000
})

// Usage
<script setup>
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
instance.appContext.config.globalProperties.$notify('Success!', 'success')
</script>
          `
        },
        {
          name: 'Plugin with Directives and Components',
          code: `
// plugins/uiPlugin.js
import MyButton from '@/components/MyButton.vue'
import MyInput from '@/components/MyInput.vue'
import { vFocus } from '@/directives/vFocus'
import { vColor } from '@/directives/vColor'

export default {
  install: (app) => {
    // Register components
    app.component('MyButton', MyButton)
    app.component('MyInput', MyInput)
    
    // Register directives
    app.directive('focus', vFocus)
    app.directive('color', vColor)
    
    // Add global properties
    app.config.globalProperties.$theme = 'light'
  }
}

// main.js
import uiPlugin from '@/plugins/uiPlugin'
app.use(uiPlugin)
          `
        }
      ]
    },

    advancedDirectives: {
      description: 'Advanced directive patterns',
      examples: [
        {
          name: 'Directive with Composable',
          code: `
// composables/useClickOutside.js
import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(el, callback) {
  const handleClick = (event) => {
    if (!(el === event.target || el.contains(event.target))) {
      callback(event)
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClick)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClick)
  })
}

// directives/vClickOutside.js
import { useClickOutside } from '@/composables/useClickOutside'

export const vClickOutside = {
  mounted: (el, binding) => {
    useClickOutside(el, binding.value)
  }
}
          `
        },
        {
          name: 'Reusable Directive Factory',
          code: `
// directives/createColorDirective.js
export function createColorDirective(defaultColor = 'black') {
  return {
    mounted: (el, binding) => {
      el.style.color = binding.value || defaultColor
    },
    updated: (el, binding) => {
      el.style.color = binding.value || defaultColor
    }
  }
}

// Usage
import { createColorDirective } from '@/directives/createColorDirective'

const vPrimaryColor = createColorDirective('#007bff')
const vDangerColor = createColorDirective('#dc3545')
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Complete UI Plugin System',
      description: 'Full plugin with components, directives, and utilities',
      code: `
// plugins/uiLibraryPlugin.js
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'
import { vFocus } from '@/directives/vFocus'
import { vClickOutside } from '@/directives/vClickOutside'
import { vColor } from '@/directives/vColor'

export default {
  install: (app, options = {}) => {
    const config = {
      theme: 'light',
      primaryColor: '#007bff',
      ...options
    }
    
    // Register components
    app.component('UiButton', Button)
    app.component('UiInput', Input)
    app.component('UiModal', Modal)
    
    // Register directives
    app.directive('focus', vFocus)
    app.directive('click-outside', vClickOutside)
    app.directive('color', vColor)
    
    // Add global properties
    app.config.globalProperties.$uiConfig = config
    
    // Add global methods
    app.config.globalProperties.$showNotification = (message, type = 'info') => {
      // Implementation
      console.log(\`[\${type}] \${message}\`)
    }
  }
}

// main.js
import uiLibraryPlugin from '@/plugins/uiLibraryPlugin'

app.use(uiLibraryPlugin, {
  theme: 'dark',
  primaryColor: '#0d6efd'
})

// Usage in components
<template>
  <UiButton v-focus @click="handleClick">Click Me</UiButton>
  <UiInput v-color="'#007bff'" placeholder="Enter text" />
  <div v-click-outside="handleClickOutside">
    Click outside to close
  </div>
</template>
      `
    },
    {
      title: 'Form Validation Plugin',
      description: 'Plugin for form validation with custom directives',
      code: `
// plugins/formValidationPlugin.js
import { vRequired } from '@/directives/vRequired'
import { vEmail } from '@/directives/vEmail'
import { vMinLength } from '@/directives/vMinLength'

export default {
  install: (app) => {
    app.directive('required', vRequired)
    app.directive('email', vEmail)
    app.directive('min-length', vMinLength)
    
    app.config.globalProperties.$validateForm = (formData, rules) => {
      const errors = {}
      
      Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field]
        const value = formData[field]
        
        if (fieldRules.required && !value) {
          errors[field] = 'This field is required'
        }
        
        if (fieldRules.email && value && !isValidEmail(value)) {
          errors[field] = 'Invalid email'
        }
        
        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
          errors[field] = \`Minimum \${fieldRules.minLength} characters\`
        }
      })
      
      return errors
    }
  }
}

// directives/vRequired.js
export const vRequired = {
  mounted: (el, binding) => {
    el.addEventListener('blur', () => {
      if (!el.value) {
        el.classList.add('error')
        binding.value?.('This field is required')
      } else {
        el.classList.remove('error')
      }
    })
  }
}

// Usage
<script setup>
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  password: ''
})

const rules = {
  name: { required: true },
  email: { required: true, email: true },
  password: { required: true, minLength: 8 }
}

const handleSubmit = () => {
  const errors = this.$validateForm(formData.value, rules)
  if (Object.keys(errors).length === 0) {
    // Submit form
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input 
      v-model="formData.name"
      v-required
      type="text"
      placeholder="Name"
    />
    <input 
      v-model="formData.email"
      v-email
      type="email"
      placeholder="Email"
    />
    <input 
      v-model="formData.password"
      v-min-length="8"
      type="password"
      placeholder="Password"
    />
    <button type="submit">Submit</button>
  </form>
</template>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use directives for low-level DOM manipulation',
      'Keep directives focused and single-purpose',
      'Clean up resources in unmounted hook',
      'Document directive arguments and modifiers',
      'Use plugins for global functionality',
      'Provide sensible defaults in plugins',
      'Use TypeScript for type safety',
      'Test directives and plugins thoroughly',
      'Follow Vue naming conventions',
      'Consider performance implications'
    ],
    donts: [
      'Don\'t use directives for component logic',
      'Don\'t forget to clean up event listeners',
      'Don\'t create overly complex directives',
      'Don\'t pollute global namespace with plugins',
      'Don\'t use directives for styling only',
      'Don\'t forget error handling',
      'Don\'t create circular dependencies',
      'Don\'t use directives for state management',
      'Don\'t forget to document plugins',
      'Don\'t ignore accessibility'
    ]
  },

  vue35Features: `
Vue 3.5+ directive and plugin enhancements:
- Better TypeScript support for directives
- Improved directive lifecycle
- Enhanced plugin system
- Better error handling
- Improved DevTools support
  `,

  typescriptIntegration: `
// TypeScript examples for directives and plugins

import type { DirectiveBinding, App } from 'vue'

// Typed directive
export const vMyDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.textContent = binding.value
  }
}

// Typed plugin
export default {
  install(app: App, options?: Record<string, any>) {
    app.config.globalProperties.$myMethod = () => {}
  }
}
  `,

  testingStrategies: `
Testing directives and plugins:

1. Directive Testing:
   - Test mounted hook
   - Test updated hook
   - Test unmounted cleanup
   - Test with different arguments

2. Plugin Testing:
   - Test installation
   - Test global properties
   - Test component registration
   - Test directive registration

Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('directive works', () => {
  const wrapper = mount({
    template: '<input v-focus />',
    directives: { focus: vFocus }
  })
  
  expect(wrapper.find('input').element).toBe(document.activeElement)
})
\`\`\`
  `,

  troubleshooting: `
Common directive and plugin issues:

1. Directive not working:
   - Verify directive is registered
   - Check directive name syntax
   - Ensure hooks are implemented

2. Plugin not loading:
   - Verify plugin is installed with app.use()
   - Check plugin install method
   - Verify options are passed correctly

3. Memory leaks:
   - Clean up event listeners
   - Remove observers
   - Clear timers

4. Type errors:
   - Add proper TypeScript types
   - Use type guards
   - Define interfaces
  `,

  summary: `
Directives and plugins extend Vue functionality:

- Custom directives for DOM manipulation
- Plugins for global functionality
- Reusable logic patterns
- Library integration
- Global state management

Key takeaways:
1. Use directives for low-level DOM access
2. Keep directives focused and simple
3. Clean up resources properly
4. Use plugins for global features
5. Document directives and plugins
6. Test thoroughly
7. Use TypeScript for type safety
8. Follow naming conventions
9. Consider performance
10. Maintain accessibility

Next steps: Build custom directive libraries, create reusable plugins, and explore advanced patterns.
  `
}

export default directivesPluginsLesson
