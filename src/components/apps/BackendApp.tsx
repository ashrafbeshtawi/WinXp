import React, { useState, useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface TerminalLine {
  type: 'prompt' | 'command' | 'output';
  text: string;
  delay?: number;
}

export function BackendApp() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  const terminalContent: TerminalLine[] = [
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 0 },
    { type: 'command', text: ' whoami', delay: 50 },
    { type: 'output', text: 'Ashraf Beshtawi - Senior Backend & AI Engineer', delay: 300 },
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 500 },
    { type: 'command', text: ' skills --list', delay: 50 },
    { type: 'output', text: '├── Symfony', delay: 100 },
    { type: 'output', text: '├── PHP 8', delay: 100 },
    { type: 'output', text: '├── PostgreSQL', delay: 100 },
    { type: 'output', text: '├── REST APIs', delay: 100 },
    { type: 'output', text: '├── Microservices', delay: 100 },
    { type: 'output', text: '└── Docker', delay: 100 },
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 400 },
    { type: 'command', text: ' cat about.txt', delay: 50 },
    { type: 'output', text: '', delay: 100 },
    { type: 'output', text: 'Specializing in robust and scalable backend systems', delay: 50 },
    { type: 'output', text: 'using Symfony, PHP 8, and PostgreSQL.', delay: 50 },
    { type: 'output', text: '', delay: 50 },
    { type: 'output', text: 'Proven track record in designing and deploying', delay: 50 },
    { type: 'output', text: 'reliable, high-availability APIs and microservices.', delay: 50 },
    { type: 'output', text: '', delay: 100 },
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 400 },
    { type: 'command', text: ' experience --years', delay: 50 },
    { type: 'output', text: '7+ years of professional development experience', delay: 200 },
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 400 },
    { type: 'command', text: ' location', delay: 50 },
    { type: 'output', text: '📍 Berlin, Germany', delay: 200 },
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 400 },
    { type: 'command', text: ' open github', delay: 50 },
    { type: 'output', text: 'Opening https://github.com/ashrafbeshtawi ...', delay: 200 },
    { type: 'prompt', text: 'ashraf@berlin:~$', delay: 400 },
  ];

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (currentIndex < terminalContent.length) {
      const line = terminalContent[currentIndex];
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        setCurrentIndex(prev => prev + 1);
      }, line.delay || 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const renderLine = (line: TerminalLine, index: number) => {
    switch (line.type) {
      case 'prompt':
        return (
          <span key={index} className="text-green-400 font-bold">
            {line.text}
          </span>
        );
      case 'command':
        return (
          <span key={index} className="text-white">
            {line.text}
          </span>
        );
      case 'output':
        // Check for special links
        if (line.text.includes('github.com')) {
          return (
            <div key={index} className="text-cyan-400">
              Opening{' '}
              <a
                href="https://github.com/ashrafbeshtawi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-cyan-300"
              >
                https://github.com/ashrafbeshtawi
              </a>
              {' '}...
            </div>
          );
        }
        return (
          <div key={index} className="text-gray-300">
            {line.text || '\u00A0'}
          </div>
        );
      default:
        return null;
    }
  };

  const groupedLines: React.ReactElement[] = [];
  let currentLine: React.ReactElement[] = [];

  visibleLines.forEach((line, index) => {
    if (line.type === 'prompt') {
      if (currentLine.length > 0) {
        groupedLines.push(
          <div key={`line-${groupedLines.length}`} className="flex flex-wrap">
            {currentLine}
          </div>
        );
        currentLine = [];
      }
      currentLine.push(renderLine(line, index)!);
    } else if (line.type === 'command') {
      currentLine.push(renderLine(line, index)!);
    } else {
      if (currentLine.length > 0) {
        groupedLines.push(
          <div key={`line-${groupedLines.length}`} className="flex flex-wrap">
            {currentLine}
          </div>
        );
        currentLine = [];
      }
      groupedLines.push(
        <div key={`output-${index}`}>
          {renderLine(line, index)}
        </div>
      );
    }
  });

  if (currentLine.length > 0) {
    groupedLines.push(
      <div key={`line-${groupedLines.length}`} className="flex flex-wrap">
        {currentLine}
        {currentIndex >= terminalContent.length && (
          <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
            <span className="bg-green-400 text-black px-[2px]">_</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black font-mono text-sm relative">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#2d2d2d] border-b border-gray-600 text-xs text-gray-300">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-gray-600 cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#2d2d2d] border border-gray-600 shadow-md z-50 min-w-[150px]">
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi', '_blank')} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">Open GitHub</div>
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
            })} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">New Script</div>
            <div className="border-t border-gray-600 my-1" />
            <div onClick={() => window.print()} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">Print...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-gray-600 cursor-pointer">Edit</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#2d2d2d] border border-gray-600 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-gray-600 cursor-pointer text-gray-500">Copy (Ctrl+C)</div>
            <div className="px-4 py-1 hover:bg-gray-600 cursor-pointer text-gray-500">Paste (Ctrl+V)</div>
            <div className="border-t border-gray-600 my-1" />
            <div className="px-4 py-1 hover:bg-gray-600 cursor-pointer text-gray-500">Select All</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-gray-600 cursor-pointer">View</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#2d2d2d] border border-gray-600 shadow-md z-50 min-w-[150px]">
            <div onClick={() => setCurrentIndex(0)} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">Replay Animation</div>
            <div onClick={() => window.location.reload()} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">Refresh</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-gray-600 cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#2d2d2d] border border-gray-600 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">🎮 Take a Break</div>
            <div onClick={() => openWindow({
              id: 'ai-' + Date.now(),
              title: 'AI Console',
              icon: '/img/System Information.png',
              component: 'ai',
              x: 150 + Math.random() * 100,
              y: 80 + Math.random() * 80,
              width: 700,
              height: 500,
              minWidth: 500,
              minHeight: 350,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">🧠 AI Console</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-gray-600 cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#2d2d2d] border border-gray-600 shadow-md z-50 min-w-[180px]">
            <div onClick={() => openWindow({
              id: 'contact-' + Date.now(),
              title: 'Contact',
              icon: '/img/Email.png',
              component: 'contact',
              x: 150 + Math.random() * 50,
              y: 80 + Math.random() * 50,
              width: 750,
              height: 550,
              minWidth: 500,
              minHeight: 400,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">Contact Developer</div>
            <div className="border-t border-gray-600 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-gray-600 cursor-pointer">About Backend</div>
          </div>
        </div>
      </div>

      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-white text-xs">🖥️ Terminal - ashraf@berlin</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-xs">bash</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-auto p-4 leading-relaxed">
        {/* ASCII Art Header */}
        <pre className="text-green-500 text-[10px] mb-4 leading-none">
{`
  ____             _                  _
 | __ )  __ _  ___| | _____ _ __   __| |
 |  _ \\ / _\` |/ __| |/ / _ \\ '_ \\ / _\` |
 | |_) | (_| | (__|   <  __/ | | | (_| |
 |____/ \\__,_|\\___|_|\\_\\___|_| |_|\\__,_|

   ____                      _
  / ___|___  _ __  ___  ___ | | ___
 | |   / _ \\| '_ \\/ __|/ _ \\| |/ _ \\
 | |__| (_) | | | \\__ \\ (_) | |  __/
  \\____\\___/|_| |_|___/\\___/|_|\\___|
`}
        </pre>

        <div className="text-gray-500 mb-4 text-xs">
          Welcome to Ashraf's Backend Terminal. Type 'help' for available commands.
        </div>
        <div className="text-gray-600 mb-4 text-xs">
          ─────────────────────────────────────────────────────
        </div>

        {/* Terminal Output */}
        <div className="space-y-1">
          {groupedLines}
        </div>

        {/* If animation complete, show final cursor */}
        {currentIndex >= terminalContent.length && groupedLines.length === 0 && (
          <div className="flex">
            <span className="text-green-400 font-bold">ashraf@berlin:~$</span>
            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
              <span className="bg-green-400 text-black px-[2px]">_</span>
            </span>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-gray-900 border-t border-gray-700 text-xs text-gray-400">
        <span>Lines: {visibleLines.length}</span>
        <a
          href="https://github.com/ashrafbeshtawi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 underline"
        >
          github.com/ashrafbeshtawi
        </a>
        <span>UTF-8</span>
      </div>

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#2d2d2d] border-2 border-green-500 shadow-lg p-4 min-w-[350px] text-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/Command Prompt.png" alt="Backend" className="w-12 h-12" />
              <div>
                <div className="font-bold text-green-400">Backend Console</div>
                <div className="text-xs text-gray-400">Terminal Emulator v1.0</div>
              </div>
            </div>
            <div className="text-xs mb-4 space-y-2">
              <p>🐧 <strong>Fun Fact:</strong> Linux powers 96.3% of the world's top 1 million web servers!</p>
              <p>💡 <strong>Easter Egg:</strong> Type "sudo make me a sandwich" in a real terminal...</p>
              <p>🚀 <strong>Stack:</strong> Symfony, PHP 8, PostgreSQL, Docker, Redis</p>
              <p>⚡ <strong>Pro Tip:</strong> Real developers don't use GUIs - they use vim and regret nothing.</p>
              <p className="text-gray-500 italic mt-2">"There are only two hard things in programming: cache invalidation and naming things." - Phil Karlton</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAbout(false)}
                className="px-4 py-1 bg-green-600 hover:bg-green-500 border border-green-400 rounded text-xs text-white"
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
