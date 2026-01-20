import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

export default function VisualizerControls({
  isPlaying,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  disabled,
}) {
  const canStepBack = currentStep > 0;
  const canStepForward = currentStep < totalSteps - 1;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
      {/* Main controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          disabled={disabled}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={onStepBackward}
          disabled={disabled || !canStepBack}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Step Backward"
        >
          <SkipBack className="w-5 h-5 text-gray-600" />
        </button>

        {isPlaying ? (
          <button
            onClick={onPause}
            disabled={disabled}
            className="p-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
            title="Pause"
          >
            <Pause className="w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={disabled || !canStepForward}
            className="p-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
            title="Play"
          >
            <Play className="w-6 h-6" />
          </button>
        )}

        <button
          onClick={onStepForward}
          disabled={disabled || !canStepForward}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Step Forward"
        >
          <SkipForward className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Step:</span>
        <span className="font-mono font-bold">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      {/* Speed control */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-gray-600">Speed:</span>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={2100 - speed}
          onChange={(e) => onSpeedChange(2100 - Number(e.target.value))}
          className="w-24 accent-primary-600"
        />
        <span className="text-xs text-gray-500 w-16">
          {speed < 500 ? 'Fast' : speed < 1000 ? 'Normal' : 'Slow'}
        </span>
      </div>
    </div>
  );
}
