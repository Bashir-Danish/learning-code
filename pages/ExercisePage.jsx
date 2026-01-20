import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Lightbulb,
  Eye,
  EyeOff,
  Trophy
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { getExercise } from '../data/exercises';
import { runTestCases } from '../utils/codeExecutor';
import MarkdownRenderer from '../components/Lesson/MarkdownRenderer';

export default function ExercisePage() {
  const { exerciseId } = useParams();
  const { isExerciseComplete, markExerciseComplete } = useProgress();
  
  const exercise = getExercise(exerciseId);
  const isComplete = isExerciseComplete(exerciseId);

  const [code, setCode] = useState(exercise?.starterCode || '');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const handleRunTests = useCallback(() => {
    if (!exercise) return;

    setIsRunning(true);
    
    // Small delay for UX
    setTimeout(() => {
      const functionName = code.match(/function\s+(\w+)/)?.[1] || 'solution';
      const results = runTestCases(code, functionName, exercise.testCases);
      
      setTestResults(results);
      setIsRunning(false);

      if (results.allPassed && !isComplete) {
        markExerciseComplete(exerciseId);
      }
    }, 100);
  }, [code, exercise, exerciseId, isComplete, markExerciseComplete]);

  const handleRevealHint = useCallback(() => {
    if (revealedHints < (exercise?.hints?.length || 0)) {
      setRevealedHints((prev) => prev + 1);
    }
  }, [revealedHints, exercise?.hints?.length]);

  if (!exercise) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Exercise Not Found
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to={`/lesson/${exercise.lessonId}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lesson
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {exercise.title}
            </h1>
            <p className="text-lg text-gray-500 fa">{exercise.titleFa}</p>
          </div>

          {isComplete && (
            <span className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4" />
              Completed
            </span>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Problem description */}
        <div className="space-y-4">
          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Problem</h2>
            <MarkdownRenderer content={exercise.description} />
          </div>

          {/* Examples */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Examples</h2>
            <div className="space-y-3">
              {exercise.examples.map((example, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                  <div className="text-gray-500">Input:</div>
                  <div className="text-gray-900 mb-2">{example.input}</div>
                  <div className="text-gray-500">Output:</div>
                  <div className="text-green-600">{example.output}</div>
                  {example.explanation && (
                    <div className="text-gray-500 text-xs mt-2">
                      {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Constraints */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Constraints</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {exercise.constraints.map((constraint, idx) => (
                <li key={idx}>{constraint}</li>
              ))}
            </ul>
          </div>

          {/* Hints */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Hints
              </h2>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {showHints ? 'Hide' : 'Show'}
              </button>
            </div>

            {showHints && (
              <div className="space-y-2">
                {exercise.hints.slice(0, revealedHints).map((hint, idx) => (
                  <div
                    key={idx}
                    className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm"
                  >
                    <span className="font-medium text-yellow-700">
                      Hint {idx + 1}:
                    </span>{' '}
                    {hint}
                  </div>
                ))}

                {revealedHints < exercise.hints.length && (
                  <button
                    onClick={handleRevealHint}
                    className="text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    Reveal next hint ({revealedHints}/{exercise.hints.length})
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Code editor and results */}
        <div className="space-y-4">
          {/* Code editor */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">
                JavaScript
              </span>
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
              >
                <Play className="w-4 h-4" />
                {isRunning ? 'Running...' : 'Run Tests'}
              </button>
            </div>

            <Editor
              height="350px"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Test results */}
          {testResults && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-900">Test Results</h2>
                <span
                  className={`text-sm font-medium ${
                    testResults.allPassed ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {testResults.passedCount}/{testResults.totalCount} passed
                </span>
              </div>

              {testResults.allPassed && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 font-medium">
                    All tests passed! Great job! 🎉
                  </span>
                </div>
              )}

              <div className="space-y-2">
                {testResults.results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg p-3 text-sm ${
                      result.passed
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {result.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className="font-medium">
                        Test {idx + 1} {result.isHidden && '(Hidden)'}
                      </span>
                    </div>

                    {!result.isHidden && (
                      <div className="font-mono text-xs space-y-1 ml-6">
                        <div>
                          <span className="text-gray-500">Input:</span>{' '}
                          {result.input}
                        </div>
                        <div>
                          <span className="text-gray-500">Expected:</span>{' '}
                          {result.expectedOutput}
                        </div>
                        {result.actualOutput && (
                          <div>
                            <span className="text-gray-500">Got:</span>{' '}
                            <span
                              className={
                                result.passed ? 'text-green-600' : 'text-red-600'
                              }
                            >
                              {result.actualOutput}
                            </span>
                          </div>
                        )}
                        {result.error && (
                          <div className="text-red-600">
                            Error: {result.error.message}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Solution */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-900">Solution</h2>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                {showSolution ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Solution
                  </>
                )}
              </button>
            </div>

            {showSolution && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono">
                    {exercise.solution}
                  </pre>
                </div>
                <MarkdownRenderer content={exercise.solutionExplanation} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
