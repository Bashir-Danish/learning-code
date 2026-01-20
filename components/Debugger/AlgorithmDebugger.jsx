import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, RotateCcw, 
  Settings, Code, Eye
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  generateBubbleSortSteps,
  generateSelectionSortSteps,
  generateInsertionSortSteps,
  generateLinearSearchSteps,
  generateBinarySearchSteps,
} from './algorithmSteps';
import {
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateStackSteps,
  generateQueueSteps,
  generateTwoPointersSteps,
  generateSlidingWindowSteps,
} from './algorithmSteps2';
import {
  generateBFSSteps,
  generateDFSSteps,
  generateDPSteps,
  generateRecursionSteps,
  generateHashTableSteps,
  generateHeapSteps,
  generateTreeTraversalSteps,
  generatePrefixSumSteps,
} from './algorithmSteps3';
import {
  generateCountingSortSteps,
  generateHeapSortSteps,
  generateMonotonicStackSteps,
  generateFastSlowPointersSteps,
  generateLinkedListReversalSteps,
  generateDijkstraSteps,
  generateTopologicalSortSteps,
  generateBacktrackingSteps,
} from './algorithmSteps4';

// Algorithm code templates for display
const algorithmCodes = {
  'bubble-sort': `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
  return arr;
}`,
  'selection-sort': `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
  'insertion-sort': `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  'linear-search': `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
  'binary-search': `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  'two-pointers': `function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}`,
  'sliding-window': `function maxSumSubarray(arr, k) {
  let windowSum = 0, maxSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i-k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
  'stack-basics': `function isValid(s) {
  const stack = [];
  const map = {')':'(', '}':'{', ']':'['};
  for (let char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) 
        return false;
    }
  }
  return stack.length === 0;
}`,
  'queue-basics': `class Queue {
  constructor() { this.items = []; }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
  isEmpty() { return this.items.length === 0; }
}`,
  'bfs': `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
  'dfs': `function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  console.log(node);
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
  'dp-introduction': `function climbStairs(n) {
  if (n <= 2) return n;
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
  'recursion-basics': `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
  'hash-table-basics': `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
  'merge-sort': `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
  'quick-sort': `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
  'heap-basics': `function buildMaxHeap(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
  'tree-traversals': `function inorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);   // Left
    result.push(node.val); // Root
    traverse(node.right);  // Right
  }
  traverse(root);
  return result;
}`,
  'prefix-sum': `function prefixSum(arr) {
  const prefix = [0];
  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
  }
  return prefix;
}

function rangeSum(prefix, left, right) {
  return prefix[right + 1] - prefix[left];
}`,
  'counting-sort': `function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  
  for (const num of arr) count[num]++;
  
  let idx = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      arr[idx++] = i;
      count[i]--;
    }
  }
  return arr;
}`,
  'heap-sort': `function heapSort(arr) {
  const n = arr.length;
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`,
  'monotonic-stack': `function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`,
  'fast-slow-pointers': `function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
  'linked-list-reversal': `function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
  'dijkstra': `function dijkstra(graph, start) {
  const dist = new Array(graph.length).fill(Infinity);
  const visited = new Set();
  dist[start] = 0;
  
  while (visited.size < graph.length) {
    let u = -1;
    for (let i = 0; i < graph.length; i++) {
      if (!visited.has(i) && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }
    visited.add(u);
    for (const [v, w] of graph[u]) {
      dist[v] = Math.min(dist[v], dist[u] + w);
    }
  }
  return dist;
}`,
  'topological-sort': `function topologicalSort(numCourses, prerequisites) {
  const graph = Array.from({length: numCourses}, () => []);
  const inDegree = new Array(numCourses).fill(0);
  
  for (const [a, b] of prerequisites) {
    graph[b].push(a);
    inDegree[a]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node]) {
      if (--inDegree[next] === 0) queue.push(next);
    }
  }
  return order.length === numCourses ? order : [];
}`,
  'backtracking': `function subsets(nums) {
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
};

// Algorithm-specific debug generators
const algorithmDebuggers = {
  'bubble-sort': generateBubbleSortSteps,
  'selection-sort': generateSelectionSortSteps,
  'insertion-sort': generateInsertionSortSteps,
  'linear-search': generateLinearSearchSteps,
  'binary-search': generateBinarySearchSteps,
  'merge-sort': generateMergeSortSteps,
  'quick-sort': generateQuickSortSteps,
  'stack-basics': generateStackSteps,
  'queue-basics': generateQueueSteps,
  'two-pointers': generateTwoPointersSteps,
  'sliding-window': generateSlidingWindowSteps,
  'bfs': generateBFSSteps,
  'dfs': generateDFSSteps,
  'dp-introduction': generateDPSteps,
  'recursion-basics': generateRecursionSteps,
  'hash-table-basics': generateHashTableSteps,
  'heap-basics': generateHeapSteps,
  'tree-traversals': generateTreeTraversalSteps,
  'prefix-sum': generatePrefixSumSteps,
  'counting-sort': generateCountingSortSteps,
  'heap-sort': generateHeapSortSteps,
  'monotonic-stack': generateMonotonicStackSteps,
  'fast-slow-pointers': generateFastSlowPointersSteps,
  'linked-list-reversal': generateLinkedListReversalSteps,
  'dijkstra': generateDijkstraSteps,
  'topological-sort': generateTopologicalSortSteps,
  'backtracking': generateBacktrackingSteps,
};

// Export list of lessons that have visual debuggers
export const lessonsWithDebugger = Object.keys(algorithmDebuggers);

function generateDefaultSteps(lessonId, input) {
  return [{
    step: 0,
    description: 'Algorithm visualization coming soon',
    descriptionFa: 'تجسم الگوریتم به زودی',
    data: input,
    highlight: [],
    variables: {},
    lineNumber: 0,
  }];
}

export default function AlgorithmDebugger({ lessonId, exercise, autoPlay = false }) {
  const { t, isRTL } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [steps, setSteps] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showCode, setShowCode] = useState(true);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  const intervalRef = useRef(null);
  const codeRef = useRef(null);

  const algorithmCode = algorithmCodes[lessonId] || '';
  const codeLines = algorithmCode.split('\n');

  const getDebugSteps = useCallback(() => {
    const generator = algorithmDebuggers[lessonId] || generateDefaultSteps;
    const defaultInput = getDefaultInput(lessonId);
    return generator(lessonId, defaultInput);
  }, [lessonId]);

  useEffect(() => {
    const newSteps = getDebugSteps();
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
    setHasAutoStarted(false);
  }, [lessonId, getDebugSteps]);

  useEffect(() => {
    if (autoPlay && steps.length > 1 && !hasAutoStarted) {
      const timer = setTimeout(() => {
        setIsPlaying(true);
        setHasAutoStarted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [steps, autoPlay, hasAutoStarted]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  // Scroll to highlighted line
  useEffect(() => {
    if (codeRef.current && currentStepData.lineNumber !== undefined) {
      const lineElement = codeRef.current.querySelector(`[data-line="${currentStepData.lineNumber}"]`);
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStep]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => { setIsPlaying(false); setCurrentStep(0); };
  const handleStepForward = () => { if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1); };
  const handleStepBack = () => { if (currentStep > 0) setCurrentStep(prev => prev - 1); };

  const currentStepData = steps[currentStep] || {};

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Play className="w-4 h-4" />
          {t('Visual Debugger', 'دیباگر تصویری')}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`p-1.5 rounded transition-colors ${showCode ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
            title={t('Toggle Code', 'نمایش کد')}
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-white/80 hover:text-white p-1 rounded"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{t('Speed:', 'سرعت:')}</span>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={2200 - speed}
              onChange={(e) => setSpeed(2200 - parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <span className="text-sm text-gray-500 w-20 text-center">
              {speed < 500 ? '🚀 ' + t('Fast', 'سریع') : speed > 1500 ? '🐢 ' + t('Slow', 'آهسته') : '⚡ ' + t('Normal', 'معمولی')}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:min-h-[350px]">
        {/* Code Panel */}
        {showCode && algorithmCode && (
          <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col max-h-[300px] lg:max-h-none">
            <div className="bg-gray-800 px-3 py-1.5 flex items-center gap-2 border-b border-gray-700 flex-shrink-0">
              <Code className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">{t('Algorithm Code', 'کد الگوریتم')}</span>
            </div>
            <div ref={codeRef} className="bg-gray-900 p-2 overflow-y-auto overflow-x-hidden flex-1 font-mono text-[11px] leading-5">
              {codeLines.map((line, idx) => {
                const isCurrentLine = currentStepData.lineNumber === idx;
                const isExecutedLine = currentStepData.executedLines?.includes(idx);
                return (
                  <div
                    key={idx}
                    data-line={idx}
                    className={`flex transition-all duration-300 ${
                      isCurrentLine 
                        ? 'bg-yellow-500/30 border-l-2 border-yellow-400' 
                        : isExecutedLine 
                          ? 'bg-green-500/10 border-l-2 border-green-500/50' 
                          : 'border-l-2 border-transparent'
                    }`}
                  >
                    <span className={`w-5 text-right pr-1 select-none text-[10px] flex-shrink-0 ${isCurrentLine ? 'text-yellow-400' : 'text-gray-600'}`}>
                      {idx + 1}
                    </span>
                    <code className={`flex-1 whitespace-pre-wrap break-all ${isCurrentLine ? 'text-yellow-100' : 'text-gray-300'}`}>
                      <CodeHighlight code={line} />
                    </code>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Visualization Panel */}
        <div className={`${showCode && algorithmCode ? 'lg:w-1/2' : 'w-full'} p-4 flex flex-col`}>
          {/* Array Visualization */}
          <ArrayVisualization 
            data={currentStepData.data} 
            highlight={currentStepData.highlight || []}
            comparing={currentStepData.comparing || []}
            sorted={currentStepData.sorted || []}
            pointers={currentStepData.pointers || {}}
          />

          {/* Variables Display */}
          {currentStepData.variables && Object.keys(currentStepData.variables).length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {t('Variables', 'متغیرها')}
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentStepData.variables).map(([key, value]) => (
                  <div key={key} className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-sm shadow-sm">
                    <span className="text-purple-600 font-mono font-semibold">{key}</span>
                    <span className="text-gray-400 mx-1">=</span>
                    <span className="text-gray-700 font-mono">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step Description */}
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg">
                {currentStep + 1}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-lg">
                  {isRTL ? currentStepData.descriptionFa : currentStepData.description}
                </p>
                {currentStepData.code && (
                  <code className="mt-2 block text-sm bg-gray-900 text-green-400 px-3 py-2 rounded-lg font-mono">
                    {currentStepData.code}
                  </code>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-gray-500 font-medium">
            {t('Step', 'گام')} <span className="text-purple-600">{currentStep + 1}</span> / {steps.length}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={handleReset} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors" title={t('Reset', 'بازنشانی')}>
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={handleStepBack} disabled={currentStep === 0} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30" title={t('Previous', 'قبلی')}>
              <SkipBack className="w-5 h-5" />
            </button>
            {isPlaying ? (
              <button onClick={handlePause} className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg" title={t('Pause', 'توقف')}>
                <Pause className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handlePlay} disabled={currentStep >= steps.length - 1} className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50" title={t('Play', 'پخش')}>
                <Play className="w-5 h-5" />
              </button>
            )}
            <button onClick={handleStepForward} disabled={currentStep >= steps.length - 1} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30" title={t('Next', 'بعدی')}>
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple syntax highlighting component
function CodeHighlight({ code }) {
  const keywords = ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'new', 'class', 'constructor', 'this'];
  const parts = code.split(/(\s+|[(){}[\];,.])/);
  
  return (
    <>
      {parts.map((part, i) => {
        if (keywords.includes(part)) {
          return <span key={i} className="text-purple-400">{part}</span>;
        }
        if (/^['"].*['"]$/.test(part)) {
          return <span key={i} className="text-green-400">{part}</span>;
        }
        if (/^\d+$/.test(part)) {
          return <span key={i} className="text-orange-400">{part}</span>;
        }
        if (/^(true|false|null|undefined)$/.test(part)) {
          return <span key={i} className="text-blue-400">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// Array Visualization Component
function ArrayVisualization({ data, highlight = [], comparing = [], sorted = [], pointers = {} }) {
  if (!data || !Array.isArray(data)) {
    return <div className="flex items-center justify-center h-40 text-gray-400">No data to visualize</div>;
  }

  const maxVal = Math.max(...data.map(v => typeof v === 'number' ? Math.abs(v) : 0), 1);

  return (
    <div className="flex items-end justify-center gap-1 h-48 px-4">
      {data.map((value, index) => {
        const isHighlighted = highlight.includes(index);
        const isComparing = comparing.includes(index);
        const isSorted = sorted.includes(index);
        const height = typeof value === 'number' ? (Math.abs(value) / maxVal) * 100 : 50;
        
        let bgClass = 'bg-gradient-to-t from-blue-500 to-blue-400';
        if (isSorted) bgClass = 'bg-gradient-to-t from-green-600 to-green-400';
        else if (isHighlighted) bgClass = 'bg-gradient-to-t from-yellow-500 to-yellow-300 animate-pulse';
        else if (isComparing) bgClass = 'bg-gradient-to-t from-red-500 to-red-400';

        return (
          <div key={index} className="flex flex-col items-center gap-1">
            {Object.entries(pointers).map(([name, idx]) => 
              idx === index && (
                <span key={name} className="text-xs font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded -mb-1 animate-bounce">
                  {name}
                </span>
              )
            )}
            <div
              className={`w-10 ${bgClass} rounded-t transition-all duration-300 flex items-end justify-center shadow-md`}
              style={{ height: `${Math.max(height, 20)}%` }}
            >
              <span className="text-white text-xs font-bold pb-1 drop-shadow">
                {typeof value === 'number' ? value : String(value).charAt(0)}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-mono">{index}</span>
          </div>
        );
      })}
    </div>
  );
}

function getDefaultInput(lessonId) {
  const inputs = {
    'bubble-sort': [64, 34, 25, 12, 22, 11, 90],
    'selection-sort': [64, 25, 12, 22, 11],
    'insertion-sort': [12, 11, 13, 5, 6],
    'linear-search': { array: [10, 23, 45, 70, 11, 15], target: 70 },
    'binary-search': { array: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target: 23 },
    'merge-sort': [38, 27, 43, 3, 9, 82, 10],
    'quick-sort': [10, 7, 8, 9, 1, 5],
    'stack-basics': ['(', '[', '{', '}', ']', ')'],
    'queue-basics': [1, 2, 3, 4, 5],
    'two-pointers': { array: [1, 2, 3, 4, 6], target: 6 },
    'sliding-window': { array: [2, 1, 5, 1, 3, 2], k: 3 },
    'bfs': { nodes: 5, edges: [[0,1], [0,2], [1,3], [2,4]] },
    'dfs': { nodes: 5, edges: [[0,1], [0,2], [1,3], [2,4]] },
    'dp-introduction': 5,
    'recursion-basics': 5,
    'hash-table-basics': { nums: [2, 7, 11, 15], target: 9 },
    'heap-basics': [3, 1, 6, 5, 2, 4],
    'tree-traversals': { val: 1, left: { val: 2, left: { val: 4 }, right: { val: 5 } }, right: { val: 3 } },
    'prefix-sum': [1, 2, 3, 4, 5],
    'counting-sort': [4, 2, 2, 8, 3, 3, 1],
    'heap-sort': [12, 11, 13, 5, 6, 7],
    'monotonic-stack': [2, 1, 2, 4, 3],
    'fast-slow-pointers': [1, 2, 3, 4, 5, 6],
    'linked-list-reversal': [1, 2, 3, 4, 5],
    'dijkstra': { nodes: 5 },
    'topological-sort': { nodes: 6 },
    'backtracking': [1, 2, 3],
  };
  return inputs[lessonId] || [5, 3, 8, 4, 2];
}
