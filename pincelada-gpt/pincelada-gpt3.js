function setup() {
    createCanvas(800, 800);
    noLoop(); // Draw once without looping
    smooth(); // Anti-aliasing for smoother output
    background(0); // Start with a white background
  }

  function draw() {


    // Define a color palette
    let colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];

    // Center of gravity
    let centerX = width / 2;
    let centerY = height / 2;

    // Number of brushes
    let brushCount = 5;

    for (let i = 0; i < brushCount; i++) {
      // Choose a random color from the palette
      let brushColor = colors[int(random(colors.length))];
      stroke(brushColor);

      // Calculate starting and ending points
      let angle = random(360);
      let startRadius = random(50, 200);
      let endRadius = random(50, 200);
      let startX = centerX + cos(angle) * startRadius;
      let startY = centerY + sin(angle) * startRadius;
      let endX = centerX + cos(angle + random(-30, 30)) * endRadius;
      let endY = centerY + sin(angle + random(-30, 30)) * endRadius;

      // Control points for the curves are influenced by the center of gravity
      let controlX1 = centerX + random(-200, 200);
      let controlY1 = centerY + random(-200, 200);
      let controlX2 = centerX + random(-200, 200);
      let controlY2 = centerY + random(-200, 200);

      // Draw the brush stroke with variable width
      drawVariableWidthBrush(startX, startY, controlX1, controlY1, controlX2, controlY2, endX, endY);
    }
  }

  // Function to draw a brush stroke with variable width
  function drawVariableWidthBrush(x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
    let weightRange = 20; // Maximum variation in stroke weight
    let noiseScale = 2; // Scale for noise to control variation smoothness
    noFill()
    beginShape();
    curveVertex(x1, y1); // Repeat the first vertex for a smooth start
    for (let i = 0; i <= 100; i++) {
      let t = i / 100; // Calculate interpolation factor
      // Calculate point on the curve using bezier
      let x = bezierPoint(x1, cx1, cx2, x2, t);
      let y = bezierPoint(y1, cy1, cy2, y2, t);
      // Calculate stroke weight using noise for smooth variability
      let weight = noise(x * noiseScale, y) * weightRange + 1;
      strokeWeight(weight); // Set stroke weight
      curveVertex(x, y); // Create the vertex for the curve
    }
    curveVertex(x2, y2); // Repeat the end vertex for a smooth end
    endShape();
  }
