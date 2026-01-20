export const bubbleSortLesson = {
  id: 'bubble-sort',
  title: 'Bubble Sort',
  titleFa: 'مرتب‌سازی حبابی',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# Bubble Sort - The Gentle Giant of Sorting

## What is Bubble Sort?

Imagine organizing students by height. Compare each pair of neighbors - if the taller one is in front, swap them. Repeat until sorted. That's Bubble Sort!

**Think of it like this:** Bubbles rising in soda - the biggest bubbles rise first. In Bubble Sort, largest numbers "bubble up" to the end with each pass.

---

## Why Should You Care?

- Most intuitive sorting algorithm - great for learning
- Foundation for understanding complex sorts
- Interview questions often ask you to optimize it
- Understanding its weaknesses helps appreciate better algorithms

---

## Real-Life Analogies

### The Height Line-Up
PE teacher walks down the line, swapping any taller student in front of a shorter one. After one walk, tallest is at end. Repeat until sorted.

### Sorting Books on a Shelf
Compare adjacent books by height. If left is taller, swap. After one pass, tallest book is at right end.

---

## How Does It Work?

1. Compare first two elements
2. If first > second, swap them
3. Move to next pair, repeat
4. After one pass, largest is at end
5. Repeat, stopping one position earlier each time
6. Stop when no swaps needed

\`\`\`
Pass 1: [5,3,8,4,2] → [3,5,4,2,8]  (8 bubbles to end)
Pass 2: [3,5,4,2,8] → [3,4,2,5,8]  (5 in place)
Pass 3: [3,4,2,5,8] → [3,2,4,5,8]  (4 in place)
Pass 4: [3,2,4,5,8] → [2,3,4,5,8]  (sorted!)
\`\`\`

---

## The Code

\`\`\`javascript
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;  // Optimization flag
        
        // Compare adjacent pairs (skip sorted portion)
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;  // Already sorted!
    }
    return arr;
}

// Examples
bubbleSort([64, 34, 25, 12, 22, 11, 90]);  // [11,12,22,25,34,64,90]
bubbleSort([1, 2, 3, 4, 5]);  // Already sorted - exits after 1 pass!
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| Best | O(n) | O(1) | Already sorted - one pass |
| Average | O(n²) | O(1) | Random order |
| Worst | O(n²) | O(1) | Reverse sorted |

**Why O(n²)?** Nested loops: (n-1) + (n-2) + ... + 1 = n(n-1)/2 ≈ n²

---

## When to Use / When NOT to Use

### ✅ Use when:
- Small datasets (n < 50)
- Nearly sorted data (O(n) best case!)
- Learning/teaching sorting
- Memory is limited (O(1) space)

### ❌ Don't use when:
- Large datasets - use Merge/Quick Sort
- Performance matters
- Random data

---

## Common Mistakes

### 1. Wrong Loop Bounds
\`\`\`javascript
// ❌ WRONG - out of bounds!
for (let j = 0; j < n; j++)

// ✅ CORRECT
for (let j = 0; j < n - i - 1; j++)
\`\`\`

### 2. Forgetting Optimization
\`\`\`javascript
// ❌ Always O(n²), even if sorted
// ✅ Add swapped flag, break if !swapped
\`\`\`

### 3. Comparing Wrong Elements
\`\`\`javascript
// ❌ WRONG - not adjacent
if (arr[i] > arr[j])

// ✅ CORRECT - adjacent pairs
if (arr[j] > arr[j + 1])
\`\`\`

---

## Interview Tips

- **Always mention** the swapped flag optimization
- Know it's **stable** (preserves order of equal elements)
- Compare with Selection Sort (fewer swaps) and Insertion Sort (better for nearly sorted)
- Best case O(n) is unique among simple sorts

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (Best/Avg/Worst) | O(n) / O(n²) / O(n²) |
| Space | O(1) |
| Stable? | Yes |
| In-place? | Yes |
| Best For | Small/nearly sorted data |

> **One-liner:** Compare neighbors, swap if needed, repeat. Simple but slow at O(n²).
`,

  contentFa: `
# مرتب‌سازی حبابی - غول مهربان مرتب‌سازی

## مرتب‌سازی حبابی چیست؟

تصور کن داری دانش‌آموزها رو بر اساس قد مرتب می‌کنی. هر جفت همسایه رو مقایسه کن - اگه قدبلندتره جلوتره، جاشون رو عوض کن. تکرار کن تا مرتب بشه. این Bubble Sort هست!

**اینطوری فکر کن:** حباب‌ها توی نوشابه - بزرگ‌ترها اول بالا میان. توی Bubble Sort، بزرگ‌ترین اعداد با هر پاس به آخر "حباب" می‌زنن.

---

## چرا باید اهمیت بدی؟

- شهودی‌ترین الگوریتم مرتب‌سازی - عالی برای یادگیری
- پایه برای فهمیدن مرتب‌سازی‌های پیچیده
- سوالات مصاحبه اغلب می‌خوان بهینه‌اش کنی

---

## مثال‌های زندگی واقعی

### صف قد
معلم ورزش از صف رد می‌شه، هر جا قدبلندتر جلوی کوتاه‌تره جاشون رو عوض می‌کنه. بعد یه دور، قدبلندترین آخره.

### مرتب کردن کتاب‌ها
کتاب‌های کناری رو مقایسه کن. اگه چپی بلندتره، جابجا کن. بعد یه دور، بلندترین سمت راسته.

---

## چطور کار می‌کنه؟

۱. دو عنصر اول رو مقایسه کن
۲. اگه اولی > دومی، جابجا کن
۳. برو جفت بعدی، تکرار کن
۴. بعد یه پاس، بزرگ‌ترین آخره
۵. تکرار کن، هر بار یه موقعیت زودتر متوقف شو
۶. وقتی جابجایی نشد، تموم

\`\`\`
پاس ۱: [5,3,8,4,2] → [3,5,4,2,8]  (8 رفت آخر)
پاس ۲: [3,5,4,2,8] → [3,4,2,5,8]  (5 سر جاش)
پاس ۳: [3,4,2,5,8] → [3,2,4,5,8]  (4 سر جاش)
پاس ۴: [3,2,4,5,8] → [2,3,4,5,8]  (مرتب شد!)
\`\`\`

---

## کد

\`\`\`javascript
function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;  // پرچم بهینه‌سازی
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;  // از قبل مرتبه!
    }
    return arr;
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| بهترین | O(n) | O(1) | از قبل مرتب - یه پاس |
| میانگین | O(n²) | O(1) | ترتیب تصادفی |
| بدترین | O(n²) | O(1) | معکوس مرتب |

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- دیتاست کوچک (n < 50)
- داده تقریباً مرتب
- یادگیری/آموزش

### ❌ استفاده نکن:
- دیتاست بزرگ
- کارایی مهمه

---

## اشتباهات رایج

### ۱. محدوده حلقه اشتباه
\`\`\`javascript
// ❌ اشتباه
for (let j = 0; j < n; j++)

// ✅ درست
for (let j = 0; j < n - i - 1; j++)
\`\`\`

### ۲. فراموش کردن بهینه‌سازی
پرچم swapped رو بذار و اگه false بود break کن.

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (بهترین/میانگین/بدترین) | O(n) / O(n²) / O(n²) |
| فضا | O(1) |
| پایدار؟ | بله |
| بهترین برای | داده کوچک/تقریباً مرتب |

> **یک خطی:** همسایه‌ها رو مقایسه کن، اگه لازمه جابجا کن، تکرار کن. ساده ولی کند با O(n²).
`,

  visualizationId: 'bubble-sort',
  exerciseId: 'bubble-sort',
};

export default bubbleSortLesson;
