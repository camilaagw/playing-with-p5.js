
function setup() {
  createCanvas(400, 400);
  background(0);
  noStroke();
  fill(255);
  //noLoop(); // Draw once without looping
  frameRate(1)
}

function draw() {
  // Create multiple ellipses with different sizes and positions
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 25);
    ellipse(x, y, size, size);
  }

  // Add animation using noise() to slightly change positions each frame
  translate(noise(frameCount * 0.01) * 10, noise(frameCount * 0.01) * 5);
}