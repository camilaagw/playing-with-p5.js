function setup() {
    createCanvas(400, 400);
    background(0);
}

function draw() {

    stroke('magenta');


    let h = 150
    translate(200, 400)
    rotate(PI)
    buildTree(h)

    noLoop();

}

function buildTree(height) {
    if (height > 3) {
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