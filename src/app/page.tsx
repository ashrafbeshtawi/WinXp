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
