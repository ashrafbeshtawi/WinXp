'use client';

import { useWindowStore } from '@/stores/windowStore';
import { useAudio } from '@/hooks/useAudio';

export function TaskbarItems() {
  const windows = useWindowStore((state) => state.windows);
  const highestZIndex = useWindowStore((state) => state.highestZIndex);
  const { focusWindow, restoreWindow, minimizeWindow } = useWindowStore();
  const { play } = useAudio();

  const handleClick = (id: string, isMinimized: boolean, isActive: boolean) => {
    play('click');
    if (isMinimized) {
      restoreWindow(id);
    } else if (isActive) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="flex-1 flex items-center gap-1 px-2 overflow-x-auto">
      {windows.map((win) => {
        const isActive = win.zIndex === highestZIndex && !win.isMinimized;
        return (
          <div
            role="button"
            tabIndex={0}
            key={win.id}
            onClick={() => handleClick(win.id, win.isMinimized, isActive)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(win.id, win.isMinimized, isActive)}
            className={`h-[22px] px-2 flex items-center gap-1 text-[11px] rounded border min-w-[120px] max-w-[160px] truncate cursor-pointer ${
              isActive
                ? 'bg-gradient-to-b from-[#1c5bc4] to-[#0a3a8c] border-[#003c74] shadow-inner text-white'
                : 'bg-gradient-to-b from-[#3c8cff]/30 to-[#1c4cc4]/30 border-[#003c74]/50 text-white'
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center">
              {win.icon.startsWith('/') ? (
                <img src={win.icon} alt="" className="w-4 h-4 object-contain" draggable={false} />
              ) : (
                win.icon
              )}
            </span>
            <span className="truncate">{win.title}</span>
          </div>
        );
      })}
    </div>
  );
}
