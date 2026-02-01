// Built-in Components - Expanded Lesson (90-120 minutes)
// Comprehensive guide to Transition, Teleport, KeepAlive, and Suspense

export const builtinComponentsLesson = {
  title: 'Built-in Components in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Fundamentals',

  introduction: `
Built-in components are specialized tools provided by Vue to handle common UI patterns:
- Transition: Animate elements entering/leaving the DOM
- TransitionGroup: Animate lists of elements
- Teleport: Render content in a different part of the DOM
- KeepAlive: Cache component instances
- Suspense: Handle async dependencies (experimental)

Vue 3.5+ improvements: Better TypeScript support, improved performance, enhanced animation control.
  `,

  coreConceptsAndExamples: {
    transition: {
      description: 'Animate elements entering/leaving the DOM',
      examples: [
        {
          name: 'Basic Fade Transition',
          code: '<script setup>\nimport { ref } from "vue"\nconst show = ref(true)\n</script>\n\n<template>\n  <button @click="show = !show">Toggle</button>\n  <Transition name="fade">\n    <div v-if="show" class="box">Hello Vue!</div>\n  </Transition>\n</template>\n\n<style scoped>\n.box {\n  width: 100px;\n  height: 100px;\n  background-color: #4CAF50;\n}\n\n.fade-enter-active, .fade-leave-active {\n  transition: opacity 0.5s ease;\n}\n\n.fade-enter-from {\n  opacity: 0;\n}\n\n.fade-leave-to {\n  opacity: 0;\n}\n</style>'
        },
        {
          name: 'Slide Transition with Transform',
          code: '<Transition name="slide">\n  <div v-if="show" class="box">Sliding in</div>\n</Transition>\n\n<style scoped>\n.slide-enter-active, .slide-leave-active {\n  transition: all 0.3s ease;\n}\n\n.slide-enter-from {\n  transform: translateX(-100%);\n  opacity: 0;\n}\n\n.slide-leave-to {\n  transform: translateX(100%);\n  opacity: 0;\n}\n</style>'
        },
        {
          name: 'JavaScript Hooks',
          code: '<Transition\n  @before-enter="onBeforeEnter"\n  @enter="onEnter"\n  @after-enter="onAfterEnter"\n  @leave="onLeave"\n>\n  <div v-if="show">Animated</div>\n</Transition>\n\n<script setup>\nconst onEnter = (el, done) => {\n  el.style.opacity = "0"\n  setTimeout(() => {\n    el.style.transition = "opacity 0.5s"\n    el.style.opacity = "1"\n    done()\n  }, 0)\n}\n</script>'
        },
        {
          name: 'Custom Duration',
          code: '<Transition name="fade" :duration="1000">\n  <div v-if="show">1 second animation</div>\n</Transition>\n\n<!-- Different enter/leave durations -->\n<Transition name="slide" :duration="{ enter: 500, leave: 800 }">\n  <div v-if="show">Custom durations</div>\n</Transition>'
        },
        {
          name: 'Appear on Mount',
          code: '<Transition name="fade" appear>\n  <div class="box">I animate on mount!</div>\n</Transition>'
        }
      ]
    },

    teleport: {
      description: 'Render content in a different part of the DOM',
      examples: [
        {
          name: 'Basic Modal with Teleport',
          code: '<script setup>\nimport { ref } from "vue"\nconst showModal = ref(false)\n</script>\n\n<template>\n  <button @click="showModal = true">Open Modal</button>\n  \n  <Teleport to="body">\n    <div v-if="showModal" class="modal-overlay">\n      <div class="modal">\n        <h2>Modal Title</h2>\n        <button @click="showModal = false">Close</button>\n      </div>\n    </div>\n  </Teleport>\n</template>\n\n<style scoped>\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n\n.modal {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n}\n</style>'
        },
        {
          name: 'Teleport to Specific Element',
          code: '<Teleport to="#modal-container">\n  <div class="modal">Modal content</div>\n</Teleport>\n\n<Teleport to=".portal">\n  <div>Portal content</div>\n</Teleport>'
        },
        {
          name: 'Conditional Teleport',
          code: '<script setup>\nimport { ref } from "vue"\nconst useTeleport = ref(true)\n</script>\n\n<template>\n  <Teleport to="body" :disabled="!useTeleport">\n    <div class="modal">I teleport when enabled</div>\n  </Teleport>\n</template>'
        },
        {
          name: 'Teleport with Transition',
          code: '<Teleport to="body">\n  <Transition name="modal">\n    <div v-if="showModal" class="modal-overlay">\n      <div class="modal">Animated Modal</div>\n    </div>\n  </Transition>\n</Teleport>\n\n<style scoped>\n.modal-enter-active, .modal-leave-active {\n  transition: opacity 0.3s;\n}\n\n.modal-enter-from, .modal-leave-to {\n  opacity: 0;\n}\n</style>'
        }
      ]
    },

    keepalive: {
      description: 'Cache component instances and preserve state',
      examples: [
        {
          name: 'Basic KeepAlive',
          code: '<script setup>\nimport { ref } from "vue"\nimport ComponentA from "./ComponentA.vue"\nimport ComponentB from "./ComponentB.vue"\n\nconst activeComponent = ref("A")\n</script>\n\n<template>\n  <button @click="activeComponent = "A"">A</button>\n  <button @click="activeComponent = "B"">B</button>\n  \n  <KeepAlive>\n    <ComponentA v-if="activeComponent === "A"" />\n    <ComponentB v-if="activeComponent === "B"" />\n  </KeepAlive>\n</template>'
        },
        {
          name: 'KeepAlive with Include/Exclude',
          code: '<!-- Only cache ComponentA and ComponentB -->\n<KeepAlive include="ComponentA,ComponentB">\n  <component :is="activeComponent" />\n</KeepAlive>\n\n<!-- Cache all except ComponentC -->\n<KeepAlive exclude="ComponentC">\n  <component :is="activeComponent" />\n</KeepAlive>\n\n<!-- Using regex -->\n<KeepAlive :include="/^Component[AB]$/">\n  <component :is="activeComponent" />\n</KeepAlive>'
        },
        {
          name: 'KeepAlive with Max',
          code: '<!-- Cache maximum 2 components -->\n<KeepAlive :max="2">\n  <component :is="activeComponent" />\n</KeepAlive>'
        },
        {
          name: 'Lifecycle Hooks with KeepAlive',
          code: '<script setup>\nimport { onActivated, onDeactivated } from "vue"\n\nonActivated(() => {\n  console.log("Component activated from cache")\n})\n\nonDeactivated(() => {\n  console.log("Component deactivated (cached)")\n})\n</script>'
        }
      ]
    },

    suspense: {
      description: 'Handle async dependencies with fallback UI',
      examples: [
        {
          name: 'Basic Suspense',
          code: '<script setup>\nimport { defineAsyncComponent } from "vue"\n\nconst AsyncComponent = defineAsyncComponent(() =>\n  import("./AsyncComponent.vue")\n)\n</script>\n\n<template>\n  <Suspense>\n    <template #default>\n      <AsyncComponent />\n    </template>\n    <template #fallback>\n      <div>Loading...</div>\n    </template>\n  </Suspense>\n</template>'
        },
        {
          name: 'Multiple Async Components',
          code: '<script setup>\nimport { defineAsyncComponent } from "vue"\n\nconst UserProfile = defineAsyncComponent(() =>\n  import("./UserProfile.vue")\n)\nconst UserPosts = defineAsyncComponent(() =>\n  import("./UserPosts.vue")\n)\n</script>\n\n<template>\n  <Suspense>\n    <template #default>\n      <div>\n        <UserProfile />\n        <UserPosts />\n      </div>\n    </template>\n    <template #fallback>\n      <div>Loading user data...</div>\n    </template>\n  </Suspense>\n</template>'
        },
        {
          name: 'Suspense with Error Handling',
          code: '<script setup>\nimport { defineAsyncComponent } from "vue"\n\nconst AsyncComponent = defineAsyncComponent({\n  loader: () => import("./AsyncComponent.vue"),\n  delay: 200,\n  timeout: 10000\n})\n</script>\n\n<template>\n  <Suspense>\n    <template #default>\n      <AsyncComponent />\n    </template>\n    <template #fallback>\n      <div>Loading...</div>\n    </template>\n  </Suspense>\n</template>'
        }
      ]
    },

    transitiongroup: {
      description: 'Animate lists of elements',
      examples: [
        {
          name: 'Basic TransitionGroup',
          code: '<script setup>\nimport { ref } from "vue"\n\nconst items = ref([\n  { id: 1, text: "Item 1" },\n  { id: 2, text: "Item 2" }\n])\n\nconst addItem = () => {\n  items.value.push({\n    id: Math.max(...items.value.map(i => i.id)) + 1,\n    text: `Item ${items.value.length + 1}`\n  })\n}\n\nconst removeItem = (id) => {\n  items.value = items.value.filter(item => item.id !== id)\n}\n</script>\n\n<template>\n  <button @click="addItem">Add Item</button>\n  \n  <TransitionGroup name="list" tag="ul">\n    <li v-for="item in items" :key="item.id">\n      {{ item.text }}\n      <button @click="removeItem(item.id)">Remove</button>\n    </li>\n  </TransitionGroup>\n</template>\n\n<style scoped>\n.list-enter-active, .list-leave-active {\n  transition: all 0.3s ease;\n}\n\n.list-enter-from {\n  opacity: 0;\n  transform: translateX(-30px);\n}\n\n.list-leave-to {\n  opacity: 0;\n  transform: translateX(30px);\n}\n\n.list-move {\n  transition: transform 0.3s ease;\n}\n</style>'
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'E-commerce Product Modal with Animation',
      description: 'Modal with Teleport and Transition for product details',
      code: '<script setup>\nimport { ref } from "vue"\n\nconst selectedProduct = ref(null)\nconst products = ref([\n  { id: 1, name: "Product 1", price: 99 },\n  { id: 2, name: "Product 2", price: 199 }\n])\n\nconst openProduct = (product) => {\n  selectedProduct.value = product\n}\n\nconst closeProduct = () => {\n  selectedProduct.value = null\n}\n</script>\n\n<template>\n  <div class="products">\n    <button v-for="product in products" :key="product.id"\n            @click="openProduct(product)">\n      {{ product.name }}\n    </button>\n  </div>\n  \n  <Teleport to="body">\n    <Transition name="modal">\n      <div v-if="selectedProduct" class="modal-overlay" @click="closeProduct">\n        <div class="modal" @click.stop>\n          <h2>{{ selectedProduct.name }}</h2>\n          <p>Price: ${{ selectedProduct.price }}</p>\n          <button @click="closeProduct">Close</button>\n        </div>\n      </div>\n    </Transition>\n  </Teleport>\n</template>\n\n<style scoped>\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal {\n  background: white;\n  padding: 2rem;\n  border-radius: 8px;\n}\n\n.modal-enter-active, .modal-leave-active {\n  transition: opacity 0.3s;\n}\n\n.modal-enter-from, .modal-leave-to {\n  opacity: 0;\n}\n</style>'
    }
  ],

  bestPractices: {
    dos: [
      'Use Transition for simple enter/leave animations',
      'Use Teleport for modals, dropdowns, and tooltips',
      'Use KeepAlive to preserve component state',
      'Use TransitionGroup for animating list items',
      'Combine Teleport with Transition for smooth animations',
      'Use :key with TransitionGroup',
      'Set appropriate :duration for animations',
      'Use onActivated/onDeactivated hooks with KeepAlive',
      'Test animations on slower devices',
      'Use CSS transitions for better performance'
    ],
    donts: [
      'Don\'t animate too many elements simultaneously',
      'Don\'t use Teleport for layout purposes',
      'Don\'t forget to set :key on v-for items in TransitionGroup',
      'Don\'t use Suspense in production yet',
      'Don\'t animate on every state change',
      'Don\'t use long animation durations',
      'Don\'t forget to handle cleanup in onDeactivated',
      'Don\'t use Transition without v-if/v-show',
      'Don\'t nest too many Transitions',
      'Don\'t use animations to hide poor UX'
    ]
  },

  vue35Features: 'Vue 3.5+ enhancements for built-in components: Better TypeScript support, Enhanced animation performance, Improved Suspense handling, Better integration with useTemplateRef(), Enhanced transition hooks, Improved KeepAlive memory management, Better support for nested Transitions, Enhanced Teleport management, Improved animation frame scheduling',

  typescriptIntegration: 'TypeScript examples for built-in components: interface TransitionProps { name: string; duration?: number | { enter: number; leave: number }; appear?: boolean; } type ComponentType = typeof ComponentA | typeof ComponentB; type TeleportTarget = "body" | "#modal-container" | ".portal"; const onEnter = (el: Element, done: () => void): void => { done() }',

  testingStrategies: 'Testing built-in components: 1. Transition Testing - Test CSS classes are applied, Verify animation timing, Test enter/leave hooks. 2. Teleport Testing - Verify content renders in target, Test disabled state, Test multiple teleports. 3. KeepAlive Testing - Verify state is preserved, Test include/exclude patterns, Verify lifecycle hooks. 4. TransitionGroup Testing - Verify list animations work, Test move animations, Test with dynamic lists. 5. Suspense Testing - Test fallback UI displays, Verify default content displays, Test error handling',

  troubleshooting: 'Common issues and solutions: 1. Animations not working - Ensure CSS classes are defined, Check transition name matches, Verify animation duration is set. 2. Teleport not working - Verify target element exists, Check target selector is correct, Ensure target is not inside component. 3. KeepAlive not preserving state - Verify component is inside KeepAlive, Check include/exclude patterns, Ensure component has proper name. 4. TransitionGroup animations stuttering - Reduce number of animated items, Simplify CSS animations, Check for performance bottlenecks. 5. Suspense not showing fallback - Verify async component is defined, Check component has async dependencies, Test with simple async component',

  summary: 'Built-in components are essential tools: Transition for smooth enter/leave animations, Teleport for rendering content outside hierarchy, KeepAlive for preserving component state, TransitionGroup for animating lists, Suspense for handling async dependencies. Key takeaways: 1. Use Transition for simple animations, 2. Use Teleport for modals and portals, 3. Use KeepAlive for tab systems, 4. Combine components for complex UIs, 5. Test animations on real devices, 6. Follow Vue 3.5+ best practices, 7. Use TypeScript for type safety, 8. Monitor performance impact, 9. Clean up resources properly, 10. Provide good fallback UIs. Next steps: Practice combining components, explore advanced patterns, and optimize performance.'
}

export default builtinComponentsLesson
