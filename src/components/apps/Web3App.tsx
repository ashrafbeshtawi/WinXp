import { useState, useEffect } from 'react';
import { useWindowStore } from '@/stores/windowStore';

interface Transaction {
  id: string;
  type: 'receive' | 'send' | 'stake' | 'mint';
  description: string;
  amount: string;
  time: string;
  status: 'confirmed' | 'pending';
}

export function Web3App() {
  const [balance, setBalance] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);
  const targetBalance = 42.069;

  // Animate balance counting up
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetBalance / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setBalance(targetBalance);
        clearInterval(interval);
      } else {
        setBalance(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  const transactions: Transaction[] = [
    { id: '0x1a2b', type: 'mint', description: 'Minted LandLord Token', amount: '+1 LAND', time: '2 hours ago', status: 'confirmed' },
    { id: '0x3c4d', type: 'stake', description: 'Staked in Property Pool', amount: '-10 LAND', time: '1 day ago', status: 'confirmed' },
    { id: '0x5e6f', type: 'receive', description: 'Dividend Distribution', amount: '+0.5 ETH', time: '3 days ago', status: 'confirmed' },
    { id: '0x7g8h', type: 'send', description: 'Fractional Investment', amount: '-0.1 ETH', time: '1 week ago', status: 'confirmed' },
  ];

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'receive': return '📥';
      case 'send': return '📤';
      case 'stake': return '🔒';
      case 'mint': return '✨';
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'receive': return 'text-green-400';
      case 'send': return 'text-red-400';
      case 'stake': return 'text-purple-400';
      case 'mint': return 'text-blue-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23] text-white relative">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#1a1a2e] border-b border-purple-900/50 text-xs text-gray-300">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-purple-800/50 cursor-pointer">Wallet</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#1a1a2e] border border-purple-700 shadow-md z-50 min-w-[150px]">
            <div onClick={() => window.open('https://landlord-liart.vercel.app/', '_blank')} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">Open LandLord</div>
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi', '_blank')} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">View on GitHub</div>
            <div className="border-t border-purple-700 my-1" />
            <div onClick={() => window.print()} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">Export Report</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-purple-800/50 cursor-pointer">Network</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#1a1a2e] border border-purple-700 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer flex items-center">✓ Ethereum Mainnet</div>
            <div className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer text-gray-500">&nbsp;&nbsp;&nbsp;Polygon</div>
            <div className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer text-gray-500">&nbsp;&nbsp;&nbsp;Arbitrum</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-purple-800/50 cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#1a1a2e] border border-purple-700 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">🎮 Mine Crypto (Game)</div>
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
            })} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">🧠 AI Trading</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-purple-800/50 cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-[#1a1a2e] border border-purple-700 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">Contact Developer</div>
            <div className="border-t border-purple-700 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-purple-800/50 cursor-pointer">About Web3</div>
          </div>
        </div>
      </div>

      {/* Wallet Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-4 right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-xl">🔮</span>
              </div>
              <div>
                <div className="text-sm text-gray-400">Web3 Wallet</div>
                <div className="text-xs text-gray-500 font-mono">0x742d...F8a9</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">Connected</span>
            </div>
          </div>

          {/* Balance Display */}
          <div className="text-center py-4">
            <div className="text-sm text-gray-400 mb-1">Total Balance</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {balance.toFixed(3)} ETH
            </div>
            <div className="text-sm text-gray-500 mt-1">≈ $84,138.00 USD</div>
          </div>
        </div>
      </div>

      {/* Token Card - LandLord */}
      <div className="px-4 py-3">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Featured Token</div>
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                🏠
              </div>
              <div>
                <div className="font-semibold">LandLord</div>
                <div className="text-xs text-gray-400">LAND Token</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-purple-400">52 LAND</div>
              <div className="text-xs text-green-400">+12.5%</div>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-3">
            <strong className="text-purple-300">Web3 & Blockchain Solutions</strong> - Focus on innovative blockchain integration,
            specifically in real estate tokenization. Developed LandLord for fractional investment.
          </p>

          <a
            href="https://landlord-liart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-sm font-semibold
                       hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
          >
            <span>View on Explorer</span>
            <span>🔗</span>
          </a>
        </div>
      </div>

      {/* Transaction Activity */}
      <div className="flex-1 px-4 py-3 overflow-hidden">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Recent Activity</div>
        <div className="space-y-2 overflow-y-auto h-[calc(100%-24px)]">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${getTransactionColor(tx.type)}`}>
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <div className="text-sm font-medium">{tx.description}</div>
                  <div className="text-xs text-gray-500 font-mono">{tx.id}...</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-gray-300'}`}>
                  {tx.amount}
                </div>
                <div className="text-xs text-gray-500">{tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around p-4 bg-black/30 border-t border-white/10">
        <button className="flex flex-col items-center gap-1 text-purple-400">
          <span className="text-xl">💰</span>
          <span className="text-xs">Wallet</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
          <span className="text-xl">🔄</span>
          <span className="text-xs">Swap</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
          <span className="text-xl">📊</span>
          <span className="text-xs">DeFi</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300">
          <span className="text-xl">⚙️</span>
          <span className="text-xs">Settings</span>
        </button>
      </div>

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-[#1a1a2e] border-2 border-purple-500 shadow-lg p-4 min-w-[350px] text-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/Internet Connection Wizard.png" alt="Web3" className="w-12 h-12" />
              <div>
                <div className="font-bold text-purple-400">Web3 Wallet</div>
                <div className="text-xs text-gray-400">Blockchain Interface v2.0</div>
              </div>
            </div>
            <div className="text-xs mb-4 space-y-2">
              <p>🔮 <strong>Fun Fact:</strong> The first Bitcoin transaction was 10,000 BTC for two pizzas!</p>
              <p>💎 <strong>Easter Egg:</strong> The balance shown is 42.069 ETH - the meme number combo!</p>
              <p>🏠 <strong>Project:</strong> LandLord - Real estate tokenization platform</p>
              <p>⚡ <strong>Stack:</strong> Solidity, Web3.js, Ethers.js, Hardhat</p>
              <p className="text-gray-500 italic mt-2">"Not your keys, not your coins." - Every crypto enthusiast ever</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAbout(false)}
                className="px-4 py-1 bg-purple-600 hover:bg-purple-500 border border-purple-400 rounded text-xs text-white"
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
