'use client';

import { useState } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcons } from './DesktopIcons';
import { Taskbar } from '@/components/taskbar/Taskbar';
import { StartMenu } from '@/components/startmenu/StartMenu';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Wallpaper />
      <div
        className="relative z-10 h-full w-full pb-[30px]"
        onClick={() => setIsStartMenuOpen(false)}
      >
        <DesktopIcons />
        {children}
      </div>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  );
}
