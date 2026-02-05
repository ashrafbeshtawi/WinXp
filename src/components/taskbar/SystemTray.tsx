'use client';

import { useState, useEffect } from 'react';
import { useAudioStore } from '@/stores/audioStore';

export function SystemTray() {
  const { isMuted, toggleMute } = useAudioStore();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center gap-2 px-2 bg-gradient-to-b from-[#0f4bc4] to-[#0b3a9c] border-l border-[#0055e5]/50">
      <button
        onClick={toggleMute}
        className="text-white hover:bg-white/10 p-1 rounded"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <div className="text-white text-[11px] min-w-[55px] text-center">{time}</div>
    </div>
  );
}
