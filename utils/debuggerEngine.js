/**
 * Simple JavaScript Debugger Engine
 * Parses code and tracks execution step by step
 */

/**
 * Parse code into executable steps with variable tracking
 * @param {string} code - JavaScript code to debug
 * @param {any} input - Input to pass to the function
 * @returns {Object[]} Array of execution steps
 */
export function parseCodeIntoSteps(code, input) {
  const steps = [];
  const variables = {};
  const callStack = [];
  
  try {
    // Extract function name
    const funcMatch = code.match(/function\s+(\w+)/);
    const funcName = funcMatch ? funcMatch[1] : 'anonymous';
    
    // Split code into lines
    const lines = code.split('\n');
    
    // Initial step
    steps.push({
      line: 0,
      code: lines[0] || '',
      variables: { ...variables },
      callStack: [{ name: funcName, line: 0 }],
      description: `Starting function ${funcName}`,
      action: 'start',
    });

    // Simulate execution by analyzing code structure
    let currentLine = 0;
    const loopStack = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      currentLine = i;
      
      // Skip empty lines and comments
      if (!line || line.startsWith('//')) continue;
      
      // Variable declarations
      const varMatch = line.match(/(?:let|const|var)\s+(\w+)\s*=\s*(.+)/);
      if (varMatch) {
        const [, varName, value] = varMatch;
        variables[varName] = evaluateSimpleExpression(value, variables, input);
        
        steps.push({
          line: i,
          code: line,
          variables: { ...variables },
          callStack: [...callStack, { name: funcName, line: i }],
          description: `Declared ${varName} = ${variables[varName]}`,
          action: 'declare',
          changedVar: varName,
        });
      }
      
      // For loops
      const forMatch = line.match(/for\s*\(\s*(?:let|var)?\s*(\w+)\s*=\s*(\d+)/);
      if (forMatch) {
        const [, loopVar, startVal] = forMatch;
        variables[loopVar] = parseInt(startVal, 10);
        loopStack.push({ var: loopVar, line: i });
        
        steps.push({
          line: i,
          code: line,
          variables: { ...variables },
          callStack: [...callStack, { name: funcName, line: i }],
          description: `Starting loop with ${loopVar} = ${startVal}`,
          action: 'loop-start',
          changedVar: loopVar,
        });
      }
      
      // If statements
      if (line.startsWith('if')) {
        steps.push({
          line: i,
          code: line,
          variables: { ...variables },
          callStack: [...callStack, { name: funcName, line: i }],
          description: `Checking condition`,
          action: 'condition',
        });
      }
      
      // Assignments
      const assignMatch = line.match(/(\w+)\s*=\s*(.+?);?$/);
      if (assignMatch && !line.includes('let') && !line.includes('const') && !line.includes('var')) {
        const [, varName, value] = assignMatch;
        if (variables.hasOwnProperty(varName)) {
          const oldValue = variables[varName];
          variables[varName] = evaluateSimpleExpression(value, variables, input);
          
          steps.push({
            line: i,
            code: line,
            variables: { ...variables },
            callStack: [...callStack, { name: funcName, line: i }],
            description: `Updated ${varName}: ${oldValue} → ${variables[varName]}`,
            action: 'assign',
            changedVar: varName,
          });
        }
      }
      
      // Return statement
      if (line.includes('return')) {
        steps.push({
          line: i,
          code: line,
          variables: { ...variables },
          callStack: [...callStack, { name: funcName, line: i }],
          description: `Returning result`,
          action: 'return',
        });
      }
    }
    
    // Final step
    steps.push({
      line: lines.length - 1,
      code: 'End of execution',
      variables: { ...variables },
      callStack: [],
      description: 'Execution complete',
      action: 'end',
    });
    
  } catch (error) {
    steps.push({
      line: 0,
      code: '',
      variables: {},
      callStack: [],
      description: `Error: ${error.message}`,
      action: 'error',
      error: error.message,
    });
  }
  
  return steps;
}

/**
 * Evaluate simple expressions for variable tracking
 */
function evaluateSimpleExpression(expr, variables, input) {
  expr = expr.trim().replace(/;$/, '');
  
  // Number
  if (/^\d+$/.test(expr)) {
    return parseInt(expr, 10);
  }
  
  // String
  if (/^['"].*['"]$/.test(expr)) {
    return expr.slice(1, -1);
  }
  
  // Array
  if (expr.startsWith('[')) {
    try {
      return JSON.parse(expr);
    } catch {
      return expr;
    }
  }
  
  // Variable reference
  if (variables.hasOwnProperty(expr)) {
    return variables[expr];
  }
  
  // Input reference
  if (expr === 'input' || expr === 'arr') {
    return input;
  }
  
  // Length
  if (expr.includes('.length')) {
    const varName = expr.split('.')[0];
    if (variables[varName]?.length !== undefined) {
      return variables[varName].length;
    }
    if (varName === 'input' || varName === 'arr') {
      return input?.length || 0;
    }
  }
  
  // Simple arithmetic
  const arithMatch = expr.match(/(\w+)\s*([+\-*/])\s*(\d+)/);
  if (arithMatch) {
    const [, varName, op, num] = arithMatch;
    const val = variables[varName] || 0;
    const n = parseInt(num, 10);
    switch (op) {
      case '+': return val + n;
      case '-': return val - n;
      case '*': return val * n;
      case '/': return Math.floor(val / n);
    }
  }
  
  return expr;
}

/**
 * Generate debug steps for a specific algorithm
 */
export function generateDebugSteps(algorithmType, input) {
  switch (algorithmType) {
    case 'bubble-sort':
      return generateBubbleSortDebugSteps(input);
    case 'binary-search':
      return generateBinarySearchDebugSteps(input.array, input.target);
    default:
      return [];
  }
}

function generateBubbleSortDebugSteps(arr) {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  
  steps.push({
    line: 0,
    code: 'function bubbleSort(arr) {',
    variables: { arr: [...array], n },
    callStack: [{ name: 'bubbleSort', line: 0 }],
    description: 'Starting bubbleSort',
    action: 'start',
  });
  
  for (let i = 0; i < n - 1; i++) {
    steps.push({
      line: 2,
      code: `for (let i = 0; i < n - 1; i++)`,
      variables: { arr: [...array], n, i },
      callStack: [{ name: 'bubbleSort', line: 2 }],
      description: `Outer loop: i = ${i}`,
      action: 'loop',
      changedVar: 'i',
    });
    
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        line: 3,
        code: `for (let j = 0; j < n - i - 1; j++)`,
        variables: { arr: [...array], n, i, j },
        callStack: [{ name: 'bubbleSort', line: 3 }],
        description: `Inner loop: j = ${j}`,
        action: 'loop',
        changedVar: 'j',
      });
      
      steps.push({
        line: 4,
        code: `if (arr[j] > arr[j + 1])`,
        variables: { arr: [...array], n, i, j, comparing: `${array[j]} > ${array[j+1]}` },
        callStack: [{ name: 'bubbleSort', line: 4 }],
        description: `Comparing arr[${j}]=${array[j]} with arr[${j+1}]=${array[j+1]}`,
        action: 'condition',
      });
      
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        
        steps.push({
          line: 5,
          code: `[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]`,
          variables: { arr: [...array], n, i, j, swapped: true },
          callStack: [{ name: 'bubbleSort', line: 5 }],
          description: `Swapped! Array is now [${array.join(', ')}]`,
          action: 'swap',
          changedVar: 'arr',
        });
      }
    }
  }
  
  steps.push({
    line: 8,
    code: 'return arr;',
    variables: { arr: [...array], result: [...array] },
    callStack: [{ name: 'bubbleSort', line: 8 }],
    description: `Returning sorted array: [${array.join(', ')}]`,
    action: 'return',
  });
  
  return steps;
}

function generateBinarySearchDebugSteps(arr, target) {
  const steps = [];
  const array = [...arr].sort((a, b) => a - b);
  let left = 0;
  let right = array.length - 1;
  
  steps.push({
    line: 0,
    code: 'function binarySearch(arr, target) {',
    variables: { arr: array, target, left, right },
    callStack: [{ name: 'binarySearch', line: 0 }],
    description: `Starting binarySearch for ${target}`,
    action: 'start',
  });
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    steps.push({
      line: 3,
      code: `const mid = Math.floor((left + right) / 2)`,
      variables: { arr: array, target, left, right, mid },
      callStack: [{ name: 'binarySearch', line: 3 }],
      description: `Calculated mid = ${mid}`,
      action: 'assign',
      changedVar: 'mid',
    });
    
    steps.push({
      line: 4,
      code: `if (arr[mid] === target)`,
      variables: { arr: array, target, left, right, mid, comparing: `${array[mid]} === ${target}` },
      callStack: [{ name: 'binarySearch', line: 4 }],
      description: `Comparing arr[${mid}]=${array[mid]} with target=${target}`,
      action: 'condition',
    });
    
    if (array[mid] === target) {
      steps.push({
        line: 5,
        code: `return mid`,
        variables: { arr: array, target, left, right, mid, found: true },
        callStack: [{ name: 'binarySearch', line: 5 }],
        description: `Found ${target} at index ${mid}!`,
        action: 'return',
      });
      return steps;
    }
    
    if (array[mid] < target) {
      left = mid + 1;
      steps.push({
        line: 7,
        code: `left = mid + 1`,
        variables: { arr: array, target, left, right, mid },
        callStack: [{ name: 'binarySearch', line: 7 }],
        description: `${array[mid]} < ${target}, searching right half. left = ${left}`,
        action: 'assign',
        changedVar: 'left',
      });
    } else {
      right = mid - 1;
      steps.push({
        line: 9,
        code: `right = mid - 1`,
        variables: { arr: array, target, left, right, mid },
        callStack: [{ name: 'binarySearch', line: 9 }],
        description: `${array[mid]} > ${target}, searching left half. right = ${right}`,
        action: 'assign',
        changedVar: 'right',
      });
    }
  }
  
  steps.push({
    line: 11,
    code: 'return -1',
    variables: { arr: array, target, left, right, found: false },
    callStack: [{ name: 'binarySearch', line: 11 }],
    description: `${target} not found in array`,
    action: 'return',
  });
  
  return steps;
}

export default { parseCodeIntoSteps, generateDebugSteps };
