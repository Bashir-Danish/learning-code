export const bfsLesson = {
  id: 'bfs',
  title: 'Breadth-First Search (BFS)',
  titleFa: 'جستجوی سطحی (BFS)',
  difficulty: 'medium',
  estimatedTime: '55 min',
  
  content: `
# Breadth-First Search (BFS) - Finding the Shortest Path, Level by Level

## What is BFS?

Imagine you're looking for your friend at a party. You have two strategies:
1. **Pick one room and search every corner deeply** (that's DFS)
2. **Check all people near you first, then move outward in circles** (that's BFS!)

BFS is like dropping a stone in water - the ripples spread outward evenly in all directions.

**Think of it like this:**
You lost your keys somewhere in your house. Instead of searching one room completely, you first check all the obvious spots nearby, then expand your search outward. That's BFS!

---

## Why Should You Care?

**Real-world example:** GPS navigation! When Google Maps finds the shortest route, it uses BFS. It explores all routes of length 1, then length 2, etc.

Here's why BFS matters:
- **Shortest path**: BFS guarantees the shortest path in unweighted graphs
- **Level-order traversal**: Process tree nodes level by level
- **Social networks**: Find people within N connections
- **Game AI**: Find minimum moves to win

---

## Real-Life Analogies

### Analogy 1: Ripples in Water 🌊

Drop a stone in a pond:
1. First, the ripple reaches everything 1 meter away
2. Then everything 2 meters away
3. Then 3 meters, 4 meters...

The ripple spreads EVENLY in all directions. That's exactly how BFS explores!

### Analogy 2: Finding Someone at a Concert 🎵

You're at a huge concert looking for your friend:
1. First, look at everyone RIGHT NEXT to you
2. Then ask those people to look at everyone next to THEM
3. Keep expanding the search circle

This guarantees you find the CLOSEST path to your friend.

---

## How Does It Work?

**The Algorithm:**
1. Start at a node, add it to a QUEUE
2. Take the first node from the queue
3. Visit all its unvisited neighbors, add them to queue
4. Repeat until queue is empty or target found

**Key Insight:** BFS uses a QUEUE (First In, First Out).

---

## Step-by-Step Walkthrough

### Example: Graph Traversal from 'A'

\`\`\`
Graph: A → [B, C], B → [D, E], C → [F]

Step 1: queue = [A], visited = {A}
Step 2: Process A → queue = [B, C], Output: A
Step 3: Process B → queue = [C, D, E], Output: A, B
Step 4: Process C → queue = [D, E, F], Output: A, B, C
Step 5-7: Process D, E, F

Final: A → B → C → D → E → F
\`\`\`

---

## The Code

\`\`\`javascript
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}
\`\`\`

### Shortest Path

\`\`\`javascript
function shortestPath(graph, start, end) {
    const queue = [[start, [start]]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [node, path] = queue.shift();
        if (node === end) return path;
        
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    return null;
}
\`\`\`

---

## Time & Space Complexity

| Case | Time | Space |
|------|------|-------|
| All | O(V + E) | O(V) |

---

## When to Use / When NOT to Use

### ✅ Use BFS when:
- Finding **shortest path** in unweighted graph
- **Level-order** traversal needed
- Finding nodes at **specific distance**

### ❌ Don't use BFS when:
- Graph has **weighted edges** → Use Dijkstra
- Need to explore **all paths** → Use DFS
- **Memory is limited** → DFS uses less memory

---

## Common Mistakes

### Mistake 1: Marking visited AFTER dequeue

\`\`\`javascript
// ❌ WRONG - may add same node multiple times
while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);  // Too late!
}

// ✅ CORRECT - mark when adding to queue
if (!visited.has(neighbor)) {
    visited.add(neighbor);  // Mark immediately
    queue.push(neighbor);
}
\`\`\`

### Mistake 2: Using array.pop() instead of shift()

\`\`\`javascript
// ❌ WRONG - pop() makes it DFS!
const node = queue.pop();

// ✅ CORRECT - shift() for FIFO
const node = queue.shift();
\`\`\`

### Mistake 3: Forgetting to handle disconnected graphs

\`\`\`javascript
// ✅ CORRECT - start BFS from all unvisited nodes
function bfsAll(graph) {
    const visited = new Set();
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            bfs(graph, node, visited);
        }
    }
}
\`\`\`

---

## Real-World Applications

1. **GPS Navigation**: Finding shortest route
2. **Social Networks**: "People you may know" (friends of friends)
3. **Web Crawlers**: Exploring websites level by level
4. **Game AI**: Finding minimum moves in puzzles

---

## Interview Tips

**Common Questions:**
1. "Find shortest path in unweighted graph" → BFS
2. "Level order traversal of tree" → BFS
3. "Minimum steps to reach target" → BFS

**What interviewers look for:**
- ✅ Using Queue (not Stack)
- ✅ Marking visited BEFORE adding to queue
- ✅ Understanding BFS guarantees shortest path

---

## Quick Summary

| Feature | BFS | DFS |
|---------|-----|-----|
| Data Structure | Queue | Stack |
| Order | Level by level | Deep first |
| Shortest Path | ✅ Yes (unweighted) | ❌ No |
| Memory | More (stores level) | Less |
`,

  contentFa: `
# جستجوی سطحی (BFS) - پیدا کردن کوتاه‌ترین مسیر، سطح به سطح

## BFS چیست؟

تصور کن داری دنبال دوستت توی یه مهمونی می‌گردی:
1. **یه اتاق رو کامل بگردی** (این DFS هست)
2. **اول همه آدم‌های نزدیکت رو چک کنی، بعد دایره رو بزرگتر کنی** (این BFS هست!)

BFS مثل انداختن سنگ توی آب هست - موج‌ها به طور یکنواخت به همه طرف پخش می‌شن.

**اینطوری فکر کن:**
کلیدت رو توی خونه گم کردی. به جای گشتن کامل یه اتاق، اول همه جاهای واضح نزدیک رو چک می‌کنی، بعد جستجو رو گسترش می‌دی.

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** مسیریابی GPS! وقتی گوگل مپ کوتاه‌ترین مسیر رو پیدا می‌کنه، از BFS استفاده می‌کنه.

چرا BFS مهمه:
- **کوتاه‌ترین مسیر**: BFS کوتاه‌ترین مسیر رو توی گراف بدون وزن تضمین می‌کنه
- **پیمایش سطحی**: گره‌های درخت رو سطح به سطح پردازش کن
- **شبکه‌های اجتماعی**: آدم‌هایی که توی N اتصال هستن رو پیدا کن

---

## مثال‌های زندگی واقعی

### مثال ۱: موج توی آب 🌊

یه سنگ توی برکه بنداز:
۱. اول موج به همه چیز ۱ متری می‌رسه
۲. بعد همه چیز ۲ متری
۳. بعد ۳ متر، ۴ متر...

موج به طور یکنواخت پخش می‌شه. دقیقاً همینطور BFS کاوش می‌کنه!

### مثال ۲: پیدا کردن کسی توی کنسرت 🎵

توی یه کنسرت بزرگ داری دنبال دوستت می‌گردی:
۱. اول به همه کسایی که دقیقاً کنارت هستن نگاه کن
۲. بعد از اونا بخواه به کسایی که کنار اونا هستن نگاه کنن
۳. دایره جستجو رو بزرگتر کن

این تضمین می‌کنه نزدیک‌ترین مسیر رو به دوستت پیدا کنی.

---

## چطور کار می‌کنه؟

**الگوریتم:**
۱. از یه گره شروع کن، بذارش توی QUEUE
۲. اولین گره رو از صف بردار
۳. همه همسایه‌های بازدید نشده رو به صف اضافه کن
۴. تکرار تا صف خالی بشه یا هدف پیدا بشه

**نکته کلیدی:** BFS از QUEUE استفاده می‌کنه (اولین ورودی، اولین خروجی).

---

## راهنمای قدم به قدم

### مثال: پیمایش گراف از 'A'

\`\`\`
گراف: A → [B, C], B → [D, E], C → [F]

قدم ۱: queue = [A], visited = {A}
قدم ۲: پردازش A → queue = [B, C], خروجی: A
قدم ۳: پردازش B → queue = [C, D, E], خروجی: A, B
قدم ۴: پردازش C → queue = [D, E, F], خروجی: A, B, C

نهایی: A → B → C → D → E → F
\`\`\`

---

## کد

\`\`\`javascript
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}
\`\`\`

### کوتاه‌ترین مسیر

\`\`\`javascript
function shortestPath(graph, start, end) {
    const queue = [[start, [start]]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [node, path] = queue.shift();
        if (node === end) return path;
        
        for (const neighbor of graph.get(node) || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    return null;
}
\`\`\`

---

## پیچیدگی زمانی و فضایی

| حالت | زمان | فضا |
|------|------|-----|
| همه | O(V + E) | O(V) |

---

## کی استفاده کنیم / کی استفاده نکنیم

### ✅ استفاده کن وقتی:
- پیدا کردن **کوتاه‌ترین مسیر** توی گراف بدون وزن
- پیمایش **سطح به سطح** لازمه
- پیدا کردن گره‌ها در **فاصله مشخص**

### ❌ استفاده نکن وقتی:
- گراف **یال‌های وزن‌دار** داره → از Dijkstra استفاده کن
- نیاز به کاوش **همه مسیرها** داری → از DFS استفاده کن
- **حافظه محدوده** → DFS حافظه کمتری مصرف می‌کنه

---

## اشتباهات رایج

### اشتباه ۱: علامت‌گذاری بازدید بعد از برداشتن از صف

\`\`\`javascript
// ❌ اشتباه
while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);  // خیلی دیره!
}

// ✅ درست - وقتی به صف اضافه می‌کنی علامت بزن
if (!visited.has(neighbor)) {
    visited.add(neighbor);  // فوراً علامت بزن
    queue.push(neighbor);
}
\`\`\`

### اشتباه ۲: استفاده از pop() به جای shift()

\`\`\`javascript
// ❌ اشتباه - pop() تبدیلش می‌کنه به DFS!
const node = queue.pop();

// ✅ درست - shift() برای FIFO
const node = queue.shift();
\`\`\`

---

## کاربردهای دنیای واقعی

۱. **مسیریابی GPS**: پیدا کردن کوتاه‌ترین مسیر
۲. **شبکه‌های اجتماعی**: "افرادی که ممکنه بشناسی"
۳. **خزنده‌های وب**: کاوش وبسایت‌ها سطح به سطح
۴. **هوش مصنوعی بازی**: پیدا کردن حداقل حرکات

---

---

## خلاصه سریع

| ویژگی | BFS | DFS |
|-------|-----|-----|
| ساختار داده | Queue | Stack |
| ترتیب | سطح به سطح | اول عمیق |
| کوتاه‌ترین مسیر | ✅ بله (بدون وزن) | ❌ نه |
| حافظه | بیشتر | کمتر |
`,

  hasVisualization: true,
  visualizationId: 'bfs',
  hasExercise: true,
  exerciseId: 'bfs',
};

export default bfsLesson;
