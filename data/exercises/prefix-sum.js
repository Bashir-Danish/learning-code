export const prefixSumExercise = {
  id: 'prefix-sum',
  title: 'Range Sum Query',
  titleFa: 'پرس‌وجوی مجموع بازه',
  difficulty: 'easy',
  
  description: `
Build a prefix sum array and answer range sum queries.

Write a function \`rangeSum(arr, left, right)\` that returns sum from index left to right.
`,

  starterCode: `function rangeSum(arr, left, right) {
  // Build prefix sum and use it for range query
  
}`,

  solution: `function rangeSum(arr, left, right) {
  const prefix = [0];
  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
  }
  return prefix[right + 1] - prefix[left];
}`,

  testCases: [
    { input: [[1, 2, 3, 4, 5], 1, 3], expected: 9, description: 'Sum from index 1 to 3' },
    { input: [[1, 2, 3, 4, 5], 0, 4], expected: 15, description: 'Sum entire array' },
    { input: [[1, 2, 3, 4, 5], 2, 2], expected: 3, description: 'Single element' },
  ],

  hints: ['Build prefix array first', 'prefix[i] = sum of first i elements', 'Range sum = prefix[right+1] - prefix[left]'],
};

export default prefixSumExercise;
