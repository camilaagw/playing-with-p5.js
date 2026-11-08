# 🎨 Dazzling Coding Creations — Playing with p5.js

A modern, responsive creative coding gallery built with **React**, **Vite**, and **p5.js**.

Live Demo: [https://camilaagw.github.io/playing-with-p5.js/](https://camilaagw.github.io/playing-with-p5.js/)

---

## ✨ Features

- **Interactive Gallery**: Responsive card grid with live hover overlays in handwritten calligraphy style.
- **Dedicated Sketch Viewers**: Isolated canvas routes (`/#/sketch/:id`) with automatic canvas lifecycle management.
- **Instant Search & Category Filters**: Filter by Generative Art, Flow Fields, Simulation, Algorithms, Physics, Fractals, and Noise.
- **Dark / Light Theme**: Dark "Midnight" theme by default makes vivid generative art glow, with a persistent theme toggle.
- **Immersive Fullscreen**: Full-bleed fullscreen viewer mode (`F` key or button) for distraction-free art appreciation.
- **In-Browser Snapshotting**: Press `S` or click 📸 to instantly capture and download high-res PNG thumbnails of any canvas frame.
- **1-Command Scaffolding**: Create a new sketch with one terminal command and start coding immediately.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/camilaagw/playing-with-p5.js.git
cd playing-with-p5.js

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) to see the gallery with instant Hot Module Replacement (HMR).

---

## ⚡ Creating a New Sketch (The 1-Step Workflow)

Adding a new creative coding canvas is effortless. Run:

```bash
npm run new-sketch "cosmic-waves" "generative-art"
```

Available categories: `generative-art`, `simulation`, `flow-fields`, `algorithms`, `physics`, `noise`, `fractals`.

This automatically creates:
```
src/sketches/cosmic-waves/
├── meta.js      # Title, category, description, and thumbnail config
└── sketch.js    # p5.js instance-mode template
```

**That's it!** Vite's auto-discovery registry immediately detects the new folder and displays your sketch in the gallery. No manual HTML files, no CSS imports, no index files to edit.

---

## ⌨️ Viewer Keyboard Shortcuts

When viewing any sketch:
| Key | Action |
|---|---|
| <kbd>S</kbd> | **Snapshot Thumbnail**: Captures the current canvas as `<id>.png` |
| <kbd>F</kbd> | **Toggle Fullscreen**: Immersive full-screen view |
| <kbd>R</kbd> | **Restart**: Re-initializes and re-runs the sketch |
| <kbd>ESC</kbd> | **Exit Fullscreen** |

---

## 🛠️ Tech Stack & Architecture

- **React 19 & React Router 7 (`HashRouter`)**: Client-side routing perfectly compatible with static hosts like GitHub Pages.
- **Vite 8 & Rolldown**: Ultra-fast dev server with automated per-sketch chunk splitting (~0.5 kB per sketch).
- **p5.js (Instance Mode)**: Clean encapsulation with automatic WebGL/2D context cleanup on route unmount.
- **CSS Modules**: Scoped design tokens with responsive CSS Grid and fluid typography.

### Project Layout

```
playing-with-p5.js/
├── public/
│   ├── images/              # Logos and brand assets
│   └── thumbnails/          # High-resolution sketch previews
├── scripts/
│   └── create-sketch.js     # CLI generator for new sketches
├── src/
│   ├── components/
│   │   ├── Gallery.jsx      # Filterable home page grid
│   │   ├── Header.jsx       # Header with branding & theme toggle
│   │   ├── Footer.jsx       # Footer
│   │   ├── P5Wrapper.jsx    # Reusable p5 instance-mode lifecycle wrapper
│   │   ├── SketchCard.jsx   # Interactive preview cards
│   │   └── SketchPage.jsx   # Dedicated viewer with toolbar & shortcuts
│   ├── sketches/            # Self-contained sketch modules
│   │   ├── index.js         # Auto-discovery registry (import.meta.glob)
│   │   ├── falling-sand/
│   │   ├── flow-field-pro/
│   │   ├── shapes/
│   │   └── ...
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css    # Design tokens & color palettes
│   ├── utils/
│   │   └── theme.js         # Dark/Light theme manager
│   ├── App.jsx              # Routing & route transitions
│   └── main.jsx             # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 📦 Building for Production

```bash
npm run build
```

Build artifacts are compiled into `dist/` with relative asset URLs, ready to deploy to GitHub Pages or any static CDN.
