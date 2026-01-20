export const dequeLesson = {
  id: 'deque',
  title: 'Deque (Double-ended Queue)',
  titleFa: 'صف دوطرفه',
  difficulty: 'medium',
  estimatedTime: '35 min',
  
  content: `
# Deque - The Best of Both Worlds

## What is a Deque?

Imagine a line where people can join or leave from BOTH ends - front AND back. That's a deque (pronounced "deck")!

**Think of it like:**
- A deck of cards - draw from top or bottom
- A train - add/remove cars from either end
- A browser history - go forward or backward

**Deque = Double-Ended Queue** - combines stack and queue powers!

---

## Why Should You Care?

- O(1) operations at both ends
- Essential for sliding window maximum problem
- Used in BFS optimizations (0-1 BFS)
- Combines stack (LIFO) and queue (FIFO) capabilities

---

## Deque Operations

| Operation | What it does | Time |
|-----------|--------------|------|
| pushFront(x) | Add to front | O(1) |
| pushBack(x) | Add to back | O(1) |
| popFront() | Remove from front | O(1) |
| popBack() | Remove from back | O(1) |

\`\`\`javascript
// JavaScript array as deque
const deque = [];
deque.push(1);      // Add to back: [1]
deque.unshift(0);   // Add to front: [0, 1]
deque.pop();        // Remove from back: [0]
deque.shift();      // Remove from front: []
\`\`\`

---

## Efficient Deque Implementation

\`\`\`javascript
class Deque {
    constructor() {
        this.items = {};
        this.front = 0;
        this.back = 0;
    }
    
    pushBack(val) { this.items[this.back++] = val; }
    pushFront(val) { this.items[--this.front] = val; }
    
    popBack() {
        if (this.isEmpty()) return undefined;
        return this.items[--this.back];
    }
    
    popFront() {
        if (this.isEmpty()) return undefined;
        return this.items[this.front++];
    }
    
    isEmpty() { return this.back === this.front; }
}
\`\`\`

---

## Classic Problem: Sliding Window Maximum

\`\`\`javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];  // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
// [1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]
\`\`\`

---

## Deque vs Stack vs Queue

| Feature | Stack | Queue | Deque |
|---------|-------|-------|-------|
| Add | Top only | Back only | Both ends |
| Remove | Top only | Front only | Both ends |
| Order | LIFO | FIFO | Both! |

---

## Common Mistakes

### 1. Using Array shift/unshift (O(n))
Use proper deque implementation for O(1) operations.

### 2. Storing Values Instead of Indices
Store indices to check window bounds.

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Operations | O(1) at both ends |
| Space | O(n) |
| Best For | Sliding window max/min |

> **One-liner:** Deque = double-ended queue with O(1) at both ends. Essential for sliding window maximum.
`,

  contentFa: `
# صف دوطرفه - بهترین هر دو دنیا

## صف دوطرفه چیست؟

تصور کن یه صف که آدم‌ها می‌تونن از هر دو طرف - جلو و عقب - وارد یا خارج بشن. این صف دوطرفه‌ست (تلفظ: "دِک")!

**مثل:**
- یه دسته کارت - از بالا یا پایین بردار
- یه قطار - واگن از هر دو طرف اضافه/حذف کن
- تاریخچه مرورگر - جلو یا عقب برو

**Deque = Double-Ended Queue** - قدرت پشته و صف رو ترکیب می‌کنه!

---

## چرا باید اهمیت بدی؟

- عملیات O(1) در هر دو طرف
- ضروری برای مسئله حداکثر پنجره لغزان
- استفاده در بهینه‌سازی BFS (مثل 0-1 BFS)
- قابلیت‌های پشته (LIFO) و صف (FIFO) رو ترکیب می‌کنه

---

## عملیات صف دوطرفه

| عملیات | چیکار می‌کنه | زمان |
|--------|-------------|------|
| pushFront(x) | اضافه به جلو | O(1) |
| pushBack(x) | اضافه به عقب | O(1) |
| popFront() | حذف از جلو | O(1) |
| popBack() | حذف از عقب | O(1) |

\`\`\`javascript
// آرایه جاوااسکریپت به عنوان صف دوطرفه
const deque = [];
deque.push(1);      // اضافه به عقب: [1]
deque.unshift(0);   // اضافه به جلو: [0, 1]
deque.pop();        // حذف از عقب: [0]
deque.shift();      // حذف از جلو: []
\`\`\`

**هشدار:** \`shift()\` و \`unshift()\` در آرایه O(n) هستن! برای عملکرد بهتر از پیاده‌سازی کارآمد استفاده کن.

---

## پیاده‌سازی کارآمد صف دوطرفه

\`\`\`javascript
class Deque {
    constructor() {
        this.items = {};
        this.front = 0;  // اندیس جلو
        this.back = 0;   // اندیس عقب
    }
    
    pushBack(val) { 
        this.items[this.back++] = val; 
    }
    
    pushFront(val) { 
        this.items[--this.front] = val; 
    }
    
    popBack() {
        if (this.isEmpty()) return undefined;
        const val = this.items[--this.back];
        delete this.items[this.back];
        return val;
    }
    
    popFront() {
        if (this.isEmpty()) return undefined;
        const val = this.items[this.front];
        delete this.items[this.front++];
        return val;
    }
    
    peekFront() { return this.items[this.front]; }
    peekBack() { return this.items[this.back - 1]; }
    isEmpty() { return this.back === this.front; }
    size() { return this.back - this.front; }
}
\`\`\`

**چرا این کارآمده؟** از آبجکت با اندیس‌های منفی/مثبت استفاده می‌کنه - همه عملیات O(1)!

---

## مسئله کلاسیک: حداکثر پنجره لغزان

**مسئله:** در هر پنجره به اندازه k، حداکثر رو پیدا کن.

**مثال:** nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
- پنجره [1, 3, -1] → حداکثر = 3
- پنجره [3, -1, -3] → حداکثر = 3
- پنجره [-1, -3, 5] → حداکثر = 5
- و غیره...
- خروجی: [3, 3, 5, 5, 6, 7]

\`\`\`javascript
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];  // اندیس‌ها رو ذخیره کن، نه مقادیر!
    
    for (let i = 0; i < nums.length; i++) {
        // ۱. اندیس‌های خارج از پنجره رو حذف کن
        while (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // ۲. عناصر کوچکتر رو از عقب حذف کن
        // چون هیچوقت حداکثر نمی‌شن
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        // ۳. اندیس فعلی رو اضافه کن
        deque.push(i);
        
        // ۴. حداکثر پنجره رو ثبت کن (جلوی صف)
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    return result;
}
\`\`\`

**چرا کار می‌کنه؟**
- صف دوطرفه همیشه نزولی نگه داشته می‌شه
- جلوی صف = حداکثر پنجره فعلی
- زمان: O(n) چون هر عنصر حداکثر یک بار وارد و خارج می‌شه

---

## صف دوطرفه در مقابل پشته و صف

| ویژگی | پشته | صف | صف دوطرفه |
|-------|------|-----|-----------|
| اضافه | فقط بالا | فقط عقب | هر دو طرف |
| حذف | فقط بالا | فقط جلو | هر دو طرف |
| ترتیب | LIFO | FIFO | هر دو! |
| کاربرد | Undo، پرانتز | BFS، صف چاپ | پنجره لغزان |

---

## اشتباهات رایج

### ۱. استفاده از shift/unshift آرایه
\`\`\`javascript
// بد - O(n) برای هر عملیات!
arr.shift();
arr.unshift(x);

// خوب - از پیاده‌سازی کارآمد استفاده کن
deque.popFront();
deque.pushFront(x);
\`\`\`

### ۲. ذخیره مقادیر به جای اندیس‌ها
\`\`\`javascript
// بد - نمی‌تونی چک کنی عنصر داخل پنجره‌ست یا نه
deque.push(nums[i]);

// خوب - اندیس ذخیره کن
deque.push(i);
// حالا می‌تونی چک کنی: deque[0] < i - k + 1
\`\`\`

---

## کاربردهای دیگه

- **0-1 BFS:** وقتی یال‌ها وزن ۰ یا ۱ دارن
- **حداقل پنجره لغزان:** مشابه حداکثر، ولی صعودی نگه دار
- **پیاده‌سازی صف با دو پشته:** هر پشته یک طرف

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| عملیات | O(1) در هر دو طرف |
| فضا | O(n) |
| بهترین برای | حداکثر/حداقل پنجره لغزان |

> **یک خطی:** صف دوطرفه = صف با عملیات O(1) در هر دو طرف. برای پنجره لغزان، اندیس‌ها رو ذخیره کن و نزولی نگه دار!
`,

  visualizationId: 'deque',
  exerciseId: 'deque',
};

export default dequeLesson;
