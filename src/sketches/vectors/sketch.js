import p5 from 'p5';

export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
  };

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2);

    let v = p5.Vector.random2D();
    v.mult(p.random(10, 200));

    p.stroke(255, 20);
    p.line(0, 0, v.x, v.y);
  };
}
