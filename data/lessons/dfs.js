export const dfsLesson = {
  id: 'dfs',
  title: 'Depth-First Search (DFS)',
  titleFa: 'جستجوی عمقی (DFS)',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Depth-First Search (DFS) - Exploring the Unknown, One Path at a Time

## What is DFS?

Imagine you're exploring a mysterious cave with many tunnels. You have two choices:
1. **Check every tunnel entrance first** (that's BFS)
2. **Pick one tunnel and go as DEEP as possible** before coming back (that's DFS!)

DFS is like being an adventurous explorer who says: "I'm going to follow this path ALL the way to the end before I try another path."

**Think of it like this:**
You're in a maze. Instead of checking all nearby paths, you pick ONE path and walk until you hit a dead end. Then you backtrack and try the next path.

---

## Why Should You Care?

**Real-world example:** When you browse folders on your computer and click into folder after folder... that's DFS! You go deep into one folder structure before coming back up.

Here's why DFS matters:
- **Solving puzzles**: Sudoku, mazes, and chess all use DFS
- **Finding paths**: Can you get from A to B in a network?
- **Detecting cycles**: Is there a loop in your data?
- **Topological sorting**: What order should tasks be done?

Without understanding DFS, you'll struggle with:
- Graph problems in interviews (very common!)
- Understanding how recursion really works
- Solving backtracking problems

---

## Real-Life Analogies

### Analogy 1: Exploring a Maze 🏰

Imagine you're in a maze trying to find the exit:

1. You start at the entrance
2. You pick a direction and KEEP GOING until you hit a wall
3. When you hit a dead end, you BACKTRACK to the last intersection
4. You try a different path from that intersection
5. Repeat until you find the exit!

**How it maps to code:**
- Picking a direction → Visiting a neighbor node
- Hitting a dead end → Node has no unvisited neighbors
- Backtracking → Returning from recursive call
- Finding the exit → Reaching your target node

### Analogy 2: Reading a Book with Footnotes 📚

Imagine reading a book where every page has footnotes that reference other pages:

1. You start reading page 1
2. Page 1 has a footnote saying "see page 5"
3. You immediately jump to page 5
4. Page 5 says "see page 12" - you jump there
5. Page 12 has no footnotes - you go BACK to page 5
6. Continue from where you left off

This is exactly how DFS explores! It goes DEEP into references before coming back.

---

## How Does It Work?

**The Algorithm (Simple Version):**
1. Start at a node and mark it as "visited"
2. Look at all neighbors of this node
3. For each unvisited neighbor, IMMEDIATELY go there (recursively)
4. When you can't go deeper, backtrack
5. Continue until all reachable nodes are visited

**Key Insight:** DFS uses a STACK (either explicitly or through recursion's call stack).

**Visual Representation:**

\`\`\`
    Graph:           DFS Order (starting from A):
    
      A               A (1) → B (2) → D (3) → E (4) → C (5)
     / \\
    B   C             We go A → B → D → E (deep!)
    |   |             Then backtrack to A
    D   |             Then go A → C
     \\ /
      E
      
    Visit order: A, B, D, E, C
\`\`\`

---

## Step-by-Step Walkthrough

### Example 1: Simple Graph Traversal

Let's trace DFS on this graph, starting from node 'A':

\`\`\`
Graph (Adjacency List):
A → [B, C]
B → [A, D]
C → [A, E]
D → [B]
E → [C]

Starting DFS from 'A':
\`\`\`

\`\`\`
Step 1: Visit A
  visited = {A}
  Neighbors of A: [B, C]
  → Go to B (first unvisited neighbor)

Step 2: Visit B
  visited = {A, B}
  Neighbors of B: [A, D]
  A is visited, skip
  → Go to D (first unvisited neighbor)

Step 3: Visit D
  visited = {A, B, D}
  Neighbors of D: [B]
  B is visited, skip
  → No unvisited neighbors! BACKTRACK to B

Step 4: Back at B
  All neighbors visited
  → BACKTRACK to A

Step 5: Back at A
  Neighbors of A: [B, C]
  B is visited, skip
  → Go to C (next unvisited neighbor)

Step 6: Visit C
  visited = {A, B, D, C}
  Neighbors of C: [A, E]
  A is visited, skip
  → Go to E

Step 7: Visit E
  visited = {A, B, D, C, E}
  Neighbors of E: [C]
  C is visited, skip
  → No unvisited neighbors! BACKTRACK

DFS Complete!
Visit Order: A → B → D → C → E
\`\`\`

---

## The Code

### Recursive DFS (Most Common)

\`\`\`javascript
/**
 * DFS - Recursive Implementation
 * Explores a graph depth-first using recursion
 * 
 * @param {Map} graph - Adjacency list representation
 * @param {any} node - Current node to visit
 * @param {Set} visited - Set of already visited nodes
 */
function dfs(graph, node, visited = new Set()) {
    // Base case: already visited this node
    if (visited.has(node)) {
        return;
    }
    
    // Mark current node as visited
    visited.add(node);
    console.log('Visiting:', node);
    
    // Get all neighbors of current node
    const neighbors = graph.get(node) || [];
    
    // Recursively visit each unvisited neighbor
    // This is where the "depth-first" magic happens!
    for (const neighbor of neighbors) {
        dfs(graph, neighbor, visited);  // Go DEEP immediately
    }
}

// ============================================
// EXAMPLE USAGE
// ============================================

// Create a graph using adjacency list
const graph = new Map();
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'D']);
graph.set('C', ['A', 'E']);
graph.set('D', ['B']);
graph.set('E', ['C']);

console.log('DFS Traversal:');
dfs(graph, 'A');
// Output: Visiting: A, B, D, C, E
\`\`\`

### Iterative DFS (Using Explicit Stack)

\`\`\`javascript
/**
 * DFS - Iterative Implementation
 * Uses an explicit stack instead of recursion
 * Useful when recursion depth might cause stack overflow
 */
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];  // Stack for DFS (LIFO)
    
    while (stack.length > 0) {
        // Pop from stack (LIFO = Last In, First Out)
        const node = stack.pop();
        
        // Skip if already visited
        if (visited.has(node)) {
            continue;
        }
        
        // Mark as visited and process
        visited.add(node);
        console.log('Visiting:', node);
        
        // Add all unvisited neighbors to stack
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
    
    return visited;
}
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space | Why? |
|------|------|-------|------|
| All Cases | O(V + E) | O(V) | Visit each vertex once, check each edge once |

**V** = number of vertices (nodes)
**E** = number of edges (connections)

### Why O(V + E)?

**Time Complexity:**
- We visit each node exactly ONCE: O(V)
- For each node, we check all its edges: O(E) total
- Combined: O(V + E)

**Space Complexity:**
- Visited set stores up to V nodes: O(V)
- Recursion stack (or explicit stack) can be up to V deep: O(V)
- Total: O(V)

### Comparison with BFS

| Feature | DFS | BFS |
|---------|-----|-----|
| Time | O(V + E) | O(V + E) |
| Space | O(V) | O(V) |
| Data Structure | Stack | Queue |
| Best For | Deep exploration, backtracking | Shortest path, level-order |

---

## When to Use / When NOT to Use

### ✅ Use DFS when:

- **Finding any path** (not necessarily shortest)
- **Detecting cycles** in a graph
- **Topological sorting** (task ordering)
- **Solving puzzles** like Sudoku, N-Queens
- **Exploring all possibilities** (backtracking)
- **Memory is limited** (DFS uses less memory than BFS for wide graphs)

### ❌ Don't use DFS when:

- **Finding shortest path** → Use BFS instead
- **Level-by-level traversal needed** → Use BFS
- **Graph is very deep** → Risk of stack overflow
- **Finding closest nodes** → BFS is better

---

## Common Mistakes

### Mistake 1: Forgetting to Mark Nodes as Visited

\`\`\`javascript
// ❌ WRONG - Infinite loop!
function dfsBad(graph, node) {
    console.log(node);
    for (const neighbor of graph.get(node) || []) {
        dfsBad(graph, neighbor);  // Will revisit same nodes forever!
    }
}

// ✅ CORRECT - Track visited nodes
function dfsGood(graph, node, visited = new Set()) {
    if (visited.has(node)) return;  // Skip if already visited
    visited.add(node);              // Mark as visited FIRST
    console.log(node);
    for (const neighbor of graph.get(node) || []) {
        dfsGood(graph, neighbor, visited);
    }
}
\`\`\`

**Why it's wrong:** Without tracking visited nodes, you'll loop forever in cyclic graphs!

### Mistake 2: Checking Visited AFTER Processing

\`\`\`javascript
// ❌ WRONG - Process node before checking
function dfsBad(graph, node, visited = new Set()) {
    console.log(node);  // Process first
    visited.add(node);  // Then mark visited
    // Problem: might process same node multiple times!
}

// ✅ CORRECT - Check and mark BEFORE processing
function dfsGood(graph, node, visited = new Set()) {
    if (visited.has(node)) return;  // Check first!
    visited.add(node);              // Mark immediately
    console.log(node);              // Then process
}
\`\`\`

### Mistake 3: Not Handling Disconnected Graphs

\`\`\`javascript
// ❌ WRONG - Only explores connected component
function dfsBad(graph, start) {
    const visited = new Set();
    dfs(graph, start, visited);
    return visited;  // Misses disconnected nodes!
}

// ✅ CORRECT - Start DFS from all unvisited nodes
function dfsAll(graph) {
    const visited = new Set();
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(graph, node, visited);
        }
    }
    return visited;  // Gets ALL nodes
}
\`\`\`

---

## Real-World Applications

### 1. Web Crawlers 🕷️

**Where:** Google, Bing, search engines

**How it's used:** Crawlers use DFS to follow links deep into a website before backtracking. Start at homepage, follow first link, then follow links on that page, etc.

### 2. File System Traversal 📁

**Where:** Every operating system

**How it's used:** When you search for a file, the OS uses DFS to go deep into folder structures. That's why it explores one folder completely before moving to siblings.

### 3. Puzzle Solvers 🧩

**Where:** Sudoku solvers, chess engines, maze generators

**How it's used:** Try one possibility, go deep. If it fails, backtrack and try another. This is DFS + backtracking!

### 4. Detecting Cycles 🔄

**Where:** Dependency management (npm, pip), deadlock detection

**How it's used:** DFS can detect if there's a cycle in dependencies. If you revisit a node that's still being processed, there's a cycle!

---

## Interview Tips

### Common Interview Questions

1. **"Implement DFS on a graph"**
   - What they're testing: Basic graph traversal
   - Key insight: Use recursion + visited set

2. **"Find if path exists between two nodes"**
   - What they're testing: DFS application
   - Key insight: Return true when target found

3. **"Detect cycle in directed graph"**
   - What they're testing: Advanced DFS
   - Key insight: Track nodes in current path (recursion stack)

4. **"Number of islands problem"**
   - What they're testing: DFS on 2D grid
   - Key insight: Treat grid as graph, DFS from each '1'

### What Interviewers Look For

- ✅ Correctly handling visited nodes
- ✅ Understanding when to use DFS vs BFS
- ✅ Clean recursive implementation
- ✅ Ability to convert to iterative if asked
- ❌ Forgetting base cases
- ❌ Not handling disconnected components

### Pro Tips

💡 **Tip 1:** Always ask if the graph can have cycles. This determines if you need visited tracking.

💡 **Tip 2:** For "find path" problems, you can return early when target is found.

💡 **Tip 3:** For cycle detection in directed graphs, you need TWO sets: visited and inCurrentPath.

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time Complexity | O(V + E) |
| Space Complexity | O(V) |
| Data Structure | Stack (implicit via recursion or explicit) |
| Traversal Order | Deep first, then backtrack |
| Best For | Path finding, cycle detection, backtracking |
| Avoid When | Need shortest path, level-order traversal |

### One-Liner Summary

> DFS is like exploring a maze by going as deep as possible down one path before backtracking - it uses a stack and runs in O(V + E) time.

### Key Takeaways

1. 🎯 DFS goes DEEP first, then backtracks
2. 🎯 Always track visited nodes to avoid infinite loops
3. 🎯 Use recursion (easy) or explicit stack (safe for deep graphs)
4. 🎯 O(V + E) time, O(V) space
5. 🎯 Perfect for: cycles, paths, backtracking, puzzles
`,

  contentFa: `
# جستجوی عمقی (DFS) - کاوش ناشناخته‌ها، یک مسیر در هر لحظه

## جستجوی عمقی چیست؟

تصور کن داری یه غار مرموز با کلی تونل کاوش می‌کنی. دو انتخاب داری:
۱. **اول همه ورودی تونل‌ها رو چک کنی** (این BFS هست)
۲. **یه تونل انتخاب کنی و تا جایی که می‌شه عمیق بری** قبل از برگشتن (این DFS هست!)

DFS مثل یه کاوشگر ماجراجو هست که می‌گه: "من این مسیر رو تا آخرش می‌رم قبل از اینکه مسیر دیگه‌ای رو امتحان کنم."

**اینطوری فکر کن:**
توی یه ماز هستی. به جای چک کردن همه مسیرهای نزدیک، یه مسیر انتخاب می‌کنی و راه می‌ری تا به بن‌بست برسی. بعد برمی‌گردی و مسیر بعدی رو امتحان می‌کنی.

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** وقتی توی کامپیوترت پوشه‌ها رو مرور می‌کنی و می‌ری توی پوشه، بعد پوشه، بعد پوشه... این DFS هست! عمیق می‌ری توی یه ساختار پوشه قبل از برگشتن.

چرا DFS مهمه:
- **حل پازل‌ها**: سودوکو، ماز، و شطرنج همه از DFS استفاده می‌کنن
- **پیدا کردن مسیر**: آیا می‌شه از A به B رسید؟
- **تشخیص چرخه**: آیا توی داده‌هات حلقه هست؟
- **مرتب‌سازی توپولوژیکی**: کارها به چه ترتیبی باید انجام بشن؟

بدون فهمیدن DFS، با این‌ها مشکل خواهی داشت:
- مسائل گراف توی مصاحبه‌ها (خیلی رایجه!)
- فهمیدن اینکه بازگشت واقعاً چطور کار می‌کنه
- حل مسائل backtracking

---

## مثال‌های زندگی واقعی

### مثال ۱: کاوش یک ماز 🏰

تصور کن توی یه ماز هستی و داری دنبال خروجی می‌گردی:

۱. از ورودی شروع می‌کنی
۲. یه جهت انتخاب می‌کنی و ادامه می‌دی تا به دیوار بخوری
۳. وقتی به بن‌بست رسیدی، برمی‌گردی به آخرین تقاطع
۴. یه مسیر دیگه از اون تقاطع امتحان می‌کنی
۵. تکرار تا خروجی رو پیدا کنی!

**چطور به کد ربط داره:**
- انتخاب جهت → بازدید از یه گره همسایه
- رسیدن به بن‌بست → گره همسایه بازدید نشده نداره
- برگشتن → برگشت از فراخوانی بازگشتی
- پیدا کردن خروجی → رسیدن به گره هدف

### مثال ۲: خوندن کتاب با پاورقی 📚

تصور کن داری کتابی می‌خونی که هر صفحه‌اش پاورقی داره که به صفحات دیگه ارجاع می‌ده:

۱. شروع می‌کنی به خوندن صفحه ۱
۲. صفحه ۱ پاورقی داره که می‌گه "صفحه ۵ رو ببین"
۳. فوراً می‌ری صفحه ۵
۴. صفحه ۵ می‌گه "صفحه ۱۲ رو ببین" - می‌ری اونجا
۵. صفحه ۱۲ پاورقی نداره - برمی‌گردی به صفحه ۵
۶. از جایی که موندی ادامه می‌دی

این دقیقاً همون کاریه که DFS می‌کنه! عمیق می‌ره توی ارجاعات قبل از برگشتن.

---

## چطور کار می‌کنه؟

**الگوریتم (نسخه ساده):**
۱. از یه گره شروع کن و علامت بزن "بازدید شده"
۲. به همه همسایه‌های این گره نگاه کن
۳. برای هر همسایه بازدید نشده، فوراً برو اونجا (بازگشتی)
۴. وقتی نمی‌تونی عمیق‌تر بری، برگرد
۵. ادامه بده تا همه گره‌های قابل دسترس بازدید بشن

**نکته کلیدی:** DFS از STACK استفاده می‌کنه (یا صریح یا از طریق پشته فراخوانی بازگشت).

---

## راهنمای قدم به قدم

### مثال ۱: پیمایش ساده گراف

بیا DFS رو روی این گراف ردیابی کنیم، شروع از گره 'A':

\`\`\`
گراف (لیست مجاورت):
A → [B, C]
B → [A, D]
C → [A, E]
D → [B]
E → [C]

شروع DFS از 'A':
\`\`\`

\`\`\`
قدم ۱: بازدید A
  visited = {A}
  همسایه‌های A: [B, C]
  → برو به B (اولین همسایه بازدید نشده)

قدم ۲: بازدید B
  visited = {A, B}
  همسایه‌های B: [A, D]
  A بازدید شده، رد شو
  → برو به D

قدم ۳: بازدید D
  visited = {A, B, D}
  همسایه‌های D: [B]
  B بازدید شده، رد شو
  → همسایه بازدید نشده نداره! برگرد به B

قدم ۴: برگشت به B
  همه همسایه‌ها بازدید شدن
  → برگرد به A

قدم ۵: برگشت به A
  همسایه‌های A: [B, C]
  B بازدید شده، رد شو
  → برو به C

قدم ۶: بازدید C
  visited = {A, B, D, C}
  → برو به E

قدم ۷: بازدید E
  visited = {A, B, D, C, E}
  → برگرد

DFS تموم شد!
ترتیب بازدید: A → B → D → C → E
\`\`\`

---

## کد

### DFS بازگشتی (رایج‌ترین)

\`\`\`javascript
/**
 * DFS - پیاده‌سازی بازگشتی
 * گراف رو به صورت عمقی با بازگشت کاوش می‌کنه
 */
function dfs(graph, node, visited = new Set()) {
    // حالت پایه: قبلاً این گره رو بازدید کردیم
    if (visited.has(node)) {
        return;
    }
    
    // گره فعلی رو علامت بزن بازدید شده
    visited.add(node);
    console.log('بازدید:', node);
    
    // همه همسایه‌های گره فعلی رو بگیر
    const neighbors = graph.get(node) || [];
    
    // به صورت بازگشتی هر همسایه بازدید نشده رو بازدید کن
    for (const neighbor of neighbors) {
        dfs(graph, neighbor, visited);  // فوراً عمیق برو
    }
}

// مثال استفاده
const graph = new Map();
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'D']);
graph.set('C', ['A', 'E']);
graph.set('D', ['B']);
graph.set('E', ['C']);

dfs(graph, 'A');
// خروجی: بازدید: A, B, D, C, E
\`\`\`

### DFS تکراری (با Stack صریح)

\`\`\`javascript
/**
 * DFS - پیاده‌سازی تکراری
 * از stack صریح به جای بازگشت استفاده می‌کنه
 */
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    
    while (stack.length > 0) {
        const node = stack.pop();
        
        if (visited.has(node)) {
            continue;
        }
        
        visited.add(node);
        console.log('بازدید:', node);
        
        const neighbors = graph.get(node) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
    
    return visited;
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا | چرا؟ |
|------|------|-----|------|
| همه حالات | O(V + E) | O(V) | هر رأس یک بار بازدید، هر یال یک بار چک |

**V** = تعداد رئوس (گره‌ها)
**E** = تعداد یال‌ها (اتصالات)

### چرا O(V + E)؟

**پیچیدگی زمانی:**
- هر گره رو دقیقاً یک بار بازدید می‌کنیم: O(V)
- برای هر گره، همه یال‌هاش رو چک می‌کنیم: O(E) در کل
- ترکیب: O(V + E)

**پیچیدگی فضایی:**
- مجموعه visited تا V گره ذخیره می‌کنه: O(V)
- پشته بازگشت می‌تونه تا V عمق داشته باشه: O(V)

---

## کی استفاده کنیم / کی استفاده نکنیم

### ✅ استفاده کن وقتی:

- **پیدا کردن هر مسیری** (نه لزوماً کوتاه‌ترین)
- **تشخیص چرخه** توی گراف
- **مرتب‌سازی توپولوژیکی** (ترتیب کارها)
- **حل پازل‌ها** مثل سودوکو، N-Queens
- **کاوش همه احتمالات** (backtracking)

### ❌ استفاده نکن وقتی:

- **پیدا کردن کوتاه‌ترین مسیر** → از BFS استفاده کن
- **پیمایش سطح به سطح لازمه** → از BFS استفاده کن
- **گراف خیلی عمیقه** → خطر stack overflow

---

## اشتباهات رایج

### اشتباه ۱: فراموش کردن علامت‌گذاری گره‌ها

\`\`\`javascript
// ❌ اشتباه - حلقه بی‌نهایت!
function dfsBad(graph, node) {
    console.log(node);
    for (const neighbor of graph.get(node) || []) {
        dfsBad(graph, neighbor);  // همون گره‌ها رو تا ابد بازدید می‌کنه!
    }
}

// ✅ درست - گره‌های بازدید شده رو ردیابی کن
function dfsGood(graph, node, visited = new Set()) {
    if (visited.has(node)) return;
    visited.add(node);
    console.log(node);
    for (const neighbor of graph.get(node) || []) {
        dfsGood(graph, neighbor, visited);
    }
}
\`\`\`

**چرا اشتباهه:** بدون ردیابی گره‌های بازدید شده، توی گراف‌های چرخه‌ای تا ابد حلقه می‌زنی!

### اشتباه ۲: چک کردن بازدید بعد از پردازش

\`\`\`javascript
// ❌ اشتباه
function dfsBad(graph, node, visited = new Set()) {
    console.log(node);  // اول پردازش
    visited.add(node);  // بعد علامت‌گذاری
}

// ✅ درست
function dfsGood(graph, node, visited = new Set()) {
    if (visited.has(node)) return;  // اول چک کن!
    visited.add(node);              // فوراً علامت بزن
    console.log(node);              // بعد پردازش کن
}
\`\`\`

### اشتباه ۳: نادیده گرفتن گراف‌های ناپیوسته

\`\`\`javascript
// ❌ اشتباه - فقط مؤلفه متصل رو کاوش می‌کنه
function dfsBad(graph, start) {
    const visited = new Set();
    dfs(graph, start, visited);
    return visited;  // گره‌های ناپیوسته رو از دست می‌ده!
}

// ✅ درست - از همه گره‌های بازدید نشده DFS شروع کن
function dfsAll(graph) {
    const visited = new Set();
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(graph, node, visited);
        }
    }
    return visited;  // همه گره‌ها رو می‌گیره
}
\`\`\`

---

## کاربردهای دنیای واقعی

### ۱. خزنده‌های وب 🕷️

**کجا:** گوگل، بینگ، موتورهای جستجو

**چطور استفاده می‌شه:** خزنده‌ها از DFS برای دنبال کردن لینک‌ها عمیق توی یه وبسایت قبل از برگشتن استفاده می‌کنن.

### ۲. پیمایش سیستم فایل 📁

**کجا:** همه سیستم‌عامل‌ها

**چطور استفاده می‌شه:** وقتی دنبال یه فایل می‌گردی، سیستم‌عامل از DFS برای رفتن عمیق توی ساختار پوشه‌ها استفاده می‌کنه.

### ۳. حل‌کننده پازل 🧩

**کجا:** حل‌کننده سودوکو، موتورهای شطرنج، تولیدکننده ماز

**چطور استفاده می‌شه:** یه احتمال رو امتحان کن، عمیق برو. اگه شکست خورد، برگرد و یکی دیگه امتحان کن.

### ۴. تشخیص چرخه 🔄

**کجا:** مدیریت وابستگی (npm, pip)، تشخیص deadlock

**چطور استفاده می‌شه:** DFS می‌تونه تشخیص بده آیا توی وابستگی‌ها چرخه هست.

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| پیچیدگی زمانی | O(V + E) |
| پیچیدگی فضایی | O(V) |
| ساختار داده | Stack (ضمنی از طریق بازگشت یا صریح) |
| ترتیب پیمایش | اول عمیق، بعد برگشت |
| بهترین برای | پیدا کردن مسیر، تشخیص چرخه، backtracking |
| اجتناب کن وقتی | کوتاه‌ترین مسیر لازمه، پیمایش سطحی |

### خلاصه یک خطی

> DFS مثل کاوش یه ماز با رفتن تا جایی که می‌شه عمیق توی یه مسیر قبل از برگشتن هست - از stack استفاده می‌کنه و در زمان O(V + E) اجرا می‌شه.

### نکات کلیدی

۱. 🎯 DFS اول عمیق می‌ره، بعد برمی‌گرده
۲. 🎯 همیشه گره‌های بازدید شده رو ردیابی کن تا از حلقه بی‌نهایت جلوگیری کنی
۳. 🎯 از بازگشت (راحت) یا stack صریح (امن برای گراف‌های عمیق) استفاده کن
۴. 🎯 زمان O(V + E)، فضا O(V)
۵. 🎯 عالی برای: چرخه‌ها، مسیرها، backtracking، پازل‌ها
`,
  
  hasVisualization: true,
  visualizationId: 'dfs',
  hasExercise: true,
  exerciseId: 'dfs',
};

export default dfsLesson;
