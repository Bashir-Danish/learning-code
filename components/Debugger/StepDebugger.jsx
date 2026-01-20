import { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw,
  StepForward,
  StepBack
} from 'lucide-react';
import VariableWatch from './VariableWatch';
import CallStack from './CallStack';
import CodeWithBreakpoints from './CodeWithBreakpoints';

export default function StepDebugger({ 
  code, 
  steps, 
  onStepsGenerated 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [breakpoints, setBreakpoints] = useState([]);

  const currentStepData = steps[currentStep] || {};

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        // Check for breakpoint
        const nextStep = steps[currentStep + 1];
        if (breakpoints.includes(nextStep?.line)) {
          setIsPlaying(false);
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, speed);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed, breakpoints]);

  const handlePlay = useCallback(() => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  }, [currentStep, steps.length]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleStepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleStepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleToggleBreakpoint = useCallback((line) => {
    setBreakpoints(prev => 
      prev.includes(line) 
        ? prev.filter(l => l !== line)
        : [...prev, line]
    );
  }, []);

  if (!steps || steps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No debug steps available. Run the code first.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
        <button
          onClick={handleReset}
          className="p-2 rounded hover:bg-gray-100"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={handleStepBackward}
          disabled={currentStep === 0}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          title="Step Back"
        >
          <StepBack className="w-5 h-5 text-gray-600" />
        </button>

        {isPlaying ? (
          <button
            onClick={handlePause}
            className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700"
            title="Pause"
          >
            <Pause className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            disabled={currentStep >= steps.length - 1}
            className="p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
            title="Play"
          >
            <Play className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={handleStepForward}
          disabled={currentStep >= steps.length - 1}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          title="Step Forward"
        >
          <StepForward className="w-5 h-5 text-gray-600" />
        </button>

        <div className="ml-4 text-sm text-gray-600">
          Step: <span className="font-mono font-bold">{currentStep + 1}/{steps.length}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-500">Speed:</span>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={2200 - speed}
            onChange={(e) => setSpeed(2200 - Number(e.target.value))}
            className="w-20 accent-primary-600"
          />
        </div>
      </div>

      {/* Current step description */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            currentStepData.action === 'error' ? 'bg-red-100 text-red-700' :
            currentStepData.action === 'return' ? 'bg-green-100 text-green-700' :
            currentStepData.action === 'swap' ? 'bg-orange-100 text-orange-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {currentStepData.action || 'step'}
          </span>
          <span className="text-gray-700">{currentStepData.description}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Code view */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Code</h3>
          <CodeWithBreakpoints
            code={code}
            currentLine={currentStepData.line}
            breakpoints={breakpoints}
            onToggleBreakpoint={handleToggleBreakpoint}
          />
        </div>

        {/* Variables and Call Stack */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Variables</h3>
            <VariableWatch 
              variables={currentStepData.variables} 
              changedVar={currentStepData.changedVar}
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Call Stack</h3>
            <CallStack callStack={currentStepData.callStack} />
          </div>
        </div>
      </div>
    </div>
  );
}
