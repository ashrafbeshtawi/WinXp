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
