export default function sketch(p) {
  let currentMaxIterations = 500;
  let viewMinX, viewMaxX, viewMinY, viewMaxY;
  let centerX, centerY, amplitude;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.pixelDensity(1);
    centerX = -0.743643887037151;
    centerY = 0.13182590420533;
    amplitude = 3;
  };

  p.draw = () => {
    adjustMaxIterations();

    viewMinX = centerX - amplitude / 2;
    viewMaxX = centerX + amplitude / 2;
    viewMinY = centerY - amplitude / 2;
    viewMaxY = centerY + amplitude / 2;

    p.loadPixels();

    for (let x = 0; x < p.width; x++) {
      const real = viewMinX + (x / p.width) * (viewMaxX - viewMinX);

      for (let y = 0; y < p.height; y++) {
        const imaginary = viewMinY + (y / p.height) * (viewMaxY - viewMinY);
        const iter = mandelbrotIterations(real, imaginary);

        const isMaxIter = iter === currentMaxIterations;
        const red = isMaxIter ? 0 : (iter / currentMaxIterations) * 255;
        const green = isMaxIter ? 0 : p.sqrt(iter / currentMaxIterations) * 255 + 40;
        const blue = isMaxIter ? 0 : p.sqrt(iter / currentMaxIterations) * 255 + 50;

        const index = (x + y * p.width) * 4;
        p.pixels[index + 0] = red;
        p.pixels[index + 1] = green;
        p.pixels[index + 2] = blue;
        p.pixels[index + 3] = 255;
      }
    }

    p.updatePixels();
    amplitude = amplitude * 0.95;
  };

  function mandelbrotIterations(real, imaginary) {
    let Zr = 0;
    let Zi = 0;
    for (let i = 0; i < currentMaxIterations; i++) {
      let r2 = Zr * Zr - Zi * Zi;
      let i2 = 2 * Zr * Zi;
      Zr = r2 + real;
      Zi = i2 + imaginary;
      const magSquared = Zr * Zr + Zi * Zi;
      if (magSquared > 4) {
        return i;
      }
    }
    return currentMaxIterations;
  }

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
    } else {
      currentMaxIterations = 500;
    }
  }

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      if (p.isLooping()) {
        p.noLoop();
      } else {
        p.loop();
      }
    }
  };
}
