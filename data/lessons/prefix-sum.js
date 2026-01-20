export const prefixSumLesson = {
  id: 'prefix-sum',
  title: 'Prefix Sum',
  titleFa: 'مجموع پیشوندی',
  difficulty: 'medium',
  estimatedTime: '40 min',
  
  content: `
# Prefix Sum - Precompute to Speed Up

## What is Prefix Sum?

Imagine you want to know the total rainfall from day 5 to day 10. Instead of adding each day, what if you had running totals? That's prefix sum!

**Think of it like:**
- Running total in a bank account
- Cumulative score in a game
- Odometer reading (total distance traveled)

---

## Why Should You Care?

- Turns O(n) range queries into O(1)
- Essential for range sum problems
- Foundation for 2D prefix sums
- 10%+ of array interview questions

---

## The Basic Idea

\`\`\`javascript
// Original: [1, 2, 3, 4, 5]
// Prefix:   [1, 3, 6, 10, 15]
//            ↑  ↑  ↑   ↑   ↑
//            1  1+2 1+2+3 ...

// prefix[i] = sum of elements from index 0 to i
\`\`\`

---

## Building Prefix Sum Array

\`\`\`javascript
function buildPrefixSum(arr) {
    const prefix = new Array(arr.length);
    prefix[0] = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        prefix[i] = prefix[i - 1] + arr[i];
    }
    
    return prefix;
}

// arr = [1, 2, 3, 4, 5]
// prefix = [1, 3, 6, 10, 15]
\`\`\`

---

## Range Sum Query in O(1)

\`\`\`javascript
// Sum from index l to r (inclusive)
function rangeSum(prefix, l, r) {
    if (l === 0) return prefix[r];
    return prefix[r] - prefix[l - 1];
}

// Example: sum from index 2 to 4
// Original: [1, 2, 3, 4, 5]
// Prefix:   [1, 3, 6, 10, 15]
// rangeSum(prefix, 2, 4) = prefix[4] - prefix[1] = 15 - 3 = 12
// Verify: 3 + 4 + 5 = 12 ✓
\`\`\`

---

## Problem 1: Subarray Sum Equals K

\`\`\`javascript
function subarraySum(nums, k) {
    const prefixCount = new Map();
    prefixCount.set(0, 1);  // Empty prefix
    
    let sum = 0, count = 0;
    
    for (let num of nums) {
        sum += num;
        
        // If (sum - k) exists, we found subarrays
        if (prefixCount.has(sum - k)) {
            count += prefixCount.get(sum - k);
        }
        
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}
// subarraySum([1,1,1], 2) = 2
\`\`\`

---

## Problem 2: Product of Array Except Self

\`\`\`javascript
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    // Left prefix products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    // Right prefix products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}
// [1,2,3,4] → [24,12,8,6]
\`\`\`

---

## Problem 3: Contiguous Array (Equal 0s and 1s)

\`\`\`javascript
function findMaxLength(nums) {
    const map = new Map();
    map.set(0, -1);  // Base case
    
    let count = 0, maxLen = 0;
    
    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 1 ? 1 : -1;
        
        if (map.has(count)) {
            maxLen = Math.max(maxLen, i - map.get(count));
        } else {
            map.set(count, i);
        }
    }
    
    return maxLen;
}
// [0,1,0,1,0,1,1] → 6
\`\`\`

---

## 2D Prefix Sum

\`\`\`javascript
// Build 2D prefix sum
function build2DPrefix(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const prefix = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefix[i][j] = matrix[i-1][j-1] 
                         + prefix[i-1][j] 
                         + prefix[i][j-1] 
                         - prefix[i-1][j-1];
        }
    }
    return prefix;
}

// Query sum of rectangle (r1,c1) to (r2,c2)
function query2D(prefix, r1, c1, r2, c2) {
    return prefix[r2+1][c2+1] 
         - prefix[r1][c2+1] 
         - prefix[r2+1][c1] 
         + prefix[r1][c1];
}
\`\`\`

---

## Common Mistakes

### 1. Off-by-One in Range Query
\`\`\`javascript
// ❌ WRONG
return prefix[r] - prefix[l];  // Excludes arr[l]!

// ✅ CORRECT
return prefix[r] - prefix[l - 1];  // Includes arr[l]
\`\`\`

### 2. Forgetting Base Case
\`\`\`javascript
// ❌ WRONG - crashes when l = 0
return prefix[r] - prefix[l - 1];  // prefix[-1] undefined!

// ✅ CORRECT - handle l = 0
if (l === 0) return prefix[r];
return prefix[r] - prefix[l - 1];
\`\`\`

### 3. Not Initializing Map with 0
\`\`\`javascript
// ❌ WRONG - misses subarrays starting at index 0
const map = new Map();

// ✅ CORRECT - empty prefix has sum 0
const map = new Map();
map.set(0, 1);  // or map.set(0, -1) for index
\`\`\`

---

## When to Use Prefix Sum

**Keywords:**
- "Range sum"
- "Subarray sum equals K"
- "Contiguous subarray"
- "Multiple queries"

---

## Interview Tips

- "I'll precompute prefix sums for O(1) range queries"
- For "sum equals K", use HashMap with prefix sums
- 2D prefix sum for matrix range queries
- Watch for off-by-one errors!

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Build | O(n) |
| Query | O(1) |
| Space | O(n) |
| Key formula | sum(l,r) = prefix[r] - prefix[l-1] |

> **One-liner:** Prefix sum = running total. Build once O(n), query any range O(1). For "sum equals K", use HashMap to find matching prefix!
`,

  contentFa: `
# مجموع پیشوندی - پیش‌محاسبه برای سرعت

## مجموع پیشوندی چیست؟

تصور کن می‌خوای کل بارندگی از روز ۵ تا ۱۰ رو بدونی. به جای جمع کردن هر روز، اگه جمع‌های تجمعی داشتی چی؟ این مجموع پیشوندیه!

**مثل این فکر کن:**
- جمع تجمعی حساب بانکی
- امتیاز تجمعی در بازی
- کیلومترشمار (کل مسافت طی شده)

---

## چرا باید اهمیت بدی؟

- پرس‌وجوهای بازه O(n) رو به O(1) تبدیل می‌کنه
- ضروری برای مسائل مجموع بازه
- پایه مجموع پیشوندی 2D
- ۱۰%+ سوالات مصاحبه آرایه

---

## ایده اصلی

// اصلی: [1, 2, 3, 4, 5]
// پیشوند: [1, 3, 6, 10, 15]
//          ↑  ↑  ↑   ↑   ↑
//          1  1+2 1+2+3 ...

// prefix[i] = مجموع عناصر از اندیس 0 تا i

---

## ساختن آرایه مجموع پیشوندی

buildPrefixSum(arr):
    prefix = Array(arr.length)
    prefix[0] = arr[0]
    
    برای i از 1 تا arr.length:
        prefix[i] = prefix[i - 1] + arr[i]
    
    return prefix

arr = [1, 2, 3, 4, 5]
prefix = [1, 3, 6, 10, 15]

---

## پرس‌وجوی مجموع بازه در O(1)

// مجموع از اندیس l تا r (شامل)
rangeSum(prefix, l, r):
    اگه l === 0: return prefix[r]
    return prefix[r] - prefix[l - 1]

مثال: مجموع از اندیس 2 تا 4
اصلی: [1, 2, 3, 4, 5]
پیشوند: [1, 3, 6, 10, 15]
rangeSum(prefix, 2, 4) = prefix[4] - prefix[1] = 15 - 3 = 12
تأیید: 3 + 4 + 5 = 12 ✓

---

## مسئله ۱: مجموع زیرآرایه برابر K

subarraySum(nums, k):
    prefixCount = Map()
    prefixCount.set(0, 1)  // پیشوند خالی
    
    sum = 0, count = 0
    
    برای هر num در nums:
        sum += num
        
        // اگه (sum - k) وجود داره، زیرآرایه پیدا کردیم
        اگه prefixCount.has(sum - k):
            count += prefixCount.get(sum - k)
        
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1)
    
    return count

subarraySum([1,1,1], 2) = 2

---

## مسئله ۲: حاصل‌ضرب آرایه به جز خودش

productExceptSelf(nums):
    n = nums.length
    result = Array(n).fill(1)
    
    // حاصل‌ضرب پیشوندی چپ
    leftProduct = 1
    برای i از 0 تا n:
        result[i] = leftProduct
        leftProduct *= nums[i]
    
    // حاصل‌ضرب پیشوندی راست
    rightProduct = 1
    برای i از n - 1 تا 0:
        result[i] *= rightProduct
        rightProduct *= nums[i]
    
    return result

[1,2,3,4] → [24,12,8,6]

---

## مسئله ۳: آرایه پیوسته (0 و 1 برابر)

findMaxLength(nums):
    map = Map()
    map.set(0, -1)  // حالت پایه
    
    count = 0, maxLen = 0
    
    برای i از 0 تا nums.length:
        count += nums[i] === 1 ? 1 : -1
        
        اگه map.has(count):
            maxLen = max(maxLen, i - map.get(count))
        وگرنه:
            map.set(count, i)
    
    return maxLen

[0,1,0,1,0,1,1] → 6

---

## اشتباهات رایج

### ۱. خطای یکی-کم در پرس‌وجوی بازه
❌ اشتباه: return prefix[r] - prefix[l] (arr[l] رو شامل نمی‌شه!)
✅ درست: return prefix[r] - prefix[l - 1] (arr[l] رو شامل می‌شه)

### ۲. فراموش کردن حالت پایه
❌ اشتباه: وقتی l = 0 کرش می‌کنه
✅ درست: l = 0 رو هندل کن

### ۳. مقداردهی نکردن Map با 0
❌ اشتباه: زیرآرایه‌هایی که از اندیس 0 شروع می‌شن رو از دست می‌ده
✅ درست: map.set(0, 1) یا map.set(0, -1)

---

## کی از مجموع پیشوندی استفاده کنیم

**کلمات کلیدی:**
- "مجموع بازه"
- "مجموع زیرآرایه برابر K"
- "زیرآرایه پیوسته"
- "چندین پرس‌وجو"

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ساختن | O(n) |
| پرس‌وجو | O(1) |
| فضا | O(n) |
| فرمول کلیدی | sum(l,r) = prefix[r] - prefix[l-1] |

> **یک خطی:** مجموع پیشوندی = جمع تجمعی. یه بار بساز O(n)، هر بازه‌ای رو پرس‌وجو کن O(1). برای "مجموع برابر K"، از HashMap برای پیدا کردن پیشوند منطبق استفاده کن!
`,

  visualizationId: 'prefix-sum',
  exerciseId: 'prefix-sum',
};

export default prefixSumLesson;
