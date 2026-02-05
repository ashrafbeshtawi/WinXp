'use client';

import { useWindowStore } from '@/stores/windowStore';
import { Window } from './Window';
import { AppContent } from '@/components/apps/AppContent';

export function WindowManager() {
  const windows = useWindowStore((state) => state.windows);
  const highestZIndex = useWindowStore((state) => state.highestZIndex);

  return (
    <>
      {windows.map((win) => (
        <Window key={win.id} window={win} isActive={win.zIndex === highestZIndex}>
          <AppContent component={win.component} windowId={win.id} />
        </Window>
      ))}
    </>
  );
}
