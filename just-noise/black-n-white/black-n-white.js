let increment = 0.01
let timeOffset = 0

// TODO: Test the simplex noise
// let simplexNoise
// simplexNoise = noise = new OpenSimplexNoise(Date.now());
// TODO: Compare with this version: https://editor.p5js.org/codingtrain/sketches/MPqnctIGg

function setup() {
    createCanvas(400, 400);
    pixelDensity(1); // Turns off high density of the display
    noiseDetail(2, 1) // Controls noise quality/granularity
}

function draw() {

    loadPixels()
    let yOffset = 0
    for (let y = 0; y < height; y++){
        let xOffset = 0
        for(let x = 0; x < width; x++) {
            let index = (x + width * y) * 4
            let r = Math.round(noise(xOffset, yOffset, timeOffset))
            r = r * 255
            pixels[index + 0] = r
            pixels[index + 1] = r
            pixels[index + 2] = r
            pixels[index + 3] = 255
            xOffset += increment
        }
        yOffset += increment
    }
    updatePixels()
    timeOffset += increment
    //noLoop()
}