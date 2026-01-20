import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { ArrowLeft, Bug, Play } from 'lucide-react';
import StepDebugger from '../components/Debugger/StepDebugger';
import { generateDebugSteps } from '../utils/debuggerEngine';

const sampleCodes = {
  'bubble-sort': `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
  'binary-search': `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
};

export default function DebuggerPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [code, setCode] = useState(sampleCodes['bubble-sort']);
  const [input, setInput] = useState('[5, 2, 8, 1, 9]');
  const [target, setTarget] = useState('8');
  const [steps, setSteps] = useState([]);
  const [isDebugging, setIsDebugging] = useState(false);

  const handleAlgorithmChange = useCallback((algo) => {
    setSelectedAlgorithm(algo);
    setCode(sampleCodes[algo]);
    setSteps([]);
    setIsDebugging(false);
  }, []);

  const handleStartDebug = useCallback(() => {
    try {
      const inputArray = JSON.parse(input);
      
      let debugSteps;
      if (selectedAlgorithm === 'binary-search') {
        debugSteps = generateDebugSteps('binary-search', {
          array: inputArray,
          target: parseInt(target, 10),
        });
      } else {
        debugSteps = generateDebugSteps(selectedAlgorithm, inputArray);
      }
      
      setSteps(debugSteps);
      setIsDebugging(true);
    } catch (error) {
      alert('Invalid input. Please enter a valid JSON array.');
    }
  }, [selectedAlgorithm, input, target]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Bug className="w-8 h-8 text-primary-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Step-by-Step Debugger
            </h1>
            <p className="text-gray-500 fa">دیباگر مرحله‌ای</p>
          </div>
        </div>
      </div>

      {/* Algorithm selector and input */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Algorithm
            </label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => handleAlgorithmChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="bubble-sort">Bubble Sort</option>
              <option value="binary-search">Binary Search</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Input Array
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg w-48"
              placeholder="[5, 2, 8, 1, 9]"
            />
          </div>

          {selectedAlgorithm === 'binary-search' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target
              </label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg w-24"
              />
            </div>
          )}

          <div className="ml-auto">
            <button
              onClick={handleStartDebug}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Play className="w-4 h-4" />
              Start Debugging
            </button>
          </div>
        </div>
      </div>

      {/* Code editor */}
      {!isDebugging && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">Code</span>
          </div>
          <Editor
            height="300px"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              readOnly: true,
            }}
          />
        </div>
      )}

      {/* Debugger */}
      {isDebugging && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Debug Session</h2>
            <button
              onClick={() => setIsDebugging(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close Debugger
            </button>
          </div>
          
          <StepDebugger code={code} steps={steps} />
        </div>
      )}

      {/* Instructions */}
      {!isDebugging && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">How to use:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Select an algorithm from the dropdown</li>
            <li>Enter your input array (JSON format)</li>
            <li>Click "Start Debugging" to begin</li>
            <li>Use the controls to step through the code</li>
            <li>Watch variables change in real-time</li>
            <li>Click on line numbers to set breakpoints</li>
          </ol>
        </div>
      )}
    </div>
  );
}
