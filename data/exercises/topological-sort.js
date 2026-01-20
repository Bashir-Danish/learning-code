export const topologicalSortExercise = {
  id: 'topological-sort',
  title: 'Course Schedule',
  titleFa: 'برنامه درسی',
  difficulty: 'medium',
  
  description: `
Determine if you can finish all courses given prerequisites.

Write a function \`canFinish(numCourses, prerequisites)\` that returns true if possible.
`,

  starterCode: `function canFinish(numCourses, prerequisites) {
  // Detect cycle using topological sort
  
}`,

  solution: `function canFinish(numCourses, prerequisites) {
  const graph = new Array(numCourses).fill(null).map(() => []);
  const inDegree = new Array(numCourses).fill(0);
  
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;
    for (const next of graph[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  
  return count === numCourses;
}`,

  testCases: [
    { input: [2, [[1,0]]], expected: true, description: 'Can finish' },
    { input: [2, [[1,0],[0,1]]], expected: false, description: 'Cycle exists' },
  ],

  hints: ['Build graph and in-degrees', 'Start with 0 in-degree nodes', 'Check if all processed'],
};

export default topologicalSortExercise;
