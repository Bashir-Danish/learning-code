export const tabulationLesson = {
  id: 'tabulation',
  title: 'Tabulation (Bottom-Up)',
  titleFa: 'جدول‌بندی (پایین به بالا)',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Tabulation - Bottom-Up DP

## What is Tabulation?

Build your answer from the ground up, like building a pyramid - start with the base, work your way to the top.

**Think of it like:**
- Building a pyramid - base first, then up
- Filling a spreadsheet - cell by cell
- Climbing stairs - step 1, then 2, then 3...

---

## Why Should You Care?

- No recursion overhead (faster in practice)
- No stack overflow risk
- Often easier to optimize space
- Preferred in production code

---

## The Pattern

\`\`\`javascript
function solve(n) {
    // 1. Create DP table
    const dp = new Array(n + 1);
    
    // 2. Initialize base cases
    dp[0] = baseValue0;
    dp[1] = baseValue1;
    
    // 3. Fill table iteratively
    for (let i = 2; i <= n; i++) {
        dp[i] = /* combine smaller subproblems */;
    }
    
    // 4. Return answer
    return dp[n];
}
\`\`\`

---

## Example 1: Climbing Stairs

\`\`\`javascript
function climbStairs(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1);
    dp[1] = 1;  // 1 way to climb 1 stair
    dp[2] = 2;  // 2 ways to climb 2 stairs
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space optimized - O(1)
function climbStairsOpt(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
\`\`\`

---

## Example 2: Unique Paths (2D)

\`\`\`javascript
function uniquePaths(m, n) {
    // Create 2D table
    const dp = Array(m).fill().map(() => Array(n).fill(1));
    
    // First row and column are all 1s (only one way)
    // Fill rest of table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    
    return dp[m - 1][n - 1];
}

// Space optimized - O(n)
function uniquePathsOpt(m, n) {
    const dp = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}
\`\`\`

---

## Example 3: Coin Change

\`\`\`javascript
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // 0 coins for amount 0
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}
// coinChange([1,2,5], 11) = 3
\`\`\`

---

## Example 4: Longest Common Subsequence

\`\`\`javascript
function longestCommonSubsequence(s1, s2) {
    const m = s1.length, n = s2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
\`\`\`

---

## Common Mistakes

### 1. Wrong Table Size
\`\`\`javascript
// ❌ WRONG - off by one
const dp = new Array(n);  // Missing dp[n]!

// ✅ CORRECT
const dp = new Array(n + 1);  // Includes dp[n]
\`\`\`

### 2. Wrong Fill Order
\`\`\`javascript
// ❌ WRONG - uses values not yet computed
for (let i = n; i >= 0; i--) {
    dp[i] = dp[i + 1] + dp[i + 2];  // Not computed yet!
}

// ✅ CORRECT - uses already computed values
for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];  // Already computed
}
\`\`\`

### 3. Forgetting Base Cases
\`\`\`javascript
// ❌ WRONG - no base cases
const dp = new Array(n + 1);
for (let i = 2; i <= n; i++) { ... }

// ✅ CORRECT - initialize base cases
const dp = new Array(n + 1);
dp[0] = 0;
dp[1] = 1;
for (let i = 2; i <= n; i++) { ... }
\`\`\`

---

## Space Optimization

Often you only need the last 1-2 rows/values:

\`\`\`javascript
// Before: O(n) space
const dp = new Array(n + 1);

// After: O(1) space
let prev2 = 0, prev1 = 1;
for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
}
\`\`\`

---

## Interview Tips

- Draw the DP table on paper first
- "I'll use bottom-up DP to avoid recursion overhead"
- Always consider space optimization
- Fill order must respect dependencies

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Approach | Iterative, build from base |
| Advantage | No stack overflow, faster |
| Space | Often optimizable to O(1) |
| Key | Fill order matters! |

> **One-liner:** Tabulation = fill a table from smallest to largest. No recursion, no stack overflow. Often faster and easier to optimize space!
`,

  contentFa: `
# جدول‌بندی - DP پایین به بالا

## جدول‌بندی چیست؟

جوابت رو از پایه بساز، مثل ساختن هرم - اول پایه، بعد بالا برو.

**مثل این فکر کن:**
- ساختن هرم - اول پایه، بعد بالا
- پر کردن صفحه گسترده - خونه به خونه
- بالا رفتن از پله - پله ۱، بعد ۲، بعد ۳...

---

## چرا باید اهمیت بدی؟

- سربار بازگشت نداره (در عمل سریع‌تر)
- خطر سرریز پشته نداره
- معمولاً بهینه‌سازی فضا راحت‌تره
- در کد تولیدی ترجیح داده می‌شه

---

## الگو

solve(n):
    // 1. جدول DP بساز
    dp = Array(n + 1)
    
    // 2. حالت‌های پایه رو مقداردهی کن
    dp[0] = baseValue0
    dp[1] = baseValue1
    
    // 3. جدول رو تکراری پر کن
    برای i از 2 تا n:
        dp[i] = /* زیرمسائل کوچکتر رو ترکیب کن */
    
    // 4. جواب رو برگردون
    return dp[n]

---

## مثال ۱: بالا رفتن از پله

climbStairs(n):
    اگه n <= 2: return n
    
    dp = Array(n + 1)
    dp[1] = 1  // 1 راه برای 1 پله
    dp[2] = 2  // 2 راه برای 2 پله
    
    برای i از 3 تا n:
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

// بهینه‌سازی فضا - O(1)
climbStairsOpt(n):
    اگه n <= 2: return n
    prev2 = 1, prev1 = 2
    برای i از 3 تا n:
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1

---

## مثال ۲: مسیرهای یکتا (2D)

uniquePaths(m, n):
    // جدول 2D بساز
    dp = Array(m).fill().map(() => Array(n).fill(1))
    
    // ردیف و ستون اول همه 1 هستن (فقط یه راه)
    // بقیه جدول رو پر کن
    برای i از 1 تا m:
        برای j از 1 تا n:
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    
    return dp[m - 1][n - 1]

// بهینه‌سازی فضا - O(n)
فقط یه ردیف نگه دار و آپدیت کن

---

## مثال ۳: تعویض سکه

coinChange(coins, amount):
    dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0  // 0 سکه برای مبلغ 0
    
    برای i از 1 تا amount:
        برای هر coin در coins:
            اگه coin <= i و dp[i - coin] !== Infinity:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] === Infinity ? -1 : dp[amount]

coinChange([1,2,5], 11) = 3

---

## مثال ۴: طولانی‌ترین زیردنباله مشترک

longestCommonSubsequence(s1, s2):
    m = s1.length, n = s2.length
    dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0))
    
    برای i از 1 تا m:
        برای j از 1 تا n:
            اگه s1[i - 1] === s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            وگرنه:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]

---

## اشتباهات رایج

### ۱. اندازه جدول اشتباه
❌ اشتباه: dp = Array(n) (dp[n] نداره!)
✅ درست: dp = Array(n + 1) (شامل dp[n])

### ۲. ترتیب پر کردن اشتباه
❌ اشتباه: از مقادیری که هنوز حساب نشدن استفاده می‌کنه
✅ درست: از مقادیر قبلاً حساب شده استفاده کن

### ۳. فراموش کردن حالت‌های پایه
❌ اشتباه: حالت‌های پایه نداره
✅ درست: حالت‌های پایه رو مقداردهی کن

---

## بهینه‌سازی فضا

معمولاً فقط ۱-۲ ردیف/مقدار آخر لازمه:

// قبل: O(n) فضا
dp = Array(n + 1)

// بعد: O(1) فضا
prev2 = 0, prev1 = 1
برای i از 2 تا n:
    curr = prev1 + prev2
    prev2 = prev1
    prev1 = curr

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| رویکرد | تکراری، از پایه بساز |
| مزیت | سرریز پشته نداره، سریع‌تر |
| فضا | معمولاً قابل بهینه‌سازی به O(1) |
| کلید | ترتیب پر کردن مهمه! |

> **یک خطی:** جدول‌بندی = جدول رو از کوچکترین به بزرگترین پر کن. بازگشت نداره، سرریز پشته نداره. معمولاً سریع‌تر و بهینه‌سازی فضا راحت‌تره!
`,

  visualizationId: 'tabulation',
  exerciseId: 'tabulation',
};

export default tabulationLesson;
