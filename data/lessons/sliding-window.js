export const slidingWindowLesson = {
  id: 'sliding-window',
  title: 'Sliding Window',
  titleFa: 'پنجره لغزان',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Sliding Window - The Moving Frame

## What is Sliding Window?

Imagine looking through a window on a train - the view changes as you move, but the window size stays the same. That's sliding window!

**Think of it like:**
- A moving picture frame over a long photo
- A magnifying glass sliding over text
- A spotlight moving across a stage

---

## Why Should You Care?

- Turns O(n²) or O(n³) into O(n)
- 15%+ of array/string interview questions
- Essential for subarray/substring problems
- Very common pattern in real applications

---

## Two Types of Sliding Window

### Type 1: Fixed Size Window
\`\`\`javascript
// Window size k stays constant
for (let i = k; i < arr.length; i++) {
    // Add arr[i], remove arr[i - k]
}
\`\`\`

### Type 2: Variable Size Window
\`\`\`javascript
// Window expands and shrinks
let left = 0;
for (let right = 0; right < arr.length; right++) {
    // Expand: add arr[right]
    while (/* window invalid */) {
        // Shrink: remove arr[left], left++
    }
}
\`\`\`

---

## Problem 1: Max Sum of K Elements (Fixed)

\`\`\`javascript
function maxSumFixed(arr, k) {
    // Calculate first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    let maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];  // Add new, remove old
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}
// Time: O(n), Space: O(1)
\`\`\`

---

## Problem 2: Smallest Subarray with Sum >= Target (Variable)

\`\`\`javascript
function minSubArrayLen(target, arr) {
    let left = 0, sum = 0;
    let minLen = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        sum += arr[right];  // Expand window
        
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= arr[left];  // Shrink window
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}
\`\`\`

---

## Problem 3: Longest Substring Without Repeating

\`\`\`javascript
function lengthOfLongestSubstring(s) {
    const seen = new Map();  // char -> last index
    let left = 0, maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right]) && seen.get(s[right]) >= left) {
            left = seen.get(s[right]) + 1;  // Jump past duplicate
        }
        seen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
// "abcabcbb" → 3 ("abc")
\`\`\`

---

## Problem 4: Max Consecutive Ones with K Flips

\`\`\`javascript
function longestOnes(nums, k) {
    let left = 0, zeros = 0, maxLen = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        
        while (zeros > k) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}
\`\`\`

---

## The Template

\`\`\`javascript
function slidingWindow(arr) {
    let left = 0;
    let result = 0;
    // Initialize window state (sum, count, map, etc.)
    
    for (let right = 0; right < arr.length; right++) {
        // 1. Add arr[right] to window
        
        // 2. Shrink window while invalid
        while (/* window invalid */) {
            // Remove arr[left] from window
            left++;
        }
        
        // 3. Update result
        result = Math.max(result, right - left + 1);
    }
    
    return result;
}
\`\`\`

---

## Common Mistakes

### 1. Forgetting to Update Window State
\`\`\`javascript
// ❌ WRONG - didn't add to window
for (let right = 0; right < arr.length; right++) {
    while (sum >= target) { ... }
}

// ✅ CORRECT - add before checking
for (let right = 0; right < arr.length; right++) {
    sum += arr[right];  // Add first!
    while (sum >= target) { ... }
}
\`\`\`

### 2. Wrong Window Size Calculation
\`\`\`javascript
// ❌ WRONG
windowSize = right - left;

// ✅ CORRECT
windowSize = right - left + 1;  // +1 because both inclusive
\`\`\`

### 3. Not Handling Empty Result
\`\`\`javascript
// ❌ WRONG - returns Infinity
return minLen;

// ✅ CORRECT - handle no valid window
return minLen === Infinity ? 0 : minLen;
\`\`\`

---

## When to Use Sliding Window

**Keywords to look for:**
- "Subarray" or "substring"
- "Contiguous"
- "Maximum/minimum length"
- "Sum equals/greater than"
- "At most K distinct"

---

## Interview Tips

- Fixed size? Calculate first window, then slide
- Variable size? Expand right, shrink left
- "I'll use sliding window for O(n) time"
- Track window state with sum, count, or Map

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n) |
| Space | O(1) or O(k) |
| Fixed | Add new, remove old |
| Variable | Expand right, shrink left |

> **One-liner:** Sliding window = maintain a window that slides through array. Fixed size: add/remove. Variable size: expand/shrink. O(n) for subarray problems!
`,

  contentFa: `
# پنجره لغزان - قاب متحرک

## پنجره لغزان چیست؟

تصور کن از پنجره قطار نگاه می‌کنی - منظره عوض می‌شه ولی اندازه پنجره ثابته. این پنجره لغزانه!

**مثل این فکر کن:**
- قاب عکس متحرک روی یه عکس بلند
- ذره‌بین که روی متن می‌لغزه
- نورافکن که روی صحنه حرکت می‌کنه

---

## چرا باید اهمیت بدی؟

- O(n²) یا O(n³) رو به O(n) تبدیل می‌کنه
- ۱۵%+ سوالات مصاحبه آرایه/رشته
- ضروری برای مسائل زیرآرایه/زیررشته
- الگوی خیلی رایج در کاربردهای واقعی

---

## دو نوع پنجره لغزان

### نوع ۱: پنجره با اندازه ثابت
// اندازه پنجره k ثابت می‌مونه
برای i از k تا arr.length:
    // arr[i] رو اضافه کن، arr[i - k] رو حذف کن

### نوع ۲: پنجره با اندازه متغیر
// پنجره بزرگ و کوچک می‌شه
left = 0
برای right از 0 تا arr.length:
    // گسترش: arr[right] رو اضافه کن
    تا وقتی /* پنجره نامعتبر */:
        // کوچک کردن: arr[left] رو حذف کن، left++

---

## مسئله ۱: حداکثر مجموع K عنصر (ثابت)

maxSumFixed(arr, k):
    // اولین پنجره رو حساب کن
    windowSum = 0
    برای i از 0 تا k:
        windowSum += arr[i]
    
    maxSum = windowSum
    
    // پنجره رو بلغزون
    برای i از k تا arr.length:
        windowSum += arr[i] - arr[i - k]  // جدید اضافه، قدیمی حذف
        maxSum = max(maxSum, windowSum)
    
    return maxSum

زمان: O(n)، فضا: O(1)

---

## مسئله ۲: کوچکترین زیرآرایه با مجموع >= هدف (متغیر)

minSubArrayLen(target, arr):
    left = 0, sum = 0
    minLen = Infinity
    
    برای right از 0 تا arr.length:
        sum += arr[right]  // پنجره رو گسترش بده
        
        تا وقتی sum >= target:
            minLen = min(minLen, right - left + 1)
            sum -= arr[left]  // پنجره رو کوچک کن
            left++
    
    return minLen === Infinity ? 0 : minLen

---

## مسئله ۳: طولانی‌ترین زیررشته بدون تکرار

lengthOfLongestSubstring(s):
    seen = Map()  // کاراکتر -> آخرین اندیس
    left = 0, maxLen = 0
    
    برای right از 0 تا s.length:
        اگه seen.has(s[right]) و seen.get(s[right]) >= left:
            left = seen.get(s[right]) + 1  // از تکراری رد شو
        seen.set(s[right], right)
        maxLen = max(maxLen, right - left + 1)
    
    return maxLen

"abcabcbb" → 3 ("abc")

---

## الگو

slidingWindow(arr):
    left = 0
    result = 0
    // حالت پنجره رو مقداردهی کن (sum، count، map و غیره)
    
    برای right از 0 تا arr.length:
        // 1. arr[right] رو به پنجره اضافه کن
        
        // 2. پنجره رو کوچک کن تا معتبر بشه
        تا وقتی /* پنجره نامعتبر */:
            // arr[left] رو از پنجره حذف کن
            left++
        
        // 3. نتیجه رو آپدیت کن
        result = max(result, right - left + 1)
    
    return result

---

## اشتباهات رایج

### ۱. فراموش کردن آپدیت حالت پنجره
❌ اشتباه: به پنجره اضافه نکرد
✅ درست: اول اضافه کن!

### ۲. محاسبه اندازه پنجره اشتباه
❌ اشتباه: windowSize = right - left
✅ درست: windowSize = right - left + 1 (+1 چون هر دو شامل می‌شن)

### ۳. هندل نکردن نتیجه خالی
❌ اشتباه: Infinity برمی‌گردونه
✅ درست: پنجره معتبر نبود رو هندل کن

---

## کی از پنجره لغزان استفاده کنیم

**کلمات کلیدی:**
- "زیرآرایه" یا "زیررشته"
- "پیوسته"
- "حداکثر/حداقل طول"
- "مجموع برابر/بزرگتر از"
- "حداکثر K متمایز"

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n) |
| فضا | O(1) یا O(k) |
| ثابت | جدید اضافه، قدیمی حذف |
| متغیر | راست گسترش، چپ کوچک |

> **یک خطی:** پنجره لغزان = پنجره‌ای که از آرایه می‌لغزه. اندازه ثابت: اضافه/حذف. اندازه متغیر: گسترش/کوچک. O(n) برای مسائل زیرآرایه!
`,

  visualizationId: 'sliding-window',
  exerciseId: 'sliding-window',
};

export default slidingWindowLesson;
