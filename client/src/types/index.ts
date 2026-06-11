export interface UserProfile {
  branch: string;
  year: string;
  city: string;
  interests: string[];
}

export interface Event {
  id?: number;
  title: string;
  description: string;
  category?: string;
  location: string;
  date: string;
  matchScore: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'zuzu';
  timestamp: Date;
}

export interface Nudge {
  type: string;
  message: string;
}
