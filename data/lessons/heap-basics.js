export const heapBasicsLesson = {
  id: 'heap-basics',
  title: 'Heap Basics',
  titleFa: 'مبانی هیپ',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Heap Basics - The Priority Data Structure

## What is a Heap?

Imagine a company hierarchy where every manager earns more than their direct reports. That's a max-heap! (Or less for min-heap)

**Think of it like:**
- A tournament bracket - winner always on top
- Emergency room - most urgent patient first
- VIP line - highest priority served first

**Key property:** Parent is always greater (max-heap) or smaller (min-heap) than children.

---

## Why Should You Care?

- O(1) access to min/max element
- O(log n) insert and extract
- Foundation for priority queues
- Used in Dijkstra, heap sort, scheduling
- 10%+ of interview questions involve heaps

---

## Heap as Array

Heaps are stored as arrays - no pointers needed!

\`\`\`javascript
// For index i:
parent(i) = Math.floor((i - 1) / 2)
leftChild(i) = 2 * i + 1
rightChild(i) = 2 * i + 2

// Example: [10, 8, 9, 4, 5, 6, 7]
//        10          index 0
//       /  \\
//      8    9        index 1, 2
//     / \\  / \\
//    4  5 6  7       index 3, 4, 5, 6
\`\`\`

---

## Min Heap Implementation

\`\`\`javascript
class MinHeap {
    constructor() { this.heap = []; }
    
    // Add element - O(log n)
    insert(val) {
        this.heap.push(val);           // Add to end
        this.bubbleUp(this.heap.length - 1);  // Fix heap
    }
    
    bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.heap[parent] <= this.heap[idx]) break;
            // Swap with parent
            [this.heap[parent], this.heap[idx]] = 
                [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }
    
    // Remove min - O(log n)
    extractMin() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();  // Move last to root
        if (this.heap.length > 0) this.bubbleDown(0);
        return min;
    }
    
    bubbleDown(idx) {
        while (true) {
            let smallest = idx;
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            
            if (left < this.heap.length && 
                this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length && 
                this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            
            if (smallest === idx) break;
            [this.heap[idx], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
    
    peek() { return this.heap[0]; }
    size() { return this.heap.length; }
}
\`\`\`

---

## Build Heap - O(n)

\`\`\`javascript
function buildHeap(arr) {
    // Start from last non-leaf node
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr, i);
    }
}
// Why O(n) not O(n log n)? Most nodes are near bottom!
\`\`\`

---

## Common Mistakes

### 1. Wrong Parent/Child Formula
\`\`\`javascript
// ❌ WRONG
parent = i / 2;  // Missing floor, wrong for 0-indexed

// ✅ CORRECT
parent = Math.floor((i - 1) / 2);
\`\`\`

### 2. Not Checking Bounds in BubbleDown
\`\`\`javascript
// ❌ WRONG - accessing out of bounds
if (this.heap[left] < this.heap[smallest])

// ✅ CORRECT - check bounds first
if (left < this.heap.length && 
    this.heap[left] < this.heap[smallest])
\`\`\`

### 3. Forgetting to Handle Empty Heap
\`\`\`javascript
// ❌ WRONG
extractMin() {
    const min = this.heap[0];  // Crashes if empty!
}

// ✅ CORRECT
extractMin() {
    if (this.heap.length === 0) return null;
    // ...
}
\`\`\`

---

## Complexity

| Operation | Time | Why |
|-----------|------|-----|
| Insert | O(log n) | Bubble up tree height |
| Extract | O(log n) | Bubble down tree height |
| Peek | O(1) | Just return root |
| Build | O(n) | Bottom-up heapify |

---

## Interview Tips

- Min-heap for K largest, max-heap for K smallest
- "I'll use a heap for O(log n) insert and O(1) min/max access"
- Know the array index formulas by heart
- JavaScript: use custom comparator or negate values for max-heap

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Structure | Complete binary tree as array |
| Property | Parent ≤ children (min) or ≥ (max) |
| Insert/Extract | O(log n) |
| Peek | O(1) |

> **One-liner:** Heap = complete binary tree where parent beats children. Stored as array. O(log n) insert/extract, O(1) peek!
`,

  contentFa: `
# مبانی هیپ - ساختار داده اولویت‌دار

## هیپ چیست؟

تصور کن یه سلسله‌مراتب شرکتی که هر مدیر بیشتر از زیردستانش درآمد داره. این max-heap هست! (یا کمتر برای min-heap)

**مثل این فکر کن:**
- جدول مسابقات - برنده همیشه بالاست
- اورژانس - فوری‌ترین بیمار اول
- صف VIP - بالاترین اولویت اول سرویس می‌گیره

**ویژگی کلیدی:** والد همیشه بزرگتر (max-heap) یا کوچکتر (min-heap) از فرزندانه.

---

## چرا باید اهمیت بدی؟

- دسترسی O(1) به حداقل/حداکثر
- درج و استخراج O(log n)
- پایه صف‌های اولویت
- در دایکسترا، مرتب‌سازی هیپ، زمان‌بندی استفاده می‌شه
- ۱۰%+ سوالات مصاحبه شامل هیپ هستن

---

## هیپ به صورت آرایه

هیپ‌ها به صورت آرایه ذخیره می‌شن - نیازی به اشاره‌گر نیست!

برای اندیس i:
parent(i) = floor((i - 1) / 2)
leftChild(i) = 2 * i + 1
rightChild(i) = 2 * i + 2

مثال: [10, 8, 9, 4, 5, 6, 7]
       10          اندیس 0
      /  \\
     8    9        اندیس 1، 2
    / \\  / \\
   4  5 6  7       اندیس 3، 4، 5، 6

---

## پیاده‌سازی Min Heap

class MinHeap:
    heap = []
    
    // اضافه کردن عنصر - O(log n)
    insert(val):
        heap.push(val)           // به آخر اضافه کن
        bubbleUp(heap.length - 1)  // هیپ رو درست کن
    
    bubbleUp(idx):
        تا وقتی idx > 0:
            parent = floor((idx - 1) / 2)
            اگه heap[parent] <= heap[idx]: break
            جای والد و فرزند رو عوض کن
            idx = parent
    
    // حذف حداقل - O(log n)
    extractMin():
        اگه heap خالی: return null
        min = heap[0]
        heap[0] = heap.pop()  // آخری رو به ریشه ببر
        bubbleDown(0)
        return min
    
    bubbleDown(idx):
        تا همیشه:
            smallest = idx
            left = 2 * idx + 1
            right = 2 * idx + 2
            
            اگه left معتبر و heap[left] < heap[smallest]:
                smallest = left
            اگه right معتبر و heap[right] < heap[smallest]:
                smallest = right
            
            اگه smallest === idx: break
            جای idx و smallest رو عوض کن
            idx = smallest

---

## ساختن هیپ - O(n)

buildHeap(arr):
    // از آخرین گره غیر-برگ شروع کن
    برای i از floor(arr.length / 2) - 1 تا 0:
        heapify(arr, i)

چرا O(n) نه O(n log n)؟ بیشتر گره‌ها نزدیک پایین هستن!

---

## اشتباهات رایج

### ۱. فرمول والد/فرزند اشتباه
❌ اشتباه: parent = i / 2 (floor نداره، برای 0-indexed اشتباهه)
✅ درست: parent = floor((i - 1) / 2)

### ۲. چک نکردن محدوده در BubbleDown
❌ اشتباه: بدون چک کردن محدوده
✅ درست: اول چک کن left < heap.length

### ۳. فراموش کردن هندل هیپ خالی
❌ اشتباه: اگه خالی باشه کرش می‌کنه
✅ درست: اول چک کن heap.length === 0

---

## پیچیدگی

| عملیات | زمان | چرا |
|--------|------|-----|
| درج | O(log n) | بالا رفتن به اندازه ارتفاع |
| استخراج | O(log n) | پایین رفتن به اندازه ارتفاع |
| نگاه | O(1) | فقط ریشه رو برگردون |
| ساختن | O(n) | heapify از پایین به بالا |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ساختار | درخت دودویی کامل به صورت آرایه |
| ویژگی | والد ≤ فرزندان (min) یا ≥ (max) |
| درج/استخراج | O(log n) |
| نگاه | O(1) |

> **یک خطی:** هیپ = درخت دودویی کامل که والد از فرزندان برنده می‌شه. به صورت آرایه ذخیره می‌شه. درج/استخراج O(log n)، نگاه O(1)!
`,

  visualizationId: 'heap',
  exerciseId: 'heap-basics',
};

export default heapBasicsLesson;
