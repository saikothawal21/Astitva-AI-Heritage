import React, { useState } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ErrorState from '../components/ErrorState';
import AIResultCard from '../components/AIResultCard';
import ActionButtons from '../components/ActionButtons';
import { generateHistorian } from '../services/aiService';
import { useAIGenerate } from '../hooks/useAIGenerate';
import { resultToText } from '../utils/formatters';
import { copyToClipboard } from '../utils/clipboard';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Italian'];
const MODES = ['Quick Facts', 'Simple', 'Detailed', 'Story', 'Kids', 'Academic', 'Research'];

export default function HistorianPage() {
  const [place, setPlace] = useState('');
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('English');
  const [mode, setMode] = useState('Quick Facts');
  
  const { result, loading, error, generate, reset } = useAIGenerate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (place && topic) {
      generate(generateHistorian, { place, topic, language, mode });
    }
  };

  const handleCopy = () => {
    if (result) {
      copyToClipboard(resultToText(result));
    }
  };

  const isFormValid = place.trim() !== '' && topic.trim() !== '';

  return (
    <PageLayout title="AI Historian" description="Ask the AI Historian about any heritage site or historical topic." icon={<BookOpen className="w-6 h-6 text-heritage-600" />}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Column */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Heritage Place</label>
                <input 
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g. Taj Mahal"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Topic/Question</label>
                <input 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Architecture details"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                >
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Information Mode</label>
                <select 
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                >
                  {MODES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-heritage-600 hover:bg-heritage-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ask Historian'}
              </button>
            </form>
          </div>
        </div>

        {/* Result Column */}
        <div className="w-full lg:w-2/3">
          {error && <ErrorState message={error} onRetry={() => generate(generateHistorian, { place, topic, language, mode })} />}
          {!result && !error && !loading && (
            <div className="h-full flex items-center justify-center text-stone-400 dark:text-stone-500 p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-800">
              <p>Your historian's response will appear here.</p>
            </div>
          )}
          
          {loading && (
            <div className="h-full flex items-center justify-center p-12 border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/50">
              <div className="flex flex-col items-center text-heritage-600">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-medium animate-pulse">Consulting the archives...</p>
              </div>
            </div>
          )}
          
          {result && !loading && (
            <div className="animate-fade-in animate-slide-up space-y-4">
              <AIResultCard title={result.title || `${topic} of ${place}`}>
                {result.summary && (
                  <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">{result.summary}</p>
                )}
                
                {result.facts && result.facts.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 text-lg">Key Facts</h3>
                    <ul className="space-y-2">
                      {result.facts.map((fact, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-amber-500 mt-1.5 text-xs">●</span>
                          <span className="text-stone-700 dark:text-stone-200">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.historicalSignificance && (
                  <div className="mb-6 bg-heritage-50 dark:bg-heritage-900/30 border-l-4 border-heritage-500 p-4 rounded-r-xl">
                    <h3 className="font-semibold text-heritage-900 dark:text-heritage-100 mb-2">Historical Significance</h3>
                    <p className="text-heritage-800 dark:text-heritage-200 text-sm leading-relaxed">{result.historicalSignificance}</p>
                  </div>
                )}
                
                {result.timeline && result.timeline.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-4 text-lg">Timeline</h3>
                    <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-200 dark:before:via-stone-700 before:to-transparent">
                      {result.timeline.map((item, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-2">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white dark:border-stone-900 bg-heritage-400 text-slate-500 group-[.is-active]:bg-heritage-600 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ml-[-0.5rem] md:ml-0">
                          </div>
                          <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 py-2">
                            <span className="font-bold text-heritage-600 block mb-1">{item.year}</span>
                            <span className="text-stone-700 dark:text-stone-200 text-sm">{item.event}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {result.sources && result.sources.length > 0 && (
                  <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800">
                    <h4 className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-2">Sources / References</h4>
                    <ul className="text-sm text-stone-400 dark:text-stone-500 space-y-1">
                      {result.sources.map((source, idx) => (
                        <li key={idx}>- {source}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </AIResultCard>
              <ActionButtons 
                onRegenerate={() => generate(generateHistorian, { place, topic, language, mode })}
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
