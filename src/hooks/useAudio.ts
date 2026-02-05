'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { useAudioStore } from '@/stores/audioStore';

export type SoundType = 'startup' | 'click' | 'error' | 'shutdown';

// Lazy-loaded sounds cache
const soundsCache: Record<string, Howl | null> = {
  startup: null,
  click: null,
  error: null,
  shutdown: null,
};

function getSound(name: SoundType): Howl {
  if (!soundsCache[name]) {
    const volumes: Record<SoundType, number> = {
      startup: 0.5,
      click: 0.4,
      error: 0.4,
      shutdown: 0.5,
    };

    soundsCache[name] = new Howl({
      src: [`/sounds/${name}.mp3`],
      volume: volumes[name],
      html5: true, // Use HTML5 Audio for better compatibility
    });
  }
  return soundsCache[name]!;
}

export function useAudio() {
  const { isMuted, volume } = useAudioStore();
  const volumeRef = useRef(volume);

  // Keep volume ref updated
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const play = useCallback(
    (sound: SoundType) => {
      if (isMuted) return;

      try {
        const howl = getSound(sound);
        howl.volume(volumeRef.current * (sound === 'click' ? 0.8 : 1));
        howl.play();
      } catch (e) {
        console.warn('Audio playback failed:', e);
      }
    },
    [isMuted]
  );

  const stop = useCallback((sound: SoundType) => {
    try {
      const howl = soundsCache[sound];
      if (howl) {
        howl.stop();
      }
    } catch (e) {
      console.warn('Audio stop failed:', e);
    }
  }, []);

  return { play, stop };
}
