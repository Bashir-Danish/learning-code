// Merge Sort Steps (simplified visualization)
export function generateMergeSortSteps(lessonId, input) {
  const steps = [];
  const arr = [...input];

  steps.push({
    step: 0,
    description: `Starting Merge Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی ادغامی با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    variables: {},
  });

  // Simplified merge sort visualization
  function mergeSort(arr, start, end) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    
    steps.push({
      step: steps.length,
      description: `Dividing: [${start}..${mid}] and [${mid+1}..${end}]`,
      descriptionFa: `تقسیم: [${start}..${mid}] و [${mid+1}..${end}]`,
      data: [...arr],
      highlight: Array.from({ length: end - start + 1 }, (_, i) => start + i),
      variables: { start, mid, end },
    });

    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }

  function merge(arr, start, mid, end) {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];

    steps.push({
      step: steps.length,
      description: `Merged [${start}..${end}]: [${arr.slice(start, end + 1).join(', ')}]`,
      descriptionFa: `ادغام [${start}..${end}]: [${arr.slice(start, end + 1).join(', ')}]`,
      data: [...arr],
      sorted: Array.from({ length: end - start + 1 }, (_, i) => start + i),
      variables: {},
    });
  }

  mergeSort(arr, 0, arr.length - 1);

  steps.push({
    step: steps.length,
    description: `Sorting complete! Result: [${arr.join(', ')}]`,
    descriptionFa: `مرتب‌سازی کامل شد! نتیجه: [${arr.join(', ')}]`,
    data: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    variables: {},
  });

  return steps;
}

// Quick Sort Steps
export function generateQuickSortSteps(lessonId, input) {
  const steps = [];
  const arr = [...input];

  steps.push({
    step: 0,
    description: `Starting Quick Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی سریع با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    variables: {},
  });

  function quickSort(arr, low, high) {
    if (low < high) {
      const pivot = arr[high];
      steps.push({
        step: steps.length,
        description: `Pivot = ${pivot} (index ${high})`,
        descriptionFa: `محور = ${pivot} (اندیس ${high})`,
        data: [...arr],
        highlight: [high],
        variables: { pivot, low, high },
      });

      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      const pi = i + 1;

      steps.push({
        step: steps.length,
        description: `Partitioned: pivot ${pivot} at index ${pi}`,
        descriptionFa: `پارتیشن‌بندی: محور ${pivot} در اندیس ${pi}`,
        data: [...arr],
        sorted: [pi],
        variables: { pivotIndex: pi },
      });

      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  quickSort(arr, 0, arr.length - 1);

  steps.push({
    step: steps.length,
    description: `Sorting complete! Result: [${arr.join(', ')}]`,
    descriptionFa: `مرتب‌سازی کامل شد! نتیجه: [${arr.join(', ')}]`,
    data: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    variables: {},
  });

  return steps;
}

// Stack Steps (Valid Parentheses)
export function generateStackSteps(lessonId, input) {
  const steps = [];
  const stack = [];
  const chars = Array.isArray(input) ? input : input.split('');
  const map = { ')': '(', '}': '{', ']': '[' };

  steps.push({
    step: 0,
    description: `Checking if "${chars.join('')}" has valid parentheses`,
    descriptionFa: `بررسی معتبر بودن پرانتزها در "${chars.join('')}"`,
    data: chars,
    variables: { stack: [] },
  });

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
      steps.push({
        step: steps.length,
        description: `Push '${char}' to stack`,
        descriptionFa: `'${char}' به پشته اضافه شد`,
        data: chars,
        highlight: [i],
        variables: { stack: [...stack], current: char },
      });
    } else {
      const top = stack.pop();
      const isValid = top === map[char];
      steps.push({
        step: steps.length,
        description: `Pop '${top || 'empty'}', compare with '${char}': ${isValid ? 'Match!' : 'No match'}`,
        descriptionFa: `'${top || 'خالی'}' از پشته خارج شد، مقایسه با '${char}': ${isValid ? 'تطابق!' : 'عدم تطابق'}`,
        data: chars,
        highlight: [i],
        comparing: isValid ? [] : [i],
        variables: { stack: [...stack], popped: top, current: char },
      });
    }
  }

  const isValid = stack.length === 0;
  steps.push({
    step: steps.length,
    description: isValid ? 'Valid! Stack is empty' : 'Invalid! Stack not empty',
    descriptionFa: isValid ? 'معتبر! پشته خالی است' : 'نامعتبر! پشته خالی نیست',
    data: chars,
    sorted: isValid ? Array.from({ length: chars.length }, (_, i) => i) : [],
    variables: { result: isValid },
  });

  return steps;
}

// Queue Steps
export function generateQueueSteps(lessonId, input) {
  const steps = [];
  const queue = [];
  const operations = ['enqueue', 'enqueue', 'enqueue', 'dequeue', 'enqueue', 'dequeue'];
  const values = [...input];

  steps.push({
    step: 0,
    description: `Starting Queue operations`,
    descriptionFa: `شروع عملیات صف`,
    data: [],
    variables: { queue: [] },
  });

  let valueIdx = 0;
  for (const op of operations) {
    if (op === 'enqueue' && valueIdx < values.length) {
      queue.push(values[valueIdx]);
      steps.push({
        step: steps.length,
        description: `Enqueue ${values[valueIdx]} → Queue: [${queue.join(', ')}]`,
        descriptionFa: `اضافه کردن ${values[valueIdx]} → صف: [${queue.join(', ')}]`,
        data: [...queue],
        highlight: [queue.length - 1],
        variables: { queue: [...queue], added: values[valueIdx] },
      });
      valueIdx++;
    } else if (op === 'dequeue' && queue.length > 0) {
      const removed = queue.shift();
      steps.push({
        step: steps.length,
        description: `Dequeue ${removed} → Queue: [${queue.join(', ')}]`,
        descriptionFa: `حذف ${removed} → صف: [${queue.join(', ')}]`,
        data: [...queue],
        variables: { queue: [...queue], removed },
      });
    }
  }

  steps.push({
    step: steps.length,
    description: `Final queue: [${queue.join(', ')}]`,
    descriptionFa: `صف نهایی: [${queue.join(', ')}]`,
    data: [...queue],
    sorted: Array.from({ length: queue.length }, (_, i) => i),
    variables: { queue: [...queue] },
  });

  return steps;
}

// Two Pointers Steps
export function generateTwoPointersSteps(lessonId, input) {
  const { array, target } = input;
  const steps = [];
  let left = 0, right = array.length - 1;

  steps.push({
    step: 0,
    description: `Finding two numbers that sum to ${target} in [${array.join(', ')}]`,
    descriptionFa: `یافتن دو عدد با مجموع ${target} در [${array.join(', ')}]`,
    data: [...array],
    pointers: { L: left, R: right },
    variables: { target, left, right },
  });

  while (left < right) {
    const sum = array[left] + array[right];
    steps.push({
      step: steps.length,
      description: `arr[${left}] + arr[${right}] = ${array[left]} + ${array[right]} = ${sum}`,
      descriptionFa: `arr[${left}] + arr[${right}] = ${array[left]} + ${array[right]} = ${sum}`,
      data: [...array],
      comparing: [left, right],
      pointers: { L: left, R: right },
      variables: { sum, target, left, right },
    });

    if (sum === target) {
      steps.push({
        step: steps.length,
        description: `Found! ${array[left]} + ${array[right]} = ${target}`,
        descriptionFa: `پیدا شد! ${array[left]} + ${array[right]} = ${target}`,
        data: [...array],
        sorted: [left, right],
        variables: { result: [left, right] },
      });
      return steps;
    }

    if (sum < target) {
      left++;
      steps.push({
        step: steps.length,
        description: `Sum ${sum} < ${target}, move left pointer right`,
        descriptionFa: `مجموع ${sum} < ${target}، اشاره‌گر چپ به راست`,
        data: [...array],
        pointers: { L: left, R: right },
        variables: { left, right },
      });
    } else {
      right--;
      steps.push({
        step: steps.length,
        description: `Sum ${sum} > ${target}, move right pointer left`,
        descriptionFa: `مجموع ${sum} > ${target}، اشاره‌گر راست به چپ`,
        data: [...array],
        pointers: { L: left, R: right },
        variables: { left, right },
      });
    }
  }

  steps.push({
    step: steps.length,
    description: `No pair found`,
    descriptionFa: `جفتی پیدا نشد`,
    data: [...array],
    variables: { result: [-1, -1] },
  });

  return steps;
}

// Sliding Window Steps
export function generateSlidingWindowSteps(lessonId, input) {
  const { array, k } = input;
  const steps = [];
  let windowSum = 0;
  let maxSum = 0;

  steps.push({
    step: 0,
    description: `Finding max sum of subarray of size ${k} in [${array.join(', ')}]`,
    descriptionFa: `یافتن بیشترین مجموع زیرآرایه به اندازه ${k} در [${array.join(', ')}]`,
    data: [...array],
    variables: { k },
  });

  // First window
  for (let i = 0; i < k; i++) {
    windowSum += array[i];
  }
  maxSum = windowSum;

  steps.push({
    step: steps.length,
    description: `Initial window [0..${k-1}]: sum = ${windowSum}`,
    descriptionFa: `پنجره اولیه [0..${k-1}]: مجموع = ${windowSum}`,
    data: [...array],
    highlight: Array.from({ length: k }, (_, i) => i),
    variables: { windowSum, maxSum },
  });

  // Slide window
  for (let i = k; i < array.length; i++) {
    windowSum = windowSum - array[i - k] + array[i];
    
    steps.push({
      step: steps.length,
      description: `Slide: remove ${array[i-k]}, add ${array[i]} → sum = ${windowSum}`,
      descriptionFa: `لغزش: حذف ${array[i-k]}، اضافه ${array[i]} → مجموع = ${windowSum}`,
      data: [...array],
      highlight: Array.from({ length: k }, (_, j) => i - k + 1 + j),
      comparing: [i - k],
      variables: { windowSum, maxSum, removed: array[i-k], added: array[i] },
    });

    if (windowSum > maxSum) {
      maxSum = windowSum;
      steps.push({
        step: steps.length,
        description: `New max found: ${maxSum}`,
        descriptionFa: `بیشینه جدید: ${maxSum}`,
        data: [...array],
        sorted: Array.from({ length: k }, (_, j) => i - k + 1 + j),
        variables: { windowSum, maxSum },
      });
    }
  }

  steps.push({
    step: steps.length,
    description: `Maximum sum: ${maxSum}`,
    descriptionFa: `بیشترین مجموع: ${maxSum}`,
    data: [...array],
    variables: { result: maxSum },
  });

  return steps;
}
