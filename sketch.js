






let dim;
let col = 50;
let xoff = 0;
let currentPoints = [];
let targetPoints = [];
let interpolationFactor = 0; // Tracks the progress of the morph



function setup() {
  createCanvas(windowWidth, windowHeight);
  dim = width / 2;
  noStroke();
  ellipseMode(RADIUS);
  initializePoints();
  frameRate(30); // Smooth and meditative
  
}

function draw() {
  background(0,0,0,20);
  drawSymmetry();
  // let t = random(0,5)
  let t = 10
  let r = 255 * noise(t + 5);
  let g = 255 * noise(t + 10);
  let b = 255 * noise(t + 20);
  c = color(r,g,b)
  stroke(col)

  // Gradually morph to the target points
  interpolationFactor += 0.01; // Adjust speed of transition
  if (interpolationFactor >= 1) {
    interpolationFactor = 0;
    currentPoints = [...targetPoints];
    initializePoints(); // Generate new target points
  }
   for (let x = 0; x <= width; x += dim){
  drawGradient(width/2,height/2)
  
}
}

function initializePoints() {
  targetPoints = [
    { x: random(50, windowWidth * 0.5), y: random(50, windowWidth * 0.5) },
    { x: random(100, windowHeight * 0.5), y: random(50, windowHeight * 0.5) },
    { x: random(150, windowHeight * 0.5), y: random(150, windowWidth *0.5)}
  ];
  if (currentPoints.length === 0) {
    currentPoints = [...targetPoints];
  }
}

function drawSymmetry() {
  
  push();
  // fill(255,255,255)
  noFill()
  translate(width / 2, height / 2);
  let symmetry = 12;
  let angle = 360 / symmetry;
  // stroke(200,50,67);
  strokeWeight(1);

  let x1 = 0;
  let y1 = 0;

  // Interpolate control points
  let x2 = lerp(currentPoints[0].x, targetPoints[0].x, interpolationFactor);
  let y2 = lerp(currentPoints[0].y, targetPoints[0].y, interpolationFactor);
  let x3 = lerp(currentPoints[1].x, targetPoints[1].x, interpolationFactor);
  let y3 = lerp(currentPoints[1].y, targetPoints[1].y, interpolationFactor);
  let x4 = lerp(currentPoints[2].x, targetPoints[2].x, interpolationFactor);
  let y4 = lerp(currentPoints[2].y, targetPoints[2].y, interpolationFactor);

  for (let radius = 100; radius < width/2; radius += 20) {
    for (let i = 0; i < symmetry; i++) {
      bezier(x1, y1, x2, y2, x3, y3, x4, y4);
      rotate(angle);
    }
  }
  pop();
}

function drawGradient(){
  let radius = dim /2
  let h = noise(xoff) * 360
  col = map(noise(xoff),0,1,0,270)
  for (let r = radius; r > 0; r--){
    h = (h+1) % 360
    xoff+= 0.01
  return col
  }
  
  
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}


function mousePressed() {
  fullscreen(true)
  
}
