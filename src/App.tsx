import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { questions, vibeTypes } from './data/quizData';
import { saveQuizResult, getVibeStats, subscribeToVibeStats } from './lib/supabase';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import LeaderboardCard from './components/LeaderboardCard';
import Footer from './components/Footer';

function App() {
  // State for quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [vibeResult, setVibeResult] = useState<string | null>(null);
  const [sessionId] = useState(() => uuidv4());
  
  // State for stats
  const [showStats, setShowStats] = useState(false);
  const [vibeStats, setVibeStats] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [vibePercentage, setVibePercentage] = useState(0);
  
  // Current question
  const currentQuestion = questions[currentQuestionIndex];
  
  // Load and subscribe to vibe stats
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      const stats = await getVibeStats();
      setVibeStats(stats);
      setIsLoadingStats(false);
    };
    
    fetchStats();
    
    const subscription = subscribeToVibeStats((payload) => {
      fetchStats();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Calculate result when quiz is completed
  const calculateResult = () => {
    // Initialize counters for each vibe type
    const vibeScores: Record<string, number> = {};
    Object.keys(vibeTypes).forEach(vibe => {
      vibeScores[vibe] = 0;
    });
    
    // Calculate scores based on selected options
    questions.forEach((question, index) => {
      const selectedOptionId = selectedOptions[index];
      if (selectedOptionId) {
        const selectedOption = question.options.find(option => option.id === selectedOptionId);
        if (selectedOption) {
          Object.entries(selectedOption.vibePoints).forEach(([vibe, points]) => {
            vibeScores[vibe] = (vibeScores[vibe] || 0) + points;
          });
        }
      }
    });
    
    // Find the vibe with the highest score
    let maxScore = 0;
    let resultVibe = '';
    
    Object.entries(vibeScores).forEach(([vibe, score]) => {
      if (score > maxScore) {
        maxScore = score;
        resultVibe = vibe;
      }
    });
    
    // Calculate percentage match (simplified)
    const totalPossiblePoints = questions.length * 3; // Assuming max 3 points per question
    const matchPercentage = Math.round((maxScore / totalPossiblePoints) * 100);
    setVibePercentage(matchPercentage);
    
    return resultVibe;
  };
  
  // Handle option selection
  const handleSelectOption = (optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: optionId
    }));
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate and save result
      const result = calculateResult();
      setVibeResult(result);
      setQuizCompleted(true);
      saveQuizResult(result, sessionId);
    }
  };
  
  // Handle reset quiz
  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setQuizCompleted(false);
    setVibeResult(null);
  };
  
  // Toggle stats view
  const toggleStats = () => {
    setShowStats(prev => !prev);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 font-body flex flex-col">
      <Header showStats={showStats} onToggleStats={toggleStats} />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-6">
        {!showStats ? (
          <>
            {!quizCompleted ? (
              <div className="quiz-container">
                <ProgressBar 
                  currentQuestion={currentQuestionIndex + 1} 
                  totalQuestions={questions.length} 
                />
                
                <QuestionCard 
                  question={currentQuestion}
                  selectedOption={selectedOptions[currentQuestionIndex] || null}
                  onSelectOption={handleSelectOption}
                />
                
                <div className="px-8 pb-8 md:px-10 md:pb-10">
                  <button
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      selectedOptions[currentQuestionIndex]
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handleNextQuestion}
                    disabled={!selectedOptions[currentQuestionIndex]}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Your Results'}
                  </button>
                </div>
              </div>
            ) : (
              vibeResult && (
                <div className="quiz-container">
                  <ResultCard 
                    vibe={vibeTypes[vibeResult]} 
                    percentage={vibePercentage}
                    onReset={handleResetQuiz} 
                  />
                </div>
              )
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-center">
              Global Vibe Distribution
            </h2>
            <LeaderboardCard stats={vibeStats} isLoading={isLoadingStats} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;