export class Dots {
  static nextColorIndex = 0;

  static getNextCycleColor() {
    const palette = ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF'];
    const color = palette[Dots.nextColorIndex];
    Dots.nextColorIndex = (Dots.nextColorIndex + 1) % palette.length;
    return color;
  }

  constructor(p) {
    this.p = p;
    this.randomCenter = true;
    this.chaoticMode = false;
    this.circleSizeRange = [50, 200];
    this.dotSizeRange = [2, 30];
    this.init();
  }

  updateParams(params) {
    this.randomCenter = params.randomCenter;
    this.chaoticMode = params.chaoticMode;
    this.circleSizeRange = [params.circleSize * 0.4, params.circleSize * 1.6];
    this.dotSizeRange = [params.dotSize * 0.125, params.dotSize * 1.9];
    this.init();
  }

  init() {
    const p = this.p;
    this.rotationOffset = p.random(0, 2 * p.PI);
    this.currentAngle = 0;
    this.targetAngle = p.random(0, p.PI);

    this.color = Dots.getNextCycleColor();

    this.centerX = this.randomCenter ? p.random(p.width) : p.width / 2;
    this.centerY = this.randomCenter ? p.random(p.height) : p.height / 2;

    this.circleRadius = p.random(this.circleSizeRange[0], this.circleSizeRange[1]);
  }

  show() {
    const p = this.p;
    const ANGLE_INCREMENT = 0.01;

    p.push();
    if (!this.chaoticMode) p.translate(this.centerX, this.centerY);

    while (this.currentAngle < this.targetAngle) {
      if (this.chaoticMode) p.translate(this.centerX, this.centerY);
      p.rotate(this.currentAngle + this.rotationOffset);

      let dotRadius = p.random(this.dotSizeRange[0], this.dotSizeRange[1]);

      p.stroke(this.color);
      p.fill(this.color);
      p.circle(this.circleRadius, 0, dotRadius);

      this.currentAngle += ANGLE_INCREMENT;
    }

    p.pop();
    this.init();
  }
}
