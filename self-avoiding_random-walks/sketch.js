let walker;
let grid;
let resolution = 20;
let cols;
let rows;

function setup() {
    createCanvas(600, 600);
    cols = width / resolution;
    rows = height / resolution;
    grid = new Array(cols).fill(null).map(() => new Array(rows).fill(true));
    walker = new Walker(cols / 2, rows / 2);
}

function draw() {
    background(220);
    
    walker.walk();
    walker.show();

    // Display some info (crude shortest vs longest)
    textSize(16);
    text("Steps: " + walker.path.length, 10, 20);
}

function resetSketch() {
    setup();
    loop();
}

class Walker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.path = [{ x: x, y: y }];
        grid[x][y] = false; // Mark starting point as visited
    }

    walk() {
        let possibleMoves = this.getPossibleMoves();
        if (possibleMoves.length > 0) {
            let nextMove = random(possibleMoves);
            this.x = nextMove.x;
            this.y = nextMove.y;
            this.path.push({ x: this.x, y: this.y });
            grid[this.x][this.y] = false; // Mark as visited
        } else {
            console.log("Stuck!");
            noLoop(); // Stop when the walker gets stuck
        }
    }

    getPossibleMoves() {
        let moves = [];
        if (this.x > 0 && grid[this.x - 1][this.y]) {
            moves.push({ x: this.x - 1, y: this.y });
        }
        if (this.x < cols - 1 && grid[this.x + 1][this.y]) {
            moves.push({ x: this.x + 1, y: this.y });
        }
        if (this.y > 0 && grid[this.x][this.y - 1]) {
            moves.push({ x: this.x, y: this.y - 1 });
        }
        if (this.y < rows - 1 && grid[this.x][this.y + 1]) {
            moves.push({ x: this.x, y: this.y + 1 });
        }
        return moves;
    }

    show() {
        noStroke();
        fill(0);
        for (let i = 0; i < this.path.length; i++) {
            ellipse(this.path[i].x * resolution + resolution / 2, this.path[i].y * resolution + resolution / 2, resolution / 2, resolution / 2);
        }
    }
}