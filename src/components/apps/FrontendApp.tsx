import { useState } from 'react';
import { useWindowStore } from '@/stores/windowStore';

export function FrontendApp() {
  const [showFavorites, setShowFavorites] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);

  const favorites = [
    { name: 'Horus', url: 'https://github.com/ashrafbeshtawi/Horus', icon: '📁' },
    { name: 'Mocking-Bird', url: 'https://mocking-bird-three.vercel.app/', icon: '🐦' },
  ];

  return (
    <div className="h-full flex flex-col bg-white relative">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi/Horus', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open Horus</div>
            <div onClick={() => window.open('https://mocking-bird-three.vercel.app/', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Open Mocking-Bird</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => window.print()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Print...</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => setShowFavorites(!showFavorites)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center">
              {showFavorites && <span className="mr-2">✓</span>}
              <span className={!showFavorites ? 'ml-5' : ''}>Favorites Bar</span>
            </div>
            <div onClick={() => window.location.reload()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Refresh</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Favorites</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi/Horus', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">📁 Horus</div>
            <div onClick={() => window.open('https://mocking-bird-three.vercel.app/', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">🐦 Mocking-Bird</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => window.open('https://github.com/ashrafbeshtawi', '_blank')} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">⭐ All Projects</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">🎮 Take a Break</div>
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
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">📝 Open Notepad</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[180px]">
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
            })} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Contact Developer</div>
            <div className="border-t border-gray-300 my-1" />
            <div onClick={() => setShowAbout(true)} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Frontend</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-1 py-0.5 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border-b border-[#919b9c]">
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px] opacity-50">
          <img src="/img/Back.png" alt="Back" className="w-5 h-5 object-contain" />
          <span>Back</span>
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px] opacity-50">
          <img src="/img/Forward.png" alt="Forward" className="w-5 h-5 object-contain" />
          <span>Forward</span>
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px]"
        >
          <img src="/img/IE Refresh.png" alt="Refresh" className="w-5 h-5 object-contain" />
          <span>Refresh</span>
        </button>
        <button className="flex items-center gap-1 px-1.5 py-0.5 hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5] rounded text-[10px]">
          <img src="/img/IE Home.png" alt="Home" className="w-5 h-5 object-contain" />
          <span>Home</span>
        </button>
        <div className="w-px h-6 bg-[#919b9c] mx-1" />
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${showFavorites ? 'bg-[#c1d2ee] border border-[#316ac5]' : 'hover:bg-[#c1d2ee] hover:border hover:border-[#316ac5]'}`}
        >
          <img src="/img/Favorites.png" alt="Favorites" className="w-5 h-5 object-contain" />
          <span>Favorites</span>
        </button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c]">
        <span className="text-xs font-semibold">Address</span>
        <div className="flex-1 flex items-center bg-white border border-[#7f9db9] px-2 py-1">
          <span className="text-green-600 mr-1">🔒</span>
          <span className="text-xs text-gray-700">https://ashraf.dev/frontend</span>
        </div>
        <button className="px-3 py-1 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border border-[#919b9c] text-xs hover:bg-[#c1d2ee]">
          Go
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Favorites Sidebar */}
        {showFavorites && (
          <div className="w-48 bg-[#f5f9fd] border-r border-[#919b9c] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#6b9bd1] to-[#4a7ab5] text-white px-3 py-2 text-sm font-semibold">
              Favorites
            </div>
            <div className="p-2">
              {favorites.map((fav, index) => (
                <a
                  key={index}
                  href={fav.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs"
                >
                  <span>{fav.icon}</span>
                  <span className="text-[#0066cc] underline">{fav.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 bg-white">
          <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="border-b-2 border-[#316ac5] pb-4 mb-6">
              <h1 className="text-2xl font-bold text-[#003399] mb-2">
                Frontend & Immersive 3D Experiences
              </h1>
              <p className="text-gray-600 text-sm">
                Building the future of web interfaces
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-[#003399] mb-3">About</h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Expert in <strong>Next.js</strong>, <strong>Nuxt.js</strong>, <strong>Three.js</strong> & <strong>WebGL</strong> for
                  building high-performance, responsive UIs and crafting cutting-edge,
                  immersive 3D web experiences.
                </p>

                <h2 className="text-lg font-semibold text-[#003399] mb-3">Featured Projects</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span>📁</span>
                    <a
                      href="https://github.com/ashrafbeshtawi/Horus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] underline hover:text-[#003399]"
                    >
                      Horus - GitHub Repository
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🐦</span>
                    <a
                      href="https://mocking-bird-three.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0066cc] underline hover:text-[#003399]"
                    >
                      Mocking-Bird - Live Demo
                    </a>
                  </li>
                </ul>
              </div>

              {/* Image Placeholder */}
              <div className="flex items-center justify-center">
                <div className="w-full h-48 bg-gradient-to-br from-[#e8f4ff] to-[#cce5ff] border-2 border-dashed border-[#7f9db9] rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-sm">3D Project Preview</p>
                    <p className="text-xs">Three.js & WebGL</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-6 p-4 bg-[#f5f9fd] border border-[#7f9db9] rounded">
              <h3 className="text-sm font-semibold text-[#003399] mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Nuxt.js', 'Three.js', 'WebGL', 'React', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white border border-[#7f9db9] rounded text-xs text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-2 py-1 bg-[#ece9d8] border-t border-[#919b9c] text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span>Done</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Internet | Protected Mode: On</span>
          <span className="text-green-600">🔒</span>
        </div>
      </div>

      {/* About Dialog */}
      {showAbout && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-[#ece9d8] border-2 border-[#0055e5] shadow-lg p-4 min-w-[350px]">
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/HTML.png" alt="Frontend" className="w-12 h-12" />
              <div>
                <div className="font-bold">Frontend Explorer</div>
                <div className="text-xs text-gray-600">Internet Explorer XP Edition</div>
              </div>
            </div>
            <div className="text-xs mb-4 space-y-2">
              <p>🎨 <strong>Fun Fact:</strong> The first website ever created is still online at info.cern.ch!</p>
              <p>💡 <strong>Easter Egg:</strong> Try pressing F12 in any browser to see the Matrix...</p>
              <p>🚀 <strong>Tech Stack:</strong> Next.js, Three.js, WebGL, TypeScript</p>
              <p className="text-gray-500 italic mt-2">"Any sufficiently advanced CSS is indistinguishable from magic." - Arthur C. Clarke (probably)</p>
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
