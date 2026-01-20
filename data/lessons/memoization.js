export const memoizationLesson = {
  id: 'memoization',
  title: 'Memoization (Top-Down)',
  titleFa: 'حافظه‌سازی (بالا به پایین)',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Memoization - Top-Down DP

## What is Memoization?

Like writing answers on a cheat sheet - if you've solved it before, just look it up!

**Think of it like:**
- A student's answer key - don't re-solve, just look up
- Browser cache - don't re-download, use saved version
- Phone contacts - don't memorize, just search

---

## Why Should You Care?

- Most intuitive way to add DP to recursion
- Just add a cache to your recursive solution
- Easier to think about than bottom-up
- Only computes what's needed

---

## The Pattern

\`\`\`javascript
function solve(params, memo = {}) {
    // 1. Create a unique key
    const key = createKey(params);
    
    // 2. Check if already solved
    if (key in memo) return memo[key];
    
    // 3. Base case
    if (isBaseCase(params)) return baseValue;
    
    // 4. Solve and cache
    memo[key] = /* recursive solution */;
    
    // 5. Return cached result
    return memo[key];
}
\`\`\`

---

## Example 1: Climbing Stairs

\`\`\`javascript
function climbStairs(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return n;
    
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
    return memo[n];
}
// climbStairs(5) = 8 ways
\`\`\`

---

## Example 2: Unique Paths (2D)

\`\`\`javascript
function uniquePaths(m, n, memo = {}) {
    const key = m + ',' + n;  // 2D key
    
    if (key in memo) return memo[key];
    if (m === 1 || n === 1) return 1;
    
    memo[key] = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo);
    return memo[key];
}
// uniquePaths(3, 7) = 28
\`\`\`

---

## Example 3: Coin Change

\`\`\`javascript
function coinChange(coins, amount, memo = {}) {
    if (amount in memo) return memo[amount];
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    
    let min = Infinity;
    for (let coin of coins) {
        const result = coinChange(coins, amount - coin, memo);
        if (result >= 0) {
            min = Math.min(min, result + 1);
        }
    }
    
    memo[amount] = min === Infinity ? -1 : min;
    return memo[amount];
}
// coinChange([1,2,5], 11) = 3 (5+5+1)
\`\`\`

---

## Example 4: Longest Common Subsequence

\`\`\`javascript
function lcs(s1, s2, i = 0, j = 0, memo = {}) {
    const key = i + ',' + j;
    
    if (key in memo) return memo[key];
    if (i >= s1.length || j >= s2.length) return 0;
    
    if (s1[i] === s2[j]) {
        memo[key] = 1 + lcs(s1, s2, i + 1, j + 1, memo);
    } else {
        memo[key] = Math.max(
            lcs(s1, s2, i + 1, j, memo),
            lcs(s1, s2, i, j + 1, memo)
        );
    }
    return memo[key];
}
// lcs("abcde", "ace") = 3
\`\`\`

---

## Common Mistakes

### 1. Wrong Key for 2D Problems
\`\`\`javascript
// ❌ WRONG - key collision
const key = m + n;  // (2,3) and (3,2) both = 5!

// ✅ CORRECT - unique key
const key = m + ',' + n;  // "2,3" vs "3,2"
\`\`\`

### 2. Checking Memo After Calculation
\`\`\`javascript
// ❌ WRONG - calculates first
memo[n] = solve(n - 1) + solve(n - 2);
if (n in memo) return memo[n];

// ✅ CORRECT - check first
if (n in memo) return memo[n];
memo[n] = solve(n - 1) + solve(n - 2);
\`\`\`

### 3. Not Passing Memo to Recursive Calls
\`\`\`javascript
// ❌ WRONG - creates new memo each time
memo[n] = solve(n - 1) + solve(n - 2);

// ✅ CORRECT - pass memo
memo[n] = solve(n - 1, memo) + solve(n - 2, memo);
\`\`\`

---

## Memoization vs Tabulation

| Memoization | Tabulation |
|-------------|------------|
| Top-down | Bottom-up |
| Recursive | Iterative |
| Only computes needed | Computes all |
| Risk of stack overflow | No stack risk |
| More intuitive | Often faster |

---

## Interview Tips

- Start with plain recursion, then add memo
- "I'll add memoization to avoid redundant calculations"
- Use object/Map for memo (Map is faster)
- For 2D, use string key like "i,j"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Approach | Recursion + cache |
| When to use | Overlapping subproblems |
| Key creation | Unique for each state |
| Time | Usually O(n) or O(n²) |

> **One-liner:** Memoization = recursion + cache. Check memo first, solve if not found, save result. Just add a cache to your recursive solution!
`,

  contentFa: `
# حافظه‌سازی - DP بالا به پایین

## حافظه‌سازی چیست؟

مثل نوشتن جواب‌ها روی برگه تقلب - اگه قبلاً حلش کردی، فقط نگاه کن!

**مثل این فکر کن:**
- کلید جواب دانش‌آموز - دوباره حل نکن، فقط نگاه کن
- کش مرورگر - دوباره دانلود نکن، نسخه ذخیره شده رو استفاده کن
- مخاطبین گوشی - حفظ نکن، فقط جستجو کن

---

## چرا باید اهمیت بدی؟

- شهودی‌ترین راه برای اضافه کردن DP به بازگشت
- فقط یه کش به جواب بازگشتیت اضافه کن
- راحت‌تر از پایین به بالا فکر می‌شه
- فقط چیزی که لازمه رو حساب می‌کنه

---

## الگو

solve(params, memo = {}):
    // 1. یه کلید یکتا بساز
    key = createKey(params)
    
    // 2. چک کن قبلاً حل شده
    اگه key در memo هست: return memo[key]
    
    // 3. حالت پایه
    اگه isBaseCase(params): return baseValue
    
    // 4. حل کن و کش کن
    memo[key] = /* جواب بازگشتی */
    
    // 5. نتیجه کش شده رو برگردون
    return memo[key]

---

## مثال ۱: بالا رفتن از پله

climbStairs(n, memo = {}):
    اگه n در memo هست: return memo[n]
    اگه n <= 2: return n
    
    memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo)
    return memo[n]

climbStairs(5) = 8 راه

---

## مثال ۲: مسیرهای یکتا (2D)

uniquePaths(m, n, memo = {}):
    key = m + ',' + n  // کلید 2D
    
    اگه key در memo هست: return memo[key]
    اگه m === 1 یا n === 1: return 1
    
    memo[key] = uniquePaths(m - 1, n, memo) + uniquePaths(m, n - 1, memo)
    return memo[key]

uniquePaths(3, 7) = 28

---

## مثال ۳: تعویض سکه

coinChange(coins, amount, memo = {}):
    اگه amount در memo هست: return memo[amount]
    اگه amount === 0: return 0
    اگه amount < 0: return -1
    
    min = Infinity
    برای هر coin در coins:
        result = coinChange(coins, amount - coin, memo)
        اگه result >= 0:
            min = Math.min(min, result + 1)
    
    memo[amount] = min === Infinity ? -1 : min
    return memo[amount]

coinChange([1,2,5], 11) = 3 (5+5+1)

---

## مثال ۴: طولانی‌ترین زیردنباله مشترک

lcs(s1, s2, i = 0, j = 0, memo = {}):
    key = i + ',' + j
    
    اگه key در memo هست: return memo[key]
    اگه i >= s1.length یا j >= s2.length: return 0
    
    اگه s1[i] === s2[j]:
        memo[key] = 1 + lcs(s1, s2, i + 1, j + 1, memo)
    وگرنه:
        memo[key] = max(
            lcs(s1, s2, i + 1, j, memo),
            lcs(s1, s2, i, j + 1, memo)
        )
    return memo[key]

lcs("abcde", "ace") = 3

---

## اشتباهات رایج

### ۱. کلید اشتباه برای مسائل 2D
❌ اشتباه: key = m + n (برخورد کلید!)
✅ درست: key = m + ',' + n (کلید یکتا)

### ۲. چک کردن memo بعد از محاسبه
❌ اشتباه: اول حساب می‌کنه
✅ درست: اول چک کن

### ۳. پاس ندادن memo به فراخوانی‌های بازگشتی
❌ اشتباه: هر بار memo جدید می‌سازه
✅ درست: memo رو پاس بده

---

## حافظه‌سازی در مقابل جدول‌بندی

| حافظه‌سازی | جدول‌بندی |
|-----------|----------|
| بالا به پایین | پایین به بالا |
| بازگشتی | تکراری |
| فقط لازم‌ها رو حساب می‌کنه | همه رو حساب می‌کنه |
| خطر سرریز پشته | بدون خطر پشته |
| شهودی‌تر | معمولاً سریع‌تر |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| رویکرد | بازگشت + کش |
| کی استفاده کنیم | زیرمسائل همپوشان |
| ساخت کلید | یکتا برای هر حالت |
| زمان | معمولاً O(n) یا O(n²) |

> **یک خطی:** حافظه‌سازی = بازگشت + کش. اول memo رو چک کن، اگه نبود حل کن، نتیجه رو ذخیره کن. فقط یه کش به جواب بازگشتیت اضافه کن!
`,

  visualizationId: 'memoization',
  exerciseId: 'memoization',
};

export default memoizationLesson;
