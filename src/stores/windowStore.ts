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
    const clampedX = Math.max(0, x);
    const clampedY = Math.max(0, y);
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, x: clampedX, y: clampedY } : w
      ),
    });
  },

  updateWindowSize: (id, width, height) => {
    set({
      windows: get().windows.map((w) => {
        if (w.id !== id) return w;
        const clampedWidth = Math.max(w.minWidth, width);
        const clampedHeight = Math.max(w.minHeight, height);
        return { ...w, width: clampedWidth, height: clampedHeight };
      }),
    });
  },
}));
