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
