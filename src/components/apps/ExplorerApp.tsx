import { useState, useCallback } from 'react';
import { fileSystem, findItem, FileItem } from '@/data/fileSystem';

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
      setViewingFileContent(item);
    }
  }, [currentPath, navigateTo]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">New</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Create Shortcut</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Delete</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Rename</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Properties</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Close</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">Undo</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Cut</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Copy</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Paste</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Select All</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Invert Selection</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Toolbars</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Status Bar</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Explorer Bar</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Thumbnails</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tiles</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Icons</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">List</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Details</div>
            <div className="border-t border-gray-300 my-1" />
            <div
              onClick={() => setShowHidden(!showHidden)}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {showHidden && <span className="mr-2">✓</span>}
              <span className={!showHidden ? 'ml-5' : ''}>Show Hidden Files</span>
            </div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Refresh</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Map Network Drive...</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Disconnect Network Drive...</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Folder Options...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help and Support Center</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Windows</div>
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
          <span className="mr-2">{currentFolder?.icon || '📁'}</span>
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
                <span className="text-3xl mb-1">{item.icon}</span>
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
    </div>
  );
}
