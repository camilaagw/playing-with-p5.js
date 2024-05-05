function setup() {
    createCanvas(800, 800);
    noLoop(); // Draw once without looping
    background(0); // Start with a white background
    angleMode(DEGREES); // Work in degrees for angles
  }

  function draw() {
    // Define a color palette similar to the uploaded image
    let colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557',
                  '#ffb4a2', '#003049', '#f77f00', '#fcbf49', '#eae2b7'];

    // Number of curves
    let curveCount = 100;
    noFill();

    for (let i = 0; i < curveCount; i++) {
      // Choose a random color from the palette
      let brushColor = colors[int(random(colors.length))];
      stroke(brushColor);

      // Randomize the radius for each curve
      let radius = random(20, 300);
      drawVariableWidthStroke(radius);
    }
  }

  function drawVariableWidthStroke(radius) {
    let noiseScale = 0.02; // Scale for noise to control variation smoothness
    let weightRange = 15; // Maximum stroke weight variation
    let centerX = width / 2;
    let centerY = height / 2;

    // Create a start and end point with a more exaggerated curve
    let startAngle = random(360);
    let endAngle = startAngle + random(120, 300); // Ensuring a wider arc
    let controlDist = random(100, 400); // Longer control points for more pronounced curves

    // Start the shape
    beginShape();

    // Move to the first point of the curve without drawing anything
    let startX = centerX + cos(radians(startAngle)) * radius;
    let startY = centerY + sin(radians(startAngle)) * radius;
    vertex(startX, startY); // Starting point of the curve

    for (let angle = startAngle; angle <= endAngle; angle++) {
      let rad = radians(angle); // Convert angle to radians for the curve function
      let x = centerX + cos(rad) * radius;
      let y = centerY + sin(rad) * radius;

      // Control points are further away from the start and end points for a wider curve
      let controlX1 = centerX + cos(rad - 45) * controlDist;
      let controlY1 = centerY + sin(rad - 45) * controlDist;
      let controlX2 = centerX + cos(rad + 45) * controlDist;
      let controlY2 = centerY + sin(rad + 45) * controlDist;

      // Use noise to create a stroke width that changes over time
      let weight = noise(x * noiseScale, y * noiseScale) * weightRange + 1;
      strokeWeight(weight);

      // Draw curve segment
      bezierVertex(controlX1, controlY1, controlX2, controlY2, x, y);
    }

    // Finish the shape
    endShape();
  }
