class Chart {
    renameNode (node) {
        let i = new InputModal('Rename node', node.title);
        i.onsubmit = function (result) {
            node.title = result;
            draw();
        }
    }
     
    addNode (x, y) {
        let i = new InputModal('Add node', '');
        i.onsubmit = function (result) {
            nodes.push(new Node(result, x, y));
            draw();
        }
    }
    
    removeNode (node) {
        nodes.delete(node, connections);
        draw();
    }
    
    startConnection (parentNode) {
        mouse.operation = MOUSE_OPERATION.DRAWING_CONNECTION;
        partialConnection = new Connection(parentNode);
    }
    
    updateConnection (newNode) {
        if (partialConnection.parentNode)
            this.finishConnection(newNode);
        else
            this.startConnection(newNode);
    }
    
    abandonConnection () {
        mouse.operation = MOUSE_OPERATION.NONE;
        partialConnection = undefined;
        draw();
    }
    
    finishConnection (childNode) {
        if (partialConnection.parentNode != childNode) {
            partialConnection.childNode = childNode;
    
            if (!connections.exists(partialConnection))
                connections.push(partialConnection);
        }
    
        this.abandonConnection();
    }
}