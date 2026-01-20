export const hashTableBasicsLesson = {
  id: 'hash-table-basics',
  title: 'Hash Table Basics',
  titleFa: 'مبانی جدول هش',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# Hash Table - Your Data's Speed Dial

## What is a Hash Table?

Imagine a library with millions of books. Instead of searching shelf by shelf, you have a magic system: tell it the book title, and it instantly tells you the exact shelf and position. That's a hash table!

**Think of it like:**
- A phone's contact list - type a name, get the number instantly
- A dictionary - look up a word, find its meaning directly
- A coat check - give your ticket number, get your coat immediately

---

## Why Should You Care?

- **O(1) average time** for insert, delete, and search!
- Most used data structure in real-world applications
- Foundation for databases, caches, and symbol tables
- Essential for coding interviews (appears in 30%+ of problems)

---

## How Does It Work?

### The Magic: Hash Function

A hash function converts any key into an array index:

\`\`\`
"apple" → hash("apple") → 42 → store at index 42
"banana" → hash("banana") → 17 → store at index 17
\`\`\`

**Step by step:**
1. Take a key (like "john@email.com")
2. Run it through hash function → get number (like 2847)
3. Use modulo to fit array size: 2847 % 100 = 47
4. Store/retrieve value at index 47

---

## JavaScript: Map vs Object

### Using Map (Recommended)
\`\`\`javascript
const map = new Map();

// Basic operations
map.set('name', 'John');     // Insert: O(1)
map.get('name');             // Lookup: O(1) → 'John'
map.has('name');             // Check: O(1) → true
map.delete('name');          // Delete: O(1)
map.size;                    // Size: O(1) → 0

// Map advantages
map.set(1, 'number key');    // Any type as key!
map.set({id: 1}, 'object key');
map.set(null, 'null key');

// Iteration (maintains insertion order)
for (let [key, value] of map) {
    console.log(key, value);
}
\`\`\`

### Using Object (Simple cases)
\`\`\`javascript
const obj = {};

obj['name'] = 'John';        // Insert
obj.name;                    // Lookup → 'John'
'name' in obj;               // Check → true
delete obj.name;             // Delete

// Object limitations
obj[1] = 'one';              // Key becomes string "1"
obj[{id:1}] = 'x';           // Key becomes "[object Object]" ❌
\`\`\`

### When to Use Which?

| Feature | Map | Object |
|---------|-----|--------|
| Key types | Any | String/Symbol only |
| Order | Insertion order | Not guaranteed |
| Size | map.size | Object.keys().length |
| Performance | Better for frequent add/delete | Better for static data |
| JSON | Need conversion | Direct support |

---

## Time Complexity

| Operation | Average | Worst Case |
|-----------|---------|------------|
| Insert | O(1) | O(n) |
| Delete | O(1) | O(n) |
| Search | O(1) | O(n) |
| Space | O(n) | O(n) |

**Why O(n) worst case?** When all keys hash to same index (collision). Good hash functions make this extremely rare.

---

## Common Patterns

### Pattern 1: Two Sum (Classic!)
\`\`\`javascript
function twoSum(nums, target) {
    const map = new Map();  // value → index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // Store current number
        map.set(nums[i], i);
    }
    return [];
}
// twoSum([2,7,11,15], 9) → [0,1] (2+7=9)
\`\`\`

### Pattern 2: Frequency Counter
\`\`\`javascript
function countFrequency(arr) {
    const freq = new Map();
    
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}
// countFrequency(['a','b','a','c','a']) → Map{'a':3, 'b':1, 'c':1}
\`\`\`

### Pattern 3: Check Duplicates
\`\`\`javascript
function hasDuplicate(arr) {
    const seen = new Set();  // Set is hash table for unique values
    
    for (let item of arr) {
        if (seen.has(item)) return true;
        seen.add(item);
    }
    return false;
}
// O(n) vs O(n²) with nested loops!
\`\`\`

---

## Common Mistakes

### 1. Using Object for Non-String Keys
\`\`\`javascript
// ❌ WRONG - objects as keys don't work
const obj = {};
obj[{id: 1}] = 'user1';
obj[{id: 2}] = 'user2';
console.log(Object.keys(obj)); // ['[object Object]'] - only 1 key!

// ✅ CORRECT - use Map
const map = new Map();
map.set({id: 1}, 'user1');
map.set({id: 2}, 'user2');
console.log(map.size); // 2
\`\`\`

### 2. Forgetting Default Values
\`\`\`javascript
// ❌ WRONG - undefined + 1 = NaN
map.set(key, map.get(key) + 1);

// ✅ CORRECT - provide default
map.set(key, (map.get(key) || 0) + 1);
\`\`\`

### 3. Modifying While Iterating
\`\`\`javascript
// ❌ WRONG - unpredictable behavior
for (let [k, v] of map) {
    if (v < 0) map.delete(k);
}

// ✅ CORRECT - collect keys first
const toDelete = [];
for (let [k, v] of map) {
    if (v < 0) toDelete.push(k);
}
toDelete.forEach(k => map.delete(k));
\`\`\`

---

## Interview Tips

- "Hash table gives O(1) lookup - perfect for reducing O(n²) to O(n)"
- "I'll use a Map to store seen values and check in constant time"
- "Trade space for time: O(n) extra space for O(1) lookups"
- Know when to use Map vs Set vs Object
- Always consider: "Can a hash table help here?"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (avg) | O(1) insert/delete/search |
| Space | O(n) |
| Best For | Fast lookups, counting, deduplication |
| JS Choice | Map (flexible) or Object (simple) |

> **One-liner:** Hash table = instant lookup by converting keys to array indices. Use Map for flexibility, Object for simplicity.
`,

  contentFa: `
# جدول هش - شماره‌گیر سریع داده‌هات

## جدول هش چیست؟

تصور کن یه کتابخونه با میلیون‌ها کتاب داری. به جای گشتن قفسه به قفسه، یه سیستم جادویی داری: اسم کتاب رو بگو، فوری قفسه و موقعیت دقیق رو بهت می‌گه. این جدول هش هست!

**مثل این می‌مونه:**
- لیست مخاطبین گوشی - اسم رو تایپ کن، شماره رو فوری بگیر
- دیکشنری - کلمه رو پیدا کن، معنی رو مستقیم ببین
- رختکن - شماره بلیطت رو بده، کتت رو فوری بگیر

---

## چرا باید اهمیت بدی؟

- **زمان O(1) میانگین** برای درج، حذف و جستجو!
- پراستفاده‌ترین ساختار داده در برنامه‌های واقعی
- پایه دیتابیس‌ها، کش‌ها و جدول نمادها
- ضروری برای مصاحبه‌های کدنویسی (30%+ سوالات)

---

## چطور کار می‌کنه؟

### جادو: تابع هش

تابع هش هر کلید رو به اندیس آرایه تبدیل می‌کنه:

\`\`\`
"apple" → hash("apple") → 42 → ذخیره در اندیس 42
"banana" → hash("banana") → 17 → ذخیره در اندیس 17
\`\`\`

**قدم به قدم:**
1. یه کلید بگیر (مثل "john@email.com")
2. از تابع هش رد کن → عدد بگیر (مثل 2847)
3. با modulo به اندازه آرایه برسون: 2847 % 100 = 47
4. مقدار رو در اندیس 47 ذخیره/بازیابی کن

---

## جاوااسکریپت: Map در مقابل Object

### استفاده از Map (توصیه می‌شه)
\`\`\`javascript
const map = new Map();

// عملیات پایه
map.set('name', 'John');     // درج: O(1)
map.get('name');             // جستجو: O(1) → 'John'
map.has('name');             // بررسی: O(1) → true
map.delete('name');          // حذف: O(1)
map.size;                    // اندازه: O(1) → 0

// مزایای Map
map.set(1, 'number key');    // هر نوعی به عنوان کلید!
map.set({id: 1}, 'object key');

// پیمایش (ترتیب درج حفظ می‌شه)
for (let [key, value] of map) {
    console.log(key, value);
}
\`\`\`

### استفاده از Object (موارد ساده)
\`\`\`javascript
const obj = {};

obj['name'] = 'John';        // درج
obj.name;                    // جستجو → 'John'
'name' in obj;               // بررسی → true
delete obj.name;             // حذف

// محدودیت‌های Object
obj[1] = 'one';              // کلید می‌شه رشته "1"
obj[{id:1}] = 'x';           // کلید می‌شه "[object Object]" ❌
\`\`\`

---

## پیچیدگی زمانی

| عملیات | میانگین | بدترین حالت |
|--------|---------|-------------|
| درج | O(1) | O(n) |
| حذف | O(1) | O(n) |
| جستجو | O(1) | O(n) |

**چرا O(n) بدترین حالت؟** وقتی همه کلیدها به یه اندیس هش بشن (برخورد). تابع هش خوب این رو خیلی نادر می‌کنه.

---

## الگوهای رایج

### الگو ۱: Two Sum (کلاسیک!)
\`\`\`javascript
function twoSum(nums, target) {
    const map = new Map();  // مقدار → اندیس
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // چک کن مکمل وجود داره
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // عدد فعلی رو ذخیره کن
        map.set(nums[i], i);
    }
    return [];
}
\`\`\`

### الگو ۲: شمارنده فراوانی
\`\`\`javascript
function countFrequency(arr) {
    const freq = new Map();
    
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}
\`\`\`

### الگو ۳: بررسی تکراری
\`\`\`javascript
function hasDuplicate(arr) {
    const seen = new Set();
    
    for (let item of arr) {
        if (seen.has(item)) return true;
        seen.add(item);
    }
    return false;
}
// O(n) در مقابل O(n²) با حلقه‌های تودرتو!
\`\`\`

---

## اشتباهات رایج

### ۱. استفاده از Object برای کلیدهای غیررشته‌ای
\`\`\`javascript
// ❌ اشتباه - آبجکت‌ها به عنوان کلید کار نمی‌کنن
const obj = {};
obj[{id: 1}] = 'user1';
obj[{id: 2}] = 'user2';
// فقط 1 کلید! "[object Object]"

// ✅ درست - از Map استفاده کن
const map = new Map();
map.set({id: 1}, 'user1');
map.set({id: 2}, 'user2');
\`\`\`

### ۲. فراموش کردن مقدار پیش‌فرض
\`\`\`javascript
// ❌ اشتباه - undefined + 1 = NaN
map.set(key, map.get(key) + 1);

// ✅ درست - مقدار پیش‌فرض بده
map.set(key, (map.get(key) || 0) + 1);
\`\`\`

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| زمان (میانگین) | O(1) درج/حذف/جستجو |
| فضا | O(n) |
| بهترین برای | جستجوی سریع، شمارش، حذف تکراری |
| انتخاب JS | Map (انعطاف‌پذیر) یا Object (ساده) |

> **یک خطی:** جدول هش = جستجوی فوری با تبدیل کلیدها به اندیس آرایه. Map برای انعطاف، Object برای سادگی.
`,

  visualizationId: 'hash-table',
  exerciseId: 'hash-table-basics',
};

export default hashTableBasicsLesson;
