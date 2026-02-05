import { useState, useRef, useCallback } from 'react';
import { useWindowStore } from '@/stores/windowStore';

const defaultContent = `Welcome to Ashraf OS!

Feel free to explore. Try right-clicking
things, check My Documents for surprises,
and don't forget to play Minesweeper.

- Ashraf

---

About Me:
I am a passionate backend developer with a
strong interest in AI and Crypto.

Based in the vibrant city of Berlin, I focus
on crafting robust and scalable systems while
continuously exploring the exciting frontiers
of technology.

Languages: German, English, Arabic`;

export function NotepadApp() {
  const [content, setContent] = useState(defaultContent);
  const [wordWrap, setWordWrap] = useState(true);
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const openWindow = useWindowStore((state) => state.openWindow);

  const handleSelectAll = () => {
    textareaRef.current?.select();
  };

  const handleCopy = () => {
    if (textareaRef.current) {
      const selectedText = content.substring(
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd
      );
      if (selectedText) {
        navigator.clipboard.writeText(selectedText);
      }
    }
  };

  const handleCut = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selectedText = content.substring(start, end);
      if (selectedText) {
        navigator.clipboard.writeText(selectedText);
        setContent(content.substring(0, start) + content.substring(end));
      }
    }
  };

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    if (textareaRef.current && clipboardText) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      setContent(content.substring(0, start) + clipboardText + content.substring(end));
    }
  };

  const getLineAndColumn = () => {
    if (!textareaRef.current) return { line: 1, column: 1 };
    const pos = textareaRef.current.selectionStart;
    const textBeforeCursor = content.substring(0, pos);
    const lines = textBeforeCursor.split('\n');
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
    };
  };

  const { line, column } = getLineAndColumn();

  const handleNew = useCallback(() => {
    setContent('');
  }, []);

  const handleTimeDate = useCallback(() => {
    const now = new Date();
    const timeDate = now.toLocaleTimeString() + ' ' + now.toLocaleDateString();
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      setContent(content.substring(0, start) + timeDate + content.substring(start));
    }
  }, [content]);

  const handleDelete = useCallback(() => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      if (start !== end) {
        setContent(content.substring(0, start) + content.substring(end));
      }
    }
  }, [content]);

  const handleOpenHelp = useCallback(() => {
    openWindow({
      id: 'contact-help-' + Date.now(),
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
    });
  }, [openWindow]);

  const handleOpenExplorer = useCallback(() => {
    openWindow({
      id: 'explorer-' + Date.now(),
      title: 'My Documents',
      icon: '/img/documents.png',
      component: 'explorer-docs',
      x: 100 + Math.random() * 100,
      y: 50 + Math.random() * 80,
      width: 700,
      height: 500,
      minWidth: 400,
      minHeight: 300,
      isMinimized: false,
      isMaximized: false,
    });
  }, [openWindow]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={handleNew} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">New</div>
            <div onClick={() => setContent(defaultContent)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open Default</div>
            <div onClick={() => navigator.clipboard.writeText(content)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Save to Clipboard</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => window.print()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Print...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => setContent(defaultContent)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Undo</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={handleCut} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Cut</div>
            <div onClick={handleCopy} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Copy</div>
            <div onClick={handlePaste} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Paste</div>
            <div onClick={handleDelete} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Delete</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={handleSelectAll} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Select All</div>
            <div onClick={handleTimeDate} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Time/Date</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Format</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div
              onClick={() => setWordWrap(!wordWrap)}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {wordWrap && <span className="mr-2">✓</span>}
              <span className={!wordWrap ? 'ml-5' : ''}>Word Wrap</span>
            </div>
            <div onClick={handleOpenExplorer} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open File...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div
              onClick={() => setShowStatusBar(!showStatusBar)}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {showStatusBar && <span className="mr-2">✓</span>}
              <span className={!showStatusBar ? 'ml-5' : ''}>Status Bar</span>
            </div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={handleOpenHelp} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help Topics</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Notepad</div>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 overflow-hidden">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full h-full p-2 resize-none outline-none font-mono text-sm ${
            wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
          }`}
          style={{
            fontFamily: 'Lucida Console, Consolas, monospace',
          }}
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      {showStatusBar && (
        <div className="flex items-center justify-end px-2 py-1 bg-[#ece9d8] border-t border-[#919b9c] text-xs text-gray-600">
          <span>Ln {line}, Col {column}</span>
        </div>
      )}

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-[#ece9d8] border-2 border-[#0055e5] shadow-lg p-4 min-w-[300px]">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">📝</span>
              <div>
                <div className="font-bold">Ashraf OS Notepad</div>
                <div className="text-xs text-gray-600">Version 1.0</div>
              </div>
            </div>
            <div className="text-xs mb-4">
              <p>A Windows XP-style portfolio by Ashraf Beshtawi.</p>
              <p className="mt-2">Built with Next.js, React, and Tailwind CSS.</p>
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
