'use client';

import { useBootStore } from '@/stores/bootStore';
import { BiosScreen } from './BiosScreen';
import { LoadingScreen } from './LoadingScreen';
import { WelcomeScreen } from './WelcomeScreen';

interface BootSequenceProps {
  children: React.ReactNode;
}

export function BootSequence({ children }: BootSequenceProps) {
  const phase = useBootStore((state) => state.phase);

  if (phase === 'bios') return <BiosScreen />;
  if (phase === 'loading') return <LoadingScreen />;
  if (phase === 'welcome') return <WelcomeScreen />;

  return <>{children}</>;
}
