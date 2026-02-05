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
      style={{ zIndex: 9999 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* User banner */}
      <div className="h-[54px] bg-gradient-to-r from-[#1c5bc4] to-[#3c8cff] flex items-center px-3 rounded-tr-lg">
        <div className="w-12 h-12 bg-white rounded overflow-hidden flex items-center justify-center border-2 border-white shadow">
          <img src="/img/me.svg" alt="Ashraf Beshtawi" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-bold ml-2">Ashraf Beshtawi</span>
      </div>

      <div className="flex min-h-[300px]">
        {/* Left column - quick access */}
        <div className="w-[190px] bg-white py-2 border-r border-[#d3d3d3]">
          <StartMenuItem icon="/img/Internet Explorer 6.png" label="Internet Explorer" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'ie')!)} />
          <StartMenuItem icon="/img/me.svg" label="Contact Me" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'contact')!)} />
          <StartMenuItem icon="/img/Notepad.png" label="Notepad" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'notepad')!)} />
          <div className="border-t border-[#d3d3d3] my-2" />
          <StartMenuItem icon="/img/frontend.svg" label="Frontend.exe" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'frontend')!)} />
          <StartMenuItem icon="/img/backend.svg" label="Backend.exe" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'backend')!)} />
          <StartMenuItem icon="/img/web3.svg" label="Web3.exe" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'web3')!)} />
          <StartMenuItem icon="/img/ai.svg" label="AI.exe" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'ai')!)} />
          <div className="flex-1" />
          <div className="border-t border-[#d3d3d3] my-2" />
          <div className="relative">
            <StartMenuItem
              icon="/img/Folder Closed.png"
              label="All Programs"
              onClick={() => setShowAllPrograms(!showAllPrograms)}
              hasArrow
            />
            {showAllPrograms && (
              <div className="absolute left-full top-0 w-[200px] bg-white border border-[#0055e5] shadow-lg py-1">
                {desktopItems.map((item) => (
                  <StartMenuItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => handleOpenApp(item)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column - system */}
        <div className="w-[190px] bg-[#d3e5fa] py-2 flex flex-col">
          <StartMenuItem icon="/img/My Computer.png" label="My Computer" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-computer')!)} />
          <StartMenuItem icon="/img/documents.png" label="My Documents" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-documents')!)} />
          <StartMenuItem icon="/img/My Network Places.png" label="My Network Places" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-computer')!)} />
          <div className="border-t border-[#d3d3d3] my-2" />
          <StartMenuItem icon="/img/Minesweeper.png" label="Minesweeper" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'minesweeper')!)} />
          <StartMenuItem icon="/img/Recycle Bin (empty).png" label="Recycle Bin" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'recycle-bin')!)} />
          <div className="flex-1" />
          <div className="border-t border-[#d3d3d3] my-2" />
          <StartMenuItem icon="/img/Help and Support.png" label="Help and Support" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'contact')!)} />
        </div>
      </div>

      {/* Shutdown bar */}
      <div className="h-[32px] bg-gradient-to-r from-[#3c8cff] to-[#1c5bc4] flex items-center justify-end px-3">
        <div
          role="button"
          tabIndex={0}
          onClick={handleShutdown}
          onKeyDown={(e) => e.key === 'Enter' && handleShutdown()}
          className="flex items-center gap-1 text-white text-[11px] hover:bg-white/20 px-2 py-1 rounded cursor-pointer"
        >
          <span>&#128308;</span>
          <span>Shut Down</span>
        </div>
      </div>
    </div>
  );
}
