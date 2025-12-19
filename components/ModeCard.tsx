
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
      className={`group relative overflow-hidden w-full p-7 rounded-[2.5rem] text-left transition-all duration-500 hover:-translate-y-2 active:scale-95 shadow-xl hover:shadow-2xl border border-white ${config.bgColor}`}
    >
      {/* Abstract Background Blur */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${config.primaryColor}`}></div>
      
      <div className="relative z-10">
        <div className={`inline-flex p-4 rounded-2xl mb-6 shadow-lg shadow-black/5 ${config.primaryColor} text-white transform group-hover:rotate-6 transition-transform`}>
          {config.icon}
        </div>
        
        <div className="flex flex-col">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60 ${config.secondaryColor}`}>
            {config.subtitle}
          </span>
          <h3 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{config.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            {config.description}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <div className={`h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-12 ${config.primaryColor}`}></div>
          <span className={`text-xs font-bold uppercase tracking-widest ${config.secondaryColor}`}>Enter Mode</span>
        </div>
      </div>

      {/* Large Decorative Icon */}
      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] transform transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12 ${config.secondaryColor}`}>
        {/* Fix: Explicitly cast to React.ReactElement<any> to allow 'size' prop in cloneElement */}
        {React.cloneElement(config.icon as React.ReactElement<any>, { size: 160 })}
      </div>
    </button>
  );
};

export default ModeCard;
