export const serverComponentsLesson = {
  id: 'server-components',
  title: 'React Server Components (React 19 Stable)',
  titleFa: 'کامپوننت‌های سمت سرور (ری‌اکت ۱۹ پایدار)',
  difficulty: 'hard',
  estimatedTime: '60 min',

  content: `
# React Server Components (React 19 Stable)

## Definition
React Server Components (RSC) are now stable in React 19 and represent a fundamental shift in how we build React applications. They render exclusively on the server, can access backend resources directly, and send zero JavaScript to the client for that specific component.

## Key Features
- **Zero Bundle Size**: Server logic stays on the server, dramatically reducing client JavaScript
- **Direct Backend Access**: Access databases, file systems, and APIs directly without additional layers
- **Enhanced Performance**: React 19 optimizations make RSCs faster and more efficient
- **Seamless Streaming**: Better integration with Suspense for progressive loading
- **Actions Integration**: Perfect compatibility with React 19 Actions for form handling

---

## 1. Server Components vs Client Components

### Server Component Example
Server Components run on the server and can access backend resources directly:

\`\`\`jsx
// This is a Server Component (default in React 19)
import { db } from './lib/database';

async function ProductList({ category }) {
  // Direct database access - runs on server only
  const products = await db.product.findMany({
    where: { category },
    include: { reviews: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="product-list">
      <h2>Products in {category}</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span className="price">Price: {product.price}</span>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### Client Component Example
Client Components run in the browser and handle interactivity:

\`\`\`jsx
'use client';
import { useState } from 'react';

function ProductFilter({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="product-filter">
      <h3>Category</h3>
      {['all', 'electronics', 'clothing', 'books'].map(category => (
        <label key={category}>
          <input
            type="radio"
            name="category"
            value={category}
            checked={selectedCategory === category}
            onChange={() => setSelectedCategory(category)}
          />
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </label>
      ))}
    </div>
  );
}
\`\`\`

---

## 2. Data Fetching in Server Components

Server Components can access databases directly without API layers:

\`\`\`jsx
import { db } from './lib/database';
import { cache } from 'react';

const getProduct = cache(async (productId) => {
  return await db.product.findUnique({
    where: { id: productId },
    include: { 
      reviews: { take: 5, orderBy: { createdAt: 'desc' } },
      variants: true,
      category: true
    }
  });
});

async function ProductPage({ productId }) {
  const product = await getProduct(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div className="price">Price: {product.price}</div>
    </div>
  );
}
\`\`\`

---

## 3. Server Components with Actions

Server Components work seamlessly with React 19 Actions:

\`\`\`jsx
// Server Action
async function createProduct(formData) {
  'use server';
  
  const name = formData.get('name');
  const description = formData.get('description');
  const price = parseFloat(formData.get('price'));
  
  try {
    const product = await db.product.create({
      data: { name, description, price }
    });
    
    return { success: true, productId: product.id };
  } catch (error) {
    return { error: 'Failed to create product' };
  }
}

// Server Component with form
function CreateProductForm() {
  return (
    <form action={createProduct} className="create-product-form">
      <h2>Create New Product</h2>
      
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={4} required />
      </div>
      
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" step="0.01" min="0" required />
      </div>
      
      <button type="submit">Create Product</button>
    </form>
  );
}
\`\`\`

---

## 4. Best Practices

### Do's ✅
- **Use Server Components for data fetching** - Access databases and APIs directly
- **Keep Server Components pure** - Avoid side effects and state
- **Use Client Components for interactivity** - Handle user interactions and state
- **Implement proper error boundaries** - Handle server-side errors gracefully
- **Cache expensive operations** - Use React's cache function for database queries

### Don'ts ❌
- **Don't use hooks in Server Components** - useState, useEffect, etc. are not available
- **Don't access browser APIs** - window, document, localStorage are not available
- **Don't mix server and client logic** - Keep concerns separated
- **Don't forget error handling** - Server operations can fail

---

## Summary

React Server Components in React 19 provide:

1. **Zero Bundle Impact**: Server logic stays on the server
2. **Direct Backend Access**: No need for API layers for data fetching
3. **Enhanced Performance**: Faster initial page loads and better SEO
4. **Seamless Integration**: Perfect compatibility with Actions and concurrent features
5. **Better Developer Experience**: Simplified data fetching and error handling

Server Components represent the future of React applications, enabling better performance, simpler architectures, and enhanced user experiences.
`,

  contentFa: `
# کامپوننت‌های سمت سرور (ری‌اکت ۱۹ پایدار)

## تعریف
کامپوننت‌های سمت سرور (RSC) اکنون در ری‌اکت ۱۹ پایدار هستند و تغییر بنیادی در نحوه ساخت اپلیکیشن‌های ری‌اکت را نمایندگی می‌کنند. آن‌ها منحصراً در سرور رندر می‌شوند، می‌توانند مستقیماً به منابع بک‌اند دسترسی داشته باشند و هیچ جاوااسکریپتی برای آن کامپوننت خاص به کلاینت ارسال نمی‌کنند.

## ویژگی‌های اصلی
- **حجم بسته صفر**: منطق سرور در سرور باقی می‌ماند و جاوااسکریپت کلاینت را کاهش می‌دهد
- **دسترسی مستقیم بک‌اند**: دسترسی مستقیم به پایگاه داده، سیستم فایل و APIها
- **عملکرد بهبود یافته**: بهینه‌سازی‌های ری‌اکت ۱۹ RSCها را سریع‌تر می‌کند
- **استریمینگ یکپارچه**: یکپارچگی بهتر با Suspense برای بارگذاری تدریجی
- **یکپارچگی Actions**: سازگاری کامل با Actions ری‌اکت ۱۹

---

## ۱. کامپوننت‌های سرور در مقابل کامپوننت‌های کلاینت

### مثال کامپوننت سرور
کامپوننت‌های سرور در سرور اجرا می‌شوند و می‌توانند مستقیماً به منابع بک‌اند دسترسی داشته باشند:

\`\`\`jsx
// این یک کامپوننت سرور است (پیش‌فرض در ری‌اکت ۱۹)
import { db } from './lib/database';

async function ProductList({ category }) {
  // دسترسی مستقیم به پایگاه داده - فقط در سرور اجرا می‌شود
  const products = await db.product.findMany({
    where: { category },
    include: { reviews: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="product-list">
      <h2>محصولات در {category}</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <span className="price">قیمت: {product.price} تومان</span>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### مثال کامپوننت کلاینت
کامپوننت‌های کلاینت در مرورگر اجرا می‌شوند و تعاملات را مدیریت می‌کنند:

\`\`\`jsx
'use client';
import { useState } from 'react';

function ProductFilter({ onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="product-filter">
      <h3>دسته‌بندی</h3>
      {['all', 'electronics', 'clothing', 'books'].map(category => (
        <label key={category}>
          <input
            type="radio"
            name="category"
            value={category}
            checked={selectedCategory === category}
            onChange={() => setSelectedCategory(category)}
          />
          {category === 'all' ? 'همه' : category}
        </label>
      ))}
    </div>
  );
}
\`\`\`

---

## خلاصه

کامپوننت‌های سمت سرور در ری‌اکت ۱۹ ارائه می‌دهند:

۱. **تأثیر صفر بر بسته**: منطق سرور در سرور باقی می‌ماند
۲. **دسترسی مستقیم بک‌اند**: نیازی به لایه‌های API برای دریافت داده نیست
۳. **عملکرد بهبود یافته**: بارگذاری اولیه سریع‌تر صفحات و SEO بهتر
۴. **یکپارچگی یکپارچه**: سازگاری کامل با Actions و ویژگی‌های همزمان
۵. **تجربه توسعه‌دهنده بهتر**: دریافت داده و مدیریت خطای ساده‌شده

کامپوننت‌های سرور آینده اپلیکیشن‌های ری‌اکت را نمایندگی می‌کنند و عملکرد بهتر، معماری‌های ساده‌تر و تجربه‌های کاربری بهبود یافته را امکان‌پذیر می‌سازند.
`,

  visualizationId: 'server-components',
  exerciseId: 'server-components',
};

export default serverComponentsLesson;