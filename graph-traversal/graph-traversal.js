//const resolution = 50
const resolution = 25
let tree
let graph
const height = 20
const width = 10

class Stack {
    constructor() {
        this.elements = [] 
    }

    enqueue(elem) {
        this.elements.push(elem)
    }

    peak() {
        return this.elements[0]
    }

    dequeue() {
        return this.elements.pop()
    }

    *[Symbol.iterator]() {
        yield* this.elements
    }
    
}


class SpanningTree {
    constructor(){
        this.candidates = new PriorityQueue((x, y) => x.dist < y.dist) // Dijkstra
        // this.candidates = new Stack() // Depth first search 
        this.parents = new Array(height*width)
        this.distances = new Array(height*width)
    }

    next(){
        return this.candidates.dequeue()?.node
    }

    visit(parent, child, distance) {
        this.parents[child] = parent
        const parentDist = this.distances[parent] || 0
        const dist = parentDist + distance
        this.distances[child] = dist
        this.candidates.enqueue({node: child, dist: dist}) 
    }

    isVisited(node) {
        return this.parents[node] !== undefined
    }

    getDistance(coord) {
        return this.distances[coord.index]
    }

    draw() {
        // Draw Paths
        for (const node of graph.nodes()) {
            const parent = this.parents[node]
            if (parent !== undefined)  graph.drawEdge(parent, node, {color:255, lineWidth:1})
        }
        
        // Draw visited
        for (const node of graph.nodes()) 
            if (this.isVisited(node)) 
                graph.drawNode(node, {color:"fuchsia", size:10})

        // Draw candidates
        for (let {node} of this.candidates) 
            graph.drawNode(node,{color:255, size:10})

        // Draw next
        let next = this.candidates.peak()?.node
        if (next>=0) graph.drawNode(next,{color:0})
    }
}


class Graph {
    constructor(size) {
        this.edges = new Array(size)
        this.nodeCoords = new Array(size)

        for (let node of this.nodes()) {
            this.edges[node] = [] // TODO: improve
        }
    }

    static grid(width, height) {
        // Factory method to construct a grid graph
        const graph = new Graph(width*height)
        for (let i=0; i<width; i++) {
            for (let j=0; j<height; j++) {
                const id = i + j*width
                const x = i * resolution + resolution/2
                const y = j * resolution + resolution/2 
                graph.setCoord(id, createVector(x, y))
      
                if (i > 0) graph.addEdge(id, id-1)
                if (j > 0) graph.addEdge(id, id-width)
                if (i + 1 < width)  graph.addEdge(id, id+1)
                if (j + 1 < height) graph.addEdge(id, id+width) 
            }
        }
        return graph
    }

    static random(n) {
        // Factory method to construct a random graph
        const graph = new Graph(n)
        for (let node of graph.nodes()) {
            graph.setCoord(node, createVector(random(width*resolution), random(height*resolution)))
            for (let i=0; i<3; i++) {
                const node2 = floor(random(n))
                if (node != node2) graph.addEdge(node, node2)
            }
        }
        return graph
    }

    addEdge(from, to) {
        this.edges[from].push(to)
    }

    setCoord(node, coord) {
        this.nodeCoords[node] = coord
    }

    getDist(node1, node2) {
        return this.nodeCoords[node1].dist(this.nodeCoords[node2])

    }

    *nodes() {
        for (let node=0; node<this.edges.length; node++)
            yield node
    }

    draw() {
        for (let from of this.nodes()) {  
            this.drawNode(from, {color:0, size:20})
            for (let to of this.edges[from]) {
                this.drawEdge(from, to, {color:0, lineWidth:8})
            }
        }     
    }

    drawNode(node, {color=255, size=5} = {}) {
        const coord = this.nodeCoords[node]
        fill(color)
        stroke(color)
        strokeWeight(1)
        circle(coord.x, coord.y, size); 
    }

    drawEdge(from, to, {color=0, lineWidth=1} = {}) {
        const coord1 = this.nodeCoords[from]
        const coord2 = this.nodeCoords[to]
        noFill()
        stroke(color)
        strokeJoin(ROUND);
        strokeWeight(lineWidth)
        beginShape()
            vertex(coord1.x, coord1.y)
            vertex(coord2.x, coord2.y)
        endShape()
    }
}

function setup() {
    frameRate(10);
    createCanvas(width * resolution, height * resolution);
    graph = Graph.grid(width, height)
    //graph = Graph.random(width*height)
    tree = new SpanningTree()
    let origin = width + 1
    tree.visit(origin, origin)
    
}

function draw() {
    background(220);
    graph.draw()
    tree.draw(graph)
    let next = tree.next()
    if (next>=0) {
        for (let child of graph.edges[next]) {
            if (!tree.isVisited(child)){
                tree.visit(next, child,  graph.getDist(next, child))
            }
        }
    }
    else noLoop()
}