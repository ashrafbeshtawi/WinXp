import { useState } from 'react';

export function FrontendApp() {
  const [showFavorites, setShowFavorites] = useState(true);

  const favorites = [
    { name: 'Horus', url: 'https://github.com/ashrafbeshtawi/Horus', icon: '📁' },
    { name: 'Mocking-Bird', url: 'https://mocking-bird-three.vercel.app/', icon: '🐦' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">File</span>
        <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">Edit</span>
        <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">View</span>
        <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">Favorites</span>
        <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">Tools</span>
        <span className="px-2 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-b from-[#f5f4f0] to-[#e3e3db] border-b border-[#919b9c]">
        <button className="flex flex-col items-center px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span className="text-lg">⬅️</span>
          <span>Back</span>
        </button>
        <button className="flex flex-col items-center px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span className="text-lg">➡️</span>
          <span>Forward</span>
        </button>
        <button className="flex flex-col items-center px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span className="text-lg">🔄</span>
          <span>Refresh</span>
        </button>
        <button className="flex flex-col items-center px-2 py-1 hover:bg-[#c1d2ee] rounded text-xs">
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </button>
        <div className="w-px h-8 bg-[#919b9c] mx-2" />
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className={`flex flex-col items-center px-2 py-1 rounded text-xs ${showFavorites ? 'bg-[#c1d2ee]' : 'hover:bg-[#c1d2ee]'}`}
        >
          <span className="text-lg">⭐</span>
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
    </div>
  );
}
