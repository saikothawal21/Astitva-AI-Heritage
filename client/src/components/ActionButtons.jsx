import React from 'react';
import { RefreshCw, Copy, Trash2 } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';

export default function ActionButtons({ onRegenerate, onCopy, onClear, loading }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={onRegenerate}
        disabled={loading}
        className="flex items-center px-4 py-2 bg-heritage-600 hover:bg-heritage-700 disabled:bg-heritage-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors text-sm"
      >
        <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
        Regenerate
      </button>
      
      <button
        onClick={onCopy}
        className="flex items-center px-4 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 rounded-xl font-medium transition-colors text-sm"
      >
        <Copy size={16} className="mr-2" />
        Copy Text
      </button>

      <button
        onClick={onClear}
        className="flex items-center px-4 py-2 bg-stone-200 dark:bg-stone-700 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 dark:hover:text-red-400 text-stone-700 dark:text-stone-200 rounded-xl font-medium transition-colors text-sm ml-auto"
      >
        <Trash2 size={16} className="mr-2" />
        Clear
      </button>
    </div>
  );
}
