let myImage;
let halfImage;
let width
let height
let macircle
let circulitos


class Circle {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.r = 1
    this.color = color
    this.growing = true // TODO: usar para evitar reevaluar colides 
  }

  grow(){
    this.r = this.r + 1
  }

  isInbounds() {
    return (0 < this.x - this.r) && (this.x + this.r < width) &&
           (0 < this.y - this.r) && (this.y + this.r < height)
  }

  colides(others) {
    for (let other of others){
      if (other === this) continue
      let dist = createVector(this.x, this.y).dist(createVector(other.x, other.y))
      if (dist < other.r + this.r) return true
    }
    return false
  }

  show() {
    fill(this.color)
    noStroke()
    circle(this.x, this.y,2*this.r)
  }
}
function getImgColor(x, y) {
  imgx = map(x,  0, width, 0, myImage.width)
  imgy = map(y,  0, height, 0, myImage.height)
  return myImage.get(imgx, imgy)
}

function preload() {
  myImage = loadImage('home4.jpeg');
}

function setup() {
  width = myImage.width
  height = myImage.height
  createCanvas(width, height);
  myImage.loadPixels();
  circulitos = []
}

function addCircle(x, y) {
  circulitos.push(new Circle(x, y, getImgColor(x, y)))
}

function draw() {
  background(50)
  for (let i=0; i<10; i++) {
    addCircle(random(width), random(height))
  }

  for (let c of circulitos){
    if (c.isInbounds() && !c.colides(circulitos)) c.grow()
    c.show()
  }

  //image(myImage, 0, 0, width, height);
  
  // size = 10
  // for (let x=0; x<width; x+=size){
  //   for (let y=0; y<height; y+=size) {
  //     c=  getImgColor(x, y)
    
  //     fill(c)
  //     noStroke()
  //     circle(x + size/2, y + size/2, size)
  //   }
  // }
 

  
}