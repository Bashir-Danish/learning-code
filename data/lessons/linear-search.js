export const linearSearchLesson = {
  id: 'linear-search',
  title: 'Linear Search',
  titleFa: 'جستجوی خطی',
  difficulty: 'easy',
  estimatedTime: '25 min',
  
  content: `
# Linear Search - The Simplest Way to Find Things

## What is Linear Search?

Imagine you lost your keys somewhere in your house. What do you do? You start looking in one room, then the next, then the next... checking each place one by one until you find them.

That's exactly what Linear Search does! It checks each item in a list, one at a time, from the beginning to the end, until it finds what you're looking for.

**It's like:**
- Reading a book page by page to find a specific word
- Looking through your playlist song by song to find your favorite
- Checking each pocket to find your phone

---

## How Does It Work?

**Step by step:**
1. Start at the first item (index 0)
2. Is this the item I'm looking for? 
   - YES: Great! Return its position
   - NO: Move to the next item
3. Repeat until you find it or reach the end
4. If you checked everything and didn't find it, return -1 (not found)

**Visual example:**

Looking for number 7 in [3, 8, 2, 7, 1, 9]:

\`\`\`
Step 1: Check index 0 → 3 = 7? No, keep going
Step 2: Check index 1 → 8 = 7? No, keep going  
Step 3: Check index 2 → 2 = 7? No, keep going
Step 4: Check index 3 → 7 = 7? YES! Found at index 3
\`\`\`

---

## The Code (It's Super Simple!)

\`\`\`javascript
function linearSearch(arr, target) {
    // Go through each item one by one
    for (let i = 0; i < arr.length; i++) {
        // Is this the one we're looking for?
        if (arr[i] === target) {
            return i;  // Found it! Return the position
        }
    }
    // Checked everything, didn't find it
    return -1;
}

// Examples:
linearSearch([5, 3, 8, 1, 9], 8);   // Returns 2 (found at index 2)
linearSearch([5, 3, 8, 1, 9], 7);   // Returns -1 (not found)
linearSearch(['a', 'b', 'c'], 'b'); // Returns 1 (works with strings too!)
\`\`\`

---

## Why Use Linear Search?

**The Good:**
- Super easy to understand and write
- Works on ANY list (sorted or unsorted)
- Works on any data type (numbers, strings, objects)
- No extra memory needed
- Perfect for small lists

**The Bad:**
- Slow for large lists (imagine searching through 1 million items!)
- If the item is at the end, you have to check everything first

---

## How Fast Is It? (Time Complexity)

| Situation | Time | What it means |
|-----------|------|---------------|
| Best Case | O(1) | Item is first! Found immediately |
| Average Case | O(n) | Item is somewhere in the middle |
| Worst Case | O(n) | Item is last, or not there at all |

**Space Complexity:** O(1) - We only use a few variables, no matter how big the list is.

**Real numbers:**
- 10 items: up to 10 checks
- 1,000 items: up to 1,000 checks
- 1,000,000 items: up to 1,000,000 checks (this is why it's slow for big data!)

---

## When Should You Use Linear Search?

**Use it when:**
- Your list is small (less than 100 items)
- Your list is NOT sorted
- You only need to search once or twice
- You're working with a linked list (no random access)
- Simplicity matters more than speed

**Don't use it when:**
- Your list is sorted (use Binary Search instead - it's much faster!)
- You need to search the same list many times (use a Hash Table)
- Your list has millions of items

---

## Variations of Linear Search

### Find All Occurrences
Sometimes you want to find ALL positions where an item appears:

\`\`\`javascript
function findAll(arr, target) {
    const positions = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            positions.push(i);  // Add each position found
        }
    }
    
    return positions;
}

// Example:
findAll([1, 3, 5, 3, 7, 3], 3);  // Returns [1, 3, 5]
\`\`\`

### Search with a Condition
Find the first item that matches a condition:

\`\`\`javascript
function findFirst(arr, condition) {
    for (let i = 0; i < arr.length; i++) {
        if (condition(arr[i])) {
            return i;
        }
    }
    return -1;
}

// Example: Find first even number
const numbers = [1, 3, 5, 8, 9, 12];
findFirst(numbers, n => n % 2 === 0);  // Returns 3 (index of 8)
\`\`\`

---

## Common Interview Questions

**Q: When is Linear Search better than Binary Search?**
A: When the array is unsorted! Binary Search only works on sorted arrays.

**Q: What's the time complexity of Linear Search?**
A: O(n) - because in the worst case, we check every single item.

**Q: Can Linear Search work on linked lists?**
A: Yes! Unlike Binary Search, Linear Search doesn't need random access, so it works perfectly on linked lists.

---

## Quick Summary

| Feature | Linear Search |
|---------|---------------|
| Difficulty | Very Easy |
| Time (Best) | O(1) |
| Time (Worst) | O(n) |
| Space | O(1) |
| Requires Sorted? | No |
| Best For | Small or unsorted lists |
`,

  contentFa: `
# جستجوی خطی - ساده‌ترین روش برای پیدا کردن چیزها

## جستجوی خطی چیست؟

تصور کن کلیدهات رو یه جایی توی خونه گم کردی. چیکار می‌کنی؟ از یه اتاق شروع می‌کنی، بعد اتاق بعدی، بعد بعدی... هر جا رو یکی یکی چک می‌کنی تا پیداشون کنی.

جستجوی خطی دقیقاً همین کار رو می‌کنه! هر آیتم توی لیست رو یکی یکی، از اول تا آخر چک می‌کنه تا چیزی که دنبالشی رو پیدا کنه.

**مثل این می‌مونه:**
- خوندن یه کتاب صفحه به صفحه برای پیدا کردن یه کلمه خاص
- گشتن توی پلی‌لیست آهنگ به آهنگ برای پیدا کردن آهنگ مورد علاقت
- چک کردن هر جیب برای پیدا کردن گوشیت

---

## چطور کار می‌کنه؟

**قدم به قدم:**
1. از اولین آیتم شروع کن (اندیس 0)
2. آیا این همون چیزیه که دنبالشم؟
   - بله: عالی! موقعیتش رو برگردون
   - نه: برو سراغ آیتم بعدی
3. تکرار کن تا پیدا کنی یا به آخر برسی
4. اگه همه چیز رو چک کردی و پیدا نکردی، -1 برگردون (پیدا نشد)

**مثال تصویری:**

دنبال عدد 7 در [3, 8, 2, 7, 1, 9]:

\`\`\`
قدم 1: چک کن اندیس 0 → 3 = 7؟ نه، ادامه بده
قدم 2: چک کن اندیس 1 → 8 = 7؟ نه، ادامه بده
قدم 3: چک کن اندیس 2 → 2 = 7؟ نه، ادامه بده
قدم 4: چک کن اندیس 3 → 7 = 7؟ بله! پیدا شد در اندیس 3
\`\`\`

---

## کد (خیلی ساده‌ست!)

\`\`\`javascript
function linearSearch(arr, target) {
    // هر آیتم رو یکی یکی بررسی کن
    for (let i = 0; i < arr.length; i++) {
        // آیا این همونیه که دنبالشیم؟
        if (arr[i] === target) {
            return i;  // پیداش کردم! موقعیت رو برگردون
        }
    }
    // همه چیز رو چک کردم، پیدا نشد
    return -1;
}

// مثال‌ها:
linearSearch([5, 3, 8, 1, 9], 8);   // برمی‌گردونه 2 (پیدا شد در اندیس 2)
linearSearch([5, 3, 8, 1, 9], 7);   // برمی‌گردونه -1 (پیدا نشد)
linearSearch(['a', 'b', 'c'], 'b'); // برمی‌گردونه 1 (با رشته‌ها هم کار می‌کنه!)
\`\`\`

---

## چرا از جستجوی خطی استفاده کنیم؟

**خوبی‌هاش:**
- خیلی ساده برای فهمیدن و نوشتن
- روی هر لیستی کار می‌کنه (مرتب یا نامرتب)
- روی هر نوع داده‌ای کار می‌کنه (اعداد، رشته‌ها، آبجکت‌ها)
- حافظه اضافی نمی‌خواد
- عالی برای لیست‌های کوچک

**بدی‌هاش:**
- برای لیست‌های بزرگ کنده (تصور کن 1 میلیون آیتم رو بگردی!)
- اگه آیتم آخر باشه، باید همه چیز رو اول چک کنی

---

## چقدر سریعه؟ (پیچیدگی زمانی)

| وضعیت | زمان | یعنی چی |
|-------|------|---------|
| بهترین حالت | O(1) | آیتم اوله! فوری پیدا می‌شه |
| حالت میانگین | O(n) | آیتم یه جایی وسطه |
| بدترین حالت | O(n) | آیتم آخره، یا اصلاً نیست |

**پیچیدگی فضایی:** O(1) - فقط چند تا متغیر استفاده می‌کنیم، مهم نیست لیست چقدر بزرگه.

**اعداد واقعی:**
- 10 آیتم: حداکثر 10 چک
- 1,000 آیتم: حداکثر 1,000 چک
- 1,000,000 آیتم: حداکثر 1,000,000 چک (به همین خاطر برای داده بزرگ کنده!)

---

## کی باید از جستجوی خطی استفاده کنی؟

**استفاده کن وقتی:**
- لیستت کوچکه (کمتر از 100 آیتم)
- لیستت مرتب نیست
- فقط یکی دو بار نیاز به جستجو داری
- داری با لیست پیوندی کار می‌کنی (دسترسی تصادفی نداره)
- سادگی مهم‌تر از سرعته

**استفاده نکن وقتی:**
- لیستت مرتبه (از جستجوی دودویی استفاده کن - خیلی سریع‌تره!)
- نیاز داری همون لیست رو چندین بار بگردی (از جدول هش استفاده کن)
- لیستت میلیون‌ها آیتم داره

---

## تغییرات جستجوی خطی

### پیدا کردن همه رخدادها
گاهی می‌خوای همه موقعیت‌هایی که یه آیتم ظاهر می‌شه رو پیدا کنی:

\`\`\`javascript
function findAll(arr, target) {
    const positions = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            positions.push(i);  // هر موقعیت پیدا شده رو اضافه کن
        }
    }
    
    return positions;
}

// مثال:
findAll([1, 3, 5, 3, 7, 3], 3);  // برمی‌گردونه [1, 3, 5]
\`\`\`

### جستجو با شرط
پیدا کردن اولین آیتمی که با یه شرط مطابقت داره:

\`\`\`javascript
function findFirst(arr, condition) {
    for (let i = 0; i < arr.length; i++) {
        if (condition(arr[i])) {
            return i;
        }
    }
    return -1;
}

// مثال: پیدا کردن اولین عدد زوج
const numbers = [1, 3, 5, 8, 9, 12];
findFirst(numbers, n => n % 2 === 0);  // برمی‌گردونه 3 (اندیس 8)
\`\`\`

---

## سوالات رایج مصاحبه

**س: کی جستجوی خطی بهتر از جستجوی دودویی هست؟**
ج: وقتی آرایه مرتب نیست! جستجوی دودویی فقط روی آرایه‌های مرتب کار می‌کنه.

**س: پیچیدگی زمانی جستجوی خطی چیه؟**
ج: O(n) - چون در بدترین حالت، هر آیتم رو چک می‌کنیم.

**س: آیا جستجوی خطی روی لیست پیوندی کار می‌کنه؟**
ج: بله! برخلاف جستجوی دودویی، جستجوی خطی نیاز به دسترسی تصادفی نداره، پس روی لیست پیوندی عالی کار می‌کنه.

---

## اشتباهات رایج

### ۱. استفاده برای آرایه‌های بزرگ
❌ اشتباه: جستجوی خطی روی ۱ میلیون آیتم
✅ درست: از جستجوی دودویی استفاده کن (اگه مرتبه)

### ۲. فراموش کردن حالت پیدا نشدن
❌ اشتباه: فرض کنی همیشه پیدا می‌شه
✅ درست: همیشه -1 برگردون اگه پیدا نشد

### ۳. مقایسه اشتباه
❌ اشتباه: \`arr[i] = target\` (انتساب!)
✅ درست: \`arr[i] === target\` (مقایسه)

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- آرایه مرتب نیست ✅
- آرایه کوچکه (کمتر از ۱۰۰ آیتم)
- فقط یک بار جستجو می‌کنی
- لیست پیوندی داری

**استفاده نکن وقتی:**
- آرایه مرتبه (جستجوی دودویی سریع‌تره) ❌
- آرایه خیلی بزرگه
- چندین بار جستجو می‌کنی (هش‌مپ بهتره)

---

## خلاصه سریع

| ویژگی | جستجوی خطی |
|-------|------------|
| سختی | خیلی آسان ⭐ |
| زمان (بهترین) | O(1) ⚡ |
| زمان (بدترین) | O(n) 🐌 |
| فضا | O(1) |
| نیاز به مرتب بودن؟ | نه ✅ |
| بهترین برای | لیست‌های کوچک یا نامرتب |

> **یک خطی:** جستجوی خطی ساده‌ترین روشه - یکی یکی چک کن تا پیدا کنی! ⚡
`,

  visualizationId: 'linear-search',
  exerciseId: 'linear-search',
};

export default linearSearchLesson;
