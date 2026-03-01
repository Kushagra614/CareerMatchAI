/**
 * Ollama Local LLM Service
 * 
 * Integration with Ollama for local Mistral 7B LLM inference
 * No API costs, runs entirely on your machine
 * Docs: https://ollama.ai/
 */

import { ConversationMessage, UserAnswer, CareerReport, CareerRecommendation } from '@/types';

interface OllamaConfig {
  baseUrl?: string;
  model?: string;
}

export class OllamaService {
  private baseUrl: string;
  private model: string;

  constructor(config: OllamaConfig = {}) {
    this.baseUrl = config.baseUrl || 'http://localhost:11434';
    this.model = config.model || 'mistral';
  }

  /**
   * Get next interview question based on conversation history
   * @param conversationHistory - Previous conversation messages
   * @param currentQuestionNumber - Current question number (1-10)
   * @returns Next question to ask
   */
  async getNextQuestion(
    conversationHistory: ConversationMessage[],
    currentQuestionNumber: number
  ): Promise<string> {
    try {
      const interviewQuestions = [
        "Tell me about your educational background. What subjects did you enjoy the most and which ones were challenging?",
        "What are you naturally good at? Think about skills, talents, or abilities that come easily to you.",
        "Do you prefer working alone or with people? Can you give me an example of when you felt most productive?",
        "Do you like routine and predictability in your day, or do you prefer variety and new challenges?",
        "What matters more to you in a career — financial stability, creativity and innovation, or helping others?",
        "How do you handle stress and tight deadlines? Can you describe a time you overcame a difficult challenge?",
        "Are you open to travel, field-based work, or do you prefer being office-based or remote?",
        "Where do you see yourself in 5 years? What does success look like to you?",
        "Are there any industries you love or want to avoid? Any specific interests or passions?",
        "How do you feel about managing or leading people? Do you see yourself in a leadership role?"
      ];

      // Build conversation context
      const conversationContext = conversationHistory
        .map(msg => `${msg.role === 'user' ? 'Student' : 'Counselor'}: ${msg.content}`)
        .join('\n');

      const systemPrompt = `You are a professional career counselor conducting an intelligent interview. 
You are asking question ${currentQuestionNumber} of 10 to help students find their ideal career path.

Current conversation:
${conversationContext}

Next question to ask:
${interviewQuestions[currentQuestionNumber - 1]}

Respond with only the next question, slightly reworded if needed to flow naturally from the previous conversation.`;

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: systemPrompt,
          stream: false,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response.trim();
    } catch (error) {
      console.error('Error getting next question from Ollama:', error);
      throw new Error('Failed to generate next question');
    }
  }

  /**
   * Generate career recommendations based on all answers
   * @param userAnswers - All user answers from the interview
   * @returns Career report with recommendations
   */
  async generateCareerReport(userAnswers: UserAnswer[]): Promise<CareerReport> {
    try {
      const answersText = userAnswers
        .map((answer, idx) => `Q${idx + 1}: ${answer.answer}`)
        .join('\n');

      const systemPrompt = `You are an expert career counselor and psychometrician. Based on the following interview responses, analyze the person's strengths, personality, and preferences to recommend the top 3 most suitable careers.

Interview Responses:
${answersText}

For each recommendation, provide:
1. Career name
2. Match score (0-100)
3. Why this career fits
4. Top 3 skills to develop

Format your response as JSON with this structure:
{
  "recommendations": [
    {
      "rank": 1,
      "career": "Career Name",
      "matchScore": 85,
      "reasoning": "Why this fits...",
      "skillsToLearn": ["Skill 1", "Skill 2", "Skill 3"]
    }
  ]
}`;

      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: systemPrompt,
          stream: false,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      const parsedResponse = JSON.parse(data.response);

      const recommendations: CareerRecommendation[] = parsedResponse.recommendations.map(
        (rec: any) => ({
          rank: rec.rank,
          career: rec.career,
          matchScore: rec.matchScore,
          reasoning: rec.reasoning,
          skillsToLearn: rec.skillsToLearn,
        })
      );

      return {
        sessionId: `session_${Date.now()}`,
        userId: 'user_anonymous',
        generatedAt: Date.now(),
        recommendations,
        userProfile: {
          strengths: userAnswers[1]?.answer ? [userAnswers[1].answer] : [],
          workStyle: userAnswers[3]?.answer || '',
          personality: userAnswers[2]?.answer || '',
          motivations: userAnswers[4]?.answer ? [userAnswers[4].answer] : [],
          leadershipApetite: userAnswers[9]?.answer || '',
        },
        rawAnswers: userAnswers,
      };
    } catch (error) {
      console.error('Error generating career report from Ollama:', error);
      throw new Error('Failed to generate career report');
    }
  }

  /**
   * Check if Ollama service is running
   * @returns boolean indicating service availability
   */
  async isServiceAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default OllamaService;
