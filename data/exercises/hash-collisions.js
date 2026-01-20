export const hashCollisionsExercise = {
  id: 'hash-collisions',
  title: 'Group Anagrams',
  titleFa: 'گروه‌بندی آناگرام‌ها',
  difficulty: 'medium',
  
  description: `
Group strings that are anagrams of each other.

Write a function \`groupAnagrams(strs)\` that groups anagrams together.
`,

  starterCode: `function groupAnagrams(strs) {
  // Use sorted string as hash key
  
}`,

  solution: `function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }
  return Array.from(map.values());
}`,

  testCases: [
    { input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']], description: 'Group anagrams' },
    { input: [['a']], expected: [['a']], description: 'Single string' },
    { input: [['']], expected: [['']], description: 'Empty string' },
  ],

  hints: ['Sort each string to create key', 'Group by sorted key', 'Return all groups'],
};

export default hashCollisionsExercise;
