export const topologicalSortLesson = {
  id: 'topological-sort',
  title: 'Topological Sort',
  titleFa: 'مرتب‌سازی توپولوژیکی',
  difficulty: 'hard',
  estimatedTime: '50 min',
  
  content: `
# Topological Sort - Ordering Tasks with Dependencies

## What is Topological Sort?

Imagine you're getting dressed in the morning. You can't put on shoes before socks, or a shirt before underwear. There's an ORDER you must follow based on dependencies.

Topological Sort finds a valid order to do tasks when some tasks depend on others!

**Think of it like this:**
You're taking university courses. Some courses have prerequisites - you can't take "Advanced Math" before "Basic Math". Topological sort gives you a valid order to take all courses.

---

## Why Should You Care?

**Real-world example:** When you run \`npm install\`, npm uses topological sort to figure out which packages to install first based on dependencies!

Here's why it matters:
- **Build Systems**: Compile files in correct order
- **Package Managers**: Install dependencies first
- **Task Scheduling**: Do prerequisite tasks first
- **Course Planning**: Take prerequisites before advanced courses

---

## Real-Life Analogies

### Analogy 1: Getting Dressed 👔

You need to put on clothes in order:
- Underwear → Pants → Belt
- Socks → Shoes
- Shirt → Jacket

Valid order: Underwear, Socks, Pants, Shirt, Belt, Shoes, Jacket

### Analogy 2: Making Breakfast 🍳

To make eggs and toast:
- Get pan → Heat pan → Crack eggs → Cook eggs
- Get bread → Put in toaster → Toast ready

Some things can be parallel, but dependencies must be respected!

---

## How Does It Work?

**Key Requirement:** Graph must be a DAG (Directed Acyclic Graph) - no cycles!

**Two Approaches:**
1. **DFS-based**: Process nodes, add to result AFTER visiting all descendants
2. **Kahn's Algorithm (BFS)**: Start with nodes that have no dependencies

---

## Step-by-Step Walkthrough

### Example: Course Prerequisites

\`\`\`
Courses and prerequisites:
- Math 101: no prerequisites
- Math 201: requires Math 101
- CS 101: no prerequisites  
- CS 201: requires CS 101, Math 101
- CS 301: requires CS 201

Graph:
Math101 → Math201
Math101 → CS201
CS101 → CS201
CS201 → CS301
\`\`\`

**Using Kahn's Algorithm:**

\`\`\`
Step 1: Calculate in-degrees
  Math101: 0, Math201: 1, CS101: 0, CS201: 2, CS301: 1

Step 2: Start with in-degree 0
  Queue: [Math101, CS101]

Step 3: Process Math101
  Result: [Math101]
  Reduce in-degree of Math201 (now 0), CS201 (now 1)
  Queue: [CS101, Math201]

Step 4: Process CS101
  Result: [Math101, CS101]
  Reduce in-degree of CS201 (now 0)
  Queue: [Math201, CS201]

Step 5: Process Math201
  Result: [Math101, CS101, Math201]
  Queue: [CS201]

Step 6: Process CS201
  Result: [Math101, CS101, Math201, CS201]
  Reduce in-degree of CS301 (now 0)
  Queue: [CS301]

Step 7: Process CS301
  Result: [Math101, CS101, Math201, CS201, CS301]

Valid order to take courses!
\`\`\`

---

## The Code

### DFS Approach

\`\`\`javascript
function topologicalSortDFS(graph) {
    const visited = new Set();
    const result = [];
    
    function dfs(node) {
        visited.add(node);
        
        // Visit all neighbors first
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        
        // Add to front AFTER processing all descendants
        result.unshift(node);
    }
    
    // Start DFS from all unvisited nodes
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }
    
    return result;
}
\`\`\`

### Kahn's Algorithm (BFS)

\`\`\`javascript
function topologicalSortKahn(graph, numNodes) {
    // Calculate in-degree for each node
    const inDegree = new Map();
    for (const node of graph.keys()) {
        if (!inDegree.has(node)) inDegree.set(node, 0);
        for (const neighbor of graph.get(node) || []) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        }
    }
    
    // Start with nodes having 0 in-degree
    const queue = [];
    for (const [node, degree] of inDegree) {
        if (degree === 0) queue.push(node);
    }
    
    const result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        // Reduce in-degree of neighbors
        for (const neighbor of graph.get(node) || []) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // If result doesn't include all nodes, there's a cycle!
    return result.length === graph.size ? result : null;
}
\`\`\`

### Course Schedule Problem (LeetCode 207)

\`\`\`javascript
function canFinish(numCourses, prerequisites) {
    const graph = new Map();
    const inDegree = new Array(numCourses).fill(0);
    
    // Build graph
    for (const [course, prereq] of prerequisites) {
        if (!graph.has(prereq)) graph.set(prereq, []);
        graph.get(prereq).push(course);
        inDegree[course]++;
    }
    
    // Start with courses that have no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    
    let completed = 0;
    while (queue.length > 0) {
        const course = queue.shift();
        completed++;
        
        for (const next of graph.get(course) || []) {
            inDegree[next]--;
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }
    
    return completed === numCourses;
}
\`\`\`

---

## Time & Space Complexity

| Approach | Time | Space |
|----------|------|-------|
| DFS | O(V + E) | O(V) |
| Kahn's (BFS) | O(V + E) | O(V) |

---

## When to Use / When NOT to Use

### ✅ Use Topological Sort when:
- Tasks have **dependencies**
- Need to find **valid ordering**
- Graph is a **DAG** (no cycles)

### ❌ Don't use when:
- Graph has **cycles** → No valid ordering exists
- No dependencies → Just iterate normally

---

## Common Mistakes

### Mistake 1: Not detecting cycles

\`\`\`javascript
// ❌ WRONG - doesn't detect cycles
function badTopoSort(graph) {
    // ... returns invalid result for cyclic graph
}

// ✅ CORRECT - check if all nodes processed
if (result.length !== numNodes) {
    return null; // Cycle detected!
}
\`\`\`

### Mistake 2: Adding node at wrong time in DFS

\`\`\`javascript
// ❌ WRONG - add before processing neighbors
result.push(node);
for (const neighbor of neighbors) dfs(neighbor);

// ✅ CORRECT - add AFTER processing all neighbors
for (const neighbor of neighbors) dfs(neighbor);
result.unshift(node);
\`\`\`

---

## Real-World Applications

1. **Build Systems**: Make, Webpack compile order
2. **Package Managers**: npm, pip dependency resolution
3. **Spreadsheets**: Calculate cells in correct order
4. **Course Scheduling**: University course planning

---

## Interview Tips

**Common Questions:**
1. "Course Schedule" (can you finish all courses?)
2. "Course Schedule II" (find valid order)
3. "Alien Dictionary" (derive order from sorted words)

**What interviewers look for:**
- ✅ Understanding DAG requirement
- ✅ Detecting cycles
- ✅ Both DFS and BFS approaches

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time | O(V + E) |
| Space | O(V) |
| Requires | DAG (no cycles) |
| Best For | Task scheduling, dependencies |
| Approaches | DFS or Kahn's (BFS) |
`,

  contentFa: `
# مرتب‌سازی توپولوژیکی - ترتیب‌دهی کارها با وابستگی

## مرتب‌سازی توپولوژیکی چیست؟

تصور کن صبح داری لباس می‌پوشی. نمی‌تونی کفش بپوشی قبل از جوراب، یا پیراهن قبل از زیرپوش. یه ترتیب هست که باید رعایت کنی.

مرتب‌سازی توپولوژیکی یه ترتیب معتبر برای انجام کارها وقتی بعضی کارها به بقیه وابسته هستن پیدا می‌کنه!

**اینطوری فکر کن:**
داری درس‌های دانشگاه می‌خونی. بعضی درس‌ها پیش‌نیاز دارن - نمی‌تونی "ریاضی پیشرفته" رو قبل از "ریاضی پایه" بخونی.

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** وقتی \`npm install\` اجرا می‌کنی، npm از مرتب‌سازی توپولوژیکی استفاده می‌کنه تا بفهمه کدوم پکیج‌ها رو اول نصب کنه!

چرا مهمه:
- **سیستم‌های Build**: کامپایل فایل‌ها به ترتیب درست
- **مدیر پکیج**: اول وابستگی‌ها رو نصب کن
- **زمان‌بندی کارها**: اول کارهای پیش‌نیاز رو انجام بده

---

## مثال‌های زندگی واقعی

### مثال ۱: لباس پوشیدن 👔

باید لباس‌ها رو به ترتیب بپوشی:
- زیرپوش → شلوار → کمربند
- جوراب → کفش
- پیراهن → کت

ترتیب معتبر: زیرپوش، جوراب، شلوار، پیراهن، کمربند، کفش، کت

### مثال ۲: درست کردن صبحانه 🍳

برای درست کردن تخم‌مرغ و نان تست:
- ماهیتابه بردار → گرم کن → تخم‌مرغ بشکن → بپز
- نان بردار → بذار توی توستر → آماده

---

## چطور کار می‌کنه؟

**نیاز کلیدی:** گراف باید DAG باشه (گراف جهت‌دار بدون چرخه)!

**دو روش:**
1. **مبتنی بر DFS**: گره‌ها رو پردازش کن، بعد از بازدید همه فرزندان به نتیجه اضافه کن
2. **الگوریتم Kahn (BFS)**: با گره‌هایی که وابستگی ندارن شروع کن

---

## راهنمای قدم به قدم

### مثال: پیش‌نیازهای درس

\`\`\`
درس‌ها و پیش‌نیازها:
- ریاضی۱۰۱: بدون پیش‌نیاز
- ریاضی۲۰۱: نیاز به ریاضی۱۰۱
- CS101: بدون پیش‌نیاز
- CS201: نیاز به CS101، ریاضی۱۰۱
- CS301: نیاز به CS201
\`\`\`

**با الگوریتم Kahn:**

\`\`\`
قدم ۱: محاسبه درجه ورودی
  ریاضی۱۰۱: ۰، ریاضی۲۰۱: ۱، CS101: ۰، CS201: ۲، CS301: ۱

قدم ۲: شروع با درجه ورودی ۰
  صف: [ریاضی۱۰۱، CS101]

قدم ۳-۷: پردازش به ترتیب...

نتیجه: [ریاضی۱۰۱، CS101، ریاضی۲۰۱، CS201، CS301]
ترتیب معتبر برای گرفتن درس‌ها!
\`\`\`

---

## کد

### روش DFS

\`\`\`javascript
function topologicalSortDFS(graph) {
    const visited = new Set();
    const result = [];
    
    function dfs(node) {
        visited.add(node);
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        result.unshift(node); // بعد از پردازش همه فرزندان اضافه کن
    }
    
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }
    return result;
}
\`\`\`

### الگوریتم Kahn (BFS)

\`\`\`javascript
function topologicalSortKahn(graph, numNodes) {
    const inDegree = new Map();
    // محاسبه درجه ورودی...
    
    const queue = [];
    // شروع با گره‌های درجه ۰...
    
    const result = [];
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        // کاهش درجه ورودی همسایه‌ها...
    }
    
    return result.length === numNodes ? result : null;
}
\`\`\`

---

## پیچیدگی

| روش | زمان | فضا |
|-----|------|-----|
| DFS | O(V + E) | O(V) |
| Kahn | O(V + E) | O(V) |

---

## کی استفاده کنیم / نکنیم

### ✅ استفاده کن:
- کارها **وابستگی** دارن
- نیاز به **ترتیب معتبر** داری
- گراف **DAG** هست (بدون چرخه)

### ❌ استفاده نکن:
- گراف **چرخه** داره → ترتیب معتبر وجود نداره

---

## اشتباهات رایج

### اشتباه ۱: تشخیص ندادن چرخه
\`\`\`javascript
// ✅ درست - چک کن همه گره‌ها پردازش شدن
if (result.length !== numNodes) {
    return null; // چرخه تشخیص داده شد!
}
\`\`\`

### اشتباه ۲: اضافه کردن گره در زمان اشتباه
\`\`\`javascript
// ❌ اشتباه - قبل از پردازش همسایه‌ها
result.push(node);

// ✅ درست - بعد از پردازش همه همسایه‌ها
result.unshift(node);
\`\`\`

---

## کاربردها

۱. **سیستم‌های Build**: Make، Webpack
۲. **مدیر پکیج**: npm، pip
۳. **صفحه گسترده**: محاسبه سلول‌ها به ترتیب درست
۴. **برنامه‌ریزی درسی**: برنامه‌ریزی دانشگاه

---

---

## خلاصه

| ویژگی | مقدار |
|-------|-------|
| زمان | O(V + E) |
| فضا | O(V) |
| نیاز | DAG (بدون چرخه) |
| بهترین برای | زمان‌بندی، وابستگی‌ها |
`,

  hasVisualization: true,
  visualizationId: 'topological-sort',
  hasExercise: true,
  exerciseId: 'topological-sort',
};

export default topologicalSortLesson;
