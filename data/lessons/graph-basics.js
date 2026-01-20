export const graphBasicsLesson = {
  id: 'graph-basics',
  title: 'Graph Basics',
  titleFa: 'مبانی گراف',
  difficulty: 'medium',
  estimatedTime: '50 min',
  
  content: `
# Graph Basics - Connecting the Dots

## What is a Graph?

Imagine a social network - people are nodes, friendships are edges. That's a graph!

**Think of it like:**
- Social network - people connected by friendships
- Road map - cities connected by roads
- Internet - computers connected by cables

---

## Why Should You Care?

- Foundation for 20%+ of coding interviews
- Models real-world relationships (social, maps, networks)
- Essential for pathfinding, recommendations, dependencies
- Used in Google Maps, Facebook, LinkedIn

---

## Graph Terminology

| Term | Meaning | Example |
|------|---------|---------|
| Vertex/Node | A point | Person, city |
| Edge | Connection | Friendship, road |
| Directed | One-way edges | Twitter follow |
| Undirected | Two-way edges | Facebook friend |
| Weighted | Edges have values | Road distance |
| Degree | Number of edges | Friend count |
| Path | Sequence of edges | Route between cities |
| Cycle | Path back to start | Round trip |

---

## Graph Representations

### 1. Adjacency List (Most Common)

\`\`\`javascript
// Object/Map: node → list of neighbors
const graph = {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'D'],
    D: ['B', 'C']
};

// With Map (better for non-string keys)
const graph = new Map();
graph.set('A', ['B', 'C']);
graph.set('B', ['A', 'D']);
\`\`\`

**Best for:** Sparse graphs, most interview problems

### 2. Adjacency Matrix

\`\`\`javascript
// matrix[i][j] = 1 if edge exists
const matrix = [
//   A  B  C  D
    [0, 1, 1, 0],  // A
    [1, 0, 0, 1],  // B
    [1, 0, 0, 1],  // C
    [0, 1, 1, 0]   // D
];
\`\`\`

**Best for:** Dense graphs, quick edge lookup

### 3. Edge List

\`\`\`javascript
const edges = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['C', 'D']
];
\`\`\`

**Best for:** Input format, Union-Find problems

---

## Building Graphs

\`\`\`javascript
// From edge list (undirected)
function buildGraph(edges) {
    const graph = new Map();
    
    for (let [a, b] of edges) {
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a).push(b);
        graph.get(b).push(a);  // Both directions!
    }
    
    return graph;
}

// Directed graph (one direction only)
function buildDirectedGraph(edges) {
    const graph = new Map();
    
    for (let [from, to] of edges) {
        if (!graph.has(from)) graph.set(from, []);
        if (!graph.has(to)) graph.set(to, []);
        graph.get(from).push(to);  // Only one direction
    }
    
    return graph;
}

// Weighted graph
function buildWeightedGraph(edges) {
    const graph = new Map();
    
    for (let [a, b, weight] of edges) {
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a).push([b, weight]);
        graph.get(b).push([a, weight]);
    }
    
    return graph;
}
\`\`\`

---

## Common Mistakes

### 1. Forgetting to Initialize Nodes
\`\`\`javascript
// ❌ WRONG - crashes on missing node
graph.get(a).push(b);

// ✅ CORRECT - initialize first
if (!graph.has(a)) graph.set(a, []);
graph.get(a).push(b);
\`\`\`

### 2. Missing Reverse Edge (Undirected)
\`\`\`javascript
// ❌ WRONG - only one direction
graph.get(a).push(b);

// ✅ CORRECT - both directions for undirected
graph.get(a).push(b);
graph.get(b).push(a);
\`\`\`

### 3. Not Handling Disconnected Nodes
\`\`\`javascript
// ❌ WRONG - misses isolated nodes
for (let [a, b] of edges) { ... }

// ✅ CORRECT - add all nodes first
for (let i = 0; i < n; i++) {
    graph.set(i, []);
}
\`\`\`

---

## Representation Comparison

| Feature | Adjacency List | Adjacency Matrix |
|---------|----------------|------------------|
| Space | O(V + E) | O(V²) |
| Check edge | O(degree) | O(1) |
| Find neighbors | O(1) | O(V) |
| Add edge | O(1) | O(1) |
| Best for | Sparse | Dense |

---

## Interview Tips

- Default to adjacency list (Map or object)
- "I'll build an adjacency list for O(V+E) space"
- Always clarify: directed or undirected? weighted?
- Handle disconnected components

---

## Quick Summary

| Feature | Value |
|---------|-------|
| Adjacency List | O(V+E) space, best for sparse |
| Adjacency Matrix | O(V²) space, O(1) edge check |
| Edge List | Good for input, Union-Find |
| Key insight | Choose representation based on operations |

> **One-liner:** Graph = nodes + edges. Use adjacency list (Map) for most problems. Don't forget both directions for undirected graphs!
`,

  contentFa: `
# مبانی گراف - اتصال نقاط

## گراف چیست؟

تصور کن یه شبکه اجتماعی - آدم‌ها گره‌ها هستن، دوستی‌ها یال‌ها. این یه گرافه!

**مثل این فکر کن:**
- شبکه اجتماعی - آدم‌ها با دوستی متصل شدن
- نقشه جاده - شهرها با جاده متصل شدن
- اینترنت - کامپیوترها با کابل متصل شدن

---

## چرا باید اهمیت بدی؟

- پایه ۲۰%+ مصاحبه‌های کدنویسی
- روابط دنیای واقعی رو مدل می‌کنه (اجتماعی، نقشه، شبکه)
- ضروری برای مسیریابی، توصیه‌ها، وابستگی‌ها
- در Google Maps، Facebook، LinkedIn استفاده می‌شه

---

## اصطلاحات گراف

| اصطلاح | معنی | مثال |
|--------|------|------|
| راس/گره | یه نقطه | شخص، شهر |
| یال | اتصال | دوستی، جاده |
| جهت‌دار | یال‌های یک‌طرفه | فالو توییتر |
| بدون جهت | یال‌های دوطرفه | دوست فیسبوک |
| وزن‌دار | یال‌ها مقدار دارن | فاصله جاده |
| درجه | تعداد یال‌ها | تعداد دوست |
| مسیر | دنباله یال‌ها | مسیر بین شهرها |
| چرخه | مسیر برگشت به شروع | سفر رفت و برگشت |

---

## نمایش‌های گراف

### ۱. لیست مجاورت (رایج‌ترین)

// Object/Map: گره → لیست همسایه‌ها
graph = {
    A: ['B', 'C'],
    B: ['A', 'D'],
    C: ['A', 'D'],
    D: ['B', 'C']
}

**بهترین برای:** گراف‌های تنک، بیشتر مسائل مصاحبه

### ۲. ماتریس مجاورت

// matrix[i][j] = 1 اگه یال وجود داره
matrix = [
//   A  B  C  D
    [0, 1, 1, 0],  // A
    [1, 0, 0, 1],  // B
    [1, 0, 0, 1],  // C
    [0, 1, 1, 0]   // D
]

**بهترین برای:** گراف‌های متراکم، بررسی سریع یال

### ۳. لیست یال‌ها

edges = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['C', 'D']
]

**بهترین برای:** فرمت ورودی، مسائل Union-Find

---

## ساختن گراف

// از لیست یال (بدون جهت)
buildGraph(edges):
    graph = Map()
    
    برای هر [a, b] در edges:
        اگه graph.has(a) نداره: graph.set(a, [])
        اگه graph.has(b) نداره: graph.set(b, [])
        graph.get(a).push(b)
        graph.get(b).push(a)  // هر دو جهت!
    
    return graph

// گراف جهت‌دار (فقط یه جهت)
buildDirectedGraph(edges):
    graph = Map()
    
    برای هر [from, to] در edges:
        اگه graph.has(from) نداره: graph.set(from, [])
        اگه graph.has(to) نداره: graph.set(to, [])
        graph.get(from).push(to)  // فقط یه جهت
    
    return graph

// گراف وزن‌دار
buildWeightedGraph(edges):
    graph = Map()
    
    برای هر [a, b, weight] در edges:
        graph.get(a).push([b, weight])
        graph.get(b).push([a, weight])
    
    return graph

---

## اشتباهات رایج

### ۱. فراموش کردن مقداردهی اولیه گره‌ها
❌ اشتباه: روی گره ناموجود کرش می‌کنه
✅ درست: اول مقداردهی کن

### ۲. یال برگشتی نداشتن (بدون جهت)
❌ اشتباه: فقط یه جهت
✅ درست: هر دو جهت برای بدون جهت

### ۳. هندل نکردن گره‌های منفصل
❌ اشتباه: گره‌های ایزوله رو از دست می‌ده
✅ درست: اول همه گره‌ها رو اضافه کن

---

## مقایسه نمایش‌ها

| ویژگی | لیست مجاورت | ماتریس مجاورت |
|-------|-------------|---------------|
| فضا | O(V + E) | O(V²) |
| بررسی یال | O(درجه) | O(1) |
| یافتن همسایه‌ها | O(1) | O(V) |
| اضافه کردن یال | O(1) | O(1) |
| بهترین برای | تنک | متراکم |

---

---

## خلاصه سریع

| ویژگی | مقدار |
|-------|-------|
| لیست مجاورت | فضای O(V+E)، بهترین برای تنک |
| ماتریس مجاورت | فضای O(V²)، بررسی یال O(1) |
| لیست یال‌ها | خوب برای ورودی، Union-Find |
| نکته کلیدی | نمایش رو بر اساس عملیات انتخاب کن |

> **یک خطی:** گراف = گره‌ها + یال‌ها. برای بیشتر مسائل از لیست مجاورت (Map) استفاده کن. هر دو جهت رو برای گراف بدون جهت فراموش نکن!
`,

  visualizationId: 'graph',
  exerciseId: 'graph-basics',
};

export default graphBasicsLesson;
