import { useState } from 'react';

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

  const folders: { name: FolderName; icon: string; count?: number }[] = [
    { name: 'Inbox', icon: '📥', count: 2 },
    { name: 'Outbox', icon: '📤' },
    { name: 'Sent Items', icon: '✉️' },
    { name: 'Deleted Items', icon: '🗑️' },
    { name: 'Drafts', icon: '📝' },
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
        link: 'https://www.linkedin.com/in/ashraf-beshtawi/'
      },
    ],
    'Outbox': [],
    'Sent Items': [],
    'Deleted Items': [],
    'Drafts': [],
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  const currentEmails = emails[selectedFolder] || [];

  return (
    <div className="h-full flex flex-col bg-[#ece9d8]">
      {/* Menu Bar */}
      <div className="flex items-center px-1 py-0.5 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
        <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
        <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
        <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
        <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Message</span>
        <span className="px-2 py-0.5 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
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
                      {selectedEmail.from === 'GitHub' ? '🐙' : '💼'}
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
                  ) : (
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
    </div>
  );
}
