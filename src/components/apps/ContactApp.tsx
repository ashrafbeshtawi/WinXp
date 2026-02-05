import { useState } from 'react';
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
  const openWindow = useWindowStore((state) => state.openWindow);

  const folders: { name: FolderName; icon: string; count?: number }[] = [
    { name: 'Inbox', icon: '📥', count: 2 },
    { name: 'Outbox', icon: '📤' },
    { name: 'Sent Items', icon: '✉️', count: 3 },
    { name: 'Deleted Items', icon: '🗑️', count: 4 },
    { name: 'Drafts', icon: '📝', count: 3 },
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
    ],
    'Deleted Items': [
      {
        id: 'del-1',
        from: 'Nigerian Prince',
        subject: 'URGENT: $45,000,000 Transfer Request',
        preview: 'Dear Friend, I am Prince Abubakar and I need your help...',
        date: 'Yesterday',
        read: true,
      },
      {
        id: 'del-2',
        from: 'Your Computer',
        subject: '⚠️ Warning: 847 Browser Tabs Open',
        preview: 'Your RAM is crying. Please close some tabs. This is a wellness check...',
        date: '2 days ago',
        read: true,
      },
      {
        id: 'del-3',
        from: 'Vehicle Warranty Dept',
        subject: 'FINAL NOTICE: Your Car Warranty',
        preview: 'We have been trying to reach you about your cars extended warranty...',
        date: 'Last week',
        read: true,
      },
      {
        id: 'del-4',
        from: 'Time Traveler',
        subject: 'Message from 2045',
        preview: 'Whatever you do, dont trust the robot uprising. Also, you look great...',
        date: '???',
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
      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border-b border-[#919b9c]">
        <button className="flex items-center gap-1 px-3 py-1 hover:bg-[#c1d2ee] rounded text-xs border border-transparent hover:border-[#316ac5]">
          <span>📧</span>
          <span>Create Mail</span>
        </button>
        <div className="w-px h-6 bg-[#919b9c] mx-1" />
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span>↩️</span>
          <span>Reply</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span>↩️↩️</span>
          <span>Reply All</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span>➡️</span>
          <span>Forward</span>
        </button>
        <div className="w-px h-6 bg-[#919b9c] mx-1" />
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span>🖨️</span>
          <span>Print</span>
        </button>
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span>🗑️</span>
          <span>Delete</span>
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
                  ) : selectedEmail.id === 'del-1' ? (
                    <>
                      <p>Dear Friend,</p>
                      <p>I am <strong>Prince Abubakar Tafawa Balewa III</strong>, the son of the late King of a country you've never heard of.</p>
                      <p>I have <strong>$45,000,000 USD</strong> that I need to transfer out of the country, and I have chosen YOU, a random person, to help me!</p>
                      <div className="bg-[#f8d7da] p-3 rounded border border-[#dc3545] my-4">
                        <p className="font-semibold text-red-600">🚨 SCAM ALERT 🚨</p>
                        <p className="text-xs mt-1">This email was correctly identified as a scam and deleted. Good job, past me!</p>
                      </div>
                      <p>All I need is your:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 line-through text-gray-400">
                        <li>Bank account details</li>
                        <li>Social security number</li>
                        <li>Mother's maiden name</li>
                        <li>First pet's name</li>
                      </ul>
                      <p className="text-green-600 font-semibold mt-4">✓ Successfully avoided this scam!</p>
                    </>
                  ) : selectedEmail.id === 'del-2' ? (
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
                  ) : selectedEmail.id === 'del-3' ? (
                    <>
                      <p>ATTENTION VEHICLE OWNER!</p>
                      <p>We have been trying to reach you about your car's <strong>EXTENDED WARRANTY</strong>!</p>
                      <div className="bg-[#f8d7da] p-3 rounded border border-[#dc3545] my-4">
                        <p className="font-semibold text-red-600">📞 SPAM DETECTED</p>
                        <p className="text-xs mt-1">This is the 47th email about a car warranty this week. Deleted.</p>
                      </div>
                      <p>Your warranty expires in: <span className="text-red-600 font-bold">IMMEDIATELY!!!</span></p>
                      <p>Without coverage, you may be responsible for:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 line-through text-gray-400">
                        <li>Expensive repairs we made up</li>
                        <li>Problems that don't exist</li>
                        <li>General automotive anxiety</li>
                      </ul>
                      <p className="text-green-600 font-semibold mt-4">✓ Spam successfully deleted! 🗑️</p>
                    </>
                  ) : selectedEmail.id === 'del-4' ? (
                    <>
                      <p>TEMPORAL TRANSMISSION RECEIVED</p>
                      <p>Date Origin: <strong>March 15, 2045</strong></p>
                      <div className="bg-[#d4edda] p-3 rounded border border-[#28a745] my-4">
                        <p className="font-semibold text-green-700">🕐 MESSAGE FROM THE FUTURE</p>
                        <p className="text-xs mt-1">Transmission intercepted via quantum email protocol</p>
                      </div>
                      <p>Important things you should know:</p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>The robots are mostly friendly (mostly)</li>
                        <li>JavaScript frameworks stabilized at version 847.0</li>
                        <li>We finally have flying cars but still no good date picker UI</li>
                        <li>Tabs won the Tabs vs Spaces war of 2031</li>
                        <li>Your portfolio website is in a museum now 🎉</li>
                      </ul>
                      <p className="mt-4">Oh, and you look great for your age. Keep moisturizing.</p>
                      <p className="text-gray-500 italic mt-4">Temporal regards,<br/>Future Historian</p>
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
