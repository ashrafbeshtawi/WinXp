'use client';

import { useState, useCallback } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcons } from './DesktopIcons';
import { Taskbar } from '@/components/taskbar/Taskbar';
import { StartMenu } from '@/components/startmenu/StartMenu';
import { ContextMenu } from '@/components/contextmenu/ContextMenu';
import { useContextMenuStore } from '@/stores/contextMenuStore';
import { useWindowStore } from '@/stores/windowStore';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const openMenu = useContextMenuStore((state) => state.openMenu);
  const openWindow = useWindowStore((state) => state.openWindow);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      openMenu(e.clientX, e.clientY, [
        {
          label: 'View',
          action: () => {
            openWindow({
              id: 'explorer-' + Date.now(),
              title: 'My Computer',
              icon: '/img/My Computer.png',
              component: 'explorer',
              x: 80 + Math.random() * 100,
              y: 40 + Math.random() * 80,
              width: 700,
              height: 500,
              minWidth: 400,
              minHeight: 300,
              isMinimized: false,
              isMaximized: false,
            });
          },
        },
        {
          label: 'Sort By Name',
          action: () => window.location.reload(),
        },
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
          label: 'New → Folder',
          action: () => {
            openWindow({
              id: 'explorer-docs-' + Date.now(),
              title: 'My Documents',
              icon: '/img/documents.png',
              component: 'explorer-docs',
              x: 120 + Math.random() * 100,
              y: 60 + Math.random() * 80,
              width: 700,
              height: 500,
              minWidth: 400,
              minHeight: 300,
              isMinimized: false,
              isMaximized: false,
            });
          },
        },
        {
          label: 'New → Text Document',
          action: () => {
            openWindow({
              id: 'notepad-' + Date.now(),
              title: 'Untitled - Notepad',
              icon: '/img/Notepad.png',
              component: 'notepad',
              x: 100 + Math.random() * 100,
              y: 50 + Math.random() * 100,
              width: 500,
              height: 400,
              minWidth: 300,
              minHeight: 200,
              isMinimized: false,
              isMaximized: false,
            });
          },
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
          label: 'Paste Shortcut',
          action: () => {},
          disabled: true,
        },
        {
          label: '',
          action: () => {},
          divider: true,
        },
        {
          label: 'Properties',
          action: () => {
            openWindow({
              id: 'contact-' + Date.now(),
              title: 'About Ashraf OS',
              icon: '/img/me.svg',
              component: 'contact',
              x: 150 + Math.random() * 50,
              y: 80 + Math.random() * 50,
              width: 750,
              height: 550,
              minWidth: 500,
              minHeight: 400,
              isMinimized: false,
              isMaximized: false,
            });
          },
        },
      ]);
    },
    [openMenu, openWindow]
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
