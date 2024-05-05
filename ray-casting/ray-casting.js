function setup() {
    createCanvas(400, 400);
    collideDebug(true);
  }
  
  // Return an object containing the x,y position of the intersection
  // using the optional calcIntersection boolean:
//   var hit = false;
  
  function draw() {
      background(0);
      stroke('red');
      strokeWeight(5);
      line(200, 300, 100, 150);
      
     

      function ligth(source) {
        stroke(255, 10);
        strokeWeight(10);
        for (let a = 0; a < 360; a += 1) {
            const dir = p5.Vector.fromAngle(radians(a), width + height)
            const rayEnd = createVector(source.x + dir.x, source.y + dir.y)
            const hit = collideLineLine(200, 300, 100, 150, source.x, source.y, rayEnd.x, rayEnd.y, true);
            if (hit.x === false) {
                line(source.x, source.y, rayEnd.x, rayEnd.y);
            } else {
                line(source.x, source.y, hit.x, hit.y);
            }
        }
      }
      const mousePoint = createVector(mouseX, mouseY)
      ligth(mousePoint)
      mousePoint.add(100)
      ligth(mousePoint)
  
      // Use vectors as input:
      // const p1    = createVector(200, 300);
      // const p2    = createVector(100, 150);
      // const mouse = createVector(mouseX, mouseY);
      // const p4    = createVector(350, 50);
      // hit = collideLineLineVector(p1, p2, mouse, p4, true);
      
    //   stroke(hit.x ? color('red') : 0);
    //   print('X-intersection:', hit.x);
    //   print('Y-intersection:', hit.y);
  }