// Built-in Directives - Expanded Lesson (90-120 minutes)
// Comprehensive guide to all Vue built-in directives

export const directivesBuiltinLesson = {
  title: 'Built-in Directives in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Fundamentals',

  introduction: `
Built-in directives are special tokens in Vue templates that tell Vue how to handle DOM elements.
Vue provides 12 built-in directives for common tasks:
- v-if, v-else, v-else-if: Conditional rendering
- v-for: List rendering
- v-bind: Attribute binding
- v-on: Event handling
- v-model: Two-way data binding
- v-show: Conditional display
- v-html: Render HTML
- v-text: Render text
- v-cloak: Hide uncompiled templates
- v-pre: Skip compilation
- v-once: Render once
- v-memo: Memoization

Vue 3.5+ improvements: Better TypeScript support, improved performance, enhanced reactivity.
  `,

  coreConceptsAndExamples: {
    vif: {
      description: 'Conditionally render elements based on expressions',
      examples: [
        {
          name: 'Basic v-if',
          code: `
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <div v-if="show">This is shown when show is true</div>
</template>
          `
        },
        {
          name: 'v-if with v-else',
          code: `
<template>
  <div v-if="score >= 90">Grade: A</div>
  <div v-else-if="score >= 80">Grade: B</div>
  <div v-else-if="score >= 70">Grade: C</div>
  <div v-else>Grade: F</div>
</template>
          `
        },
        {
          name: 'v-if on Template',
          code: `
<template>
  <template v-if="show">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
</template>
          `
        }
      ]
    },

    vfor: {
      description: 'Render lists of items',
      examples: [
        {
          name: 'Basic v-for',
          code: `
<script setup>
import { ref } from 'vue'
const items = ref(['Apple', 'Banana', 'Orange'])
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>
          `
        },
        {
          name: 'v-for with Index',
          code: `
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ index }}: {{ item }}
    </li>
  </ul>
</template>
          `
        },
        {
          name: 'v-for with Object',
          code: `
<script setup>
import { ref } from 'vue'
const user = ref({ name: 'John', age: 30, email: 'john@example.com' })
</script>

<template>
  <div v-for="(value, key) in user" :key="key">
    {{ key }}: {{ value }}
  </div>
</template>
          `
        },
        {
          name: 'v-for with Range',
          code: `
<template>
  <div v-for="n in 5" :key="n">{{ n }}</div>
</template>
          `
        }
      ]
    },

    vbind: {
      description: 'Bind attributes to dynamic values',
      examples: [
        {
          name: 'Basic v-bind',
          code: `
<script setup>
import { ref } from 'vue'
const href = ref('https://example.com')
const title = ref('Example Site')
</script>

<template>
  <a v-bind:href="href" v-bind:title="title">Link</a>
  <!-- Shorthand: -->
  <a :href="href" :title="title">Link</a>
</template>
          `
        },
        {
          name: 'Bind Class',
          code: `
<script setup>
import { ref } from 'vue'
const isActive = ref(true)
const hasError = ref(false)
</script>

<template>
  <!-- Object syntax -->
  <div :class="{ active: isActive, error: hasError }">
    Content
  </div>
  
  <!-- Array syntax -->
  <div :class="[isActive ? 'active' : '', 'base-class']">
    Content
  </div>
</template>
          `
        },
        {
          name: 'Bind Style',
          code: `
<script setup>
import { ref } from 'vue'
const color = ref('red')
const size = ref(14)
</script>

<template>
  <!-- Object syntax -->
  <div :style="{ color: color, fontSize: size + 'px' }">
    Styled text
  </div>
  
  <!-- Array syntax -->
  <div :style="[{ color }, { fontSize: size + 'px' }]">
    Styled text
  </div>
</template>
          `
        },
        {
          name: 'Bind Multiple Attributes',
          code: `
<script setup>
import { ref } from 'vue'
const attrs = ref({
  id: 'my-id',
  class: 'my-class',
  disabled: false
})
</script>

<template>
  <button v-bind="attrs">Click me</button>
</template>
          `
        }
      ]
    },

    von: {
      description: 'Listen to DOM events',
      examples: [
        {
          name: 'Basic v-on',
          code: `
<script setup>
import { ref } from 'vue'
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <button v-on:click="increment">
    Count: {{ count }}
  </button>
  <!-- Shorthand: -->
  <button @click="increment">
    Count: {{ count }}
  </button>
</template>
          `
        },
        {
          name: 'Event Modifiers',
          code: `
<template>
  <!-- Prevent default -->
  <a href="#" @click.prevent="handleClick">Link</a>
  
  <!-- Stop propagation -->
  <div @click.stop="handleClick">Click</div>
  
  <!-- Self (only trigger on self) -->
  <div @click.self="handleClick">Container</div>
  
  <!-- Once (trigger only once) -->
  <button @click.once="handleClick">Click once</button>
  
  <!-- Capture -->
  <div @click.capture="handleClick">Container</div>
  
  <!-- Passive (for scroll performance) -->
  <div @scroll.passive="handleScroll">Scrollable</div>
</template>
          `
        },
        {
          name: 'Key Modifiers',
          code: `
<template>
  <!-- Trigger on Enter key -->
  <input @keyup.enter="submit" />
  
  <!-- Trigger on Escape key -->
  <input @keyup.esc="cancel" />
  
  <!-- Trigger on specific key code -->
  <input @keyup.13="submit" />
  
  <!-- Modifier combinations -->
  <input @keyup.ctrl.enter="submit" />
</template>
          `
        },
        {
          name: 'Mouse Modifiers',
          code: `
<template>
  <!-- Left click only -->
  <div @click.left="handleClick">Left click</div>
  
  <!-- Right click only -->
  <div @click.right="handleContextMenu">Right click</div>
  
  <!-- Middle click only -->
  <div @click.middle="handleMiddle">Middle click</div>
</template>
          `
        }
      ]
    },

    vmodel: {
      description: 'Two-way data binding',
      examples: [
        {
          name: 'Basic v-model',
          code: `
<script setup>
import { ref } from 'vue'
const message = ref('')
</script>

<template>
  <input v-model="message" />
  <p>Message: {{ message }}</p>
</template>
          `
        },
        {
          name: 'v-model Modifiers',
          code: `
<template>
  <!-- .lazy: update on change event instead of input -->
  <input v-model.lazy="message" />
  
  <!-- .number: cast to number -->
  <input v-model.number="age" type="number" />
  
  <!-- .trim: trim whitespace -->
  <input v-model.trim="name" />
  
  <!-- Combine modifiers -->
  <input v-model.lazy.trim="text" />
</template>
          `
        },
        {
          name: 'v-model with Textarea',
          code: `
<script setup>
import { ref } from 'vue'
const description = ref('')
</script>

<template>
  <textarea v-model="description"></textarea>
  <p>{{ description }}</p>
</template>
          `
        },
        {
          name: 'v-model with Checkbox',
          code: `
<script setup>
import { ref } from 'vue'
const checked = ref(false)
const checkedNames = ref([])
</script>

<template>
  <!-- Single checkbox -->
  <input type="checkbox" v-model="checked" />
  <p>Checked: {{ checked }}</p>
  
  <!-- Multiple checkboxes -->
  <input type="checkbox" value="John" v-model="checkedNames" />
  <input type="checkbox" value="Jane" v-model="checkedNames" />
  <p>Selected: {{ checkedNames }}</p>
</template>
          `
        },
        {
          name: 'v-model with Select',
          code: `
<script setup>
import { ref } from 'vue'
const selected = ref('')
const selectedMultiple = ref([])
</script>

<template>
  <!-- Single select -->
  <select v-model="selected">
    <option value="">Choose</option>
    <option value="A">Option A</option>
    <option value="B">Option B</option>
  </select>
  
  <!-- Multiple select -->
  <select v-model="selectedMultiple" multiple>
    <option value="A">Option A</option>
    <option value="B">Option B</option>
    <option value="C">Option C</option>
  </select>
</template>
          `
        }
      ]
    },

    vshow: {
      description: 'Conditionally display elements (CSS display)',
      examples: [
        {
          name: 'Basic v-show',
          code: `
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <div v-show="show">This is shown/hidden with CSS</div>
</template>
          `
        },
        {
          name: 'v-if vs v-show',
          code: `
<!-- v-if: removes from DOM completely -->
<div v-if="show">Removed from DOM when false</div>

<!-- v-show: keeps in DOM, just hides with CSS -->
<div v-show="show">Always in DOM, hidden with display:none</div>

<!-- Use v-if for: rarely toggled content, heavy components -->
<!-- Use v-show for: frequently toggled content, simple elements -->
          `
        }
      ]
    },

    vhtml: {
      description: 'Render HTML content',
      examples: [
        {
          name: 'Basic v-html',
          code: `
<script setup>
import { ref } from 'vue'
const htmlContent = ref('<strong>Bold text</strong>')
</script>

<template>
  <!-- Renders HTML -->
  <div v-html="htmlContent"></div>
  
  <!-- vs v-text (renders as text) -->
  <div v-text="htmlContent"></div>
</template>
          `
        }
      ]
    },

    vtext: {
      description: 'Render text content',
      examples: [
        {
          name: 'Basic v-text',
          code: `
<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue')
</script>

<template>
  <!-- Same as {{ message }} -->
  <div v-text="message"></div>
  
  <!-- Equivalent to: -->
  <div>{{ message }}</div>
</template>
          `
        }
      ]
    },

    vcloak: {
      description: 'Hide uncompiled templates',
      examples: [
        {
          name: 'Basic v-cloak',
          code: `
<style>
[v-cloak] {
  display: none;
}
</style>

<template>
  <!-- Hidden until Vue compiles -->
  <div v-cloak>
    {{ message }}
  </div>
</template>
          `
        }
      ]
    },

    vpre: {
      description: 'Skip compilation for this element',
      examples: [
        {
          name: 'Basic v-pre',
          code: `
<template>
  <!-- Vue directives are not compiled -->
  <div v-pre>
    {{ message }} - not interpolated
    <span v-if="true">not compiled</span>
  </div>
</template>
          `
        }
      ]
    },

    vonce: {
      description: 'Render element once and cache it',
      examples: [
        {
          name: 'Basic v-once',
          code: `
<script setup>
import { ref } from 'vue'
const message = ref('Initial')
</script>

<template>
  <button @click="message = 'Updated'">Update</button>
  
  <!-- Rendered once, never updates -->
  <div v-once>{{ message }}</div>
  
  <!-- Updates normally -->
  <div>{{ message }}</div>
</template>
          `
        }
      ]
    },

    vmemo: {
      description: 'Memoize sub-tree based on dependencies',
      examples: [
        {
          name: 'Basic v-memo',
          code: `
<script setup>
import { ref } from 'vue'
const user = ref({ name: 'John', age: 30, email: 'john@example.com' })
</script>

<template>
  <!-- Only re-renders if name or age changes -->
  <div v-memo="[user.name, user.age]">
    <p>Name: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Form with Multiple Directives',
      description: 'Complete form using v-model, v-bind, v-on, v-if',
      code: `
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  country: '',
  terms: false,
  interests: []
})

const submitted = ref(false)
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Name required'
  if (!form.value.email) errors.value.email = 'Email required'
  if (!form.value.terms) errors.value.terms = 'Must accept terms'
}

const handleSubmit = () => {
  validateForm()
  if (Object.keys(errors.value).length === 0) {
    submitted.value = true
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model.trim="form.name" type="text" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    
    <div>
      <label>Email:</label>
      <input v-model.trim="form.email" type="email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    
    <div>
      <label>Country:</label>
      <select v-model="form.country">
        <option value="">Select</option>
        <option value="US">USA</option>
        <option value="UK">UK</option>
      </select>
    </div>
    
    <div>
      <label>Interests:</label>
      <input type="checkbox" value="sports" v-model="form.interests" /> Sports
      <input type="checkbox" value="music" v-model="form.interests" /> Music
    </div>
    
    <div>
      <input type="checkbox" v-model="form.terms" />
      <label>I accept terms</label>
      <span v-if="errors.terms" class="error">{{ errors.terms }}</span>
    </div>
    
    <button type="submit">Submit</button>
    
    <div v-if="submitted" class="success">
      Form submitted successfully!
    </div>
  </form>
</template>

<style scoped>
.error { color: red; font-size: 0.9em; }
.success { color: green; margin-top: 1rem; }
</style>
      `
    },
    {
      title: 'Dynamic List with Filtering',
      description: 'List rendering with v-for, v-if, v-bind',
      code: `
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1', category: 'A', active: true },
  { id: 2, name: 'Item 2', category: 'B', active: false },
  { id: 3, name: 'Item 3', category: 'A', active: true }
])

const filter = ref('')
const selectedCategory = ref('')

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesFilter = item.name.toLowerCase().includes(filter.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || item.category === selectedCategory.value
    return matchesFilter && matchesCategory
  })
})

const toggleActive = (id) => {
  const item = items.value.find(i => i.id === id)
  if (item) item.active = !item.active
}
</script>

<template>
  <div>
    <input v-model="filter" placeholder="Search..." />
    <select v-model="selectedCategory">
      <option value="">All Categories</option>
      <option value="A">Category A</option>
      <option value="B">Category B</option>
    </select>
    
    <ul>
      <li v-for="item in filteredItems" :key="item.id"
          :class="{ inactive: !item.active }">
        {{ item.name }} ({{ item.category }})
        <button @click="toggleActive(item.id)">
          {{ item.active ? 'Deactivate' : 'Activate' }}
        </button>
      </li>
    </ul>
    
    <p v-if="filteredItems.length === 0">No items found</p>
  </div>
</template>

<style scoped>
.inactive { opacity: 0.5; text-decoration: line-through; }
</style>
      `
    },
    {
      title: 'Conditional Rendering with Complex Logic',
      description: 'Using v-if, v-else-if, v-else for complex UI',
      code: `
<script setup>
import { ref } from 'vue'

const status = ref('loading') // loading, success, error, empty
const data = ref(null)
const error = ref(null)
</script>

<template>
  <div class="container">
    <div v-if="status === 'loading'" class="loading">
      <p>Loading...</p>
    </div>
    
    <div v-else-if="status === 'error'" class="error">
      <p>Error: {{ error }}</p>
      <button @click="status = 'loading'">Retry</button>
    </div>
    
    <div v-else-if="status === 'empty'" class="empty">
      <p>No data available</p>
    </div>
    
    <div v-else-if="status === 'success'" class="success">
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<style scoped>
.loading { color: blue; }
.error { color: red; }
.empty { color: gray; }
.success { color: green; }
</style>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use v-for with :key for proper list rendering',
      'Use v-if for rarely toggled content',
      'Use v-show for frequently toggled content',
      'Use v-model for form inputs',
      'Use event modifiers (.prevent, .stop) to simplify handlers',
      'Use :class and :style for dynamic styling',
      'Use v-bind shorthand (:) for cleaner code',
      'Use v-on shorthand (@) for cleaner code',
      'Use v-model modifiers (.lazy, .number, .trim)',
      'Combine directives for powerful templates'
    ],
    donts: [
      'Don\'t use v-if on v-for (use computed property instead)',
      'Don\'t forget :key on v-for lists',
      'Don\'t use v-html with untrusted content (XSS risk)',
      'Don\'t use v-model on non-form elements',
      'Don\'t use complex expressions in templates',
      'Don\'t use v-if for performance (use v-show instead)',
      'Don\'t mutate array/object directly (use Vue methods)',
      'Don\'t use inline event handlers with complex logic',
      'Don\'t forget to bind event handlers with @',
      'Don\'t use v-once on dynamic content'
    ]
  },

  vue35Features: `
Vue 3.5+ enhancements for directives:
- Better TypeScript support for directive arguments
- Improved v-model with better type inference
- Enhanced event modifier performance
- Better v-for key handling
- Improved v-bind class/style merging
- Better directive composition
- Enhanced template compilation
- Improved directive performance
  `,

  typescriptIntegration: `
// TypeScript examples for directives

// Typed event handlers
const handleClick = (event: MouseEvent): void => {
  console.log(event.target)
}

// Typed v-model
const message = ref<string>('')
const count = ref<number>(0)

// Typed computed for v-for
const filteredItems = computed<Item[]>(() => {
  return items.value.filter(item => item.active)
})

// Typed event modifiers
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    // Handle enter
  }
}
  `,

  testingStrategies: `
Testing directives:

1. v-if/v-else Testing:
   - Test conditional rendering
   - Test all branches
   - Test with computed properties

2. v-for Testing:
   - Test list rendering
   - Test with dynamic lists
   - Test key binding
   - Test with filters

3. v-model Testing:
   - Test two-way binding
   - Test modifiers
   - Test with different input types

4. Event Handling Testing:
   - Test event listeners
   - Test event modifiers
   - Test event propagation

5. Class/Style Binding Testing:
   - Test dynamic classes
   - Test dynamic styles
   - Test object/array syntax

Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('v-if renders conditionally', async () => {
  const wrapper = mount({
    template: '<div v-if="show">Content</div>',
    data: () => ({ show: true })
  })
  
  expect(wrapper.find('div').exists()).toBe(true)
  await wrapper.vm.$data.show = false
  expect(wrapper.find('div').exists()).toBe(false)
})
\`\`\`
  `,

  troubleshooting: `
Common issues and solutions:

1. v-if not working:
   - Check condition is boolean
   - Verify reactive data is used
   - Check for typos in condition

2. v-for not rendering:
   - Ensure :key is unique
   - Check array is reactive
   - Verify array is not empty

3. v-model not updating:
   - Check input type is supported
   - Verify v-model is on form element
   - Check for conflicting @input handlers

4. Event handlers not firing:
   - Verify @event syntax is correct
   - Check handler function exists
   - Verify event is not prevented

5. Class/style not applying:
   - Check CSS is defined
   - Verify binding syntax
   - Check for CSS specificity issues

6. Performance issues with v-for:
   - Add :key to all items
   - Use computed properties for filtering
   - Consider virtual scrolling for large lists

7. XSS vulnerability with v-html:
   - Never use with untrusted content
   - Sanitize HTML before rendering
   - Use v-text for user content
  `,

  summary: `
Built-in directives are fundamental to Vue development:

- v-if/v-else: Conditional rendering
- v-for: List rendering with :key
- v-bind: Attribute binding (shorthand :)
- v-on: Event handling (shorthand @)
- v-model: Two-way data binding
- v-show: CSS-based conditional display
- v-html: Render HTML (use carefully)
- v-text: Render text
- v-cloak: Hide uncompiled templates
- v-pre: Skip compilation
- v-once: Render once
- v-memo: Memoize sub-tree

Key takeaways:
1. Master v-if, v-for, v-bind, v-on, v-model first
2. Use :key with v-for for proper rendering
3. Use v-show for frequently toggled content
4. Use event modifiers to simplify handlers
5. Use v-model for form inputs
6. Combine directives for powerful templates
7. Avoid complex logic in templates
8. Use computed properties for filtering
9. Be careful with v-html (XSS risk)
10. Test directive combinations

Next steps: Practice combining directives in real projects, explore custom directives, and optimize template performance.
  `
}

export default directivesBuiltinLesson
