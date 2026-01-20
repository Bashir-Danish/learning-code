export const linkedListReversalLesson = {
  id: 'linked-list-reversal',
  title: 'Linked List Reversal',
  titleFa: 'معکوس کردن لیست',
  difficulty: 'medium',
  estimatedTime: '40 min',
  
  content: `
# Linked List Reversal - Flip the Chain

## What is List Reversal?

Imagine a line of people holding hands, all facing right. Now everyone turns around to face left, but keeps holding the same hands. The person who was last is now first!

**Before:** 1 → 2 → 3 → 4 → null
**After:** 4 → 3 → 2 → 1 → null

---

## Why Should You Care?

- One of the most common linked list interview questions
- Foundation for many other problems (palindrome check, reverse in groups)
- Tests pointer manipulation skills
- Appears in 25%+ of linked list problems

---

## Method 1: Iterative (Recommended)

\`\`\`javascript
function reverseList(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;  // 1. Save next
        curr.next = prev;        // 2. Reverse link
        prev = curr;             // 3. Move prev forward
        curr = next;             // 4. Move curr forward
    }
    
    return prev;  // prev is new head
}
\`\`\`

**Step by step:**
\`\`\`
Initial: prev=null, curr=1→2→3→null

Step 1: next=2, 1→null, prev=1, curr=2
        null←1  2→3→null

Step 2: next=3, 2→1, prev=2, curr=3
        null←1←2  3→null

Step 3: next=null, 3→2, prev=3, curr=null
        null←1←2←3

Return prev (3): 3→2→1→null
\`\`\`

---

## Method 2: Recursive

\`\`\`javascript
function reverseListRecursive(head) {
    // Base case: empty or single node
    if (!head || !head.next) {
        return head;
    }
    
    // Reverse the rest of the list
    const newHead = reverseListRecursive(head.next);
    
    // Put current node at the end
    head.next.next = head;  // Make next node point back to us
    head.next = null;       // Remove our forward pointer
    
    return newHead;  // New head stays the same
}
\`\`\`

**Visualization:**
\`\`\`
reverse(1→2→3)
  reverse(2→3)
    reverse(3) → returns 3
  2.next.next = 2 → 3→2
  2.next = null → 3→2→null
  return 3
1.next.next = 1 → 3→2→1
1.next = null → 3→2→1→null
return 3
\`\`\`

---

## Reverse Between Positions (m to n)

Reverse only a portion of the list.

\`\`\`javascript
function reverseBetween(head, left, right) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    // Move prev to node before left position
    for (let i = 1; i < left; i++) {
        prev = prev.next;
    }
    
    // Reverse from left to right
    let curr = prev.next;
    for (let i = 0; i < right - left; i++) {
        const next = curr.next;
        curr.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    
    return dummy.next;
}

// reverseBetween(1→2→3→4→5, 2, 4)
// Result: 1→4→3→2→5
\`\`\`

---

## Reverse in K-Groups

Reverse every k nodes.

\`\`\`javascript
function reverseKGroup(head, k) {
    // Count if we have k nodes
    let count = 0;
    let curr = head;
    while (curr && count < k) {
        curr = curr.next;
        count++;
    }
    
    // If we have k nodes, reverse them
    if (count === k) {
        // Recursively reverse rest first
        curr = reverseKGroup(curr, k);
        
        // Reverse current k nodes
        while (count-- > 0) {
            const next = head.next;
            head.next = curr;
            curr = head;
            head = next;
        }
        head = curr;
    }
    
    return head;
}

// reverseKGroup(1→2→3→4→5, 2)
// Result: 2→1→4→3→5
\`\`\`

---

## Iterative vs Recursive

| Feature | Iterative | Recursive |
|---------|-----------|-----------|
| Time | O(n) | O(n) |
| Space | O(1) | O(n) call stack |
| Readability | More explicit | More elegant |
| Interview | Usually preferred | Good to know |

---

## Common Mistakes

### 1. Losing the Next Pointer
\`\`\`javascript
// ❌ WRONG - lost next before saving
curr.next = prev;
curr = curr.next;  // Now points to prev!

// ✅ CORRECT - save next first
const next = curr.next;
curr.next = prev;
curr = next;
\`\`\`

### 2. Wrong Return Value
\`\`\`javascript
// ❌ WRONG - returning original head
return head;  // head is now the tail!

// ✅ CORRECT - return prev (new head)
return prev;
\`\`\`

### 3. Forgetting Base Case in Recursion
\`\`\`javascript
// ❌ WRONG - infinite recursion
function reverse(head) {
    const newHead = reverse(head.next);  // Crashes on null
}

// ✅ CORRECT - handle base case
function reverse(head) {
    if (!head || !head.next) return head;
    const newHead = reverse(head.next);
}
\`\`\`

---

## When to Use Each Method

**Use Iterative when:**
- Space efficiency matters
- Simple full reversal
- Interview (usually preferred)

**Use Recursive when:**
- Code elegance matters
- Reversing in groups
- Already using recursion elsewhere

---

## Interview Tips

- Draw the pointers step by step
- Use dummy node for "reverse between" problems
- Iterative is usually preferred (O(1) space)
- "I'll save next, reverse link, then move pointers"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n) |
| Space | O(1) iterative, O(n) recursive |
| Key Steps | Save next, reverse link, move forward |
| Best For | Full reversal, partial reversal, k-groups |

> **One-liner:** Save next, point current to prev, move both forward. Iterative is O(1) space, recursive is O(n). Always save next before reversing!
`,

  contentFa: `
# معکوس کردن لیست پیوندی - برعکس کردن زنجیره

## معکوس کردن لیست چیست؟

تصور کن یه صف آدم که دست همدیگه رو گرفتن، همه رو به راست. حالا همه برمی‌گردن رو به چپ، ولی همون دست‌ها رو نگه می‌دارن. کسی که آخر بود الان اوله!

**قبل:** 1 → 2 → 3 → 4 → null
**بعد:** 4 → 3 → 2 → 1 → null

---

## چرا باید اهمیت بدی؟

- یکی از رایج‌ترین سوالات مصاحبه لیست پیوندی
- پایه خیلی از مسائل دیگه (بررسی پالیندروم، معکوس در گروه‌ها)
- مهارت کار با اشاره‌گرها رو تست می‌کنه
- در 25%+ مسائل لیست پیوندی ظاهر می‌شه

---

## روش ۱: تکراری (توصیه می‌شه)

\`\`\`javascript
function reverseList(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;  // ۱. بعدی رو ذخیره کن
        curr.next = prev;        // ۲. لینک رو برعکس کن
        prev = curr;             // ۳. prev رو جلو ببر
        curr = next;             // ۴. curr رو جلو ببر
    }
    
    return prev;  // prev سر جدیده
}
\`\`\`

**قدم به قدم:**
\`\`\`
اولیه: prev=null, curr=1→2→3→null

قدم ۱: next=2, 1→null, prev=1, curr=2
قدم ۲: next=3, 2→1, prev=2, curr=3
قدم ۳: next=null, 3→2, prev=3, curr=null

برگردون prev (3): 3→2→1→null
\`\`\`

---

## روش ۲: بازگشتی

\`\`\`javascript
function reverseListRecursive(head) {
    if (!head || !head.next) return head;
    
    const newHead = reverseListRecursive(head.next);
    
    head.next.next = head;
    head.next = null;
    
    return newHead;
}
\`\`\`

---

## معکوس بین موقعیت‌ها

\`\`\`javascript
function reverseBetween(head, left, right) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    for (let i = 1; i < left; i++) {
        prev = prev.next;
    }
    
    let curr = prev.next;
    for (let i = 0; i < right - left; i++) {
        const next = curr.next;
        curr.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    
    return dummy.next;
}
\`\`\`

---

## معکوس در گروه‌های K تایی

\`\`\`javascript
function reverseKGroup(head, k) {
    let count = 0, curr = head;
    while (curr && count < k) {
        curr = curr.next;
        count++;
    }
    
    if (count === k) {
        curr = reverseKGroup(curr, k);
        while (count-- > 0) {
            const next = head.next;
            head.next = curr;
            curr = head;
            head = next;
        }
        head = curr;
    }
    
    return head;
}
\`\`\`

---

## تکراری در مقابل بازگشتی

| ویژگی | تکراری | بازگشتی |
|-------|--------|---------|
| زمان | O(n) | O(n) |
| فضا | O(1) | O(n) پشته فراخوانی |
| خوانایی | صریح‌تر | زیباتر |
| مصاحبه | معمولاً ترجیح داده می‌شه | خوبه بدونی |

---

## اشتباهات رایج

### ۱. گم کردن اشاره‌گر بعدی
\`\`\`javascript
// ❌ اشتباه - بعدی رو قبل از ذخیره گم کردی
curr.next = prev;
curr = curr.next;  // الان به prev اشاره می‌کنه!

// ✅ درست - اول بعدی رو ذخیره کن
const next = curr.next;
curr.next = prev;
curr = next;
\`\`\`

### ۲. مقدار برگشتی اشتباه
\`\`\`javascript
// ❌ اشتباه - head اصلی رو برمی‌گردونی
return head;  // head الان دمه!

// ✅ درست - prev رو برگردون (سر جدید)
return prev;
\`\`\`

---

## کی از هر روش استفاده کنیم

**تکراری استفاده کن وقتی:**
- کارایی فضا مهمه
- معکوس کامل ساده
- مصاحبه (معمولاً ترجیح داده می‌شه)

**بازگشتی استفاده کن وقتی:**
- زیبایی کد مهمه
- معکوس در گروه‌ها

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n) |
| فضا | O(1) تکراری، O(n) بازگشتی |
| قدم‌های کلیدی | بعدی رو ذخیره کن، لینک رو برعکس کن، جلو برو |

> **یک خطی:** بعدی رو ذخیره کن، فعلی رو به قبلی وصل کن، هر دو رو جلو ببر. تکراری O(1) فضا، بازگشتی O(n). همیشه بعدی رو قبل از برعکس کردن ذخیره کن!
`,

  visualizationId: 'linked-list-reversal',
  exerciseId: 'linked-list-reversal',
};

export default linkedListReversalLesson;