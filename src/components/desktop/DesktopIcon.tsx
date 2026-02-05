'use client';

import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';
import { DesktopItem } from '@/data/desktopItems';

interface DesktopIconProps {
  item: DesktopItem;
}

export function DesktopIcon({ item }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  const handleDoubleClick = () => {
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
    setIsSelected(false);
  };

  return (
    <button
      className={`flex flex-col items-center w-[75px] p-1 rounded cursor-pointer ${
        isSelected ? 'bg-blue-500/50' : 'hover:bg-white/10'
      }`}
      onClick={() => setIsSelected(true)}
      onDoubleClick={handleDoubleClick}
      onBlur={() => setIsSelected(false)}
    >
      <div className="text-4xl mb-1 drop-shadow-lg">{item.icon}</div>
      <span
        className={`text-white text-center text-[11px] leading-tight px-0.5 ${
          isSelected ? 'bg-blue-600' : ''
        }`}
        style={{ textShadow: '1px 1px 1px black' }}
      >
        {item.label}
      </span>
    </button>
  );
}
