// The Mandelbrot set is the set of complex numbers c for which the function f(z) = z^2 + c
// does not diverge when iterated from z=0 (remains bounded)
// Another way of visualizing the mandelbrot: https://github.com/jaimeliew1/Mandelbrot?tab=readme-ov-file

const ITERATIONS = 1000;
const centerX =  -0.743643887037151;
const centerY = 0.13182590420533;
let amplitude

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);  // Turns off high density of the display
    amplitude = 3;
    frameRate(30)
    loadPixels()
}

function draw() {
    minX = centerX - amplitude/2
    maxX = centerX + amplitude/2
    minY = centerY - amplitude/2
    maxY = centerY + amplitude/2

    for (let y = 0; y < height; y++) {

        const imaginary = (y / height) * (maxY - minY) + minY

        for (let x = 0; x < width; x++) {

            const real = (x / width) * (maxX - minX) + minX
            const iter = mandelbrotIterationStop(real, imaginary)
            const isMaxIter =  (iter == ITERATIONS)

            const red =  isMaxIter ? 0 : iter / ITERATIONS * 255;
            const green =  isMaxIter ? 0 : sqrt(iter) / sqrt(ITERATIONS) *  255;
            const blue =  isMaxIter ? 0 : sqrt(iter) / sqrt(ITERATIONS) * (255 - 5) + 5;

            const index = (x + y * width) * 4
            pixels[index + 0] = red;
            pixels[index + 1] = green;
            pixels[index + 2] = blue;
            pixels[index + 3] = 255;
        }
    }
    updatePixels()
    amplitude = amplitude * 0.95 // Animate automatically

}

function mandelbrotIterationStop(Ca, Cb) {
    let Za =0
    let Zb = 0
    for (let i = 0; i < ITERATIONS; i++) {
        // z = z^2
        let a2 = Za * Za - Zb * Zb
        let b2 = 2 * Za * Zb
        Za = a2
        Zb = b2
        // z = z + c
        Za = Za + Ca
        Zb = Zb + Cb
        // |z^2|
        const magSquared = Za * Za + Zb * Zb;
        if (magSquared > 4) {
            return i;  // Early return if the point is not in the Mandelbrot set
        }
    }
    return ITERATIONS
}

function mousePressed() {
    centerX = map(mouseX, 0, width, minX, maxX)
    centerY = map(mouseY, 0, height, minY, maxY)
    amplitude = amplitude * 0.9
}

