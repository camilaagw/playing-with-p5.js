class Particle {

    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 2;
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed)
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.edges()
    }

    applyForce(force) {
        this.acc.add(force);
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = width
        if (this.pos.y > height) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = height
    }

    follow(flowfield) {
        let x = floor(this.pos.x / scale)
        let y = floor(this.pos.y / scale)
        let index = x + y * cols
        let force = flowfield[index]
        this.applyForce(force)
    }

    show() {
        stroke(0, 100)
        //ellipse(this.pos.x, this.pos.y, 5)
        point(this.pos.x, this.pos.y)
    }
}