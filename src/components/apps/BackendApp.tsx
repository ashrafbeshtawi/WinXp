import React, { useState, useEffect } from 'react';

interface TerminalLine {
  type: 'prompt' | 'command' | 'output';
  text: string;
  delay?: number;
}

export function BackendApp() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

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
    <div className="h-full flex flex-col bg-black font-mono text-sm">
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
    </div>
  );
}
