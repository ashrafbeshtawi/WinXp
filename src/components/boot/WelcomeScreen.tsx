'use client';

import { useState, useEffect } from 'react';
import { useBootStore } from '@/stores/bootStore';
import { useAudio } from '@/hooks/useAudio';

export function WelcomeScreen() {
  const setPhase = useBootStore((state) => state.setPhase);
  const { play } = useAudio();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleLogin = () => {
    play('click');
    setIsLoggingIn(true);
    play('startup');

    setTimeout(() => {
      setPhase('desktop');
    }, 2500);
  };

  return (
    <div className="h-screen w-screen bg-[#5a7edc] flex flex-col overflow-hidden select-none">
      {/* Top gradient bar */}
      <div className="h-16 bg-gradient-to-b from-[#0a246a] via-[#0a246a] to-[#5a7edc]" />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {isLoggingIn ? (
          /* Logging in animation */
          <div className="text-center animate-pulse">
            <div className="text-white text-2xl font-light mb-4">Loading your personal settings...</div>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Login panel */
          <div className="flex flex-col items-center">
            {/* Windows XP style header */}
            <div className="mb-8 text-center">
              <h1 className="text-white text-4xl font-light tracking-wide drop-shadow-lg">
                To begin, click your user name
              </h1>
            </div>

            {/* User card */}
            <div
              onClick={handleLogin}
              onMouseEnter={() => setShowHint(true)}
              onMouseLeave={() => setShowHint(false)}
              className="group cursor-pointer"
            >
              <div className="flex items-center gap-4 bg-gradient-to-r from-[#3d6fc4]/80 to-[#5a8ad4]/80 hover:from-[#4d7fd4]/90 hover:to-[#6a9ae4]/90 border-2 border-white/30 hover:border-white/60 rounded-lg p-4 pr-8 transition-all duration-200 shadow-lg hover:shadow-xl">
                {/* User avatar */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-white/50 shadow-md bg-gradient-to-br from-[#6b9bd1] to-[#4a7ab5]">
                    <img
                      src="/img/User Accounts.png"
                      alt="User"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow" />
                </div>

                {/* User info */}
                <div className="text-white">
                  <div className="text-2xl font-semibold drop-shadow">Ashraf</div>
                  <div className="text-sm text-white/80 mt-1">Senior Developer</div>
                  <div className="text-xs text-white/60 mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Ready</span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="ml-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hint text */}
            <div className={`mt-6 text-white/70 text-sm transition-opacity duration-300 ${showHint ? 'opacity-100' : 'opacity-0'}`}>
              Click to log in and explore my portfolio
            </div>

            {/* Fun facts ticker */}
            <div className="mt-12 max-w-md text-center">
              <div className="text-white/50 text-xs animate-pulse">
                💡 Fun fact: This portfolio was built with Next.js, TypeScript & Tailwind CSS
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="h-24 bg-gradient-to-t from-[#0a246a] via-[#0a246a] to-[#5a7edc] flex items-end justify-between px-8 pb-4">
        {/* Turn off button */}
        <div className="flex items-center gap-2 text-white/80 hover:text-white cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-red-600/80 group-hover:bg-red-500 flex items-center justify-center shadow-lg transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm">Turn off computer</span>
        </div>

        {/* Windows logo and copyright */}
        <div className="text-right">
          <div className="text-white/90 text-lg font-light tracking-wider mb-1">
            <span className="text-red-400">A</span>
            <span className="text-green-400">s</span>
            <span className="text-blue-400">h</span>
            <span className="text-yellow-400">r</span>
            <span className="text-red-400">a</span>
            <span className="text-green-400">f</span>
            <span className="text-white ml-1">OS</span>
          </div>
          <div className="text-white/40 text-xs">Portfolio Edition • Berlin, Germany</div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
    </div>
  );
}
