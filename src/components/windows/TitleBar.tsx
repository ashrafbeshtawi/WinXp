'use client';

import { useWindowStore } from '@/stores/windowStore';

interface TitleBarProps {
  windowId: string;
  title: string;
  icon: string;
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function TitleBar({ windowId, title, icon, isActive, onMouseDown }: TitleBarProps) {
  const { minimizeWindow, maximizeWindow, closeWindow } = useWindowStore();
  const window = useWindowStore((state) => state.windows.find((w) => w.id === windowId));

  const handleMaximize = () => {
    if (window?.isMaximized) {
      useWindowStore.getState().restoreWindow(windowId);
    } else {
      maximizeWindow(windowId);
    }
  };

  return (
    <div
      className={`h-[25px] flex items-center justify-between px-1 rounded-t cursor-move select-none ${
        isActive
          ? 'bg-gradient-to-r from-[#0058e6] via-[#3a93ff] to-[#0058e6]'
          : 'bg-gradient-to-r from-[#7a96df] via-[#a8c0ef] to-[#7a96df]'
      }`}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-1 text-white font-bold text-[11px] truncate">
        <span>{icon}</span>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex gap-[2px]">
        <button
          onClick={() => minimizeWindow(windowId)}
          className="w-[21px] h-[21px] rounded-sm bg-gradient-to-b from-[#3c8cff] to-[#1c4cc4] border border-white/30 text-white text-xs flex items-center justify-center hover:brightness-110"
        >
          _
        </button>
        <button
          onClick={handleMaximize}
          className="w-[21px] h-[21px] rounded-sm bg-gradient-to-b from-[#3c8cff] to-[#1c4cc4] border border-white/30 text-white text-xs flex items-center justify-center hover:brightness-110"
        >
          □
        </button>
        <button
          onClick={() => closeWindow(windowId)}
          className="w-[21px] h-[21px] rounded-sm bg-gradient-to-b from-[#ff6b6b] to-[#c43c3c] border border-white/30 text-white text-xs flex items-center justify-center hover:brightness-110"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
