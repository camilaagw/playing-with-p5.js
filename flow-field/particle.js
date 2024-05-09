class Particle {

    constructor(particleRadious = null) {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxspeed = 2;
        this.particleRadious = particleRadious;
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

        if (this.pos.x > width) this.pos = createVector(0, random(height))
        if (this.pos.x < 0) this.pos= createVector(width, random(height))
        if (this.pos.y > height) this.pos=createVector(random(width), 0)
        if (this.pos.y < 0) this.pos=createVector(random(width), height)
        // if (this.pos.x > width) this.pos.x = 0
        // if (this.pos.x < 0) this.pos.x = width
        // if (this.pos.y > height) this.pos.y = 0
        // if (this.pos.y < 0) this.pos.y = height
    }

    follow(flowfield) {
        let x = floor(this.pos.x / scale)
        let y = floor(this.pos.y / scale)
        let index = x + y * cols
        let force = flowfield[index]
        this.applyForce(force)
    }

    show() {
        stroke(255, 1)
        const dir = this.vel.copy()
        dir.setMag(255)
        fill(-dir.x - dir.y, dir.x, dir.y, 90)
        //stroke(0, 1)
        //fill(0, 0, 0, 1)
        //fill(0)
        if (this.maxspeed !== null) {
            ellipse(this.pos.x, this.pos.y, this.particleRadious)
        }
        else {
            ellipse(this.pos.x, this.pos.y, sliders.ParticleRadious.value())
        }
        // Is there a better way to do this??
        // point(this.pos.x, this.pos.y)
    }
}