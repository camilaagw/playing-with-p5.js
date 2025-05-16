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


function mouseDragged() {
    let col = floor(mouseX / SCALE)
    let row = floor(mouseY / SCALE)

    if (grid.outOfBounds(row, col)) {
        return
    }

    for (let i=-PAINT_BRUSH_RADIUS; i<=PAINT_BRUSH_RADIUS; i++) {
        for (let j=-PAINT_BRUSH_RADIUS; j<=PAINT_BRUSH_RADIUS; j++) {
            // Check if we are within a circular brush (for  a nicer feel)
            if (i*i + j*j > PAINT_BRUSH_RADIUS * PAINT_BRUSH_RADIUS) {
                continue;
            }
            // Create grains of sand on empty cells
            if (random(1) < PAINT_BRUSH_DENSITY && grid.get(row+i, col+j)==0) {
                grid.set(row+i, col+j, hueValue)
            }
        }
    }
    hueValue += HUE_INCREMENT;
  if (hueValue > 360) {
    hueValue = 1;
  }

}

function setup() {
    createCanvas(COLS*SCALE, ROWS*SCALE);
    colorMode(HSB, 360, 255, 255)
    grid = new Grid(ROWS, COLS)
}


function draw() {
    background(0)
    for (let col=0; col<COLS; col++) {
        for (let row=0; row<ROWS; row++) {
            const state = grid.get(row, col)
            if (state > 0) {
                noStroke();
                fill(state, 255, 255*state)
                rect(col*SCALE, row*SCALE, SCALE)
            }
        }
    }

    for (let i = 0; i < SIMULATION_STEPS_PER_FRAME; i++) {
        grid.update();
    }
}