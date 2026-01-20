export const bigOLesson = {
  id: 'big-o-notation',
  title: 'Big O Notation',
  titleFa: 'نماد Big O',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# Big O Notation - Understanding Algorithm Speed

## What is Big O? (Simple Explanation)

Imagine you're looking for a friend's name in a phone book. Big O tells us **how much longer it takes** as the phone book gets bigger.

**Think of it like this:**
- If you have 100 names → takes some time
- If you have 1,000 names → how much longer?
- If you have 1,000,000 names → will your computer crash?

Big O is like a **speed rating** for your code. It answers: "If I give you MORE data, how much SLOWER will your code be?"

---

## Why Should You Care?

**Real-world example:** You write code that works perfectly with 10 users. Your app becomes popular and now has 1 million users. Will your code still work? Big O tells you!

- Good Big O = Your app stays fast
- Bad Big O = Your app crashes or takes forever

---

## The Big O Family (From Fastest to Slowest)

### O(1) - "Instant" - Constant Time

**Like:** Grabbing the first book from a shelf. Doesn't matter if there are 10 books or 10,000 books - you just grab the first one!

\`\`\`javascript
// Example: Get first item from array
function getFirst(arr) {
  return arr[0];  // Always instant, no matter array size!
}

// 10 items? Instant.
// 1 million items? Still instant!
\`\`\`

**Real life:** Looking at your watch to check the time. Whether you've been awake 1 hour or 24 hours, checking takes the same time.

---

### O(log n) - "Super Fast" - Logarithmic Time

**Like:** Finding a word in a dictionary. You don't read every page - you open to the middle, then half again, then half again...

\`\`\`javascript
// Binary Search - finding a number in sorted list
// With 1,000 items: only ~10 steps!
// With 1,000,000 items: only ~20 steps!

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;      // Found it!
    if (arr[mid] < target) left = mid + 1;    // Look right half
    else right = mid - 1;                      // Look left half
  }
  return -1;  // Not found
}
\`\`\`

**Real life:** Guessing a number between 1-100. Smart way: "Is it above 50?" "Above 75?" etc. You find it in ~7 guesses max!

---

### O(n) - "Fair" - Linear Time

**Like:** Reading every page of a book to find a specific sentence. More pages = more time, but it's proportional.

\`\`\`javascript
// Finding maximum value - must check every item
function findMax(arr) {
  let max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// 10 items → 10 checks
// 1000 items → 1000 checks
\`\`\`

**Real life:** Counting people in a room. 10 people = count 10 times. 100 people = count 100 times.

---

### O(n log n) - "Pretty Good" - Linearithmic Time

**Like:** Sorting a deck of cards efficiently. Better than checking every card against every other card!

\`\`\`javascript
// Most efficient sorting algorithms
arr.sort((a, b) => a - b);

// This is what Merge Sort and Quick Sort achieve
// 1000 items → about 10,000 operations
// Much better than 1,000,000 operations!
\`\`\`

**Real life:** Organizing a library. You don't compare every book to every other book - you use smart strategies.

---

### O(n²) - "Slow" - Quadratic Time

**Like:** In a room of people, everyone shakes hands with everyone else. More people = MUCH more handshakes!

\`\`\`javascript
// Bubble Sort - comparing every pair
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {           // Loop 1
    for (let j = 0; j < arr.length - 1; j++) {     // Loop 2 (nested!)
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 10 items → 100 operations
// 100 items → 10,000 operations
// 1000 items → 1,000,000 operations
\`\`\`

**Warning:** Nested loops (loop inside loop) often mean O(n²). Be careful!

---

### O(2ⁿ) - "Terrible" - Exponential Time

**Like:** Trying every possible combination of a password. Each extra character DOUBLES the time!

\`\`\`javascript
// Bad Fibonacci - recalculates same values many times
function badFib(n) {
  if (n <= 1) return n;
  return badFib(n - 1) + badFib(n - 2);  // Calls itself twice!
}

// fib(10) → 177 calls
// fib(20) → 21,891 calls
// fib(50) → Your computer gives up
\`\`\`

**Avoid this!** Usually means you need a better approach (like memoization).

---

## Quick Reference Chart

| Big O | Name | 1,000 items | 1,000,000 items | Speed |
|-------|------|-------------|-----------------|-------|
| O(1) | Constant | 1 | 1 | Fastest |
| O(log n) | Logarithmic | ~10 | ~20 | Very Fast |
| O(n) | Linear | 1,000 | 1,000,000 | Fast |
| O(n log n) | Linearithmic | ~10,000 | ~20,000,000 | Good |
| O(n²) | Quadratic | 1,000,000 | 1,000,000,000,000 | Slow |
| O(2ⁿ) | Exponential | Huge | Impossible | Avoid |

---

## Simple Rules to Remember

### Rule 1: Ignore Constants
\`O(2n)\` → just write \`O(n)\`
\`O(500)\` → just write \`O(1)\`

*Why?* We care about the PATTERN, not exact numbers.

### Rule 2: Keep Only the Biggest Term
\`O(n² + n)\` → just write \`O(n²)\`
\`O(n + log n)\` → just write \`O(n)\`

*Why?* When n is huge, the smaller terms don't matter.

### Rule 3: Different Inputs = Different Variables
\`\`\`javascript
function process(arr1, arr2) {
  // Loop through arr1: O(a)
  // Loop through arr2: O(b)
  // Total: O(a + b), NOT O(n)!
}
\`\`\`

---

## How to Identify Big O

**Count the loops:**
- No loops → O(1)
- One loop → O(n)
- Loop inside loop → O(n²)
- Loop that halves data → O(log n)

**Quick tips:**
- Array access by index → O(1)
- Simple math operations → O(1)
- Searching unsorted array → O(n)
- Searching sorted array (binary search) → O(log n)
- Sorting → O(n log n) minimum

---

## Common Mistakes

### 1. Mistakes in Counting Loops
❌ Wrong: Thinking two sequential loops is O(n²)
✅ Correct: Two sequential loops is O(n + n) = O(n), only nested loops are O(n²)

### 2. Forgetting Constants
❌ Wrong: Writing O(2n) or O(n/2)
✅ Correct: They're all O(n) - drop the constants

### 3. Mistakes with Different Inputs
❌ Wrong: Writing O(n) for two different arrays
✅ Correct: Write O(a + b) because their sizes differ

---

## When to Use

**Use when:**
- You want to analyze your code's efficiency
- Comparing two algorithms
- You want to know how your code handles large data

**Don't use when:**
- Your data is always small (e.g., 10 items)
- Code readability matters more than speed
- Premature optimization (make it work first, then make it fast!)

---

## Quick Summary

| Feature | Description |
|---------|-------------|
| Purpose | Measure algorithm speed |
| Fastest | O(1) Constant ⚡ |
| Slowest | O(2ⁿ) Exponential 🐌 |
| Most common | O(n) Linear |
| Sorting | O(n log n) |

> **One-liner:** Big O shows how much slower your code gets with more data - O(1) is great, O(n²) is bad, O(2ⁿ) is disaster! ⚡
`,

  contentFa: `
# نماد Big O - درک سرعت الگوریتم‌ها

## Big O چیست؟ (توضیح ساده)

تصور کن داری دنبال اسم یک دوست در دفترچه تلفن می‌گردی. Big O به ما می‌گوید **چقدر بیشتر طول می‌کشد** وقتی دفترچه تلفن بزرگتر می‌شود.

**اینطوری فکر کن:**
- اگر ۱۰۰ اسم داری → یه مدت طول می‌کشه
- اگر ۱۰۰۰ اسم داری → چقدر بیشتر؟
- اگر ۱,۰۰۰,۰۰۰ اسم داری → کامپیوترت هنگ می‌کنه؟

Big O مثل یک **امتیاز سرعت** برای کدت هست. جواب می‌ده: "اگر داده بیشتری بدم، کدت چقدر کندتر می‌شه؟"

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** کدی می‌نویسی که با ۱۰ کاربر عالی کار می‌کنه. اپت معروف می‌شه و حالا ۱ میلیون کاربر داری. آیا کدت هنوز کار می‌کنه؟ Big O جواب می‌ده!

- Big O خوب = اپت سریع می‌مونه
- Big O بد = اپت کرش می‌کنه یا خیلی کند می‌شه

---

## خانواده Big O (از سریع‌ترین تا کندترین)

### O(1) - "فوری" - زمان ثابت

**مثل:** برداشتن اولین کتاب از قفسه. فرقی نمی‌کنه ۱۰ کتاب باشه یا ۱۰,۰۰۰ کتاب - فقط اولی رو برمی‌داری!

\`\`\`javascript
// مثال: گرفتن اولین آیتم از آرایه
function getFirst(arr) {
  return arr[0];  // همیشه فوری، مهم نیست آرایه چقدر بزرگه!
}

// ۱۰ آیتم؟ فوری.
// ۱ میلیون آیتم؟ هنوز فوری!
\`\`\`

**زندگی واقعی:** نگاه کردن به ساعت برای چک کردن زمان. چه ۱ ساعت بیدار بوده باشی چه ۲۴ ساعت، چک کردن همون قدر طول می‌کشه.

---

### O(log n) - "خیلی سریع" - زمان لگاریتمی

**مثل:** پیدا کردن یک کلمه در فرهنگ لغت. همه صفحات رو نمی‌خونی - وسط رو باز می‌کنی، بعد نصفش، بعد نصفش...

\`\`\`javascript
// جستجوی دودویی - پیدا کردن عدد در لیست مرتب
// با ۱۰۰۰ آیتم: فقط ~۱۰ قدم!
// با ۱,۰۰۰,۰۰۰ آیتم: فقط ~۲۰ قدم!

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;      // پیداش کردم!
    if (arr[mid] < target) left = mid + 1;    // نیمه راست رو بگرد
    else right = mid - 1;                      // نیمه چپ رو بگرد
  }
  return -1;  // پیدا نشد
}
\`\`\`

**زندگی واقعی:** حدس زدن عددی بین ۱ تا ۱۰۰. روش هوشمند: "بالای ۵۰ هست؟" "بالای ۷۵؟" و غیره. حداکثر با ~۷ حدس پیداش می‌کنی!

---

### O(n) - "منصفانه" - زمان خطی

**مثل:** خوندن همه صفحات یک کتاب برای پیدا کردن یک جمله خاص. صفحات بیشتر = زمان بیشتر، ولی متناسبه.

\`\`\`javascript
// پیدا کردن بیشترین مقدار - باید همه آیتم‌ها رو چک کنی
function findMax(arr) {
  let max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// ۱۰ آیتم → ۱۰ چک
// ۱۰۰۰ آیتم → ۱۰۰۰ چک
\`\`\`

**زندگی واقعی:** شمردن آدم‌های یک اتاق. ۱۰ نفر = ۱۰ بار بشمار. ۱۰۰ نفر = ۱۰۰ بار بشمار.

---

### O(n log n) - "خیلی خوب" - زمان خطی-لگاریتمی

**مثل:** مرتب کردن یک دسته کارت به صورت کارآمد. بهتر از مقایسه هر کارت با هر کارت دیگه!

\`\`\`javascript
// کارآمدترین الگوریتم‌های مرتب‌سازی
arr.sort((a, b) => a - b);

// این چیزیه که Merge Sort و Quick Sort به دست میارن
// ۱۰۰۰ آیتم → حدود ۱۰,۰۰۰ عملیات
// خیلی بهتر از ۱,۰۰۰,۰۰۰ عملیات!
\`\`\`

**زندگی واقعی:** مرتب کردن کتابخانه. هر کتاب رو با هر کتاب دیگه مقایسه نمی‌کنی - از استراتژی‌های هوشمند استفاده می‌کنی.

---

### O(n²) - "کند" - زمان درجه دوم

**مثل:** در یک اتاق پر از آدم، همه با همه دست می‌دن. آدم بیشتر = دست دادن خیلی بیشتر!

\`\`\`javascript
// مرتب‌سازی حبابی - مقایسه هر جفت
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {           // حلقه ۱
    for (let j = 0; j < arr.length - 1; j++) {     // حلقه ۲ (تودرتو!)
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// ۱۰ آیتم → ۱۰۰ عملیات
// ۱۰۰ آیتم → ۱۰,۰۰۰ عملیات
// ۱۰۰۰ آیتم → ۱,۰۰۰,۰۰۰ عملیات
\`\`\`

**هشدار:** حلقه‌های تودرتو (حلقه داخل حلقه) معمولاً یعنی O(n²). مراقب باش!

---

### O(2ⁿ) - "وحشتناک" - زمان نمایی

**مثل:** امتحان کردن همه ترکیب‌های ممکن یک رمز عبور. هر کاراکتر اضافی زمان رو دو برابر می‌کنه!

\`\`\`javascript
// فیبوناچی بد - همون مقادیر رو چندین بار محاسبه می‌کنه
function badFib(n) {
  if (n <= 1) return n;
  return badFib(n - 1) + badFib(n - 2);  // خودش رو دو بار صدا می‌زنه!
}

// fib(10) → ۱۷۷ فراخوانی
// fib(20) → ۲۱,۸۹۱ فراخوانی
// fib(50) → کامپیوترت تسلیم می‌شه
\`\`\`

**از این دوری کن!** معمولاً یعنی به روش بهتری نیاز داری (مثل memoization).

---

## جدول مرجع سریع

| Big O | نام | ۱,۰۰۰ آیتم | ۱,۰۰۰,۰۰۰ آیتم | سرعت |
|-------|-----|------------|----------------|------|
| O(1) | ثابت | ۱ | ۱ | سریع‌ترین |
| O(log n) | لگاریتمی | ~۱۰ | ~۲۰ | خیلی سریع |
| O(n) | خطی | ۱,۰۰۰ | ۱,۰۰۰,۰۰۰ | سریع |
| O(n log n) | خطی-لگاریتمی | ~۱۰,۰۰۰ | ~۲۰,۰۰۰,۰۰۰ | خوب |
| O(n²) | درجه دوم | ۱,۰۰۰,۰۰۰ | ۱,۰۰۰,۰۰۰,۰۰۰,۰۰۰ | کند |
| O(2ⁿ) | نمایی | خیلی زیاد | غیرممکن | دوری کن |

---

## قوانین ساده برای یادآوری

### قانون ۱: ثابت‌ها رو نادیده بگیر
\`O(2n)\` → فقط بنویس \`O(n)\`
\`O(500)\` → فقط بنویس \`O(1)\`

*چرا؟* ما به الگو اهمیت می‌دیم، نه اعداد دقیق.

### قانون ۲: فقط بزرگترین جمله رو نگه دار
\`O(n² + n)\` → فقط بنویس \`O(n²)\`
\`O(n + log n)\` → فقط بنویس \`O(n)\`

*چرا؟* وقتی n خیلی بزرگه، جملات کوچکتر مهم نیستن.

### قانون ۳: ورودی‌های مختلف = متغیرهای مختلف
\`\`\`javascript
function process(arr1, arr2) {
  // حلقه روی arr1: O(a)
  // حلقه روی arr2: O(b)
  // کل: O(a + b)، نه O(n)!
}
\`\`\`

---

## چطور Big O رو تشخیص بدی

**حلقه‌ها رو بشمار:**
- بدون حلقه → O(1)
- یک حلقه → O(n)
- حلقه داخل حلقه → O(n²)
- حلقه‌ای که داده رو نصف می‌کنه → O(log n)

**نکات سریع:**
- دسترسی به آرایه با اندیس → O(1)
- عملیات ریاضی ساده → O(1)
- جستجو در آرایه نامرتب → O(n)
- جستجو در آرایه مرتب (جستجوی دودویی) → O(log n)
- مرتب‌سازی → حداقل O(n log n)

---

## اشتباهات رایج

### ۱. اشتباه در شمردن حلقه‌ها
❌ اشتباه: فکر کنی دو حلقه پشت سر هم O(n²) هست
✅ درست: دو حلقه پشت سر هم O(n + n) = O(n) هست، فقط حلقه تودرتو O(n²) هست

### ۲. فراموش کردن ثابت‌ها
❌ اشتباه: O(2n) یا O(n/2) بنویسی
✅ درست: همه‌شون O(n) هستن - ثابت‌ها رو حذف کن

### ۳. اشتباه در ورودی‌های مختلف
❌ اشتباه: دو آرایه مختلف رو O(n) بنویسی
✅ درست: O(a + b) بنویس چون اندازه‌هاشون فرق داره

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- می‌خوای کارایی کدت رو تحلیل کنی
- بین دو الگوریتم مقایسه می‌کنی
- می‌خوای بدونی کدت با داده بزرگ چطور کار می‌کنه

**استفاده نکن وقتی:**
- داده‌ات همیشه کوچیکه (مثلاً ۱۰ آیتم)
- خوانایی کد مهم‌تر از سرعته
- بهینه‌سازی زودهنگام می‌کنی (اول کار کنه، بعد سریع کنه!)

---

## خلاصه سریع

| ویژگی | توضیح |
|-------|-------|
| هدف | سنجش سرعت الگوریتم |
| سریع‌ترین | O(1) ثابت ⚡ |
| کندترین | O(2ⁿ) نمایی 🐌 |
| رایج‌ترین | O(n) خطی |
| مرتب‌سازی | O(n log n) |

> **یک خطی:** Big O نشون می‌ده کدت با داده بیشتر چقدر کندتر می‌شه - O(1) عالیه، O(n²) بد، O(2ⁿ) فاجعه! ⚡
`,

  hasVisualization: false,
  hasExercise: true,
  exerciseId: 'big-o',
};

export default bigOLesson;
