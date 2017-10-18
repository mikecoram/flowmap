function drawNode(node) {
    // outline
    context.strokeStyle = 'rgb(255, 0, 0)';
    if (node.selected) context.strokeStyle = 'rgb(0, 255, 0)';
    context.strokeRect(node.x, node.y, node.width, node.height);

    // fill
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillRect(node.x, node.y, node.width, node.height);
}

function drawConnection(connection) {
    context.beginPath();
    context.moveTo(connection.parentNode.x, connection.parentNode.y);
    context.strokeStyle = 'rgb(0, 255, 0)';
    context.lineTo(connection.childNode.x, connection.childNode.y);
    context.stroke();
}

function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        drawNode(node);
    }
}

function drawConnections() {
    for (let i = 0; i < connections.length; i++) {
        let connection = connections[i];
        drawConnection(connection);
    }
}

function draw() {
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawConnections();
    drawNodes();
}

function Connection(parentNode, childNode) {
    this.parentNode = parentNode;
    this.childNode = childNode;
}

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let nodes = [];
let connections = [];

let n1 = new Node(100, 200);
let n2 = new Node(400, 100);
let n3 = new Node(500, 400);

nodes.push(n1, n2, n3);

let c1 = new Connection(n1, n2);
let c2 = new Connection(n1, n3);
connections.push(c1, c2);
draw();