export const dequeExercise = {
  id: 'deque',
  title: 'Sliding Window Maximum',
  titleFa: 'بیشینه پنجره لغزان',
  difficulty: 'hard',
  
  description: `
Find maximum in each sliding window of size k using a deque.

Write a function \`maxSlidingWindow(nums, k)\` that returns array of maximums.
`,

  starterCode: `function maxSlidingWindow(nums, k) {
  // Use deque to track potential maximums
  
}`,

  solution: `function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // stores indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (deque.length && deque[0] < i - k + 1) {
      deque.shift();
    }
    // Remove smaller elements
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    deque.push(i);
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}`,

  testCases: [
    { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7], description: 'Window size 3' },
    { input: [[1], 1], expected: [1], description: 'Single element' },
  ],

  hints: ['Store indices in deque', 'Remove out-of-window indices', 'Keep deque decreasing'],
};

export default dequeExercise;
