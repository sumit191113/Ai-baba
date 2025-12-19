
import React from 'react';
import { ModeConfig } from '../types';

interface ModeCardProps {
  config: ModeConfig;
  onSelect: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ config, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`relative overflow-hidden w-full p-8 rounded-3xl text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${config.bgColor}`}
    >
      <div className={`absolute -right-4 -bottom-4 opacity-10 ${config.secondaryColor}`}>
        {config.icon}
      </div>
      <div className={`inline-flex p-3 rounded-2xl mb-6 shadow-sm ${config.primaryColor} text-white`}>
        {config.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{config.title}</h3>
      <p className={`font-medium mb-3 ${config.secondaryColor}`}>{config.subtitle}</p>
      <p className="text-gray-600 text-sm leading-relaxed max-w-[80%]">
        {config.description}
      </p>
      <div className="mt-6 flex items-center text-sm font-semibold group">
        <span className={config.secondaryColor}>Start Conversation</span>
        <svg 
          className={`w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 ${config.secondaryColor}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

export default ModeCard;
