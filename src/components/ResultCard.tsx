import React, { useRef } from 'react';
import { VibeType } from '../data/quizData';
import { Share2, Twitter, Instagram, Send } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultCardProps {
  vibe: VibeType;
  percentage: number;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ vibe, percentage, onReset }) => {
  const resultCardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (!resultCardRef.current) return;
    
    try {
      const canvas = await html2canvas(resultCardRef.current);
      const image = canvas.toDataURL('image/png');
      
      if (navigator.share) {
        await navigator.share({
          title: `My Vibe is ${vibe.name}!`,
          text: `I just took the Vibe Check quiz and my vibe is ${vibe.name}! ${vibe.description} What's your vibe?`,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        const link = document.createElement('a');
        link.download = `my-vibe-${vibe.id}.png`;
        link.href = image;
        link.click();
      }
    } catch (error) {
      console.error('Error sharing result:', error);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`I just took the Vibe Check quiz and my vibe is ${vibe.name}! ${vibe.emoji} What's your vibe? Take the quiz:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnInstagram = () => {
    alert('To share on Instagram: Take a screenshot of your result and share it to your Instagram story!');
  };

  const shareOnWhatsapp = () => {
    const text = encodeURIComponent(`I just took the Vibe Check quiz and my vibe is ${vibe.name}! ${vibe.emoji} ${vibe.description} What's your vibe? Take the quiz: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col items-center p-6 md:p-8">
      <h2 className="text-2xl md:text-4xl font-display font-bold mb-6 text-center">
        Your Vibe Is <span className={`gradient-text from-${vibe.color.split('-')[2]} to-${vibe.color.split('-')[2]}-700`}>
          {vibe.name}
        </span> {vibe.emoji}
      </h2>
      
      <div 
        ref={resultCardRef} 
        className={`vibe-card w-full max-w-md bg-gradient-to-br ${vibe.backgroundGradient} my-6`}
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-5xl">{vibe.emoji}</span>
            <div className="bg-white/20 rounded-lg px-3 py-1 backdrop-blur-sm">
              <span className="text-sm font-medium">{percentage}% match</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-2">{vibe.name}</h3>
          <p className="mb-4 text-white/90">{vibe.description}</p>
          
          <div className="flex items-center mt-4">
            <vibe.icon className="w-5 h-5 mr-2" />
            <span className="font-medium">Vibe Check™</span>
          </div>
        </div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_35%)] mix-blend-overlay"></div>
      </div>
      
      <div className="flex flex-col w-full max-w-md gap-3 mb-6">
        <button 
          onClick={handleShare}
          className="share-button bg-primary-500 hover:bg-primary-600 text-white"
        >
          <Share2 className="w-4 h-4" />
          Share My Vibe
        </button>
        
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={shareOnTwitter}
            className="share-button bg-[#1DA1F2] hover:bg-[#0c85d0] text-white"
          >
            <Twitter className="w-4 h-4" />
            Twitter
          </button>
          <button 
            onClick={shareOnInstagram}
            className="share-button bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90 text-white"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </button>
          <button 
            onClick={shareOnWhatsapp}
            className="share-button bg-[#25D366] hover:bg-[#20bd5a] text-white"
          >
            <Send className="w-4 h-4" />
            WhatsApp
          </button>
        </div>
      </div>
      
      <button 
        onClick={onReset}
        className="text-primary-500 hover:text-primary-700 font-medium transition-colors"
      >
        ← Take the Quiz Again
      </button>
    </div>
  );
};

export default ResultCard;