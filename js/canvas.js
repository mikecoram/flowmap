class FlowMapCanvas {
    constructor (elementId, mouse) {
        this.docCanvas = document.getElementById(elementId);
        this.context = this.docCanvas.getContext('2d');
        this.mouse = mouse;
    }

    drawNodes (nodes) {
        let context = this.context;
        nodes.forEach(function (n) {
            n.draw(context);
        });
    }
    
    drawConnections (connections) {
        let context = this.context;
        connections.forEach(function (c) {
            c.draw(context);
        });
    }
    
    drawPartialConnection (connection, x, y) {
        let pn = connection.parentNode;

        this.context.beginPath();
        this.context.moveTo(pn.x + pn.width / 2, pn.y + pn.height / 2);
        this.context.lineTo(x, y);
        this.context.strokeStyle = 'rgb(0, 255, 0)';
        this.context.stroke();
        this.context.closePath();
    }
    
    draw (chart) {
        // clear canvas
        this.context.clearRect(0, 0, this.docCanvas.width, this.docCanvas.height);
    
        this.drawConnections(chart.connections);
        this.drawNodes(chart.nodes);
    
        if (chart.partialConnection) {
            this.drawPartialConnection(chart.partialConnection, this.mouse.x, this.mouse.y);
        }
    }
}