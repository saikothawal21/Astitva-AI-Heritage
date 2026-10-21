import React from 'react';
import { BookOpen, Feather, Brain, ScanEye, Map, GitCompareArrows, Sparkles } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import ThemeToggle from '../components/ThemeToggle';

export default function AIStudioPage() {
  const features = [
    {
      icon: BookOpen,
      title: 'AI Historian',
      description: 'Discover detailed historical information about any heritage place with AI-powered research.',
      to: '/historian',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      icon: Feather,
      title: 'AI Story Generator',
      description: 'Generate captivating historical stories set in heritage locations around the world.',
      to: '/story',
      gradient: 'from-rose-400 to-pink-500'
    },
    {
      icon: Brain,
      title: 'AI Quiz Generator',
      description: 'Test your heritage knowledge with AI-generated quizzes tailored to your interests.',
      to: '/quiz',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: ScanEye,
      title: 'Heritage Image Analyzer',
      description: 'Upload an image and let AI identify heritage elements, architecture, and history.',
      to: '/image-analyzer',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      icon: Map,
      title: 'AI Trip Planner',
      description: 'Plan your perfect heritage trip with AI-crafted day-by-day itineraries.',
      to: '/trip-planner',
      gradient: 'from-violet-400 to-purple-500'
    },
    {
      icon: GitCompareArrows,
      title: 'Heritage Comparator',
      description: 'Compare two heritage sites side by side across history, architecture, and culture.',
      to: '/comparator',
      gradient: 'from-cyan-400 to-blue-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-heritage-600 via-heritage-700 to-heritage-900 rounded-b-3xl py-16 md:py-24 overflow-hidden">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-heritage-400 opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 text-heritage-200">
            <Sparkles size={48} className="animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            ASTITVA - AI Heritage Guide
          </h1>
          <p className="text-lg md:text-xl text-heritage-200 max-w-2xl mx-auto font-medium">
            Explore history, stories and heritage with the power of AI.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={feature.title} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-heritage-400 dark:text-stone-500 text-sm font-medium">
        <p>Powered by AI &bull; Built for Heritage Enthusiasts</p>
      </footer>
    </div>
  );
}
