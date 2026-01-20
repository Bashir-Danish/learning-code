export const queueBasicsLesson = {
  id: 'queue-basics',
  title: 'Queue Basics',
  titleFa: 'مبانی صف',
  difficulty: 'easy',
  estimatedTime: '40 min',
  
  content: `
# Queue - The FIFO Champion

## What is a Queue?

Imagine waiting in line at a coffee shop. First person in line gets served first. That's a queue! First In, First Out (FIFO).

**Real-life examples:**
- Waiting in line at a store
- Print jobs waiting to be printed
- Messages waiting to be processed
- BFS traversal in graphs

---

## Why Should You Care?

- Foundation for BFS (Breadth-First Search)
- Essential for task scheduling and buffering
- Key pattern in system design interviews
- Understanding FIFO vs LIFO is fundamental

---

## Queue Operations

| Operation | What it does | Time |
|-----------|--------------|------|
| enqueue(x) | Add to back | O(1)* |
| dequeue() | Remove from front | O(1)* |
| front()/peek() | Look at front | O(1) |
| isEmpty() | Check if empty | O(1) |

*O(1) amortized with proper implementation

\`\`\`javascript
// Using array as queue (simple but not optimal)
const queue = [];

queue.push(1);     // [1] - enqueue
queue.push(2);     // [1, 2]
queue.push(3);     // [1, 2, 3]

queue[0];          // 1 (peek front)
queue.shift();     // 1, queue is now [2, 3] - dequeue
queue.shift();     // 2, queue is now [3]
\`\`\`

**Note:** Array.shift() is O(n) because it reindexes. For performance-critical code, use a proper queue implementation.

---

## Implement Queue with Two Stacks

Classic interview question! Use two stacks to achieve O(1) amortized operations.

\`\`\`javascript
class MyQueue {
    constructor() {
        this.input = [];   // For enqueue
        this.output = [];  // For dequeue
    }
    
    push(x) {
        this.input.push(x);
    }
    
    pop() {
        this.peek();  // Ensure output has elements
        return this.output.pop();
    }
    
    peek() {
        if (this.output.length === 0) {
            // Transfer all from input to output (reverses order)
            while (this.input.length) {
                this.output.push(this.input.pop());
            }
        }
        return this.output[this.output.length - 1];
    }
    
    empty() {
        return this.input.length === 0 && this.output.length === 0;
    }
}

// How it works:
// push(1), push(2), push(3) → input: [1,2,3], output: []
// pop() → transfer → input: [], output: [3,2,1] → pop → returns 1
// pop() → output: [3,2] → pop → returns 2
\`\`\`

**Why does this work?**
- Input stack: newest on top
- Transfer to output: reverses order, oldest on top
- Now popping from output gives FIFO order!

---

## Circular Queue (Ring Buffer)

Fixed-size queue that wraps around. Used in buffers and scheduling.

\`\`\`javascript
class CircularQueue {
    constructor(k) {
        this.data = new Array(k);
        this.head = 0;
        this.tail = -1;
        this.size = 0;
        this.capacity = k;
    }
    
    enQueue(value) {
        if (this.isFull()) return false;
        this.tail = (this.tail + 1) % this.capacity;  // Wrap around
        this.data[this.tail] = value;
        this.size++;
        return true;
    }
    
    deQueue() {
        if (this.isEmpty()) return false;
        this.head = (this.head + 1) % this.capacity;  // Wrap around
        this.size--;
        return true;
    }
    
    Front() {
        return this.isEmpty() ? -1 : this.data[this.head];
    }
    
    Rear() {
        return this.isEmpty() ? -1 : this.data[this.tail];
    }
    
    isEmpty() { return this.size === 0; }
    isFull() { return this.size === this.capacity; }
}
\`\`\`

---

## BFS with Queue

Queue is essential for level-order traversal!

\`\`\`javascript
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}
\`\`\`

---

## Common Mistakes

### 1. Using shift() in Performance-Critical Code
\`\`\`javascript
// ❌ WRONG - O(n) per operation
while (queue.length) {
    queue.shift();  // Slow!
}

// ✅ CORRECT - use index or proper queue
let front = 0;
while (front < queue.length) {
    const val = queue[front++];  // O(1)
}
\`\`\`

### 2. Forgetting to Check Empty
\`\`\`javascript
// ❌ WRONG - undefined on empty
return queue.shift();

// ✅ CORRECT - check first
if (queue.length === 0) return null;
return queue.shift();
\`\`\`

---

## Stack vs Queue

| Feature | Stack | Queue |
|---------|-------|-------|
| Order | LIFO | FIFO |
| Add | push (top) | enqueue (back) |
| Remove | pop (top) | dequeue (front) |
| Use case | DFS, undo | BFS, scheduling |
| Analogy | Stack of plates | Line at store |

---

## When to Use Queue

**Use queue when:**
- Need FIFO order
- BFS traversal
- Level-order processing
- Task scheduling
- Buffering (producer-consumer)
- Rate limiting

**Pattern recognition:**
- "Process in order received" → Queue
- "Level by level" → Queue
- "Shortest path (unweighted)" → BFS with Queue

---

## Interview Tips

- "Queue with two stacks" is a classic - know it cold
- BFS always uses a queue
- For shortest path in unweighted graph, think BFS + Queue
- Circular queue for fixed-size buffers

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Order | FIFO (First In First Out) |
| Operations | enqueue, dequeue, peek - O(1)* |
| Space | O(n) |
| Best For | BFS, scheduling, buffering |

> **One-liner:** Queue = FIFO. Add to back, remove from front. Essential for BFS and processing things in order.
`,

  contentFa: `
# صف - قهرمان FIFO

## صف چیست؟

تصور کن توی صف کافی‌شاپ منتظری. اولین نفر توی صف اول سرویس می‌گیره. این صفه! اولین ورودی، اولین خروجی (FIFO).

**مثال‌های زندگی واقعی:**
- منتظر موندن توی صف فروشگاه
- کارهای چاپ منتظر چاپ شدن
- پیام‌ها منتظر پردازش
- پیمایش BFS در گراف‌ها

---

## چرا باید اهمیت بدی؟

- پایه BFS (جستجوی اول سطح)
- ضروری برای زمان‌بندی وظایف و بافرینگ
- الگوی کلیدی در مصاحبه‌های طراحی سیستم

---

## عملیات صف

| عملیات | چیکار می‌کنه | زمان |
|--------|-------------|------|
| enqueue(x) | اضافه به انتها | O(1) |
| dequeue() | حذف از ابتدا | O(1) |
| front() | نگاه به ابتدا | O(1) |
| isEmpty() | بررسی خالی بودن | O(1) |

\`\`\`javascript
const queue = [];

queue.push(1);     // [1] - enqueue
queue.push(2);     // [1, 2]
queue.push(3);     // [1, 2, 3]

queue[0];          // 1 (peek)
queue.shift();     // 1، صف الان [2, 3] - dequeue
\`\`\`

---

## پیاده‌سازی صف با دو پشته

سوال کلاسیک مصاحبه!

\`\`\`javascript
class MyQueue {
    constructor() {
        this.input = [];
        this.output = [];
    }
    
    push(x) {
        this.input.push(x);
    }
    
    pop() {
        this.peek();
        return this.output.pop();
    }
    
    peek() {
        if (this.output.length === 0) {
            while (this.input.length) {
                this.output.push(this.input.pop());
            }
        }
        return this.output[this.output.length - 1];
    }
    
    empty() {
        return this.input.length === 0 && this.output.length === 0;
    }
}
\`\`\`

---

## صف دایره‌ای

صف با اندازه ثابت که دور می‌زنه.

\`\`\`javascript
class CircularQueue {
    constructor(k) {
        this.data = new Array(k);
        this.head = 0;
        this.tail = -1;
        this.size = 0;
        this.capacity = k;
    }
    
    enQueue(value) {
        if (this.isFull()) return false;
        this.tail = (this.tail + 1) % this.capacity;
        this.data[this.tail] = value;
        this.size++;
        return true;
    }
    
    deQueue() {
        if (this.isEmpty()) return false;
        this.head = (this.head + 1) % this.capacity;
        this.size--;
        return true;
    }
}
\`\`\`

---

## اشتباهات رایج

### ۱. استفاده از shift() در کد حساس به عملکرد
\`\`\`javascript
// ❌ اشتباه - O(n) در هر عملیات
queue.shift();  // کند!

// ✅ درست - از اندیس استفاده کن
let front = 0;
const val = queue[front++];  // O(1)
\`\`\`

---

## پشته در مقابل صف

| ویژگی | پشته | صف |
|-------|------|-----|
| ترتیب | LIFO | FIFO |
| اضافه | push (بالا) | enqueue (انتها) |
| حذف | pop (بالا) | dequeue (ابتدا) |
| کاربرد | DFS، undo | BFS، زمان‌بندی |

---

## کی از صف استفاده کنیم

**استفاده کن وقتی:**
- ترتیب FIFO لازمه
- پیمایش BFS
- پردازش سطح به سطح
- زمان‌بندی وظایف
- بافرینگ

**تشخیص الگو:**
- "پردازش به ترتیب دریافت" → صف
- "سطح به سطح" → صف
- "کوتاه‌ترین مسیر (بدون وزن)" → BFS با صف

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ترتیب | FIFO (اولین ورودی اولین خروجی) |
| عملیات | enqueue, dequeue, peek - O(1) |
| فضا | O(n) |
| بهترین برای | BFS، زمان‌بندی، بافرینگ |

> **یک خطی:** صف = FIFO. به انتها اضافه کن، از ابتدا حذف کن. ضروری برای BFS و پردازش چیزها به ترتیب.
`,

  visualizationId: 'queue',
  exerciseId: 'queue-basics',
};

export default queueBasicsLesson;