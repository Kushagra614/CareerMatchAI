/**
 * ElevenLabs Text-to-Speech Service
 * 
 * Integration with ElevenLabs API for converting text to speech
 * Docs: https://elevenlabs.io/docs/api-reference
 */

interface ElevenLabsConfig {
  apiKey: string;
  voiceId?: string;
}

export class ElevenLabsService {
  private apiKey: string;
  private baseUrl = 'https://api.elevenlabs.io/v1';
  private voiceId: string; // Default voice ID (to be configured)

  constructor(config: ElevenLabsConfig) {
    this.apiKey = config.apiKey;
    this.voiceId = config.voiceId || '21m00Tcm4TlvDq8ikWAM'; // Default Rachel voice
  }

  /**
   * Convert text to speech and play it
   * @param text - Text to convert to speech
   * @param voiceId - Optional voice ID override
   */
  async speakText(text: string, voiceId?: string): Promise<void> {
    try {
      const voice = voiceId || this.voiceId;
      
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voice}`, {
        method: 'POST',
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      await this.playAudio(audioBlob);
    } catch (error) {
      console.error('ElevenLabs speech error:', error);
      throw error;
    }
  }

  /**
   * Play audio blob
   * @param audioBlob - Audio blob to play
   */
  private async playAudio(audioBlob: Blob): Promise<void> {
    return new Promise((resolve, reject) => {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };

      audio.play().catch(reject);
    });
  }

  /**
   * Get available voices
   * @returns List of available voices
   */
  async getAvailableVoices(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Error fetching voices:', error);
      return [];
    }
  }
}

// Singleton instance
let elevenLabsInstance: ElevenLabsService | null = null;

export function initElevenLabs(apiKey: string): ElevenLabsService {
  if (!elevenLabsInstance) {
    elevenLabsInstance = new ElevenLabsService({ apiKey });
  }
  return elevenLabsInstance;
}

export function getElevenLabsService(): ElevenLabsService {
  if (!elevenLabsInstance) {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_ELEVENLABS_API_KEY is not set');
    }
    elevenLabsInstance = new ElevenLabsService({ apiKey });
  }
  return elevenLabsInstance;
}
