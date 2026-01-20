export const dijkstraLesson = {
  id: 'dijkstra',
  title: "Dijkstra's Algorithm",
  titleFa: 'الگوریتم دایکسترا',
  difficulty: 'hard',
  estimatedTime: '60 min',
  
  content: `
# Dijkstra's Algorithm - GPS for Your Code

## What is Dijkstra's Algorithm?

Imagine you're using Google Maps to find the fastest route. There are many roads with different travel times. Dijkstra finds the SHORTEST path considering these weights!

**Think of it like this:**
You're planning a road trip. Some roads are highways (fast), some are local streets (slow). Dijkstra helps you find the quickest route by considering ALL the road speeds.

---

## Why Should You Care?

**Real-world example:** Every time you use GPS navigation, Dijkstra is working behind the scenes!

Here's why Dijkstra matters:
- **GPS Navigation**: Finding fastest routes
- **Network Routing**: How internet packets find their way
- **Game AI**: Finding optimal paths for characters

**Key Difference from BFS:**
- BFS finds shortest path by NUMBER of edges
- Dijkstra finds shortest path by TOTAL WEIGHT

---

## Real-Life Analogies

### Analogy 1: Planning a Road Trip 🚗

You want to drive from City A to City D:
- Route 1: A → B → D (50 + 100 = 150 km)
- Route 2: A → C → D (80 + 60 = 140 km)

Route 2 is SHORTER even with same number of stops! Dijkstra finds this.

### Analogy 2: Cheapest Flight ✈️

Finding cheapest flight from New York to Tokyo:
- Direct: $1500
- Via LA: $400 + $800 = $1200

Dijkstra would find the LA route as cheapest!

---

## How Does It Work?

**The Algorithm:**
1. Set distance to start = 0, all others = infinity
2. Pick unvisited node with SMALLEST distance
3. Update distances to all its neighbors
4. Mark current node as visited
5. Repeat until destination reached

---

## Step-by-Step Walkthrough

\`\`\`
Graph: A--4--B, A--2--C, B--3--D, C--1--D

Step 1: dist = {A:0, B:∞, C:∞, D:∞}
Step 2: Process A → dist = {A:0, B:4, C:2, D:∞}
Step 3: Process C (min=2) → dist = {A:0, B:4, C:2, D:3}
Step 4: Process D → Done!

Shortest: A → C → D = 3 (not A → B → D = 7)
\`\`\`

---

## The Code

\`\`\`javascript
function dijkstra(graph, start) {
    const dist = new Map();
    const visited = new Set();
    
    for (const node of graph.keys()) {
        dist.set(node, Infinity);
    }
    dist.set(start, 0);
    
    while (visited.size < graph.size) {
        // Find unvisited node with minimum distance
        let minNode = null;
        let minDist = Infinity;
        for (const [node, d] of dist) {
            if (!visited.has(node) && d < minDist) {
                minNode = node;
                minDist = d;
            }
        }
        
        if (minNode === null) break;
        visited.add(minNode);
        
        // Update distances to neighbors
        for (const [neighbor, weight] of graph.get(minNode) || []) {
            const newDist = dist.get(minNode) + weight;
            if (newDist < dist.get(neighbor)) {
                dist.set(neighbor, newDist);
            }
        }
    }
    return dist;
}
\`\`\`

---

## Time & Space Complexity

| Implementation | Time | Space |
|----------------|------|-------|
| Simple Array | O(V²) | O(V) |
| Priority Queue | O((V+E) log V) | O(V) |

---

## When to Use / When NOT to Use

### ✅ Use Dijkstra when:
- Graph has **non-negative weights**
- Need **shortest path** in weighted graph

### ❌ Don't use Dijkstra when:
- Graph has **negative weights** → Use Bellman-Ford
- Graph is **unweighted** → Use BFS (simpler)

---

## Common Mistakes

### Mistake 1: Using with negative weights
\`\`\`javascript
// ❌ WRONG - Dijkstra fails with negative weights!
graph.set('A', [['B', -5]]);
// ✅ Use Bellman-Ford for negative weights
\`\`\`

### Mistake 2: Not using Priority Queue for large graphs
\`\`\`javascript
// ❌ SLOW - O(V²)
// ✅ Use Priority Queue - O((V+E) log V)
\`\`\`

---

## Real-World Applications

1. **GPS Navigation**: Google Maps, Waze
2. **Network Routing**: OSPF protocol
3. **Game Development**: Pathfinding for NPCs

---

## Interview Tips

**Common Questions:**
1. "Find shortest path in weighted graph" → Dijkstra
2. "Network delay time" → Dijkstra from source

**What interviewers look for:**
- ✅ Understanding when to use Dijkstra vs BFS
- ✅ Knowing it doesn't work with negative weights

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Time (with heap) | O((V+E) log V) |
| Space | O(V) |
| Negative weights? | ❌ No |
| Best For | Weighted graphs, GPS |
`,

  contentFa: `
# الگوریتم دایکسترا - GPS برای کدت

## الگوریتم دایکسترا چیست؟

تصور کن داری از گوگل مپ استفاده می‌کنی. جاده‌های زیادی با زمان‌های متفاوت هست. دایکسترا کوتاه‌ترین مسیر رو با در نظر گرفتن وزن‌ها پیدا می‌کنه!

**اینطوری فکر کن:**
داری سفر جاده‌ای برنامه‌ریزی می‌کنی. بعضی جاده‌ها بزرگراه (سریع)، بعضی محلی (کند). دایکسترا سریع‌ترین مسیر رو پیدا می‌کنه.

---

## چرا باید اهمیت بدی؟

**مثال واقعی:** هر بار که از GPS استفاده می‌کنی، دایکسترا پشت صحنه کار می‌کنه!

**تفاوت کلیدی با BFS:**
- BFS کوتاه‌ترین مسیر رو با تعداد یال‌ها پیدا می‌کنه
- دایکسترا با مجموع وزن پیدا می‌کنه

---

## مثال‌های زندگی واقعی

### مثال ۱: سفر جاده‌ای 🚗
- مسیر ۱: A → B → D (۵۰ + ۱۰۰ = ۱۵۰ کیلومتر)
- مسیر ۲: A → C → D (۸۰ + ۶۰ = ۱۴۰ کیلومتر)

مسیر ۲ کوتاه‌تره! دایکسترا این رو پیدا می‌کنه.

### مثال ۲: ارزان‌ترین پرواز ✈️
- مستقیم: ۱۵۰۰ دلار
- از طریق LA: ۴۰۰ + ۸۰۰ = ۱۲۰۰ دلار

---

## چطور کار می‌کنه؟

**الگوریتم:**
۱. فاصله تا شروع = ۰، بقیه = بی‌نهایت
۲. گره بازدید نشده با کمترین فاصله رو انتخاب کن
۳. فاصله‌ها به همسایه‌ها رو به‌روز کن
۴. گره فعلی رو بازدید شده علامت بزن
۵. تکرار تا به مقصد برسی

---

## کد

\`\`\`javascript
function dijkstra(graph, start) {
    const dist = new Map();
    const visited = new Set();
    
    for (const node of graph.keys()) {
        dist.set(node, Infinity);
    }
    dist.set(start, 0);
    
    while (visited.size < graph.size) {
        let minNode = null;
        let minDist = Infinity;
        for (const [node, d] of dist) {
            if (!visited.has(node) && d < minDist) {
                minNode = node;
                minDist = d;
            }
        }
        
        if (minNode === null) break;
        visited.add(minNode);
        
        for (const [neighbor, weight] of graph.get(minNode) || []) {
            const newDist = dist.get(minNode) + weight;
            if (newDist < dist.get(neighbor)) {
                dist.set(neighbor, newDist);
            }
        }
    }
    return dist;
}
\`\`\`

---

## پیچیدگی

| پیاده‌سازی | زمان | فضا |
|------------|------|-----|
| آرایه | O(V²) | O(V) |
| صف اولویت | O((V+E) log V) | O(V) |

---

## کی استفاده کنیم / نکنیم

### ✅ استفاده کن:
- گراف **وزن‌های غیرمنفی** داره
- نیاز به **کوتاه‌ترین مسیر** توی گراف وزن‌دار

### ❌ استفاده نکن:
- گراف **وزن منفی** داره → Bellman-Ford
- گراف **بدون وزن** → BFS

---

## اشتباهات رایج

### اشتباه ۱: استفاده با وزن منفی
\`\`\`javascript
// ❌ اشتباه - دایکسترا با وزن منفی کار نمی‌کنه!
// ✅ از Bellman-Ford استفاده کن
\`\`\`

---

## کاربردها

۱. **GPS**: گوگل مپ، ویز
۲. **شبکه**: پروتکل OSPF
۳. **بازی**: مسیریابی NPC

---

---

## خلاصه

| ویژگی | مقدار |
|-------|-------|
| زمان | O((V+E) log V) |
| فضا | O(V) |
| وزن منفی؟ | ❌ نه |
`,

  hasVisualization: true,
  visualizationId: 'dijkstra',
  hasExercise: true,
  exerciseId: 'dijkstra',
};

export default dijkstraLesson;
