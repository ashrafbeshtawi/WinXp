import { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'training';
  message: string;
}

export function AIApp() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState(1.0);

  const initialLogs: LogEntry[] = [
    { timestamp: '00:00:01', type: 'info', message: 'Neural Network Console v1.0 initialized' },
    { timestamp: '00:00:02', type: 'info', message: 'Loading genetic algorithm modules...' },
    { timestamp: '00:00:03', type: 'success', message: 'GA Engine loaded successfully' },
    { timestamp: '00:00:04', type: 'info', message: 'Connecting to n8n workflow automation...' },
    { timestamp: '00:00:05', type: 'success', message: 'n8n integration active' },
    { timestamp: '00:00:06', type: 'info', message: 'Initializing Auto-Trader neural network...' },
    { timestamp: '00:00:07', type: 'training', message: 'Training started - Population: 100, Generations: 500' },
  ];

  const trainingMessages = [
    'Evaluating fitness functions...',
    'Applying crossover operators...',
    'Mutating chromosome sequences...',
    'Selecting elite individuals...',
    'Optimizing trading parameters...',
    'Backtesting strategy performance...',
    'Adjusting neural weights...',
    'Processing market signals...',
  ];

  // Initial logs animation
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialLogs.length) {
        setLogs(prev => [...prev, initialLogs[index]]);
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
        const randomMessage = trainingMessages[Math.floor(Math.random() * trainingMessages.length)];
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
    <div className="h-full flex flex-col bg-[#0a0a0f] text-white font-mono overflow-hidden">
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
          {logs.map((log, index) => (
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
    </div>
  );
}
