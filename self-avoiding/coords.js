class Coord {
    constructor(i, j) {
      this.i = i
      this.j = j
      this.index = this.i + this.j*width 
      this.x = i * resolution + resolution/2
      this.y = j * resolution + resolution/2 
    }

    distanceTo(other) {
        return sqrt(pow(this.i - other.i, 2) + pow(this.j - other.j, 2))
    }

    drawPoint(color=255, size=5) {
        fill(color)
        strokeWeight(1)
        circle(this.x, this.y, size);
    }

    drawVertex() {
        vertex(this.x, this.y);
    }

    drawLineTo(other) {
        noFill()
        stroke(0)
        strokeJoin(ROUND);
        strokeWeight(2)
        beginShape()
            this.drawVertex()
            other.drawVertex()
        endShape()
    }

    getNeighbors() {
        let neighbors = []
        let i = this.i
        let j = this.j
        if (i > 0) neighbors.push(new Coord(i - 1, j))
        if (j > 0) neighbors.push(new Coord(i, j -1))
        if (i + 1 < width)  neighbors.push(new Coord(i + 1, j)) // This is dirty
        if (j + 1 < height) neighbors.push(new Coord(i, j + 1)) // This is dirty
        return neighbors 
    }

    equals(coord) {
        return this.i == coord.i && this.j == coord.j
    }
}