/**
 * Services Index
 * Exports all service modules for easy importing
 * 
 * Updated to use open-source stack:
 * - Ollama + Mistral 7B (instead of Claude)
 * - Web Speech API (instead of Deepgram)
 * - Piper TTS (instead of ElevenLabs)
 */

// Original services (kept for reference, not used in current setup)
export { DeepgramService, initDeepgram, getDeepgramService } from './deepgram';
export { ElevenLabsService, initElevenLabs, getElevenLabsService } from './elevenlabs';
export { ClaudeService, initClaude, getClaudeService } from './claude';

// New open-source services
export { OllamaService } from './ollama';
export { WebSpeechAPIService } from './webspeech';
export { PiperTTSService } from './piper';
