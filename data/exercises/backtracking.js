export const backtrackingExercise = {
  id: 'backtracking',
  title: 'Subsets',
  titleFa: 'زیرمجموعه‌ها',
  difficulty: 'medium',
  
  description: `
Generate all possible subsets of a set.

Write a function \`subsets(nums)\` that returns all subsets.
`,

  starterCode: `function subsets(nums) {
  // Use backtracking to generate subsets
  
}`,

  solution: `function subsets(nums) {
  const result = [];
  
  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}`,

  testCases: [
    { input: [[1,2,3]], expected: [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]], description: 'All subsets' },
    { input: [[0]], expected: [[],[0]], description: 'Single element' },
  ],

  hints: ['Include or exclude each element', 'Use backtracking pattern', 'Add current state to result'],
};

export default backtrackingExercise;
