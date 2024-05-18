let initHeigth = 150;
let limitHeigth = initHeigth;

function setup() {
    createCanvas(400, 400);
    background(0);
    frameRate(1);
}

function draw() {
    limitHeigth = limitHeigth/3*2
    if (limitHeigth < 2) noLoop()

    stroke('magenta');
    translate(200, 400)
    rotate(PI)
    buildTree(initHeigth)
}

function buildTree(height) {
    if (height > limitHeigth) {
        strokeWeight(height/50);
        line(0, 0, 0, height)
        translate(0, height)

        push()
        rotate(PI/3)
        buildTree(height/3*2)
        pop()

        push()
        buildTree(height/3*2)
        pop()

        push()
        rotate(-PI/3)
        buildTree(height/3*2)
        pop()
    }
}