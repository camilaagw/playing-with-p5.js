let systems = []
let animating = true;

function setup() {
    createCanvas(400, 400);
    colorMode(HSB, 255);
}

function draw() {
    background(0)

    if (abs(pmouseX - mouseX) > 0 || abs(pmouseY - mouseY) > 0) {
        systems.push(new System(mouseX, mouseY));
      }

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
}

function mousePressed() {
    animating = !animating
    if (animating) loop()
    else noLoop()
}


// function mouseMoved() {
//     systems.push(new System(mouseX, mouseY))
// }