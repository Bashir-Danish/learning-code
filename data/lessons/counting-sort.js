export const countingSortLesson = {
  id: 'counting-sort',
  title: 'Counting Sort',
  titleFa: 'مرتب‌سازی شمارشی',
  difficulty: 'medium',
  estimatedTime: '35 min',
  
  content: `
# Counting Sort - The Non-Comparison Champion

## What is Counting Sort?

Imagine counting votes in an election. You don't compare votes - you just count how many each candidate got, then list them in order. That's Counting Sort!

**Think of it like this:** Count occurrences of each value, then reconstruct the sorted array from counts.

---

## Why Should You Care?

- **O(n + k) time** - faster than O(n log n) when k is small!
- **Not comparison-based** - breaks the O(n log n) lower bound
- **Stable** - preserves order of equal elements
- Foundation for **Radix Sort**
- Perfect for sorting integers in a known range

---

## Real-Life Analogies

### Counting Votes
Count votes for each candidate (0, 1, 2...). Candidate with 5 votes? Write their number 5 times. No comparing votes needed!

### Sorting Exam Scores
Students scored 0-100. Count how many got each score. Reconstruct: "3 students got 85, 2 got 90..." - sorted!

---

## How Does It Work?

1. **Count** occurrences of each element
2. **Cumulative sum** - tells final positions
3. **Place** elements in output array
4. (Iterate backwards for stability)

\`\`\`
Array: [4, 2, 2, 8, 3, 3, 1]  (range 1-8)

Step 1: Count occurrences
Index:  1  2  3  4  5  6  7  8
Count: [1, 2, 2, 1, 0, 0, 0, 1]

Step 2: Cumulative sum (positions)
Index:  1  2  3  4  5  6  7  8
Cumul: [1, 3, 5, 6, 6, 6, 6, 7]

Step 3: Place elements (backwards for stability)
Output: [1, 2, 2, 3, 3, 4, 8]
\`\`\`

---

## The Code

\`\`\`javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Step 1: Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Step 2: Cumulative count (positions)
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Step 3: Build output (backwards for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const idx = arr[i] - min;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    
    return output;
}

// Example
countingSort([4, 2, 2, 8, 3, 3, 1]);  // [1, 2, 2, 3, 3, 4, 8]
\`\`\`

### Simplified Version (Non-Stable)

\`\`\`javascript
function countingSortSimple(arr) {
    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    
    // Count
    for (const num of arr) count[num]++;
    
    // Reconstruct
    const result = [];
    for (let i = 0; i <= max; i++) {
        while (count[i]-- > 0) result.push(i);
    }
    return result;
}
// Simpler but NOT stable - can't sort objects by key
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| All | O(n + k) | O(n + k) | Count array + output array |

Where **k = range of input** (max - min + 1)

**When is it fast?**
- k ≤ n: O(n) - faster than any comparison sort!
- k >> n: O(k) - worse than O(n log n)

**Example:**
- Sort 1 million numbers in range 0-100: O(n) ✓
- Sort 100 numbers in range 0-1 million: O(k) ✗

---

## When to Use / When NOT to Use

### ✅ Use when:
- **Small range of integers** (k ≤ n)
- **Stability required**
- As subroutine in **Radix Sort**
- Sorting **grades, ages, small IDs**

### ❌ Don't use when:
- **Large range** (k >> n)
- **Floating point numbers**
- **Negative numbers** (need offset handling)
- **Memory constrained** (O(k) extra space)

---

## Common Mistakes

### 1. Not Handling Negative Numbers
\`\`\`javascript
// ❌ WRONG - negative index!
count[num]++;

// ✅ CORRECT - offset by minimum
const min = Math.min(...arr);
count[num - min]++;
\`\`\`

### 2. Forward Iteration (Breaks Stability)
\`\`\`javascript
// ❌ WRONG - not stable
for (let i = 0; i < arr.length; i++)

// ✅ CORRECT - backwards for stability
for (let i = arr.length - 1; i >= 0; i--)
\`\`\`

### 3. Wrong Output Index
\`\`\`javascript
// ❌ WRONG - off by one
output[count[idx]] = arr[i];

// ✅ CORRECT - count gives position, subtract 1 for index
output[count[idx] - 1] = arr[i];
count[idx]--;
\`\`\`

---

## Counting Sort vs Comparison Sorts

| Feature | Counting Sort | Quick/Merge Sort |
|---------|---------------|------------------|
| Time | O(n + k) | O(n log n) |
| When faster | k ≤ n | k >> n |
| Comparison-based | **No** | Yes |
| Stable | **Yes** | Merge: Yes |
| Works on | Integers | Anything |

**Key insight:** Counting Sort beats O(n log n) by not comparing elements!

---

## Interview Tips

- Know when **k ≤ n makes it O(n)**
- Explain **stability** (backwards iteration)
- Mention use in **Radix Sort**
- Handle **negative numbers** with offset
- Compare: "Counting Sort is O(n+k), faster than O(n log n) when range is small"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n + k) |
| Space | O(n + k) |
| Stable? | Yes |
| Comparison-based? | No |
| Best For | Small range integers |

> **One-liner:** Count occurrences, use cumulative sum for positions. O(n+k) beats O(n log n) when k is small!
`,

  contentFa: `
# مرتب‌سازی شمارشی - قهرمان غیرمقایسه‌ای

## مرتب‌سازی شمارشی چیست؟

تصور کن داری رأی‌ها رو توی انتخابات می‌شماری. رأی‌ها رو مقایسه نمی‌کنی - فقط می‌شماری هر کاندیدا چند تا گرفته، بعد به ترتیب لیست می‌کنی. این Counting Sort هست!

**اینطوری فکر کن:** تعداد هر مقدار رو بشمار، بعد آرایه مرتب رو از شمارش‌ها بازسازی کن.

---

## چرا باید اهمیت بدی؟

- **زمان O(n + k)** - سریع‌تر از O(n log n) وقتی k کوچیکه!
- **مبتنی بر مقایسه نیست** - حد پایین O(n log n) رو می‌شکنه
- **پایدار** - ترتیب عناصر مساوی حفظ می‌شه
- پایه **Radix Sort**
- عالی برای مرتب کردن اعداد صحیح در محدوده مشخص

---

## مثال‌های زندگی واقعی

### شمارش رأی
رأی‌های هر کاندیدا رو بشمار (0، 1، 2...). کاندیدایی که 5 رأی گرفته؟ شماره‌اش رو 5 بار بنویس. مقایسه رأی لازم نیست!

### مرتب کردن نمرات امتحان
دانش‌آموزها 0-100 گرفتن. بشمار چند نفر هر نمره رو گرفتن. بازسازی کن: "3 نفر 85 گرفتن، 2 نفر 90..." - مرتب شد!

---

## چطور کار می‌کنه؟

۱. تعداد هر عنصر رو **بشمار**
۲. **جمع تجمعی** - موقعیت‌های نهایی رو می‌گه
۳. عناصر رو توی آرایه خروجی **بذار**
۴. (برعکس iterate کن برای پایداری)

\`\`\`
آرایه: [4, 2, 2, 8, 3, 3, 1]  (محدوده 1-8)

قدم ۱: شمارش تعداد
اندیس: 1  2  3  4  5  6  7  8
شمارش: [1, 2, 2, 1, 0, 0, 0, 1]

قدم ۲: جمع تجمعی (موقعیت‌ها)
اندیس: 1  2  3  4  5  6  7  8
تجمعی: [1, 3, 5, 6, 6, 6, 6, 7]

قدم ۳: قرار دادن عناصر (برعکس برای پایداری)
خروجی: [1, 2, 2, 3, 3, 4, 8]
\`\`\`

---

## کد

\`\`\`javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // قدم ۱: شمارش تعداد
    for (const num of arr) {
        count[num - min]++;
    }
    
    // قدم ۲: شمارش تجمعی (موقعیت‌ها)
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // قدم ۳: ساخت خروجی (برعکس برای پایداری)
    for (let i = arr.length - 1; i >= 0; i--) {
        const idx = arr[i] - min;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
    }
    
    return output;
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| همه | O(n + k) | O(n + k) | آرایه شمارش + آرایه خروجی |

که **k = محدوده ورودی** (max - min + 1)

**کی سریعه?**
- k ≤ n: O(n) - سریع‌تر از هر مرتب‌سازی مقایسه‌ای!
- k >> n: O(k) - بدتر از O(n log n)

---

## کی استفاده کنیم / کی نکنیم

### ✅ استفاده کن:
- **محدوده کوچک اعداد صحیح** (k ≤ n)
- **پایداری لازمه**
- به عنوان زیرروال توی **Radix Sort**
- مرتب کردن **نمرات، سن‌ها، ID های کوچک**

### ❌ استفاده نکن:
- **محدوده بزرگ** (k >> n)
- **اعداد اعشاری**
- **حافظه محدود** (O(k) فضای اضافی)

---

## اشتباهات رایج

### ۱. هندل نکردن اعداد منفی
\`\`\`javascript
// ❌ اشتباه - اندیس منفی!
count[num]++;

// ✅ درست - با کمینه offset کن
const min = Math.min(...arr);
count[num - min]++;
\`\`\`

### ۲. Iteration جلو (پایداری رو خراب می‌کنه)
\`\`\`javascript
// ❌ اشتباه - پایدار نیست
for (let i = 0; i < arr.length; i++)

// ✅ درست - برعکس برای پایداری
for (let i = arr.length - 1; i >= 0; i--)
\`\`\`

---

## Counting Sort در مقابل مرتب‌سازی‌های مقایسه‌ای

| ویژگی | Counting Sort | Quick/Merge Sort |
|-------|---------------|------------------|
| زمان | O(n + k) | O(n log n) |
| کی سریع‌تره | k ≤ n | k >> n |
| مبتنی بر مقایسه | **نه** | بله |
| پایدار | **بله** | Merge: بله |

**نکته کلیدی:** Counting Sort از O(n log n) می‌زنه چون عناصر رو مقایسه نمی‌کنه!

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n + k) |
| فضا | O(n + k) |
| پایدار؟ | بله |
| مبتنی بر مقایسه؟ | نه |
| بهترین برای | اعداد صحیح با محدوده کوچک |

> **یک خطی:** تعداد رو بشمار، جمع تجمعی برای موقعیت‌ها استفاده کن. O(n+k) از O(n log n) می‌زنه وقتی k کوچیکه!
`,

  visualizationId: 'counting-sort',
  exerciseId: 'counting-sort',
};

export default countingSortLesson;
