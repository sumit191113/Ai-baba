
import { ReactElement } from 'react';

export type AppMode = 'teacher' | 'astrologer' | 'home';

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface ChatHistory {
  teacher: Message[];
  astrologer: Message[];
}

export interface ModeConfig {
  id: AppMode;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactElement;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  accentColor: string;
  systemInstruction: string;
}
