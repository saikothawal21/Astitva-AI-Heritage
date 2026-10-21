import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex flex-col items-center text-center animate-fade-in">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Something went wrong</h3>
      <p className="text-red-600 dark:text-red-400 mb-6">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-heritage-600 hover:bg-heritage-700 text-white rounded-xl font-medium transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
