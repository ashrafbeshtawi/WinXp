'use client';

import { useWindowStore } from '@/stores/windowStore';
import { useAudio } from '@/hooks/useAudio';

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
  const { play } = useAudio();

  const handleMaximize = () => {
    play('click');
    if (window?.isMaximized) {
      useWindowStore.getState().restoreWindow(windowId);
    } else {
      maximizeWindow(windowId);
    }
  };

  return (
    <div
      className={`title-bar cursor-move select-none ${!isActive ? 'inactive' : ''}`}
      onMouseDown={onMouseDown}
    >
      <div className="title-bar-text flex items-center gap-1">
        {icon.startsWith('/') ? (
          <img src={icon} alt="" className="w-4 h-4 object-contain" draggable={false} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        )}
        <span className="truncate">{title}</span>
      </div>
      <div className="title-bar-controls">
        <button
          aria-label="Minimize"
          onClick={(e) => {
            e.stopPropagation();
            play('click');
            minimizeWindow(windowId);
          }}
        />
        <button
          aria-label="Maximize"
          onClick={(e) => {
            e.stopPropagation();
            handleMaximize();
          }}
        />
        <button
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            play('click');
            closeWindow(windowId);
          }}
        />
      </div>
    </div>
  );
}
