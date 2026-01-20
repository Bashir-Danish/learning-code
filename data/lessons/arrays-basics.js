export const arraysBasicsLesson = {
  id: 'arrays-basics',
  title: 'Arrays Basics',
  titleFa: 'مبانی آرایه',
  difficulty: 'easy',
  estimatedTime: '40 min',
  
  content: `
# Arrays - Your First Data Structure!

## What is an Array? (Think of it like this...)

Imagine you have a **row of boxes**, each with a number on it (0, 1, 2, 3...). You can put ONE thing in each box.

\`\`\`
Box:    [A] [B] [C] [D] [E]
Index:    0   1   2   3   4
\`\`\`

That's an array! It's just a **list of items in order**.

**Real-life examples:**
- A shopping list (item 1, item 2, item 3...)
- A playlist (song 1, song 2, song 3...)
- Student grades [85, 92, 78, 95, 88]

---

## Why Arrays are SUPER Important

Arrays are the **most used data structure** in programming. You'll use them in almost every program you write!

- Store multiple values in one variable
- Keep things in order
- Access any item instantly by its position

---

## Creating Arrays in JavaScript

\`\`\`javascript
// Method 1: The easy way (most common!)
const fruits = ['apple', 'banana', 'orange'];

// Method 2: Empty array, add items later
const numbers = [];
numbers.push(1);  // Now: [1]
numbers.push(2);  // Now: [1, 2]

// Method 3: Create array with specific size
const fiveZeros = new Array(5).fill(0);  // [0, 0, 0, 0, 0]

// Method 4: Create array with pattern
const oneToFive = Array.from({length: 5}, (_, i) => i + 1);  // [1, 2, 3, 4, 5]
\`\`\`

---

## Accessing Items (Getting stuff from boxes)

**Remember:** Arrays start counting from **0**, not 1!

\`\`\`javascript
const colors = ['red', 'green', 'blue', 'yellow'];
//    Index:      0       1        2        3

// Get first item
colors[0];  // 'red'

// Get third item
colors[2];  // 'blue'

// Get LAST item (trick!)
colors[colors.length - 1];  // 'yellow'
// Or the modern way:
colors.at(-1);  // 'yellow'

// What if index doesn't exist?
colors[100];  // undefined (not an error!)
\`\`\`

**Common mistake:** Forgetting arrays start at 0!
\`\`\`javascript
const arr = ['a', 'b', 'c'];
arr[1];  // 'b' (NOT 'a'!)
arr[3];  // undefined (only 0, 1, 2 exist)
\`\`\`

---

## Adding Items

\`\`\`javascript
const arr = [1, 2, 3];

// Add to END (most common)
arr.push(4);        // [1, 2, 3, 4]
arr.push(5, 6);     // [1, 2, 3, 4, 5, 6]  (can add multiple!)

// Add to BEGINNING (slower!)
arr.unshift(0);     // [0, 1, 2, 3, 4, 5, 6]

// Add in MIDDLE
arr.splice(3, 0, 'new');  // Insert 'new' at index 3
// [0, 1, 2, 'new', 3, 4, 5, 6]
\`\`\`

**Tip:** \`push()\` is fast, \`unshift()\` is slow (has to move everything!)

---

## Removing Items

\`\`\`javascript
const arr = ['a', 'b', 'c', 'd', 'e'];

// Remove from END
arr.pop();          // Returns 'e', arr is now ['a', 'b', 'c', 'd']

// Remove from BEGINNING
arr.shift();        // Returns 'a', arr is now ['b', 'c', 'd']

// Remove from MIDDLE (at index 1, remove 1 item)
arr.splice(1, 1);   // Returns ['c'], arr is now ['b', 'd']

// Remove multiple items
arr.splice(0, 2);   // Remove 2 items starting at index 0
\`\`\`

---

## Looping Through Arrays

### Method 1: Classic for loop
\`\`\`javascript
const nums = [10, 20, 30];

for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);  // 10, 20, 30
}
\`\`\`

### Method 2: for...of (cleaner!)
\`\`\`javascript
for (const num of nums) {
    console.log(num);  // 10, 20, 30
}
\`\`\`

### Method 3: forEach
\`\`\`javascript
nums.forEach((num, index) => {
    console.log(\`Index \${index}: \${num}\`);
});
// Index 0: 10
// Index 1: 20
// Index 2: 30
\`\`\`

---

## Transforming Arrays (Super Useful!)

### map() - Transform each item
\`\`\`javascript
const prices = [10, 20, 30];

// Double all prices
const doubled = prices.map(price => price * 2);
// [20, 40, 60]

// Add tax (10%)
const withTax = prices.map(price => price * 1.1);
// [11, 22, 33]
\`\`\`

### filter() - Keep only some items
\`\`\`javascript
const ages = [12, 25, 8, 30, 15, 42];

// Keep only adults (18+)
const adults = ages.filter(age => age >= 18);
// [25, 30, 42]

// Keep only even numbers
const evens = [1, 2, 3, 4, 5, 6].filter(n => n % 2 === 0);
// [2, 4, 6]
\`\`\`

### reduce() - Combine into one value
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = nums.reduce((total, num) => total + num, 0);
// 15

// Find maximum
const max = nums.reduce((max, num) => num > max ? num : max, nums[0]);
// 5
\`\`\`

---

## Finding Items

\`\`\`javascript
const fruits = ['apple', 'banana', 'orange', 'banana'];

// Does it exist?
fruits.includes('banana');  // true
fruits.includes('grape');   // false

// Where is it?
fruits.indexOf('banana');   // 0 (first occurrence)
fruits.lastIndexOf('banana');  // 3 (last occurrence)
fruits.indexOf('grape');    // -1 (not found)

// Find with condition
const nums = [1, 5, 10, 15, 20];
nums.find(n => n > 8);      // 10 (first match)
nums.findIndex(n => n > 8); // 2 (index of first match)
\`\`\`

---

## Sorting Arrays

\`\`\`javascript
// WARNING: sort() changes the original array!

// Sort strings (works fine)
const names = ['Charlie', 'Alice', 'Bob'];
names.sort();  // ['Alice', 'Bob', 'Charlie']

// Sort numbers (TRICKY!)
const nums = [10, 2, 30, 4];
nums.sort();  // [10, 2, 30, 4] - WRONG! (sorts as strings)

// Correct way for numbers:
nums.sort((a, b) => a - b);  // [2, 4, 10, 30] - Ascending
nums.sort((a, b) => b - a);  // [30, 10, 4, 2] - Descending
\`\`\`

---

## Common Patterns You'll Use A LOT

### Find Maximum/Minimum
\`\`\`javascript
const scores = [85, 92, 78, 95, 88];

// Easy way
const max = Math.max(...scores);  // 95
const min = Math.min(...scores);  // 78

// Manual way (good to understand)
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
\`\`\`

### Remove Duplicates
\`\`\`javascript
const withDupes = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(withDupes)];  // [1, 2, 3, 4]
\`\`\`

### Reverse Array
\`\`\`javascript
const arr = [1, 2, 3, 4, 5];

// Easy way (changes original!)
arr.reverse();  // [5, 4, 3, 2, 1]

// Without changing original
const reversed = [...arr].reverse();
\`\`\`

---

## Common Mistakes to Avoid

### Mistake 1: Forgetting arrays start at 0
\`\`\`javascript
const arr = ['first', 'second', 'third'];
arr[1];  // 'second', NOT 'first'!
\`\`\`

### Mistake 2: Using = to copy arrays
\`\`\`javascript
const original = [1, 2, 3];
const copy = original;  // NOT a copy! Same array!
copy.push(4);
console.log(original);  // [1, 2, 3, 4] - Original changed too!

// Correct way to copy:
const realCopy = [...original];
// or
const realCopy2 = original.slice();
\`\`\`

### Mistake 3: Comparing arrays with ===
\`\`\`javascript
[1, 2, 3] === [1, 2, 3];  // false! (different objects)

// To compare arrays, use JSON.stringify or loop through
JSON.stringify([1,2,3]) === JSON.stringify([1,2,3]);  // true
\`\`\`

---

## Quick Reference Card

| What you want | How to do it |
|---------------|--------------|
| Get length | \`arr.length\` |
| Get first | \`arr[0]\` |
| Get last | \`arr.at(-1)\` |
| Add to end | \`arr.push(item)\` |
| Remove from end | \`arr.pop()\` |
| Add to start | \`arr.unshift(item)\` |
| Remove from start | \`arr.shift()\` |
| Copy array | \`[...arr]\` |
| Check if exists | \`arr.includes(item)\` |
| Find index | \`arr.indexOf(item)\` |
| Transform all | \`arr.map(fn)\` |
| Filter some | \`arr.filter(fn)\` |
| Sum/combine | \`arr.reduce(fn, init)\` |
`,

  contentFa: `
# آرایه‌ها - اولین ساختار داده‌ات!

## آرایه چیست؟ (توضیح ساده)

تصور کن یک **ردیف از جعبه‌ها** داری که هر کدوم یک شماره روشون هست (۰، ۱، ۲، ۳...). می‌تونی یک چیز در هر جعبه بذاری.

\`\`\`
جعبه:   [A] [B] [C] [D] [E]
اندیس:   0   1   2   3   4
\`\`\`

**اینطوری فکر کن:**
- مثل یه قطار با واگن‌های شماره‌دار
- یا صندلی‌های سینما با شماره ردیف
- هر جا شماره داری، آرایه کمکت می‌کنه!

---

## چرا باید اهمیت بدی؟

آرایه‌ها **پراستفاده‌ترین ساختار داده** در برنامه‌نویسی هستند!

| بدون آرایه | با آرایه |
|------------|----------|
| ۱۰۰ متغیر جدا | یک متغیر |
| کد تکراری | حلقه ساده |
| مدیریت سخت | دسترسی آسان |

**در مصاحبه:** ۴۰%+ مسائل با آرایه‌ها کار می‌کنن!

---

## ساختن آرایه در جاوااسکریپت

\`\`\`javascript
// روش ۱: روش آسان (رایج‌ترین!)
const fruits = ['apple', 'banana', 'orange'];

// روش ۲: آرایه خالی، بعداً آیتم اضافه کن
const numbers = [];
numbers.push(1);  // حالا: [1]
numbers.push(2);  // حالا: [1, 2]

// روش ۳: ساختن آرایه با اندازه مشخص
const fiveZeros = new Array(5).fill(0);  // [0, 0, 0, 0, 0]

// روش ۴: ساختن آرایه با الگو
const oneToFive = Array.from({length: 5}, (_, i) => i + 1);  // [1, 2, 3, 4, 5]
\`\`\`

---

## دسترسی به آیتم‌ها

**یادت باشه:** آرایه‌ها از **۰** شروع می‌کنن، نه ۱!

\`\`\`javascript
const colors = ['red', 'green', 'blue', 'yellow'];
//    اندیس:     0       1        2        3

colors[0];  // 'red' - اولین
colors[2];  // 'blue' - سومین
colors.at(-1);  // 'yellow' - آخرین (روش جدید!)
colors[100];  // undefined - خطا نمی‌ده!
\`\`\`

---

## اضافه و حذف کردن

\`\`\`javascript
const arr = [1, 2, 3];

// ✅ اضافه به انتها (سریع - O(1))
arr.push(4);        // [1, 2, 3, 4]

// ⚠️ اضافه به ابتدا (کند - O(n))
arr.unshift(0);     // [0, 1, 2, 3, 4]

// ✅ حذف از انتها (سریع - O(1))
arr.pop();          // برمی‌گردونه 4

// ⚠️ حذف از ابتدا (کند - O(n))
arr.shift();        // برمی‌گردونه 0
\`\`\`

**نکته:** \`push/pop\` سریعن، \`unshift/shift\` کندن!

---

## حلقه زدن روی آرایه‌ها

\`\`\`javascript
const nums = [10, 20, 30];

// روش ۱: for کلاسیک (وقتی اندیس لازمه)
for (let i = 0; i < nums.length; i++) {
    console.log(nums[i]);
}

// روش ۲: for...of (تمیزتر!)
for (const num of nums) {
    console.log(num);
}

// روش ۳: forEach (با اندیس)
nums.forEach((num, i) => {
    console.log(\`اندیس \${i}: \${num}\`);
});
\`\`\`

---

## متدهای تبدیل (خیلی مهم!)

### map() - تبدیل هر آیتم
\`\`\`javascript
const prices = [10, 20, 30];
const doubled = prices.map(p => p * 2);  // [20, 40, 60]
// آرایه اصلی تغییر نمی‌کنه!
\`\`\`

### filter() - فیلتر کردن
\`\`\`javascript
const ages = [12, 25, 8, 30];
const adults = ages.filter(age => age >= 18);  // [25, 30]
\`\`\`

### reduce() - ترکیب به یک مقدار
\`\`\`javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((total, n) => total + n, 0);  // 15
\`\`\`

---

## پیدا کردن آیتم‌ها

\`\`\`javascript
const fruits = ['apple', 'banana', 'orange'];

// آیا وجود داره؟
fruits.includes('banana');  // true ✅
fruits.includes('grape');   // false ❌

// کجاست؟
fruits.indexOf('banana');   // 1
fruits.indexOf('grape');    // -1 (پیدا نشد)

// پیدا کردن با شرط
const nums = [1, 5, 10, 15];
nums.find(n => n > 8);      // 10 (اولین تطابق)
nums.findIndex(n => n > 8); // 2 (اندیس)
\`\`\`

---

## مرتب‌سازی

\`\`\`javascript
// ⚠️ هشدار: sort() آرایه اصلی رو تغییر می‌ده!

// رشته‌ها - خوب کار می‌کنه
['c', 'a', 'b'].sort();  // ['a', 'b', 'c'] ✅

// اعداد - حواست باشه!
[10, 2, 30].sort();  // [10, 2, 30] ❌ (به صورت رشته!)

// روش درست برای اعداد:
[10, 2, 30].sort((a, b) => a - b);  // [2, 10, 30] ✅
\`\`\`

---

## اشتباهات رایج

### ۱. فراموش کردن شروع از ۰
❌ اشتباه:
\`\`\`javascript
const arr = ['a', 'b', 'c'];
arr[1];  // 'b'، نه 'a'!
\`\`\`

✅ درست: اندیس ۰ = اولین آیتم

---

### ۲. کپی اشتباه آرایه
❌ اشتباه:
\`\`\`javascript
const copy = original;  // همون آرایه‌ست!
copy.push(4);  // original هم تغییر می‌کنه!
\`\`\`

✅ درست:
\`\`\`javascript
const copy = [...original];  // کپی واقعی
const copy2 = original.slice();  // روش دیگه
\`\`\`

---

### ۳. مقایسه آرایه‌ها
❌ اشتباه:
\`\`\`javascript
[1, 2] === [1, 2];  // false! (آبجکت‌های متفاوت)
\`\`\`

✅ درست:
\`\`\`javascript
JSON.stringify([1,2]) === JSON.stringify([1,2]);  // true
\`\`\`

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- ترتیب مهمه
- نیاز به دسترسی با اندیس داری
- داده‌ها از یک نوعن

**استفاده نکن وقتی:**
- نیاز به جستجوی سریع داری → هش مپ
- اضافه/حذف از ابتدا زیاده → لینک لیست

---

## جدول مرجع سریع

| عملیات | متد | پیچیدگی |
|--------|-----|---------|
| گرفتن طول | \`arr.length\` | O(1) |
| دسترسی | \`arr[i]\` | O(1) |
| اضافه به آخر | \`push()\` | O(1) |
| حذف از آخر | \`pop()\` | O(1) |
| اضافه به اول | \`unshift()\` | O(n) |
| حذف از اول | \`shift()\` | O(n) |
| جستجو | \`indexOf()\` | O(n) |
| مرتب‌سازی | \`sort()\` | O(n log n) |

> **یک خطی:** آرایه = لیست مرتب با دسترسی O(1). از ۰ شروع می‌شه، push/pop سریعه، unshift/shift کنده!
`,

  visualizationId: 'arrays',
  exerciseId: 'arrays-basics',
};

export default arraysBasicsLesson;
