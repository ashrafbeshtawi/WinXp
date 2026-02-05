'use client';

import { useState, useEffect } from 'react';

interface SecretProjectAppProps {
  projectName: string;
  projectDescription: string;
}

const CORRECT_PASSWORD = 'i want to hire ashraf';
const LINKEDIN_URL = 'https://www.linkedin.com/in/ashraf-beshtawi-1308a11a8/';

function Firework({ x, y }: { x: number; y: number }) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00'];
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: (i * 30) * Math.PI / 180,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 0.2,
  }));

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-firework"
          style={{
            backgroundColor: p.color,
            '--tx': `${Math.cos(p.angle) * 100}px`,
            '--ty': `${Math.sin(p.angle) * 100}px`,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function SecretProjectApp({ projectName, projectDescription }: SecretProjectAppProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === CORRECT_PASSWORD) {
      setIsUnlocked(true);
      setError('');
      setShowConfetti(true);
      // Start fireworks
      launchFireworks();
    } else {
      setError('Access Denied - Incorrect Password');
      setPassword('');
    }
  };

  const launchFireworks = () => {
    let count = 0;
    const interval = setInterval(() => {
      const newFirework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 400 + 50,
        y: Math.random() * 200 + 50,
      };
      setFireworks(prev => [...prev, newFirework]);

      // Remove old fireworks
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id));
      }, 1500);

      count++;
      if (count > 20) clearInterval(interval);
    }, 300);
  };

  if (!isUnlocked) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#e94560] to-[#ff6b6b] p-4 flex items-center gap-3">
          <img src="/img/Lock.png" alt="Locked" className="w-8 h-8" />
          <div>
            <h1 className="font-bold text-lg">TOP SECRET</h1>
            <p className="text-xs opacity-80">Classified Project File</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-[#0f0f23] border-2 border-[#e94560] rounded-lg p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <img src="/img/Security Alert.png" alt="Security" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-[#e94560] mb-2">{projectName}</h2>
              <p className="text-gray-400 text-sm">{projectDescription}</p>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <p className="text-center text-yellow-400 text-sm mb-4">
                This file is password protected
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-2">Enter Password:</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-gray-600 rounded px-3 py-2 text-black focus:border-[#e94560] focus:outline-none"
                    placeholder="Password required..."
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="bg-red-900/50 border border-red-500 rounded p-2 mb-4 text-center text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:from-[#ff6b6b] hover:to-[#e94560] text-white font-bold py-2 px-4 rounded transition-all"
                >
                  UNLOCK FILE
                </button>
              </form>

              <p className="text-center text-gray-500 text-xs mt-4">
                Hint: What would you say to work with Ashraf?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked state - Celebration!
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Fireworks */}
      {fireworks.map(fw => (
        <Firework key={fw.id} x={fw.x} y={fw.y} />
      ))}

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#e94560', '#00ff00', '#ffff00', '#00ffff', '#ff00ff', '#ff8800'][Math.floor(Math.random() * 6)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-[#00b894] to-[#00cec9] p-4 flex items-center gap-3 relative z-10">
        <span className="text-3xl">🎉</span>
        <div>
          <h1 className="font-bold text-lg">ACCESS GRANTED!</h1>
          <p className="text-xs opacity-80">Welcome, Future Colleague!</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="bg-[#1a1a2e]/90 border-2 border-[#00b894] rounded-lg p-8 max-w-md w-full shadow-2xl backdrop-blur">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="text-2xl font-bold text-[#00b894] mb-2">Congratulations!</h2>
            <p className="text-gray-300">You've unlocked the secret!</p>
          </div>

          <div className="bg-[#0f0f23] rounded-lg p-4 mb-6">
            <p className="text-center text-lg mb-2">
              <span className="text-yellow-400">Project:</span> {projectName}
            </p>
            <p className="text-center text-gray-400 text-sm">
              {projectDescription}
            </p>
            <p className="text-center text-[#00b894] mt-4 text-sm">
              Status: <span className="font-bold">Coming Soon™</span>
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-300 mb-4">
              If you want to hire me, let's connect!
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005885] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-xs p-4 relative z-10">
        Thanks for exploring Ashraf OS! 🚀
      </div>
    </div>
  );
}
