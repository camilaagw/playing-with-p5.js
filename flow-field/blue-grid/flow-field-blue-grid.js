const scale = 10;
let cols, rows;
let zoff = 0;
let flowfield;
let noisefield;

function setup() {
    createCanvas(400, 400);
    cols = floor(width / scale);
    rows = floor(height / scale);
    flowfield = new Array(cols, rows);
    noisefield = new Array(cols, rows);

    let pauseButton = createButton('Pause / Resume');
    pauseButton.position(30, 420);
    pauseButton.mousePressed(() => {
        if (isLooping()) {
            noLoop()
        } else {
            loop()
        }
    });

}

function draw() {
    //background(255, sliders.BackgroundOpacity.value()) //get pelitos
    //background(255) // Get particles flowing

    let yoff = 0;
    zoff += 0.007;
    for (let y=0; y < rows; y++) {
        let xoff = 0;
        for (let x=0; x < cols; x++) {

            let index = x + y*cols;
            let r = noise(xoff, yoff, zoff);
            let v = p5.Vector.fromAngle(r*TWO_PI * 4);

            flowfield[index] = v

            xoff += 0.02;

            { // Paint flow field
                colorMode(HSL)
                const colorH = map(r, 0, 1, 210, 190)
                const colorL = map(r, 0, 1, 10, 120)
                fill(colorH, 98, colorL);
                stroke(colorH, 98, colorL);
                rect(x*scale, y*scale, scale, scale)

                // The lines :)
                stroke(colorH, 98, colorL - 10);
                push();
                translate(x * scale, y * scale)
                rotate(v.heading())
                line(0, 0, scale/2, 0)
                pop();
            }
        }
        yoff += 0.02;
    }
}
