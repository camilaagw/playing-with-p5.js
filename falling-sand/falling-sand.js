const scale = 2
const cols = 250
const rows = 250
let hueValue = 360

let grid;

function createGrid() {
    let grid = []
    for (let i=0; i<rows; i++) {
        let row = []
        for (let j=0; j<cols; j++) {
            row.push(0)
        }
        grid.push(row)
    }
    return grid
}

function mouseDragged() {
    let x = floor(mouseX / scale)
    let y = floor(mouseY / scale)
    let extent = 3
    for (let i=-extent; i<=extent; i++) {
        for (let j=-extent; j<=extent; j++) {
            if (random(1) > 0.75 && grid[y+i][x+j]==0) {
                grid[y+i][x+j] = hueValue
                //console.log(y+i) // TODO: fix this!! The grid is weird.....
            }
        }
    }
    hueValue += 0.03;
  if (hueValue > 360) {
    hueValue = 1;
  }

}


function setup() {
    createCanvas(cols*scale, rows*scale);
    colorMode(HSB, 360, 255, 255)
    grid = createGrid()
}


function draw() {
    background(0)

    for (let x=0; x<cols; x++) {
        for (let y=0; y<rows; y++) {
            if (grid[y][x] > 0) {
                noStroke();
                fill(grid[y][x], 255, 255*grid[y][x])
                rect(x*scale, y*scale, scale)
            }
        }
    }
    tick()
}

function tick() {
    let newGrid = createGrid()
    for (let j=0; j<cols; j++) {
        for (let i=0; i<rows; i++) {
            if (grid[i][j] > 0) {
                if (i == rows - 1) {
                    newGrid[i][j] = grid[i][j]
                }
                else if (grid[i+1][j] == 0) {
                    newGrid[i+1][j] = grid[i][j]
                }
                else if (j > 0 && grid[i+1][j-1] == 0) {
                    newGrid[i+1][j-1] = grid[i][j]
                }
                else if (j < cols - 1 && grid[i+1][j+1] == 0) {
                    newGrid[i+1][j+1] = grid[i][j]
                }
                else {
                    newGrid[i][j] = grid[i][j]
                }
            }
        }
    }
    grid = newGrid
}