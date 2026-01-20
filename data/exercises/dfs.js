export const dfsExercise = {
  id: 'dfs',
  title: 'Number of Islands',
  titleFa: 'تعداد جزیره‌ها',
  difficulty: 'medium',
  
  description: `
Count the number of islands in a 2D grid.

Write a function \`numIslands(grid)\` that returns the count.
`,

  starterCode: `function numIslands(grid) {
  // Use DFS to explore each island
  
}`,

  solution: `function numIslands(grid) {
  if (!grid.length) return 0;
  let count = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }
    grid[i][j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
}`,

  testCases: [
    { input: [[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]], expected: 3, description: 'Three islands' },
    { input: [[['1','1','1'],['0','1','0'],['1','1','1']]], expected: 1, description: 'One island' },
  ],

  hints: ['Find a 1 and start DFS', 'Mark visited as 0', 'Count DFS starts'],
};

export default dfsExercise;
