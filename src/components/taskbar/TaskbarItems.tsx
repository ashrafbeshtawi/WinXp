'use client';

import { useWindowStore } from '@/stores/windowStore';

export function TaskbarItems() {
  const windows = useWindowStore((state) => state.windows);
  const highestZIndex = useWindowStore((state) => state.highestZIndex);
  const { focusWindow, restoreWindow, minimizeWindow } = useWindowStore();

  const handleClick = (id: string, isMinimized: boolean, isActive: boolean) => {
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
          <button
            key={win.id}
            onClick={() => handleClick(win.id, win.isMinimized, isActive)}
            className={`h-[22px] px-2 flex items-center gap-1 text-[11px] rounded border min-w-[120px] max-w-[160px] truncate ${
              isActive
                ? 'bg-[#fff] border-[#003c74] shadow-inner'
                : 'bg-gradient-to-b from-[#3c8cff]/30 to-[#1c4cc4]/30 border-[#003c74]/50 text-white'
            }`}
          >
            <span>{win.icon}</span>
            <span className="truncate">{win.title}</span>
          </button>
        );
      })}
    </div>
  );
}
