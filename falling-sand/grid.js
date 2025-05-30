/**
 * Represents a 2D grid for simulating falling sand.
 * The grid manages the state of individual cells and provides methods for updating and querying cell values.
 */
class Grid {
    /**
     * Creates a new Grid instance.
     * @param {number} rows - The number of rows in the grid.
     * @param {number} cols - The number of columns in the grid.
     */
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.currentCells = new Array(rows * cols).fill(0);
        this.nextCells = new Array(rows * cols).fill(0); // Buffer for the next state
    }

    /**
     * Gets the value of a cell at the specified row and column.
     * @param {number} row - The row index of the cell.
     * @param {number} col - The column index of the cell.
     * @returns {number|undefined} The value of the cell, or undefined if the coordinates are out of bounds.
     */
    get(row, col) {
        if (this.outOfBounds(row, col)) return undefined;
        const index = row * this.cols + col;
        return this.currentCells[index];
    }

    /**
     * Sets the value of a cell at the specified row and column in the target array.
     * @param {number} row - The row index of the cell.
     * @param {number} col - The column index of the cell.
     * @param {number} value - The value to set the cell to.
     * @param {Array<number>} targetArray - The array (currentCells or nextCells) to update.
     */
    set(row, col, value, targetArray) {
        if (this.outOfBounds(row, col)) {
            return;
        }
        const index = row * this.cols + col;
        targetArray[index] = value;
    }

    /**
     * Checks if the given row and column are outside the grid boundaries.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {boolean} True if the coordinates are out of bounds, false otherwise.
     */
    outOfBounds(row, col) {
        return row < 0 || row >= this.rows || col < 0 || col >= this.cols;
    }

    /**
     * Updates the grid state based on sand movement rules.
     * Iterates through each cell and applies rules to determine the next state of the sand particles.
     * The rules are:
     * 1. If a sand particle is at the bottom row, it stays in place.
     * 2. If the cell directly below a sand particle is empty, the particle moves down.
     * 3. If the cell below is occupied, but the bottom-left diagonal cell is empty (and not out of bounds), the particle moves there.
     * 4. If both the cell below and bottom-left diagonal are occupied, but the bottom-right diagonal cell is empty (and not out of bounds), the particle moves there.
     * 5. Otherwise, the sand particle stays in its current position.
     * After calculating all next states, the current cell buffer is swapped with the next cell buffer.
     */
    update() {
        this.nextCells.fill(0); // Reset the buffer for the next state

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const state = this.get(row, col);
                if (state > 0) { // If the cell contains sand
                    // Rule 1: If at the bottom row, sand stays.
                    if (row === this.rows - 1) {
                        this.set(row, col, state, this.nextCells);
                    }
                    // Rule 2: Check cell directly below. If empty, sand moves down.
                    else if (this.get(row + 1, col) === 0) {
                        this.set(row + 1, col, state, this.nextCells);
                    }
                    // Rule 3: Check bottom-left diagonal. If empty, sand moves diagonally left.
                    else if (col > 0 && this.get(row + 1, col - 1) === 0) {
                        this.set(row + 1, col - 1, state, this.nextCells);
                    }
                    // Rule 4: Check bottom-right diagonal. If empty, sand moves diagonally right.
                    else if (col < this.cols - 1 && this.get(row + 1, col + 1) === 0) {
                        this.set(row + 1, col + 1, state, this.nextCells);
                    }
                    // Rule 5: If no movement possible, sand stays in place.
                    else {
                        this.set(row, col, state, this.nextCells);
                    }
                }
            }
        }
        // Swap buffers: currentCells becomes nextCells, and nextCells is reset for the next update cycle.
        let temp = this.currentCells;
        this.currentCells = this.nextCells;
        this.nextCells = temp;
    }
}
