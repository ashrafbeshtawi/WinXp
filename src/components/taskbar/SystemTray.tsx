'use client';

import { useState, useEffect } from 'react';
import { useAudioStore } from '@/stores/audioStore';
import { useAudio } from '@/hooks/useAudio';

export function SystemTray() {
  const { isMuted, toggleMute } = useAudioStore();
  const { play } = useAudio();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    // Play click sound before toggling (so it plays if unmuted)
    if (!isMuted) {
      play('click');
    }
    toggleMute();
    // Play click after unmuting
    if (isMuted) {
      setTimeout(() => play('click'), 50);
    }
  };

  return (
    <div className="h-full flex items-center gap-2 px-2 bg-gradient-to-b from-[#0f4bc4] to-[#0b3a9c] border-l border-[#0055e5]/50">
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggleMute}
        onKeyDown={(e) => e.key === 'Enter' && handleToggleMute()}
        className="hover:bg-white/10 p-0.5 rounded cursor-pointer"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        <img
          src={isMuted ? '/img/Mute.png' : '/img/Volume.png'}
          alt={isMuted ? 'Muted' : 'Volume'}
          className="w-4 h-4 object-contain"
          draggable={false}
        />
      </div>
      <div className="text-white text-[11px] min-w-[55px] text-center">{time}</div>
    </div>
  );
}
