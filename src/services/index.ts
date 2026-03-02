/**
 * Services Index
 * Exports all service modules for easy importing
 * 
 * Using open-source stack:
 * - Ollama + Mistral 7B for LLM
 * - Web Speech API for speech-to-text
 * - Piper TTS for text-to-speech
 */

// New open-source services (production)
export { OllamaService } from './ollama';
export { WebSpeechAPIService } from './webspeech';
export { PiperTTSService } from './piper';
