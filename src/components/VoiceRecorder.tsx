'use client';

import { useState, useRef, useCallback } from 'react';
import { useInterviewStore } from '@/store/interview';
import { INTERVIEW_QUESTIONS } from '@/lib/questions';

interface VoiceRecorderProps {
  onAnswerComplete: () => void;
}

export default function VoiceRecorder({ onAnswerComplete }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const currentQuestionIndex = useInterviewStore((state) => state.currentQuestionIndex);
  const setTranscript = useInterviewStore((state) => state.setTranscript);
  const addAnswer = useInterviewStore((state) => state.addAnswer);
  const addMessage = useInterviewStore((state) => state.addMessage);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access your microphone. Please check permissions.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsProcessing(true);
    }
  }, [isRecording]);

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Here we would call the Deepgram API or your backend API
      // For now, we'll mock the response
      const mockTranscript =
        'This is a mock transcript. In production, this would be the result from Deepgram speech-to-text API.';

      setTranscript(mockTranscript);

      // Save answer
      const question = INTERVIEW_QUESTIONS[currentQuestionIndex];
      addAnswer({
        questionId: question.id,
        question: question.question,
        answer: mockTranscript,
        timestamp: Date.now(),
        confidence: 0.95,
      });

      // Add message to conversation history
      addMessage({
        role: 'user',
        content: mockTranscript,
        timestamp: Date.now(),
      });

      setIsProcessing(false);

      // Small delay before moving to next question
      setTimeout(() => {
        onAnswerComplete();
      }, 1000);
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsProcessing(false);
      alert('Error processing your response. Please try again.');
    }
  };

  const isDisabled = isRecording || isProcessing;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Recording Button */}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-200 ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 animate-pulse-ring'
            : isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:scale-105'
        }`}
      >
        {isProcessing ? (
          <span className="animate-spin">⏳</span>
        ) : isRecording ? (
          <span>🔴</span>
        ) : (
          <span>🎤</span>
        )}
      </button>

      {/* Status Text */}
      <div className="text-center">
        {isRecording && <p className="text-red-600 font-semibold">Recording... Click to stop</p>}
        {isProcessing && <p className="text-blue-600 font-semibold">Processing your response...</p>}
        {!isRecording && !isProcessing && <p className="text-gray-600">Click the mic to start speaking</p>}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded text-sm text-gray-700">
        <p className="font-semibold text-blue-900 mb-1">💡 Tip:</p>
        <p>Speak naturally and take your time. There's no need to rush your answer.</p>
      </div>
    </div>
  );
}
