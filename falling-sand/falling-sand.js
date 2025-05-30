/**
 * This script implements a falling sand simulation using p5.js.
 * It defines a grid where sand particles can be added by dragging the mouse.
 * The sand particles fall and interact with each other based on a set of rules.
 * The color of the sand changes dynamically as the user draws.
 */

// Global constants for the simulation and rendering
const SCALE = 2; // Scale factor for rendering individual cells
const COLS = 250; // Number of columns in the grid
const ROWS = 250; // Number of rows in the grid
const HUE_START_VALUE = 360; // Initial hue value for the sand color
const HUE_INCREMENT = 0.06; // Amount to increment hue value on each drag
const SIMULATION_STEPS_PER_FRAME = 10; // Number of simulation steps to perform per display frame
const PAINT_BRUSH_RADIUS = 10; // Radius of the circular brush used for adding sand
const PAINT_BRUSH_DENSITY = 0.25; // Density of sand particles created by the brush


let hueValue = HUE_START_VALUE; // Current hue value for the sand color
let grid; // The grid object that manages the sand particles


/**
 * p5.js function called when the mouse is dragged.
 * This function is used to add sand particles to the grid at the mouse position.
 * It creates a circular brush and adds sand particles within the brush radius.
 * The hue of the sand particles changes as the mouse is dragged.
 */
function mouseDragged() {
    // Calculate the grid cell coordinates based on mouse position and scale
    let col = floor(mouseX / SCALE);
    let row = floor(mouseY / SCALE);

    // Do nothing if the mouse is outside the grid boundaries
    if (grid.outOfBounds(row, col)) {
        return;
    }

    // Iterate over a square area defined by the brush radius
    for (let i = -PAINT_BRUSH_RADIUS; i <= PAINT_BRUSH_RADIUS; i++) {
        for (let j = -PAINT_BRUSH_RADIUS; j <= PAINT_BRUSH_RADIUS; j++) {
            // Check if the current point is within the circular brush
            if (i * i + j * j > PAINT_BRUSH_RADIUS * PAINT_BRUSH_RADIUS) {
                continue; // Skip if outside the circle
            }
            // Add sand particles randomly based on brush density
            // Only add sand to empty cells (value 0)
            if (random(1) < PAINT_BRUSH_DENSITY && grid.get(row + i, col + j) == 0) {
                grid.set(row + i, col + j, hueValue, grid.currentCells);
            }
        }
    }
    // Increment the hue value for the next sand particles
    hueValue += HUE_INCREMENT;
    // Reset hue value if it exceeds 360 (max hue)
    if (hueValue > 360) {
        hueValue = 1;
    }
}

/**
 * p5.js setup function, called once at the beginning of the program.
 * Initializes the canvas, sets the color mode, and creates the grid.
 */
function setup() {
    // Create the canvas with dimensions based on grid size and scale
    createCanvas(COLS * SCALE, ROWS * SCALE);
    // Set color mode to HSB (Hue, Saturation, Brightness)
    // Hue ranges from 0 to 360, Saturation and Brightness from 0 to 255
    colorMode(HSB, 360, 255, 255);
    // Initialize the grid with the specified number of rows and columns
    grid = new Grid(ROWS, COLS);
}

/**
 * p5.js draw function, called repeatedly to draw frames on the canvas.
 * Clears the background, renders the current state of the grid,
 * and then updates the simulation multiple times per frame for smoother animation.
 */
function draw() {
    background(0); // Clear the background to black

    // Render the grid: Iterate through each cell and draw sand particles
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            const state = grid.get(row, col); // Get the state (hue value) of the current cell
            if (state > 0) { // If the cell contains sand (state > 0)
                noStroke(); // Disable drawing outlines for the rectangles
                // Set the fill color using the hue value (state), max saturation, and brightness proportional to hue
                fill(state, 255, 255 * state);
                // Draw a rectangle for the sand particle at the scaled grid position
                rect(col * SCALE, row * SCALE, SCALE);
            }
        }
    }

    // Update the simulation: Perform multiple simulation steps per frame
    for (let i = 0; i < SIMULATION_STEPS_PER_FRAME; i++) {
        grid.update(); // Call the grid's update method to move sand particles
    }
}