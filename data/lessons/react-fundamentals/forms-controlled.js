export const formsControlledLesson = {
  id: 'forms-controlled',
  title: 'Forms and Controlled Components',
  titleFa: 'فرم‌ها و کامپوننت‌های کنترل‌شده',
  difficulty: 'easy',
  estimatedTime: '60 min',

  content: `
# Forms in React - From Basics to React 19

## Definition
Forms in React are used to capture user input and handle user interactions. A **Controlled Component** is an input element whose value is driven by React state, making the state the "single source of truth" for form data. React 19 introduces revolutionary **Actions** that simplify form handling dramatically.

## Key Features
- **Controlled Components**: State-driven input values with instant validation
- **Uncontrolled Components**: Traditional form handling with refs
- **React 19 Actions**: Automatic pending states, error handling, and optimistic updates
- **Form Validation**: Real-time validation with immediate feedback
- **Progressive Enhancement**: Forms work without JavaScript, enhanced with React

---

## 1. Traditional Controlled Components (React 18 & Earlier)

### Basic Controlled Input
In a controlled component, React state controls the input value completely.

\`\`\`jsx
import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted name:', name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <p>Current value: {name}</p>
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

### Handling Multiple Inputs (Traditional Way)
Use a single state object and the \`name\` attribute to manage multiple inputs.

\`\`\`jsx
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>
      </div>
      
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
\`\`\`

---

## 2. React 19 Actions - The Modern Way

### What are Actions?
**Actions** are async functions that handle form submissions automatically. They manage pending states, errors, and optimistic updates without manual state management.

### Basic Action Example
\`\`\`jsx
import { useActionState } from 'react';

// Action function - runs when form is submitted
async function updateProfile(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validation
  if (!name.trim()) {
    return { error: 'Name is required', name: '', email: '' };
  }
  
  if (!email.includes('@')) {
    return { error: 'Valid email is required', name, email: '' };
  }
  
  // Success
  return { 
    success: true, 
    message: 'Profile updated successfully!',
    name, 
    email 
  };
}

function ModernProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, {
    name: '',
    email: '',
    error: null,
    success: false,
    message: ''
  });

  return (
    <form action={formAction}>
      <div>
        <label>
          Name:
          <input 
            name="name" 
            defaultValue={state.name}
            required
          />
        </label>
      </div>
      
      <div>
        <label>
          Email:
          <input 
            name="email" 
            type="email"
            defaultValue={state.email}
            required
          />
        </label>
      </div>

      {state.error && (
        <div className="error" role="alert">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="success" role="alert">
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}
\`\`\`

### Advanced Action with Validation
\`\`\`jsx
async function createUser(prevState, formData) {
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  };

  // Validation
  const errors = {};
  if (!userData.firstName.trim()) errors.firstName = 'First name is required';
  if (!userData.lastName.trim()) errors.lastName = 'Last name is required';
  if (!userData.email.includes('@')) errors.email = 'Valid email is required';
  if (userData.password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (Object.keys(errors).length > 0) {
    return { errors, ...userData };
  }

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate potential server error
    if (userData.email === 'taken@example.com') {
      return { 
        errors: { email: 'Email already exists' },
        ...userData 
      };
    }

    return { 
      success: true, 
      message: 'Account created successfully!',
      user: userData
    };
  } catch (error) {
    return { 
      errors: { general: 'Server error. Please try again.' },
      ...userData 
    };
  }
}

function UserRegistrationForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    firstName: '',
    lastName: '',
    email: '',
    errors: {},
    success: false
  });

  return (
    <form action={formAction}>
      <h2>Create Account</h2>
      
      {state.errors?.general && (
        <div className="error general-error">
          {state.errors.general}
        </div>
      )}

      <div className="form-group">
        <label>
          First Name:
          <input 
            name="firstName" 
            defaultValue={state.firstName}
            aria-invalid={!!state.errors?.firstName}
            aria-describedby={state.errors?.firstName ? 'firstName-error' : undefined}
          />
        </label>
        {state.errors?.firstName && (
          <span id="firstName-error" className="error">
            {state.errors.firstName}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>
          Last Name:
          <input 
            name="lastName" 
            defaultValue={state.lastName}
            aria-invalid={!!state.errors?.lastName}
          />
        </label>
        {state.errors?.lastName && (
          <span className="error">{state.errors.lastName}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          Email:
          <input 
            name="email" 
            type="email"
            defaultValue={state.email}
            aria-invalid={!!state.errors?.email}
          />
        </label>
        {state.errors?.email && (
          <span className="error">{state.errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          Password:
          <input 
            name="password" 
            type="password"
            aria-invalid={!!state.errors?.password}
          />
        </label>
        {state.errors?.password && (
          <span className="error">{state.errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          Confirm Password:
          <input 
            name="confirmPassword" 
            type="password"
            aria-invalid={!!state.errors?.confirmPassword}
          />
        </label>
        {state.errors?.confirmPassword && (
          <span className="error">{state.errors.confirmPassword}</span>
        )}
      </div>

      {state.success && (
        <div className="success">
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
\`\`\`

---

## 3. Uncontrolled Components
Sometimes you need simpler form handling without state management.

\`\`\`jsx
import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value
    };
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        ref={nameRef}
        type="text" 
        placeholder="Name"
        defaultValue="John Doe"
      />
      <input 
        ref={emailRef}
        type="email" 
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

---

## 4. Form Validation Patterns

### Real-time Validation with Controlled Components
\`\`\`jsx
function ValidatedInput({ label, name, type = 'text', validate, ...props }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (touched && validate) {
      const validationError = validate(newValue);
      setError(validationError || '');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      const validationError = validate(value);
      setError(validationError || '');
    }
  };

  return (
    <div className="form-field">
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!error}
          {...props}
        />
      </label>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Usage
function FormWithValidation() {
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return null;
  };

  return (
    <form>
      <ValidatedInput
        label="Email"
        name="email"
        type="email"
        validate={validateEmail}
      />
      <ValidatedInput
        label="Password"
        name="password"
        type="password"
        validate={validatePassword}
      />
    </form>
  );
}
\`\`\`

---

## 5. Best Practices

### Do's ✅
- Use Actions for modern React 19 applications
- Provide immediate feedback for validation errors
- Use semantic HTML and proper accessibility attributes
- Handle loading states to improve user experience
- Use \`defaultValue\` with Actions, \`value\` with controlled components
- Validate on both client and server side

### Don'ts ❌
- Don't mix controlled and uncontrolled patterns in the same form
- Don't forget to handle edge cases and error states
- Don't skip accessibility attributes (aria-invalid, aria-describedby)
- Don't perform expensive operations in onChange handlers
- Don't trust client-side validation alone

---

## Summary

### Traditional Approach (React 18)
- Manual state management with \`useState\`
- Manual form submission with \`onSubmit\`
- Manual loading and error state handling
- More boilerplate code

### Modern Approach (React 19 Actions)
- Automatic state management with \`useActionState\`
- Built-in pending states and error handling
- Progressive enhancement support
- Less boilerplate, more declarative

**React 19 Actions** represent a paradigm shift in form handling, making forms more robust, accessible, and easier to maintain while providing better user experience out of the box.
`,

  contentFa: `
# فرم‌ها در ری‌اکت - از مبانی تا ری‌اکت ۱۹

## تعریف
فرم‌ها در ری‌اکت برای دریافت ورودی کاربر و مدیریت تعاملات استفاده می‌شوند. **کامپوننت کنترل‌شده** المانی است که مقدار آن توسط استیت ری‌اکت کنترل می‌شود و استیت را به "تنها منبع حقیقت" تبدیل می‌کند. ری‌اکت ۱۹ قابلیت انقلابی **Actions** را معرفی کرده که مدیریت فرم‌ها را به شدت ساده می‌کند.

## ویژگی‌های اصلی
- **کامپوننت‌های کنترل‌شده**: مقادیر ورودی مبتنی بر استیت با اعتبارسنجی فوری
- **کامپوننت‌های غیرکنترل‌شده**: مدیریت سنتی فرم‌ها با refs
- **Actions ری‌اکت ۱۹**: وضعیت‌های انتظار، مدیریت خطا و بروزرسانی‌های خوش‌بینانه خودکار
- **اعتبارسنجی فرم**: اعتبارسنجی بلادرنگ با بازخورد فوری
- **بهبود تدریجی**: فرم‌ها بدون جاوااسکریپت کار می‌کنند، با ری‌اکت بهبود می‌یابند

---

## ۱. کامپوننت‌های کنترل‌شده سنتی (ری‌اکت ۱۸ و قبل)

### ورودی کنترل‌شده پایه
در کامپوننت کنترل‌شده، استیت ری‌اکت مقدار ورودی را کاملاً کنترل می‌کند.

\`\`\`jsx
import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('نام ارسال شده:', name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        نام:
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </label>
      <p>مقدار فعلی: {name}</p>
      <button type="submit">ارسال</button>
    </form>
  );
}
\`\`\`

### مدیریت چند ورودی (روش سنتی)
از یک شیء استیت و ویژگی \`name\` برای مدیریت چند ورودی استفاده کنید.

\`\`\`jsx
function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // پاک کردن خطا هنگام شروع تایپ کاربر
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'نام الزامی است';
    if (!formData.email.includes('@')) newErrors.email = 'ایمیل معتبر الزامی است';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // شبیه‌سازی فراخوانی API
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('فرم ارسال شد:', formData);
      alert('فرم با موفقیت ارسال شد!');
    } catch (error) {
      console.error('ارسال ناموفق:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          نام:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>
      </div>
      
      <div>
        <label>
          ایمیل:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'در حال ارسال...' : 'ارسال'}
      </button>
    </form>
  );
}
\`\`\`

---

## ۲. Actions ری‌اکت ۱۹ - روش مدرن

### Actions چیست؟
**Actions** توابع async هستند که ارسال فرم‌ها را به صورت خودکار مدیریت می‌کنند. آنها وضعیت‌های انتظار، خطاها و بروزرسانی‌های خوش‌بینانه را بدون مدیریت دستی استیت کنترل می‌کنند.

### مثال پایه Action
\`\`\`jsx
import { useActionState } from 'react';

// تابع Action - هنگام ارسال فرم اجرا می‌شود
async function updateProfile(prevState, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // شبیه‌سازی فراخوانی API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // اعتبارسنجی
  if (!name.trim()) {
    return { error: 'نام الزامی است', name: '', email: '' };
  }
  
  if (!email.includes('@')) {
    return { error: 'ایمیل معتبر الزامی است', name, email: '' };
  }
  
  // موفقیت
  return { 
    success: true, 
    message: 'پروفایل با موفقیت بروزرسانی شد!',
    name, 
    email 
  };
}

function ModernProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, {
    name: '',
    email: '',
    error: null,
    success: false,
    message: ''
  });

  return (
    <form action={formAction}>
      <div>
        <label>
          نام:
          <input 
            name="name" 
            defaultValue={state.name}
            required
          />
        </label>
      </div>
      
      <div>
        <label>
          ایمیل:
          <input 
            name="email" 
            type="email"
            defaultValue={state.email}
            required
          />
        </label>
      </div>

      {state.error && (
        <div className="error" role="alert">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="success" role="alert">
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'در حال بروزرسانی...' : 'بروزرسانی پروفایل'}
      </button>
    </form>
  );
}
\`\`\`

### Action پیشرفته با اعتبارسنجی
\`\`\`jsx
async function createUser(prevState, formData) {
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  };

  // اعتبارسنجی
  const errors = {};
  if (!userData.firstName.trim()) errors.firstName = 'نام الزامی است';
  if (!userData.lastName.trim()) errors.lastName = 'نام خانوادگی الزامی است';
  if (!userData.email.includes('@')) errors.email = 'ایمیل معتبر الزامی است';
  if (userData.password.length < 8) errors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
  if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = 'رمزهای عبور مطابقت ندارند';
  }

  if (Object.keys(errors).length > 0) {
    return { errors, ...userData };
  }

  try {
    // شبیه‌سازی فراخوانی API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // شبیه‌سازی خطای احتمالی سرور
    if (userData.email === 'taken@example.com') {
      return { 
        errors: { email: 'این ایمیل قبلاً استفاده شده است' },
        ...userData 
      };
    }

    return { 
      success: true, 
      message: 'حساب کاربری با موفقیت ایجاد شد!',
      user: userData
    };
  } catch (error) {
    return { 
      errors: { general: 'خطای سرور. لطفاً دوباره تلاش کنید.' },
      ...userData 
    };
  }
}

function UserRegistrationForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    firstName: '',
    lastName: '',
    email: '',
    errors: {},
    success: false
  });

  return (
    <form action={formAction}>
      <h2>ایجاد حساب کاربری</h2>
      
      {state.errors?.general && (
        <div className="error general-error">
          {state.errors.general}
        </div>
      )}

      <div className="form-group">
        <label>
          نام:
          <input 
            name="firstName" 
            defaultValue={state.firstName}
            aria-invalid={!!state.errors?.firstName}
            aria-describedby={state.errors?.firstName ? 'firstName-error' : undefined}
          />
        </label>
        {state.errors?.firstName && (
          <span id="firstName-error" className="error">
            {state.errors.firstName}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>
          نام خانوادگی:
          <input 
            name="lastName" 
            defaultValue={state.lastName}
            aria-invalid={!!state.errors?.lastName}
          />
        </label>
        {state.errors?.lastName && (
          <span className="error">{state.errors.lastName}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          ایمیل:
          <input 
            name="email" 
            type="email"
            defaultValue={state.email}
            aria-invalid={!!state.errors?.email}
          />
        </label>
        {state.errors?.email && (
          <span className="error">{state.errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          رمز عبور:
          <input 
            name="password" 
            type="password"
            aria-invalid={!!state.errors?.password}
          />
        </label>
        {state.errors?.password && (
          <span className="error">{state.errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label>
          تأیید رمز عبور:
          <input 
            name="confirmPassword" 
            type="password"
            aria-invalid={!!state.errors?.confirmPassword}
          />
        </label>
        {state.errors?.confirmPassword && (
          <span className="error">{state.errors.confirmPassword}</span>
        )}
      </div>

      {state.success && (
        <div className="success">
          {state.message}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'در حال ایجاد حساب...' : 'ایجاد حساب'}
      </button>
    </form>
  );
}
\`\`\`

---

## ۳. کامپوننت‌های غیرکنترل‌شده
گاهی نیاز به مدیریت ساده‌تر فرم بدون مدیریت استیت دارید.

\`\`\`jsx
import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value
    };
    console.log('داده‌های فرم:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        ref={nameRef}
        type="text" 
        placeholder="نام"
        defaultValue="احمد احمدی"
      />
      <input 
        ref={emailRef}
        type="email" 
        placeholder="ایمیل"
      />
      <button type="submit">ارسال</button>
    </form>
  );
}
\`\`\`

---

## ۴. الگوهای اعتبارسنجی فرم

### اعتبارسنجی بلادرنگ با کامپوننت‌های کنترل‌شده
\`\`\`jsx
function ValidatedInput({ label, name, type = 'text', validate, ...props }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (touched && validate) {
      const validationError = validate(newValue);
      setError(validationError || '');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      const validationError = validate(value);
      setError(validationError || '');
    }
  };

  return (
    <div className="form-field">
      <label>
        {label}:
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!error}
          {...props}
        />
      </label>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// استفاده
function FormWithValidation() {
  const validateEmail = (email) => {
    if (!email) return 'ایمیل الزامی است';
    if (!/\S+@\S+\.\S+/.test(email)) return 'ایمیل نامعتبر است';
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return 'رمز عبور الزامی است';
    if (password.length < 8) return 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد';
    }
    return null;
  };

  return (
    <form>
      <ValidatedInput
        label="ایمیل"
        name="email"
        type="email"
        validate={validateEmail}
      />
      <ValidatedInput
        label="رمز عبور"
        name="password"
        type="password"
        validate={validatePassword}
      />
    </form>
  );
}
\`\`\`

---

## ۵. بهترین شیوه‌ها

### کارهای درست ✅
- از Actions برای اپلیکیشن‌های مدرن ری‌اکت ۱۹ استفاده کنید
- بازخورد فوری برای خطاهای اعتبارسنجی ارائه دهید
- از HTML معنایی و ویژگی‌های دسترسی مناسب استفاده کنید
- وضعیت‌های لودینگ را مدیریت کنید تا تجربه کاربری بهبود یابد
- با Actions از \`defaultValue\`، با کامپوننت‌های کنترل‌شده از \`value\` استفاده کنید
- هم در سمت کلاینت و هم سرور اعتبارسنجی کنید

### کارهای غلط ❌
- الگوهای کنترل‌شده و غیرکنترل‌شده را در یک فرم ترکیب نکنید
- مدیریت حالات لبه و خطا را فراموش نکنید
- ویژگی‌های دسترسی را نادیده نگیرید (aria-invalid, aria-describedby)
- عملیات پرهزینه را در هندلرهای onChange انجام ندهید
- فقط به اعتبارسنجی سمت کلاینت اعتماد نکنید

---

## خلاصه

### روش سنتی (ری‌اکت ۱۸)
- مدیریت دستی استیت با \`useState\`
- ارسال دستی فرم با \`onSubmit\`
- مدیریت دستی وضعیت لودینگ و خطا
- کد بیشتر (boilerplate)

### روش مدرن (Actions ری‌اکت ۱۹)
- مدیریت خودکار استیت با \`useActionState\`
- وضعیت‌های انتظار و مدیریت خطای داخلی
- پشتیبانی از بهبود تدریجی
- کد کمتر، رویکرد توصیفی‌تر

**Actions ری‌اکت ۱۹** تغییر پارادایمی در مدیریت فرم‌ها محسوب می‌شود و فرم‌ها را قوی‌تر، قابل دسترس‌تر و قابل نگهداری‌تر می‌کند و در عین حال تجربه کاربری بهتری از جعبه ارائه می‌دهد.
`,

  visualizationId: 'form-handling',
  exerciseId: 'forms-controlled',
};

export default formsControlledLesson;
