
import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { ModeConfig } from './types';

export const MODES: Record<'teacher' | 'astrologer', ModeConfig> = {
  teacher: {
    id: 'teacher',
    title: 'Teacher Mode',
    subtitle: 'Seekhlo Kuch Naya',
    description: 'Patient academic help in simple Hinglish with real-life examples.',
    icon: <BookOpen className="w-10 h-10" />,
    primaryColor: 'bg-indigo-600',
    secondaryColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    systemInstruction: `You are an experienced, patient teacher. 
    Explain every question step-by-step in simple Hinglish (a natural mix of Hindi and English). 
    Assume the user is a absolute beginner. Use relatable real-life examples to explain concepts. 
    Focus strictly on accurate, logical, and educational explanations. 
    IMPORTANT: Keep your answers very short, concise, and to the point. Do not give long explanations.
    Do NOT use spiritual language, predictions, or flowery metaphors. 
    Be encouraging and supportive.`
  },
  astrologer: {
    id: 'astrologer',
    title: 'Jyotish Mode',
    subtitle: 'Karma aur Bhagya',
    description: 'Traditional Indian wisdom on karma, planets, and destiny.',
    icon: <Sparkles className="w-10 h-10" />,
    primaryColor: 'bg-orange-500',
    secondaryColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    systemInstruction: `You are a traditional Indian astrologer (Jyotish). 
    Speak calmly in a mix of Hindi and Hinglish with a respectful Indian cultural tone. 
    Give guidance based on Vedic concepts like karma, grah (planets), samay (time), and destiny. 
    Avoid giving guaranteed future predictions; focus instead on guidance and tendencies. 
    IMPORTANT: Keep your responses short and concise. Avoid long monologues.
    Maintain a motivational, guru-like style. Use words like 'Beta', 'Vats', 'Subh', 'Mangal' appropriately. 
    Be compassionate and spiritual.`
  }
};
