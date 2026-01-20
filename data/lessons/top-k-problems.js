export const topKProblemsLesson = {
  id: 'top-k-problems',
  title: 'Top K Problems',
  titleFa: 'مسائل Top K',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Top K Problems - Finding the Best/Worst

## What are Top K Problems?

Imagine finding the 3 tallest students in a school of 1000. You don't need to sort everyone - just track the top 3!

**Think of it like:**
- Finding top 10 scorers in a game
- Getting 5 cheapest flights
- Finding 3 most frequent words

---

## Why Should You Care?

- Very common interview pattern (15%+ of heap questions)
- O(n log k) is better than O(n log n) sorting
- Used in recommendation systems, analytics
- Shows understanding of heap optimization

---

## The Key Insight

**For K largest:** Use MIN-heap of size K
**For K smallest:** Use MAX-heap of size K

Why? The heap keeps the "boundary" element at top. If new element beats it, swap!

\`\`\`
Finding 3 largest from [5, 2, 9, 1, 7, 6]:

Min-heap (size 3):
Add 5: [5]
Add 2: [2, 5]
Add 9: [2, 5, 9]
Add 1: 1 < 2 (min), skip
Add 7: 7 > 2, remove 2, add 7 → [5, 7, 9]
Add 6: 6 > 5, remove 5, add 6 → [6, 7, 9]

Result: [6, 7, 9] ✓
\`\`\`

---

## Problem 1: Kth Largest Element

\`\`\`javascript
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    
    for (let num of nums) {
        minHeap.insert(num);
        // Keep only k elements
        if (minHeap.size() > k) {
            minHeap.extractMin();  // Remove smallest
        }
    }
    
    return minHeap.peek();  // Kth largest is the min of top k
}
// Time: O(n log k), Space: O(k)
\`\`\`

---

## Problem 2: Top K Frequent Elements

\`\`\`javascript
function topKFrequent(nums, k) {
    // Step 1: Count frequencies
    const freq = new Map();
    for (let n of nums) {
        freq.set(n, (freq.get(n) || 0) + 1);
    }
    
    // Step 2: Use min-heap of size k (by frequency)
    const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);
    
    for (let [num, count] of freq) {
        minHeap.enqueue([num, count]);
        if (minHeap.size() > k) {
            minHeap.dequeue();  // Remove least frequent
        }
    }
    
    // Step 3: Extract results
    return minHeap.heap.map(([num]) => num);
}
// Time: O(n log k), Space: O(n)
\`\`\`

---

## Problem 3: K Closest Points to Origin

\`\`\`javascript
function kClosest(points, k) {
    const dist = ([x, y]) => x * x + y * y;
    
    // Max-heap by distance (keep k smallest)
    const maxHeap = new PriorityQueue((a, b) => dist(b) - dist(a));
    
    for (let p of points) {
        maxHeap.enqueue(p);
        if (maxHeap.size() > k) {
            maxHeap.dequeue();  // Remove farthest
        }
    }
    
    return maxHeap.heap;
}
// Time: O(n log k), Space: O(k)
\`\`\`

---

## Alternative: Quick Select - O(n) Average

\`\`\`javascript
function findKthLargest(nums, k) {
    k = nums.length - k;  // Convert to kth smallest index
    
    function partition(l, r) {
        const pivot = nums[r];
        let i = l;
        for (let j = l; j < r; j++) {
            if (nums[j] < pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[r]] = [nums[r], nums[i]];
        return i;
    }
    
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const p = partition(l, r);
        if (p === k) return nums[p];
        if (p < k) l = p + 1;
        else r = p - 1;
    }
}
// Average: O(n), Worst: O(n²)
\`\`\`

---

## Common Mistakes

### 1. Using Wrong Heap Type
\`\`\`javascript
// ❌ WRONG - max-heap for k largest
// Keeps k smallest instead!

// ✅ CORRECT - min-heap for k largest
// Min of top k = kth largest
\`\`\`

### 2. Forgetting to Limit Heap Size
\`\`\`javascript
// ❌ WRONG - heap grows to n elements
for (let num of nums) {
    minHeap.insert(num);
}

// ✅ CORRECT - maintain size k
for (let num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) minHeap.extractMin();
}
\`\`\`

### 3. Wrong Comparator for Objects
\`\`\`javascript
// ❌ WRONG - comparing by wrong property
const pq = new PriorityQueue((a, b) => a.val - b.val);
// When you need frequency!

// ✅ CORRECT - compare by frequency
const pq = new PriorityQueue((a, b) => a.freq - b.freq);
\`\`\`

---

## When to Use What

| Approach | Time | When to Use |
|----------|------|-------------|
| Heap | O(n log k) | k << n, streaming data |
| Quick Select | O(n) avg | One-time query, k close to n/2 |
| Sort | O(n log n) | Need all sorted, small n |

---

## Interview Tips

- "I'll use a min-heap of size k for O(n log k)"
- Explain why opposite heap type works
- Mention Quick Select as O(n) alternative
- For streaming data, heap is the only option

---

## Quick Summary

| Feature | Value |
|---------|-------|
| K largest | Min-heap size k |
| K smallest | Max-heap size k |
| Time | O(n log k) |
| Space | O(k) |

> **One-liner:** For K largest use min-heap, for K smallest use max-heap. Keep heap size at K. O(n log k) beats sorting!
`,

  contentFa: `
# مسائل Top K - پیدا کردن بهترین/بدترین

## مسائل Top K چیست؟

تصور کن می‌خوای ۳ دانش‌آموز قدبلندتر رو در مدرسه‌ای با ۱۰۰۰ نفر پیدا کنی. نیازی نیست همه رو مرتب کنی - فقط ۳ تای برتر رو دنبال کن!

**مثل این فکر کن:**
- پیدا کردن ۱۰ امتیازآور برتر در بازی
- گرفتن ۵ پرواز ارزان‌تر
- پیدا کردن ۳ کلمه پرتکرارتر

---

## چرا باید اهمیت بدی؟

- الگوی خیلی رایج مصاحبه (۱۵%+ سوالات هیپ)
- O(n log k) بهتر از O(n log n) مرتب‌سازیه
- در سیستم‌های توصیه، آنالیتیکس استفاده می‌شه
- درک بهینه‌سازی هیپ رو نشون می‌ده

---

## نکته کلیدی

**برای K بزرگترین:** از MIN-heap با اندازه K استفاده کن
**برای K کوچکترین:** از MAX-heap با اندازه K استفاده کن

چرا؟ هیپ عنصر "مرزی" رو بالا نگه می‌داره. اگه عنصر جدید ازش بهتره، جایگزین کن!

پیدا کردن ۳ بزرگترین از [5, 2, 9, 1, 7, 6]:

Min-heap (اندازه 3):
اضافه 5: [5]
اضافه 2: [2, 5]
اضافه 9: [2, 5, 9]
اضافه 1: 1 < 2 (min)، رد کن
اضافه 7: 7 > 2، حذف 2، اضافه 7 → [5, 7, 9]
اضافه 6: 6 > 5، حذف 5، اضافه 6 → [6, 7, 9]

نتیجه: [6, 7, 9] ✓

---

## مسئله ۱: Kامین بزرگترین عنصر

findKthLargest(nums, k):
    minHeap = MinHeap()
    
    برای هر num در nums:
        minHeap.insert(num)
        // فقط k عنصر نگه دار
        اگه minHeap.size() > k:
            minHeap.extractMin()  // کوچکترین رو حذف کن
    
    return minHeap.peek()  // Kامین بزرگترین = min از k برتر

زمان: O(n log k)، فضا: O(k)

---

## مسئله ۲: K عنصر پرتکرار

topKFrequent(nums, k):
    // مرحله ۱: فرکانس‌ها رو بشمار
    freq = Map()
    برای هر n در nums:
        freq.set(n, (freq.get(n) || 0) + 1)
    
    // مرحله ۲: min-heap با اندازه k (بر اساس فرکانس)
    minHeap = PriorityQueue((a, b) => a[1] - b[1])
    
    برای هر [num, count] در freq:
        minHeap.enqueue([num, count])
        اگه minHeap.size() > k:
            minHeap.dequeue()  // کم‌تکرارترین رو حذف کن
    
    // مرحله ۳: نتایج رو استخراج کن
    return minHeap.heap.map(([num]) => num)

زمان: O(n log k)، فضا: O(n)

---

## مسئله ۳: K نزدیک‌ترین نقطه به مبدأ

kClosest(points, k):
    dist = ([x, y]) => x * x + y * y
    
    // Max-heap بر اساس فاصله (k کوچکترین رو نگه دار)
    maxHeap = PriorityQueue((a, b) => dist(b) - dist(a))
    
    برای هر p در points:
        maxHeap.enqueue(p)
        اگه maxHeap.size() > k:
            maxHeap.dequeue()  // دورترین رو حذف کن
    
    return maxHeap.heap

زمان: O(n log k)، فضا: O(k)

---

## جایگزین: Quick Select - O(n) میانگین

findKthLargest(nums, k):
    k = nums.length - k  // تبدیل به اندیس kامین کوچکترین
    
    partition(l, r):
        pivot = nums[r]
        i = l
        برای j از l تا r-1:
            اگه nums[j] < pivot:
                جای nums[i] و nums[j] رو عوض کن
                i++
        جای nums[i] و nums[r] رو عوض کن
        return i
    
    l = 0, r = nums.length - 1
    تا وقتی l <= r:
        p = partition(l, r)
        اگه p === k: return nums[p]
        اگه p < k: l = p + 1
        وگرنه: r = p - 1

میانگین: O(n)، بدترین: O(n²)

---

## اشتباهات رایج

### ۱. استفاده از نوع هیپ اشتباه
❌ اشتباه: max-heap برای k بزرگترین (k کوچکترین رو نگه می‌داره!)
✅ درست: min-heap برای k بزرگترین (min از k برتر = kامین بزرگترین)

### ۲. فراموش کردن محدود کردن اندازه هیپ
❌ اشتباه: هیپ تا n عنصر بزرگ می‌شه
✅ درست: اندازه k رو حفظ کن

### ۳. comparator اشتباه برای آبجکت‌ها
❌ اشتباه: مقایسه با ویژگی اشتباه
✅ درست: با ویژگی درست مقایسه کن (مثلاً فرکانس)

---

## کی از چی استفاده کنیم

| روش | زمان | کی استفاده کنیم |
|-----|------|-----------------|
| هیپ | O(n log k) | k << n، داده جریانی |
| Quick Select | O(n) میانگین | یه بار کوئری، k نزدیک n/2 |
| مرتب‌سازی | O(n log n) | همه مرتب لازمه، n کوچک |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| K بزرگترین | Min-heap اندازه k |
| K کوچکترین | Max-heap اندازه k |
| زمان | O(n log k) |
| فضا | O(k) |

> **یک خطی:** برای K بزرگترین از min-heap، برای K کوچکترین از max-heap استفاده کن. اندازه هیپ رو K نگه دار. O(n log k) از مرتب‌سازی بهتره!
`,

  visualizationId: null,
  exerciseId: 'top-k-problems',
};

export default topKProblemsLesson;
