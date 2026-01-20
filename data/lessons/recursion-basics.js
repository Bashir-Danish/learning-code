export const recursionBasicsLesson = {
  id: 'recursion-basics',
  title: 'Recursion Basics',
  titleFa: 'مبانی بازگشت',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Recursion Basics - Functions Calling Themselves

## What is Recursion?

Imagine Russian nesting dolls - open one, find a smaller one inside, repeat until you reach the smallest. That's recursion!

**Think of it like:**
- Russian dolls - each contains a smaller version
- Mirrors facing each other - infinite reflections
- A recipe that says "repeat step 1"

---

## Why Should You Care?

- Natural fit for trees, graphs, and nested structures
- Foundation for divide-and-conquer algorithms
- 25%+ of interview problems use recursion
- Makes complex problems elegant and simple

---

## The Two Essential Parts

### 1. Base Case - When to STOP
\`\`\`javascript
if (n <= 1) return 1;  // Stop here!
\`\`\`

### 2. Recursive Case - Call yourself with smaller input
\`\`\`javascript
return n * factorial(n - 1);  // Smaller problem
\`\`\`

---

## Classic Example: Factorial

\`\`\`javascript
function factorial(n) {
    // Base case: stop at 1
    if (n <= 1) return 1;
    
    // Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1);
}

// How it works:
// factorial(4)
// = 4 * factorial(3)
// = 4 * 3 * factorial(2)
// = 4 * 3 * 2 * factorial(1)
// = 4 * 3 * 2 * 1
// = 24
\`\`\`

---

## Classic Example: Fibonacci

\`\`\`javascript
// Simple but slow - O(2^n)
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// With memoization - O(n)
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}
\`\`\`

---

## More Examples

### Sum of Array
\`\`\`javascript
function sum(arr) {
    if (arr.length === 0) return 0;  // Base: empty array
    return arr[0] + sum(arr.slice(1));  // First + rest
}
\`\`\`

### Reverse String
\`\`\`javascript
function reverse(str) {
    if (str.length <= 1) return str;
    return reverse(str.slice(1)) + str[0];
}
// reverse("hello") → reverse("ello") + "h" → ... → "olleh"
\`\`\`

### Count Down
\`\`\`javascript
function countDown(n) {
    if (n <= 0) {
        console.log("Done!");
        return;
    }
    console.log(n);
    countDown(n - 1);
}
\`\`\`

---

## Common Mistakes

### 1. Missing Base Case
\`\`\`javascript
// ❌ WRONG - infinite recursion, stack overflow!
function factorial(n) {
    return n * factorial(n - 1);  // Never stops!
}

// ✅ CORRECT - has base case
function factorial(n) {
    if (n <= 1) return 1;  // Stops here
    return n * factorial(n - 1);
}
\`\`\`

### 2. Not Making Progress
\`\`\`javascript
// ❌ WRONG - n never changes
function bad(n) {
    if (n <= 0) return 0;
    return bad(n);  // Same n forever!
}

// ✅ CORRECT - n decreases
function good(n) {
    if (n <= 0) return 0;
    return good(n - 1);  // Getting smaller
}
\`\`\`

### 3. Wrong Base Case Value
\`\`\`javascript
// ❌ WRONG - factorial(0) should be 1
function factorial(n) {
    if (n === 0) return 0;  // Wrong!
}

// ✅ CORRECT
function factorial(n) {
    if (n <= 1) return 1;  // 0! = 1! = 1
}
\`\`\`

---

## Recursion vs Iteration

| Recursion | Iteration |
|-----------|-----------|
| Elegant, readable | More efficient |
| Uses call stack | Uses loop variables |
| Risk of stack overflow | No stack limit |
| Natural for trees | Natural for arrays |

---

## Interview Tips

- Always identify base case first
- Trace through small examples by hand
- Consider memoization for overlapping subproblems
- "I'll use recursion since this has a natural recursive structure"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Base case | When to stop |
| Recursive case | Smaller subproblem |
| Space | O(n) call stack |
| Key insight | Trust the recursion! |

> **One-liner:** Recursion = function calls itself with smaller input until base case. Always have a base case, always make progress toward it!
`,

  contentFa: `
# مبانی بازگشت - توابعی که خودشان را صدا می‌زنند

## بازگشت چیست؟ (توضیح ساده)

تصور کن عروسک‌های روسی تودرتو (ماتریوشکا) - یکی رو باز کن، یه کوچکتر توشه، تکرار کن تا به کوچکترین برسی. این بازگشته!

**اینطوری فکر کن:**
- عروسک‌های روسی - هر کدوم یه نسخه کوچکتر داره
- آینه‌های روبروی هم - بازتاب‌های بی‌نهایت
- پله‌برقی که به پله‌برقی دیگه می‌رسه

**تعریف ساده:** تابعی که خودش رو صدا می‌زنه!

---

## چرا باید اهمیت بدی؟

**در مصاحبه:** ۲۵%+ مسائل از بازگشت استفاده می‌کنن!

| بدون بازگشت | با بازگشت |
|-------------|-----------|
| کد پیچیده برای درخت‌ها | کد ساده و زیبا |
| حلقه‌های تودرتو | یه تابع کوچک |
| سخت برای فهمیدن | طبیعی و خوانا |

**کاربردها:**
- پیمایش درخت‌ها و گراف‌ها
- الگوریتم‌های تقسیم و حل (Merge Sort, Quick Sort)
- Backtracking (زیرمجموعه‌ها، جایگشت‌ها)
- برنامه‌نویسی پویا

---

## دو بخش ضروری

هر تابع بازگشتی دو بخش داره:

### ۱. حالت پایه (Base Case) - کی متوقف بشیم
\`\`\`javascript
if (n <= 1) return 1;  // اینجا متوقف شو!
\`\`\`

**مثل:** کوچکترین عروسک روسی - دیگه توش عروسکی نیست!

### ۲. حالت بازگشتی (Recursive Case) - خودت رو با ورودی کوچکتر صدا بزن
\`\`\`javascript
return n * factorial(n - 1);  // مسئله کوچکتر
\`\`\`

**مثل:** عروسک بعدی رو باز کن!

---

## مثال کلاسیک: فاکتوریل

**فاکتوریل n:** حاصل‌ضرب همه اعداد از ۱ تا n
- 5! = 5 × 4 × 3 × 2 × 1 = 120
- 3! = 3 × 2 × 1 = 6
- 1! = 1
- 0! = 1

\`\`\`javascript
function factorial(n) {
    // حالت پایه: 0! = 1! = 1
    if (n <= 1) return 1;
    
    // حالت بازگشتی: n! = n × (n-1)!
    return n * factorial(n - 1);
}

// چطور کار می‌کنه؟ بیا دنبال کنیم:
// factorial(4)
// = 4 * factorial(3)
// = 4 * (3 * factorial(2))
// = 4 * (3 * (2 * factorial(1)))
// = 4 * (3 * (2 * 1))  ← حالت پایه!
// = 4 * (3 * 2)
// = 4 * 6
// = 24
\`\`\`

---

## مثال کلاسیک: فیبوناچی

**دنباله فیبوناچی:** هر عدد = جمع دو عدد قبلی
- 0, 1, 1, 2, 3, 5, 8, 13, 21, ...

\`\`\`javascript
// روش ساده (ولی کند! - O(2^n))
function fib(n) {
    // حالت پایه
    if (n <= 1) return n;
    
    // حالت بازگشتی: fib(n) = fib(n-1) + fib(n-2)
    return fib(n - 1) + fib(n - 2);
}

// fib(5) = fib(4) + fib(3)
//        = (fib(3) + fib(2)) + (fib(2) + fib(1))
//        = ... خیلی محاسبه تکراری!
\`\`\`

**مشکل:** محاسبات تکراری! fib(3) چندین بار حساب می‌شه.

\`\`\`javascript
// روش بهینه با Memoization - O(n)
function fibMemo(n, memo = {}) {
    // اگه قبلاً حساب کردیم، برگردون
    if (n in memo) return memo[n];
    
    // حالت پایه
    if (n <= 1) return n;
    
    // حساب کن و ذخیره کن
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// حالا fib(50) هم سریع اجرا می‌شه!
\`\`\`

---

## مثال‌های بیشتر

### مجموع آرایه
\`\`\`javascript
function sum(arr, i = 0) {
    // حالت پایه: به آخر رسیدیم
    if (i >= arr.length) return 0;
    
    // حالت بازگشتی: این عنصر + جمع بقیه
    return arr[i] + sum(arr, i + 1);
}

// sum([1, 2, 3, 4])
// = 1 + sum([2, 3, 4])
// = 1 + 2 + sum([3, 4])
// = 1 + 2 + 3 + sum([4])
// = 1 + 2 + 3 + 4 + sum([])
// = 1 + 2 + 3 + 4 + 0
// = 10
\`\`\`

---

### معکوس رشته
\`\`\`javascript
function reverse(str) {
    // حالت پایه: رشته خالی یا یک کاراکتر
    if (str.length <= 1) return str;
    
    // حالت بازگشتی: بقیه رو معکوس کن + اولی
    return reverse(str.slice(1)) + str[0];
}

// reverse("hello")
// = reverse("ello") + "h"
// = (reverse("llo") + "e") + "h"
// = ((reverse("lo") + "l") + "e") + "h"
// = (((reverse("o") + "l") + "l") + "e") + "h"
// = ((("o" + "l") + "l") + "e") + "h"
// = "olleh"
\`\`\`

---

### شمارش معکوس
\`\`\`javascript
function countDown(n) {
    // حالت پایه
    if (n <= 0) {
        console.log("تموم شد!");
        return;
    }
    
    // چاپ عدد فعلی
    console.log(n);
    
    // حالت بازگشتی
    countDown(n - 1);
}

// countDown(3)
// چاپ: 3
// چاپ: 2
// چاپ: 1
// چاپ: تموم شد!
\`\`\`

---

## اشتباهات رایج

### ۱. نداشتن حالت پایه
❌ اشتباه:
\`\`\`javascript
function factorial(n) {
    return n * factorial(n - 1);  // هیچوقت متوقف نمی‌شه!
}
// نتیجه: Stack Overflow! 💥
\`\`\`

✅ درست:
\`\`\`javascript
function factorial(n) {
    if (n <= 1) return 1;  // حالت پایه!
    return n * factorial(n - 1);
}
\`\`\`

---

### ۲. پیشرفت نکردن به سمت حالت پایه
❌ اشتباه:
\`\`\`javascript
function bad(n) {
    if (n <= 0) return 0;
    return bad(n);  // n هیچوقت عوض نمی‌شه!
}
// نتیجه: Stack Overflow! 💥
\`\`\`

✅ درست:
\`\`\`javascript
function good(n) {
    if (n <= 0) return 0;
    return good(n - 1);  // n داره کم می‌شه
}
\`\`\`

---

### ۳. مقدار حالت پایه اشتباه
❌ اشتباه:
\`\`\`javascript
function factorial(n) {
    if (n === 0) return 0;  // اشتباه! 0! = 1
    return n * factorial(n - 1);
}
// factorial(3) = 3 * 2 * 1 * 0 = 0 😱
\`\`\`

✅ درست:
\`\`\`javascript
function factorial(n) {
    if (n <= 1) return 1;  // 0! = 1! = 1
    return n * factorial(n - 1);
}
\`\`\`

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- ساختار درختی یا تودرتو داری
- مسئله به زیرمسئله‌های مشابه تقسیم می‌شه
- Backtracking لازمه (همه حالات)

**استفاده نکن وقتی:**
- حلقه ساده کافیه
- n خیلی بزرگه (خطر Stack Overflow)
- کارایی خیلی مهمه (تکرار معمولاً سریع‌تره)

---

## بازگشت در مقابل تکرار

| بازگشت | تکرار |
|--------|-------|
| کد زیبا و خوانا | کارآمدتر |
| O(n) فضای پشته | O(1) فضا |
| خطر Stack Overflow | بدون محدودیت |
| طبیعی برای درخت‌ها | طبیعی برای آرایه‌ها |

---

## خلاصه سریع

| مفهوم | توضیح |
|-------|-------|
| حالت پایه | کی متوقف بشیم (ضروری!) |
| حالت بازگشتی | صدا زدن خودمون با ورودی کوچکتر |
| پیچیدگی فضا | O(n) به خاطر پشته فراخوانی |
| Memoization | ذخیره نتایج برای جلوگیری از تکرار |

> **یک خطی:** بازگشت = تابع خودش رو با ورودی کوچکتر صدا می‌زنه تا به حالت پایه برسه. همیشه حالت پایه داشته باش، همیشه به سمتش پیشرفت کن!
`,

  visualizationId: 'recursion',
  exerciseId: 'recursion-basics',
};

export default recursionBasicsLesson;
