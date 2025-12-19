
import React, { useState, useEffect } from 'react';
import { AppMode, ChatHistory, Message } from './types';
import { MODES } from './constants';
import ModeCard from './components/ModeCard';
import ChatScreen from './components/ChatScreen';
import { Sparkles, GraduationCap, Command } from 'lucide-react';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<AppMode>('home');
  const [history, setHistory] = useState<ChatHistory>(() => {
    const saved = localStorage.getItem('guru_jyotish_history');
    return saved ? JSON.parse(saved) : { teacher: [], astrologer: [] };
  });

  useEffect(() => {
    localStorage.setItem('guru_jyotish_history', JSON.stringify(history));
  }, [history]);

  const handleSelectMode = (mode: AppMode) => {
    setActiveMode(mode);
  };

  const handleUpdateHistory = (messages: Message[]) => {
    if (activeMode === 'teacher' || activeMode === 'astrologer') {
      setHistory(prev => ({
        ...prev,
        [activeMode]: messages
      }));
    }
  };

  const handleClearHistory = () => {
    if (activeMode === 'teacher' || activeMode === 'astrologer') {
      if (window.confirm('Clear your conversation history?')) {
        setHistory(prev => ({
          ...prev,
          [activeMode]: []
        }));
      }
    }
  };

  if (activeMode === 'home') {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col max-w-2xl mx-auto overflow-x-hidden animate-slide-in">
        {/* Navigation Header */}
        <header className="px-8 pt-16 pb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-900 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl transform rotate-3">
                <Command className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">AI GURU</h1>
                <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase mt-1">Wisdom & Learning</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Namaste!<br/>
              <span className="text-gray-400">Ready to begin?</span>
            </h2>
            <p className="text-gray-500 font-semibold text-lg">Choose your guide for today.</p>
          </div>
        </header>

        <main className="flex-1 px-8 space-y-8 pb-16">
          <div className="grid gap-8">
            <ModeCard 
              config={MODES.teacher} 
              onSelect={() => handleSelectMode('teacher')} 
            />
            <ModeCard 
              config={MODES.astrologer} 
              onSelect={() => handleSelectMode('astrologer')} 
            />
          </div>

          <div className="mt-4 p-8 rounded-[2.5rem] bg-gray-900 text-white flex items-center justify-between overflow-hidden relative group cursor-not-allowed shadow-2xl">
            <div className="z-10">
              <span className="px-2 py-0.5 bg-indigo-500 text-[9px] font-black rounded-full uppercase tracking-widest mb-2 inline-block">Locked</span>
              <h4 className="text-2xl font-black tracking-tight">Health Guru</h4>
              <p className="text-sm text-gray-400 mt-1 font-medium">Ayurvedic guidance coming soon.</p>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 transform -rotate-12 transition-transform group-hover:scale-110">
               <GraduationCap className="w-40 h-40" />
            </div>
          </div>
        </main>

        <footer className="p-8 border-t border-gray-50 flex flex-col items-center gap-4 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Privacy First</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Gemini AI</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Fast & Safe</span>
          </div>
        </footer>
      </div>
    );
  }

  const modeConfig = activeMode === 'teacher' ? MODES.teacher : MODES.astrologer;
  const currentHistory = activeMode === 'teacher' ? history.teacher : history.astrologer;

  return (
    <ChatScreen
      mode={activeMode}
      config={modeConfig}
      history={currentHistory}
      onBack={() => setActiveMode('home')}
      onUpdateHistory={handleUpdateHistory}
      onClearHistory={handleClearHistory}
    />
  );
};

export default App;
