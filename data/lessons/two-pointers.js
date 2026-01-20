export const twoPointersLesson = {
  id: 'two-pointers',
  title: 'Two Pointers Technique',
  titleFa: 'تکنیک دو اشاره‌گر',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Two Pointers - The Pincer Movement

## What is Two Pointers?

Imagine squeezing a tube of toothpaste from both ends - that's two pointers! Two indices moving through an array, often from opposite ends.

**Think of it like:**
- Pincer movement in chess - attack from both sides
- Two people searching a bookshelf from opposite ends
- Squeezing toothpaste from both ends

---

## Why Should You Care?

- Turns O(n²) into O(n) for many problems
- 15%+ of array interview questions use this
- Essential for sorted array problems
- No extra space needed (O(1))

---

## Two Types of Two Pointers

### Type 1: Opposite Direction
\`\`\`javascript
let left = 0;
let right = arr.length - 1;

while (left < right) {
    // Process and move pointers toward each other
    left++;
    right--;
}
\`\`\`

### Type 2: Same Direction (Fast & Slow)
\`\`\`javascript
let slow = 0;
for (let fast = 0; fast < arr.length; fast++) {
    if (condition) {
        // Do something with slow
        slow++;
    }
}
\`\`\`

---

## Problem 1: Two Sum (Sorted Array)

\`\`\`javascript
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) return [left, right];
        if (sum < target) left++;   // Need bigger sum
        else right--;               // Need smaller sum
    }
    return [-1, -1];
}
// Time: O(n), Space: O(1)
\`\`\`

---

## Problem 2: Remove Duplicates In-Place

\`\`\`javascript
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;
    
    let slow = 0;  // Points to last unique element
    
    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[fast] !== arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow + 1;  // Length of unique elements
}
// [1,1,2,2,3] → [1,2,3,_,_], returns 3
\`\`\`

---

## Problem 3: Container With Most Water

\`\`\`javascript
function maxArea(heights) {
    let left = 0, right = heights.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const height = Math.min(heights[left], heights[right]);
        maxWater = Math.max(maxWater, width * height);
        
        // Move the shorter line (greedy)
        if (heights[left] < heights[right]) left++;
        else right--;
    }
    return maxWater;
}
\`\`\`

---

## Problem 4: Three Sum

\`\`\`javascript
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;  // Skip duplicates
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}
\`\`\`

---

## Common Mistakes

### 1. Wrong Loop Condition
\`\`\`javascript
// ❌ WRONG - misses when pointers meet
while (left <= right)

// ✅ CORRECT - stop before they meet
while (left < right)
\`\`\`

### 2. Not Handling Duplicates
\`\`\`javascript
// ❌ WRONG - duplicate triplets in 3Sum
result.push([nums[i], nums[left], nums[right]]);
left++; right--;

// ✅ CORRECT - skip duplicates
result.push([nums[i], nums[left], nums[right]]);
while (left < right && nums[left] === nums[left + 1]) left++;
while (left < right && nums[right] === nums[right - 1]) right--;
left++; right--;
\`\`\`

---

## When to Use Two Pointers

| Problem Type | Pointer Type |
|--------------|--------------|
| Find pair with sum | Opposite ends |
| Remove duplicates | Same direction |
| Palindrome check | Opposite ends |
| Merge sorted arrays | Same direction |
| Partition array | Same direction |

---

## Interview Tips

- "I'll use two pointers for O(n) time, O(1) space"
- Sorted array? Think two pointers!
- Draw the pointers moving step by step
- Watch for off-by-one errors

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n) |
| Space | O(1) |
| Best for | Sorted arrays, pairs |
| Key insight | Move toward solution |

> **One-liner:** Two pointers = two indices moving through array. Opposite ends for pairs, same direction for partitioning. O(n) time, O(1) space!
`,

  contentFa: `
# دو اشاره‌گر - حرکت انبری

## دو اشاره‌گر چیست؟

تصور کن یه تیوب خمیردندون رو از هر دو طرف فشار می‌دی - این دو اشاره‌گره! دو اندیس که از آرایه عبور می‌کنن، معمولاً از دو طرف مخالف.

**مثل این فکر کن:**
- حرکت انبری در شطرنج - از هر دو طرف حمله کن
- دو نفر که قفسه کتاب رو از دو طرف می‌گردن
- فشار دادن خمیردندون از هر دو طرف

---

## چرا باید اهمیت بدی؟

- O(n²) رو به O(n) تبدیل می‌کنه برای خیلی مسائل
- ۱۵%+ سوالات مصاحبه آرایه از این استفاده می‌کنن
- ضروری برای مسائل آرایه مرتب
- فضای اضافی نمی‌خواد (O(1))

---

## دو نوع دو اشاره‌گر

### نوع ۱: جهت مخالف
left = 0
right = arr.length - 1

تا وقتی left < right:
    پردازش و حرکت اشاره‌گرها به سمت هم
    left++
    right--

### نوع ۲: جهت یکسان (سریع و کند)
slow = 0
برای fast از 0 تا arr.length:
    اگه شرط:
        کاری با slow انجام بده
        slow++

---

## مسئله ۱: مجموع دو عدد (آرایه مرتب)

twoSum(arr, target):
    left = 0, right = arr.length - 1
    
    تا وقتی left < right:
        sum = arr[left] + arr[right]
        
        اگه sum === target: return [left, right]
        اگه sum < target: left++   // مجموع بزرگتر لازمه
        وگرنه: right--             // مجموع کوچکتر لازمه
    
    return [-1, -1]

زمان: O(n)، فضا: O(1)

---

## مسئله ۲: حذف تکراری‌ها درجا

removeDuplicates(arr):
    اگه arr.length === 0: return 0
    
    slow = 0  // به آخرین عنصر یکتا اشاره می‌کنه
    
    برای fast از 1 تا arr.length:
        اگه arr[fast] !== arr[slow]:
            slow++
            arr[slow] = arr[fast]
    
    return slow + 1  // طول عناصر یکتا

[1,1,2,2,3] → [1,2,3,_,_]، برمی‌گردونه 3

---

## مسئله ۳: ظرف با بیشترین آب

maxArea(heights):
    left = 0, right = heights.length - 1
    maxWater = 0
    
    تا وقتی left < right:
        width = right - left
        height = min(heights[left], heights[right])
        maxWater = max(maxWater, width * height)
        
        // خط کوتاه‌تر رو حرکت بده (حریصانه)
        اگه heights[left] < heights[right]: left++
        وگرنه: right--
    
    return maxWater

---

## اشتباهات رایج

### ۱. شرط حلقه اشتباه
❌ اشتباه: while (left <= right) - وقتی اشاره‌گرها به هم می‌رسن رو از دست می‌ده
✅ درست: while (left < right) - قبل از رسیدن متوقف شو

### ۲. هندل نکردن تکراری‌ها
❌ اشتباه: سه‌تایی‌های تکراری در 3Sum
✅ درست: تکراری‌ها رو رد کن

---

## کی از دو اشاره‌گر استفاده کنیم

| نوع مسئله | نوع اشاره‌گر |
|-----------|-------------|
| پیدا کردن جفت با مجموع | انتهای مخالف |
| حذف تکراری‌ها | جهت یکسان |
| بررسی پالیندروم | انتهای مخالف |
| ادغام آرایه‌های مرتب | جهت یکسان |
| پارتیشن آرایه | جهت یکسان |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n) |
| فضا | O(1) |
| بهترین برای | آرایه‌های مرتب، جفت‌ها |
| نکته کلیدی | به سمت جواب حرکت کن |

> **یک خطی:** دو اشاره‌گر = دو اندیس که از آرایه عبور می‌کنن. انتهای مخالف برای جفت‌ها، جهت یکسان برای پارتیشن. زمان O(n)، فضای O(1)!
`,

  visualizationId: 'two-pointers',
  exerciseId: 'two-pointers',
};

export default twoPointersLesson;
