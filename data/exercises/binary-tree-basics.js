export const binaryTreeBasicsExercise = {
  id: 'binary-tree-basics',
  title: 'Tree Height',
  titleFa: 'ارتفاع درخت',
  difficulty: 'easy',
  
  description: `
Find the height of a binary tree.

Write a function \`maxDepth(root)\` that returns the maximum depth.
`,

  starterCode: `function maxDepth(root) {
  // Use recursion to find max depth
  
}`,

  solution: `function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,

  testCases: [
    { input: [{ val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }], expected: 3, description: 'Depth is 3' },
    { input: [{ val: 1, left: null, right: { val: 2, left: null, right: null } }], expected: 2, description: 'Depth is 2' },
    { input: [null], expected: 0, description: 'Empty tree' },
  ],

  hints: ['Base case: null returns 0', 'Recurse on left and right', 'Return 1 + max of children'],
};

export default binaryTreeBasicsExercise;
