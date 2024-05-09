let trazo ;
let animating = false;

function setup() {
    createCanvas(500, 500);
    background(0);
    dots = new Dots()
}

function draw() {
    dots.show()
    frameRate(20)
}

function mousePressed() {
    if (animating) noLoop()
    else loop()
    animating = !animating
}