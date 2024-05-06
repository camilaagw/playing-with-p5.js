let trazos = [];
let animating = true;

function setup() {
    createCanvas(400, 400);
    background(0);
    for (let i=0; i < 5; i++) {
        trazos.push(new Trazo())
    }
}

function draw() {
    for (trazo of trazos) {
        trazo.update()
        trazo.show()
    }
}

function mousePressed() {
    if (animating) noLoop()
    else loop()
    animating = !animating
}