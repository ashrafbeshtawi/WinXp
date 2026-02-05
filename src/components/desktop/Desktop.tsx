'use client';

import { Wallpaper } from './Wallpaper';
import { DesktopIcons } from './DesktopIcons';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Wallpaper />
      <div className="relative z-10 h-full w-full pb-[30px]">
        <DesktopIcons />
        {children}
      </div>
    </div>
  );
}
