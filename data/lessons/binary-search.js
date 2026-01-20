export const binarySearchLesson = {
  id: 'binary-search',
  title: 'Binary Search',
  titleFa: 'جستجوی دودویی',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# Binary Search - The Smart Way to Find Things

## What is Binary Search?

Imagine you're playing a guessing game. I'm thinking of a number between 1 and 100. You could guess 1, then 2, then 3... but that's slow! 

The smart way? Guess 50 first. If I say "higher", you know it's between 51-100. Then guess 75. If I say "lower", it's between 51-74. Each guess eliminates HALF the possibilities!

That's Binary Search! Instead of checking every item, you keep cutting the search area in half.

**Real-life examples:**
- Finding a word in a dictionary (you don't start from page 1!)
- Looking up a name in a phone book
- Finding a page number in a book

---

## The Magic of Binary Search

**Why is it so fast?**

With 1,000 items:
- Linear Search: up to 1,000 checks
- Binary Search: only about 10 checks!

With 1,000,000 items:
- Linear Search: up to 1,000,000 checks
- Binary Search: only about 20 checks!

Each step cuts the problem in half. That's the power of logarithms!

---

## IMPORTANT: The Array Must Be Sorted!

Binary Search ONLY works on sorted arrays. If your array isn't sorted, you must sort it first, or use Linear Search instead.

\`\`\`javascript
// This works (sorted)
[1, 3, 5, 7, 9, 11, 13]

// This does NOT work (unsorted)
[7, 2, 9, 1, 5, 3, 11]
\`\`\`

---

## How Does It Work?

**The Algorithm:**
1. Look at the middle element
2. If it's what you're looking for - done!
3. If target is smaller - search the LEFT half
4. If target is bigger - search the RIGHT half
5. Repeat until found or no elements left

**Visual Example:**

Finding 7 in [1, 3, 5, 7, 9, 11, 13]:

\`\`\`
Array: [1, 3, 5, 7, 9, 11, 13]
        L        M          R

Step 1: Middle is 7. Is 7 = 7? YES! Found it!
\`\`\`

Finding 3 in [1, 3, 5, 7, 9, 11, 13]:

\`\`\`
Step 1: [1, 3, 5, 7, 9, 11, 13]
                 M
        Middle is 7. Is 3 = 7? No. 3 < 7, search LEFT

Step 2: [1, 3, 5]
            M
        Middle is 3. Is 3 = 3? YES! Found at index 1!
\`\`\`

---

## The Code

\`\`\`javascript
function binarySearch(arr, target) {
    let left = 0;                    // Start of search area
    let right = arr.length - 1;      // End of search area
    
    while (left <= right) {
        // Find the middle
        const mid = Math.floor((left + right) / 2);
        
        // Found it!
        if (arr[mid] === target) {
            return mid;
        }
        
        // Target is bigger, search right half
        if (arr[mid] < target) {
            left = mid + 1;
        } 
        // Target is smaller, search left half
        else {
            right = mid - 1;
        }
    }
    
    // Not found
    return -1;
}

// Examples:
binarySearch([1, 3, 5, 7, 9], 5);  // Returns 2
binarySearch([1, 3, 5, 7, 9], 6);  // Returns -1 (not found)
\`\`\`

---

## Step-by-Step Walkthrough

Let's trace through finding 9 in [1, 3, 5, 7, 9, 11, 13]:

\`\`\`
Initial: left=0, right=6

Round 1:
  mid = (0 + 6) / 2 = 3
  arr[3] = 7
  9 > 7, so search right: left = 4

Round 2:
  mid = (4 + 6) / 2 = 5
  arr[5] = 11
  9 < 11, so search left: right = 4

Round 3:
  mid = (4 + 4) / 2 = 4
  arr[4] = 9
  9 === 9, FOUND! Return 4
\`\`\`

Only 3 steps to find it in a 7-element array!

---

## Time Complexity

| Case | Time | Explanation |
|------|------|-------------|
| Best | O(1) | Target is exactly in the middle |
| Average | O(log n) | Typical case |
| Worst | O(log n) | Target at the edge or not found |

**Space Complexity:** O(1) for iterative, O(log n) for recursive

**Why O(log n)?**
- Each step cuts the problem in half
- n items -> n/2 -> n/4 -> n/8 -> ... -> 1
- Number of steps = log2(n)

---

## Common Variations

### Find First Occurrence
When there are duplicates, find the FIRST one:

\`\`\`javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;        // Found one!
            right = mid - 1;     // But keep looking left for earlier ones
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Example: [1, 2, 2, 2, 3]
findFirst([1, 2, 2, 2, 3], 2);  // Returns 1 (first 2)
\`\`\`

### Find Last Occurrence
Find the LAST occurrence of a value:

\`\`\`javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;        // Found one!
            left = mid + 1;      // Keep looking right for later ones
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Example: [1, 2, 2, 2, 3]
findLast([1, 2, 2, 2, 3], 2);  // Returns 3 (last 2)
\`\`\`

### Count Occurrences
Count how many times a value appears:

\`\`\`javascript
function countOccurrences(arr, target) {
    const first = findFirst(arr, target);
    if (first === -1) return 0;
    
    const last = findLast(arr, target);
    return last - first + 1;
}

// Example: [1, 2, 2, 2, 3]
countOccurrences([1, 2, 2, 2, 3], 2);  // Returns 3
\`\`\`

---

## When to Use Binary Search

**Use it when:**
- Array is sorted
- You need fast lookups
- Array doesn't change often
- Finding boundaries or ranges

**Don't use it when:**
- Array is not sorted
- Array changes frequently (sorting is expensive)
- Array is very small (Linear Search is simpler)
- You're using a linked list (no random access)

---

## Common Mistakes

**Mistake 1: Forgetting the array must be sorted**
\`\`\`javascript
// WRONG - array not sorted!
binarySearch([5, 2, 8, 1, 9], 8);  // Won't work correctly
\`\`\`

**Mistake 2: Integer overflow in mid calculation**
\`\`\`javascript
// Could overflow for very large arrays
const mid = (left + right) / 2;

// Safer way
const mid = left + Math.floor((right - left) / 2);
\`\`\`

**Mistake 3: Wrong boundary updates**
\`\`\`javascript
// WRONG - infinite loop!
left = mid;      // Should be: left = mid + 1
right = mid;     // Should be: right = mid - 1
\`\`\`

---

## Quick Summary

| Feature | Binary Search |
|---------|---------------|
| Requires Sorted | Yes |
| Time Complexity | O(log n) |
| Space Complexity | O(1) |
| Best For | Large sorted arrays |
| Compared to Linear | Much faster for large data |
`,

  contentFa: `
# جستجوی دودویی - روش هوشمند برای پیدا کردن چیزها

## جستجوی دودویی چیست؟

تصور کن داری یه بازی حدس زدن انجام می‌دی. من به یه عدد بین 1 تا 100 فکر می‌کنم. می‌تونی 1 حدس بزنی، بعد 2، بعد 3... ولی این کنده!

روش هوشمند؟ اول 50 حدس بزن. اگه بگم "بالاتر"، می‌دونی بین 51-100 هست. بعد 75 حدس بزن. اگه بگم "پایین‌تر"، بین 51-74 هست. هر حدس نصف احتمالات رو حذف می‌کنه!

این جستجوی دودویی هست! به جای چک کردن هر آیتم، مدام ناحیه جستجو رو نصف می‌کنی.

**مثال‌های زندگی واقعی:**
- پیدا کردن یه کلمه توی فرهنگ لغت (از صفحه 1 شروع نمی‌کنی!)
- گشتن دنبال یه اسم توی دفترچه تلفن
- پیدا کردن شماره صفحه توی کتاب

---

## جادوی جستجوی دودویی

**چرا انقدر سریعه؟**

با 1,000 آیتم:
- جستجوی خطی: تا 1,000 چک
- جستجوی دودویی: فقط حدود 10 چک!

با 1,000,000 آیتم:
- جستجوی خطی: تا 1,000,000 چک
- جستجوی دودویی: فقط حدود 20 چک!

هر قدم مسئله رو نصف می‌کنه. این قدرت لگاریتم‌هاست!

---

## مهم: آرایه باید مرتب باشه!

جستجوی دودویی فقط روی آرایه‌های مرتب کار می‌کنه. اگه آرایت مرتب نیست، باید اول مرتبش کنی، یا از جستجوی خطی استفاده کنی.

\`\`\`javascript
// این کار می‌کنه (مرتب)
[1, 3, 5, 7, 9, 11, 13]

// این کار نمی‌کنه (نامرتب)
[7, 2, 9, 1, 5, 3, 11]
\`\`\`

---

## چطور کار می‌کنه؟

**الگوریتم:**
1. به عنصر وسط نگاه کن
2. اگه همونیه که دنبالشی - تموم!
3. اگه هدف کوچکتره - نیمه چپ رو بگرد
4. اگه هدف بزرگتره - نیمه راست رو بگرد
5. تکرار کن تا پیدا بشه یا عنصری نمونه

**مثال تصویری:**

پیدا کردن 7 در [1, 3, 5, 7, 9, 11, 13]:

\`\`\`
آرایه: [1, 3, 5, 7, 9, 11, 13]
        L        M          R

قدم 1: وسط 7 هست. آیا 7 = 7؟ بله! پیداش کردم!
\`\`\`

پیدا کردن 3 در [1, 3, 5, 7, 9, 11, 13]:

\`\`\`
قدم 1: [1, 3, 5, 7, 9, 11, 13]
                 M
        وسط 7 هست. آیا 3 = 7؟ نه. 3 < 7، چپ رو بگرد

قدم 2: [1, 3, 5]
            M
        وسط 3 هست. آیا 3 = 3؟ بله! پیدا شد در اندیس 1!
\`\`\`

---

## کد

\`\`\`javascript
function binarySearch(arr, target) {
    let left = 0;                    // شروع ناحیه جستجو
    let right = arr.length - 1;      // پایان ناحیه جستجو
    
    while (left <= right) {
        // وسط رو پیدا کن
        const mid = Math.floor((left + right) / 2);
        
        // پیداش کردم!
        if (arr[mid] === target) {
            return mid;
        }
        
        // هدف بزرگتره، نیمه راست رو بگرد
        if (arr[mid] < target) {
            left = mid + 1;
        } 
        // هدف کوچکتره، نیمه چپ رو بگرد
        else {
            right = mid - 1;
        }
    }
    
    // پیدا نشد
    return -1;
}

// مثال‌ها:
binarySearch([1, 3, 5, 7, 9], 5);  // برمی‌گردونه 2
binarySearch([1, 3, 5, 7, 9], 6);  // برمی‌گردونه -1 (پیدا نشد)
\`\`\`

---

## پیچیدگی زمانی

| حالت | زمان | توضیح |
|------|------|-------|
| بهترین | O(1) | هدف دقیقاً وسطه |
| میانگین | O(log n) | حالت معمول |
| بدترین | O(log n) | هدف در لبه یا پیدا نشد |

**پیچیدگی فضایی:** O(1) برای تکراری، O(log n) برای بازگشتی

**چرا O(log n)؟**
- هر قدم مسئله رو نصف می‌کنه
- n آیتم -> n/2 -> n/4 -> n/8 -> ... -> 1
- تعداد قدم‌ها = log2(n)

---

## تغییرات رایج

### پیدا کردن اولین رخداد
وقتی تکراری داریم، اولی رو پیدا کن:

\`\`\`javascript
function findFirst(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;        // یکی پیدا شد!
            right = mid - 1;     // ولی چپ رو هم بگرد شاید قبلی‌تر باشه
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// مثال: [1, 2, 2, 2, 3]
findFirst([1, 2, 2, 2, 3], 2);  // برمی‌گردونه 1 (اولین 2)
\`\`\`

### پیدا کردن آخرین رخداد
آخرین رخداد یه مقدار رو پیدا کن:

\`\`\`javascript
function findLast(arr, target) {
    let left = 0, right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;        // یکی پیدا شد!
            left = mid + 1;      // راست رو هم بگرد شاید بعدی‌تر باشه
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// مثال: [1, 2, 2, 2, 3]
findLast([1, 2, 2, 2, 3], 2);  // برمی‌گردونه 3 (آخرین 2)
\`\`\`

---

## کی از جستجوی دودویی استفاده کنیم

**استفاده کن وقتی:**
- آرایه مرتبه
- نیاز به جستجوی سریع داری
- آرایه زیاد تغییر نمی‌کنه
- پیدا کردن مرزها یا بازه‌ها

**استفاده نکن وقتی:**
- آرایه مرتب نیست
- آرایه مکرراً تغییر می‌کنه (مرتب‌سازی گرونه)
- آرایه خیلی کوچکه (جستجوی خطی ساده‌تره)
- داری از لیست پیوندی استفاده می‌کنی (دسترسی تصادفی نداره)

---

## اشتباهات رایج

### ۱. فراموش کردن مرتب بودن آرایه
❌ اشتباه: جستجوی دودویی روی آرایه نامرتب
✅ درست: اول مرتب کن یا از جستجوی خطی استفاده کن

### ۲. سرریز در محاسبه mid
❌ اشتباه: \`const mid = (left + right) / 2;\` (ممکنه سرریز کنه)
✅ درست: \`const mid = left + Math.floor((right - left) / 2);\`

### ۳. به‌روزرسانی اشتباه مرزها
❌ اشتباه: \`left = mid\` یا \`right = mid\` (حلقه بی‌نهایت!)
✅ درست: \`left = mid + 1\` و \`right = mid - 1\`

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- آرایه مرتبه ✅
- نیاز به جستجوی سریع داری
- آرایه بزرگه (۱۰۰+ آیتم)
- چندین بار جستجو می‌کنی

**استفاده نکن وقتی:**
- آرایه مرتب نیست ❌
- آرایه خیلی کوچکه (جستجوی خطی ساده‌تره)
- لیست پیوندی داری (دسترسی تصادفی نداره)

---

## خلاصه سریع

| ویژگی | جستجوی دودویی |
|-------|---------------|
| نیاز به مرتب بودن | بله ⚠️ |
| پیچیدگی زمانی | O(log n) ⚡ |
| پیچیدگی فضایی | O(1) |
| بهترین برای | آرایه‌های بزرگ مرتب |
| مقایسه با خطی | خیلی سریع‌تر برای داده بزرگ |

> **یک خطی:** جستجوی دودویی هر بار نصف می‌کنه - با ۱ میلیون آیتم فقط ۲۰ قدم! ⚡
`,

  hasVisualization: true,
  visualizationId: 'binary-search',
  hasExercise: true,
  exerciseId: 'binary-search',
};

export default binarySearchLesson;
