const numShapes = 200;
const colors = ['#FFA500', '#FF69B4', '#4169E1', '#32CD32', '#FFD700', ];
const spirals = 5;

function setup() {
  createCanvas(500, 500);
  background(0);
  noStroke();

  // Generate the composition
  for (let s = 0; s < spirals; s++) {
    drawSpiral(s);
  }

  // Stop the draw loop
  noLoop();
}

function drawSpiral(spiralIndex) {
  let centerX = width / 2;
  let centerY = height / 2;
  let maxRadius = min(width, height) * 0.45;

  for (let i = 0; i < numShapes / spirals; i++) {
    let t = i / (numShapes / spirals);
    let angle = map(t, 0, 1, 0, TWO_PI * 3); // 3 full rotations
    let radius = map(t, 0, 1, 10, maxRadius);

    let x = centerX + cos(angle + spiralIndex * TWO_PI / spirals) * radius;
    let y = centerY + sin(angle + spiralIndex * TWO_PI / spirals) * radius;

    drawShape(x, y, radius * 0.2, angle);
  }
}

function drawShape(x, y, size, angle) {
  let color = random(colors);

  fill(color);
  push();
  translate(x, y);
  rotate(angle);

  beginShape();
  let startAngle = random(TWO_PI);
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let noiseVal = noise(cos(a) + 1, sin(a) + 1, x * 0.01, y * 0.01) * size;
    let sx = cos(a + startAngle) * noiseVal;
    let sy = sin(a + startAngle) * noiseVal;
    curveVertex(sx, sy);
  }
  endShape(CLOSE);

  // Occasionally add smaller shapes or details
  if (random() <= 20) {
    fill(random(colors));
    let detailSize = size * random(0.3, 0.7);
    drawDetailShape(detailSize);
  }

  pop();
}

function drawDetailShape(size) {
  push();
  translate(random(-size, size), random(-size, size));
  rotate(random(TWO_PI));

  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.2) {
    let r = size * (0.5 + 0.5 * sin(a * 3));
    let x = cos(a) * r;
    let y = sin(a) * r;
    curveVertex(x, y);
  }
  endShape(CLOSE);

  pop();
}

function mousePressed() {
  background(0);
  for (let s = 0; s < spirals; s++) {
    drawSpiral(s);
  }
}

function draw() {
  // Empty draw function
}