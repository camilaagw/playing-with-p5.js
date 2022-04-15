class Position {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.x = i * resolution + resolution/2
    this.y = j * resolution + resolution/2  
  }
  
}
class Grid {
  constructor(cols, rows) {
    this.rows = rows
    this.cols = cols
    let len = rows  * cols
    this.visited = new Array(len)
    for (let i = 0; i < len; i++) {
      this.visited[i] = false
    }
  }
  visit(pos) {
    this.visited[pos.i + pos.j * this.cols] = true
  }
  getNeighbors(pos) {
    const neighbors = []
    for (let i = pos.i - 1; i <= pos.i + 1; i++) {
      for (let j = pos.j - 1; j <= pos.j + 1; j++){
        if ( i >= 0 && i < this.cols && j>=0 &&  j<this.rows && 
            (i!=pos.i || j!=pos.j) && !this.visited[i + j * this.cols])
        neighbors.push(new Position(i, j))
      }
    }
    return neighbors
  }
  drawVisited(){
    for (let i=0; i<this.cols ; i++) {
      for (let j=0; j<this.rows; j++) {
        if (this.visited[i + j * this.cols]) {
          let pos = new Position(i, j)
          fill('red')
          strokeWeight(0)
          circle(pos.x, pos.y, 5)
          
        }
      }
    }
  }
}

let grid 
let path
const resolution = 50



function setup() {
  let height = 6
  let width = 10
  frameRate(3);
  createCanvas(width * resolution, height * resolution);
  grid = new Grid(width, height)
  let start = new Position(width /2, height / 2)
  grid.visit(start)
  path = [start]
}

function draw() {
  
  // Get random position
  const neighbors = grid.getNeighbors(path[path.length - 1])
  let r = int(random(neighbors.length))
  let newPos = neighbors[r]
  console.log(neighbors)
  // Add position to path
  if (newPos) {
    grid.visit(newPos)
    path.push(newPos)
  } else {
    noLoop()
    return
  }
  
  // Draw path
    background(220);
  let last = path[path.length - 1]
  noFill()
  stroke(0)
  strokeWeight(resolution/2)
  strokeJoin(ROUND);
  beginShape()
  for (p of path) {
    vertex(p.x, p.y)
  }
  endShape()
  fill(0)
  strokeWeight(0)
  circle(last.x, last.y, resolution);
  square(path[0].x - resolution/2, path[0].y - resolution/2, resolution);

  
  stroke(255)
  strokeWeight(resolution/4)
  noFill()
  beginShape()
  for (p of path) {
    vertex(p.x, p.y)
  }
  endShape()
  fill(255)
  circle(last.x, last.y, resolution / 2);
  square(path[0].x - resolution/4, path[0].y - resolution/4, resolution/2);
  
  // Display grid
  // grid.drawVisited()
  
  
}