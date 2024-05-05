function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES); // Set angleMode to degrees for easier understanding
    noLoop(); // Draw once without looping

    background(0); // Start with a white background
  }

//   function draw() {
//     background("red")
//   }


  function draw() {


    let centerX = width / 2;
    let centerY = height / 2;

    // noStroke();
    // fill("#e63946")
    // drawBrush(centerX, centerY, centerX + 200, centerY+ 20, 20)
    //ellipse(centerX, centerY, 20)

    // Define a color palette
    let colors = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557'];

    // Number of brushes
    let brushCount = 100;

    for (let i = 0; i < brushCount; i++) {
      // Choose a random color from the palette
      let brushColor = colors[int(random(colors.length))];
      //fill(brushColor);
      stroke(brushColor);

      // Calculate the brush properties
      let angle = random(360);
      let length = random(20, 300);
      let weight = random(2, 20);

      // Calculate the starting point of the brush
      let startX = centerX + cos(angle) * 30;
      let startY = centerY + sin(angle) * 30;

      // Calculate the end point of the brush
      let endX = centerX + cos(angle) * (30 + length);
      let endY = centerY + sin(angle) * (30 + length);

      // Draw the brush stroke
      console.log(startX, startY, endX, endY, weight)
      drawBrush(startX, startY, endX, endY, weight);
    }
  }

  // Function to draw a brush stroke
  function drawBrush(x1, y1, x2, y2, w) {
    strokeWeight(w); // Brush weight
    strokeCap(ROUND); // Round cap for nicer edges
    line(x1, y1, x2, y2); // Draw the line
  }
