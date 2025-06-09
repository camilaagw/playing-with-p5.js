/**
 * Mandelbrot Set Visualization
 * The Mandelbrot set is the set of complex numbers c for which the function f(z) = z^2 + c
 * does not diverge when iterated from z=0 (remains bounded).
 * Features automatic zooming animation and click to pause/resume.
 * Another way of visualizing the mandelbrot: https://github.com/jaimeliew1/Mandelbrot?tab=readme-ov-file
 */

// Maximum iterations for escape time algorithm
let currentMaxIterations

// View boundaries for the current frame
let viewMinX, viewMaxX, viewMinY, viewMaxY;

// Values to calculate view boundaries
let centerX, centerY, amplitude

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);  // Turns off high density of the display
    loadPixels(); //  Populates the pixels array

    // Starting values to calculate view boundaries
    centerX =  -0.743643887037151;
    centerY = 0.13182590420533;
    amplitude = 3;
}

function draw() {
    adjustMaxIterations()

    // Calculate view boundaries based on center and amplitude
    viewMinX = centerX - amplitude / 2;
    viewMaxX = centerX + amplitude / 2;
    viewMinY = centerY - amplitude / 2;
    viewMaxY = centerY + amplitude / 2;

    for (let x = 0; x < width; x++) {
        // Map pixel x-coordinate to complex plane real value
        const real = viewMinX +  (x / width) * (viewMaxX - viewMinX)

        for (let y = 0; y < height; y++) {
            // Map pixel y-coordinate to complex plane imaginary value
            const imaginary = viewMinY + (y / height) * (viewMaxY - viewMinY)

            const iter = mandelbrotIterations(real, imaginary)

            // Color points based on iteration count. Points in the set are black
            const isMaxIter =  (iter == currentMaxIterations)
            const red =  isMaxIter ? 0 : iter / currentMaxIterations * 255;
            const green =  isMaxIter ? 0 : sqrt(iter / currentMaxIterations) *  255 + 40;
            const blue =  isMaxIter ? 0 : sqrt(iter / currentMaxIterations) * 255 + 50;
            const alpha = 255;

            // Set pixel color in the pixels array
            const index = (x + y * width) * 4
            pixels[index + 0] = red;
            pixels[index + 1] = green;
            pixels[index + 2] = blue;
            pixels[index + 3] = alpha
        }
    }
    updatePixels()
    amplitude = amplitude * 0.95 // Zoom in automatically over time
}

/**
 * Calculates the number of iterations before Z diverges for c
 * @param {number} real - Real part of c
 * @param {number} imaginary - Imaginary part of c
 * @returns {number} Number of iterations, or currentMaxIterations if it doesn't diverge
 */
function mandelbrotIterations(real, imaginary) {
    let Zr =0
    let Zi = 0
    for (let i = 0; i < currentMaxIterations; i++) {
        // Z = Z^2
        let r2 = Zr * Zr - Zi * Zi
        let i2 = 2 * Zr * Zi
        Zr = r2
        Zi = i2
        // Z = Z + c
        Zr = Zr + real
        Zi = Zi + imaginary
        // |Z^2|
        const magSquared = Zr * Zr + Zi * Zi;
        if (magSquared > 4) {
            return i;  // Early return if the point is not in the Mandelbrot set
        }
    }
    return currentMaxIterations
}

/**
 * Adjusts the maximum iterations based on the current amplitude (zoom level)
*/
function adjustMaxIterations() {
    if (amplitude < 0.00005) {
        currentMaxIterations = 5000;
    } else if (amplitude < 0.001) {
        currentMaxIterations = 2500;
    } else if (amplitude < 0.01) {
        currentMaxIterations = 1500;
    } else if (amplitude < 0.1) {
        currentMaxIterations = 1000;
    } else if (amplitude < 0.5) {
        currentMaxIterations = 750;
    }  else {
        currentMaxIterations = 500;
    }
}

function mousePressed() {
    isLooping() ? noLoop() : loop();
}
