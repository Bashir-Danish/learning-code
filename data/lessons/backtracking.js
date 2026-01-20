export const backtrackingLesson = {
  id: 'backtracking',
  title: 'Backtracking',
  titleFa: 'عقبگرد',
  difficulty: 'hard',
  estimatedTime: '60 min',
  
  content: `
# Backtracking - Try, Fail, Undo, Repeat

## What is Backtracking?

Imagine solving a maze - you try a path, hit a dead end, go back, try another path. That's backtracking!

**Think of it like:**
- Solving a maze - try paths, backtrack on dead ends
- Trying combinations on a lock - try, fail, try next
- Playing chess - consider moves, undo bad ones

---

## Why Should You Care?

- Solves constraint satisfaction problems
- Foundation for N-Queens, Sudoku, word search
- 10%+ of hard interview problems use backtracking
- Generates all valid combinations/permutations

---

## The Backtracking Template

\`\`\`javascript
function backtrack(candidate) {
    // 1. Check if we found a solution
    if (isSolution(candidate)) {
        output(candidate);
        return;
    }
    
    // 2. Try all possibilities
    for (let choice of choices) {
        // 3. Skip invalid choices (pruning)
        if (!isValid(choice)) continue;
        
        // 4. Make the choice
        candidate.push(choice);
        
        // 5. Recurse
        backtrack(candidate);
        
        // 6. Undo the choice (backtrack!)
        candidate.pop();
    }
}
\`\`\`

---

## Problem 1: N-Queens

Place N queens on NxN board so no two attack each other.

\`\`\`javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        // Check diagonals
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';     // Place queen
                backtrack(row + 1);         // Next row
                board[row][col] = '.';     // Remove queen
            }
        }
    }
    
    backtrack(0);
    return result;
}
\`\`\`

---

## Problem 2: Combination Sum

Find all combinations that sum to target.

\`\`\`javascript
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, remaining - candidates[i]);
            current.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}
// combinationSum([2,3,6,7], 7) → [[2,2,3], [7]]
\`\`\`

---

## Problem 3: Word Search

Find if word exists in grid.

\`\`\`javascript
function exist(board, word) {
    const rows = board.length, cols = board[0].length;
    
    function backtrack(r, c, idx) {
        if (idx === word.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
        if (board[r][c] !== word[idx]) return false;
        
        const temp = board[r][c];
        board[r][c] = '#';  // Mark visited
        
        const found = backtrack(r + 1, c, idx + 1) ||
                      backtrack(r - 1, c, idx + 1) ||
                      backtrack(r, c + 1, idx + 1) ||
                      backtrack(r, c - 1, idx + 1);
        
        board[r][c] = temp;  // Restore
        return found;
    }
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (backtrack(r, c, 0)) return true;
        }
    }
    return false;
}
\`\`\`

---

## Common Mistakes

### 1. Forgetting to Backtrack
\`\`\`javascript
// ❌ WRONG - never undoes the choice
current.push(choice);
backtrack(current);
// Missing: current.pop();

// ✅ CORRECT - always undo
current.push(choice);
backtrack(current);
current.pop();  // Backtrack!
\`\`\`

### 2. Not Pruning Invalid Paths
\`\`\`javascript
// ❌ WRONG - tries invalid choices
for (let choice of choices) {
    backtrack(choice);  // Wastes time on invalid
}

// ✅ CORRECT - skip invalid early
for (let choice of choices) {
    if (!isValid(choice)) continue;  // Prune!
    backtrack(choice);
}
\`\`\`

### 3. Modifying Shared State
\`\`\`javascript
// ❌ WRONG - pushes reference
result.push(current);  // All results point to same array!

// ✅ CORRECT - push copy
result.push([...current]);  // New array each time
\`\`\`

---

## Backtracking vs DFS

| Backtracking | DFS |
|--------------|-----|
| Builds solution incrementally | Explores all paths |
| Undoes choices | Just visits nodes |
| Prunes invalid paths | Visits everything |
| For constraint problems | For traversal |

---

## Interview Tips

- Draw the decision tree
- Identify what choices you make at each step
- Think about how to prune invalid paths early
- "I'll use backtracking to try all possibilities and prune invalid ones"

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Pattern | Try → Recurse → Undo |
| Time | Often O(2^n) or O(n!) |
| Space | O(n) for recursion |
| Key | Always backtrack (undo)! |

> **One-liner:** Backtracking = try a choice, recurse, undo the choice. Always prune invalid paths early. Don't forget to undo!
`,

  contentFa: `
# عقبگرد - امتحان کن، شکست بخور، برگردون، تکرار کن

## عقبگرد چیست؟

تصور کن داری یه ماز رو حل می‌کنی - یه مسیر رو امتحان می‌کنی، به بن‌بست می‌رسی، برمی‌گردی، مسیر دیگه رو امتحان می‌کنی. این عقبگرده!

**مثل این فکر کن:**
- حل کردن ماز - مسیرها رو امتحان کن، در بن‌بست برگرد
- امتحان کردن ترکیب‌های قفل - امتحان کن، شکست، بعدی رو امتحان کن
- بازی شطرنج - حرکات رو در نظر بگیر، بدها رو برگردون

---

## چرا باید اهمیت بدی؟

- مسائل رضایت محدودیت رو حل می‌کنه
- پایه N-Queens، سودوکو، جستجوی کلمه
- ۱۰%+ مسائل سخت مصاحبه از عقبگرد استفاده می‌کنن
- همه ترکیب‌ها/جایگشت‌های معتبر رو تولید می‌کنه

---

## قالب عقبگرد

backtrack(candidate):
    // 1. چک کن آیا جواب پیدا کردیم
    اگه isSolution(candidate):
        output(candidate)
        return
    
    // 2. همه امکانات رو امتحان کن
    برای هر choice در choices:
        // 3. انتخاب‌های نامعتبر رو رد کن (هرس)
        اگه !isValid(choice): continue
        
        // 4. انتخاب رو انجام بده
        candidate.push(choice)
        
        // 5. بازگشت
        backtrack(candidate)
        
        // 6. انتخاب رو برگردون (عقبگرد!)
        candidate.pop()

---

## مسئله ۱: N-Queens

N وزیر رو روی صفحه NxN بذار طوری که هیچ دوتایی به هم حمله نکنن.

solveNQueens(n):
    result = []
    board = آرایه n×n از '.'
    
    isValid(row, col):
        // ستون رو چک کن
        برای i از 0 تا row:
            اگه board[i][col] === 'Q': return false
        // قطرها رو چک کن
        ...
        return true
    
    backtrack(row):
        اگه row === n:
            result.push(board رو به رشته تبدیل کن)
            return
        
        برای col از 0 تا n:
            اگه isValid(row, col):
                board[row][col] = 'Q'     // وزیر بذار
                backtrack(row + 1)         // ردیف بعدی
                board[row][col] = '.'     // وزیر رو بردار
    
    backtrack(0)
    return result

---

## مسئله ۲: مجموع ترکیبی

همه ترکیب‌هایی که جمعشون برابر هدف می‌شه رو پیدا کن.

combinationSum(candidates, target):
    result = []
    
    backtrack(start, current, remaining):
        اگه remaining === 0:
            result.push([...current])
            return
        اگه remaining < 0: return
        
        برای i از start تا candidates.length:
            current.push(candidates[i])
            backtrack(i, current, remaining - candidates[i])
            current.pop()
    
    backtrack(0, [], target)
    return result

combinationSum([2,3,6,7], 7) → [[2,2,3], [7]]

---

## مسئله ۳: جستجوی کلمه

پیدا کن آیا کلمه در شبکه وجود داره.

exist(board, word):
    rows = board.length, cols = board[0].length
    
    backtrack(r, c, idx):
        اگه idx === word.length: return true
        اگه خارج از محدوده: return false
        اگه board[r][c] !== word[idx]: return false
        
        temp = board[r][c]
        board[r][c] = '#'  // بازدید شده علامت بزن
        
        found = backtrack(r+1, c, idx+1) ||
                backtrack(r-1, c, idx+1) ||
                backtrack(r, c+1, idx+1) ||
                backtrack(r, c-1, idx+1)
        
        board[r][c] = temp  // برگردون
        return found
    
    برای هر خانه:
        اگه backtrack(r, c, 0): return true
    return false

---

## اشتباهات رایج

### ۱. فراموش کردن عقبگرد
❌ اشتباه: هیچوقت انتخاب رو برنمی‌گردونه
current.push(choice)
backtrack(current)
// نداره: current.pop()

✅ درست: همیشه برگردون
current.push(choice)
backtrack(current)
current.pop()  // عقبگرد!

### ۲. هرس نکردن مسیرهای نامعتبر
❌ اشتباه: انتخاب‌های نامعتبر رو امتحان می‌کنه
✅ درست: زود رد کن

### ۳. تغییر دادن state مشترک
❌ اشتباه: رفرنس رو push می‌کنه
result.push(current)  // همه نتایج به یه آرایه اشاره می‌کنن!

✅ درست: کپی رو push کن
result.push([...current])  // هر بار آرایه جدید

---

## عقبگرد در مقابل DFS

| عقبگرد | DFS |
|--------|-----|
| جواب رو تدریجی می‌سازه | همه مسیرها رو کاوش می‌کنه |
| انتخاب‌ها رو برمی‌گردونه | فقط گره‌ها رو بازدید می‌کنه |
| مسیرهای نامعتبر رو هرس می‌کنه | همه چیز رو بازدید می‌کنه |
| برای مسائل محدودیت | برای پیمایش |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| الگو | امتحان → بازگشت → برگردون |
| زمان | معمولاً O(2^n) یا O(n!) |
| فضا | O(n) برای بازگشت |
| کلید | همیشه عقبگرد کن (برگردون)! |

> **یک خطی:** عقبگرد = یه انتخاب رو امتحان کن، بازگشت، انتخاب رو برگردون. همیشه مسیرهای نامعتبر رو زود هرس کن. برگردوندن رو فراموش نکن!
`,

  visualizationId: 'backtracking',
  exerciseId: 'backtracking',
};

export default backtrackingLesson;
