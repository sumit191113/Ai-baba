
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Trash2, User, Sparkles, BookOpen } from 'lucide-react';
import { AppMode, Message, ModeConfig } from '../types';
import { AIHandler } from '../services/geminiService';

interface ChatScreenProps {
  mode: AppMode;
  config: ModeConfig;
  history: Message[];
  onBack: () => void;
  onUpdateHistory: (messages: Message[]) => void;
  onClearHistory: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ 
  mode, 
  config, 
  history, 
  onBack, 
  onUpdateHistory,
  onClearHistory
}) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<AIHandler | null>(null);

  useEffect(() => {
    if (!aiRef.current) {
      aiRef.current = new AIHandler(config.systemInstruction);
    }
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    const newHistory = [...history, userMessage];
    onUpdateHistory(newHistory);
    setInput('');
    setIsTyping(true);

    try {
      const botMessageId = (Date.now() + 1).toString();
      let botContent = '';
      
      const botMessage: Message = {
        id: botMessageId,
        role: 'model',
        content: '',
        timestamp: Date.now()
      };
      
      onUpdateHistory([...newHistory, botMessage]);

      await aiRef.current?.sendMessageStream(input, (chunk) => {
        botContent += chunk;
        onUpdateHistory([
          ...newHistory,
          { ...botMessage, content: botContent }
        ]);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD] max-w-2xl mx-auto overflow-hidden animate-slide-in">
      {/* Immersive Glass Header */}
      <header className={`flex items-center justify-between px-4 py-3 sticky top-0 z-30 glass border-b border-gray-100 shadow-sm`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-black/5 rounded-full transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl text-white shadow-md ${config.primaryColor}`}>
               {mode === 'teacher' ? <BookOpen size={18} /> : <Sparkles size={18} />}
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-sm tracking-tight leading-none">{config.title}</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Online Now</p>
            </div>
          </div>
        </div>
        <button 
          onClick={onClearHistory}
          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar"
      >
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
            <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center ${config.bgColor} ${config.secondaryColor} mb-6 shadow-inner animate-pulse`}>
              {mode === 'teacher' ? <BookOpen size={40} /> : <Sparkles size={40} />}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Pranam & Welcome</h3>
            <p className="text-sm text-gray-500 font-medium max-w-[220px] leading-relaxed">
              {mode === 'teacher' 
                ? "Let's explore logic and facts together in simple Hinglish."
                : "Ask about your path, karma, or the guidance of the stars."}
            </p>
          </div>
        )}

        {history.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-in`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 mt-auto mb-1`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shadow-sm ${
                  msg.role === 'user' ? 'bg-gray-200 text-gray-500' : `${config.primaryColor} text-white`
                }`}>
                  {msg.role === 'user' ? <User size={12} /> : (mode === 'teacher' ? <BookOpen size={12} /> : <Sparkles size={12} />)}
                </div>
              </div>
              
              <div className={`p-4 shadow-sm text-[15px] leading-relaxed transition-all ${
                msg.role === 'user' 
                  ? 'bg-gray-800 text-white bubble-user' 
                  : 'bg-white text-gray-800 border border-gray-100 bubble-bot'
              }`}>
                {msg.content}
                {msg.role === 'model' && msg.content === '' && (
                  <div className="flex gap-1 py-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-bold mt-1.5 mx-8 uppercase tracking-tighter">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-8">
        <form onSubmit={handleSend} className="max-w-xl mx-auto flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'teacher' ? "Ask anything logical..." : "Apna prashna puchein..."}
            className="w-full bg-gray-100/50 border border-transparent rounded-[2rem] px-6 py-4 pr-14 focus:outline-none focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-black/5 transition-all text-sm font-medium shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`absolute right-1.5 top-1.5 bottom-1.5 w-11 h-11 flex items-center justify-center rounded-full transition-all ${
              !input.trim() || isTyping 
                ? 'bg-gray-200 text-gray-400' 
                : `${config.primaryColor} text-white shadow-lg shadow-black/10 active:scale-90`
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
