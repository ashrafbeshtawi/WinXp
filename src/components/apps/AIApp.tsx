import { useState, useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'training';
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  { timestamp: '00:00:01', type: 'info', message: 'Neural Network Console v1.0 initialized' },
  { timestamp: '00:00:02', type: 'info', message: 'Loading genetic algorithm modules...' },
  { timestamp: '00:00:03', type: 'success', message: 'GA Engine loaded successfully' },
  { timestamp: '00:00:04', type: 'info', message: 'Connecting to n8n workflow automation...' },
  { timestamp: '00:00:05', type: 'success', message: 'n8n integration active' },
  { timestamp: '00:00:06', type: 'info', message: 'Initializing Auto-Trader neural network...' },
  { timestamp: '00:00:07', type: 'training', message: 'Training started - Population: 100, Generations: 500' },
];

const TRAINING_MESSAGES = [
  'Evaluating fitness functions...',
  'Applying crossover operators...',
  'Mutating chromosome sequences...',
  'Selecting elite individuals...',
  'Optimizing trading parameters...',
  'Backtesting strategy performance...',
  'Adjusting neural weights...',
  'Processing market signals...',
];

export function AIApp() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState(1.0);
  const [showAbout, setShowAbout] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  // Initial logs animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < INITIAL_LOGS.length) {
        const logEntry = INITIAL_LOGS[index];
        if (logEntry) {
          setLogs(prev => [...prev, logEntry]);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Training simulation
  useEffect(() => {
    const trainingInterval = setInterval(() => {
      setEpoch(prev => {
        const next = prev + 1;
        if (next > 100) return 100;
        return next;
      });

      setAccuracy(prev => {
        const next = prev + (Math.random() * 2 - 0.5);
        return Math.min(98.5, Math.max(0, next + 0.8));
      });

      setLoss(prev => {
        const next = prev - (Math.random() * 0.02);
        return Math.max(0.023, next);
      });

      // Add random training log
      if (Math.random() > 0.7) {
        const randomMessage = TRAINING_MESSAGES[Math.floor(Math.random() * TRAINING_MESSAGES.length)];
        const timestamp = `00:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;
        setLogs(prev => [...prev.slice(-20), { timestamp, type: 'training', message: randomMessage }]);
      }
    }, 1500);

    return () => clearInterval(trainingInterval);
  }, []);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return 'text-cyan-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'training': return 'text-purple-400';
    }
  };

  const getLogIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return '[INFO]';
      case 'success': return '[OK]';
      case 'warning': return '[WARN]';
      case 'error': return '[ERR]';
      case 'training': return '[TRAIN]';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0f] text-white font-mono overflow-hidden relative">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#0d0d14] border-b border-cyan-900/50 text-xs text-gray-300">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-cyan-800/30 cursor-pointer">Model</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#0d0d14] border border-cyan-700 shadow-md z-50 min-w-[150px]">
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi/Auto-Trader', '_blank')} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">Open Auto-Trader</div>
            <div onClick={() => {
              setEpoch(0);
              setAccuracy(0);
              setLoss(1.0);
              setLogs([]);
            }} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">Reset Training</div>
            <div className="border-t border-cyan-700 my-1" />
            <div onClick={() => window.print()} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">Export Logs</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-cyan-800/30 cursor-pointer">Training</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#0d0d14] border border-cyan-700 shadow-md z-50 min-w-[160px]">
            <div className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer flex items-center">✓ Genetic Algorithm</div>
            <div className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer text-gray-500">&nbsp;&nbsp;&nbsp;Neural Network</div>
            <div className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer text-gray-500">&nbsp;&nbsp;&nbsp;Reinforcement</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-cyan-800/30 cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#0d0d14] border border-cyan-700 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">🎮 Train Your Brain</div>
            <div onClick={() => openWindow({
              id: 'backend-' + Date.now(),
              title: 'Backend Console',
              icon: '/img/Command Prompt.png',
              component: 'backend',
              x: 150 + Math.random() * 100,
              y: 80 + Math.random() * 80,
              width: 700,
              height: 500,
              minWidth: 500,
              minHeight: 350,
              isMinimized: false,
              isMaximized: false,
            })} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">🖥️ Terminal</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-cyan-800/30 cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#0d0d14] border border-cyan-700 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">Contact Developer</div>
            <div className="border-t border-cyan-700 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-cyan-800/30 cursor-pointer">About AI Console</div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#0f1a2e] to-[#1a0f2e] border-b border-cyan-900/50 p-4">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center animate-pulse">
                <span className="text-xl">🧠</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-cyan-400">Neural Network Console v1.0</h1>
              <p className="text-xs text-gray-500">Genetic Algorithm Trading System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-xs text-green-400">
              ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-[#0d0d14] border-b border-cyan-900/30">
        <div className="p-3 bg-gradient-to-br from-cyan-900/20 to-transparent border border-cyan-800/30 rounded-lg">
          <div className="text-xs text-cyan-500 uppercase tracking-wider">Epoch</div>
          <div className="text-2xl font-bold text-cyan-400">{epoch}<span className="text-sm text-cyan-600">/100</span></div>
          <div className="mt-1 h-1 bg-cyan-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${epoch}%` }}
            />
          </div>
        </div>
        <div className="p-3 bg-gradient-to-br from-green-900/20 to-transparent border border-green-800/30 rounded-lg">
          <div className="text-xs text-green-500 uppercase tracking-wider">Accuracy</div>
          <div className="text-2xl font-bold text-green-400">{accuracy.toFixed(1)}%</div>
          <div className="mt-1 h-1 bg-green-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
        <div className="p-3 bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-800/30 rounded-lg">
          <div className="text-xs text-purple-500 uppercase tracking-wider">Loss</div>
          <div className="text-2xl font-bold text-purple-400">{loss.toFixed(4)}</div>
          <div className="mt-1 h-1 bg-purple-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-300"
              style={{ width: `${(1 - loss) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Description Panel */}
      <div className="p-4 bg-[#0a0f14] border-b border-cyan-900/30">
        <h2 className="text-sm font-semibold text-cyan-300 mb-2">AI-Driven Automation & Trading</h2>
        <p className="text-xs text-gray-400 leading-relaxed">
          Leveraging <span className="text-green-400">Genetic Algorithms</span> and{' '}
          <span className="text-purple-400">n8n Workflows</span> to develop intelligent automation tools
          and algorithmic trading systems. The neural network optimizes trading strategies through
          evolutionary computation.
        </p>
      </div>

      {/* Training Logs */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-4 py-2 bg-[#0d0d14] border-b border-cyan-900/30 flex items-center justify-between">
          <span className="text-xs text-cyan-500 uppercase tracking-wider">Training Logs</span>
          <span className="text-xs text-gray-600">{logs.length} entries</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1 text-xs">
          {logs.map((log, index) => log && (
            <div key={index} className="flex gap-2 hover:bg-white/5 px-2 py-1 rounded">
              <span className="text-gray-600">[{log.timestamp}]</span>
              <span className={`${getLogColor(log.type)} w-16`}>{getLogIcon(log.type)}</span>
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-2 py-1">
            <span className="text-gray-600">[--:--:--]</span>
            <span className="text-cyan-400 animate-pulse">▋</span>
          </div>
        </div>
      </div>

      {/* Footer with Link */}
      <div className="p-4 bg-[#0d0d14] border-t border-cyan-900/30">
        <a
          href="https://github.com/ashrafbeshtawi/Auto-Trader"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-600 to-green-600
                     hover:from-cyan-500 hover:to-green-500 rounded-lg text-sm font-semibold transition-all
                     border border-cyan-500/30"
        >
          <span>🔗</span>
          <span>View Auto-Trader on GitHub</span>
        </a>
      </div>

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-[#0d0d14] border-2 border-cyan-500 shadow-lg p-4 min-w-[350px] text-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/System Information.png" alt="AI" className="w-12 h-12" />
              <div>
                <div className="font-bold text-cyan-400">Neural Network Console</div>
                <div className="text-xs text-gray-400">AI Training System v1.0</div>
              </div>
            </div>
            <div className="text-xs mb-4 space-y-2">
              <p>🧠 <strong>Fun Fact:</strong> GPT-4 has ~1.8 trillion parameters - more than neurons in a bee's brain!</p>
              <p>🧬 <strong>Easter Egg:</strong> Watch the accuracy reach 98.5% - that's the genetic algorithm at work!</p>
              <p>📈 <strong>Project:</strong> Auto-Trader uses evolutionary algorithms to optimize trading strategies</p>
              <p>⚡ <strong>Stack:</strong> Python, TensorFlow, Genetic Algorithms, n8n</p>
              <p className="text-gray-500 italic mt-2">"AI is the new electricity." - Andrew Ng</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAbout(false)}
                className="px-4 py-1 bg-cyan-600 hover:bg-cyan-500 border border-cyan-400 rounded text-xs text-white"
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
