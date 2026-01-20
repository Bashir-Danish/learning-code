export const treeTraversalsExercise = {
  id: 'tree-traversals',
  title: 'Inorder Traversal',
  titleFa: 'پیمایش میانوندی',
  difficulty: 'easy',
  
  description: `
Perform inorder traversal of a binary tree.

Write a function \`inorderTraversal(root)\` that returns values in order.
`,

  starterCode: `function inorderTraversal(root) {
  // Left, Root, Right
  
}`,

  solution: `function inorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (node === null) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}`,

  testCases: [
    { input: [{ val: 1, left: null, right: { val: 2, left: { val: 3, left: null, right: null }, right: null } }], expected: [1, 3, 2], description: 'Inorder traversal' },
    { input: [null], expected: [], description: 'Empty tree' },
    { input: [{ val: 1, left: null, right: null }], expected: [1], description: 'Single node' },
  ],

  hints: ['Visit left subtree first', 'Then visit root', 'Finally visit right subtree'],
};

export default treeTraversalsExercise;
