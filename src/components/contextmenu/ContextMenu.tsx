'use client';

import { useEffect, useRef } from 'react';
import { useContextMenuStore } from '@/stores/contextMenuStore';

export function ContextMenu() {
  const { isOpen, x, y, items, closeMenu } = useContextMenuStore();
  const menuRef = useRef<HTMLDivElement>(null);

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
      className="fixed bg-white border border-[#919b9c] shadow-md py-1 z-[9999] min-w-[150px]"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) =>
        item.divider ? (
          <div key={index} className="border-t border-[#919b9c] my-1" />
        ) : (
          <button
            key={index}
            onClick={() => {
              if (!item.disabled) {
                item.action();
                closeMenu();
              }
            }}
            className={`w-full text-left px-4 py-1 text-[11px] ${
              item.disabled
                ? 'text-gray-400 cursor-default'
                : 'hover:bg-[#316ac5] hover:text-white'
            }`}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        )
      )}
    </div>
  );
}
