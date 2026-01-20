export const monotonicStackLesson = {
  id: 'monotonic-stack',
  title: 'Monotonic Stack',
  titleFa: 'پشته یکنوا',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Monotonic Stack - Finding Next Greater/Smaller Elements

## What is a Monotonic Stack?

Imagine you're standing in a line of people of different heights. You want to know: "Who is the first person taller than me ahead in line?" A monotonic stack helps answer this efficiently!

**Think of it like:** A stack that maintains elements in sorted order (always increasing or always decreasing).

**Real-life examples:**
- Stock prices: "When will the price be higher than today?"
- Weather: "How many days until a warmer day?"
- Buildings: "Which building blocks my view?"

---

## Why Should You Care?

- Solves "next greater/smaller element" problems in O(n)
- Without it: O(n²) brute force
- Common in interviews (15%+ of stack problems)
- Key technique for histogram and temperature problems

---

## The Core Pattern

\`\`\`javascript
// Monotonic DECREASING stack (for next GREATER element)
function nextGreater(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];  // Store indices, not values!
    
    for (let i = 0; i < nums.length; i++) {
        // Pop smaller elements - current is their "next greater"
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

// [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]
// 2's next greater is 4
// 1's next greater is 2
// 4 has no next greater → -1
\`\`\`

**How it works:**
\`\`\`
i=0: stack=[], push 0 → stack=[0]
i=1: 1 < 2, push 1 → stack=[0,1]
i=2: 2 > 1, pop 1, result[1]=2, push 2 → stack=[0,2]
i=3: 4 > 2, pop 2, result[2]=4
     4 > 2, pop 0, result[0]=4, push 3 → stack=[3]
i=4: 3 < 4, push 4 → stack=[3,4]
Result: [4, 2, 4, -1, -1]
\`\`\`

---

## Classic Problem: Daily Temperatures

"How many days until a warmer day?"

\`\`\`javascript
function dailyTemperatures(temps) {
    const result = new Array(temps.length).fill(0);
    const stack = [];  // indices of days waiting for warmer day
    
    for (let i = 0; i < temps.length; i++) {
        // Current temp is warmer than days in stack
        while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
            const waitingDay = stack.pop();
            result[waitingDay] = i - waitingDay;  // Days waited
        }
        stack.push(i);
    }
    return result;
}

// [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]
// Day 0 (73°): wait 1 day for 74°
// Day 2 (75°): wait 4 days for 76°
\`\`\`

---

## Largest Rectangle in Histogram

The hardest monotonic stack problem - but very common!

\`\`\`javascript
function largestRectangleArea(heights) {
    const stack = [];  // indices of bars
    let maxArea = 0;
    heights.push(0);  // Sentinel to flush remaining bars
    
    for (let i = 0; i < heights.length; i++) {
        // Current bar is shorter - calculate areas for taller bars
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    
    return maxArea;
}

// [2,1,5,6,2,3] → 10 (rectangle of height 5, width 2)
\`\`\`

---

## Two Types of Monotonic Stacks

| Type | Stack Order | Finds | Pop When |
|------|-------------|-------|----------|
| Decreasing | Large → Small | Next Greater | curr > top |
| Increasing | Small → Large | Next Smaller | curr < top |

\`\`\`javascript
// Next SMALLER element (monotonic INCREASING stack)
function nextSmaller(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] < nums[stack[stack.length - 1]]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}
\`\`\`

---

## Common Mistakes

### 1. Storing Values Instead of Indices
\`\`\`javascript
// ❌ WRONG - can't calculate distances
stack.push(nums[i]);

// ✅ CORRECT - store indices
stack.push(i);
// Access value with nums[stack[stack.length - 1]]
\`\`\`

### 2. Wrong Comparison Direction
\`\`\`javascript
// ❌ WRONG for next greater
while (nums[i] < nums[stack.top])  // This finds next smaller!

// ✅ CORRECT for next greater
while (nums[i] > nums[stack[stack.length - 1]])
\`\`\`

### 3. Forgetting Remaining Elements
\`\`\`javascript
// ❌ WRONG - elements left in stack have no answer
// Just return result

// ✅ CORRECT - they have no next greater, already -1 from initialization
// Or add sentinel value to flush stack
\`\`\`

---

## When to Use Monotonic Stack

**Use when you see:**
- "Next greater/smaller element"
- "Days until warmer/colder"
- "First element to the right that is larger/smaller"
- "Largest rectangle in histogram"
- "Trapping rain water"

**Pattern recognition:**
- Looking for relationship between current and future elements
- Need O(n) instead of O(n²)
- "First X to the right/left"

---

## Interview Tips

- Always store **indices**, not values
- Initialize result array with -1 or 0
- Decreasing stack → next greater, Increasing stack → next smaller
- Add sentinel (0 or ∞) to handle remaining elements
- "I'll use a monotonic stack to find next greater elements in O(n)"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(n) - each element pushed/popped once |
| Space | O(n) |
| Best For | Next greater/smaller, histograms |
| Key Insight | Stack maintains candidates, pop when answer found |

> **One-liner:** Monotonic stack finds next greater/smaller in O(n) by maintaining sorted order and popping when we find the answer.
`,

  contentFa: `
# پشته یکنوا - پیدا کردن عنصر بزرگتر/کوچکتر بعدی

## پشته یکنوا چیست؟

تصور کن توی صف آدم‌هایی با قدهای مختلف ایستادی. می‌خوای بدونی: "اولین نفری که از من بلندتره کیه؟" پشته یکنوا این رو سریع جواب می‌ده!

**مثل این فکر کن:** پشته‌ای که عناصر رو به ترتیب مرتب نگه می‌داره (همیشه صعودی یا همیشه نزولی).

**مثال‌های زندگی واقعی:**
- قیمت سهام: "کی قیمت از امروز بیشتر می‌شه؟"
- آب و هوا: "چند روز تا روز گرم‌تر؟"
- ساختمان‌ها: "کدوم ساختمان دیدم رو می‌بنده؟"

---

## چرا باید اهمیت بدی؟

- مسائل "عنصر بزرگتر/کوچکتر بعدی" رو در O(n) حل می‌کنه
- بدونش: O(n²) brute force
- رایج در مصاحبه‌ها (15%+ مسائل پشته)

---

## الگوی اصلی

\`\`\`javascript
// پشته نزولی (برای عنصر بزرگتر بعدی)
function nextGreater(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];  // اندیس‌ها رو ذخیره کن، نه مقادیر!
    
    for (let i = 0; i < nums.length; i++) {
        // عناصر کوچکتر رو pop کن - فعلی "بزرگتر بعدی" اوناست
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

// [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]
\`\`\`

---

## مسئله کلاسیک: دمای روزانه

"چند روز تا روز گرم‌تر؟"

\`\`\`javascript
function dailyTemperatures(temps) {
    const result = new Array(temps.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < temps.length; i++) {
        while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
            const waitingDay = stack.pop();
            result[waitingDay] = i - waitingDay;
        }
        stack.push(i);
    }
    return result;
}
\`\`\`

---

## بزرگترین مستطیل در هیستوگرام

\`\`\`javascript
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    heights.push(0);  // نگهبان برای خالی کردن باقی‌مانده
    
    for (let i = 0; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    
    return maxArea;
}
\`\`\`

---

## دو نوع پشته یکنوا

| نوع | ترتیب پشته | پیدا می‌کنه | Pop کن وقتی |
|-----|-----------|------------|-------------|
| نزولی | بزرگ → کوچک | بزرگتر بعدی | curr > top |
| صعودی | کوچک → بزرگ | کوچکتر بعدی | curr < top |

---

## اشتباهات رایج

### ۱. ذخیره مقادیر به جای اندیس‌ها
\`\`\`javascript
// ❌ اشتباه - نمی‌تونی فاصله حساب کنی
stack.push(nums[i]);

// ✅ درست - اندیس‌ها رو ذخیره کن
stack.push(i);
\`\`\`

### ۲. جهت مقایسه اشتباه
\`\`\`javascript
// ❌ اشتباه برای بزرگتر بعدی
while (nums[i] < nums[stack.top])

// ✅ درست برای بزرگتر بعدی
while (nums[i] > nums[stack[stack.length - 1]])
\`\`\`

---

## کی از پشته یکنوا استفاده کنیم

**استفاده کن وقتی می‌بینی:**
- "عنصر بزرگتر/کوچکتر بعدی"
- "روزها تا گرم‌تر/سردتر"
- "بزرگترین مستطیل در هیستوگرام"

**تشخیص الگو:**
- دنبال رابطه بین عنصر فعلی و آینده
- نیاز به O(n) به جای O(n²)

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان | O(n) - هر عنصر یک بار push/pop می‌شه |
| فضا | O(n) |
| بهترین برای | بزرگتر/کوچکتر بعدی، هیستوگرام |

> **یک خطی:** پشته یکنوا بزرگتر/کوچکتر بعدی رو در O(n) پیدا می‌کنه با نگه داشتن ترتیب مرتب و pop کردن وقتی جواب پیدا شد.
`,

  visualizationId: 'monotonic-stack',
  exerciseId: 'monotonic-stack',
};

export default monotonicStackLesson;