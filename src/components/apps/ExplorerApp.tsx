import { useState, useCallback } from 'react';
import { fileSystem, FileItem } from '@/data/fileSystem';
import { useWindowStore } from '@/stores/windowStore';

interface ExplorerAppProps {
  initialPath?: string;
}

export function ExplorerApp({ initialPath = 'my-computer' }: ExplorerAppProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([initialPath]);
  const [showHidden, setShowHidden] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [history, setHistory] = useState<string[][]>([[initialPath]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewingFileContent, setViewingFileContent] = useState<FileItem | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  const getCurrentFolder = useCallback((): FileItem | null => {
    if (currentPath.length === 0) return null;
    const rootId = currentPath[0];
    let current = fileSystem.find((item) => item.id === rootId);

    for (let i = 1; i < currentPath.length && current; i++) {
      current = current.children?.find((item) => item.id === currentPath[i]);
    }

    return current || null;
  }, [currentPath]);

  const currentFolder = getCurrentFolder();
  const items = currentFolder?.children || fileSystem;

  const filteredItems = showHidden ? items : items.filter((item) => !item.hidden);

  const getPathString = useCallback(() => {
    if (currentPath.length === 0) return 'Desktop';

    const names: string[] = [];
    let current: FileItem | undefined;

    for (let i = 0; i < currentPath.length; i++) {
      if (i === 0) {
        current = fileSystem.find((item) => item.id === currentPath[i]);
      } else {
        current = current?.children?.find((item) => item.id === currentPath[i]);
      }
      if (current) names.push(current.name);
    }

    return names.join(' > ');
  }, [currentPath]);

  const navigateTo = useCallback((newPath: string[]) => {
    setCurrentPath(newPath);
    setSelectedItem(null);
    setViewingFileContent(null);

    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedItem(null);
      setViewingFileContent(null);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedItem(null);
      setViewingFileContent(null);
    }
  }, [history, historyIndex]);

  const goUp = useCallback(() => {
    if (currentPath.length > 1) {
      navigateTo(currentPath.slice(0, -1));
    } else if (currentPath.length === 1) {
      // Go to root
      navigateTo([]);
    }
  }, [currentPath, navigateTo]);

  const handleItemClick = useCallback((item: FileItem) => {
    setSelectedItem(item.id);
    setViewingFileContent(null);
  }, []);

  const handleItemDoubleClick = useCallback((item: FileItem) => {
    if (item.type === 'folder') {
      if (currentPath.length === 0) {
        navigateTo([item.id]);
      } else {
        navigateTo([...currentPath, item.id]);
      }
    } else if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'file' && item.content) {
      // Check if it's a secret file
      if (item.content.startsWith('SECRET:')) {
        const secretId = item.content.replace('SECRET:', '');
        openWindow({
          id: secretId + '-' + Date.now(),
          title: item.name.replace('.classified', ''),
          icon: '/img/Lock.png',
          component: secretId,
          x: 150 + Math.random() * 100,
          y: 80 + Math.random() * 80,
          width: 550,
          height: 500,
          minWidth: 450,
          minHeight: 400,
          isMinimized: false,
          isMaximized: false,
        });
      } else {
        setViewingFileContent(item);
      }
    }
  }, [currentPath, navigateTo, openWindow]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => openWindow({
              id: 'explorer-new-' + Date.now(),
              title: 'My Computer',
              icon: '/img/My Computer.png',
              component: 'explorer',
              x: 120 + Math.random() * 100,
              y: 60 + Math.random() * 100,
              width: 700,
              height: 500,
              minWidth: 400,
              minHeight: 300,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">New Window</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => navigateTo(['my-computer'])} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">My Computer</div>
            <div onClick={() => navigateTo(['my-documents'])} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">My Documents</div>
            <div onClick={() => navigateTo(['recycle-bin'])} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Recycle Bin</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={goBack} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Undo</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 text-gray-400 cursor-default">Cut</div>
            <div className="px-4 py-1 text-gray-400 cursor-default">Copy</div>
            <div className="px-4 py-1 text-gray-400 cursor-default">Paste</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => filteredItems.length > 0 && setSelectedItem(filteredItems[0].id)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Select All</div>
            <div onClick={() => setSelectedItem(null)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Invert Selection</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={goBack} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Go Back</div>
            <div onClick={goForward} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Go Forward</div>
            <div onClick={goUp} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Go Up</div>
            <div className="border-t border-gray-300 my-1" />
            <div
              onClick={() => setShowHidden(!showHidden)}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {showHidden && <span className="mr-2">✓</span>}
              <span className={!showHidden ? 'ml-5' : ''}>Show Hidden Files</span>
            </div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => window.location.reload()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Refresh</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Favorites</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => navigateTo(['my-documents'])} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">My Documents</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => openWindow({
              id: 'frontend-' + Date.now(),
              title: 'Frontend',
              icon: '/img/frontend.svg',
              component: 'frontend',
              x: 100 + Math.random() * 80,
              y: 50 + Math.random() * 60,
              width: 850,
              height: 600,
              minWidth: 600,
              minHeight: 400,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">My Portfolio</div>
            <div onClick={() => openWindow({
              id: 'contact-' + Date.now(),
              title: 'Contact',
              icon: '/img/me.svg',
              component: 'contact',
              x: 150 + Math.random() * 50,
              y: 80 + Math.random() * 50,
              width: 750,
              height: 550,
              minWidth: 500,
              minHeight: 400,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Contact Me</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => openWindow({
              id: 'notepad-' + Date.now(),
              title: 'Untitled - Notepad',
              icon: '/img/Notepad.png',
              component: 'notepad',
              x: 100 + Math.random() * 100,
              y: 50 + Math.random() * 100,
              width: 500,
              height: 400,
              minWidth: 300,
              minHeight: 200,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open Notepad</div>
            <div onClick={() => setShowHidden(!showHidden)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Folder Options...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => openWindow({
              id: 'contact-' + Date.now(),
              title: 'Help and Support',
              icon: '/img/Help and Support.png',
              component: 'contact',
              x: 150 + Math.random() * 50,
              y: 80 + Math.random() * 50,
              width: 750,
              height: 550,
              minWidth: 500,
              minHeight: 400,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help and Support</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Ashraf OS</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border-b border-[#919b9c]">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className={`flex flex-col items-center px-2 py-1 rounded text-xs ${
            historyIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#c1d2ee]'
          }`}
        >
          <span className="text-lg">⬅️</span>
          <span>Back</span>
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className={`flex flex-col items-center px-2 py-1 rounded text-xs ${
            historyIndex >= history.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#c1d2ee]'
          }`}
        >
          <span className="text-lg">➡️</span>
          <span>Forward</span>
        </button>
        <button
          onClick={goUp}
          disabled={currentPath.length === 0}
          className={`flex flex-col items-center px-2 py-1 rounded text-xs ${
            currentPath.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#c1d2ee]'
          }`}
        >
          <span className="text-lg">📁</span>
          <span>Up</span>
        </button>
        <div className="w-px h-8 bg-[#919b9c] mx-2" />
        <button className="flex flex-col items-center px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span className="text-lg">🔍</span>
          <span>Search</span>
        </button>
        <button className="flex flex-col items-center px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span className="text-lg">📁</span>
          <span>Folders</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c]">
        <span className="text-xs font-semibold">Address</span>
        <div className="flex-1 flex items-center bg-white border border-[#7f9db9] px-2 py-1">
          <span className="mr-2 w-4 h-4 flex items-center justify-center">
            {currentFolder?.icon?.startsWith('/') ? (
              <img src={currentFolder.icon} alt="" className="w-4 h-4 object-contain" />
            ) : (
              currentFolder?.icon || '📁'
            )}
          </span>
          <span className="text-xs text-gray-700">{getPathString()}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-2 bg-white">
        {viewingFileContent ? (
          /* File Content View */
          <div className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b">
              <button
                onClick={() => setViewingFileContent(null)}
                className="px-3 py-1 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border border-[#919b9c] text-xs hover:bg-[#c1d2ee]"
              >
                ← Back to folder
              </button>
              <span className="text-sm font-semibold">{viewingFileContent.name}</span>
            </div>
            <div className="flex-1 overflow-auto bg-[#ffffcc] border border-[#999966] p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm">{viewingFileContent.content}</pre>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                className={`flex flex-col items-center p-2 rounded cursor-pointer select-none ${
                  selectedItem === item.id ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f4ff]'
                } ${item.hidden ? 'opacity-60' : ''}`}
              >
                <span className="mb-1 w-8 h-8 flex items-center justify-center">
                  {item.icon.startsWith('/') ? (
                    <img src={item.icon} alt="" className="w-8 h-8 object-contain" draggable={false} />
                  ) : (
                    <span className="text-3xl">{item.icon}</span>
                  )}
                </span>
                <span className={`text-xs text-center break-words w-full ${
                  selectedItem === item.id ? 'text-white' : ''
                }`}>
                  {item.name}
                </span>
                {item.type === 'link' && (
                  <span className="text-[10px] text-gray-500">
                    {selectedItem === item.id ? '(shortcut)' : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#ece9d8] border-t border-[#919b9c] text-xs text-gray-600">
        <div>{filteredItems.length} object(s){showHidden && items.length !== filteredItems.length ? ` (${items.length - filteredItems.length} hidden)` : ''}</div>
        {selectedItem && (
          <div>
            {filteredItems.find(i => i.id === selectedItem)?.name}
          </div>
        )}
      </div>

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-[#ece9d8] border-2 border-[#0055e5] shadow-lg p-4 min-w-[350px]">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/my computer.png" alt="Ashraf OS" className="w-12 h-12" />
              <div>
                <div className="font-bold">Ashraf OS</div>
                <div className="text-xs text-gray-600">Windows XP Style Portfolio</div>
              </div>
            </div>
            <div className="text-xs mb-4 space-y-2">
              <p>A nostalgic Windows XP-inspired portfolio showcasing my work as a developer.</p>
              <p><strong>Developer:</strong> Ashraf Beshtawi</p>
              <p><strong>Location:</strong> Berlin, Germany</p>
              <p><strong>Stack:</strong> Next.js, React, TypeScript, Tailwind CSS</p>
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
