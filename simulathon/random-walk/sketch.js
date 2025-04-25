// let x, y;

// function setup() {
//   createCanvas(600, 600);
//   background(255);
//   x = width / 2;
//   y = height / 2;
// }

// function draw() {
//   stroke(0);
//   strokeWeight(2);
//   point(x, y);

//   let r = floor(random(4));
//   if (r === 0) {
//     x += 1;
//   } else if (r === 1) {
//     x -= 1;
//   } else if (r === 2) {
//     y += 1;
//   } else {
//     y -= 1;
//   }
// }
//crea una simulacion en js tal que: Random Walk and Brownian Motion, Simulate the movement of single or multiple random walkers on a grid. Visualize diffusion and estimate first-passage times.


let walkers = [];
let numWalkers = 10;

function setup() {
  createCanvas(600, 600);
  background(255);

  for (let i = 0; i < numWalkers; i++) {
    walkers.push(new Walker(width / 2, height / 2));
  }
}

function draw() {
  for (let walker of walkers) {
    walker.step();
    walker.display();
  }
}

class Walker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  step() {
    let r = floor(random(4));
    if (r === 0) {
      this.x += 1;
    } else if (r === 1) {
      this.x -= 1;
    } else if (r === 2) {
      this.y += 1;
    } else {
      this.y -= 1;
    }

    // Keep within canvas bounds
    this.x = constrain(this.x, 0, width - 1);
    this.y = constrain(this.y, 0, height - 1);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    point(this.x, this.y);
  }
}