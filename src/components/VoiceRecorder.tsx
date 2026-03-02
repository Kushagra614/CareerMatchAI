'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useInterviewStore } from '@/store/interview';
import { INTERVIEW_QUESTIONS } from '@/lib/questions';
import { WebSpeechAPIService } from '@/services/webspeech';

interface VoiceRecorderProps {
  onAnswerComplete: () => void;
}

export default function VoiceRecorder({ onAnswerComplete }: VoiceRecorderProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const speechServiceRef = useRef<WebSpeechAPIService | null>(null);

  const currentQuestionIndex = useInterviewStore((state) => state.currentQuestionIndex);
  const setTranscript = useInterviewStore((state) => state.setTranscript);
  const addAnswer = useInterviewStore((state) => state.addAnswer);
  const addMessage = useInterviewStore((state) => state.addMessage);

  // Initialize Web Speech API service
  useEffect(() => {
    speechServiceRef.current = new WebSpeechAPIService({
      language: 'en-US',
      continuous: true,
      interimResults: true,
    });

    if (!speechServiceRef.current.isSupported()) {
      console.warn('Web Speech API is not supported in your browser');
    }

    return () => {
      if (speechServiceRef.current) {
        speechServiceRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!speechServiceRef.current || !speechServiceRef.current.isSupported()) {
      alert('Web Speech API not supported in your browser');
      return;
    }

    setIsListening(true);
    setTranscriptText('');
    setConfidence(0);

    speechServiceRef.current.clearTranscript();

    speechServiceRef.current.startListening(
      // onResult callback
      (result) => {
        setTranscriptText(result.text);
        setConfidence(result.confidence);
        setTranscript(result.text);
      },
      // onError callback
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      },
      // onEnd callback
      () => {
        setIsListening(false);
        if (transcriptText.trim().length > 0) {
          processTranscript(transcriptText);
        }
      }
    );
  }, [transcriptText, setTranscript]);

  const stopListening = useCallback(() => {
    if (speechServiceRef.current) {
      speechServiceRef.current.stopListening();
      setIsListening(false);
    }
  }, []);

  const processTranscript = async (finalTranscript: string) => {
    if (!finalTranscript || finalTranscript.trim().length === 0) {
      console.log('No speech detected');
      return;
    }

    try {
      setIsProcessing(true);

      // Save answer
      const question = INTERVIEW_QUESTIONS[currentQuestionIndex];
      addAnswer({
        questionId: question.id,
        question: question.question,
        answer: finalTranscript,
        timestamp: Date.now(),
        confidence: confidence / 100,
      });

      // Add message to conversation history
      addMessage({
        role: 'user',
        content: finalTranscript,
        timestamp: Date.now(),
      });

      // Call onAnswerComplete after processing
      setTimeout(() => {
        setIsProcessing(false);
        onAnswerComplete();
      }, 500);
    } catch (error) {
      console.error('Error processing transcript:', error);
      setIsProcessing(false);
    }
  };

  const isDisabled = isListening || isProcessing;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Recording Button */}
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={isProcessing}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-200 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
            : isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105'
        }`}
      >
        {isProcessing ? (
          <span className="animate-spin">⏳</span>
        ) : isListening ? (
          <span>🎤</span>
        ) : (
          <span>🎤</span>
        )}
      </button>

      {/* Status Text */}
      <div className="text-center">
        {isListening && <p className="text-red-600 font-semibold">Listening... Click to stop</p>}
        {isProcessing && <p className="text-blue-600 font-semibold">Processing your response...</p>}
        {!isListening && !isProcessing && <p className="text-gray-600">Click the mic to start speaking</p>}
      </div>

      {/* Confidence Display */}
      {transcriptText && (
        <div className="w-full max-w-md">
          <p className="text-sm text-gray-700 mb-2">
            Confidence: <span className="font-semibold">{confidence}%</span>
          </p>
          <p className="text-sm text-gray-800 italic">"{transcriptText}"</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-1">💡 Tip:</p>
        <p>Speak naturally and take your time. There's no need to rush your answer.</p>
      </div>
    </div>
  );
}
