'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useWindowStore, WindowState } from '@/stores/windowStore';
import { TitleBar } from './TitleBar';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  children: React.ReactNode;
}

export function Window({ window: win, isActive, children }: WindowProps) {
  const { focusWindow, updateWindowPosition, updateWindowSize } = useWindowStore();
  const windowRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeDir = useRef('');
  const dragOffset = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleMouseDown = () => {
    focusWindow(win.id);
  };

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized) return;
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    };
    e.preventDefault();
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (win.isMaximized) return;
    isResizing.current = true;
    resizeDir.current = direction;
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      w: win.width,
      h: win.height,
    };
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging.current) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.current.x, globalThis.innerWidth - 100));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.current.y, globalThis.innerHeight - 60));
        updateWindowPosition(win.id, newX, newY);
      }
      if (isResizing.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        let newW = startPos.current.w;
        let newH = startPos.current.h;

        if (resizeDir.current.includes('e')) newW = Math.max(win.minWidth, startPos.current.w + dx);
        if (resizeDir.current.includes('w')) newW = Math.max(win.minWidth, startPos.current.w - dx);
        if (resizeDir.current.includes('s')) newH = Math.max(win.minHeight, startPos.current.h + dy);
        if (resizeDir.current.includes('n')) newH = Math.max(win.minHeight, startPos.current.h - dy);

        updateWindowSize(win.id, newW, newH);

        if (resizeDir.current.includes('w')) {
          updateWindowPosition(win.id, startPos.current.x + (startPos.current.w - newW) + win.x - startPos.current.x, win.y);
        }
        if (resizeDir.current.includes('n')) {
          updateWindowPosition(win.id, win.x, startPos.current.y + (startPos.current.h - newH) + win.y - startPos.current.y);
        }
      }
    },
    [win, updateWindowPosition, updateWindowSize]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    isResizing.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (win.isMinimized) return null;

  const style = win.isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 30px)', zIndex: win.zIndex }
    : { top: win.y, left: win.x, width: win.width, height: win.height, zIndex: win.zIndex };

  return (
    <div
      ref={windowRef}
      className="absolute flex flex-col bg-[#ece9d8] border border-[#0055e5] rounded-t shadow-xl"
      style={style}
      onMouseDown={handleMouseDown}
    >
      <TitleBar
        windowId={win.id}
        title={win.title}
        icon={win.icon}
        isActive={isActive}
        onMouseDown={handleTitleMouseDown}
      />
      <div className="flex-1 overflow-auto bg-white border-t-0">{children}</div>

      {/* Resize handles */}
      {!win.isMaximized && (
        <>
          <div className="absolute top-0 left-0 w-1 h-full cursor-ew-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'w')} />
          <div className="absolute top-0 right-0 w-1 h-full cursor-ew-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'e')} />
          <div className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize" onMouseDown={(e) => handleResizeMouseDown(e, 's')} />
          <div className="absolute top-0 left-0 w-full h-1 cursor-ns-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'n')} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'se')} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'sw')} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'ne')} />
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize" onMouseDown={(e) => handleResizeMouseDown(e, 'nw')} />
        </>
      )}
    </div>
  );
}
