'use client';

import { useInterviewStore } from '@/store/interview';
import { useCallback } from 'react';

export default function Hero() {
  const initializeSession = useInterviewStore((state) => state.initializeSession);

  const handleStartInterview = useCallback(() => {
    // Generate a simple user ID for now
    const userId = `user_${Date.now()}`;
    initializeSession(userId);
  }, [initializeSession]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            CareerAI
          </h1>
          <p className="text-xl text-gray-600">
            Your AI-Powered Career Counselor
          </p>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get Your Personalized Career Guide
          </h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            No forms. No quizzes. Just a conversation. Our AI listens to you, understands your strengths, 
            and recommends the most suitable career paths for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="font-semibold text-gray-700">Voice Interview</h3>
              <p className="text-sm text-gray-500">Speak naturally</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-700">AI Analysis</h3>
              <p className="text-sm text-gray-500">Smart assessment</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-700">Career Report</h3>
              <p className="text-sm text-gray-500">Detailed insights</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleStartInterview}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
          >
            Start Your Interview
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-gray-600 text-sm">
          <p>Takes about 5-8 minutes • No registration required • Results are instant</p>
        </div>
      </div>
    </div>
  );
}
