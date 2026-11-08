import { Dots } from './dots';

export default function sketch(p) {
  const presets = [
    {
      name: 'Classic',
      frameRate: 20,
      circleSize: 125,
      dotSize: 16,
      randomCenter: true,
      chaoticMode: true,
    },
    {
      name: 'Slow Bloom',
      frameRate: 1,
      circleSize: 200,
      dotSize: 18,
      randomCenter: false,
      chaoticMode: false,
    },
    {
      name: 'Random circles',
      frameRate: 5,
      circleSize: 125,
      dotSize: 16,
      randomCenter: true,
      chaoticMode: false,
    },
    {
      name: 'Tiny Burst',
      frameRate: 20,
      circleSize: 50,
      dotSize: 4,
      randomCenter: true,
      chaoticMode: false,
    },
    {
      name: 'Giant Swirl',
      frameRate: 3,
      circleSize: 300,
      dotSize: 30,
      randomCenter: false,
      chaoticMode: true,
    },
  ];

  let currentPresetIndex = 0;
  let dots;
  let params = { ...presets[0] };

  function applyPreset(preset) {
    params = { ...preset };
    if (dots) {
      dots.updateParams(params);
    }
    p.background(0);
    p.frameRate(params.frameRate);
  }

  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
    dots = new Dots(p);
    applyPreset(presets[currentPresetIndex]);
  };

  p.draw = () => {
    dots.show();
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      if (p.isLooping()) {
        p.noLoop();
      } else {
        p.loop();
      }
    }
  };

  p.keyPressed = () => {
    if (p.keyCode === p.RIGHT_ARROW || p.key === ' ') {
      currentPresetIndex = (currentPresetIndex + 1) % presets.length;
      applyPreset(presets[currentPresetIndex]);
    } else if (p.keyCode === p.LEFT_ARROW) {
      currentPresetIndex = (currentPresetIndex - 1 + presets.length) % presets.length;
      applyPreset(presets[currentPresetIndex]);
    }
  };
}
