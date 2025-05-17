import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      <div className="flex items-center justify-center">
        <span>Made with</span>
        <Heart className="w-4 h-4 mx-1 text-error-500" />
        <span>by the Vibe Check team</span>
      </div>
      <div className="mt-2">
        <a 
          href="#" 
          className="text-primary-500 hover:text-primary-700 transition-colors mr-4"
        >
          Privacy Policy
        </a>
        <a 
          href="#" 
          className="text-primary-500 hover:text-primary-700 transition-colors"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;