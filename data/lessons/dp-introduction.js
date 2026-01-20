export const dpIntroductionLesson = {
  id: 'dp-introduction',
  title: 'DP Introduction',
  titleFa: 'مقدمه DP',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Dynamic Programming - Remember to Save Time

## What is Dynamic Programming?

Imagine you're asked "What's 3+5?" then "What's 3+5+2?" - you don't recalculate 3+5, you remember it's 8! That's DP.

**Think of it like:**
- Writing down answers to avoid re-solving
- Building a house floor by floor (each floor uses the one below)
- A smart student who saves their homework answers

---

## Why Should You Care?

- Turns exponential O(2^n) into polynomial O(n)
- 20%+ of hard interview problems are DP
- Essential for optimization problems
- Used in spell checkers, DNA sequencing, finance

---

## When to Use DP

Two key properties:

### 1. Overlapping Subproblems
Same subproblems solved multiple times.
\`\`\`
fib(5) calls fib(3) and fib(4)
fib(4) also calls fib(3)  ← Overlap!
\`\`\`

### 2. Optimal Substructure
Optimal solution contains optimal solutions to subproblems.
\`\`\`
Shortest path A→C through B = 
    Shortest A→B + Shortest B→C
\`\`\`

---

## Two Approaches

### Top-Down (Memoization)
Start with main problem, recurse down, cache results.
\`\`\`javascript
function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
\`\`\`

### Bottom-Up (Tabulation)
Start with smallest subproblems, build up.
\`\`\`javascript
function fib(n) {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
\`\`\`

---

## Fibonacci: From O(2^n) to O(n)

### Naive Recursion - O(2^n) 🐌
\`\`\`javascript
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);  // Recalculates same values!
}
// fib(50) takes FOREVER
\`\`\`

### With Memoization - O(n) 🚀
\`\`\`javascript
function fib(n, memo = {}) {
    if (n in memo) return memo[n];  // Already calculated!
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
// fib(50) is instant
\`\`\`

### Space Optimized - O(1) space 🎯
\`\`\`javascript
function fib(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
\`\`\`

---

## DP Problem-Solving Steps

1. **Define state:** What does dp[i] represent?
2. **Find recurrence:** How does dp[i] relate to smaller subproblems?
3. **Base cases:** What are the starting values?
4. **Order:** Which direction to fill the table?
5. **Optimize:** Can we reduce space?

---

## Common Mistakes

### 1. Missing Base Cases
\`\`\`javascript
// ❌ WRONG - infinite recursion
function fib(n, memo = {}) {
    memo[n] = fib(n-1, memo) + fib(n-2, memo);
    return memo[n];
}

// ✅ CORRECT - has base case
function fib(n, memo = {}) {
    if (n <= 1) return n;  // Base case!
    // ...
}
\`\`\`

### 2. Wrong State Definition
Think carefully about what dp[i] means. Wrong definition = wrong solution.

### 3. Not Checking Memo First
\`\`\`javascript
// ❌ WRONG - calculates before checking
memo[n] = fib(n-1) + fib(n-2);
if (n in memo) return memo[n];

// ✅ CORRECT - check first
if (n in memo) return memo[n];  // Check first!
memo[n] = fib(n-1) + fib(n-2);
\`\`\`

---

## Interview Tips

- "I see overlapping subproblems, so I'll use DP"
- Start with recursive solution, then add memoization
- Define your state clearly before coding
- Consider space optimization at the end

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Key insight | Remember answers to avoid re-solving |
| Top-Down | Recursion + cache |
| Bottom-Up | Iteration + table |
| Time | Usually O(n) or O(n²) |

> **One-liner:** DP = recursion + memoization. If you solve the same subproblem twice, save the answer! Turns O(2^n) into O(n).
`,

  contentFa: `
# برنامه‌نویسی پویا - یادت باشه تا وقت صرفه‌جویی کنی ⚡

## برنامه‌نویسی پویا چیست؟ (توضیح ساده)

تصور کن ازت می‌پرسن "۳+۵ چنده؟" بعد "۳+۵+۲ چنده؟" - دوباره ۳+۵ رو حساب نمی‌کنی، یادت می‌مونه ۸ بود! این DP هست.

**اینطوری فکر کن:**
- مثل نوشتن جواب‌ها برای جلوگیری از حل دوباره
- مثل ساختن خونه طبقه به طبقه (هر طبقه از پایینی استفاده می‌کنه)
- مثل دانش‌آموز باهوشی که جواب تکالیفش رو ذخیره می‌کنه

---

## چرا باید اهمیت بدی؟

- نمایی O(2^n) رو به چندجمله‌ای O(n) تبدیل می‌کنه ⚡
- ۲۰%+ مسائل سخت مصاحبه DP هستن
- ضروری برای مسائل بهینه‌سازی
- در غلط‌یاب املایی، توالی DNA، مالی استفاده می‌شه

---

## کی از DP استفاده کنیم

دو ویژگی کلیدی:

### ۱. زیرمسائل همپوشان
همون زیرمسائل چندین بار حل می‌شن.

\`\`\`javascript
// fib(5) صدا می‌زنه fib(3) و fib(4)
// fib(4) هم صدا می‌زنه fib(3)  ← همپوشانی!
\`\`\`

### ۲. ساختار بهینه
جواب بهینه شامل جواب‌های بهینه زیرمسائله.

\`\`\`javascript
// کوتاه‌ترین مسیر A→C از B = 
//     کوتاه‌ترین A→B + کوتاه‌ترین B→C
\`\`\`

---

## دو رویکرد

### بالا به پایین (Memoization)
از مسئله اصلی شروع کن، بازگشت کن، نتایج رو کش کن.

\`\`\`javascript
function fib(n, memo = {}) {
    // اول چک کن قبلاً حساب شده؟
    if (n in memo) return memo[n];
    // حالت پایه
    if (n <= 1) return n;
    // حساب کن و ذخیره کن
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
\`\`\`

### پایین به بالا (Tabulation)
از کوچکترین زیرمسائل شروع کن، بساز.

\`\`\`javascript
function fib(n) {
    if (n <= 1) return n;
    // جدول dp بساز
    const dp = [0, 1];
    // از پایین به بالا پر کن
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
\`\`\`

---

## فیبوناچی: از O(2^n) به O(n)

### بازگشت ساده - O(2^n) 🐌

\`\`\`javascript
function fib(n) {
    if (n <= 1) return n;
    // همون مقادیر رو دوباره حساب می‌کنه!
    return fib(n - 1) + fib(n - 2);
}
// fib(50) خیلی طول می‌کشه ❌
\`\`\`

### با Memoization - O(n) ⚡

\`\`\`javascript
function fib(n, memo = {}) {
    // قبلاً حساب شده؟
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    // ذخیره کن برای بعد
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
// fib(50) فوری‌ه ✅
\`\`\`

### بهینه‌سازی فضا - O(1) فضا 🎯

\`\`\`javascript
function fib(n) {
    if (n <= 1) return n;
    // فقط دو متغیر قبلی رو نگه دار
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
\`\`\`

---

## مراحل حل مسئله DP

۱. **تعریف حالت:** dp[i] چی رو نشون می‌ده؟
۲. **پیدا کردن رابطه:** dp[i] چطور به زیرمسائل کوچکتر مربوطه؟
۳. **حالت‌های پایه:** مقادیر شروع چیه؟
۴. **ترتیب:** جدول رو از کدوم جهت پر کنیم؟
۵. **بهینه‌سازی:** می‌تونیم فضا رو کم کنیم؟

---

## جدول مرجع سریع

| رویکرد | روش | مزیت | معایب |
|--------|-----|------|-------|
| بالا به پایین | بازگشت + کش | طبیعی‌تر | سربار بازگشت |
| پایین به بالا | تکرار + جدول | سریع‌تر | نیاز به ترتیب |

---

## اشتباهات رایج

### ۱. نداشتن حالت‌های پایه
❌ اشتباه: بازگشت بی‌نهایت
✅ درست: همیشه \`if (n <= 1) return n\` داشته باش!

### ۲. تعریف حالت اشتباه
❌ اشتباه: نمی‌دونی dp[i] یعنی چی
✅ درست: قبل از کد، واضح بنویس dp[i] چی نشون می‌ده

### ۳. چک نکردن memo اول
❌ اشتباه: قبل از چک کردن حساب می‌کنه
✅ درست: اول \`if (n in memo)\` رو چک کن!

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- زیرمسائل همپوشان داری ✅
- ساختار بهینه داری
- مسئله بهینه‌سازی داری (حداکثر، حداقل)
- شمارش راه‌ها می‌خوای

**استفاده نکن وقتی:**
- زیرمسائل مستقلن (Divide & Conquer بهتره) ❌
- فضای حالت خیلی بزرگه
- جواب دقیق نمی‌خوای (Greedy شاید کافیه)

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| نکته کلیدی | جواب‌ها رو یادت بمونه ⚡ |
| بالا به پایین | بازگشت + کش |
| پایین به بالا | تکرار + جدول |
| زمان | معمولاً O(n) یا O(n²) |
| کاربرد | بهینه‌سازی، شمارش |

> **یک خطی:** DP = بازگشت + memoization. اگه همون زیرمسئله رو دو بار حل می‌کنی، جواب رو ذخیره کن! O(2^n) رو به O(n) تبدیل می‌کنه ⚡
`,

  visualizationId: 'dp-intro',
  exerciseId: 'dp-introduction',
};

export default dpIntroductionLesson;
