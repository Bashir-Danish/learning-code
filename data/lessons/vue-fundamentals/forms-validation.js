// Forms & Validation - Expanded Lesson (90-120 minutes)
// Comprehensive guide to form handling and validation in Vue

export const formsValidationLesson = {
  title: 'Forms & Validation in Vue 3.5+',
  duration: '90-120 minutes',
  level: 'Fundamentals',

  introduction: `
Form handling and validation are critical for user input management in Vue applications.
Vue 3.5+ provides v-model for two-way binding and useId() for accessibility.

Key concepts:
- v-model for two-way data binding
- v-model modifiers (.lazy, .number, .trim)
- useId() for accessible form elements
- Form validation patterns
- Error handling and display
- Accessibility considerations
- TypeScript integration

Vue 3.5+ improvements: useId() for accessibility, better form handling, improved validation.
  `,

  coreConceptsAndExamples: {
    vmodel: {
      description: 'Two-way data binding with v-model',
      examples: [
        {
          name: 'Basic v-model',
          code: `
<script setup>
import { ref } from 'vue'

const message = ref('')
const email = ref('')
const age = ref(0)
</script>

<template>
  <div>
    <input v-model="message" placeholder="Enter message" />
    <p>Message: {{ message }}</p>
    
    <input v-model="email" type="email" placeholder="Enter email" />
    <p>Email: {{ email }}</p>
    
    <input v-model.number="age" type="number" placeholder="Enter age" />
    <p>Age: {{ age }} (type: {{ typeof age }})</p>
  </div>
</template>
          `
        },
        {
          name: 'v-model Modifiers',
          code: `
<script setup>
import { ref } from 'vue'

const lazyText = ref('')
const trimmedText = ref('')
const numberValue = ref(0)
</script>

<template>
  <div>
    <!-- .lazy: update on change instead of input -->
    <input v-model.lazy="lazyText" placeholder="Updates on blur" />
    
    <!-- .trim: remove whitespace -->
    <input v-model.trim="trimmedText" placeholder="Whitespace trimmed" />
    
    <!-- .number: cast to number -->
    <input v-model.number="numberValue" type="number" />
    
    <!-- Combine modifiers -->
    <input v-model.lazy.trim="lazyText" placeholder="Lazy and trimmed" />
  </div>
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
  <div>
    <textarea v-model="description" placeholder="Enter description"></textarea>
    <p>{{ description }}</p>
  </div>
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
  <div>
    <!-- Single checkbox -->
    <input type="checkbox" v-model="checked" />
    <p>Checked: {{ checked }}</p>
    
    <!-- Multiple checkboxes -->
    <input type="checkbox" value="John" v-model="checkedNames" />
    <input type="checkbox" value="Jane" v-model="checkedNames" />
    <input type="checkbox" value="Bob" v-model="checkedNames" />
    <p>Selected: {{ checkedNames }}</p>
  </div>
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
  <div>
    <!-- Single select -->
    <select v-model="selected">
      <option value="">Choose</option>
      <option value="A">Option A</option>
      <option value="B">Option B</option>
    </select>
    <p>Selected: {{ selected }}</p>
    
    <!-- Multiple select -->
    <select v-model="selectedMultiple" multiple>
      <option value="A">Option A</option>
      <option value="B">Option B</option>
      <option value="C">Option C</option>
    </select>
    <p>Selected: {{ selectedMultiple }}</p>
  </div>
</template>
          `
        }
      ]
    },

    useId: {
      description: 'Vue 3.5+ useId() for accessibility',
      examples: [
        {
          name: 'useId for Form Labels',
          code: `
<script setup>
import { useId } from 'vue'

const emailId = useId()
const passwordId = useId()
const rememberId = useId()
</script>

<template>
  <form>
    <div>
      <label :for="emailId">Email:</label>
      <input :id="emailId" type="email" v-model="email" />
    </div>
    
    <div>
      <label :for="passwordId">Password:</label>
      <input :id="passwordId" type="password" v-model="password" />
    </div>
    
    <div>
      <input :id="rememberId" type="checkbox" v-model="remember" />
      <label :for="rememberId">Remember me</label>
    </div>
  </form>
</template>
          `
        }
      ]
    },

    validation: {
      description: 'Form validation patterns',
      examples: [
        {
          name: 'Manual Validation',
          code: `
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  password: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.name) {
    errors.value.name = 'Name is required'
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Invalid email format'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

const isValidEmail = (email) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Form is valid', form.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Name:</label>
      <input v-model="form.name" type="text" />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    
    <div>
      <label>Email:</label>
      <input v-model="form.email" type="email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    
    <div>
      <label>Password:</label>
      <input v-model="form.password" type="password" />
      <span v-if="errors.password" class="error">{{ errors.password }}</span>
    </div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
.error { color: red; font-size: 0.9em; }
</style>
          `
        }
      ]
    }
  },

  realWorldScenarios: [
    {
      title: 'Complete Registration Form',
      description: 'Full registration form with validation',
      code: `
<script setup>
import { ref } from 'vue'
import { useId } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const errors = ref({})
const submitted = ref(false)

const firstNameId = useId()
const lastNameId = useId()
const emailId = useId()
const passwordId = useId()
const confirmPasswordId = useId()
const termsId = useId()

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.firstName) errors.value.firstName = 'First name required'
  if (!form.value.lastName) errors.value.lastName = 'Last name required'
  if (!form.value.email) errors.value.email = 'Email required'
  if (!form.value.password) errors.value.password = 'Password required'
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }
  if (!form.value.terms) errors.value.terms = 'Must accept terms'
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    submitted.value = true
    console.log('Form submitted:', form.value)
  }
}
</script>

<template>
  <div class="form-container">
    <h2>Register</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label :for="firstNameId">First Name:</label>
        <input :id="firstNameId" v-model="form.firstName" type="text" />
        <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
      </div>
      
      <div class="form-group">
        <label :for="lastNameId">Last Name:</label>
        <input :id="lastNameId" v-model="form.lastName" type="text" />
        <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
      </div>
      
      <div class="form-group">
        <label :for="emailId">Email:</label>
        <input :id="emailId" v-model="form.email" type="email" />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>
      
      <div class="form-group">
        <label :for="passwordId">Password:</label>
        <input :id="passwordId" v-model="form.password" type="password" />
        <span v-if="errors.password" class="error">{{ errors.password }}</span>
      </div>
      
      <div class="form-group">
        <label :for="confirmPasswordId">Confirm Password:</label>
        <input :id="confirmPasswordId" v-model="form.confirmPassword" type="password" />
        <span v-if="errors.confirmPassword" class="error">{{ errors.confirmPassword }}</span>
      </div>
      
      <div class="form-group">
        <input :id="termsId" v-model="form.terms" type="checkbox" />
        <label :for="termsId">I accept the terms and conditions</label>
        <span v-if="errors.terms" class="error">{{ errors.terms }}</span>
      </div>
      
      <button type="submit">Register</button>
    </form>
    
    <div v-if="submitted" class="success">
      Registration successful!
    </div>
  </div>
</template>

<style scoped>
.form-container { max-width: 400px; margin: 0 auto; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
.error { color: red; font-size: 0.9em; display: block; margin-top: 0.25rem; }
.success { color: green; margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 4px; }
button { background: #007bff; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; }
</style>
      `
    }
  ],

  bestPractices: {
    dos: [
      'Use v-model for two-way binding',
      'Use useId() for accessible form elements',
      'Validate on both client and server',
      'Show clear error messages',
      'Use appropriate input types',
      'Provide helpful placeholders',
      'Use form modifiers (.lazy, .trim, .number)',
      'Test form validation thoroughly',
      'Provide visual feedback',
      'Handle accessibility properly'
    ],
    donts: [
      'Don\'t rely only on client-side validation',
      'Don\'t forget to trim user input',
      'Don\'t use generic error messages',
      'Don\'t forget accessibility labels',
      'Don\'t validate on every keystroke',
      'Don\'t expose sensitive data in errors',
      'Don\'t forget to handle form submission',
      'Don\'t use placeholder as label',
      'Don\'t forget CSRF protection',
      'Don\'t ignore form security'
    ]
  },

  vue35Features: `
Vue 3.5+ form enhancements:
- useId() for generating unique IDs
- Better v-model handling
- Improved form validation
- Enhanced accessibility support
- Better TypeScript support
  `,

  typescriptIntegration: `
// TypeScript examples for forms

interface FormData {
  name: string
  email: string
  password: string
}

interface FormErrors {
  [key: string]: string
}

const form = ref<FormData>({
  name: '',
  email: '',
  password: ''
})

const errors = ref<FormErrors>({})
  `,

  testingStrategies: `
Testing forms:

1. Input Testing:
   - Test v-model binding
   - Test input types
   - Test modifiers

2. Validation Testing:
   - Test validation rules
   - Test error messages
   - Test form submission

3. Accessibility Testing:
   - Test labels and IDs
   - Test keyboard navigation
   - Test screen readers

Example test:
\`\`\`javascript
import { mount } from '@vue/test-utils'

test('form validates email', async () => {
  const wrapper = mount(Form)
  const input = wrapper.find('input[type="email"]')
  
  await input.setValue('invalid')
  expect(wrapper.vm.errors.email).toBeTruthy()
})
\`\`\`
  `,

  troubleshooting: `
Common form issues:

1. v-model not updating:
   - Check input type
   - Verify ref is reactive
   - Check for conflicting handlers

2. Validation not working:
   - Verify validation logic
   - Check error display
   - Test with different inputs

3. Accessibility issues:
   - Add proper labels
   - Use useId() for IDs
   - Test with screen readers

4. Performance issues:
   - Avoid validating on every keystroke
   - Use debouncing for async validation
   - Optimize re-renders
  `,

  summary: `
Form handling is essential for user input:

- v-model for two-way binding
- useId() for accessibility
- Validation for data integrity
- Error handling for UX
- Accessibility for inclusivity

Key takeaways:
1. Use v-model for binding
2. Use useId() for accessibility
3. Validate on client and server
4. Show clear error messages
5. Use appropriate input types
6. Provide helpful feedback
7. Test thoroughly
8. Handle accessibility
9. Secure form submission
10. Optimize performance

Next steps: Build complex forms, explore validation libraries, and optimize form UX.
  `
}

export default formsValidationLesson
