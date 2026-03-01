/**
 * Web Speech API Service
 * 
 * Browser-native speech recognition for voice input
 * No external dependencies, completely free, runs in browser
 * Docs: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
 */

interface SpeechRecognitionConfig {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

interface TranscriptResult {
  text: string;
  isFinal: boolean;
  confidence: number;
}

type RecognitionCallback = (result: TranscriptResult) => void;
type ErrorCallback = (error: string) => void;
type EndCallback = () => void;

// Declare Web Speech API types for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class WebSpeechAPIService {
  private recognition: any = null;
  private isListening = false;
  private transcript = '';
  private isFinal = false;

  constructor(config: SpeechRecognitionConfig = {}) {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Web Speech API not supported in this browser');
      return;
    }

    this.recognition = new SpeechRecognition();
    
    // Configure recognition
    this.recognition.language = config.language || 'en-US';
    this.recognition.continuous = config.continuous ?? false;
    this.recognition.interimResults = config.interimResults ?? true;
  }

  /**
   * Start listening for speech
   * @param onResult - Callback for transcript updates
   * @param onError - Callback for errors
   * @param onEnd - Callback when listening ends
   */
  startListening(
    onResult: RecognitionCallback,
    onError: ErrorCallback,
    onEnd: EndCallback
  ): void {
    if (!this.recognition) {
      onError('Web Speech API not supported');
      return;
    }

    if (this.isListening) {
      console.warn('Already listening');
      return;
    }

    this.isListening = true;
    this.transcript = '';
    this.isFinal = false;

    // Handle results
    this.recognition.onresult = (event: any) => {
      this.transcript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        this.transcript += transcript;
        this.isFinal = event.results[i].isFinal;
      }

      onResult({
        text: this.transcript,
        isFinal: this.isFinal,
        confidence: this.getConfidence(event),
      });
    };

    // Handle errors
    this.recognition.onerror = (event: any) => {
      const errorMessage = this.mapErrorToMessage(event.error);
      onError(errorMessage);
    };

    // Handle end
    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      this.isListening = false;
      onError('Failed to start listening');
    }
  }

  /**
   * Stop listening
   */
  stopListening(): void {
    if (!this.recognition || !this.isListening) {
      return;
    }

    this.recognition.stop();
    this.isListening = false;
  }

  /**
   * Abort listening
   */
  abort(): void {
    if (!this.recognition) {
      return;
    }

    this.recognition.abort();
    this.isListening = false;
  }

  /**
   * Get confidence score from recognition event
   */
  private getConfidence(event: any): number {
    if (event.results.length === 0) {
      return 0;
    }

    const lastResult = event.results[event.results.length - 1];
    if (!lastResult || !lastResult[0]) {
      return 0;
    }

    return Math.round(lastResult[0].confidence * 100);
  }

  /**
   * Map Web Speech API errors to user-friendly messages
   */
  private mapErrorToMessage(error: string): string {
    const errorMessages: Record<string, string> = {
      'no-speech': 'No speech was detected. Please try again.',
      'audio-capture': 'No microphone found. Please check your audio input device.',
      'network': 'Network error. Please check your internet connection.',
      'aborted': 'Speech recognition was aborted.',
      'service-not-allowed': 'Speech recognition service is not allowed.',
      'bad-grammar': 'Grammar error in speech recognition setup.',
      'not-allowed': 'Microphone permission denied. Please allow access to your microphone.',
    };

    return errorMessages[error] || `An error occurred: ${error}`;
  }

  /**
   * Check if Web Speech API is supported
   */
  isSupported(): boolean {
    return this.recognition !== null;
  }

  /**
   * Check if currently listening
   */
  getListeningStatus(): boolean {
    return this.isListening;
  }

  /**
   * Set language
   */
  setLanguage(language: string): void {
    if (this.recognition) {
      this.recognition.language = language;
    }
  }

  /**
   * Get current transcript
   */
  getTranscript(): string {
    return this.transcript;
  }

  /**
   * Clear transcript
   */
  clearTranscript(): void {
    this.transcript = '';
    this.isFinal = false;
  }
}

export default WebSpeechAPIService;
