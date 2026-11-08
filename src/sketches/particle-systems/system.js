import { Particle } from './particle';

export class System {
  constructor(p, x, y, numParticles = 50) {
    this.p = p;
    this.age = 0;
    this.maxLife = 80;
    this.particles = Array.from({ length: numParticles }, () => new Particle(p, x, y));
  }

  isAlive() {
    return this.age < this.maxLife;
  }

  update() {
    this.age += 1;
    for (let particle of this.particles) {
      particle.update();
    }
  }

  display() {
    const p = this.p;
    p.stroke(255);
    p.strokeWeight(0.3);
    let hueValue = p.map(this.age, 0, this.maxLife, 120, 200);
    p.fill(hueValue, 255, 255);
    for (let particle of this.particles) {
      particle.display();
    }
  }
}
