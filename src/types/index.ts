// Interview and Career Guidance Types
export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'education' | 'strengths' | 'personality' | 'workstyle' | 'motivation' | 'resilience' | 'mobility' | 'ambition' | 'interests' | 'leadership';
  order: number;
}

export interface UserAnswer {
  questionId: string;
  question: string;
  answer: string;
  timestamp: number;
  confidence?: number;
}

export interface InterviewSession {
  id: string;
  userId: string;
  startTime: number;
  endTime?: number;
  answers: UserAnswer[];
  status: 'in-progress' | 'completed' | 'abandoned';
  conversationHistory: ConversationMessage[];
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CareerRecommendation {
  rank: 1 | 2 | 3;
  career: string;
  matchScore: number;
  reasoning: string;
  skillsToLearn: string[];
}

export interface CareerReport {
  sessionId: string;
  userId: string;
  generatedAt: number;
  recommendations: CareerRecommendation[];
  userProfile: {
    strengths: string[];
    workStyle: string;
    personality: string;
    motivations: string[];
    leadershipApetite: string;
  };
  rawAnswers: UserAnswer[];
}

export interface VoiceTranscript {
  id: string;
  text: string;
  timestamp: number;
  isFinal: boolean;
  confidence?: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
