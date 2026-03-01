import { create } from 'zustand';
import { InterviewSession, UserAnswer, ConversationMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface InterviewState {
  session: InterviewSession | null;
  currentQuestionIndex: number;
  transcript: string;
  isListening: boolean;
  isProcessing: boolean;
  
  // Actions
  initializeSession: (userId: string) => void;
  addAnswer: (answer: UserAnswer) => void;
  addMessage: (message: ConversationMessage) => void;
  setTranscript: (text: string) => void;
  setIsListening: (listening: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  moveToNextQuestion: () => void;
  completeSession: () => void;
  resetSession: () => void;
}

export const useInterviewStore = create<InterviewState>((set) => ({
  session: null,
  currentQuestionIndex: 0,
  transcript: '',
  isListening: false,
  isProcessing: false,

  initializeSession: (userId: string) => {
    const sessionId = uuidv4();
    set({
      session: {
        id: sessionId,
        userId,
        startTime: Date.now(),
        answers: [],
        status: 'in-progress',
        conversationHistory: [],
      },
      currentQuestionIndex: 0,
      transcript: '',
    });
  },

  addAnswer: (answer: UserAnswer) => {
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            answers: [...state.session.answers, answer],
          }
        : null,
    }));
  },

  addMessage: (message: ConversationMessage) => {
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            conversationHistory: [...state.session.conversationHistory, message],
          }
        : null,
    }));
  },

  setTranscript: (text: string) => {
    set({ transcript: text });
  },

  setIsListening: (listening: boolean) => {
    set({ isListening: listening });
  },

  setIsProcessing: (processing: boolean) => {
    set({ isProcessing: processing });
  },

  moveToNextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      transcript: '',
    }));
  },

  completeSession: () => {
    set((state) => ({
      session: state.session
        ? {
            ...state.session,
            status: 'completed',
            endTime: Date.now(),
          }
        : null,
    }));
  },

  resetSession: () => {
    set({
      session: null,
      currentQuestionIndex: 0,
      transcript: '',
      isListening: false,
      isProcessing: false,
    });
  },
}));
