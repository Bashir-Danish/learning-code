export const recursionPatternsLesson = {
  id: 'recursion-patterns',
  title: 'Recursion Patterns',
  titleFa: 'الگوهای بازگشت',
  difficulty: 'medium',
  estimatedTime: '45 min',
  
  content: `
# Recursion Patterns - Templates for Success

## Why Learn Patterns?

Most recursive problems follow a few common patterns. Learn these, and you can solve 80% of recursion problems!

---

## Pattern 1: Linear Recursion

One recursive call per function call. Processes one element at a time.

\`\`\`javascript
// Power function
function power(base, exp) {
    if (exp === 0) return 1;
    return base * power(base, exp - 1);
}

// Sum array
function sum(arr, i = 0) {
    if (i >= arr.length) return 0;
    return arr[i] + sum(arr, i + 1);
}
\`\`\`

**Time:** O(n), **Space:** O(n) call stack

---

## Pattern 2: Binary Recursion (Divide & Conquer)

Two recursive calls - split problem in half.

\`\`\`javascript
// Merge Sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

// Binary Search (recursive)
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return binarySearch(arr, target, mid + 1, right);
    return binarySearch(arr, target, left, mid - 1);
}
\`\`\`

**Time:** O(n log n) for merge sort, O(log n) for binary search

---

## Pattern 3: Tail Recursion

Recursive call is the LAST operation. Can be optimized by compilers.

\`\`\`javascript
// Factorial with tail recursion
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);  // Last operation
}

// Sum with tail recursion
function sumTail(arr, i = 0, acc = 0) {
    if (i >= arr.length) return acc;
    return sumTail(arr, i + 1, acc + arr[i]);
}
\`\`\`

**Benefit:** Some languages optimize to O(1) space

---

## Pattern 4: Tree Recursion

Process tree structures - call on left and right children.

\`\`\`javascript
// Sum all nodes
function treeSum(node) {
    if (!node) return 0;
    return node.val + treeSum(node.left) + treeSum(node.right);
}

// Max depth
function maxDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}
\`\`\`

**Time:** O(n), **Space:** O(h) where h = height

---

## Pattern 5: Generate All Subsets

Include or exclude each element.

\`\`\`javascript
function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        result.push([...current]);  // Add current subset
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);      // Include
            backtrack(i + 1, current);  // Recurse
            current.pop();              // Exclude (backtrack)
        }
    }
    
    backtrack(0, []);
    return result;
}
// [1,2,3] → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
\`\`\`

**Time:** O(2^n), **Space:** O(n)

---

## Pattern 6: Generate Permutations

All possible orderings.

\`\`\`javascript
function permute(nums) {
    const result = [];
    
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
            backtrack(current, newRemaining);
            current.pop();
        }
    }
    
    backtrack([], nums);
    return result;
}
// [1,2,3] → [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
\`\`\`

**Time:** O(n!), **Space:** O(n)

---

## Pattern Summary

| Pattern | Calls | Use Case | Time |
|---------|-------|----------|------|
| Linear | 1 | Arrays, lists | O(n) |
| Binary | 2 | Divide & conquer | O(n log n) |
| Tail | 1 (last) | Optimization | O(n) |
| Tree | 2+ | Tree structures | O(n) |
| Subsets | 2^n | All combinations | O(2^n) |
| Permutations | n! | All orderings | O(n!) |

---

## Interview Tips

- Identify which pattern fits the problem
- Subsets/permutations → backtracking pattern
- Tree problems → tree recursion pattern
- "This is a divide-and-conquer problem, so I'll use binary recursion"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Linear | One call, process one element |
| Binary | Two calls, divide in half |
| Tree | Process left and right children |
| Backtracking | Try, recurse, undo |

> **One-liner:** Most recursion fits 6 patterns: linear, binary, tail, tree, subsets, permutations. Identify the pattern, apply the template!
`,

  contentFa: `
# الگوهای بازگشت - قالب‌هایی برای موفقیت

## الگوهای بازگشت چیست؟ (توضیح ساده)

تصور کن داری آشپزی یاد می‌گیری. به جای حفظ کردن ۱۰۰ دستور غذا، ۶ تکنیک پایه یاد می‌گیری (سرخ کردن، پختن، بخارپز و...) و بعد هر غذایی رو می‌تونی بپزی!

**اینطوری فکر کن:**
- بازگشت هم همینطوره - ۶ الگوی اصلی داره
- ۸۰٪ مسائل بازگشتی با این ۶ الگو حل می‌شن
- الگو رو شناسایی کن، قالب رو اعمال کن، تمام!

---

## چرا باید اهمیت بدی؟

**در مصاحبه:** وقتی مسئله بازگشتی می‌بینی، اگه الگو رو بشناسی:
- سریع‌تر شروع می‌کنی
- کمتر اشتباه می‌کنی
- حرفه‌ای‌تر به نظر می‌رسی

| بدون الگو | با الگو |
|-----------|---------|
| ۲۰ دقیقه فکر کردن | ۵ دقیقه شناسایی الگو |
| احتمال اشتباه بالا | قالب آماده |
| استرس زیاد | اعتماد به نفس |

---

## الگو ۱: بازگشت خطی (ساده‌ترین)

**مثل:** شمردن پله‌ها یکی یکی. هر بار یه پله، تا برسی به آخر.

یه فراخوانی بازگشتی در هر مرحله. یه عنصر پردازش می‌شه.

\`\`\`javascript
// توان - base به توان exp
function power(base, exp) {
    // شرط پایه: هر عددی به توان ۰ می‌شه ۱
    if (exp === 0) return 1;
    
    // بازگشت: base × power(base, exp-1)
    return base * power(base, exp - 1);
}
// power(2, 3) = 2 × power(2, 2) = 2 × 2 × power(2, 1) = 2 × 2 × 2 × 1 = 8

// جمع آرایه
function sum(arr, i = 0) {
    // شرط پایه: به آخر رسیدیم
    if (i >= arr.length) return 0;
    
    // بازگشت: این عنصر + جمع بقیه
    return arr[i] + sum(arr, i + 1);
}
// sum([1,2,3]) = 1 + sum([2,3]) = 1 + 2 + sum([3]) = 1 + 2 + 3 + 0 = 6
\`\`\`

**زمان:** O(n) | **فضا:** O(n) پشته فراخوانی

---

## الگو ۲: بازگشت دودویی (تقسیم و حل)

**مثل:** پیدا کردن کلمه در فرهنگ لغت. وسط رو باز کن، نصفش کن، دوباره نصف کن...

دو فراخوانی بازگشتی - مسئله رو به دو نیمه تقسیم کن.

\`\`\`javascript
// مرتب‌سازی ادغامی
function mergeSort(arr) {
    // شرط پایه: آرایه ۰ یا ۱ عنصری مرتبه
    if (arr.length <= 1) return arr;
    
    // تقسیم به دو نیمه
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));   // نیمه چپ رو مرتب کن
    const right = mergeSort(arr.slice(mid));     // نیمه راست رو مرتب کن
    
    // ادغام دو نیمه مرتب
    return merge(left, right);
}

// جستجوی دودویی بازگشتی
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    // شرط پایه: پیدا نشد
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;         // پیدا شد!
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);  // نیمه راست
    }
    return binarySearch(arr, target, left, mid - 1);       // نیمه چپ
}
\`\`\`

**زمان:** O(n log n) برای merge sort | O(log n) برای binary search

---

## الگو ۳: بازگشت دُمی (بهینه‌شده)

**مثل:** به جای برگشتن و جمع کردن، همه چیز رو با خودت ببر!

فراخوانی بازگشتی آخرین عملیاته. نتیجه رو در پارامتر جمع می‌کنیم.

\`\`\`javascript
// فاکتوریل معمولی (غیر دُمی)
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // بعد از بازگشت، ضرب می‌کنیم
}
// باید برگرده و ضرب کنه: 5 × 4 × 3 × 2 × 1

// فاکتوریل دُمی (بهینه)
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;       // جواب آماده‌ست!
    return factorialTail(n - 1, n * acc);  // آخرین عملیات
}
// نتیجه رو با خودش می‌بره: acc = 1 → 5 → 20 → 60 → 120

// جمع آرایه دُمی
function sumTail(arr, i = 0, acc = 0) {
    if (i >= arr.length) return acc;
    return sumTail(arr, i + 1, acc + arr[i]);
}
\`\`\`

**مزیت:** بعضی زبان‌ها (نه JavaScript) به O(1) فضا بهینه می‌کنن!

---

## الگو ۴: بازگشت درختی

**مثل:** بررسی همه شاخه‌های یه درخت. هر شاخه رو برو، بعد برگرد و شاخه بعدی.

برای ساختارهای درختی - روی فرزندان چپ و راست صدا بزن.

\`\`\`javascript
// جمع همه گره‌های درخت
function treeSum(node) {
    // شرط پایه: گره خالی
    if (!node) return 0;
    
    // مقدار این گره + جمع چپ + جمع راست
    return node.val + treeSum(node.left) + treeSum(node.right);
}

// عمق درخت
function maxDepth(node) {
    // شرط پایه: گره خالی = عمق ۰
    if (!node) return 0;
    
    // ۱ + بیشترین عمق بین چپ و راست
    const leftDepth = maxDepth(node.left);
    const rightDepth = maxDepth(node.right);
    return 1 + Math.max(leftDepth, rightDepth);
}

// آیا مقدار در درخت هست؟
function contains(node, target) {
    if (!node) return false;
    if (node.val === target) return true;
    
    // یا در چپ هست یا در راست
    return contains(node.left, target) || contains(node.right, target);
}
\`\`\`

**زمان:** O(n) | **فضا:** O(h) که h = ارتفاع درخت

---

## الگو ۵: تولید زیرمجموعه‌ها (Backtracking)

**مثل:** انتخاب لباس! هر لباس رو یا می‌پوشی یا نمی‌پوشی. همه ترکیب‌ها رو امتحان کن.

هر عنصر رو شامل کن یا حذف کن.

\`\`\`javascript
function subsets(nums) {
    const result = [];
    
    function backtrack(start, current) {
        // هر حالت یه زیرمجموعه‌ست - اضافه کن
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);      // ۱. انتخاب کن
            backtrack(i + 1, current);  // ۲. برو جلو
            current.pop();              // ۳. برگرد (backtrack)
        }
    }
    
    backtrack(0, []);
    return result;
}

// subsets([1, 2, 3])
// خروجی: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
// ۸ زیرمجموعه = 2³
\`\`\`

**الگوی کلیدی:** انتخاب → بازگشت → برگشت

**زمان:** O(2^n) | **فضا:** O(n)

---

## الگو ۶: تولید جایگشت‌ها

**مثل:** چیدن ۳ نفر در صف. چند حالت داریم؟ ۳! = ۶ حالت.

همه ترتیب‌های ممکن رو بساز.

\`\`\`javascript
function permute(nums) {
    const result = [];
    
    function backtrack(current, remaining) {
        // شرط پایه: همه رو استفاده کردیم
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        // هر عنصر باقی‌مونده رو امتحان کن
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);  // این رو انتخاب کن
            
            // بقیه رو بدون این عنصر بفرست
            const newRemaining = [
                ...remaining.slice(0, i),
                ...remaining.slice(i + 1)
            ];
            
            backtrack(current, newRemaining);
            current.pop();  // برگرد
        }
    }
    
    backtrack([], nums);
    return result;
}

// permute([1, 2, 3])
// خروجی: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
// ۶ جایگشت = 3!
\`\`\`

**زمان:** O(n!) | **فضا:** O(n)

---

## اشتباهات رایج

### ۱. فراموش کردن شرط پایه
❌ اشتباه:
\`\`\`javascript
function factorial(n) {
    return n * factorial(n - 1);  // کی تموم می‌شه؟!
}
// Stack Overflow! 💥
\`\`\`

✅ درست:
\`\`\`javascript
function factorial(n) {
    if (n <= 1) return 1;  // شرط پایه!
    return n * factorial(n - 1);
}
\`\`\`

---

### ۲. شرط پایه اشتباه
❌ اشتباه:
\`\`\`javascript
function sum(arr, i = 0) {
    if (i === arr.length) return arr[i];  // arr[length] وجود نداره!
    return arr[i] + sum(arr, i + 1);
}
\`\`\`

✅ درست:
\`\`\`javascript
function sum(arr, i = 0) {
    if (i >= arr.length) return 0;  // برگردون ۰، نه عنصر!
    return arr[i] + sum(arr, i + 1);
}
\`\`\`

---

### ۳. فراموش کردن backtrack
❌ اشتباه:
\`\`\`javascript
function subsets(nums) {
    const result = [];
    function backtrack(start, current) {
        result.push([...current]);
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            // فراموش کردیم pop کنیم!
        }
    }
    backtrack(0, []);
    return result;
}
\`\`\`

✅ درست: همیشه بعد از بازگشت، \`pop()\` کن!

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- مسئله به زیرمسئله‌های مشابه تقسیم می‌شه
- ساختار درختی داری
- باید همه حالات رو بررسی کنی

**استفاده نکن وقتی:**
- حلقه ساده کافیه
- نگران Stack Overflow هستی (n خیلی بزرگه)
- می‌تونی با DP بهینه‌تر حل کنی

---

## جدول مرجع سریع

| الگو | فراخوانی | کاربرد | زمان | فضا |
|------|----------|--------|------|-----|
| خطی | ۱ | آرایه، لیست | O(n) | O(n) |
| دودویی | ۲ | تقسیم و حل | O(n log n) | O(log n) |
| دُمی | ۱ (آخر) | بهینه‌سازی | O(n) | O(n)* |
| درختی | ۲+ | درخت‌ها | O(n) | O(h) |
| زیرمجموعه | ۲^n | ترکیب‌ها | O(2^n) | O(n) |
| جایگشت | n! | ترتیب‌ها | O(n!) | O(n) |

---

## خلاصه سریع

| الگو | کلید شناسایی |
|------|--------------|
| خطی | یه عنصر در هر بار |
| دودویی | نصف کن، دو بار صدا بزن |
| دُمی | نتیجه رو با خودت ببر |
| درختی | چپ و راست |
| زیرمجموعه | شامل کن یا نکن |
| جایگشت | همه ترتیب‌ها |

> **یک خطی:** ۶ الگو رو بشناس: خطی، دودویی، دُمی، درختی، زیرمجموعه، جایگشت. الگو رو پیدا کن، قالب رو اعمال کن!
`,

  visualizationId: 'recursion-patterns',
  exerciseId: 'recursion-patterns',
};

export default recursionPatternsLesson;
