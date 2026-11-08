import p5 from 'p5';

export class Particle {
  constructor(p, x, y, size = 3) {
    this.p = p;
    this.size = size;
    this.pos = p.createVector(x, y);
    this.vel = p5.Vector.random2D().mult(0.05);
    this.acc = p5.Vector.random2D().mult(0.05);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  display() {
    this.p.ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}
