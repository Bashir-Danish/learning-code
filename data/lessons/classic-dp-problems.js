export const classicDpProblemsLesson = {
  id: 'classic-dp-problems',
  title: 'Classic DP Problems',
  titleFa: 'مسائل کلاسیک DP',
  difficulty: 'hard',
  estimatedTime: '90 min',
  
  content: `
# Classic DP Problems - The Greatest Hits ⚡

## What are Classic DP Problems? (Simple Explanation)

Imagine you're studying for an exam. There are certain questions that appear every year - if you know these, you'll solve 80% of the test!

**Think of it like this:**
- Like learning 5 guitar chords that let you play 100 songs
- Like learning 5 recipes that let you make 20 dishes
- These 5 problems are the DNA of most DP questions!

---

## Why Should You Care?

These 5 problems appear in 80% of DP interviews. Master them!

**Real example:** In a Google interview they ask "How do you find the best path?" - that's Edit Distance!

- ✅ Know these 5 = solve most DP questions
- ❌ Don't know these 5 = get stuck in interviews

---

## 1. 0/1 Knapsack

**Problem:** Maximize value within weight capacity.

Imagine you're packing a suitcase for a trip. Each item has a weight and value. The suitcase has limited capacity. What do you take to maximize value?

**Example:** weights = [1, 2, 3], values = [6, 10, 12], capacity = 5
- Item 2 (weight=2, value=10) + Item 3 (weight=3, value=12) = value 22 ✅

\`\`\`javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    // dp[i][w] = max value with first i items and capacity w
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];  // Don't take ❌
            if (weights[i - 1] <= w) {
                // Take if it fits ✅
                dp[i][w] = Math.max(dp[i][w], 
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][capacity];
}
\`\`\`

**State:** dp[i][w] = max value with i items and capacity w
**Choice:** Take or skip each item

---

## 2. Longest Increasing Subsequence (LIS)

**Problem:** Length of longest subsequence where numbers are increasing.

Imagine you have stairs with different heights. You want to find the longest path where you always go up (never down).

**Example:** [10, 9, 2, 5, 3, 7, 101, 18]
- LIS = [2, 3, 7, 101] or [2, 5, 7, 101] → length = 4 ✅

\`\`\`javascript
function lengthOfLIS(nums) {
    // dp[i] = length of LIS ending at index i
    const dp = new Array(nums.length).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // Can extend previous subsequence
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
}
\`\`\`

**State:** dp[i] = length of LIS ending at index i
**Transition:** If nums[i] > nums[j], we can extend

---

## 3. Edit Distance

**Problem:** Minimum operations (insert, delete, replace) to convert word1 to word2.

Imagine you typed a word in Word and want to convert it to another word. How many keystrokes do you need?

**Example:** "horse" → "ros"
- horse → rorse (replace h with r)
- rorse → rose (delete r)
- rose → ros (delete e)
- Answer = 3 ✅

\`\`\`javascript
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    // dp[i][j] = min operations for word1[0..i-1] to word2[0..j-1]
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Base case: converting empty string
    for (let i = 0; i <= m; i++) dp[i][0] = i;  // Delete all
    for (let j = 0; j <= n; j++) dp[0][j] = j;  // Insert all
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // Characters match ✅
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j],    // Delete ❌
                    dp[i][j-1],    // Insert ➕
                    dp[i-1][j-1]   // Replace 🔄
                );
            }
        }
    }
    return dp[m][n];
}
\`\`\`

**State:** dp[i][j] = min operations for first i chars of word1 to first j chars of word2
**Choice:** Insert, delete, or replace

---

## 4. Maximum Subarray (Kadane)

**Problem:** Contiguous subarray with largest sum.

Imagine you're looking at daily profit/loss of a stock. You want to find the best time period with maximum profit.

**Example:** [-2, 1, -3, 4, -1, 2, 1, -5, 4]
- Subarray [4, -1, 2, 1] → sum = 6 ✅

\`\`\`javascript
function maxSubArray(nums) {
    let maxSum = nums[0];      // Best answer so far
    let currentSum = nums[0];  // Current subarray sum
    
    for (let i = 1; i < nums.length; i++) {
        // Either start fresh or continue previous
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}
\`\`\`

**Key idea:** At each point, either start fresh or continue
**Time:** O(n) - very efficient! ⚡

---

## 5. House Robber

**Problem:** Maximum money without robbing two adjacent houses.

Imagine you're a thief (just in this example! 😄) and want to rob a street. But if you rob two adjacent houses, the alarm goes off!

**Example:** [2, 7, 9, 3, 1]
- House 1 (2) + House 3 (9) + House 5 (1) = 12 ✅
- Or House 2 (7) + House 4 (3) = 10 ❌
- Answer = 12

\`\`\`javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0;  // Two houses back
    let prev1 = 0;  // One house back
    
    for (let num of nums) {
        // Either rob this house + prev2, or skip
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
\`\`\`

**State:** dp[i] = max money up to house i
**Choice:** Rob this house (+ prev2) or skip (prev1)

---

## Quick Reference Table

| Problem | Time | Space | Key | Difficulty |
|---------|------|-------|-----|------------|
| Knapsack | O(nW) | O(nW) | Take or skip | ⭐⭐⭐ |
| LIS | O(n²) | O(n) | Extend previous | ⭐⭐ |
| Edit Distance | O(mn) | O(mn) | 3 operations | ⭐⭐⭐ |
| Max Subarray | O(n) | O(1) | Extend or restart | ⭐ |
| House Robber | O(n) | O(1) | Skip adjacent | ⭐⭐ |

---

## Common Mistakes

### 1. Forgetting Base Case
❌ Wrong: Going straight to the loop without initialization
✅ Correct: Always initialize dp[0] or dp[0][0] first

### 2. Index Mistakes
❌ Wrong: dp[i] = dp[i-1] + arr[i] (when i starts from 1)
✅ Correct: dp[i] = dp[i-1] + arr[i-1] (because array starts from 0)

### 3. Premature Optimization
❌ Wrong: Trying to optimize space first
✅ Correct: Get correct answer first, then optimize

---

## When to Use

**Use when:**
- You have an optimization problem (max, min)
- You have multiple choices (take/skip, go/stay)
- You have overlapping subproblems

**Don't use when:**
- You want a unique answer (not optimal)
- Order doesn't matter (maybe Greedy is better)
- You have a graph (maybe BFS/DFS is better)

---

## DP Solving Pattern

1. **Define state:** What does dp[i] or dp[i][j] represent?
2. **Find transition:** How do we get from previous states to current?
3. **Base case:** What are the initial values?
4. **Answer:** Which dp cell has the final answer?

---

## Quick Summary

| Feature | Description |
|---------|-------------|
| Number of problems | 5 key problems |
| Interview coverage | 80% of DP questions |
| Difficulty | Medium to hard |
| Prerequisites | Memoization and Tabulation |

> **One-liner:** Master these 5: Knapsack, LIS, Edit Distance, Kadane, House Robber. They cover 80% of DP interviews! ⚡
`,

  contentFa: `
# مسائل کلاسیک DP - بهترین‌ها ⚡

## مسائل کلاسیک DP چیست؟ (توضیح ساده)

تصور کن داری برای کنکور می‌خونی. یه سری سوالات هستن که هر سال میان - اگه اینا رو بلد باشی، ۸۰٪ آزمون رو حل می‌کنی!

**اینطوری فکر کن:**
- مثل یادگیری ۵ تا آکورد گیتار که ۱۰۰ تا آهنگ باهاشون زده می‌شه
- مثل یادگیری ۵ تا دستور غذا که می‌تونی ۲۰ تا غذا باهاشون درست کنی
- این ۵ مسئله، DNA اکثر سوالات DP هستن!

---

## چرا باید اهمیت بدی؟

این ۵ مسئله در ۸۰٪ مصاحبه‌های DP میان. مسلطشون شو!

**مثال واقعی:** تو مصاحبه گوگل ازت می‌پرسن "چطور بهترین مسیر رو پیدا کنی؟" - این همون Edit Distance هست!

- ✅ این ۵ تا رو بلد باشی = اکثر سوالات DP رو حل می‌کنی
- ❌ این ۵ تا رو بلد نباشی = تو مصاحبه گیر می‌کنی

---

## ۱. کوله‌پشتی 0/1 (Knapsack)

**مسئله:** حداکثر ارزش رو با محدودیت ظرفیت به دست بیار.

تصور کن داری برای سفر چمدون می‌بندی. هر وسیله یه وزن و یه ارزش داره. چمدون ظرفیت محدود داره. چی ببری که بیشترین ارزش رو داشته باشه؟

**مثال:** وزن‌ها = [1, 2, 3]، ارزش‌ها = [6, 10, 12]، ظرفیت = 5
- آیتم ۲ (وزن=2، ارزش=10) + آیتم ۳ (وزن=3، ارزش=12) = ارزش ۲۲ ✅

\`\`\`javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    // dp[i][w] = حداکثر ارزش با i آیتم اول و ظرفیت w
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];  // نگیر ❌
            if (weights[i - 1] <= w) {
                // بگیر اگه جا داره ✅
                dp[i][w] = Math.max(dp[i][w], 
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][capacity];
}
\`\`\`

**حالت:** dp[i][w] = حداکثر ارزش با i آیتم و ظرفیت w
**انتخاب:** هر آیتم رو بگیر یا نگیر

---

## ۲. طولانی‌ترین زیردنباله صعودی (LIS)

**مسئله:** طول طولانی‌ترین زیردنباله‌ای که اعدادش صعودی هستن.

تصور کن یه سری پله داری با ارتفاع‌های مختلف. می‌خوای طولانی‌ترین مسیر رو پیدا کنی که همیشه بالا بری (هیچوقت پایین نیای).

**مثال:** [10, 9, 2, 5, 3, 7, 101, 18]
- LIS = [2, 3, 7, 101] یا [2, 5, 7, 101] → طول = ۴ ✅

\`\`\`javascript
function lengthOfLIS(nums) {
    // dp[i] = طول LIS که به اندیس i ختم می‌شه
    const dp = new Array(nums.length).fill(1);
    let maxLen = 1;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                // می‌تونم این عدد رو به دنباله قبلی اضافه کنم
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }
    return maxLen;
}
\`\`\`

**حالت:** dp[i] = طول LIS که به اندیس i ختم می‌شه
**انتقال:** اگه nums[i] > nums[j]، می‌تونیم گسترش بدیم

---

## ۳. فاصله ویرایش (Edit Distance)

**مسئله:** حداقل عملیات (درج، حذف، جایگزینی) برای تبدیل word1 به word2.

تصور کن داری یه کلمه رو تو ورد تایپ کردی و می‌خوای به کلمه دیگه تبدیلش کنی. چند تا کلید باید بزنی؟

**مثال:** "horse" → "ros"
- horse → rorse (جایگزینی h با r)
- rorse → rose (حذف r)
- rose → ros (حذف e)
- جواب = ۳ ✅

\`\`\`javascript
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    // dp[i][j] = حداقل عملیات برای word1[0..i-1] به word2[0..j-1]
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // حالت پایه: تبدیل رشته خالی
    for (let i = 0; i <= m; i++) dp[i][0] = i;  // حذف همه
    for (let j = 0; j <= n; j++) dp[0][j] = j;  // درج همه
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // کاراکترها یکسانن ✅
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j],    // حذف ❌
                    dp[i][j-1],    // درج ➕
                    dp[i-1][j-1]   // جایگزینی 🔄
                );
            }
        }
    }
    return dp[m][n];
}
\`\`\`

**حالت:** dp[i][j] = حداقل عملیات برای i کاراکتر اول word1 به j کاراکتر اول word2
**انتخاب:** درج، حذف، یا جایگزینی

---

## ۴. حداکثر زیرآرایه (Kadane)

**مسئله:** زیرآرایه پیوسته با بیشترین مجموع.

تصور کن داری سود و زیان روزانه یه سهام رو نگاه می‌کنی. می‌خوای بهترین بازه زمانی رو پیدا کنی که بیشترین سود رو داشته باشه.

**مثال:** [-2, 1, -3, 4, -1, 2, 1, -5, 4]
- زیرآرایه [4, -1, 2, 1] → مجموع = ۶ ✅

\`\`\`javascript
function maxSubArray(nums) {
    let maxSum = nums[0];      // بهترین جواب تا الان
    let currentSum = nums[0];  // مجموع زیرآرایه فعلی
    
    for (let i = 1; i < nums.length; i++) {
        // یا شروع جدید یا ادامه قبلی
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}
\`\`\`

**ایده کلیدی:** در هر نقطه، یا شروع جدید کن یا ادامه بده
**زمان:** O(n) - خیلی کارآمد! ⚡

---

## ۵. دزد خانه (House Robber)

**مسئله:** حداکثر پول بدون دزدی از دو خانه مجاور.

تصور کن یه دزد هستی (فقط تو این مثال! 😄) و می‌خوای از یه خیابون دزدی کنی. ولی اگه از دو خانه کناری دزدی کنی، آژیر می‌زنه!

**مثال:** [2, 7, 9, 3, 1]
- خانه ۱ (2) + خانه ۳ (9) + خانه ۵ (1) = ۱۲ ✅
- یا خانه ۲ (7) + خانه ۴ (3) = ۱۰ ❌
- جواب = ۱۲

\`\`\`javascript
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0;  // دو خانه قبل
    let prev1 = 0;  // یک خانه قبل
    
    for (let num of nums) {
        // یا این خانه رو بزن + دو تا قبل، یا رد کن
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
\`\`\`

**حالت:** dp[i] = حداکثر پول تا خانه i
**انتخاب:** این خانه رو بزن (+ prev2) یا رد کن (prev1)

---

## جدول مرجع سریع

| مسئله | زمان | فضا | کلید | سختی |
|-------|------|-----|------|------|
| کوله‌پشتی | O(nW) | O(nW) | بگیر یا رد کن | ⭐⭐⭐ |
| LIS | O(n²) | O(n) | گسترش قبلی | ⭐⭐ |
| فاصله ویرایش | O(mn) | O(mn) | ۳ عملیات | ⭐⭐⭐ |
| حداکثر زیرآرایه | O(n) | O(1) | گسترش یا شروع مجدد | ⭐ |
| دزد خانه | O(n) | O(1) | مجاور رو رد کن | ⭐⭐ |

---

## اشتباهات رایج

### ۱. فراموش کردن حالت پایه
❌ اشتباه: مستقیم رفتن سراغ حلقه بدون مقداردهی اولیه
✅ درست: همیشه اول dp[0] یا dp[0][0] رو مقداردهی کن

### ۲. اشتباه در اندیس‌ها
❌ اشتباه: dp[i] = dp[i-1] + arr[i] (وقتی i از ۱ شروع می‌شه)
✅ درست: dp[i] = dp[i-1] + arr[i-1] (چون آرایه از ۰ شروع می‌شه)

### ۳. بهینه‌سازی زودهنگام
❌ اشتباه: اول سعی کنی فضا رو بهینه کنی
✅ درست: اول جواب درست بده، بعد بهینه کن

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- سوال بهینه‌سازی داری (حداکثر، حداقل)
- انتخاب‌های متعدد داری (بگیر/نگیر، برو/نرو)
- زیرمسئله‌های تکراری داری

**استفاده نکن وقتی:**
- جواب یکتا می‌خوای (نه بهینه)
- ترتیب مهم نیست (شاید Greedy بهتره)
- گراف داری (شاید BFS/DFS بهتره)

---

## الگوی حل DP

۱. **حالت رو تعریف کن:** dp[i] یا dp[i][j] چی نشون می‌ده؟
۲. **انتقال رو پیدا کن:** چطور از حالت‌های قبلی به فعلی برسیم؟
۳. **حالت پایه:** مقادیر اولیه چین؟
۴. **جواب:** کدوم خونه dp جواب نهایی رو داره؟

---

## خلاصه سریع

| ویژگی | توضیح |
|-------|-------|
| تعداد مسائل | ۵ مسئله کلیدی |
| پوشش مصاحبه | ۸۰٪ سوالات DP |
| سختی | متوسط تا سخت |
| پیش‌نیاز | Memoization و Tabulation |

> **یک خطی:** این ۵ تا رو مسلط شو: کوله‌پشتی، LIS، فاصله ویرایش، Kadane، دزد خانه. ۸۰٪ مصاحبه‌های DP رو پوشش می‌دن! ⚡
`,

  visualizationId: 'classic-dp',
  exerciseId: 'classic-dp-problems',
};

export default classicDpProblemsLesson;
