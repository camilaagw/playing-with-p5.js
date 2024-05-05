function setup() {
    createCanvas(400, 400);
  }

  // brushSize simply is the thikness of the brush stroke
  let brushSize = 20;
  let f = false;
  let spring = 0.5;
  let friction = 0.5;
  let vx = 0
  let vy = 0

  function draw() {
    /*
      Smoother movement than using mouse coordinates
    */
    /*
      Parameters used
        size : Brush size
        spring : Spring constant(Larger value means stronger spring)
        friction : Friction(Smaller value means, the more slippery)
    */

    if(mouseIsPressed) {

      if(!f) {
        // Initialize coordinates
        f = true;
        x = mouseX;
        y = mouseY;
      }

      // Calculate velocity
      /*
        MEMO : Use Hooke's law to make spring motion
          DistanceX = (X1 - X0)
          SpringConstant = (value between 0 and 1)
          AccelerationX = DistanceX * SpringConstant
          VelocityX = ( VelocityX + AccelerationX ) * Friction
      */
      vx += ( mouseX - x ) * spring;
      vy += ( mouseY - y ) * spring;
      vx *= friction;
      vy *= friction;

      x += vx;
      y += vy;

      // Draw at the calculated coordinates
      strokeWeight( 3 );
      circle( x, y, brushSize );  // AMEND: mouseX, mouseY -> x, y

    } else if(f) {
      // Reset state
      vx = vy = 0;
      f = false;
    }
  }