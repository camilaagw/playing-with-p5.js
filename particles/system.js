class System {
    constructor(x, y, numParticles = 42) {
        this.particles =  Array.from(
            { length: numParticles },
            () => new Particle(x, y)
        )
    }

    isAlive() {
        return this.particles.length > 0
    }

    update() {
        let existsDeadParticle = false
        for (let particle of this.particles) {
            particle.update()
            existsDeadParticle |= !particle.isAlive()
        }
        if (existsDeadParticle) {
            this.particles = this.particles.filter(p => p.isAlive())
        }
    }

    display() {
        this.particles.forEach(p => p.display())
    }
}