const colors = ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'];
let next_color = 0;

export class Trazo {
  constructor(p) {
    this.p = p;
    this.init();
  }

  init() {
    const p = this.p;
    this.r_min = p.random(2, 20);
    this.r_max = p.random(this.r_min + 10, 40);
    this.rotation = p.random(0, 2 * p.PI);
    this.angle = 0;
    this.angle_final = p.random(0.06, 3.1416);
    this.color = colors[next_color];
    next_color = (next_color + 1) % colors.length;
    this.x = p.random(p.width);
    this.y = p.random(p.height);
    this.curvature = p.random(50, 200);
  }

  update() {
    if (this.angle < this.angle_final) {
      this.angle += 0.01;
    } else {
      this.init();
    }
  }

  show() {
    const p = this.p;
    let r = p.map(this.angle, 0, this.angle_final, this.r_min, this.r_max);
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.angle + this.rotation);
    p.stroke(this.color);
    p.fill(this.color);
    p.ellipse(this.curvature, 0, r);
    p.pop();
  }
}
