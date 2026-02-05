'use client';

interface StartButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function StartButton({ isOpen, onClick }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-full px-2 flex items-center gap-1 rounded-r-lg font-bold text-white text-[11px] ${
        isOpen
          ? 'bg-gradient-to-b from-[#2a6e2a] to-[#1a4e1a]'
          : 'bg-gradient-to-b from-[#3c8f3c] to-[#2a6e2a] hover:from-[#4aa34a] hover:to-[#3c8f3c]'
      }`}
    >
      <span className="text-lg">🪟</span>
      <span className="italic">start</span>
    </button>
  );
}
