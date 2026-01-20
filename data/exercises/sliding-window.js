export const slidingWindowExercise = {
  id: 'sliding-window',
  title: 'Maximum Sum Subarray',
  titleFa: 'بیشترین مجموع زیرآرایه',
  difficulty: 'medium',
  
  description: `
Find the maximum sum of a subarray of size k.

Write a function \`maxSumSubarray(arr, k)\` that returns the maximum sum.
`,

  starterCode: `function maxSumSubarray(arr, k) {
  // Use sliding window technique
  
}`,

  solution: `function maxSumSubarray(arr, k) {
  if (arr.length < k) return 0;
  
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}`,

  testCases: [
    { input: [[1, 4, 2, 10, 2, 3, 1, 0, 20], 4], expected: 24, description: 'Max sum of size 4' },
    { input: [[2, 1, 5, 1, 3, 2], 3], expected: 9, description: 'Max sum of size 3' },
    { input: [[1, 2, 3, 4, 5], 2], expected: 9, description: 'Max sum of size 2' },
  ],

  hints: ['Calculate first window sum', 'Slide by removing left, adding right', 'Track maximum'],
};

export default slidingWindowExercise;
