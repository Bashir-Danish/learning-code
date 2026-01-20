export const binarySearchVariationsLesson = {
  id: 'binary-search-variations',
  title: 'Binary Search Variations',
  titleFa: 'تغییرات جستجوی دودویی',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Binary Search Variations

Binary search isn't just for finding a single number! This powerful algorithm has many variations that are frequently asked in interviews.

---

## Find First Occurrence

**Problem:** In a sorted array with duplicates, find the first position of target.

\`\`\`javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Keep searching left
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

// Example: [1, 2, 2, 2, 3], target = 2
// Output: 1 (first position of 2)
\`\`\`

**Key insight:** When you find target, continue searching left to find the first one.

---

## Find Last Occurrence

**Problem:** In a sorted array with duplicates, find the last position of target.

\`\`\`javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Keep searching right
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

// Example: [1, 2, 2, 2, 3], target = 2
// Output: 3 (last position of 2)
\`\`\`

**Key insight:** When you find target, continue searching right to find the last one.

---

## Search in Rotated Array

**Problem:** A sorted array has been rotated (like [4,5,6,7,0,1,2]). Find the target.

\`\`\`javascript
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) { // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else { // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}

// Example: [4,5,6,7,0,1,2], target = 0
// Output: 4
\`\`\`

**Key insight:** One half is always sorted. Determine which half is sorted and where target belongs.

---

## Find Peak Element

**Problem:** Find an element that is greater than its neighbors.

\`\`\`javascript
function findPeakElement(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[mid + 1]) right = mid; // Peak is on the left
        else left = mid + 1; // Peak is on the right
    }
    return left;
}

// Example: [1, 2, 3, 1]
// Output: 2 (index of 3 which is the peak)
\`\`\`

**Key insight:** Move towards the ascending slope. If mid > mid+1, peak is on the left.

---

## Search Insert Position

**Problem:** Find the position where target should be inserted to keep array sorted.

\`\`\`javascript
function searchInsert(nums, target) {
    let left = 0, right = nums.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Example: [1, 3, 5, 6], target = 4
// Output: 2 (should be inserted at index 2)
\`\`\`

---

## Quick Reference Table

| Variation | Key | Time |
|-----------|-----|------|
| First occurrence | When found, go left | O(log n) |
| Last occurrence | When found, go right | O(log n) |
| Rotated array | Find sorted half | O(log n) |
| Peak element | Go towards ascending slope | O(log n) |
| Insert position | First greater or equal | O(log n) |

---

## Common Mistakes

### 1. Infinite Loop
❌ Wrong: \`left = mid\` without +1
✅ Correct: \`left = mid + 1\` or \`right = mid - 1\`

### 2. Wrong Loop Condition
❌ Wrong: \`while (left < right)\` when it should be \`<=\`
✅ Correct: Choose the right condition based on problem type

### 3. Forgetting Boundary Conditions
❌ Wrong: Not testing empty or single-element arrays
✅ Correct: Always check edge cases

---

## When to Use

**Use when:**
- Array is sorted (or nearly sorted like rotated) ✅
- Looking for first/last occurrence
- Need insert position
- Finding peak or valley

**Don't use when:**
- Array is completely unsorted ❌
- Need simple search
- Array is very small

---

## Quick Summary

| Feature | Description |
|---------|-------------|
| Base | Standard binary search |
| Variations | First, last, peak, insert, rotated |
| Time | All O(log n) ⚡ |
| Key | Know which half to search |

> **One-liner:** Binary search isn't just for finding - first, last, peak, and insert position all solve with the same pattern! ⚡
`,

  contentFa: `
# تغییرات جستجوی دودویی

جستجوی دودویی فقط برای پیدا کردن یک عدد نیست! این الگوریتم قدرتمند تغییرات زیادی داره که در مصاحبه‌ها خیلی پرسیده می‌شن.

---

## پیدا کردن اولین رخداد

**مسئله:** در آرایه مرتب با تکرار، اولین موقعیت هدف رو پیدا کن.

\`\`\`javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // به جستجو در سمت چپ ادامه بده
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

// مثال: [1, 2, 2, 2, 3], target = 2
// خروجی: 1 (اولین موقعیت 2)
\`\`\`

**نکته کلیدی:** وقتی هدف رو پیدا کردی، به جستجو در سمت چپ ادامه بده تا اولین رو پیدا کنی.

---

## پیدا کردن آخرین رخداد

**مسئله:** در آرایه مرتب با تکرار، آخرین موقعیت هدف رو پیدا کن.

\`\`\`javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1, result = -1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // به جستجو در سمت راست ادامه بده
        } else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

// مثال: [1, 2, 2, 2, 3], target = 2
// خروجی: 3 (آخرین موقعیت 2)
\`\`\`

**نکته کلیدی:** وقتی هدف رو پیدا کردی، به جستجو در سمت راست ادامه بده تا آخرین رو پیدا کنی.

---

## جستجو در آرایه چرخیده

**مسئله:** آرایه مرتب چرخیده شده (مثل [4,5,6,7,0,1,2]). هدف رو پیدا کن.

\`\`\`javascript
function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        
        if (nums[left] <= nums[mid]) { // نیمه چپ مرتبه
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else { // نیمه راست مرتبه
            if (target > nums[mid] && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}

// مثال: [4,5,6,7,0,1,2], target = 0
// خروجی: 4
\`\`\`

**نکته کلیدی:** همیشه یک نیمه مرتبه. تشخیص بده کدوم نیمه مرتبه و هدف کجاست.

---

## پیدا کردن عنصر قله

**مسئله:** عنصری که از همسایه‌هاش بزرگتره رو پیدا کن.

\`\`\`javascript
function findPeakElement(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[mid + 1]) right = mid; // قله سمت چپه
        else left = mid + 1; // قله سمت راسته
    }
    return left;
}

// مثال: [1, 2, 3, 1]
// خروجی: 2 (اندیس 3 که قله‌ست)
\`\`\`

**نکته کلیدی:** به سمت شیب صعودی حرکت کن. اگر mid > mid+1، قله سمت چپه.

---

## پیدا کردن موقعیت درج

**مسئله:** موقعیتی که هدف باید درج بشه تا آرایه مرتب بمونه.

\`\`\`javascript
function searchInsert(nums, target) {
    let left = 0, right = nums.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// مثال: [1, 3, 5, 6], target = 4
// خروجی: 2 (باید در اندیس 2 درج بشه)
\`\`\`

---

## جدول مرجع سریع

| تغییر | کلید | زمان |
|-------|------|------|
| اولین رخداد | وقتی پیدا شد، به چپ برو | O(log n) |
| آخرین رخداد | وقتی پیدا شد، به راست برو | O(log n) |
| آرایه چرخیده | نیمه مرتب رو پیدا کن | O(log n) |
| عنصر قله | به شیب صعودی برو | O(log n) |
| موقعیت درج | اولین بزرگتر یا مساوی | O(log n) |

---

## اشتباهات رایج

### ۱. حلقه بی‌نهایت
❌ اشتباه: \`left = mid\` بدون +1
✅ درست: \`left = mid + 1\` یا \`right = mid - 1\`

### ۲. شرط حلقه اشتباه
❌ اشتباه: \`while (left < right)\` وقتی باید \`<=\` باشه
✅ درست: بسته به نوع مسئله، شرط درست رو انتخاب کن

### ۳. فراموش کردن شرایط مرزی
❌ اشتباه: تست نکردن آرایه خالی یا یک عنصری
✅ درست: همیشه edge case ها رو چک کن

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- آرایه مرتبه (یا تقریباً مرتب مثل چرخیده) ✅
- دنبال اولین/آخرین رخداد می‌گردی
- موقعیت درج می‌خوای
- قله یا دره پیدا می‌کنی

**استفاده نکن وقتی:**
- آرایه کاملاً نامرتبه ❌
- نیاز به جستجوی ساده داری
- آرایه خیلی کوچکه

---

## خلاصه سریع

| ویژگی | توضیح |
|-------|-------|
| پایه | جستجوی دودویی استاندارد |
| تغییرات | اولین، آخرین، قله، درج، چرخیده |
| زمان | همه O(log n) ⚡ |
| کلید | بدون کدوم نیمه رو بگردی |

> **یک خطی:** جستجوی دودویی فقط پیدا کردن نیست - اولین، آخرین، قله، و موقعیت درج همه با همین الگو حل می‌شن! ⚡
`,

  visualizationId: 'binary-search',
  exerciseId: 'binary-search-variations',
};

export default binarySearchVariationsLesson;
