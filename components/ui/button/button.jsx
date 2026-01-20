import { cn } from '@/lib/utils';
import Spinner from '../spinner';

export default function Button({
  text,
  type = 'button',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium',
        'hover:bg-blue-700 transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {isLoading ? <Spinner /> : children || text}
    </button>
  );
}
