import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface ToastProps {
  message: string;
  variant?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const variantStyles = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-rose-600 text-white',
  info: 'bg-slate-900 text-white',
};

export function Toast({ message, variant = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="fixed right-6 top-6 z-50">
      <div className={twMerge('max-w-xs rounded-2xl px-4 py-3 shadow-lg', variantStyles[variant])}>
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm leading-6">{message}</p>
          <button type="button" onClick={onClose} className="text-sm font-bold opacity-80 hover:opacity-100">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
