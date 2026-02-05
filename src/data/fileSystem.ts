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

export interface SecretFile extends FileItem {
  secretId?: string;
}

export const fileSystem: FileItem[] = [
  {
    id: 'recycle-bin',
    name: 'Recycle Bin',
    type: 'folder',
    icon: '/img/Recycle Bin (empty).png',
    children: [],
  },
  {
    id: 'secret-projects',
    name: 'Secret Projects',
    type: 'folder',
    icon: '/img/Folder Closed.png',
    children: [
      // Root level - Top 5 most anticipated
      { id: 'secret-gta6', name: 'GTA_6.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-gta6' },
      { id: 'secret-agi', name: 'AGI.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-agi' },
      { id: 'secret-halflife3', name: 'Half_Life_3.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-halflife3' },
      { id: 'secret-aliens', name: 'First_Contact.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-aliens' },
      { id: 'secret-simulation', name: 'Simulation_Proof.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-simulation' },
      // Anime folder
      {
        id: 'anime-folder',
        name: 'Anime',
        type: 'folder',
        icon: '/img/Folder Closed.png',
        children: [
          { id: 'secret-onepiece', name: 'One_Piece_Ending.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-onepiece' },
          { id: 'secret-hxh', name: 'Hunter_x_Hunter_Ending.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-hxh' },
        ],
      },
      // Games folder
      {
        id: 'games-folder',
        name: 'Games',
        type: 'folder',
        icon: '/img/Game Controller.png',
        children: [
          { id: 'secret-silksong', name: 'Silksong.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-silksong' },
          { id: 'secret-tes6', name: 'Elder_Scrolls_6.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-tes6' },
          { id: 'secret-portal3', name: 'Portal_3.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-portal3' },
          { id: 'secret-bloodborne', name: 'Bloodborne_PC.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-bloodborne' },
          { id: 'secret-starcitizen', name: 'Star_Citizen_Release.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-starcitizen' },
          { id: 'secret-mother3', name: 'Mother_3_English.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-mother3' },
        ],
      },
      // Music folder
      {
        id: 'music-folder',
        name: 'Music',
        type: 'folder',
        icon: '/img/My Music.png',
        children: [
          { id: 'secret-daftpunk', name: 'Daft_Punk_Reunion.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-daftpunk' },
        ],
      },
      // Books folder
      {
        id: 'books-folder',
        name: 'Books',
        type: 'folder',
        icon: '/img/Address Book.png',
        children: [
          { id: 'secret-winds', name: 'Winds_of_Winter.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-winds' },
        ],
      },
      // Science folder
      {
        id: 'science-folder',
        name: 'Science',
        type: 'folder',
        icon: '/img/Folder Closed.png',
        children: [
          { id: 'secret-aging', name: 'Cure_for_Aging.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-aging' },
          { id: 'secret-mars', name: 'Humans_on_Mars.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-mars' },
          { id: 'secret-linux', name: 'Year_of_Linux_Desktop.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-linux' },
          { id: 'secret-vr', name: 'Full_Dive_VR.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-vr' },
          { id: 'secret-theory', name: 'Theory_of_Everything.classified', type: 'file', icon: '/img/Lock.png', content: 'SECRET:secret-theory' },
        ],
      },
    ],
  },
  {
    id: 'my-computer',
    name: 'My Computer',
    type: 'folder',
    icon: '/img/My Computer.png',
    children: [
      { id: 'c-drive', name: 'Local Disk (C:)', type: 'folder', icon: '💾', children: [
        { id: 'c-windows', name: 'Windows', type: 'folder', icon: '/img/Folder Closed.png', children: [] },
        { id: 'c-program', name: 'Program Files', type: 'folder', icon: '/img/Folder Closed.png', children: [] },
      ]},
      { id: 'd-drive', name: 'Projects (D:)', type: 'folder', icon: '💾', children: [
        { id: 'd-frontend', name: 'Frontend', type: 'link', icon: '/img/frontend.svg', url: 'https://github.com/ashrafbeshtawi/Horus' },
        { id: 'd-backend', name: 'Backend', type: 'link', icon: '/img/backend.svg', url: 'https://github.com/ashrafbeshtawi' },
        { id: 'd-web3', name: 'Web3', type: 'link', icon: '/img/web3.svg', url: 'https://landlord-liart.vercel.app/' },
        { id: 'd-ai', name: 'AI', type: 'link', icon: '/img/ai.svg', url: 'https://github.com/ashrafbeshtawi/Auto-Trader' },
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
