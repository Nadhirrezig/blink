'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Menu page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#1D1721] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={32} className="text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] bg-clip-text text-transparent">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-400 mb-6">
          We couldn't load the menu items. This might be a temporary issue. Please try again.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-[#EEA4CE] to-[#BBEED1] text-[#1D1721] py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#F7F8FB] text-[#1D1721] py-2 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Refresh Page
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
              Error Details (Development)
            </summary>
            <pre className="mt-2 text-xs text-gray-600 bg-[#F7F8FB] p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
} 