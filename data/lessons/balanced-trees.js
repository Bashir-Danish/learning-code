export const balancedTreesLesson = {
  id: 'balanced-trees',
  title: 'Balanced Trees (AVL)',
  titleFa: 'درخت‌های متوازن',
  difficulty: 'hard',
  estimatedTime: '60 min',
  
  content: `
# Balanced Trees - Keeping BST Fast

## What is a Balanced Tree?

Imagine a BST that got all its nodes on one side - it becomes a linked list! Balanced trees prevent this by keeping left and right subtrees roughly equal height.

**Think of it like:**
- A balanced scale - both sides roughly equal
- A well-organized closet - not everything on one shelf
- A fair tournament bracket - teams distributed evenly

---

## Why Should You Care?

- Guarantees O(log n) operations (BST worst case is O(n)!)
- Used in databases, file systems, memory allocators
- Foundation for Red-Black trees (used in Java TreeMap, C++ map)
- Interview favorite for understanding self-balancing

---

## The Problem with Unbalanced BST

\`\`\`
Insert: 1, 2, 3, 4, 5

Unbalanced (O(n)):     Balanced (O(log n)):
1                           3
 \\\\                         / \\\\
  2                       2   4
   \\\\                     /     \\\\
    3                   1       5
     \\\\
      4
       \\\\
        5
\`\`\`

---

## AVL Tree Basics

**Balance Factor** = height(left) - height(right)

Must be -1, 0, or 1 for every node!

\`\`\`javascript
function getHeight(node) {
    return node ? node.height : 0;
}

function getBalance(node) {
    return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node) {
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}
\`\`\`

---

## The Four Rotation Cases

### Case 1: Left-Left (LL) → Right Rotation
\`\`\`
    z                y
   /                / \\\\
  y      →         x   z
 /
x

function rightRotate(z) {
    const y = z.left;
    const T3 = y.right;
    
    y.right = z;
    z.left = T3;
    
    updateHeight(z);
    updateHeight(y);
    return y;
}
\`\`\`

### Case 2: Right-Right (RR) → Left Rotation
\`\`\`
z                    y
 \\\\                  / \\\\
  y      →        z   x
   \\\\
    x

function leftRotate(z) {
    const y = z.right;
    const T2 = y.left;
    
    y.left = z;
    z.right = T2;
    
    updateHeight(z);
    updateHeight(y);
    return y;
}
\`\`\`

### Case 3: Left-Right (LR) → Left then Right
\`\`\`
  z            z           x
 /            /           / \\\\
y     →      x     →     y   z
 \\\\          /
  x        y
\`\`\`

### Case 4: Right-Left (RL) → Right then Left
\`\`\`
z            z              x
 \\\\            \\\\            / \\\\
  y    →       x    →     z   y
 /              \\\\
x                y
\`\`\`

---

## AVL Insert with Balancing

\`\`\`javascript
function insert(node, key) {
    // 1. Normal BST insert
    if (!node) return new AVLNode(key);
    
    if (key < node.key) node.left = insert(node.left, key);
    else if (key > node.key) node.right = insert(node.right, key);
    else return node;  // No duplicates
    
    // 2. Update height
    updateHeight(node);
    
    // 3. Get balance factor
    const balance = getBalance(node);
    
    // 4. Rebalance if needed
    // LL Case
    if (balance > 1 && key < node.left.key)
        return rightRotate(node);
    
    // RR Case
    if (balance < -1 && key > node.right.key)
        return leftRotate(node);
    
    // LR Case
    if (balance > 1 && key > node.left.key) {
        node.left = leftRotate(node.left);
        return rightRotate(node);
    }
    
    // RL Case
    if (balance < -1 && key < node.right.key) {
        node.right = rightRotate(node.right);
        return leftRotate(node);
    }
    
    return node;
}
\`\`\`

---

## Common Mistakes

### 1. Forgetting to Update Height
\`\`\`javascript
// ❌ WRONG - height not updated
function rightRotate(z) {
    const y = z.left;
    y.right = z;
    z.left = y.right;
    return y;
}

// ✅ CORRECT - update heights after rotation
function rightRotate(z) {
    const y = z.left;
    z.left = y.right;
    y.right = z;
    updateHeight(z);  // z first (now child)
    updateHeight(y);  // y second (now parent)
    return y;
}
\`\`\`

### 2. Wrong Rotation Order in LR/RL
\`\`\`javascript
// ❌ WRONG - single rotation for LR case
if (balance > 1 && key > node.left.key)
    return rightRotate(node);

// ✅ CORRECT - double rotation
if (balance > 1 && key > node.left.key) {
    node.left = leftRotate(node.left);  // First!
    return rightRotate(node);            // Second!
}
\`\`\`

### 3. Not Returning New Root
After rotation, the root changes! Always return the new root.

---

## AVL vs Red-Black Trees

| Feature | AVL | Red-Black |
|---------|-----|-----------|
| Balance | Stricter | More relaxed |
| Search | Faster | Slightly slower |
| Insert/Delete | More rotations | Fewer rotations |
| Use case | Read-heavy | Write-heavy |

---

## Complexity

| Operation | Time | Space |
|-----------|------|-------|
| Search | O(log n) | O(1) |
| Insert | O(log n) | O(1) |
| Delete | O(log n) | O(1) |
| Rotation | O(1) | O(1) |

**Guaranteed O(log n)** - no worst case O(n) like regular BST!

---

## Interview Tips

- Know the 4 rotation cases (LL, RR, LR, RL)
- Balance factor must be -1, 0, or 1
- "AVL guarantees O(log n) by rebalancing after each insert/delete"
- Red-Black is more common in practice (Java, C++)

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Balance Factor | -1, 0, or 1 |
| All Operations | O(log n) guaranteed |
| Rotations | LL, RR, LR, RL |
| Key Insight | Rebalance after every change |

> **One-liner:** AVL = self-balancing BST. Balance factor must be -1, 0, or 1. Four rotation cases keep it balanced. O(log n) guaranteed!
`,

  contentFa: `
# درخت‌های متوازن - BST رو سریع نگه دار

## درخت متوازن چیست؟

تصور کن یه BST که همه گره‌هاش یه طرف رفتن - می‌شه لیست پیوندی! درخت‌های متوازن با نگه داشتن ارتفاع زیردرخت‌های چپ و راست تقریباً برابر، این رو جلوگیری می‌کنن.

**مثل این فکر کن:**
- ترازوی متعادل - هر دو طرف تقریباً برابر
- کمد منظم - همه چیز روی یه طبقه نیست
- جدول مسابقات منصفانه - تیم‌ها به طور مساوی توزیع شدن

---

## چرا باید اهمیت بدی؟

- عملیات O(log n) تضمین شده (بدترین حالت BST O(n) هست!)
- در دیتابیس‌ها، سیستم فایل، تخصیص‌دهنده حافظه استفاده می‌شه
- پایه درخت‌های قرمز-سیاه (در Java TreeMap، C++ map)
- محبوب مصاحبه برای درک خود-متوازن‌سازی

---

## مشکل BST نامتوازن

درج: 1, 2, 3, 4, 5

نامتوازن (O(n)):     متوازن (O(log n)):
1                           3
 \\\\                         / \\\\
  2                       2   4
   \\\\                     /     \\\\
    3                   1       5
     \\\\
      4
       \\\\
        5

---

## مبانی درخت AVL

**ضریب تعادل** = height(چپ) - height(راست)

باید -1، 0 یا 1 برای هر گره باشه!

getHeight(node): ارتفاع گره رو برگردون
getBalance(node): ضریب تعادل رو برگردون
updateHeight(node): ارتفاع رو بعد از تغییر آپدیت کن

---

## چهار حالت چرخش

### حالت ۱: چپ-چپ (LL) → چرخش راست
    z                y
   /                / \\\\
  y      →         x   z
 /
x

### حالت ۲: راست-راست (RR) → چرخش چپ
z                    y
 \\\\                  / \\\\
  y      →        z   x
   \\\\
    x

### حالت ۳: چپ-راست (LR) → چپ بعد راست
  z            z           x
 /            /           / \\\\
y     →      x     →     y   z
 \\\\          /
  x        y

### حالت ۴: راست-چپ (RL) → راست بعد چپ
z            z              x
 \\\\            \\\\            / \\\\
  y    →       x    →     z   y
 /              \\\\
x                y

---

## درج AVL با متوازن‌سازی

insert(node, key):
    // 1. درج معمولی BST
    اگه node نال: return AVLNode(key)
    
    اگه key < node.key: node.left = insert(node.left, key)
    وگرنه اگه key > node.key: node.right = insert(node.right, key)
    وگرنه return node  // تکراری نداریم
    
    // 2. ارتفاع رو آپدیت کن
    updateHeight(node)
    
    // 3. ضریب تعادل رو بگیر
    balance = getBalance(node)
    
    // 4. اگه لازمه متوازن کن
    // حالت LL
    اگه balance > 1 و key < node.left.key:
        return rightRotate(node)
    
    // حالت RR
    اگه balance < -1 و key > node.right.key:
        return leftRotate(node)
    
    // حالت LR
    اگه balance > 1 و key > node.left.key:
        node.left = leftRotate(node.left)
        return rightRotate(node)
    
    // حالت RL
    اگه balance < -1 و key < node.right.key:
        node.right = rightRotate(node.right)
        return leftRotate(node)
    
    return node

---

## اشتباهات رایج

### ۱. فراموش کردن آپدیت ارتفاع
❌ اشتباه: ارتفاع آپدیت نشده
✅ درست: بعد از چرخش ارتفاع‌ها رو آپدیت کن

### ۲. ترتیب چرخش اشتباه در LR/RL
❌ اشتباه: یه چرخش برای حالت LR
✅ درست: دو چرخش - اول چپ، بعد راست

### ۳. برنگردوندن ریشه جدید
بعد از چرخش، ریشه عوض می‌شه! همیشه ریشه جدید رو برگردون.

---

## AVL در مقابل درخت‌های قرمز-سیاه

| ویژگی | AVL | قرمز-سیاه |
|-------|-----|-----------|
| تعادل | سخت‌گیرانه‌تر | آزادتر |
| جستجو | سریع‌تر | کمی کندتر |
| درج/حذف | چرخش بیشتر | چرخش کمتر |
| کاربرد | خواندن زیاد | نوشتن زیاد |

---

## پیچیدگی

| عملیات | زمان | فضا |
|--------|------|-----|
| جستجو | O(log n) | O(1) |
| درج | O(log n) | O(1) |
| حذف | O(log n) | O(1) |
| چرخش | O(1) | O(1) |

**O(log n) تضمین شده** - بدترین حالت O(n) مثل BST معمولی نداریم!

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- نیاز به O(log n) تضمین شده داری
- داده‌ها به ترتیب درج می‌شن (BST معمولی نامتوازن می‌شه)
- عملیات خواندن زیاده (AVL بهتره)
- دیتابیس یا سیستم فایل می‌سازی

**استفاده نکن وقتی:**
- داده‌ها تصادفی درج می‌شن (BST معمولی کافیه)
- عملیات نوشتن زیاده (Red-Black بهتره)
- پیاده‌سازی ساده می‌خوای (AVL پیچیده‌تره)

---

## مثال کد با کامنت فارسی

\`\`\`javascript
// چرخش راست برای متوازن کردن
function rightRotate(z) {
    // y فرزند چپ z هست
    const y = z.left;
    // T3 زیردرخت راست y هست
    const T3 = y.right;
    
    // چرخش: y می‌شه والد جدید
    y.right = z;
    // T3 می‌شه فرزند چپ z
    z.left = T3;
    
    // ارتفاع‌ها رو آپدیت کن (z اول چون حالا فرزنده)
    updateHeight(z);
    updateHeight(y);
    
    // ریشه جدید رو برگردون
    return y;
}

// گرفتن ضریب تعادل
function getBalance(node) {
    // اگه نال باشه، تعادل صفره
    if (!node) return 0;
    // ارتفاع چپ منهای ارتفاع راست
    return getHeight(node.left) - getHeight(node.right);
}
\`\`\`

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ضریب تعادل | -1، 0 یا 1 |
| همه عملیات | O(log n) تضمین شده |
| چرخش‌ها | LL، RR، LR، RL |
| نکته کلیدی | بعد از هر تغییر متوازن کن |

> **یک خطی:** AVL = BST خود-متوازن. ضریب تعادل باید -1، 0 یا 1 باشه. چهار حالت چرخش متوازنش نگه می‌داره. O(log n) تضمین شده!
`,

  visualizationId: 'avl-tree',
  exerciseId: 'balanced-trees',
};

export default balancedTreesLesson;
