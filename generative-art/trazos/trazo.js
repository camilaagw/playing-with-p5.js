let colors = [
    "#CDB4DB",
    "#FFC8DD",
    "#FFAFCC",
    "#BDE0FE",
    "#A2D2FF"
]

class Trazo {
    constructor(id) {
        this.id = id;
    }

    show() {
        const sliderValue = sliders.r_min.value()

        const id = this.id
        const r_min = noise(id) * sliderValue //random(2, 20)
        const r_max = noise(id + 3) * 20 + 10
        const rotation = noise(id * sliders.rotation_noise.value() / 255) * 2*PI
        const angle_final = noise(id) * 3 + 0.06
        const color = colors[id % colors.length];
        const x = noise(id * sliders.y_noise.value() / 255) * width
        const y = noise(id * sliders.x_noise.value() / 255) * height
        const curvature = noise(id*id + 10) * 150 + 50

        push()
        translate(x, y)
        stroke(color)
        fill(color)
        let angle = 0;
        while (angle < angle_final) {
            angle += 0.01
            let r = map(angle, 0, angle_final, r_min, r_max)
            push()
            rotate(angle + rotation)
            ellipse(curvature, 0, r)
            pop()
        }
        pop()
    }
}