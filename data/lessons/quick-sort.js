export const quickSortLesson = {
  id: 'quick-sort',
  title: 'Quick Sort',
  titleFa: 'مرتب‌سازی سریع',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Quick Sort - The Speed Demon

## What is Quick Sort?

Imagine organizing books by picking one book (pivot), putting smaller books left, larger books right. Then do the same for each side. That's Quick Sort!

**Think of it like this:** Pick a divider, partition around it, repeat. The pivot ends up in its final sorted position each time.

---

## Why Should You Care?

- **Fastest in practice** for most cases
- **In-place** - only O(log n) extra space
- **Cache-friendly** - sequential memory access
- Default sort in many languages (C's qsort, Java's Arrays.sort for primitives)
- Understanding partitioning is key for many algorithms

---

## Real-Life Analogies

### Organizing Books by Height
Pick a book (pivot). Put shorter books left, taller right. Pivot is now in correct spot! Repeat for left and right piles.

### Sorting Students by Grade
Pick a student (pivot). Students with lower grades go left, higher go right. Pivot student is in final position. Repeat for each group.

---

## How Does It Work?

1. **Choose pivot** (last element, random, median-of-three)
2. **Partition:** Move elements < pivot to left, > pivot to right
3. **Pivot is now in final position!**
4. **Recursively** sort left and right partitions

\`\`\`
[8, 3, 7, 4, 9, 2, 6, 5]  pivot=5
        ↓ Partition
[3, 4, 2] [5] [8, 7, 9, 6]  ← 5 is in final spot!
    ↓           ↓
[2] [3] [4]   [6, 7] [8, 9]
              ↓       ↓
           [6][7]  [8][9]

Result: [2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

---

## The Code

\`\`\`javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);   // Sort left
        quickSort(arr, pivotIdx + 1, high);  // Sort right
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];  // Choose last as pivot
    let i = low - 1;          // Index of smaller element
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap to left side
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;  // Return pivot's final index
}

// Example
quickSort([8, 3, 7, 4, 9, 2, 6, 5]);
// [2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### Better Pivot Selection (Avoid Worst Case)

\`\`\`javascript
function partition(arr, low, high) {
    // Median-of-three: choose median of first, middle, last
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < arr[low]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
    if (arr[high] < arr[low]) [arr[low], arr[high]] = [arr[high], arr[low]];
    if (arr[high] < arr[mid]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
    
    // Now arr[mid] is median, use as pivot
    [arr[mid], arr[high - 1]] = [arr[high - 1], arr[mid]];
    const pivot = arr[high - 1];
    // ... rest of partition
}
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | When? |
|------|------|-------|-------|
| Best | O(n log n) | O(log n) | Balanced partitions |
| Average | O(n log n) | O(log n) | Random data |
| Worst | O(n²) | O(n) | Already sorted + bad pivot |

**Why O(n log n) average?**
- log n levels of recursion (balanced splits)
- O(n) work at each level (partitioning)

**Why O(n²) worst case?**
- Unbalanced partitions (e.g., sorted array, always pick smallest/largest as pivot)
- Each partition only removes 1 element → n levels

**How to avoid worst case:** Random pivot or median-of-three selection.

---

## When to Use / When NOT to Use

### ✅ Use when:
- **Speed matters** - fastest in practice
- **Memory constrained** - O(log n) space
- **Random/unsorted data**
- **Cache performance matters**

### ❌ Don't use when:
- **Stability required** - Quick Sort is NOT stable
- **Already sorted data** (without good pivot selection)
- **Guaranteed O(n log n) needed** - use Merge Sort
- **Linked lists** - poor cache performance

---

## Common Mistakes

### 1. Wrong Partition Logic
\`\`\`javascript
// ❌ WRONG - comparing with wrong element
if (arr[j] < arr[i])

// ✅ CORRECT - compare with pivot
if (arr[j] < pivot)
\`\`\`

### 2. Forgetting to Place Pivot
\`\`\`javascript
// ❌ WRONG - pivot never placed
return i;

// ✅ CORRECT - swap pivot to final position, return index
[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
return i + 1;
\`\`\`

### 3. Wrong Recursive Bounds
\`\`\`javascript
// ❌ WRONG - includes pivot again
quickSort(arr, low, pivotIdx);

// ✅ CORRECT - exclude pivot (it's in final position)
quickSort(arr, low, pivotIdx - 1);
\`\`\`

### 4. Not Handling Base Case
\`\`\`javascript
// ❌ WRONG - infinite recursion
function quickSort(arr, low, high) {
    const pivotIdx = partition(arr, low, high);
    // ...
}

// ✅ CORRECT - check if subarray has elements
if (low < high) {
    // ...
}
\`\`\`

---

## Quick Sort vs Merge Sort

| Feature | Quick Sort | Merge Sort |
|---------|------------|------------|
| Time (Avg) | O(n log n) | O(n log n) |
| Time (Worst) | O(n²) | **O(n log n)** |
| Space | **O(log n)** | O(n) |
| Stable | No | **Yes** |
| Cache | **Excellent** | Poor |
| In-place | **Yes** | No |

**Rule:** Quick Sort for speed, Merge Sort for guarantees.

---

## Interview Tips

- Know **partition** is the key operation
- Explain **pivot selection** strategies (random, median-of-three)
- Mention **O(n²) worst case** and how to avoid it
- Compare with Merge Sort (space vs stability trade-off)
- Quick Sort is **NOT stable**

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (Best/Avg) | O(n log n) |
| Time (Worst) | O(n²) |
| Space | O(log n) |
| Stable? | No |
| In-place? | Yes |
| Best For | Speed, memory efficiency |

> **One-liner:** Pick pivot, partition around it, recurse. Fastest in practice but O(n²) worst case.
`,

  contentFa: `
# مرتب‌سازی سریع - دیو سرعت

## مرتب‌سازی سریع چیست؟

تصور کن داری کتاب‌ها رو مرتب می‌کنی با انتخاب یه کتاب (محور)، گذاشتن کوچک‌ترها چپ، بزرگ‌ترها راست. بعد همین کار رو برای هر طرف انجام بده. این Quick Sort هست!

**اینطوری فکر کن:** یه تقسیم‌کننده انتخاب کن، دورش پارتیشن کن، تکرار کن. محور هر بار سر جای نهاییش قرار می‌گیره.

---

## چرا باید اهمیت بدی؟

- **سریع‌ترین در عمل** برای اکثر موارد
- **درجا** - فقط O(log n) فضای اضافی
- **سازگار با کش** - دسترسی متوالی به حافظه
- مرتب‌سازی پیش‌فرض در خیلی از زبان‌ها

---

## مثال‌های زندگی واقعی

### مرتب کردن کتاب‌ها بر اساس ارتفاع
یه کتاب انتخاب کن (محور). کوتاه‌ترها چپ، بلندترها راست. محور الان سر جای درسته! برای کپه‌های چپ و راست تکرار کن.

### مرتب کردن دانش‌آموزها بر اساس نمره
یه دانش‌آموز انتخاب کن (محور). نمره‌های پایین‌تر چپ، بالاتر راست. دانش‌آموز محور سر جای نهاییشه. برای هر گروه تکرار کن.

---

## چطور کار می‌کنه؟

۱. **محور انتخاب کن** (آخری، تصادفی، میانه‌سه‌تایی)
۲. **پارتیشن:** عناصر < محور به چپ، > محور به راست
۳. **محور الان سر جای نهاییشه!**
۴. **بازگشتی** پارتیشن‌های چپ و راست رو مرتب کن

\`\`\`
[8, 3, 7, 4, 9, 2, 6, 5]  محور=5
        ↓ پارتیشن
[3, 4, 2] [5] [8, 7, 9, 6]  ← 5 سر جای نهاییشه!
    ↓           ↓
[2] [3] [4]   [6, 7] [8, 9]

نتیجه: [2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

---

## کد

\`\`\`javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        quickSort(arr, low, pivotIdx - 1);   // چپ رو مرتب کن
        quickSort(arr, pivotIdx + 1, high);  // راست رو مرتب کن
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];  // آخری رو به عنوان محور انتخاب کن
    let i = low - 1;          // اندیس عنصر کوچک‌تر
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];  // به سمت چپ ببر
        }
    }
    
    // محور رو سر جای درست بذار
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;  // اندیس نهایی محور رو برگردون
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | کی؟ |
|------|------|-----|-----|
| بهترین | O(n log n) | O(log n) | پارتیشن‌های متعادل |
| میانگین | O(n log n) | O(log n) | داده تصادفی |
| بدترین | O(n²) | O(n) | از قبل مرتب + محور بد |

**چرا میانگین O(n log n)?**
- log n سطح بازگشت (تقسیم‌های متعادل)
- O(n) کار در هر سطح (پارتیشن)

**چرا بدترین حالت O(n²)?**
- پارتیشن‌های نامتعادل (مثلاً آرایه مرتب، همیشه کوچک‌ترین/بزرگ‌ترین رو انتخاب کن)

**چطور از بدترین حالت دوری کنیم:** محور تصادفی یا میانه‌سه‌تایی.

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- **سرعت مهمه** - سریع‌ترین در عمل
- **حافظه محدود** - فضای O(log n)
- **داده تصادفی/نامرتب**
- **کارایی کش مهمه**

### ❌ استفاده نکن:
- **پایداری لازمه** - Quick Sort پایدار نیست
- **داده از قبل مرتب** (بدون انتخاب محور خوب)
- **تضمین O(n log n) لازمه** - از Merge Sort استفاده کن

---

## اشتباهات رایج

### ۱. منطق پارتیشن اشتباه
\`\`\`javascript
// ❌ اشتباه
if (arr[j] < arr[i])

// ✅ درست - با محور مقایسه کن
if (arr[j] < pivot)
\`\`\`

### ۲. فراموش کردن جایگذاری محور
محور رو سر جای نهایی جابجا کن و اندیسش رو برگردون.

### ۳. محدوده بازگشتی اشتباه
\`\`\`javascript
// ❌ اشتباه - محور رو دوباره شامل می‌کنه
quickSort(arr, low, pivotIdx);

// ✅ درست - محور رو حذف کن (سر جای نهاییشه)
quickSort(arr, low, pivotIdx - 1);
\`\`\`

---

## Quick Sort در مقابل Merge Sort

| ویژگی | Quick Sort | Merge Sort |
|-------|------------|------------|
| زمان (میانگین) | O(n log n) | O(n log n) |
| زمان (بدترین) | O(n²) | **O(n log n)** |
| فضا | **O(log n)** | O(n) |
| پایدار | نه | **بله** |
| کش | **عالی** | ضعیف |

**قانون:** Quick Sort برای سرعت، Merge Sort برای تضمین.

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (بهترین/میانگین) | O(n log n) |
| زمان (بدترین) | O(n²) |
| فضا | O(log n) |
| پایدار؟ | نه |
| درجا؟ | بله |
| بهترین برای | سرعت، کارایی حافظه |

> **یک خطی:** محور انتخاب کن، دورش پارتیشن کن، بازگشت کن. سریع‌ترین در عمل ولی بدترین حالت O(n²).
`,

  visualizationId: 'quick-sort',
  exerciseId: 'quick-sort',
};

export default quickSortLesson;
