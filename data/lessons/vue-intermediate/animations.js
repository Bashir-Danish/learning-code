// Animations & Transitions - Expanded Lesson (90-120 minutes)
// Comprehensive guide to animations and transitions in Vue

export const animationsLesson = {
  title: 'Animations & Transitions in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Intermediate',

  introduction: `
Vue provides powerful animation capabilities through Transition components and JavaScript hooks.
Combined with libraries like GSAP, you can create professional animations.

Key concepts:
- CSS transitions and animations
- JavaScript animation hooks
- Transition component lifecycle
- TransitionGroup for list animations
- GSAP integration
- Performance optimization
- Easing functions

Vue 3.5+ improvements: Better animation performance, improved transition handling, enhanced DevTools support.
  `,

  coreConceptsAndExamples: {
    cssTransitions: {
      description: 'CSS-based transitions',
      examples: [
        {
          name: 'Basic CSS Transition',
          code: `
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  
  <Transition name="fade">
    <div v-if="show" class="box">Hello Vue!</div>
  </Transition>
</template>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: #4CAF50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
          `
        },
        {
          name: 'Slide and Fade Transition',
          code: `
<Transition name="slide-fade">
  <div v-if="show" class="box">Sliding and fading</div>
</Transition>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
          `
        },
        {
          name: 'Rotation Animation',
          code: `
<Transition name="rotate">
  <div v-if="show" class="box">Rotating</div>
</Transition>

<style scoped>
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.5s ease;
}

.rotate-enter-from {
  transform: rotate(-180deg);
  opacity: 0;
}

.rotate-leave-to {
  transform: rotate(180deg);
  opacity: 0;
}
</style>
          `
        },
        {
          name: 'Scale Animation',
          code: `
<Transition name="scale">
  <div v-if="show" class="box">Scaling</div>
</Transition>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter-from {
  transform: scale(0);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
          `
        }
      ]
    },

    javascriptHooks: {
      description: 'JavaScript animation hooks',
      examples: [
        {
          name: 'Basic JavaScript Hooks',
          code: `
<script setup>
import { ref } from 'vue'

const show = ref(true)

const onBeforeEnter = (el) => {
  console.log('Before enter')
}

const onEnter = (el, done) => {
  console.log('Entering')
  el.style.opacity = '0'
  setTimeout(() => {
    el.style.transition = 'opacity 0.5s'
    el.style.opacity = '1'
    done()
  }, 0)
}

const onAfterEnter = (el) => {
  console.log('After enter')
}

const onBeforeLeave = (el) => {
  console.log('Before leave')
}

const onLeave = (el, done) => {
  console.log('Leaving')
  el.style.transition = 'opacity 0.5s'
  el.style.opacity = '0'
  setTimeout(done, 500)
}

const onAfterLeave = (el) => {
  console.log('After leave')
}
</script>

<template>
  <button @click="show = !show">Toggle</button>
  
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div v-if="show" class="box">Animated with hooks</div>
  </Transition>
</template>

<style scoped>
.box { width: 100px; height: 100px; background: #4CAF50; }
</style>
          `
        },
        {
          name: 'GSAP Integration',
          code: `
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const show = ref(true)

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: 'bounce.out',
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.5,
    y: 50,
    opacity: 0,
    ease: 'power2.in',
    onComplete: done
  })
}
</script>

<template>
  <button @click="show = !show">Toggle</button>
  
  <Transition @enter="onEnter" @leave="onLeave">
    <div v-if="show" class="box">GSAP Animation</div>
  </Transition>
</template>

<style scoped>
.box { width: 100px; height: 100px; background: #4CAF50; }
</style>
          `
        }
      ]
    },

    transitionGroup: {
      description: 'Animating lists with TransitionGroup',
      examples: [
        {
          name: 'Basic TransitionGroup',
          code: `
<script setup>
import { ref } from 'vue'

const items = ref([
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' }
])

const addItem = () => {
  items.value.push({
    id: Math.max(...items.value.map(i => i.id)) + 1,
    text: \`Item \${items.value.length + 1}\`
  })
}

const removeItem = (id) => {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <button @click="addItem">Add Item</button>
  
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
      <button @click="removeItem(item.id)">Remove</button>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
          `
        },
        {
          name: 'Stagger Animation with GSAP',
          code: `
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const items = ref([1, 2, 3, 4, 5])

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.5,
    opacity: 0,
    y: 20,
    delay: el.dataset.index * 0.1,
    onComplete: done
  })
}
</script>

<template>
  <TransitionGroup @enter="onEnter" tag="ul">
    <li v-for="(item, index) in items" :key="item" :data-index="index">
      Item {{ item }}
    </li>
  </TransitionGroup>
</template>
          `
        }
      ]
    },

    advancedPatterns: {
      description: 'Advanced animation patterns',
      examples: [
        {
          name: 'Shared Element Transition',
          code: `
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const isExpanded = ref(false)

const onEnter = (el, done) => {
  const rect = el.getBoundingClientRect()
  gsap.from(el, {
    duration: 0.6,
    width: 100,
    height: 100,
    x: -rect.width / 2 + 50,
    y: -rect.height / 2 + 50,
    onComplete: done
  })
}
</script>

<template>
  <button @click="isExpanded = !isExpanded">Toggle</button>
  
  <Transition @enter="onEnter">
    <div v-if="isExpanded" class="box">Expanded</div>
  </Transition>
</template>

<style scoped>
.box { width: 300px; height: 300px; background: #4CAF50; }
</style>
          `
        },
        {
          name: 'Page Transition',
          code: `
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const currentPage = ref('home')

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.5,
    opacity: 0,
    y: 20,
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    y: -20,
    onComplete: done
  })
}
</script>

<template>
  <nav>
    <button @click="currentPage = 'home'">Home</button>
    <button @click="currentPage = 'about'">About</button>
  </nav>
  
  <Transition @enter="onEnter" @leave="onLeave">
    <div :key="currentPage" class="page">
      <h1>{{ currentPage }}</h1>
    </div>
  </Transition>
</template>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Modal with Backdrop Animation',
      description: 'Complete modal with animated backdrop and content',
      code: `
<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const isOpen = ref(false)

const onBackdropEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.3,
    opacity: 0,
    onComplete: done
  })
}

const onBackdropLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    onComplete: done
  })
}

const onModalEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.5,
    opacity: 0,
    scale: 0.8,
    ease: 'back.out',
    onComplete: done
  })
}

const onModalLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    scale: 0.8,
    onComplete: done
  })
}
</script>

<template>
  <button @click="isOpen = true">Open Modal</button>
  
  <Teleport to="body">
    <Transition @enter="onBackdropEnter" @leave="onBackdropLeave">
      <div v-if="isOpen" class="backdrop" @click="isOpen = false"></div>
    </Transition>
    
    <Transition @enter="onModalEnter" @leave="onModalLeave">
      <div v-if="isOpen" class="modal" @click.stop>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
        <button @click="isOpen = false">Close</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
      `
    },
    {
      title: 'Animated List with Filters',
      description: 'List with animated filtering and sorting',
      code: `
<script setup>
import { ref, computed } from 'vue'
import gsap from 'gsap'

const items = ref([
  { id: 1, name: 'Item 1', category: 'A' },
  { id: 2, name: 'Item 2', category: 'B' },
  { id: 3, name: 'Item 3', category: 'A' }
])

const filter = ref('')

const filteredItems = computed(() => {
  return items.value.filter(item =>
    item.name.toLowerCase().includes(filter.value.toLowerCase())
  )
})

const onEnter = (el, done) => {
  gsap.from(el, {
    duration: 0.4,
    opacity: 0,
    x: -20,
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    opacity: 0,
    x: 20,
    onComplete: done
  })
}
</script>

<template>
  <div>
    <input v-model="filter" placeholder="Filter items..." />
    
    <TransitionGroup @enter="onEnter" @leave="onLeave" tag="ul">
      <li v-for="item in filteredItems" :key="item.id">
        {{ item.name }} ({{ item.category }})
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
ul { list-style: none; padding: 0; }
li { padding: 0.5rem; margin: 0.5rem 0; background: #f0f0f0; border-radius: 4px; }
</style>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use CSS transitions for simple animations',
      'Use JavaScript hooks for complex animations',
      'Always call done() in animation hooks',
      'Use GSAP for professional animations',
      'Test animations on slower devices',
      'Provide fallback for users who prefer reduced motion',
      'Keep animations under 500ms for UI feedback',
      'Use easing functions for natural motion',
      'Combine multiple animations for complex effects',
      'Monitor performance with DevTools'
    ],
    donts: [
      'Don\'t animate too many elements simultaneously',
      'Don\'t use long animation durations',
      'Don\'t forget to call done() callback',
      'Don\'t use animations to hide poor UX',
      'Don\'t animate on every state change',
      'Don\'t use animations for critical interactions',
      'Don\'t ignore accessibility (prefers-reduced-motion)',
      'Don\'t create janky animations',
      'Don\'t use animations without purpose',
      'Don\'t forget to test on real devices'
    ]
  },

  vue35Features: `
Vue 3.5+ animation enhancements:
- Better animation performance
- Improved transition handling
- Enhanced JavaScript hooks
- Better GSAP integration
- Improved DevTools support
- Better error handling
  `,

  typescriptIntegration: `
// TypeScript examples for animations

import type { TransitionProps } from 'vue'

interface AnimationHooks {
  onBeforeEnter: (el: Element) => void
  onEnter: (el: Element, done: () => void) => void
  onAfterEnter: (el: Element) => void
  onLeave: (el: Element, done: () => void) => void
}

const animationHooks: AnimationHooks = {
  onBeforeEnter: (el) => {},
  onEnter: (el, done) => { done() },
  onAfterEnter: (el) => {},
  onLeave: (el, done) => { done() }
}
  `,

  testingStrategies: `
Testing animations:

1. Animation Timing:
   - Test animation duration
   - Test animation completion
   - Test animation callbacks

2. Visual Testing:
   - Test animation appearance
   - Test animation smoothness
   - Test on different devices

3. Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('animation completes', async () => {
  const wrapper = mount(AnimatedComponent)
  const done = jest.fn()
  
  wrapper.vm.onEnter(wrapper.element, done)
  await new Promise(resolve => setTimeout(resolve, 600))
  
  expect(done).toHaveBeenCalled()
})
\`\`\`
  `,

  troubleshooting: `
Common animation issues:

1. Animation not playing:
   - Verify CSS is defined
   - Check transition name matches
   - Ensure done() is called

2. Animation stuttering:
   - Reduce animation complexity
   - Check for performance issues
   - Use will-change CSS property

3. Animation not completing:
   - Verify done() callback is called
   - Check animation duration
   - Test with simpler animation

4. Performance issues:
   - Reduce number of animated elements
   - Use GPU acceleration
   - Profile with DevTools
  `,

  summary: `
Animations bring Vue applications to life:

- CSS transitions for simple animations
- JavaScript hooks for complex animations
- GSAP for professional animations
- TransitionGroup for list animations
- Performance optimization techniques

Key takeaways:
1. Use CSS for simple animations
2. Use JavaScript hooks for control
3. Always call done() callback
4. Use GSAP for complex animations
5. Test on real devices
6. Respect prefers-reduced-motion
7. Keep animations purposeful
8. Monitor performance
9. Combine animations for effects
10. Document animation patterns

Next steps: Build animated UI components, explore GSAP advanced features, and optimize animation performance.
  `
}

export default animationsLesson
