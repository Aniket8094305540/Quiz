import React from 'react';
import { CheckCircle, BarChart3 } from 'lucide-react';

interface HeaderProps {
  showStats: boolean;
  onToggleStats: () => void;
}

const Header: React.FC<HeaderProps> = ({ showStats, onToggleStats }) => {
  return (
    <header className="w-full py-6">
      <div className="container max-w-4xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <CheckCircle className="text-primary-500 w-8 h-8 mr-2" />
          <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-800">
            Vibe Check
          </h1>
        </div>
        <button
          onClick={onToggleStats}
          className={`flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            showStats 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          <span>Stats</span>
        </button>
      </div>
    </header>
  );
};

export default Header;