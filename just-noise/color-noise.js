function setup() {
    createCanvas(200, 200);
    pixelDensity(1); // Turns off high density of the display
}

function draw() {
    loadPixels()
    for (let y = 0; y < height; y++){
        for(let x = 0; x < width; x++) {
            let index = (x + width * y) * 4
            let r = random(255)
            pixels[index + 0] = 0
            pixels[index + 1] = r
            pixels[index + 2] = 3*r/4
            pixels[index + 3] = 255
        }
    }
    updatePixels()
    //noLoop()
}