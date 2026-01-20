export const stringsManipulationLesson = {
  id: 'strings-manipulation',
  title: 'String Manipulation',
  titleFa: 'دستکاری رشته',
  difficulty: 'easy',
  estimatedTime: '45 min',
  
  content: `
# String Manipulation - Working with Text

## What is a String? (Simple Explanation)

Think of a string like a pearl necklace - each pearl is a character, all arranged in order.

**Think of it like this:**
- String = array of characters
- But immutable! (you can't change a single character)
- Every operation creates a new string

---

## Why Should You Care?

**In interviews:** 20%+ of problems involve strings!

| Common Problem | Pattern |
|----------------|---------|
| Palindrome | Two Pointers |
| Anagram | Character Count |
| Substring | Sliding Window |
| Reverse | Two Pointers |

---

## Access Methods

\`\`\`javascript
const str = "Hello World";

// Character access
str[0];              // "H" - first character
str.charAt(0);       // "H" - same thing
str.at(-1);          // "d" - last character (new!)
str.length;          // 11 - string length

// Search
str.indexOf("o");    // 4 - where is first "o"?
str.lastIndexOf("o"); // 7 - where is last "o"?
str.indexOf("x");    // -1 - not found!

// Check existence
str.includes("World"); // true - does "World" exist?
str.startsWith("He"); // true - starts with "He"?
str.endsWith("ld");  // true - ends with "ld"?
\`\`\`

---

## Transform Methods

\`\`\`javascript
const str = "  Hello World  ";

// Case change
str.toLowerCase();   // "  hello world  "
str.toUpperCase();   // "  HELLO WORLD  "

// Remove extra spaces
str.trim();          // "Hello World"
str.trimStart();     // "Hello World  "
str.trimEnd();       // "  Hello World"

// Replace
"hello".replace("l", "L");     // "heLlo" - only first
"hello".replaceAll("l", "L");  // "heLLo" - all

// Split to array
"a,b,c".split(",");  // ["a", "b", "c"]
"hello".split("");   // ["h", "e", "l", "l", "o"]
\`\`\`

---

## Extract Methods

\`\`\`javascript
const str = "Hello World";

// slice(start, end) - end not included
str.slice(0, 5);     // "Hello"
str.slice(6);        // "World" - from 6 to end
str.slice(-5);       // "World" - last 5 chars

// substring(start, end) - like slice but no negatives
str.substring(0, 5); // "Hello"

// Tip: prefer slice because it accepts negatives
\`\`\`

---

## Common Interview Patterns

### 1. Reverse String

\`\`\`javascript
// Simple method
function reverseString(s) {
    return s.split('').reverse().join('');
}
// "hello" → ["h","e","l","l","o"] → ["o","l","l","e","h"] → "olleh"

// Two pointer method (for character array)
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // Swap
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
}
// ["h","e","l","l","o"] → ["o","l","l","e","h"]
\`\`\`

---

### 2. Check Palindrome

**Palindrome:** A string that reads the same forwards and backwards.
- "level" ✅
- "A man a plan a canal Panama" ✅ (ignoring spaces and punctuation)
- "hello" ❌

\`\`\`javascript
// Simple method
function isPalindrome(s) {
    // Only letters and numbers, all lowercase
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return s === s.split('').reverse().join('');
}

// Optimal with two pointers - O(n) time, O(1) space
function isPalindromeOptimal(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;  // They differ!
        }
        left++;
        right--;
    }
    
    return true;
}

// isPalindrome("A man, a plan, a canal: Panama") → true
\`\`\`

---

### 3. Character Counting

\`\`\`javascript
function charCount(s) {
    const count = {};
    
    for (let c of s) {
        count[c] = (count[c] || 0) + 1;
    }
    
    return count;
}

// charCount("hello")
// Output: { h: 1, e: 1, l: 2, o: 1 }

// Find first non-repeating character
function firstUnique(s) {
    const count = charCount(s);
    
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) {
            return i;  // Index of first unique
        }
    }
    
    return -1;  // All are repeating
}

// firstUnique("leetcode") → 0 (character 'l')
// firstUnique("aabb") → -1
\`\`\`

---

### 4. Check Anagram

**Anagram:** Two strings made from the same characters.
- "listen" and "silent" ✅
- "anagram" and "nagaram" ✅
- "hello" and "world" ❌

\`\`\`javascript
// Sorting method - O(n log n)
function isAnagram(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const sort = s => s.split('').sort().join('');
    return sort(s1) === sort(s2);
}

// Counting method - O(n) more optimal!
function isAnagramOptimal(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const count = {};
    
    // Count characters in s1
    for (let c of s1) {
        count[c] = (count[c] || 0) + 1;
    }
    
    // Subtract with characters in s2
    for (let c of s2) {
        if (!count[c]) return false;  // Extra character!
        count[c]--;
    }
    
    return true;
}

// isAnagram("anagram", "nagaram") → true
\`\`\`

---

## Common Mistakes

### 1. Forgetting Immutability
❌ Wrong:
\`\`\`javascript
let s = "hello";
s[0] = "H";  // Doesn't work!
console.log(s);  // Still "hello"
\`\`\`

✅ Correct:
\`\`\`javascript
let s = "hello";
s = "H" + s.slice(1);  // Create new string
console.log(s);  // "Hello"
\`\`\`

---

### 2. String Concatenation in Loop
❌ Wrong (O(n²)):
\`\`\`javascript
let result = "";
for (let i = 0; i < n; i++) {
    result += chars[i];  // New string each time!
}
\`\`\`

✅ Correct (O(n)):
\`\`\`javascript
const parts = [];
for (let i = 0; i < n; i++) {
    parts.push(chars[i]);
}
const result = parts.join('');
\`\`\`

---

### 3. Comparing with == instead of ===
❌ Wrong:
\`\`\`javascript
"5" == 5;   // true (type coercion!)
\`\`\`

✅ Correct:
\`\`\`javascript
"5" === 5;  // false (different types)
\`\`\`

---

## When to Use

**Use when:**
- Working with text
- Need to search or compare
- Processing user input

**Watch out:**
- Strings are immutable
- Concatenation in loops is slow
- Use arrays for many modifications

---

## Method Reference Table

| Method | Purpose | Time |
|--------|---------|------|
| \`str[i]\` | Character at index i | O(1) |
| \`indexOf(s)\` | First position of s | O(n) |
| \`includes(s)\` | Does s exist? | O(n) |
| \`slice(a, b)\` | Substring from a to b | O(n) |
| \`split(sep)\` | Split to array | O(n) |
| \`toLowerCase()\` | Lowercase | O(n) |
| \`replace(a, b)\` | Replace first | O(n) |
| \`trim()\` | Remove spaces | O(n) |

---

## Quick Summary

| Pattern | Use Case | Complexity |
|---------|----------|------------|
| Two Pointers | Palindrome, Reverse | O(n) |
| Counting | Anagram, Duplicates | O(n) |
| Sliding Window | Substring | O(n) |
| Hash Map | Fast lookup | O(1) |

> **One-liner:** Strings are immutable - for many changes, convert to array, modify, then join!
`,
  
  contentFa: `
# دستکاری رشته - کار با متن

## رشته چیست؟ (توضیح ساده)

تصور کن یه گردنبند مروارید - هر مروارید یه کاراکتره و همه به ترتیب کنار هم چیده شدن.

**اینطوری فکر کن:**
- رشته = آرایه‌ای از کاراکترها
- ولی تغییرناپذیره! (نمی‌تونی یه کاراکتر رو عوض کنی)
- هر عملیات یه رشته جدید می‌سازه

---

## چرا باید اهمیت بدی؟

**در مصاحبه:** ۲۰%+ مسائل با رشته‌ها کار می‌کنن!

| مسئله رایج | الگو |
|------------|------|
| پالیندروم | دو اشاره‌گر |
| آناگرام | شمارش کاراکتر |
| زیررشته | پنجره لغزان |
| معکوس کردن | دو اشاره‌گر |

---

## متدهای دسترسی

\`\`\`javascript
const str = "Hello World";

// دسترسی به کاراکتر
str[0];              // "H" - اولین کاراکتر
str.charAt(0);       // "H" - همون کار
str.at(-1);          // "d" - آخرین کاراکتر (جدید!)
str.length;          // 11 - طول رشته

// جستجو
str.indexOf("o");    // 4 - اولین "o" کجاست؟
str.lastIndexOf("o"); // 7 - آخرین "o" کجاست؟
str.indexOf("x");    // -1 - پیدا نشد!

// بررسی وجود
str.includes("World"); // true - آیا "World" هست؟
str.startsWith("He"); // true - آیا با "He" شروع می‌شه؟
str.endsWith("ld");  // true - آیا با "ld" تموم می‌شه؟
\`\`\`

---

## متدهای تبدیل

\`\`\`javascript
const str = "  Hello World  ";

// تغییر حروف
str.toLowerCase();   // "  hello world  "
str.toUpperCase();   // "  HELLO WORLD  "

// حذف فاصله‌های اضافی
str.trim();          // "Hello World"
str.trimStart();     // "Hello World  "
str.trimEnd();       // "  Hello World"

// جایگزینی
"hello".replace("l", "L");     // "heLlo" - فقط اولی
"hello".replaceAll("l", "L");  // "heLLo" - همه

// تقسیم به آرایه
"a,b,c".split(",");  // ["a", "b", "c"]
"hello".split("");   // ["h", "e", "l", "l", "o"]
\`\`\`

---

## متدهای استخراج

\`\`\`javascript
const str = "Hello World";

// slice(شروع, پایان) - پایان شامل نمی‌شه
str.slice(0, 5);     // "Hello"
str.slice(6);        // "World" - از ۶ تا آخر
str.slice(-5);       // "World" - ۵ تا از آخر

// substring(شروع, پایان) - مثل slice ولی منفی قبول نمی‌کنه
str.substring(0, 5); // "Hello"

// نکته: slice رو ترجیح بده چون منفی قبول می‌کنه
\`\`\`

---

## الگوهای رایج مصاحبه

### ۱. معکوس کردن رشته

\`\`\`javascript
// روش ساده
function reverseString(s) {
    return s.split('').reverse().join('');
}
// "hello" → ["h","e","l","l","o"] → ["o","l","l","e","h"] → "olleh"

// روش دو اشاره‌گر (برای آرایه کاراکترها)
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        // جابجایی
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
}
// ["h","e","l","l","o"] → ["o","l","l","e","h"]
\`\`\`

---

### ۲. بررسی پالیندروم

**پالیندروم:** رشته‌ای که از دو طرف یکسان خونده می‌شه.
- "level" ✅
- "A man a plan a canal Panama" ✅ (بدون فاصله و علائم)
- "hello" ❌

\`\`\`javascript
// روش ساده
function isPalindrome(s) {
    // فقط حروف و اعداد، همه کوچک
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return s === s.split('').reverse().join('');
}

// روش بهینه با دو اشاره‌گر - O(n) زمان، O(1) فضا
function isPalindromeOptimal(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;  // فرق دارن!
        }
        left++;
        right--;
    }
    
    return true;
}

// isPalindrome("A man, a plan, a canal: Panama") → true
\`\`\`

---

### ۳. شمارش کاراکترها

\`\`\`javascript
function charCount(s) {
    const count = {};
    
    for (let c of s) {
        count[c] = (count[c] || 0) + 1;
    }
    
    return count;
}

// charCount("hello")
// خروجی: { h: 1, e: 1, l: 2, o: 1 }

// پیدا کردن اولین کاراکتر غیرتکراری
function firstUnique(s) {
    const count = charCount(s);
    
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) {
            return i;  // اندیس اولین غیرتکراری
        }
    }
    
    return -1;  // همه تکراری‌ان
}

// firstUnique("leetcode") → 0 (کاراکتر 'l')
// firstUnique("aabb") → -1
\`\`\`

---

### ۴. بررسی آناگرام

**آناگرام:** دو رشته که از همون کاراکترها ساخته شدن.
- "listen" و "silent" ✅
- "anagram" و "nagaram" ✅
- "hello" و "world" ❌

\`\`\`javascript
// روش مرتب‌سازی - O(n log n)
function isAnagram(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const sort = s => s.split('').sort().join('');
    return sort(s1) === sort(s2);
}

// روش شمارش - O(n) بهینه‌تر!
function isAnagramOptimal(s1, s2) {
    if (s1.length !== s2.length) return false;
    
    const count = {};
    
    // شمارش کاراکترهای s1
    for (let c of s1) {
        count[c] = (count[c] || 0) + 1;
    }
    
    // کم کردن با کاراکترهای s2
    for (let c of s2) {
        if (!count[c]) return false;  // کاراکتر اضافی!
        count[c]--;
    }
    
    return true;
}

// isAnagram("anagram", "nagaram") → true
\`\`\`

---

## اشتباهات رایج

### ۱. فراموش کردن تغییرناپذیری
❌ اشتباه:
\`\`\`javascript
let s = "hello";
s[0] = "H";  // کار نمی‌کنه!
console.log(s);  // هنوز "hello"
\`\`\`

✅ درست:
\`\`\`javascript
let s = "hello";
s = "H" + s.slice(1);  // رشته جدید بساز
console.log(s);  // "Hello"
\`\`\`

---

### ۲. الحاق رشته در حلقه
❌ اشتباه (O(n²)):
\`\`\`javascript
let result = "";
for (let i = 0; i < n; i++) {
    result += chars[i];  // هر بار رشته جدید!
}
\`\`\`

✅ درست (O(n)):
\`\`\`javascript
const parts = [];
for (let i = 0; i < n; i++) {
    parts.push(chars[i]);
}
const result = parts.join('');
\`\`\`

---

### ۳. مقایسه با == به جای ===
❌ اشتباه:
\`\`\`javascript
"5" == 5;   // true (تبدیل نوع!)
\`\`\`

✅ درست:
\`\`\`javascript
"5" === 5;  // false (نوع متفاوت)
\`\`\`

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- با متن کار می‌کنی
- نیاز به جستجو یا مقایسه داری
- پردازش ورودی کاربر

**حواست باشه:**
- رشته‌ها تغییرناپذیرن
- الحاق در حلقه کنده
- از آرایه برای تغییرات زیاد استفاده کن

---

## جدول مرجع متدها

| متد | کار | زمان |
|-----|-----|------|
| \`str[i]\` | کاراکتر در اندیس i | O(1) |
| \`indexOf(s)\` | اولین موقعیت s | O(n) |
| \`includes(s)\` | آیا s وجود داره؟ | O(n) |
| \`slice(a, b)\` | زیررشته از a تا b | O(n) |
| \`split(sep)\` | تقسیم به آرایه | O(n) |
| \`toLowerCase()\` | حروف کوچک | O(n) |
| \`replace(a, b)\` | جایگزینی اولی | O(n) |
| \`trim()\` | حذف فاصله‌ها | O(n) |

---

## خلاصه سریع

| الگو | کاربرد | پیچیدگی |
|------|--------|---------|
| دو اشاره‌گر | پالیندروم، معکوس | O(n) |
| شمارش | آناگرام، تکراری | O(n) |
| پنجره لغزان | زیررشته | O(n) |
| هش مپ | جستجوی سریع | O(1) |

> **یک خطی:** رشته‌ها تغییرناپذیرن - برای تغییرات زیاد به آرایه تبدیل کن، تغییر بده، و join کن!
`,

  visualizationId: null,
  exerciseId: 'strings-manipulation',
};

export default stringsManipulationLesson;
