export const mergeSortExercise = {
  id: 'merge-sort',
  title: 'Merge Sort',
  titleFa: 'مرتب‌سازی ادغامی',
  difficulty: 'medium',
  
  description: `
Implement merge sort algorithm.

Write a function \`mergeSort(arr)\` that sorts an array using divide and conquer.
`,

  starterCode: `function mergeSort(arr) {
  // Divide, sort, and merge
  
}`,

  solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,

  testCases: [
    { input: [[38, 27, 43, 3, 9, 82, 10]], expected: [3, 9, 10, 27, 38, 43, 82], description: 'Sort array' },
    { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], description: 'Reverse sorted' },
    { input: [[1]], expected: [1], description: 'Single element' },
  ],

  hints: ['Divide array in half', 'Recursively sort halves', 'Merge sorted halves'],
};

export default mergeSortExercise;
