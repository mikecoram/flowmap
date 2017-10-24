let canvas = document.getElementById('flowmap');
let context = canvas.getContext('2d');

function drawNode(node) {
    // outline
    context.strokeStyle = 'rgb(255, 0, 0)';
    context.strokeRect(node.x, node.y, node.width, node.height);

    // fill
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillRect(node.x, node.y, node.width, node.height);

    // text
    context.font= node.font;
    context.fillStyle = node.titleStyle;
    context.fillText(node.title, node.getTextX(context.measureText(node.title).width), node.getTextY());
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