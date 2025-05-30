/**
 * Falling Sand Simulation
 * A cellular automaton that simulates the behavior of falling sand particles.
 * Based on Daniel Shiffman's coding tutorial.
 */

// Rendering constants
const SCALE = 2;
const COLS = 250;
const ROWS = 250;

// Color system constants
const HUE_START_VALUE = 360;
const HUE_INCREMENT = 0.06;
const SIMULATION_STEPS_PER_FRAME = 10;

// Brush tool constants
const PAINT_BRUSH_RADIUS = 10;
const PAINT_BRUSH_DENSITY = 0.25;

// Global state variables
let hueValue = HUE_START_VALUE;
let grid;


/**
 * Handles mouse dragging to create sand particles.
 * Creates a circular brush that places sand particles randomly within the brush area.
 * Each particle gets a unique hue value that cycles through the color spectrum.
 */
function mouseDragged() {
    let col = floor(mouseX / SCALE);
    let row = floor(mouseY / SCALE);

    if (grid.outOfBounds(row, col)) {
        return;
    }

    for (let i = -PAINT_BRUSH_RADIUS; i <= PAINT_BRUSH_RADIUS; i++) {
        for (let j = -PAINT_BRUSH_RADIUS; j <= PAINT_BRUSH_RADIUS; j++) {
            // Check if current position is within circular brush radius
            if (i * i + j * j > PAINT_BRUSH_RADIUS * PAINT_BRUSH_RADIUS) {
                continue;
            }

            // Randomly place sand particles within the brush area
            // Only place on empty cells to avoid overwriting existing sand
            if (random(1) < PAINT_BRUSH_DENSITY && grid.get(row + i, col + j) == 0) {
                grid.set(row + i, col + j, hueValue, grid.currentCells);
            }
        }
    }

    // Cycle through hue values to create rainbow effect
    hueValue += HUE_INCREMENT;
    if (hueValue > 360) {
        hueValue = 1;
    }
}

function setup() {
    createCanvas(COLS * SCALE, ROWS * SCALE);
    colorMode(HSB, 360, 255, 255);
    grid = new Grid(ROWS, COLS);
}


function draw() {
    background(0);

    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            const state = grid.get(row, col);

            // Draw cells that contain sand particles
            if (state > 0) {
                noStroke();
                // Use HSB color mode: hue from state, full saturation, brightness varies with hue
                fill(state, 255, 255 * state);
                rect(col * SCALE, row * SCALE, SCALE);
            }
        }
    }

    // Run multiple physics updates per frame for smoother simulation
    for (let i = 0; i < SIMULATION_STEPS_PER_FRAME; i++) {
        grid.update();
    }
}