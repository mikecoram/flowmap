let dragNode = undefined;

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
    }
}

canvas.addEventListener('mousemove', function(e) {
    mouse.update(canvas, e);

    if (dragNode && mouse.state == 'down') {
        dragNode.x = mouse.x - mouse.offset.x;
        dragNode.y = mouse.y - mouse.offset.y;
        draw();
    }
}, false);

canvas.addEventListener('mousedown', function (e) {
    mouse.state = 'down';

    let node;
    if (node = mouseCollision(e)) {
        node.toggleSelected();

        mouse.offset.x = mouse.x - node.x;
        mouse.offset.y = mouse.y - node.y;

        dragNode = node;
    }

    draw();

}, false);

canvas.addEventListener('mouseup', function (e) {
    mouse.state = 'up';
    dragNode = undefined;
}, false);

canvas.addEventListener('dblclick', function(e) {
    let node;
    if (node = mouseCollision(e)) {
        let i = new InputModal('Rename Node', node.title);
        i.onsubmit = function (result) {
            node.title = result;
            draw();
        }
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