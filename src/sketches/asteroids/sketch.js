import p5 from 'p5';

class AsteroidParticle {
  constructor(p, particleRadius = 5) {
    this.p = p;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.maxspeed = 2;
    this.particleRadius = particleRadius;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges();
  }

  applyForce(force) {
    if (force) this.acc.add(force);
  }

  edges() {
    const p = this.p;
    if (this.pos.x > p.width) this.pos = p.createVector(0, p.random(p.height));
    if (this.pos.x < 0) this.pos = p.createVector(p.width, p.random(p.height));
    if (this.pos.y > p.height) this.pos = p.createVector(p.random(p.width), 0);
    if (this.pos.y < 0) this.pos = p.createVector(p.random(p.width), p.height);
  }

  follow(flowfield, scale, cols) {
    let x = this.p.floor(this.pos.x / scale);
    let y = this.p.floor(this.pos.y / scale);
    let index = x + y * cols;
    let force = flowfield[index];
    this.applyForce(force);
  }

  show() {
    const p = this.p;
    p.stroke(255, 1);
    const dir = this.vel.copy();
    dir.setMag(255);
    p.fill(-dir.x - dir.y, dir.x, dir.y, 90);
    p.ellipse(this.pos.x, this.pos.y, this.particleRadius);
  }
}

export default function sketch(p) {
  const scale = 20;
  let cols, rows;
  let zoff = 0;
  let particles = [];
  let flowfield = [];

  p.setup = () => {
    p.createCanvas(500, 500);
    cols = p.floor(p.width / scale);
    rows = p.floor(p.height / scale);
    flowfield = new Array(cols * rows);

    for (let i = 0; i < 400; i++) {
      particles[i] = new AsteroidParticle(p, 5);
    }
  };

  p.draw = () => {
    p.background(0, 20);

    let yoff = 0;
    zoff += 0.005;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let r = p.noise(xoff, yoff, zoff);
        let v = p5.Vector.fromAngle(r * p.TWO_PI * 4);
        flowfield[index] = v;
        xoff += 0.005;
      }
      yoff += 0.005;
    }

    for (let particle of particles) {
      particle.follow(flowfield, scale, cols);
      particle.show();
      particle.update();
    }
  };
}
