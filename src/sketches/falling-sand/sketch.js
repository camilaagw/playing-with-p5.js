import { Grid } from './grid';

export default function sketch(p) {
  const SCALE = 2;
  const COLS = 250;
  const ROWS = 250;

  const HUE_START_VALUE = 360;
  const HUE_INCREMENT = 0.06;
  const SIMULATION_STEPS_PER_FRAME = 10;

  const PAINT_BRUSH_RADIUS = 10;
  const PAINT_BRUSH_DENSITY = 0.25;

  let hueValue = HUE_START_VALUE;
  let grid;

  p.setup = () => {
    p.createCanvas(COLS * SCALE, ROWS * SCALE);
    p.colorMode(p.HSB, 360, 255, 255);
    grid = new Grid(ROWS, COLS);
  };

  function addSandAtMouse() {
    let col = p.floor(p.mouseX / SCALE);
    let row = p.floor(p.mouseY / SCALE);

    if (grid.outOfBounds(row, col)) return;

    for (let i = -PAINT_BRUSH_RADIUS; i <= PAINT_BRUSH_RADIUS; i++) {
      for (let j = -PAINT_BRUSH_RADIUS; j <= PAINT_BRUSH_RADIUS; j++) {
        if (i * i + j * j > PAINT_BRUSH_RADIUS * PAINT_BRUSH_RADIUS) continue;

        if (p.random(1) < PAINT_BRUSH_DENSITY && grid.get(row + i, col + j) === 0) {
          grid.set(row + i, col + j, hueValue, grid.currentCells);
        }
      }
    }

    hueValue += HUE_INCREMENT;
    if (hueValue > 360) {
      hueValue = 1;
    }
  }

  p.mouseDragged = () => {
    addSandAtMouse();
  };

  p.mousePressed = () => {
    addSandAtMouse();
  };

  p.draw = () => {
    p.background(0);

    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const state = grid.get(row, col);
        if (state > 0) {
          p.noStroke();
          p.fill(state, 255, 255);
          p.rect(col * SCALE, row * SCALE, SCALE);
        }
      }
    }

    for (let i = 0; i < SIMULATION_STEPS_PER_FRAME; i++) {
      grid.update();
    }
  };
}
