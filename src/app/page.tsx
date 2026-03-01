'use client';

import { useEffect, useState } from 'react';
import InterviewFlow from '@/components/InterviewFlow';
import Hero from '@/components/Hero';
import { useInterviewStore } from '@/store/interview';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const session = useInterviewStore((state) => state.session);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {!session ? <Hero /> : <InterviewFlow />}
    </div>
  );
}
