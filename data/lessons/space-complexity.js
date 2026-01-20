export const spaceComplexityLesson = {
  id: 'space-complexity',
  title: 'Space Complexity',
  titleFa: 'پیچیدگی فضایی',
  difficulty: 'easy',
  estimatedTime: '30 min',
  
  content: `
# Space Complexity - How Much Memory Does It Take?

## What is Space Complexity? (Simple Explanation)

Imagine you're moving houses. Space complexity tells you: "For n boxes, how many trucks do you need?"

**Think of it like this:**
- Like the size of your school bag!
- The more you store, the more memory it takes
- Sometimes you can work with less (in-place)

---

## Why Should You Care?

**Real example:** Your mobile app has 500MB RAM. If your algorithm takes O(n²) space:
- 1000 items = 1 million memory units 💥
- App crashes!

| Scenario | O(1) | O(n) | O(n²) |
|----------|------|------|-------|
| 100 items | 1 | 100 | 10,000 |
| 10,000 items | 1 | 10,000 | 100,000,000 💥 |

**In interviews:** "What's the space complexity?" is the second question after time!

---

## Quick Reference Table

| Complexity | Description | Real Life Example |
|------------|-------------|-------------------|
| O(1) | Constant | A handbag - always same size |
| O(n) | Linear | A truck - more boxes, more space |
| O(n²) | Quadratic | A warehouse - stack boxes on boxes |
| O(log n) | Logarithmic | Recursion steps - halving each time |

---

## Practical Examples

### O(1) - Constant Space (Best!)
\`\`\`javascript
function sum(arr) {
    let total = 0;  // Just one variable!
    
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];  // We add, don't store
    }
    
    return total;
}
// 10 items? One variable
// 1 million items? Still one variable!
\`\`\`

**Like:** Counting money. You just keep one number in your head!

---

### O(n) - Linear Space
\`\`\`javascript
function double(arr) {
    const result = [];  // New array!
    
    for (let num of arr) {
        result.push(num * 2);  // Store each item
    }
    
    return result;
}
// 10 input items = 10 output items
// n items = n space
\`\`\`

**Like:** Photocopying. Each page needs a copy!

---

### O(n) - Recursion Stack (Hidden!)
\`\`\`javascript
function factorial(n) {
    // Base case
    if (n <= 1) return 1;
    
    // Each call stays on the stack!
    return n * factorial(n - 1);
}
// factorial(5):
// Stack: [5] → [5,4] → [5,4,3] → [5,4,3,2] → [5,4,3,2,1]
// 5 calls = O(5) = O(n) space!
\`\`\`

**Warning:** Recursion = hidden space!

---

### O(log n) - Binary Search Recursive
\`\`\`javascript
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);  // Right half
    }
    return binarySearch(arr, target, left, mid - 1);       // Left half
}
// We halve each time
// 1,000 items → ~10 calls on stack
// 1,000,000 items → ~20 calls on stack
\`\`\`

---

## In-Place vs Out-of-Place

### In-Place - O(1) Extra Space
\`\`\`javascript
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap without new array
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;  // Same array, reversed
}
// Only 2 extra variables!
// Original array is modified
\`\`\`

**Pros:** Low memory | **Cons:** Original data is lost

---

### Out-of-Place - O(n) Extra Space
\`\`\`javascript
function reverseOutOfPlace(arr) {
    const result = [];  // New array
    
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    
    return result;  // New array
}
// Or simpler:
// return [...arr].reverse();
\`\`\`

**Pros:** Original data preserved | **Cons:** More memory

---

## Common Mistakes

### 1. Forgetting Recursion Stack
❌ Wrong:
\`\`\`javascript
// Think it's O(1) space?
function recursiveSum(arr, i = 0) {
    if (i >= arr.length) return 0;
    return arr[i] + recursiveSum(arr, i + 1);
}
// No! O(n) space because of call stack!
\`\`\`

✅ Correct: Recursion = stack space. Always count it!

---

### 2. Ignoring Temporary Space
❌ Wrong:
\`\`\`javascript
function sortAndFind(arr, target) {
    arr.sort((a, b) => a - b);  // sort() usually takes O(n) space!
    return binarySearch(arr, target);
}
// Think it's O(1)? No! O(n) because of sort!
\`\`\`

✅ Correct: Built-in methods also take space!

---

### 3. Mistakes with 2D Arrays
❌ Wrong:
\`\`\`javascript
// This is NOT O(n) space!
const matrix = [];
for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
}
// n × n = O(n²) space!
\`\`\`

✅ Correct: n×n array = O(n²) space

---

## When to Use

**Use In-Place (O(1)) when:**
- Memory is limited (mobile, embedded)
- Original data not needed
- Speed matters more

**Use Out-of-Place (O(n)) when:**
- Original data must be preserved
- Code readability matters more
- You have enough memory

---

## Comparison Table

| Approach | Time | Space | When to Use |
|----------|------|-------|-------------|
| In-place | O(n) | O(1) | Memory limited |
| Out-of-place | O(n) | O(n) | Need original data |
| Recursive | O(n) | O(n) | Simpler code |
| Iterative | O(n) | O(1) | Less space |

---

## Quick Summary

| What to Count | Space |
|---------------|-------|
| Simple variables | O(1) |
| New array of size n | O(n) |
| 2D array n×n | O(n²) |
| Recursion depth | O(depth) |
| Hash map with n keys | O(n) |

⚡ **Remember:**
- Iterative usually beats recursive for space
- In-place = less memory, but original data is lost
- Sometimes trading space for time is worth it (memoization)

> **One-liner:** Space = variables + new arrays + recursion stack. In-place = O(1), copy = O(n), recursion = O(depth).
`,

  contentFa: `
# پیچیدگی فضایی - چقدر حافظه می‌گیره؟

## پیچیدگی فضایی چیست؟ (توضیح ساده)

تصور کن داری اسباب‌کشی می‌کنی. پیچیدگی فضایی می‌گه: "برای n تا جعبه، چند تا کامیون لازمه؟"

**اینطوری فکر کن:**
- مثل اندازه کیف مدرسه‌ات!
- هر چی بیشتر ذخیره کنی، حافظه بیشتری می‌گیره
- گاهی می‌تونی با کمتر کار کنی (درجا)

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** اپ موبایلت ۵۰۰ مگ رم داره. اگه الگوریتمت O(n²) فضا بگیره:
- ۱۰۰۰ آیتم = ۱ میلیون واحد حافظه 💥
- اپ کرش می‌کنه!

| سناریو | O(1) | O(n) | O(n²) |
|--------|------|------|-------|
| ۱۰۰ آیتم | ۱ | ۱۰۰ | ۱۰,۰۰۰ |
| ۱۰,۰۰۰ آیتم | ۱ | ۱۰,۰۰۰ | ۱۰۰,۰۰۰,۰۰۰ 💥 |

**در مصاحبه:** "پیچیدگی فضایی چیه؟" سوال دوم بعد از زمانه!

---

## جدول مرجع سریع

| پیچیدگی | توضیح | مثال زندگی واقعی |
|---------|-------|------------------|
| O(1) | ثابت | یه کیف دستی - همیشه همون اندازه |
| O(n) | خطی | یه کامیون - هر چی جعبه بیشتر، جا بیشتر |
| O(n²) | درجه دوم | یه انبار - جعبه‌ها رو روی هم بچین |
| O(log n) | لگاریتمی | پله‌های بازگشت - هر بار نصف |

---

## مثال‌های کاربردی

### O(1) - فضای ثابت (بهترین!)
\`\`\`javascript
function sum(arr) {
    let total = 0;  // فقط یه متغیر!
    
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];  // جمع می‌کنیم، ذخیره نمی‌کنیم
    }
    
    return total;
}
// ۱۰ آیتم؟ یه متغیر
// ۱ میلیون آیتم؟ هنوز یه متغیر!
\`\`\`

**مثل:** شمردن پول. فقط یه عدد تو ذهنت نگه می‌داری!

---

### O(n) - فضای خطی
\`\`\`javascript
function double(arr) {
    const result = [];  // آرایه جدید!
    
    for (let num of arr) {
        result.push(num * 2);  // هر آیتم رو ذخیره می‌کنیم
    }
    
    return result;
}
// ۱۰ آیتم ورودی = ۱۰ آیتم خروجی
// n آیتم = n فضا
\`\`\`

**مثل:** فتوکپی کردن. هر صفحه یه کپی می‌خواد!

---

### O(n) - پشته بازگشت (مخفی!)
\`\`\`javascript
function factorial(n) {
    // شرط پایه
    if (n <= 1) return 1;
    
    // هر فراخوانی روی پشته می‌مونه!
    return n * factorial(n - 1);
}
// factorial(5):
// پشته: [5] → [5,4] → [5,4,3] → [5,4,3,2] → [5,4,3,2,1]
// ۵ فراخوانی = O(5) = O(n) فضا!
\`\`\`

**هشدار:** بازگشت = فضای پنهان!

---

### O(log n) - جستجوی دودویی بازگشتی
\`\`\`javascript
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);  // نیمه راست
    }
    return binarySearch(arr, target, left, mid - 1);       // نیمه چپ
}
// هر بار نصف می‌کنیم
// ۱,۰۰۰ آیتم → ~۱۰ فراخوانی روی پشته
// ۱,۰۰۰,۰۰۰ آیتم → ~۲۰ فراخوانی روی پشته
\`\`\`

---

## درجا vs خارج از جا

### درجا (In-Place) - O(1) فضای اضافی
\`\`\`javascript
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // جابجایی بدون آرایه جدید
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;  // همون آرایه، معکوس شده
}
// فقط ۲ متغیر اضافی!
// آرایه اصلی تغییر می‌کنه
\`\`\`

**مزیت:** حافظه کم | **عیب:** داده اصلی از بین می‌ره

---

### خارج از جا (Out-of-Place) - O(n) فضای اضافی
\`\`\`javascript
function reverseOutOfPlace(arr) {
    const result = [];  // آرایه جدید
    
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i]);
    }
    
    return result;  // آرایه جدید
}
// یا ساده‌تر:
// return [...arr].reverse();
\`\`\`

**مزیت:** داده اصلی حفظ می‌شه | **عیب:** حافظه بیشتر

---

## اشتباهات رایج

### ۱. فراموش کردن پشته بازگشت
❌ اشتباه:
\`\`\`javascript
// فکر می‌کنی O(1) فضاست؟
function recursiveSum(arr, i = 0) {
    if (i >= arr.length) return 0;
    return arr[i] + recursiveSum(arr, i + 1);
}
// نه! O(n) فضا به خاطر پشته فراخوانی!
\`\`\`

✅ درست: بازگشت = فضای پشته. همیشه حسابش کن!

---

### ۲. نادیده گرفتن فضای موقت
❌ اشتباه:
\`\`\`javascript
function sortAndFind(arr, target) {
    arr.sort((a, b) => a - b);  // sort() معمولاً O(n) فضا می‌گیره!
    return binarySearch(arr, target);
}
// فکر می‌کنی O(1)؟ نه! O(n) به خاطر sort!
\`\`\`

✅ درست: متدهای داخلی هم فضا می‌گیرن!

---

### ۳. اشتباه در آرایه‌های دوبعدی
❌ اشتباه:
\`\`\`javascript
// این O(n) فضا نیست!
const matrix = [];
for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
}
// n × n = O(n²) فضا!
\`\`\`

✅ درست: آرایه n×n = O(n²) فضا

---

---

## کی استفاده کنیم

**درجا (O(1)) استفاده کن وقتی:**
- حافظه محدوده (موبایل، embedded)
- داده اصلی لازم نیست
- سرعت مهم‌تره

**خارج از جا (O(n)) استفاده کن وقتی:**
- داده اصلی باید حفظ بشه
- خوانایی کد مهم‌تره
- حافظه کافی داری

---

## جدول مقایسه

| رویکرد | زمان | فضا | کی استفاده کنیم |
|--------|------|-----|-----------------|
| درجا | O(n) | O(1) | حافظه محدود |
| خارج از جا | O(n) | O(n) | داده اصلی لازمه |
| بازگشتی | O(n) | O(n) | کد ساده‌تر |
| تکراری | O(n) | O(1) | فضای کمتر |

---

## خلاصه سریع

| چی بشماریم | فضا |
|------------|-----|
| متغیرهای ساده | O(1) |
| آرایه جدید به اندازه n | O(n) |
| آرایه دوبعدی n×n | O(n²) |
| عمق بازگشت | O(عمق) |
| هش مپ با n کلید | O(n) |

⚡ **به یاد داشته باش:**
- تکراری معمولاً از بازگشتی برای فضا بهتره
- درجا = حافظه کمتر، ولی داده اصلی از بین می‌ره
- گاهی معامله فضا با زمان ارزشش رو داره (memoization)

> **یک خطی:** فضا = متغیرها + آرایه‌های جدید + پشته بازگشت. درجا = O(1)، کپی = O(n)، بازگشت = O(عمق).
`,

  visualizationId: null,
  exerciseId: 'space-complexity',
};

export default spaceComplexityLesson;
