import React, { useState } from 'react';
import { GitCompareArrows, Loader2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ErrorState from '../components/ErrorState';
import AIResultCard from '../components/AIResultCard';
import ActionButtons from '../components/ActionButtons';
import { compareHeritage } from '../services/aiService';
import { useAIGenerate } from '../hooks/useAIGenerate';
import { resultToText } from '../utils/formatters';
import { copyToClipboard } from '../utils/clipboard';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Italian'];

export default function ComparatorPage() {
  const [placeA, setPlaceA] = useState('');
  const [placeB, setPlaceB] = useState('');
  const [language, setLanguage] = useState('English');
  
  const { result, loading, error, generate, reset } = useAIGenerate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (placeA && placeB) {
      generate(compareHeritage, { placeA, placeB, language });
    }
  };

  const handleCopy = () => {
    if (result) copyToClipboard(resultToText(result));
  };

  const isFormValid = placeA.trim() !== '' && placeB.trim() !== '';

  return (
    <PageLayout title="Heritage Comparator" description="Compare two historical sites to understand their connections and contrasts." icon={<GitCompareArrows className="w-6 h-6 text-heritage-600" />}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6 sticky top-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Heritage Place A</label>
                <input 
                  type="text" value={placeA} onChange={(e) => setPlaceA(e.target.value)}
                  placeholder="e.g. Machu Picchu"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div className="flex justify-center -my-2 relative z-10">
                <span className="bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-full p-2 border-2 border-white dark:border-stone-900 shadow-sm dark:shadow-stone-950/50">
                  <GitCompareArrows className="w-4 h-4" />
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Heritage Place B</label>
                <input 
                  type="text" value={placeB} onChange={(e) => setPlaceB(e.target.value)}
                  placeholder="e.g. Chichen Itza"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              <button type="submit" disabled={!isFormValid || loading} className="w-full flex items-center justify-center gap-2 py-3 bg-heritage-600 hover:bg-heritage-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Compare'}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          {error && <ErrorState message={error} onRetry={() => generate(compareHeritage, { placeA, placeB, language })} />}
          
          {!result && !error && !loading && (
            <div className="h-full flex items-center justify-center text-stone-400 dark:text-stone-500 p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-800 min-h-[400px]">
              <p>Compare two heritage sites to see their differences and similarities.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center p-12 border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/50 min-h-[400px]">
              <div className="flex flex-col items-center text-heritage-600">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-medium animate-pulse">Analyzing cross-cultural connections...</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="animate-fade-in animate-slide-up space-y-4">
              <AIResultCard title={`${result.placeA?.name || placeA} vs ${result.placeB?.name || placeB}`}>
                
                <div className="flex items-center justify-center gap-4 mb-8 text-center sticky top-0 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm py-4 z-10 border-b border-stone-100 dark:border-stone-800 -mt-2">
                  <div className="flex-1">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-bold px-4 py-2 rounded-xl w-full max-w-[200px] truncate">
                      {result.placeA?.name || placeA}
                    </span>
                  </div>
                  <span className="bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm dark:shadow-stone-950/50 shrink-0">VS</span>
                  <div className="flex-1">
                    <span className="inline-block bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 font-bold px-4 py-2 rounded-xl w-full max-w-[200px] truncate">
                      {result.placeB?.name || placeB}
                    </span>
                  </div>
                </div>

                {result.comparison && Object.entries(result.comparison).map(([category, data], idx) => {
                  const formatCategory = (cat) => cat.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={idx} className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden mb-6">
                      <div className="font-semibold text-heritage-700 dark:text-heritage-300 bg-heritage-50 dark:bg-heritage-900/30 px-4 py-3 text-center border-b border-stone-200 dark:border-stone-700">
                        {formatCategory(category)}
                      </div>
                      <div className="flex flex-col lg:flex-row divide-y divide-stone-200 dark:divide-stone-700 lg:divide-y-0 lg:divide-x">
                        <div className="flex-1 p-5 bg-blue-50/20 dark:bg-blue-950/20">
                          <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide opacity-70 lg:hidden">{result.placeA?.name || placeA}</span>
                          <p className="text-stone-700 dark:text-stone-200 text-sm leading-relaxed">{data.placeA}</p>
                        </div>
                        <div className="flex-1 p-5 bg-emerald-50/20 dark:bg-emerald-950/20">
                          <span className="block text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2 uppercase tracking-wide opacity-70 lg:hidden">{result.placeB?.name || placeB}</span>
                          <p className="text-stone-700 dark:text-stone-200 text-sm leading-relaxed">{data.placeB}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </AIResultCard>
              <ActionButtons 
                onRegenerate={() => generate(compareHeritage, { placeA, placeB, language })}
                onCopy={handleCopy}
                onClear={reset}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
