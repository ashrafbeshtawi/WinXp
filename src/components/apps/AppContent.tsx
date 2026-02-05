import { FrontendApp } from './FrontendApp';
import { BackendApp } from './BackendApp';
import { Web3App } from './Web3App';
import { AIApp } from './AIApp';
import { ContactApp } from './ContactApp';
import { NotepadApp } from './NotepadApp';
import { MinesweeperApp } from './MinesweeperApp';
import { ExplorerApp } from './ExplorerApp';

interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component, windowId }: AppContentProps) {
  switch (component) {
    case 'frontend':
      return <FrontendApp />;
    case 'backend':
      return <BackendApp />;
    case 'web3':
      return <Web3App />;
    case 'ai':
      return <AIApp />;
    case 'contact':
      return <ContactApp />;
    case 'notepad':
      return <NotepadApp />;
    case 'minesweeper':
      return <MinesweeperApp />;
    case 'explorer':
    case 'my-computer':
      return <ExplorerApp initialPath="my-computer" />;
    case 'explorer-docs':
    case 'my-documents':
      return <ExplorerApp initialPath="my-documents" />;
    case 'recycle-bin':
      return (
        <div className="h-full flex flex-col bg-white">
          {/* Menu Bar */}
          <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
            <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
            <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
            <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
            <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          </div>
          {/* Content */}
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <span className="text-6xl block mb-4">🗑️</span>
              <p className="text-sm">Recycle Bin is empty</p>
            </div>
          </div>
          {/* Status Bar */}
          <div className="px-2 py-1 bg-[#ece9d8] border-t border-[#919b9c] text-xs text-gray-600">
            0 object(s)
          </div>
        </div>
      );
    default:
      return (
        <div className="p-4">
          <p>App: {component}</p>
          <p>Window ID: {windowId}</p>
          <p className="text-gray-500 mt-2">Content coming soon...</p>
        </div>
      );
  }
}
