export const problemSolvingApproachLesson = {
  id: 'problem-solving-approach',
  title: 'Problem Solving Approach',
  titleFa: 'روش حل مسئله',
  difficulty: 'easy',
  estimatedTime: '35 min',
  
  content: `
# Problem Solving Approach - From Confusion to Solution

## What is Problem Solving Approach? (Simple Explanation)

Imagine you're lost in a new city. What do you do?
1. First understand where you are (understand the problem)
2. Look at the map (plan)
3. Start walking (implement)
4. Check if you went the right way (review)

**Think of it like this:**
- Without a map = getting lost
- Without a plan = spaghetti code
- 4 steps = direct path to the answer

---

## Why Should You Care?

**In interviews:** The interviewer doesn't just want the answer - they want to see how you think!

| Without Method | With Method |
|----------------|-------------|
| Start coding immediately | 5 minutes of thinking |
| Get stuck midway | Clear path |
| Panic and stress | Confidence |
| Wrong answer | Correct answer + explanation |

---

## The 4-Step Framework

### Step 1: Understand the Problem (5 minutes)

**Like:** Before cooking, read the recipe!

\`\`\`
Key questions:
✅ What's the input? (Array? String? Number?)
✅ What's the output? (Number? Array? true/false?)
✅ What are the constraints? (Size? Range?)
✅ What are edge cases? (Empty? Single? Duplicates?)
\`\`\`

**Example:**
\`\`\`javascript
// Problem: Find two numbers that add up to target
// My questions:
// - Is the array sorted? (No)
// - Does a solution always exist? (Yes)
// - Can I use the same number twice? (No)
// - What if there are multiple solutions? (Return the first)
\`\`\`

---

### Step 2: Plan Your Approach (5 minutes)

**Like:** Before driving, choose your route!

\`\`\`
1. Start with a simple example
2. Find the pattern
3. Write down multiple solutions
4. Choose the best one
\`\`\`

**Example Two Sum:**
\`\`\`javascript
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1] (because 2 + 7 = 9)

// Solution 1: Brute Force
// Check every pair → O(n²) time, O(1) space

// Solution 2: Hash Map
// Store complement of each number → O(n) time, O(n) space

// Choice: Solution 2 (faster!)
\`\`\`

---

### Step 3: Implement (15 minutes)

**Like:** Now cook!

\`\`\`javascript
function twoSum(nums, target) {
    // 1. Hash map to store seen numbers
    const seen = new Map();
    
    // 2. Loop through array
    for (let i = 0; i < nums.length; i++) {
        // 3. Calculate complement
        const complement = target - nums[i];
        
        // 4. Was complement seen before?
        if (seen.has(complement)) {
            return [seen.get(complement), i];  // Found!
        }
        
        // 5. Store this number for later
        seen.set(nums[i], i);
    }
    
    // 6. Not found
    return [];
}
\`\`\`

**Implementation tips:**
- Handle edge cases first
- Use meaningful variable names
- Add comments (especially in interviews)

---

### Step 4: Review & Optimize (5 minutes)

**Like:** Taste the food before serving!

\`\`\`javascript
// Test with examples:
// twoSum([2, 7, 11, 15], 9) → [0, 1] ✅
// twoSum([3, 2, 4], 6) → [1, 2] ✅
// twoSum([3, 3], 6) → [0, 1] ✅

// Complexity analysis:
// Time: O(n) - one pass through array
// Space: O(n) - hash map stores at most n elements

// Can we do better?
// Time: No, we need to see all elements at least once
// Space: If sorted, two pointers would give O(1)
\`\`\`

---

## Common Patterns Table

| Pattern | Key Identifier | Example |
|---------|----------------|---------|
| Two Pointers | Sorted array, pairs | Two Sum II |
| Sliding Window | Subarray with condition | Max sum of k elements |
| Hash Map | Fast lookup | Two Sum |
| Binary Search | Sorted data | Find element |
| BFS | Shortest path | Distance in graph |
| DFS | All paths | Islands in matrix |
| DP | Overlapping subproblems | Fibonacci, Knapsack |
| Backtracking | All combinations | Subsets |

---

## Common Mistakes

### 1. Starting to Code Immediately
❌ Wrong:
\`\`\`javascript
// Read the problem, let me start...
function solve(arr) {
    // Oh wait, what was the input?
    // Is it sorted? I don't know...
}
\`\`\`

✅ Correct: Think for 5 minutes, ask questions, give examples!

---

### 2. Ignoring Edge Cases
❌ Wrong:
\`\`\`javascript
function findMax(arr) {
    let max = arr[0];  // What if arr is empty?!
    // ...
}
\`\`\`

✅ Correct:
\`\`\`javascript
function findMax(arr) {
    if (arr.length === 0) return null;  // Edge case!
    let max = arr[0];
    // ...
}
\`\`\`

---

### 3. Most Complex Solution First
❌ Wrong: "Let me solve it with DP!"

✅ Correct: Brute force first, then optimize. Why?
- You make sure you understand the problem
- You have a working solution
- You can compare

---

## When to Use

**Always use it!** This method is for:
- Coding interviews
- Solving LeetCode problems
- Real projects
- Any problem that seems hard at first

---

## Quick Summary

| Step | Time | Main Task |
|------|------|-----------|
| Understand | 5 min | Ask questions, give examples |
| Plan | 5 min | Find pattern, choose solution |
| Implement | 15 min | Write code, edge cases |
| Review | 5 min | Test, state complexity |

> **One-liner:** Understand → Plan → Implement → Review. 5 minutes of thinking = 30 minutes saved!
`,

  contentFa: `
# روش حل مسئله - از سردرگمی تا راه‌حل

## روش حل مسئله چیست؟ (توضیح ساده)

تصور کن گم شدی تو یه شهر جدید. چیکار می‌کنی؟
1. اول می‌فهمی کجایی (درک مسئله)
2. نقشه رو نگاه می‌کنی (برنامه‌ریزی)
3. راه می‌افتی (پیاده‌سازی)
4. چک می‌کنی درست رفتی (بررسی)

**اینطوری فکر کن:**
- بدون نقشه = گم شدن
- بدون برنامه = کد اسپاگتی
- ۴ مرحله = مسیر مستقیم به جواب

---

## چرا باید اهمیت بدی؟

**در مصاحبه:** مصاحبه‌کننده فقط جواب نمی‌خواد - می‌خواد ببینه چطور فکر می‌کنی!

| بدون روش | با روش |
|----------|--------|
| شروع فوری به کدنویسی | ۵ دقیقه فکر کردن |
| گیر کردن وسط کار | مسیر مشخص |
| پانیک و استرس | اعتماد به نفس |
| جواب اشتباه | جواب درست + توضیح |

---

## چارچوب ۴ مرحله‌ای

### مرحله ۱: درک مسئله (۵ دقیقه)

**مثل:** قبل از پختن غذا، دستور رو بخون!

\`\`\`
سوالات کلیدی:
✅ ورودی چیه؟ (آرایه؟ رشته؟ عدد؟)
✅ خروجی چیه؟ (عدد؟ آرایه؟ true/false؟)
✅ محدودیت‌ها چین؟ (اندازه؟ بازه؟)
✅ موارد لبه چین؟ (خالی؟ یکی؟ تکراری؟)
\`\`\`

**مثال:**
\`\`\`javascript
// مسئله: دو عدد پیدا کن که جمعشون برابر target بشه
// سوالات من:
// - آیا آرایه مرتبه؟ (نه)
// - آیا جواب همیشه وجود داره؟ (بله)
// - آیا می‌تونم یه عدد رو دو بار استفاده کنم؟ (نه)
// - اگه چند جواب باشه چی؟ (اولی رو برگردون)
\`\`\`

---

### مرحله ۲: برنامه‌ریزی (۵ دقیقه)

**مثل:** قبل از رانندگی، مسیر رو انتخاب کن!

\`\`\`
۱. با مثال ساده شروع کن
۲. الگو رو پیدا کن
۳. چند راه‌حل بنویس
۴. بهترین رو انتخاب کن
\`\`\`

**مثال Two Sum:**
\`\`\`javascript
// ورودی: nums = [2, 7, 11, 15], target = 9
// خروجی: [0, 1] (چون 2 + 7 = 9)

// راه‌حل ۱: Brute Force
// هر جفت رو چک کن → O(n²) زمان، O(1) فضا

// راه‌حل ۲: Hash Map
// مکمل هر عدد رو ذخیره کن → O(n) زمان، O(n) فضا

// انتخاب: راه‌حل ۲ (سریع‌تره!)
\`\`\`

---

### مرحله ۳: پیاده‌سازی (۱۵ دقیقه)

**مثل:** حالا آشپزی کن!

\`\`\`javascript
function twoSum(nums, target) {
    // ۱. هش مپ برای ذخیره اعداد دیده‌شده
    const seen = new Map();
    
    // ۲. روی آرایه حلقه بزن
    for (let i = 0; i < nums.length; i++) {
        // ۳. مکمل رو حساب کن
        const complement = target - nums[i];
        
        // ۴. آیا مکمل قبلاً دیده شده؟
        if (seen.has(complement)) {
            return [seen.get(complement), i];  // پیدا شد!
        }
        
        // ۵. این عدد رو ذخیره کن برای بعد
        seen.set(nums[i], i);
    }
    
    // ۶. پیدا نشد
    return [];
}
\`\`\`

**نکات پیاده‌سازی:**
- اول موارد لبه رو مدیریت کن
- نام متغیرها معنادار باشه
- کامنت بذار (مخصوصاً در مصاحبه)

---

### مرحله ۴: بررسی و بهینه‌سازی (۵ دقیقه)

**مثل:** غذا رو مزه کن قبل از سرو!

\`\`\`javascript
// تست با مثال‌ها:
// twoSum([2, 7, 11, 15], 9) → [0, 1] ✅
// twoSum([3, 2, 4], 6) → [1, 2] ✅
// twoSum([3, 3], 6) → [0, 1] ✅

// تحلیل پیچیدگی:
// زمان: O(n) - یک پاس روی آرایه
// فضا: O(n) - هش مپ حداکثر n عنصر

// آیا می‌شه بهتر کرد؟
// زمان: نه، باید حداقل یه بار همه رو ببینیم
// فضا: اگه مرتب بود، با دو اشاره‌گر O(1) می‌شد
\`\`\`

---

## جدول الگوهای رایج

| الگو | کلید شناسایی | مثال |
|------|--------------|------|
| دو اشاره‌گر | آرایه مرتب، جفت‌ها | Two Sum II |
| پنجره لغزان | زیرآرایه با شرط | حداکثر مجموع k عنصر |
| هش مپ | جستجوی سریع | Two Sum |
| جستجوی دودویی | داده مرتب | پیدا کردن عنصر |
| BFS | کوتاه‌ترین مسیر | فاصله در گراف |
| DFS | همه مسیرها | جزایر در ماتریس |
| DP | زیرمسائل تکراری | فیبوناچی، کوله‌پشتی |
| Backtracking | همه ترکیب‌ها | زیرمجموعه‌ها |

---

## اشتباهات رایج

### ۱. شروع فوری به کدنویسی
❌ اشتباه:
\`\`\`javascript
// مسئله رو خوندم، بذار شروع کنم...
function solve(arr) {
    // اوه، صبر کن، ورودی چی بود؟
    // آیا مرتبه؟ نمی‌دونم...
}
\`\`\`

✅ درست: ۵ دقیقه فکر کن، سوال بپرس، مثال بزن!

---

### ۲. نادیده گرفتن موارد لبه
❌ اشتباه:
\`\`\`javascript
function findMax(arr) {
    let max = arr[0];  // اگه arr خالی باشه چی؟!
    // ...
}
\`\`\`

✅ درست:
\`\`\`javascript
function findMax(arr) {
    if (arr.length === 0) return null;  // مورد لبه!
    let max = arr[0];
    // ...
}
\`\`\`

---

### ۳. پیچیده‌ترین راه‌حل اول
❌ اشتباه: "بذار با DP حل کنم!"

✅ درست: اول brute force، بعد بهینه‌سازی. چرا؟
- مطمئن می‌شی مسئله رو فهمیدی
- یه راه‌حل کار می‌کنه داری
- می‌تونی مقایسه کنی

---

---

## کی استفاده کنیم

**همیشه استفاده کن!** این روش برای:
- مصاحبه‌های کدنویسی
- حل مسائل LeetCode
- پروژه‌های واقعی
- هر مسئله‌ای که اول سخت به نظر می‌رسه

---

## خلاصه سریع

| مرحله | زمان | کار اصلی |
|-------|------|----------|
| درک | ۵ دقیقه | سوال بپرس، مثال بزن |
| برنامه‌ریزی | ۵ دقیقه | الگو پیدا کن، راه‌حل انتخاب کن |
| پیاده‌سازی | ۱۵ دقیقه | کد بنویس، موارد لبه |
| بررسی | ۵ دقیقه | تست کن، پیچیدگی بگو |

> **یک خطی:** درک → برنامه‌ریزی → پیاده‌سازی → بررسی. ۵ دقیقه فکر کردن = ۳۰ دقیقه صرفه‌جویی!
`,

  visualizationId: null,
  exerciseId: null,
};

export default problemSolvingApproachLesson;
