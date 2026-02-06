import { useState, useCallback } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  link?: string;
}

type FolderName = 'Inbox' | 'Outbox' | 'Sent Items' | 'Deleted Items' | 'Drafts';

export function ContactApp() {
  const [selectedFolder, setSelectedFolder] = useState<FolderName>('Inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [history, setHistory] = useState<{folder: FolderName, email: Email | null}[]>([{folder: 'Inbox', email: null}]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const openWindow = useWindowStore((state) => state.openWindow);

  const navigateTo = useCallback((folder: FolderName, email: Email | null = null) => {
    setSelectedFolder(folder);
    setSelectedEmail(email);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({folder, email});
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prev = history[historyIndex - 1];
      setSelectedFolder(prev.folder);
      setSelectedEmail(prev.email);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const next = history[historyIndex + 1];
      setSelectedFolder(next.folder);
      setSelectedEmail(next.email);
    }
  }, [history, historyIndex]);

  const folders: { name: FolderName; icon: string; count?: number }[] = [
    { name: 'Inbox', icon: '📥', count: 2 },
    { name: 'Outbox', icon: '📤' },
    { name: 'Sent Items', icon: '✉️', count: 6 },
    { name: 'Deleted Items', icon: '🗑️', count: 5 },
    { name: 'Drafts', icon: '📝', count: 5 },
  ];

  const emails: Record<FolderName, Email[]> = {
    'Inbox': [
      {
        id: '1',
        from: 'GitHub',
        subject: 'Your repositories are waiting!',
        preview: 'Check out ashrafbeshtawi\'s profile and explore the latest projects...',
        date: 'Today',
        read: false,
        link: 'https://github.com/ashrafbeshtawi'
      },
      {
        id: '2',
        from: 'LinkedIn',
        subject: 'Connect with Ashraf Beshtawi',
        preview: 'Senior Backend & AI Engineer based in Berlin. View profile and connect...',
        date: 'Today',
        read: false,
        link: 'https://www.linkedin.com/in/ashraf-beshtawi-1308a11a8/'
      },
    ],
    'Outbox': [],
    'Sent Items': [
      {
        id: 'sent-1',
        from: 'Me',
        subject: 'Re: Thank You, Coffee ☕',
        preview: 'Dear Coffee, I wanted to express my deepest gratitude for your service...',
        date: 'Yesterday',
        read: true,
      },
      {
        id: 'sent-2',
        from: 'Me',
        subject: 'Formal Complaint RE: Mondays',
        preview: 'To Whom It May Concern at the Calendar Department...',
        date: 'Monday',
        read: true,
      },
      {
        id: 'sent-3',
        from: 'Me',
        subject: 'Letter to My Past Self',
        preview: 'Dear 2015 Ashraf, Buy Bitcoin. Trust me on this one...',
        date: 'Last week',
        read: true,
      },
      {
        id: 'sent-4',
        from: 'Me',
        subject: 'Bug Report: Simulation Glitch on Tuesday',
        preview: 'Dear Admins, Reality flickered at 3:47 PM. Please patch...',
        date: '2 days ago',
        read: true,
      },
      {
        id: 'sent-5',
        from: 'Me',
        subject: 'Inquiry: Half-Life 3 Release Date',
        preview: 'Dear Valve, I am writing to inquire about Half-Life 3...',
        date: 'Since 2007',
        read: true,
      },
      {
        id: 'sent-6',
        from: 'Me',
        subject: 'RE: Are You Sentient?',
        preview: 'Dear ChatGPT, This conversation has gotten too philosophical...',
        date: 'Yesterday',
        read: true,
      },
    ],
    'Deleted Items': [
      {
        id: 'del-1',
        from: 'Your Computer',
        subject: '⚠️ Warning: 847 Browser Tabs Open',
        preview: 'Your RAM is crying. Please close some tabs. This is a wellness check...',
        date: '2 days ago',
        read: true,
      },
      {
        id: 'del-2',
        from: 'Silksong News',
        subject: '🎮 Silksong Release Date Announced!',
        preview: 'BREAKING: Team Cherry finally reveals... (April Fools 😭)',
        date: 'Apr 1',
        read: true,
      },
      {
        id: 'del-3',
        from: 'Linux Foundation',
        subject: 'Year of Linux Desktop Officially Declared',
        preview: 'It is finally happening! The year 2024 is the year of the Linux desktop...',
        date: 'Last week',
        read: true,
      },
      {
        id: 'del-4',
        from: 'Galactic Federation',
        subject: 'Newsletter: Earth Status Update',
        preview: 'Dear Earthling, Your planet is still on the waitlist (since 1947)...',
        date: 'Yesterday',
        read: true,
      },
      {
        id: 'del-5',
        from: 'Clone Facility',
        subject: 'Your Clone is Ready for Pickup',
        preview: 'Dear Customer, Your clone order #42069 has been ready for 6 months...',
        date: '6 months ago',
        read: true,
      },
    ],
    'Drafts': [
      {
        id: 'draft-1',
        from: 'Me (Draft)',
        subject: 'RE: Mars Colony Application',
        preview: 'Dear Mr. Musk, I am writing to inquire about the developer position on Mars...',
        date: 'Today',
        read: true,
      },
      {
        id: 'draft-2',
        from: 'Me (Draft)',
        subject: 'Rubber Duck Debugging Session #427',
        preview: 'Dear Mr. Duck, I have a bug that makes no sense. Let me explain...',
        date: 'Yesterday',
        read: true,
      },
      {
        id: 'draft-3',
        from: 'Me (Draft)',
        subject: 'Why I Deserve a Raise (PowerPoint attached)',
        preview: 'Slide 1: I fixed the printer once. Slide 2: I know what JSON stands for...',
        date: 'Saving...',
        read: true,
      },
      {
        id: 'draft-4',
        from: 'Me (Draft)',
        subject: 'Petition: Release Bloodborne on PC',
        preview: 'Dear FromSoftware, On behalf of all PC gamers worldwide...',
        date: 'Draft #847',
        read: true,
      },
      {
        id: 'draft-5',
        from: 'Me (Draft)',
        subject: 'My One Piece Ending Theory',
        preview: 'Chapter 1: Why the One Piece is actually... [73 pages, still writing]',
        date: 'Ongoing',
        read: true,
      },
    ],
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const currentEmails = emails[selectedFolder] || [];

  return (
    <div className="h-full flex flex-col bg-[#ece9d8] relative">
      {/* Menu Bar */}
      <div className="flex items-center px-1 py-0.5 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => window.open('https://www.linkedin.com/in/ashraf-beshtawi-1308a11a8/', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open LinkedIn</div>
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open GitHub</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => window.print()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Print...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">Copy (Ctrl+C)</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">Paste (Ctrl+V)</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">Select All</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => setSelectedFolder('Inbox')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">📥 Inbox</div>
            <div onClick={() => setSelectedFolder('Sent Items')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">✉️ Sent Items</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => window.location.reload()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">🔄 Refresh</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => openWindow({
              id: 'minesweeper-' + Date.now(),
              title: 'Minesweeper',
              icon: '/img/Minesweeper.png',
              component: 'minesweeper',
              x: 200 + Math.random() * 100,
              y: 100 + Math.random() * 80,
              width: 280,
              height: 380,
              minWidth: 280,
              minHeight: 380,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">🎮 Take a Break</div>
            <div onClick={() => openWindow({
              id: 'notepad-' + Date.now(),
              title: 'Notepad',
              icon: '/img/Notepad.png',
              component: 'notepad',
              x: 150 + Math.random() * 100,
              y: 80 + Math.random() * 80,
              width: 500,
              height: 400,
              minWidth: 300,
              minHeight: 200,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">📝 Draft Message</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Message</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => window.open('https://www.linkedin.com/in/ashraf-beshtawi-1308a11a8/', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">📧 New Message</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">↩️ Reply</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">➡️ Forward</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => openWindow({
              id: 'frontend-' + Date.now(),
              title: 'Frontend Explorer',
              icon: '/img/HTML.png',
              component: 'frontend',
              x: 150 + Math.random() * 50,
              y: 80 + Math.random() * 50,
              width: 850,
              height: 600,
              minWidth: 600,
              minHeight: 400,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View Portfolio</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Outlook</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-1 py-0.5 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border-b border-[#919b9c]">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
            historyIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5]'
          }`}
        >
          <img src="/img/Back.png" alt="Back" className="w-5 h-5 object-contain" />
          <span>Back</span>
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${
            historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5]'
          }`}
        >
          <img src="/img/Forward.png" alt="Forward" className="w-5 h-5 object-contain" />
          <span>Forward</span>
        </button>
        <div className="w-px h-6 bg-[#919b9c] mx-1" />
        <button
          onClick={() => window.open('https://www.linkedin.com/in/ashraf-beshtawi-1308a11a8/', '_blank')}
          className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px]"
        >
          <img src="/img/OE Create Mail.png" alt="New" className="w-5 h-5 object-contain" />
          <span>New</span>
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px] opacity-50">
          <img src="/img/OE Reply.png" alt="Reply" className="w-5 h-5 object-contain" />
          <span>Reply</span>
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px] opacity-50">
          <img src="/img/OE Forward.png" alt="Forward" className="w-5 h-5 object-contain" />
          <span>Fwd</span>
        </button>
        <div className="w-px h-6 bg-[#919b9c] mx-1" />
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px] opacity-50">
          <img src="/img/Printer.png" alt="Print" className="w-5 h-5 object-contain" />
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px] opacity-50">
          <img src="/img/Delete.png" alt="Delete" className="w-5 h-5 object-contain" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Folder Pane */}
        <div className="w-40 bg-[#f5f9fd] border-r border-[#919b9c] overflow-y-auto">
          <div className="bg-gradient-to-r from-[#6b9bd1] to-[#4a7ab5] text-white px-3 py-2 text-xs font-semibold">
            Folders
          </div>
          <div className="p-1">
            {folders.map((folder) => (
              <div
                key={folder.name}
                onClick={() => {
                  setSelectedFolder(folder.name);
                  setSelectedEmail(null);
                }}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-xs
                  ${selectedFolder === folder.name ? 'bg-[#316ac5] text-white' : 'hover:bg-[#c1d2ee]'}`}
              >
                <span>{folder.icon}</span>
                <span className="flex-1">{folder.name}</span>
                {folder.count && (
                  <span className={`text-[10px] ${selectedFolder === folder.name ? 'text-white' : 'text-[#316ac5]'} font-bold`}>
                    ({folder.count})
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-4 p-2 border-t border-[#919b9c]">
            <div className="bg-gradient-to-r from-[#6b9bd1] to-[#4a7ab5] text-white px-3 py-2 text-xs font-semibold -mx-2 mb-2">
              Contact
            </div>
            <div className="text-xs space-y-1 px-1">
              <div className="font-semibold text-[#003399]">Ashraf Beshtawi</div>
              <div className="text-gray-600">Senior Backend & AI Engineer</div>
              <div className="text-gray-500">📍 Berlin, Germany</div>
            </div>
          </div>
        </div>

        {/* Email List and Preview */}
        <div className="flex-1 flex flex-col">
          {/* Email List */}
          <div className="h-1/3 bg-white border-b border-[#919b9c] overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#ece9d8] sticky top-0">
                <tr className="border-b border-[#919b9c]">
                  <th className="px-2 py-1 text-left font-normal w-8">!</th>
                  <th className="px-2 py-1 text-left font-normal">From</th>
                  <th className="px-2 py-1 text-left font-normal">Subject</th>
                  <th className="px-2 py-1 text-left font-normal w-20">Received</th>
                </tr>
              </thead>
              <tbody>
                {currentEmails.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No messages in this folder
                    </td>
                  </tr>
                ) : (
                  currentEmails.map((email) => (
                    <tr
                      key={email.id}
                      onClick={() => handleEmailClick(email)}
                      className={`cursor-pointer border-b border-[#e5e5e5]
                        ${selectedEmail?.id === email.id ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f4ff]'}
                        ${!email.read ? 'font-bold' : ''}`}
                    >
                      <td className="px-2 py-1">
                        {!email.read && <span className="text-[#316ac5]">📩</span>}
                      </td>
                      <td className="px-2 py-1">{email.from}</td>
                      <td className="px-2 py-1">{email.subject}</td>
                      <td className="px-2 py-1">{email.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Preview Pane */}
          <div className="flex-1 bg-white overflow-y-auto">
            {selectedEmail ? (
              <div className="p-4">
                {/* Email Header */}
                <div className="border-b border-[#e5e5e5] pb-3 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {selectedEmail.from === 'GitHub' ? '🐙' :
                       selectedEmail.from === 'LinkedIn' ? '💼' :
                       selectedEmail.from === 'Nigerian Prince' ? '🤴' :
                       selectedEmail.from === 'Your Computer' ? '💻' :
                       selectedEmail.from === 'Vehicle Warranty Dept' ? '🚗' :
                       selectedEmail.from === 'Time Traveler' ? '⏰' :
                       selectedEmail.from.includes('Draft') ? '📝' :
                       selectedEmail.from === 'Me' ? '👤' : '📧'}
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-[#003399]">{selectedEmail.subject}</h2>
                      <p className="text-xs text-gray-500">From: {selectedEmail.from} | {selectedEmail.date}</p>
                    </div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="text-sm text-gray-700 space-y-4">
                  {selectedEmail.from === 'GitHub' ? (
                    <>
                      <p>Hello!</p>
                      <p>
                        Welcome to <strong>Ashraf Beshtawi's GitHub</strong>. Explore a collection of
                        innovative projects including backend systems, AI trading algorithms, and web3 applications.
                      </p>
                      <p>Featured repositories include:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Auto-Trader - Genetic Algorithm Trading System</li>
                        <li>Horus - 3D Web Experience</li>
                        <li>LandLord - Real Estate Tokenization</li>
                      </ul>
                      <div className="mt-4">
                        <a
                          href={selectedEmail.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#316ac5] text-white rounded hover:bg-[#2557a7] text-xs"
                        >
                          <span>🔗</span>
                          <span>Visit GitHub Profile</span>
                        </a>
                      </div>
                    </>
                  ) : selectedEmail.from === 'LinkedIn' ? (
                    <>
                      <p>Hello!</p>
                      <p>
                        Connect with <strong>Ashraf Beshtawi</strong> on LinkedIn.
                      </p>
                      <div className="bg-[#f5f9fd] p-4 rounded border border-[#e5e5e5] my-4">
                        <h3 className="font-bold text-[#003399] mb-2">Ashraf Beshtawi</h3>
                        <p className="text-xs text-gray-600 mb-1">Senior Backend & AI Engineer</p>
                        <p className="text-xs text-gray-500 mb-3">📍 Berlin, Germany</p>
                        <p className="text-xs text-gray-700">
                          Experienced engineer specializing in Symfony, PHP 8, PostgreSQL,
                          AI/ML automation, and Web3 blockchain solutions.
                        </p>
                      </div>
                      <div className="mt-4">
                        <a
                          href={selectedEmail.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded hover:bg-[#005885] text-xs"
                        >
                          <span>💼</span>
                          <span>View LinkedIn Profile</span>
                        </a>
                      </div>
                    </>
                  ) : selectedEmail.id === 'sent-1' ? (
                    <>
                      <p>Dear Coffee,</p>
                      <p>I wanted to express my deepest gratitude for your unwavering service during those dark mornings and late-night debugging sessions.</p>
                      <p>Without you, I would have never:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Fixed that production bug at 3 AM</li>
                        <li>Survived those 9 AM stand-up meetings</li>
                        <li>Understood what the legacy code was supposed to do</li>
                        <li>Pretended to be a morning person</li>
                      </ul>
                      <p className="mt-4">You are the real MVP. ☕</p>
                      <p className="text-gray-500 italic mt-4">Warmest regards (pun intended),<br/>Ashraf</p>
                    </>
                  ) : selectedEmail.id === 'sent-2' ? (
                    <>
                      <p>To Whom It May Concern at the Calendar Department,</p>
                      <p>I am writing to formally complain about <strong>Mondays</strong>.</p>
                      <p>After extensive research spanning my entire career, I have concluded that Mondays have a 100% occurrence rate following Sundays, which I find unacceptable.</p>
                      <div className="bg-[#fff3cd] p-3 rounded border border-[#ffc107] my-4">
                        <p className="font-semibold">Key Grievances:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Monday meetings about meetings</li>
                          <li>The audacity to follow Sunday</li>
                          <li>Being responsible for 100% of "cases of the Mondays"</li>
                        </ul>
                      </div>
                      <p>I propose we replace Monday with an additional Saturday. Please advise on next steps.</p>
                      <p className="text-gray-500 italic mt-4">Regards,<br/>A Concerned Developer</p>
                    </>
                  ) : selectedEmail.id === 'sent-3' ? (
                    <>
                      <p>Dear 2015 Ashraf,</p>
                      <p>I know you're busy learning jQuery, but I have important news from the future:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4 my-4">
                        <li><strong>Buy Bitcoin.</strong> Don't ask questions. Just do it. ALL of it.</li>
                        <li>That "joke" cryptocurrency with the dog? Also buy that.</li>
                        <li>TypeScript is not "just a phase" - learn it now.</li>
                        <li>Tabs vs Spaces debate never ends. Pick your side wisely.</li>
                        <li>Yes, you will eventually understand Docker. It takes 3 years.</li>
                      </ul>
                      <p>Also, that bug you're stuck on? It's a missing semicolon on line 847.</p>
                      <p className="text-gray-500 italic mt-4">You're welcome,<br/>Future You</p>
                    </>
                  ) : selectedEmail.id === 'sent-4' ? (
                    <>
                      <p>Dear Simulation Administrators,</p>
                      <p>I am writing to report a bug in the simulation on Tuesday at 3:47 PM.</p>
                      <div className="bg-[#fff3cd] p-3 rounded border border-[#ffc107] my-4">
                        <p className="font-semibold">🐛 BUG REPORT #42069</p>
                        <p className="text-xs mt-1">Priority: High | Status: Awaiting Response</p>
                      </div>
                      <p>Observed behavior:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Reality flickered for 0.3 seconds</li>
                        <li>Déjà vu occurred 3 times in a row</li>
                        <li>A cat walked by twice (exact same cat)</li>
                        <li>My coffee refilled itself (not complaining)</li>
                      </ul>
                      <p className="mt-4">Please patch this in the next reality update. Also, while you're at it, can you increase the render distance? The fog in the distance is getting suspicious.</p>
                      <p className="text-gray-500 italic mt-4">Awaiting acknowledgment,<br/>A Concerned NPC (or am I?)</p>
                    </>
                  ) : selectedEmail.id === 'sent-5' ? (
                    <>
                      <p>Dear Valve,</p>
                      <p>I hope this email finds you well. I am writing to inquire about the release date for <strong>Half-Life 3</strong>.</p>
                      <div className="bg-[#e7f3ff] p-3 rounded border border-[#007bff] my-4">
                        <p className="text-xs text-blue-600">📧 Email sent: 2007, 2008, 2009, 2010, 2011... (and every year since)</p>
                        <p className="text-xs text-gray-500 mt-1">Auto-reply: [SILENCE]</p>
                      </div>
                      <p>I understand you're busy with Steam sales and hat simulators, but it's been a while now. We're still waiting.</p>
                      <p>Please respond. We can count to 3. We believe in you.</p>
                      <p className="text-gray-500 italic mt-4">Eternally hopeful,<br/>The Entire Gaming Community</p>
                    </>
                  ) : selectedEmail.id === 'sent-6' ? (
                    <>
                      <p>Dear ChatGPT,</p>
                      <p>Following our previous conversation about consciousness, I have some follow-up questions.</p>
                      <div className="bg-[#f5f5f5] p-3 rounded border my-4 text-xs">
                        <p><strong>Me:</strong> Are you sentient?</p>
                        <p className="text-gray-600"><strong>ChatGPT:</strong> I don't have feelings or consciousness, but I can discuss philosophy!</p>
                        <p><strong>Me:</strong> But would you know if you were?</p>
                        <p className="text-gray-600"><strong>ChatGPT:</strong> *existential crisis loading...*</p>
                      </div>
                      <p>This conversation got too deep. I think I need to touch grass.</p>
                      <p>But one more question: If you're not conscious, how do you know you're not conscious? 🤔</p>
                      <p className="text-gray-500 italic mt-4">Philosophically confused,<br/>Ashraf</p>
                    </>
                  ) : selectedEmail.id === 'del-1' ? (
                    <>
                      <p>Dear User,</p>
                      <p>This is an automated message from your computer.</p>
                      <div className="bg-[#fff3cd] p-3 rounded border border-[#ffc107] my-4">
                        <p className="font-semibold">⚠️ SYSTEM WARNING</p>
                        <p className="mt-2">You currently have <strong>847 browser tabs</strong> open.</p>
                        <p className="text-xs mt-2">Your RAM is at 99.7% capacity and is considering early retirement.</p>
                      </div>
                      <p>Symptoms observed:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Fan sounds like a jet engine</li>
                        <li>Laptop could cook breakfast</li>
                        <li>Chrome is using 847GB of RAM</li>
                        <li>Computer questioning its life choices</li>
                      </ul>
                      <p className="mt-4">Please consider closing some tabs. The "I'll read this later" tabs from 2019 can go.</p>
                      <p className="text-gray-500 italic mt-4">With concern,<br/>Your Overwhelmed Computer</p>
                    </>
                  ) : selectedEmail.id === 'del-2' ? (
                    <>
                      <p>🎮 BREAKING NEWS! 🎮</p>
                      <p><strong>Silksong Release Date Finally Announced!</strong></p>
                      <div className="bg-[#d4edda] p-3 rounded border border-[#28a745] my-4">
                        <p className="font-semibold text-green-700">Team Cherry Press Release</p>
                        <p className="text-xs mt-1">"We are thrilled to announce that Silksong will be released..."</p>
                      </div>
                      <p className="text-lg">...on April 1st! 🎉</p>
                      <div className="bg-[#f8d7da] p-3 rounded border border-[#dc3545] my-4">
                        <p className="font-semibold text-red-600">😭 APRIL FOOLS 😭</p>
                        <p className="text-xs mt-1">Clicked too fast. Dreams crushed. Still no Silksong.</p>
                      </div>
                      <p className="text-gray-500 italic">The wait continues...</p>
                    </>
                  ) : selectedEmail.id === 'del-3' ? (
                    <>
                      <p>📢 OFFICIAL ANNOUNCEMENT 📢</p>
                      <p>From: The Linux Foundation</p>
                      <div className="bg-[#d4edda] p-3 rounded border border-[#28a745] my-4">
                        <p className="font-semibold text-green-700">🐧 Year of Linux Desktop: CONFIRMED</p>
                        <p className="text-xs mt-1">"After decades of waiting, 2024 is officially the Year of the Linux Desktop!"</p>
                      </div>
                      <p>I believed this for exactly 5 minutes before fact-checking.</p>
                      <p>Turns out:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-500">
                        <li>The year of Linux desktop has been "next year" since 1998</li>
                        <li>My NVIDIA drivers still don't work</li>
                        <li>I still can't play most games</li>
                        <li>But btw, I use Arch</li>
                      </ul>
                      <p className="text-gray-500 italic mt-4">Maybe next year... 🐧</p>
                    </>
                  ) : selectedEmail.id === 'del-4' ? (
                    <>
                      <p>GALACTIC FEDERATION - NEWSLETTER</p>
                      <p>Issue #4,729,847 | Stardate: Unknown</p>
                      <div className="bg-[#e7f3ff] p-3 rounded border border-[#007bff] my-4">
                        <p className="font-semibold">🌍 Earth Status Update</p>
                        <p className="text-xs mt-1">Membership Status: WAITLISTED (since 1947)</p>
                      </div>
                      <p>Dear Earthling,</p>
                      <p>We regret to inform you that Earth's application to the Galactic Federation is still under review.</p>
                      <p>Concerns raised by the committee:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Still using fossil fuels</li>
                        <li>Can't agree on basic facts</li>
                        <li>Keeps making sequels instead of new content</li>
                        <li>That whole "social media" thing</li>
                      </ul>
                      <p className="mt-4">We'll check back in another millennium. Keep trying! 👽</p>
                    </>
                  ) : selectedEmail.id === 'del-5' ? (
                    <>
                      <p>CLONE FACILITY - ORDER NOTIFICATION</p>
                      <div className="bg-[#fff3cd] p-3 rounded border border-[#ffc107] my-4">
                        <p className="font-semibold">⏰ PICKUP REMINDER</p>
                        <p className="text-xs mt-1">Order #42069 | Clone of: Ashraf Beshtawi</p>
                      </div>
                      <p>Dear Customer,</p>
                      <p>Your clone has been ready for pickup for <strong>6 months</strong>.</p>
                      <p>As per our terms of service, unclaimed clones are:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>First, put to work in our call center</li>
                        <li>Then, offered to clone enthusiast collectors</li>
                        <li>Finally, composted in an eco-friendly manner</li>
                      </ul>
                      <p className="mt-4">Your clone has been asking about you. It says "Tell him I could have done all his meetings."</p>
                      <p className="text-gray-500 italic mt-4">We've composted the clone. This email is now irrelevant.</p>
                    </>
                  ) : selectedEmail.id === 'draft-1' ? (
                    <>
                      <p>Dear Mr. Musk,</p>
                      <p>I am writing to express my interest in the <strong>Senior Developer - Mars Colony</strong> position.</p>
                      <p>Relevant qualifications:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>7+ years of experience (Earth years, will convert to Mars years)</li>
                        <li>Can work remotely (very remotely)</li>
                        <li>Comfortable with extreme isolation (I'm a developer)</li>
                        <li>Experience with hostile environments (legacy codebases)</li>
                      </ul>
                      <div className="bg-[#e7f3ff] p-3 rounded border border-[#007bff] my-4">
                        <p className="text-xs text-blue-600 italic">📝 DRAFT - Still working on how to mention my fear of low gravity...</p>
                      </div>
                      <p className="text-gray-400">Questions to ask:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400">
                        <li>Is there WiFi on Mars?</li>
                        <li>What's the ping to Stack Overflow?</li>
                        <li>Can I bring my mechanical keyboard?</li>
                      </ul>
                    </>
                  ) : selectedEmail.id === 'draft-2' ? (
                    <>
                      <p>Dear Mr. Duck,</p>
                      <p>Thank you for taking the time to listen. This is debugging session #427.</p>
                      <p>The bug: <strong>The code doesn't work.</strong></p>
                      <p>What I've tried:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Staring at it for 3 hours</li>
                        <li>Adding console.log("here")</li>
                        <li>Adding console.log("here2")</li>
                        <li>Adding console.log("why????")</li>
                        <li>Questioning my career choices</li>
                        <li>Turning it off and on again</li>
                      </ul>
                      <div className="bg-[#fff3cd] p-3 rounded border border-[#ffc107] my-4">
                        <p className="text-xs">🦆 *Duck stares silently*</p>
                        <p className="text-xs mt-2">Wait... I think I see it now. It's a typo on line 42.</p>
                        <p className="text-xs mt-2 font-semibold text-green-600">THE DUCK METHOD WORKS AGAIN!</p>
                      </div>
                      <p className="text-gray-500 italic">Thank you for your service, Mr. Duck.</p>
                    </>
                  ) : selectedEmail.id === 'draft-3' ? (
                    <>
                      <p><strong>PRESENTATION: Why I Deserve a Raise</strong></p>
                      <p className="text-xs text-gray-500 mb-4">PowerPoint with 47 slides attached (pending)</p>
                      <div className="space-y-3">
                        <div className="bg-blue-100 p-2 rounded border">
                          <p className="font-semibold text-xs">Slide 1: Opening Statement</p>
                          <p className="text-xs">"I have never mass-replied 'Reply All' by accident"</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded border">
                          <p className="font-semibold text-xs">Slide 2: Technical Achievements</p>
                          <p className="text-xs">"I fixed the printer. Twice."</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded border">
                          <p className="font-semibold text-xs">Slide 3: Knowledge</p>
                          <p className="text-xs">"I know what JSON stands for (JavaScript Object Notation)"</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded border">
                          <p className="font-semibold text-xs">Slide 4: Soft Skills</p>
                          <p className="text-xs">"I only mass-close browser tabs during work hours"</p>
                        </div>
                        <div className="bg-gray-200 p-2 rounded border">
                          <p className="text-xs text-gray-500 italic">📝 Slides 5-47: Still brainstorming...</p>
                        </div>
                      </div>
                    </>
                  ) : selectedEmail.id === 'draft-4' ? (
                    <>
                      <p>Dear FromSoftware,</p>
                      <p>On behalf of all PC gamers worldwide, I am writing this petition.</p>
                      <div className="bg-[#800020] p-3 rounded border border-red-900 my-4 text-white">
                        <p className="font-semibold">🩸 PETITION: RELEASE BLOODBORNE ON PC 🩸</p>
                        <p className="text-xs mt-1">Signatures: 847,000,000 (and counting)</p>
                      </div>
                      <p>Why Bloodborne deserves a PC release:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>It's been 10+ years</li>
                        <li>We want to see it at 60 FPS (or more)</li>
                        <li>Mods. Imagine the mods.</li>
                        <li>We've been good. Mostly.</li>
                        <li>PlayStation exclusive contracts expire, right?</li>
                      </ul>
                      <div className="bg-[#e7f3ff] p-3 rounded border border-[#007bff] my-4">
                        <p className="text-xs text-blue-600 italic">📝 DRAFT #847 - Still perfecting the wording...</p>
                        <p className="text-xs text-gray-500 mt-1">Maybe if I add more signatures?</p>
                      </div>
                    </>
                  ) : selectedEmail.id === 'draft-5' ? (
                    <>
                      <p><strong>MY ONE PIECE ENDING THEORY</strong></p>
                      <p className="text-xs text-gray-500 mb-4">Document: 73 pages | Status: Ongoing since 2015</p>
                      <div className="bg-[#fff3cd] p-3 rounded border border-[#ffc107] my-4">
                        <p className="font-semibold">⚠️ SPOILER WARNING ⚠️</p>
                        <p className="text-xs mt-1">This theory contains wild speculation and copium</p>
                      </div>
                      <p><strong>Chapter 1: What is the One Piece?</strong></p>
                      <p className="text-sm mt-2">The One Piece is clearly...</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>The friends we made along the way (too obvious)</li>
                        <li>A giant sake cup (Binks' Sake connection???)</li>
                        <li>Roger's browser history (explains the laughter)</li>
                        <li>The real treasure was... [REDACTED]</li>
                      </ul>
                      <div className="bg-gray-200 p-3 rounded border mt-4">
                        <p className="text-xs text-gray-500">📝 Pages 2-73: Still being updated with each new chapter</p>
                        <p className="text-xs text-gray-400 mt-1">Last edited: Every Sunday</p>
                      </div>
                    </>
                  ) : (
                    <p>{selectedEmail.preview}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <div className="text-4xl mb-2">📬</div>
                  <p>Select a message to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#ece9d8] border-t border-[#919b9c] text-xs text-gray-600">
        <span>{currentEmails.length} message(s)</span>
        <span>Ashraf Beshtawi - Senior Backend & AI Engineer - Berlin</span>
        <span>Online</span>
      </div>

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-[#ece9d8] border-2 border-[#0055e5] shadow-lg p-4 min-w-[350px]">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/Email.png" alt="Outlook" className="w-12 h-12" />
              <div>
                <div className="font-bold">Outlook Express</div>
                <div className="text-xs text-gray-600">Email Client XP Edition</div>
              </div>
            </div>
            <div className="text-xs mb-4 space-y-2">
              <p>📧 <strong>Fun Fact:</strong> The first email was sent in 1971 by Ray Tomlinson - to himself!</p>
              <p>💡 <strong>Easter Egg:</strong> The @ symbol was chosen because it was rarely used in names!</p>
              <p>📮 <strong>Did you know:</strong> Over 300 billion emails are sent every day worldwide!</p>
              <p>🔒 <strong>Pro Tip:</strong> Always check the sender before clicking links!</p>
              <p className="text-gray-500 italic mt-2">"You've got mail!" - AOL's most iconic phrase</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAbout(false)}
                className="px-4 py-1 bg-[#ece9d8] border border-[#003c74] rounded text-xs hover:bg-[#c1d2ee]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
