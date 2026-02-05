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
