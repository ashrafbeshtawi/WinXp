'use client';

import { useEffect, useState } from 'react';
import { useBootStore } from '@/stores/bootStore';

export function LoadingScreen() {
  const setPhase = useBootStore((state) => state.setPhase);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('welcome'), 200);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [setPhase]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      {/* XP Logo */}
      <div className="mb-8 text-center">
        <div className="text-5xl font-bold mb-2">
          <span className="text-red-500">A</span>
          <span className="text-green-500">s</span>
          <span className="text-blue-500">h</span>
          <span className="text-yellow-500">r</span>
          <span className="text-red-500">a</span>
          <span className="text-green-500">f</span>
          <span className="text-white ml-2">OS</span>
        </div>
        <div className="text-white text-lg tracking-widest">Professional Edition</div>
      </div>

      {/* Loading bar */}
      <div className="w-64 h-6 bg-[#1a1a2e] rounded-sm border border-[#2a2a4e] overflow-hidden">
        <div className="h-full flex gap-1 p-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`h-full w-2 rounded-sm transition-colors duration-100 ${
                i < Math.floor(progress / 5) ? 'bg-blue-500' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-white mt-4 text-sm">Starting Ashraf OS...</p>
    </div>
  );
}
