class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.cells = new Array(rows * cols).fill(0)
    }

    get(row, col) {
        const index = row * this.cols + col
        return this.cells[index]
    }

    set(row, col, value) {
        if (this.outOfBounds(row, col)) {
            return;
        }
        const index = row * this.cols + col
        this.cells[index] = value
    }

    outOfBounds(row, col) {
        return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
    }

    update() {
        let newGrid = new Grid(this.rows, this.cols)
        for (let row=0; row<this.rows; row++) {
            for (let col=0; col<this.cols; col++) {
                const state = this.get(row, col)
                if (state > 0) {
                     // Rule 1: If at the bottom row, it stays
                    if (row === this.rows - 1) { // Why === ?
                        newGrid.set(row, col, state)
                    }
                    // Rule 2: Check row directly below
                    else if (this.get(row+1, col) === 0) {
                        newGrid.set(row+1, col, state)
                    }
                    // Rule 3: Check left diagonal
                    else if (col > 0 && this.get(row+1, col-1) === 0) {
                        newGrid.set(row+1, col-1, state)
                    }
                    // Rule 4: Check right diagonal
                    else if (col < this.cols - 1 && this.get(row+1, col+1) === 0) {
                        newGrid.set(row+1, col+1, state)
                    }
                    else {
                        newGrid.set(row, col, state)
                    }
                }
            }
        }
        this.cells = newGrid.cells
    }
}
