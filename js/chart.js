class Chart {
    constructor (canvas) {
        this.canvas = canvas;

        this.nodes = new NodeCollection();
        this.connections = new ConnectionCollection();
    }

    renameNode (node) {
        let i = new InputModal('Rename node', node.title);
        let scope = this;
        i.onsubmit = function (result) {
            node.title = result;
            scope.canvas.draw();
        }
    }
     
    addNode (x, y) {
        let i = new InputModal('Add node', '');
        let scope = this;
        i.onsubmit = function (result) {
            scope.nodes.push(new Node(result, x, y));
            scope.canvas.draw();
        }
    }
    
    removeNode (node) {
        this.nodes.delete(node, this.connections);
        this.canvas.draw();
    }
    
    startConnection (parentNode) {
        mouse.operation = MOUSE_OPERATION.DRAWING_CONNECTION;
        this.partialConnection = new Connection(parentNode);
    }
    
    updateConnection (newNode) {
        if (this.partialConnection.parentNode)
            this.finishConnection(newNode);
        else
            this.startConnection(newNode);
    }
    
    abandonConnection () {
        mouse.operation = MOUSE_OPERATION.NONE;
        this.partialConnection = undefined;
        this.canvas.draw();
    }
    
    finishConnection (childNode) {
        if (this.partialConnection.parentNode != childNode) {
            this.partialConnection.childNode = childNode;
    
            if (!this.connections.exists(this.partialConnection))
                this.connections.push(this.partialConnection);
        }
    
        this.abandonConnection();
    }
}