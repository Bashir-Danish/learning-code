// Component Composition - Expanded Lesson (90-120 minutes)
export const componentCompositionLesson = {
  id: 'component-composition',
  title: 'Component Composition in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Fundamentals',
  introduction: 'Component composition is about building complex UIs by combining smaller, reusable components. Vue 3.5+ provides powerful tools for this.',
  coreConceptsAndExamples: {
    props: {
      description: 'Passing data to child components',
      examples: [
        {
          name: 'Basic Props',
          code: '<script setup>\ndefineProps({\n  title: String,\n  count: Number\n})\n</script>\n\n<template>\n  <div>\n    <h1>{{ title }}</h1>\n    <p>Count: {{ count }}</p>\n  </div>\n</template>'
        },
        {
          name: 'Props with Defaults',
          code: '<script setup>\ndefineProps({\n  title: {\n    type: String,\n    default: "Default Title"\n  },\n  count: {\n    type: Number,\n    default: 0\n  }\n})\n</script>\n\n<template>\n  <div>\n    <h1>{{ title }}</h1>\n    <p>Count: {{ count }}</p>\n  </div>\n</template>'
        }
      ]
    },
    slots: {
      description: 'Flexible content composition with slots',
      examples: [
        {
          name: 'Basic Slot',
          code: '<template>\n  <div class="card">\n    <slot></slot>\n  </div>\n</template>'
        },
        {
          name: 'Named Slots',
          code: '<template>\n  <div class="card">\n    <header>\n      <slot name="header"></slot>\n    </header>\n    <main>\n      <slot></slot>\n    </main>\n    <footer>\n      <slot name="footer"></slot>\n    </footer>\n  </div>\n</template>'
        }
      ]
    },
    emits: {
      description: 'Child to parent communication',
      examples: [
        {
          name: 'Basic Emit',
          code: '<script setup>\ndefineEmits(["update"])\n</script>\n\n<template>\n  <button @click="$emit(\'update\', newValue)">Update</button>\n</template>'
        }
      ]
    }
  },
  realWorldScenarios: [
    {
      title: 'Card Component System',
      description: 'Building a reusable card component',
      code: '<script setup>\ndefineProps({\n  title: String,\n  description: String\n})\n\ndefineEmits(["click"])\n</script>\n\n<template>\n  <div class="card" @click="$emit(\'click\')">\n    <h2>{{ title }}</h2>\n    <p>{{ description }}</p>\n    <slot></slot>\n  </div>\n</template>\n\n<style scoped>\n.card {\n  border: 1px solid #ddd;\n  padding: 1rem;\n  border-radius: 8px;\n}\n</style>'
    }
  ],
  bestPractices: {
    dos: [
      'Use props for parent to child communication',
      'Use emits for child to parent communication',
      'Use slots for flexible content',
      'Keep components small and focused',
      'Document component props and emits'
    ],
    donts: [
      'Don\'t mutate props directly',
      'Don\'t use too many props',
      'Don\'t create deeply nested components',
      'Don\'t forget to validate props'
    ]
  },
  vue35Features: 'Vue 3.5+ improvements: Better prop validation, Enhanced slot handling, Improved component composition',
  typescriptIntegration: 'TypeScript examples: interface Props { title: string; count: number }; defineProps<Props>()',
  testingStrategies: 'Test component composition with mount(), Test props passing, Test slot rendering',
  troubleshooting: 'Common issues: Props not updating, Slots not rendering, Emit not working',
  summary: 'Component composition is key to building scalable Vue applications. Use props, slots, and emits effectively.'
}

export default componentCompositionLesson
