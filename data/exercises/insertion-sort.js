export const insertionSortExercise = {
  id: 'insertion-sort',
  title: 'Insertion Sort',
  titleFa: 'مرتب‌سازی درجی',
  difficulty: 'easy',
  
  description: `
Implement insertion sort algorithm.

Write a function \`insertionSort(arr)\` that sorts an array in ascending order.
`,

  starterCode: `function insertionSort(arr) {
  // Insert each element into its correct position
  
}`,

  solution: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,

  testCases: [
    { input: [[64, 34, 25, 12, 22]], expected: [12, 22, 25, 34, 64], description: 'Sort unsorted array' },
    { input: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5], description: 'Already sorted' },
    { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], description: 'Reverse sorted' },
  ],

  hints: ['Start from second element', 'Shift larger elements right', 'Insert at correct position'],
};

export default insertionSortExercise;
