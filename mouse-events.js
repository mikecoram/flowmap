let mouseState = 'up';
let dragNode = undefined;
let mouseOffset = {
    x:0,
    y:0
}

canvas.addEventListener('mousedown', function (e) {
    mouseState = 'down';

    let node;
    if ((node = mouseCollision(e))) {
        node.toggleSelected();

        mouseOffset.x = e.x - node.x;
        mouseOffset.y = e.y - node.y;

        dragNode = node;
    }
    else {
        //nodes.push(new Node(e.x, e.y));
    }

    draw();

}, false);

canvas.addEventListener('mouseup', function (e) {
    mouseState = 'up';
    dragNode = undefined;
}, false);

canvas.addEventListener('mousemove', function(e) {
    if (dragNode && mouseState == 'down') {
        dragNode.x = e.x - mouseOffset.x;
        dragNode.y = e.y - mouseOffset.y;
        draw();
    }
}, false);

function mouseCollision(e) {
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.inBounds(e.x, e.y)) {
            return node;
        }
    }
    return false;
}

