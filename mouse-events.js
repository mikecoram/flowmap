const MOUSE_BUTTON = { LEFT: 0, RIGHT: 1 };
const MOUSE_STATE = { UP: 'up', DOWN: 'down' };
const MOUSE_OPERATION = { NONE:'none', DRAWING_CONNECTION: 'drawing-connection' };

let mouse = {
    x: 0,
    y: 0,
    state: MOUSE_STATE.UP,
    operation: MOUSE_OPERATION.NONE,
    
    // stores distance from top left of selected node so that the node can be drawn in the correct position
    offset: {
        x:0, 
        y:0
    },
    dragNode: { },

    update: function(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    },
}

canvas.addEventListener('mousemove', function(e) {
    mouse.update(canvas, e);

    if (mouse.dragNode && mouse.state == MOUSE_STATE.DOWN) {
        mouse.dragNode.x = mouse.x - mouse.offset.x;
        mouse.dragNode.y = mouse.y - mouse.offset.y;
        draw();
    }

    if (partialConnection) {
        draw();
    }

}, false);

function leftClick(e) {
    mouse.state = MOUSE_STATE.DOWN;
    hideContextMenu();

    if (mouse.operation == MOUSE_OPERATION.DRAWING_CONNECTION) {
        let node = mouseCollision(e);
        updateConnection(node);
    }
    else if (mouse.operation == MOUSE_OPERATION.NONE) {
        let node;
        if (node = mouseCollision(e)) {
            node.toggleSelected();
    
            mouse.offset.x = mouse.x - node.x;
            mouse.offset.y = mouse.y - node.y;
    
            mouse.dragNode = node;
        }
    }

    draw();
}

canvas.addEventListener('mousedown', function (e) {
    if (e.button == MOUSE_BUTTON.LEFT) {
        leftClick(e);
    }
}, false);

canvas.addEventListener('mouseup', function (e) {
    mouse.state = MOUSE_STATE.UP;
    mouse.dragNode = undefined;
}, false);

canvas.addEventListener('dblclick', function(e) {
    if (mouse.operation == MOUSE_OPERATION.NONE) {
        let node;
        if (node = mouseCollision(e)) {
            renameNode(node);
        }
    }
}, false);

canvas.oncontextmenu = function (e) {
    e.preventDefault();

    if (mouse.operation == MOUSE_OPERATION.DRAWING_CONNECTION) {
        abandonConnection();
    }
    else if (mouse.operation == MOUSE_OPERATION.NONE) {
        let node, options;
        if (node = mouseCollision(e)) {
            options = nodeContextOptions;
        }
        else
            options = canvasContextOptions;
            
        showContextMenu(node, options, e.x, e.y);
    }
};

function mouseCollision(e) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.inBounds(e.x, e.y)) {
            return node;
        }
    }
    return false;
}