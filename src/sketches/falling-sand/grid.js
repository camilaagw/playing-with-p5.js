/**
 * Grid class for the falling sand simulation.
 * Flat array storage with double-buffering.
 */
export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.currentCells = new Array(rows * cols).fill(0);
    this.nextCells = new Array(rows * cols).fill(0);
  }

  get(row, col) {
    if (this.outOfBounds(row, col)) return undefined;
    return this.currentCells[row * this.cols + col];
  }

  set(row, col, value, targetArray) {
    if (this.outOfBounds(row, col)) return;
    targetArray[row * this.cols + col] = value;
  }

  outOfBounds(row, col) {
    return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
  }

  update() {
    this.nextCells.fill(0);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const state = this.get(row, col);

        if (state > 0) {
          if (row === this.rows - 1) {
            this.set(row, col, state, this.nextCells);
          } else if (this.get(row + 1, col) === 0) {
            this.set(row + 1, col, state, this.nextCells);
          } else if (col > 0 && this.get(row + 1, col - 1) === 0) {
            this.set(row + 1, col - 1, state, this.nextCells);
          } else if (col < this.cols - 1 && this.get(row + 1, col + 1) === 0) {
            this.set(row + 1, col + 1, state, this.nextCells);
          } else {
            this.set(row, col, state, this.nextCells);
          }
        }
      }
    }

    let temp = this.currentCells;
    this.currentCells = this.nextCells;
    this.nextCells = temp;
  }
}
