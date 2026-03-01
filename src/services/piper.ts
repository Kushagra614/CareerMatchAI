/**
 * Piper TTS Service
 * 
 * Open-source text-to-speech using Piper
 * Free, offline-capable, high-quality voice synthesis
 * Docs: https://github.com/rhasspy/piper
 */

interface PiperConfig {
  voiceModel?: string;
  language?: string;
  baseUrl?: string;
}

interface SynthesisResult {
  audioUrl: string;
  duration: number;
}

export class PiperTTSService {
  private voiceModel: string;
  private language: string;
  private baseUrl: string;
  private isPlaying = false;
  private currentAudio: HTMLAudioElement | null = null;

  constructor(config: PiperConfig = {}) {
    this.voiceModel = config.voiceModel || 'en_US-lessac-medium';
    this.language = config.language || 'en_US';
    this.baseUrl = config.baseUrl || 'http://localhost:8000';
  }

  /**
   * Synthesize text to speech and play it
   * @param text - Text to synthesize
   * @param onComplete - Callback when playback ends
   * @param onError - Callback for errors
   */
  async speak(
    text: string,
    onComplete?: () => void,
    onError?: (error: string) => void
  ): Promise<void> {
    try {
      // Stop any currently playing audio
      this.stop();

      if (!text || text.trim().length === 0) {
        if (onError) onError('Empty text provided');
        return;
      }

      // Request audio synthesis from Piper
      const response = await fetch(`${this.baseUrl}/api/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          voice: this.voiceModel,
          language: this.language,
          speakerId: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Piper TTS error: ${response.statusText}`);
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      this.currentAudio = new Audio(audioUrl);
      this.isPlaying = true;

      this.currentAudio.onended = () => {
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        if (onComplete) onComplete();
      };

      this.currentAudio.onerror = (error) => {
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        if (onError) onError('Failed to play audio');
        console.error('Audio playback error:', error);
      };

      this.currentAudio.play().catch((error) => {
        this.isPlaying = false;
        URL.revokeObjectURL(audioUrl);
        if (onError) onError('Failed to play audio');
        console.error('Play error:', error);
      });
    } catch (error) {
      this.isPlaying = false;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (onError) onError(errorMessage);
      console.error('TTS error:', error);
    }
  }

  /**
   * Stop current playback
   */
  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
    }
  }

  /**
   * Pause current playback
   */
  pause(): void {
    if (this.currentAudio && this.isPlaying) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }

  /**
   * Resume playback
   */
  resume(): void {
    if (this.currentAudio && !this.isPlaying) {
      this.currentAudio.play().catch((error) => {
        console.error('Resume error:', error);
      });
      this.isPlaying = true;
    }
  }

  /**
   * Check if currently playing
   */
  getPlayingStatus(): boolean {
    return this.isPlaying;
  }

  /**
   * Set voice model
   */
  setVoiceModel(model: string): void {
    if (!this.isPlaying) {
      this.voiceModel = model;
    } else {
      console.warn('Cannot change voice while playing');
    }
  }

  /**
   * Set language
   */
  setLanguage(language: string): void {
    if (!this.isPlaying) {
      this.language = language;
    } else {
      console.warn('Cannot change language while playing');
    }
  }

  /**
   * Get available voice models (example - customize based on your setup)
   */
  getAvailableVoices(): string[] {
    return [
      'en_US-lessac-medium',
      'en_US-libritts-high',
      'en_US-glow-tts',
      'en_GB-southern_english_female-glow-tts',
      'fr_FR-siwis-medium',
    ];
  }

  /**
   * Check if Piper service is available
   */
  async isServiceAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/voices`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default PiperTTSService;
