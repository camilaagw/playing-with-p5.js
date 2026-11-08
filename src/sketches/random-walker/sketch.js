class Position {
  constructor(i, j, resolution) {
    this.i = i;
    this.j = j;
    this.x = i * resolution + resolution / 2;
    this.y = j * resolution + resolution / 2;
  }
}

class WalkerGrid {
  constructor(cols, rows) {
    this.rows = rows;
    this.cols = cols;
    let len = rows * cols;
    this.visited = new Array(len).fill(false);
  }

  visit(pos) {
    this.visited[pos.i + pos.j * this.cols] = true;
  }

  getNeighbors(pos, resolution) {
    const neighbors = [];
    for (let i = pos.i - 1; i <= pos.i + 1; i++) {
      for (let j = pos.j - 1; j <= pos.j + 1; j++) {
        if (
          i >= 0 &&
          i < this.cols &&
          j >= 0 &&
          j < this.rows &&
          (i !== pos.i || j !== pos.j) &&
          !this.visited[i + j * this.cols]
        ) {
          neighbors.push(new Position(i, j, resolution));
        }
      }
    }
    return neighbors;
  }
}

export default function sketch(p) {
  const resolution = 50;
  const gridWidth = 10;
  const gridHeight = 8;
  let grid;
  let path = [];

  function initWalker() {
    grid = new WalkerGrid(gridWidth, gridHeight);
    let start = new Position(
      p.floor(gridWidth / 2),
      p.floor(gridHeight / 2),
      resolution
    );
    grid.visit(start);
    path = [start];
    p.loop();
  }

  p.setup = () => {
    p.createCanvas(gridWidth * resolution, gridHeight * resolution);
    p.frameRate(6);
    initWalker();
  };

  p.draw = () => {
    const neighbors = grid.getNeighbors(path[path.length - 1], resolution);
    if (neighbors.length > 0) {
      let r = p.int(p.random(neighbors.length));
      let newPos = neighbors[r];
      grid.visit(newPos);
      path.push(newPos);
    } else {
      p.noLoop();
    }

    p.background('#1e293b');

    if (path.length > 1) {
      let last = path[path.length - 1];

      p.noFill();
      p.stroke('#0f172a');
      p.strokeWeight(resolution / 2);
      p.strokeJoin(p.ROUND);
      p.beginShape();
      for (let pt of path) {
        p.vertex(pt.x, pt.y);
      }
      p.endShape();

      p.fill('#0f172a');
      p.noStroke();
      p.circle(last.x, last.y, resolution);
      p.square(path[0].x - resolution / 2, path[0].y - resolution / 2, resolution);

      p.stroke('#38bdf8');
      p.strokeWeight(resolution / 4);
      p.noFill();
      p.beginShape();
      for (let pt of path) {
        p.vertex(pt.x, pt.y);
      }
      p.endShape();

      p.fill('#38bdf8');
      p.circle(last.x, last.y, resolution / 2);
      p.square(path[0].x - resolution / 4, path[0].y - resolution / 4, resolution / 2);
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      initWalker();
    }
  };
}
