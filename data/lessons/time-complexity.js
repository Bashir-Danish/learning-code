export const timeComplexityLesson = {
  id: 'time-complexity',
  title: 'Time Complexity',
  titleFa: 'پیچیدگی زمانی',
  difficulty: 'easy',
  estimatedTime: '40 min',
  
  content: `
# Time Complexity - How Long Does It Take?

## What is Time Complexity? (Simple Explanation)

Imagine you're reading a book. Time complexity tells you: "If the book doubles in size, how much longer will it take to read?"

**Think of it like this:**
- Like a speedometer for your car, but for code!
- Shows how your code behaves with more data
- The difference between a fast app and one that crashes

---

## Why Should You Care?

**Real example:** A startup wrote code that worked great with 100 users. When they got 10,000 users, the server crashed! Why? Time complexity was O(n²).

| Users | O(n) | O(n²) |
|-------|------|-------|
| 100 | 100 operations | 10,000 operations |
| 10,000 | 10,000 operations | 100,000,000 operations 💥 |

**In interviews:** First question after solving a problem: "What's the time complexity?"

---

## Quick Reference Table

| Complexity | Name | Real Life Example |
|------------|------|-------------------|
| O(1) | Constant | Looking at your watch |
| O(log n) | Logarithmic | Finding a word in dictionary |
| O(n) | Linear | Reading a book page by page |
| O(n log n) | Linearithmic | Smart card sorting |
| O(n²) | Quadratic | Everyone shakes hands with everyone |
| O(2ⁿ) | Exponential | Guessing a password |

---

## Golden Rules for Calculation

### Rule 1: Drop Constants
\`\`\`javascript
// O(2n) → O(n)
for (let i = 0; i < n; i++) { }  // First loop
for (let i = 0; i < n; i++) { }  // Second loop
// Two separate loops = 2n, but we write O(n)
// Why? We care about the growth pattern
\`\`\`

---

### Rule 2: Keep Only the Biggest
\`\`\`javascript
// O(n² + n) → O(n²)
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { }  // This is n²
}
for (let i = 0; i < n; i++) { }      // This is n
// When n = 1000: n² = 1,000,000 but n = 1000
// n is negligible compared to n²!
\`\`\`

---

### Rule 3: Different Inputs = Different Variables
\`\`\`javascript
// O(a × b), NOT O(n²)!
function process(users, products) {
    for (let i = 0; i < users.length; i++) {      // a times
        for (let j = 0; j < products.length; j++) { } // b times
    }
}
// users and products have different sizes
// So we can't say n²
\`\`\`

---

## Practical Examples

### O(1) - Constant (Instant!)
\`\`\`javascript
function getFirst(arr) {
    return arr[0];  // Just one operation!
}

function getByIndex(arr, i) {
    return arr[i];  // Direct memory access
}

// 10 items? Instant!
// 1 million items? Still instant!
\`\`\`

**Like:** Turning on a light. Doesn't matter how big the house is!

---

### O(n) - Linear (Fair)
\`\`\`javascript
function findMax(arr) {
    let max = arr[0];  // Initial assumption
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];  // Found bigger!
        }
    }
    return max;
}
// Must see all to be sure
// n items = n comparisons
\`\`\`

**Like:** Counting people in a room. 10 people = count 10 times.

---

### O(n²) - Quadratic (Slow!)
\`\`\`javascript
function findDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {        // Outer loop
        for (let j = i + 1; j < arr.length; j++) { // Inner loop
            if (arr[i] === arr[j]) {
                console.log('Duplicate:', arr[i]);
            }
        }
    }
}
// Each item compared with all other items
// 10 items → 45 comparisons
// 100 items → 4,950 comparisons
// 1000 items → 499,500 comparisons 😱
\`\`\`

**Warning:** Nested loop = O(n²) danger!

---

### O(log n) - Logarithmic (Very Fast!)
\`\`\`javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;      // Found!
        if (arr[mid] < target) left = mid + 1;    // Right half
        else right = mid - 1;                      // Left half
    }
    return -1;
}
// We halve each time!
// 1,000 items → ~10 steps
// 1,000,000 items → ~20 steps
\`\`\`

**Like:** Guessing a number 1-100. "Above 50?" "Above 75?" → Max 7 guesses!

---

## Common Mistakes

### 1. Thinking Nested Loop is Always O(n²)
❌ Wrong:
\`\`\`javascript
// This is NOT O(n²)!
for (let i = 0; i < n; i++) {
    for (let j = 0; j < 5; j++) { }  // 5 is constant
}
// This is O(5n) = O(n)
\`\`\`

✅ Correct: Inner loop must depend on n to be O(n²).

---

### 2. Forgetting Hidden Operations
❌ Wrong:
\`\`\`javascript
function hasValue(arr, target) {
    return arr.includes(target);  // This is NOT O(1)!
}
// includes() has a loop inside → O(n)
\`\`\`

✅ Correct: Array methods like includes, indexOf, find are all O(n).

---

### 3. Mistakes with Different Inputs
❌ Wrong:
\`\`\`javascript
function merge(arr1, arr2) {
    // This is NOT O(n²)!
    for (let x of arr1) { }  // O(a)
    for (let y of arr2) { }  // O(b)
}
// Total: O(a + b)
\`\`\`

✅ Correct: When you have two different inputs, use different variables.

---

## When to Use

**Use when:**
- You want to know how your code behaves with more data
- You're comparing two solutions
- Interview asks you

**Don't use when:**
- Your data is always small (e.g., < 100)
- Code readability matters more than speed

---

## Speed Comparison

| n | O(1) | O(log n) | O(n) | O(n log n) | O(n²) |
|---|------|----------|------|------------|-------|
| 10 | 1 | 3 | 10 | 33 | 100 |
| 100 | 1 | 7 | 100 | 664 | 10,000 |
| 1,000 | 1 | 10 | 1,000 | 9,966 | 1,000,000 |
| 10,000 | 1 | 13 | 10,000 | 132,877 | 100,000,000 💥 |

---

## Quick Summary

| Pattern | Complexity | Example |
|---------|------------|---------|
| No loop | O(1) | arr[0] |
| One loop | O(n) | for loop |
| Nested loop | O(n²) | nested loops |
| Halving | O(log n) | binary search |
| Sorting | O(n log n) | sort() |

⚡ **Best to Worst:**
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

> **One-liner:** Count the loops! No loop = O(1), one loop = O(n), nested = O(n²), halving = O(log n).
`,

  contentFa: `
# پیچیدگی زمانی - چقدر طول می‌کشه؟

## پیچیدگی زمانی چیست؟ (توضیح ساده)

تصور کن داری یه کتاب می‌خونی. پیچیدگی زمانی می‌گه: "اگه کتاب ۲ برابر بشه، چقدر بیشتر طول می‌کشه بخونیش؟"

**اینطوری فکر کن:**
- مثل سرعت‌سنج ماشین، ولی برای کد!
- نشون می‌ده کدت با داده بیشتر چطور رفتار می‌کنه
- فرق بین اپ سریع و اپی که کرش می‌کنه

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** یه استارتاپ کد نوشت که با ۱۰۰ کاربر عالی کار می‌کرد. وقتی ۱۰,۰۰۰ کاربر شدن، سرور کرش کرد! چرا؟ پیچیدگی زمانی O(n²) بود.

| کاربر | O(n) | O(n²) |
|-------|------|-------|
| 100 | 100 عملیات | 10,000 عملیات |
| 10,000 | 10,000 عملیات | 100,000,000 عملیات 💥 |

**در مصاحبه:** اولین سوال بعد از حل مسئله: "پیچیدگی زمانی چیه؟"

---

## جدول مرجع سریع

| پیچیدگی | نام | مثال زندگی واقعی |
|---------|-----|------------------|
| O(1) | ثابت | نگاه کردن به ساعت |
| O(log n) | لگاریتمی | پیدا کردن کلمه در فرهنگ لغت |
| O(n) | خطی | خوندن یه کتاب صفحه به صفحه |
| O(n log n) | خطی-لگاریتمی | مرتب کردن کارت‌ها هوشمندانه |
| O(n²) | درجه دوم | همه با همه دست بدن |
| O(2ⁿ) | نمایی | حدس زدن رمز عبور |

---

## قوانین طلایی محاسبه

### قانون ۱: ثابت‌ها رو نادیده بگیر
\`\`\`javascript
// O(2n) → O(n)
for (let i = 0; i < n; i++) { }  // حلقه اول
for (let i = 0; i < n; i++) { }  // حلقه دوم
// دو حلقه جدا = 2n، ولی می‌نویسیم O(n)
// چرا؟ ما به الگوی رشد اهمیت می‌دیم
\`\`\`

---

### قانون ۲: فقط بزرگترین رو نگه دار
\`\`\`javascript
// O(n² + n) → O(n²)
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) { }  // این n² هست
}
for (let i = 0; i < n; i++) { }      // این n هست
// وقتی n = 1000: n² = 1,000,000 ولی n = 1000
// n در مقابل n² ناچیزه!
\`\`\`

---

### قانون ۳: ورودی‌های مختلف = متغیرهای مختلف
\`\`\`javascript
// O(a × b)، نه O(n²)!
function process(users, products) {
    for (let i = 0; i < users.length; i++) {      // a بار
        for (let j = 0; j < products.length; j++) { } // b بار
    }
}
// users و products اندازه‌های مختلفی دارن
// پس نمی‌تونیم بگیم n²
\`\`\`

---

## مثال‌های کاربردی

### O(1) - ثابت (فوری!)
\`\`\`javascript
function getFirst(arr) {
    return arr[0];  // فقط یه عملیات!
}

function getByIndex(arr, i) {
    return arr[i];  // دسترسی مستقیم به حافظه
}

// ۱۰ آیتم؟ فوری!
// ۱ میلیون آیتم؟ هنوز فوری!
\`\`\`

**مثل:** روشن کردن چراغ. فرقی نمی‌کنه خونه چقدر بزرگه!

---

### O(n) - خطی (منصفانه)
\`\`\`javascript
function findMax(arr) {
    let max = arr[0];  // فرض اولیه
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];  // بزرگتر پیدا شد!
        }
    }
    return max;
}
// باید همه رو ببینی تا مطمئن بشی
// n آیتم = n مقایسه
\`\`\`

**مثل:** شمردن آدم‌های یه اتاق. ۱۰ نفر = ۱۰ بار بشمار.

---

### O(n²) - درجه دوم (کند!)
\`\`\`javascript
function findDuplicates(arr) {
    for (let i = 0; i < arr.length; i++) {        // حلقه بیرونی
        for (let j = i + 1; j < arr.length; j++) { // حلقه داخلی
            if (arr[i] === arr[j]) {
                console.log('تکراری:', arr[i]);
            }
        }
    }
}
// هر آیتم با همه آیتم‌های دیگه مقایسه می‌شه
// ۱۰ آیتم → ۴۵ مقایسه
// ۱۰۰ آیتم → ۴,۹۵۰ مقایسه
// ۱۰۰۰ آیتم → ۴۹۹,۵۰۰ مقایسه 😱
\`\`\`

**هشدار:** حلقه تودرتو = خطر O(n²)!

---

### O(log n) - لگاریتمی (خیلی سریع!)
\`\`\`javascript
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;      // پیدا شد!
        if (arr[mid] < target) left = mid + 1;    // نیمه راست
        else right = mid - 1;                      // نیمه چپ
    }
    return -1;
}
// هر بار نصف می‌کنیم!
// ۱,۰۰۰ آیتم → ~۱۰ قدم
// ۱,۰۰۰,۰۰۰ آیتم → ~۲۰ قدم
\`\`\`

**مثل:** حدس زدن عدد ۱ تا ۱۰۰. "بالای ۵۰؟" "بالای ۷۵؟" → حداکثر ۷ حدس!

---

## اشتباهات رایج

### ۱. فکر کردن حلقه تودرتو همیشه O(n²) هست
❌ اشتباه:
\`\`\`javascript
// این O(n²) نیست!
for (let i = 0; i < n; i++) {
    for (let j = 0; j < 5; j++) { }  // ۵ بار ثابت
}
// این O(5n) = O(n) هست
\`\`\`

✅ درست: حلقه داخلی باید به n وابسته باشه تا O(n²) بشه.

---

### ۲. فراموش کردن عملیات‌های پنهان
❌ اشتباه:
\`\`\`javascript
function hasValue(arr, target) {
    return arr.includes(target);  // این O(1) نیست!
}
// includes() داخلش یه حلقه داره → O(n)
\`\`\`

✅ درست: متدهای آرایه مثل includes, indexOf, find همه O(n) هستن.

---

### ۳. اشتباه در ورودی‌های مختلف
❌ اشتباه:
\`\`\`javascript
function merge(arr1, arr2) {
    // این O(n²) نیست!
    for (let x of arr1) { }  // O(a)
    for (let y of arr2) { }  // O(b)
}
// کل: O(a + b)
\`\`\`

✅ درست: وقتی دو ورودی مختلف داری، از متغیرهای مختلف استفاده کن.

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- می‌خوای بدونی کدت با داده بیشتر چطور رفتار می‌کنه
- داری دو راه‌حل رو مقایسه می‌کنی
- در مصاحبه ازت می‌پرسن

**استفاده نکن وقتی:**
- داده‌ات همیشه کوچیکه (مثلاً < ۱۰۰)
- خوانایی کد مهم‌تره از سرعت

---

## مقایسه سرعت

| n | O(1) | O(log n) | O(n) | O(n log n) | O(n²) |
|---|------|----------|------|------------|-------|
| 10 | 1 | 3 | 10 | 33 | 100 |
| 100 | 1 | 7 | 100 | 664 | 10,000 |
| 1,000 | 1 | 10 | 1,000 | 9,966 | 1,000,000 |
| 10,000 | 1 | 13 | 10,000 | 132,877 | 100,000,000 💥 |

---

## خلاصه سریع

| الگو | پیچیدگی | مثال |
|------|---------|------|
| بدون حلقه | O(1) | arr[0] |
| یک حلقه | O(n) | for loop |
| حلقه تودرتو | O(n²) | nested loops |
| نصف کردن | O(log n) | binary search |
| مرتب‌سازی | O(n log n) | sort() |

⚡ **بهترین تا بدترین:**
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

> **یک خطی:** حلقه‌ها رو بشمار! بدون حلقه = O(1)، یک حلقه = O(n)، تودرتو = O(n²)، نصف کردن = O(log n).
`,

  visualizationId: null,
  exerciseId: 'time-complexity',
};

export default timeComplexityLesson;
