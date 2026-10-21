import React, { useState, useEffect } from 'react';
import { Brain, Loader2, Check, X } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import ErrorState from '../components/ErrorState';
import { generateQuiz } from '../services/aiService';
import { useAIGenerate } from '../hooks/useAIGenerate';

const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese', 'Italian'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function QuizGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [language, setLanguage] = useState('English');
  
  const { result, loading, error, generate, reset } = useAIGenerate();

  const [quizState, setQuizState] = useState('form'); // form, quiz, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (result && result.questions) {
      setQuizState('quiz');
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setSubmitted(false);
    }
  }, [result]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (topic) {
      generate(generateQuiz, { topic, difficulty, numQuestions: parseInt(numQuestions), language });
    }
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    setQuizState('results');
  };

  const handleNewQuiz = () => {
    reset();
    setQuizState('form');
  };

  const isFormValid = topic.trim() !== '';

  const calculateScore = () => {
    if (!result || !result.questions) return 0;
    let score = 0;
    result.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const renderForm = () => (
    <div className="max-w-xl mx-auto w-full bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6">
      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Heritage Place / Topic</label>
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Ancient Egypt"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Difficulty</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Number of Questions</label>
          <input 
            type="number"
            min={3}
            max={20}
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 dark:text-stone-200 mb-1.5">Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-heritage-500 focus:border-transparent transition">
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>
        </div>
        <button type="submit" disabled={!isFormValid || loading} className="w-full flex items-center justify-center gap-2 py-3 bg-heritage-600 hover:bg-heritage-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed mt-2">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Quiz'}
        </button>
      </form>
    </div>
  );

  const renderQuiz = () => {
    if (!result || !result.questions) return null;
    const q = result.questions[currentQuestion];
    const totalQ = result.questions.length;
    
    return (
      <div className="max-w-2xl mx-auto w-full">
        {quizState === 'results' && renderResults()}
        
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm dark:shadow-stone-950/50 border border-stone-100 dark:border-stone-800 p-6 md:p-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Question {currentQuestion + 1} of {totalQ}</span>
            <div className="w-32 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-heritage-500 transition-all duration-300" style={{ width: `${((currentQuestion + 1) / totalQ) * 100}%` }} />
            </div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold text-stone-800 dark:text-stone-100 mb-6">{q.question}</h2>
          
          <div className="space-y-3 mb-8">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQuestion] === idx;
              const isCorrect = idx === q.correctAnswer;
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ";
              
              if (!submitted) {
                if (isSelected) {
                  btnClass += "bg-heritage-50 dark:bg-heritage-900/30 border-heritage-500 ring-2 ring-heritage-500 text-heritage-900 dark:text-heritage-100";
                } else {
                  btnClass += "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-heritage-400 dark:hover:border-heritage-600 text-stone-700 dark:text-stone-200";
                }
              } else {
                if (isCorrect) {
                  btnClass += "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-500 text-emerald-900 dark:text-emerald-100";
                } else if (isSelected && !isCorrect) {
                  btnClass += "bg-red-50 dark:bg-red-950 border-red-500 text-red-900 dark:text-red-100";
                } else {
                  btnClass += "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 opacity-50 text-stone-500 dark:text-stone-400";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => handleSelectOption(currentQuestion, idx)}
                  disabled={submitted}
                  className={btnClass}
                >
                  <span className="font-medium">{opt}</span>
                  {submitted && isCorrect && <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                  {submitted && isSelected && !isCorrect && <X className="w-5 h-5 text-red-600 dark:text-red-400" />}
                </button>
              );
            })}
          </div>

          {submitted && q.explanation && (
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-xl text-blue-900 dark:text-blue-100 text-sm animate-fade-in">
              <strong className="block mb-1">Explanation:</strong>
              {q.explanation}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="flex-1 py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentQuestion === totalQ - 1 ? (
              !submitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < totalQ}
                  className="flex-1 py-3 px-4 rounded-xl bg-heritage-600 hover:bg-heritage-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              ) : null
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(totalQ - 1, prev + 1))}
                disabled={!submitted && selectedAnswers[currentQuestion] === undefined}
                className="flex-1 py-3 px-4 rounded-xl bg-heritage-600 hover:bg-heritage-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const score = calculateScore();
    const totalQ = result.questions.length;
    const percentage = (score / totalQ) * 100;
    let message = "Keep learning!";
    if (percentage >= 90) message = "Heritage Expert!";
    else if (percentage >= 70) message = "Great job!";
    else if (percentage >= 40) message = "Good effort!";

    return (
      <div className="bg-heritage-900 rounded-2xl p-8 mb-6 text-center text-white animate-fade-in">
        <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
        <p className="text-heritage-200 mb-6">{message}</p>
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-heritage-500 bg-heritage-800 mb-6">
          <div className="text-center">
            <span className="block text-4xl font-bold text-heritage-50">{score}</span>
            <span className="block text-sm text-heritage-300 border-t border-heritage-700 mt-1 pt-1">out of {totalQ}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => { generate(generateQuiz, { topic, difficulty, numQuestions: parseInt(numQuestions), language }); }} className="px-6 py-3 rounded-xl bg-heritage-700 hover:bg-heritage-600 text-white font-semibold transition">
            Retry Quiz
          </button>
          <button onClick={handleNewQuiz} className="px-6 py-3 rounded-xl bg-white text-heritage-900 hover:bg-stone-100 font-semibold transition">
            New Quiz
          </button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout title="Knowledge Challenge" description="Test your heritage knowledge with AI-generated quizzes." icon={<Brain className="w-6 h-6 text-heritage-600" />}>
      {error && <ErrorState message={error} onRetry={handleSubmitForm} />}
      
      {loading && (
        <div className="flex flex-col items-center justify-center p-12 text-heritage-600 max-w-xl mx-auto mt-12">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-medium animate-pulse text-lg">Generating your quiz...</p>
        </div>
      )}

      {!loading && !error && quizState === 'form' && renderForm()}
      {!loading && !error && (quizState === 'quiz' || quizState === 'results') && renderQuiz()}
    </PageLayout>
  );
}
