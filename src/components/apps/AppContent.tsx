import { FrontendApp } from './FrontendApp';
import { BackendApp } from './BackendApp';
import { Web3App } from './Web3App';
import { AIApp } from './AIApp';
import { ContactApp } from './ContactApp';
import { NotepadApp } from './NotepadApp';
import { MinesweeperApp } from './MinesweeperApp';
import { ExplorerApp } from './ExplorerApp';
import { SecretProjectApp } from './SecretProjectApp';

// Secret projects data
const SECRET_PROJECTS: Record<string, { name: string; description: string }> = {
  // Root level
  'secret-gta6': { name: 'GTA 6', description: 'The most anticipated game in history. Will it live up to the hype?' },
  'secret-agi': { name: 'AGI', description: 'Artificial General Intelligence - When machines truly think.' },
  'secret-halflife3': { name: 'Half-Life 3', description: 'The legendary sequel that may never come. Or will it?' },
  'secret-aliens': { name: 'First Contact', description: 'Are we alone? The truth is out there...' },
  'secret-simulation': { name: 'Simulation Theory', description: 'What if this is all just code? Wake up, Neo.' },
  // Anime
  'secret-onepiece': { name: 'One Piece Ending', description: '25+ years of adventure. What is the One Piece?' },
  'secret-hxh': { name: 'Hunter x Hunter Ending', description: 'Will Togashi ever finish the Dark Continent arc?' },
  // Games
  'secret-silksong': { name: 'Silksong', description: 'The most awaited indie sequel. Still waiting...' },
  'secret-tes6': { name: 'Elder Scrolls 6', description: 'After Skyrim, what province awaits?' },
  'secret-portal3': { name: 'Portal 3', description: 'The cake is still a lie. GLaDOS awaits.' },
  'secret-bloodborne': { name: 'Bloodborne PC', description: 'A hunter must hunt... on PC.' },
  'secret-starcitizen': { name: 'Star Citizen Release', description: '$600M+ in funding. Will it ever launch?' },
  'secret-mother3': { name: 'Mother 3 English', description: 'Nintendo, please. We\'ve been waiting since 2006.' },
  // Music
  'secret-daftpunk': { name: 'Daft Punk Reunion', description: 'One more time? The robots may return.' },
  // Books
  'secret-winds': { name: 'Winds of Winter', description: 'George R.R. Martin\'s mythical next book.' },
  // Science
  'secret-aging': { name: 'Cure for Aging', description: 'Eternal youth - science fiction or near future?' },
  'secret-mars': { name: 'Humans on Mars', description: 'The next giant leap for mankind.' },
  'secret-linux': { name: 'Year of Linux Desktop', description: 'This is the year! (We say every year)' },
  'secret-vr': { name: 'Full Dive VR', description: 'Sword Art Online style VR. Link Start!' },
  'secret-theory': { name: 'Theory of Everything', description: 'Unifying quantum mechanics and general relativity.' },
};

interface AppContentProps {
  component: string;
  windowId: string;
}

export function AppContent({ component, windowId }: AppContentProps) {
  // Check if it's a secret project
  if (component.startsWith('secret-')) {
    const project = SECRET_PROJECTS[component];
    if (project) {
      return <SecretProjectApp projectName={project.name} projectDescription={project.description} />;
    }
  }

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
    case 'secret-projects':
      return <ExplorerApp initialPath="secret-projects" />;
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
