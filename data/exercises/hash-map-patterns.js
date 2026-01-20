export const hashMapPatternsExercise = {
  id: 'hash-map-patterns',
  title: 'First Unique Character',
  titleFa: 'اولین کاراکتر یکتا',
  difficulty: 'easy',
  
  description: `
Find the first non-repeating character in a string.

Write a function \`firstUniqChar(s)\` that returns the index of first unique character.
`,

  starterCode: `function firstUniqChar(s) {
  // Count characters, then find first with count 1
  
}`,

  solution: `function firstUniqChar(s) {
  const count = new Map();
  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) {
      return i;
    }
  }
  return -1;
}`,

  testCases: [
    { input: ['leetcode'], expected: 0, description: 'l is first unique' },
    { input: ['loveleetcode'], expected: 2, description: 'v is first unique' },
    { input: ['aabb'], expected: -1, description: 'No unique character' },
  ],

  hints: ['First pass: count all characters', 'Second pass: find first with count 1', 'Use Map for counting'],
};

export default hashMapPatternsExercise;
