let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let nodes = [];

canvas.addEventListener('click', function (e) {


    let node;
    if ((node = mouseCollision(e))) {
        node.toggleSelected();
    }
    else {
        nodes.push(new Node(e.x, e.y));
    }

    draw();

}, false);

function mouseCollision(e) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.inBounds(e.x, e.y)) {
            return node;
        }
    }
    return false;
}

function draw() {
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        drawNode(node);
    }
}

function drawNode(node) {
    context.strokeStyle = 'rgb(255, 0, 0)';
    if (node.selected) context.strokeStyle = 'rgb(0, 255, 0)';
    context.strokeRect(node.x, node.y, node.width, node.height);

    context.fillStyle = 'rgb(256, 256, 256)';
    context.fillRect(node.x, node.y, node.width, node.height);
}

const NODE_WIDTH_DEFAULT = 100;
const NODE_HEIGHT_DEFAULT = 50;
function Node(x, y) {
    this.x = x;
    this.y = y;
    this.width = NODE_WIDTH_DEFAULT;
    this.height = NODE_HEIGHT_DEFAULT;

    this.connections = [];

    this.selected = false;
    this.toggleSelected = function () {
        if (this.selected) this.selected = false;
        else this.selected = true;
    }

    this.inXBounds = function (x) {
        return x >= this.x && x <= this.x + this.width;
    }
    this.inYBounds = function (y) {
        return y >= this.y && y <= this.y + this.height;
    }
    this.inBounds = function (x, y) {
        return this.inXBounds(x) && this.inYBounds(y);
    }
}