/**
 * Shapes Sketch - Generative Concentric Shapes
 * Converted to p5 instance mode.
 */
export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.noLoop();
  };

  p.draw = () => {
    p.background(0);
    for (let i = 0; i < 50; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      drawConcentricShapes(x, y);
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.redraw();
    }
  };

  function drawConcentricShapes(x, y) {
    let maxSize = p.random(50, 150);
    let numShapes = p.floor(p.random(3, 8));

    for (let i = 0; i < numShapes; i++) {
      let size = p.map(i, 0, numShapes, maxSize, 0);
      let shapeName = p.random(['circle', 'triangle', 'square']);

      p.push();
      p.translate(x, y);
      p.rotate(p.random(p.TWO_PI));

      p.fill(generateVibrantColor());
      p.noStroke();

      if (shapeName === 'circle') {
        p.ellipse(0, 0, size, size);
      } else if (shapeName === 'triangle') {
        p.triangle(0, -size / 2, -size / 2, size / 2, size / 2, size / 2);
      } else {
        p.rectMode(p.CENTER);
        p.square(0, 0, size);
      }

      p.pop();
    }
  }

  function generateVibrantColor() {
    let h = p.random(360);
    let s = p.random(80, 100);
    let b = p.random(70, 100);
    p.colorMode(p.HSB);
    let col = p.color(h, s, b, 50);
    p.colorMode(p.RGB);
    return col;
  }
}
