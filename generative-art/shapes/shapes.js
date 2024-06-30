function setup() {
    createCanvas(500, 500);
    noLoop();
}

function draw() {
    background(0);
    for (let i = 0; i < 50; i++) {
        let x = random(width);
        let y = random(height);
        drawConcentricShapes(x, y);
    }
}

function mousePressed() {
    background(0);
    for (let i = 0; i < 50; i++) {
        let x = random(width);
        let y = random(height);
        drawConcentricShapes(x, y);
    }
  }


function drawConcentricShapes(x, y) {
    let maxSize = random(50, 150);
    let numShapes = floor(random(3, 8));

    for (let i = 0; i < numShapes; i++) {
        let size = map(i, 0, numShapes, maxSize, 0);
        let shapeName = random(['circle', 'triangle', 'square']);

        push();
        translate(x, y);
        rotate(random(TWO_PI));

        fill(generateVibrаntColor());
        noStroke();

        if (shapeName === 'circle') {
            ellipse(0, 0, size, size);
        } else if (shapeName === 'triangle') {
            triangle(0, -size/2, -size/2, size/2, size/2, size/2);
        } else {
            rectMode(CENTER);
            square(0, 0, size);
        }

        pop();
    }
}

function generateVibrаntColor() {
    let h = random(360);
    let s = random(80, 100);
    let b = random(70, 100);
    colorMode(HSB);
    let col = color(h, s, b, 50);
    colorMode(RGB);
    return col;
  }