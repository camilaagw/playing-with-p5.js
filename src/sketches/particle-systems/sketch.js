import { System } from './system';

export default function sketch(p) {
  let systems = [];
  let animating = true;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.colorMode(p.HSB, 255);
  };

  p.draw = () => {
    p.background(0);

    if (p.abs(p.pmouseX - p.mouseX) > 0 || p.abs(p.pmouseY - p.mouseY) > 0) {
      if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
        systems.push(new System(p, p.mouseX, p.mouseY));
      }
    }

    for (let system of systems) {
      system.update();
      system.display();
    }

    systems = systems.filter((s) => s.isAlive());
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      animating = !animating;
      if (animating) p.loop();
      else p.noLoop();
    }
  };
}
