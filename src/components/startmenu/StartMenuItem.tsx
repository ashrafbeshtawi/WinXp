'use client';

interface StartMenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  hasArrow?: boolean;
}

export function StartMenuItem({ icon, label, onClick, hasArrow }: StartMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#2f71cd] hover:text-white text-[11px] text-left"
    >
      <span className="text-lg w-6 text-center">{icon}</span>
      <span className="flex-1">{label}</span>
      {hasArrow && <span className="text-[10px]">&#9654;</span>}
    </button>
  );
}
