'use client';

import { useState } from 'react';

interface CareerRecommendation {
  rank: 1 | 2 | 3;
  career: string;
  matchScore: number;
  reasoning: string;
  skillsToLearn: string[];
}

interface CareerReportProps {
  reportData: {
    recommendations: CareerRecommendation[];
  };
  onRestart: () => void;
}

const MEDAL_EMOJI = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};

export default function CareerReport({ reportData, onRestart }: CareerReportProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Your Career Report</h1>
          <p className="text-xl text-gray-600 mb-2">Based on your interview responses</p>
          <p className="text-gray-500">Here are your personalized career recommendations</p>
        </div>

        {/* Recommendations */}
        <div className="space-y-4 mb-12">
          {reportData.recommendations.map((rec, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Main Card */}
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl">{MEDAL_EMOJI[rec.rank]}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{rec.career}</h2>
                      <p className="text-gray-600">{rec.reasoning}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">{rec.matchScore}%</div>
                  <p className="text-sm text-gray-500">Match Score</p>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedIndex === index && (
                <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Why this fits you:</h3>
                    <p className="text-gray-700">{rec.reasoning}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Skills to develop:</h3>
                    <div className="flex flex-wrap gap-2">
                      {rec.skillsToLearn.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">📚 Next Steps</h2>
          <ul className="space-y-2 text-blue-800">
            <li>✓ Explore the top-recommended career path in depth</li>
            <li>✓ Research companies in your preferred industry</li>
            <li>✓ Start building the recommended skills</li>
            <li>✓ Connect with professionals in these fields</li>
            <li>✓ Pursue internships or projects to gain experience</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onRestart}
            className="flex-1 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Interview Again
          </button>
          <button className="flex-1 px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            Download Report (PDF)
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            💡 Remember: This report is based on your interview responses. Your career path may evolve as you gain
            experience and new interests emerge.
          </p>
        </div>
      </div>
    </div>
  );
}
