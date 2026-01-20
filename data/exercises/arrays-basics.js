export const arraysBasicsExercise = {
  id: 'arrays-basics',
  title: 'Array Operations',
  titleFa: 'عملیات آرایه',
  difficulty: 'easy',
  
  description: `
Implement basic array operations.

Write a function \`arrayOperations(arr, operations)\` that performs operations on an array:
- 'sum': return sum of all elements
- 'max': return maximum element
- 'reverse': return reversed array
`,
  
  descriptionFa: `
عملیات پایه آرایه را پیاده‌سازی کنید.

تابعی بنویسید که عملیات مختلف روی آرایه انجام دهد.
`,

  starterCode: `function arrayOperations(arr, operation) {
  // Implement sum, max, and reverse operations
  
}`,

  solution: `function arrayOperations(arr, operation) {
  if (operation === 'sum') {
    return arr.reduce((a, b) => a + b, 0);
  } else if (operation === 'max') {
    return Math.max(...arr);
  } else if (operation === 'reverse') {
    return [...arr].reverse();
  }
  return null;
}`,

  testCases: [
    { input: [[1, 2, 3, 4, 5], 'sum'], expected: 15, description: 'Sum of array' },
    { input: [[1, 5, 3, 9, 2], 'max'], expected: 9, description: 'Maximum element' },
    { input: [[1, 2, 3], 'reverse'], expected: [3, 2, 1], description: 'Reverse array' },
  ],

  hints: ['Use reduce for sum', 'Use Math.max with spread', 'Use reverse() method'],
};

export default arraysBasicsExercise;
