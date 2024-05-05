function setup() {
    createCanvas(800, 800);
    noLoop(); // Draw once without looping
    angleMode(DEGREES); // Set angleMode to degrees for easier understanding
    noFill(); // No fill for the brush strokes
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

      // Starting point for the curve
      let startX = random(width);
      let startY = random(height);

      // End point for the curve
      let endX = random(width);
      let endY = random(height);

      // Control points for the curve
      let controlX1 = random(width);
      let controlY1 = random(height);
      let controlX2 = random(width);
      let controlY2 = random(height);

      // Draw the brush stroke with variable width
      drawVariableWidthBrush(startX, startY, controlX1, controlY1, controlX2, controlY2, endX, endY);
    }
  }

  // Function to draw a brush stroke with variable width
  function drawVariableWidthBrush(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    beginShape();
    let steps = 10; // Number of steps for drawing the variable width
    for (let i = 0; i <= steps; i++) {
      let t = i / steps; // Calculate interpolation factor
      // Get the position and radius at point t
      let x = curvePoint(x1, cx1, cx2, x2, t);
      let y = curvePoint(y1, cy1, cy2, y2, t);
      let r = noise(x * 0.01, y * 0.01) * 15 + 1; // Radius based on noise for variability
      strokeWeight(r); // Set stroke weight based on the radius
      curveVertex(x, y); // Create the vertex for the curve
    }
    endShape();
  }
