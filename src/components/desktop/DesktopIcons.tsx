'use client';

import { desktopItems } from '@/data/desktopItems';
import { DesktopIcon } from './DesktopIcon';

export function DesktopIcons() {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-2">
      {desktopItems.map((item) => (
        <DesktopIcon key={item.id} item={item} />
      ))}
    </div>
  );
}
