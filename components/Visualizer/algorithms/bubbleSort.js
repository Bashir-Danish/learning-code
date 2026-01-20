/**
 * Generate step-by-step visualization for Bubble Sort
 * @param {number[]} inputArray - Array to sort
 * @returns {Object[]} Array of steps with state snapshots
 */
export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    currentLine: 0,
    variables: { i: 0, j: 0, n },
    description: 'Starting Bubble Sort',
    descriptionFa: 'شروع مرتب‌سازی حبابی',
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        currentLine: 3,
        variables: { i, j, n, comparing: `arr[${j}]=${arr[j]} vs arr[${j + 1}]=${arr[j + 1]}` },
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        descriptionFa: `مقایسه ${arr[j]} و ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Swap step
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          currentLine: 4,
          variables: { i, j, n, action: 'swap' },
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
          descriptionFa: `جابجایی ${arr[j + 1]} و ${arr[j]}`,
        });
      }
    }

    // Mark element as sorted
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      currentLine: 6,
      variables: { i, n, sortedElement: arr[n - 1 - i] },
      description: `Element ${arr[n - 1 - i]} is now in correct position`,
      descriptionFa: `عنصر ${arr[n - 1 - i]} در جای درست قرار گرفت`,
    });

    if (!swapped) {
      // Early termination
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        currentLine: 7,
        variables: { i, n, earlyTermination: true },
        description: 'No swaps needed - array is sorted!',
        descriptionFa: 'جابجایی لازم نیست - آرایه مرتب است!',
      });
      break;
    }
  }

  // Final state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    currentLine: 8,
    variables: { n, completed: true },
    description: 'Sorting complete!',
    descriptionFa: 'مرتب‌سازی کامل شد!',
  });

  return steps;
}

export const bubbleSortPseudocode = [
  'function bubbleSort(arr):',
  '    n = length(arr)',
  '    for i from 0 to n-1:',
  '        for j from 0 to n-i-1:',
  '            if arr[j] > arr[j+1]:',
  '                swap(arr[j], arr[j+1])',
  '        // Element at n-i-1 is sorted',
  '        if no swaps: break',
  '    return arr',
];

export default { generateBubbleSortSteps, bubbleSortPseudocode };
