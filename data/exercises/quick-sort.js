export const quickSortExercise = {
  id: 'quick-sort',
  title: 'Quick Sort',
  titleFa: 'مرتب‌سازی سریع',
  difficulty: 'medium',
  
  description: `
Implement quick sort algorithm.

Write a function \`quickSort(arr)\` that sorts an array using partitioning.
`,

  starterCode: `function quickSort(arr) {
  // Choose pivot, partition, and recurse
  
}`,

  solution: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,

  testCases: [
    { input: [[10, 7, 8, 9, 1, 5]], expected: [1, 5, 7, 8, 9, 10], description: 'Sort array' },
    { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], description: 'Reverse sorted' },
    { input: [[1]], expected: [1], description: 'Single element' },
  ],

  hints: ['Choose last element as pivot', 'Partition into smaller and larger', 'Recursively sort partitions'],
};

export default quickSortExercise;
