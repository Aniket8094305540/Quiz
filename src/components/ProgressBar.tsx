import React from 'react';

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentQuestion, 
  totalQuestions 
}) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="progress-container">
        <div 
          className="progress-bar bg-gradient-to-r from-primary-400 to-primary-600" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;