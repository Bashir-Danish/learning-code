export const mergeSortLesson = {
  id: 'merge-sort',
  title: 'Merge Sort',
  titleFa: 'مرتب‌سازی ادغامی',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Merge Sort - The Divide and Conquer Champion

## What is Merge Sort?

Imagine sorting a deck of cards by splitting it in half, sorting each half, then merging them back together. Keep splitting until you have single cards (already sorted!), then merge back up. That's Merge Sort!

**Think of it like this:** Divide the problem until it's trivial, then combine solutions.

---

## Why Should You Care?

- **Guaranteed O(n log n)** - no worst case degradation like Quick Sort
- **Stable** - preserves order of equal elements
- **Parallelizable** - halves can be sorted independently
- Foundation of many real-world sorting implementations
- Great for **external sorting** (data too large for memory)

---

## Real-Life Analogies

### Sorting a Deck of Cards
Split deck in half. Split each half again. Keep splitting until you have single cards. Now merge pairs back: compare top cards, take smaller. Continue until one sorted deck.

### Organizing Papers
Split stack in half repeatedly until single pages. Merge back: compare top pages, take the one that comes first alphabetically.

---

## How Does It Work?

**Divide Phase:**
1. Split array in half
2. Recursively split each half
3. Stop when single elements (base case)

**Conquer Phase:**
4. Merge two sorted arrays into one
5. Compare first elements, take smaller
6. Repeat until both arrays empty

\`\`\`
[38, 27, 43, 3, 9, 82, 10]
        ↓ Split
[38, 27, 43, 3]  |  [9, 82, 10]
    ↓ Split           ↓ Split
[38, 27] [43, 3]  [9, 82] [10]
  ↓        ↓        ↓      ↓
[38][27] [43][3] [9][82] [10]
  ↓ Merge  ↓       ↓       ↓
[27, 38] [3, 43] [9, 82] [10]
    ↓ Merge         ↓ Merge
[3, 27, 38, 43]  [9, 10, 82]
        ↓ Final Merge
[3, 9, 10, 27, 38, 43, 82]
\`\`\`

---

## The Code

\`\`\`javascript
function mergeSort(arr) {
    // Base case: single element is sorted
    if (arr.length <= 1) return arr;
    
    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    // Conquer (merge)
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    // Compare and merge
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {  // <= for stability
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    // Add remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example
mergeSort([38, 27, 43, 3, 9, 82, 10]);
// [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### In-Place Merge Sort (Space Optimized)

\`\`\`javascript
function mergeSortInPlace(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    mergeSortInPlace(arr, start, mid);
    mergeSortInPlace(arr, mid + 1, end);
    mergeInPlace(arr, start, mid, end);
}
// Still O(n) space for merge, but avoids slice() overhead
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| Best | O(n log n) | O(n) | Always divides and merges |
| Average | O(n log n) | O(n) | Same process |
| Worst | O(n log n) | O(n) | **No degradation!** |

**Why O(n log n)?**
- log n levels of recursion (halving each time)
- O(n) work at each level (merging)
- Total: O(n) × O(log n) = O(n log n)

**Why O(n) space?** Need temporary arrays for merging.

---

## When to Use / When NOT to Use

### ✅ Use when:
- **Stability required** - preserves equal element order
- **Guaranteed performance** - no O(n²) worst case
- **External sorting** - data larger than memory
- **Linked lists** - O(1) space merge possible!
- **Parallel processing** - halves are independent

### ❌ Don't use when:
- **Memory constrained** - O(n) extra space
- **Small arrays** - overhead not worth it (use Insertion Sort)
- **Cache performance matters** - not cache-friendly

---

## Common Mistakes

### 1. Wrong Base Case
\`\`\`javascript
// ❌ WRONG - infinite recursion
if (arr.length === 0) return arr;

// ✅ CORRECT - handle 0 and 1 element
if (arr.length <= 1) return arr;
\`\`\`

### 2. Unstable Merge
\`\`\`javascript
// ❌ WRONG - breaks stability
if (left[i] < right[j])  // < instead of <=

// ✅ CORRECT - stable (equal elements from left first)
if (left[i] <= right[j])
\`\`\`

### 3. Forgetting Remaining Elements
\`\`\`javascript
// ❌ WRONG - loses elements
return result;

// ✅ CORRECT - add remaining from both arrays
return result.concat(left.slice(i)).concat(right.slice(j));
\`\`\`

---

## Merge Sort vs Quick Sort

| Feature | Merge Sort | Quick Sort |
|---------|------------|------------|
| Time (Worst) | **O(n log n)** | O(n²) |
| Space | O(n) | **O(log n)** |
| Stable | **Yes** | No |
| Cache | Poor | **Good** |
| Linked Lists | **Excellent** | Poor |

**Rule of thumb:** Merge Sort for stability/guarantees, Quick Sort for speed.

---

## Interview Tips

- Emphasize **guaranteed O(n log n)** - no worst case
- Know it's **stable** (Quick Sort isn't)
- Mention **external sorting** use case
- For linked lists, merge sort is often better than quick sort
- Understand the **divide and conquer** paradigm

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (All Cases) | O(n log n) |
| Space | O(n) |
| Stable? | Yes |
| In-place? | No |
| Best For | Stability, guarantees, external sort |

> **One-liner:** Split in half recursively, merge back sorted. Guaranteed O(n log n) but needs O(n) space.
`,

  contentFa: `
# مرتب‌سازی ادغامی - قهرمان تقسیم و غلبه

## مرتب‌سازی ادغامی چیست؟

تصور کن داری یه دسته کارت رو مرتب می‌کنی با تقسیم به نصف، مرتب کردن هر نصف، بعد ادغام. تقسیم رو ادامه بده تا کارت‌های تکی داشته باشی (از قبل مرتبن!)، بعد برگرد ادغام کن. این Merge Sort هست!

**اینطوری فکر کن:** مسئله رو تقسیم کن تا ساده بشه، بعد جواب‌ها رو ترکیب کن.

---

## چرا باید اهمیت بدی؟

- **تضمین O(n log n)** - بدترین حالت خراب نمی‌شه مثل Quick Sort
- **پایدار** - ترتیب عناصر مساوی حفظ می‌شه
- **قابل موازی‌سازی** - نصف‌ها مستقل مرتب می‌شن
- پایه خیلی از پیاده‌سازی‌های واقعی
- عالی برای **مرتب‌سازی خارجی** (داده بزرگ‌تر از حافظه)

---

## مثال‌های زندگی واقعی

### مرتب کردن دسته کارت
دسته رو نصف کن. هر نصف رو دوباره نصف کن. ادامه بده تا کارت‌های تکی. حالا جفت‌ها رو ادغام کن: کارت‌های بالا رو مقایسه کن، کوچک‌تر رو بردار.

### مرتب کردن کاغذها
دسته رو نصف کن تا برگ‌های تکی. برگرد ادغام کن: برگ‌های بالا رو مقایسه کن، اونی که الفبایی اوله رو بردار.

---

## چطور کار می‌کنه؟

**فاز تقسیم:**
۱. آرایه رو نصف کن
۲. هر نصف رو بازگشتی تقسیم کن
۳. وقتی تک عنصر شد متوقف شو

**فاز غلبه:**
۴. دو آرایه مرتب رو ادغام کن
۵. عناصر اول رو مقایسه کن، کوچک‌تر رو بردار
۶. تکرار کن تا هر دو آرایه خالی بشن

\`\`\`
[38, 27, 43, 3, 9, 82, 10]
        ↓ تقسیم
[38, 27, 43, 3]  |  [9, 82, 10]
    ↓ تقسیم          ↓ تقسیم
[38, 27] [43, 3]  [9, 82] [10]
  ↓        ↓        ↓      ↓
[38][27] [43][3] [9][82] [10]
  ↓ ادغام  ↓       ↓       ↓
[27, 38] [3, 43] [9, 82] [10]
    ↓ ادغام         ↓ ادغام
[3, 27, 38, 43]  [9, 10, 82]
        ↓ ادغام نهایی
[3, 9, 10, 27, 38, 43, 82]
\`\`\`

---

## کد

\`\`\`javascript
function mergeSort(arr) {
    // حالت پایه: تک عنصر مرتبه
    if (arr.length <= 1) return arr;
    
    // تقسیم
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    // غلبه (ادغام)
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    // مقایسه و ادغام
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {  // <= برای پایداری
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    // اضافه کردن عناصر باقی‌مونده
    return result.concat(left.slice(i)).concat(right.slice(j));
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| بهترین | O(n log n) | O(n) | همیشه تقسیم و ادغام می‌کنه |
| میانگین | O(n log n) | O(n) | همون پروسه |
| بدترین | O(n log n) | O(n) | **خراب نمی‌شه!** |

**چرا O(n log n)?**
- log n سطح بازگشت (هر بار نصف می‌شه)
- O(n) کار در هر سطح (ادغام)
- کل: O(n) × O(log n) = O(n log n)

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- **پایداری لازمه**
- **کارایی تضمینی** - بدترین حالت O(n²) نداره
- **مرتب‌سازی خارجی** - داده بزرگ‌تر از حافظه
- **لیست‌های پیوندی** - ادغام O(1) فضا ممکنه!

### ❌ استفاده نکن:
- **حافظه محدود** - O(n) فضای اضافی
- **آرایه‌های کوچک** - سربار ارزش نداره

---

## اشتباهات رایج

### ۱. حالت پایه اشتباه
\`\`\`javascript
// ❌ اشتباه - بازگشت بی‌نهایت
if (arr.length === 0) return arr;

// ✅ درست - 0 و 1 عنصر رو هندل کن
if (arr.length <= 1) return arr;
\`\`\`

### ۲. ادغام ناپایدار
\`\`\`javascript
// ❌ اشتباه - پایداری رو خراب می‌کنه
if (left[i] < right[j])

// ✅ درست - پایدار (عناصر مساوی از چپ اول)
if (left[i] <= right[j])
\`\`\`

### ۳. فراموش کردن عناصر باقی‌مونده
عناصر باقی‌مونده از هر دو آرایه رو اضافه کن!

---

## Merge Sort در مقابل Quick Sort

| ویژگی | Merge Sort | Quick Sort |
|-------|------------|------------|
| زمان (بدترین) | **O(n log n)** | O(n²) |
| فضا | O(n) | **O(log n)** |
| پایدار | **بله** | نه |
| لیست پیوندی | **عالی** | ضعیف |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (همه حالات) | O(n log n) |
| فضا | O(n) |
| پایدار؟ | بله |
| بهترین برای | پایداری، تضمین، مرتب‌سازی خارجی |

> **یک خطی:** بازگشتی نصف کن، مرتب برگردون ادغام کن. تضمین O(n log n) ولی O(n) فضا می‌خواد.
`,

  visualizationId: 'merge-sort',
  exerciseId: 'merge-sort',
};

export default mergeSortLesson;
