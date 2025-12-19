
import React, { useState, useEffect } from 'react';
import { AppMode, ChatHistory, Message } from './types';
import { MODES } from './constants';
import ModeCard from './components/ModeCard';
import ChatScreen from './components/ChatScreen';
import { Sparkles, GraduationCap } from 'lucide-react';

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
      if (window.confirm('Are you sure you want to clear this chat history?')) {
        setHistory(prev => ({
          ...prev,
          [activeMode]: []
        }));
      }
    }
  };

  if (activeMode === 'home') {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col max-w-2xl mx-auto shadow-sm">
        <header className="px-6 pt-12 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">GURU & JYOTISH</h1>
              <p className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">The Dual AI Experience</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 space-y-6 pb-12">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Chaliye shuru karte hain</h2>
            <p className="text-gray-500 font-medium">Select a guide to start your journey today.</p>
          </div>

          <div className="grid gap-6">
            <ModeCard 
              config={MODES.teacher} 
              onSelect={() => handleSelectMode('teacher')} 
            />
            <ModeCard 
              config={MODES.astrologer} 
              onSelect={() => handleSelectMode('astrologer')} 
            />
          </div>

          <div className="mt-10 p-6 rounded-3xl bg-gray-900 text-white flex items-center justify-between overflow-hidden relative">
            <div className="z-10">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Coming Soon</p>
              <h4 className="text-xl font-bold">Mental Wellness Mode</h4>
              <p className="text-sm text-gray-300 mt-1">Peace of mind in one tap.</p>
            </div>
            <div className="absolute right-[-20px] top-[-20px] opacity-20 transform rotate-12">
               <GraduationCap className="w-32 h-32" />
            </div>
          </div>
        </main>

        <footer className="p-6 border-t border-gray-100 flex justify-between items-center bg-white">
          <p className="text-xs text-gray-400 font-medium italic">Empowered by Gemini AI</p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Online</span>
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
