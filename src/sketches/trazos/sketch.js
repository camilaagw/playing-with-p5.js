import { Trazo } from './trazo';

export default function sketch(p) {
  let trazos = [];
  let animating = true;

  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
    for (let i = 0; i < 5; i++) {
      trazos.push(new Trazo(p));
    }
  };

  p.draw = () => {
    for (let trazo of trazos) {
      trazo.update();
      trazo.show();
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      if (animating) {
        p.noLoop();
      } else {
        p.loop();
      }
      animating = !animating;
    }
  };
}
