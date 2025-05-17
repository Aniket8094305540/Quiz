import React from 'react';
import { Question, Option } from '../data/quizData';
import { useSpring, animated } from 'react-spring';

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption
}) => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to: { opacity: 1, transform: 'translate3d(0,0,0)' },
    config: { tension: 280, friction: 20 }
  });

  // Get background image and class based on question ID
  const getBackgroundStyle = () => {
    switch (question.id) {
      case 1: // Friday night
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg")',
          className: 'bg-friday-night'
        };
      case 2: // Vacation
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg")',
          className: 'bg-vacation'
        };
      case 3: // Phone battery
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg")',
          className: 'bg-phone'
        };
      case 4: // Workspace
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg")',
          className: 'bg-workspace'
        };
      case 5: // Dinner party
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg")',
          className: 'bg-dinner'
        };
      case 6: // Friends describe
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg")',
          className: 'bg-friends'
        };
      case 7: // 3 AM
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg")',
          className: 'bg-late-night'
        };
      case 8: // Motto
        return {
          backgroundImage: 'url("https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg")',
          className: 'bg-motto'
        };
      default:
        return {
          backgroundImage: '',
          className: ''
        };
    }
  };

  const background = getBackgroundStyle();

  return (
    <animated.div 
      style={{
        ...fadeIn,
        backgroundImage: background.backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} 
      className={`question-card ${background.className}`}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg mx-auto max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-gray-800">
          {question.text}
        </h2>
        <div className="space-y-4">
          {question.options.map((option: Option) => (
            <button
              key={option.id}
              className={`option-button ${selectedOption === option.id ? 'selected' : ''}`}
              onClick={() => onSelectOption(option.id)}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === option.id 
                    ? 'border-primary-500 bg-primary-500' 
                    : 'border-gray-300'
                } mr-3 flex-shrink-0`}>
                  {selectedOption === option.id && (
                    <span className="flex h-full items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                    </span>
                  )}
                </div>
                <span className="text-base md:text-lg">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </animated.div>
  );
};

export default QuestionCard;