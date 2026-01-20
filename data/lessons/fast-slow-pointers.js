export const fastSlowPointersLesson = {
  id: 'fast-slow-pointers',
  title: 'Fast & Slow Pointers',
  titleFa: 'اشاره‌گر سریع و کند',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Fast & Slow Pointers - The Tortoise and Hare

## What is Fast & Slow Pointers?

Imagine a race between a tortoise and a hare on a circular track. The hare runs twice as fast. If the track is circular, the hare will eventually catch up to the tortoise!

**Think of it like:**
- Two runners on a track - fast one laps the slow one
- Clock hands - minute hand catches hour hand
- Two cars on a circular road

This technique is also called **Floyd's Cycle Detection Algorithm**.

---

## Why Should You Care?

- Detects cycles in O(n) time, O(1) space
- Finds middle of linked list in one pass
- Solves "Happy Number" problem elegantly
- Very common in interviews (15%+ of linked list problems)

---

## The Core Idea

\`\`\`javascript
let slow = head;  // Moves 1 step
let fast = head;  // Moves 2 steps

while (fast && fast.next) {
    slow = slow.next;        // 1 step
    fast = fast.next.next;   // 2 steps
}
\`\`\`

**Key insight:** If there's a cycle, fast will eventually meet slow. If no cycle, fast reaches the end.

---

## Problem 1: Detect Cycle

\`\`\`javascript
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true;  // They met - cycle exists!
        }
    }
    
    return false;  // Fast reached end - no cycle
}
\`\`\`

**Why does this work?**
- If no cycle: fast reaches null
- If cycle: fast enters cycle, slow enters later
- Fast gains 1 step per iteration, eventually catches slow

---

## Problem 2: Find Cycle Start

\`\`\`javascript
function detectCycle(head) {
    let slow = head;
    let fast = head;
    
    // Phase 1: Find meeting point
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // Phase 2: Find cycle start
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;  // Both move 1 step now
            }
            return slow;  // Cycle start
        }
    }
    
    return null;  // No cycle
}
\`\`\`

**Math behind it:** Distance from head to cycle start = Distance from meeting point to cycle start (going around).

---

## Problem 3: Find Middle of List

\`\`\`javascript
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;  // Slow is at middle!
}

// 1 → 2 → 3 → 4 → 5 → null
// When fast reaches end, slow is at 3

// 1 → 2 → 3 → 4 → null
// Returns 3 (second middle for even length)
\`\`\`

**Why?** Fast moves 2x speed, so when fast finishes, slow is halfway.

---

## Problem 4: Happy Number

A number is "happy" if repeatedly summing squares of digits eventually reaches 1.

\`\`\`javascript
function isHappy(n) {
    const getNext = (num) => {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    };
    
    let slow = n;
    let fast = getNext(n);
    
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);           // 1 step
        fast = getNext(getNext(fast));  // 2 steps
    }
    
    return fast === 1;
}

// 19 → 82 → 68 → 100 → 1 ✓ Happy!
// 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 (cycle) ✗
\`\`\`

---

## Problem 5: Palindrome Linked List

\`\`\`javascript
function isPalindrome(head) {
    // Find middle
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null;
    while (slow) {
        const next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }
    
    // Compare halves
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    
    return true;
}
\`\`\`

---

## Common Mistakes

### 1. Wrong Loop Condition
\`\`\`javascript
// ❌ WRONG - crashes on fast.next.next
while (fast.next) {
    fast = fast.next.next;  // Error if fast.next is last node
}

// ✅ CORRECT - check both
while (fast && fast.next) {
    fast = fast.next.next;
}
\`\`\`

### 2. Not Resetting Slow in Cycle Start
\`\`\`javascript
// ❌ WRONG - forgot to reset slow
if (slow === fast) {
    while (slow !== fast) { ... }  // Already equal!
}

// ✅ CORRECT - reset slow to head
if (slow === fast) {
    slow = head;  // Reset!
    while (slow !== fast) { ... }
}
\`\`\`

### 3. Comparing Values Instead of References
\`\`\`javascript
// ❌ WRONG - comparing values
if (slow.val === fast.val)

// ✅ CORRECT - comparing node references
if (slow === fast)
\`\`\`

---

## When to Use Fast & Slow

**Use when:**
- Detecting cycles (linked list, number sequences)
- Finding middle element
- Finding kth element from end
- Checking palindrome

**Pattern recognition:**
- "Is there a cycle?" → Fast & Slow
- "Find middle" → Fast & Slow
- "Detect loop" → Fast & Slow

---

## Interview Tips

- Always check \`fast && fast.next\` before moving
- For cycle start: reset slow to head after meeting
- "I'll use Floyd's algorithm - O(n) time, O(1) space"
- Draw the pointers moving step by step

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n) |
| Space | O(1) |
| Best For | Cycle detection, find middle |
| Key Insight | Fast catches slow in cycle |

> **One-liner:** Fast pointer moves 2x, slow moves 1x. If cycle exists, they meet. If not, fast reaches end. O(1) space cycle detection!
`,

  contentFa: `
# اشاره‌گر سریع و کند - لاک‌پشت و خرگوش ⚡

## اشاره‌گر سریع و کند چیست؟ (توضیح ساده)

تصور کن یه مسابقه بین لاک‌پشت و خرگوش روی یه پیست دایره‌ای. خرگوش دو برابر سریع‌تر می‌دوه. اگه پیست دایره‌ای باشه، خرگوش بالاخره به لاک‌پشت می‌رسه!

**اینطوری فکر کن:**
- مثل دو دونده روی پیست - سریع‌تره از کندتره جلو می‌زنه
- مثل عقربه‌های ساعت - دقیقه‌شمار به ساعت‌شمار می‌رسه
- مثل دو ماشین روی جاده دایره‌ای

این تکنیک **الگوریتم تشخیص چرخه فلوید** هم نامیده می‌شه.

---

## چرا باید اهمیت بدی؟

- چرخه‌ها رو در O(n) زمان، O(1) فضا تشخیص می‌ده ⚡
- وسط لیست پیوندی رو در یه پاس پیدا می‌کنه
- مسئله "عدد خوشحال" رو زیبا حل می‌کنه
- خیلی رایج در مصاحبه‌ها (15%+ مسائل لیست پیوندی)

---

## ایده اصلی

\`\`\`javascript
let slow = head;  // یه قدم حرکت می‌کنه
let fast = head;  // دو قدم حرکت می‌کنه

while (fast && fast.next) {
    slow = slow.next;        // ۱ قدم
    fast = fast.next.next;   // ۲ قدم
}
\`\`\`

**نکته کلیدی:** اگه چرخه باشه، سریع بالاخره به کند می‌رسه. اگه چرخه نباشه، سریع به انتها می‌رسه.

---

## مسئله ۱: تشخیص چرخه

\`\`\`javascript
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;        // یه قدم
        fast = fast.next.next;   // دو قدم
        
        if (slow === fast) {
            return true;  // به هم رسیدن - چرخه هست! ✅
        }
    }
    
    return false;  // سریع به انتها رسید - چرخه نیست ❌
}
\`\`\`

**چرا کار می‌کنه؟**
- اگه چرخه نباشه: سریع به null می‌رسه
- اگه چرخه باشه: سریع وارد چرخه می‌شه، کند بعداً وارد می‌شه
- سریع هر دور ۱ قدم جلو می‌زنه، بالاخره به کند می‌رسه

---

## مسئله ۲: پیدا کردن شروع چرخه

\`\`\`javascript
function detectCycle(head) {
    let slow = head;
    let fast = head;
    
    // فاز ۱: پیدا کردن نقطه ملاقات
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // فاز ۲: پیدا کردن شروع چرخه
            slow = head;  // کند رو به اول برگردون
            while (slow !== fast) {
                slow = slow.next;  // هر دو یه قدم
                fast = fast.next;
            }
            return slow;  // شروع چرخه ✅
        }
    }
    
    return null;  // چرخه نیست
}
\`\`\`

**ریاضی پشتش:** فاصله از head تا شروع چرخه = فاصله از نقطه ملاقات تا شروع چرخه (دور زدن)

---

## مسئله ۳: پیدا کردن وسط لیست

\`\`\`javascript
function findMiddle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;        // یه قدم
        fast = fast.next.next;   // دو قدم
    }
    
    return slow;  // کند وسطه! ✅
}

// 1 → 2 → 3 → 4 → 5 → null
// وقتی سریع به آخر می‌رسه، کند روی 3 هست
\`\`\`

**چرا؟** سریع 2 برابر سرعت داره، پس وقتی سریع تموم می‌کنه، کند نصف راهه.

---

## مسئله ۴: عدد خوشحال

یه عدد "خوشحال" هست اگه با جمع مربع ارقامش بالاخره به 1 برسه.

\`\`\`javascript
function isHappy(n) {
    // تابع کمکی: مجموع مربع ارقام
    const getNext = (num) => {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    };
    
    let slow = n;
    let fast = getNext(n);
    
    // اگه به 1 برسه یا چرخه بشه
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);           // یه قدم
        fast = getNext(getNext(fast));  // دو قدم
    }
    
    return fast === 1;  // اگه 1 شد، خوشحاله ✅
}

// 19 → 82 → 68 → 100 → 1 ✅ خوشحال!
// 2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 (چرخه) ❌
\`\`\`

---

## مسئله ۵: پالیندروم لیست پیوندی

\`\`\`javascript
function isPalindrome(head) {
    // وسط رو پیدا کن
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // نیمه دوم رو معکوس کن
    let prev = null;
    while (slow) {
        const next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }
    
    // دو نیمه رو مقایسه کن
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    
    return true;  // پالیندرومه ✅
}
\`\`\`

---

## جدول مرجع سریع

| مسئله | کاربرد | زمان | فضا |
|-------|--------|------|-----|
| تشخیص چرخه | لیست پیوندی | O(n) | O(1) ⚡ |
| شروع چرخه | پیدا کردن ورودی | O(n) | O(1) |
| وسط لیست | تقسیم لیست | O(n) | O(1) |
| عدد خوشحال | تشخیص چرخه عددی | O(log n) | O(1) |

---

## اشتباهات رایج

### ۱. شرط حلقه اشتباه
❌ اشتباه: \`while (fast.next)\` - کرش می‌کنه
✅ درست: \`while (fast && fast.next)\` - هر دو رو چک کن

### ۲. ریست نکردن کند در شروع چرخه
❌ اشتباه: یادت رفت کند رو ریست کنی
✅ درست: \`slow = head\` بعد از ملاقات

### ۳. مقایسه مقدار به جای رفرنس
❌ اشتباه: \`if (slow.val === fast.val)\`
✅ درست: \`if (slow === fast)\` - رفرنس مقایسه کن

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- تشخیص چرخه (لیست پیوندی، دنباله اعداد) ✅
- پیدا کردن عنصر وسط
- پیدا کردن عنصر kام از آخر
- بررسی پالیندروم

**استفاده نکن وقتی:**
- آرایه داری (اندیس مستقیم داری) ❌
- نیاز به دسترسی تصادفی داری
- لیست خیلی کوتاهه

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n) ⚡ |
| فضا | O(1) ⚡ |
| بهترین برای | تشخیص چرخه، پیدا کردن وسط |
| نکته کلیدی | سریع به کند می‌رسه در چرخه |

> **یک خطی:** اشاره‌گر سریع 2 برابر، کند 1 برابر حرکت می‌کنه. اگه چرخه باشه، به هم می‌رسن. اگه نباشه، سریع به انتها می‌رسه. تشخیص چرخه با O(1) فضا! ⚡
`,

  visualizationId: 'fast-slow-pointers',
  exerciseId: 'fast-slow-pointers',
};

export default fastSlowPointersLesson;
