export const classicDpProblemsExercise = {
  id: 'classic-dp-problems',
  title: 'Longest Common Subsequence',
  titleFa: 'طولانی‌ترین زیردنباله مشترک',
  difficulty: 'medium',
  
  description: `
Find the length of longest common subsequence of two strings.

Write a function \`longestCommonSubsequence(text1, text2)\` that returns the length.
`,

  starterCode: `function longestCommonSubsequence(text1, text2) {
  // Use 2D DP table
  
}`,

  solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,

  testCases: [
    { input: { text1: 'abcde', text2: 'ace' }, expected: 3, description: 'LCS is ace' },
    { input: { text1: 'abc', text2: 'abc' }, expected: 3, description: 'Same strings' },
    { input: { text1: 'abc', text2: 'def' }, expected: 0, description: 'No common' },
  ],

  hints: ['If chars match, add 1 to diagonal', 'Otherwise take max of left/top', 'Build table bottom-up'],
};

export default classicDpProblemsExercise;
