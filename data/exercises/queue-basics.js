export const queueBasicsExercise = {
  id: 'queue-basics',
  title: 'Implement Queue',
  titleFa: 'پیاده‌سازی صف',
  difficulty: 'easy',
  
  description: `
Implement a queue with enqueue, dequeue, and front operations.

Complete the Queue class with these methods.
`,

  starterCode: `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    // Add item to back
  }
  
  dequeue() {
    // Remove and return front item
  }
  
  front() {
    // Return front item without removing
  }
  
  isEmpty() {
    // Return true if empty
  }
}

function testQueue(operations, values) {
  const q = new Queue();
  const results = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === 'enqueue') q.enqueue(values[i]);
    else if (operations[i] === 'dequeue') results.push(q.dequeue());
    else if (operations[i] === 'front') results.push(q.front());
  }
  return results;
}`,

  solution: `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

function testQueue(operations, values) {
  const q = new Queue();
  const results = [];
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === 'enqueue') q.enqueue(values[i]);
    else if (operations[i] === 'dequeue') results.push(q.dequeue());
    else if (operations[i] === 'front') results.push(q.front());
  }
  return results;
}`,

  testCases: [
    { input: [['enqueue', 'enqueue', 'front', 'dequeue', 'front'], [1, 2, null, null, null]], expected: [1, 1, 2], description: 'Basic operations' },
    { input: [['enqueue', 'enqueue', 'enqueue', 'dequeue', 'dequeue'], [1, 2, 3, null, null]], expected: [1, 2], description: 'Multiple dequeue' },
  ],

  hints: ['Use array push for enqueue', 'Use array shift for dequeue', 'Access index 0 for front'],
};

export default queueBasicsExercise;
