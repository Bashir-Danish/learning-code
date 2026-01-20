export const binarySearchTreeLesson = {
  id: 'binary-search-tree',
  title: 'Binary Search Tree',
  titleFa: 'درخت جستجوی دودویی',
  difficulty: 'medium',
  estimatedTime: '60 min',
  
  content: `
# Binary Search Tree - The Organized Tree

## What is a BST?

Imagine a library where books are organized: smaller numbers go left, larger go right. That's a BST!

**Think of it like:**
- A dictionary - words before current go left, after go right
- A phone book - organized alphabetically
- A decision tree - "Is it bigger? Go right. Smaller? Go left."

**The Rule:** Left subtree < Node < Right subtree (for ALL nodes!)

---

## Why Should You Care?

- O(log n) search, insert, delete (when balanced)
- Foundation for databases and file systems
- 15%+ of tree interview questions are BST-specific
- Inorder traversal gives sorted order!

---

## BST Property Visualized

\`\`\`
       8
      / \\
     3   10
    / \\    \\
   1   6    14
      / \\   /
     4   7 13

All values in left subtree < 8
All values in right subtree > 8
This applies to EVERY node!
\`\`\`

---

## Core Operations

### 1. Search - O(log n) average
\`\`\`javascript
function search(root, val) {
    if (!root || root.val === val) return root;
    
    if (val < root.val) {
        return search(root.left, val);   // Go left
    } else {
        return search(root.right, val);  // Go right
    }
}

// Iterative version
function searchIterative(root, val) {
    while (root && root.val !== val) {
        root = val < root.val ? root.left : root.right;
    }
    return root;
}
\`\`\`

### 2. Insert - O(log n) average
\`\`\`javascript
function insert(root, val) {
    if (!root) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insert(root.left, val);
    } else {
        root.right = insert(root.right, val);
    }
    return root;
}
\`\`\`

### 3. Delete - O(log n) average
\`\`\`javascript
function deleteNode(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // Found the node to delete
        
        // Case 1 & 2: No child or one child
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Case 3: Two children
        // Find inorder successor (smallest in right subtree)
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;
        }
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    return root;
}
\`\`\`

---

## Validate BST

\`\`\`javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    
    // Current node must be within valid range
    if (root.val <= min || root.val >= max) return false;
    
    // Left subtree: max becomes current value
    // Right subtree: min becomes current value
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}
\`\`\`

---

## Find Min/Max

\`\`\`javascript
// Minimum: Go all the way left
function findMin(root) {
    while (root.left) root = root.left;
    return root.val;
}

// Maximum: Go all the way right
function findMax(root) {
    while (root.right) root = root.right;
    return root.val;
}
\`\`\`

---

## Common Mistakes

### 1. Wrong BST Validation
\`\`\`javascript
// ❌ WRONG - only checks immediate children
function isValidBST(root) {
    if (!root) return true;
    if (root.left && root.left.val >= root.val) return false;
    if (root.right && root.right.val <= root.val) return false;
    return isValidBST(root.left) && isValidBST(root.right);
}
// Fails for: [5, 4, 6, null, null, 3, 7] - 3 is in right subtree but < 5!

// ✅ CORRECT - track valid range
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}
\`\`\`

### 2. Forgetting to Return Root After Insert
\`\`\`javascript
// ❌ WRONG - doesn't return
function insert(root, val) {
    if (!root) return new TreeNode(val);
    if (val < root.val) insert(root.left, val);
    else insert(root.right, val);
}

// ✅ CORRECT - return root
function insert(root, val) {
    if (!root) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else root.right = insert(root.right, val);
    return root;  // Don't forget!
}
\`\`\`

### 3. Delete with Two Children
Remember: Replace with inorder successor (smallest in right subtree) OR inorder predecessor (largest in left subtree).

---

## Complexity Analysis

| Operation | Average | Worst (Skewed) |
|-----------|---------|----------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |
| Delete | O(log n) | O(n) |
| Space | O(n) | O(n) |

**Worst case:** When tree becomes a linked list (all left or all right)

---

## Interview Tips

- Inorder traversal of BST = sorted array
- "I'll use the BST property: left < root < right"
- For validation, track min/max bounds
- Delete is tricky - practice the 3 cases!

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Property | Left < Node < Right |
| Search | O(log n) average |
| Insert | O(log n) average |
| Delete | O(log n) average |
| Inorder | Sorted order! |

> **One-liner:** BST = left < node < right. Search by going left/right based on comparison. Inorder gives sorted order!
`,

  contentFa: `
# درخت جستجوی دودویی - درخت منظم ⚡

## BST چیست؟ (توضیح ساده)

تصور کن یه کتابخانه که کتاب‌ها منظم چیده شدن: اعداد کوچکتر چپ می‌رن، بزرگتر راست. این BST هست!

**اینطوری فکر کن:**
- مثل فرهنگ لغت - کلمات قبلی چپ، بعدی راست
- مثل دفترچه تلفن - به ترتیب الفبا
- مثل درخت تصمیم - "بزرگتره؟ برو راست. کوچکتره؟ برو چپ."

**قانون طلایی:** زیردرخت چپ < گره < زیردرخت راست (برای همه گره‌ها!)

---

## چرا باید اهمیت بدی؟

- جستجو، درج، حذف O(log n) (وقتی متوازنه) ⚡
- پایه دیتابیس‌ها و سیستم فایل
- ۱۵%+ سوالات مصاحبه درخت مخصوص BST هستن
- پیمایش میان‌ترتیب ترتیب مرتب می‌ده! ✅

---

## ویژگی BST به صورت تصویری

\`\`\`
       8
      / \\
     3   10
    / \\    \\
   1   6    14
      / \\   /
     4   7 13

همه مقادیر زیردرخت چپ < 8
همه مقادیر زیردرخت راست > 8
این برای هر گره صدق می‌کنه!
\`\`\`

---

## عملیات اصلی

### ۱. جستجو - O(log n) میانگین

\`\`\`javascript
function search(root, val) {
    // اگه ریشه نال یا پیدا شد
    if (!root || root.val === val) return root;
    
    if (val < root.val) {
        return search(root.left, val);   // برو چپ
    } else {
        return search(root.right, val);  // برو راست
    }
}

// نسخه تکراری (بدون بازگشت)
function searchIterative(root, val) {
    while (root && root.val !== val) {
        // بر اساس مقایسه، چپ یا راست برو
        root = val < root.val ? root.left : root.right;
    }
    return root;
}
\`\`\`

### ۲. درج - O(log n) میانگین

\`\`\`javascript
function insert(root, val) {
    // اگه جا خالیه، گره جدید بساز
    if (!root) return new TreeNode(val);
    
    if (val < root.val) {
        root.left = insert(root.left, val);  // درج در چپ
    } else {
        root.right = insert(root.right, val); // درج در راست
    }
    return root;  // فراموش نکن برگردونی!
}
\`\`\`

### ۳. حذف - O(log n) میانگین

\`\`\`javascript
function deleteNode(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        // گره رو پیدا کردیم - حالا حذف کن
        
        // حالت ۱ و ۲: بدون فرزند یا یه فرزند
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // حالت ۳: دو فرزند - جانشین رو پیدا کن
        let successor = root.right;
        while (successor.left) {
            successor = successor.left;  // کوچکترین در راست
        }
        root.val = successor.val;
        root.right = deleteNode(root.right, successor.val);
    }
    return root;
}
\`\`\`

---

## اعتبارسنجی BST

\`\`\`javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    
    // گره فعلی باید در محدوده معتبر باشه
    if (root.val <= min || root.val >= max) return false;
    
    // چپ: max می‌شه مقدار فعلی
    // راست: min می‌شه مقدار فعلی
    return isValidBST(root.left, min, root.val) && 
           isValidBST(root.right, root.val, max);
}
\`\`\`

---

## پیدا کردن حداقل/حداکثر

\`\`\`javascript
// حداقل: تا آخر چپ برو
function findMin(root) {
    while (root.left) root = root.left;
    return root.val;
}

// حداکثر: تا آخر راست برو
function findMax(root) {
    while (root.right) root = root.right;
    return root.val;
}
\`\`\`

---

## جدول مرجع سریع

| عملیات | میانگین | بدترین (کج) |
|--------|---------|-------------|
| جستجو | O(log n) ⚡ | O(n) 🐌 |
| درج | O(log n) ⚡ | O(n) 🐌 |
| حذف | O(log n) ⚡ | O(n) 🐌 |
| فضا | O(n) | O(n) |

**بدترین حالت:** وقتی درخت لیست پیوندی می‌شه (همه چپ یا همه راست)

---

## اشتباهات رایج

### ۱. اعتبارسنجی BST اشتباه
❌ اشتباه: فقط فرزندان مستقیم رو چک می‌کنه
✅ درست: محدوده min/max رو دنبال کن

### ۲. فراموش کردن برگردوندن ریشه بعد از درج
❌ اشتباه: return نمی‌کنه
✅ درست: \`return root\` رو فراموش نکن!

### ۳. حذف با دو فرزند
❌ اشتباه: مستقیم حذف کردن
✅ درست: با جانشین میان‌ترتیب جایگزین کن

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- نیاز به جستجوی سریع داری ✅
- داده‌ها مرتب می‌شن
- درج و حذف زیاد داری
- نیاز به min/max سریع داری

**استفاده نکن وقتی:**
- داده‌ها به ترتیب مرتب میان (درخت کج می‌شه) ❌
- فقط جستجو می‌خوای (آرایه مرتب + binary search بهتره)
- نیاز به تضمین O(log n) داری (از AVL یا Red-Black استفاده کن)

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ویژگی اصلی | چپ < گره < راست |
| جستجو | O(log n) میانگین ⚡ |
| درج | O(log n) میانگین |
| حذف | O(log n) میانگین |
| میان‌ترتیب | ترتیب مرتب! ✅ |

> **یک خطی:** BST = چپ < گره < راست. با مقایسه چپ/راست جستجو کن. میان‌ترتیب ترتیب مرتب می‌ده! ⚡
`,

  visualizationId: 'bst',
  exerciseId: 'binary-search-tree',
};

export default binarySearchTreeLesson;
