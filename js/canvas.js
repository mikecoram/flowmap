class FlowMapCanvas {
    constructor (elementId, chart) {
        this.docCanvas = document.getElementById(elementId);
        this.context = this.docCanvas.getContext('2d');
    }

    drawNode(node) {
        // outline
        this.context.strokeStyle = node.selected ? 'rgb(0, 255, 255)' : 'rgb(255, 0, 0)';
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
        let pn = connection.parentNode;
        let cn = connection.childNode;

        this.context.beginPath();
        this.context.moveTo(pn.x + pn.width / 2, pn.y + pn.height / 2);
        this.context.strokeStyle = connection.selected ? 'rgb(0, 255, 255)' :'rgb(0, 255, 0)';
        this.context.lineTo(cn.x + cn.width / 2, cn.y + cn.height / 2);
        this.context.stroke();
        this.context.closePath();
    }
    
    drawNodes(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            this.drawNode(node);
        }
    }
    
    drawConnections(connections) {
        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            this.drawConnection(connection);
        }
    }
    
    drawPartialConnection (connection, x, y) {
        let pn = connection.parentNode;

        this.context.beginPath();
        this.context.moveTo(pn.x + pn.width / 2, pn.y + pn.height / 2);
        this.context.strokeStyle = 'rgb(0, 255, 0)';
        this.context.lineTo(x, y);
        this.context.stroke();
        this.context.closePath();
    }
    
    draw(chart) {
        // clear canvas
        this.context.clearRect(0, 0, this.docCanvas.width, this.docCanvas.height);
    
        this.drawConnections(chart.connections);
        this.drawNodes(chart.nodes);
    
        if (chart.partialConnection) {
            this.drawPartialConnection(chart.partialConnection, mouse.x, mouse.y);
        }
    }
}