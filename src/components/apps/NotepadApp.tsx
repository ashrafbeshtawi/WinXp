import { useState, useRef } from 'react';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">New</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open...</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Save</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Save As...</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Page Setup...</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Print...</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Exit</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer text-gray-400">Undo</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={handleCut} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Cut</div>
            <div onClick={handleCopy} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Copy</div>
            <div onClick={handlePaste} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Paste</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Delete</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Find...</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Find Next</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Replace...</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Go To...</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={handleSelectAll} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Select All</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Time/Date</div>
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
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Font...</div>
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
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help Topics</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Notepad</div>
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
    </div>
  );
}
