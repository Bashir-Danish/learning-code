export const heapSortLesson = {
  id: 'heap-sort',
  title: 'Heap Sort',
  titleFa: 'مرتب‌سازی هیپی',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Heap Sort - The Priority Queue Sorter

## What is Heap Sort?

Imagine a tournament where the winner always rises to the top. Build a "heap" where the largest element is always at root. Extract it, fix the heap, repeat. That's Heap Sort!

**Think of it like this:** A priority queue that always gives you the maximum. Keep extracting max and you get sorted order.

---

## Why Should You Care?

- **Guaranteed O(n log n)** - no worst case like Quick Sort
- **In-place** - only O(1) extra space (unlike Merge Sort)
- Foundation for **Priority Queues**
- Used in systems where memory is constrained

---

## Real-Life Analogies

### Tournament Bracket
In a tournament, winners bubble up. The champion (max) is at top. Remove champion, reorganize, find new champion. Repeat until all ranked.

### Priority Line
VIPs always at front. Remove VIP, next highest priority moves up. Keep removing front person to get priority-sorted list.

---

## How Does It Work?

**Phase 1: Build Max Heap**
- Transform array into max heap (parent ≥ children)
- Start from last non-leaf, heapify down

**Phase 2: Extract and Sort**
1. Swap root (max) with last element
2. Reduce heap size by 1
3. Heapify root down
4. Repeat until heap is empty

\`\`\`
Array: [4, 10, 3, 5, 1]

Build Max Heap:
[4, 10, 3, 5, 1] → [10, 5, 3, 4, 1]

Extract Phase:
[10, 5, 3, 4, 1] → swap 10↔1 → [1, 5, 3, 4, |10]
                 → heapify   → [5, 4, 3, 1, |10]
[5, 4, 3, 1, |10] → swap 5↔1 → [1, 4, 3, |5, 10]
                  → heapify  → [4, 1, 3, |5, 10]
... continue until sorted: [1, 3, 4, 5, 10]
\`\`\`

---

## The Code

\`\`\`javascript
function heapSort(arr) {
    const n = arr.length;
    
    // Phase 1: Build max heap (start from last non-leaf)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Phase 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // Move max to end
        heapify(arr, i, 0);  // Heapify reduced heap
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Find largest among root, left, right
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example
heapSort([4, 10, 3, 5, 1]);  // [1, 3, 4, 5, 10]
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| Best | O(n log n) | O(1) | Always builds heap + extracts |
| Average | O(n log n) | O(1) | Same process |
| Worst | O(n log n) | O(1) | **No degradation!** |

**Why O(n log n)?**
- Build heap: O(n) (not O(n log n)!)
- Extract n elements: n × O(log n) = O(n log n)
- Total: O(n log n)

**Why O(1) space?** Heap is built in-place in the array.

---

## When to Use / When NOT to Use

### ✅ Use when:
- **Guaranteed O(n log n)** needed
- **Memory constrained** - O(1) space
- Need **in-place** sorting
- Building **priority queues**

### ❌ Don't use when:
- **Stability required** - Heap Sort is NOT stable
- **Cache performance matters** - poor locality
- **Nearly sorted data** - no benefit (unlike Insertion Sort)

---

## Common Mistakes

### 1. Wrong Heapify Starting Point
\`\`\`javascript
// ❌ WRONG - starts from root
for (let i = 0; i < n; i++)

// ✅ CORRECT - start from last non-leaf
for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
\`\`\`

### 2. Wrong Child Index Calculation
\`\`\`javascript
// ❌ WRONG
const left = 2 * i;
const right = 2 * i + 1;

// ✅ CORRECT (0-indexed array)
const left = 2 * i + 1;
const right = 2 * i + 2;
\`\`\`

### 3. Not Reducing Heap Size
\`\`\`javascript
// ❌ WRONG - heapifies entire array
heapify(arr, arr.length, 0);

// ✅ CORRECT - heapify only unsorted portion
heapify(arr, i, 0);  // i decreases each iteration
\`\`\`

---

## Heap Sort vs Others

| Feature | Heap Sort | Quick Sort | Merge Sort |
|---------|-----------|------------|------------|
| Time (Worst) | **O(n log n)** | O(n²) | O(n log n) |
| Space | **O(1)** | O(log n) | O(n) |
| Stable | No | No | **Yes** |
| Cache | Poor | **Good** | Poor |

**Heap Sort:** Best of both worlds (guaranteed time + in-place), but poor cache performance.

---

## Interview Tips

- Know **heapify** operation well
- Understand **build heap is O(n)**, not O(n log n)
- Heap Sort is **NOT stable**
- Compare: "Heap Sort gives guaranteed O(n log n) with O(1) space, but poor cache locality"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (All Cases) | O(n log n) |
| Space | O(1) |
| Stable? | No |
| In-place? | Yes |
| Best For | Guaranteed performance, memory constrained |

> **One-liner:** Build max heap, extract max repeatedly. Guaranteed O(n log n) with O(1) space.
`,

  contentFa: `
# مرتب‌سازی هیپی - مرتب‌کننده صف اولویت

## مرتب‌سازی هیپی چیست؟

تصور کن یه مسابقه که برنده همیشه بالا میره. یه "هیپ" بساز که بزرگ‌ترین عنصر همیشه ریشه باشه. استخراجش کن، هیپ رو درست کن، تکرار کن. این Heap Sort هست!

**اینطوری فکر کن:** یه صف اولویت که همیشه بیشینه رو می‌ده. بیشینه رو استخراج کن و ترتیب مرتب می‌گیری.

---

## چرا باید اهمیت بدی؟

- **تضمین O(n log n)** - بدترین حالت مثل Quick Sort نداره
- **درجا** - فقط O(1) فضای اضافی (برخلاف Merge Sort)
- پایه **صف‌های اولویت**
- توی سیستم‌هایی که حافظه محدوده استفاده می‌شه

---

## مثال‌های زندگی واقعی

### جدول مسابقات
توی مسابقه، برنده‌ها بالا میرن. قهرمان (بیشینه) بالاست. قهرمان رو حذف کن، دوباره سازمان‌دهی کن، قهرمان جدید رو پیدا کن.

### صف اولویت
VIP ها همیشه جلون. VIP رو حذف کن، اولویت بعدی جلو میاد. جلویی رو حذف کن تا لیست مرتب بر اساس اولویت بگیری.

---

## چطور کار می‌کنه؟

**فاز ۱: ساخت Max Heap**
- آرایه رو به max heap تبدیل کن (والد ≥ فرزندان)
- از آخرین غیربرگ شروع کن، heapify پایین

**فاز ۲: استخراج و مرتب‌سازی**
۱. ریشه (بیشینه) رو با آخری جابجا کن
۲. اندازه هیپ رو ۱ کم کن
۳. ریشه رو heapify پایین کن
۴. تکرار کن تا هیپ خالی بشه

\`\`\`
آرایه: [4, 10, 3, 5, 1]

ساخت Max Heap:
[4, 10, 3, 5, 1] → [10, 5, 3, 4, 1]

فاز استخراج:
[10, 5, 3, 4, 1] → جابجایی 10↔1 → [1, 5, 3, 4, |10]
                 → heapify      → [5, 4, 3, 1, |10]
... ادامه تا مرتب بشه: [1, 3, 4, 5, 10]
\`\`\`

---

## کد

\`\`\`javascript
function heapSort(arr) {
    const n = arr.length;
    
    // فاز ۱: ساخت max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // فاز ۲: استخراج عناصر یکی یکی
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];  // بیشینه رو ببر آخر
        heapify(arr, i, 0);  // هیپ کوچک‌شده رو heapify کن
    }
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // بزرگ‌ترین رو بین ریشه، چپ، راست پیدا کن
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    // اگه بزرگ‌ترین ریشه نیست، جابجا کن و ادامه بده
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| بهترین | O(n log n) | O(1) | همیشه هیپ می‌سازه + استخراج |
| میانگین | O(n log n) | O(1) | همون پروسه |
| بدترین | O(n log n) | O(1) | **خراب نمی‌شه!** |

**چرا O(n log n)?**
- ساخت هیپ: O(n)
- استخراج n عنصر: n × O(log n) = O(n log n)

**چرا O(1) فضا?** هیپ درجا توی آرایه ساخته می‌شه.

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- **تضمین O(n log n)** لازمه
- **حافظه محدود** - فضای O(1)
- مرتب‌سازی **درجا** لازمه

### ❌ استفاده نکن:
- **پایداری لازمه** - Heap Sort پایدار نیست
- **کارایی کش مهمه** - locality ضعیف

---

## اشتباهات رایج

### ۱. نقطه شروع heapify اشتباه
\`\`\`javascript
// ❌ اشتباه - از ریشه شروع می‌کنه
for (let i = 0; i < n; i++)

// ✅ درست - از آخرین غیربرگ شروع کن
for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
\`\`\`

### ۲. محاسبه اندیس فرزند اشتباه
\`\`\`javascript
// ❌ اشتباه
const left = 2 * i;

// ✅ درست (آرایه 0-indexed)
const left = 2 * i + 1;
const right = 2 * i + 2;
\`\`\`

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (همه حالات) | O(n log n) |
| فضا | O(1) |
| پایدار؟ | نه |
| درجا؟ | بله |
| بهترین برای | کارایی تضمینی، حافظه محدود |

> **یک خطی:** max heap بساز، بیشینه رو مکرراً استخراج کن. تضمین O(n log n) با O(1) فضا.
`,

  visualizationId: 'heap-sort',
  exerciseId: 'heap-sort',
};

export default heapSortLesson;
