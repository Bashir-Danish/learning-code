export const singlyLinkedListLesson = {
  id: 'singly-linked-list',
  title: 'Singly Linked List',
  titleFa: 'لیست پیوندی یک‌طرفه',
  difficulty: 'easy',
  estimatedTime: '50 min',
  
  content: `
# Singly Linked List - The Chain of Nodes

## What is a Linked List?

Imagine a treasure hunt where each clue tells you where to find the next clue. That's a linked list! Each element (node) contains data AND a pointer to the next element.

**Think of it like:**
- A train - each car connected to the next
- A chain - each link holds the next
- A scavenger hunt - each clue points to the next location

---

## Why Should You Care?

- Foundation for many data structures (stacks, queues, graphs)
- O(1) insertion/deletion at head (vs O(n) for arrays)
- Dynamic size - no need to pre-allocate
- Essential for 20%+ of coding interviews

---

## Node Structure

\`\`\`javascript
class ListNode {
    constructor(val) {
        this.val = val;    // The data
        this.next = null;  // Pointer to next node
    }
}

// Creating nodes
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);

// Linking them: 1 → 2 → 3 → null
node1.next = node2;
node2.next = node3;
\`\`\`

---

## Basic Operations

### Create List from Array
\`\`\`javascript
function createList(arr) {
    const dummy = new ListNode(0);  // Dummy head simplifies code
    let curr = dummy;
    
    for (let val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    
    return dummy.next;  // Return actual head
}

// createList([1,2,3]) → 1 → 2 → 3 → null
\`\`\`

### Traverse (Print All)
\`\`\`javascript
function traverse(head) {
    let curr = head;
    while (curr) {
        console.log(curr.val);
        curr = curr.next;
    }
}
\`\`\`

### Insert at Head - O(1)
\`\`\`javascript
function insertAtHead(head, val) {
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;  // New node is now head
}
\`\`\`

### Insert at Tail - O(n)
\`\`\`javascript
function insertAtTail(head, val) {
    const newNode = new ListNode(val);
    if (!head) return newNode;
    
    let curr = head;
    while (curr.next) {
        curr = curr.next;
    }
    curr.next = newNode;
    return head;
}
\`\`\`

### Delete Node by Value
\`\`\`javascript
function deleteNode(head, val) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let curr = dummy;
    
    while (curr.next) {
        if (curr.next.val === val) {
            curr.next = curr.next.next;  // Skip the node
            break;
        }
        curr = curr.next;
    }
    
    return dummy.next;
}
\`\`\`

---

## The Dummy Node Trick

Using a dummy node simplifies edge cases (empty list, delete head).

\`\`\`javascript
function deleteAllOccurrences(head, val) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let curr = dummy;
    
    while (curr.next) {
        if (curr.next.val === val) {
            curr.next = curr.next.next;
        } else {
            curr = curr.next;
        }
    }
    
    return dummy.next;
}
\`\`\`

---

## Time Complexity

| Operation | Time | Why? |
|-----------|------|------|
| Access by index | O(n) | Must traverse from head |
| Search | O(n) | Must check each node |
| Insert at head | O(1) | Just update pointers |
| Insert at tail | O(n) | Must find tail first |
| Delete (with prev) | O(1) | Just update pointers |
| Delete by value | O(n) | Must find node first |

**Space:** O(n) for n nodes

---

## Linked List vs Array

| Feature | Linked List | Array |
|---------|-------------|-------|
| Access | O(n) | O(1) |
| Insert at start | O(1) | O(n) |
| Insert at end | O(n)* | O(1)** |
| Memory | Extra for pointers | Contiguous |
| Size | Dynamic | Fixed*** |

*O(1) if you keep tail pointer
**Amortized
***Dynamic arrays resize

---

## Common Mistakes

### 1. Losing the Head Reference
\`\`\`javascript
// ❌ WRONG - lost the list!
head = head.next;  // Can't get back to original head

// ✅ CORRECT - use separate pointer
let curr = head;
curr = curr.next;  // head still points to start
\`\`\`

### 2. Not Handling Empty List
\`\`\`javascript
// ❌ WRONG - crashes on null
head.next;  // Error if head is null

// ✅ CORRECT - check first
if (head) head.next;
// or
head?.next;  // Optional chaining
\`\`\`

### 3. Forgetting to Update Pointers
\`\`\`javascript
// ❌ WRONG - node not actually inserted
newNode.next = curr.next;
// Forgot: curr.next = newNode;

// ✅ CORRECT - both pointers updated
newNode.next = curr.next;
curr.next = newNode;
\`\`\`

---

## When to Use Linked List

**Use when:**
- Frequent insertions/deletions at beginning
- Don't need random access
- Size changes frequently
- Implementing stacks/queues

**Don't use when:**
- Need random access by index
- Memory is constrained (pointers overhead)
- Cache performance matters (not contiguous)

---

## Interview Tips

- Always clarify: "Is it singly or doubly linked?"
- Use dummy node to simplify edge cases
- Draw the pointers before coding
- "I'll use a dummy head to handle edge cases cleanly"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Structure | Node with val + next pointer |
| Insert at head | O(1) |
| Access by index | O(n) |
| Space | O(n) + pointer overhead |
| Best For | Frequent insert/delete at head |

> **One-liner:** Linked list = chain of nodes where each points to the next. O(1) insert at head, O(n) access. Use dummy node for cleaner code.
`,

  contentFa: `
# لیست پیوندی یک‌طرفه - زنجیره گره‌ها

## لیست پیوندی چیست؟

تصور کن یه شکار گنج که هر سرنخ بهت می‌گه سرنخ بعدی کجاست. این لیست پیوندیه! هر عنصر (گره) داده و یه اشاره‌گر به عنصر بعدی داره.

**مثل این فکر کن:**
- یه قطار - هر واگن به بعدی وصله
- یه زنجیر - هر حلقه بعدی رو نگه می‌داره
- شکار گنج - هر سرنخ به مکان بعدی اشاره می‌کنه

---

## چرا باید اهمیت بدی؟

- پایه خیلی از ساختارهای داده (پشته، صف، گراف)
- درج/حذف O(1) در ابتدا (در مقابل O(n) برای آرایه)
- اندازه پویا - نیاز به پیش‌تخصیص نیست
- ضروری برای 20%+ مصاحبه‌های کدنویسی

---

## ساختار گره

\`\`\`javascript
class ListNode {
    constructor(val) {
        this.val = val;    // داده
        this.next = null;  // اشاره‌گر به گره بعدی
    }
}

// ساخت گره‌ها
const node1 = new ListNode(1);
const node2 = new ListNode(2);

// پیوند دادن: 1 → 2 → null
node1.next = node2;
\`\`\`

---

## عملیات پایه

### ساخت لیست از آرایه
\`\`\`javascript
function createList(arr) {
    const dummy = new ListNode(0);
    let curr = dummy;
    
    for (let val of arr) {
        curr.next = new ListNode(val);
        curr = curr.next;
    }
    
    return dummy.next;
}
\`\`\`

### درج در ابتدا - O(1)
\`\`\`javascript
function insertAtHead(head, val) {
    const newNode = new ListNode(val);
    newNode.next = head;
    return newNode;
}
\`\`\`

### حذف گره
\`\`\`javascript
function deleteNode(head, val) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let curr = dummy;
    
    while (curr.next) {
        if (curr.next.val === val) {
            curr.next = curr.next.next;
            break;
        }
        curr = curr.next;
    }
    
    return dummy.next;
}
\`\`\`

---

## پیچیدگی زمانی

| عملیات | زمان | چرا؟ |
|--------|------|------|
| دسترسی با اندیس | O(n) | باید از ابتدا پیمایش کنی |
| جستجو | O(n) | باید هر گره رو چک کنی |
| درج در ابتدا | O(1) | فقط اشاره‌گرها رو آپدیت کن |
| درج در انتها | O(n) | باید اول انتها رو پیدا کنی |

---

## لیست پیوندی در مقابل آرایه

| ویژگی | لیست پیوندی | آرایه |
|-------|-------------|-------|
| دسترسی | O(n) | O(1) |
| درج در ابتدا | O(1) | O(n) |
| حافظه | اضافی برای اشاره‌گرها | پیوسته |

---

## اشتباهات رایج

### ۱. گم کردن مرجع head
\`\`\`javascript
// ❌ اشتباه - لیست گم شد!
head = head.next;

// ✅ درست - از اشاره‌گر جدا استفاده کن
let curr = head;
curr = curr.next;
\`\`\`

### ۲. هندل نکردن لیست خالی
\`\`\`javascript
// ❌ اشتباه - روی null کرش می‌کنه
head.next;

// ✅ درست - اول چک کن
if (head) head.next;
\`\`\`

---

## کی از لیست پیوندی استفاده کنیم

**استفاده کن وقتی:**
- درج/حذف مکرر در ابتدا
- دسترسی تصادفی لازم نیست
- اندازه مرتب تغییر می‌کنه

**استفاده نکن وقتی:**
- دسترسی تصادفی با اندیس لازمه
- حافظه محدوده

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ساختار | گره با val + اشاره‌گر next |
| درج در ابتدا | O(1) |
| دسترسی با اندیس | O(n) |
| بهترین برای | درج/حذف مکرر در ابتدا |

> **یک خطی:** لیست پیوندی = زنجیره گره‌ها که هر کدوم به بعدی اشاره می‌کنه. درج O(1) در ابتدا، دسترسی O(n). از گره dummy برای کد تمیزتر استفاده کن.
`,

  visualizationId: 'linked-list',
  exerciseId: 'singly-linked-list',
};

export default singlyLinkedListLesson;