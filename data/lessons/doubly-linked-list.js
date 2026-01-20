export const doublyLinkedListLesson = {
  id: 'doubly-linked-list',
  title: 'Doubly Linked List',
  titleFa: 'لیست پیوندی دوطرفه',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Doubly Linked List - Navigate Both Ways

## What is a Doubly Linked List?

Imagine a train where you can walk to the next car OR the previous car. That's a doubly linked list! Each node has pointers to BOTH next AND previous nodes.

**Think of it like:**
- A playlist - skip forward or backward
- Browser history - go back or forward
- A book with page numbers - flip forward or back

---

## Why Should You Care?

- O(1) deletion when you have the node reference
- Can traverse in both directions
- Foundation for LRU Cache (very common interview question!)
- Used in browser history, undo/redo systems

---

## Node Structure

\`\`\`javascript
class DoublyNode {
    constructor(val) {
        this.val = val;
        this.prev = null;  // Pointer to previous
        this.next = null;  // Pointer to next
    }
}

// Creating: null ← 1 ↔ 2 ↔ 3 → null
const node1 = new DoublyNode(1);
const node2 = new DoublyNode(2);
const node3 = new DoublyNode(3);

node1.next = node2;
node2.prev = node1;
node2.next = node3;
node3.prev = node2;
\`\`\`

---

## Basic Operations

### Insert After a Node - O(1)
\`\`\`javascript
function insertAfter(node, val) {
    const newNode = new DoublyNode(val);
    
    newNode.next = node.next;
    newNode.prev = node;
    
    if (node.next) {
        node.next.prev = newNode;
    }
    node.next = newNode;
    
    return newNode;
}
\`\`\`

### Insert Before a Node - O(1)
\`\`\`javascript
function insertBefore(node, val) {
    const newNode = new DoublyNode(val);
    
    newNode.prev = node.prev;
    newNode.next = node;
    
    if (node.prev) {
        node.prev.next = newNode;
    }
    node.prev = newNode;
    
    return newNode;
}
\`\`\`

### Delete a Node - O(1)
\`\`\`javascript
function deleteNode(node) {
    if (node.prev) {
        node.prev.next = node.next;
    }
    if (node.next) {
        node.next.prev = node.prev;
    }
    // Node is now disconnected
}
\`\`\`

---

## LRU Cache - The Classic Interview Problem

Least Recently Used cache with O(1) get and put operations.

\`\`\`javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();  // key → node
        
        // Dummy head and tail for easier operations
        this.head = new DoublyNode(0);
        this.tail = new DoublyNode(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    // Move node to front (most recently used)
    moveToHead(node) {
        this.removeNode(node);
        this.addToHead(node);
    }
    
    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    addToHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    removeTail() {
        const node = this.tail.prev;
        this.removeNode(node);
        return node;
    }
    
    get(key) {
        if (!this.map.has(key)) return -1;
        
        const node = this.map.get(key);
        this.moveToHead(node);  // Mark as recently used
        return node.val;
    }
    
    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val = value;
            this.moveToHead(node);
        } else {
            const node = new DoublyNode(value);
            node.key = key;
            
            this.map.set(key, node);
            this.addToHead(node);
            
            if (this.map.size > this.capacity) {
                const removed = this.removeTail();
                this.map.delete(removed.key);
            }
        }
    }
}
\`\`\`

---

## Singly vs Doubly Linked List

| Feature | Singly | Doubly |
|---------|--------|--------|
| Memory per node | 1 pointer | 2 pointers |
| Delete with node ref | O(n)* | O(1) |
| Traverse backward | No | Yes |
| Insert before | O(n) | O(1) |
| Complexity | Simpler | More complex |

*Need to find previous node first

---

## Common Mistakes

### 1. Forgetting to Update Both Pointers
\`\`\`javascript
// ❌ WRONG - only updated next
node.prev.next = node.next;
// Forgot: node.next.prev = node.prev;

// ✅ CORRECT - update both
node.prev.next = node.next;
node.next.prev = node.prev;
\`\`\`

### 2. Not Checking for Null
\`\`\`javascript
// ❌ WRONG - crashes if node.prev is null
node.prev.next = node.next;

// ✅ CORRECT - check first
if (node.prev) node.prev.next = node.next;
if (node.next) node.next.prev = node.prev;
\`\`\`

### 3. Wrong Order of Operations
\`\`\`javascript
// ❌ WRONG - loses reference
node.next = newNode;
newNode.next = node.next;  // Points to newNode!

// ✅ CORRECT - save reference first
newNode.next = node.next;
node.next = newNode;
\`\`\`

---

## When to Use Doubly Linked List

**Use when:**
- Need to delete nodes in O(1) with reference
- Need to traverse both directions
- Implementing LRU cache
- Need to insert before a node

**Don't use when:**
- Memory is very constrained
- Only need forward traversal
- Simpler singly linked list suffices

---

## Interview Tips

- LRU Cache is THE classic doubly linked list problem
- Use dummy head/tail to avoid null checks
- Draw the pointers - doubly linked is error-prone
- "I'll use doubly linked list for O(1) deletion"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Structure | Node with val + prev + next |
| Delete with reference | O(1) |
| Insert before/after | O(1) |
| Memory | 2 pointers per node |
| Best For | LRU Cache, bidirectional traversal |

> **One-liner:** Doubly linked list = nodes with prev AND next pointers. O(1) delete when you have the node. Essential for LRU Cache.
`,

  contentFa: `
# لیست پیوندی دوطرفه - حرکت در هر دو جهت

## لیست پیوندی دوطرفه چیست؟

تصور کن یه قطار که می‌تونی به واگن بعدی یا قبلی بری. این لیست پیوندی دوطرفه‌ست! هر گره اشاره‌گر به هر دو گره بعدی و قبلی داره.

**مثل این فکر کن:**
- یه پلی‌لیست - جلو یا عقب برو
- تاریخچه مرورگر - برگرد یا جلو برو
- یه کتاب با شماره صفحه - جلو یا عقب ورق بزن

---

## چرا باید اهمیت بدی؟

- حذف O(1) وقتی مرجع گره رو داری
- می‌تونی در هر دو جهت پیمایش کنی
- پایه LRU Cache (سوال خیلی رایج مصاحبه!)

---

## ساختار گره

\`\`\`javascript
class DoublyNode {
    constructor(val) {
        this.val = val;
        this.prev = null;  // اشاره‌گر به قبلی
        this.next = null;  // اشاره‌گر به بعدی
    }
}
\`\`\`

---

## عملیات پایه

### درج بعد از گره - O(1)
\`\`\`javascript
function insertAfter(node, val) {
    const newNode = new DoublyNode(val);
    
    newNode.next = node.next;
    newNode.prev = node;
    
    if (node.next) node.next.prev = newNode;
    node.next = newNode;
    
    return newNode;
}
\`\`\`

### حذف گره - O(1)
\`\`\`javascript
function deleteNode(node) {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
}
\`\`\`

---

## LRU Cache - مسئله کلاسیک مصاحبه

\`\`\`javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new DoublyNode(0);
        this.tail = new DoublyNode(0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this.moveToHead(node);
        return node.val;
    }
    
    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val = value;
            this.moveToHead(node);
        } else {
            const node = new DoublyNode(value);
            node.key = key;
            this.map.set(key, node);
            this.addToHead(node);
            if (this.map.size > this.capacity) {
                const removed = this.removeTail();
                this.map.delete(removed.key);
            }
        }
    }
}
\`\`\`

---

## یک‌طرفه در مقابل دوطرفه

| ویژگی | یک‌طرفه | دوطرفه |
|-------|---------|--------|
| حافظه هر گره | 1 اشاره‌گر | 2 اشاره‌گر |
| حذف با مرجع | O(n) | O(1) |
| پیمایش برعکس | نه | بله |

---

## اشتباهات رایج

### ۱. فراموش کردن آپدیت هر دو اشاره‌گر
\`\`\`javascript
// ❌ اشتباه - فقط next آپدیت شد
node.prev.next = node.next;

// ✅ درست - هر دو رو آپدیت کن
node.prev.next = node.next;
node.next.prev = node.prev;
\`\`\`

### ۲. چک نکردن null
\`\`\`javascript
// ❌ اشتباه - کرش می‌کنه اگه null باشه
node.prev.next = node.next;

// ✅ درست - اول چک کن
if (node.prev) node.prev.next = node.next;
\`\`\`

---

## کی از لیست دوطرفه استفاده کنیم

**استفاده کن وقتی:**
- حذف O(1) با مرجع لازمه
- پیمایش در هر دو جهت لازمه
- پیاده‌سازی LRU cache

**استفاده نکن وقتی:**
- حافظه خیلی محدوده
- فقط پیمایش جلو لازمه

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ساختار | گره با val + prev + next |
| حذف با مرجع | O(1) |
| درج قبل/بعد | O(1) |
| بهترین برای | LRU Cache، پیمایش دوطرفه |

> **یک خطی:** لیست دوطرفه = گره‌ها با اشاره‌گر prev و next. حذف O(1) وقتی گره رو داری. ضروری برای LRU Cache.
`,

  visualizationId: 'doubly-linked-list',
  exerciseId: 'doubly-linked-list',
};

export default doublyLinkedListLesson;