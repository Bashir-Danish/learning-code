// Counting Sort Steps
export function generateCountingSortSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  steps.push({
    step: 0,
    description: `Starting Counting Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی شمارشی با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    variables: { max },
  });

  // Count occurrences
  for (const num of arr) {
    count[num]++;
  }

  steps.push({
    step: steps.length,
    description: `Count array: [${count.join(', ')}]`,
    descriptionFa: `آرایه شمارش: [${count.join(', ')}]`,
    data: [...count],
    variables: { count: [...count] },
  });

  // Build result
  const result = [];
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
      steps.push({
        step: steps.length,
        description: `Add ${i} to result: [${result.join(', ')}]`,
        descriptionFa: `اضافه کردن ${i} به نتیجه: [${result.join(', ')}]`,
        data: [...result],
        highlight: [result.length - 1],
        variables: { i, remaining: count[i] },
      });
    }
  }

  steps.push({
    step: steps.length,
    description: `Sorting complete! Result: [${result.join(', ')}]`,
    descriptionFa: `مرتب‌سازی کامل شد! نتیجه: [${result.join(', ')}]`,
    data: [...result],
    sorted: Array.from({ length: result.length }, (_, i) => i),
    variables: {},
  });

  return steps;
}

// Heap Sort Steps
export function generateHeapSortSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;

  steps.push({
    step: 0,
    description: `Starting Heap Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی هرمی با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    variables: { n },
  });

  function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push({
        step: steps.length,
        description: `Heapify: swap ${arr[largest]} and ${arr[i]}`,
        descriptionFa: `هرم‌سازی: جابجایی ${arr[largest]} و ${arr[i]}`,
        data: [...arr],
        highlight: [i, largest],
        variables: { i, largest },
      });
      heapify(arr, n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  steps.push({
    step: steps.length,
    description: `Max heap built: [${arr.join(', ')}]`,
    descriptionFa: `هرم بیشینه ساخته شد: [${arr.join(', ')}]`,
    data: [...arr],
    highlight: [0],
    variables: {},
  });

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      step: steps.length,
      description: `Extract max ${arr[i]}, place at end`,
      descriptionFa: `استخراج بیشینه ${arr[i]}، قرار دادن در انتها`,
      data: [...arr],
      sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      variables: { extracted: arr[i] },
    });
    heapify(arr, i, 0);
  }

  steps.push({
    step: steps.length,
    description: `Sorting complete! Result: [${arr.join(', ')}]`,
    descriptionFa: `مرتب‌سازی کامل شد! نتیجه: [${arr.join(', ')}]`,
    data: [...arr],
    sorted: Array.from({ length: n }, (_, i) => i),
    variables: {},
  });

  return steps;
}

// Monotonic Stack Steps
export function generateMonotonicStackSteps(lessonId, input) {
  const arr = input || [2, 1, 2, 4, 3];
  const steps = [];
  const result = new Array(arr.length).fill(-1);
  const stack = [];

  steps.push({
    step: 0,
    description: `Finding next greater element for [${arr.join(', ')}]`,
    descriptionFa: `یافتن عنصر بزرگتر بعدی برای [${arr.join(', ')}]`,
    data: [...arr],
    variables: { stack: [] },
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      step: steps.length,
      description: `Processing index ${i}, value ${arr[i]}`,
      descriptionFa: `پردازش اندیس ${i}، مقدار ${arr[i]}`,
      data: [...arr],
      highlight: [i],
      variables: { i, current: arr[i], stack: [...stack] },
    });

    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
      const idx = stack.pop();
      result[idx] = arr[i];
      steps.push({
        step: steps.length,
        description: `${arr[i]} > ${arr[idx]}, so next greater of index ${idx} is ${arr[i]}`,
        descriptionFa: `${arr[i]} > ${arr[idx]}، پس عنصر بزرگتر بعدی اندیس ${idx} برابر ${arr[i]} است`,
        data: [...arr],
        comparing: [idx, i],
        variables: { result: [...result], stack: [...stack] },
      });
    }
    stack.push(i);
  }

  steps.push({
    step: steps.length,
    description: `Result: [${result.join(', ')}]`,
    descriptionFa: `نتیجه: [${result.join(', ')}]`,
    data: [...arr],
    sorted: result.map((v, i) => v !== -1 ? i : -1).filter(i => i !== -1),
    variables: { result },
  });

  return steps;
}

// Fast Slow Pointers Steps (Cycle Detection)
export function generateFastSlowPointersSteps(lessonId, input) {
  const steps = [];
  // Simulate a linked list with cycle
  const nodes = [1, 2, 3, 4, 5, 6];
  let slow = 0, fast = 0;

  steps.push({
    step: 0,
    description: `Detecting cycle using Floyd's algorithm`,
    descriptionFa: `تشخیص حلقه با استفاده از الگوریتم فلوید`,
    data: [...nodes],
    pointers: { slow: 0, fast: 0 },
    variables: {},
  });

  // Simulate cycle detection
  for (let i = 0; i < 8; i++) {
    slow = (slow + 1) % nodes.length;
    fast = (fast + 2) % nodes.length;

    steps.push({
      step: steps.length,
      description: `Slow moves to ${slow}, Fast moves to ${fast}`,
      descriptionFa: `آهسته به ${slow} می‌رود، سریع به ${fast} می‌رود`,
      data: [...nodes],
      pointers: { S: slow, F: fast },
      highlight: slow === fast ? [slow] : [],
      variables: { slow, fast },
    });

    if (slow === fast) {
      steps.push({
        step: steps.length,
        description: `Cycle detected! Slow and Fast meet at index ${slow}`,
        descriptionFa: `حلقه تشخیص داده شد! آهسته و سریع در اندیس ${slow} به هم رسیدند`,
        data: [...nodes],
        sorted: [slow],
        variables: { cycleAt: slow },
      });
      break;
    }
  }

  return steps;
}

// Linked List Reversal Steps
export function generateLinkedListReversalSteps(lessonId, input) {
  const steps = [];
  const nodes = [1, 2, 3, 4, 5];
  const reversed = [];

  steps.push({
    step: 0,
    description: `Reversing linked list [${nodes.join(' → ')}]`,
    descriptionFa: `معکوس کردن لیست پیوندی [${nodes.join(' → ')}]`,
    data: [...nodes],
    variables: { prev: null, current: nodes[0] },
  });

  let prev = null;
  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    reversed.unshift(current);

    steps.push({
      step: steps.length,
      description: `Point ${current} to ${prev || 'null'}`,
      descriptionFa: `اشاره ${current} به ${prev || 'null'}`,
      data: [...nodes],
      highlight: [i],
      comparing: i > 0 ? [i - 1] : [],
      variables: { prev, current, next: nodes[i + 1] || null },
    });

    prev = current;
  }

  steps.push({
    step: steps.length,
    description: `Reversed: [${reversed.join(' → ')}]`,
    descriptionFa: `معکوس شده: [${reversed.join(' → ')}]`,
    data: [...reversed],
    sorted: Array.from({ length: reversed.length }, (_, i) => i),
    variables: { result: reversed },
  });

  return steps;
}

// Dijkstra Steps
export function generateDijkstraSteps(lessonId, input) {
  const steps = [];
  const nodes = 5;
  const dist = [0, Infinity, Infinity, Infinity, Infinity];
  const visited = new Set();

  steps.push({
    step: 0,
    description: `Finding shortest paths from node 0 using Dijkstra`,
    descriptionFa: `یافتن کوتاه‌ترین مسیرها از گره 0 با الگوریتم دایکسترا`,
    data: [...dist.map(d => d === Infinity ? '∞' : d)],
    highlight: [0],
    variables: { dist: [...dist] },
  });

  // Simplified simulation
  const edges = [[0, 1, 4], [0, 2, 1], [2, 1, 2], [1, 3, 1], [2, 3, 5], [3, 4, 3]];
  
  for (let round = 0; round < nodes; round++) {
    // Find min unvisited
    let minNode = -1, minDist = Infinity;
    for (let i = 0; i < nodes; i++) {
      if (!visited.has(i) && dist[i] < minDist) {
        minDist = dist[i];
        minNode = i;
      }
    }
    if (minNode === -1) break;

    visited.add(minNode);
    steps.push({
      step: steps.length,
      description: `Visit node ${minNode} with distance ${dist[minNode]}`,
      descriptionFa: `بازدید گره ${minNode} با فاصله ${dist[minNode]}`,
      data: [...dist.map(d => d === Infinity ? '∞' : d)],
      highlight: [minNode],
      sorted: [...visited],
      variables: { current: minNode, dist: [...dist] },
    });

    // Update neighbors
    for (const [u, v, w] of edges) {
      if (u === minNode && !visited.has(v)) {
        if (dist[minNode] + w < dist[v]) {
          dist[v] = dist[minNode] + w;
          steps.push({
            step: steps.length,
            description: `Update dist[${v}] = ${dist[v]} via node ${minNode}`,
            descriptionFa: `به‌روزرسانی dist[${v}] = ${dist[v]} از طریق گره ${minNode}`,
            data: [...dist.map(d => d === Infinity ? '∞' : d)],
            comparing: [v],
            variables: { updated: v, newDist: dist[v] },
          });
        }
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `Shortest distances: [${dist.join(', ')}]`,
    descriptionFa: `کوتاه‌ترین فاصله‌ها: [${dist.join(', ')}]`,
    data: [...dist],
    sorted: Array.from({ length: nodes }, (_, i) => i),
    variables: { result: dist },
  });

  return steps;
}

// Topological Sort Steps
export function generateTopologicalSortSteps(lessonId, input) {
  const steps = [];
  const nodes = 6;
  const inDegree = [0, 1, 1, 2, 1, 1];
  const graph = [[1, 2], [3], [3, 4], [5], [5], []];
  const result = [];
  const queue = [0];

  steps.push({
    step: 0,
    description: `Topological sort using Kahn's algorithm`,
    descriptionFa: `مرتب‌سازی توپولوژیکی با الگوریتم کان`,
    data: Array.from({ length: nodes }, (_, i) => i),
    variables: { inDegree: [...inDegree], queue: [...queue] },
  });

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    steps.push({
      step: steps.length,
      description: `Process node ${node}, add to result`,
      descriptionFa: `پردازش گره ${node}، اضافه به نتیجه`,
      data: Array.from({ length: nodes }, (_, i) => i),
      highlight: [node],
      sorted: [...result],
      variables: { current: node, result: [...result] },
    });

    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
        steps.push({
          step: steps.length,
          description: `Node ${neighbor} has no more dependencies, add to queue`,
          descriptionFa: `گره ${neighbor} دیگر وابستگی ندارد، اضافه به صف`,
          data: Array.from({ length: nodes }, (_, i) => i),
          comparing: [neighbor],
          variables: { queue: [...queue], inDegree: [...inDegree] },
        });
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `Topological order: [${result.join(' → ')}]`,
    descriptionFa: `ترتیب توپولوژیکی: [${result.join(' → ')}]`,
    data: Array.from({ length: nodes }, (_, i) => i),
    sorted: result,
    variables: { result },
  });

  return steps;
}

// Backtracking Steps (Subsets)
export function generateBacktrackingSteps(lessonId, input) {
  const nums = [1, 2, 3];
  const steps = [];
  const result = [];

  steps.push({
    step: 0,
    description: `Generating all subsets of [${nums.join(', ')}]`,
    descriptionFa: `تولید همه زیرمجموعه‌های [${nums.join(', ')}]`,
    data: [...nums],
    variables: { nums },
  });

  function backtrack(start, current) {
    result.push([...current]);
    steps.push({
      step: steps.length,
      description: `Add subset: [${current.join(', ') || '∅'}]`,
      descriptionFa: `اضافه کردن زیرمجموعه: [${current.join(', ') || '∅'}]`,
      data: [...nums],
      highlight: current.map(n => nums.indexOf(n)),
      variables: { current: [...current], subsets: result.length },
    });

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      steps.push({
        step: steps.length,
        description: `Include ${nums[i]}`,
        descriptionFa: `شامل کردن ${nums[i]}`,
        data: [...nums],
        comparing: [i],
        variables: { current: [...current] },
      });
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);

  steps.push({
    step: steps.length,
    description: `Total ${result.length} subsets generated`,
    descriptionFa: `مجموعاً ${result.length} زیرمجموعه تولید شد`,
    data: [...nums],
    sorted: [0, 1, 2],
    variables: { totalSubsets: result.length },
  });

  return steps;
}
