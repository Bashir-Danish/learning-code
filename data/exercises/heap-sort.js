export const heapSortExercise = {
  id: 'heap-sort',
  title: 'Heap Sort',
  titleFa: 'مرتب‌سازی هرمی',
  difficulty: 'medium',
  
  description: `
Implement heap sort algorithm.

Write a function \`heapSort(arr)\` that sorts an array using a max heap.
`,

  starterCode: `function heapSort(arr) {
  // Build max heap, then extract max repeatedly
  
}`,

  solution: `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,

  testCases: [
    { input: [[12, 11, 13, 5, 6, 7]], expected: [5, 6, 7, 11, 12, 13], description: 'Sort array' },
    { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], description: 'Reverse sorted' },
  ],

  hints: ['Build max heap first', 'Swap root with last', 'Heapify reduced heap'],
};

export default heapSortExercise;
