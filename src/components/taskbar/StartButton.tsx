'use client';

import { useAudio } from '@/hooks/useAudio';

interface StartButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function StartButton({ isOpen, onClick }: StartButtonProps) {
  const { play } = useAudio();

  const handleClick = () => {
    play('click');
    onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`h-full px-4 flex items-center gap-2 rounded-r-xl font-bold text-white cursor-pointer select-none ${
        isOpen
          ? 'bg-gradient-to-b from-[#2a6e2a] to-[#1a4e1a] shadow-inner'
          : 'bg-gradient-to-b from-[#3c8f3c] to-[#2a6e2a] hover:from-[#4aa34a] hover:to-[#3c8f3c]'
      }`}
      style={{
        boxShadow: isOpen
          ? 'inset 1px 1px 3px rgba(0,0,0,0.4)'
          : '1px 1px 1px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
    >
      <img
        src="/img/Taskbar and Start Menu.png"
        alt="Start"
        className="w-7 h-7 object-contain"
        draggable={false}
      />
      <span className="italic tracking-wide text-[17px]" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.3)' }}>start</span>
    </div>
  );
}
