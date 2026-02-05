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
