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
    case 'ie':
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
      return <ExplorerApp initialPath="recycle-bin" />;
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
