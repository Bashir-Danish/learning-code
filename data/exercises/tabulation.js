export const tabulationExercise = {
  id: 'tabulation',
  title: 'House Robber',
  titleFa: 'دزد خانه',
  difficulty: 'medium',
  
  description: `
Find maximum money you can rob without robbing adjacent houses.

Write a function \`rob(nums)\` that returns maximum amount.
`,

  starterCode: `function rob(nums) {
  // Use tabulation (bottom-up DP)
  
}`,

  solution: `function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);
  
  for (let i = 2; i < nums.length; i++) {
    const current = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,

  testCases: [
    { input: [[1,2,3,1]], expected: 4, description: 'Rob house 1 and 3' },
    { input: [[2,7,9,3,1]], expected: 12, description: 'Rob house 1, 3, 5' },
    { input: [[2,1,1,2]], expected: 4, description: 'Rob house 1 and 4' },
  ],

  hints: ['dp[i] = max(dp[i-1], dp[i-2] + nums[i])', 'Either skip or rob current', 'Optimize with two variables'],
};

export default tabulationExercise;
