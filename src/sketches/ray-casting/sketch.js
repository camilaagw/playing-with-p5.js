import p5 from 'p5';

function collideLineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom === 0) return { x: false, y: false };

  const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return {
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1),
    };
  }
  return { x: false, y: false };
}

export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(500, 500);
  };

  p.draw = () => {
    p.background(0);
    p.stroke('#06D6A0');
    p.strokeWeight(5);
    p.line(200, 300, 100, 150);

    function castLight(source) {
      p.stroke(255, 10);
      p.strokeWeight(10);
      for (let a = 0; a < 360; a += 1) {
        const dir = p5.Vector.fromAngle(p.radians(a));
        dir.mult(p.width + p.height);
        const rayEnd = p.createVector(source.x + dir.x, source.y + dir.y);
        const hit = collideLineLine(
          200,
          300,
          100,
          150,
          source.x,
          source.y,
          rayEnd.x,
          rayEnd.y
        );

        if (hit.x === false) {
          p.line(source.x, source.y, rayEnd.x, rayEnd.y);
        } else {
          p.line(source.x, source.y, hit.x, hit.y);
        }
      }
    }

    const mouseX = p.mouseX || p.width / 2;
    const mouseY = p.mouseY || p.height / 2;

    const mousePoint = p.createVector(mouseX, mouseY);
    castLight(mousePoint);

    const secondPoint = p.createVector(mouseX + 100, mouseY + 100);
    castLight(secondPoint);
  };
}
