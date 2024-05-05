function setup() {
    createCanvas(800, 800);
    noLoop(); // Draw once without looping
    background(0); // Start with a white background
  }

  function draw() {


    // Define a color palette
    let colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];

    // Number of brushes
    let brushCount = 100;

    for (let i = 0; i < brushCount; i++) {
      // Choose a random color from the palette
      let brushColor = colors[int(random(colors.length))];
      stroke(brushColor);
      fill(brushColor);
      //noFill(); // Ensure there's no fill for the brush stroke

      // Draw the brush stroke with variable width
      drawVariableWidthStroke();
    }
  }

  function drawVariableWidthStroke() {
    let noiseScale = 0.01; // Scale for noise to control variation smoothness
    let start = createVector(random(width), random(height));
    let end = createVector(random(width), random(height));
    let control1 = p5.Vector.lerp(start, end, 0.3).add(p5.Vector.random2D().mult(random(50, 150)));
    let control2 = p5.Vector.lerp(start, end, 0.7).add(p5.Vector.random2D().mult(random(50, 150)));

    beginShape();
    for (let i = 0; i <= 1; i += 0.003) {
      // Interpolate along the curve
      let t = i;
      let x = bezierPoint(start.x, control1.x, control2.x, end.x, t);
      let y = bezierPoint(start.y, control1.y, control2.y, end.y, t);
      // Use noise to create a stroke width that changes over time
      let weight = noise(x * noiseScale, y * noiseScale) * 25 + 1;
      // Instead of using curveVertex, use ellipse to simulate a varying width
      ellipse(x, y, weight, weight);
    }
    endShape();
  }
