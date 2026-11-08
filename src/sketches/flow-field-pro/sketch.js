import p5 from 'p5';

class FlowParticle {
  constructor(p) {
    this.p = p;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.maxspeed = 2;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    const p = this.p;
    if (this.pos.x > p.width) this.pos = p.createVector(0, p.random(p.height));
    if (this.pos.x < 0) this.pos = p.createVector(p.width, p.random(p.height));
    if (this.pos.y > p.height) this.pos = p.createVector(p.random(p.width), 0);
    if (this.pos.y < 0) this.pos = p.createVector(p.random(p.width), p.height);
  }

  follow(zoff) {
    const p = this.p;
    const xoff = p.map(this.pos.x, 0, p.width, 0.7, 1);
    const yoff = p.map(this.pos.y, 0, p.width, 0.8, 1);
    let r = p.noise(xoff, yoff, zoff);
    let force = p5.Vector.fromAngle(r * p.TWO_PI * 4);
    this.applyForce(force);
  }

  show() {
    const p = this.p;
    p.stroke(255, 1);
    const dir = this.vel.copy();
    dir.setMag(255);
    p.fill(-dir.x - dir.y, dir.x, dir.y, 30);
    p.ellipse(this.pos.x, this.pos.y, 2);
  }
}

export default function sketch(p) {
  let particles = [];
  let zoff = 0;

  p.setup = () => {
    p.createCanvas(500, 500);
    p.noiseSeed(99);
    p.background(0);

    for (let i = 0; i < 400; i++) {
      particles[i] = new FlowParticle(p);
    }
  };

  p.draw = () => {
    zoff += 0.005;
    for (let particle of particles) {
      particle.follow(zoff);
      particle.show();
      particle.update();
    }
  };
}
