export const hashMapPatternsLesson = {
  id: 'hash-map-patterns',
  title: 'HashMap Patterns',
  titleFa: 'الگوهای HashMap',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# HashMap Patterns - Your Interview Secret Weapon

## Why Learn These Patterns?

HashMap patterns appear in 30%+ of coding interviews. Master these 5 patterns and you'll recognize solutions instantly.

**The magic:** Turn O(n²) brute force into O(n) with hash tables!

---

## Pattern 1: Frequency Counter

Count occurrences of elements. Foundation for many problems.

\`\`\`javascript
function countFrequency(arr) {
    const freq = new Map();
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}

// Example: Find majority element (appears > n/2 times)
function majorityElement(nums) {
    const freq = new Map();
    const threshold = nums.length / 2;
    
    for (let n of nums) {
        const count = (freq.get(n) || 0) + 1;
        freq.set(n, count);
        if (count > threshold) return n;
    }
}
// majorityElement([3,2,3]) → 3
\`\`\`

**When to use:** "Count", "most frequent", "appears more than X times"

---

## Pattern 2: Two Sum / Complement Lookup

Store seen values, check if complement exists.

\`\`\`javascript
function twoSum(nums, target) {
    const seen = new Map();  // value → index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}
// twoSum([2,7,11,15], 9) → [0,1]
\`\`\`

**Variations:**
\`\`\`javascript
// Three Sum: Fix one, two-sum the rest
// Four Sum: Fix two, two-sum the rest
// Two Sum II (sorted): Use two pointers instead
\`\`\`

**When to use:** "Find pair/triplet with sum", "complement exists"

---

## Pattern 3: Group By Key

Group elements that share a common property.

\`\`\`javascript
// Group Anagrams: words with same letters
function groupAnagrams(strs) {
    const map = new Map();
    
    for (let s of strs) {
        // Key: sorted letters (anagrams have same sorted form)
        const key = s.split('').sort().join('');
        
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    
    return [...map.values()];
}
// groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
\`\`\`

**Other grouping examples:**
\`\`\`javascript
// Group by first letter
const key = word[0];

// Group by length
const key = word.length;

// Group by digit sum
const key = String(num).split('').reduce((a,b) => a + +b, 0);
\`\`\`

**When to use:** "Group", "categorize", "same property"

---

## Pattern 4: Prefix Sum + HashMap

Find subarrays with specific sum using cumulative sums.

\`\`\`javascript
// Count subarrays with sum = k
function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]);  // sum → count
    let sum = 0, count = 0;
    
    for (let n of nums) {
        sum += n;
        
        // If (sum - k) exists, we found subarrays ending here
        count += prefixCount.get(sum - k) || 0;
        
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}
// subarraySum([1,1,1], 2) → 2 (subarrays [1,1] at indices 0-1 and 1-2)
\`\`\`

**Why it works:**
\`\`\`
If prefix[j] - prefix[i] = k
Then subarray from i+1 to j has sum k

Array:    [1, 2, 3, -2, 2]
Prefix:   [1, 3, 6,  4, 6]
For k=3:  prefix[4]=6, prefix[1]=3, so 6-3=3 ✓
\`\`\`

**When to use:** "Subarray sum equals K", "contiguous sum"

---

## Pattern 5: First/Last Occurrence

Track positions for quick lookup.

\`\`\`javascript
// First unique character
function firstUniqChar(s) {
    const freq = new Map();
    
    // Count frequencies
    for (let c of s) {
        freq.set(c, (freq.get(c) || 0) + 1);
    }
    
    // Find first with count 1
    for (let i = 0; i < s.length; i++) {
        if (freq.get(s[i]) === 1) return i;
    }
    
    return -1;
}
// firstUniqChar("leetcode") → 0 ('l')
// firstUniqChar("loveleetcode") → 2 ('v')
\`\`\`

\`\`\`javascript
// Contains duplicate within k distance
function containsNearbyDuplicate(nums, k) {
    const lastSeen = new Map();  // value → last index
    
    for (let i = 0; i < nums.length; i++) {
        if (lastSeen.has(nums[i]) && i - lastSeen.get(nums[i]) <= k) {
            return true;
        }
        lastSeen.set(nums[i], i);
    }
    
    return false;
}
\`\`\`

**When to use:** "First/last occurrence", "within distance K"

---

## Pattern Recognition Cheat Sheet

| Problem says... | Pattern | Key insight |
|-----------------|---------|-------------|
| "Count frequency" | Frequency Counter | Map value → count |
| "Find pair with sum" | Two Sum | Map value → index |
| "Group by property" | Group By | Map property → list |
| "Subarray sum = K" | Prefix Sum | Map prefixSum → count |
| "First unique" | First Occurrence | Two passes |
| "Within distance K" | Last Occurrence | Map value → last index |

---

## Common Mistakes

### 1. Wrong Default Value
\`\`\`javascript
// ❌ WRONG
map.get(key) + 1  // undefined + 1 = NaN

// ✅ CORRECT
(map.get(key) || 0) + 1
\`\`\`

### 2. Forgetting Initial State in Prefix Sum
\`\`\`javascript
// ❌ WRONG - misses subarrays starting at index 0
const prefixCount = new Map();

// ✅ CORRECT - handles sum = k from start
const prefixCount = new Map([[0, 1]]);
\`\`\`

### 3. Modifying While Iterating
\`\`\`javascript
// ❌ WRONG
for (let [k, v] of map) {
    if (v < 0) map.delete(k);  // Unpredictable!
}

// ✅ CORRECT
const toDelete = [...map.entries()].filter(([k,v]) => v < 0);
toDelete.forEach(([k]) => map.delete(k));
\`\`\`

---

## Interview Tips

- "I'll use a HashMap to reduce from O(n²) to O(n)"
- Always clarify: "Can there be duplicates?"
- For Two Sum variants, ask: "Return indices or values?"
- Prefix sum pattern: "I'll track cumulative sums in a map"
- Group by: "I'll use sorted string as key for anagrams"

---

## Quick Summary

| Pattern | Map stores | Time | Space |
|---------|------------|------|-------|
| Frequency | value → count | O(n) | O(n) |
| Two Sum | value → index | O(n) | O(n) |
| Group By | key → list | O(n·k) | O(n) |
| Prefix Sum | sum → count | O(n) | O(n) |
| Occurrence | value → index | O(n) | O(n) |

> **One-liner:** HashMap patterns turn O(n²) into O(n). Know frequency counter, two sum, group by, prefix sum, and occurrence tracking!
`,

  contentFa: `
# الگوهای HashMap - سلاح مخفی مصاحبه‌ات ⚡

## الگوهای HashMap چیست؟ (توضیح ساده)

تصور کن یه کتابخانه داری که می‌خوای سریع کتاب پیدا کنی. به جای گشتن همه قفسه‌ها، یه فهرست داری که می‌گه هر کتاب کجاست. HashMap همین فهرسته!

**اینطوری فکر کن:**
- مثل دفترچه تلفن - اسم رو می‌دی، شماره رو می‌گیری
- مثل فرهنگ لغت - کلمه رو می‌دی، معنی رو می‌گیری
- مثل کمد با برچسب - برچسب رو می‌خونی، محتوا رو پیدا می‌کنی

---

## چرا این الگوها رو یاد بگیریم؟

الگوهای HashMap در 30%+ مصاحبه‌های کدنویسی ظاهر می‌شن. این 5 الگو رو مسلط شو و راه‌حل‌ها رو فوری تشخیص می‌دی.

**جادو:** O(n²) brute force رو به O(n) با جدول هش تبدیل کن! ⚡

---

## الگو ۱: شمارنده فراوانی

تعداد هر عنصر رو بشمار. پایه خیلی از مسائل.

\`\`\`javascript
function countFrequency(arr) {
    const freq = new Map();
    for (let item of arr) {
        // اگه وجود نداره، 0 بذار و 1 اضافه کن
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}

// مثال: پیدا کردن عنصر اکثریت (بیشتر از n/2 بار)
function majorityElement(nums) {
    const freq = new Map();
    const threshold = nums.length / 2;
    
    for (let n of nums) {
        const count = (freq.get(n) || 0) + 1;
        freq.set(n, count);
        if (count > threshold) return n;  // پیدا شد! ✅
    }
}
// majorityElement([3,2,3]) → 3
\`\`\`

**کی استفاده کنیم:** "شمارش"، "پرتکرارترین"، "بیشتر از X بار"

---

## الگو ۲: Two Sum / جستجوی مکمل

مقادیر دیده شده رو ذخیره کن، چک کن مکمل وجود داره.

\`\`\`javascript
function twoSum(nums, target) {
    const seen = new Map();  // مقدار → اندیس
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];  // مکمل چیه؟
        
        if (seen.has(complement)) {
            // مکمل رو قبلاً دیدیم! ✅
            return [seen.get(complement), i];
        }
        // این عدد رو ذخیره کن برای بعد
        seen.set(nums[i], i);
    }
    return [];
}
// twoSum([2,7,11,15], 9) → [0,1]
\`\`\`

**کی استفاده کنیم:** "پیدا کردن جفت با مجموع"، "مکمل وجود داره"

---

## الگو ۳: گروه‌بندی با کلید

عناصری که ویژگی مشترک دارن رو گروه کن.

\`\`\`javascript
// گروه‌بندی آناگرام‌ها: کلماتی با حروف یکسان
function groupAnagrams(strs) {
    const map = new Map();
    
    for (let s of strs) {
        // کلید: حروف مرتب شده (آناگرام‌ها کلید یکسان دارن)
        const key = s.split('').sort().join('');
        
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);  // به گروه اضافه کن
    }
    
    return [...map.values()];
}
// groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
\`\`\`

**کی استفاده کنیم:** "گروه‌بندی"، "دسته‌بندی"، "ویژگی یکسان"

---

## الگو ۴: مجموع پیشوندی + HashMap

زیرآرایه‌ها با مجموع خاص رو با جمع‌های تجمعی پیدا کن.

\`\`\`javascript
// شمارش زیرآرایه‌ها با مجموع = k
function subarraySum(nums, k) {
    // مهم: 0 رو با تعداد 1 شروع کن
    const prefixCount = new Map([[0, 1]]);
    let sum = 0, count = 0;
    
    for (let n of nums) {
        sum += n;  // مجموع تجمعی
        
        // اگه (sum - k) قبلاً دیده شده، زیرآرایه پیدا شد!
        count += prefixCount.get(sum - k) || 0;
        
        // این مجموع رو ذخیره کن
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}
// subarraySum([1,1,1], 2) → 2 (زیرآرایه‌های [1,1])
\`\`\`

**کی استفاده کنیم:** "مجموع زیرآرایه برابر K"، "مجموع پیوسته"

---

## الگو ۵: اولین/آخرین رخداد

موقعیت‌ها رو برای جستجوی سریع پیگیری کن.

\`\`\`javascript
// اولین کاراکتر یکتا
function firstUniqChar(s) {
    const freq = new Map();
    
    // پاس اول: فراوانی‌ها رو بشمار
    for (let c of s) {
        freq.set(c, (freq.get(c) || 0) + 1);
    }
    
    // پاس دوم: اولین با تعداد 1 رو پیدا کن
    for (let i = 0; i < s.length; i++) {
        if (freq.get(s[i]) === 1) return i;  // پیدا شد! ✅
    }
    
    return -1;  // همه تکراری بودن ❌
}
// firstUniqChar("leetcode") → 0 ('l')
\`\`\`

**کی استفاده کنیم:** "اولین/آخرین رخداد"، "در فاصله K"

---

## برگه تقلب تشخیص الگو

| مسئله می‌گه... | الگو | نکته کلیدی |
|---------------|------|-----------|
| "شمارش فراوانی" | شمارنده فراوانی | Map مقدار → تعداد |
| "پیدا کردن جفت با مجموع" | Two Sum | Map مقدار → اندیس |
| "گروه‌بندی با ویژگی" | گروه‌بندی | Map ویژگی → لیست |
| "مجموع زیرآرایه = K" | مجموع پیشوندی | Map مجموع → تعداد |
| "اولین یکتا" | رخداد | دو پاس |

---

## اشتباهات رایج

### ۱. مقدار پیش‌فرض اشتباه
❌ اشتباه: \`map.get(key) + 1\` (undefined + 1 = NaN)
✅ درست: \`(map.get(key) || 0) + 1\`

### ۲. فراموش کردن حالت اولیه در مجموع پیشوندی
❌ اشتباه: \`const prefixCount = new Map()\`
✅ درست: \`const prefixCount = new Map([[0, 1]])\`

### ۳. تغییر Map حین پیمایش
❌ اشتباه: حذف کردن حین for...of
✅ درست: اول جمع کن، بعد حذف کن

---

---

## کی استفاده کنیم

**استفاده کن وقتی:**
- نیاز به جستجوی O(1) داری ✅
- شمارش فراوانی می‌خوای
- گروه‌بندی با ویژگی داری
- مجموع زیرآرایه می‌خوای

**استفاده نکن وقتی:**
- ترتیب مهمه (از آرایه استفاده کن) ❌
- داده‌ها مرتبن (binary search بهتره)
- فضا محدوده

---

## خلاصه سریع

| الگو | Map ذخیره می‌کنه | زمان | فضا |
|------|-----------------|------|-----|
| فراوانی | مقدار → تعداد | O(n) ⚡ | O(n) |
| Two Sum | مقدار → اندیس | O(n) ⚡ | O(n) |
| گروه‌بندی | کلید → لیست | O(n·k) | O(n) |
| مجموع پیشوندی | مجموع → تعداد | O(n) ⚡ | O(n) |

> **یک خطی:** الگوهای HashMap از O(n²) به O(n) می‌رسونن. شمارنده فراوانی، two sum، گروه‌بندی، مجموع پیشوندی و پیگیری رخداد رو بدون! ⚡
`,

  visualizationId: null,
  exerciseId: 'hash-map-patterns',
};

export default hashMapPatternsLesson;