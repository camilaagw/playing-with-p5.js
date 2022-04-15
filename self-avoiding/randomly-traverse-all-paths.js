class Position {
    constructor(coord, children) {
      this.coord = coord
      this.childrenCoords = children
    }

}

class Path {
    constructor() {
        this.positions = []
    }

    add(coord) {
        let children = coord.getNeighbors().filter(coord => !this.visited(coord)) 
        let shuffledChildren = myShuffle(children)
        let newPos = new Position(coord, shuffledChildren)
        this.positions.push(newPos)
    }

    visited(coord) {
        for (let pos of this.positions) {
            if (pos.coord.equals(coord))
                return true
        }
        return false
    }

    popChild() {
        return this.positions[this.positions.length - 1].childrenCoords.pop() 
    }

    backTrack() {
        return this.positions.pop()
    }

    render() {
        stroke(0)
        noFill()
        strokeJoin(ROUND);
        strokeWeight(15)
        beginShape()
        for (let p of this.positions) {
            p.coord.drawVertex()
        }
        endShape()
        strokeWeight(1)
        stroke(100)
        for (let p of this.positions) {
            for (let c of p.childrenCoords) {
                c.drawPoint()
                beginShape()
                p.coord.drawVertex()
                c.drawVertex()
                endShape()
            }
        }
    }
}

function myShuffle(unshuffled) {
    return unshuffled
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
}

const resolution = 50
let path
const height = 6
const width = 6

function setup() {
  frameRate(3);
  createCanvas(width * resolution, height * resolution);
  path = new Path()
  path.add(new Coord(0,0))
}

function draw() {

    if (path.positions.length  == width*height)
        noLoop()
    else {
        let next = path.popChild()
        if (next) path.add(next)
        else path.backTrack()
    }

    background(220);
    path.render()

}