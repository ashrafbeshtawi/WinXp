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
      isMuted: false, // Sounds enabled by default
      volume: 0.5,
      toggleMute: () => set({ isMuted: !get().isMuted }),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
    }),
    {
      name: 'ashraf-os-audio-v2', // New version to reset old muted settings
    }
  )
);
