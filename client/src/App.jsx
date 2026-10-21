import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AIStudioPage from './pages/AIStudioPage';
import HistorianPage from './pages/HistorianPage';
import StoryGeneratorPage from './pages/StoryGeneratorPage';
import QuizGeneratorPage from './pages/QuizGeneratorPage';
import ImageAnalyzerPage from './pages/ImageAnalyzerPage';
import TripPlannerPage from './pages/TripPlannerPage';
import ComparatorPage from './pages/ComparatorPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AIStudioPage />} />
      <Route path="/historian" element={<HistorianPage />} />
      <Route path="/story" element={<StoryGeneratorPage />} />
      <Route path="/quiz" element={<QuizGeneratorPage />} />
      <Route path="/image-analyzer" element={<ImageAnalyzerPage />} />
      <Route path="/trip-planner" element={<TripPlannerPage />} />
      <Route path="/comparator" element={<ComparatorPage />} />
    </Routes>
  );
}
