export const countingSortExercise = {
  id: 'counting-sort',
  title: 'Counting Sort',
  titleFa: 'مرتب‌سازی شمارشی',
  difficulty: 'easy',
  
  description: `
Implement counting sort for non-negative integers.

Write a function \`countingSort(arr)\` that sorts using counting.
`,

  starterCode: `function countingSort(arr) {
  // Count occurrences, then rebuild array
  
}`,

  solution: `function countingSort(arr) {
  if (arr.length === 0) return arr;
  
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  
  for (const num of arr) {
    count[num]++;
  }
  
  const result = [];
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
    }
  }
  return result;
}`,

  testCases: [
    { input: [[4, 2, 2, 8, 3, 3, 1]], expected: [1, 2, 2, 3, 3, 4, 8], description: 'Sort with duplicates' },
    { input: [[1, 1, 1]], expected: [1, 1, 1], description: 'All same' },
    { input: [[]], expected: [], description: 'Empty array' },
  ],

  hints: ['Find maximum value', 'Count each number', 'Rebuild from counts'],
};

export default countingSortExercise;
