import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ icon: Icon, title, description, to, gradient }) {
  return (
    <Link 
      to={to} 
      className="group block bg-white dark:bg-stone-900 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
      <div className="p-6">
        <div className="bg-heritage-50 dark:bg-heritage-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-heritage-600">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-2 group-hover:text-heritage-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 line-clamp-2">
          {description}
        </p>
        <div className="text-sm font-medium text-heritage-600 flex items-center">
          Try Now <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
