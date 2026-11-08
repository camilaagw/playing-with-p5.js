/**
 * Central Sketch Registry
 *
 * Automatically discovers any sketch folders containing `meta.js` and `sketch.js`,
 * while providing catalog metadata for all existing sketches.
 */

// Dynamically discover all converted sketches in src/sketches/*
const metaModules = import.meta.glob('./*/meta.js', { eager: true });
const sketchLoaders = import.meta.glob('./*/sketch.js');

// Catalog of known sketches with metadata and thumbnails
const catalogList = [
  {
    id: 'shapes',
    title: 'Shapes',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Experimenting with generative art. Click over the canvas to generate a new composition.',
    thumbnail: 'thumbnails/shapes.png',
    darkerOverlay: true,
  },
  {
    id: 'falling-sand',
    title: 'Falling Sands',
    category: 'simulation',
    categoryLabel: 'Simulation',
    description: 'A cellular automaton that simulates the physics of falling sand particles with rainbow colors.',
    thumbnail: 'thumbnails/falling-sand.png',
  },
  {
    id: 'vectors',
    title: 'Just a Spark',
    category: 'physics',
    categoryLabel: 'Physics & Vectors',
    description: 'Vectors and forces simulation creating organic, spark-like motion.',
    thumbnail: 'thumbnails/vectors.png',
  },
  {
    id: 'flow-field-pro',
    title: 'Flowing Lines',
    category: 'flow-fields',
    categoryLabel: 'Flow Fields',
    description: 'Perlin noise flow field driving hundreds of flowing particle lines.',
    thumbnail: 'thumbnails/flow-field-pro.png',
  },
  {
    id: 'tree-of-life',
    title: 'Robotic Tree of Life',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Fractal branching tree structure grown algorithmically.',
    thumbnail: 'thumbnails/tree-of-life.png',
  },
  {
    id: 'spirals',
    title: 'Spirals',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Harmonic trigonometric spiral patterns rotating through coordinate space.',
    thumbnail: 'thumbnails/spirals.png',
  },
  {
    id: 'asteroids',
    title: 'Asteroids',
    category: 'flow-fields',
    categoryLabel: 'Flow Fields',
    description: 'Flow field simulation with asteroid particles traversing vector fields.',
    thumbnail: 'thumbnails/asteroids3.png',
  },
  {
    id: 'confeti',
    title: 'Confeti',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Vibrant geometric confetti bursts and particles with presets.',
    thumbnail: 'thumbnails/confeti.png',
    darkerOverlay: true,
  },
  {
    id: 'ray-casting',
    title: 'Lightning eyes',
    category: 'algorithms',
    categoryLabel: 'Algorithms',
    description: '2D ray-casting algorithm simulating vision and light rays intersecting line segments.',
    thumbnail: 'thumbnails/ray-casting.png',
  },
  {
    id: 'black-n-white',
    title: 'Black & White',
    category: 'noise',
    categoryLabel: 'Noise',
    description: 'High-contrast 2D Perlin noise exploration rendered in black and white.',
    thumbnail: 'thumbnails/black-n-white.png',
    darkerOverlay: true,
  },
  {
    id: 'particle-systems',
    title: 'Particle Systems',
    category: 'physics',
    categoryLabel: 'Physics & Vectors',
    description: 'Particle emitter and physics system with gravity and lifespan.',
    thumbnail: 'thumbnails/particle-systems.png',
  },
  {
    id: 'trazos',
    title: 'Trazos',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Organic expressive brush strokes and generative painting gestures.',
    thumbnail: 'thumbnails/trazos.png',
    darkerOverlay: true,
  },
  {
    id: 'mandelbrot',
    title: 'Mandelbrot Set',
    category: 'fractals',
    categoryLabel: 'Fractals',
    description: 'Complex number escape-time visualization of the famous Mandelbrot fractal.',
    thumbnail: 'thumbnails/mandelbrot.png',
    darkerOverlay: true,
  },
  {
    id: 'pincelada-bard',
    title: 'Bard creation',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Generative brush stroke synthesis exploring AI-guided visual aesthetics.',
    thumbnail: 'thumbnails/pincelada-bard.png',
    darkerOverlay: true,
  },
  {
    id: 'random-walker',
    title: 'Random Walker',
    category: 'algorithms',
    categoryLabel: 'Algorithms',
    description: 'Self-avoiding random walk algorithm exploring a discrete grid.',
    thumbnail: 'thumbnails/shapes.png',
  },
];

// Merge discovered meta modules with catalog
export function getSketches() {
  const discoveredMap = new Map();

  for (const [path, mod] of Object.entries(metaModules)) {
    const meta = mod.default || mod;
    const dir = path.split('/')[1];
    const loader = sketchLoaders[`./${dir}/sketch.js`];
    const sketchId = meta.id || dir;
    discoveredMap.set(sketchId, {
      ...meta,
      id: sketchId,
      hasLiveSketch: Boolean(loader),
      loadSketch: loader,
    });
  }

  // Start with items from catalogList
  const seenIds = new Set();
  const result = [];

  for (const item of catalogList) {
    seenIds.add(item.id);
    const discovered = discoveredMap.get(item.id);
    if (discovered) {
      result.push({ ...item, ...discovered });
    } else {
      result.push({ ...item, hasLiveSketch: false });
    }
  }

  // Append any newly discovered sketches not explicitly in catalogList
  for (const [id, discovered] of discoveredMap.entries()) {
    if (!seenIds.has(id)) {
      result.push(discovered);
    }
  }

  return result;
}

export function getSketchById(id) {
  const list = getSketches();
  return list.find((s) => s.id === id) || null;
}
