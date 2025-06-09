
/**
 * Dots class to create a confetti-like effect with animated dots.
 * Each set of dots has a cycling color, a position, and a random curvature.
 */
class Dots {

    static nextColorIndex = 0;

    static getNextCycleColor() {
        const palette = [
            "#CDB4DB",
            "#FFC8DD",
            "#FFAFCC",
            "#BDE0FE",
            "#A2D2FF"
        ]
        const color = palette[Dots.nextColorIndex];
        Dots.nextColorIndex = (Dots.nextColorIndex + 1) % palette.length;
        return color;
    }

    constructor() {
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
        this.dotSizeRange = [params.dotSize * 0.1, params.dotSize * 1.9];
    }

    init() {
        this.rotationOffset = random(0, 2*PI)
        this.currentAngle = 0
        this.targetAngle = random(0, PI)

        this.color = Dots.getNextCycleColor(); 

        this.centerX = this.randomCenter? random(width) : width/2 
        this.centerY =  this.randomCenter? random(height) : height/2 

        this.circleRadius = random(this.circleSizeRange[0], this.circleSizeRange[1])
    }

    show() {
        const ANGLE_INCREMENT = 0.01;

        if (!this.chaoticMode) translate(this.centerX, this.centerY);
    
        // Draw the entire dots burst in one go
        while (this.currentAngle < this.targetAngle) {

            if (this.chaoticMode) translate(this.centerX, this.centerY);
            rotate(this.currentAngle + this.rotationOffset)
            
            let dotRadius = random(this.dotSizeRange[0], this.dotSizeRange[1])

            stroke(this.color)
            fill(this.color)
            circle(this.circleRadius, 0, dotRadius)

            this.currentAngle += ANGLE_INCREMENT
        }

        // Reset the state after showing the dot
        this.init();
    }
}