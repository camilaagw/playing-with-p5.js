class Particle {
    constructor(x, y, size = 3) {
        this.size = size
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = p5.Vector.random2D().mult(0.05);
        this.age = 0
    }

    isAlive() {
        return this.age < 90
    }

    update() {
        this.age += 1
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }

    display() {
        //noStroke()
        let hueValue = map()
        fill(255)
        ellipse(this.pos.x, this.pos.y, this.size, this.size)
    }

}