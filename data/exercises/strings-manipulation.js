export const stringsManipulationExercise = {
  id: 'strings-manipulation',
  title: 'String Reversal',
  titleFa: 'معکوس کردن رشته',
  difficulty: 'easy',
  
  description: `
Implement string reversal without using built-in reverse.

Write a function \`reverseString(s)\` that returns the reversed string.
`,

  starterCode: `function reverseString(s) {
  // Reverse the string without using reverse()
  
}`,

  solution: `function reverseString(s) {
  let result = '';
  for (let i = s.length - 1; i >= 0; i--) {
    result += s[i];
  }
  return result;
}`,

  testCases: [
    { input: ['hello'], expected: 'olleh', description: 'Reverse hello' },
    { input: ['world'], expected: 'dlrow', description: 'Reverse world' },
    { input: ['a'], expected: 'a', description: 'Single character' },
    { input: [''], expected: '', description: 'Empty string' },
  ],

  hints: ['Loop from end to start', 'Build result string', 'Or use two pointers'],
};

export default stringsManipulationExercise;
