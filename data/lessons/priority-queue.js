export const priorityQueueLesson = {
  id: 'priority-queue',
  title: 'Priority Queue',
  titleFa: 'صف اولویت',
  difficulty: 'medium',
  estimatedTime: '40 min',
  
  content: `
# Priority Queue - VIP Line for Data

## What is a Priority Queue?

Imagine an emergency room - patients aren't served first-come-first-served, but by urgency. That's a priority queue!

**Think of it like:**
- ER triage - most critical patient first
- Airport boarding - first class boards first
- Task scheduler - high priority tasks run first

**Key difference from queue:** Elements leave based on priority, not arrival order.

---

## Why Should You Care?

- Essential for Dijkstra's shortest path
- Used in A* pathfinding (games, maps)
- Task scheduling in operating systems
- Huffman coding for compression
- 15%+ of graph problems need priority queues

---

## Implementation with Heap

\`\`\`javascript
class PriorityQueue {
    constructor(comparator = (a, b) => a - b) {
        this.heap = [];
        this.compare = comparator;  // Custom priority!
    }
    
    enqueue(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    dequeue() {
        if (this.isEmpty()) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return top;
    }
    
    bubbleUp(idx) {
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (this.compare(this.heap[parent], this.heap[idx]) <= 0) break;
            [this.heap[parent], this.heap[idx]] = 
                [this.heap[idx], this.heap[parent]];
            idx = parent;
        }
    }
    
    bubbleDown(idx) {
        while (true) {
            let best = idx;
            const left = 2 * idx + 1, right = 2 * idx + 2;
            if (left < this.heap.length && 
                this.compare(this.heap[left], this.heap[best]) < 0) best = left;
            if (right < this.heap.length && 
                this.compare(this.heap[right], this.heap[best]) < 0) best = right;
            if (best === idx) break;
            [this.heap[idx], this.heap[best]] = [this.heap[best], this.heap[idx]];
            idx = best;
        }
    }
    
    peek() { return this.heap[0]; }
    isEmpty() { return this.heap.length === 0; }
    size() { return this.heap.length; }
}
\`\`\`

---

## Classic Problem: Merge K Sorted Lists

\`\`\`javascript
function mergeKLists(lists) {
    // Min-heap by node value
    const pq = new PriorityQueue((a, b) => a.val - b.val);
    
    // Add first node of each list
    for (let list of lists) {
        if (list) pq.enqueue(list);
    }
    
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (!pq.isEmpty()) {
        const node = pq.dequeue();  // Get smallest
        curr.next = node;
        curr = curr.next;
        if (node.next) pq.enqueue(node.next);  // Add next from same list
    }
    
    return dummy.next;
}
// Time: O(n log k), Space: O(k)
\`\`\`

---

## Dijkstra's Algorithm

\`\`\`javascript
function dijkstra(graph, start) {
    const dist = new Map();
    const pq = new PriorityQueue((a, b) => a[1] - b[1]);
    
    pq.enqueue([start, 0]);
    
    while (!pq.isEmpty()) {
        const [node, d] = pq.dequeue();
        
        if (dist.has(node)) continue;  // Already processed
        dist.set(node, d);
        
        for (let [neighbor, weight] of graph[node]) {
            if (!dist.has(neighbor)) {
                pq.enqueue([neighbor, d + weight]);
            }
        }
    }
    
    return dist;
}
\`\`\`

---

## Common Mistakes

### 1. Wrong Comparator Direction
\`\`\`javascript
// ❌ WRONG - gives max instead of min
const pq = new PriorityQueue((a, b) => b - a);

// ✅ CORRECT - min-heap (smallest first)
const pq = new PriorityQueue((a, b) => a - b);
\`\`\`

### 2. Comparing Objects Without Comparator
\`\`\`javascript
// ❌ WRONG - can't compare objects directly
pq.enqueue({val: 5});

// ✅ CORRECT - provide comparator
const pq = new PriorityQueue((a, b) => a.val - b.val);
\`\`\`

### 3. Not Handling Empty Queue
\`\`\`javascript
// ❌ WRONG
const top = pq.dequeue();
console.log(top.val);  // Crashes if empty!

// ✅ CORRECT
if (!pq.isEmpty()) {
    const top = pq.dequeue();
}
\`\`\`

---

## Applications

| Use Case | Priority |
|----------|----------|
| Dijkstra | Shortest distance |
| Task scheduler | Task priority |
| Huffman coding | Lowest frequency |
| Event simulation | Earliest time |
| Merge K lists | Smallest value |

---

## Interview Tips

- Know when to use min vs max heap
- "I'll use a priority queue for efficient min/max extraction"
- For objects, always define a comparator
- JavaScript doesn't have built-in PQ - implement or use library

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Enqueue | O(log n) |
| Dequeue | O(log n) |
| Peek | O(1) |
| Key Use | Dijkstra, merge K lists |

> **One-liner:** Priority queue = heap-based queue where highest priority leaves first. Essential for Dijkstra and merge K sorted lists!
`,

  contentFa: `
# صف اولویت - صف VIP برای داده‌ها

## صف اولویت چیست؟

تصور کن اورژانس بیمارستان - بیماران به ترتیب ورود سرویس نمی‌گیرن، بلکه به ترتیب فوریت. این صف اولویته!

**مثل این فکر کن:**
- تریاژ اورژانس - بحرانی‌ترین بیمار اول
- سوار شدن هواپیما - فرست کلاس اول سوار می‌شه
- زمان‌بند وظایف - وظایف با اولویت بالا اول اجرا می‌شن

**تفاوت کلیدی با صف:** عناصر بر اساس اولویت خارج می‌شن، نه ترتیب ورود.

---

## چرا باید اهمیت بدی؟

- ضروری برای کوتاه‌ترین مسیر دایکسترا
- در مسیریابی A* استفاده می‌شه (بازی‌ها، نقشه‌ها)
- زمان‌بندی وظایف در سیستم‌عامل
- کدگذاری هافمن برای فشرده‌سازی
- ۱۵%+ مسائل گراف به صف اولویت نیاز دارن

---

## پیاده‌سازی با هیپ

class PriorityQueue:
    heap = []
    compare = comparator  // اولویت سفارشی!
    
    enqueue(val):
        heap.push(val)
        bubbleUp(heap.length - 1)
    
    dequeue():
        اگه خالی: return null
        top = heap[0]
        last = heap.pop()
        اگه heap خالی نیست:
            heap[0] = last
            bubbleDown(0)
        return top
    
    peek(): return heap[0]
    isEmpty(): return heap.length === 0
    size(): return heap.length

---

## مسئله کلاسیک: ادغام K لیست مرتب

mergeKLists(lists):
    // Min-heap بر اساس مقدار گره
    pq = PriorityQueue((a, b) => a.val - b.val)
    
    // اولین گره هر لیست رو اضافه کن
    برای هر list در lists:
        اگه list: pq.enqueue(list)
    
    dummy = ListNode(0)
    curr = dummy
    
    تا وقتی pq خالی نیست:
        node = pq.dequeue()  // کوچکترین رو بگیر
        curr.next = node
        curr = curr.next
        اگه node.next: pq.enqueue(node.next)  // بعدی از همون لیست
    
    return dummy.next

زمان: O(n log k)، فضا: O(k)

---

## الگوریتم دایکسترا

dijkstra(graph, start):
    dist = Map()
    pq = PriorityQueue((a, b) => a[1] - b[1])
    
    pq.enqueue([start, 0])
    
    تا وقتی pq خالی نیست:
        [node, d] = pq.dequeue()
        
        اگه dist.has(node): continue  // قبلاً پردازش شده
        dist.set(node, d)
        
        برای هر [neighbor, weight] در graph[node]:
            اگه !dist.has(neighbor):
                pq.enqueue([neighbor, d + weight])
    
    return dist

---

## اشتباهات رایج

### ۱. جهت comparator اشتباه
❌ اشتباه: (a, b) => b - a (max به جای min می‌ده)
✅ درست: (a, b) => a - b (min-heap، کوچکترین اول)

### ۲. مقایسه آبجکت‌ها بدون comparator
❌ اشتباه: نمی‌تونی آبجکت‌ها رو مستقیم مقایسه کنی
✅ درست: comparator بده

### ۳. هندل نکردن صف خالی
❌ اشتباه: اگه خالی باشه کرش می‌کنه
✅ درست: اول isEmpty رو چک کن

---

## کاربردها

| کاربرد | اولویت |
|--------|--------|
| دایکسترا | کوتاه‌ترین فاصله |
| زمان‌بند وظایف | اولویت وظیفه |
| کدگذاری هافمن | کمترین فرکانس |
| شبیه‌سازی رویداد | زودترین زمان |
| ادغام K لیست | کوچکترین مقدار |

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- نیاز به استخراج min/max کارآمد داری
- الگوریتم دایکسترا یا A* پیاده می‌کنی
- K لیست مرتب رو ادغام می‌کنی
- زمان‌بندی وظایف با اولویت داری

**استفاده نکن وقتی:**
- فقط FIFO ساده می‌خوای (صف معمولی بهتره)
- نیاز به جستجوی عنصر خاص داری (هیپ برای این نیست)
- داده‌ها کمه (مرتب‌سازی ساده‌تره)

---

## مثال کد با کامنت فارسی

\`\`\`javascript
// ادغام K لیست مرتب با صف اولویت
function mergeKLists(lists) {
    // Min-heap بر اساس مقدار گره
    const pq = new PriorityQueue((a, b) => a.val - b.val);
    
    // اولین گره هر لیست رو به صف اضافه کن
    for (let list of lists) {
        if (list) pq.enqueue(list);
    }
    
    // گره ساختگی برای شروع نتیجه
    const dummy = new ListNode(0);
    let curr = dummy;
    
    // تا وقتی صف خالی نشده
    while (!pq.isEmpty()) {
        // کوچکترین گره رو بردار
        const node = pq.dequeue();
        // به نتیجه اضافه کن
        curr.next = node;
        curr = curr.next;
        // اگه گره بعدی داره، به صف اضافه کن
        if (node.next) pq.enqueue(node.next);
    }
    
    return dummy.next;
}
\`\`\`

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| Enqueue | O(log n) |
| Dequeue | O(log n) |
| Peek | O(1) |
| کاربرد کلیدی | دایکسترا، ادغام K لیست |

> **یک خطی:** صف اولویت = صف مبتنی بر هیپ که بالاترین اولویت اول خارج می‌شه. ضروری برای دایکسترا و ادغام K لیست مرتب!
`,

  visualizationId: 'priority-queue',
  exerciseId: 'priority-queue',
};

export default priorityQueueLesson;
