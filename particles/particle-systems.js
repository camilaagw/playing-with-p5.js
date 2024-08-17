let systems = []

function setup() {
    createCanvas(400, 400);
    colorMode(HSB, 255);
}

function draw() {
    background(0)

    let existsDeadSystem = false

    for (let system of systems) {
        system.update()
        system.display()

        existsDeadSystem |= !system.isAlive
    }

    existsDeadSystem = true
    if (existsDeadSystem){
        systems = systems.filter(s => s.isAlive())
    }
    //console.log(systems.length)

}

function mouseMoved() {
    systems.push(new System(mouseX, mouseY))
}