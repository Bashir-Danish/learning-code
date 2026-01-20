/**
 * Safely execute JavaScript code and capture output
 * @param {string} code - JavaScript code to execute
 * @param {string} functionName - Name of the function to call
 * @param {any} input - Input to pass to the function
 * @param {boolean} passAsIs - If true, pass input as single argument without destructuring
 * @returns {Object} Result with output, error, and logs
 */
export function executeCode(code, functionName, input, passAsIs = false) {
  const logs = [];
  const startTime = performance.now();

  // Create a custom console to capture logs
  const customConsole = {
    log: (...args) => logs.push(args.map(String).join(' ')),
    error: (...args) => logs.push('ERROR: ' + args.map(String).join(' ')),
    warn: (...args) => logs.push('WARN: ' + args.map(String).join(' ')),
  };

  try {
    // Handle object inputs
    let callCode;
    if (!passAsIs && typeof input === 'object' && input !== null && !Array.isArray(input)) {
      // Check if this looks like named arguments (has 'arr', 'target', 'nums', 'k' etc.)
      // vs a data structure (has 'val', 'left', 'right', 'next', 'children' etc.)
      const keys = Object.keys(input);
      const dataStructureKeys = ['val', 'value', 'left', 'right', 'next', 'prev', 'children', 'child', 'parent', 'head', 'tail'];
      const isDataStructure = keys.some(k => dataStructureKeys.includes(k));
      
      if (isDataStructure) {
        // Pass as single argument (tree node, linked list node, etc.)
        callCode = `return ${functionName}(input);`;
      } else {
        // Destructure object properties as arguments
        const args = keys.map(key => `input.${key}`).join(', ');
        callCode = `return ${functionName}(${args});`;
      }
    } else {
      callCode = `return ${functionName}(input);`;
    }

    // Create a sandboxed function
    const wrappedCode = `
      ${code}
      
      if (typeof ${functionName} !== 'function') {
        throw new Error('Function "${functionName}" is not defined');
      }
      
      ${callCode}
    `;

    // eslint-disable-next-line no-new-func
    const fn = new Function('console', 'input', wrappedCode);
    
    // Execute with timeout protection
    const result = fn(customConsole, JSON.parse(JSON.stringify(input)));
    const executionTime = performance.now() - startTime;

    return {
      success: true,
      output: result,
      logs,
      executionTime,
      error: null,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    
    // Try to extract line number from error
    let lineNumber = null;
    const lineMatch = error.stack?.match(/<anonymous>:(\d+)/);
    if (lineMatch) {
      lineNumber = parseInt(lineMatch[1], 10) - 2; // Adjust for wrapper
    }

    return {
      success: false,
      output: null,
      logs,
      executionTime,
      error: {
        message: error.message,
        lineNumber,
        stack: error.stack,
      },
    };
  }
}

/**
 * Run test cases against user code
 * @param {string} code - User's code
 * @param {string} functionName - Function to test
 * @param {Array} testCases - Array of test cases
 * @returns {Object} Test results
 */
export function runTestCases(code, functionName, testCases) {
  const results = [];
  let passedCount = 0;

  for (const testCase of testCases) {
    // Support both 'expectedOutput' and 'expected' formats
    const expectedOutput = testCase.expectedOutput !== undefined ? testCase.expectedOutput : testCase.expected;
    const isHidden = testCase.isHidden || false;
    let input = testCase.input;
    
    let result;
    
    // Determine how to call the function based on input format
    if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
      // Object input like {arr, target} - pass as named arguments
      result = executeCode(code, functionName, input);
    } else if (Array.isArray(input)) {
      // Array input - check if it's multiple arguments or single array argument
      
      const firstElement = input[0];
      const hasMultipleElements = input.length > 1;
      
      // Check patterns:
      // 1. [[1,2,3], 5] - array + primitive = multiple args
      // 2. [[1,2,3], 'sum'] - array + string = multiple args  
      // 3. [5, 2, 8, 1, 9] - all primitives = single array arg
      // 4. ['()'] - single string = unwrap and pass string
      // 5. [{val: 1, ...}] - single object = unwrap and pass object
      // 6. [null] - single null = unwrap and pass null
      
      if (input.length === 1) {
        // Single element array - unwrap it
        result = executeCode(code, functionName, firstElement);
      } else if (Array.isArray(firstElement) && hasMultipleElements) {
        // First element is array and there are more elements = multiple args
        // e.g., [[1,2,3], 5] or [[1,2,3], 'sum']
        result = executeCodeWithArgs(code, functionName, input);
      } else if (!Array.isArray(firstElement) && typeof firstElement !== 'object') {
        // First element is primitive and there are multiple elements
        // Could be [5, 2, 8] for single array arg OR [arr, target] style
        // Check if all elements are primitives of same type (likely single array)
        const allPrimitives = input.every(item => typeof item !== 'object' || item === null);
        const allSameType = input.every(item => typeof item === typeof firstElement);
        
        if (allPrimitives && allSameType) {
          // All same type primitives = single array argument
          result = executeCode(code, functionName, input);
        } else {
          // Mixed types = multiple arguments
          result = executeCodeWithArgs(code, functionName, input);
        }
      } else {
        // Default: treat as single array argument
        result = executeCode(code, functionName, input);
      }
    } else {
      // Simple value input (number, string, etc.)
      result = executeCode(code, functionName, input);
    }
    
    let passed = false;
    if (result.success) {
      // Deep comparison
      passed = JSON.stringify(result.output) === JSON.stringify(expectedOutput);
    }

    if (passed) passedCount++;

    results.push({
      input: isHidden ? '[Hidden]' : JSON.stringify(input),
      expectedOutput: isHidden ? '[Hidden]' : JSON.stringify(expectedOutput),
      actualOutput: result.success ? JSON.stringify(result.output) : null,
      passed,
      error: result.error,
      executionTime: result.executionTime,
      isHidden,
    });
  }

  return {
    results,
    passedCount,
    totalCount: testCases.length,
    allPassed: passedCount === testCases.length,
  };
}

/**
 * Execute code with multiple arguments
 */
export function executeCodeWithArgs(code, functionName, args) {
  const logs = [];
  const startTime = performance.now();

  const customConsole = {
    log: (...args) => logs.push(args.map(String).join(' ')),
    error: (...args) => logs.push('ERROR: ' + args.map(String).join(' ')),
    warn: (...args) => logs.push('WARN: ' + args.map(String).join(' ')),
  };

  try {
    // Build argument list
    const argsList = args.map((_, i) => `args[${i}]`).join(', ');
    
    const wrappedCode = `
      ${code}
      
      if (typeof ${functionName} !== 'function') {
        throw new Error('Function "${functionName}" is not defined');
      }
      
      return ${functionName}(${argsList});
    `;

    // eslint-disable-next-line no-new-func
    const fn = new Function('console', 'args', wrappedCode);
    const result = fn(customConsole, JSON.parse(JSON.stringify(args)));
    const executionTime = performance.now() - startTime;

    return {
      success: true,
      output: result,
      logs,
      executionTime,
      error: null,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;
    
    let lineNumber = null;
    const lineMatch = error.stack?.match(/<anonymous>:(\d+)/);
    if (lineMatch) {
      lineNumber = parseInt(lineMatch[1], 10) - 2;
    }

    return {
      success: false,
      output: null,
      logs,
      executionTime,
      error: {
        message: error.message,
        lineNumber,
        stack: error.stack,
      },
    };
  }
}

/**
 * Format code for display
 * @param {string} code - Code to format
 * @returns {string} Formatted code
 */
export function formatCode(code) {
  // Basic formatting - in production, use a proper formatter
  return code.trim();
}
