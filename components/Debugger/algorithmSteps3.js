// BFS Steps
export function generateBFSSteps(lessonId, input) {
  const { nodes, edges } = input;
  const steps = [];
  const graph = Array.from({ length: nodes }, () => []);
  edges.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  });

  const visited = new Set();
  const queue = [0];
  visited.add(0);
  const order = [];

  steps.push({
    step: 0,
    description: `Starting BFS from node 0`,
    descriptionFa: `شروع BFS از گره 0`,
    data: Array.from({ length: nodes }, (_, i) => i),
    highlight: [0],
    variables: { queue: [0], visited: [0] },
  });

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    steps.push({
      step: steps.length,
      description: `Visit node ${node}, check neighbors: [${graph[node].join(', ')}]`,
      descriptionFa: `بازدید گره ${node}، بررسی همسایه‌ها: [${graph[node].join(', ')}]`,
      data: Array.from({ length: nodes }, (_, i) => i),
      highlight: [node],
      sorted: [...order],
      variables: { current: node, queue: [...queue], visited: [...visited] },
    });

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        steps.push({
          step: steps.length,
          description: `Add node ${neighbor} to queue`,
          descriptionFa: `اضافه کردن گره ${neighbor} به صف`,
          data: Array.from({ length: nodes }, (_, i) => i),
          comparing: [neighbor],
          variables: { queue: [...queue], visited: [...visited] },
        });
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `BFS complete! Order: [${order.join(' → ')}]`,
    descriptionFa: `BFS کامل شد! ترتیب: [${order.join(' → ')}]`,
    data: Array.from({ length: nodes }, (_, i) => i),
    sorted: order,
    variables: { result: order },
  });

  return steps;
}

// DFS Steps
export function generateDFSSteps(lessonId, input) {
  const { nodes, edges } = input;
  const steps = [];
  const graph = Array.from({ length: nodes }, () => []);
  edges.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  });

  const visited = new Set();
  const order = [];

  steps.push({
    step: 0,
    description: `Starting DFS from node 0`,
    descriptionFa: `شروع DFS از گره 0`,
    data: Array.from({ length: nodes }, (_, i) => i),
    highlight: [0],
    variables: { visited: [] },
  });

  function dfs(node) {
    visited.add(node);
    order.push(node);

    steps.push({
      step: steps.length,
      description: `Visit node ${node}`,
      descriptionFa: `بازدید گره ${node}`,
      data: Array.from({ length: nodes }, (_, i) => i),
      highlight: [node],
      sorted: [...order],
      variables: { current: node, visited: [...visited] },
    });

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        steps.push({
          step: steps.length,
          description: `Go deeper to node ${neighbor}`,
          descriptionFa: `رفتن به عمق گره ${neighbor}`,
          data: Array.from({ length: nodes }, (_, i) => i),
          comparing: [neighbor],
          variables: { from: node, to: neighbor },
        });
        dfs(neighbor);
      }
    }
  }

  dfs(0);

  steps.push({
    step: steps.length,
    description: `DFS complete! Order: [${order.join(' → ')}]`,
    descriptionFa: `DFS کامل شد! ترتیب: [${order.join(' → ')}]`,
    data: Array.from({ length: nodes }, (_, i) => i),
    sorted: order,
    variables: { result: order },
  });

  return steps;
}

// DP Introduction Steps (Climbing Stairs)
export function generateDPSteps(lessonId, input) {
  const n = input;
  const steps = [];
  const dp = [1, 1];

  steps.push({
    step: 0,
    description: `Counting ways to climb ${n} stairs (1 or 2 steps at a time)`,
    descriptionFa: `شمارش راه‌های بالا رفتن از ${n} پله (1 یا 2 پله در هر بار)`,
    data: Array.from({ length: n + 1 }, (_, i) => i === 0 || i === 1 ? 1 : 0),
    highlight: [0, 1],
    variables: { n, 'dp[0]': 1, 'dp[1]': 1 },
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      step: steps.length,
      description: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
      descriptionFa: `dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
      code: `dp[${i}] = dp[${i-1}] + dp[${i-2}]`,
      data: [...dp, ...Array(n + 1 - dp.length).fill(0)].slice(0, n + 1),
      highlight: [i],
      comparing: [i - 1, i - 2],
      variables: { i, [`dp[${i}]`]: dp[i] },
    });
  }

  steps.push({
    step: steps.length,
    description: `There are ${dp[n]} ways to climb ${n} stairs`,
    descriptionFa: `${dp[n]} راه برای بالا رفتن از ${n} پله وجود دارد`,
    data: dp,
    sorted: Array.from({ length: n + 1 }, (_, i) => i),
    variables: { result: dp[n] },
  });

  return steps;
}

// Recursion Basics Steps (Factorial)
export function generateRecursionSteps(lessonId, input) {
  const n = input;
  const steps = [];
  const callStack = [];

  steps.push({
    step: 0,
    description: `Calculating ${n}! using recursion`,
    descriptionFa: `محاسبه ${n}! با استفاده از بازگشت`,
    data: Array.from({ length: n + 1 }, (_, i) => i),
    variables: { n },
  });

  function factorial(x, depth = 0) {
    callStack.push(x);
    steps.push({
      step: steps.length,
      description: `Call factorial(${x})`,
      descriptionFa: `فراخوانی factorial(${x})`,
      data: Array.from({ length: n + 1 }, (_, i) => i),
      highlight: [x],
      variables: { x, callStack: [...callStack] },
    });

    if (x <= 1) {
      steps.push({
        step: steps.length,
        description: `Base case: factorial(${x}) = 1`,
        descriptionFa: `حالت پایه: factorial(${x}) = 1`,
        data: Array.from({ length: n + 1 }, (_, i) => i),
        sorted: [x],
        variables: { x, result: 1 },
      });
      callStack.pop();
      return 1;
    }

    const result = x * factorial(x - 1, depth + 1);
    
    steps.push({
      step: steps.length,
      description: `Return: ${x} × factorial(${x-1}) = ${x} × ${result/x} = ${result}`,
      descriptionFa: `برگشت: ${x} × factorial(${x-1}) = ${x} × ${result/x} = ${result}`,
      data: Array.from({ length: n + 1 }, (_, i) => i),
      highlight: [x],
      variables: { x, result },
    });
    
    callStack.pop();
    return result;
  }

  const result = factorial(n);

  steps.push({
    step: steps.length,
    description: `${n}! = ${result}`,
    descriptionFa: `${n}! = ${result}`,
    data: Array.from({ length: n + 1 }, (_, i) => i),
    sorted: Array.from({ length: n + 1 }, (_, i) => i),
    variables: { result },
  });

  return steps;
}

// Hash Table Steps (Two Sum)
export function generateHashTableSteps(lessonId, input) {
  const { nums, target } = input;
  const steps = [];
  const map = new Map();

  steps.push({
    step: 0,
    description: `Finding two numbers that sum to ${target} using hash map`,
    descriptionFa: `یافتن دو عدد با مجموع ${target} با استفاده از جدول هش`,
    data: [...nums],
    variables: { target, map: {} },
  });

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    steps.push({
      step: steps.length,
      description: `Check: need ${complement} to pair with ${nums[i]}`,
      descriptionFa: `بررسی: نیاز به ${complement} برای جفت شدن با ${nums[i]}`,
      data: [...nums],
      highlight: [i],
      variables: { i, current: nums[i], complement, map: Object.fromEntries(map) },
    });

    if (map.has(complement)) {
      steps.push({
        step: steps.length,
        description: `Found! ${nums[map.get(complement)]} + ${nums[i]} = ${target}`,
        descriptionFa: `پیدا شد! ${nums[map.get(complement)]} + ${nums[i]} = ${target}`,
        data: [...nums],
        sorted: [map.get(complement), i],
        variables: { result: [map.get(complement), i] },
      });
      return steps;
    }

    map.set(nums[i], i);
    steps.push({
      step: steps.length,
      description: `Store: map[${nums[i]}] = ${i}`,
      descriptionFa: `ذخیره: map[${nums[i]}] = ${i}`,
      data: [...nums],
      comparing: [i],
      variables: { map: Object.fromEntries(map) },
    });
  }

  steps.push({
    step: steps.length,
    description: `No pair found`,
    descriptionFa: `جفتی پیدا نشد`,
    data: [...nums],
    variables: { result: [] },
  });

  return steps;
}

// Heap Basics Steps
export function generateHeapSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];

  steps.push({
    step: 0,
    description: `Building max heap from [${arr.join(', ')}]`,
    descriptionFa: `ساخت هرم بیشینه از [${arr.join(', ')}]`,
    data: [...arr],
    variables: {},
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
        description: `Swap ${arr[largest]} and ${arr[i]} at indices ${i} and ${largest}`,
        descriptionFa: `جابجایی ${arr[largest]} و ${arr[i]} در اندیس‌های ${i} و ${largest}`,
        data: [...arr],
        highlight: [i, largest],
        variables: { i, largest },
      });
      heapify(arr, n, largest);
    }
  }

  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      step: steps.length,
      description: `Heapify at index ${i}`,
      descriptionFa: `هرم‌سازی در اندیس ${i}`,
      data: [...arr],
      comparing: [i],
      variables: { i },
    });
    heapify(arr, n, i);
  }

  steps.push({
    step: steps.length,
    description: `Max heap built: [${arr.join(', ')}]`,
    descriptionFa: `هرم بیشینه ساخته شد: [${arr.join(', ')}]`,
    data: [...arr],
    sorted: [0],
    variables: { maxHeap: [...arr] },
  });

  return steps;
}

// Tree Traversal Steps
export function generateTreeTraversalSteps(lessonId, input) {
  const steps = [];
  const order = [];

  steps.push({
    step: 0,
    description: `Inorder traversal: Left → Root → Right`,
    descriptionFa: `پیمایش میانوندی: چپ → ریشه → راست`,
    data: [1, 2, 3, 4, 5],
    variables: {},
  });

  function inorder(node, depth = 0) {
    if (!node) return;
    
    if (node.left) {
      steps.push({
        step: steps.length,
        description: `Go left from ${node.val}`,
        descriptionFa: `رفتن به چپ از ${node.val}`,
        data: [1, 2, 3, 4, 5],
        comparing: [node.val - 1],
        variables: { current: node.val },
      });
      inorder(node.left, depth + 1);
    }

    order.push(node.val);
    steps.push({
      step: steps.length,
      description: `Visit node ${node.val}`,
      descriptionFa: `بازدید گره ${node.val}`,
      data: [1, 2, 3, 4, 5],
      highlight: [node.val - 1],
      sorted: order.map(v => v - 1),
      variables: { visited: node.val, order: [...order] },
    });

    if (node.right) {
      steps.push({
        step: steps.length,
        description: `Go right from ${node.val}`,
        descriptionFa: `رفتن به راست از ${node.val}`,
        data: [1, 2, 3, 4, 5],
        comparing: [node.val - 1],
        variables: { current: node.val },
      });
      inorder(node.right, depth + 1);
    }
  }

  inorder(input);

  steps.push({
    step: steps.length,
    description: `Inorder: [${order.join(' → ')}]`,
    descriptionFa: `میانوندی: [${order.join(' → ')}]`,
    data: [1, 2, 3, 4, 5],
    sorted: order.map(v => v - 1),
    variables: { result: order },
  });

  return steps;
}

// Prefix Sum Steps
export function generatePrefixSumSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];
  const prefix = [0];

  steps.push({
    step: 0,
    description: `Building prefix sum array for [${arr.join(', ')}]`,
    descriptionFa: `ساخت آرایه مجموع پیشوندی برای [${arr.join(', ')}]`,
    data: [...arr],
    variables: { prefix: [0] },
  });

  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
    steps.push({
      step: steps.length,
      description: `prefix[${i+1}] = prefix[${i}] + arr[${i}] = ${prefix[i]} + ${arr[i]} = ${prefix[i+1]}`,
      descriptionFa: `prefix[${i+1}] = prefix[${i}] + arr[${i}] = ${prefix[i]} + ${arr[i]} = ${prefix[i+1]}`,
      data: [...arr],
      highlight: [i],
      variables: { prefix: [...prefix] },
    });
  }

  // Example query
  const left = 1, right = 3;
  const rangeSum = prefix[right + 1] - prefix[left];
  
  steps.push({
    step: steps.length,
    description: `Query [${left}..${right}]: prefix[${right+1}] - prefix[${left}] = ${prefix[right+1]} - ${prefix[left]} = ${rangeSum}`,
    descriptionFa: `پرس‌وجو [${left}..${right}]: prefix[${right+1}] - prefix[${left}] = ${prefix[right+1]} - ${prefix[left]} = ${rangeSum}`,
    data: [...arr],
    sorted: Array.from({ length: right - left + 1 }, (_, i) => left + i),
    variables: { left, right, rangeSum, prefix: [...prefix] },
  });

  return steps;
}
