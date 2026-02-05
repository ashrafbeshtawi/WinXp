export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'link';
  icon: string;
  content?: string;
  url?: string;
  children?: FileItem[];
  hidden?: boolean;
}

export const fileSystem: FileItem[] = [
  {
    id: 'my-computer',
    name: 'My Computer',
    type: 'folder',
    icon: '🖥️',
    children: [
      { id: 'c-drive', name: 'Local Disk (C:)', type: 'folder', icon: '💾', children: [
        { id: 'c-windows', name: 'Windows', type: 'folder', icon: '📁', children: [] },
        { id: 'c-program', name: 'Program Files', type: 'folder', icon: '📁', children: [] },
      ]},
      { id: 'd-drive', name: 'Projects (D:)', type: 'folder', icon: '💾', children: [
        { id: 'd-frontend', name: 'Frontend', type: 'link', icon: '🌐', url: 'https://github.com/ashrafbeshtawi/Horus' },
        { id: 'd-backend', name: 'Backend', type: 'link', icon: '⚡', url: 'https://github.com/ashrafbeshtawi' },
        { id: 'd-web3', name: 'Web3', type: 'link', icon: '🔗', url: 'https://landlord-liart.vercel.app/' },
        { id: 'd-ai', name: 'AI', type: 'link', icon: '🤖', url: 'https://github.com/ashrafbeshtawi/Auto-Trader' },
      ]},
    ],
  },
  {
    id: 'my-documents',
    name: 'My Documents',
    type: 'folder',
    icon: '📁',
    children: [
      {
        id: 'readme',
        name: 'README.txt',
        type: 'file',
        icon: '📄',
        content: `Hello, curious explorer!

If you're reading this, you've discovered the hidden depths of Ashraf OS.

I'm Ashraf, a passionate developer who believes technology should be fun.

This entire OS was built with Next.js, TypeScript, and a lot of nostalgia for Windows XP.

Keep exploring - there might be more secrets hidden around...

Best,
Ashraf Beshtawi
Senior Backend & AI Engineer
Berlin, Germany`,
      },
      {
        id: 'projects-folder',
        name: 'Projects',
        type: 'folder',
        icon: '📁',
        children: [
          { id: 'p-horus', name: 'Horus.url', type: 'link', icon: '🔗', url: 'https://github.com/ashrafbeshtawi/Horus' },
          { id: 'p-mockingbird', name: 'Mocking-Bird.url', type: 'link', icon: '🔗', url: 'https://mocking-bird-three.vercel.app/' },
          { id: 'p-landlord', name: 'LandLord.url', type: 'link', icon: '🔗', url: 'https://landlord-liart.vercel.app/' },
          { id: 'p-autotrader', name: 'Auto-Trader.url', type: 'link', icon: '🔗', url: 'https://github.com/ashrafbeshtawi/Auto-Trader' },
        ],
      },
      {
        id: 'secret-folder',
        name: 'Secret',
        type: 'folder',
        icon: '📁',
        hidden: true,
        children: [
          { id: 'resume', name: 'resume.pdf', type: 'link', icon: '📄', url: '/resume.pdf' },
          { id: 'credits', name: 'credits.txt', type: 'file', icon: '📄', content: `Ashraf OS v1.0

Built with:
- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand
- A lot of love and nostalgia

Created by Ashraf Beshtawi
github.com/ashrafbeshtawi

Special thanks to Windows XP for the memories!` },
        ],
      },
    ],
  },
];

export function findItem(items: FileItem[], id: string): FileItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}
