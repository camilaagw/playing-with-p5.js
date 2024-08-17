class System {
    constructor(x, y, numParticles = 50) {
        this.age = 0
        this.maxLife = 80
        this.particles =  Array.from(
            { length: numParticles },
            () => new Particle(x, y)
        )
    }

    isAlive() {
        return this.age < this.maxLife
    }

    update() {
        this.age += 1
        for (let particle of this.particles) {
            particle.update()
        }
    }

    display() {
        stroke(255)
        strokeWeight(0.3)
        let hueValue = map(this.age, 0, this.maxLife, 120, 200)
        fill(hueValue, 255, 255);
        for (let particle of this.particles) {
            particle.display()
        }
    }
}