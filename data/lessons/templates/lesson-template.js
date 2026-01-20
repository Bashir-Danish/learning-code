/**
 * COMPREHENSIVE LESSON TEMPLATE
 * 
 * Use this template as a reference when creating or enhancing lessons.
 * Every lesson should follow this structure to ensure consistency and quality.
 * 
 * QUALITY CHECKLIST:
 * ✅ Has "What is X?" section with simple explanation
 * ✅ Has "Why Should You Care?" section
 * ✅ Has 2+ real-life analogies
 * ✅ Has "How Does It Work?" with algorithm steps
 * ✅ Has step-by-step walkthrough with concrete values
 * ✅ Has code with detailed comments
 * ✅ Has Time/Space Complexity with WHY explanation
 * ✅ Has "When to Use / When NOT to Use"
 * ✅ Has 3+ Common Mistakes with wrong/correct code
 * ✅ Has Real-World Applications (3+)
 * ✅ Has Interview Tips
 * ✅ Has Quick Summary table
 * ✅ Has complete Persian content (contentFa)
 * ✅ Persian content is natural, not word-for-word translation
 */

export const lessonTemplate = {
  // ============================================
  // METADATA
  // ============================================
  id: 'algorithm-name',           // kebab-case, unique identifier
  title: 'Algorithm Name',        // English title
  titleFa: 'نام الگوریتم',         // Persian title
  difficulty: 'easy',             // 'easy' | 'medium' | 'hard'
  estimatedTime: '45 min',        // Estimated reading time
  
  // ============================================
  // ENGLISH CONTENT
  // ============================================
  content: `
# Algorithm Name - Catchy Subtitle That Makes You Want to Learn

## What is Algorithm Name?

[Start with the SIMPLEST possible explanation. Imagine explaining to a smart 12-year-old.]

Imagine you're [RELATABLE SCENARIO]. That's exactly what Algorithm Name does!

**Think of it like this:**
[FIRST ANALOGY - something EVERYONE knows, like finding a book, sorting cards, etc.]

---

## Why Should You Care?

**Real-world example:** [CONCRETE scenario where this matters in actual software]

Here's why this matters:
- [Benefit 1 - practical reason]
- [Benefit 2 - performance reason]
- [Benefit 3 - interview/job reason]

Without understanding this, you might:
- [Problem 1 they'll face]
- [Problem 2 they'll face]

---

## Real-Life Analogies

### Analogy 1: [Catchy Title]

[Detailed analogy that maps EXACTLY to how the algorithm works]

**How it maps to code:**
- [Real-life step] → [Code equivalent]
- [Real-life step] → [Code equivalent]

### Analogy 2: [Different Catchy Title]

[DIFFERENT analogy for people who learn differently]

---

## How Does It Work?

**The Algorithm (Simple Version):**
1. [Step 1 - in plain English]
2. [Step 2 - in plain English]
3. [Step 3 - in plain English]
4. [Continue until done]

**Visual Representation:**

\`\`\`
[ASCII art or text diagram showing the concept]
[Make it visual and easy to follow]
\`\`\`

---

## Step-by-Step Walkthrough

### Example 1: Simple Case

Let's trace through with [SIMPLE INPUT]:

\`\`\`
Initial: [starting state]

Step 1:
  [What we're doing]
  [Show the state change]
  Variables: x=1, y=2

Step 2:
  [What we're doing]
  [Show the state change]
  Variables: x=2, y=3

[Continue until done]

Result: [final answer]
\`\`\`

### Example 2: More Complex Case

Now let's try [HARDER INPUT] to see edge cases:

\`\`\`
Initial: [starting state]

[Same detailed trace format]

Result: [final answer]
\`\`\`

---

## The Code

\`\`\`javascript
/**
 * Algorithm Name - Brief description
 * @param {Type} param1 - What this parameter is
 * @param {Type} param2 - What this parameter is
 * @returns {Type} - What we return
 */
function algorithmName(param1, param2) {
    // Step 1: Initialize - explain WHY we need this
    let variable1 = initialValue;
    
    // Step 2: Main logic - explain the approach
    while (condition) {
        // What this line does and WHY
        doSomething();
        
        // What this line does and WHY
        doSomethingElse();
    }
    
    // Step 3: Return result
    return result;
}

// ============================================
// EXAMPLE USAGE
// ============================================

// Example 1: Basic case
console.log(algorithmName([1, 2, 3], 2));
// Output: [expected output]
// Explanation: [why this is the answer]

// Example 2: Edge case
console.log(algorithmName([], 5));
// Output: [expected output]
// Explanation: [why this is the answer]

// Example 3: Another case
console.log(algorithmName([5, 5, 5], 5));
// Output: [expected output]
\`\`\`

### Alternative Approach: [Recursive/Iterative/Other]

\`\`\`javascript
// Sometimes you might want to use this approach instead
function algorithmNameAlternative(param1, param2) {
    // Different implementation with comments
}
\`\`\`

**When to use which:**
- Use the first approach when: [reason]
- Use the alternative when: [reason]

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| Best | O(?) | O(?) | [Explanation of when this happens] |
| Average | O(?) | O(?) | [Explanation of typical case] |
| Worst | O(?) | O(?) | [Explanation of worst scenario] |

### Why is it O(?)?

**Time Complexity Breakdown:**
- [First operation]: O(?) because [reason]
- [Second operation]: O(?) because [reason]
- Total: O(?) because [how they combine]

**Space Complexity Breakdown:**
- [What takes space]: O(?) because [reason]
- [Recursive calls if any]: O(?) because [reason]

### Comparison with Similar Algorithms

| Algorithm | Time | Space | Best For |
|-----------|------|-------|----------|
| This Algorithm | O(?) | O(?) | [use case] |
| Alternative 1 | O(?) | O(?) | [use case] |
| Alternative 2 | O(?) | O(?) | [use case] |

---

## Variations & Related Patterns

### Variation 1: [Name]

[Brief explanation of when you'd use this variation]

\`\`\`javascript
// Code for variation if needed
\`\`\`

### Variation 2: [Name]

[Brief explanation]

### Related Patterns

- **[Pattern 1]**: [How it relates]
- **[Pattern 2]**: [How it relates]

---

## When to Use / When NOT to Use

### ✅ Use it when:

- [Condition 1] - [brief explanation]
- [Condition 2] - [brief explanation]
- [Condition 3] - [brief explanation]
- [Condition 4] - [brief explanation]

### ❌ Don't use it when:

- [Condition 1] - [what to use instead]
- [Condition 2] - [what to use instead]
- [Condition 3] - [what to use instead]

### Quick Decision Guide

\`\`\`
Is your data sorted?
├── Yes → Consider [Algorithm A]
└── No → Is data size small (<100)?
    ├── Yes → This algorithm is fine
    └── No → Consider [Algorithm B]
\`\`\`

---

## Common Mistakes

### Mistake 1: [Descriptive Title]

\`\`\`javascript
// ❌ WRONG - [brief description of mistake]
function wrongWay(arr) {
    // This code has a bug because...
    for (let i = 0; i <= arr.length; i++) {  // Bug: <= instead of <
        console.log(arr[i]);  // Will access undefined!
    }
}

// ✅ CORRECT - [brief description of fix]
function rightWay(arr) {
    // Fixed: use < instead of <=
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
\`\`\`

**Why it's wrong:** [Detailed explanation of the bug and its consequences]

**How to remember:** [Memory trick or rule of thumb]

### Mistake 2: [Descriptive Title]

\`\`\`javascript
// ❌ WRONG
[wrong code]

// ✅ CORRECT
[correct code]
\`\`\`

**Why it's wrong:** [Explanation]

### Mistake 3: [Descriptive Title]

\`\`\`javascript
// ❌ WRONG
[wrong code]

// ✅ CORRECT
[correct code]
\`\`\`

**Why it's wrong:** [Explanation]

### Edge Cases to Watch Out For

- **Empty input**: [What happens and how to handle]
- **Single element**: [What happens and how to handle]
- **All same values**: [What happens and how to handle]
- **Already sorted/reversed**: [What happens and how to handle]

---

## Real-World Applications

### 1. [Application Name]

**Where:** [Company/Technology/Domain]

**How it's used:** [Specific explanation of how this algorithm helps]

**Example:** [Concrete example]

### 2. [Application Name]

**Where:** [Company/Technology/Domain]

**How it's used:** [Explanation]

### 3. [Application Name]

**Where:** [Company/Technology/Domain]

**How it's used:** [Explanation]

### 4. [Application Name] (Bonus)

[Additional application if relevant]

---

## Interview Tips

### Common Interview Questions

1. **[Question 1]**
   - What they're testing: [skill/concept]
   - Key insight: [what to remember]

2. **[Question 2]**
   - What they're testing: [skill/concept]
   - Key insight: [what to remember]

3. **[Question 3]**
   - What they're testing: [skill/concept]
   - Key insight: [what to remember]

### What Interviewers Look For

- ✅ [Good thing 1] - shows you understand [concept]
- ✅ [Good thing 2] - shows you can [skill]
- ✅ [Good thing 3] - shows attention to [detail]
- ❌ [Bad thing 1] - red flag because [reason]
- ❌ [Bad thing 2] - red flag because [reason]

### Pro Tips

💡 **Tip 1:** [Actionable advice]

💡 **Tip 2:** [Actionable advice]

💡 **Tip 3:** [Actionable advice]

### How to Explain Your Approach

"I would use [Algorithm Name] here because [reason]. The time complexity is O(?) which is [good/acceptable] for this problem. Let me walk you through the steps..."

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time Complexity (Best) | O(?) |
| Time Complexity (Average) | O(?) |
| Time Complexity (Worst) | O(?) |
| Space Complexity | O(?) |
| Stable? | Yes/No |
| In-place? | Yes/No |
| Online? | Yes/No |
| Best For | [Primary use case] |
| Avoid When | [When not to use] |

### One-Liner Summary

> [Algorithm Name] is like [simple analogy] - it [what it does] in O(?) time by [how it works].

### Key Takeaways

1. 🎯 [Most important point]
2. 🎯 [Second most important point]
3. 🎯 [Third most important point]
`,

  // ============================================
  // PERSIAN CONTENT
  // ============================================
  contentFa: `
# نام الگوریتم - زیرعنوان جذاب که می‌خوای یاد بگیری

## نام الگوریتم چیست؟

[با ساده‌ترین توضیح ممکن شروع کن. تصور کن داری به یه بچه ۱۲ ساله باهوش توضیح می‌دی.]

تصور کن داری [سناریوی قابل درک]. این دقیقاً همون کاریه که نام الگوریتم انجام می‌ده!

**اینطوری فکر کن:**
[اولین مثال - چیزی که همه می‌شناسن، مثل پیدا کردن کتاب، مرتب کردن کارت، و غیره]

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** [سناریوی مشخص که این توی نرم‌افزار واقعی مهمه]

چرا این مهمه:
- [فایده ۱ - دلیل عملی]
- [فایده ۲ - دلیل کارایی]
- [فایده ۳ - دلیل مصاحبه/کار]

بدون فهمیدن این، ممکنه:
- [مشکل ۱ که باهاش مواجه می‌شن]
- [مشکل ۲ که باهاش مواجه می‌شن]

---

## مثال‌های زندگی واقعی

### مثال ۱: [عنوان جذاب]

[مثال دقیق که دقیقاً به نحوه کار الگوریتم نگاشت می‌شه]

**چطور به کد ربط داره:**
- [قدم زندگی واقعی] → [معادل کد]
- [قدم زندگی واقعی] → [معادل کد]

### مثال ۲: [عنوان جذاب متفاوت]

[مثال متفاوت برای کسایی که متفاوت یاد می‌گیرن]

---

## چطور کار می‌کنه؟

**الگوریتم (نسخه ساده):**
۱. [قدم ۱ - به زبان ساده]
۲. [قدم ۲ - به زبان ساده]
۳. [قدم ۳ - به زبان ساده]
۴. [ادامه تا تموم بشه]

**نمایش تصویری:**

\`\`\`
[نمودار ASCII یا متنی که مفهوم رو نشون بده]
[تصویری و راحت برای دنبال کردن باشه]
\`\`\`

---

## راهنمای قدم به قدم

### مثال ۱: حالت ساده

بیا با [ورودی ساده] ردیابی کنیم:

\`\`\`
اولیه: [وضعیت شروع]

قدم ۱:
  [چیکار داریم می‌کنیم]
  [تغییر وضعیت رو نشون بده]
  متغیرها: x=۱, y=۲

قدم ۲:
  [چیکار داریم می‌کنیم]
  [تغییر وضعیت رو نشون بده]
  متغیرها: x=۲, y=۳

[ادامه تا تموم بشه]

نتیجه: [جواب نهایی]
\`\`\`

### مثال ۲: حالت پیچیده‌تر

حالا بیا [ورودی سخت‌تر] رو امتحان کنیم تا edge case ها رو ببینیم:

\`\`\`
اولیه: [وضعیت شروع]

[همون فرمت ردیابی دقیق]

نتیجه: [جواب نهایی]
\`\`\`

---

## کد

\`\`\`javascript
/**
 * نام الگوریتم - توضیح کوتاه
 * @param {Type} param1 - این پارامتر چیه
 * @param {Type} param2 - این پارامتر چیه
 * @returns {Type} - چی برمی‌گردونیم
 */
function algorithmName(param1, param2) {
    // قدم ۱: مقداردهی اولیه - توضیح چرا این لازمه
    let variable1 = initialValue;
    
    // قدم ۲: منطق اصلی - توضیح رویکرد
    while (condition) {
        // این خط چیکار می‌کنه و چرا
        doSomething();
        
        // این خط چیکار می‌کنه و چرا
        doSomethingElse();
    }
    
    // قدم ۳: برگردوندن نتیجه
    return result;
}

// ============================================
// مثال استفاده
// ============================================

// مثال ۱: حالت پایه
console.log(algorithmName([1, 2, 3], 2));
// خروجی: [خروجی مورد انتظار]
// توضیح: [چرا این جوابه]

// مثال ۲: حالت لبه
console.log(algorithmName([], 5));
// خروجی: [خروجی مورد انتظار]
// توضیح: [چرا این جوابه]
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| بهترین | O(?) | O(?) | [توضیح کی این اتفاق می‌افته] |
| میانگین | O(?) | O(?) | [توضیح حالت معمول] |
| بدترین | O(?) | O(?) | [توضیح بدترین سناریو] |

### چرا O(?) هست؟

**تحلیل پیچیدگی زمانی:**
- [عملیات اول]: O(?) چون [دلیل]
- [عملیات دوم]: O(?) چون [دلیل]
- کل: O(?) چون [چطور ترکیب می‌شن]

**تحلیل پیچیدگی فضایی:**
- [چی فضا می‌گیره]: O(?) چون [دلیل]

---

## کی استفاده کنیم / کی استفاده نکنیم

### ✅ استفاده کن وقتی:

- [شرط ۱] - [توضیح کوتاه]
- [شرط ۲] - [توضیح کوتاه]
- [شرط ۳] - [توضیح کوتاه]

### ❌ استفاده نکن وقتی:

- [شرط ۱] - [به جاش چی استفاده کن]
- [شرط ۲] - [به جاش چی استفاده کن]
- [شرط ۳] - [به جاش چی استفاده کن]

---

## اشتباهات رایج

### اشتباه ۱: [عنوان توصیفی]

\`\`\`javascript
// ❌ اشتباه - [توضیح کوتاه اشتباه]
function wrongWay(arr) {
    // این کد باگ داره چون...
    for (let i = 0; i <= arr.length; i++) {  // باگ: <= به جای <
        console.log(arr[i]);  // به undefined دسترسی پیدا می‌کنه!
    }
}

// ✅ درست - [توضیح کوتاه اصلاح]
function rightWay(arr) {
    // اصلاح شد: از < به جای <= استفاده کن
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
\`\`\`

**چرا اشتباهه:** [توضیح دقیق باگ و عواقبش]

**چطور یادت بمونه:** [ترفند حافظه یا قانون سرانگشتی]

### اشتباه ۲: [عنوان توصیفی]

\`\`\`javascript
// ❌ اشتباه
[کد اشتباه]

// ✅ درست
[کد درست]
\`\`\`

**چرا اشتباهه:** [توضیح]

### اشتباه ۳: [عنوان توصیفی]

\`\`\`javascript
// ❌ اشتباه
[کد اشتباه]

// ✅ درست
[کد درست]
\`\`\`

**چرا اشتباهه:** [توضیح]

---

## کاربردهای دنیای واقعی

### ۱. [نام کاربرد]

**کجا:** [شرکت/تکنولوژی/حوزه]

**چطور استفاده می‌شه:** [توضیح مشخص که این الگوریتم چطور کمک می‌کنه]

### ۲. [نام کاربرد]

**کجا:** [شرکت/تکنولوژی/حوزه]

**چطور استفاده می‌شه:** [توضیح]

### ۳. [نام کاربرد]

**کجا:** [شرکت/تکنولوژی/حوزه]

**چطور استفاده می‌شه:** [توضیح]

---

## نکات مصاحبه

### سوالات رایج مصاحبه

۱. **[سوال ۱]**
   - چی رو تست می‌کنن: [مهارت/مفهوم]
   - نکته کلیدی: [چی یادت بمونه]

۲. **[سوال ۲]**
   - چی رو تست می‌کنن: [مهارت/مفهوم]
   - نکته کلیدی: [چی یادت بمونه]

### مصاحبه‌کننده‌ها دنبال چی هستن

- ✅ [چیز خوب ۱] - نشون می‌ده [مفهوم] رو می‌فهمی
- ✅ [چیز خوب ۲] - نشون می‌ده می‌تونی [مهارت]
- ❌ [چیز بد ۱] - پرچم قرمز چون [دلیل]

### نکات حرفه‌ای

💡 **نکته ۱:** [توصیه عملی]

💡 **نکته ۲:** [توصیه عملی]

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| پیچیدگی زمانی (بهترین) | O(?) |
| پیچیدگی زمانی (میانگین) | O(?) |
| پیچیدگی زمانی (بدترین) | O(?) |
| پیچیدگی فضایی | O(?) |
| پایدار؟ | بله/خیر |
| درجا؟ | بله/خیر |
| بهترین برای | [کاربرد اصلی] |
| اجتناب کن وقتی | [کی استفاده نکن] |

### خلاصه یک خطی

> [نام الگوریتم] مثل [مثال ساده] هست - [چیکار می‌کنه] در زمان O(?) با [چطور کار می‌کنه].

### نکات کلیدی

۱. 🎯 [مهم‌ترین نکته]
۲. 🎯 [دومین نکته مهم]
۳. 🎯 [سومین نکته مهم]
`,

  // ============================================
  // FEATURES
  // ============================================
  hasVisualization: true,         // Does this lesson have a visualizer?
  visualizationId: 'algorithm-name', // ID for the visualizer component
  hasExercise: true,              // Does this lesson have exercises?
  exerciseId: 'algorithm-name',   // ID for the exercise
};

export default lessonTemplate;
