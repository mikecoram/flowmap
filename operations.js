function renameNode (node) {
    let i = new InputModal('Rename node', node.title);
    i.onsubmit = function (result) {
        node.title = result;
        draw();
    }
}
 
function addNode (x, y) {
    let i = new InputModal('Add node', '');
    i.onsubmit = function (result) {
        nodes.push(new Node(result, x, y));
        draw();
    }
}

function removeNode (node) {
    nodes.delete(node, connections);
    draw();
}

function startConnection (parentNode) {
    mouse.operation = MOUSE_OPERATION.DRAWING_CONNECTION;
    partialConnection = new Connection(parentNode);
}

function updateConnection (newNode) {
    if (partialConnection.parentNode)
        finishConnection(newNode);
    else
        startConnection(newNode);
}

function abandonConnection () {
    mouse.operation = MOUSE_OPERATION.NONE;
    partialConnection = undefined;
    draw();
}

function finishConnection (childNode) {
    if (partialConnection.parentNode != childNode) {
        partialConnection.childNode = childNode;

        if (!connections.exists(partialConnection))
            connections.push(partialConnection);
    }

    abandonConnection();
}