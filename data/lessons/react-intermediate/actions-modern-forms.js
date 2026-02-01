export const actionsModernFormsLesson = {
  id: 'actions-modern-forms',
  title: 'React 19 Actions & Modern Form Handling',
  titleFa: 'Actions ری‌اکت ۱۹ و مدیریت مدرن فرم‌ها',
  difficulty: 'medium',
  estimatedTime: '75 min',

  content: `
# React 19 Actions & Modern Form Handling

## Definition
**Actions** are React 19's revolutionary approach to handling asynchronous operations, particularly form submissions. They automatically manage pending states, errors, optimistic updates, and sequential requests, eliminating the need for manual state management in most form scenarios.

## Key Features
- **Automatic State Management**: No more manual \`useState\` for loading/error states
- **Built-in Pending States**: Automatic loading indicators during async operations
- **Error Handling**: Centralized error management with automatic UI updates
- **Progressive Enhancement**: Forms work without JavaScript, enhanced with React
- **Server Integration**: Seamless integration with Server Actions
- **Optimistic Updates**: Built-in support for immediate UI feedback

---

## 1. Understanding Actions

### What Problems Do Actions Solve?
Before Actions, form handling required extensive boilerplate:

\`\`\`jsx
// Old way - lots of manual state management
function OldFormExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await submitForm(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of component
}
\`\`\`

### Actions Simplify Everything
\`\`\`jsx
// New way with Actions - much cleaner
import { useActionState } from 'react';

async function submitForm(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Validation
  if (!name || !email) {
    return { error: 'All fields are required' };
  }
  
  // API call
  try {
    await api.submitForm({ name, email });
    return { success: true, message: 'Form submitted successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}

function ModernFormExample() {
  const [state, formAction, isPending] = useActionState(submitForm, {});

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      
      {state.error && <div className="error">{state.error}</div>}
      {state.success && <div className="success">{state.message}</div>}
      
      <button disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
\`\`\`

---

## 2. useActionState Hook Deep Dive

### Basic Syntax
\`\`\`jsx
const [state, formAction, isPending] = useActionState(actionFunction, initialState);
\`\`\`

- **state**: Current state returned by the action function
- **formAction**: Function to pass to form's \`action\` prop
- **isPending**: Boolean indicating if action is currently running

### Advanced useActionState Example
\`\`\`jsx
async function updateUserProfile(prevState, formData) {
  const profile = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    bio: formData.get('bio'),
    avatar: formData.get('avatar')
  };

  // Client-side validation
  const errors = {};
  if (!profile.firstName.trim()) errors.firstName = 'First name is required';
  if (!profile.lastName.trim()) errors.lastName = 'Last name is required';
  if (!profile.email.includes('@')) errors.email = 'Valid email is required';
  if (profile.bio.length > 500) errors.bio = 'Bio must be under 500 characters';

  if (Object.keys(errors).length > 0) {
    return { errors, ...profile };
  }

  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate server validation
    const existingUser = await checkEmailExists(profile.email);
    if (existingUser && existingUser.id !== prevState.userId) {
      return { 
        errors: { email: 'Email already in use' },
        ...profile 
      };
    }

    // Update profile
    const updatedUser = await api.updateProfile(profile);
    
    return {
      success: true,
      message: 'Profile updated successfully!',
      user: updatedUser,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      errors: { general: 'Failed to update profile. Please try again.' },
      ...profile
    };
  }
}

function ProfileUpdateForm({ initialUser }) {
  const [state, formAction, isPending] = useActionState(updateUserProfile, {
    userId: initialUser.id,
    firstName: initialUser.firstName || '',
    lastName: initialUser.lastName || '',
    email: initialUser.email || '',
    bio: initialUser.bio || '',
    errors: {},
    success: false
  });

  return (
    <div className="profile-form">
      <h2>Update Profile</h2>
      
      <form action={formAction}>
        {/* General error message */}
        {state.errors?.general && (
          <div className="alert alert-error" role="alert">
            {state.errors.general}
          </div>
        )}

        {/* Success message */}
        {state.success && (
          <div className="alert alert-success" role="alert">
            {state.message}
            <small>Updated at: {new Date(state.timestamp).toLocaleString()}</small>
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={state.firstName}
              aria-invalid={!!state.errors?.firstName}
              aria-describedby={state.errors?.firstName ? 'firstName-error' : undefined}
            />
            {state.errors?.firstName && (
              <span id="firstName-error" className="error-message">
                {state.errors.firstName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={state.lastName}
              aria-invalid={!!state.errors?.lastName}
            />
            {state.errors?.lastName && (
              <span className="error-message">{state.errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={state.email}
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && (
            <span className="error-message">{state.errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            defaultValue={state.bio}
            placeholder="Tell us about yourself..."
            aria-invalid={!!state.errors?.bio}
          />
          {state.errors?.bio && (
            <span className="error-message">{state.errors.bio}</span>
          )}
          <small className="form-hint">
            {state.bio.length}/500 characters
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Updating Profile...
              </>
            ) : (
              'Update Profile'
            )}
          </button>
          
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
\`\`\`

---

## 3. useFormStatus Hook

### What is useFormStatus?
\`useFormStatus\` provides access to the status of a parent \`<form>\` as if the form was a Context provider. This is particularly useful for nested components that need to know about the form's submission state.

### Basic Usage
\`\`\`jsx
import { useFormStatus } from 'react-dom';

function SubmitButton({ children, ...props }) {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending} 
      {...props}
    >
      {pending ? 'Submitting...' : children}
    </button>
  );
}

function ContactForm() {
  async function submitContact(prevState, formData) {
    // Action logic here
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true };
  }

  const [state, formAction] = useActionState(submitContact, {});

  return (
    <form action={formAction}>
      <input name="name" placeholder="Your name" required />
      <input name="email" type="email" placeholder="Your email" required />
      <textarea name="message" placeholder="Your message" required />
      
      {/* This button automatically knows about the form's pending state */}
      <SubmitButton>Send Message</SubmitButton>
    </form>
  );
}
\`\`\`

### Advanced useFormStatus Example
\`\`\`jsx
function FormStatusIndicator() {
  const { pending, data, method } = useFormStatus();
  
  if (!pending) return null;
  
  return (
    <div className="form-status">
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
      <p>
        Submitting {data?.get('formType') || 'form'} via {method}...
      </p>
    </div>
  );
}

function SmartFormButton({ children, loadingText, ...props }) {
  const { pending, data } = useFormStatus();
  const formType = data?.get('formType');
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={\`btn \${pending ? 'btn-loading' : 'btn-primary'}\`}
      {...props}
    >
      {pending ? (
        <>
          <span className="spinner"></span>
          {loadingText || \`Processing \${formType}...\`}
        </>
      ) : (
        children
      )}
    </button>
  );
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  
  async function handleFormSubmit(prevState, formData) {
    const step = formData.get('currentStep');
    const formType = formData.get('formType');
    
    // Process based on step
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (step === '3') {
      return { success: true, message: 'Registration completed!' };
    }
    
    return { nextStep: parseInt(step) + 1 };
  }

  const [state, formAction] = useActionState(handleFormSubmit, {});

  return (
    <div className="multi-step-form">
      <FormStatusIndicator />
      
      <form action={formAction}>
        <input type="hidden" name="currentStep" value={currentStep} />
        <input type="hidden" name="formType" value="registration" />
        
        {currentStep === 1 && (
          <div className="step">
            <h3>Step 1: Personal Information</h3>
            <input name="firstName" placeholder="First Name" required />
            <input name="lastName" placeholder="Last Name" required />
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="step">
            <h3>Step 2: Contact Information</h3>
            <input name="email" type="email" placeholder="Email" required />
            <input name="phone" type="tel" placeholder="Phone" required />
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="step">
            <h3>Step 3: Preferences</h3>
            <select name="newsletter">
              <option value="yes">Subscribe to newsletter</option>
              <option value="no">No newsletter</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn btn-secondary"
            >
              Previous
            </button>
          )}
          
          <SmartFormButton 
            loadingText="Processing registration..."
          >
            {currentStep === 3 ? 'Complete Registration' : 'Next Step'}
          </SmartFormButton>
        </div>
      </form>
    </div>
  );
}
\`\`\`

---

## 4. Server Actions Integration

### What are Server Actions?
Server Actions are async functions that run on the server and can be called directly from client components. They're perfect for form submissions that need to interact with databases or external APIs.

### Basic Server Action
\`\`\`jsx
// actions/user-actions.js (Server-side)
'use server';

import { db } from '@/lib/database';
import { revalidatePath } from 'next/cache';

export async function createUser(prevState, formData) {
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role') || 'user'
  };

  // Server-side validation
  if (!userData.name || !userData.email) {
    return { 
      error: 'Name and email are required',
      ...userData 
    };
  }

  try {
    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      return { 
        error: 'User with this email already exists',
        ...userData 
      };
    }

    // Create user
    const newUser = await db.user.create({
      data: userData
    });

    // Revalidate the users page to show the new user
    revalidatePath('/users');

    return { 
      success: true, 
      message: 'User created successfully!',
      user: newUser 
    };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { 
      error: 'Failed to create user. Please try again.',
      ...userData 
    };
  }
}
\`\`\`

### Client Component Using Server Action
\`\`\`jsx
// components/CreateUserForm.jsx (Client-side)
'use client';

import { useActionState } from 'react';
import { createUser } from '@/actions/user-actions';

export function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    name: '',
    email: '',
    role: 'user'
  });

  return (
    <form action={formAction} className="create-user-form">
      <h2>Create New User</h2>
      
      {state.error && (
        <div className="alert alert-error">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="alert alert-success">
          {state.message}
          <p>User ID: {state.user?.id}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={state.name}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.email}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" defaultValue={state.role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating User...' : 'Create User'}
      </button>
    </form>
  );
}
\`\`\`

---

## 5. Error Handling Patterns

### Comprehensive Error Handling
\`\`\`jsx
async function robustFormAction(prevState, formData) {
  try {
    // Input validation
    const data = validateFormData(formData);
    if (data.errors) {
      return { errors: data.errors, ...data.values };
    }

    // Business logic validation
    const businessValidation = await validateBusinessRules(data.values);
    if (!businessValidation.valid) {
      return { 
        errors: { business: businessValidation.message },
        ...data.values 
      };
    }

    // API call with retry logic
    const result = await retryApiCall(
      () => api.submitData(data.values),
      { maxRetries: 3, delay: 1000 }
    );

    return { 
      success: true, 
      data: result,
      message: 'Operation completed successfully!' 
    };

  } catch (error) {
    // Log error for debugging
    console.error('Form action failed:', error);

    // Return user-friendly error
    if (error.name === 'ValidationError') {
      return { 
        errors: { validation: error.message },
        ...Object.fromEntries(formData)
      };
    }

    if (error.name === 'NetworkError') {
      return { 
        errors: { network: 'Network error. Please check your connection.' },
        ...Object.fromEntries(formData)
      };
    }

    return { 
      errors: { general: 'An unexpected error occurred. Please try again.' },
      ...Object.fromEntries(formData)
    };
  }
}

function RobustForm() {
  const [state, formAction, isPending] = useActionState(robustFormAction, {});

  return (
    <form action={formAction}>
      {/* Error display component */}
      <ErrorDisplay errors={state.errors} />
      
      {/* Success display */}
      {state.success && (
        <SuccessMessage message={state.message} data={state.data} />
      )}

      {/* Form fields */}
      <FormFields state={state} />

      {/* Submit button with loading state */}
      <SubmitButton isPending={isPending} />
    </form>
  );
}

function ErrorDisplay({ errors }) {
  if (!errors) return null;

  return (
    <div className="error-container">
      {errors.general && (
        <div className="alert alert-error">
          {errors.general}
        </div>
      )}
      
      {errors.network && (
        <div className="alert alert-warning">
          <strong>Connection Issue:</strong> {errors.network}
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}
      
      {errors.business && (
        <div className="alert alert-info">
          {errors.business}
        </div>
      )}
    </div>
  );
}
\`\`\`

---

## 6. Best Practices

### Do's ✅
- **Use Actions for all form submissions** in React 19 applications
- **Provide immediate feedback** with isPending state
- **Handle errors gracefully** with user-friendly messages
- **Use progressive enhancement** - forms should work without JavaScript
- **Validate on both client and server** for security and UX
- **Use useFormStatus** for nested components that need form state
- **Implement proper accessibility** with ARIA attributes
- **Use defaultValue** with Actions (not value)

### Don'ts ❌
- **Don't mix Actions with traditional onSubmit** handlers
- **Don't forget to handle edge cases** and network errors
- **Don't skip server-side validation** even with client validation
- **Don't ignore accessibility** requirements
- **Don't use Actions for non-form async operations** (use useTransition instead)
- **Don't forget to handle the pending state** in your UI

### Performance Tips
- **Debounce validation** for real-time feedback
- **Use React.memo** for expensive form components
- **Implement proper error boundaries** for form sections
- **Consider using Suspense** for data-dependent forms

---

## Summary

React 19 Actions revolutionize form handling by:

1. **Eliminating Boilerplate**: No more manual state management for loading/error states
2. **Improving UX**: Built-in pending states and error handling
3. **Enhancing Accessibility**: Progressive enhancement and proper ARIA support
4. **Simplifying Server Integration**: Seamless Server Actions integration
5. **Reducing Bugs**: Centralized error handling and validation

Actions represent the future of form handling in React, making applications more robust, accessible, and maintainable while providing excellent user experience out of the box.
`,

  contentFa: `
# Actions ری‌اکت ۱۹ و مدیریت مدرن فرم‌ها

## تعریف
**Actions** رویکرد انقلابی ری‌اکت ۱۹ برای مدیریت عملیات ناهمزمان، به ویژه ارسال فرم‌ها هستند. آنها به صورت خودکار وضعیت‌های انتظار، خطاها، بروزرسانی‌های خوش‌بینانه و درخواست‌های متوالی را مدیریت می‌کنند و نیاز به مدیریت دستی استیت در اکثر سناریوهای فرم را حذف می‌کنند.

## ویژگی‌های اصلی
- **مدیریت خودکار استیت**: دیگر نیازی به \`useState\` دستی برای وضعیت‌های لودینگ/خطا نیست
- **وضعیت‌های انتظار داخلی**: نشانگرهای لودینگ خودکار در طول عملیات async
- **مدیریت خطا**: مدیریت متمرکز خطا با بروزرسانی‌های خودکار UI
- **بهبود تدریجی**: فرم‌ها بدون جاوااسکریپت کار می‌کنند، با ری‌اکت بهبود می‌یابند
- **یکپارچگی سرور**: ادغام یکپارچه با Server Actions
- **بروزرسانی‌های خوش‌بینانه**: پشتیبانی داخلی برای بازخورد فوری UI

---

## ۱. درک Actions

### Actions چه مشکلاتی را حل می‌کنند؟
قبل از Actions، مدیریت فرم نیاز به کد اضافی زیادی داشت:

\`\`\`jsx
// روش قدیمی - مدیریت دستی زیاد استیت
function OldFormExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await submitForm(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... بقیه کامپوننت
}
\`\`\`

### Actions همه چیز را ساده می‌کنند
\`\`\`jsx
// روش جدید با Actions - بسیار تمیزتر
import { useActionState } from 'react';

async function submitForm(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // اعتبارسنجی
  if (!name || !email) {
    return { error: 'تمام فیلدها الزامی هستند' };
  }
  
  // فراخوانی API
  try {
    await api.submitForm({ name, email });
    return { success: true, message: 'فرم با موفقیت ارسال شد!' };
  } catch (error) {
    return { error: error.message };
  }
}

function ModernFormExample() {
  const [state, formAction, isPending] = useActionState(submitForm, {});

  return (
    <form action={formAction}>
      <input name="name" required />
      <input name="email" type="email" required />
      
      {state.error && <div className="error">{state.error}</div>}
      {state.success && <div className="success">{state.message}</div>}
      
      <button disabled={isPending}>
        {isPending ? 'در حال ارسال...' : 'ارسال'}
      </button>
    </form>
  );
}
\`\`\`

---

## ۲. بررسی عمیق هوک useActionState

### نحو پایه
\`\`\`jsx
const [state, formAction, isPending] = useActionState(actionFunction, initialState);
\`\`\`

- **state**: استیت فعلی برگردانده شده توسط تابع action
- **formAction**: تابعی که به prop \`action\` فرم پاس می‌شود
- **isPending**: Boolean که نشان می‌دهد آیا action در حال اجرا است

### مثال پیشرفته useActionState
\`\`\`jsx
async function updateUserProfile(prevState, formData) {
  const profile = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    bio: formData.get('bio'),
    avatar: formData.get('avatar')
  };

  // اعتبارسنجی سمت کلاینت
  const errors = {};
  if (!profile.firstName.trim()) errors.firstName = 'نام الزامی است';
  if (!profile.lastName.trim()) errors.lastName = 'نام خانوادگی الزامی است';
  if (!profile.email.includes('@')) errors.email = 'ایمیل معتبر الزامی است';
  if (profile.bio.length > 500) errors.bio = 'بیوگرافی باید کمتر از ۵۰۰ کاراکتر باشد';

  if (Object.keys(errors).length > 0) {
    return { errors, ...profile };
  }

  try {
    // شبیه‌سازی تأخیر API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // شبیه‌سازی اعتبارسنجی سرور
    const existingUser = await checkEmailExists(profile.email);
    if (existingUser && existingUser.id !== prevState.userId) {
      return { 
        errors: { email: 'این ایمیل قبلاً استفاده شده است' },
        ...profile 
      };
    }

    // بروزرسانی پروفایل
    const updatedUser = await api.updateProfile(profile);
    
    return {
      success: true,
      message: 'پروفایل با موفقیت بروزرسانی شد!',
      user: updatedUser,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      errors: { general: 'بروزرسانی پروفایل ناموفق بود. لطفاً دوباره تلاش کنید.' },
      ...profile
    };
  }
}

function ProfileUpdateForm({ initialUser }) {
  const [state, formAction, isPending] = useActionState(updateUserProfile, {
    userId: initialUser.id,
    firstName: initialUser.firstName || '',
    lastName: initialUser.lastName || '',
    email: initialUser.email || '',
    bio: initialUser.bio || '',
    errors: {},
    success: false
  });

  return (
    <div className="profile-form">
      <h2>بروزرسانی پروفایل</h2>
      
      <form action={formAction}>
        {/* پیام خطای عمومی */}
        {state.errors?.general && (
          <div className="alert alert-error" role="alert">
            {state.errors.general}
          </div>
        )}

        {/* پیام موفقیت */}
        {state.success && (
          <div className="alert alert-success" role="alert">
            {state.message}
            <small>بروزرسانی شده در: {new Date(state.timestamp).toLocaleString('fa-IR')}</small>
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="firstName">نام</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              defaultValue={state.firstName}
              aria-invalid={!!state.errors?.firstName}
              aria-describedby={state.errors?.firstName ? 'firstName-error' : undefined}
            />
            {state.errors?.firstName && (
              <span id="firstName-error" className="error-message">
                {state.errors.firstName}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">نام خانوادگی</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              defaultValue={state.lastName}
              aria-invalid={!!state.errors?.lastName}
            />
            {state.errors?.lastName && (
              <span className="error-message">{state.errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">ایمیل</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={state.email}
            aria-invalid={!!state.errors?.email}
          />
          {state.errors?.email && (
            <span className="error-message">{state.errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="bio">بیوگرافی</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            defaultValue={state.bio}
            placeholder="درباره خود بگویید..."
            aria-invalid={!!state.errors?.bio}
          />
          {state.errors?.bio && (
            <span className="error-message">{state.errors.bio}</span>
          )}
          <small className="form-hint">
            {state.bio.length}/۵۰۰ کاراکتر
          </small>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                در حال بروزرسانی پروفایل...
              </>
            ) : (
              'بروزرسانی پروفایل'
            )}
          </button>
          
          <button type="reset" className="btn btn-secondary">
            بازنشانی
          </button>
        </div>
      </form>
    </div>
  );
}
\`\`\`

---

## ۳. هوک useFormStatus

### useFormStatus چیست؟
\`useFormStatus\` دسترسی به وضعیت یک \`<form>\` والد را فراهم می‌کند، گویی که فرم یک Context provider است. این برای کامپوننت‌های تودرتو که نیاز به دانستن وضعیت ارسال فرم دارند، بسیار مفید است.

### استفاده پایه
\`\`\`jsx
import { useFormStatus } from 'react-dom';

function SubmitButton({ children, ...props }) {
  const { pending, data, method, action } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending} 
      {...props}
    >
      {pending ? 'در حال ارسال...' : children}
    </button>
  );
}

function ContactForm() {
  async function submitContact(prevState, formData) {
    // منطق Action اینجا
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { success: true };
  }

  const [state, formAction] = useActionState(submitContact, {});

  return (
    <form action={formAction}>
      <input name="name" placeholder="نام شما" required />
      <input name="email" type="email" placeholder="ایمیل شما" required />
      <textarea name="message" placeholder="پیام شما" required />
      
      {/* این دکمه به صورت خودکار از وضعیت pending فرم آگاه است */}
      <SubmitButton>ارسال پیام</SubmitButton>
    </form>
  );
}
\`\`\`

### مثال پیشرفته useFormStatus
\`\`\`jsx
function FormStatusIndicator() {
  const { pending, data, method } = useFormStatus();
  
  if (!pending) return null;
  
  return (
    <div className="form-status">
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
      <p>
        در حال ارسال {data?.get('formType') || 'فرم'} از طریق {method}...
      </p>
    </div>
  );
}

function SmartFormButton({ children, loadingText, ...props }) {
  const { pending, data } = useFormStatus();
  const formType = data?.get('formType');
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className={\`btn \${pending ? 'btn-loading' : 'btn-primary'}\`}
      {...props}
    >
      {pending ? (
        <>
          <span className="spinner"></span>
          {loadingText || \`در حال پردازش \${formType}...\`}
        </>
      ) : (
        children
      )}
    </button>
  );
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  
  async function handleFormSubmit(prevState, formData) {
    const step = formData.get('currentStep');
    const formType = formData.get('formType');
    
    // پردازش بر اساس مرحله
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (step === '3') {
      return { success: true, message: 'ثبت‌نام تکمیل شد!' };
    }
    
    return { nextStep: parseInt(step) + 1 };
  }

  const [state, formAction] = useActionState(handleFormSubmit, {});

  return (
    <div className="multi-step-form">
      <FormStatusIndicator />
      
      <form action={formAction}>
        <input type="hidden" name="currentStep" value={currentStep} />
        <input type="hidden" name="formType" value="registration" />
        
        {currentStep === 1 && (
          <div className="step">
            <h3>مرحله ۱: اطلاعات شخصی</h3>
            <input name="firstName" placeholder="نام" required />
            <input name="lastName" placeholder="نام خانوادگی" required />
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="step">
            <h3>مرحله ۲: اطلاعات تماس</h3>
            <input name="email" type="email" placeholder="ایمیل" required />
            <input name="phone" type="tel" placeholder="تلفن" required />
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="step">
            <h3>مرحله ۳: تنظیمات</h3>
            <select name="newsletter">
              <option value="yes">عضویت در خبرنامه</option>
              <option value="no">بدون خبرنامه</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          {currentStep > 1 && (
            <button 
              type="button" 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="btn btn-secondary"
            >
              مرحله قبل
            </button>
          )}
          
          <SmartFormButton 
            loadingText="در حال پردازش ثبت‌نام..."
          >
            {currentStep === 3 ? 'تکمیل ثبت‌نام' : 'مرحله بعد'}
          </SmartFormButton>
        </div>
      </form>
    </div>
  );
}
\`\`\`

---

## ۴. یکپارچگی Server Actions

### Server Actions چیست؟
Server Actions توابع async هستند که در سرور اجرا می‌شوند و می‌توانند مستقیماً از کامپوننت‌های کلاینت فراخوانی شوند. آنها برای ارسال فرم‌هایی که نیاز به تعامل با دیتابیس یا APIهای خارجی دارند، عالی هستند.

### Server Action پایه
\`\`\`jsx
// actions/user-actions.js (سمت سرور)
'use server';

import { db } from '@/lib/database';
import { revalidatePath } from 'next/cache';

export async function createUser(prevState, formData) {
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    role: formData.get('role') || 'user'
  };

  // اعتبارسنجی سمت سرور
  if (!userData.name || !userData.email) {
    return { 
      error: 'نام و ایمیل الزامی هستند',
      ...userData 
    };
  }

  try {
    // بررسی وجود کاربر
    const existingUser = await db.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      return { 
        error: 'کاربری با این ایمیل قبلاً وجود دارد',
        ...userData 
      };
    }

    // ایجاد کاربر
    const newUser = await db.user.create({
      data: userData
    });

    // بازاعتبارسنجی صفحه کاربران برای نمایش کاربر جدید
    revalidatePath('/users');

    return { 
      success: true, 
      message: 'کاربر با موفقیت ایجاد شد!',
      user: newUser 
    };
  } catch (error) {
    console.error('ایجاد کاربر ناموفق بود:', error);
    return { 
      error: 'ایجاد کاربر ناموفق بود. لطفاً دوباره تلاش کنید.',
      ...userData 
    };
  }
}
\`\`\`

### کامپوننت کلاینت با استفاده از Server Action
\`\`\`jsx
// components/CreateUserForm.jsx (سمت کلاینت)
'use client';

import { useActionState } from 'react';
import { createUser } from '@/actions/user-actions';

export function CreateUserForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    name: '',
    email: '',
    role: 'user'
  });

  return (
    <form action={formAction} className="create-user-form">
      <h2>ایجاد کاربر جدید</h2>
      
      {state.error && (
        <div className="alert alert-error">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="alert alert-success">
          {state.message}
          <p>شناسه کاربر: {state.user?.id}</p>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">نام</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={state.name}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">ایمیل</label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={state.email}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">نقش</label>
        <select id="role" name="role" defaultValue={state.role}>
          <option value="user">کاربر</option>
          <option value="admin">مدیر</option>
          <option value="moderator">ناظر</option>
        </select>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? 'در حال ایجاد کاربر...' : 'ایجاد کاربر'}
      </button>
    </form>
  );
}
\`\`\`

---

## ۵. الگوهای مدیریت خطا

### مدیریت جامع خطا
\`\`\`jsx
async function robustFormAction(prevState, formData) {
  try {
    // اعتبارسنجی ورودی
    const data = validateFormData(formData);
    if (data.errors) {
      return { errors: data.errors, ...data.values };
    }

    // اعتبارسنجی قوانین کسب‌وکار
    const businessValidation = await validateBusinessRules(data.values);
    if (!businessValidation.valid) {
      return { 
        errors: { business: businessValidation.message },
        ...data.values 
      };
    }

    // فراخوانی API با منطق تلاش مجدد
    const result = await retryApiCall(
      () => api.submitData(data.values),
      { maxRetries: 3, delay: 1000 }
    );

    return { 
      success: true, 
      data: result,
      message: 'عملیات با موفقیت تکمیل شد!' 
    };

  } catch (error) {
    // ثبت خطا برای دیباگ
    console.error('Form action ناموفق بود:', error);

    // برگرداندن خطای کاربرپسند
    if (error.name === 'ValidationError') {
      return { 
        errors: { validation: error.message },
        ...Object.fromEntries(formData)
      };
    }

    if (error.name === 'NetworkError') {
      return { 
        errors: { network: 'خطای شبکه. لطفاً اتصال خود را بررسی کنید.' },
        ...Object.fromEntries(formData)
      };
    }

    return { 
      errors: { general: 'خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.' },
      ...Object.fromEntries(formData)
    };
  }
}

function RobustForm() {
  const [state, formAction, isPending] = useActionState(robustFormAction, {});

  return (
    <form action={formAction}>
      {/* کامپوننت نمایش خطا */}
      <ErrorDisplay errors={state.errors} />
      
      {/* نمایش موفقیت */}
      {state.success && (
        <SuccessMessage message={state.message} data={state.data} />
      )}

      {/* فیلدهای فرم */}
      <FormFields state={state} />

      {/* دکمه ارسال با وضعیت لودینگ */}
      <SubmitButton isPending={isPending} />
    </form>
  );
}

function ErrorDisplay({ errors }) {
  if (!errors) return null;

  return (
    <div className="error-container">
      {errors.general && (
        <div className="alert alert-error">
          {errors.general}
        </div>
      )}
      
      {errors.network && (
        <div className="alert alert-warning">
          <strong>مشکل اتصال:</strong> {errors.network}
          <button onClick={() => window.location.reload()}>
            تلاش مجدد
          </button>
        </div>
      )}
      
      {errors.business && (
        <div className="alert alert-info">
          {errors.business}
        </div>
      )}
    </div>
  );
}
\`\`\`

---

## ۶. بهترین شیوه‌ها

### کارهای درست ✅
- **از Actions برای تمام ارسال فرم‌ها** در اپلیکیشن‌های ری‌اکت ۱۹ استفاده کنید
- **بازخورد فوری ارائه دهید** با استیت isPending
- **خطاها را به خوبی مدیریت کنید** با پیام‌های کاربرپسند
- **از بهبود تدریجی استفاده کنید** - فرم‌ها باید بدون جاوااسکریپت کار کنند
- **هم در کلاینت و هم سرور اعتبارسنجی کنید** برای امنیت و UX
- **از useFormStatus استفاده کنید** برای کامپوننت‌های تودرتو که نیاز به استیت فرم دارند
- **دسترسی مناسب پیاده‌سازی کنید** با ویژگی‌های ARIA
- **از defaultValue استفاده کنید** با Actions (نه value)

### کارهای غلط ❌
- **Actions را با هندلرهای سنتی onSubmit** ترکیب نکنید
- **مدیریت حالات لبه** و خطاهای شبکه را فراموش نکنید
- **اعتبارسنجی سمت سرور را نادیده نگیرید** حتی با اعتبارسنجی کلاینت
- **الزامات دسترسی را نادیده نگیرید**
- **از Actions برای عملیات async غیرفرم استفاده نکنید** (به جای آن از useTransition استفاده کنید)
- **مدیریت وضعیت pending** در UI خود را فراموش نکنید

### نکات عملکرد
- **اعتبارسنجی را debounce کنید** برای بازخورد بلادرنگ
- **از React.memo استفاده کنید** برای کامپوننت‌های پرهزینه فرم
- **مرزهای خطای مناسب پیاده‌سازی کنید** برای بخش‌های فرم
- **استفاده از Suspense را در نظر بگیرید** برای فرم‌های وابسته به داده

---

## خلاصه

Actions ری‌اکت ۱۹ مدیریت فرم‌ها را با موارد زیر متحول می‌کنند:

۱. **حذف کد اضافی**: دیگر نیازی به مدیریت دستی استیت برای وضعیت‌های لودینگ/خطا نیست
۲. **بهبود UX**: وضعیت‌های انتظار داخلی و مدیریت خطا
۳. **افزایش دسترسی**: بهبود تدریجی و پشتیبانی مناسب ARIA
۴. **ساده‌سازی یکپارچگی سرور**: ادغام یکپارچه Server Actions
۵. **کاهش باگ‌ها**: مدیریت متمرکز خطا و اعتبارسنجی

Actions آینده مدیریت فرم‌ها در ری‌اکت را نمایندگی می‌کنند و اپلیکیشن‌ها را قوی‌تر، قابل دسترس‌تر و قابل نگهداری‌تر می‌کنند و در عین حال تجربه کاربری عالی از جعبه ارائه می‌دهند.
`,

  visualizationId: 'actions-modern-forms',
  exerciseId: 'actions-modern-forms',
};

export default actionsModernFormsLesson;