function setup() {
    createCanvas(800, 800);
    noLoop(); // Draw once without looping
    background(0); // Start with a white background
  }

  function draw() {
    // Define a color palette
    let colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];

    // Center of gravity
    let centerX = width / 2;
    let centerY = height / 2;

    // Number of curves
    let curveCount = 20;

    for (let i = 0; i < curveCount; i++) {
      // Choose a random color from the palette
      let brushColor = colors[int(random(colors.length))];
      stroke(brushColor);

      // Draw the brush stroke with variable width
      drawVariableWidthStroke(centerX, centerY, i, curveCount);
    }
  }

  function drawVariableWidthStroke(centerX, centerY, index, total) {
    let noiseScale = 0.0002; // Scale for noise to control variation smoothness
    let maxRadius = min(centerX, centerY) * 0.8; // Maximum radius for curves
    let radius = maxRadius * ((index + 1) / total);

    // Create vectors for start and end, and control points
    let start = createVector(centerX + radius, centerY);
    let end = createVector(centerX - radius, centerY);
    let control1 = p5.Vector.random2D().mult(random(50, 150)).add(start);
    let control2 = p5.Vector.random2D().mult(random(50, 150)).add(end);

    noFill();
    beginShape();
    for (let i = 0; i <= 1; i += 0.01) {
      // Interpolate along the curve
      let t = i;
      let x = bezierPoint(start.x, control1.x, control2.x, end.x, t);
      let y = bezierPoint(start.y, control1.y, control2.y, end.y, t);
      // Use noise to create a stroke width that changes over time
      let weight = noise(x * noiseScale, y * noiseScale) * 25 + 1;
      // Set stroke weight and draw the point
      strokeWeight(weight);
      point(x, y);
    }
    endShape();
  }
