'use client';

import { useEffect } from 'react';
import { useBootStore } from '@/stores/bootStore';
import { useAudio } from '@/hooks/useAudio';

export function WelcomeScreen() {
  const setPhase = useBootStore((state) => state.setPhase);
  const { play } = useAudio();

  useEffect(() => {
    // Play startup sound when welcome screen appears
    play('startup');

    const timer = setTimeout(() => {
      setPhase('desktop');
    }, 1500);
    return () => clearTimeout(timer);
  }, [setPhase, play]);

  return (
    <div className="h-screen w-screen bg-[#5a7edc] flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-4xl">
          👨‍💻
        </div>
        <h1 className="text-white text-3xl font-light tracking-wide">Welcome</h1>
      </div>
    </div>
  );
}
