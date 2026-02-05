# WinXP WebOS Portfolio - Design Document

## Overview

A Windows XP-style web operating system showcasing Ashraf Beshtawi's portfolio. Each project section appears as a unique themed "exe" program, complete with boot sequence, sounds, and full desktop experience.

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **CSS Modules** for XP-authentic styling
- **Zustand** for window state management
- **Howler.js** for audio

## Project Structure

```
/app
  /page.tsx                 → Boot sequence → Desktop
/components
  /boot
    /BiosScreen.tsx         → Fake BIOS
    /LoadingScreen.tsx      → XP loading bar
    /WelcomeScreen.tsx      → User welcome
  /desktop
    /Desktop.tsx            → Main desktop container
    /DesktopIcon.tsx        → Clickable icons
    /Wallpaper.tsx          → Background
  /taskbar
    /Taskbar.tsx            → Bottom bar
    /StartButton.tsx        → Start menu trigger
    /StartMenu.tsx          → Start menu popup
    /SystemTray.tsx         → Clock, speaker
    /TaskbarItem.tsx        → Open window buttons
  /windows
    /Window.tsx             → Base draggable/resizable window
    /WindowManager.tsx      → Handles z-index, focus
  /apps
    /ie-browser             → Frontend.exe
    /terminal               → Backend.exe
    /wallet                 → Web3.exe
    /neural-viewer          → AI.exe
    /outlook                → Contact.exe
    /minesweeper            → Game
    /notepad                → Text editor
    /explorer               → File explorer
  /context-menu
    /ContextMenu.tsx        → Right-click menus
/stores
  /windowStore.ts           → Window states
  /audioStore.ts            → Sound management
/public
  /sounds
    /startup.mp3
    /click.mp3
    /error.mp3
    /shutdown.mp3
  /icons                    → XP-style icons
  /wallpaper
    /bliss.jpg
```

## Boot Sequence

1. **BIOS Screen** (1.5s) - "Ashraf OS v1.0", fake hardware detection
2. **XP Loading Screen** (3s) - Windows XP logo, animated loading bar
3. **Welcome Screen** (1s) - "Welcome" with user photo
4. **Desktop Fade-in** - Wallpaper, icons, taskbar appear

## Desktop Layout

### Icons (Left side, vertical)
- My Computer
- My Documents
- Internet Explorer
- Recycle Bin
- --- separator ---
- Frontend.exe
- Backend.exe
- Web3.exe
- AI.exe
- Contact.exe

### Interactions
- Single click → Select (highlight)
- Double click → Open app
- Right click → Context menu

## Window System

### Features
- Draggable title bar (viewport constrained)
- Resizable from edges/corners
- Title bar: Minimize, Maximize, Close buttons
- XP blue gradient (active) / gray (inactive)
- Drop shadow
- Z-index: click to bring forward

### States
- `open` → Visible
- `minimized` → Hidden, in taskbar
- `maximized` → Fullscreen (below taskbar)
- `closed` → Removed

## Taskbar

```
[Start] | Quick Launch | Open Windows | System Tray (🔊 3:42 PM)
```

- **Start Button** → Opens Start Menu
- **Quick Launch** → IE, Show Desktop
- **Open Windows** → Button per open window
- **System Tray** → Speaker toggle, real-time clock

## Start Menu

```
┌─────────────────────────────┐
│ 👤 Ashraf Beshtawi          │
├─────────────────────────────┤
│ 🌐 Internet Explorer        │
│ ✉️ Outlook Express          │
│ 📁 My Documents             │
├─────────────────────────────┤
│ ▶ All Programs          →   │
├─────────────────────────────┤
│ 🔴 Shut Down                │
└─────────────────────────────┘
```

All Programs submenu includes all apps.

## Portfolio Apps

### Frontend.exe → Internet Explorer Style
- IE toolbar: Back, Forward, Refresh, Address Bar
- Address: `https://ashraf.dev/frontend`
- Content: Title, description, image
- Favorites sidebar: Horus (GitHub), Mocking-Bird (demo)

### Backend.exe → Command Prompt Style
- Black background, green/white monospace text
- Simulated terminal typing effect:
  ```
  C:\> whoami
  Senior Backend Engineer

  C:\> skills --list
  PHP 8, Symfony, PostgreSQL, MongoDB, APIs, Microservices

  C:\> cat about.txt
  [Description]

  C:\> open github
  [Clickable link]
  ```

### Web3.exe → Crypto Wallet Style
- Dark UI, purple/blue gradients
- Fake wallet balance display
- LandLord project as "token"
- "View on Explorer" button → LandLord demo

### AI.exe → Neural Network Visualizer Style
- Dark interface, neon cyan/green accents
- Animated node visualization (CSS)
- "Neural Network Console v1.0" header
- Auto-Trader link as "Download Model"

### Contact.exe → Outlook Express Style
- Classic Outlook layout with folder sidebar
- Inbox displays GitHub and LinkedIn as "emails"
- Clicking email opens link in new tab
- Shows: photo, title, location, skills summary

## Utility Apps

### Minesweeper
- Fully playable
- Menu: Game (New, Difficulty), Help
- Smiley button, timer, mine counter
- Classic grid mechanics

### Notepad
- Menu: File, Edit, Format, Help
- Editable text area
- Pre-loaded welcome message:
  ```
  Welcome to Ashraf OS!

  Feel free to explore. Try right-clicking
  things, check My Documents for surprises,
  and don't forget to play Minesweeper.

  - Ashraf
  ```

### File Explorer
- Tree navigation
- My Computer shows C: and D: drives
- My Documents structure:
  ```
  📁 My Documents
  ├── 📄 README.txt        → Personal message
  ├── 📁 Secret            → Hidden folder
  │   ├── 📄 resume.pdf    → Downloadable resume
  │   └── 📄 credits.txt   → Build credits
  └── 📁 Projects          → Project links
  ```

## Audio System

**Sounds (muted by default):**
- Startup sound → After boot
- Click sound → UI interactions
- Error sound → Invalid actions
- Shutdown sound → On shutdown

**Speaker Icon:**
- 🔊 (unmuted) / 🔇 (muted)
- Click to toggle
- State persisted in localStorage

## Right-Click Context Menus

### Desktop
- Refresh
- Paste
- New → Folder, Text Document
- Properties

### Icons
- Open
- Delete (Recycle Bin only)
- Properties

## Shutdown

- Classic XP shutdown dialog
- Options: Shut Down, Restart
- Shut Down → Fade to black → "It is now safe..." → Loop to boot

## Portfolio Content

### Frontend
- **Title:** Frontend & Immersive 3D Experiences
- **Text:** Expert in Next.js, Nuxt.js, Three.js & WebGL...
- **Links:** Horus (GitHub), Mocking-Bird (demo)
- **Image:** /img/frontend.png

### Backend
- **Title:** Scalable Backend Engineering
- **Text:** Specializing in robust and scalable backend systems...
- **Links:** GitHub Backend Repos
- **Image:** /img/backend.png

### Web3
- **Title:** Web3 & Blockchain Solutions
- **Text:** Focus on innovative blockchain integration...
- **Links:** LandLord (demo)
- **Image:** /img/web3.png

### AI
- **Title:** AI-Driven Automation & Trading
- **Text:** Leveraging Genetic Algorithms and n8n Workflows...
- **Links:** Auto-Trader (GitHub)
- **Image:** /img/ai.png

### About (Contact)
- **Title:** Ashraf Beshtawi
- **Text:** Senior Backend & AI Engineer, Berlin, 5+ years...
- **Links:** GitHub, LinkedIn
- **Image:** /img/me.jpeg

## Personal Info

- **Name:** Ashraf Beshtawi
- **Location:** Berlin
- **Role:** Senior Backend & AI Engineer
- **Experience:** 5+ years
- **Languages:** German, English, Arabic
- **Skills:** PHP, Symfony, SQL, MongoDB, Next.js, Nuxt.js
