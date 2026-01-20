export const binaryTreeBasicsLesson = {
  id: 'binary-tree-basics',
  title: 'Binary Tree Basics',
  titleFa: 'مبانی درخت دودویی',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Binary Tree Basics - The Family Tree of Data

## What is a Binary Tree?

Imagine a family tree where each person can have at most 2 children. That's a binary tree!

**Think of it like:**
- A family tree - each parent has at most 2 kids
- A tournament bracket - each match has 2 teams
- A decision tree - yes/no questions leading to answers

---

## Why Should You Care?

- Foundation for BST, heaps, and many algorithms
- 20%+ of coding interview questions involve trees
- Efficient searching, sorting, and hierarchical data
- Used in file systems, databases, and compilers

---

## Node Structure

\`\`\`javascript
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;   // Left child
        this.right = null;  // Right child
    }
}

// Building a tree:
//       1
//      / \\
//     2   3
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
\`\`\`

---

## Tree Terminology

| Term | Meaning | Example |
|------|---------|---------|
| Root | Top node | Node 1 |
| Leaf | Node with no children | Nodes 2, 3 |
| Height | Longest path to leaf | 2 levels |
| Depth | Distance from root | Root = 0 |
| Parent | Node above | 1 is parent of 2 |
| Child | Node below | 2 is child of 1 |

---

## Tree Types

**Full Binary Tree:** Every node has 0 or 2 children
\`\`\`
    1
   / \\
  2   3
 / \\
4   5
\`\`\`

**Complete Binary Tree:** All levels filled except last (filled left to right)
\`\`\`
    1
   / \\
  2   3
 / \\
4   5
\`\`\`

**Perfect Binary Tree:** All internal nodes have 2 children, all leaves same level
\`\`\`
    1
   / \\
  2   3
 / \\ / \\
4  5 6  7
\`\`\`

---

## Essential Operations

### 1. Max Depth (Height)
\`\`\`javascript
function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
}
// Time: O(n), Space: O(h) where h = height
\`\`\`

### 2. Count Nodes
\`\`\`javascript
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}
\`\`\`

### 3. Is Same Tree
\`\`\`javascript
function isSameTree(p, q) {
    if (!p && !q) return true;           // Both null
    if (!p || !q) return false;          // One null
    if (p.val !== q.val) return false;   // Different values
    
    return isSameTree(p.left, q.left) && 
           isSameTree(p.right, q.right);
}
\`\`\`

### 4. Invert Tree (Mirror)
\`\`\`javascript
function invertTree(root) {
    if (!root) return null;
    
    // Swap children
    [root.left, root.right] = [root.right, root.left];
    
    // Recursively invert subtrees
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}
\`\`\`

### 5. Is Symmetric
\`\`\`javascript
function isSymmetric(root) {
    function isMirror(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        
        return t1.val === t2.val && 
               isMirror(t1.left, t2.right) && 
               isMirror(t1.right, t2.left);
    }
    return isMirror(root, root);
}
\`\`\`

---

## Common Mistakes

### 1. Forgetting Base Case
\`\`\`javascript
// ❌ WRONG - crashes on null
function maxDepth(root) {
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ✅ CORRECT - handle null
function maxDepth(root) {
    if (!root) return 0;  // Base case!
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\`

### 2. Confusing Height vs Depth
- Height: from node DOWN to deepest leaf
- Depth: from root DOWN to node

### 3. Not Returning the Root
\`\`\`javascript
// ❌ WRONG - doesn't return modified tree
function invertTree(root) {
    if (!root) return;
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
}

// ✅ CORRECT - return root
function invertTree(root) {
    if (!root) return null;
    [root.left, root.right] = [root.right, root.left];
    invertTree(root.left);
    invertTree(root.right);
    return root;  // Return the root!
}
\`\`\`

---

## Interview Tips

- Always handle null root first
- Think recursively: solve for subtrees, combine results
- Draw the tree! Visualize before coding
- "I'll use recursion - each node does the same thing"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Max children | 2 per node |
| Time (most ops) | O(n) |
| Space | O(h) for recursion |
| Key insight | Solve subtrees, combine |

> **One-liner:** Binary tree = each node has at most 2 children. Think recursively: solve for left, solve for right, combine!
`,

  contentFa: `
# مبانی درخت دودویی - شجره‌نامه داده‌ها

## درخت دودویی چیست؟

تصور کن یه شجره‌نامه که هر نفر حداکثر ۲ فرزند داره. این یه درخت دودویی‌ه!

**مثل این فکر کن:**
- شجره‌نامه - هر والد حداکثر ۲ بچه داره
- جدول مسابقات - هر مسابقه ۲ تیم داره
- درخت تصمیم - سوالات بله/خیر که به جواب می‌رسن

---

## چرا باید اهمیت بدی؟

- پایه BST، هیپ و خیلی الگوریتم‌ها
- ۲۰%+ سوالات مصاحبه درباره درخت‌هاست
- جستجو، مرتب‌سازی و داده‌های سلسله‌مراتبی کارآمد
- در سیستم فایل، دیتابیس و کامپایلرها استفاده می‌شه

---

## ساختار گره

class TreeNode:
    val = مقدار
    left = فرزند چپ (یا null)
    right = فرزند راست (یا null)

ساختن درخت:
       1
      / \\
     2   3

root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)

---

## اصطلاحات درخت

| اصطلاح | معنی | مثال |
|--------|------|------|
| ریشه (Root) | گره بالا | گره 1 |
| برگ (Leaf) | گره بدون فرزند | گره‌های 2، 3 |
| ارتفاع (Height) | طولانی‌ترین مسیر به برگ | 2 سطح |
| عمق (Depth) | فاصله از ریشه | ریشه = 0 |
| والد (Parent) | گره بالایی | 1 والد 2 هست |
| فرزند (Child) | گره پایینی | 2 فرزند 1 هست |

---

## انواع درخت

**درخت دودویی کامل (Full):** هر گره 0 یا 2 فرزند داره

**درخت دودویی تکمیل (Complete):** همه سطوح پر شده جز آخری (از چپ پر می‌شه)

**درخت دودویی کامل (Perfect):** همه گره‌های داخلی 2 فرزند دارن، همه برگ‌ها یه سطح

---

## عملیات ضروری

### ۱. حداکثر عمق (ارتفاع)
maxDepth(root):
    اگه root نال باشه: return 0
    
    leftDepth = maxDepth(root.left)
    rightDepth = maxDepth(root.right)
    
    return 1 + max(leftDepth, rightDepth)

زمان: O(n)، فضا: O(h) که h = ارتفاع

### ۲. شمارش گره‌ها
countNodes(root):
    اگه root نال باشه: return 0
    return 1 + countNodes(root.left) + countNodes(root.right)

### ۳. آیا دو درخت یکسانن؟
isSameTree(p, q):
    اگه هر دو نال: return true
    اگه یکی نال: return false
    اگه مقادیر فرق دارن: return false
    
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)

### ۴. معکوس کردن درخت (آینه)
invertTree(root):
    اگه root نال باشه: return null
    
    جای فرزندان رو عوض کن
    invertTree(root.left)
    invertTree(root.right)
    
    return root

### ۵. آیا متقارنه؟
isSymmetric(root):
    تابع کمکی isMirror(t1, t2):
        اگه هر دو نال: return true
        اگه یکی نال: return false
        
        return t1.val === t2.val && 
               isMirror(t1.left, t2.right) && 
               isMirror(t1.right, t2.left)
    
    return isMirror(root, root)

---

## اشتباهات رایج

### ۱. فراموش کردن حالت پایه
❌ اشتباه: بدون چک کردن null
✅ درست: اول null رو چک کن!

### ۲. اشتباه گرفتن ارتفاع و عمق
- ارتفاع: از گره به پایین تا عمیق‌ترین برگ
- عمق: از ریشه به پایین تا گره

### ۳. برنگردوندن ریشه
❌ اشتباه: درخت تغییر یافته رو برنمی‌گردونه
✅ درست: return root رو فراموش نکن!

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- داده‌های سلسله‌مراتبی داری (فایل‌ها، سازمان)
- نیاز به جستجوی سریع داری (BST)
- می‌خوای داده‌ها رو مرتب نگه داری
- مسائل بازگشتی با ساختار تقسیم و حل

**استفاده نکن وقتی:**
- داده‌ها خطی هستن (آرایه یا لیست بهتره)
- نیاز به دسترسی تصادفی سریع داری
- حافظه محدوده (درخت overhead داره)

---

## مثال کد با کامنت فارسی

\`\`\`javascript
// پیدا کردن حداکثر عمق درخت
function maxDepth(root) {
    // اگه گره نال باشه، عمق صفره
    if (!root) return 0;
    
    // عمق زیردرخت چپ رو حساب کن
    const leftDepth = maxDepth(root.left);
    // عمق زیردرخت راست رو حساب کن
    const rightDepth = maxDepth(root.right);
    
    // بزرگترین عمق + ۱ (برای گره فعلی)
    return 1 + Math.max(leftDepth, rightDepth);
}

// معکوس کردن درخت (آینه‌ای)
function invertTree(root) {
    // حالت پایه: گره نال
    if (!root) return null;
    
    // جای فرزندان رو عوض کن
    [root.left, root.right] = [root.right, root.left];
    
    // بازگشتی زیردرخت‌ها رو معکوس کن
    invertTree(root.left);
    invertTree(root.right);
    
    // ریشه رو برگردون
    return root;
}
\`\`\`

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| حداکثر فرزند | 2 برای هر گره |
| زمان (بیشتر عملیات) | O(n) |
| فضا | O(h) برای بازگشت |
| نکته کلیدی | زیردرخت‌ها رو حل کن، ترکیب کن |

> **یک خطی:** درخت دودویی = هر گره حداکثر 2 فرزند داره. بازگشتی فکر کن: چپ رو حل کن، راست رو حل کن، ترکیب کن!
`,

  visualizationId: 'binary-tree',
  exerciseId: 'binary-tree-basics',
};

export default binaryTreeBasicsLesson;
