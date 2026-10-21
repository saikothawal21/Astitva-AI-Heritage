import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({ message = 'AI is generating your response...' }) {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-8 flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="w-10 h-10 text-heritage-500 animate-spin mb-6" />
      
      <div className="w-full max-w-md space-y-4">
        <div className="h-4 skeleton w-[75%] mx-auto" />
        <div className="h-4 skeleton w-full mx-auto" />
        <div className="h-4 skeleton w-[60%] mx-auto" />
        <div className="h-4 skeleton w-[90%] mx-auto" />
        <div className="h-4 skeleton w-[45%] mx-auto" />
      </div>
      
      <p className="mt-8 text-stone-500 dark:text-stone-400 font-medium text-center animate-pulse-slow">
        {message}
      </p>
    </div>
  );
}
