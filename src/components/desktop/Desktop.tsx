'use client';

import { useState, useCallback } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcons } from './DesktopIcons';
import { Taskbar } from '@/components/taskbar/Taskbar';
import { StartMenu } from '@/components/startmenu/StartMenu';
import { ContextMenu } from '@/components/contextmenu/ContextMenu';
import { useContextMenuStore } from '@/stores/contextMenuStore';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const openMenu = useContextMenuStore((state) => state.openMenu);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      openMenu(e.clientX, e.clientY, [
        {
          label: 'Refresh',
          action: () => window.location.reload(),
        },
        {
          label: '',
          action: () => {},
          divider: true,
        },
        {
          label: 'Paste',
          action: () => {},
          disabled: true,
        },
        {
          label: '',
          action: () => {},
          divider: true,
        },
        {
          label: 'New',
          action: () => {},
          disabled: true,
        },
        {
          label: 'Properties',
          action: () => {},
        },
      ]);
    },
    [openMenu]
  );

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Wallpaper />
      <div
        className="relative z-10 h-full w-full pb-[30px]"
        onClick={() => setIsStartMenuOpen(false)}
        onContextMenu={handleContextMenu}
      >
        <DesktopIcons />
        {children}
      </div>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
      <ContextMenu />
    </div>
  );
}
