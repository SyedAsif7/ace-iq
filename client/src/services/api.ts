import axios from 'axios';
import { UserProfile, Event, ChatMessage, Nudge } from '../types';

const api = axios.create({
  baseURL: '/api',
});

export const aiService = {
  getMatchScore: async (profile: UserProfile, event: Partial<Event>) => {
    const response = await api.post('/ai/match', { user_profile: profile, event });
    return response.data.match_score;
  },

  chatWithZuzu: async (message: string) => {
    const response = await api.post('/ai/zuzu/chat', { message });
    return response.data;
  },

  checkNudges: async (behavior: any, profile: UserProfile) => {
    const response = await api.post('/ai/nudges/check', { behavior, profile });
    return response.data.nudge;
  },

  processPoster: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/ai/ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
