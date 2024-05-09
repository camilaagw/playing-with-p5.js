let colors = [
    "#CDB4DB",
    "#FFC8DD",
    "#FFAFCC",
    "#BDE0FE",
    "#A2D2FF"
]
let colors_alt = [
    "#81F7E5",
    "#A9F8FB",
    "#B6DCFE",
    "#CDEDFD",
    "#DEC5E3"
]
let next_color = 0;

class Trazo {
    constructor() {
        this.init()
    }

    init() {
        this.r_min = random(2, 20)
        this.r_max = random(this.r_min + 10, 40)
        this.rotation = random(0, 2*PI)
        this.angle = 0
        this.angle_final = random(0.06, 3.1416)
        this.color = colors[next_color];
        next_color = (next_color + 1) % colors.length
        this.x = random(width)
        this.y = random(height)
        this.curvature = random(50, 200)
    }

    update() {
        if (this.angle < this.angle_final)
            this.angle += 0.01
        else this.init()

    }

    show() {
        if (this.angle < this.angle_final)
            this.angle += 0.01
        let r = map(this.angle, 0, this.angle_final,
            this.r_min, this.r_max)
        push()
        translate(this.x, this.y)
        rotate(this.angle + this.rotation)
        stroke(this.color)
        fill(this.color)
        ellipse( this.curvature, 0, r)
        pop()
    }
}