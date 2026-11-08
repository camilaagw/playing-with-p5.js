/**
 * Central Sketch Registry
 *
 * Automatically discovers any sketch folders containing `meta.js` and `sketch.js`,
 * while providing catalog metadata for all existing sketches.
 */

// Dynamically discover all converted sketches in src/sketches/*
const metaModules = import.meta.glob('./*/meta.js', { eager: true });
const sketchLoaders = import.meta.glob('./*/sketch.js');

// Catalog of all showcase sketches with their metadata and thumbnails
const catalogList = [
  {
    id: 'shapes',
    title: 'Shapes',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Experimenting with generative art. Click over the canvas to generate a new composition.',
    thumbnail: 'thumbnails/shapes.png',
    legacyHref: 'generative-art/shapes/shapes.html',
    darkerOverlay: true,
  },
  {
    id: 'falling-sand',
    title: 'Falling Sands',
    category: 'simulation',
    categoryLabel: 'Simulation',
    description: 'A cellular automaton that simulates the physics of falling sand particles with rainbow colors.',
    thumbnail: 'thumbnails/falling-sand.png',
    legacyHref: 'falling-sand/index.html',
  },
  {
    id: 'vectors',
    title: 'Just a Spark',
    category: 'physics',
    categoryLabel: 'Physics & Vectors',
    description: 'Vectors and forces simulation creating organic, spark-like motion.',
    thumbnail: 'thumbnails/vectors.png',
    legacyHref: 'basic-patterns/vectors/index.html',
  },
  {
    id: 'flow-field-pro',
    title: 'Flowing Lines',
    category: 'flow-fields',
    categoryLabel: 'Flow Fields',
    description: 'Perlin noise flow field driving hundreds of flowing particle lines.',
    thumbnail: 'thumbnails/flow-field-pro.png',
    legacyHref: 'flow-field-pro/index.html',
  },
  {
    id: 'tree-of-life',
    title: 'Robotic Tree of Life',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Fractal branching tree structure grown algorithmically.',
    thumbnail: 'thumbnails/tree-of-life.png',
    legacyHref: 'tree-of-life/index.html',
  },
  {
    id: 'spirals',
    title: 'Spirals',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Harmonic trigonometric spiral patterns rotating through coordinate space.',
    thumbnail: 'thumbnails/spirals.png',
    legacyHref: 'generative-art/spirals/spirals.html',
  },
  {
    id: 'asteroids',
    title: 'Asteroids',
    category: 'flow-fields',
    categoryLabel: 'Flow Fields',
    description: 'Flow field simulation with asteroid particles traversing vector fields.',
    thumbnail: 'thumbnails/asteroids3.png',
    legacyHref: 'flow-field/asteroids/index.html',
  },
  {
    id: 'confeti',
    title: 'Confeti',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Vibrant geometric confetti bursts and particles with presets.',
    thumbnail: 'thumbnails/confeti.png',
    legacyHref: 'generative-art/confeti/confeti.html',
    darkerOverlay: true,
  },
  {
    id: 'ray-casting',
    title: 'Lightning eyes',
    category: 'algorithms',
    categoryLabel: 'Algorithms',
    description: '2D ray-casting algorithm simulating vision and light rays intersecting line segments.',
    thumbnail: 'thumbnails/ray-casting.png',
    legacyHref: 'ray-casting/index.html',
  },
  {
    id: 'black-n-white',
    title: 'Black & White',
    category: 'noise',
    categoryLabel: 'Noise',
    description: 'High-contrast 2D Perlin noise exploration rendered in black and white.',
    thumbnail: 'thumbnails/black-n-white.png',
    legacyHref: 'just-noise/black-n-white/index.html',
    darkerOverlay: true,
  },
  {
    id: 'particle-systems',
    title: 'Particle Systems',
    category: 'physics',
    categoryLabel: 'Physics & Vectors',
    description: 'Particle emitter and physics system with gravity and lifespan.',
    thumbnail: 'thumbnails/particle-systems.png',
    legacyHref: 'particles/particle-systems/index.html',
  },
  {
    id: 'trazos',
    title: 'Trazos',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Organic expressive brush strokes and generative painting gestures.',
    thumbnail: 'thumbnails/trazos.png',
    legacyHref: 'generative-art/trazos-original/trazos.html',
    darkerOverlay: true,
  },
  {
    id: 'mandelbrot',
    title: 'Mandelbrot Set',
    category: 'fractals',
    categoryLabel: 'Fractals',
    description: 'Complex number escape-time visualization of the famous Mandelbrot fractal.',
    thumbnail: 'thumbnails/mandelbrot.png',
    legacyHref: 'fractals/maldelbrot/index.html',
  },
  {
    id: 'pincelada-bard',
    title: 'Bard creation',
    category: 'generative-art',
    categoryLabel: 'Generative Art',
    description: 'Generative brush stroke synthesis exploring AI-guided visual aesthetics.',
    thumbnail: 'thumbnails/pincelada-bard.png',
    legacyHref: 'pincelada-gpt/index.html',
    darkerOverlay: true,
  },
];

// Merge discovered meta modules with catalog
export function getSketches() {
  const discoveredMap = new Map();

  for (const [path, mod] of Object.entries(metaModules)) {
    const meta = mod.default || mod;
    const dir = path.split('/')[1];
    const loader = sketchLoaders[`./${dir}/sketch.js`];
    discoveredMap.set(meta.id || dir, {
      ...meta,
      hasLiveSketch: Boolean(loader),
      loadSketch: loader,
    });
  }

  return catalogList.map((item) => {
    const discovered = discoveredMap.get(item.id);
    if (discovered) {
      return { ...item, ...discovered };
    }
    return {
      ...item,
      hasLiveSketch: false,
    };
  });
}

export function getSketchById(id) {
  const list = getSketches();
  return list.find((s) => s.id === id) || null;
}
