import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shuffle, Search } from 'lucide-react';
import ArrayVisualizer from '../components/Visualizer/ArrayVisualizer';
import VisualizerControls from '../components/Visualizer/VisualizerControls';
import PseudocodePanel from '../components/Visualizer/PseudocodePanel';
import VariablesPanel from '../components/Visualizer/VariablesPanel';
import { getAlgorithm, generateRandomArray } from '../components/Visualizer/algorithms';

export default function VisualizerPage() {
  const { algorithmId } = useParams();
  const algorithm = getAlgorithm(algorithmId);

  const [array, setArray] = useState(() => generateRandomArray(8));
  const [target, setTarget] = useState(25); // For search algorithms
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const [customInput, setCustomInput] = useState('');

  const intervalRef = useRef(null);

  // Generate steps when array or target changes
  useEffect(() => {
    if (!algorithm) return;

    let newSteps;
    if (algorithm.type === 'searching') {
      newSteps = algorithm.generateSteps(array, target);
    } else {
      newSteps = algorithm.generateSteps(array);
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [array, target, algorithm]);

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      intervalRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

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
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleStepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  const handleRandomize = useCallback(() => {
    setArray(generateRandomArray(8));
  }, []);

  const handleCustomInput = useCallback(() => {
    const numbers = customInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);

    if (numbers.length >= 2 && numbers.length <= 12) {
      setArray(numbers);
      setCustomInput('');
    }
  }, [customInput]);

  if (!algorithm) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Algorithm Not Found
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

  const currentStepData = steps[currentStep] || {};

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {algorithm.name} Visualization
        </h1>
        <p className="text-xl text-gray-500 fa">{algorithm.nameFa}</p>
      </div>

      {/* Input controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={handleRandomize}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            Random Array
          </button>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g., 5, 2, 8, 1, 9"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-48"
            />
            <button
              onClick={handleCustomInput}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              Set Array
            </button>
          </div>

          {algorithm.type === 'searching' && (
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-20"
                min="1"
                max="100"
              />
              <span className="text-sm text-gray-500">Target</span>
            </div>
          )}

          <div className="ml-auto text-sm text-gray-500">
            Array: [{array.join(', ')}]
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main visualization */}
        <div className="lg:col-span-2 space-y-4">
          <ArrayVisualizer step={currentStepData} />
          
          <VisualizerControls
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            currentStep={currentStep}
            totalSteps={steps.length}
            speed={speed}
            onSpeedChange={setSpeed}
            disabled={steps.length === 0}
          />

          <VariablesPanel
            variables={currentStepData.variables}
            description={currentStepData.description}
            descriptionFa={currentStepData.descriptionFa}
          />
        </div>

        {/* Pseudocode panel */}
        <div>
          <PseudocodePanel
            pseudocode={algorithm.pseudocode}
            currentLine={currentStepData.currentLine}
          />

          {/* Legend */}
          <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-sm text-gray-500 mb-3">Legend</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded" />
                <span>Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span>Swapping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span>Sorted / Found</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded" />
                <span>Mid (Search)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded" />
                <span>Minimum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
