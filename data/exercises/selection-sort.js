export const selectionSortExercise = {
  id: 'selection-sort',
  title: 'Selection Sort',
  titleFa: 'مرتب‌سازی انتخابی',
  difficulty: 'easy',
  
  description: `
Implement selection sort algorithm.

Write a function \`selectionSort(arr)\` that sorts an array in ascending order using selection sort.
`,
  
  descriptionFa: `
الگوریتم مرتب‌سازی انتخابی را پیاده‌سازی کنید.

تابعی به نام \`selectionSort(arr)\` بنویسید که آرایه را به ترتیب صعودی مرتب کند.
`,

  starterCode: `function selectionSort(arr) {
  // Find minimum element and swap with current position
  // Repeat for each position
  
}`,

  solution: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,

  testCases: [
    { input: [[64, 34, 25, 12, 22]], expected: [12, 22, 25, 34, 64], description: 'Sort unsorted array' },
    { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'Already sorted' },
    { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], description: 'Reverse sorted' },
    { input: [[1]], expected: [1], description: 'Single element' },
  ],

  hints: ['Find the minimum in unsorted portion', 'Swap with first unsorted element', 'Move boundary'],
};

export default selectionSortExercise;
