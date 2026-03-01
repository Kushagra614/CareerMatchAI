/**
 * Anthropic Claude AI Service
 * 
 * Integration with Anthropic Claude API for AI conversation and analysis
 * Docs: https://console.anthropic.com/docs/api
 */

import { ConversationMessage, UserAnswer, CareerReport } from '@/types';

interface ClaudeConfig {
  apiKey: string;
  model?: string;
}

export class ClaudeService {
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(config: ClaudeConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'claude-3-sonnet-20240229';
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
      const systemPrompt = `You are a professional career counselor conducting an intelligent interview to help students find their ideal career path. 

You have a list of 10 interview questions you need to ask in order, and you should ask them one at a time. Based on the user's previous answers, ask follow-up questions if needed, but always progress towards completing the main 10 questions.

The interview questions are:
1. Tell me about your educational background. What subjects did you enjoy the most and which ones were challenging?
2. What are you naturally good at? Think about skills, talents, or abilities that come easily to you.
3. Do you prefer working alone or with people? Can you give me an example of when you felt most productive?
4. Do you like routine and predictability in your day, or do you prefer variety and new challenges?
5. What matters more to you in a career — financial stability, creativity and innovation, or helping others?
6. How do you handle stress and tight deadlines? Can you describe a time you overcame a difficult challenge?
7. Are you open to travel, field-based work, or do you prefer being office-based or remote?
8. Where do you see yourself in 5 years? What does success look like to you?
9. Are there any industries you love or want to avoid? Any specific interests or passions?
10. How do you feel about managing or leading people? Do you see yourself in a leadership role?

Current question number: ${currentQuestionNumber}

Keep responses natural, conversational, and encouraging. Respond with just the next question to ask.`;

      const messages = conversationHistory.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 500,
          system: systemPrompt,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      const question = data.content?.[0]?.text || '';

      return question;
    } catch (error) {
      console.error('Claude question generation error:', error);
      throw error;
    }
  }

  /**
   * Generate career recommendations based on interview answers
   * @param answers - All user answers from the interview
   * @returns Career recommendations report
   */
  async generateCareerReport(answers: UserAnswer[]): Promise<CareerReport> {
    try {
      const answersText = answers
        .map((a) => `Q: ${a.question}\nA: ${a.answer}`)
        .join('\n\n');

      const systemPrompt = `You are an expert career counselor and data analyst. Based on the user's interview responses, analyze their profile and recommend 3 career paths.

For each recommendation, provide:
1. Career name
2. Match score (0-100)
3. Reasoning (why this is a good fit)
4. 3-4 skills they should develop

Return a JSON response with this exact structure:
{
  "recommendations": [
    {
      "rank": 1,
      "career": "Career Name",
      "matchScore": 92,
      "reasoning": "Explanation",
      "skillsToLearn": ["Skill1", "Skill2", "Skill3"]
    },
    // ... repeat for rank 2 and 3
  ],
  "userProfile": {
    "strengths": ["Strength1", "Strength2"],
    "workStyle": "Description",
    "personality": "Description",
    "motivations": ["Motivation1", "Motivation2"],
    "leadershipApetite": "Low/Medium/High"
  }
}`;

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 2000,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: `Please analyze these interview responses and provide career recommendations:\n\n${answersText}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      const responseText = data.content?.[0]?.text || '{}';

      // Parse JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonData = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        sessionId: '',
        userId: '',
        generatedAt: Date.now(),
        recommendations: jsonData.recommendations || [],
        userProfile: jsonData.userProfile || {},
        rawAnswers: answers,
      };
    } catch (error) {
      console.error('Claude report generation error:', error);
      throw error;
    }
  }

  /**
   * Get general advice or follow-up based on user context
   * @param topic - Topic to get advice on
   * @param context - Additional context
   * @returns Advice text
   */
  async getAdvice(topic: string, context?: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `As a career counselor, provide advice on: ${topic}${context ? `\n\nContext: ${context}` : ''}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.content?.[0]?.text || '';
    } catch (error) {
      console.error('Claude advice error:', error);
      throw error;
    }
  }
}

// Singleton instance
let claudeInstance: ClaudeService | null = null;

export function initClaude(apiKey: string): ClaudeService {
  if (!claudeInstance) {
    claudeInstance = new ClaudeService({ apiKey });
  }
  return claudeInstance;
}

export function getClaudeService(): ClaudeService {
  if (!claudeInstance) {
    const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_ANTHROPIC_API_KEY is not set');
    }
    claudeInstance = new ClaudeService({ apiKey });
  }
  return claudeInstance;
}
