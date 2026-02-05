'use client';

import { useEffect } from 'react';
import { useBootStore } from '@/stores/bootStore';

export function BiosScreen() {
  const setPhase = useBootStore((state) => state.setPhase);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('loading');
    }, 1500);
    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="h-screen w-screen bg-black text-white font-mono p-4 text-sm">
      <div className="mb-4">
        <span className="text-gray-400">Ashraf BIOS v1.0</span>
      </div>
      <div className="space-y-1">
        <p>CPU: Creative Problem Solver @ 5+ Years Experience</p>
        <p>Memory: PHP, Symfony, Next.js, Nuxt.js, PostgreSQL, MongoDB</p>
        <p>Languages: German, English, Arabic</p>
        <p className="mt-4">Detecting drives...</p>
        <p>C: Backend Systems</p>
        <p>D: Frontend & 3D Experiences</p>
        <p>E: Web3 & Blockchain</p>
        <p>F: AI & Automation</p>
        <p className="mt-4 text-green-400">All systems ready. Starting Ashraf OS...</p>
      </div>
    </div>
  );
}
