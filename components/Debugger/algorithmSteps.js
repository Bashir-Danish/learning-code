// Bubble Sort Steps
export function generateBubbleSortSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;

  steps.push({
    step: 0,
    description: `Starting Bubble Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی حبابی با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    highlight: [],
    variables: { n },
    lineNumber: 0,
    code: 'function bubbleSort(arr)',
  });

  steps.push({
    step: 1,
    description: `Array length n = ${n}`,
    descriptionFa: `طول آرایه n = ${n}`,
    data: [...arr],
    highlight: [],
    variables: { n },
    lineNumber: 1,
    code: `const n = arr.length; // n = ${n}`,
  });

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      step: steps.length,
      description: `Outer loop: pass ${i + 1} of ${n - 1}`,
      descriptionFa: `حلقه بیرونی: دور ${i + 1} از ${n - 1}`,
      data: [...arr],
      highlight: [],
      sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
      variables: { n, i },
      lineNumber: 2,
      code: `for (let i = ${i}; i < ${n - 1}; i++)`,
    });

    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        step: steps.length,
        description: `Inner loop: comparing positions ${j} and ${j + 1}`,
        descriptionFa: `حلقه داخلی: مقایسه موقعیت‌های ${j} و ${j + 1}`,
        data: [...arr],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        variables: { n, i, j },
        lineNumber: 3,
        code: `for (let j = ${j}; j < ${n - i - 1}; j++)`,
      });

      steps.push({
        step: steps.length,
        description: `Comparing: ${arr[j]} > ${arr[j + 1]} ? ${arr[j] > arr[j + 1] ? 'Yes, swap!' : 'No, continue'}`,
        descriptionFa: `مقایسه: ${arr[j]} > ${arr[j + 1]} ؟ ${arr[j] > arr[j + 1] ? 'بله، جابجا کن!' : 'نه، ادامه بده'}`,
        code: `if (arr[${j}] > arr[${j + 1}]) // ${arr[j]} > ${arr[j + 1]}`,
        data: [...arr],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        variables: { n, i, j, 'arr[j]': arr[j], 'arr[j+1]': arr[j + 1] },
        lineNumber: 4,
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          step: steps.length,
          description: `Swapped! Array is now [${arr.join(', ')}]`,
          descriptionFa: `جابجا شد! آرایه اکنون [${arr.join(', ')}]`,
          code: `[arr[${j}], arr[${j + 1}]] = [arr[${j + 1}], arr[${j}]]`,
          data: [...arr],
          highlight: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          variables: { n, i, j },
          lineNumber: 5,
        });
      }
    }
  }

  steps.push({
    step: steps.length,
    description: `Sorting complete! Result: [${arr.join(', ')}]`,
    descriptionFa: `مرتب‌سازی کامل شد! نتیجه: [${arr.join(', ')}]`,
    code: 'return arr;',
    data: [...arr],
    sorted: Array.from({ length: n }, (_, i) => i),
    variables: { result: [...arr] },
    lineNumber: 9,
  });

  return steps;
}

// Selection Sort Steps
export function generateSelectionSortSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];
  const n = arr.length;

  steps.push({
    step: 0,
    description: `Starting Selection Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی انتخابی با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    highlight: [],
    variables: { n },
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    steps.push({
      step: steps.length,
      description: `Finding minimum in unsorted portion starting at index ${i}`,
      descriptionFa: `یافتن کمینه در بخش مرتب‌نشده از اندیس ${i}`,
      data: [...arr],
      highlight: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      variables: { i, minIdx },
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        step: steps.length,
        description: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`,
        descriptionFa: `مقایسه ${arr[j]} با کمینه فعلی ${arr[minIdx]}`,
        data: [...arr],
        comparing: [j, minIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
        variables: { i, j, minIdx },
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      steps.push({
        step: steps.length,
        description: `Swapped ${arr[minIdx]} with ${arr[i]}`,
        descriptionFa: `${arr[minIdx]} با ${arr[i]} جابجا شد`,
        data: [...arr],
        highlight: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        variables: { i, minIdx },
      });
    }
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

// Insertion Sort Steps
export function generateInsertionSortSteps(lessonId, input) {
  const arr = [...input];
  const steps = [];

  steps.push({
    step: 0,
    description: `Starting Insertion Sort with array [${arr.join(', ')}]`,
    descriptionFa: `شروع مرتب‌سازی درجی با آرایه [${arr.join(', ')}]`,
    data: [...arr],
    sorted: [0],
    variables: {},
  });

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      step: steps.length,
      description: `Inserting ${key} into sorted portion`,
      descriptionFa: `درج ${key} در بخش مرتب‌شده`,
      data: [...arr],
      highlight: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      variables: { key, i, j },
    });

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      steps.push({
        step: steps.length,
        description: `Shifting ${arr[j]} to the right`,
        descriptionFa: `انتقال ${arr[j]} به راست`,
        data: [...arr],
        comparing: [j, j + 1],
        variables: { key, j },
      });
      j--;
    }
    arr[j + 1] = key;

    steps.push({
      step: steps.length,
      description: `Placed ${key} at index ${j + 1}`,
      descriptionFa: `${key} در اندیس ${j + 1} قرار گرفت`,
      data: [...arr],
      highlight: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      variables: { key },
    });
  }

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

// Linear Search Steps
export function generateLinearSearchSteps(lessonId, input) {
  const { array, target } = input;
  const steps = [];

  steps.push({
    step: 0,
    description: `Searching for ${target} in array [${array.join(', ')}]`,
    descriptionFa: `جستجوی ${target} در آرایه [${array.join(', ')}]`,
    data: [...array],
    variables: { target },
  });

  for (let i = 0; i < array.length; i++) {
    steps.push({
      step: steps.length,
      description: `Checking index ${i}: ${array[i]} ${array[i] === target ? '= ' : '≠ '}${target}`,
      descriptionFa: `بررسی اندیس ${i}: ${array[i]} ${array[i] === target ? '= ' : '≠ '}${target}`,
      code: `if (arr[${i}] === ${target})`,
      data: [...array],
      highlight: [i],
      variables: { i, current: array[i], target },
    });

    if (array[i] === target) {
      steps.push({
        step: steps.length,
        description: `Found ${target} at index ${i}!`,
        descriptionFa: `${target} در اندیس ${i} پیدا شد!`,
        data: [...array],
        highlight: [i],
        sorted: [i],
        variables: { result: i },
      });
      return steps;
    }
  }

  steps.push({
    step: steps.length,
    description: `${target} not found in array`,
    descriptionFa: `${target} در آرایه پیدا نشد`,
    data: [...array],
    variables: { result: -1 },
  });

  return steps;
}

// Binary Search Steps
export function generateBinarySearchSteps(lessonId, input) {
  const { array, target } = input;
  const arr = [...array].sort((a, b) => a - b);
  const steps = [];
  let left = 0, right = arr.length - 1;

  steps.push({
    step: 0,
    description: `Binary search for ${target} in sorted array [${arr.join(', ')}]`,
    descriptionFa: `جستجوی دودویی ${target} در آرایه مرتب [${arr.join(', ')}]`,
    code: 'function binarySearch(arr, target)',
    data: [...arr],
    pointers: { L: left, R: right },
    variables: { target, left, right },
    lineNumber: 0,
  });

  steps.push({
    step: 1,
    description: `Initialize: left = 0, right = ${arr.length - 1}`,
    descriptionFa: `مقداردهی اولیه: left = 0, right = ${arr.length - 1}`,
    code: `let left = 0, right = arr.length - 1;`,
    data: [...arr],
    pointers: { L: left, R: right },
    variables: { target, left, right },
    lineNumber: 1,
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      step: steps.length,
      description: `Check: left (${left}) <= right (${right})? Yes, continue`,
      descriptionFa: `بررسی: left (${left}) <= right (${right})؟ بله، ادامه`,
      code: `while (left <= right) // ${left} <= ${right}`,
      data: [...arr],
      highlight: [],
      pointers: { L: left, R: right },
      variables: { target, left, right },
      lineNumber: 2,
    });

    steps.push({
      step: steps.length,
      description: `Calculate mid = floor((${left} + ${right}) / 2) = ${mid}`,
      descriptionFa: `محاسبه mid = floor((${left} + ${right}) / 2) = ${mid}`,
      code: `const mid = Math.floor((${left} + ${right}) / 2); // mid = ${mid}`,
      data: [...arr],
      highlight: [mid],
      pointers: { L: left, M: mid, R: right },
      variables: { target, left, right, mid, 'arr[mid]': arr[mid] },
      lineNumber: 3,
    });

    steps.push({
      step: steps.length,
      description: `Compare: arr[${mid}] = ${arr[mid]} ${arr[mid] === target ? '==' : arr[mid] < target ? '<' : '>'} target (${target})`,
      descriptionFa: `مقایسه: arr[${mid}] = ${arr[mid]} ${arr[mid] === target ? '==' : arr[mid] < target ? '<' : '>'} هدف (${target})`,
      code: `if (arr[mid] === target) // ${arr[mid]} === ${target}?`,
      data: [...arr],
      highlight: [mid],
      pointers: { L: left, M: mid, R: right },
      variables: { target, left, right, mid, 'arr[mid]': arr[mid] },
      lineNumber: 4,
    });

    if (arr[mid] === target) {
      steps.push({
        step: steps.length,
        description: `Found ${target} at index ${mid}! 🎉`,
        descriptionFa: `${target} در اندیس ${mid} پیدا شد! 🎉`,
        code: `return mid; // Found at index ${mid}`,
        data: [...arr],
        sorted: [mid],
        pointers: { L: left, M: mid, R: right },
        variables: { result: mid },
        lineNumber: 4,
      });
      return steps;
    }

    if (arr[mid] < target) {
      steps.push({
        step: steps.length,
        description: `${arr[mid]} < ${target}, search right half. left = mid + 1 = ${mid + 1}`,
        descriptionFa: `${arr[mid]} < ${target}، جستجو در نیمه راست. left = mid + 1 = ${mid + 1}`,
        code: `left = mid + 1; // left = ${mid + 1}`,
        data: [...arr],
        comparing: Array.from({ length: mid + 1 }, (_, i) => i),
        pointers: { L: mid + 1, R: right },
        variables: { target, left: mid + 1, right },
        lineNumber: 5,
      });
      left = mid + 1;
    } else {
      steps.push({
        step: steps.length,
        description: `${arr[mid]} > ${target}, search left half. right = mid - 1 = ${mid - 1}`,
        descriptionFa: `${arr[mid]} > ${target}، جستجو در نیمه چپ. right = mid - 1 = ${mid - 1}`,
        code: `right = mid - 1; // right = ${mid - 1}`,
        data: [...arr],
        comparing: Array.from({ length: arr.length - mid }, (_, i) => mid + i),
        pointers: { L: left, R: mid - 1 },
        variables: { target, left, right: mid - 1 },
        lineNumber: 6,
      });
      right = mid - 1;
    }
  }

  steps.push({
    step: steps.length,
    description: `${target} not found in array`,
    descriptionFa: `${target} در آرایه پیدا نشد`,
    code: 'return -1; // Not found',
    data: [...arr],
    variables: { result: -1 },
    lineNumber: 7,
  });

  return steps;
}
