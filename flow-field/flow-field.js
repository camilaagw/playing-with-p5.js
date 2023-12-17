const inc = 0.05;
const scale = 20;
let cols, rows;
let fr;
let zoff = 0;
let particles = [];
let flowfield;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scale);
    rows = floor(height / scale);
    flowfield = new Array(cols, rows);

    fr = createP('');

    for (let i=0; i< 400; i++) {
        particles[i] = new Particle();
    }

    slider = createSlider(0, 255);
    slider.position(10, 10);
    slider.size(80);

  describe('A dark gray square with a range slider at the top. The square changes color when the slider is moved.')
}

function draw() {
    background(0, slider.value())
    var yoff = 0;
    zoff += 0.01;
    for (let y=0; y < rows; y++) {
        let xoff = 0;
        for (let x=0; x < cols; x++) {

            let index = x + y*cols;
            let r = noise(xoff, yoff, zoff);
            let v = p5.Vector.fromAngle(r*TWO_PI * 4);

            flowfield[index] = v

            xoff += inc;
            // fill(r*255);
            // stroke(r*255)
            // rect(x*scale, y*scale, scale, scale)
            // stroke(0);
            // push();
            // translate(x * scale, y * scale)
            // rotate(v.heading())
            // line(0, 0, scale/2, 0)
            // pop();

        }
        yoff += inc;
    }
    for (p of particles) {
        console.log(p)
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

    //noloop()

    fr.html((floor(frameRate())))
}