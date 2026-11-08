#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const rawName = args[0];
const category = args[1] || 'generative-art';

if (!rawName) {
  console.log(`
Usage: npm run new-sketch <sketch-name> [category]

Categories:
  - generative-art
  - simulation
  - flow-fields
  - algorithms
  - physics
  - noise
  - fractals

Examples:
  npm run new-sketch "cosmic-waves"
  npm run new-sketch "game-of-life" "simulation"
  npm run new-sketch "neon-grid" "flow-fields"
`);
  process.exit(1);
}

const id = rawName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const title = rawName
  .replace(/-/g, ' ')
  .replace(/\b\w/g, (c) => c.toUpperCase());

const targetDir = path.join(process.cwd(), 'src/sketches', id);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Error: Sketch folder already exists at src/sketches/${id}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const categoryLabel = category
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const metaContent = `export default {
  id: '${id}',
  title: '${title}',
  category: '${category}',
  categoryLabel: '${categoryLabel}',
  description: 'An interactive generative art sketch created with p5.js and React.',
  instructions: 'Click the canvas or move your mouse to interact.',
  thumbnail: null, // Press S on the sketch page to snapshot a thumbnail!
};
`;

const sketchContent = `export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(15, 23, 42);
  };

  p.draw = () => {
    // Write your p5 drawing code here!
    // Remember to prefix all p5 methods with 'p.' (e.g. p.ellipse, p.fill, p.random)
    p.stroke(255, 30);
    p.noFill();
    p.ellipse(p.mouseX || p.width / 2, p.mouseY || p.height / 2, 60, 60);
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.background(15, 23, 42);
    }
  };
}
`;

fs.writeFileSync(path.join(targetDir, 'meta.js'), metaContent, 'utf-8');
fs.writeFileSync(path.join(targetDir, 'sketch.js'), sketchContent, 'utf-8');

console.log(`
✨ Created new sketch: ${title} (${id})
📁 Location: src/sketches/${id}/
   ├── meta.js
   └── sketch.js

🚀 It is automatically registered in your gallery!
To start developing:
  npm run dev
  Visit: http://localhost:5173/#/sketch/${id}
  Press 'S' in your browser anytime to capture a thumbnail!
`);
