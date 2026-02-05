'use client';

import { StartButton } from './StartButton';
import { TaskbarItems } from './TaskbarItems';
import { SystemTray } from './SystemTray';

interface TaskbarProps {
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

export function Taskbar({ onStartClick, isStartMenuOpen }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#245edb] to-[#0f3a9c] flex items-center">
      <StartButton isOpen={isStartMenuOpen} onClick={onStartClick} />
      <div className="w-[2px] h-[20px] bg-[#1a4cc4] mx-1" />
      <TaskbarItems />
      <SystemTray />
    </div>
  );
}
