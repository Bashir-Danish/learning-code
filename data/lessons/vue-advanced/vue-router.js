// Vue Router - Expanded Lesson (90-120 minutes)
// Comprehensive guide to routing in Vue applications

export const vueRouterLesson = {
  title: 'Vue Router in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Advanced',

  introduction: `
Vue Router is the official router for Vue.js, enabling Single Page Applications (SPAs).
It provides declarative routing, dynamic route matching, nested routes, and navigation guards.

Key concepts:
- Route definitions and configuration
- Dynamic route matching with parameters
- Nested routes and layouts
- Navigation guards for authentication
- Lazy loading routes
- Route transitions
- History management

Vue 3.5+ improvements: Better TypeScript support, improved performance, enhanced route handling.
  `,

  coreConceptsAndExamples: {
    basicRouting: {
      description: 'Basic routing setup and navigation',
      examples: [
        {
          name: 'Router Configuration',
          code: `
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/:pathMatch(.*)*', component: NotFound }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

// App.vue
<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>
  
  <router-view />
</template>
          `
        },
        {
          name: 'Dynamic Routes',
          code: `
// router/index.js
const routes = [
  { path: '/user/:id', component: UserProfile, props: true },
  { path: '/post/:id/comment/:commentId', component: Comment, props: true }
]

// UserProfile.vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id
</script>

<template>
  <div>
    <h1>User {{ userId }}</h1>
  </div>
</template>

// Or with props
<script setup>
defineProps({
  id: String
})
</script>

<template>
  <div>
    <h1>User {{ id }}</h1>
  </div>
</template>
          `
        },
        {
          name: 'Programmatic Navigation',
          code: `
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goToUser = (userId) => {
  router.push({ name: 'user', params: { id: userId } })
}

const goBack = () => {
  router.back()
}

const replaceRoute = () => {
  router.replace('/about')
}
</script>

<template>
  <div>
    <button @click="goHome">Home</button>
    <button @click="goToUser(123)">User 123</button>
    <button @click="goBack">Back</button>
    <button @click="replaceRoute">Replace</button>
  </div>
</template>
          `
        }
      ]
    },

    nestedRoutes: {
      description: 'Nested routes and layouts',
      examples: [
        {
          name: 'Nested Routes',
          code: `
// router/index.js
const routes = [
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardHome },
      { path: 'profile', component: UserProfile },
      { path: 'settings', component: Settings }
    ]
  }
]

// DashboardLayout.vue
<template>
  <div class="dashboard">
    <aside class="sidebar">
      <router-link to="/dashboard">Home</router-link>
      <router-link to="/dashboard/profile">Profile</router-link>
      <router-link to="/dashboard/settings">Settings</router-link>
    </aside>
    
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.dashboard { display: flex; }
.sidebar { width: 200px; }
.content { flex: 1; }
</style>
          `
        }
      ]
    },

    navigationGuards: {
      description: 'Route guards for authentication and validation',
      examples: [
        {
          name: 'Global Navigation Guards',
          code: `
// router/index.js
import { router } from './index'

router.beforeEach((to, from, next) => {
  console.log(\`Navigating from \${from.path} to \${to.path}\`)
  next()
})

router.beforeEach((to, from, next) => {
  // Check authentication
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // Update page title
  document.title = to.meta.title || 'My App'
})

// Routes with meta
const routes = [
  { path: '/login', component: Login },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, title: 'Dashboard' }
  }
]
          `
        },
        {
          name: 'Per-Route Guards',
          code: `
// router/index.js
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const isAdmin = !!localStorage.getItem('isAdmin')
      if (isAdmin) {
        next()
      } else {
        next('/unauthorized')
      }
    }
  }
]

// Component-level guards
<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges) {
    if (confirm('You have unsaved changes. Leave anyway?')) {
      next()
    }
  } else {
    next()
  }
})

onBeforeRouteUpdate((to, from, next) => {
  // Handle route updates
  next()
})
</script>
          `
        }
      ]
    },

    lazyLoading: {
      description: 'Lazy loading routes for performance',
      examples: [
        {
          name: 'Route Code Splitting',
          code: `
// router/index.js
import { defineAsyncComponent } from 'vue'

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true }
  }
]

// With webpack magic comments for chunk naming
const routes = [
  {
    path: '/dashboard',
    component: () => import(
      /* webpackChunkName: "dashboard" */
      '@/views/Dashboard.vue'
    )
  }
]
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Complete Authentication Flow',
      description: 'Full authentication with protected routes',
      code: `
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/register', component: () => import('@/views/Register.vue') },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next('/unauthorized')
  } else {
    next()
  }
})
      `
    },
    {
      title: 'Multi-level Navigation',
      description: 'Complex nested routing with multiple levels',
      code: `
// router/index.js
const routes = [
  {
    path: '/app',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'projects',
        component: () => import('@/layouts/ProjectsLayout.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/ProjectsList.vue')
          },
          {
            path: ':id',
            component: () => import('@/views/ProjectDetail.vue'),
            children: [
              {
                path: 'settings',
                component: () => import('@/views/ProjectSettings.vue')
              }
            ]
          }
        ]
      }
    ]
  }
]
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use named routes for maintainability',
      'Implement route guards for security',
      'Lazy load routes for performance',
      'Use meta fields for route metadata',
      'Handle 404 routes properly',
      'Use router-link for internal navigation',
      'Implement loading states during navigation',
      'Use TypeScript for route types',
      'Test routing logic',
      'Document route structure'
    ],
    donts: [
      'Don\'t use string paths in navigation',
      'Don\'t forget to handle 404 routes',
      'Don\'t load all routes eagerly',
      'Don\'t ignore authentication checks',
      'Don\'t create deeply nested routes',
      'Don\'t use router.push in templates',
      'Don\'t forget to clean up guards',
      'Don\'t ignore route transitions',
      'Don\'t create circular route dependencies',
      'Don\'t forget error handling'
    ]
  },

  vue35Features: `
Vue 3.5+ Vue Router enhancements:
- Better TypeScript support
- Improved route matching
- Enhanced navigation guards
- Better performance
- Improved DevTools integration
  `,

  typescriptIntegration: `
// TypeScript examples for Vue Router

import type { RouteRecordRaw, Router } from 'vue-router'

interface RouteMeta {
  requiresAuth?: boolean
  title?: string
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Home' } as RouteMeta
  }
]
  `,

  testingStrategies: `
Testing routing:

1. Route Navigation:
   - Test route transitions
   - Test route parameters
   - Test navigation guards

2. Component Rendering:
   - Test correct component renders
   - Test route-specific props
   - Test nested routes

Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'

test('navigates to route', async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: Home }]
  })
  
  await router.push('/')
  expect(router.currentRoute.value.path).toBe('/')
})
\`\`\`
  `,

  troubleshooting: `
Common routing issues:

1. Route not matching:
   - Check route order
   - Verify path syntax
   - Check for typos

2. Navigation not working:
   - Verify router is installed
   - Check route exists
   - Verify navigation guard

3. Parameters not updating:
   - Use route.params
   - Watch route changes
   - Check route key

4. Performance issues:
   - Lazy load routes
   - Check for circular dependencies
   - Profile with DevTools
  `,

  summary: `
Vue Router enables powerful SPA navigation:

- Declarative routing
- Dynamic route matching
- Nested routes and layouts
- Navigation guards
- Lazy loading
- History management

Key takeaways:
1. Use named routes
2. Implement route guards
3. Lazy load routes
4. Use meta fields
5. Handle 404 routes
6. Use router-link
7. Implement loading states
8. Use TypeScript
9. Test routing
10. Document routes

Next steps: Build complex SPAs, implement advanced routing patterns, and optimize navigation performance.
  `
}

export default vueRouterLesson
