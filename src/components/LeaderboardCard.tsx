import React from 'react';
import { vibeTypes } from '../data/quizData';
import { Trophy, TrendingUp } from 'lucide-react';

interface VibeStatistic {
  vibe_type: string;
  count: number;
  percentage: number;
}

interface LeaderboardCardProps {
  stats: VibeStatistic[];
  isLoading: boolean;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ stats, isLoading }) => {
  // Get top 3 vibes
  const topVibes = [...stats].slice(0, 3);
  
  if (isLoading) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (stats.length === 0) {
    return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-display font-bold mb-4 flex items-center">
          <Trophy className="mr-2 text-yellow-500" size={20} />
          Global Vibe Trends
        </h3>
        <p className="text-gray-600">
          Be the first to complete the quiz and see your vibe on the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-display font-bold mb-4 flex items-center">
        <Trophy className="mr-2 text-yellow-500" size={20} />
        Global Vibe Trends
      </h3>
      
      <div className="space-y-4">
        {topVibes.map((stat, index) => {
          const vibe = vibeTypes[stat.vibe_type];
          if (!vibe) return null;
          
          return (
            <div key={stat.vibe_type} className="flex items-center">
              <div className={`w-8 h-8 ${vibe.color} rounded-full text-white flex items-center justify-center mr-3`}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{vibe.name} {vibe.emoji}</span>
                  <span className="text-sm text-gray-500">{stat.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${vibe.color}`} 
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center text-gray-600 text-sm">
          <TrendingUp className="mr-2" size={16} />
          <span>Updated in real-time</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;