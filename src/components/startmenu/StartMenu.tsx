'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { useBootStore } from '@/stores/bootStore';
import { desktopItems } from '@/data/desktopItems';
import { StartMenuItem } from './StartMenuItem';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StartMenu({ isOpen, onClose }: StartMenuProps) {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);
  const setPhase = useBootStore((state) => state.setPhase);

  if (!isOpen) return null;

  const handleOpenApp = (item: typeof desktopItems[0]) => {
    openWindow({
      id: item.id,
      title: item.label.replace('.exe', ''),
      icon: item.icon,
      component: item.component,
      x: 100 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      width: item.width || 600,
      height: item.height || 400,
      minWidth: item.minWidth || 300,
      minHeight: item.minHeight || 200,
      isMinimized: false,
      isMaximized: false,
    });
    onClose();
    setShowAllPrograms(false);
  };

  const handleShutdown = () => {
    onClose();
    setPhase('bios');
  };

  return (
    <div
      className="absolute bottom-[30px] left-0 w-[380px] bg-[#dce4f9] border border-[#0055e5] rounded-tr-lg shadow-xl z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User banner */}
      <div className="h-[54px] bg-gradient-to-r from-[#1c5bc4] to-[#3c8cff] flex items-center px-3 rounded-tr-lg">
        <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center text-2xl">
          &#128104;&#8205;&#128187;
        </div>
        <span className="text-white font-bold ml-2">Ashraf Beshtawi</span>
      </div>

      <div className="flex">
        {/* Left column - quick access */}
        <div className="w-[190px] bg-white py-1 border-r border-[#d3d3d3]">
          <StartMenuItem icon="&#127760;" label="Internet Explorer" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'ie')!)} />
          <StartMenuItem icon="&#9993;&#65039;" label="Outlook Express" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'contact')!)} />
          <StartMenuItem icon="&#128193;" label="My Documents" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-documents')!)} />
          <div className="border-t border-[#d3d3d3] my-1" />
          <div className="relative">
            <StartMenuItem
              icon="&#128194;"
              label="All Programs"
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              hasArrow
            />
            {showAllPrograms && (
              <div className="absolute left-full top-0 w-[180px] bg-white border border-[#0055e5] shadow-lg py-1">
                {desktopItems.map((item) => (
                  <StartMenuItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => handleOpenApp(item)}
                  />
                ))}
                <div className="border-t border-[#d3d3d3] my-1" />
                <StartMenuItem icon="&#128221;" label="Notepad" onClick={() => handleOpenApp({ id: 'notepad', label: 'Notepad', icon: '&#128221;', component: 'notepad', width: 500, height: 400 })} />
                <StartMenuItem icon="&#128163;" label="Minesweeper" onClick={() => handleOpenApp({ id: 'minesweeper', label: 'Minesweeper', icon: '&#128163;', component: 'minesweeper', width: 280, height: 380, minWidth: 280, minHeight: 380 })} />
              </div>
            )}
          </div>
        </div>

        {/* Right column - system */}
        <div className="w-[190px] bg-[#d3e5fa] py-1">
          <StartMenuItem icon="&#128421;&#65039;" label="My Computer" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-computer')!)} />
          <StartMenuItem icon="&#128193;" label="My Documents" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-documents')!)} />
        </div>
      </div>

      {/* Shutdown bar */}
      <div className="h-[32px] bg-gradient-to-r from-[#3c8cff] to-[#1c5bc4] flex items-center justify-end px-3">
        <button
          onClick={handleShutdown}
          className="flex items-center gap-1 text-white text-[11px] hover:bg-white/20 px-2 py-1 rounded"
        >
          <span>&#128308;</span>
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}
