export const balancedTreesExercise = {
  id: 'balanced-trees',
  title: 'Check Balanced Tree',
  titleFa: 'بررسی درخت متوازن',
  difficulty: 'easy',
  
  description: `
Check if a binary tree is height-balanced.

Write a function \`isBalanced(root)\` that returns true if balanced.
`,

  starterCode: `function isBalanced(root) {
  // Check if height difference <= 1 at every node
  
}`,

  solution: `function isBalanced(root) {
  function height(node) {
    if (node === null) return 0;
    const left = height(node.left);
    const right = height(node.right);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1;
    }
    return 1 + Math.max(left, right);
  }
  return height(root) !== -1;
}`,

  testCases: [
    { input: [{ val: 3, left: { val: 9, left: null, right: null }, right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } } }], expected: true, description: 'Balanced tree' },
    { input: [{ val: 1, left: { val: 2, left: { val: 3, left: { val: 4, left: null, right: null }, right: null }, right: null }, right: null }], expected: false, description: 'Unbalanced tree' },
  ],

  hints: ['Calculate height recursively', 'Return -1 if unbalanced', 'Check difference at each node'],
};

export default balancedTreesExercise;
