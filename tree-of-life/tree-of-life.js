let initHeigth = 175;
let limitHeigth = initHeigth;
let startColor, endColor;

function setup() {
    createCanvas(500, 500);
    background(0);
    frameRate(1);
    startColor = color('#6a16b1');
    endColor = color('magenta');
}

function draw() {
    limitHeigth = limitHeigth/3*2
    if (limitHeigth < 2) noLoop()
    translate(250, 500)
    rotate(PI)
    buildTree(initHeigth)
}

function buildTree(height) {
    if (height > limitHeigth) {

        // Calculate the current color based on the height
        let lerpAmt = map(height, initHeigth, limitHeigth, 0, 1);
        lerpAmt = Math.pow(lerpAmt, 3) ;
        let currentColor = lerpColor(startColor, endColor, lerpAmt);
        stroke(currentColor);
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