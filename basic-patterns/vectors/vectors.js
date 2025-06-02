function setup() {
    createCanvas(500, 500);
    background(0);
}

function draw() {
    translate(width/2, height/2)
    let v = p5.Vector.random2D();
    v.mult(random(10, 200)); // 50, 100
    stroke(255, 20);
    line(0, 0, v.x, v.y)
}
