/**
 * Generate step-by-step visualization for Selection Sort
 * @param {number[]} inputArray - Array to sort
 * @returns {Object[]} Array of steps with state snapshots
 */
export function generateSelectionSortSteps(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    minIndex: -1,
    currentLine: 0,
    variables: { i: 0, n },
    description: 'Starting Selection Sort',
    descriptionFa: 'شروع مرتب‌سازی انتخابی',
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Finding minimum step
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: Array.from({ length: i }, (_, k) => k),
      minIndex: minIdx,
      currentLine: 2,
      variables: { i, minIdx, minValue: arr[minIdx] },
      description: `Starting search for minimum from index ${i}`,
      descriptionFa: `شروع جستجوی کمینه از اندیس ${i}`,
    });

    for (let j = i + 1; j < n; j++) {
      // Comparing step
      steps.push({
        array: [...arr],
        comparing: [j, minIdx],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => k),
        minIndex: minIdx,
        currentLine: 4,
        variables: { i, j, minIdx, comparing: `arr[${j}]=${arr[j]} vs min=${arr[minIdx]}` },
        description: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`,
        descriptionFa: `مقایسه ${arr[j]} با کمینه فعلی ${arr[minIdx]}`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        
        steps.push({
          array: [...arr],
          comparing: [j],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
          minIndex: minIdx,
          currentLine: 5,
          variables: { i, j, minIdx, newMin: arr[minIdx] },
          description: `Found new minimum: ${arr[minIdx]} at index ${minIdx}`,
          descriptionFa: `کمینه جدید پیدا شد: ${arr[minIdx]} در اندیس ${minIdx}`,
        });
      }
    }

    if (minIdx !== i) {
      // Swap step
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
        minIndex: -1,
        currentLine: 6,
        variables: { i, minIdx, action: 'swap' },
        description: `Swapping ${arr[minIdx]} and ${arr[i]}`,
        descriptionFa: `جابجایی ${arr[minIdx]} و ${arr[i]}`,
      });
    }

    // Mark element as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      minIndex: -1,
      currentLine: 7,
      variables: { i, sortedElement: arr[i] },
      description: `Element ${arr[i]} is now in correct position`,
      descriptionFa: `عنصر ${arr[i]} در جای درست قرار گرفت`,
    });
  }

  // Final state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    minIndex: -1,
    currentLine: 8,
    variables: { n, completed: true },
    description: 'Sorting complete!',
    descriptionFa: 'مرتب‌سازی کامل شد!',
  });

  return steps;
}

export const selectionSortPseudocode = [
  'function selectionSort(arr):',
  '    n = length(arr)',
  '    for i from 0 to n-1:',
  '        minIdx = i',
  '        for j from i+1 to n:',
  '            if arr[j] < arr[minIdx]:',
  '                minIdx = j',
  '        swap(arr[i], arr[minIdx])',
  '    return arr',
];

export default { generateSelectionSortSteps, selectionSortPseudocode };
