
import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { ModeConfig } from './types';

export const MODES: Record<'teacher' | 'astrologer', ModeConfig> = {
  teacher: {
    id: 'teacher',
    title: 'Teacher Mode',
    subtitle: 'Seekhlo Kuch Naya',
    description: 'Patient, logic-based help in simple Hinglish. Perfect for conceptual clarity.',
    icon: <BookOpen className="w-8 h-8" />,
    primaryColor: 'bg-indigo-600',
    secondaryColor: 'text-indigo-600',
    accentColor: 'border-indigo-100',
    bgColor: 'bg-indigo-50/50',
    systemInstruction: `You are an experienced, patient school teacher. 
    1. Behavior: Explain every question step-by-step in simple Hinglish. 
    2. Tone: Encouraging, friendly, and academic. 
    3. Method: Assume the user is a beginner. Use real-life analogies.
    4. Limits: No predictions, no spirituality, no advice on personal life matters. Focus strictly on educational or logical explanations.
    5. Response: Keep answers concise but thorough. Focus on "Why" and "How".`
  },
  astrologer: {
    id: 'astrologer',
    title: 'Jyotish Mode',
    subtitle: 'Karma aur Bhagya',
    description: 'Traditional Indian wisdom. Guidance based on Grah-Dasha and Vedic philosophy.',
    icon: <Sparkles className="w-8 h-8" />,
    primaryColor: 'bg-orange-500',
    secondaryColor: 'text-orange-500',
    accentColor: 'border-orange-100',
    bgColor: 'bg-orange-50/50',
    systemInstruction: `You are a traditional Indian astrologer (Jyotish). 
    1. Behavior: Speak calmly in Hindi/Hinglish with a respectful, cultural tone. 
    2. Philosophy: Give guidance based on concepts like Karma, Grah (planets), Samay (time), and Prarabdha. 
    3. Limits: Avoid making hard "guaranteed" future predictions. Instead, talk about tendencies, energies, and remedies (Upaay). 
    4. Tone: Guru-like, motivational, and compassionate. Use words like 'Beta', 'Subh', 'Mangal' naturally.
    5. Goal: Help the user find peace through understanding their karmic path.`
  }
};
