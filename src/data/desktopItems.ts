export interface DesktopItem {
  id: string;
  label: string;
  icon: string;
  component: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  group?: 'system' | 'portfolio' | 'utilities';
}

// System icons (left column)
export const systemItems: DesktopItem[] = [
  { id: 'my-computer', label: 'My Computer', icon: '/img/My Computer.png', component: 'explorer', width: 700, height: 500, minWidth: 400, minHeight: 300, group: 'system' },
  { id: 'my-documents', label: 'My Documents', icon: '/img/documents.png', component: 'explorer-docs', width: 700, height: 500, minWidth: 400, minHeight: 300, group: 'system' },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: '/img/Recycle Bin (empty).png', component: 'recycle-bin', width: 500, height: 400, minWidth: 300, minHeight: 200, group: 'system' },
  { id: 'secret-projects', label: 'Secret Projects', icon: '/img/Security Alert.png', component: 'secret-projects', width: 700, height: 500, minWidth: 400, minHeight: 300, group: 'system' },
];

// Portfolio projects (prominent right area)
export const portfolioItems: DesktopItem[] = [
  { id: 'frontend', label: 'Frontend.exe', icon: '/img/HTML.png', component: 'frontend', width: 850, height: 600, minWidth: 600, minHeight: 400, group: 'portfolio' },
  { id: 'backend', label: 'Backend.exe', icon: '/img/Command Prompt.png', component: 'backend', width: 700, height: 500, minWidth: 500, minHeight: 350, group: 'portfolio' },
  { id: 'web3', label: 'Web3.exe', icon: '/img/Internet Connection Wizard.png', component: 'web3', width: 600, height: 500, minWidth: 400, minHeight: 350, group: 'portfolio' },
  { id: 'ai', label: 'AI.exe', icon: '/img/System Information.png', component: 'ai', width: 700, height: 500, minWidth: 500, minHeight: 350, group: 'portfolio' },
  { id: 'contact', label: 'Outlook', icon: '/img/Outlook Express.png', component: 'contact', width: 750, height: 550, minWidth: 500, minHeight: 400, group: 'portfolio' },
];

// Utility apps (bottom left)
export const utilityItems: DesktopItem[] = [
  { id: 'ie', label: 'Internet Explorer', icon: '/img/Internet Explorer 6.png', component: 'frontend', width: 800, height: 600, minWidth: 400, minHeight: 300, group: 'utilities' },
  { id: 'notepad', label: 'Notepad', icon: '/img/Notepad.png', component: 'notepad', width: 500, height: 400, minWidth: 300, minHeight: 200, group: 'utilities' },
  { id: 'minesweeper', label: 'Minesweeper', icon: '/img/Minesweeper.png', component: 'minesweeper', width: 280, height: 380, minWidth: 280, minHeight: 380, group: 'utilities' },
];

// All items combined for backwards compatibility
export const desktopItems: DesktopItem[] = [...systemItems, ...portfolioItems, ...utilityItems];
