export interface DesktopItem {
  id: string;
  label: string;
  icon: string;
  component: string;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

export const desktopItems: DesktopItem[] = [
  { id: 'my-computer', label: 'My Computer', icon: '🖥️', component: 'explorer', width: 700, height: 500, minWidth: 400, minHeight: 300 },
  { id: 'my-documents', label: 'My Documents', icon: '📁', component: 'explorer-docs', width: 700, height: 500, minWidth: 400, minHeight: 300 },
  { id: 'ie', label: 'Internet Explorer', icon: '🌐', component: 'ie-welcome', width: 800, height: 600, minWidth: 400, minHeight: 300 },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: '🗑️', component: 'recycle-bin', width: 500, height: 400, minWidth: 300, minHeight: 200 },
  { id: 'frontend', label: 'Frontend.exe', icon: '🌐', component: 'frontend', width: 850, height: 600, minWidth: 600, minHeight: 400 },
  { id: 'backend', label: 'Backend.exe', icon: '⚡', component: 'backend', width: 700, height: 500, minWidth: 500, minHeight: 350 },
  { id: 'web3', label: 'Web3.exe', icon: '🔗', component: 'web3', width: 600, height: 500, minWidth: 400, minHeight: 350 },
  { id: 'ai', label: 'AI.exe', icon: '🤖', component: 'ai', width: 700, height: 500, minWidth: 500, minHeight: 350 },
  { id: 'contact', label: 'Contact.exe', icon: '✉️', component: 'contact', width: 750, height: 550, minWidth: 500, minHeight: 400 },
];
