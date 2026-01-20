import { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

export default function MobileCodeEditor({ 
  code, 
  onChange, 
  onReset, 
  onCopy,
  starterCode,
  language = 'javascript'
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy?.(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-200">Code Editor</span>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Mobile Textarea Editor */}
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        style={{
          minHeight: '300px',
          fontFamily: 'Fira Code, Courier New, monospace',
          lineHeight: '1.5',
          tabSize: 2
        }}
        spellCheck="false"
      />
    </div>
  );
}
