//const resolution = 50
const resolution = 25
let tree
let graph
const height = 3
const width = 3
const end = height*width - 1


class SpanningTree {
    constructor(){
        this.candidates = new PriorityQueue((x, y) => x.dist < y.dist) 
        this.parents = new Array(height*width)
        this.distances = new Array(height*width).fill(Infinity)
    }

    init(origin) {
        this.distances[origin] = 0
        this.parents[origin] = origin
        this.candidates.enqueue({node: origin, dist: 0}) 
    }

    next(){
        return this.candidates.dequeue()?.node
    }

    visit(parent, child, distance) {
        const currentChildDist = this.distances[child] 
        const parentDist = this.distances[parent]
        const newChildDist = parentDist + distance

        console.log("Parent", parent, "Child", child, newChildDist, currentChildDist)
        console.log(this.parents)

        if (newChildDist < currentChildDist) {
            this.parents[child] = parent
            this.distances[child] = newChildDist
            this.candidates.enqueue({node: child, dist: newChildDist}) 
        }
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
        this.weights = {}

        for (let node of this.nodes()) {
            this.edges[node] = [] // TODO: improve
            this.weights[node] = {}
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
      
                if (i > 0) graph.addEdge(id, id-1, 1)
                if (j > 0) graph.addEdge(id, id-width, 1)
                if (i + 1 < width)  graph.addEdge(id, id+1, 1)
                if (j + 1 < height) graph.addEdge(id, id+width, 1) 
            }
        }
        return graph
    }

    static fromEdges(edges, nodeCoords) {
        // Factory method to create a custom graph
        const n = nodeCoords.length
        const graph = new Graph(n)
        for (let id = 0; id < n; id++) {
            let [i, j] = nodeCoords[id]
            const x = i * resolution*2 + resolution/2
            const y = j * resolution*2 + resolution/2 
            graph.setCoord(id, createVector(x, y))
        }
        for (let [from, to, weight] of edges)
            graph.addEdge(from, to, weight)
        return graph

    }

    static random(n) {
        // Factory method to construct a random graph
        const graph = new Graph(n)
        for (let node of graph.nodes()) {
            graph.setCoord(node, createVector(random(width*resolution), random(height*resolution)))
            for (let i=0; i<3; i++) {
                const node2 = floor(random(n))
                const dist = this.nodeCoords[node].dist(this.nodeCoords[node2])
                if (node != node2) graph.addEdge(node, node2, dist)
            }
        }
        return graph
    }

    addEdge(from, to, distance) {
        this.weights[from][to] = distance
        this.edges[from].push(to)
    }

    setCoord(node, coord) {
        this.nodeCoords[node] = coord
    }

    getDist(from, to) {
        return this.weights[from][to]

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
    frameRate(0.5);
    createCanvas(width * resolution, height * resolution);
    graph = Graph.grid(width, height)
    
    // graph = Graph.fromEdges([
    //     [1, 2, 2],
    //     [1, 3, 4],
    //     [2, 3, 1],
    //     [2, 4, 7],
    //     [3, 5, 3],
    //     [4, 0, 1],
    //     [5, 4, 2],
    //     [5, 0, 5]
    // ],[
    //    [3, 1], 
    //    [0, 1],
    //    [1, 0],
    //    [1, 2],
    //    [2, 0],
    //    [2, 2],
    // ]
    // )
    tree = new SpanningTree()
    let origin = 1//10
    tree.init(origin)
    
}

function draw() {
    background(220);
    graph.draw()
    tree.draw(graph)
    graph.drawNode(end, {color: "lightgreen", size: 10})
    
    let next = tree.next()

    // Check end
    if (next == end) {
        console.log("Found!!!")
        let node = end
        let parent = tree.parents[end]
        console.log(parent)
        while (parent!=node) {
            graph.drawEdge(parent, node, {color: "lightgreen", lineWidth:3})
            node = parent
            parent = tree.parents[parent]
        }
        noLoop()
    }

    // Process next node
    if (next>=0) {
        for (let child of graph.edges[next]) {
            tree.visit(next, child,  graph.getDist(next, child))
        }
    }
    else noLoop()
}