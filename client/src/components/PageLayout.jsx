import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function PageLayout({ title, description, icon, children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center text-heritage-600 hover:text-heritage-700 font-medium transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to ASTITVA
        </Link>
        <ThemeToggle />
      </div>
      
      <div className="flex items-center mb-10">
        <div className="bg-heritage-50 dark:bg-heritage-900/30 w-16 h-16 rounded-full flex items-center justify-center mr-6 text-heritage-600 shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">{title}</h1>
          <p className="text-stone-500 dark:text-stone-400 text-lg">{description}</p>
        </div>
      </div>
      
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
}
