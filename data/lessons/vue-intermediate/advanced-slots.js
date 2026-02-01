// Advanced Slots - Expanded Lesson (90-120 minutes)
// Comprehensive guide to scoped slots and advanced slot patterns

export const advancedSlotsLesson = {
  title: 'Advanced Slots in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Intermediate',

  introduction: `
Advanced slots (scoped slots) allow child components to pass data back to parent slot content,
enabling highly flexible and reusable UI patterns.

Key concepts:
- Scoped slots for data passing
- Named slots for multiple slot points
- Slot fallback content
- Dynamic slot names
- Render functions for programmatic rendering
- Headless component patterns

Vue 3.5+ improvements: Better TypeScript support, improved slot handling, enhanced performance.
  `,

  coreConceptsAndExamples: {
    scopedSlots: {
      description: 'Scoped slots for passing data from child to parent',
      examples: [
        {
          name: 'Basic Scoped Slot',
          code: `
// Child.vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 20 }
])
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- Pass item data to parent slot -->
      <slot :item="item" :price="item.price">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

// Parent.vue
<script setup>
import Child from './Child.vue'
</script>

<template>
  <div>
    <!-- Access scoped slot data -->
    <Child>
      <template #default="{ item, price }">
        <strong>{{ item.name }}</strong> - $ {{ price }}
      </template>
    </Child>
  </div>
</template>
          `
        },
        {
          name: 'Named Scoped Slots',
          code: `
// DataTable.vue
<script setup>
const items = ref([
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
])
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>
          <slot name="header-name">Name</slot>
        </th>
        <th>
          <slot name="header-email">Email</slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>
          <slot name="cell-name" :item="item">
            {{ item.name }}
          </slot>
        </td>
        <td>
          <slot name="cell-email" :item="item">
            {{ item.email }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

// Usage
<template>
  <DataTable>
    <template #header-name>
      <strong>Full Name</strong>
    </template>
    
    <template #cell-name="{ item }">
      <span class="name">{{ item.name.toUpperCase() }}</span>
    </template>
    
    <template #cell-email="{ item }">
      <a :href="\`mailto:\${item.email}\`">{{ item.email }}</a>
    </template>
  </DataTable>
</template>
          `
        },
        {
          name: 'Scoped Slot with Methods',
          code: `
// List.vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Item 1', completed: false },
  { id: 2, text: 'Item 2', completed: true }
])

const toggleItem = (id) => {
  const item = items.value.find(i => i.id === id)
  if (item) item.completed = !item.completed
}

const deleteItem = (id) => {
  items.value = items.value.filter(i => i.id !== id)
}
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot 
        :item="item"
        :toggle="() => toggleItem(item.id)"
        :delete="() => deleteItem(item.id)"
      >
        {{ item.text }}
      </slot>
    </li>
  </ul>
</template>

// Usage
<template>
  <List>
    <template #default="{ item, toggle, delete: deleteItem }">
      <input type="checkbox" :checked="item.completed" @change="toggle" />
      <span :class="{ completed: item.completed }">{{ item.text }}</span>
      <button @click="deleteItem">Delete</button>
    </template>
  </List>
</template>
          `
        }
      ]
    },

    namedSlots: {
      description: 'Using named slots for multiple slot points',
      examples: [
        {
          name: 'Card Component with Named Slots',
          code: `
// Card.vue
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header">
        <h2>Default Header</h2>
      </slot>
    </div>
    
    <div class="card-body">
      <slot>
        Default body content
      </slot>
    </div>
    
    <div class="card-footer">
      <slot name="footer">
        <p>Default footer</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.card { border: 1px solid #ddd; border-radius: 8px; }
.card-header { padding: 1rem; border-bottom: 1px solid #ddd; }
.card-body { padding: 1rem; }
.card-footer { padding: 1rem; border-top: 1px solid #ddd; }
</style>

// Usage
<template>
  <Card>
    <template #header>
      <h2>My Card Title</h2>
    </template>
    
    <p>This is the main content</p>
    
    <template #footer>
      <button>Action</button>
    </template>
  </Card>
</template>
          `
        }
      ]
    },

    dynamicSlots: {
      description: 'Dynamic slot names and advanced patterns',
      examples: [
        {
          name: 'Dynamic Slot Names',
          code: `
// DynamicSlots.vue
<script setup>
import { ref } from 'vue'

const activeSlot = ref('content')
const slots = ['header', 'content', 'footer']
</script>

<template>
  <div>
    <div v-for="slot in slots" :key="slot">
      <button @click="activeSlot = slot">{{ slot }}</button>
    </div>
    
    <!-- Dynamic slot rendering -->
    <component :is="'div'">
      <slot :name="activeSlot" />
    </component>
  </div>
</template>
          `
        },
        {
          name: 'Render List with Scoped Slots',
          code: `
// RenderList.vue
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
])
</script>

<template>
  <div class="list">
    <div 
      v-for="(item, index) in items"
      :key="item.id"
      class="list-item"
    >
      <slot 
        :item="item"
        :index="index"
        :isFirst="index === 0"
        :isLast="index === items.length - 1"
      >
        {{ item.name }}
      </slot>
    </div>
  </div>
</template>

// Usage
<template>
  <RenderList>
    <template #default="{ item, index, isFirst, isLast }">
      <div :class="{ 'first-item': isFirst, 'last-item': isLast }">
        {{ index + 1 }}. {{ item.name }}
      </div>
    </template>
  </RenderList>
</template>
          `
        }
      ]
    },

    renderFunctions: {
      description: 'Using render functions for programmatic rendering',
      examples: [
        {
          name: 'Basic Render Function',
          code: `
// HeadingComponent.js
import { h } from 'vue'

export default {
  props: {
    level: {
      type: Number,
      default: 1
    },
    text: String
  },
  
  render() {
    return h(
      \`h\${this.level}\`,
      this.text
    )
  }
}

// Usage
<template>
  <HeadingComponent level="1" text="Main Title" />
  <HeadingComponent level="2" text="Subtitle" />
  <HeadingComponent level="3" text="Section" />
</template>
          `
        },
        {
          name: 'Render Function with Slots',
          code: `
// FlexibleButton.js
import { h } from 'vue'

export default {
  props: {
    variant: {
      type: String,
      default: 'primary'
    }
  },
  
  render() {
    return h(
      'button',
      {
        class: ['btn', \`btn-\${this.variant}\`],
        onClick: () => this.$emit('click')
      },
      this.$slots.default?.()
    )
  }
}

<style scoped>
.btn { padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
.btn-primary { background: #007bff; color: white; }
.btn-secondary { background: #6c757d; color: white; }
</style>

// Usage
<template>
  <FlexibleButton variant="primary" @click="handleClick">
    Click Me
  </FlexibleButton>
</template>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Flexible Data Table Component',
      description: 'Reusable data table with scoped slots for custom rendering',
      code: `
// DataTable.vue
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  items: Array,
  columns: Array
})

const sortBy = ref(null)
const sortOrder = ref('asc')

const sortedItems = computed(() => {
  if (!sortBy.value) return props.items
  
  return [...props.items].sort((a, b) => {
    const aVal = a[sortBy.value]
    const bVal = b[sortBy.value]
    
    if (sortOrder.value === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
})

const toggleSort = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th 
          v-for="column in columns"
          :key="column.key"
          @click="toggleSort(column.key)"
          :class="{ sorted: sortBy === column.key }"
        >
          <slot name="header" :column="column">
            {{ column.label }}
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sortedItems" :key="item.id">
        <td v-for="column in columns" :key="column.key">
          <slot :name="\`cell-\${column.key}\`" :item="item" :value="item[column.key]">
            {{ item[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.data-table { width: 100%; border-collapse: collapse; }
th { cursor: pointer; padding: 0.5rem; text-align: left; background: #f5f5f5; }
th.sorted { background: #e0e0e0; }
td { padding: 0.5rem; border-bottom: 1px solid #ddd; }
</style>

// Usage
<script setup>
import { ref } from 'vue'
import DataTable from './DataTable.vue'

const users = ref([
  { id: 1, name: 'John', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane', email: 'jane@example.com', role: 'User' }
])

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' }
]
</script>

<template>
  <DataTable :items="users" :columns="columns">
    <template #cell-email="{ value }">
      <a :href="\`mailto:\${value}\`">{{ value }}</a>
    </template>
    
    <template #cell-role="{ value }">
      <span :class="['badge', \`badge-\${value.toLowerCase()}\`]">
        {{ value }}
      </span>
    </template>
  </DataTable>
</template>

<style scoped>
.badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85em; }
.badge-admin { background: #ff6b6b; color: white; }
.badge-user { background: #4ecdc4; color: white; }
</style>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use scoped slots for flexible component design',
      'Provide meaningful default slot content',
      'Document slot names and data',
      'Use named slots for multiple content areas',
      'Combine slots with props for flexibility',
      'Use render functions for dynamic markup',
      'Test slot rendering thoroughly',
      'Keep slot logic simple',
      'Use TypeScript for slot types',
      'Consider accessibility in slot content'
    ],
    donts: [
      'Don\'t overuse slots (keep components simple)',
      'Don\'t pass too much data through slots',
      'Don\'t forget to document slots',
      'Don\'t use slots for simple conditionals',
      'Don\'t create deeply nested slot structures',
      'Don\'t use render functions for simple templates',
      'Don\'t forget fallback content',
      'Don\'t make slots required',
      'Don\'t ignore performance implications',
      'Don\'t use slots for styling only'
    ]
  },

  vue35Features: `
Vue 3.5+ slot enhancements:
- Better TypeScript support for slots
- Improved slot type inference
- Enhanced slot composition
- Better performance with slot rendering
- Improved DevTools support for slots
  `,

  typescriptIntegration: `
// TypeScript examples for slots

interface SlotProps {
  item: { id: number; name: string }
  index: number
}

// Typed slot definition
const slots = defineSlots<{
  default(props: SlotProps): any
  header(): any
  footer(): any
}>()
  `,

  testingStrategies: `
Testing slots:

1. Slot Rendering:
   - Test default slot content
   - Test named slots
   - Test slot fallback

2. Scoped Slot Data:
   - Test data passed to slots
   - Test slot props
   - Test slot methods

3. Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('renders scoped slot', () => {
  const wrapper = mount(List, {
    slots: {
      default: '<template #default="{ item }">{{ item.name }}</template>'
    }
  })
  
  expect(wrapper.text()).toContain('Item 1')
})
\`\`\`
  `,

  troubleshooting: `
Common slot issues:

1. Slot not rendering:
   - Verify slot name matches
   - Check slot is defined in child
   - Ensure template syntax is correct

2. Scoped data not available:
   - Check slot binding syntax
   - Verify data is passed from child
   - Check destructuring is correct

3. Performance issues:
   - Avoid complex slot logic
   - Use computed properties
   - Consider memoization
  `,

  summary: `
Advanced slots enable flexible component design:

- Scoped slots for data passing
- Named slots for multiple areas
- Slot fallback content
- Render functions for dynamic markup
- Headless component patterns

Key takeaways:
1. Use scoped slots for flexibility
2. Provide meaningful defaults
3. Document slot contracts
4. Keep slot logic simple
5. Test slot rendering
6. Use TypeScript for types
7. Consider performance
8. Maintain accessibility
9. Document examples
10. Consider component reusability

Next steps: Build flexible UI components, explore headless patterns, and optimize slot performance.
  `
}

export default advancedSlotsLesson
