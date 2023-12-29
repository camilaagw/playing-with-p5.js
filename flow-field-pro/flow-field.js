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

function addSlider(name, min, max, init, step) {
    const sliderNumber = Object.keys(sliders).length;
    const slider = createSlider(min, max, init, step);
    const label = createP(name);
    slider.position(10, 450 + 20 * sliderNumber);
    label.position(100, 435 + 20 * sliderNumber);
    slider.size(80);
    sliders[name] = slider
}

function addCheckbox(name) {
    const checkboxNumber = Object.keys(checkboxes).length;
    const checkbox = createCheckbox();
    const label = createP(name);
    checkbox.position(200, 450 + 20 * checkboxNumber);
    label.position(225, 434 + 20 * checkboxNumber);
    checkboxes[name] = checkbox
}

function addColorPicker(name, value) {
    const colorPickerNumber = Object.keys(pickers).length;
    const picker = createColorPicker(value);
    const label = createP(name);
    picker.position(300, 450 + 20 * colorPickerNumber);
    label.position(325, 434 + 20 * colorPickerNumber);
    pickers[name] = picker

}

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scale);
    rows = floor(height / scale);
    flowfield = new Array(cols, rows);
    noisefield = new Array(cols, rows);

    fr = createP('');

    for (let i=0; i< 400; i++) {
        particles[i] = new Particle();
    }

    let pauseButton = createButton('Pause / Resume');
    pauseButton.position(30, 420);
    pauseButton.mousePressed(() => {
        if (isLooping()) {
            noLoop()
        } else {
            loop()
        }
    });

    resetButton = createButton('Reset');
    resetButton.position(160, 420);

    addSlider("BackgroundOpacity", 0, 255, 0, 0.1)
    addSlider("Xincrement", 0.001, 0.1, 0.05, 0.001)
    addSlider("Yincrement", 0.001, 0.1, 0.05, 0.001)
    addSlider("ParticleOpacity", 0, 255, 0, 0.1)
    addSlider("ParticleRadious", 0, 10, 2, 0.5)

    addCheckbox("Noise")

    addColorPicker("BackgroundColor", "#000000")
    addColorPicker("ParticleColor", "#FFFFFF")

    background(color(pickers.BackgroundColor.value()))


}

function draw() {
    let c = color(pickers.BackgroundColor.value())
    c.setAlpha(sliders.BackgroundOpacity.value())

    //background(255, sliders.BackgroundOpacity.value()) //get pelitos
    //background(255) // Get particles flowing


    resetButton.mousePressed(() => {
        for (let i=0; i< 400; i++) {
            particles[i] = new Particle();
        }
        background(255)
    });


    var yoff = 0;
    zoff += 0.005;
    for (let y=0; y < rows; y++) {
        let xoff = 0;
        for (let x=0; x < cols; x++) {
            let index = x + y*cols;
            let r = noise(xoff, yoff, zoff);
            let v = p5.Vector.fromAngle(r*TWO_PI * 4);

            flowfield[index] = v

            xoff += sliders.Xincrement.value();

        }
        yoff += sliders.Yincrement.value();
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
        p.follow(zoff)
        p.show()
        p.update()
    }

    //noloop()

    fr.html((floor(frameRate())))
}

// Add reset button
// Goal 0: Nice coloured flow field
// Goal 1: Particles flowing nicely -> improve boundaries
// Goal 2: Snakes in motion over flowing