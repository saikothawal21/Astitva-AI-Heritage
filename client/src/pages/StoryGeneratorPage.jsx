import React, { useState } from 'react';
import { Feather, Loader2, AlertTriangle } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ErrorState from '../components/ErrorState';
import AIResultCard from '../components/AIResultCard';
import ActionButtons from '../components/ActionButtons';
import { generateStory } from '../services/aiService';
import { useAIGenerate } from '../hooks/useAIGenerate';
import { resultToText } from '../utils/formatters';
import { copyToClipboard } from '../utils/clipboard';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Italian'];
const DURATIONS = ['Short', 'Medium', 'Long'];
const AUDIENCES = ['Children', 'Teens', 'Adults', 'All Ages'];
const STYLES = ['Dramatic', 'Mysterious', 'Romantic', 'Adventure', 'Educational'];

export default function StoryGeneratorPage() {
  const [place, setPlace] = useState('');
  const [duration, setDuration] = useState('Medium');
  const [audience, setAudience] = useState('All Ages');
  const [language, setLanguage] = useState('English');
  const [style, setStyle] = useState('Educational');
  
  const { result, loading, error, generate, reset } = useAIGenerate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (place) {
      generate(generateStory, { place, duration, audience, language, style });
    }
  };

  const handleCopy = () => {
    if (result) {
      copyToClipboard(resultToText(result));
    }
  };

  const isFormValid = place.trim() !== '';

  return (
    <PageLayout title="Story Generator" description="Weave historical facts into engaging stories." icon={<Feather className="w-6 h-6 text-heritage-600" />}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Heritage Place</label>
                <input 
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g. Colosseum"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Story Duration</label>
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Audience</label>
                <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Story Style</label>
                <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button type="submit" disabled={!isFormValid || loading} className="w-full flex items-center justify-center gap-2 py-3 bg-heritage-600 hover:bg-heritage-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Story'}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          {error && <ErrorState message={error} onRetry={() => generate(generateStory, { place, duration, audience, language, style })} />}
          {!result && !error && !loading && (
            <div className="h-full flex items-center justify-center text-stone-400 dark:text-stone-500 p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-800">
              <p>Your tale awaits...</p>
            </div>
          )}
          {loading && (
            <div className="h-full flex items-center justify-center p-12 border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/50">
              <div className="flex flex-col items-center text-heritage-600">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-medium animate-pulse">Writing your story...</p>
              </div>
            </div>
          )}
          {result && !loading && (
            <div className="animate-fade-in animate-slide-up space-y-4">
              <AIResultCard title={result.title || `A Story of ${place}`}>
                
                {result.characters && result.characters.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 text-sm uppercase tracking-wider">Key Characters</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.characters.map((char, idx) => (
                        <span key={idx} className="bg-heritage-100 dark:bg-heritage-900/40 text-heritage-800 dark:text-heritage-200 rounded-full px-3 py-1 text-sm">{char}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-200 whitespace-pre-line mb-8 font-serif leading-loose">
                  {result.content || result.story}
                </div>
                
                {result.keyEvents && result.keyEvents.length > 0 && (
                  <div className="mb-6 border-t border-stone-100 dark:border-stone-800 pt-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 text-lg">Key Historical Events</h3>
                    <ol className="list-decimal list-inside space-y-2 text-stone-700 dark:text-stone-200">
                      {result.keyEvents.map((evt, idx) => (
                        <li key={idx}>{evt}</li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {result.historicalDisclaimer && (
                  <div className="mt-8 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p>{result.historicalDisclaimer}</p>
                  </div>
                )}
              </AIResultCard>
              <ActionButtons 
                onRegenerate={() => generate(generateStory, { place, duration, audience, language, style })}
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
