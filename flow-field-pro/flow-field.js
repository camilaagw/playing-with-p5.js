// const inc = 0.05;
const scale = 20;
let cols, rows;
let fr;
let zoff = 0;
let particles = [];
let flowfield;
let noisefield;


function setup() {
    createCanvas(500, 500);

    noiseSeed(99);

    cols = floor(width / scale);
    rows = floor(height / scale);
    flowfield = new Array(cols, rows);
    noisefield = new Array(cols, rows);

    for (let i=0; i< 400; i++) {
        particles[i] = new Particle();
    }

    background(0)


}

function draw() {
    let c = color("#000000")
    c.setAlpha(0.1)

    //background(255, sliders.BackgroundOpacity.value()) //get pelitos
    //background(255) // Get particles flowing


    var yoff = 0;
    zoff += 0.005;
    for (let y=0; y < rows; y++) {
        let xoff = 0;
        for (let x=0; x < cols; x++) {
            let index = x + y*cols;
            let r = noise(xoff, yoff, zoff);
            let v = p5.Vector.fromAngle(r*TWO_PI * 4);
            flowfield[index] = v
            xoff += 0.05;
        }
        yoff += 0.05;
    }
    for (p of particles) {
        p.follow(zoff)
        p.show()
        p.update()
    }

    //noloop()

}

// Add reset button
// Goal 0: Nice coloured flow field
// Goal 1: Particles flowing nicely -> improve boundaries
// Goal 2: Snakes in motion over flowing