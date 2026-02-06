'use client';

import { useState, useEffect, useRef } from 'react';
import { systemItems, portfolioItems, utilityItems, DesktopItem } from '@/data/desktopItems';
import { useWindowStore } from '@/stores/windowStore';
import { useAudio } from '@/hooks/useAudio';

interface IconPosition {
  id: string;
  x: number;
  y: number;
}

const ICON_WIDTH = 75;
const ICON_HEIGHT = 85;
const GRID_GAP = 5;

// Calculate initial positions - single column for system/utilities, cluster for portfolio
function getInitialPositions(): IconPosition[] {
  const positions: IconPosition[] = [];
  const startX = 10;
  const startY = 10;

  // Column 1: All system + utility items in one vertical column
  const normalItems = [...systemItems, ...utilityItems];
  normalItems.forEach((item, idx) => {
    positions.push({
      id: item.id,
      x: startX,
      y: startY + idx * (ICON_HEIGHT + GRID_GAP),
    });
  });

  // Portfolio cluster to the right (2 columns, beside the normal icons)
  const clusterStartX = startX + ICON_WIDTH + 40; // Gap between normal and portfolio
  const clusterStartY = startY + 25; // Offset for the label

  portfolioItems.forEach((item, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    positions.push({
      id: item.id,
      x: clusterStartX + col * (ICON_WIDTH + GRID_GAP),
      y: clusterStartY + row * (ICON_HEIGHT + GRID_GAP),
    });
  });

  return positions;
}

export function DesktopIcons() {
  const [positions, setPositions] = useState<IconPosition[]>([]);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const openWindow = useWindowStore((state) => state.openWindow);
  const { play } = useAudio();

  // Initialize positions
  useEffect(() => {
    const saved = localStorage.getItem('desktop-icon-positions-v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Make sure all items have positions
        const allIds = [...systemItems, ...portfolioItems, ...utilityItems].map(i => i.id);
        const hasAll = allIds.every(id => parsed.some((p: IconPosition) => p.id === id));
        if (hasAll) {
          setPositions(parsed);
        } else {
          setPositions(getInitialPositions());
        }
      } catch {
        setPositions(getInitialPositions());
      }
    } else {
      setPositions(getInitialPositions());
    }
  }, []);

  // Save positions
  useEffect(() => {
    if (positions.length > 0) {
      localStorage.setItem('desktop-icon-positions-v3', JSON.stringify(positions));
    }
  }, [positions]);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const pos = positions.find((p) => p.id === id);
    if (pos) {
      setDraggedIcon(id);
      setSelectedIcon(id);
      setHasDragged(false);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      setDragOffset({
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      });
      play('click');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedIcon) return;

    // Check if we've moved enough to consider it a drag
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    if (dx > 5 || dy > 5) {
      setHasDragged(true);
    }

    const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - ICON_WIDTH));
    const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - ICON_HEIGHT - 40));

    setPositions((prev) =>
      prev.map((pos) =>
        pos.id === draggedIcon ? { ...pos, x: newX, y: newY } : pos
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedIcon(null);
  };

  const handleDoubleClick = (item: DesktopItem) => {
    if (hasDragged) return;
    play('click');
    openWindow({
      id: item.id + '-' + Date.now(),
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
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  const allItems: DesktopItem[] = [...systemItems, ...portfolioItems, ...utilityItems];

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleDesktopClick}
    >
      {allItems.map((item) => {
        const pos = positions.find((p) => p.id === item.id);
        if (!pos) return null;

        const isPortfolio = portfolioItems.some((p) => p.id === item.id);
        const isSelected = selectedIcon === item.id;
        const isDragging = draggedIcon === item.id;

        return (
          <div
            key={item.id}
            className={`absolute select-none ${isDragging ? 'cursor-grabbing z-50 opacity-80' : 'cursor-grab'}`}
            style={{
              left: pos.x,
              top: pos.y,
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(item.id, e);
            }}
            onDoubleClick={() => handleDoubleClick(item)}
          >
            {/* Highlight background for portfolio items */}
            {isPortfolio && !isDragging && (
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/10 -z-10" />
            )}

            {/* Icon content */}
            <div
              className={`flex flex-col items-center w-[75px] p-1 rounded ${
                isSelected ? 'bg-blue-500/50' : 'hover:bg-white/10'
              }`}
            >
              <div className="w-12 h-12 mb-1 drop-shadow-lg flex items-center justify-center">
                {item.icon.startsWith('/') ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                ) : (
                  <span className="text-4xl">{item.icon}</span>
                )}
              </div>
              <span
                className={`text-white text-center text-[11px] leading-tight px-0.5 w-full ${
                  isSelected ? 'bg-blue-600' : ''
                }`}
                style={{ textShadow: '1px 1px 1px black' }}
              >
                {item.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
