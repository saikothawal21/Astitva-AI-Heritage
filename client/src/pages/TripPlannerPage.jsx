import React, { useState } from 'react';
import { Map, Loader2, Landmark, Utensils, Lightbulb, Info, ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ErrorState from '../components/ErrorState';
import AIResultCard from '../components/AIResultCard';
import ActionButtons from '../components/ActionButtons';
import { generateTrip } from '../services/aiService';
import { useAIGenerate } from '../hooks/useAIGenerate';
import { resultToText } from '../utils/formatters';
import { copyToClipboard } from '../utils/clipboard';

const BUDGETS = ['Budget', 'Moderate', 'Luxury', 'No Preference'];
const TRANSPORTATION = ['Public Transport', 'Car/Rental', 'Walking', 'Mixed'];
const TRAVEL_TYPES = ['Solo', 'Couple', 'Family', 'Friends'];

export default function TripPlannerPage() {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('Moderate');
  const [transportation, setTransportation] = useState('Mixed');
  const [interests, setInterests] = useState('');
  const [travelType, setTravelType] = useState('Family');

  const { result, loading, error, generate, reset } = useAIGenerate();
  
  const [expandedDays, setExpandedDays] = useState({});

  const toggleDay = (dayIndex) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayIndex]: prev[dayIndex] !== undefined ? !prev[dayIndex] : false
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destination) {
      setExpandedDays({});
      generate(generateTrip, { startLocation, destination, days: parseInt(days), budget, transportation, interests, travelType });
    }
  };

  const handleCopy = () => {
    if (result) copyToClipboard(resultToText(result));
  };

  const isFormValid = destination.trim() !== '';

  return (
    <PageLayout title="Heritage Trip Planner" description="Plan your perfect historical journey with AI." icon={<Map className="w-6 h-6 text-heritage-600" />}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6 sticky top-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Destination / Region</label>
                <input 
                  type="text" value={destination} onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Rajasthan, India"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Starting Location (Optional)</label>
                <input 
                  type="text" value={startLocation} onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="e.g. New Delhi"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Days</label>
                  <input 
                    type="number" min={1} max={30} value={days} onChange={(e) => setDays(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Travel Type</label>
                  <select value={travelType} onChange={(e) => setTravelType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                    {TRAVEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Budget</label>
                <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Transportation</label>
                <select value={transportation} onChange={(e) => setTransportation(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
                  {TRANSPORTATION.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Specific Interests</label>
                <input 
                  type="text" value={interests} onChange={(e) => setInterests(e.target.value)}
                  placeholder="temples, forts, museums, local food..."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
                />
              </div>
              <button type="submit" disabled={!isFormValid || loading} className="w-full flex items-center justify-center gap-2 py-3 bg-heritage-600 hover:bg-heritage-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Plan Itinerary'}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          {error && <ErrorState message={error} onRetry={() => generate(generateTrip, { startLocation, destination, days: parseInt(days), budget, transportation, interests, travelType })} />}
          
          {!result && !error && !loading && (
            <div className="h-full flex items-center justify-center text-stone-400 dark:text-stone-500 p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-800 min-h-[500px]">
              <p>Your personalized heritage itinerary will be mapped out here.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex items-center justify-center p-12 border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/50 min-h-[500px]">
              <div className="flex flex-col items-center text-heritage-600">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-medium animate-pulse">Mapping out history...</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="animate-fade-in animate-slide-up space-y-4">
              <AIResultCard title={result.title || `Trip to ${destination}`}>
                {result.overview && <p className="text-stone-600 dark:text-stone-300 mb-8 text-lg">{result.overview}</p>}
                
                {result.itinerary && result.itinerary.length > 0 && (
                  <div className="mb-8 space-y-4">
                    <h3 className="font-bold text-stone-800 dark:text-stone-100 text-xl mb-4 border-b border-stone-200 dark:border-stone-700 pb-2">Day-by-Day Itinerary</h3>
                    {result.itinerary.map((day, dIdx) => {
                      const isExpanded = expandedDays[dIdx] !== false; // Default true
                      return (
                        <div key={dIdx} className="border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden bg-white dark:bg-stone-900">
                          <button 
                            onClick={() => toggleDay(dIdx)}
                            className="w-full flex justify-between items-center p-4 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 transition"
                          >
                            <span className="font-semibold text-stone-800 dark:text-stone-100">Day {day.day}: {day.title}</span>
                            {isExpanded ? <ChevronUp className="w-5 h-5 text-stone-500 dark:text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-500 dark:text-stone-400" />}
                          </button>
                          
                          {isExpanded && (
                            <div className="p-4 space-y-4">
                              {day.activities.map((act, aIdx) => (
                                <div key={aIdx} className="pb-4 border-b border-stone-100 dark:border-stone-800 last:border-0 last:pb-0">
                                  <div className="flex items-start gap-3 mb-1">
                                    <span className="bg-heritage-100 dark:bg-heritage-900/40 text-heritage-700 dark:text-heritage-300 rounded px-2 py-0.5 text-sm font-mono mt-0.5 whitespace-nowrap">
                                      {act.time}
                                    </span>
                                    <div>
                                      <h4 className="font-bold text-stone-800 dark:text-stone-100">{act.activity}</h4>
                                      <p className="text-stone-600 dark:text-stone-300 text-sm mt-1">{act.description}</p>
                                      {act.historicalHighlight && (
                                        <div className="mt-2 flex gap-1.5 items-start text-heritage-600">
                                          <Landmark className="w-4 h-4 shrink-0 mt-0.5" />
                                          <span className="italic text-sm">{act.historicalHighlight}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {result.foodSuggestions && result.foodSuggestions.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-amber-600" /> Local Cuisine
                    </h3>
                    <ul className="space-y-2 text-stone-700 dark:text-stone-200">
                      {result.foodSuggestions.map((food, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-amber-500">•</span> {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.budgetBreakdown && (
                  <div className="mb-8 bg-stone-50 dark:bg-stone-800 rounded-xl p-6 border border-stone-100 dark:border-stone-800">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-4">Estimated Budget</h3>
                    <div className="space-y-2">
                      {Object.entries(result.budgetBreakdown).map(([category, amount], idx) => {
                        const isTotal = category.toLowerCase() === 'total';
                        return (
                          <div key={idx} className={`flex justify-between py-2 ${isTotal ? 'border-t-2 border-stone-200 dark:border-stone-700 mt-2 pt-3 font-bold text-heritage-800 dark:text-heritage-200' : 'text-stone-600 dark:text-stone-300 border-b border-stone-100 dark:border-stone-800 last:border-0'}`}>
                            <span className="capitalize">{category}</span>
                            <span>{amount}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.travelTips && result.travelTips.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" /> Travel Tips
                      </h3>
                      <ol className="list-decimal list-inside space-y-1.5 text-stone-600 dark:text-stone-300 text-sm">
                        {result.travelTips.map((tip, idx) => <li key={idx}>{tip}</li>)}
                      </ol>
                    </div>
                  )}
                  {result.practicalNotes && result.practicalNotes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-500" /> Practical Notes
                      </h3>
                      <ul className="space-y-1.5 text-stone-600 dark:text-stone-300 text-sm">
                        {result.practicalNotes.map((note, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-stone-400 dark:text-stone-500">•</span> {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AIResultCard>
              <ActionButtons 
                onRegenerate={() => generate(generateTrip, { startLocation, destination, days: parseInt(days), budget, transportation, interests, travelType })}
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
