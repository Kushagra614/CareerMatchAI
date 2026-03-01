'use client';

import { useInterviewStore } from '@/store/interview';

export default function TranscriptDisplay() {
  const transcript = useInterviewStore((state) => state.transcript);

  return (
    <div className="bg-gray-50 rounded-lg p-6 min-h-32 border-2 border-gray-200">
      {transcript ? (
        <p className="text-gray-800 leading-relaxed">{transcript}</p>
      ) : (
        <p className="text-gray-400 italic">Your transcript will appear here as you speak...</p>
      )}
    </div>
  );
}
