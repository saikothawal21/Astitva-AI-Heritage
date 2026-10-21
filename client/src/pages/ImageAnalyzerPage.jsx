import React, { useState } from 'react';
import { ScanEye, Loader2, Shield } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ErrorState from '../components/ErrorState';
import AIResultCard from '../components/AIResultCard';
import ActionButtons from '../components/ActionButtons';
import ImageUploader from '../components/ImageUploader';
import { analyzeImage } from '../services/aiService';
import { useAIGenerate } from '../hooks/useAIGenerate';
import { copyToClipboard } from '../utils/clipboard';

export default function ImageAnalyzerPage() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const { result, loading, error, generate, reset } = useAIGenerate();

  const handleImageSelect = (file, previewUrl) => {
    setImageFile(file);
    setPreview(previewUrl);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview(null);
    reset();
  };

  const handleAnalyze = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      generate(analyzeImage, formData);
    }
  };

  const handleClear = () => {
    handleRemoveImage();
  };

  return (
    <PageLayout title="Visual Heritage Analyzer" description="Upload a photo of a monument or artifact to learn about its history." icon={<ScanEye className="w-6 h-6 text-heritage-600" />}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6 flex flex-col h-full">
            <ImageUploader 
              image={imageFile} 
              preview={preview} 
              onImageSelect={handleImageSelect} 
              onRemove={handleRemoveImage} 
            />
            <button 
              onClick={handleAnalyze} 
              disabled={!imageFile || loading} 
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-heritage-600 hover:bg-heritage-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze Image'}
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          {error && <ErrorState message={error} onRetry={handleAnalyze} />}
          
          {!result && !error && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 dark:text-stone-500 p-12 border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl bg-stone-50 dark:bg-stone-800 min-h-[400px]">
              <ScanEye className="w-16 h-16 text-stone-300 dark:text-stone-600 mb-4" />
              <p className="text-lg">Upload a heritage image to analyze</p>
            </div>
          )}
          
          {loading && (
            <div className="h-full flex items-center justify-center p-12 border border-stone-200 dark:border-stone-700 rounded-2xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/50 min-h-[400px]">
              <div className="flex flex-col items-center text-heritage-600">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-medium animate-pulse">Analyzing visual features...</p>
              </div>
            </div>
          )}
          
          {result && !loading && (
            <div className="animate-fade-in animate-slide-up space-y-4">
              <AIResultCard title={result.identification || 'Analysis Result'}>
                
                {result.confidence && (
                  <div className="mb-6 flex">
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                      result.confidence.toLowerCase() === 'high' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200' :
                      result.confidence.toLowerCase() === 'medium' ? 'bg-amber-100 text-amber-800 dark:text-amber-200' :
                      'bg-red-100 text-red-800 dark:text-red-200'
                    }`}>
                      {result.confidence} Confidence
                    </span>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {result.architecturalStyle && (
                    <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-100 dark:border-stone-800">
                      <span className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Architectural Style</span>
                      <span className="text-stone-800 dark:text-stone-100 font-medium">{result.architecturalStyle}</span>
                    </div>
                  )}
                  {result.estimatedPeriod && (
                    <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-100 dark:border-stone-800">
                      <span className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Estimated Period</span>
                      <span className="text-stone-800 dark:text-stone-100 font-medium">{result.estimatedPeriod}</span>
                    </div>
                  )}
                  {result.possibleLocation && (
                    <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-100 dark:border-stone-800 md:col-span-2">
                      <span className="block text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">Possible Location</span>
                      <span className="text-stone-800 dark:text-stone-100 font-medium">{result.possibleLocation}</span>
                    </div>
                  )}
                </div>

                {result.historicalContext && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-2">Historical Context</h3>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{result.historicalContext}</p>
                  </div>
                )}

                {result.visibleElements && result.visibleElements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 mb-3 text-sm uppercase tracking-wider">Visible Elements</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.visibleElements.map((el, idx) => (
                        <span key={idx} className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 rounded-full px-3 py-1 text-sm">{el}</span>
                      ))}
                    </div>
                  </div>
                )}

                {result.historicalClues && result.historicalClues.length > 0 && (
                  <div className="mb-8 bg-blue-50 dark:bg-blue-950 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                      <ScanEye className="w-5 h-5" /> Detailed Observations
                    </h3>
                    <ul className="space-y-2">
                      {result.historicalClues.map((clue, idx) => (
                        <li key={idx} className="flex gap-3 text-blue-800 dark:text-blue-200 text-sm">
                          <span className="mt-1">•</span>
                          <span>{clue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
                  <Shield className="w-5 h-5 shrink-0" />
                  <p>{result.disclaimer || "AI analysis of images can be inaccurate. This is an educational estimation based on visual features and should not replace expert historical authentication."}</p>
                </div>
              </AIResultCard>
              
              <ActionButtons 
                onRegenerate={handleAnalyze}
                onCopy={() => { if (result) copyToClipboard(JSON.stringify(result, null, 2)); }}
                onClear={handleClear}
                loading={loading}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
