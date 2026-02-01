// Lifecycle Hooks & Watchers - Expanded Lesson (90-120 minutes)
export const lifecycleWatchersLesson = {
  id: 'lifecycle-watchers',
  title: 'Lifecycle Hooks & Watchers in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Fundamentals',
  introduction: 'Lifecycle hooks allow you to run code at specific stages of a component lifecycle. Watchers enable reactive side-effects when data changes.',
  coreConceptsAndExamples: {
    hooks: {
      description: 'Vue lifecycle hooks',
      examples: [
        {
          name: 'onMounted Hook',
          code: '<script setup>\nimport { onMounted } from "vue"\n\nonMounted(() => {\n  console.log("Component mounted")\n})\n</script>\n\n<template>\n  <div>Component is ready</div>\n</template>'
        },
        {
          name: 'onUnmounted Hook',
          code: '<script setup>\nimport { onUnmounted } from "vue"\n\nonUnmounted(() => {\n  console.log("Component unmounted")\n})\n</script>\n\n<template>\n  <div>Component cleanup</div>\n</template>'
        }
      ]
    },
    watchers: {
      description: 'Reactive watchers for data changes',
      examples: [
        {
          name: 'Basic Watch',
          code: '<script setup>\nimport { ref, watch } from "vue"\n\nconst count = ref(0)\n\nwatch(count, (newValue, oldValue) => {\n  console.log(`Count changed from ${oldValue} to ${newValue}`)\n})\n</script>\n\n<template>\n  <button @click="count++">{{ count }}</button>\n</template>'
        }
      ]
    }
  },
  realWorldScenarios: [
    {
      title: 'Data Fetching on Mount',
      description: 'Fetch data when component mounts',
      code: '<script setup>\nimport { ref, onMounted } from "vue"\n\nconst data = ref(null)\nconst loading = ref(true)\n\nonMounted(async () => {\n  const response = await fetch("/api/data")\n  data.value = await response.json()\n  loading.value = false\n})\n</script>\n\n<template>\n  <div v-if="loading">Loading...</div>\n  <div v-else>{{ data }}</div>\n</template>'
    }
  ],
  bestPractices: {
    dos: [
      'Use onMounted for initialization',
      'Use onUnmounted for cleanup',
      'Use watch for reactive side effects',
      'Clean up watchers in onUnmounted',
      'Use watchEffect for simple watchers'
    ],
    donts: [
      'Don\'t forget to cleanup resources',
      'Don\'t use watchers for simple computations',
      'Don\'t watch too many properties',
      'Don\'t create memory leaks'
    ]
  },
  vue35Features: 'Vue 3.5+ improvements: Better lifecycle management, Enhanced watchers, useTemplateRef() for template references',
  typescriptIntegration: 'TypeScript examples: const count = ref<number>(0); watch(count, (newValue: number) => {})',
  testingStrategies: 'Test lifecycle hooks with flushPromises(), Mock API calls in tests',
  troubleshooting: 'Common issues: Memory leaks from not cleaning up, Watchers firing too often, Race conditions in async operations',
  summary: 'Lifecycle hooks and watchers are essential for managing component state and side effects. Use them properly to avoid memory leaks and performance issues.'
}

export default lifecycleWatchersLesson
