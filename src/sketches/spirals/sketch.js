export default function sketch(p) {
  const numShapes = 200;
  const colors = ['#FFA500', '#FF69B4', '#4169E1', '#32CD32', '#FFD700'];
  const spirals = 5;

  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
    p.noStroke();

    for (let s = 0; s < spirals; s++) {
      drawSpiral(s);
    }
    p.noLoop();
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.background(0);
      for (let s = 0; s < spirals; s++) {
        drawSpiral(s);
      }
    }
  };

  function drawSpiral(spiralIndex) {
    let centerX = p.width / 2;
    let centerY = p.height / 2;
    let maxRadius = p.min(p.width, p.height) * 0.45;

    for (let i = 0; i < numShapes / spirals; i++) {
      let t = i / (numShapes / spirals);
      let angle = p.map(t, 0, 1, 0, p.TWO_PI * 3);
      let radius = p.map(t, 0, 1, 10, maxRadius);

      let x = centerX + p.cos(angle + (spiralIndex * p.TWO_PI) / spirals) * radius;
      let y = centerY + p.sin(angle + (spiralIndex * p.TWO_PI) / spirals) * radius;

      drawShape(x, y, radius * 0.2, angle);
    }
  }

  function drawShape(x, y, size, angle) {
    let color = p.random(colors);

    p.fill(color);
    p.push();
    p.translate(x, y);
    p.rotate(angle);

    p.beginShape();
    let startAngle = p.random(p.TWO_PI);
    for (let a = 0; a < p.TWO_PI; a += 0.1) {
      let noiseVal = p.noise(p.cos(a) + 1, p.sin(a) + 1, x * 0.01, y * 0.01) * size;
      let sx = p.cos(a + startAngle) * noiseVal;
      let sy = p.sin(a + startAngle) * noiseVal;
      p.curveVertex(sx, sy);
    }
    p.endShape(p.CLOSE);

    if (p.random() <= 0.2) {
      p.fill(p.random(colors));
      let detailSize = size * p.random(0.3, 0.7);
      drawDetailShape(detailSize);
    }

    p.pop();
  }

  function drawDetailShape(size) {
    p.push();
    p.translate(p.random(-size, size), p.random(-size, size));
    p.rotate(p.random(p.TWO_PI));

    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += 0.2) {
      let r = size * (0.5 + 0.5 * p.sin(a * 3));
      let x = p.cos(a) * r;
      let y = p.sin(a) * r;
      p.curveVertex(x, y);
    }
    p.endShape(p.CLOSE);

    p.pop();
  }
}
