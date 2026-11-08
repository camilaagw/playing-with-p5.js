export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
    p.noStroke();
    p.fill(255);
    p.frameRate(2);
  };

  p.draw = () => {
    for (let i = 0; i < 60; i++) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      let size = p.random(5, 25);
      p.ellipse(x, y, size, size);
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.background(0);
    }
  };
}
