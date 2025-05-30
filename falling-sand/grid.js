class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.cells = new Array(rows * cols).fill(0)

        this.currentCells = new Array(rows * cols).fill(0);
        this.nextCells = new Array(rows * cols).fill(0); // Buffer for the next state
    }

    get(row, col) {
        if (this.outOfBounds(row, col)) return undefined;
        const index = row * this.cols + col
        return this.currentCells[index]
    }

    set(row, col, value, targetArray) {
        if (this.outOfBounds(row, col)) {
            return;
        }
        const index = row * this.cols + col
        targetArray[index] = value
    }

    outOfBounds(row, col) {
        return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
    }

    update() {
        this.nextCells.fill(0);

        for (let row=0; row<this.rows; row++) {
            for (let col=0; col<this.cols; col++) {
                const state = this.get(row, col)
                if (state > 0) {
                     // Rule 1: If at the bottom row, it stays
                    if (row === this.rows - 1) {
                        grid.set(row, col, state, this.nextCells)
                    }
                    // Rule 2: Check row directly below
                    else if (this.get(row+1, col) === 0) {
                        grid.set(row+1, col, state, this.nextCells)
                    }
                    // Rule 3: Check left diagonal
                    else if (col > 0 && this.get(row+1, col-1) === 0) {
                        grid.set(row+1, col-1, state, this.nextCells)
                    }
                    // Rule 4: Check right diagonal
                    else if (col < this.cols - 1 && this.get(row+1, col+1) === 0) {
                        grid.set(row+1, col+1, state, this.nextCells)
                    }
                    else {
                        grid.set(row, col, state, this.nextCells)
                    }
                }
            }
        }
        let temp = this.currentCells;
        this.currentCells = this.nextCells;
        this.nextCells = temp;
    }
}
