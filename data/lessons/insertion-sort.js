export const insertionSortLesson = {
  id: 'insertion-sort',
  title: 'Insertion Sort',
  titleFa: 'مرتب‌سازی درجی',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# Insertion Sort - The Card Player's Algorithm

## What is Insertion Sort?

Imagine sorting playing cards in your hand. You pick up each card and slide it into its correct position among the cards you've already sorted. That's Insertion Sort!

**Think of it like this:** Building a sorted hand one card at a time - each new card gets inserted where it belongs.

---

## Why Should You Care?

- **Best for nearly sorted data** - O(n) when almost sorted!
- **Online algorithm** - can sort data as it arrives
- Stable and in-place
- Simple to implement correctly
- Often faster than O(n log n) sorts for small arrays

---

## Real-Life Analogies

### Sorting Cards in Your Hand
You hold sorted cards in left hand. Pick a new card with right hand, find its spot, slide others right, insert it.

### Organizing Books on a Shelf
You have some sorted books. Pick up a new book, find where it belongs, shift others to make room, insert it.

---

## How Does It Work?

1. Start with second element (first is "sorted")
2. Pick current element (key)
3. Compare with sorted portion, shift larger elements right
4. Insert key in correct position
5. Repeat for all elements

\`\`\`
[5, 2, 4, 6, 1, 3]
    ↓ key=2, shift 5 right, insert 2
[2, 5, 4, 6, 1, 3]
       ↓ key=4, shift 5 right, insert 4
[2, 4, 5, 6, 1, 3]
          ↓ key=6, already in place
[2, 4, 5, 6, 1, 3]
             ↓ key=1, shift all right, insert 1
[1, 2, 4, 5, 6, 3]
                ↓ key=3, shift 4,5,6 right, insert 3
[1, 2, 3, 4, 5, 6]  ← Sorted!
\`\`\`

---

## The Code

\`\`\`javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];  // Element to insert
        let j = i - 1;
        
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key in correct position
        arr[j + 1] = key;
    }
    return arr;
}

// Examples
insertionSort([5, 2, 4, 6, 1, 3]);  // [1,2,3,4,5,6]
insertionSort([1, 2, 3, 4, 5]);     // O(n) - no shifts needed!
insertionSort([5, 4, 3, 2, 1]);     // O(n²) - maximum shifts
\`\`\`

### Binary Insertion Sort (Optimization)

\`\`\`javascript
function binaryInsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        // Use binary search to find insertion point
        let left = 0, right = i - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] > key) right = mid - 1;
            else left = mid + 1;
        }
        // Shift and insert
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }
        arr[left] = key;
    }
    return arr;
}
// Reduces comparisons to O(n log n), but shifts still O(n²)
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| Best | O(n) | O(1) | Already sorted - no shifts |
| Average | O(n²) | O(1) | Random order |
| Worst | O(n²) | O(1) | Reverse sorted - max shifts |

**Why O(n) best case?** When sorted, inner while loop never executes - just one comparison per element!

---

## When to Use / When NOT to Use

### ✅ Use when:
- **Nearly sorted data** - O(n) best case!
- **Small datasets** (n < 50)
- **Online sorting** - data arrives one at a time
- **Stability required**
- As final pass in hybrid sorts (like Timsort)

### ❌ Don't use when:
- Large random datasets
- Performance critical with unsorted data

---

## Common Mistakes

### 1. Starting from Index 0
\`\`\`javascript
// ❌ WRONG - nothing to compare first element with
for (let i = 0; i < arr.length; i++)

// ✅ CORRECT - start from index 1
for (let i = 1; i < arr.length; i++)
\`\`\`

### 2. Wrong Shift Direction
\`\`\`javascript
// ❌ WRONG - overwrites elements
arr[j] = arr[j + 1];

// ✅ CORRECT - shift right
arr[j + 1] = arr[j];
\`\`\`

### 3. Forgetting to Save Key
\`\`\`javascript
// ❌ WRONG - key gets overwritten during shifts
// ✅ CORRECT - save key before shifting
const key = arr[i];
\`\`\`

---

## Comparison with Other O(n²) Sorts

| Feature | Insertion | Bubble | Selection |
|---------|-----------|--------|-----------|
| Best Case | **O(n)** | O(n) | O(n²) |
| Stable | Yes | Yes | No |
| Adaptive | **Yes** | Yes | No |
| Online | **Yes** | No | No |
| Swaps | O(n²) | O(n²) | **O(n)** |

**Insertion Sort wins** for nearly sorted data and online sorting!

---

## Interview Tips

- Mention **O(n) best case** for nearly sorted data
- Know it's used in **Timsort** (Python/Java's sort) for small subarrays
- It's **online** - can sort as data arrives
- Compare: "Insertion builds sorted portion by inserting; Selection finds minimum and places it"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (Best/Avg/Worst) | O(n) / O(n²) / O(n²) |
| Space | O(1) |
| Stable? | Yes |
| Online? | Yes |
| Best For | Nearly sorted, small data, streaming |

> **One-liner:** Like sorting cards - pick each element and insert it in the right spot. O(n) for nearly sorted data!
`,

  contentFa: `
# مرتب‌سازی درجی - الگوریتم بازیکن کارت

## مرتب‌سازی درجی چیست؟

تصور کن داری کارت‌های بازی رو توی دستت مرتب می‌کنی. هر کارت رو برمی‌داری و توی جای درستش بین کارت‌هایی که قبلاً مرتب کردی می‌ذاری. این Insertion Sort هست!

**اینطوری فکر کن:** ساختن یه دست مرتب، یه کارت در هر زمان - هر کارت جدید جایی که باید درج می‌شه.

---

## چرا باید اهمیت بدی؟

- **بهترین برای داده تقریباً مرتب** - O(n) وقتی تقریباً مرتبه!
- **الگوریتم آنلاین** - می‌تونه داده رو همونطور که میاد مرتب کنه
- پایدار و درجا
- ساده برای پیاده‌سازی درست

---

## مثال‌های زندگی واقعی

### مرتب کردن کارت توی دست
کارت‌های مرتب رو توی دست چپ نگه می‌داری. کارت جدید رو با دست راست برمی‌داری، جاش رو پیدا می‌کنی، بقیه رو شیفت می‌دی، درجش می‌کنی.

### مرتب کردن کتاب‌ها
چند کتاب مرتب داری. کتاب جدید رو برمی‌داری، جاش رو پیدا می‌کنی، بقیه رو شیفت می‌دی، درجش می‌کنی.

---

## چطور کار می‌کنه؟

۱. از عنصر دوم شروع کن (اولی "مرتب" شده)
۲. عنصر فعلی رو بردار (key)
۳. با بخش مرتب مقایسه کن، بزرگ‌ترها رو شیفت بده راست
۴. key رو توی جای درست درج کن
۵. برای همه عناصر تکرار کن

\`\`\`
[5, 2, 4, 6, 1, 3]
    ↓ key=2، 5 رو شیفت بده راست، 2 رو درج کن
[2, 5, 4, 6, 1, 3]
       ↓ key=4، 5 رو شیفت بده راست، 4 رو درج کن
[2, 4, 5, 6, 1, 3]
          ↓ key=6، سر جاشه
[2, 4, 5, 6, 1, 3]
             ↓ key=1، همه رو شیفت بده راست، 1 رو درج کن
[1, 2, 4, 5, 6, 3]
                ↓ key=3، 4,5,6 رو شیفت بده راست، 3 رو درج کن
[1, 2, 3, 4, 5, 6]  ← مرتب شد!
\`\`\`

---

## کد

\`\`\`javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];  // عنصر برای درج
        let j = i - 1;
        
        // عناصر بزرگ‌تر از key رو شیفت بده راست
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // key رو توی جای درست درج کن
        arr[j + 1] = key;
    }
    return arr;
}

// مثال‌ها
insertionSort([5, 2, 4, 6, 1, 3]);  // [1,2,3,4,5,6]
insertionSort([1, 2, 3, 4, 5]);     // O(n) - شیفت لازم نیست!
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| بهترین | O(n) | O(1) | از قبل مرتب - شیفت نداره |
| میانگین | O(n²) | O(1) | ترتیب تصادفی |
| بدترین | O(n²) | O(1) | معکوس مرتب - حداکثر شیفت |

**چرا بهترین حالت O(n)?** وقتی مرتبه، حلقه while داخلی هیچوقت اجرا نمی‌شه!

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- **داده تقریباً مرتب** - بهترین حالت O(n)!
- **دیتاست کوچک** (n < 50)
- **مرتب‌سازی آنلاین** - داده یکی یکی میاد
- **پایداری لازمه**

### ❌ استفاده نکن:
- دیتاست بزرگ تصادفی
- کارایی مهمه با داده نامرتب

---

## اشتباهات رایج

### ۱. شروع از اندیس 0
\`\`\`javascript
// ❌ اشتباه
for (let i = 0; i < arr.length; i++)

// ✅ درست - از اندیس 1 شروع کن
for (let i = 1; i < arr.length; i++)
\`\`\`

### ۲. جهت شیفت اشتباه
\`\`\`javascript
// ❌ اشتباه
arr[j] = arr[j + 1];

// ✅ درست - شیفت به راست
arr[j + 1] = arr[j];
\`\`\`

### ۳. فراموش کردن ذخیره key
قبل از شیفت، key رو ذخیره کن!

---

## مقایسه با بقیه O(n²) ها

| ویژگی | Insertion | Bubble | Selection |
|-------|-----------|--------|-----------|
| بهترین حالت | **O(n)** | O(n) | O(n²) |
| پایدار | بله | بله | نه |
| آنلاین | **بله** | نه | نه |

**Insertion Sort برنده‌ست** برای داده تقریباً مرتب و مرتب‌سازی آنلاین!

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (بهترین/میانگین/بدترین) | O(n) / O(n²) / O(n²) |
| فضا | O(1) |
| پایدار؟ | بله |
| آنلاین؟ | بله |
| بهترین برای | تقریباً مرتب، کوچک، استریم |

> **یک خطی:** مثل مرتب کردن کارت - هر عنصر رو بردار و توی جای درست درج کن. O(n) برای داده تقریباً مرتب!
`,

  visualizationId: 'insertion-sort',
  exerciseId: 'insertion-sort',
};

export default insertionSortLesson;
