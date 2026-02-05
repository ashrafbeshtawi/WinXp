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
