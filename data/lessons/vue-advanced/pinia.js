// Pinia State Management - Expanded Lesson (90-120 minutes)
export const piniaLesson = {
  id: 'pinia',
  title: 'State Management with Pinia in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Advanced',
  introduction: 'Pinia is the official state management library for Vue 3. It provides a simple and intuitive way to manage application state.',
  coreConceptsAndExamples: {
    stores: {
      description: 'Creating and using Pinia stores',
      examples: [
        {
          name: 'Basic Store',
          code: 'import { defineStore } from "pinia"\nimport { ref, computed } from "vue"\n\nexport const useCounterStore = defineStore("counter", () => {\n  const count = ref(0)\n  const doubled = computed(() => count.value * 2)\n\n  function increment() {\n    count.value++\n  }\n\n  return { count, doubled, increment }\n})'
        },
        {
          name: 'Using Store in Component',
          code: '<script setup>\nimport { useCounterStore } from "@/stores/counter"\n\nconst store = useCounterStore()\n</script>\n\n<template>\n  <div>\n    <p>Count: {{ store.count }}</p>\n    <p>Doubled: {{ store.doubled }}</p>\n    <button @click="store.increment">Increment</button>\n  </div>\n</template>'
        }
      ]
    },
    actions: {
      description: 'Async actions in Pinia',
      examples: [
        {
          name: 'Async Action',
          code: 'export const useUserStore = defineStore("user", () => {\n  const user = ref(null)\n  const loading = ref(false)\n\n  async function fetchUser(id) {\n    loading.value = true\n    try {\n      const response = await fetch(`/api/users/${id}`)\n      user.value = await response.json()\n    } finally {\n      loading.value = false\n    }\n  }\n\n  return { user, loading, fetchUser }\n})'
        }
      ]
    }
  },
  realWorldScenarios: [
    {
      title: 'Shopping Cart Store',
      description: 'Managing shopping cart state',
      code: 'export const useCartStore = defineStore("cart", () => {\n  const items = ref([])\n\n  const total = computed(() => {\n    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)\n  })\n\n  function addItem(product) {\n    const existing = items.value.find(item => item.id === product.id)\n    if (existing) {\n      existing.quantity++\n    } else {\n      items.value.push({ ...product, quantity: 1 })\n    }\n  }\n\n  function removeItem(productId) {\n    items.value = items.value.filter(item => item.id !== productId)\n  }\n\n  return { items, total, addItem, removeItem }\n})'
    }
  ],
  bestPractices: {
    dos: [
      'Use Pinia for global state',
      'Keep stores focused and single-responsibility',
      'Use computed for derived state',
      'Use actions for mutations',
      'Test stores independently'
    ],
    donts: [
      'Don\'t mutate state directly outside actions',
      'Don\'t create too many stores',
      'Don\'t use Pinia for local component state',
      'Don\'t forget to handle errors in actions'
    ]
  },
  vue35Features: 'Vue 3.5+ improvements: Better TypeScript support, Enhanced store composition, Improved devtools integration',
  typescriptIntegration: 'TypeScript examples: interface User { id: number; name: string }; const user = ref<User | null>(null)',
  testingStrategies: 'Test stores with createPinia(), Mock API calls, Test computed properties',
  troubleshooting: 'Common issues: State not updating, Actions not working, Devtools not showing state',
  summary: 'Pinia provides a simple and powerful way to manage state in Vue applications. Use it for global state management.'
}

export default piniaLesson
