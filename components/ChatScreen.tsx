
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Trash2, Loader2, User, Sparkles, BookOpen } from 'lucide-react';
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
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    <div className="flex flex-col h-screen bg-white max-w-2xl mx-auto shadow-2xl">
      {/* Header */}
      <header className={`flex items-center justify-between p-4 sticky top-0 z-10 ${config.primaryColor} text-white shadow-md`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-tight">{config.title}</h2>
            <p className="text-xs opacity-80">{config.subtitle}</p>
          </div>
        </div>
        <button 
          onClick={onClearHistory}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar bg-gray-50/50"
      >
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
            <div className={`p-6 rounded-full ${config.bgColor} ${config.secondaryColor} mb-4`}>
              {mode === 'teacher' ? <BookOpen className="w-12 h-12" /> : <Sparkles className="w-12 h-12" />}
            </div>
            <h3 className="text-xl font-bold text-gray-800">Pranam! Kaise hain aap?</h3>
            <p className="text-sm mt-2 max-w-[250px]">
              {mode === 'teacher' 
                ? "Mujhse koi bhi academic sawal puchiye, main explain karunga simple Hinglish mein."
                : "Apne jeevan ya karma ke bare mein puchiye, hum grah-dasha par vichar karenge."}
            </p>
          </div>
        )}

        {history.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
                msg.role === 'user' ? 'bg-gray-200 text-gray-600' : config.primaryColor + ' text-white'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : (mode === 'teacher' ? <BookOpen className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />)}
              </div>
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-gray-800 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {msg.content}
                {msg.role === 'model' && msg.content === '' && (
                  <Loader2 className="w-5 h-5 animate-spin opacity-40" />
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && history[history.length - 1]?.role !== 'model' && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.primaryColor} text-white`}>
                 {mode === 'teacher' ? <BookOpen className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              </div>
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'teacher' ? "Ask a question..." : "Apne jeevan ka prashna puchein..."}
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all text-sm"
            style={{ 
              ['--tw-ring-color' as any]: mode === 'teacher' ? 'rgb(79 70 229)' : 'rgb(249 115 22)'
            }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`absolute right-1 top-1 bottom-1 w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              !input.trim() || isTyping ? 'bg-gray-200 text-gray-400' : `${config.primaryColor} text-white shadow-lg shadow-black/5 active:scale-95`
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-400 mt-2">
          {mode === 'teacher' 
            ? "Educational purpose only. Verify facts for high-stakes exams."
            : "Jyotish guidance only. Future tendencies are not absolute."}
        </p>
      </div>
    </div>
  );
};

export default ChatScreen;
