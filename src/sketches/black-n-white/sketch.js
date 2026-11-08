export default function sketch(p) {
  let increment = 0.01;
  let timeOffset = 0;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.pixelDensity(1);
    p.noiseDetail(2, 1);
  };

  p.draw = () => {
    p.loadPixels();
    let yOffset = 0;
    for (let y = 0; y < p.height; y++) {
      let xOffset = 0;
      for (let x = 0; x < p.width; x++) {
        let index = (x + p.width * y) * 4;
        let r = Math.round(p.noise(xOffset, yOffset, timeOffset));
        r = r * 255;
        p.pixels[index + 0] = r;
        p.pixels[index + 1] = r;
        p.pixels[index + 2] = r;
        p.pixels[index + 3] = 255;
        xOffset += increment;
      }
      yOffset += increment;
    }
    p.updatePixels();
    timeOffset += increment;
  };
}
