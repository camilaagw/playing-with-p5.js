/**
 * Grid class for the falling sand simulation.
 * Manages a 2D grid using a flat array for efficient memory access.
 * Uses double buffering to avoid conflicts during physics updates.
 */
class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.currentCells = new Array(rows * cols).fill(0);
        this.nextCells = new Array(rows * cols).fill(0);
    }

    get(row, col) {
        if (this.outOfBounds(row, col)) return undefined;
        const index = row * this.cols + col;
        return this.currentCells[index];
    }

    set(row, col, value, targetArray) {
        if (this.outOfBounds(row, col)) {
            return;
        }
        const index = row * this.cols + col;
        targetArray[index] = value;
    }

    outOfBounds(row, col) {
        return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
    }

    /**
     * Updates the physics simulation for one time step.
     * Implements falling sand behavior using cellular automaton rules:
     * 1. Sand falls straight down if space is available
     * 2. Otherwise, sand falls diagonally (left or right)
     * 3. If no movement is possible, sand stays in place
     *
     * Uses double buffering to prevent update conflicts.
     */
    update() {
        this.nextCells.fill(0);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const state = this.get(row, col);

                // Only process cells that contain sand particles
                if (state > 0) {
                    // Rule 1: If at bottom row, particle stays put (can't fall further)
                    if (row === this.rows - 1) {
                        this.set(row, col, state, this.nextCells);
                    }
                    // Rule 2: Try to fall straight down first
                    else if (this.get(row + 1, col) === 0) {
                        this.set(row + 1, col, state, this.nextCells);
                    }
                    // Rule 3: Try to fall diagonally left
                    else if (col > 0 && this.get(row + 1, col - 1) === 0) {
                        this.set(row + 1, col - 1, state, this.nextCells);
                    }
                    // Rule 4: Try to fall diagonally right
                    else if (col < this.cols - 1 && this.get(row + 1, col + 1) === 0) {
                        this.set(row + 1, col + 1, state, this.nextCells);
                    }
                    // Rule 5: If no movement possible, stay in current position
                    else {
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
