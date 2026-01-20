export const binarySearchTreeExercise = {
  id: 'binary-search-tree',
  title: 'Validate BST',
  titleFa: 'اعتبارسنجی BST',
  difficulty: 'medium',
  
  description: `
Check if a binary tree is a valid binary search tree.

Write a function \`isValidBST(root)\` that returns true if valid.
`,

  starterCode: `function isValidBST(root) {
  // Check BST property with bounds
  
}`,

  solution: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (root === null) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}`,

  testCases: [
    { input: [{ val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } }], expected: true, description: 'Valid BST' },
    { input: [{ val: 5, left: { val: 1, left: null, right: null }, right: { val: 4, left: { val: 3, left: null, right: null }, right: { val: 6, left: null, right: null } } }], expected: false, description: 'Invalid BST' },
  ],

  hints: ['Track min and max bounds', 'Left child must be less', 'Right child must be greater'],
};

export default binarySearchTreeExercise;
