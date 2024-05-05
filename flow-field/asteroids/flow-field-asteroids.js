// const inc = 0.05;
const scale = 20;
let cols, rows;
let fr;
let zoff = 0;
let particles = [];
let flowfield;
let noisefield;
let resetButton;

let sliders = {}
let checkboxes = {}
let pickers = {}

function setup() {
    createCanvas(500, 500);
    cols = floor(width / scale);
    rows = floor(height / scale);
    flowfield = new Array(cols, rows);
    noisefield = new Array(cols, rows);

    for (let i=0; i< 400; i++) {
        particles[i] = new Particle(particleRadious=5);
    }

    console.log(particles)
}

function draw() {

    background(0, 20)

    var yoff = 0;
    zoff += 0.005;
    for (let y=0; y < rows; y++) {
        let xoff = 0;
        for (let x=0; x < cols; x++) {

            let index = x + y*cols;
            let r = noise(xoff, yoff, zoff);
            let v = p5.Vector.fromAngle(r*TWO_PI * 4);

            flowfield[index] = v

            xoff += 0.005;

        }
        yoff += 0.005;
    }
    for (p of particles) {

        // let r = noise(p.pos.x *inc, p.pos.y * inc, zoff);
        // let v = p5.Vector.fromAngle(r*TWO_PI);
        // push()
        // stroke(0)
        // strokeWeight(10)
        // translate(p.pos.x, p.pos.y)
        // rotate(v.heading())
        // line(0, 0, scale/2, 0)
        // pop()
        p.follow(flowfield)
        p.show()
        p.update()
    }
}