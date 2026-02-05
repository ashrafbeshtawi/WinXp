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
