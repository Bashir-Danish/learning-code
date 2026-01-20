export const doublyLinkedListExercise = {
  id: 'doubly-linked-list',
  title: 'Reverse Traversal',
  titleFa: 'پیمایش معکوس',
  difficulty: 'easy',
  
  description: `
Traverse a doubly linked list from tail to head.

Write a function \`reverseTraverse(tail)\` that returns values from tail to head.
`,

  starterCode: `function reverseTraverse(tail) {
  // Use prev pointers to traverse backwards
  
}`,

  solution: `function reverseTraverse(tail) {
  const result = [];
  let current = tail;
  while (current !== null) {
    result.push(current.val);
    current = current.prev;
  }
  return result;
}`,

  testCases: [
    { input: [{ val: 3, prev: { val: 2, prev: { val: 1, prev: null } } }], expected: [3, 2, 1], description: 'Reverse traverse' },
    { input: [{ val: 1, prev: null }], expected: [1], description: 'Single node' },
    { input: [null], expected: [], description: 'Empty list' },
  ],

  hints: ['Start from tail', 'Use prev pointer', 'Collect values in array'],
};

export default doublyLinkedListExercise;
