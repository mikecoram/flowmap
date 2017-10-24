let mouse = {
    x:0,
    y:0,
    state: 'up',
    offset: {
        x:0, 
        y:0
    },
    update: function(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    },
    dragNode:{},
}

canvas.addEventListener('mousemove', function(e) {
    mouse.update(canvas, e);

    if (mouse.dragNode && mouse.state == 'down') {
        mouse.dragNode.x = mouse.x - mouse.offset.x;
        mouse.dragNode.y = mouse.y - mouse.offset.y;
        draw();
    }
}, false);

canvas.addEventListener('mousedown', function (e) {
    if (e.button == 0) { // left click
        hideContextMenu();
        mouse.state = 'down';
        
        let node;
        if (node = mouseCollision(e)) {
            node.toggleSelected();
    
            mouse.offset.x = mouse.x - node.x;
            mouse.offset.y = mouse.y - node.y;
    
            mouse.dragNode = node;
        }
    
        draw();
    }
}, false);

canvas.addEventListener('mouseup', function (e) {
    mouse.state = 'up';
    mouse.dragNode = undefined;
}, false);

canvas.addEventListener('dblclick', function(e) {
    let node;
    if (node = mouseCollision(e)) {
        renameNode(node);
    }
}, false);

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

canvas.oncontextmenu = function (e) {
    e.preventDefault();

    let node, options;
    if (node = mouseCollision(e)) {
        options = nodeContextOptions;
    }
    else
        options = canvasContextOptions;
        
    showContextMenu(node, options, e.x, e.y);
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