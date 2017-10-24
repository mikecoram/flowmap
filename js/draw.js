class FlowMapCanvas {
    constructor (elementId) {
        this.docCanvas = document.getElementById(elementId);
        this.context = this.docCanvas.getContext('2d');
    }

    addEventListener(event, functionCall) {
        this.docCanvas.addEventListener(event, functionCall, false);
    }

    drawNode(node) {
        // outline
        this.context.strokeStyle = 'rgb(255, 0, 0)';
        this.context.strokeRect(node.x, node.y, node.width, node.height);
    
        // fill
        this.context.fillStyle = 'rgb(255, 255, 255)';
        this.context.fillRect(node.x, node.y, node.width, node.height);
    
        // text
        this.context.font= node.font;
        this.context.fillStyle = node.titleStyle;
        this.context.fillText(node.title, node.getTextX(this.context.measureText(node.title).width), node.getTextY());
    }
    
    drawConnection(connection) {
        this.context.beginPath();
        this.context.moveTo(connection.parentNode.x, connection.parentNode.y);
        this.context.strokeStyle = 'rgb(0, 255, 0)';
        this.context.lineTo(connection.childNode.x, connection.childNode.y);
        this.context.stroke();
        this.context.closePath();
    }
    
    drawNodes() {
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            this.drawNode(node);
        }
    }
    
    drawConnections() {
        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            this.drawConnection(connection);
        }
    }
    
    drawPartialConnection (connection, x, y) {
        this.context.beginPath();
        this.context.moveTo(connection.parentNode.x, connection.parentNode.y);
        this.context.strokeStyle = 'rgb(0, 255, 0)';
        this.context.lineTo(x, y);
        this.context.stroke();
        this.context.closePath();
    }
    
    draw() {
        // clear canvas
        this.context.clearRect(0, 0, this.docCanvas.width, this.docCanvas.height);
    
        this.drawConnections();
        this.drawNodes();
    
        if (partialConnection) {
            this.drawPartialConnection(partialConnection, mouse.x, mouse.y);
        }
    }
}