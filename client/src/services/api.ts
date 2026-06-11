import axios from 'axios';
import { UserProfile, Event, ChatMessage, Nudge } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const aiService = {
  getAllEvents: async () => {
    const response = await api.get('/ai/events');
    return response.data;
  },

  getMatchedEvents: async (profile: UserProfile) => {
    const response = await api.post('/ai/events/matched', profile);
    return response.data;
  },

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
