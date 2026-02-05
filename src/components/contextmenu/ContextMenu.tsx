'use client';

import { useEffect, useRef } from 'react';
import { useContextMenuStore } from '@/stores/contextMenuStore';
import { useAudio } from '@/hooks/useAudio';

export function ContextMenu() {
  const { isOpen, x, y, items, closeMenu } = useContextMenuStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const { play } = useAudio();

  useEffect(() => {
    const handleClick = () => closeMenu();
    if (isOpen) {
      document.addEventListener('click', handleClick);
    }
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen, closeMenu]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#f6f6f6] border border-[#919b9c] shadow-md py-1 z-[9999] min-w-[150px]"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) =>
        item.divider ? (
          <div key={index} className="border-t border-[#919b9c] my-1" />
        ) : (
          <div
            key={index}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            onClick={() => {
              if (!item.disabled) {
                play('click');
                item.action();
                closeMenu();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !item.disabled) {
                item.action();
                closeMenu();
              }
            }}
            className={`w-full text-left px-6 py-[2px] text-[11px] cursor-default ${
              item.disabled
                ? 'text-gray-400'
                : 'hover:bg-[#316ac5] hover:text-white'
            }`}
          >
            {item.label}
          </div>
        )
      )}
    </div>
  );
}
