# WinXP WebOS Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Windows XP-style web operating system portfolio showcasing Ashraf's projects as themed executable programs.

**Architecture:** Component-based React architecture with Zustand for global state (windows, audio). Boot sequence leads to interactive desktop with draggable windows, taskbar, and start menu. Each portfolio item is a uniquely styled "app".

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Zustand, Howler.js

---

## Phase 1: Foundation & Boot Sequence

### Task 1: Project Setup & Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `public/wallpaper/bliss.jpg` (download XP wallpaper)
- Create: `public/sounds/startup.mp3`
- Create: `public/sounds/click.mp3`
- Create: `public/sounds/error.mp3`

**Step 1: Download XP assets**

Download the Bliss wallpaper and XP sounds. For now, create placeholder files:

```bash
mkdir -p public/wallpaper public/sounds public/icons
# Download bliss wallpaper
curl -L "https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png" -o public/wallpaper/bliss.jpg
```

**Step 2: Update globals.css with XP fonts and base styles**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

@font-face {
  font-family: 'Tahoma';
  src: local('Tahoma');
}

:root {
  --xp-blue: #0055e5;
  --xp-blue-dark: #0044cc;
  --xp-taskbar: #235adb;
  --xp-taskbar-dark: #1034a6;
  --xp-start-green: #3c8f3c;
  --xp-window-active: linear-gradient(180deg, #0058e6 0%, #3a93ff 3%, #288eff 6%, #127dff 10%, #036ffc 14%, #0262ee 20%, #0057e5 24%, #0054e3 28%, #0054e3 34%, #0055e5 50%, #005aea 70%, #005aea 78%, #005aea 86%, #0060ef 90%, #0060ef 94%, #0063f1 100%);
  --xp-window-inactive: linear-gradient(180deg, #7a96df 0%, #a8c0ef 3%, #9ab8e9 6%, #8caee3 14%, #7ba3dc 20%, #7ba3dc 24%, #7aa1db 28%, #7aa1db 50%, #7ea5de 70%, #7ea5de 78%, #82a9e0 86%, #84abe1 90%, #87ade3 94%, #8ab0e5 100%);
  --xp-button: linear-gradient(180deg, #fff 0%, #ecebe5 85%, #d8d0c4 100%);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  font-family: 'Tahoma', 'Segoe UI', sans-serif;
  font-size: 11px;
  user-select: none;
}

/* XP Button Style */
.xp-button {
  background: var(--xp-button);
  border: 1px solid #003c74;
  border-radius: 3px;
  padding: 2px 10px;
  font-size: 11px;
  cursor: pointer;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #808080;
}

.xp-button:active {
  box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #808080;
}

/* Scrollbar XP Style */
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

::-webkit-scrollbar-track {
  background: #f1efe2;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #ece9d8 0%, #fff 50%, #ece9d8 100%);
  border: 1px solid #919b9c;
}

::-webkit-scrollbar-button {
  background: #ece9d8;
  border: 1px solid #919b9c;
}
```

**Step 3: Update layout.tsx**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashraf OS - Portfolio",
  description: "Windows XP style portfolio of Ashraf Beshtawi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 4: Create minimal page.tsx placeholder**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="h-screen w-screen bg-black">
      <div className="flex items-center justify-center h-full text-white">
        Loading Ashraf OS...
      </div>
    </main>
  );
}
```

**Step 5: Test the setup**

```bash
npm run dev
```

Open http://localhost:3000 - should see black screen with loading text.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: initialize project with XP styling foundation"
```

---

### Task 2: Create Zustand Stores

**Files:**
- Create: `src/stores/bootStore.ts`
- Create: `src/stores/windowStore.ts`
- Create: `src/stores/audioStore.ts`

**Step 1: Create boot store**

Create `src/stores/bootStore.ts`:

```tsx
import { create } from 'zustand';

type BootPhase = 'bios' | 'loading' | 'welcome' | 'desktop';

interface BootState {
  phase: BootPhase;
  setPhase: (phase: BootPhase) => void;
}

export const useBootStore = create<BootState>((set) => ({
  phase: 'bios',
  setPhase: (phase) => set({ phase }),
}));
```

**Step 2: Create window store**

Create `src/stores/windowStore.ts`:

```tsx
import { create } from 'zustand';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  component: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowStore {
  windows: WindowState[];
  highestZIndex: number;
  openWindow: (window: Omit<WindowState, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  highestZIndex: 1,

  openWindow: (window) => {
    const { windows, highestZIndex } = get();
    const exists = windows.find((w) => w.id === window.id);
    if (exists) {
      get().focusWindow(window.id);
      if (exists.isMinimized) {
        get().restoreWindow(window.id);
      }
      return;
    }
    set({
      windows: [...windows, { ...window, zIndex: highestZIndex + 1 }],
      highestZIndex: highestZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set({ windows: get().windows.filter((w) => w.id !== id) });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    });
  },

  maximizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true, isMinimized: false } : w
      ),
    });
  },

  restoreWindow: (id) => {
    const { highestZIndex } = get();
    set({
      windows: get().windows.map((w) =>
        w.id === id
          ? { ...w, isMaximized: false, isMinimized: false, zIndex: highestZIndex + 1 }
          : w
      ),
      highestZIndex: highestZIndex + 1,
    });
  },

  focusWindow: (id) => {
    const { highestZIndex } = get();
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
      ),
      highestZIndex: highestZIndex + 1,
    });
  },

  updateWindowPosition: (id, x, y) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    });
  },

  updateWindowSize: (id, width, height) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    });
  },
}));
```

**Step 3: Create audio store**

Create `src/stores/audioStore.ts`:

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  isMuted: boolean;
  volume: number;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      isMuted: true,
      volume: 0.5,
      toggleMute: () => set({ isMuted: !get().isMuted }),
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: 'ashraf-os-audio',
    }
  )
);
```

**Step 4: Commit**

```bash
git add src/stores/
git commit -m "feat: add Zustand stores for boot, windows, and audio"
```

---

### Task 3: Boot Sequence Components

**Files:**
- Create: `src/components/boot/BiosScreen.tsx`
- Create: `src/components/boot/LoadingScreen.tsx`
- Create: `src/components/boot/WelcomeScreen.tsx`
- Create: `src/components/boot/BootSequence.tsx`

**Step 1: Create BiosScreen**

Create `src/components/boot/BiosScreen.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useBootStore } from '@/stores/bootStore';

export function BiosScreen() {
  const setPhase = useBootStore((state) => state.setPhase);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('loading');
    }, 1500);
    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="h-screen w-screen bg-black text-white font-mono p-4 text-sm">
      <div className="mb-4">
        <span className="text-gray-400">Ashraf BIOS v1.0</span>
      </div>
      <div className="space-y-1">
        <p>CPU: Creative Problem Solver @ 5+ Years Experience</p>
        <p>Memory: PHP, Symfony, Next.js, Nuxt.js, PostgreSQL, MongoDB</p>
        <p>Languages: German, English, Arabic</p>
        <p className="mt-4">Detecting drives...</p>
        <p>C: Backend Systems</p>
        <p>D: Frontend & 3D Experiences</p>
        <p>E: Web3 & Blockchain</p>
        <p>F: AI & Automation</p>
        <p className="mt-4 text-green-400">All systems ready. Starting Ashraf OS...</p>
      </div>
    </div>
  );
}
```

**Step 2: Create LoadingScreen**

Create `src/components/boot/LoadingScreen.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useBootStore } from '@/stores/bootStore';

export function LoadingScreen() {
  const setPhase = useBootStore((state) => state.setPhase);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('welcome'), 200);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [setPhase]);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      {/* XP Logo */}
      <div className="mb-8 text-center">
        <div className="text-5xl font-bold mb-2">
          <span className="text-red-500">A</span>
          <span className="text-green-500">s</span>
          <span className="text-blue-500">h</span>
          <span className="text-yellow-500">r</span>
          <span className="text-red-500">a</span>
          <span className="text-green-500">f</span>
          <span className="text-white ml-2">OS</span>
        </div>
        <div className="text-white text-lg tracking-widest">Professional Edition</div>
      </div>

      {/* Loading bar */}
      <div className="w-64 h-6 bg-[#1a1a2e] rounded-sm border border-[#2a2a4e] overflow-hidden">
        <div className="h-full flex gap-1 p-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`h-full w-2 rounded-sm transition-colors duration-100 ${
                i < Math.floor(progress / 5) ? 'bg-blue-500' : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="text-white mt-4 text-sm">Starting Ashraf OS...</p>
    </div>
  );
}
```

**Step 3: Create WelcomeScreen**

Create `src/components/boot/WelcomeScreen.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useBootStore } from '@/stores/bootStore';

export function WelcomeScreen() {
  const setPhase = useBootStore((state) => state.setPhase);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('desktop');
    }, 1500);
    return () => clearTimeout(timer);
  }, [setPhase]);

  return (
    <div className="h-screen w-screen bg-[#5a7edc] flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-4xl">
          👨‍💻
        </div>
        <h1 className="text-white text-3xl font-light tracking-wide">Welcome</h1>
      </div>
    </div>
  );
}
```

**Step 4: Create BootSequence orchestrator**

Create `src/components/boot/BootSequence.tsx`:

```tsx
'use client';

import { useBootStore } from '@/stores/bootStore';
import { BiosScreen } from './BiosScreen';
import { LoadingScreen } from './LoadingScreen';
import { WelcomeScreen } from './WelcomeScreen';

interface BootSequenceProps {
  children: React.ReactNode;
}

export function BootSequence({ children }: BootSequenceProps) {
  const phase = useBootStore((state) => state.phase);

  if (phase === 'bios') return <BiosScreen />;
  if (phase === 'loading') return <LoadingScreen />;
  if (phase === 'welcome') return <WelcomeScreen />;

  return <>{children}</>;
}
```

**Step 5: Update page.tsx to use BootSequence**

Replace `src/app/page.tsx`:

```tsx
'use client';

import { BootSequence } from '@/components/boot/BootSequence';

export default function Home() {
  return (
    <BootSequence>
      <main className="h-screen w-screen bg-[#3a6ea5]">
        <div className="flex items-center justify-center h-full text-white text-2xl">
          Desktop coming soon...
        </div>
      </main>
    </BootSequence>
  );
}
```

**Step 6: Test boot sequence**

```bash
npm run dev
```

Should see BIOS → Loading → Welcome → Desktop placeholder

**Step 7: Commit**

```bash
git add src/components/boot/ src/app/page.tsx
git commit -m "feat: add boot sequence (BIOS, loading, welcome screens)"
```

---

## Phase 2: Desktop & Window System

### Task 4: Desktop Component with Wallpaper

**Files:**
- Create: `src/components/desktop/Desktop.tsx`
- Create: `src/components/desktop/Wallpaper.tsx`

**Step 1: Create Wallpaper component**

Create `src/components/desktop/Wallpaper.tsx`:

```tsx
export function Wallpaper() {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/wallpaper/bliss.jpg)',
        backgroundColor: '#3a6ea5',
      }}
    />
  );
}
```

**Step 2: Create Desktop component**

Create `src/components/desktop/Desktop.tsx`:

```tsx
'use client';

import { Wallpaper } from './Wallpaper';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Wallpaper />
      <div className="relative z-10 h-full w-full pb-[30px]">
        {children}
      </div>
    </div>
  );
}
```

**Step 3: Update page.tsx**

Replace `src/app/page.tsx`:

```tsx
'use client';

import { BootSequence } from '@/components/boot/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';

export default function Home() {
  return (
    <BootSequence>
      <Desktop>
        <div className="p-2 text-white text-shadow">
          Desktop icons will go here
        </div>
      </Desktop>
    </BootSequence>
  );
}
```

**Step 4: Commit**

```bash
git add src/components/desktop/ src/app/page.tsx
git commit -m "feat: add Desktop component with wallpaper"
```

---

### Task 5: Desktop Icons

**Files:**
- Create: `src/components/desktop/DesktopIcon.tsx`
- Create: `src/components/desktop/DesktopIcons.tsx`
- Create: `src/data/desktopItems.ts`

**Step 1: Create desktop items data**

Create `src/data/desktopItems.ts`:

```tsx
export interface DesktopItem {
  id: string;
  label: string;
  icon: string;
  component: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

export const desktopItems: DesktopItem[] = [
  { id: 'my-computer', label: 'My Computer', icon: '🖥️', component: 'explorer', width: 700, height: 500, minWidth: 400, minHeight: 300 },
  { id: 'my-documents', label: 'My Documents', icon: '📁', component: 'explorer-docs', width: 700, height: 500, minWidth: 400, minHeight: 300 },
  { id: 'ie', label: 'Internet Explorer', icon: '🌐', component: 'ie-welcome', width: 800, height: 600, minWidth: 400, minHeight: 300 },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: '🗑️', component: 'recycle-bin', width: 500, height: 400, minWidth: 300, minHeight: 200 },
  { id: 'frontend', label: 'Frontend.exe', icon: '🌐', component: 'frontend', width: 850, height: 600, minWidth: 600, minHeight: 400 },
  { id: 'backend', label: 'Backend.exe', icon: '⚡', component: 'backend', width: 700, height: 500, minWidth: 500, minHeight: 350 },
  { id: 'web3', label: 'Web3.exe', icon: '🔗', component: 'web3', width: 600, height: 500, minWidth: 400, minHeight: 350 },
  { id: 'ai', label: 'AI.exe', icon: '🤖', component: 'ai', width: 700, height: 500, minWidth: 500, minHeight: 350 },
  { id: 'contact', label: 'Contact.exe', icon: '✉️', component: 'contact', width: 750, height: 550, minWidth: 500, minHeight: 400 },
];
```

**Step 2: Create DesktopIcon component**

Create `src/components/desktop/DesktopIcon.tsx`:

```tsx
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
```

**Step 3: Create DesktopIcons container**

Create `src/components/desktop/DesktopIcons.tsx`:

```tsx
'use client';

import { desktopItems } from '@/data/desktopItems';
import { DesktopIcon } from './DesktopIcon';

export function DesktopIcons() {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2">
      {desktopItems.map((item) => (
        <DesktopIcon key={item.id} item={item} />
      ))}
    </div>
  );
}
```

**Step 4: Update Desktop to include icons**

Modify `src/components/desktop/Desktop.tsx`:

```tsx
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
```

**Step 5: Commit**

```bash
git add src/components/desktop/ src/data/
git commit -m "feat: add desktop icons with click-to-open behavior"
```

---

### Task 6: Window Component

**Files:**
- Create: `src/components/windows/Window.tsx`
- Create: `src/components/windows/WindowManager.tsx`
- Create: `src/components/windows/TitleBar.tsx`

**Step 1: Create TitleBar component**

Create `src/components/windows/TitleBar.tsx`:

```tsx
'use client';

import { useWindowStore } from '@/stores/windowStore';

interface TitleBarProps {
  windowId: string;
  title: string;
  icon: string;
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function TitleBar({ windowId, title, icon, isActive, onMouseDown }: TitleBarProps) {
  const { minimizeWindow, maximizeWindow, closeWindow } = useWindowStore();
  const window = useWindowStore((state) => state.windows.find((w) => w.id === windowId));

  const handleMaximize = () => {
    if (window?.isMaximized) {
      useWindowStore.getState().restoreWindow(windowId);
    } else {
      maximizeWindow(windowId);
    }
  };

  return (
    <div
      className={`h-[25px] flex items-center justify-between px-1 rounded-t cursor-move select-none ${
        isActive
          ? 'bg-gradient-to-r from-[#0058e6] via-[#3a93ff] to-[#0058e6]'
          : 'bg-gradient-to-r from-[#7a96df] via-[#a8c0ef] to-[#7a96df]'
      }`}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-1 text-white font-bold text-[11px] truncate">
        <span>{icon}</span>
        <span className="truncate">{title}</span>
      </div>
      <div className="flex gap-[2px]">
        <button
          onClick={() => minimizeWindow(windowId)}
          className="w-[21px] h-[21px] rounded-sm bg-gradient-to-b from-[#3c8cff] to-[#1c4cc4] border border-white/30 text-white text-xs flex items-center justify-center hover:brightness-110"
        >
          _
        </button>
        <button
          onClick={handleMaximize}
          className="w-[21px] h-[21px] rounded-sm bg-gradient-to-b from-[#3c8cff] to-[#1c4cc4] border border-white/30 text-white text-xs flex items-center justify-center hover:brightness-110"
        >
          □
        </button>
        <button
          onClick={() => closeWindow(windowId)}
          className="w-[21px] h-[21px] rounded-sm bg-gradient-to-b from-[#ff6b6b] to-[#c43c3c] border border-white/30 text-white text-xs flex items-center justify-center hover:brightness-110"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Create Window component**

Create `src/components/windows/Window.tsx`:

```tsx
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
```

**Step 3: Create WindowManager**

Create `src/components/windows/WindowManager.tsx`:

```tsx
'use client';

import { useWindowStore } from '@/stores/windowStore';
import { Window } from './Window';
import { AppContent } from '@/components/apps/AppContent';

export function WindowManager() {
  const windows = useWindowStore((state) => state.windows);
  const highestZIndex = useWindowStore((state) => state.highestZIndex);

  return (
    <>
      {windows.map((win) => (
        <Window key={win.id} window={win} isActive={win.zIndex === highestZIndex}>
          <AppContent component={win.component} windowId={win.id} />
        </Window>
      ))}
    </>
  );
}
```

**Step 4: Create placeholder AppContent**

Create `src/components/apps/AppContent.tsx`:

```tsx
interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component, windowId }: AppContentProps) {
  return (
    <div className="p-4">
      <p>App: {component}</p>
      <p>Window ID: {windowId}</p>
      <p className="text-gray-500 mt-2">Content coming soon...</p>
    </div>
  );
}
```

**Step 5: Update page.tsx**

Replace `src/app/page.tsx`:

```tsx
'use client';

import { BootSequence } from '@/components/boot/BootSequence';
import { Desktop } from '@/components/desktop/Desktop';
import { WindowManager } from '@/components/windows/WindowManager';

export default function Home() {
  return (
    <BootSequence>
      <Desktop>
        <WindowManager />
      </Desktop>
    </BootSequence>
  );
}
```

**Step 6: Test windows**

```bash
npm run dev
```

Double-click desktop icons - windows should open, drag, resize, minimize, maximize, close.

**Step 7: Commit**

```bash
git add src/components/windows/ src/components/apps/ src/app/page.tsx
git commit -m "feat: add draggable, resizable window system"
```

---

### Task 7: Taskbar Component

**Files:**
- Create: `src/components/taskbar/Taskbar.tsx`
- Create: `src/components/taskbar/StartButton.tsx`
- Create: `src/components/taskbar/TaskbarItems.tsx`
- Create: `src/components/taskbar/SystemTray.tsx`

**Step 1: Create StartButton**

Create `src/components/taskbar/StartButton.tsx`:

```tsx
'use client';

interface StartButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function StartButton({ isOpen, onClick }: StartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-full px-2 flex items-center gap-1 rounded-r-lg font-bold text-white text-[11px] ${
        isOpen
          ? 'bg-gradient-to-b from-[#2a6e2a] to-[#1a4e1a]'
          : 'bg-gradient-to-b from-[#3c8f3c] to-[#2a6e2a] hover:from-[#4aa34a] hover:to-[#3c8f3c]'
      }`}
    >
      <span className="text-lg">🪟</span>
      <span className="italic">start</span>
    </button>
  );
}
```

**Step 2: Create TaskbarItems**

Create `src/components/taskbar/TaskbarItems.tsx`:

```tsx
'use client';

import { useWindowStore } from '@/stores/windowStore';

export function TaskbarItems() {
  const windows = useWindowStore((state) => state.windows);
  const highestZIndex = useWindowStore((state) => state.highestZIndex);
  const { focusWindow, restoreWindow, minimizeWindow } = useWindowStore();

  const handleClick = (id: string, isMinimized: boolean, isActive: boolean) => {
    if (isMinimized) {
      restoreWindow(id);
    } else if (isActive) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <div className="flex-1 flex items-center gap-1 px-2 overflow-x-auto">
      {windows.map((win) => {
        const isActive = win.zIndex === highestZIndex && !win.isMinimized;
        return (
          <button
            key={win.id}
            onClick={() => handleClick(win.id, win.isMinimized, isActive)}
            className={`h-[22px] px-2 flex items-center gap-1 text-[11px] rounded border min-w-[120px] max-w-[160px] truncate ${
              isActive
                ? 'bg-[#fff] border-[#003c74] shadow-inner'
                : 'bg-gradient-to-b from-[#3c8cff]/30 to-[#1c4cc4]/30 border-[#003c74]/50 text-white'
            }`}
          >
            <span>{win.icon}</span>
            <span className="truncate">{win.title}</span>
          </button>
        );
      })}
    </div>
  );
}
```

**Step 3: Create SystemTray**

Create `src/components/taskbar/SystemTray.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useAudioStore } from '@/stores/audioStore';

export function SystemTray() {
  const { isMuted, toggleMute } = useAudioStore();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center gap-2 px-2 bg-gradient-to-b from-[#0f4bc4] to-[#0b3a9c] border-l border-[#0055e5]/50">
      <button
        onClick={toggleMute}
        className="text-white hover:bg-white/10 p-1 rounded"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <div className="text-white text-[11px] min-w-[55px] text-center">{time}</div>
    </div>
  );
}
```

**Step 4: Create Taskbar**

Create `src/components/taskbar/Taskbar.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { StartButton } from './StartButton';
import { TaskbarItems } from './TaskbarItems';
import { SystemTray } from './SystemTray';

interface TaskbarProps {
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

export function Taskbar({ onStartClick, isStartMenuOpen }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#245edb] to-[#0f3a9c] flex items-center">
      <StartButton isOpen={isStartMenuOpen} onClick={onStartClick} />
      <div className="w-[2px] h-[20px] bg-[#1a4cc4] mx-1" />
      <TaskbarItems />
      <SystemTray />
    </div>
  );
}
```

**Step 5: Update Desktop to include Taskbar**

Replace `src/components/desktop/Desktop.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcons } from './DesktopIcons';
import { Taskbar } from '@/components/taskbar/Taskbar';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Wallpaper />
      <div
        className="relative z-10 h-full w-full pb-[30px]"
        onClick={() => setIsStartMenuOpen(false)}
      >
        <DesktopIcons />
        {children}
      </div>
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  );
}
```

**Step 6: Commit**

```bash
git add src/components/taskbar/ src/components/desktop/Desktop.tsx
git commit -m "feat: add taskbar with start button, window items, and system tray"
```

---

### Task 8: Start Menu

**Files:**
- Create: `src/components/startmenu/StartMenu.tsx`
- Create: `src/components/startmenu/StartMenuItem.tsx`

**Step 1: Create StartMenuItem**

Create `src/components/startmenu/StartMenuItem.tsx`:

```tsx
'use client';

interface StartMenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  hasArrow?: boolean;
}

export function StartMenuItem({ icon, label, onClick, hasArrow }: StartMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-2 py-1 hover:bg-[#2f71cd] hover:text-white text-[11px] text-left"
    >
      <span className="text-lg w-6 text-center">{icon}</span>
      <span className="flex-1">{label}</span>
      {hasArrow && <span className="text-[10px]">▶</span>}
    </button>
  );
}
```

**Step 2: Create StartMenu**

Create `src/components/startmenu/StartMenu.tsx`:

```tsx
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
          👨‍💻
        </div>
        <span className="text-white font-bold ml-2">Ashraf Beshtawi</span>
      </div>

      <div className="flex">
        {/* Left column - quick access */}
        <div className="w-[190px] bg-white py-1 border-r border-[#d3d3d3]">
          <StartMenuItem icon="🌐" label="Internet Explorer" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'ie')!)} />
          <StartMenuItem icon="✉️" label="Outlook Express" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'contact')!)} />
          <StartMenuItem icon="📁" label="My Documents" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-documents')!)} />
          <div className="border-t border-[#d3d3d3] my-1" />
          <div className="relative">
            <StartMenuItem
              icon="📂"
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
                <StartMenuItem icon="📝" label="Notepad" onClick={() => handleOpenApp({ id: 'notepad', label: 'Notepad', icon: '📝', component: 'notepad', width: 500, height: 400 })} />
                <StartMenuItem icon="💣" label="Minesweeper" onClick={() => handleOpenApp({ id: 'minesweeper', label: 'Minesweeper', icon: '💣', component: 'minesweeper', width: 280, height: 380, minWidth: 280, minHeight: 380 })} />
              </div>
            )}
          </div>
        </div>

        {/* Right column - system */}
        <div className="w-[190px] bg-[#d3e5fa] py-1">
          <StartMenuItem icon="🖥️" label="My Computer" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-computer')!)} />
          <StartMenuItem icon="📁" label="My Documents" onClick={() => handleOpenApp(desktopItems.find(i => i.id === 'my-documents')!)} />
        </div>
      </div>

      {/* Shutdown bar */}
      <div className="h-[32px] bg-gradient-to-r from-[#3c8cff] to-[#1c5bc4] flex items-center justify-end px-3">
        <button
          onClick={handleShutdown}
          className="flex items-center gap-1 text-white text-[11px] hover:bg-white/20 px-2 py-1 rounded"
        >
          <span>🔴</span>
          <span>Shut Down</span>
        </button>
      </div>
    </div>
  );
}
```

**Step 3: Update Desktop to include StartMenu**

Modify `src/components/desktop/Desktop.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcons } from './DesktopIcons';
import { Taskbar } from '@/components/taskbar/Taskbar';
import { StartMenu } from '@/components/startmenu/StartMenu';

interface DesktopProps {
  children?: React.ReactNode;
}

export function Desktop({ children }: DesktopProps) {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <Wallpaper />
      <div
        className="relative z-10 h-full w-full pb-[30px]"
        onClick={() => setIsStartMenuOpen(false)}
      >
        <DesktopIcons />
        {children}
      </div>
      <StartMenu isOpen={isStartMenuOpen} onClose={() => setIsStartMenuOpen(false)} />
      <Taskbar
        isStartMenuOpen={isStartMenuOpen}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
      />
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add src/components/startmenu/ src/components/desktop/Desktop.tsx
git commit -m "feat: add Start Menu with All Programs submenu"
```

---

## Phase 3: Portfolio Apps

### Task 9: Frontend App (Internet Explorer Style)

**Files:**
- Create: `src/components/apps/FrontendApp.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create FrontendApp**

Create `src/components/apps/FrontendApp.tsx`:

```tsx
'use client';

import { useState } from 'react';

export function FrontendApp() {
  const [url] = useState('https://ashraf.dev/frontend');

  const projects = [
    { url: 'https://github.com/ashrafbeshtawi/Horus', title: 'Horus' },
    { url: 'https://mocking-bird-three.vercel.app/', title: 'Mocking-Bird' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#f1efe2]">
      {/* IE Toolbar */}
      <div className="bg-gradient-to-b from-[#f6f4ec] to-[#eae6d9] border-b border-[#919b9c] p-1">
        <div className="flex items-center gap-1 mb-1">
          <button className="xp-button">← Back</button>
          <button className="xp-button">→</button>
          <button className="xp-button">🔄</button>
          <button className="xp-button">🏠</button>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px]">Address</span>
          <div className="flex-1 bg-white border border-[#7f9db9] px-1 py-0.5 text-[11px] flex items-center">
            <span className="text-blue-600">🌐</span>
            <span className="ml-1">{url}</span>
          </div>
          <button className="xp-button">Go</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Favorites Sidebar */}
        <div className="w-[180px] bg-[#f5f4ea] border-r border-[#919b9c] p-2">
          <div className="font-bold text-[11px] mb-2 flex items-center gap-1">
            <span>⭐</span> Favorites
          </div>
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-blue-600 hover:underline py-1"
            >
              <span>🔗</span>
              {project.title}
            </a>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-4 overflow-auto">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-[#003c74] mb-4">
              Frontend & Immersive 3D Experiences
            </h1>

            <div className="mb-4">
              <img
                src="/img/frontend.png"
                alt="Frontend"
                className="w-full max-w-md rounded border border-[#919b9c]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <p className="text-[13px] leading-relaxed text-gray-700 mb-4">
              Expert in Next.js, Nuxt.js, Three.js & WebGL for building high-performance,
              responsive UIs and crafting cutting-edge, immersive 3D web experiences.
              Successfully led the development of complex interactive applications.
            </p>

            <div className="bg-[#ffffcc] border border-[#e6e600] p-3 rounded">
              <h3 className="font-bold text-[12px] mb-2">🔗 Featured Projects:</h3>
              <ul className="text-[12px] space-y-1">
                {projects.map((project) => (
                  <li key={project.title}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {project.title} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-[20px] bg-[#ece9d8] border-t border-[#919b9c] flex items-center px-2 text-[10px] text-gray-600">
        <span>✓ Done</span>
        <span className="ml-auto">Internet Explorer</span>
      </div>
    </div>
  );
}
```

**Step 2: Update AppContent**

Replace `src/components/apps/AppContent.tsx`:

```tsx
import { FrontendApp } from './FrontendApp';

interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component, windowId }: AppContentProps) {
  switch (component) {
    case 'frontend':
      return <FrontendApp />;
    default:
      return (
        <div className="p-4">
          <p>App: {component}</p>
          <p>Window ID: {windowId}</p>
          <p className="text-gray-500 mt-2">Content coming soon...</p>
        </div>
      );
  }
}
```

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add Frontend app with IE-style interface"
```

---

### Task 10: Backend App (Terminal Style)

**Files:**
- Create: `src/components/apps/BackendApp.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create BackendApp**

Create `src/components/apps/BackendApp.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';

interface Line {
  type: 'command' | 'output' | 'link';
  text: string;
  url?: string;
}

const terminalScript: Line[] = [
  { type: 'command', text: 'C:\\> whoami' },
  { type: 'output', text: 'Senior Backend Engineer' },
  { type: 'command', text: 'C:\\> skills --list' },
  { type: 'output', text: 'PHP 8, Symfony, PostgreSQL, MongoDB, REST APIs, Microservices' },
  { type: 'command', text: 'C:\\> cat about.txt' },
  { type: 'output', text: 'Specializing in robust and scalable backend systems.' },
  { type: 'output', text: 'Proven track record in designing and deploying' },
  { type: 'output', text: 'reliable, high-availability APIs and microservices.' },
  { type: 'command', text: 'C:\\> experience --years' },
  { type: 'output', text: '5+ years of professional experience' },
  { type: 'command', text: 'C:\\> location' },
  { type: 'output', text: 'Berlin, Germany' },
  { type: 'command', text: 'C:\\> open github' },
  { type: 'link', text: '[Click to open GitHub] github.com/ashrafbeshtawi', url: 'https://github.com/ashrafbeshtawi' },
];

export function BackendApp() {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < terminalScript.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, terminalScript[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, terminalScript[currentIndex].type === 'command' ? 600 : 150);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="h-full bg-black font-mono text-[13px] p-2 overflow-auto">
      <div className="text-gray-500 mb-2">
        Ashraf Backend Console [Version 1.0.0]
        <br />
        (c) 2024 Ashraf Beshtawi. All rights reserved.
      </div>

      {visibleLines.map((line, index) => (
        <div key={index} className="leading-relaxed">
          {line.type === 'command' && (
            <span className="text-gray-300">{line.text}</span>
          )}
          {line.type === 'output' && (
            <span className="text-green-400">{line.text}</span>
          )}
          {line.type === 'link' && (
            <a
              href={line.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline"
            >
              {line.text}
            </a>
          )}
        </div>
      ))}

      {currentIndex >= terminalScript.length && (
        <div className="text-gray-300">
          C:\&gt;{showCursor && <span className="bg-gray-300 text-black">_</span>}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Update AppContent**

Modify `src/components/apps/AppContent.tsx` to add:

```tsx
import { FrontendApp } from './FrontendApp';
import { BackendApp } from './BackendApp';

interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component, windowId }: AppContentProps) {
  switch (component) {
    case 'frontend':
      return <FrontendApp />;
    case 'backend':
      return <BackendApp />;
    default:
      return (
        <div className="p-4">
          <p>App: {component}</p>
          <p>Window ID: {windowId}</p>
          <p className="text-gray-500 mt-2">Content coming soon...</p>
        </div>
      );
  }
}
```

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add Backend app with terminal-style interface"
```

---

### Task 11: Web3 App (Crypto Wallet Style)

**Files:**
- Create: `src/components/apps/Web3App.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create Web3App**

Create `src/components/apps/Web3App.tsx`:

```tsx
'use client';

export function Web3App() {
  return (
    <div className="h-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white p-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl">
            🔗
          </div>
          <div>
            <h1 className="font-bold">Web3 Wallet</h1>
            <p className="text-[10px] text-gray-400">ashraf.eth</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400">Total Balance</p>
          <p className="text-xl font-bold text-green-400">∞ XP</p>
        </div>
      </div>

      {/* Project Card */}
      <div className="bg-[#0f0f23] rounded-lg p-4 mb-4 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl">
            🏠
          </div>
          <div>
            <h2 className="font-bold">LandLord Token</h2>
            <p className="text-[11px] text-gray-400">Real Estate Tokenization</p>
          </div>
        </div>

        <p className="text-[12px] text-gray-300 mb-4 leading-relaxed">
          Focus on innovative blockchain integration, specifically in real estate tokenization.
          Developed LandLord for fractional investment, demonstrating expertise in DeFi concepts
          and secure smart contracts.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-[11px]">
          <div className="bg-[#1a1a3e] rounded p-2">
            <p className="text-gray-400">Technology</p>
            <p className="text-purple-400">Blockchain / DeFi</p>
          </div>
          <div className="bg-[#1a1a3e] rounded p-2">
            <p className="text-gray-400">Focus</p>
            <p className="text-blue-400">Real Estate</p>
          </div>
        </div>

        <a
          href="https://landlord-liart.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-center py-2 rounded font-bold hover:opacity-90 transition-opacity"
        >
          View on Explorer →
        </a>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#0f0f23] rounded-lg p-3 border border-gray-700/50">
        <h3 className="text-[11px] text-gray-400 mb-2">Recent Activity</h3>
        <div className="space-y-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-green-400">✓ Smart Contract Deployed</span>
            <span className="text-gray-500">Success</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">↗ Fractional Ownership Enabled</span>
            <span className="text-gray-500">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-purple-400">🔐 Security Audit Passed</span>
            <span className="text-gray-500">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Update AppContent to include Web3App**

Add import and case for 'web3' in `src/components/apps/AppContent.tsx`.

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add Web3 app with crypto wallet interface"
```

---

### Task 12: AI App (Neural Network Style)

**Files:**
- Create: `src/components/apps/AIApp.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create AIApp**

Create `src/components/apps/AIApp.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';

export function AIApp() {
  const [logs, setLogs] = useState<string[]>([]);

  const trainingLogs = [
    '> Initializing Neural Network Console v1.0...',
    '> Loading Genetic Algorithm modules...',
    '> Connecting to n8n Workflow Engine...',
    '> Status: OPERATIONAL',
    '',
    '> Model: Auto-Trader v2.0',
    '> Type: Algorithmic Trading System',
    '> Architecture: Genetic Algorithm + ML',
    '',
    '> Training Data: Market Historical Data',
    '> Optimization: Profit Maximization',
    '> Risk Management: Active',
    '',
    '> System ready for deployment.',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < trainingLogs.length) {
        setLogs((prev) => [...prev, trainingLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-[#0a0a0f] text-green-400 font-mono overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-900/50 to-green-900/50 p-3 border-b border-cyan-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <div>
              <h1 className="text-cyan-400 font-bold">Neural Network Console</h1>
              <p className="text-[10px] text-gray-500">v1.0 | AI-Driven Automation</p>
            </div>
          </div>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-green-500">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Neural network visualization */}
      <div className="h-[100px] relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-cyan-500"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
                animation: `pulse ${1 + (i % 3) * 0.5}s infinite`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cyan-500 text-[10px] bg-[#0a0a0f] px-2">
            [ NEURAL NETWORK ACTIVE ]
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-4">
          <h2 className="text-cyan-400 font-bold mb-2">AI-Driven Automation & Trading</h2>
          <p className="text-[12px] text-gray-400 leading-relaxed">
            Leveraging Genetic Algorithms and n8n Workflows to develop intelligent
            automation tools and algorithmic trading systems. Proven ability to
            translate complex data into actionable, automated strategies.
          </p>
        </div>

        {/* Training logs */}
        <div className="bg-[#111118] rounded p-3 border border-gray-800 mb-4">
          <div className="text-[10px] text-gray-500 mb-2">// System Output</div>
          <div className="text-[11px] space-y-0.5">
            {logs.map((log, i) => (
              <div key={i} className={log.startsWith('>') ? 'text-green-400' : 'text-gray-500'}>
                {log || '\u00A0'}
              </div>
            ))}
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Project link */}
        <a
          href="https://github.com/ashrafbeshtawi/Auto-Trader"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-cyan-600 to-green-600 text-center text-white py-2 rounded font-bold hover:opacity-90 transition-opacity text-[12px]"
        >
          📥 Download Model: Auto-Trader
        </a>
      </div>

      {/* Status bar */}
      <div className="h-[20px] bg-[#111118] border-t border-gray-800 flex items-center justify-between px-3 text-[10px] text-gray-500">
        <span>CPU: 42% | MEM: 2.4GB</span>
        <span>Genetic Algorithm: Optimizing...</span>
      </div>
    </div>
  );
}
```

**Step 2: Update AppContent**

Add import and case for 'ai'.

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add AI app with neural network interface"
```

---

### Task 13: Contact App (Outlook Express Style)

**Files:**
- Create: `src/components/apps/ContactApp.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create ContactApp**

Create `src/components/apps/ContactApp.tsx`:

```tsx
'use client';

import { useState } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  icon: string;
  url: string;
}

const emails: Email[] = [
  { id: 'github', from: 'GitHub', subject: 'View my repositories and projects', icon: '🐙', url: 'https://github.com/ashrafbeshtawi' },
  { id: 'linkedin', from: 'LinkedIn', subject: 'Connect with me professionally', icon: '💼', url: 'https://www.linkedin.com/in/ashraf-beshtawi/' },
];

export function ContactApp() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[0]);

  return (
    <div className="h-full flex flex-col bg-[#ece9d8]">
      {/* Menu bar */}
      <div className="flex gap-4 px-2 py-1 text-[11px] border-b border-[#919b9c] bg-[#f1efe2]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Tools</span>
        <span className="hover:underline cursor-pointer">Message</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex gap-1 px-2 py-1 border-b border-[#919b9c] bg-[#f6f4ec]">
        <button className="xp-button flex items-center gap-1">
          <span>📝</span> Create Mail
        </button>
        <button className="xp-button flex items-center gap-1">
          <span>📤</span> Send/Recv
        </button>
        <button className="xp-button flex items-center gap-1">
          <span>📒</span> Addresses
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Folder pane */}
        <div className="w-[150px] bg-white border-r border-[#919b9c] p-2">
          <div className="text-[11px] font-bold mb-2">Outlook Express</div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center gap-1 bg-[#316ac5] text-white px-1 py-0.5 rounded">
              <span>📥</span> Inbox (2)
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-gray-100 cursor-pointer">
              <span>📤</span> Outbox
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-gray-100 cursor-pointer">
              <span>📨</span> Sent Items
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-gray-100 cursor-pointer">
              <span>🗑️</span> Deleted
            </div>
            <div className="flex items-center gap-1 px-1 py-0.5 hover:bg-gray-100 cursor-pointer">
              <span>📁</span> Drafts
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Email list */}
          <div className="h-[120px] border-b border-[#919b9c] bg-white overflow-auto">
            <table className="w-full text-[11px]">
              <thead className="bg-[#f1efe2] sticky top-0">
                <tr>
                  <th className="text-left p-1 border-b border-[#919b9c] font-normal">From</th>
                  <th className="text-left p-1 border-b border-[#919b9c] font-normal">Subject</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`cursor-pointer ${
                      selectedEmail?.id === email.id ? 'bg-[#316ac5] text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <td className="p-1">
                      <span className="mr-1">{email.icon}</span>
                      {email.from}
                    </td>
                    <td className="p-1">{email.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Preview pane */}
          <div className="flex-1 bg-white p-4 overflow-auto">
            {selectedEmail ? (
              <div>
                <div className="border-b border-[#919b9c] pb-3 mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-3xl">
                      👨‍💻
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Ashraf Beshtawi</h2>
                      <p className="text-[11px] text-gray-600">Senior Backend & AI Engineer</p>
                      <p className="text-[11px] text-gray-600">Berlin, Germany</p>
                    </div>
                  </div>
                </div>

                <div className="text-[12px] space-y-3">
                  <p className="leading-relaxed">
                    A highly motivated Senior Backend & AI Engineer with 5+ years of experience.
                    Core expertise includes PHP, Symfony, SQL, MongoDB, Next.js, and Nuxt.js.
                  </p>
                  <p className="leading-relaxed">
                    Dedicated to building robust, scalable systems, pioneering AI automation,
                    and innovating in the Web3 space.
                  </p>
                  <p>
                    <strong>Languages:</strong> German, English, Arabic
                  </p>

                  <div className="flex gap-2 mt-4">
                    <a
                      href={selectedEmail.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="xp-button flex items-center gap-1"
                    >
                      {selectedEmail.icon} Open {selectedEmail.from}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center mt-10">
                Select a message to preview
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-[20px] bg-[#ece9d8] border-t border-[#919b9c] flex items-center px-2 text-[10px] text-gray-600">
        <span>2 message(s), 0 unread</span>
      </div>
    </div>
  );
}
```

**Step 2: Update AppContent**

Add import and case for 'contact'.

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add Contact app with Outlook Express interface"
```

---

## Phase 4: Utility Apps

### Task 14: Notepad App

**Files:**
- Create: `src/components/apps/NotepadApp.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create NotepadApp**

Create `src/components/apps/NotepadApp.tsx`:

```tsx
'use client';

import { useState } from 'react';

const defaultText = `Welcome to Ashraf OS!

Feel free to explore. Try right-clicking
things, check My Documents for surprises,
and don't forget to play Minesweeper.

- Ashraf

---

About Me:
I am a passionate backend developer with a
strong interest in AI and Crypto.

Based in the vibrant city of Berlin, I focus
on crafting robust and scalable systems while
continuously exploring the exciting frontiers
of technology.

Languages: German, English, Arabic
`;

export function NotepadApp() {
  const [text, setText] = useState(defaultText);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu bar */}
      <div className="flex gap-4 px-2 py-1 text-[11px] border-b border-[#919b9c] bg-[#f1efe2]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">Format</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>

      {/* Text area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 font-mono text-[13px] resize-none outline-none border-none"
        spellCheck={false}
      />
    </div>
  );
}
```

**Step 2: Update AppContent**

Add import and case for 'notepad'.

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add Notepad app"
```

---

### Task 15: Minesweeper Game

**Files:**
- Create: `src/components/apps/MinesweeperApp.tsx`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create MinesweeperApp**

Create `src/components/apps/MinesweeperApp.tsx`:

```tsx
'use client';

import { useState, useCallback, useEffect } from 'react';

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

type GameState = 'playing' | 'won' | 'lost';

const GRID_SIZE = 9;
const MINE_COUNT = 10;

function createBoard(): Cell[][] {
  const board: Cell[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        }))
    );

  // Place mines
  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate neighbor counts
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!board[row][col].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && board[nr][nc].isMine) {
              count++;
            }
          }
        }
        board[row][col].neighborMines = count;
      }
    }
  }

  return board;
}

export function MinesweeperApp() {
  const [board, setBoard] = useState<Cell[][]>(createBoard);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setTime((t) => Math.min(t + 1, 999));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  const resetGame = () => {
    setBoard(createBoard());
    setGameState('playing');
    setFlagCount(0);
    setTime(0);
  };

  const revealCell = useCallback(
    (row: number, col: number) => {
      if (gameState !== 'playing') return;

      const newBoard = board.map((r) => r.map((c) => ({ ...c })));
      const cell = newBoard[row][col];

      if (cell.isRevealed || cell.isFlagged) return;

      cell.isRevealed = true;

      if (cell.isMine) {
        // Reveal all mines
        newBoard.forEach((r) =>
          r.forEach((c) => {
            if (c.isMine) c.isRevealed = true;
          })
        );
        setGameState('lost');
      } else if (cell.neighborMines === 0) {
        // Flood fill for empty cells
        const reveal = (r: number, c: number) => {
          if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return;
          const current = newBoard[r][c];
          if (current.isRevealed || current.isFlagged || current.isMine) return;
          current.isRevealed = true;
          if (current.neighborMines === 0) {
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                reveal(r + dr, c + dc);
              }
            }
          }
        };
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(row + dr, col + dc);
          }
        }
      }

      // Check win
      const hiddenSafeCells = newBoard
        .flat()
        .filter((c) => !c.isMine && !c.isRevealed).length;
      if (hiddenSafeCells === 0) {
        setGameState('won');
      }

      setBoard(newBoard);
    },
    [board, gameState]
  );

  const toggleFlag = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      e.preventDefault();
      if (gameState !== 'playing') return;

      const newBoard = board.map((r) => r.map((c) => ({ ...c })));
      const cell = newBoard[row][col];

      if (cell.isRevealed) return;

      cell.isFlagged = !cell.isFlagged;
      setFlagCount((f) => (cell.isFlagged ? f + 1 : f - 1));
      setBoard(newBoard);
    },
    [board, gameState]
  );

  const getCellContent = (cell: Cell) => {
    if (!cell.isRevealed) {
      return cell.isFlagged ? '🚩' : '';
    }
    if (cell.isMine) return '💣';
    if (cell.neighborMines === 0) return '';
    return cell.neighborMines;
  };

  const getCellColor = (count: number) => {
    const colors = ['', 'blue', 'green', 'red', 'darkblue', 'darkred', 'teal', 'black', 'gray'];
    return colors[count] || 'black';
  };

  const smiley = gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂';

  return (
    <div className="h-full bg-[#c0c0c0] p-1 flex flex-col">
      {/* Menu */}
      <div className="flex gap-4 px-2 py-1 text-[11px] bg-[#c0c0c0]">
        <span className="hover:underline cursor-pointer">Game</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>

      {/* Game container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Status bar */}
        <div className="flex items-center gap-4 mb-2 p-1 bg-[#c0c0c0] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
          {/* Mine counter */}
          <div className="bg-black text-red-500 font-mono text-xl px-1 min-w-[50px] text-center">
            {String(MINE_COUNT - flagCount).padStart(3, '0')}
          </div>

          {/* Smiley button */}
          <button
            onClick={resetGame}
            className="w-8 h-8 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] flex items-center justify-center text-xl active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
          >
            {smiley}
          </button>

          {/* Timer */}
          <div className="bg-black text-red-500 font-mono text-xl px-1 min-w-[50px] text-center">
            {String(time).padStart(3, '0')}
          </div>
        </div>

        {/* Grid */}
        <div className="border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white p-1 bg-[#c0c0c0]">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <button
                  key={colIndex}
                  onClick={() => revealCell(rowIndex, colIndex)}
                  onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                  className={`w-5 h-5 text-[11px] font-bold flex items-center justify-center ${
                    cell.isRevealed
                      ? 'bg-[#c0c0c0] border border-[#808080]'
                      : 'bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-[#808080]'
                  } ${cell.isRevealed && cell.isMine && gameState === 'lost' ? 'bg-red-500' : ''}`}
                  style={{ color: getCellColor(cell.neighborMines) }}
                  disabled={gameState !== 'playing' && !cell.isRevealed}
                >
                  {getCellContent(cell)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Update AppContent**

Add import and case for 'minesweeper'.

**Step 3: Commit**

```bash
git add src/components/apps/
git commit -m "feat: add playable Minesweeper game"
```

---

### Task 16: File Explorer with Easter Eggs

**Files:**
- Create: `src/components/apps/ExplorerApp.tsx`
- Create: `src/data/fileSystem.ts`
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Create fileSystem data**

Create `src/data/fileSystem.ts`:

```tsx
export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'link';
  icon: string;
  content?: string;
  url?: string;
  children?: FileItem[];
  hidden?: boolean;
}

export const fileSystem: FileItem[] = [
  {
    id: 'my-computer',
    name: 'My Computer',
    type: 'folder',
    icon: '🖥️',
    children: [
      {
        id: 'c-drive',
        name: 'Local Disk (C:)',
        type: 'folder',
        icon: '💾',
        children: [
          { id: 'c-windows', name: 'Windows', type: 'folder', icon: '📁', children: [] },
          { id: 'c-program', name: 'Program Files', type: 'folder', icon: '📁', children: [] },
        ],
      },
      {
        id: 'd-drive',
        name: 'Projects (D:)',
        type: 'folder',
        icon: '💾',
        children: [
          { id: 'd-frontend', name: 'Frontend', type: 'link', icon: '🌐', url: 'https://github.com/ashrafbeshtawi/Horus' },
          { id: 'd-backend', name: 'Backend', type: 'link', icon: '⚡', url: 'https://github.com/ashrafbeshtawi' },
          { id: 'd-web3', name: 'Web3', type: 'link', icon: '🔗', url: 'https://landlord-liart.vercel.app/' },
          { id: 'd-ai', name: 'AI', type: 'link', icon: '🤖', url: 'https://github.com/ashrafbeshtawi/Auto-Trader' },
        ],
      },
    ],
  },
  {
    id: 'my-documents',
    name: 'My Documents',
    type: 'folder',
    icon: '📁',
    children: [
      {
        id: 'readme',
        name: 'README.txt',
        type: 'file',
        icon: '📄',
        content: `Hello, curious explorer!

If you're reading this, you've discovered the hidden depths of Ashraf OS.

I'm Ashraf, a passionate developer who believes technology should be fun.

This entire OS was built with Next.js, TypeScript, and a lot of nostalgia for Windows XP.

Keep exploring - there might be more secrets hidden around...

Best,
Ashraf Beshtawi
Senior Backend & AI Engineer
Berlin, Germany`,
      },
      {
        id: 'projects-folder',
        name: 'Projects',
        type: 'folder',
        icon: '📁',
        children: [
          { id: 'p-horus', name: 'Horus.url', type: 'link', icon: '🔗', url: 'https://github.com/ashrafbeshtawi/Horus' },
          { id: 'p-mockingbird', name: 'Mocking-Bird.url', type: 'link', icon: '🔗', url: 'https://mocking-bird-three.vercel.app/' },
          { id: 'p-landlord', name: 'LandLord.url', type: 'link', icon: '🔗', url: 'https://landlord-liart.vercel.app/' },
          { id: 'p-autotrader', name: 'Auto-Trader.url', type: 'link', icon: '🔗', url: 'https://github.com/ashrafbeshtawi/Auto-Trader' },
        ],
      },
      {
        id: 'secret-folder',
        name: 'Secret',
        type: 'folder',
        icon: '📁',
        hidden: true,
        children: [
          {
            id: 'resume',
            name: 'resume.pdf',
            type: 'link',
            icon: '📄',
            url: '/resume.pdf',
          },
          {
            id: 'credits',
            name: 'credits.txt',
            type: 'file',
            icon: '📄',
            content: `Ashraf OS v1.0

Built with:
- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand
- A lot of love and nostalgia

Created by Ashraf Beshtawi
github.com/ashrafbeshtawi

Special thanks to Windows XP for the memories!`,
          },
        ],
      },
    ],
  },
];

export function findItem(items: FileItem[], id: string): FileItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}
```

**Step 2: Create ExplorerApp**

Create `src/components/apps/ExplorerApp.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { fileSystem, FileItem, findItem } from '@/data/fileSystem';

interface ExplorerAppProps {
  startPath?: string;
}

export function ExplorerApp({ startPath = 'my-computer' }: ExplorerAppProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([startPath]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const getCurrentFolder = (): FileItem | null => {
    let items = fileSystem;
    let current: FileItem | null = null;

    for (const pathPart of currentPath) {
      current = items.find((i) => i.id === pathPart) || null;
      if (current?.children) {
        items = current.children;
      }
    }
    return current;
  };

  const currentFolder = getCurrentFolder();
  const items = currentFolder?.children || fileSystem;
  const displayItems = showHidden ? items : items.filter((i) => !i.hidden);

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.id]);
      setSelectedItem(null);
      setFileContent(null);
    } else if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank');
    } else if (item.type === 'file' && item.content) {
      setFileContent(item.content);
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
      setFileContent(null);
    }
  };

  const pathDisplay = currentPath.map((p) => {
    const item = findItem(fileSystem, p);
    return item?.name || p;
  }).join(' > ');

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu bar */}
      <div className="flex gap-4 px-2 py-1 text-[11px] border-b border-[#919b9c] bg-[#f1efe2]">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span
          className="hover:underline cursor-pointer"
          onClick={() => setShowHidden(!showHidden)}
        >
          View {showHidden ? '✓' : ''} Hidden
        </span>
        <span className="hover:underline cursor-pointer">Tools</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex gap-1 px-2 py-1 border-b border-[#919b9c] bg-[#f6f4ec]">
        <button onClick={handleBack} className="xp-button" disabled={currentPath.length <= 1}>
          ← Back
        </button>
        <button className="xp-button">→</button>
        <button className="xp-button">📁</button>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-1 px-2 py-1 border-b border-[#919b9c] bg-[#f1efe2]">
        <span className="text-[11px]">Address</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-1 py-0.5 text-[11px]">
          {pathDisplay}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Content area */}
        <div className="flex-1 bg-white p-2 overflow-auto">
          {fileContent ? (
            <div className="font-mono text-[12px] whitespace-pre-wrap p-2 bg-[#ffffcc] border border-[#e6e600] rounded">
              <div className="flex justify-between mb-2">
                <span className="font-bold">File Content</span>
                <button
                  onClick={() => setFileContent(null)}
                  className="text-blue-600 hover:underline"
                >
                  ← Back to folder
                </button>
              </div>
              {fileContent}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {displayItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  className={`flex flex-col items-center p-2 rounded ${
                    selectedItem === item.id ? 'bg-[#316ac5] text-white' : 'hover:bg-gray-100'
                  } ${item.hidden ? 'opacity-50' : ''}`}
                >
                  <span className="text-3xl mb-1">{item.icon}</span>
                  <span className="text-[11px] text-center break-words w-full">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="h-[20px] bg-[#ece9d8] border-t border-[#919b9c] flex items-center px-2 text-[10px] text-gray-600">
        <span>{displayItems.length} object(s)</span>
        {showHidden && <span className="ml-2">(showing hidden files)</span>}
      </div>
    </div>
  );
}
```

**Step 3: Update AppContent**

Add imports and cases for 'explorer', 'explorer-docs', 'my-computer', 'recycle-bin'.

**Step 4: Commit**

```bash
git add src/components/apps/ src/data/fileSystem.ts
git commit -m "feat: add File Explorer with easter eggs and hidden files"
```

---

## Phase 5: Context Menu & Audio

### Task 17: Right-Click Context Menu

**Files:**
- Create: `src/components/contextmenu/ContextMenu.tsx`
- Create: `src/stores/contextMenuStore.ts`
- Modify: `src/components/desktop/Desktop.tsx`

**Step 1: Create context menu store**

Create `src/stores/contextMenuStore.ts`:

```tsx
import { create } from 'zustand';

interface MenuItem {
  label: string;
  action: () => void;
  divider?: boolean;
  disabled?: boolean;
}

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  items: MenuItem[];
  openMenu: (x: number, y: number, items: MenuItem[]) => void;
  closeMenu: () => void;
}

export const useContextMenuStore = create<ContextMenuState>((set) => ({
  isOpen: false,
  x: 0,
  y: 0,
  items: [],
  openMenu: (x, y, items) => set({ isOpen: true, x, y, items }),
  closeMenu: () => set({ isOpen: false }),
}));
```

**Step 2: Create ContextMenu component**

Create `src/components/contextmenu/ContextMenu.tsx`:

```tsx
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
```

**Step 3: Update Desktop to include context menu**

Modify `src/components/desktop/Desktop.tsx` to handle right-click and render ContextMenu.

**Step 4: Commit**

```bash
git add src/components/contextmenu/ src/stores/contextMenuStore.ts src/components/desktop/Desktop.tsx
git commit -m "feat: add right-click context menu"
```

---

### Task 18: Audio System

**Files:**
- Create: `src/hooks/useAudio.ts`
- Modify: `src/components/boot/WelcomeScreen.tsx` to play startup sound

**Step 1: Create useAudio hook**

Create `src/hooks/useAudio.ts`:

```tsx
'use client';

import { useCallback, useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '@/stores/audioStore';

const sounds: Record<string, Howl> = {};

export function useAudio() {
  const { isMuted, volume } = useAudioStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      sounds.startup = new Howl({ src: ['/sounds/startup.mp3'], volume: 0.5 });
      sounds.click = new Howl({ src: ['/sounds/click.mp3'], volume: 0.3 });
      sounds.error = new Howl({ src: ['/sounds/error.mp3'], volume: 0.4 });
      initialized.current = true;
    }
  }, []);

  const play = useCallback(
    (sound: 'startup' | 'click' | 'error') => {
      if (!isMuted && sounds[sound]) {
        sounds[sound].volume(volume);
        sounds[sound].play();
      }
    },
    [isMuted, volume]
  );

  return { play };
}
```

**Step 2: Update WelcomeScreen to play startup sound**

Modify `src/components/boot/WelcomeScreen.tsx` to call `play('startup')` when entering desktop.

**Step 3: Add placeholder sound files**

```bash
# Create empty placeholder files (replace with real sounds)
touch public/sounds/startup.mp3
touch public/sounds/click.mp3
touch public/sounds/error.mp3
```

**Step 4: Commit**

```bash
git add src/hooks/ public/sounds/ src/components/boot/WelcomeScreen.tsx
git commit -m "feat: add audio system with XP sounds"
```

---

## Phase 6: Final Polish

### Task 19: Update All AppContent Cases

**Files:**
- Modify: `src/components/apps/AppContent.tsx`

**Step 1: Complete AppContent with all app cases**

Update `src/components/apps/AppContent.tsx` to include all components:

```tsx
import { FrontendApp } from './FrontendApp';
import { BackendApp } from './BackendApp';
import { Web3App } from './Web3App';
import { AIApp } from './AIApp';
import { ContactApp } from './ContactApp';
import { NotepadApp } from './NotepadApp';
import { MinesweeperApp } from './MinesweeperApp';
import { ExplorerApp } from './ExplorerApp';

interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component }: AppContentProps) {
  switch (component) {
    case 'frontend':
      return <FrontendApp />;
    case 'backend':
      return <BackendApp />;
    case 'web3':
      return <Web3App />;
    case 'ai':
      return <AIApp />;
    case 'contact':
      return <ContactApp />;
    case 'notepad':
      return <NotepadApp />;
    case 'minesweeper':
      return <MinesweeperApp />;
    case 'explorer':
    case 'my-computer':
      return <ExplorerApp startPath="my-computer" />;
    case 'explorer-docs':
    case 'my-documents':
      return <ExplorerApp startPath="my-documents" />;
    case 'recycle-bin':
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <span className="text-6xl">🗑️</span>
            <p className="mt-2">Recycle Bin is empty</p>
          </div>
        </div>
      );
    case 'ie-welcome':
      return (
        <div className="h-full bg-white p-8">
          <h1 className="text-2xl font-bold text-[#003c74] mb-4">Welcome to Internet Explorer</h1>
          <p className="text-gray-600">Double-click Frontend.exe to see a demo!</p>
        </div>
      );
    default:
      return (
        <div className="p-4 text-gray-500">
          App not found: {component}
        </div>
      );
  }
}
```

**Step 2: Commit**

```bash
git add src/components/apps/AppContent.tsx
git commit -m "feat: complete AppContent with all application routes"
```

---

### Task 20: Add Portfolio Images

**Files:**
- Create: `public/img/` directory with placeholder images

**Step 1: Create image directory and placeholders**

```bash
mkdir -p public/img
# Add your actual images: frontend.png, backend.png, web3.png, ai.png, me.jpeg
```

**Step 2: Commit**

```bash
git add public/img/
git commit -m "feat: add portfolio images directory"
```

---

### Task 21: Final Testing & Cleanup

**Step 1: Run development server**

```bash
npm run dev
```

**Step 2: Test all functionality**

- Boot sequence plays through
- Desktop icons appear
- All windows open, drag, resize, minimize, maximize, close
- Start menu opens with All Programs
- Taskbar shows open windows
- System tray clock updates
- Audio toggle works
- Minesweeper is playable
- File Explorer navigates, shows hidden files
- All portfolio apps display content
- Context menu appears on right-click
- Shutdown loops back to boot

**Step 3: Build for production**

```bash
npm run build
```

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: WinXP WebOS portfolio complete"
```

---

## Summary

This plan creates a fully functional Windows XP-style web OS with:

- **Boot sequence**: BIOS → Loading → Welcome → Desktop
- **Desktop**: Icons, wallpaper, taskbar, start menu
- **Window system**: Draggable, resizable, z-index management
- **Portfolio apps**: IE (Frontend), Terminal (Backend), Wallet (Web3), Neural (AI), Outlook (Contact)
- **Utilities**: Notepad, Minesweeper (playable), File Explorer
- **Easter eggs**: Hidden folder with resume and credits
- **Audio**: XP sounds, muted by default
- **Context menu**: Right-click functionality

Total tasks: 21
Estimated components: ~25 files
