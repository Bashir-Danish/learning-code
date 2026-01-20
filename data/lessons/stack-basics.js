export const stackBasicsLesson = {
  id: 'stack-basics',
  title: 'Stack Basics',
  titleFa: 'مبانی پشته',
  difficulty: 'easy',
  estimatedTime: '40 min',
  
  content: `
# Stack - The LIFO Champion

## What is a Stack?

Imagine a stack of plates in a cafeteria. You can only:
- Put a new plate on **top**
- Take a plate from **top**

That's a stack! Last In, First Out (LIFO).

**Real-life examples:**
- Undo/Redo in text editors (last action undone first)
- Browser back button (last page visited first)
- Call stack in programming (last function called returns first)

---

## Why Should You Care?

- Foundation for recursion and function calls
- Essential for parsing expressions (compilers)
- Key pattern in 15%+ of coding interviews
- Simple but powerful - solves complex problems elegantly

---

## Stack Operations

| Operation | What it does | Time |
|-----------|--------------|------|
| push(x) | Add to top | O(1) |
| pop() | Remove from top | O(1) |
| peek()/top() | Look at top | O(1) |
| isEmpty() | Check if empty | O(1) |

\`\`\`javascript
// Using array as stack
const stack = [];

stack.push(1);        // [1]
stack.push(2);        // [1, 2]
stack.push(3);        // [1, 2, 3]

stack[stack.length-1] // 3 (peek)
stack.pop();          // 3, stack is now [1, 2]
stack.pop();          // 2, stack is now [1]
stack.length === 0    // false (not empty)
\`\`\`

---

## Classic Problem: Valid Parentheses

The most common stack interview question!

\`\`\`javascript
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in pairs) {
            // Closing bracket - must match top of stack
            if (stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            // Opening bracket - push to stack
            stack.push(char);
        }
    }
    
    return stack.length === 0;  // All brackets matched?
}

// Examples:
isValid("()[]{}");   // true
isValid("([)]");     // false - wrong order
isValid("((()))")    // true
isValid("(]");       // false - mismatch
\`\`\`

**How it works:**
\`\`\`
Input: "([{}])"

'(' → push → stack: ['(']
'[' → push → stack: ['(', '[']
'{' → push → stack: ['(', '[', '{']
'}' → pop '{', matches → stack: ['(', '[']
']' → pop '[', matches → stack: ['(']
')' → pop '(', matches → stack: []

Stack empty → Valid!
\`\`\`

---

## Min Stack - O(1) getMin()

Design a stack that supports getMin() in O(1) time.

\`\`\`javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];  // Track minimums
    }
    
    push(val) {
        this.stack.push(val);
        // Push to minStack if empty or val <= current min
        const min = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// Usage:
const ms = new MinStack();
ms.push(3);  // stack: [3], min: [3]
ms.push(1);  // stack: [3,1], min: [3,1]
ms.push(2);  // stack: [3,1,2], min: [3,1,1]
ms.getMin(); // 1
ms.pop();    // stack: [3,1], min: [3,1]
ms.getMin(); // 1
\`\`\`

---

## Evaluate Reverse Polish Notation

\`\`\`javascript
function evalRPN(tokens) {
    const stack = [];
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (let token of tokens) {
        if (token in ops) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(ops[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }
    
    return stack[0];
}

// ["2","1","+","3","*"] = ((2+1)*3) = 9
\`\`\`

---

## Common Mistakes

### 1. Popping Empty Stack
\`\`\`javascript
// ❌ WRONG - crashes on empty
stack.pop();

// ✅ CORRECT - check first
if (stack.length > 0) stack.pop();
// or
const val = stack.pop() ?? defaultValue;
\`\`\`

### 2. Wrong Order in Parentheses
\`\`\`javascript
// ❌ WRONG - comparing wrong things
if (char === pairs[stack.pop()])  // pairs maps closing→opening

// ✅ CORRECT - pop should equal expected opening
if (stack.pop() !== pairs[char])
\`\`\`

### 3. Forgetting Final Check
\`\`\`javascript
// ❌ WRONG - "((" would return true
return true;

// ✅ CORRECT - stack must be empty
return stack.length === 0;
\`\`\`

---

## When to Use Stack

**Use stack when:**
- Need LIFO order
- Matching pairs (parentheses, tags)
- Reversing things
- Tracking "most recent" state
- DFS traversal (iterative)
- Expression evaluation
- Undo functionality

**Pattern recognition:**
- "Match opening with closing" → Stack
- "Most recent first" → Stack
- "Nested structure" → Stack

---

## Interview Tips

- Valid parentheses is THE classic stack problem
- For "design" questions, think about what extra info to track (like MinStack)
- Stack + recursion are interchangeable (call stack IS a stack)
- "I'll use a stack because I need LIFO - last opened bracket should close first"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Order | LIFO (Last In First Out) |
| Operations | push, pop, peek - all O(1) |
| Space | O(n) |
| Best For | Matching pairs, undo, DFS |

> **One-liner:** Stack = LIFO. Push to add, pop to remove, always from top. Perfect for matching brackets and tracking "most recent" state.
`,

  contentFa: `
# پشته - قهرمان LIFO

## پشته چیست؟

تصور کن یه پشته بشقاب توی کافه‌تریا. فقط می‌تونی:
- بشقاب جدید رو **روی** بذاری
- بشقاب رو از **روی** برداری

این پشته‌ست! آخرین ورودی، اولین خروجی (LIFO).

**مثال‌های زندگی واقعی:**
- Undo/Redo در ویرایشگر متن (آخرین عمل اول برگردونده می‌شه)
- دکمه برگشت مرورگر (آخرین صفحه بازدید شده اول)
- پشته فراخوانی در برنامه‌نویسی (آخرین تابع فراخوانی شده اول برمی‌گرده)

---

## چرا باید اهمیت بدی؟

- پایه بازگشت و فراخوانی توابع
- ضروری برای تجزیه عبارات (کامپایلرها)
- الگوی کلیدی در 15%+ مصاحبه‌های کدنویسی
- ساده ولی قدرتمند

---

## عملیات پشته

| عملیات | چیکار می‌کنه | زمان |
|--------|-------------|------|
| push(x) | اضافه به بالا | O(1) |
| pop() | حذف از بالا | O(1) |
| peek() | نگاه به بالا | O(1) |
| isEmpty() | بررسی خالی بودن | O(1) |

\`\`\`javascript
const stack = [];

stack.push(1);        // [1]
stack.push(2);        // [1, 2]
stack.push(3);        // [1, 2, 3]

stack[stack.length-1] // 3 (peek)
stack.pop();          // 3، پشته الان [1, 2]
\`\`\`

---

## مسئله کلاسیک: پرانتزهای معتبر

\`\`\`javascript
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in pairs) {
            if (stack.pop() !== pairs[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}
\`\`\`

---

## پشته با کمینه - getMin() در O(1)

\`\`\`javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        const min = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
\`\`\`

---

## اشتباهات رایج

### ۱. Pop کردن پشته خالی
\`\`\`javascript
// ❌ اشتباه - روی خالی کرش می‌کنه
stack.pop();

// ✅ درست - اول چک کن
if (stack.length > 0) stack.pop();
\`\`\`

### ۲. فراموش کردن چک نهایی
\`\`\`javascript
// ❌ اشتباه - "((" برمی‌گردونه true
return true;

// ✅ درست - پشته باید خالی باشه
return stack.length === 0;
\`\`\`

---

## کی از پشته استفاده کنیم

**استفاده کن وقتی:**
- ترتیب LIFO لازمه
- جفت کردن (پرانتزها، تگ‌ها)
- برعکس کردن چیزها
- پیگیری "جدیدترین" وضعیت
- پیمایش DFS (تکراری)

**تشخیص الگو:**
- "جفت کردن باز با بسته" → پشته
- "جدیدترین اول" → پشته
- "ساختار تودرتو" → پشته

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| ترتیب | LIFO (آخرین ورودی اولین خروجی) |
| عملیات | push, pop, peek - همه O(1) |
| فضا | O(n) |
| بهترین برای | جفت کردن، undo، DFS |

> **یک خطی:** پشته = LIFO. Push برای اضافه، pop برای حذف، همیشه از بالا. عالی برای جفت کردن پرانتزها و پیگیری "جدیدترین" وضعیت.
`,

  visualizationId: 'stack',
  exerciseId: 'stack-basics',
};

export default stackBasicsLesson;