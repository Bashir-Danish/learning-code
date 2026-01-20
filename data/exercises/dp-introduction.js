export const dpIntroductionExercise = {
  id: 'dp-introduction',
  title: 'Climbing Stairs',
  titleFa: 'بالا رفتن از پله',
  difficulty: 'easy',
  
  description: `
Count ways to climb n stairs taking 1 or 2 steps at a time.

Write a function \`climbStairs(n)\` that returns the number of ways.
`,

  starterCode: `function climbStairs(n) {
  // Use dynamic programming
  
}`,

  solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,

  testCases: [
    { input: [2], expected: 2, description: '2 stairs: 1+1 or 2' },
    { input: [3], expected: 3, description: '3 stairs: 1+1+1, 1+2, 2+1' },
    { input: [5], expected: 8, description: '5 stairs' },
  ],

  hints: ['dp[i] = dp[i-1] + dp[i-2]', 'Base cases: dp[1]=1, dp[2]=2', 'Optimize space with two variables'],
};

export default dpIntroductionExercise;
