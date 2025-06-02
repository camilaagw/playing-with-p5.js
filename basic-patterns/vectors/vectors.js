/**
 * Radial Vector Pattern
 * Generates random 2D vectors and visualizes them as lines radiating from the center of the canvas.
 */

function setup() {
    createCanvas(500, 500);
    background(0);
}

function draw() {
    translate(width / 2, height / 2); 

    // Create a random 2D vector with a random direction and magnitude.
    let v = p5.Vector.random2D();
    v.mult(random(10, 200));

    // Draw vector.
    stroke(255, 20);
    line(0, 0, v.x, v.y);
}