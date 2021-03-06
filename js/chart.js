class Chart {
    constructor (canvas, mouse, modal) {
        this.canvas = canvas;
        this.mouse = mouse;
        this.modal = modal;

        this.nodes = new NodeCollection();
        this.connections = new ConnectionCollection();
    }

    loadData (jsonString) {
        let jp = new JSONParser(jsonString);
        this.nodes = jp.nodes;
        this.connections = jp.connections;
        this.draw();
    }

    draw() {
        this.canvas.draw(this);
    }

    renameNode (node) {
        this.modal.input('Rename node', node.title);
        let scope = this;
        this.modal.onsubmit = function (result) {
            node.title = result;
            scope.draw();
        }
    }
     
    addNode (x, y) {
        this.modal.input('Add node', '');
        let scope = this;
        this.modal.onsubmit = function (result) {
            scope.nodes.insert(new Node(result, x, y));
            scope.draw();
        }
    }
    
    removeNode (node) {
        this.nodes.delete(node, this.connections);
        this.draw();
    }
    
    startConnection (parentNode) {
        this.mouse.operation = MOUSE_OPERATION.DRAWING_CONNECTION;
        this.partialConnection = new Connection(parentNode);
    }
    
    updateConnection (newNode) {
        if (this.partialConnection.parentNode)
            this.finishConnection(newNode);
        else
            this.startConnection(newNode);
    }
    
    abandonConnection () {
        this.mouse.operation = MOUSE_OPERATION.NONE;
        this.partialConnection = undefined;
        this.draw();
    }
    
    finishConnection (childNode) {
        if (this.partialConnection.parentNode != childNode) {
            this.partialConnection.childNode = childNode;
            this.connections.insert(this.partialConnection);
        }

        this.abandonConnection();
    }

    removeConnection (connection) {
        this.connections.delete(connection);
        this.draw();
    }

    getJSON () {
        let jsonConverter = new JSONConverter();
        let json = jsonConverter.getJSON(this);
        this.modal.input('JSON', JSON.stringify(json));
    }

    loadJSON () {
        this.modal.input('JSON', '');
        let scope = this;
        this.modal.onsubmit = function (result) {
            scope.loadData(result);
        }
    }
}