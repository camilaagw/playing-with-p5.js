export default function sketch(p) {
  let initHeight = 175;
  let limitHeight = initHeight;
  let startColor, endColor;

  p.setup = () => {
    p.createCanvas(500, 500);
    p.background(0);
    p.frameRate(1);
    startColor = p.color('#6a16b1');
    endColor = p.color('magenta');
  };

  p.draw = () => {
    limitHeight = (limitHeight / 3) * 2;
    if (limitHeight < 2) p.noLoop();
    p.translate(250, 500);
    p.rotate(p.PI);
    buildTree(initHeight);
  };

  function buildTree(h) {
    if (h > limitHeight) {
      let lerpAmt = p.map(h, initHeight, limitHeight, 0, 1);
      lerpAmt = Math.pow(lerpAmt, 3);
      let currentColor = p.lerpColor(startColor, endColor, lerpAmt);
      p.stroke(currentColor);
      p.strokeWeight(h / 50);
      p.line(0, 0, 0, h);
      p.translate(0, h);

      p.push();
      p.rotate(p.PI / 3);
      buildTree((h / 3) * 2);
      p.pop();

      p.push();
      buildTree((h / 3) * 2);
      p.pop();

      p.push();
      p.rotate(-p.PI / 3);
      buildTree((h / 3) * 2);
      p.pop();
    }
  }
}
