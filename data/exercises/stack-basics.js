export const stackBasicsExercise = {
  id: 'stack-basics',
  title: 'Valid Parentheses',
  titleFa: 'پرانتزهای معتبر',
  difficulty: 'easy',
  
  description: `
Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

Write a function \`isValid(s)\` that returns true if brackets are valid.
`,

  starterCode: `function isValid(s) {
  // Use a stack to match opening and closing brackets
  
}`,

  solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,

  testCases: [
    { input: ['()'], expected: true, description: 'Simple valid' },
    { input: ['()[]{}'], expected: true, description: 'Multiple types' },
    { input: ['(]'], expected: false, description: 'Mismatched' },
    { input: ['([)]'], expected: false, description: 'Wrong order' },
    { input: ['{[]}'], expected: true, description: 'Nested valid' },
  ],

  hints: ['Push opening brackets to stack', 'Pop and compare for closing brackets', 'Stack should be empty at end'],
};

export default stackBasicsExercise;
