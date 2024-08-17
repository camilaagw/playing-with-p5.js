class Particle {
    constructor(x, y, size = 3) {
        this.size = size
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(0.05);
        this.acc = p5.Vector.random2D().mult(0.05);
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }

    display() {
        ellipse(this.pos.x, this.pos.y, this.size, this.size)
    }
}