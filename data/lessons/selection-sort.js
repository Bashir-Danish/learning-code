export const selectionSortLesson = {
  id: 'selection-sort',
  title: 'Selection Sort',
  titleFa: 'مرتب‌سازی انتخابی',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# Selection Sort - The Methodical Picker

## What is Selection Sort?

Imagine picking players for a team. Scan everyone, pick the best, put them first. Then scan remaining, pick next best, put second. That's Selection Sort!

**Think of it like this:** Finding the smallest coin from a pile, setting it aside, then finding the smallest from what's left. Repeat until done.

---

## Why Should You Care?

- One of the simplest sorting algorithms
- **Minimizes swaps** - only O(n) swaps vs O(n²) for bubble sort
- Great when writing/swapping is expensive (flash memory, physical objects)
- Foundation for selection-based algorithms

---

## Real-Life Analogies

### Picking Teams in PE Class
Captain scans all players, picks the best, they join team. Scan again, pick next best. Continue until everyone is picked.

### Organizing Books by Height
Look at ALL books, find shortest, put first. Look at remaining, find shortest, put second. Continue until done.

---

## How Does It Work?

1. Find minimum in entire unsorted portion
2. Swap it with first unsorted position
3. Move boundary of sorted portion
4. Repeat until sorted

\`\`\`
[64, 25, 12, 22, 11]
 ↓ Find min=11, swap with 64
[11, 25, 12, 22, 64]
     ↓ Find min=12, swap with 25
[11, 12, 25, 22, 64]
         ↓ Find min=22, swap with 25
[11, 12, 22, 25, 64]  ← Sorted!
\`\`\`

---

## The Code

\`\`\`javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;  // Assume current is minimum
        
        // Find actual minimum in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap only if needed
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}

// Examples
selectionSort([64, 25, 12, 22, 11]);  // [11,12,22,25,64]
selectionSort([1, 2, 3, 4, 5]);  // Still O(n²) comparisons, but 0 swaps!
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Swaps | Why? |
|------|------|-------|-------|------|
| Best | O(n²) | O(1) | 0 | Still scans everything |
| Average | O(n²) | O(1) | O(n) | ~n/2 swaps |
| Worst | O(n²) | O(1) | O(n) | n-1 swaps max |

**Key insight:** Unlike Bubble Sort, Selection Sort has **NO early termination**. Always O(n²) comparisons!

**The Swap Advantage:**
\`\`\`
Bubble Sort on [5,4,3,2,1]: 10 swaps
Selection Sort on [5,4,3,2,1]: 2 swaps
\`\`\`

---

## When to Use / When NOT to Use

### ✅ Use when:
- **Swapping is expensive** (flash memory, physical objects)
- Small datasets
- You need simplicity
- Memory writes are costly

### ❌ Don't use when:
- Data is nearly sorted (no benefit, use Insertion Sort)
- Large datasets
- **Stability matters** (Selection Sort is NOT stable!)

---

## Common Mistakes

### 1. Starting Inner Loop Wrong
\`\`\`javascript
// ❌ WRONG - re-scans sorted portion
for (let j = 0; j < n; j++)

// ✅ CORRECT - start after current position
for (let j = i + 1; j < n; j++)
\`\`\`

### 2. Swapping Immediately (Bubble Sort Logic!)
\`\`\`javascript
// ❌ WRONG - this is bubble sort!
if (arr[j] < arr[i]) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

// ✅ CORRECT - find min first, swap once
let minIdx = i;
for (...) { if (arr[j] < arr[minIdx]) minIdx = j; }
if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
\`\`\`

### 3. Assuming It's Stable
Selection Sort is **NOT stable** - equal elements may change order!

---

## Interview Tips

- Emphasize **O(n) swaps** - unique selling point
- Know it's **NOT stable** (unlike Bubble/Insertion Sort)
- Compare: "Selection finds min then swaps once; Bubble swaps adjacent pairs repeatedly"
- For "find K smallest" problems, mention partial selection sort

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (Best/Avg/Worst) | O(n²) / O(n²) / O(n²) |
| Space | O(1) |
| Swaps | O(n) - maximum n-1 |
| Stable? | **No** |
| Best For | Minimizing swaps |

> **One-liner:** Scan all, pick smallest, place it, repeat. Always O(n²) but only O(n) swaps.
`,

  contentFa: `
# مرتب‌سازی انتخابی - انتخاب‌کننده روشمند

## مرتب‌سازی انتخابی چیست؟

تصور کن داری بازیکن برای تیم انتخاب می‌کنی. همه رو نگاه کن، بهترین رو انتخاب کن، اول بذار. بعد بقیه رو نگاه کن، بهترین بعدی رو انتخاب کن. این Selection Sort هست!

**اینطوری فکر کن:** پیدا کردن کوچک‌ترین سکه از یه کپه، کنار گذاشتنش، بعد پیدا کردن کوچک‌ترین از بقیه.

---

## چرا باید اهمیت بدی؟

- یکی از ساده‌ترین الگوریتم‌های مرتب‌سازی
- **جابجایی‌ها رو کم می‌کنه** - فقط O(n) جابجایی
- عالی وقتی نوشتن/جابجایی گرونه (حافظه فلش، اشیای فیزیکی)

---

## مثال‌های زندگی واقعی

### انتخاب تیم در ورزش
کاپیتان همه رو نگاه می‌کنه، بهترین رو انتخاب می‌کنه، به تیم می‌پیونده. دوباره نگاه می‌کنه، بهترین بعدی رو انتخاب می‌کنه.

### مرتب کردن کتاب‌ها
همه کتاب‌ها رو نگاه کن، کوتاه‌ترین رو پیدا کن، اول بذار. بقیه رو نگاه کن، کوتاه‌ترین رو پیدا کن، دوم بذار.

---

## چطور کار می‌کنه؟

۱. کمینه رو توی کل بخش مرتب‌نشده پیدا کن
۲. با اولین موقعیت مرتب‌نشده جابجا کن
۳. مرز بخش مرتب رو جابجا کن
۴. تکرار کن تا مرتب بشه

\`\`\`
[64, 25, 12, 22, 11]
 ↓ کمینه=11 پیدا شد، با 64 جابجا
[11, 25, 12, 22, 64]
     ↓ کمینه=12 پیدا شد، با 25 جابجا
[11, 12, 25, 22, 64]
         ↓ کمینه=22 پیدا شد، با 25 جابجا
[11, 12, 22, 25, 64]  ← مرتب شد!
\`\`\`

---

## کد

\`\`\`javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;  // فرض کن فعلی کمینه‌ست
        
        // کمینه واقعی رو توی بخش مرتب‌نشده پیدا کن
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // فقط اگه لازمه جابجا کن
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | جابجایی | چرا؟ |
|------|------|-----|---------|------|
| بهترین | O(n²) | O(1) | 0 | هنوز همه رو اسکن می‌کنه |
| میانگین | O(n²) | O(1) | O(n) | ~n/2 جابجایی |
| بدترین | O(n²) | O(1) | O(n) | حداکثر n-1 جابجایی |

**نکته کلیدی:** برخلاف Bubble Sort، Selection Sort **خاتمه زودهنگام نداره**. همیشه O(n²) مقایسه!

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- **جابجایی گرونه** (حافظه فلش، اشیای فیزیکی)
- دیتاست کوچک
- سادگی می‌خوای

### ❌ استفاده نکن:
- داده تقریباً مرتب (فایده‌ای نداره)
- دیتاست بزرگ
- **پایداری مهمه** (Selection Sort پایدار نیست!)

---

## اشتباهات رایج

### ۱. شروع حلقه داخلی اشتباه
\`\`\`javascript
// ❌ اشتباه
for (let j = 0; j < n; j++)

// ✅ درست
for (let j = i + 1; j < n; j++)
\`\`\`

### ۲. جابجایی فوری (منطق Bubble Sort!)
اول کمینه رو پیدا کن، بعد یه بار جابجا کن.

### ۳. فرض پایداری
Selection Sort **پایدار نیست** - ترتیب عناصر مساوی ممکنه عوض بشه!

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (بهترین/میانگین/بدترین) | O(n²) / O(n²) / O(n²) |
| فضا | O(1) |
| جابجایی | O(n) - حداکثر n-1 |
| پایدار؟ | **نه** |
| بهترین برای | کم کردن جابجایی |

> **یک خطی:** همه رو اسکن کن، کوچک‌ترین رو انتخاب کن، بذارش، تکرار کن. همیشه O(n²) ولی فقط O(n) جابجایی.
`,

  visualizationId: 'selection-sort',
  exerciseId: 'selection-sort',
};

export default selectionSortLesson;
