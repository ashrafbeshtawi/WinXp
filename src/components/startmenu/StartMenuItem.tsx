'use client';

import { useAudio } from '@/hooks/useAudio';

interface StartMenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  hasArrow?: boolean;
}

export function StartMenuItem({ icon, label, onClick, hasArrow }: StartMenuItemProps) {
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
      className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#2f71cd] hover:text-white text-[11px] text-left cursor-pointer"
    >
      <span className="w-6 h-6 flex items-center justify-center">
        {icon.startsWith('/') ? (
          <img src={icon} alt={label} className="w-5 h-5 object-contain" draggable={false} />
        ) : (
          <span className="text-lg">{icon}</span>
        )}
      </span>
      <span className="flex-1">{label}</span>
      {hasArrow && <span className="text-[10px]">&#9654;</span>}
    </div>
  );
}
