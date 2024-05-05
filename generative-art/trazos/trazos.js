let sliders = {};

function setup() {
    frameRate(5);
    createCanvas(400, 400);
    background(0);
    newSlider("numeroTrazos", 1, 30, 10)
    newSlider("r_min", 0, 255, 10)
    newSlider("x_noise", 0, 255, 10)
    newSlider("y_noise", 0, 255, 10)
    newSlider("rotation_noise", 0, 255, 10)
}

let nextSliderPos = 420
function newSlider(name, min, max, defaultValue, step) {
    const slider = createSlider(min, max, defaultValue, step);
    slider.position(10, nextSliderPos);
    nextSliderPos += 20
    // slider.style('width', '80px');
    sliders[name] = slider
}

function draw() {
    background(0)
    const numeroTrazos = sliders.numeroTrazos.value();
    for (let i = 0; i < numeroTrazos; i++)
        new Trazo(i).show();
}