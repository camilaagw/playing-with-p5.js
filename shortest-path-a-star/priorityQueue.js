Array.prototype.swap = function (x,y) {
    const temp = this[x];
    this[x] = this[y];
    this[y] = temp;
    return this;
}

class PriorityQueue {
    constructor(comparisonFunc) {
        this.elements = [null] // we won't use the first element
        this.cmp = (x, y) => comparisonFunc(this.elements[x], this.elements[y])
    }

    enqueue(elem) {
        let index = this.elements.length
        this.elements.push(elem)
        while (index>1) {
            let parentIndex = Math.floor(index/2)
            if (this.cmp(index, parentIndex)) {
                this.elements.swap(index, parentIndex)
                index = parentIndex
            } else {
                break;
            }
        }
        
    }

    peak() {
        return this.elements[1]
    }

    dequeue() {
        if (this.elements.length == 1) return undefined
        if (this.elements.length == 2) return this.elements.pop()

        const result = this.elements[1]
        this.elements[1] = this.elements.pop()
        let index = 1
        while(true) {
            const leftIdx = index*2
            const rightIdx = index*2 + 1
            if (leftIdx >= this.elements.length) break
            if (rightIdx >= this.elements.length || this.cmp(leftIdx, rightIdx)) {
                if (this.cmp(leftIdx, index)) {
                    this.elements.swap(index, leftIdx)
                    index = leftIdx
                } else break
            }
            else {
                if (this.cmp(rightIdx, index)) {
                    this.elements.swap(index, rightIdx)
                    index = rightIdx
                } else break
            }
        }
        return result
    }

    *[Symbol.iterator]() {
        for (let i=1; i<this.elements.length; i++){
            yield this.elements[i]
        }
         
    }
    
}
