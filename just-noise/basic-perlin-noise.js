let increment = 0.01


function setup() {
    createCanvas(400, 400);
    pixelDensity(1); // Turns off high density of the display
}

function draw() {
    loadPixels()
    let yOffset = 0
    for (let y = 0; y < height; y++){
        let xOffset = 0
        for(let x = 0; x < width; x++) {
            let index = (x + width * y) * 4
            let r = noise(xOffset, yOffset) * 255
            pixels[index + 0] = r
            pixels[index + 1] = r
            pixels[index + 2] = r
            pixels[index + 3] = 255
            xOffset += increment
        }
        yOffset += increment
    }
    updatePixels()
    noLoop()
}