export const treeTraversalsLesson = {
  id: 'tree-traversals',
  title: 'Tree Traversals',
  titleFa: 'پیمایش درخت',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Tree Traversals - Visiting Every Node

## What is Tree Traversal?

Imagine visiting every room in a house. Tree traversal is visiting every node in a tree in a specific order.

**Think of it like:**
- Reading a book - chapter by chapter (level order)
- Exploring a maze - go deep first, then backtrack (DFS)
- Checking all floors of a building - one floor at a time (BFS)

---

## Why Should You Care?

- Foundation for almost all tree problems
- Different traversals reveal different patterns
- Inorder on BST gives sorted order!
- 30%+ of tree interview questions involve traversals

---

## The Four Main Traversals

\`\`\`
       1
      / \\
     2   3
    / \\
   4   5
\`\`\`

| Traversal | Order | Result |
|-----------|-------|--------|
| Inorder | Left, Root, Right | 4, 2, 5, 1, 3 |
| Preorder | Root, Left, Right | 1, 2, 4, 5, 3 |
| Postorder | Left, Right, Root | 4, 5, 2, 3, 1 |
| Level Order | Level by level | 1, 2, 3, 4, 5 |

---

## Inorder Traversal (Left → Root → Right)

**Use case:** Get sorted order from BST!

\`\`\`javascript
// Recursive - simple and clean
function inorder(root, result = []) {
    if (root) {
        inorder(root.left, result);   // 1. Go left
        result.push(root.val);         // 2. Visit root
        inorder(root.right, result);  // 3. Go right
    }
    return result;
}

// Iterative - uses stack
function inorderIterative(root) {
    const result = [], stack = [];
    let curr = root;
    
    while (curr || stack.length) {
        // Go all the way left
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        // Visit node
        curr = stack.pop();
        result.push(curr.val);
        // Go right
        curr = curr.right;
    }
    return result;
}
\`\`\`

---

## Preorder Traversal (Root → Left → Right)

**Use case:** Copy/serialize a tree, create prefix expression

\`\`\`javascript
// Recursive
function preorder(root, result = []) {
    if (root) {
        result.push(root.val);         // 1. Visit root
        preorder(root.left, result);   // 2. Go left
        preorder(root.right, result);  // 3. Go right
    }
    return result;
}

// Iterative
function preorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    
    while (stack.length) {
        const node = stack.pop();
        result.push(node.val);
        // Push right first (so left is processed first)
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return result;
}
\`\`\`

---

## Postorder Traversal (Left → Right → Root)

**Use case:** Delete tree, evaluate expression tree, calculate folder size

\`\`\`javascript
// Recursive
function postorder(root, result = []) {
    if (root) {
        postorder(root.left, result);   // 1. Go left
        postorder(root.right, result);  // 2. Go right
        result.push(root.val);          // 3. Visit root
    }
    return result;
}

// Iterative (tricky - use two stacks or reverse)
function postorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    
    while (stack.length) {
        const node = stack.pop();
        result.unshift(node.val);  // Add to front
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return result;
}
\`\`\`

---

## Level Order Traversal (BFS)

**Use case:** Level-by-level processing, find shortest path

\`\`\`javascript
function levelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    
    while (queue.length) {
        const level = [];
        const size = queue.length;  // Current level size
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}
// Returns: [[1], [2, 3], [4, 5]]
\`\`\`

---

## Memory Trick: "In-Pre-Post"

- **In**order: Root is **in** the middle (L-**R**-R)
- **Pre**order: Root comes **first** (**R**-L-R)
- **Post**order: Root comes **last** (L-R-**R**)

---

## Common Mistakes

### 1. Wrong Order in Iterative Preorder
\`\`\`javascript
// ❌ WRONG - left processed after right
if (node.left) stack.push(node.left);
if (node.right) stack.push(node.right);

// ✅ CORRECT - push right first (stack is LIFO)
if (node.right) stack.push(node.right);
if (node.left) stack.push(node.left);
\`\`\`

### 2. Forgetting Level Size in BFS
\`\`\`javascript
// ❌ WRONG - processes all nodes together
while (queue.length) {
    const node = queue.shift();
    // Can't separate levels!
}

// ✅ CORRECT - capture level size first
while (queue.length) {
    const size = queue.length;  // Capture before loop!
    for (let i = 0; i < size; i++) { ... }
}
\`\`\`

### 3. Not Handling Empty Tree
\`\`\`javascript
// ❌ WRONG - crashes on null
function levelOrder(root) {
    const queue = [root];  // null in queue!
}

// ✅ CORRECT - check first
function levelOrder(root) {
    if (!root) return [];
    const queue = [root];
}
\`\`\`

---

## When to Use Which

| Traversal | Best For |
|-----------|----------|
| Inorder | BST sorted order, validate BST |
| Preorder | Copy tree, serialize, prefix notation |
| Postorder | Delete tree, postfix notation, folder size |
| Level Order | Level-by-level, shortest path, zigzag |

---

## Interview Tips

- Know both recursive AND iterative versions
- Inorder + BST = sorted array (very common!)
- Level order needs queue, DFS needs stack
- "I'll use inorder since it gives sorted order for BST"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n) for all |
| Space | O(h) DFS, O(w) BFS |
| Inorder | L-Root-R, BST sorted |
| Preorder | Root-L-R, copy tree |
| Postorder | L-R-Root, delete tree |

> **One-liner:** Inorder = sorted BST, Preorder = root first, Postorder = root last, Level = BFS with queue!
`,

  contentFa: `
# پیمایش درخت - بازدید از هر گره

## پیمایش درخت چیست؟

تصور کن می‌خوای از همه اتاق‌های یه خونه بازدید کنی. پیمایش درخت یعنی بازدید از هر گره به ترتیب خاص.

**مثل این فکر کن:**
- خوندن کتاب - فصل به فصل (ترتیب سطحی)
- کاوش ماز - اول عمیق برو، بعد برگرد (DFS)
- چک کردن طبقات ساختمان - یه طبقه یه طبقه (BFS)

---

## چرا باید اهمیت بدی؟

- پایه تقریباً همه مسائل درخت
- پیمایش‌های مختلف الگوهای مختلف نشون می‌دن
- میان‌ترتیب روی BST ترتیب مرتب می‌ده!
- ۳۰%+ سوالات مصاحبه درخت شامل پیمایش‌هاست

---

## چهار پیمایش اصلی

       1
      / \\
     2   3
    / \\
   4   5

| پیمایش | ترتیب | نتیجه |
|--------|-------|-------|
| میان‌ترتیب | چپ، ریشه، راست | 4, 2, 5, 1, 3 |
| پیش‌ترتیب | ریشه، چپ، راست | 1, 2, 4, 5, 3 |
| پس‌ترتیب | چپ، راست، ریشه | 4, 5, 2, 3, 1 |
| ترتیب سطحی | سطح به سطح | 1, 2, 3, 4, 5 |

---

## پیمایش میان‌ترتیب (چپ → ریشه → راست)

**کاربرد:** ترتیب مرتب از BST بگیر!

inorder(root):
    اگه root وجود داره:
        inorder(root.left)    // 1. برو چپ
        visit(root.val)       // 2. بازدید ریشه
        inorder(root.right)   // 3. برو راست

---

## پیمایش پیش‌ترتیب (ریشه → چپ → راست)

**کاربرد:** کپی/سریالایز درخت، عبارت پیشوندی

preorder(root):
    اگه root وجود داره:
        visit(root.val)       // 1. بازدید ریشه
        preorder(root.left)   // 2. برو چپ
        preorder(root.right)  // 3. برو راست

---

## پیمایش پس‌ترتیب (چپ → راست → ریشه)

**کاربرد:** حذف درخت، ارزیابی درخت عبارت، محاسبه اندازه پوشه

postorder(root):
    اگه root وجود داره:
        postorder(root.left)   // 1. برو چپ
        postorder(root.right)  // 2. برو راست
        visit(root.val)        // 3. بازدید ریشه

---

## پیمایش ترتیب سطحی (BFS)

**کاربرد:** پردازش سطح به سطح، کوتاه‌ترین مسیر

levelOrder(root):
    اگه root نال: return []
    queue = [root]
    
    تا وقتی queue خالی نیست:
        level = []
        size = queue.length  // اندازه سطح فعلی
        
        برای i از 0 تا size:
            node = queue.shift()
            level.push(node.val)
            اگه node.left: queue.push(node.left)
            اگه node.right: queue.push(node.right)
        
        result.push(level)
    
    return result

نتیجه: [[1], [2, 3], [4, 5]]

---

## ترفند حافظه: "میان-پیش-پس"

- **میان**‌ترتیب: ریشه **وسط** هست (چ-**ر**-ر)
- **پیش**‌ترتیب: ریشه **اول** میاد (**ر**-چ-ر)
- **پس**‌ترتیب: ریشه **آخر** میاد (چ-ر-**ر**)

---

## اشتباهات رایج

### ۱. ترتیب اشتباه در پیش‌ترتیب تکراری
❌ اشتباه: چپ بعد از راست پردازش می‌شه
✅ درست: اول راست رو push کن (پشته LIFO هست)

### ۲. فراموش کردن اندازه سطح در BFS
❌ اشتباه: همه گره‌ها با هم پردازش می‌شن
✅ درست: اول اندازه سطح رو بگیر!

### ۳. هندل نکردن درخت خالی
❌ اشتباه: روی null کرش می‌کنه
✅ درست: اول چک کن!

---

## کی از کدوم استفاده کنیم

| پیمایش | بهترین برای |
|--------|------------|
| میان‌ترتیب | ترتیب مرتب BST، اعتبارسنجی BST |
| پیش‌ترتیب | کپی درخت، سریالایز، نماد پیشوندی |
| پس‌ترتیب | حذف درخت، نماد پسوندی، اندازه پوشه |
| ترتیب سطحی | سطح به سطح، کوتاه‌ترین مسیر، زیگزاگ |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n) برای همه |
| فضا | O(h) DFS، O(w) BFS |
| میان‌ترتیب | چ-ریشه-ر، BST مرتب |
| پیش‌ترتیب | ریشه-چ-ر، کپی درخت |
| پس‌ترتیب | چ-ر-ریشه، حذف درخت |

> **یک خطی:** میان‌ترتیب = BST مرتب، پیش‌ترتیب = ریشه اول، پس‌ترتیب = ریشه آخر، سطحی = BFS با صف!
`,

  visualizationId: 'tree-traversals',
  exerciseId: 'tree-traversals',
};

export default treeTraversalsLesson;
