'use client';

import { useState, useCallback, useEffect } from 'react';
import { useInterviewStore } from '@/store/interview';
import { INTERVIEW_QUESTIONS } from '@/lib/questions';
import { OllamaService } from '@/services/ollama';
import VoiceRecorder from './VoiceRecorder';
import CareerReport from './CareerReport';
import TranscriptDisplay from './TranscriptDisplay';
import ProgressBar from './ProgressBar';

export default function InterviewFlow() {
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [ollamaAvailable, setOllamaAvailable] = useState(true);

  const session = useInterviewStore((state) => state.session);
  const currentQuestionIndex = useInterviewStore((state) => state.currentQuestionIndex);
  const moveToNextQuestion = useInterviewStore((state) => state.moveToNextQuestion);
  const completeSession = useInterviewStore((state) => state.completeSession);
  const resetSession = useInterviewStore((state) => state.resetSession);

  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === INTERVIEW_QUESTIONS.length - 1;

  // Check Ollama availability on component mount
  useEffect(() => {
    const checkOllama = async () => {
      const ollama = new OllamaService();
      const isAvailable = await ollama.isServiceAvailable();
      setOllamaAvailable(isAvailable);
    };
    checkOllama();
  }, []);

  const handleQuestionAnswered = useCallback(async () => {
    if (isLastQuestion) {
      // Generate career report
      completeSession();
      const report = await generateCareerReport();
      setReportData(report);
      setShowReport(true);
    } else {
      moveToNextQuestion();
    }
  }, [isLastQuestion, completeSession, moveToNextQuestion]);

  const generateCareerReport = async () => {
    if (!session) {
      throw new Error('No session found');
    }

    const ollama = new OllamaService();
    
    try {
      // Try to use Ollama if available
      if (ollamaAvailable) {
        const report = await ollama.generateCareerReport(session.answers);
        return report;
      }
    } catch (error) {
      console.error('Error generating report with Ollama:', error);
      console.log('Falling back to mock report');
    }

    // Fallback to mock report
    return {
      sessionId: session.id,
      userId: session.userId,
      generatedAt: Date.now(),
      recommendations: [
        {
          rank: 1 as const,
          career: 'Software Development',
          matchScore: 92,
          reasoning: 'You are analytical, prefer independent work, and enjoy problem solving',
          skillsToLearn: ['Advanced Data Structures', 'System Design', 'Cloud Architecture'],
        },
        {
          rank: 2 as const,
          career: 'Data Analytics',
          matchScore: 85,
          reasoning: 'You are detail-oriented and drawn to patterns and logic',
          skillsToLearn: ['SQL', 'Python/R', 'Tableau/PowerBI'],
        },
        {
          rank: 3 as const,
          career: 'Consulting / Strategy',
          matchScore: 76,
          reasoning: 'You communicate well and thrive in variety',
          skillsToLearn: ['Business Acumen', 'Communication', 'Problem-solving frameworks'],
        },
      ],
      userProfile: {
        strengths: [],
        workStyle: '',
        personality: '',
        motivations: [],
        leadershipApetite: '',
      },
      rawAnswers: session.answers,
    };
  };

  if (showReport && reportData) {
    return (
      <CareerReport
        reportData={reportData}
        onRestart={() => {
          resetSession();
          setShowReport(false);
          setReportData(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Interview</h1>
          <p className="text-gray-600">Share your thoughts, and let's find your perfect career fit</p>
        </div>

        {/* Progress */}
        <ProgressBar current={currentQuestionIndex + 1} total={INTERVIEW_QUESTIONS.length} />

        {/* Main Interview Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          {/* Question */}
          <div className="mb-8">
            <p className="text-sm text-blue-600 font-semibold mb-2">Question {currentQuestionIndex + 1}</p>
            <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion?.question}
            </h2>
          </div>

          {/* Transcript Display */}
          <TranscriptDisplay />

          {/* Voice Recorder */}
          <div className="mt-8">
            <VoiceRecorder onAnswerComplete={handleQuestionAnswered} />
          </div>

          {/* Navigation Info */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            {isLastQuestion ? (
              <p>This is the final question. Your career report will be generated next.</p>
            ) : (
              <p>
                Answer this question, and we'll move to the next one. {INTERVIEW_QUESTIONS.length - currentQuestionIndex - 1} questions remaining.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
